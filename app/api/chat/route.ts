import { anthropic, CHAT_MODEL, DEFAULT_MAX_TOKENS } from '@/lib/ai/client';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import { buildMessageHistory } from '@/lib/ai/context-builder';
import { createClient } from '@/lib/db/supabase';
import { z } from 'zod';
import type { Message, UserProfile } from '@/types';

const requestSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
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

    // Fetch user profile
    const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();

    if (!userData) {
      return Response.json({ error: 'User not found', code: 'USER_NOT_FOUND' }, { status: 404 });
    }

    // Build user profile
    const userProfile: UserProfile = {
      ...userData,
      completed_modules: [],
      current_module: null,
      badges: [],
      financial_health_score: 0,
    };

    // Get or create conversation
    let convId = conversationId;
    if (!convId) {
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
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

    const messages: Message[] = historyData || [];
    const messageHistory = buildMessageHistory(messages);

    // Build system prompt
    const systemPrompt = buildSystemPrompt(userProfile);

    // Create streaming response
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

    // Return as ReadableStream
    const encoder = new TextEncoder();
    let fullResponse = '';

    const readableStream = new ReadableStream({
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
