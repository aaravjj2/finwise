'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

interface AssessmentStepProps {
  defaultValues?: {
    literacy_level?: number;
    has_bank_account?: boolean;
    assessment_answers?: Record<string, string>;
  };
  onNext: (data: {
    literacy_level: number;
    has_bank_account: boolean;
    primary_goal: string;
    assessment_answers: Record<string, string>;
  }) => void;
  onBack: () => void;
}

export function AssessmentStep({ defaultValues, onNext, onBack }: AssessmentStepProps): JSX.Element {
  const t = useTranslations('onboarding');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(defaultValues?.assessment_answers || {});

  const questions = useMemo(
    () => [
      {
        key: 'bank_account',
        prompt: 'Do you currently have a bank account?',
        options: ['Yes', 'No', 'I have mobile money'],
      },
      {
        key: 'saving_method',
        prompt: 'How do you usually save money?',
        options: ['Bank', 'Cash at home', 'Mobile money', "I don't save yet"],
      },
      {
        key: 'loan_history',
        prompt: 'Have you ever taken a loan?',
        options: ['Yes, from a bank', 'Yes, from family or informal', 'No, never'],
      },
      {
        key: 'remittance',
        prompt: 'Do you send or receive money to family in another area?',
        options: ['Yes, often', 'Sometimes', 'No'],
      },
      {
        key: 'main_goal',
        prompt: 'What is your main financial goal right now?',
        options: [
          'Save more money',
          'Borrow safely',
          'Understand money better',
          'Start a business',
          'Protect what I have',
        ],
      },
    ],
    []
  );

  const question = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  function toLiteracyLevel(nextAnswers: Record<string, string>): number {
    let score = 1;
    if ((nextAnswers.bank_account || '').includes('Yes')) score += 1;
    if ((nextAnswers.saving_method || '').includes('Bank') || (nextAnswers.saving_method || '').includes('Mobile')) score += 1;
    if ((nextAnswers.loan_history || '').includes('bank')) score += 1;
    if ((nextAnswers.main_goal || '').includes('Understand')) score += 1;
    return Math.max(1, Math.min(5, score));
  }

  function handleSelect(option: string): void {
    if (!question) return;
    const nextAnswers = { ...answers, [question.key]: option };
    setAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }

    const literacy = toLiteracyLevel(nextAnswers);
    onNext({
      literacy_level: literacy,
      has_bank_account: (nextAnswers.bank_account || '').startsWith('Yes'),
      primary_goal: nextAnswers.main_goal || 'Understand money better',
      assessment_answers: nextAnswers,
    });
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
        {t('assessment_title')}
      </h2>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        {t('assessment_subtitle')}
      </p>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <div className="h-full rounded-full bg-primary-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">{question?.prompt || ''}</p>
        <div className="space-y-2">
          {(question?.options || []).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm text-neutral-800 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
