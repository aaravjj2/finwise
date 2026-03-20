import { getRequestConfig } from 'next-intl/server';

export const locales = [
  'en',
  'hi',
  'sw',
  'yo',
  'bn',
  'tl',
  'es',
  'pt',
  'ha',
  'am',
  'zu',
  'ig',
  'ta',
  'id',
  'vi',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  sw: 'Kiswahili',
  yo: 'Yorùbá',
  bn: 'বাংলা',
  tl: 'Filipino',
  es: 'Español',
  pt: 'Português (Brasil)',
  ha: 'Hausa',
  am: 'አማርኛ',
  zu: 'isiZulu',
  ig: 'Igbo',
  ta: 'தமிழ்',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
};

export const rtlLocales: Locale[] = [];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const resolvedLocale = locale && locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
