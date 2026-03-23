'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/db/supabase-browser';

interface CompleteLessonButtonProps {
  lessonId: string;
  completeLabel: string;
  savingLabel: string;
  doneLabel: string;
  errorLabel: string;
  nextHref?: string;
  nextLabel?: string;
  fallbackHref: string;
  fallbackLabel: string;
  initialCompleted?: boolean;
}

export function CompleteLessonButton({
  lessonId,
  completeLabel,
  savingLabel,
  doneLabel,
  errorLabel,
  nextHref,
  nextLabel,
  fallbackHref,
  fallbackLabel,
  initialCompleted = false,
}: CompleteLessonButtonProps): JSX.Element {
  const [isSaving, setIsSaving] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);

  async function markCompleted(): Promise<void> {
    setIsSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Demo mode may not have an authenticated user; keep local completion state.
      if (user) {
        const { error: upsertError } = await supabase.from('user_progress').upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,lesson_id' },
        );

        if (upsertError) {
          throw upsertError;
        }
      }

      setCompleted(true);
    } catch {
      setError(errorLabel);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      {!completed ? (
        <button
          type="button"
          onClick={markCompleted}
          disabled={isSaving}
          className="inline-flex items-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? savingLabel : completeLabel}
        </button>
      ) : (
        <p className="text-sm font-medium text-green-700 dark:text-green-400">{doneLabel}</p>
      )}

      {error ? <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {completed ? (
        <div className="mt-3">
          <Link
            href={nextHref || fallbackHref}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            {nextHref ? nextLabel : fallbackLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
