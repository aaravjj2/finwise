'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateLoanPayment, type LoanResult } from '@/lib/loan-calculator';

export default function CalculatorPage(): JSX.Element {
  const t = useTranslations('tools');

  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<LoanResult | null>(null);

  function handleCalculate(): void {
    if (!principal || !rate || !term) return;

    const loanResult = calculateLoanPayment(
      parseFloat(principal),
      parseFloat(rate),
      parseInt(term, 10)
    );

    setResult(loanResult);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
        {t('loan_calculator')}
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">{t('calculator_desc')}</p>

      {/* Calculator form */}
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t('loan_amount')}
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="1000"
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t('interest_rate')} (% {t('per_month')})
            </label>
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="2.5"
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t('loan_term')} ({t('months')})
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="12"
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={!principal || !rate || !term}
            className="w-full rounded-lg bg-primary-500 px-4 py-3 font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('calculate')}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-900/20">
            <h2 className="mb-4 text-lg font-semibold text-primary-700 dark:text-primary-400">
              {t('results')}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('monthly_payment')}
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${result.monthlyPayment.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {t('total_interest')}
                </p>
                <p className="text-2xl font-bold text-red-600">${result.totalInterest.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('total_cost')}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${result.totalCost.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{t('apr')}</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {result.apr.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Warning for high APR */}
          {result.apr > 60 && (
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-400">
                    {t('high_interest_warning')}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {t('high_interest_desc')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
