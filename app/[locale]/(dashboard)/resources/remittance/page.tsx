import { createClient } from '@/lib/db/supabase';
import { useTranslations } from 'next-intl';

export default async function RemittancePage(): Promise<JSX.Element> {
  const supabase = createClient();

  const { data: providers } = await supabase
    .from('remittance_providers')
    .select('*')
    .order('fee_percentage', { ascending: true });

  return <RemittanceContent providers={providers || []} />;
}

function RemittanceContent({ providers }: { providers: { id: string; name: string; fee_percentage: number; flat_fee: number | null; exchange_rate_markup: number; transfer_time: string; website: string }[] }): JSX.Element {
  const t = useTranslations('resources');

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">{t('send_money')}</h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        Compare fees and find the cheapest way to send money to your family.
      </p>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Provider
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Fee
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Rate Markup
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Speed
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
            {providers.map((provider, index) => (
              <tr key={provider.id} className={index === 0 ? 'bg-green-50 dark:bg-green-900/10' : ''}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="rounded bg-green-500 px-1.5 py-0.5 text-xs font-medium text-white">
                        Best
                      </span>
                    )}
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {provider.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {provider.fee_percentage}%
                  {provider.flat_fee && ` + $${provider.flat_fee}`}
                </td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {provider.exchange_rate_markup}%
                </td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                  {provider.transfer_time}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-900/20">
        <h3 className="mb-2 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-400">
          <span>💡</span>
          Tips for Sending Money
        </h3>
        <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-400">
          <li>• Compare the total cost (fee + exchange rate markup)</li>
          <li>• Consider speed — instant transfers often cost more</li>
          <li>• Check if your recipient needs a bank account or can use mobile money</li>
          <li>• Send larger amounts less frequently to reduce fees</li>
        </ul>
      </div>
    </div>
  );
}
