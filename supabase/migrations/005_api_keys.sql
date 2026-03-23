CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name text NOT NULL,
  key_hash text UNIQUE NOT NULL,
  key_prefix text NOT NULL,
  tier text DEFAULT 'starter' CHECK (tier IN ('starter', 'growth', 'enterprise')),
  requests_per_hour integer DEFAULT 100,
  total_requests bigint DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_used_at timestamptz
);
