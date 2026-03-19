'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase-browser';
import type { EntryType, ExpenseCategory, IncomeCategory } from '@/types';

interface AddEntryModalProps {
  currency: string;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'food',
  'transport',
  'housing',
  'health',
  'education',
  'business',
  'family',
  'savings',
  'entertainment',
  'other',
];

const INCOME_CATEGORIES: IncomeCategory[] = ['salary', 'business', 'remittance', 'gift', 'other'];

export function AddEntryModal({ currency }: AddEntryModalProps): JSX.Element {
  const t = useTranslations('dashboard');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<EntryType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!amount || !category) return;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase.from('financial_entries').insert({
        user_id: user.id,
        type,
        amount: parseFloat(amount),
        currency,
        category,
        description: description || null,
        date,
      });

      setIsOpen(false);
      setAmount('');
      setCategory('');
      setDescription('');
      router.refresh();
    } catch (error) {
      console.error('Error adding entry:', error);
    } finally {
      setLoading(false);
    }
  }

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {t('add_entry')}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-neutral-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {t('add_entry')}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setType('expense');
                    setCategory('');
                  }}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                    type === 'expense'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                  }`}
                >
                  {t('expense')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType('income');
                    setCategory('');
                  }}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                    type === 'income'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400'
                  }`}
                >
                  {t('income')}
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('amount')} ({currency})
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-lg text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('category')}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  required
                >
                  <option value="">{t('select_category')}</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('date')}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t('description')} ({t('optional')})
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('description_placeholder')}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !amount || !category}
                className="w-full rounded-lg bg-primary-500 px-4 py-3 font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Saving...' : t('save')}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
