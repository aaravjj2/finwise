import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/db/supabase';
import type { Tables } from '@/types/database.types';

type CircleRow = Tables<'savings_circles'>;

interface JoinInvitePageProps {
  params: {
    locale: string;
    inviteCode: string;
  };
}

export default async function JoinInvitePage({ params }: JoinInvitePageProps): Promise<JSX.Element> {
  const supabase = createClient();
  const isDemoMode = cookies().get('finwise_demo_mode')?.value === 'true';
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDemoMode) {
    redirect(`/${params.locale}/login`);
  }

  const inviteCode = params.inviteCode.toUpperCase();
  const { data: circle } = await supabase
    .from('savings_circles')
    .select('id, name, contribution_amount, currency_code, period, invite_code, status')
    .eq('invite_code', inviteCode)
    .maybeSingle();

  async function joinCircle(): Promise<void> {
    'use server';
    const supabaseServer = createClient();
    const {
      data: { user: currentUser },
    } = await supabaseServer.auth.getUser();

    if (!currentUser || !circle?.id) {
      redirect(`/${params.locale}/circles`);
    }

    await supabaseServer.from('circle_members').upsert(
      {
        circle_id: circle.id,
        user_id: currentUser.id,
        payout_position: 99,
      },
      { onConflict: 'circle_id,user_id' },
    );

    redirect(`/${params.locale}/circles?joined=1`);
  }

  if (!circle) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Invite code not found</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Ask the group organizer to share a valid invite code.
        </p>
        <Link href={`/${params.locale}/circles`} className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
          Back to circles
        </Link>
      </div>
    );
  }

  const typedCircle = circle as CircleRow;

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Join {typedCircle.name}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Contribution: {typedCircle.currency_code} {Number(typedCircle.contribution_amount).toLocaleString()} · {typedCircle.period}
      </p>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Invite code: {typedCircle.invite_code}</p>

      <form action={joinCircle} className="mt-5">
        <button
          type="submit"
          className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
        >
          Confirm and join
        </button>
      </form>

      <Link href={`/${params.locale}/circles`} className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
        Cancel
      </Link>
    </div>
  );
}
