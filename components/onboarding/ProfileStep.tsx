'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProfileStepProps {
  defaultValues?: {
    name?: string;
    primary_goal?: string;
  };
  onNext: (data: { name: string; primary_goal: string }) => void;
  onBack: () => void;
}

const GOALS = [
  { key: 'save_more', emoji: '💰' },
  { key: 'pay_debt', emoji: '💳' },
  { key: 'start_business', emoji: '🏪' },
  { key: 'send_money', emoji: '💸' },
  { key: 'budget_better', emoji: '📊' },
  { key: 'learn_basics', emoji: '📚' },
];

export function ProfileStep({ defaultValues, onNext, onBack }: ProfileStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [name, setName] = useState(defaultValues?.name || '');
  const [goal, setGoal] = useState(defaultValues?.primary_goal || '');

  function handleSubmit(): void {
    if (name.trim() && goal) {
      onNext({
        name: name.trim(),
        primary_goal: goal,
      });
    }
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </button>

      <h2 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
        {t('profile_title')}
      </h2>

      {/* Name input */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {t('name_label')}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('name_placeholder')}
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        />
      </div>

      {/* Goal selection */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('goal_question')}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map((g) => (
            <button
              key={g.key}
              onClick={() => setGoal(g.key)}
              className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-colors ${
                goal === g.key
                  ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20'
                  : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500'
              }`}
            >
              <span className="text-xl">{g.emoji}</span>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {t(`goal_${g.key}`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !goal}
        className="tap-target w-full rounded-lg bg-primary-500 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t('continue')}
      </button>
    </div>
  );
}
