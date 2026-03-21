'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface AssessmentStepProps {
  defaultValues?: {
    literacy_level?: number;
    has_bank_account?: boolean;
  };
  onNext: (data: { literacy_level: number; has_bank_account: boolean }) => void;
  onBack: () => void;
}

const LITERACY_LEVELS = [
  { level: 1, labelKey: 'literacy_1', descKey: 'literacy_1_desc' },
  { level: 2, labelKey: 'literacy_2', descKey: 'literacy_2_desc' },
  { level: 3, labelKey: 'literacy_3', descKey: 'literacy_3_desc' },
  { level: 4, labelKey: 'literacy_4', descKey: 'literacy_4_desc' },
  { level: 5, labelKey: 'literacy_5', descKey: 'literacy_5_desc' },
];

export function AssessmentStep({ defaultValues, onNext, onBack }: AssessmentStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [literacyLevel, setLiteracyLevel] = useState(defaultValues?.literacy_level || 1);
  const [hasBankAccount, setHasBankAccount] = useState<boolean | undefined>(
    defaultValues?.has_bank_account
  );

  function handleSubmit(): void {
    if (hasBankAccount !== undefined) {
      onNext({
        literacy_level: literacyLevel,
        has_bank_account: hasBankAccount,
      });
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

      <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
        {t('assessment_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        {t('assessment_subtitle')}
      </p>

      {/* Literacy Level */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('literacy_question')}
        </label>
        <div className="space-y-2">
          {LITERACY_LEVELS.map((level) => (
            <button
              key={level.level}
              onClick={() => setLiteracyLevel(level.level)}
              className={`flex w-full items-start gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
                literacyLevel === level.level
                  ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                  : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  literacyLevel === level.level
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-neutral-300 dark:border-neutral-500'
                }`}
              >
                {literacyLevel === level.level && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {t(level.labelKey)}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{t(level.descKey)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bank Account */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('bank_account_question')}
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setHasBankAccount(true)}
            className={`flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
              hasBankAccount === true
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500'
            }`}
          >
            {t('yes')}
          </button>
          <button
            onClick={() => setHasBankAccount(false)}
            className={`flex-1 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
              hasBankAccount === false
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-500'
            }`}
          >
            {t('no')}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={hasBankAccount === undefined}
        className="tap-target w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t('continue')}
      </button>
    </div>
  );
}
