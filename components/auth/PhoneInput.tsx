'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const COUNTRY_CODES = [
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States' },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda' },
  { code: '+233', country: 'GH', flag: '🇬🇭', name: 'Ghana' },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+251', country: 'ET', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' },
];

interface PhoneInputProps {
  onSubmit: (phone: string) => void;
  loading?: boolean;
  submitLabel?: string;
}

export function PhoneInput({ onSubmit, loading = false, submitLabel }: PhoneInputProps): JSX.Element {
  const t = useTranslations('auth');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]!);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const fullNumber = `${countryCode.code}${phoneNumber.replace(/\D/g, '')}`;
    onSubmit(fullNumber);
  }

  function formatPhoneNumber(value: string): string {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('phone_label')}
        </label>
        <div className="flex gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-12 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 text-sm hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-600"
            >
              <span className="text-lg">{countryCode.flag}</span>
              <span className="text-neutral-900 dark:text-white">{countryCode.code}</span>
              <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute left-0 top-full z-10 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-600 dark:bg-neutral-700">
                {COUNTRY_CODES.map((cc) => (
                  <button
                    key={cc.code}
                    type="button"
                    onClick={() => {
                      setCountryCode(cc);
                      setShowDropdown(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-600"
                  >
                    <span className="text-lg">{cc.flag}</span>
                    <span className="flex-1 text-neutral-900 dark:text-white">{cc.name}</span>
                    <span className="text-neutral-500">{cc.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder={t('phone_placeholder')}
            value={formatPhoneNumber(phoneNumber)}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="h-12 flex-1 rounded-lg border border-neutral-300 bg-white px-4 text-lg text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || phoneNumber.length < 7}
        className="tap-target flex w-full items-center justify-center rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          submitLabel || t('continue')
        )}
      </button>
    </form>
  );
}
