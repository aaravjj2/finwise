import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase';

interface ModulePageProps {
  params: {
    locale: string;
    moduleSlug: string;
  };
}

export default async function ModulePage({ params }: ModulePageProps): Promise<JSX.Element> {
  const supabase = createClient();

  const { data: module } = await supabase
    .from('learning_modules')
    .select('*')
    .eq('slug', params.moduleSlug)
    .single();

  if (!module) {
    notFound();
  }

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', module.id)
    .order('order_index', { ascending: true });

  return (
    <ModuleContent
      module={module}
      lessons={lessons || []}
      locale={params.locale}
    />
  );
}

function ModuleContent({
  module,
  lessons,
  locale,
}: {
  module: { slug: string; title_key: string; description_key: string; icon_emoji: string; estimated_minutes: number };
  lessons: { slug: string; title_key: string; estimated_minutes: number }[];
  locale: string;
}): JSX.Element {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-2xl">
      {/* Back button */}
      <Link
        href={`/${locale}/learn`}
        className="mb-4 inline-flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('learn.back_to_modules')}
      </Link>

      {/* Module header */}
      <div className="mb-6 rounded-xl bg-primary-50 p-6 dark:bg-primary-900/20">
        <div className="mb-2 text-4xl">{module.icon_emoji}</div>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          {t(module.title_key)}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">{t(module.description_key)}</p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {t('learn.minutes', { n: module.estimated_minutes })}
        </p>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {t('learn.lessons')}
        </h2>
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/${locale}/learn/${module.slug}/${lesson.slug}`}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="font-medium text-neutral-900 dark:text-white">{t(lesson.title_key)}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('learn.minutes', { n: lesson.estimated_minutes })}
              </p>
            </div>
            <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
