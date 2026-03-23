import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase';
import { LessonReader } from '@/components/learn/LessonReader';
import { CompleteLessonButton } from '@/components/learn/CompleteLessonButton';
import { QuizContainer } from '@/components/learn/QuizContainer';

interface LessonPageProps {
  params: {
    locale: string;
    moduleSlug: string;
    lessonSlug: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps): Promise<JSX.Element> {
  const supabase = createClient();

  // Get module
  const { data: module } = await supabase
    .from('learning_modules')
    .select('*')
    .eq('slug', params.moduleSlug)
    .single();

  if (!module) {
    notFound();
  }

  // Get lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', module.id)
    .eq('slug', params.lessonSlug)
    .single();

  if (!lesson) {
    notFound();
  }

  // Get lesson content in user's language
  const { data: content } = await supabase
    .from('lesson_content')
    .select('*')
    .eq('lesson_id', lesson.id)
    .eq('language', params.locale)
    .single();

  // Fallback to English if content not available
  let lessonContent = content;
  if (!lessonContent) {
    const { data: enContent } = await supabase
      .from('lesson_content')
      .select('*')
      .eq('lesson_id', lesson.id)
      .eq('language', 'en')
      .single();
    lessonContent = enContent;
  }

  // Get all lessons for navigation
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('slug')
    .eq('module_id', module.id)
    .order('order_index', { ascending: true });

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('questions')
    .eq('lesson_id', lesson.id)
    .maybeSingle();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initiallyCompleted = false;
  if (user) {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', user.id)
      .eq('lesson_id', lesson.id)
      .maybeSingle();

    initiallyCompleted = Boolean(progress?.completed);
  }

  const lessonSlugs = (allLessons || []).map((l: { slug: string }) => l.slug);
  const currentIndex = lessonSlugs.indexOf(params.lessonSlug);
  const prevLesson = currentIndex > 0 ? lessonSlugs[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessonSlugs.length - 1 ? lessonSlugs[currentIndex + 1] : null;

  return (
    <LessonContent
      module={module}
      lesson={lesson}
      content={lessonContent}
      locale={params.locale}
      prevLesson={prevLesson || undefined}
      nextLesson={nextLesson || undefined}
      quizQuestions={Array.isArray(quiz?.questions) ? quiz.questions : []}
      initiallyCompleted={initiallyCompleted}
    />
  );
}

function LessonContent({
  module,
  lesson,
  content,
  locale,
  prevLesson,
  nextLesson,
  quizQuestions,
  initiallyCompleted,
}: {
  module: { slug: string; title_key: string };
  lesson: { id: string; title_key: string; slug: string };
  content: { title: string; content: string } | null;
  locale: string;
  prevLesson?: string;
  nextLesson?: string;
  quizQuestions: unknown[];
  initiallyCompleted: boolean;
}): JSX.Element {
  const t = useTranslations();
  const isQuizLesson = lesson.slug.endsWith('-quiz');

  const parsedQuiz = quizQuestions.filter(
    (q): q is { id: string; question: string; options: string[]; correct_index: number; explanation: string } => {
      if (!q || typeof q !== 'object') {
        return false;
      }

      const candidate = q as {
        id?: unknown;
        question?: unknown;
        options?: unknown;
        correct_index?: unknown;
        explanation?: unknown;
      };

      return (
        typeof candidate.id === 'string' &&
        typeof candidate.question === 'string' &&
        Array.isArray(candidate.options) &&
        typeof candidate.correct_index === 'number' &&
        typeof candidate.explanation === 'string'
      );
    },
  );

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          <li>
            <Link href={`/${locale}/learn`} className="hover:text-primary-600 dark:hover:text-primary-400">
              {t('learn.all_modules')}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/${locale}/learn/${module.slug}`}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {t(module.title_key)}
            </Link>
          </li>
        </ol>
      </nav>

      {/* Lesson content */}
      <LessonReader
        title={content?.title || t(lesson.title_key)}
        content={content?.content || t('learn.content_not_available')}
      />

      {isQuizLesson ? (
        <QuizContainer
          lessonId={lesson.id}
          questions={parsedQuiz}
          nextHref={nextLesson ? `/${locale}/learn/${module.slug}/${nextLesson}` : undefined}
          fallbackHref={`/${locale}/learn/${module.slug}`}
          labels={{
            questionOf: (current: number, total: number) => t('quiz.question_of', { current, total }),
            next: t('quiz.next'),
            finish: t('quiz.finish'),
            score: (value: number) => t('quiz.score', { score: value }),
            pass: t('quiz.pass'),
            fail: t('quiz.fail'),
            retry: t('quiz.retry'),
            perfect: t('quiz.perfect'),
            saving: t('common.loading'),
            continueToNext: t('learn.next'),
            doneToModule: t('learn.finish_module'),
            saveError: t('errors.generic'),
          }}
        />
      ) : (
        <CompleteLessonButton
          lessonId={lesson.id}
          completeLabel={t('common.finish')}
          savingLabel={t('common.loading')}
          doneLabel={t('learn.completed')}
          errorLabel={t('errors.generic')}
          nextHref={nextLesson ? `/${locale}/learn/${module.slug}/${nextLesson}` : undefined}
          nextLabel={t('learn.next')}
          fallbackHref={`/${locale}/learn/${module.slug}`}
          fallbackLabel={t('learn.finish_module')}
          initialCompleted={initiallyCompleted}
        />
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-700">
        {prevLesson ? (
          <Link
            href={`/${locale}/learn/${module.slug}/${prevLesson}`}
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('learn.previous')}
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/${locale}/learn/${module.slug}/${nextLesson}`}
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            {t('learn.next')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <Link
            href={`/${locale}/learn/${module.slug}`}
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            {t('learn.finish_module')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
