'use client';

export function TypingIndicator(): JSX.Element {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm dark:bg-primary-900/30">
        ✨
      </div>
      <div className="rounded-2xl rounded-tl-md bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
        <div className="flex gap-1">
          <span className="typing-dot h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
          <span className="typing-dot h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
          <span className="typing-dot h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500" />
        </div>
      </div>
    </div>
  );
}
