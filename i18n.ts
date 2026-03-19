import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = [
  'en',
  'hi',
  'sw',
  'yo',
  'bn',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  sw: 'Kiswahili',
  yo: 'Yorùbá',
  bn: 'বাংলা',
};

export const rtlLocales: Locale[] = [];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
