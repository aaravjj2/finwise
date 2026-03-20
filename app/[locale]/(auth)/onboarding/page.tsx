'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase-browser';
import { LanguageStep } from '@/components/onboarding/LanguageStep';
import { CountryStep } from '@/components/onboarding/CountryStep';
import { AssessmentStep } from '@/components/onboarding/AssessmentStep';
import { ProfileStep } from '@/components/onboarding/ProfileStep';
import { ConsentStep } from '@/components/onboarding/ConsentStep';
import type { OnboardingFormData, SupportedLanguage, SupportedCountry, LiteracyLevel } from '@/types';

type OnboardingStep = 'language' | 'country' | 'assessment' | 'profile' | 'consent';

const STEPS: OnboardingStep[] = ['language', 'country', 'assessment', 'profile', 'consent'];

export default function OnboardingPage(): JSX.Element {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    language: locale as SupportedLanguage,
  });

  const supabase = createClient();

  useEffect(() => {
    if (!showWelcome) return;
    const timer = setTimeout(() => {
      const selectedLanguage = (formData.language || locale) as string;
      const supportedRoutes = ['en', 'hi', 'sw', 'yo', 'bn'];
      const routeLocale = supportedRoutes.includes(selectedLanguage) ? selectedLanguage : locale;
      router.push(`/${routeLocale}/dashboard`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showWelcome, formData.language, router, locale]);

  async function handleComplete(): Promise<void> {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }

      const { error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          language: formData.language,
          country: formData.country,
          literacy_level: formData.literacy_level,
          literacy_description: JSON.stringify(formData.assessment_answers || {}),
          primary_goal: formData.primary_goal,
          has_bank_account: formData.has_bank_account,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      setShowWelcome(true);
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleNext(data: Partial<OnboardingFormData>): void {
    setFormData((prev) => ({ ...prev, ...data }));

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  }

  function handleBack(): void {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function renderStep(): JSX.Element {
    const step = STEPS[currentStep];
    switch (step) {
      case 'language':
        return (
          <LanguageStep
            defaultValue={formData.language}
            onNext={(language) => handleNext({ language: language as SupportedLanguage })}
          />
        );
      case 'country':
        return (
          <CountryStep
            defaultValue={formData.country}
            onNext={(country) => handleNext({ country: country as SupportedCountry })}
            onBack={handleBack}
          />
        );
      case 'assessment':
        return (
          <AssessmentStep
            defaultValues={{
              literacy_level: formData.literacy_level,
              has_bank_account: formData.has_bank_account,
              assessment_answers: formData.assessment_answers,
            }}
            onNext={(data) =>
              handleNext({
                literacy_level: data.literacy_level as LiteracyLevel,
                has_bank_account: data.has_bank_account,
                primary_goal: data.primary_goal,
                assessment_answers: data.assessment_answers,
              })
            }
            onBack={handleBack}
          />
        );
      case 'profile':
        return (
          <ProfileStep
            defaultValues={{
              name: formData.name,
              avatar: formData.avatar,
            }}
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
          />
        );
      case 'consent':
        return (
          <ConsentStep
            onNext={() => handleComplete()}
            onBack={handleBack}
            loading={loading}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  }

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  if (showWelcome) {
    return (
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-neutral-800">
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Welcome, {formData.name || 'friend'}!
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Your financial journey starts here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-xs text-neutral-500">
          <span>
            {t('step', { current: currentStep + 1, total: STEPS.length })}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-800">{renderStep()}</div>
    </div>
  );
}
