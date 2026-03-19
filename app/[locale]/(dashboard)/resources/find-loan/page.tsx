import { createClient } from '@/lib/db/supabase';
import { useTranslations } from 'next-intl';

export default async function FindLoanPage(): Promise<JSX.Element> {
  const supabase = createClient();

  const { data: institutions } = await supabase
    .from('institutions')
    .select('*')
    .eq('verified', true)
    .order('interest_rate_min', { ascending: true });

  return <FindLoanContent institutions={institutions || []} />;
}

function FindLoanContent({ institutions }: { institutions: { id: string; name: string; type: string; country_code: string; interest_rate_min: number | null; interest_rate_max: number | null; accepts_first_time_borrowers: boolean; requires_collateral: boolean; description: string; website: string | null }[] }): JSX.Element {
  const t = useTranslations('resources');

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">{t('find_loan')}</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Compare trusted microfinance institutions and find the best loan for your needs.
      </p>

      <div className="space-y-4">
        {institutions.map((inst) => (
          <div
            key={inst.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">{inst.name}</h3>
                <p className="text-sm text-neutral-500">{inst.country_code}</p>
              </div>
              {inst.interest_rate_min && inst.interest_rate_max && (
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    {inst.interest_rate_min}% - {inst.interest_rate_max}%
                  </p>
                  <p className="text-xs text-neutral-500">APR</p>
                </div>
              )}
            </div>

            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {inst.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {inst.accepts_first_time_borrowers && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  First-time borrowers welcome
                </span>
              )}
              {!inst.requires_collateral && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  No collateral required
                </span>
              )}
            </div>

            {inst.website && (
              <a
                href={inst.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-primary-600 hover:underline dark:text-primary-400"
              >
                Learn more
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
