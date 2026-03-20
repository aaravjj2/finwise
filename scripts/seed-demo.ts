import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const supabase = createClient(url, serviceRole);

async function seedDemo(): Promise<void> {
  const phone = '+2348000000000';
  const { data: existing } = await supabase.from('users').select('id').eq('phone', phone).maybeSingle();

  let userId = existing?.id as string | undefined;
  if (!userId) {
    userId = crypto.randomUUID();
    await supabase.from('users').insert({
      id: userId,
      phone,
      name: 'Amara',
      language: 'en',
      country: 'NG',
      literacy_level: 3,
      primary_goal: 'save_more_money',
      has_bank_account: true,
      onboarding_completed: true,
      currency: 'USD',
    });
  }

  await supabase.from('financial_entries').delete().eq('user_id', userId);
  await supabase.from('savings_goals').delete().eq('user_id', userId);
  await supabase.from('conversations').delete().eq('user_id', userId);
  await supabase.from('user_progress').delete().eq('user_id', userId);

  const today = new Date();
  const entries = [] as Array<Record<string, unknown>>;

  for (let monthOffset = 0; monthOffset < 3; monthOffset += 1) {
    const base = new Date(today.getFullYear(), today.getMonth() - monthOffset, 5);
    entries.push({
      user_id: userId,
      type: 'income',
      amount: 180,
      currency: 'USD',
      category: 'salary',
      description: 'Market income',
      date: base.toISOString().slice(0, 10),
    });
    entries.push({
      user_id: userId,
      type: 'expense',
      amount: 70,
      currency: 'USD',
      category: 'food',
      description: 'Food and groceries',
      date: new Date(base.getFullYear(), base.getMonth(), 9).toISOString().slice(0, 10),
    });
    entries.push({
      user_id: userId,
      type: 'expense',
      amount: 35,
      currency: 'USD',
      category: 'transport',
      description: 'Transport costs',
      date: new Date(base.getFullYear(), base.getMonth(), 13).toISOString().slice(0, 10),
    });
    entries.push({
      user_id: userId,
      type: 'expense',
      amount: 30,
      currency: 'USD',
      category: 'housing',
      description: 'Rent and utilities',
      date: new Date(base.getFullYear(), base.getMonth(), 18).toISOString().slice(0, 10),
    });
    entries.push({
      user_id: userId,
      type: 'income',
      amount: 15,
      currency: 'USD',
      category: 'remittance',
      description: 'Support from family',
      date: new Date(base.getFullYear(), base.getMonth(), 20).toISOString().slice(0, 10),
    });
  }

  await supabase.from('financial_entries').insert(entries);

  await supabase.from('savings_goals').insert({
    user_id: userId,
    name: 'School fees',
    target_amount: 200,
    current_amount: 130,
    currency: 'USD',
    type: 'education',
    completed: false,
  });

  const { data: modules } = await supabase
    .from('learning_modules')
    .select('id,slug')
    .in('slug', ['savings-basics', 'sending-money-home', 'smart-borrowing']);

  if (modules) {
    for (const mod of modules) {
      const { data: lessons } = await supabase.from('lessons').select('id').eq('module_id', mod.id);
      if (!lessons || lessons.length === 0) continue;

      for (const lesson of lessons) {
        await supabase.from('user_progress').upsert({
          user_id: userId,
          lesson_id: lesson.id,
          completed: mod.slug !== 'smart-borrowing',
          quiz_score: mod.slug === 'smart-borrowing' ? 40 : 100,
          completed_at: mod.slug === 'smart-borrowing' ? null : new Date().toISOString(),
        });
      }
    }
  }

  const conversations = [
    'How can I save from irregular income in Lagos?',
    'Is this loan from a moneylender safe?',
    'How do I open my first savings account?',
    'What is the cheapest way to send money to Abuja?',
    'How can I budget for school fees?'
  ];

  for (const title of conversations) {
    const { data: conversation } = await supabase
      .from('conversations')
      .insert({ user_id: userId, title })
      .select('id')
      .single();

    if (!conversation) continue;

    await supabase.from('messages').insert([
      {
        conversation_id: conversation.id,
        role: 'user',
        content: title,
      },
      {
        conversation_id: conversation.id,
        role: 'assistant',
        content:
          'Great question. Let us look at the safest low-fee option and build a simple step-by-step plan for your Nigerian context.',
      },
    ]);
  }

  const { data: allBadges } = await supabase.from('badges').select('id').limit(8);
  if (allBadges?.length) {
    await supabase
      .from('user_badges')
      .insert(allBadges.map((badge) => ({ user_id: userId, badge_id: badge.id })))
      .select('id');
  }

  process.stdout.write(`Demo account seeded for user ${userId}\n`);
}

seedDemo().catch((error) => {
  console.error(error);
  process.exit(1);
});
