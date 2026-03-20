import { anthropic, CHAT_MODEL, DEFAULT_MAX_TOKENS } from '@/lib/ai/client';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import { buildMessageHistory } from '@/lib/ai/context-builder';
import { createClient } from '@/lib/db/supabase';
import { getMockResponse } from '@/lib/ai/mock-responses';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { Message, UserProfile } from '@/types';

const requestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
});

/**
 * Check if we're in mock mode (no real API key)
 */
function isMockMode(): boolean {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  return !apiKey || apiKey === '' || apiKey === 'mock' || apiKey === 'placeholder-key';
}

/**
 * Check if we're in demo mode (from cookie)
 */
function isDemoMode(): boolean {
  const cookieStore = cookies();
  return cookieStore.get('finwise_demo_mode')?.value === 'true';
}

/**
 * Get demo user profile
 */
function getDemoUserProfile(): UserProfile {
  return {
    id: 'demo-user-001',
    phone: '+1234567890',
    name: 'Demo User',
    language: 'en',
    country: 'NG',
    literacy_level: 3,
    literacy_description: null,
    primary_goal: 'savings',
    has_bank_account: false,
    monthly_income: 50000,
    currency: 'NGN',
    onboarding_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    completed_modules: [],
    current_module: null,
    badges: [],
    financial_health_score: 50,
  };
}

export async function POST(req: Request): Promise<Response> {
  try {
    const demoMode = isDemoMode();
    const supabase = createClient();

    // In demo mode, skip authentication
    let userId: string;
    let userProfile: UserProfile;

    if (demoMode) {
      userId = 'demo-user-001';
      userProfile = getDemoUserProfile();
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return Response.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
      }

      userId = user.id;

      // Fetch user profile
      const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();

      if (!userData) {
        return Response.json({ error: 'User not found', code: 'USER_NOT_FOUND' }, { status: 404 });
      }

      // Build user profile
      userProfile = {
        ...userData,
        completed_modules: [],
        current_module: null,
        badges: [],
        financial_health_score: 0,
      };
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid request body', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    const { message, conversationId } = parsed.data;

    // For demo mode, we don't persist to database
    let convId = conversationId || 'demo-conversation-001';
    const messages: Message[] = [];

    if (!demoMode) {
      // Get or create conversation
      if (!conversationId) {
        const { data: newConv, error: convError } = await supabase
          .from('conversations')
          .insert({
            user_id: userId,
            title: message.slice(0, 100),
          })
          .select('id')
          .single();

        if (convError || !newConv) {
          return Response.json(
            { error: 'Failed to create conversation', code: 'CONVERSATION_ERROR' },
            { status: 500 }
          );
        }
        convId = newConv.id;
      }

      // Save user message
      await supabase.from('messages').insert({
        conversation_id: convId,
        role: 'user',
        content: message,
      });

      // Fetch conversation history
      const { data: historyData } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true })
        .limit(20);

      messages.push(...(historyData || []));
    }

    const messageHistory = buildMessageHistory(messages);

    // Build system prompt
    const systemPrompt = buildSystemPrompt(userProfile);

    const encoder = new TextEncoder();
    let fullResponse = '';

    // Check if we're in mock mode (or demo mode always uses mock)
    const mockMode = isMockMode() || demoMode;

    let readableStream: ReadableStream;

    if (mockMode) {
      // Mock mode: Use pattern-matched responses with fake streaming
      const mockResponse = getMockResponse(message, userProfile.language || 'en');
      fullResponse = mockResponse;

      readableStream = new ReadableStream({
        async start(controller) {
          try {
            // Fake-stream character by character with 15ms delay using setInterval.
            await new Promise<void>((resolve) => {
              let index = 0;
              const interval = setInterval(() => {
                if (index >= mockResponse.length) {
                  clearInterval(interval);
                  resolve();
                  return;
                }

                controller.enqueue(encoder.encode(mockResponse[index]));
                index += 1;
              }, 15);
            });

            // Save assistant message after streaming completes (only if not demo mode)
            if (!demoMode) {
              await supabase.from('messages').insert({
                conversation_id: convId,
                role: 'assistant',
                content: fullResponse,
              });

              await supabase
                .from('conversations')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', convId);
            }

            controller.close();
          } catch (error) {
            console.error('Mock streaming error:', error);
            controller.error(error);
          }
        },
      });
    } else {
      // Real mode: Use Claude API with actual streaming
      const stream = await anthropic.messages.create({
        model: CHAT_MODEL,
        max_tokens: DEFAULT_MAX_TOKENS,
        system: systemPrompt,
        messages: [
          ...messageHistory,
          { role: 'user', content: message },
        ],
        stream: true,
      });

      readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (
                event.type === 'content_block_delta' &&
                event.delta.type === 'text_delta'
              ) {
                const text = event.delta.text;
                fullResponse += text;
                controller.enqueue(encoder.encode(text));
              }
            }

            // Save assistant message after streaming completes
            await supabase.from('messages').insert({
              conversation_id: convId,
              role: 'assistant',
              content: fullResponse,
            });

            // Update conversation timestamp
            await supabase
              .from('conversations')
              .update({ updated_at: new Date().toISOString() })
              .eq('id', convId);

            controller.close();
          } catch (error) {
            console.error('Streaming error:', error);
            controller.error(error);
          }
        },
      });
    }

    const headers: HeadersInit = {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    };
    if (convId) {
      headers['X-Conversation-Id'] = convId;
    }

    return new Response(readableStream, { headers });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
