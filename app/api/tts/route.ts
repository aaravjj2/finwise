import { textToSpeech } from '@/lib/voice/elevenlabs';
import { isTTSAvailable } from '@/lib/ai/mock-tts';
import { z } from 'zod';

const requestSchema = z.object({
  text: z.string().min(1).max(5000),
  voiceId: z.string().optional(),
});

export async function POST(req: Request): Promise<Response> {
  try {
    // Check if TTS is available
    if (!isTTSAvailable()) {
      return Response.json(
        { error: 'TTS not configured', code: 'TTS_NOT_AVAILABLE', available: false },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid request body', code: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    const { text, voiceId } = parsed.data;

    const audioBuffer = await textToSpeech(text, voiceId);

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return Response.json(
      { error: 'Failed to generate speech', code: 'TTS_ERROR' },
      { status: 500 }
    );
  }
}
