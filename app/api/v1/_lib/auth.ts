import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';

interface ApiKeyRow {
  id: string;
  organization_name: string;
  key_hash: string;
  key_prefix: string;
  tier: 'starter' | 'growth' | 'enterprise';
  requests_per_hour: number;
  total_requests: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getServiceClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey);
}

export type ApiAuthResult =
  | { ok: true; key: ApiKeyRow }
  | { ok: false; status: number; error: string };

export async function verifyApiKey(request: Request): Promise<ApiAuthResult> {
  const authHeader = request.headers.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token || !token.startsWith('fw_live_')) {
    return { ok: false, status: 401, error: 'Missing or invalid API key' };
  }

  const client = getServiceClient();
  if (!client) {
    return { ok: false, status: 500, error: 'API key store is not configured' };
  }

  const tokenHash = createHash('sha256').update(token).digest('hex');

  const { data, error } = await client
    .from('api_keys')
    .select('id, organization_name, key_hash, key_prefix, tier, requests_per_hour, total_requests')
    .eq('key_hash', tokenHash)
    .single();

  if (error || !data) {
    return { ok: false, status: 401, error: 'Invalid API key' };
  }

  await client
    .from('api_keys')
    .update({ total_requests: (data.total_requests || 0) + 1, last_used_at: new Date().toISOString() })
    .eq('id', data.id);

  return { ok: true, key: data as ApiKeyRow };
}

export function okResponse(data: unknown): Response {
  return Response.json({ success: true, data });
}

export function errorResponse(status: number, error: string): Response {
  return Response.json({ success: false, error }, { status });
}
