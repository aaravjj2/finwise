// ===========================================
// User & Authentication Types
// ===========================================

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'sw'
  | 'yo'
  | 'bn'
  | 'tl'
  | 'es'
  | 'pt'
  | 'ha'
  | 'am'
  | 'zu'
  | 'ig'
  | 'ta'
  | 'id'
  | 'vi';

export type SupportedCountry =
  | 'NG'
  | 'KE'
  | 'TZ'
  | 'UG'
  | 'GH'
  | 'IN'
  | 'BD'
  | 'PK'
  | 'PH'
  | 'ID'
  | 'VN'
  | 'MX'
  | 'BR'
  | 'PE'
  | 'CO'
  | 'ET'
  | 'ZA';

export type LiteracyLevel = 1 | 2 | 3 | 4 | 5;

export interface User {
  id: string;
  phone: string;
  name: string | null;
  language: SupportedLanguage;
  country: SupportedCountry;
  literacy_level: LiteracyLevel;
  literacy_description: string | null;
  primary_goal: string | null;
  has_bank_account: boolean;
  monthly_income: number | null;
  currency: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  completed_modules: string[];
  current_module: string | null;
  badges: Badge[];
  financial_health_score: number;
}

// ===========================================
// Conversation & AI Types
// ===========================================

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  conversation_id: string;
  role: MessageRole;
  content: string;
  created_at: string;
  audio_url: string | null;
  card_data: CardData | null;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export type CardType =
  | 'institution-list'
  | 'calculation'
  | 'checklist'
  | 'comparison-table'
  | 'budget';

export interface CardData {
  type: CardType;
  data: InstitutionListCard | CalculationCard | ChecklistCard | ComparisonTableCard | BudgetCard;
}

export interface InstitutionListCard {
  items: {
    name: string;
    rate: string;
    location: string;
    contact: string;
  }[];
}

export interface CalculationCard {
  inputs: Record<string, string | number>;
  result: string | number;
  explanation: string;
}

export interface ChecklistCard {
  title: string;
  items: string[];
}

export interface ComparisonTableCard {
  headers: string[];
  rows: string[][];
}

export interface BudgetCard {
  income: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

// ===========================================
// Learning Module Types
// ===========================================

export type ModuleDifficulty = 1 | 2 | 3;

export interface LearningModule {
  id: string;
  slug: string;
  title_key: string;
  description_key: string;
  difficulty: ModuleDifficulty;
  estimated_minutes: number;
  icon_emoji: string;
  order_index: number;
  prerequisites: string[];
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  title_key: string;
  content_key: string;
  order_index: number;
  estimated_minutes: number;
}

export interface LessonContent {
  id: string;
  lesson_id: string;
  language: SupportedLanguage;
  title: string;
  content: string;
  audio_url: string | null;
}

export interface Quiz {
  id: string;
  lesson_id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question_key: string;
  options_key: string[];
  correct_index: number;
  explanation_key: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  quiz_score: number | null;
  completed_at: string | null;
  created_at: string;
}

// ===========================================
// Badge Types
// ===========================================

export type BadgeSlug =
  | 'first-step'
  | 'saver'
  | 'borrower'
  | 'protector'
  | 'entrepreneur'
  | 'scholar'
  | 'streak-7'
  | 'streak-30';

export interface Badge {
  id: string;
  slug: BadgeSlug;
  name_key: string;
  description_key: string;
  icon_emoji: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

// ===========================================
// Financial Types
// ===========================================

export type EntryType = 'income' | 'expense';

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'housing'
  | 'health'
  | 'education'
  | 'business'
  | 'family'
  | 'savings'
  | 'entertainment'
  | 'other';

export type IncomeCategory =
  | 'salary'
  | 'business'
  | 'remittance'
  | 'gift'
  | 'other';

export interface FinancialEntry {
  id: string;
  user_id: string;
  type: EntryType;
  amount: number;
  currency: string;
  category: ExpenseCategory | IncomeCategory;
  description: string | null;
  date: string;
  created_at: string;
  synced: boolean;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  currency: string;
  target_date: string | null;
  type: 'emergency' | 'purchase' | 'education' | 'business' | 'other';
  completed: boolean;
  created_at: string;
}

export interface MonthlySummary {
  month: string;
  total_income: number;
  total_expenses: number;
  savings: number;
  savings_rate: number;
  top_expense_categories: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
}

// ===========================================
// Institution Types
// ===========================================

export type InstitutionType = 'microfinance' | 'bank' | 'mobile_money' | 'ngo' | 'government';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  country_code: SupportedCountry;
  website: string | null;
  phone: string | null;
  interest_rate_min: number | null;
  interest_rate_max: number | null;
  accepts_first_time_borrowers: boolean;
  requires_collateral: boolean;
  description: string;
  logo_url: string | null;
  verified: boolean;
  created_at: string;
}

export interface RemittanceProvider {
  id: string;
  name: string;
  send_countries: SupportedCountry[];
  receive_countries: SupportedCountry[];
  fee_percentage: number;
  flat_fee: number | null;
  exchange_rate_markup: number;
  transfer_time: string;
  website: string;
}

// ===========================================
// Scam Detection Types
// ===========================================

export type RiskLevel = 'low' | 'medium' | 'high' | 'very_high';

export interface ScamAnalysis {
  risk_level: RiskLevel;
  risk_score: number;
  red_flags: {
    flag: string;
    explanation: string;
  }[];
  legitimate_indicators: string[];
  recommendation: string;
  summary: string;
}

// ===========================================
// Offline Sync Types
// ===========================================

export type SyncAction = 'create' | 'update' | 'delete';
export type SyncItemType = 'financial_entry' | 'savings_goal' | 'progress' | 'message';

export interface SyncQueueItem {
  id: string;
  type: SyncItemType;
  action: SyncAction;
  payload: unknown;
  timestamp: number;
  retries: number;
}

// ===========================================
// API Response Types
// ===========================================

export interface ApiError {
  error: string;
  code: string;
}

export interface ApiSuccess<T> {
  data: T;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  has_more: boolean;
}

// ===========================================
// Component Props Types
// ===========================================

export interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: SupportedLanguage;
  };
}

export interface PageProps {
  params: {
    locale: SupportedLanguage;
    [key: string]: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

// ===========================================
// Form Types
// ===========================================

export interface OnboardingFormData {
  language: SupportedLanguage;
  country: SupportedCountry;
  name: string;
  literacy_level: LiteracyLevel;
  primary_goal: string;
  has_bank_account: boolean;
  consent_data_processing: boolean;
  consent_ai_coaching: boolean;
}

export interface FinancialEntryFormData {
  type: EntryType;
  amount: number;
  category: ExpenseCategory | IncomeCategory;
  description?: string;
  date: string;
}

export interface SavingsGoalFormData {
  name: string;
  target_amount: number;
  target_date?: string;
  type: SavingsGoal['type'];
}
