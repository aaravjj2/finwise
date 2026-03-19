-- FinWise Database Schema
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- Users Table
-- ===========================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100),
  language VARCHAR(5) NOT NULL DEFAULT 'en',
  country VARCHAR(2) NOT NULL DEFAULT 'NG',
  literacy_level SMALLINT NOT NULL DEFAULT 1 CHECK (literacy_level BETWEEN 1 AND 5),
  literacy_description TEXT,
  primary_goal TEXT,
  has_bank_account BOOLEAN NOT NULL DEFAULT false,
  monthly_income DECIMAL(12, 2),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===========================================
-- Conversations Table
-- ===========================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_updated_at ON conversations(updated_at DESC);

-- ===========================================
-- Messages Table
-- ===========================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  audio_url TEXT,
  card_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- ===========================================
-- Learning Modules Table
-- ===========================================
CREATE TABLE learning_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title_key VARCHAR(255) NOT NULL,
  description_key VARCHAR(255) NOT NULL,
  difficulty SMALLINT NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  estimated_minutes SMALLINT NOT NULL,
  icon_emoji VARCHAR(10) NOT NULL,
  order_index SMALLINT NOT NULL,
  prerequisites TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_learning_modules_order ON learning_modules(order_index);

-- ===========================================
-- Lessons Table
-- ===========================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES learning_modules(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  title_key VARCHAR(255) NOT NULL,
  order_index SMALLINT NOT NULL,
  estimated_minutes SMALLINT NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(module_id, slug)
);

CREATE INDEX idx_lessons_module_id ON lessons(module_id);

-- ===========================================
-- Lesson Content Table (multilingual)
-- ===========================================
CREATE TABLE lesson_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  language VARCHAR(5) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  audio_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(lesson_id, language)
);

CREATE INDEX idx_lesson_content_lesson_language ON lesson_content(lesson_id, language);

-- ===========================================
-- Quizzes Table
-- ===========================================
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID UNIQUE NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  questions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===========================================
-- User Progress Table
-- ===========================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  quiz_score SMALLINT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_completed ON user_progress(user_id, completed);

-- ===========================================
-- Badges Table
-- ===========================================
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  name_key VARCHAR(255) NOT NULL,
  description_key VARCHAR(255) NOT NULL,
  icon_emoji VARCHAR(10) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===========================================
-- User Badges Table
-- ===========================================
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);

-- ===========================================
-- Financial Entries Table
-- ===========================================
CREATE TABLE financial_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  category VARCHAR(50) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  synced BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_financial_entries_user_id ON financial_entries(user_id);
CREATE INDEX idx_financial_entries_date ON financial_entries(user_id, date DESC);
CREATE INDEX idx_financial_entries_type ON financial_entries(user_id, type);

-- ===========================================
-- Savings Goals Table
-- ===========================================
CREATE TABLE savings_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  target_amount DECIMAL(12, 2) NOT NULL CHECK (target_amount > 0),
  current_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  target_date DATE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('emergency', 'purchase', 'education', 'business', 'other')),
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_savings_goals_user_id ON savings_goals(user_id);

-- ===========================================
-- Institutions Table
-- ===========================================
CREATE TABLE institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('microfinance', 'bank', 'mobile_money', 'ngo', 'government')),
  country_code VARCHAR(2) NOT NULL,
  website TEXT,
  phone VARCHAR(50),
  interest_rate_min DECIMAL(5, 2),
  interest_rate_max DECIMAL(5, 2),
  accepts_first_time_borrowers BOOLEAN NOT NULL DEFAULT true,
  requires_collateral BOOLEAN NOT NULL DEFAULT false,
  description TEXT NOT NULL,
  logo_url TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_institutions_country ON institutions(country_code);
CREATE INDEX idx_institutions_type ON institutions(type);

-- ===========================================
-- Remittance Providers Table
-- ===========================================
CREATE TABLE remittance_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  send_countries TEXT[] NOT NULL,
  receive_countries TEXT[] NOT NULL,
  fee_percentage DECIMAL(5, 2) NOT NULL,
  flat_fee DECIMAL(10, 2),
  exchange_rate_markup DECIMAL(5, 2) NOT NULL DEFAULT 0,
  transfer_time VARCHAR(100) NOT NULL,
  website TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===========================================
-- Updated At Trigger
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
