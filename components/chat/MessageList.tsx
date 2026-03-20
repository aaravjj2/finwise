'use client';

import type { Message } from '@/types';
import { UserMessage } from '@/components/chat/UserMessage';
import { AssistantMessage } from '@/components/chat/AssistantMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { SuggestedFollowUps } from '@/components/chat/SuggestedFollowUps';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  onSendFollowUp?: (message: string) => void;
}

export function MessageList({
  messages,
  isLoading = false,
  onSendFollowUp,
}: MessageListProps): JSX.Element {
  const showTyping = isLoading && messages[messages.length - 1]?.role !== 'assistant';
  const lastAssistantIndex = [...messages]
    .map((message, index) => ({ message, index }))
    .filter(({ message }) => message.role === 'assistant')
    .at(-1)?.index;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {messages.map((message, index) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} message={message} />
        ) : (
          <div key={message.id}>
            <AssistantMessage
              message={message}
              isStreaming={isLoading && message === messages[messages.length - 1]}
            />
            {onSendFollowUp &&
              !isLoading &&
              index === lastAssistantIndex &&
              message.content.trim().length > 0 && (
                <SuggestedFollowUps message={message.content} onSelect={onSendFollowUp} />
              )}
          </div>
        )
      )}
      {showTyping && <TypingIndicator />}
    </div>
  );
}
