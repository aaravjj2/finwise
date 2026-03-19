import { notFound } from 'next/navigation';
import { createClient } from '@/lib/db/supabase';
import { ChatContainer } from '@/components/chat/ChatContainer';
import type { Message } from '@/types';

interface ChatConversationPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default async function ChatConversationPage({
  params,
}: ChatConversationPageProps): Promise<JSX.Element> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Fetch conversation
  const { data: conversation } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!conversation) {
    notFound();
  }

  // Fetch messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', params.id)
    .order('created_at', { ascending: true });

  const initialMessages: Message[] = (messages || []).map((m) => ({
    id: m.id,
    conversation_id: m.conversation_id,
    role: m.role as 'user' | 'assistant',
    content: m.content,
    created_at: m.created_at,
    audio_url: m.audio_url,
    card_data: m.card_data,
  }));

  return <ChatContainer conversationId={params.id} initialMessages={initialMessages} />;
}
