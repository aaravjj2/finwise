'use client';

import type { Message, CardData } from '@/types';
import { parseCardData } from '@/lib/ai/context-builder';
import { AudioPlayer } from './AudioPlayer';

interface AssistantMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function AssistantMessage({ message, isStreaming = false }: AssistantMessageProps): JSX.Element {
  const { text, card } = parseCardData(message.content);
  const cardData = message.card_data || card;
  const relativeTime = formatRelativeTime(message.created_at);

  return (
    <div data-testid="assistant-message" className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white">
        M
      </div>
      <div className="max-w-[85%] space-y-3">
        {/* Text content */}
        {text && (
          <div className="rounded-2xl rounded-tl-md border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
              {text}
              {isStreaming && <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-primary-500" />}
            </p>
          </div>
        )}

        {/* Card rendering */}
        {cardData && <CardRenderer card={cardData} />}

        {/* Audio playback and timestamp */}
        {!isStreaming && (
          <div className="flex items-center gap-2">
            {message.audio_url && text && text.length > 20 && <AudioPlayer text={text} />}
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {relativeTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatRelativeTime(createdAt: string): string {
  const timestamp = new Date(createdAt).getTime();
  const now = Date.now();
  const deltaSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (deltaSeconds < 45) return 'Just now';
  if (deltaSeconds < 3600) return `${Math.floor(deltaSeconds / 60)} min ago`;
  if (deltaSeconds < 86400) return `${Math.floor(deltaSeconds / 3600)} hr ago`;
  return `${Math.floor(deltaSeconds / 86400)} day ago`;
}

function CardRenderer({ card }: { card: CardData }): JSX.Element | null {
  switch (card.type) {
    case 'institution-list':
      return <InstitutionListCard data={card.data as { items: { name: string; rate: string; location: string; contact: string }[] }} />;
    case 'calculation':
      return <CalculationCard data={card.data as { inputs: Record<string, string | number>; result: string; explanation: string }} />;
    case 'checklist':
      return <ChecklistCard data={card.data as { title: string; items: string[] }} />;
    case 'comparison-table':
      return <ComparisonTableCard data={card.data as { headers: string[]; rows: string[][] }} />;
    case 'budget':
      return <BudgetCardRenderer data={card.data as { income: number; categories: { name: string; amount: number; percentage: number }[] }} />;
    default:
      return null;
  }
}

function InstitutionListCard({ data }: { data: { items: { name: string; rate: string; location: string; contact: string }[] } }): JSX.Element {
  return (
    <div className="space-y-2">
      {data.items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-800"
        >
          <p className="font-medium text-neutral-900 dark:text-white">{item.name}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
            <span>Rate: {item.rate}</span>
            <span>{item.location}</span>
            <span>{item.contact}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CalculationCard({ data }: { data: { inputs: Record<string, string | number>; result: string; explanation: string } }): JSX.Element {
  return (
    <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">🔢</span>
        <span className="font-medium text-primary-700 dark:text-primary-300">Calculation</span>
      </div>
      <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        {Object.entries(data.inputs).map(([key, value]) => (
          <p key={key}>
            {key}: <span className="font-medium">{value}</span>
          </p>
        ))}
      </div>
      <div className="mt-3 border-t border-primary-200 pt-3 dark:border-primary-800">
        <p className="text-lg font-bold text-primary-700 dark:text-primary-300">{data.result}</p>
        <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{data.explanation}</p>
      </div>
    </div>
  );
}

function ChecklistCard({ data }: { data: { title: string; items: string[] } }): JSX.Element {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">✅</span>
        <span className="font-medium text-neutral-900 dark:text-white">{data.title}</span>
      </div>
      <ul className="space-y-2">
        {data.items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-neutral-300 text-xs dark:border-neutral-600">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonTableCard({ data }: { data: { headers: string[]; rows: string[][] } }): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full min-w-[300px]">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800">
            {data.headers.map((header, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BudgetCardRenderer({ data }: { data: { income: number; categories: { name: string; amount: number; percentage: number }[] } }): JSX.Element {
  const totalExpenses = data.categories.reduce((sum, cat) => sum + cat.amount, 0);
  const savings = data.income - totalExpenses;
  const savingsRate = data.income > 0 ? ((savings / data.income) * 100).toFixed(0) : 0;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">💰</span>
        <span className="font-medium text-neutral-900 dark:text-white">Budget Breakdown</span>
      </div>

      {/* Income */}
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-700">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Monthly Income</span>
        <span className="font-semibold text-neutral-900 dark:text-white">${data.income.toLocaleString()}</span>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {data.categories.map((category, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-700 dark:text-neutral-300">{category.name}</span>
                <span className="text-neutral-500 dark:text-neutral-400">{category.percentage}%</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className="h-full rounded-full bg-primary-500"
                  style={{ width: `${Math.min(category.percentage, 100)}%` }}
                />
              </div>
            </div>
            <span className="w-20 text-right text-sm font-medium text-neutral-700 dark:text-neutral-300">
              ${category.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Savings Summary */}
      <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-700">
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
          Savings ({savingsRate}%)
        </span>
        <span className={`font-bold ${savings >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          ${savings.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
