# FinWise — Complete Task List
> 1,000+ granular, actionable development tasks organized by feature area

---

## PHASE 0 — Project Scaffolding & Setup

### 0.1 Repository & Environment
- [ ] Initialize GitHub repository named `finwise`
- [ ] Create `.gitignore` for Node.js, Next.js, and environment files
- [ ] Set up branch protection on `main` — require PR reviews
- [ ] Create `develop`, `staging`, and `main` branches
- [ ] Write initial `README.md` with project description and setup instructions
- [ ] Add `LICENSE` file (MIT)
- [ ] Configure Dependabot for automated security updates
- [ ] Set up GitHub Actions workflow directory `.github/workflows/`
- [ ] Create `CONTRIBUTING.md` with coding standards
- [ ] Add `.editorconfig` for consistent code formatting
- [ ] Create `CHANGELOG.md` for version tracking
- [ ] Set up GitHub Issues labels: bug, feature, enhancement, documentation, accessibility
- [ ] Create GitHub project board with Kanban columns
- [ ] Add `CODE_OF_CONDUCT.md`
- [ ] Configure repository topics/tags on GitHub

### 0.2 Next.js Project Initialization
- [ ] Run `npx create-next-app@latest finwise --typescript --tailwind --eslint --app --src-dir=no`
- [ ] Verify Next.js 14 App Router is correctly configured
- [ ] Configure `next.config.js` with security headers
- [ ] Add `Content-Security-Policy` header in `next.config.js`
- [ ] Configure `X-Frame-Options: DENY` header
- [ ] Configure `X-Content-Type-Options: nosniff` header
- [ ] Set up `REFERRER_POLICY` header
- [ ] Configure image optimization domains in `next.config.js`
- [ ] Enable `swcMinify: true` for faster builds
- [ ] Configure `output: 'standalone'` for Docker compatibility
- [ ] Set up `experimental.serverActions: true`
- [ ] Configure `compress: true` in Next.js config
- [ ] Add `poweredByHeader: false` to hide Next.js signature
- [ ] Configure `reactStrictMode: true`
- [ ] Set up custom `_document` equivalent in App Router for meta tags

### 0.3 TypeScript Configuration
- [ ] Configure `tsconfig.json` with strict mode enabled
- [ ] Set `"strict": true` in tsconfig
- [ ] Add `"noUncheckedIndexedAccess": true`
- [ ] Configure path aliases: `@/` for root, `@/components`, `@/lib`, `@/types`
- [ ] Create `types/` directory with `global.d.ts`
- [ ] Define `User` TypeScript interface
- [ ] Define `ConversationMessage` TypeScript interface
- [ ] Define `LearningModule` TypeScript interface
- [ ] Define `FinancialEntry` TypeScript interface
- [ ] Define `Resource` TypeScript interface (microfinance institutions)
- [ ] Define `LanguageCode` union type for 15 supported languages
- [ ] Define `QuizQuestion` TypeScript interface
- [ ] Define `UserProgress` TypeScript interface
- [ ] Define `SavingsGoal` TypeScript interface
- [ ] Create `ApiResponse<T>` generic type

### 0.4 Package Installation
- [ ] Install `@anthropic-ai/sdk` for Claude API
- [ ] Install `elevenlabs` npm package
- [ ] Install `@supabase/supabase-js` and `@supabase/ssr`
- [ ] Install `next-intl` for internationalization
- [ ] Install `zustand` for client state management
- [ ] Install `@tanstack/react-query` for server state
- [ ] Install `react-hook-form` for form management
- [ ] Install `zod` for schema validation
- [ ] Install `@hookform/resolvers` for Zod + React Hook Form
- [ ] Install `lucide-react` for icons
- [ ] Install `class-variance-authority` for component variants
- [ ] Install `clsx` and `tailwind-merge` for class utilities
- [ ] Install `framer-motion` for animations
- [ ] Install `recharts` for data visualization
- [ ] Install `@radix-ui/react-dialog` for modal components
- [ ] Install `@radix-ui/react-tooltip` for tooltips
- [ ] Install `@radix-ui/react-progress` for progress bars
- [ ] Install `@radix-ui/react-select` for dropdowns
- [ ] Install `@radix-ui/react-tabs` for tab navigation
- [ ] Install `@radix-ui/react-avatar` for user avatars
- [ ] Install `@radix-ui/react-switch` for toggle switches
- [ ] Install `@radix-ui/react-slider` for range inputs
- [ ] Install `idb` for IndexedDB wrapper (offline storage)
- [ ] Install `workbox-webpack-plugin` for service worker
- [ ] Install `swr` as alternative data fetching option
- [ ] Install `date-fns` for date formatting
- [ ] Install `uuid` for generating unique IDs
- [ ] Install `@vercel/analytics` for usage tracking
- [ ] Install `@sentry/nextjs` for error monitoring
- [ ] Install dev deps: `prettier`, `eslint-config-prettier`
- [ ] Install dev deps: `@types/uuid`
- [ ] Install dev deps: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`
- [ ] Install dev deps: `playwright` for E2E testing
- [ ] Install dev deps: `msw` for API mocking in tests

### 0.5 Tailwind CSS Configuration
- [ ] Configure `tailwind.config.ts` with custom color palette
- [ ] Add FinWise brand color `finwise-green` (#16a34a variants)
- [ ] Add brand color `finwise-blue` (#2563eb variants)
- [ ] Add brand color `finwise-amber` (#d97706 variants) for warnings
- [ ] Configure custom font family `Inter` as primary
- [ ] Add `Noto Sans` font for multilingual character support
- [ ] Configure `darkMode: 'class'` for dark mode support
- [ ] Add custom `borderRadius` tokens
- [ ] Configure `container` plugin with centered padding
- [ ] Add custom animation keyframes for pulse, slide-in, fade-in
- [ ] Install `@tailwindcss/forms` plugin
- [ ] Install `@tailwindcss/typography` plugin for prose content
- [ ] Configure `safelist` for dynamically-generated class names
- [ ] Add custom `screens` breakpoints optimized for mobile-first
- [ ] Configure `fontSize` scale with RTL-friendly values

### 0.6 Environment Variables
- [ ] Create `.env.local` template file
- [ ] Create `.env.example` with all required keys (no values)
- [ ] Add `ANTHROPIC_API_KEY` variable
- [ ] Add `ELEVENLABS_API_KEY` variable
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` variable
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` variable (server-only)
- [ ] Add `NEXT_PUBLIC_APP_URL` variable
- [ ] Add `EXCHANGE_RATE_API_KEY` variable
- [ ] Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` variable
- [ ] Add `SENTRY_DSN` variable
- [ ] Add `NEXT_PUBLIC_ANALYTICS_ID` variable
- [ ] Add `UPSTASH_REDIS_REST_URL` variable
- [ ] Add `UPSTASH_REDIS_REST_TOKEN` variable
- [ ] Document each variable in `.env.example` with description comment
- [ ] Set up Vercel environment variables in dashboard
- [ ] Configure environment variable validation with `zod` at startup

### 0.7 Code Quality Tools
- [ ] Configure ESLint with `eslint-config-next`
- [ ] Add `eslint-plugin-react-hooks` rules
- [ ] Add `eslint-plugin-jsx-a11y` for accessibility linting
- [ ] Configure `prettier` with single quotes, no semicolons
- [ ] Add `.prettierrc` configuration file
- [ ] Set up `husky` for pre-commit hooks
- [ ] Configure `lint-staged` to run ESLint + Prettier on staged files
- [ ] Add `commitlint` for conventional commit messages
- [ ] Set up `@commitlint/config-conventional`
- [ ] Configure `vitest.config.ts` for unit tests
- [ ] Create `playwright.config.ts` for E2E tests
- [ ] Add `test` script to `package.json`
- [ ] Add `test:e2e` script to `package.json`
- [ ] Add `lint` and `format` scripts to `package.json`
- [ ] Set up `check-types` script for TypeScript validation

---

## PHASE 1 — Database & Authentication

