'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/supabase-browser';
import { localeNames, type Locale } from '@/i18n';

export default function SettingsPage(): JSX.Element {
  const t = useTranslations('settings');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const supabase = createClient();

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">{t('title')}</h1>

      <div className="space-y-4">
        {/* Language */}
        <Link
          href={`/${locale}/settings/language`}
          className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{t('language')}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {localeNames[locale as Locale] || 'English'}
              </p>
            </div>
          </div>
          <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Notifications */}
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{t('notifications')}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Push notifications</p>
            </div>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" defaultChecked />
            <div className="peer h-6 w-11 rounded-full bg-neutral-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-neutral-700" />
          </label>
        </div>

        {/* Privacy */}
        <Link
          href={`/${locale}/settings/privacy`}
          className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{t('privacy')}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Manage your data
              </p>
            </div>
          </div>
          <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Help */}
        <Link
          href={`/${locale}/settings/help`}
          className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">❓</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{t('help')}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                FAQs and support
              </p>
            </div>
          </div>
          <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* About */}
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-white">{t('about')}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('version')} 1.0.0
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-200 bg-white p-4 text-left transition-colors hover:bg-red-50 dark:border-red-900 dark:bg-neutral-800 dark:hover:bg-red-900/20"
        >
          <span className="text-2xl">🚪</span>
          <p className="font-medium text-red-600 dark:text-red-400">{t('logout')}</p>
        </button>
      </div>
    </div>
  );
}
