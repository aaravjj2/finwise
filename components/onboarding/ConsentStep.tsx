'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ConsentStepProps {
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function ConsentStep({ onNext, onBack, loading = false }: ConsentStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';
  const [consent, setConsent] = useState(false);

  function handleSubmit(): void {
    if (consent) {
      onNext();
    }
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </button>

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-3xl dark:bg-primary-900/30">
        🔒
      </div>

      <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
        {t('consent_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">Before you continue, please review:</p>

      <div className="mb-6 space-y-4">
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Your conversations are private and encrypted</li>
          <li>We never sell your data to anyone</li>
          <li>You can delete your account and all your data anytime</li>
        </ul>
      </div>

      <label className="mb-4 flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-primary-600"
        />
        I understand and agree
      </label>

      <Link href={`/${locale}/privacy`} target="_blank" className="mb-6 inline-block text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
        View full privacy policy
      </Link>

      <button
        onClick={handleSubmit}
        disabled={!consent || loading}
        className="tap-target flex w-full items-center justify-center rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          t('get_started')
        )}
      </button>
    </div>
  );
}
