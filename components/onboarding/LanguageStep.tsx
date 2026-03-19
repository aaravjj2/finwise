'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n';

interface LanguageStepProps {
  defaultValue?: string;
  onNext: (language: string) => void;
}

export function LanguageStep({ defaultValue, onNext }: LanguageStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [selected, setSelected] = useState(defaultValue || 'en');

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
        {t('language_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        {t('language_subtitle')}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-2">
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => setSelected(locale)}
            className={`rounded-lg border-2 p-3 text-left transition-colors ${
              selected === locale
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
            }`}
          >
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {localeNames[locale as Locale]}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onNext(selected)}
        className="tap-target w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600"
      >
        {t('continue')}
      </button>
    </div>
  );
}
