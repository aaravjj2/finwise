import { aiClient } from '@/lib/ai/ollama-client'
import { z } from 'zod'

const RequestSchema = z.object({
  message: z.string().min(1).max(2000),
  conversationId: z.string().uuid().nullish(),
  language: z.string().default('en'),
  userId: z.string().uuid().nullish()
})

export async function POST(req: Request): Promise<Response> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = RequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }

  const { message, language } = parsed.data

  const messages = [
    {
      role: 'system' as const,
      content:
        `You are Maya, a warm financial literacy coach. Always respond in ${language}. ` +
        'Be concise (under 200 words). Use local analogies. Never recommend specific products by name.'
    },
    { role: 'user' as const, content: message }
  ]

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const encoder = new TextEncoder()
        for await (const chunk of aiClient.streamChat(messages, language)) {
          controller.enqueue(encoder.encode(chunk))
        }
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-AI-Mode': (await aiClient.isOllamaAvailable()) ? 'ollama' : 'mock'
    }
  })
}
