'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/db/supabase-browser';
import { localeNames, locales, type Locale } from '@/i18n';
import type { SupportedCountry } from '@/types';

const COUNTRY_OPTIONS: Array<{ code: SupportedCountry; name: string }> = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'IN', name: 'India' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'PH', name: 'Philippines' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'PE', name: 'Peru' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'UG', name: 'Uganda' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'MX', name: 'Mexico' },
  { code: 'CO', name: 'Colombia' },
];

export default function SettingsPage(): JSX.Element {
  const t = useTranslations('settings');
  const params = useParams();
  const router = useRouter();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';
  const supabase = createClient();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [saving, setSaving] = useState(false);

  async function updateUserProfile(values: { language?: string; country?: string }): Promise<void> {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('users').update(values).eq('id', user.id);
    } finally {
      setSaving(false);
    }
  }

  async function exportMyData(): Promise<void> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const [{ data: entries }, { data: conversations }, { data: messages }] = await Promise.all([
      supabase.from('financial_entries').select('*').eq('user_id', user.id),
      supabase.from('conversations').select('*').eq('user_id', user.id),
      supabase
        .from('messages')
        .select('*, conversations!inner(user_id)')
        .eq('conversations.user_id', user.id),
    ]);

    const payload = {
      exported_at: new Date().toISOString(),
      financial_entries: entries || [],
      conversation_history: conversations || [],
      conversation_messages: messages || [],
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finwise-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function deleteAccount(): Promise<void> {
    if (deleteConfirm !== 'DELETE') return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('users').delete().eq('id', user.id);
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }

  async function handleLogout(): Promise<void> {
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">{t('title')}</h1>

      <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('language')}</label>
          <select
            defaultValue={locale}
            onChange={async (event) => {
              const nextLocale = event.target.value;
              await updateUserProfile({ language: nextLocale });
              router.push(`/${nextLocale}/settings`);
            }}
            className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-600 dark:bg-neutral-900"
          >
            {locales.map((item) => (
              <option key={item} value={item}>
                {localeNames[item as Locale]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Country</label>
          <select
            defaultValue="NG"
            onChange={async (event) => {
              await updateUserProfile({ country: event.target.value });
            }}
            className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-600 dark:bg-neutral-900"
          >
            {COUNTRY_OPTIONS.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">{t('notifications')}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Turn reminders on or off</p>
          </div>
          <button
            type="button"
            onClick={() => setNotificationEnabled((prev) => !prev)}
            className={`h-7 w-12 rounded-full p-1 transition-colors ${notificationEnabled ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
          >
            <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${notificationEnabled ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        <button
          type="button"
          onClick={exportMyData}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-900"
        >
          Export my data
        </button>

        <div className="rounded-lg border border-red-200 p-3 dark:border-red-900">
          <p className="mb-2 text-sm font-semibold text-red-700 dark:text-red-400">Delete my account</p>
          <p className="mb-2 text-xs text-red-600 dark:text-red-300">Type DELETE to confirm.</p>
          <input
            type="text"
            value={deleteConfirm}
            onChange={(event) => setDeleteConfirm(event.target.value)}
            className="mb-2 h-10 w-full rounded-lg border border-red-300 bg-white px-3 text-sm dark:border-red-800 dark:bg-neutral-900"
            placeholder="DELETE"
          />
          <button
            type="button"
            onClick={deleteAccount}
            disabled={deleteConfirm !== 'DELETE'}
            className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            Delete my account
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>{t('version')} 1.0.0</span>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/privacy`} className="hover:text-primary-600 dark:hover:text-primary-400">Privacy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary-600 dark:hover:text-primary-400">Terms</Link>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          {t('logout')}
        </button>
      </div>

      {saving && (
        <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">Saving...</p>
      )}
    </div>
  );
}
