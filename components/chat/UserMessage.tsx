'use client';

import type { Message } from '@/types';

interface UserMessageProps {
  message: Message;
}

export function UserMessage({ message }: UserMessageProps): JSX.Element {
  const relativeTime = formatRelativeTime(message.created_at);

  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary-500 px-4 py-3 text-white">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className="mt-1 text-right text-xs text-primary-100">
          {relativeTime}
        </p>
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
