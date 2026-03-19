-- FinWise Row Level Security Policies
-- Migration: 002_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE remittance_providers ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- Users Policies
-- ===========================================
-- Users can read their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can insert users (during signup)
CREATE POLICY "Service can insert users"
  ON users FOR INSERT
  WITH CHECK (true);

-- ===========================================
-- Conversations Policies
-- ===========================================
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
  ON conversations FOR DELETE
  USING (auth.uid() = user_id);

-- ===========================================
-- Messages Policies
-- ===========================================
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own conversations"
  ON messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );

-- ===========================================
-- Learning Content (Public Read)
-- ===========================================
CREATE POLICY "Anyone can view learning modules"
  ON learning_modules FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view lesson content"
  ON lesson_content FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view quizzes"
  ON quizzes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  USING (true);

-- ===========================================
-- User Progress Policies
-- ===========================================
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ===========================================
-- User Badges Policies
-- ===========================================
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can grant badges"
  ON user_badges FOR INSERT
  WITH CHECK (true);

-- ===========================================
-- Financial Entries Policies
-- ===========================================
CREATE POLICY "Users can view own financial entries"
  ON financial_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own financial entries"
  ON financial_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own financial entries"
  ON financial_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own financial entries"
  ON financial_entries FOR DELETE
  USING (auth.uid() = user_id);

-- ===========================================
-- Savings Goals Policies
-- ===========================================
CREATE POLICY "Users can view own savings goals"
  ON savings_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own savings goals"
  ON savings_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own savings goals"
  ON savings_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own savings goals"
  ON savings_goals FOR DELETE
  USING (auth.uid() = user_id);

-- ===========================================
-- Institutions (Public Read)
-- ===========================================
CREATE POLICY "Anyone can view verified institutions"
  ON institutions FOR SELECT
  USING (verified = true);

CREATE POLICY "Anyone can view remittance providers"
  ON remittance_providers FOR SELECT
  USING (true);
