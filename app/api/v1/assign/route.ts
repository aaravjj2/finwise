import { z } from 'zod';
import { errorResponse, okResponse, verifyApiKey } from '../_lib/auth';

const AssignSchema = z.object({
  phone: z.string().min(7),
  modules: z.array(z.string().min(1)).min(1),
});

export async function POST(request: Request): Promise<Response> {
  const auth = await verifyApiKey(request);
  if (!auth.ok) return errorResponse(auth.status, auth.error);

  const body = await request.json().catch(() => null);
  const parsed = AssignSchema.safeParse(body);
  if (!parsed.success) return errorResponse(400, 'Invalid request body');

  return okResponse({
    assigned: parsed.data.modules,
    notification_sent: true,
  });
}
