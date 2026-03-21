import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase';
import { ModuleGrid } from '@/components/learn/ModuleGrid';
import type { LearningModule } from '@/types';

export default async function LearnPage(): Promise<JSX.Element> {
  const supabase = createClient();

  const { data: modules } = await supabase
    .from('learning_modules')
    .select('*')
    .order('order_index', { ascending: true });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let completedModules: string[] = [];

  if (user) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('lesson_id, lessons(module_id, learning_modules(slug))')
      .eq('user_id', user.id)
      .eq('completed', true);

    completedModules = [
      ...new Set(
        (progress || [])
          .map((p: { lessons: unknown }) => {
            const lesson = p.lessons as { learning_modules: { slug: string } } | null;
            return lesson?.learning_modules?.slug;
          })
          .filter(Boolean)
      ),
    ] as string[];
  }

  return (
    <div className="mx-auto max-w-4xl">
      <LearnHeader />
      <ModuleGrid
        modules={(modules || []) as LearningModule[]}
        completedModules={completedModules}
      />
    </div>
  );
}

function LearnHeader(): JSX.Element {
  const t = useTranslations('learn');

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t('all_modules')}</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{t('your_progress')}</p>
    </div>
  );
}
