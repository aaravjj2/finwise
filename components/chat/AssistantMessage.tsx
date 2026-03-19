'use client';

import type { Message, CardData } from '@/types';
import { parseCardData } from '@/lib/ai/context-builder';

interface AssistantMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function AssistantMessage({ message, isStreaming = false }: AssistantMessageProps): JSX.Element {
  const { text, card } = parseCardData(message.content);
  const cardData = message.card_data || card;

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm dark:bg-primary-900/30">
        ✨
      </div>
      <div className="max-w-[85%] space-y-3">
        {/* Text content */}
        {text && (
          <div className="rounded-2xl rounded-tl-md bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
              {text}
              {isStreaming && <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-primary-500" />}
            </p>
          </div>
        )}

        {/* Card rendering */}
        {cardData && <CardRenderer card={cardData} />}

        {/* Timestamp */}
        {!isStreaming && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  );
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
