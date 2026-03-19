'use client';

import { useTranslations } from 'next-intl';
import { ChatContainer } from '@/components/chat/ChatContainer';

const STARTER_PROMPTS = [
  'starter_1',
  'starter_2',
  'starter_3',
  'starter_4',
  'starter_5',
  'starter_6',
];

export default function ChatPage(): JSX.Element {
  const t = useTranslations('chat');

  const starters = STARTER_PROMPTS.map((key) => t(key));

  return <ChatContainer starters={starters} />;
}
