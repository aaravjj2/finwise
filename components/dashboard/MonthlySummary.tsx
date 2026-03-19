'use client';

import { useTranslations } from 'next-intl';

interface MonthlySummaryProps {
  income: number;
  expenses: number;
  savings: number;
  currency: string;
}

export function MonthlySummary({
  income,
  expenses,
  savings,
  currency,
}: MonthlySummaryProps): JSX.Element {
  const t = useTranslations('dashboard');

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800 sm:col-span-2 lg:col-span-2">
      <h3 className="mb-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
        {t('this_month')}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('income')}</p>
          <p className="mt-1 text-xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('expenses')}</p>
          <p className="mt-1 text-xl font-bold text-red-600">{formatCurrency(expenses)}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('savings')}</p>
          <p
            className={`mt-1 text-xl font-bold ${
              savings >= 0 ? 'text-primary-600' : 'text-red-600'
            }`}
          >
            {formatCurrency(savings)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-neutral-500">
          <span>{t('spent')}</span>
          <span>
            {income > 0 ? Math.round((expenses / income) * 100) : 0}% of {t('income').toLowerCase()}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-500"
            style={{ width: `${Math.min(100, income > 0 ? (expenses / income) * 100 : 0)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
