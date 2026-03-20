import { getTranslations } from 'next-intl/server';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { createClient } from '@/lib/db/supabase';

const STARTER_PROMPTS = [
  'starter_1',
  'starter_2',
  'starter_3',
  'starter_4',
  'starter_5',
  'starter_6',
];

interface ChatPageProps {
  params: {
    locale: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps): Promise<JSX.Element> {
  const t = await getTranslations('chat');
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let conversations: { id: string; title: string | null; updated_at: string }[] = [];
  if (user) {
    const { data } = await supabase
      .from('conversations')
      .select('id,title,updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(30);
    conversations = data || [];
  }

  const starters = STARTER_PROMPTS.map((key) => t(key));

  return <ChatContainer starters={starters} conversations={conversations} />;
}
