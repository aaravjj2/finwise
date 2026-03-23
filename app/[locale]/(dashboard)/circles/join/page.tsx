import Link from 'next/link';

interface JoinCirclePageProps {
  params: {
    locale: string;
  };
}

export default function JoinCirclePage({ params }: JoinCirclePageProps): JSX.Element {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Join a Savings Circle</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        If you received an invite code, enter it below to join your group.
      </p>

      <form className="mt-5 flex gap-2" action={`/${params.locale}/circles/join`} method="get">
        <input
          name="code"
          required
          maxLength={16}
          className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm uppercase dark:border-neutral-600 dark:bg-neutral-900"
          placeholder="AB12CD34"
        />
        <button type="submit" className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600">
          Continue
        </button>
      </form>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
        You can also open an invite link directly from a friend.
      </p>

      <div className="mt-4">
        <Link href={`/${params.locale}/circles`} className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Back to circles
        </Link>
      </div>
    </div>
  );
}
