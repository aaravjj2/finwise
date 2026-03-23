import { z } from 'zod';
import { errorResponse, okResponse, verifyApiKey } from '../_lib/auth';

const AssessSchema = z.object({
  phone: z.string().min(7),
});

function scoreFromPhone(phone: string): { literacy_score: number; level: 1 | 2 | 3 | 4 | 5 } {
  const digits = phone.replace(/\D/g, '');
  const seed = digits.split('').reduce((sum, c) => sum + Number(c), 0);
  const literacy_score = Math.min(100, 25 + (seed % 76));
  const level = Math.min(5, Math.max(1, Math.ceil(literacy_score / 20))) as 1 | 2 | 3 | 4 | 5;
  return { literacy_score, level };
}

export async function POST(request: Request): Promise<Response> {
  const auth = await verifyApiKey(request);
  if (!auth.ok) return errorResponse(auth.status, auth.error);

  const body = await request.json().catch(() => null);
  const parsed = AssessSchema.safeParse(body);
  if (!parsed.success) return errorResponse(400, 'Invalid request body');

  const { literacy_score, level } = scoreFromPhone(parsed.data.phone);

  const recommended_modules =
    level <= 2
      ? ['savings-basics', 'smart-borrowing', 'protection']
      : level <= 4
      ? ['smart-borrowing', 'remittance', 'business']
      : ['business', 'future', 'protection'];

  return okResponse({ literacy_score, level, recommended_modules });
}
