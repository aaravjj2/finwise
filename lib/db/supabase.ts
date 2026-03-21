import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient(): ReturnType<typeof createServerClient> {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Ignore - called from Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Ignore - called from Server Component
          }
        },
      },
    }
  );
}

export async function getUser(): Promise<import('@/types').User | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase.from('users').select('*').eq('id', user.id).single();

  return data;
}

export async function getUserProfile(): Promise<import('@/types').UserProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();

  if (!userData) return null;

  const { data: progress } = await supabase
    .from('user_progress')
    .select('lesson_id, lessons(module_id, learning_modules(slug))')
    .eq('user_id', user.id)
    .eq('completed', true);

  const { data: badges } = await supabase
    .from('user_badges')
    .select('badges(*)')
    .eq('user_id', user.id);

  const completedModules = [
    ...new Set(
      (progress ?? [])
        .map((p: { lessons: unknown }) => {
          const lesson = p.lessons as { learning_modules: { slug: string } } | null;
          return lesson?.learning_modules?.slug;
        })
        .filter(Boolean)
    ),
  ] as string[];

  return {
    ...userData,
    completed_modules: completedModules,
    current_module: null,
    badges: (badges ?? []).map((b) => b.badges).filter(Boolean) as import('@/types').Badge[],
    financial_health_score: 0,
  };
}
