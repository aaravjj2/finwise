ALTER TABLE savings_circles ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE circle_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_create_circles"
  ON savings_circles FOR INSERT
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "creators_update_circles"
  ON savings_circles FOR UPDATE
  USING (creator_id = auth.uid());

CREATE POLICY "users_view_own_memberships"
  ON circle_members FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "users_join_forming_circle"
  ON circle_members FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND circle_id IN (
      SELECT id FROM savings_circles WHERE status IN ('forming', 'active')
    )
  );

CREATE POLICY "members_create_contributions"
  ON circle_contributions FOR INSERT
  WITH CHECK (
    from_user_id = auth.uid()
    AND circle_id IN (SELECT circle_id FROM circle_members WHERE user_id = auth.uid())
  );