### 1.1 Supabase Setup
- [ ] Create Supabase project named `finwise-prod`
- [ ] Create second Supabase project `finwise-staging`
- [ ] Enable Row Level Security (RLS) globally
- [ ] Configure Supabase Auth settings — enable phone OTP
- [ ] Set OTP expiry to 10 minutes
- [ ] Disable email auth (phone-first for emerging markets)
- [ ] Configure Supabase Storage bucket `audio-files`
- [ ] Configure Supabase Storage bucket `user-documents`
- [ ] Set up Supabase Edge Functions directory
- [ ] Configure Supabase CLI for local development
- [ ] Run `supabase init` in project root
- [ ] Configure `supabase/config.toml`
- [ ] Set up Supabase local development with Docker
- [ ] Create `lib/db/supabase.ts` — server-side client
- [ ] Create `lib/db/supabase-browser.ts` — client-side client
- [ ] Create `lib/db/supabase-middleware.ts` — middleware client

### 1.2 Database Schema — Users
- [ ] Create `users` table with `id uuid PRIMARY KEY`
- [ ] Add `phone_number text UNIQUE NOT NULL` to users
- [ ] Add `display_name text` to users
- [ ] Add `language_code text NOT NULL DEFAULT 'en'` to users
- [ ] Add `country_code text` (ISO 3166-1 alpha-2) to users
- [ ] Add `region text` — sub-national region
- [ ] Add `financial_literacy_level integer DEFAULT 1` (1-5 scale)
- [ ] Add `onboarding_completed boolean DEFAULT false`
- [ ] Add `created_at timestamptz DEFAULT now()`
- [ ] Add `updated_at timestamptz DEFAULT now()`
- [ ] Add `last_active_at timestamptz`
- [ ] Add `avatar_emoji text` — simple avatar for display
- [ ] Add `notification_preferences jsonb`
- [ ] Add `privacy_consent boolean DEFAULT false`
- [ ] Create RLS policy: users can only read/update their own row
- [ ] Create `updated_at` trigger function
- [ ] Apply `updated_at` trigger to users table

### 1.3 Database Schema — Conversations
- [ ] Create `conversations` table with `id uuid PRIMARY KEY`
- [ ] Add `user_id uuid REFERENCES users(id) ON DELETE CASCADE`
- [ ] Add `title text` — auto-generated from first message
- [ ] Add `language_code text NOT NULL`
- [ ] Add `created_at timestamptz DEFAULT now()`
- [ ] Add `updated_at timestamptz DEFAULT now()`
- [ ] Create index on `conversations(user_id)`
- [ ] Create RLS policy for conversations
- [ ] Create `messages` table with `id uuid PRIMARY KEY`
- [ ] Add `conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE`
- [ ] Add `role text CHECK (role IN ('user', 'assistant', 'system'))`
- [ ] Add `content text NOT NULL`
- [ ] Add `audio_url text` — link to stored audio if voice message
- [ ] Add `created_at timestamptz DEFAULT now()`
- [ ] Create index on `messages(conversation_id)`
- [ ] Create RLS policy for messages (via conversation ownership)
- [ ] Add `tokens_used integer` to messages for usage tracking
- [ ] Add `model_used text` to messages

### 1.4 Database Schema — Learning
- [ ] Create `learning_modules` table (seed data, no RLS needed)
- [ ] Add `id uuid PRIMARY KEY` to learning_modules
- [ ] Add `slug text UNIQUE NOT NULL` (e.g., 'savings-basics')
- [ ] Add `title_key text` — i18n key for title
- [ ] Add `description_key text` — i18n key for description
- [ ] Add `difficulty integer CHECK (difficulty IN (1,2,3))`
- [ ] Add `estimated_minutes integer`
- [ ] Add `icon_emoji text`
- [ ] Add `order_index integer` for curriculum ordering
- [ ] Add `prerequisites text[]` — array of module slugs
- [ ] Add `is_published boolean DEFAULT true`
- [ ] Create `lessons` table linked to modules
- [ ] Add `id uuid PRIMARY KEY` to lessons
- [ ] Add `module_id uuid REFERENCES learning_modules(id)`
- [ ] Add `order_index integer`
- [ ] Add `content_key text` — i18n key for lesson content
- [ ] Add `audio_script_key text` — script for TTS narration
- [ ] Create `quiz_questions` table
- [ ] Add `id uuid PRIMARY KEY` to quiz_questions
- [ ] Add `lesson_id uuid REFERENCES lessons(id)`
- [ ] Add `question_key text` — i18n key
- [ ] Add `options jsonb` — array of option objects with i18n keys
- [ ] Add `correct_option_index integer`
- [ ] Add `explanation_key text` — i18n key for answer explanation
- [ ] Create `user_progress` table
- [ ] Add `id uuid PRIMARY KEY` to user_progress
- [ ] Add `user_id uuid REFERENCES users(id) ON DELETE CASCADE`
- [ ] Add `module_id uuid REFERENCES learning_modules(id)`
- [ ] Add `lesson_id uuid REFERENCES lessons(id)`
- [ ] Add `completed boolean DEFAULT false`
- [ ] Add `quiz_score integer`
- [ ] Add `completed_at timestamptz`
- [ ] Add `attempts integer DEFAULT 0`
- [ ] Create unique constraint on `user_progress(user_id, lesson_id)`
- [ ] Create RLS policy for user_progress
- [ ] Create `user_badges` table
- [ ] Add `user_id uuid REFERENCES users(id) ON DELETE CASCADE`
- [ ] Add `badge_slug text NOT NULL`
- [ ] Add `earned_at timestamptz DEFAULT now()`
- [ ] Create index on `user_badges(user_id)`

### 1.5 Database Schema — Financial Data
- [ ] Create `financial_entries` table
- [ ] Add `id uuid PRIMARY KEY`
- [ ] Add `user_id uuid REFERENCES users(id) ON DELETE CASCADE`
- [ ] Add `type text CHECK (type IN ('income', 'expense', 'savings'))`
- [ ] Add `amount numeric(12,2) NOT NULL`
- [ ] Add `currency_code text DEFAULT 'USD'`
- [ ] Add `category text` — food, transport, utilities, etc.
- [ ] Add `description text`
- [ ] Add `entry_date date NOT NULL`
- [ ] Add `created_at timestamptz DEFAULT now()`
- [ ] Create index on `financial_entries(user_id, entry_date)`
- [ ] Create RLS policy for financial_entries
- [ ] Create `savings_goals` table
- [ ] Add `id uuid PRIMARY KEY`
- [ ] Add `user_id uuid REFERENCES users(id) ON DELETE CASCADE`
- [ ] Add `title text NOT NULL`
- [ ] Add `target_amount numeric(12,2) NOT NULL`
- [ ] Add `current_amount numeric(12,2) DEFAULT 0`
- [ ] Add `currency_code text DEFAULT 'USD'`
- [ ] Add `target_date date`
- [ ] Add `is_completed boolean DEFAULT false`
- [ ] Add `created_at timestamptz DEFAULT now()`
- [ ] Create RLS policy for savings_goals

### 1.6 Database Schema — Resources
- [ ] Create `institutions` table (seed data)
- [ ] Add `id uuid PRIMARY KEY`
- [ ] Add `name text NOT NULL`
- [ ] Add `type text CHECK (type IN ('microfinance','bank','ngo','cooperative','mobile_money'))`
- [ ] Add `country_code text NOT NULL`
- [ ] Add `region text`
- [ ] Add `website text`
- [ ] Add `phone text`
- [ ] Add `description_key text`
- [ ] Add `min_loan_amount numeric`
- [ ] Add `max_loan_amount numeric`
- [ ] Add `interest_rate_min numeric` — annual %
- [ ] Add `interest_rate_max numeric`
- [ ] Add `requires_collateral boolean`
- [ ] Add `accepts_first_time_borrowers boolean`
- [ ] Add `latitude numeric`
- [ ] Add `longitude numeric`
- [ ] Add `is_verified boolean DEFAULT false`
- [ ] Add `last_verified_at timestamptz`
- [ ] Create index on `institutions(country_code)`
- [ ] Create `remittance_providers` table
- [ ] Add `id uuid PRIMARY KEY`
- [ ] Add `name text NOT NULL`
- [ ] Add `logo_url text`
- [ ] Add `website text`
- [ ] Add `supported_corridors jsonb` — array of {from, to, fee_pct, transfer_time}
- [ ] Add `mobile_money_supported boolean DEFAULT false`
- [ ] Add `cash_pickup_supported boolean DEFAULT false`
- [ ] Add `bank_transfer_supported boolean DEFAULT false`

