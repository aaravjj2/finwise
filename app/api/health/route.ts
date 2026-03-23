import { aiClient } from '@/lib/ai/ollama-client';

export async function GET(): Promise<Response> {
  const ollamaAvailable = await aiClient.isOllamaAvailable();

  return Response.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      ai_mode: ollamaAvailable ? 'ollama' : 'mock',
      ollama_model: process.env.OLLAMA_MODEL || 'not configured',
      database: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      voice: !!process.env.ELEVENLABS_API_KEY,
      version: process.env.npm_package_version || '1.0.0',
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
