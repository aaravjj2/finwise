'use client';

import type { Message } from '@/types';
import { UserMessage } from '@/components/chat/UserMessage';
import { AssistantMessage } from '@/components/chat/AssistantMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading = false }: MessageListProps): JSX.Element {
  const showTyping = isLoading && messages[messages.length - 1]?.role !== 'assistant';

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <AssistantMessage key={message.id} message={message} isStreaming={isLoading && message === messages[messages.length - 1]} />
        )
      )}
      {showTyping && <TypingIndicator />}
    </div>
  );
}
