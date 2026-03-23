import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/db/supabase';
import type { Tables } from '@/types/database.types';

type CircleRow = Tables<'savings_circles'>;
type CircleMembershipRow = Tables<'circle_members'>;

interface CirclesPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    joined?: string;
    created?: string;
  };
}

export default async function CirclesPage({ params, searchParams }: CirclesPageProps): Promise<JSX.Element> {
  const supabase = createClient();
  const isDemoMode = cookies().get('finwise_demo_mode')?.value === 'true';
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDemoMode) {
    redirect(`/${params.locale}/login`);
  }

  const { data: circles } = await supabase
    .from('savings_circles')
    .select('id, name, contribution_amount, currency_code, period, current_cycle, status, invite_code, max_members')
    .order('created_at', { ascending: false })
    .limit(24);

  const { data: memberships } = user
    ? await supabase.from('circle_members').select('circle_id').eq('user_id', user.id)
    : { data: [] as Pick<CircleMembershipRow, 'circle_id'>[] };

  const membershipSet = new Set((memberships || []).map((m: Pick<CircleMembershipRow, 'circle_id'>) => m.circle_id));

  async function createCircle(formData: FormData): Promise<void> {
    'use server';

    const supabaseServer = createClient();
    const {
      data: { user: currentUser },
    } = await supabaseServer.auth.getUser();

    if (!currentUser) {
      redirect(`/${params.locale}/login`);
    }

    const name = String(formData.get('name') || '').trim();
    const amount = Number(formData.get('amount') || 0);
    const period = String(formData.get('period') || 'weekly');

    if (!name || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const { data: inserted, error } = await supabaseServer
      .from('savings_circles')
      .insert({
        name,
        creator_id: currentUser.id,
        contribution_amount: amount,
        period,
        currency_code: 'NGN',
        status: 'forming',
      })
      .select('id')
      .single();

    if (error || !inserted?.id) {
      return;
    }

    await supabaseServer.from('circle_members').insert({
      circle_id: inserted.id,
      user_id: currentUser.id,
      payout_position: 1,
    });

    redirect(`/${params.locale}/circles?created=1`);
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Savings Circles</h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Create or join a circle to save together with trusted people.
          </p>
        </div>
        <Link
          href={`/${params.locale}/circles/join`}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Join with code
        </Link>
      </div>

      {searchParams.joined === '1' ? (
        <p className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300">
          Joined circle successfully.
        </p>
      ) : null}

      {searchParams.created === '1' ? (
        <p className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
          Circle created successfully.
        </p>
      ) : null}

      <section className="mb-8 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Create a new circle</h2>
        <form action={createCircle} className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-200">
            Circle name
            <input
              name="name"
              required
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
              placeholder="Market Women Weekly"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-200">
            Contribution amount
            <input
              name="amount"
              type="number"
              required
              min={1}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
              placeholder="5000"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-200">
            Period
            <select
              name="period"
              defaultValue="weekly"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-900"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            >
              Create circle
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">Available circles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(circles || []).map((circle: CircleRow) => {
            const isMember = membershipSet.has(circle.id);
            return (
              <div
                key={circle.id}
                className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <h3 className="font-semibold text-neutral-900 dark:text-white">{circle.name}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {circle.currency_code} {Number(circle.contribution_amount).toLocaleString()} · {circle.period}
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Invite code: {circle.invite_code}</p>
                <div className="mt-3">
                  {isMember ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      Joined
                    </span>
                  ) : (
                    <Link
                      href={`/${params.locale}/circles/join/${circle.invite_code}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                    >
                      Join this circle
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
