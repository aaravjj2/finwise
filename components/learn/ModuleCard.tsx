'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { LearningModule } from '@/types';

interface ModuleCardProps {
  module: LearningModule;
  isUnlocked: boolean;
  isCompleted: boolean;
  prerequisiteNames: string[];
}

export function ModuleCard({
  module,
  isUnlocked,
  isCompleted,
  prerequisiteNames,
}: ModuleCardProps): JSX.Element {
  const t = useTranslations();
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';

  const difficultyLabels: Record<number, string> = {
    1: t('learn.beginner'),
    2: t('learn.intermediate'),
    3: t('learn.advanced'),
  };

  const difficultyColors: Record<number, string> = {
    1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    2: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    3: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const content = (
    <div
      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
        isUnlocked
          ? 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-600'
          : 'border-neutral-200 bg-neutral-50 opacity-75 dark:border-neutral-700 dark:bg-neutral-800/50'
      } ${isCompleted ? 'ring-2 ring-primary-500' : ''}`}
    >
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute right-2 top-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
      )}

      {/* Lock icon */}
      {!isUnlocked && (
        <div className="absolute right-2 top-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="mb-3 text-3xl">{module.icon_emoji}</div>

      {/* Title */}
      <h3 className="mb-1 font-semibold text-neutral-900 dark:text-white">
        {t(module.title_key)}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {t(module.description_key)}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2 py-0.5 ${difficultyColors[module.difficulty]}`}>
          {difficultyLabels[module.difficulty]}
        </span>
        <span className="text-neutral-500 dark:text-neutral-400">
          {t('learn.minutes', { n: module.estimated_minutes })}
        </span>
      </div>

      {/* Locked message */}
      {!isUnlocked && prerequisiteNames.length > 0 && (
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {t('learn.locked', { module: prerequisiteNames[0] })}
        </p>
      )}
    </div>
  );

  if (isUnlocked) {
    return (
      <Link href={`/${locale}/learn/${module.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
