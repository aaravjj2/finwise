import { errorResponse, okResponse, verifyApiKey } from '../../_lib/auth';

function scoreFromPhone(phone: string): number {
  const digits = phone.replace(/\D/g, '');
  const seed = digits.split('').reduce((sum, c) => sum + Number(c), 0);
  return Math.min(100, 25 + (seed % 76));
}

export async function GET(request: Request, { params }: { params: { phone: string } }): Promise<Response> {
  const auth = await verifyApiKey(request);
  if (!auth.ok) return errorResponse(auth.status, auth.error);

  const phone = decodeURIComponent(params.phone || '');
  if (!phone) return errorResponse(400, 'Phone is required');

  const literacy_score = scoreFromPhone(phone);
  const completed_modules = literacy_score > 60 ? ['savings-basics', 'smart-borrowing'] : ['savings-basics'];

  return okResponse({
    phone,
    literacy_score,
    completed_modules,
    last_active: new Date().toISOString(),
  });
}
