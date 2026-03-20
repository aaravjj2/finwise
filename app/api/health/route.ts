export async function GET() {
  const checks = {
    database: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    ai:
      process.env.ANTHROPIC_API_KEY === 'mock'
        ? 'mock_mode'
        : !!process.env.ANTHROPIC_API_KEY,
    voice: !!process.env.ELEVENLABS_API_KEY,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    status: 'ok',
  };

  return Response.json(checks);
}
