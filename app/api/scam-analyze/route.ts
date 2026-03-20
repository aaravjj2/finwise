import { anthropic, ANALYSIS_MODEL, SCAM_ANALYSIS_MAX_TOKENS } from '@/lib/ai/client';
import { buildScamDetectionPrompt } from '@/lib/ai/tools';
import { createClient } from '@/lib/db/supabase';
import { analyzeScamRisk } from '@/lib/ai/mock-scam-analyzer';
import { z } from 'zod';

const requestSchema = z.object({
  offer: z.string().min(10).max(5000),
});

/**
 * Check if we're in mock mode (no real API key)
 */
function isMockMode(): boolean {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  return !apiKey || apiKey === '' || apiKey === 'mock' || apiKey === 'placeholder-key';
}

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

    const { offer } = parsed.data;

    // Get user's country
    const { data: userData } = await supabase
      .from('users')
      .select('country')
      .eq('id', user.id)
      .single();

    const country = userData?.country || 'NG';

    // Check if we're in mock mode
    if (isMockMode()) {
      // Use rule-based scam analyzer
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const analysis = analyzeScamRisk(offer);
      return Response.json(analysis);
    }

    // Real mode: Use Claude API
    const prompt = buildScamDetectionPrompt(offer, country);

    const response = await anthropic.messages.create({
      model: ANALYSIS_MODEL,
      max_tokens: SCAM_ANALYSIS_MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    if (!content || content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    try {
      const analysis = JSON.parse(content.text);
      return Response.json(analysis);
    } catch {
      return Response.json(
        { error: 'Failed to parse analysis', code: 'PARSE_ERROR' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Scam analysis error:', error);
    return Response.json(
      { error: 'Analysis failed', code: 'ANALYSIS_ERROR' },
      { status: 500 }
    );
  }
}
