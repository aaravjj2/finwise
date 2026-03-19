'use client';

import type { SavingsGoal } from '@/types';

interface GoalCardProps {
  goal: SavingsGoal;
}

export function GoalCard({ goal }: GoalCardProps): JSX.Element {
  const progress = Math.min(100, (Number(goal.current_amount) / Number(goal.target_amount)) * 100);

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: goal.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const typeEmojis: Record<string, string> = {
    emergency: '🆘',
    purchase: '🛒',
    education: '📚',
    business: '💼',
    other: '🎯',
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeEmojis[goal.type] || '🎯'}</span>
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">{goal.name}</p>
            {goal.target_date && (
              <p className="text-xs text-neutral-500">
                Due: {new Date(goal.target_date).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            {formatCurrency(Number(goal.current_amount))}
          </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {formatCurrency(Number(goal.target_amount))}
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
        {Math.round(progress)}% complete
      </p>
    </div>
  );
}
