'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ConsentStepProps {
  onNext: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function ConsentStep({ onNext, onBack, loading = false }: ConsentStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [consentData, setConsentData] = useState(false);
  const [consentAI, setConsentAI] = useState(false);

  function handleSubmit(): void {
    if (consentData && consentAI) {
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
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">{t('consent_subtitle')}</p>

      <div className="mb-6 space-y-4">
        {/* Data processing consent */}
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
          <input
            type="checkbox"
            checked={consentData}
            onChange={(e) => setConsentData(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600"
          />
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {t('consent_data_title')}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {t('consent_data_desc')}
            </p>
          </div>
        </label>

        {/* AI coaching consent */}
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
          <input
            type="checkbox"
            checked={consentAI}
            onChange={(e) => setConsentAI(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600"
          />
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {t('consent_ai_title')}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {t('consent_ai_desc')}
            </p>
          </div>
        </label>
      </div>

      <div className="mb-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
        <div className="flex items-start gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              {t('privacy_promise_title')}
            </p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-400">
              {t('privacy_promise_desc')}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!consentData || !consentAI || loading}
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
