import { type ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 text-3xl">
              💰
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">FinWise</h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Your AI Financial Coach
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
