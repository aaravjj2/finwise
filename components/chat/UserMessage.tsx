'use client';

import type { Message } from '@/types';

interface UserMessageProps {
  message: Message;
}

export function UserMessage({ message }: UserMessageProps): JSX.Element {
  return (
    <div data-testid="user-message" className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary-500 px-4 py-3 text-white">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className="mt-1 text-right text-xs text-primary-100">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
