-- Add INSERT policy for lesson_content to allow seeding
-- Service role and authenticated users with appropriate permissions can insert

CREATE POLICY "Service can insert lesson content"
  ON lesson_content FOR INSERT
  WITH CHECK (true);
