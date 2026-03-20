'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { PhoneInput } from '@/components/auth/PhoneInput';
import { OTPInput } from '@/components/auth/OTPInput';
import { createClient } from '@/lib/db/supabase-browser';

type AuthStep = 'phone' | 'otp';

export default function LoginPage(): JSX.Element {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpExpired, setOtpExpired] = useState(false);

  const supabase = createClient();

  async function handlePhoneSubmit(phoneNumber: string): Promise<void> {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setError(null);
    setOtpExpired(false);
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
    if (otpExpired) {
      setError('Your OTP has expired. Please resend and try again.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (verifyError) {
        const message = verifyError.message.toLowerCase();
        if (message.includes('expired')) {
          setError('Your OTP has expired. Please resend and try again.');
        } else if (message.includes('invalid') || message.includes('token')) {
          setError('The OTP you entered is incorrect. Please try again.');
        } else {
          setError(verifyError.message);
        }
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
          router.push(`/${locale}/onboarding`);
        } else if (!userData.onboarding_completed) {
          router.push(`/${locale}/onboarding`);
        } else {
          router.push(`/${locale}/chat`);
        }
      }
    } catch {
      setError(t('error_generic'));
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin(): Promise<void> {
    setDemoLoading(true);
    setError(null);

    const demoSessionId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Set demo mode cookie - this will be checked by middleware
    document.cookie = 'finwise_demo_mode=true; path=/; max-age=86400; SameSite=Lax';

    // Also set in localStorage for client-side components
    if (typeof window !== 'undefined') {
      localStorage.setItem('finwise_demo_mode', 'true');
      localStorage.setItem('finwise_demo_session_id', demoSessionId);
      localStorage.setItem('finwise_demo_user', JSON.stringify({
        id: demoSessionId,
        name: 'Demo User',
        phone: '+1234567890',
        language: locale || 'en',
        country: 'NG',
        literacy_level: 3,
        primary_goal: 'savings',
        has_bank_account: false,
        monthly_income: 50000,
        currency: 'NGN',
        onboarding_completed: true,
      }));
    }

    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push(`/${locale}/chat`);
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
            Your financial coach, in your language
          </h2>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            Free financial guidance for everyone
          </p>
          <PhoneInput onSubmit={handlePhoneSubmit} loading={loading} submitLabel="Send code" />

          {/* Demo Mode Button */}
          <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-700">
            <p className="mb-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Continue without account
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={demoLoading}
              className="w-full rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 py-3 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 disabled:opacity-50 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
            >
              {demoLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('loading') || 'Loading...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  Continue without account
                </span>
              )}
            </button>
          </div>
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
          <OTPInput
            onSubmit={handleOTPSubmit}
            loading={loading}
            onResend={() => handlePhoneSubmit(phone)}
            onExpire={() => {
              setOtpExpired(true);
              setError('Your OTP has expired. Please resend and try again.');
            }}
          />
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
