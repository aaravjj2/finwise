'use client';

export default function LocalizedOfflinePage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-900">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl dark:bg-amber-900/30">
          📴
        </div>
        <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          You&apos;re Offline
        </h1>
        <p className="mb-6 max-w-sm text-neutral-600 dark:text-neutral-400">
          No internet connection. Some features may be limited, but you can still access your
          cached lessons and financial data.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white hover:bg-primary-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
