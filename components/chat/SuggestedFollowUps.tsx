'use client';

import { getFollowUpSuggestions } from '@/lib/ai/mock-responses';

interface SuggestedFollowUpsProps {
  message: string;
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedFollowUps({
  message,
  onSelect,
  disabled = false,
}: SuggestedFollowUpsProps): JSX.Element {
  const suggestions = getFollowUpSuggestions(message).slice(0, 3);

  return (
    <div className="ml-11 mt-2 flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs text-primary-700 transition-colors hover:bg-primary-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}