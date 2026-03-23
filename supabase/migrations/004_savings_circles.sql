CREATE TABLE savings_circles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  creator_id uuid REFERENCES users(id) ON DELETE CASCADE,
  contribution_amount numeric NOT NULL,
  currency_code text DEFAULT 'NGN',
  period text NOT NULL CHECK (period IN ('weekly', 'biweekly', 'monthly')),
  max_members integer DEFAULT 12,
  current_cycle integer DEFAULT 1,
  status text DEFAULT 'forming' CHECK (status IN ('forming', 'active', 'completed', 'cancelled')),
  invite_code text UNIQUE DEFAULT substring(md5(random()::text), 1, 8),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE circle_members (
  circle_id uuid REFERENCES savings_circles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  payout_position integer NOT NULL,
  has_received_payout boolean DEFAULT false,
  total_contributed numeric DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (circle_id, user_id)
);

CREATE TABLE circle_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id uuid REFERENCES savings_circles(id),
  from_user_id uuid REFERENCES users(id),
  to_user_id uuid REFERENCES users(id),
  cycle integer NOT NULL,
  amount numeric NOT NULL,
  confirmed_by uuid[] DEFAULT '{}',
  disputed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE savings_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "members_see_own_circles" ON savings_circles
  FOR SELECT USING (
    id IN (SELECT circle_id FROM circle_members WHERE user_id = auth.uid())
    OR creator_id = auth.uid()
  );

CREATE POLICY "anyone_can_view_forming_circles" ON savings_circles
  FOR SELECT USING (status = 'forming');

CREATE POLICY "members_see_contributions" ON circle_contributions
  FOR SELECT USING (
    circle_id IN (SELECT circle_id FROM circle_members WHERE user_id = auth.uid())
  );
