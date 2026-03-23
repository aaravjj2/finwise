import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { createClient } from '@/lib/db/supabase';
import { InstitutionCard } from '@/components/resources/InstitutionCard';
import type { Institution } from '@/types';

interface ResourcesPageProps {
  params: {
    locale: string;
  };
}

export default async function ResourcesPage({
  params,
}: ResourcesPageProps): Promise<JSX.Element> {
  const supabase = createClient();

  // Get user's country
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userCountry = 'NG';
  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('country')
      .eq('id', user.id)
      .single();
    userCountry = userData?.country || 'NG';
  }

  // Get institutions for user's country
  const { data: institutions } = await supabase
    .from('institutions')
    .select('*')
    .eq('country_code', userCountry)
    .eq('verified', true)
    .limit(6);

  return (
    <ResourcesContent
      institutions={(institutions || []) as Institution[]}
      locale={params.locale}
    />
  );
}

function ResourcesContent({
  institutions,
  locale,
}: {
  institutions: Institution[];
  locale: string;
}): JSX.Element {
  const t = useTranslations('resources');

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">{t('title')}</h1>

      {/* Quick actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/${locale}/resources/find-loan`}
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-2xl dark:bg-primary-900/30">
            💳
          </div>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">{t('find_loan')}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('find_loan_desc')}
            </p>
          </div>
        </Link>

        <Link
          href={`/${locale}/resources/remittance`}
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-2xl dark:bg-secondary-900/30">
            💸
          </div>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">{t('send_money')}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('send_money_desc')}
            </p>
          </div>
        </Link>

        <Link
          href={`/${locale}/circles`}
          className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-900/30">
            🤝
          </div>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">Savings Circles</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Save with friends in trusted rotating groups.
            </p>
          </div>
        </Link>
      </div>

      {/* Institutions */}
      {institutions.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
            {t('nearby_institutions')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {institutions.map((institution) => (
              <InstitutionCard key={institution.id} institution={institution} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
