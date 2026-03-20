'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { MessageList } from '@/components/chat/MessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import type { Message } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';

interface ChatContainerProps {
  conversationId?: string;
  initialMessages?: Message[];
  starters?: string[];
  conversations?: { id: string; title: string | null; updated_at: string }[];
}

export function ChatContainer({
  conversationId,
  initialMessages = [],
  starters = [],
  conversations = [],
}: ChatContainerProps): JSX.Element {
  const t = useTranslations('chat');
  const params = useParams();
  const locale = params.locale as string;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState('there');

  const { messages, isLoading, error, sendMessage, clearError } = useChat({
    conversationId,
    initialMessages,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const raw = localStorage.getItem('finwise_demo_user');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { name?: string };
      if (parsed.name) setDisplayName(parsed.name);
    } catch {
      // Ignore invalid local demo payloads.
    }
  }, []);

  const showStarters = messages.length === 0 && starters.length > 0;

  return (
    <div className="flex h-screen lg:h-auto lg:min-h-screen">
      <aside className="hidden w-72 flex-shrink-0 border-r border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 lg:flex lg:flex-col">
        <Link
          href={`/${locale}/chat`}
          className="mb-4 rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-600"
        >
          {t('new_chat')}
        </Link>
        <div className="space-y-2 overflow-y-auto">
          {conversations.map((conversation) => {
            const active = conversation.id === conversationId;
            return (
              <Link
                key={conversation.id}
                href={`/${locale}/chat/${conversation.id}`}
                className={`block rounded-lg border px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'border-primary-300 bg-primary-50 text-primary-800 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800'
                }`}
              >
                <p className="truncate font-medium">
                  {conversation.title?.trim() || t('new_chat')}
                </p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {format(new Date(conversation.updated_at), 'MMM d')}
                </p>
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="flex h-screen flex-1 flex-col lg:h-auto lg:min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-base font-semibold text-white">
            M
          </div>
          <div>
            <h1 className="font-semibold text-neutral-900 dark:text-white">Maya</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t('maya_subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {showStarters ? (
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-4xl dark:bg-primary-900/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">M</span>
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Hi {displayName}! I&apos;m Maya, your financial coach.
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                What would you like to learn about today?
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {t('try_asking')}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {starters.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(starter)}
                  className="w-full rounded-full border border-neutral-200 bg-white px-3 py-2 text-left text-xs text-neutral-700 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                >
                  {starter}
                </button>
              ))}
              </div>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} onSendFollowUp={sendMessage} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="mx-4 mb-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-700 hover:text-red-800 dark:text-red-300">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-neutral-200 bg-white p-4 safe-bottom dark:border-neutral-700 dark:bg-neutral-900">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
      </div>
    </div>
  );
}