### 1.7 Database Migrations & Seeds
- [ ] Create migration `001_initial_schema.sql`
- [ ] Create migration `002_rls_policies.sql`
- [ ] Create migration `003_indexes.sql`
- [ ] Create migration `004_triggers.sql`
- [ ] Create seed file `seed_modules.sql` with 6 learning modules
- [ ] Create seed file `seed_lessons.sql` with 30 initial lessons (5 per module)
- [ ] Create seed file `seed_quiz_questions.sql` with 90 questions (3 per lesson)
- [ ] Create seed file `seed_institutions.sql` with 50 microfinance institutions
- [ ] Create seed file `seed_remittance.sql` with 10 major remittance providers
- [ ] Write script `scripts/seed.ts` to run all seeds programmatically
- [ ] Create `npm run db:migrate` script
- [ ] Create `npm run db:seed` script
- [ ] Create `npm run db:reset` script for development
- [ ] Document database schema in `docs/database.md`
- [ ] Create entity relationship diagram in docs

### 1.8 Authentication Flow
- [ ] Create `/app/(auth)/layout.tsx` — auth layout
- [ ] Create `/app/(auth)/login/page.tsx` — phone login page
- [ ] Build phone number input component with country code selector
- [ ] Implement `+1, +44, +91, +234, +63, +880` prefix options (common in target markets)
- [ ] Create OTP entry UI component (6-digit input)
- [ ] Implement OTP auto-advance (focus next input on digit entry)
- [ ] Implement OTP paste handling (paste all 6 digits at once)
- [ ] Create `sendOTP` server action
- [ ] Create `verifyOTP` server action
- [ ] Handle auth errors: invalid phone, expired OTP, max attempts
- [ ] Show countdown timer for OTP expiry (10 minutes)
- [ ] Implement "resend OTP" with 60-second cooldown
- [ ] Create auth middleware in `middleware.ts`
- [ ] Protect all `(dashboard)` routes with auth check
- [ ] Redirect unauthenticated users to `/login`
- [ ] Store auth session in cookies (server-side)
- [ ] Create `useUser` hook for client-side user access
- [ ] Handle session refresh automatically
- [ ] Create logout function that clears cookies + redirects
- [ ] Add logout button to settings page
- [ ] Test auth flow on slow 3G connection

---

## PHASE 2 — Onboarding

### 2.1 Language Selection
- [ ] Create `/app/(auth)/onboarding/page.tsx`
- [ ] Build language selection screen as step 1 of onboarding
- [ ] Display all 15 languages with native script names
- [ ] Show flag emoji next to each language
- [ ] Implement language search/filter for the list
- [ ] Store selected language in user profile
- [ ] Store selected language in cookie for immediate i18n effect
- [ ] Auto-detect device language as default selection
- [ ] Show "Other" option with note that more languages coming
- [ ] Animate selection with subtle highlight
- [ ] Add "Continue" button that becomes enabled on selection
- [ ] Test language names render correctly in Noto Sans

### 2.2 Country & Region Selection
- [ ] Build country selector — step 2 of onboarding
- [ ] Show searchable list of countries
- [ ] Prioritize top-10 target market countries at top
- [ ] Show flag emoji for each country
- [ ] On country selection, fetch available regions from DB
- [ ] Show region selector (optional but recommended)
- [ ] Explain why location is needed (find local resources)
- [ ] Implement "Don't want to share" option
- [ ] Store country + region in user profile
- [ ] Use country to set default currency throughout app

