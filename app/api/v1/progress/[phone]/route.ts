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

  const score = scoreFromPhone(phone);
  const completed = score > 65 ? ['savings-basics', 'smart-borrowing', 'protection'] : ['savings-basics'];
  const pending = ['remittance', 'business', 'future'].filter((m) => !completed.includes(m));

  return okResponse({ completed, pending, score });
}
