import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/db/supabase';
import { HealthScore } from '@/components/dashboard/HealthScore';
import { MonthlySummary } from '@/components/dashboard/MonthlySummary';
import { GoalCard } from '@/components/dashboard/GoalCard';
import { AddEntryModal } from '@/components/dashboard/AddEntryModal';
import type { FinancialEntry, SavingsGoal } from '@/types';

interface UserDashboardData {
  monthlySavings: number;
  monthlyIncome: number;
  hasActiveSavingsGoal: boolean;
  entriesThisMonth: number;
  lessonsCompleted: number;
}

export default async function DashboardPage(): Promise<JSX.Element> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  // Get current month's entries
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: entries } = await supabase
    .from('financial_entries')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', startOfMonth.toISOString().split('T')[0])
    .order('date', { ascending: false });

  const { data: goals } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', user.id)
    .eq('completed', false)
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: userData } = await supabase
    .from('users')
    .select('currency')
    .eq('id', user.id)
    .single();

  const { count: lessonsCompletedCount } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('completed', true);

  const currency = userData?.currency || 'USD';

  // Calculate totals
  const totalIncome = (entries || [])
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalExpenses = (entries || [])
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const savings = totalIncome - totalExpenses;
  const scoreData: UserDashboardData = {
    monthlySavings: Math.max(0, savings),
    monthlyIncome: totalIncome,
    hasActiveSavingsGoal: (goals?.length || 0) > 0,
    entriesThisMonth: entries?.length || 0,
    lessonsCompleted: lessonsCompletedCount || 0,
  };

  const { score: healthScore, breakdown } = calculateScore(scoreData);

  return (
    <DashboardContent
      healthScore={healthScore}
      scoreBreakdown={breakdown}
      totalIncome={totalIncome}
      totalExpenses={totalExpenses}
      savings={savings}
      currency={currency}
      goals={(goals || []) as SavingsGoal[]}
      recentEntries={(entries || []).slice(0, 5) as FinancialEntry[]}
    />
  );
}

function calculateScore(data: UserDashboardData): {
  score: number;
  breakdown: { savings: number; goals: number; logging: number; lessons: number };
} {
  const savingsRate = data.monthlySavings / Math.max(data.monthlyIncome, 1);
  const savingsPoints = Math.min(30, Math.round(savingsRate * 100));
  const goalsPoints = data.hasActiveSavingsGoal ? 20 : 0;
  const loggingPoints = Math.min(20, data.entriesThisMonth * 2);
  const lessonsPoints = Math.min(30, data.lessonsCompleted * 5);

  return {
    score: Math.min(100, savingsPoints + goalsPoints + loggingPoints + lessonsPoints),
    breakdown: {
      savings: savingsPoints,
      goals: goalsPoints,
      logging: loggingPoints,
      lessons: lessonsPoints,
    },
  };
}

function DashboardContent({
  healthScore,
  scoreBreakdown,
  totalIncome,
  totalExpenses,
  savings,
  currency,
  goals,
  recentEntries,
}: {
  healthScore: number;
  scoreBreakdown: { savings: number; goals: number; logging: number; lessons: number };
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  currency: string;
  goals: SavingsGoal[];
  recentEntries: FinancialEntry[];
}): JSX.Element {
  const t = useTranslations('dashboard');

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t('title')}</h1>
        <AddEntryModal currency={currency} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <HealthScore score={healthScore} breakdown={scoreBreakdown} />
        <MonthlySummary
          income={totalIncome}
          expenses={totalExpenses}
          savings={savings}
          currency={currency}
        />
      </div>

      {goals.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">
            {t('your_goals')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      )}

      {recentEntries.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">
            {t('recent')}
          </h2>
          <div className="space-y-2">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      entry.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {entry.type === 'income' ? '↑' : '↓'}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {entry.category}
                    </p>
                    <p className="text-xs text-neutral-500">{entry.description || entry.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    entry.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {entry.type === 'income' ? '+' : '-'}
                  {formatCurrency(entry.amount, currency)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