### 2.3 Financial Baseline Assessment
- [ ] Build 5-question baseline assessment — step 3 of onboarding
- [ ] Question 1: "Do you currently have a bank account?"
- [ ] Question 2: "How do you usually save money?" (options: bank, cash at home, mobile money, don't save)
- [ ] Question 3: "Have you ever taken a loan?" (yes/no + informal/formal)
- [ ] Question 4: "Do you send or receive money to family in another area?"
- [ ] Question 5: "What is your main financial goal right now?" (save, borrow safely, understand money, start business)
- [ ] Build animated progress bar across 5 steps
- [ ] Store assessment answers in user profile as jsonb
- [ ] Calculate initial `financial_literacy_level` from answers
- [ ] Show encouraging completion message with user's name
- [ ] Generate personalized first 3 module recommendations from answers
- [ ] Animate transition to dashboard after completion

### 2.4 Name & Profile Setup
- [ ] Build name entry screen — step 4 of onboarding
- [ ] Keep it simple: just first name (culturally appropriate)
- [ ] Show example: "What should we call you?"
- [ ] Implement emoji avatar picker (8 simple options: 👤, 👨‍🌾, 👩‍💼, 👨‍🏭, 👩‍🍳, 👨‍🔧, 👩‍🎓, 👴)
- [ ] Save name and avatar to user profile
- [ ] Use name immediately in welcome message
- [ ] Build privacy consent screen — step 5 of onboarding
- [ ] Display simple, plain-language privacy summary in user's language
- [ ] Bullet: "Your conversations are private and encrypted"
- [ ] Bullet: "We never sell your data"
- [ ] Bullet: "You can delete your account anytime"
- [ ] Require explicit checkbox consent
- [ ] Store consent timestamp
- [ ] Show "Learn more" link to full privacy policy

### 2.5 Welcome & First Session
- [ ] Build animated welcome screen after onboarding completion
- [ ] Show personalized greeting: "Welcome, [Name]! Your financial journey starts here."
- [ ] Display user's language, country, and recommended modules
- [ ] Show "Start your first lesson" CTA
- [ ] Show "Ask a question" CTA to go directly to AI chat
- [ ] Play short welcome audio in user's language (ElevenLabs)
- [ ] Create first automatic conversation with introduction message
- [ ] Log onboarding completion analytics event
- [ ] Mark `onboarding_completed = true` in DB

---

## PHASE 3 — AI Coaching Engine

### 3.1 Claude Integration Core
- [ ] Create `lib/ai/client.ts` — Anthropic SDK initialization
- [ ] Create `lib/ai/system-prompt.ts` — master system prompt builder
- [ ] Write base system prompt: FinWise coach persona
- [ ] Add language injection to system prompt: "You MUST respond in {language}"
- [ ] Add user context injection: literacy level, country, goals
- [ ] Add safety guardrails to system prompt
- [ ] Add "never give specific investment advice" guardrail
- [ ] Add "always recommend consulting a professional for major decisions" guardrail
- [ ] Add "never recommend specific financial products by brand without caveats" guardrail
- [ ] Create `lib/ai/context-builder.ts` — assembles conversation context
- [ ] Implement message history trimming (keep last 20 messages + system)
- [ ] Implement token budget management (stay under 100k tokens)
- [ ] Create `lib/ai/response-parser.ts` — parse structured responses
- [ ] Define AI response schema: message + optional action card
- [ ] Implement streaming response handler
- [ ] Create `lib/ai/tools.ts` — define Claude tool use functions
- [ ] Define `search_institutions` tool for resource lookup
- [ ] Define `calculate_interest` tool for math
- [ ] Define `evaluate_loan_offer` tool for scam detection
- [ ] Define `get_remittance_rates` tool for money transfer comparison
- [ ] Implement tool result formatting for each tool
- [ ] Create unit tests for system prompt builder
- [ ] Create unit tests for context builder
- [ ] Create unit tests for response parser

### 3.2 Chat API Route
- [ ] Create `/app/api/chat/route.ts`
- [ ] Implement POST handler for new messages
- [ ] Parse request body: `{ message, conversationId, language }`
- [ ] Validate request with Zod schema
- [ ] Authenticate request (verify user session)
- [ ] Fetch conversation history from DB
- [ ] Build full message array with system prompt
- [ ] Call Claude API with streaming enabled
- [ ] Stream response back to client using `ReadableStream`
- [ ] Save user message to DB
- [ ] Save assistant response to DB after completion
- [ ] Handle API errors gracefully (rate limit, timeout, etc.)
- [ ] Implement retry logic for transient failures (3 retries, exponential backoff)
- [ ] Add rate limiting: 30 messages per hour per user (free tier)
- [ ] Add rate limiting: 200 messages per hour per user (premium)
- [ ] Use Upstash Redis for rate limit tracking
- [ ] Return 429 with `retry-after` header when rate limited
- [ ] Log token usage per request
- [ ] Add request timeout of 30 seconds
- [ ] Create conversation if `conversationId` not provided
- [ ] Update `last_active_at` on user record

### 3.3 Chat UI Components
- [ ] Create `components/chat/ChatContainer.tsx` — main chat wrapper
- [ ] Create `components/chat/MessageList.tsx` — scrollable message list
- [ ] Create `components/chat/UserMessage.tsx` — user bubble
- [ ] Create `components/chat/AssistantMessage.tsx` — AI bubble with avatar
- [ ] Create `components/chat/TypingIndicator.tsx` — animated dots while streaming
- [ ] Create `components/chat/ChatInput.tsx` — text + voice input bar
- [ ] Implement auto-scroll to latest message
- [ ] Implement scroll-to-bottom button when user scrolls up
- [ ] Show message timestamp in local time
- [ ] Show message status: sending, sent, error
- [ ] Implement message copy to clipboard
- [ ] Implement "regenerate response" button on AI messages
- [ ] Create `components/chat/ActionCard.tsx` — structured AI responses
- [ ] ActionCard types: resource-list, calculation-result, checklist, tip
- [ ] Implement markdown rendering in AI messages (bold, lists, links)
- [ ] Create `components/chat/SuggestedQuestions.tsx` — quick question chips
- [ ] Generate 3 contextual follow-up suggestions after each response
- [ ] Create `components/chat/ConversationHeader.tsx` — title + settings
- [ ] Implement conversation title auto-generation (from first message)
- [ ] Create `components/chat/EmptyState.tsx` — starter prompts for new chats
- [ ] Show 6 starter prompt examples in user's language
- [ ] Create `components/chat/ErrorState.tsx` — graceful API error display

### 3.4 Streaming Implementation
- [ ] Create `hooks/useChat.ts` — chat state management hook
- [ ] Implement streaming message accumulation in hook
- [ ] Handle stream start, chunk, and end events
- [ ] Show partial text as it streams (character by character)
- [ ] Implement abort controller for canceling responses
- [ ] Show "Stop generating" button during streaming
- [ ] Handle stream errors mid-stream gracefully
- [ ] Implement optimistic UI for user messages
- [ ] Persist conversation to Zustand store
- [ ] Sync Zustand store with server on navigation
- [ ] Handle reconnection if stream drops
- [ ] Add visual typing cursor at stream end position

### 3.5 Voice Chat Interface
- [ ] Create `components/chat/VoiceInput.tsx` — microphone button
- [ ] Implement Web Speech API for speech-to-text
- [ ] Show recording indicator (animated red dot)
- [ ] Show real-time transcription preview while speaking
- [ ] Implement silence detection (auto-stop after 2s silence)
- [ ] Add manual stop recording button
- [ ] Send transcribed text to chat on stop
- [ ] Handle browser permission denial for microphone
- [ ] Show "Microphone not available" fallback gracefully
- [ ] Create `lib/voice/elevenlabs.ts` — ElevenLabs client wrapper
- [ ] Implement `textToSpeech(text, language, voiceId)` function
- [ ] Select appropriate voice ID per language
- [ ] Map language code to ElevenLabs voice: Hindi → Hindi female voice
- [ ] Map language code: Swahili → Swahili voice
- [ ] Map language code: Yoruba → Yoruba voice
- [ ] Map language code: Spanish LatAm → Spanish voice
- [ ] Map language code: Bengali → Bengali voice
- [ ] Map language code: Tagalog → Tagalog voice
- [ ] Cache TTS responses in Supabase Storage to avoid repeated API calls
- [ ] Create TTS cache key: `hash(text + language + voiceId)`
- [ ] Create `/app/api/tts/route.ts` — TTS API endpoint
- [ ] Stream audio response directly from ElevenLabs
- [ ] Add audio playback controls in AssistantMessage component
- [ ] Show play/pause button on each assistant message
- [ ] Implement auto-play option (user preference)
- [ ] Create `components/chat/AudioPlayer.tsx` — inline audio player
- [ ] Show audio waveform visualization during playback
- [ ] Implement playback speed control (0.75x, 1x, 1.25x)

### 3.6 System Prompt Engineering
- [ ] Write full base system prompt for FinWise coach
- [ ] Include persona: "You are Maya, a friendly financial literacy coach..."
- [ ] Include mission: help users in emerging markets understand personal finance
- [ ] Include tone guidelines: warm, patient, non-judgmental, encouraging
- [ ] Include language rule: always respond in the user's specified language
- [ ] Include analogy guideline: use local, culturally appropriate analogies
- [ ] Include simplicity rule: avoid jargon, explain every financial term used
- [ ] Include safety rules: no specific investment advice, no brand recommendations
- [ ] Include escalation rule: recommend professionals for complex situations
- [ ] Include local context: adapt examples to user's country
- [ ] Write literacy-level-1 prompt variant (complete beginner)
- [ ] Write literacy-level-2 prompt variant (knows basics)
- [ ] Write literacy-level-3 prompt variant (intermediate)
- [ ] Write literacy-level-4 prompt variant (advanced)
- [ ] Write literacy-level-5 prompt variant (sophisticated)
- [ ] Test system prompt with 20 different user scenarios
- [ ] Write test for savings question in Yoruba
- [ ] Write test for loan question in Hindi
- [ ] Write test for scam detection in Spanish
- [ ] Write test for remittance question in Bengali
- [ ] Write test for budget question in Swahili
- [ ] Refine system prompt based on test outputs
- [ ] Document final system prompt in `docs/ai-prompts.md`

### 3.7 Conversation Management
- [ ] Create `/app/(dashboard)/chat/page.tsx` — default new chat
- [ ] Create `/app/(dashboard)/chat/[id]/page.tsx` — specific conversation
- [ ] Build conversation sidebar with history list
- [ ] Show last message preview in conversation list
- [ ] Show conversation date in relative time (Today, Yesterday, etc.)
- [ ] Implement conversation search (search through message content)
- [ ] Implement conversation delete (with confirmation)
- [ ] Implement conversation rename (click title to edit)
- [ ] Show conversation count and storage usage
- [ ] Create `hooks/useConversations.ts` for list management
- [ ] Implement infinite scroll for conversation list
- [ ] Implement keyboard shortcuts: Cmd+K new chat, Cmd+/ search
- [ ] Create conversation export feature (download as PDF or text)
- [ ] Show "New chat" button prominently in sidebar

---

## PHASE 4 — Learning System

### 4.1 Module Architecture
- [ ] Create `app/(dashboard)/learn/page.tsx` — learning home
- [ ] Build module grid showing all 6 modules
- [ ] Module 1: "Savings Basics" — icon: 🏦
- [ ] Module 2: "Smart Borrowing" — icon: 💳
- [ ] Module 3: "Sending Money Home" — icon: 💸
- [ ] Module 4: "Protecting Your Money" — icon: 🛡️
- [ ] Module 5: "Running a Business" — icon: 🏪
- [ ] Module 6: "Planning Your Future" — icon: 🌱
- [ ] Show module difficulty level (beginner/intermediate/advanced)
- [ ] Show estimated completion time per module
- [ ] Show user's progress percentage on each module card
- [ ] Show prerequisite modules with lock icon if not completed
- [ ] Highlight recommended modules based on onboarding assessment
- [ ] Show "Next lesson" quick-access button on in-progress modules
- [ ] Create module detail page `/app/(dashboard)/learn/[moduleSlug]/page.tsx`
- [ ] Show module overview: description, lessons list, what you'll learn
- [ ] Show learning objectives for each module (3-5 bullet points)
- [ ] Show completion certificate preview
- [ ] Build lesson list with completion checkmarks
- [ ] Create lesson page `/app/(dashboard)/learn/[moduleSlug]/[lessonSlug]/page.tsx`

### 4.2 Lesson Content System
- [ ] Create lesson content format in JSON
- [ ] Lesson structure: title, intro paragraph, 3-5 content cards, summary
- [ ] Content card types: text, example, tip, warning, analogy
- [ ] Create "Analogy" card component with local cultural context
- [ ] Create "Example" card component with numbers/scenarios
- [ ] Create "Tip" card with green accent
- [ ] Create "Warning" card with amber accent
- [ ] Populate lesson: "What is a savings account?"
- [ ] Populate lesson: "How interest works in your favor"
- [ ] Populate lesson: "Setting a savings goal"
- [ ] Populate lesson: "Where to save safely"
- [ ] Populate lesson: "Building a savings habit"
- [ ] Populate lesson: "What is a loan?"
- [ ] Populate lesson: "Understanding interest rates"
- [ ] Populate lesson: "Types of loans: formal vs informal"
- [ ] Populate lesson: "How to evaluate a loan offer"
- [ ] Populate lesson: "Borrowing responsibly"
- [ ] Populate lesson: "How remittances work"
- [ ] Populate lesson: "Comparing transfer services"
- [ ] Populate lesson: "Reducing transfer fees"
- [ ] Populate lesson: "Mobile money explained"
- [ ] Populate lesson: "What happens if a transfer fails"
- [ ] Populate lesson: "What is insurance?"
- [ ] Populate lesson: "Health vs property insurance"
- [ ] Populate lesson: "How to pick the right coverage"
- [ ] Populate lesson: "Avoiding insurance scams"
- [ ] Populate lesson: "Making a claim"
- [ ] Populate lesson: "Starting a micro-business"
- [ ] Populate lesson: "Basic bookkeeping"
- [ ] Populate lesson: "Pricing your products"
- [ ] Populate lesson: "Managing business vs personal money"
- [ ] Populate lesson: "Getting a business loan"
- [ ] Populate lesson: "What is a budget?"
- [ ] Populate lesson: "The 50/30/20 rule adapted for low income"
- [ ] Populate lesson: "Planning for irregular income"
- [ ] Populate lesson: "Preparing for emergencies"
- [ ] Populate lesson: "Teaching your family about money"

### 4.3 Lesson UI Components
- [ ] Create `components/learn/LessonReader.tsx` — main lesson view
- [ ] Implement slide-style navigation (swipe or next button)
- [ ] Show progress dots indicating position in lesson
- [ ] Create `components/learn/ContentCard.tsx` — lesson content block
- [ ] Create `components/learn/AudioNarration.tsx` — lesson TTS playback
- [ ] Generate TTS for all lessons using ElevenLabs
- [ ] Cache narration audio in Supabase Storage
- [ ] Add "Listen to lesson" toggle at top of each lesson
- [ ] Implement font-size increase/decrease for accessibility
- [ ] Implement high-contrast mode for readability
- [ ] Show estimated reading time per lesson
- [ ] Implement lesson bookmarking
- [ ] Show "Ask AI about this" button on each lesson (opens chat with context)
- [ ] Track reading progress (scroll position) for resume functionality
- [ ] Save lesson progress to DB when 80% scrolled
- [ ] Create lesson completion animation (checkmark burst)

### 4.4 Quiz Engine
- [ ] Create `components/learn/QuizContainer.tsx` — quiz wrapper
- [ ] Create `components/learn/QuizQuestion.tsx` — single question display
- [ ] Create `components/learn/QuizOption.tsx` — selectable answer option
- [ ] Show question number and total (e.g., "Question 2 of 3")
- [ ] Implement single-select answer mechanic
- [ ] Animate selection state change
- [ ] Show correct/incorrect feedback immediately on selection
- [ ] Show green highlight on correct answer
- [ ] Show red highlight on wrong answer, then reveal correct answer
- [ ] Show explanation text after each answer
- [ ] Read explanation aloud with TTS if voice mode enabled
- [ ] Show "Next" button after answering
- [ ] Track score throughout quiz
- [ ] Create quiz completion screen with score display
- [ ] Show "100% — Perfect!" animation for full score
- [ ] Show "80% — Great job!" for passing score
- [ ] Show retry option for failed quiz (< 60%)
- [ ] Save quiz score to `user_progress` table
- [ ] Award badge on first module completion
- [ ] Trigger congratulations confetti animation on module completion
- [ ] Generate module completion certificate as PDF

### 4.5 Badge & Achievement System
- [ ] Define 20 badge types
- [ ] Badge: "First Step" — complete first lesson
- [ ] Badge: "Saver" — complete Savings Basics module
- [ ] Badge: "Smart Borrower" — complete Smart Borrowing module
- [ ] Badge: "Money Mover" — complete Sending Money Home module
- [ ] Badge: "Protector" — complete Protecting Your Money module
- [ ] Badge: "Entrepreneur" — complete Running a Business module
- [ ] Badge: "Planner" — complete Planning Your Future module
- [ ] Badge: "Scholar" — complete all 6 modules
- [ ] Badge: "Quick Learner" — complete 3 lessons in one day
- [ ] Badge: "Consistent" — log in 7 days in a row
- [ ] Badge: "First Goal" — create first savings goal
- [ ] Badge: "Goal Achiever" — complete a savings goal
- [ ] Badge: "Budget Starter" — log first 10 financial entries
- [ ] Badge: "Safety Scout" — use scam detector 3 times
- [ ] Badge: "Question Asker" — send 20 messages to AI coach
- [ ] Badge: "Voice User" — use voice feature 5 times
- [ ] Badge: "Quiz Master" — get 100% on any quiz
- [ ] Badge: "Perfect Week" — 7 perfect quiz scores
- [ ] Badge: "Sharer" — share a lesson with someone
- [ ] Badge: "Community" — refer a friend who completes onboarding
- [ ] Create `components/badges/BadgeGrid.tsx` — badge showcase
- [ ] Create `components/badges/BadgeCard.tsx` — individual badge
- [ ] Show locked badges greyed out with "how to earn" tooltip
- [ ] Animate new badge unlock with pop-in effect
- [ ] Add badge unlock push notification logic (future)

---

## PHASE 5 — Financial Health Dashboard

### 5.1 Dashboard Layout
- [ ] Create `app/(dashboard)/dashboard/page.tsx`
- [ ] Build responsive dashboard grid layout
- [ ] Create dashboard header with greeting ("Good morning, Amara!")
- [ ] Show current date in local format and language
- [ ] Add quick action row: "+ Add entry", "Ask AI", "View goals"
- [ ] Create `components/dashboard/HealthScore.tsx` — circular score widget
- [ ] Financial health score: 0–100 based on savings rate, spending patterns, goal progress
- [ ] Show score with colored ring: red (<40), amber (40-69), green (70+)
- [ ] Show score change from last month (+5 points)
- [ ] Show 3 bullet tips to improve score
- [ ] Create `components/dashboard/MonthlySummary.tsx`
- [ ] Show total income this month
- [ ] Show total expenses this month
- [ ] Show net savings this month
- [ ] Show savings rate percentage
- [ ] Sparkline chart for last 4 weeks of net income
- [ ] Create `components/dashboard/RecentActivity.tsx`
- [ ] List last 5 financial entries with icon, description, amount
- [ ] Show entry date in relative time
- [ ] Quick delete entry button
- [ ] "See all" link to full transaction list

### 5.2 Income & Expense Tracker
- [ ] Create `app/(dashboard)/dashboard/tracker/page.tsx`
- [ ] Build monthly calendar view with daily totals
- [ ] Build list view with all entries sorted by date
- [ ] Implement month/year picker for navigation
- [ ] Create `components/dashboard/AddEntryModal.tsx`
- [ ] Form fields: type (income/expense/savings), amount, category, date, description
- [ ] Amount input with currency selector
- [ ] Support 15 currencies at minimum
- [ ] Category options for income: salary, freelance, business, gift, other
- [ ] Category options for expense: food, transport, housing, utilities, health, education, clothing, other
- [ ] Implement voice entry: "I spent 500 on food today" → auto-parse
- [ ] Build voice parsing logic using Claude
- [ ] Create `components/dashboard/CategoryBreakdown.tsx`
- [ ] Donut chart showing expense categories
- [ ] Show % and amount per category
- [ ] Create `components/dashboard/IncomeVsExpense.tsx`
- [ ] Bar chart showing income vs expense by week
- [ ] Highlight weeks with negative net income in red
- [ ] Create `components/dashboard/EntryList.tsx`
- [ ] Filterable by type, category, date range
- [ ] Sortable by amount, date
- [ ] Export to CSV button
- [ ] Bulk delete selected entries

### 5.3 Savings Goals
- [ ] Create `app/(dashboard)/dashboard/goals/page.tsx`
- [ ] Build goals overview page with all active goals
- [ ] Create `components/dashboard/GoalCard.tsx`
- [ ] Show goal title, target amount, current amount, deadline
- [ ] Show progress bar with percentage
- [ ] Show "days remaining" countdown
- [ ] Show weekly contribution needed to hit goal on time
- [ ] Create `components/dashboard/CreateGoalModal.tsx`
- [ ] Form: title, target amount, currency, target date
- [ ] Suggested goals: Emergency fund, School fees, Business start, New phone
- [ ] Automatically link to AI coach: "Ask AI how to reach this goal faster"
- [ ] Create `components/dashboard/GoalContribution.tsx` — add contribution modal
- [ ] Animate progress bar when contribution added
- [ ] Play celebration sound on goal completion
- [ ] Show completed goals in separate section with checkmark

### 5.4 Currency Support
- [ ] Create `lib/currency.ts` — currency utilities
- [ ] Implement `formatCurrency(amount, currencyCode, locale)` function
- [ ] Support NGN (Nigerian Naira), KES (Kenyan Shilling), BDT (Bangladeshi Taka)
- [ ] Support PHP (Philippine Peso), INR (Indian Rupee), PEN (Peruvian Sol)
- [ ] Support BRL (Brazilian Real), IDR (Indonesian Rupiah), VND (Vietnamese Dong)
- [ ] Support ZAR (South African Rand), ETB (Ethiopian Birr), GHS (Ghanaian Cedi)
- [ ] Support USD, EUR, GBP as reference currencies
- [ ] Fetch live exchange rates from Exchange Rate API
- [ ] Cache exchange rates for 1 hour in Redis
- [ ] Show amounts in local currency throughout app
- [ ] Allow user to toggle to USD equivalent

---

## PHASE 6 — Resource Connector

### 6.1 Institution Finder
- [ ] Create `app/(dashboard)/resources/page.tsx`
- [ ] Build resource home with tabs: Savings, Loans, Remittances, Insurance
- [ ] Create `app/(dashboard)/resources/institutions/page.tsx`
- [ ] Build search interface: search by name, filter by type, country, features
- [ ] Create `components/resources/InstitutionCard.tsx`
- [ ] Show institution name, type badge, country, interest rate range
- [ ] Show "accepts first-time borrowers" badge
- [ ] Show "no collateral required" badge
- [ ] Show distance from user (if location permission granted)
- [ ] Create institution detail page
- [ ] Show full institution profile: description, requirements, contact
- [ ] Show map with institution location
- [ ] Show "How to apply" step-by-step guide
- [ ] Show "Ask AI about this institution" button
- [ ] Implement institution rating/review system
- [ ] Show user reviews (moderated)
- [ ] Create institution reporting system (flag outdated info)
- [ ] Build admin interface for institution management

### 6.2 Loan Matching
- [ ] Create `app/(dashboard)/resources/find-loan/page.tsx`
- [ ] Build loan matching questionnaire
- [ ] Question: How much do you need to borrow?
- [ ] Question: What is it for? (business, emergency, education, home)
- [ ] Question: How long to repay? (3 months, 6 months, 1 year, 2+ years)
- [ ] Question: Do you have collateral?
- [ ] Question: Is this your first loan?
- [ ] Run matching algorithm against institutions DB
- [ ] Show ranked results with match score
- [ ] Explain why each institution matched
- [ ] Show estimated monthly payment calculator
- [ ] Warn user about high interest rate options
- [ ] Create `lib/loan-calculator.ts`
- [ ] Implement simple interest calculation
- [ ] Implement compound interest calculation
- [ ] Implement amortization schedule generator
- [ ] Show amortization table (monthly payment breakdown)

### 6.3 Remittance Comparison
- [ ] Create `app/(dashboard)/resources/remittance/page.tsx`
- [ ] Build remittance comparison tool
- [ ] Select "Sending from" country
- [ ] Select "Sending to" country
- [ ] Enter amount to send
- [ ] Fetch current rates for this corridor
- [ ] Show comparison table: provider, fee, exchange rate, total received, delivery time
- [ ] Sort by "best deal" (recipient gets most money)
- [ ] Show fee as both flat amount and percentage
- [ ] Highlight cheapest option
- [ ] Show "via mobile money" badge for M-Pesa/bKash compatible providers
- [ ] Create cost savings calculator: "Switching to X would save you $Y per year"
- [ ] Add popular corridor quick-selects: Nigeria→UK, India→USA, Philippines→Saudi Arabia
- [ ] Create `lib/remittance.ts` — remittance data utilities
- [ ] Show provider safety ratings

### 6.4 Scam Detector
- [ ] Create `app/(dashboard)/tools/scam-detector/page.tsx`
- [ ] Build scam analysis interface
- [ ] Text input: "Describe the offer or paste the message"
- [ ] Analyze button → send to Claude with scam detection prompt
- [ ] Show risk level: Low / Medium / High / Very High
- [ ] Color-coded: green, amber, orange, red
- [ ] Show specific red flags identified
- [ ] Show explanation of why each flag is suspicious
- [ ] Show "What you should do" action steps
- [ ] Common red flags to detect:
- [ ]   Flag: "Guaranteed returns" language
- [ ]   Flag: Pressure to act immediately
- [ ]   Flag: Interest rate > 100% APR
- [ ]   Flag: Requires upfront fee to receive loan
- [ ]   Flag: No physical address or registration number
- [ ]   Flag: Requests unusual personal information
- [ ]   Flag: Too-good-to-be-true promises
- [ ] Create scam education section: "5 most common scams in [user's country]"
- [ ] Log scam reports anonymously for research purposes
- [ ] Create `lib/ai/scam-prompt.ts` — specialized scam detection prompt

---

## PHASE 7 — Financial Tools

### 7.1 Interest Rate Calculator
- [ ] Create `app/(dashboard)/tools/calculator/page.tsx`
- [ ] Build multi-mode calculator: loan payment, savings growth, APR converter
- [ ] Loan payment calculator inputs: principal, rate, term
- [ ] Show monthly payment amount
- [ ] Show total interest paid
- [ ] Show total amount paid
- [ ] Allow input of informal quote (weekly %, daily %) → convert to annual APR
- [ ] Show APR comparison to legal maximum in user's country
- [ ] Savings growth calculator: initial amount, monthly addition, rate, years
- [ ] Show compound growth chart
- [ ] Show "Power of compound interest" explanation
- [ ] Emergency fund calculator: monthly expenses → recommended fund size
- [ ] Create `components/tools/CalculatorWidget.tsx`

### 7.2 Budget Template Generator
- [ ] Create `app/(dashboard)/tools/budget/page.tsx`
- [ ] Build voice/text income input: "My income is about 15,000 Naira per month"
- [ ] Parse irregular income descriptions
- [ ] Generate suggested budget based on income + local cost of living
- [ ] Use Claude to generate personalized budget advice
- [ ] Show budget as visual pie chart
- [ ] Allow user to adjust allocations
- [ ] Save budget as user's current budget plan
- [ ] Send monthly budget vs actual comparison via notification
- [ ] Create budget template for irregular income earners
- [ ] Show "Your budget" vs "Recommended budget" comparison

### 7.3 Document & Checklist Generator
- [ ] Create `app/(dashboard)/tools/documents/page.tsx`
- [ ] Build bank account opening checklist generator
- [ ] User selects their country + target bank type
- [ ] Show required documents list: ID, proof of address, etc.
- [ ] Check items off as they gather documents
- [ ] Create loan application preparation checklist
- [ ] Create mobile money registration checklist
- [ ] Generate simple budget worksheet (downloadable PDF)
- [ ] Create demand letter template (for unpaid debts)
- [ ] Create `lib/documents/pdf-generator.ts`
- [ ] Use `@react-pdf/renderer` or similar for PDF generation
- [ ] Localize document templates to user's language

---

## PHASE 8 — Internationalization (i18n)

### 8.1 i18n Infrastructure
- [ ] Configure `next-intl` in `next.config.js`
- [ ] Create `i18n.ts` with locale routing config
- [ ] Create `middleware.ts` with locale detection
- [ ] Create `/messages/` directory for all translation files
- [ ] Create `en.json` — English (base language)
- [ ] Create `hi.json` — Hindi translations
- [ ] Create `sw.json` — Swahili translations
- [ ] Create `yo.json` — Yoruba translations
- [ ] Create `bn.json` — Bengali translations
- [ ] Create `tl.json` — Tagalog translations
- [ ] Create `es.json` — Spanish (LatAm) translations
- [ ] Create `pt.json` — Portuguese (Brazil) translations
- [ ] Create `ha.json` — Hausa translations
- [ ] Create `am.json` — Amharic translations
- [ ] Create `zu.json` — Zulu translations
- [ ] Create `ig.json` — Igbo translations
- [ ] Create `ta.json` — Tamil translations
- [ ] Create `id.json` — Bahasa Indonesia translations
- [ ] Create `vi.json` — Vietnamese translations

### 8.2 Translation Keys — Core UI
- [ ] Translate all navigation labels to 15 languages
- [ ] Translate all button labels to 15 languages
- [ ] Translate all error messages to 15 languages
- [ ] Translate all form labels and placeholders to 15 languages
- [ ] Translate all success messages to 15 languages
- [ ] Translate onboarding screens to 15 languages
- [ ] Translate badge names and descriptions to 15 languages
- [ ] Translate module and lesson titles to 15 languages
- [ ] Translate quiz questions to 15 languages
- [ ] Translate financial terms glossary to 15 languages
- [ ] Translate institution descriptions to 15 languages (top 10 per country)
- [ ] Translate scam detector educational content to 15 languages
- [ ] Add RTL layout support for Arabic (future-proofing)
- [ ] Create `lib/i18n/number-format.ts` — locale-aware number formatting
- [ ] Create `lib/i18n/date-format.ts` — locale-aware date formatting
- [ ] Create `lib/i18n/currency-format.ts` — locale-aware currency formatting

### 8.3 Translation Quality
- [ ] Review Hindi translations with native speaker
- [ ] Review Swahili translations with native speaker
- [ ] Review Yoruba translations with native speaker
- [ ] Review Bengali translations with native speaker
- [ ] Review Spanish LatAm translations for regional accuracy
- [ ] Review Tagalog translations with native speaker
- [ ] Test all translations render correctly in Noto Sans
- [ ] Check for text overflow in UI components with long translations
- [ ] Fix any UI components that break with long German/Finnish-style words
- [ ] Test number formatting in each locale
- [ ] Test date formatting in each locale
- [ ] Test currency formatting in each locale
- [ ] Create translation validation test to check for missing keys

---

## PHASE 9 — Offline Capability & PWA

### 9.1 Progressive Web App Setup
- [ ] Create `public/manifest.json` — PWA manifest
- [ ] Set `name: "FinWise"` in manifest
- [ ] Set `short_name: "FinWise"` in manifest
- [ ] Set `theme_color: "#16a34a"` in manifest
- [ ] Set `background_color: "#ffffff"` in manifest
- [ ] Set `display: "standalone"` in manifest
- [ ] Create app icon 192x192px
- [ ] Create app icon 512x512px
- [ ] Create maskable icon variant
- [ ] Add manifest link to `app/layout.tsx`
- [ ] Add `apple-touch-icon` meta tags
- [ ] Test install prompt on Android Chrome
- [ ] Test install prompt on iOS Safari (Add to Home Screen)
- [ ] Create `public/sw.js` — service worker
- [ ] Register service worker in `app/layout.tsx`

### 9.2 Service Worker & Caching
- [ ] Implement cache-first strategy for static assets
- [ ] Implement network-first strategy for API calls
- [ ] Implement stale-while-revalidate for lesson content
- [ ] Cache all lesson content for offline reading
- [ ] Cache user's current module lessons on first load
- [ ] Cache translation files for offline use
- [ ] Cache user's conversation history locally (IndexedDB)
- [ ] Cache financial entries locally (IndexedDB)
- [ ] Implement background sync for financial entries made offline
- [ ] Implement offline fallback page `/offline`
- [ ] Show "You're offline" banner when connection drops
- [ ] Show "Back online — syncing..." when connection restores
- [ ] Implement conflict resolution for offline edits
- [ ] Create `lib/offline/sync.ts` — sync queue management
- [ ] Test offline experience thoroughly on throttled connection

---

## PHASE 10 — Performance & Optimization

### 10.1 Performance Optimization
- [ ] Audit Lighthouse score — target 90+ on mobile
- [ ] Optimize all images with `next/image`
- [ ] Implement lazy loading for below-fold content
- [ ] Implement React Suspense for all async components
- [ ] Add loading skeletons for all data-fetching components
- [ ] Implement route prefetching for likely next pages
- [ ] Minimize JavaScript bundle size — analyze with `@next/bundle-analyzer`
- [ ] Code-split large libraries (recharts, framer-motion)
- [ ] Implement virtual scrolling for long conversation/transaction lists
- [ ] Optimize Supabase queries: select only needed columns
- [ ] Add database query result caching with Redis
- [ ] Implement pagination for all lists (no unbounded queries)
- [ ] Compress API responses with gzip
- [ ] Target Time to Interactive < 3s on 3G (100KB JS budget)
- [ ] Implement font subsetting for Noto Sans (only needed character sets)
- [ ] Preload critical fonts with `<link rel="preload">`

### 10.2 Mobile Optimization
- [ ] Test entire app on 320px width screen (smallest common Android)
- [ ] Test entire app on 375px iPhone SE
- [ ] Ensure all tap targets are minimum 44×44px
- [ ] Implement bottom navigation bar for mobile (thumb-friendly)
- [ ] Optimize chat input for mobile keyboard appearance
- [ ] Handle iOS safe area insets (notch, home bar)
- [ ] Test on Android WebView (some users use Facebook in-app browser)
- [ ] Optimize scroll performance (no janky lists)
- [ ] Test pinch-to-zoom works for accessibility
- [ ] Implement swipe gestures for lesson navigation

### 10.3 Accessibility
- [ ] Audit with axe DevTools — target 0 critical issues
- [ ] Ensure all interactive elements are keyboard-navigable
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Add `role="status"` to loading indicators
- [ ] Implement focus visible outlines on all interactive elements
- [ ] Ensure color contrast meets WCAG AA (4.5:1 ratio)
- [ ] Add `alt` text to all images
- [ ] Test with screen reader (NVDA on Windows, VoiceOver on iOS)
- [ ] Implement skip navigation link
- [ ] Ensure form error messages are associated with inputs via `aria-describedby`
- [ ] Test with increased text size (200% zoom)
- [ ] Implement reduced motion mode for animations

---

## PHASE 11 — Security & Privacy

### 11.1 Security
- [ ] Audit all API routes for missing authentication checks
- [ ] Implement CSRF protection on all mutation endpoints
- [ ] Validate all user inputs with Zod on server-side
- [ ] Sanitize all text displayed in UI to prevent XSS
- [ ] Implement rate limiting on auth endpoints (5 OTP requests/hour)
- [ ] Implement rate limiting on AI endpoints (as designed)
- [ ] Use parameterized queries for all DB operations (Supabase handles this)
- [ ] Audit RLS policies — ensure no data leakage between users
- [ ] Add `Strict-Transport-Security` header
- [ ] Scan dependencies for vulnerabilities: `npm audit`
- [ ] Configure Supabase API key rotation schedule
- [ ] Implement request signing for sensitive operations
- [ ] Add IP-based suspicious activity detection
- [ ] Log all failed auth attempts
- [ ] Create security incident response runbook in docs

### 11.2 Privacy
- [ ] Create privacy policy page `/privacy`
- [ ] Write privacy policy in plain language
- [ ] Translate privacy policy summary to 15 languages
- [ ] Implement data export: user can download all their data
- [ ] Implement account deletion: purge all user data within 24 hours
- [ ] Anonymize conversation data in analytics
- [ ] Do not log full AI responses in application logs
- [ ] Implement data retention policy: auto-delete conversations > 2 years
- [ ] Create cookie consent banner (GDPR-compliant)
- [ ] Create `terms-of-service` page
- [ ] Ensure no tracking pixels or third-party analytics without consent
- [ ] Document data flows in `docs/privacy.md`

---

## PHASE 12 — Testing

### 12.1 Unit Tests
- [ ] Test `lib/ai/system-prompt.ts` — all 5 literacy levels
- [ ] Test `lib/ai/context-builder.ts` — history trimming logic
- [ ] Test `lib/ai/response-parser.ts` — all response types
- [ ] Test `lib/currency.ts` — formatting for all 15 currencies
- [ ] Test `lib/loan-calculator.ts` — simple interest
- [ ] Test `lib/loan-calculator.ts` — compound interest
- [ ] Test `lib/loan-calculator.ts` — amortization schedule
- [ ] Test `lib/remittance.ts` — corridor fee calculation
- [ ] Test `lib/i18n/number-format.ts` for all locales
- [ ] Test `lib/i18n/date-format.ts` for all locales
- [ ] Test onboarding literacy level calculation
- [ ] Test financial health score calculation
- [ ] Test rate limiting logic
- [ ] Test badge award logic — all 20 badge types
- [ ] Test quiz scoring logic

### 12.2 Integration Tests
- [ ] Test auth flow: phone → OTP → session
- [ ] Test chat API: message sent → response streamed → saved to DB
- [ ] Test TTS API: text → audio generated → cached → served
- [ ] Test learning progress: lesson completed → progress saved → badge checked
- [ ] Test financial entry: entry created → dashboard updated → health score recalculated
- [ ] Test savings goal: goal created → contribution added → completion triggered
- [ ] Test institution search: query → filtered results → sorted correctly
- [ ] Test loan matching: answers → algorithm → ranked institutions
- [ ] Test remittance comparison: corridor → providers → sorted by cost
- [ ] Test scam detector: input → Claude → structured risk response

### 12.3 E2E Tests (Playwright)
- [ ] E2E: Complete onboarding flow — language → country → assessment → name → consent
- [ ] E2E: Send first chat message and receive response
- [ ] E2E: Complete a full learning lesson + quiz
- [ ] E2E: Add 5 financial entries and view dashboard
- [ ] E2E: Create and complete a savings goal
- [ ] E2E: Find a microfinance institution near user
- [ ] E2E: Run scam detector analysis
- [ ] E2E: Logout and login again (session persistence)
- [ ] E2E: Test offline mode — complete lesson without internet
- [ ] E2E: Test on mobile viewport (375px)
- [ ] E2E: Test language switch mid-session
- [ ] E2E: Test voice input (where possible in headless)

---

## PHASE 13 — Deployment & DevOps

### 13.1 Vercel Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Configure production environment variables in Vercel
- [ ] Configure staging environment variables in Vercel
- [ ] Set up preview deployments for all PRs
- [ ] Configure custom domain `finwise.app`
- [ ] Configure `www.finwise.app` redirect to apex domain
- [ ] Enable Vercel Analytics
- [ ] Enable Vercel Speed Insights
- [ ] Configure Vercel Cron Job for daily exchange rate refresh
- [ ] Set up Vercel Edge Config for feature flags
- [ ] Configure build output to < 5 minutes
- [ ] Add `vercel.json` with region configuration (deploy to edge near target markets)

### 13.2 Monitoring & Observability
- [ ] Configure Sentry error tracking for Next.js
- [ ] Set up Sentry source maps upload in CI
- [ ] Create Sentry alert for error rate > 1%
- [ ] Create Sentry alert for P95 API response time > 5s
- [ ] Set up Supabase database monitoring
- [ ] Create uptime monitor on Better Uptime or similar
- [ ] Set up alert if app is down for > 5 minutes
- [ ] Create `app/api/health/route.ts` — health check endpoint
- [ ] Health check verifies: DB connection, Anthropic API, ElevenLabs API
- [ ] Create operational dashboard in Vercel Analytics
- [ ] Track key metrics: DAU, messages per user, lesson completion rate, session length

### 13.3 CI/CD Pipeline
- [ ] Create `.github/workflows/ci.yml`
- [ ] CI runs on every push to any branch
- [ ] CI step: install dependencies
- [ ] CI step: run TypeScript type check
- [ ] CI step: run ESLint
- [ ] CI step: run unit tests with vitest
- [ ] CI step: run E2E tests with Playwright
- [ ] CI step: build Next.js app
- [ ] CI step: check bundle size (fail if > 200KB first load JS)
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Deploy to staging on push to `develop` branch
- [ ] Deploy to production on push to `main` branch
- [ ] Add smoke test step after production deployment
- [ ] Send deployment notification to Slack/Discord

---

## PHASE 14 — Content & Demo

### 14.1 Demo Data
- [ ] Create demo account with pre-populated data
- [ ] Demo account: 3 months of financial entries
- [ ] Demo account: 2 completed modules
- [ ] Demo account: 1 active savings goal at 65% completion
- [ ] Demo account: 5 conversation history
- [ ] Demo account: 8 badges earned
- [ ] Create `scripts/seed-demo.ts` to recreate demo data
- [ ] Deploy demo account to production for judges

### 14.2 Demo Video Production
- [ ] Write full 3-minute demo script
- [ ] Record screen capture on 375px mobile viewport
- [ ] Record onboarding sequence: language selection in Yoruba
- [ ] Record baseline assessment completion
- [ ] Record first AI coaching conversation in English
- [ ] Record "How do I borrow money safely?" question + response
- [ ] Record institution finder showing microfinance results in Nigeria
- [ ] Record lesson: "Smart Borrowing" module overview + first lesson
- [ ] Record badge unlock animation
- [ ] Record financial dashboard with 3 months of data
- [ ] Add voiceover narration
- [ ] Add text captions for accessibility
- [ ] Add background music (royalty-free)
- [ ] Edit to exactly 3 minutes
- [ ] Upload to YouTube (unlisted) for Devpost submission
- [ ] Create 3 short 30-second clips for social media

### 14.3 Devpost Submission
- [ ] Write project description for MidNight Hackers (AI + innovation angle)
- [ ] Write project description for NextGen Product Lab (product thinking angle)
- [ ] Write project description for Dev Annual (social good angle)
- [ ] Write project description for Quantum Sprint (FinTech SaaS angle)
- [ ] Write project description for Quest Hackathon (business tech angle)
- [ ] Write project description for HACKHAZARDS (AI + blockchain angle)
- [ ] Take 5 high-quality screenshots for Devpost gallery
- [ ] List all technologies used: Next.js, Claude API, ElevenLabs, Supabase, etc.
- [ ] List ElevenLabs as technology used (sponsor bonus for MidNight, NextGen)
- [ ] List Polygon/GROQ if integrated (HACKHAZARDS sponsor bonus)
- [ ] Create public GitHub repo with clean README
- [ ] Add live demo link to all Devpost submissions
- [ ] Submit to all 6 hackathons before their respective deadlines
- [ ] Submit Dev Annual first (earliest deadline: Mar 23)
- [ ] Submit MidNight Hackers (Mar 25)
- [ ] Submit NextGen Product Lab (Mar 25)
- [ ] Submit Quantum Sprint (Mar 30)
- [ ] Submit Quest Hackathon (Mar 31)
- [ ] Submit HACKHAZARDS (Apr 4)

---

## PHASE 15 — Post-Launch & Stretch Goals

### 15.1 Analytics & Iteration
- [ ] Analyze which lessons have lowest completion rates
- [ ] Analyze most common AI coaching questions
- [ ] Identify top user countries from analytics
- [ ] A/B test onboarding flow variant
- [ ] Analyze voice vs text usage split
- [ ] Collect NPS survey in-app after 7 days of use
- [ ] Read all user feedback and categorize themes
- [ ] Create product backlog from feedback

### 15.2 Stretch: Blockchain Credit Scoring (HACKHAZARDS bonus)
- [ ] Research Polygon network for on-chain storage
- [ ] Design simple on-chain credit score data structure
- [ ] Implement wallet connect (MetaMask / WalletConnect)
- [ ] Store completed module hashes on Polygon Mumbai testnet
- [ ] Create verifiable credential for module completion
- [ ] Build "Share your financial credentials" feature
- [ ] Allow microfinance institutions to verify credentials

### 15.3 Stretch: Community Features
- [ ] Design peer-to-peer savings circle ("chama") feature
- [ ] Allow users to create a savings group
- [ ] Implement shared group goal tracking
- [ ] Build group chat for savings circle members
- [ ] Create leaderboard within savings circles
- [ ] Implement peer accountability nudges

### 15.4 Stretch: SMS / USSD Mode
- [ ] Research Twilio SMS API integration
- [ ] Design USSD menu tree for feature phones
- [ ] Implement basic budgeting via SMS commands
- [ ] Implement AI coaching via SMS (slower, text only)
- [ ] Partner with Twilio for emerging markets pricing
- [ ] Test on feature phone simulator

### 15.5 Stretch: MFI Dashboard (B2B)
- [ ] Design MFI admin portal
- [ ] Allow MFIs to view loan applicant's FinWise literacy score
- [ ] Allow MFIs to assign custom learning paths to applicants
- [ ] Build reporting dashboard: completion rates, literacy improvement
- [ ] Create API endpoint for MFI integration
- [ ] Design white-label configuration panel
- [ ] Create pricing page for B2B tier
