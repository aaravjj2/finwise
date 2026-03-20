'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface LanguageStepProps {
  defaultValue?: string;
  onNext: (language: string) => void;
}

const LANGUAGE_OPTIONS = [
  { code: 'en', flag: '🇬🇧', english: 'English', native: 'English' },
  { code: 'hi', flag: '🇮🇳', english: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', flag: '🇧🇩', english: 'Bengali', native: 'বাংলা' },
  { code: 'sw', flag: '🇰🇪', english: 'Swahili', native: 'Kiswahili' },
  { code: 'yo', flag: '🇳🇬', english: 'Yoruba', native: 'Yoruba' },
  { code: 'tl', flag: '🇵🇭', english: 'Filipino', native: 'Filipino' },
  { code: 'es', flag: '🇪🇸', english: 'Spanish', native: 'Español' },
  { code: 'pt', flag: '🇧🇷', english: 'Portuguese', native: 'Português' },
  { code: 'ha', flag: '🇳🇬', english: 'Hausa', native: 'Hausa' },
  { code: 'am', flag: '🇪🇹', english: 'Amharic', native: 'አማርኛ' },
  { code: 'zu', flag: '🇿🇦', english: 'Zulu', native: 'isiZulu' },
  { code: 'ig', flag: '🇳🇬', english: 'Igbo', native: 'Igbo' },
  { code: 'ta', flag: '🇮🇳', english: 'Tamil', native: 'தமிழ்' },
  { code: 'id', flag: '🇮🇩', english: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'vi', flag: '🇻🇳', english: 'Vietnamese', native: 'Tiếng Việt' },
];

export function LanguageStep({ defaultValue, onNext }: LanguageStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [selected, setSelected] = useState(defaultValue || 'en');

  useEffect(() => {
    if (defaultValue) return;
    const browserLang = navigator.language?.slice(0, 2).toLowerCase() || 'en';
    const found = LANGUAGE_OPTIONS.find((lang) => lang.code === browserLang);
    if (found) {
      setSelected(found.code);
    }
  }, [defaultValue]);

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
        {t('language_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        {t('language_subtitle')}
      </p>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {LANGUAGE_OPTIONS.map((language) => (
          <button
            key={language.code}
            onClick={() => setSelected(language.code)}
            className={`rounded-lg border-2 p-3 text-left transition-colors ${
              selected === language.code
                ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20'
                : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
            }`}
          >
            <div className="text-lg">{language.flag}</div>
            <p className="mt-1 text-xs font-semibold text-neutral-900 dark:text-white">{language.english}</p>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">{language.native}</p>
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
