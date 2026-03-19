'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { OTPInput } from '@/components/auth/OTPInput';
import { createClient } from '@/lib/db/supabase-browser';

type AuthStep = 'phone' | 'otp';

export default function LoginPage(): JSX.Element {
  const t = useTranslations('auth');
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  async function handlePhoneSubmit(phoneNumber: string): Promise<void> {
    setLoading(true);
    setError(null);
    setPhone(phoneNumber);

    try {
      const { error: signInError } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setStep('otp');
    } catch {
      setError(t('error_generic'));
    } finally {
      setLoading(false);
    }
  }

  async function handleOTPSubmit(otp: string): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      if (data.user) {
        // Check if user exists in our users table
        const { data: userData } = await supabase
          .from('users')
          .select('onboarding_completed')
          .eq('id', data.user.id)
          .single();

        if (!userData) {
          // New user - create record and go to onboarding
          await supabase.from('users').insert({
            id: data.user.id,
            phone: phone,
          });
          router.push('/onboarding');
        } else if (!userData.onboarding_completed) {
          router.push('/onboarding');
        } else {
          router.push('/chat');
        }
      }
    } catch {
      setError(t('error_generic'));
    } finally {
      setLoading(false);
    }
  }

  function handleBack(): void {
    setStep('phone');
    setError(null);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-800">
      {step === 'phone' ? (
        <>
          <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
            {t('login_title')}
          </h2>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            {t('login_subtitle')}
          </p>
          <PhoneInput onSubmit={handlePhoneSubmit} loading={loading} />
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('back')}
          </button>
          <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
            {t('verify_title')}
          </h2>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            {t('verify_subtitle', { phone })}
          </p>
          <OTPInput onSubmit={handleOTPSubmit} loading={loading} onResend={() => handlePhoneSubmit(phone)} />
        </>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        {t('terms_notice')}
      </div>
    </div>
  );
}
