'use client';

import { useEffect, useState } from 'react';

export default function OfflinePage(): JSX.Element {
  const [cachedModules, setCachedModules] = useState<string[]>([]);

  useEffect(() => {
    if (!('caches' in window)) return;

    caches
      .keys()
      .then((names) => setCachedModules(names.filter((name) => name.includes('finwise'))))
      .catch(() => setCachedModules([]));
  }, []);

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
          The lessons you&apos;ve already viewed are available below.
        </p>

        <div className="mb-4 rounded-lg border border-neutral-200 bg-white p-3 text-left text-sm dark:border-neutral-700 dark:bg-neutral-800">
          {cachedModules.length === 0 ? (
            <p className="text-neutral-500 dark:text-neutral-400">No lesson cache found yet.</p>
          ) : (
            <ul className="list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
              {cachedModules.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white hover:bg-primary-600"
        >
          Reconnect
        </button>
      </div>
    </div>
  );
}
