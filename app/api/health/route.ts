export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    ai_mode: process.env.OLLAMA_BASE_URL
      ? 'ollama'
      : process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'mock'
      ? 'anthropic'
      : 'mock',
    database: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    voice: !!process.env.ELEVENLABS_API_KEY,
    environment: process.env.NODE_ENV,
  };

  return Response.json(checks, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
