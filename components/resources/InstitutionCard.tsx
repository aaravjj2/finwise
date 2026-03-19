'use client';

import type { Institution } from '@/types';

interface InstitutionCardProps {
  institution: Institution;
}

export function InstitutionCard({ institution }: InstitutionCardProps): JSX.Element {
  const typeLabels: Record<string, string> = {
    microfinance: 'Microfinance',
    bank: 'Bank',
    mobile_money: 'Mobile Money',
    ngo: 'NGO',
    government: 'Government',
  };

  const typeColors: Record<string, string> = {
    microfinance: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    bank: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    mobile_money: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    ngo: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    government: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300',
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{institution.name}</h3>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            typeColors[institution.type] || typeColors.microfinance
          }`}
        >
          {typeLabels[institution.type] || institution.type}
        </span>
      </div>

      <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {institution.description}
      </p>

      {/* Interest rates */}
      {institution.interest_rate_min && institution.interest_rate_max && (
        <div className="mb-2 text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Interest: </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {institution.interest_rate_min}% - {institution.interest_rate_max}%
          </span>
        </div>
      )}

      {/* Features */}
      <div className="flex flex-wrap gap-1">
        {institution.accepts_first_time_borrowers && (
          <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
            First-time OK
          </span>
        )}
        {!institution.requires_collateral && (
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            No collateral
          </span>
        )}
      </div>

      {/* Website */}
      {institution.website && (
        <a
          href={institution.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          Visit website
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
