'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { SupportedCountry } from '@/types';

interface CountryStepProps {
  defaultValue?: SupportedCountry;
  onNext: (country: string) => void;
  onBack: () => void;
}

const COUNTRIES: { code: SupportedCountry; name: string; flag: string }[] = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
];

export function CountryStep({ defaultValue, onNext, onBack }: CountryStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [selected, setSelected] = useState<SupportedCountry | undefined>(defaultValue);
  const [query, setQuery] = useState('');

  const filtered = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

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
        {t('country_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        {t('country_subtitle')}
      </p>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search country"
        className="mb-4 h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
      />

      <div className="mb-6 max-h-64 space-y-2 overflow-y-auto">
        {filtered.map((country) => (
          <button
            key={country.code}
            onClick={() => setSelected(country.code)}
            className={`flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
              selected === country.code
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
            }`}
          >
            <span className="text-2xl">{country.flag}</span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {country.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="tap-target w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t('continue')}
      </button>
    </div>
  );
}
