'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { createClient } from '@/lib/db/supabase-browser';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

interface QuizContainerProps {
  lessonId: string;
  questions: QuizQuestion[];
  labels: {
    questionOf: (current: number, total: number) => string;
    next: string;
    finish: string;
    score: (value: number) => string;
    pass: string;
    fail: string;
    retry: string;
    perfect: string;
    saving: string;
    continueToNext: string;
    doneToModule: string;
    saveError: string;
  };
  passThreshold?: number;
  nextHref?: string;
  fallbackHref: string;
}

export function QuizContainer({
  lessonId,
  questions,
  labels,
  passThreshold = 70,
  nextHref,
  fallbackHref,
}: QuizContainerProps): JSX.Element {
  const effectiveQuestions = useMemo<QuizQuestion[]>(
    () =>
      questions.length > 0
        ? questions
        : [
            {
              id: 'empty',
              question: '',
              options: [],
              correct_index: 0,
              explanation: '',
            },
          ],
    [questions],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const current = effectiveQuestions[currentIndex] || effectiveQuestions[0]!;
  const hasEnded = submitted && currentIndex === effectiveQuestions.length - 1;

  const score = useMemo(() => {
    if (!hasEnded) {
      return 0;
    }

    let correct = 0;
    for (let i = 0; i < effectiveQuestions.length; i += 1) {
      if (answers[i] === effectiveQuestions[i]?.correct_index) {
        correct += 1;
      }
    }
    return Math.round((correct / effectiveQuestions.length) * 100);
  }, [answers, hasEnded, effectiveQuestions]);

  const passed = score >= passThreshold;

  function submitCurrent(): void {
    if (selectedOption === null) {
      return;
    }

    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = selectedOption;
    setAnswers(nextAnswers);

    if (currentIndex < effectiveQuestions.length - 1) {
      setCurrentIndex((idx) => idx + 1);
      setSelectedOption(nextAnswers[currentIndex + 1] ?? null);
      return;
    }

    setSubmitted(true);
  }

  async function persistCompletion(): Promise<void> {
    setSaving(true);
    setSaveError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase.from('user_progress').upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            quiz_score: score,
            completed_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,lesson_id' },
        );

        if (error) {
          throw error;
        }
      }
    } catch {
      setSaveError(labels.saveError);
      setSaving(false);
      return;
    }

    setSaving(false);
  }

  if (questions.length === 0) {
    return <div />;
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{labels.score(score)}</h2>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          {score === 100 ? labels.perfect : passed ? labels.pass : labels.fail}
        </p>

        {!passed ? (
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setCurrentIndex(0);
              setAnswers([]);
              setSelectedOption(null);
            }}
            className="mt-4 inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            {labels.retry}
          </button>
        ) : (
          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={persistCompletion}
              disabled={saving}
              className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? labels.saving : labels.finish}
            </button>
            {saveError ? <p className="text-sm text-red-600 dark:text-red-400">{saveError}</p> : null}
            {!saving && !saveError ? (
              <div>
                <Link
                  href={nextHref || fallbackHref}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  {nextHref ? labels.continueToNext : labels.doneToModule}
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  const selected = answers[currentIndex] ?? selectedOption;

  return (
    <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {labels.questionOf(currentIndex + 1, questions.length)}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-white">{current.question}</h2>

      <div className="mt-4 space-y-2">
        {current.options.map((option, idx) => (
          <button
            key={current.id + String(idx)}
            type="button"
            onClick={() => setSelectedOption(idx)}
            className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
              selected === idx
                ? 'border-primary-500 bg-primary-50 text-primary-900 dark:bg-primary-900/30 dark:text-primary-200'
                : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={submitCurrent}
        disabled={selectedOption === null}
        className="mt-4 inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {currentIndex === effectiveQuestions.length - 1 ? labels.finish : labels.next}
      </button>
    </div>
  );
}
