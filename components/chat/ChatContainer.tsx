'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useChat } from '@/hooks/useChat';
import { MessageList } from '@/components/chat/MessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import type { Message } from '@/types';

interface ChatContainerProps {
  conversationId?: string;
  initialMessages?: Message[];
  starters?: string[];
}

export function ChatContainer({
  conversationId,
  initialMessages = [],
  starters = [],
}: ChatContainerProps): JSX.Element {
  const t = useTranslations('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, error, sendMessage, clearError } = useChat({
    conversationId,
    initialMessages,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const showStarters = messages.length === 0 && starters.length > 0;

  return (
    <div className="flex h-screen flex-col lg:h-auto lg:min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-xl dark:bg-primary-900/30">
            👋
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
                💰
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {t('welcome_title')}
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {t('welcome_subtitle')}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {t('try_asking')}
              </p>
              {starters.map((starter, index) => (
                <button
                  key={index}
                  data-testid="suggestion-chip"
                  onClick={() => sendMessage(starter)}
                  className="w-full rounded-lg border border-neutral-200 bg-white p-3 text-left text-sm text-neutral-700 transition-colors hover:border-primary-300 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-primary-600 dark:hover:bg-primary-900/20"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
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
  );
}
