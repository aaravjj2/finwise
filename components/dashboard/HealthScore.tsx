'use client';

import { useTranslations } from 'next-intl';

interface HealthScoreProps {
  score: number;
  breakdown?: {
    savings: number;
    goals: number;
    logging: number;
    lessons: number;
  };
}

export function HealthScore({ score, breakdown }: HealthScoreProps): JSX.Element {
  const t = useTranslations('dashboard');

  const getScoreColor = (s: number): string => {
    if (s >= 70) return 'text-green-600';
    if (s >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreLabel = (s: number): string => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Needs Work';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="group relative rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <h3 className="mb-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
        {t('health_score')}
      </h3>

      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="h-[120px] w-[120px] -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={getScoreColor(score)}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{getScoreLabel(score)}</span>
          </div>
        </div>
      </div>

      {breakdown && (
        <div className="pointer-events-none absolute left-1/2 top-2 hidden w-56 -translate-x-1/2 rounded-lg border border-neutral-200 bg-white p-3 text-xs shadow-lg group-hover:block dark:border-neutral-700 dark:bg-neutral-900">
          <p className="mb-1 font-semibold text-neutral-900 dark:text-white">Financial Health</p>
          <p className="text-neutral-600 dark:text-neutral-400">Savings rate: {breakdown.savings} pts</p>
          <p className="text-neutral-600 dark:text-neutral-400">Goals: {breakdown.goals} pts</p>
          <p className="text-neutral-600 dark:text-neutral-400">Logging habit: {breakdown.logging} pts</p>
          <p className="text-neutral-600 dark:text-neutral-400">Lessons: {breakdown.lessons} pts</p>
        </div>
      )}
    </div>
  );
}
