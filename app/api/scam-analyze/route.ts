import { analyzeScamRisk } from '@/lib/ai/mock-scam-analyzer'
import { z } from 'zod'

const RequestSchema = z.object({
  text: z.string().min(10).max(5000).optional(),
  offer: z.string().min(10).max(5000).optional()
}).refine((value) => Boolean(value.text || value.offer), {
  message: 'Either text or offer is required'
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

  const inputText = parsed.data.text || parsed.data.offer || ''

  await new Promise((resolve) => setTimeout(resolve, 1500))
  const analysis = analyzeScamRisk(inputText)

  return Response.json(analysis)
}
