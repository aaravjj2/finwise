# FinWise — 2-Year GitHub Roadmap
## From Hackathon MVP to Financial Infrastructure for Emerging Markets

---

## The North Star

By March 2027, FinWise is not a hackathon project. It is the financial operating
system for first-generation smartphone owners in emerging markets — a platform that
combines on-device AI (via Ollama), autonomous web intelligence (via Lightpanda),
and a peer-verified resource network to give any person with a $50 Android phone
access to the kind of financial guidance that used to require a banker, a lawyer,
and a financial planner.

The two-year arc has three acts:
- Act 1 (Months 1–4): Win the hackathons. Ship a real product.
- Act 2 (Months 5–12): Go from demo to daily-use. Build the intelligence layer.
- Act 3 (Months 13–24): Scale the infrastructure. Open the platform.

---

## Why Lightpanda Changes Everything

Lightpanda (github.com/lightpanda-io/browser) is a headless browser built in Zig.
It is 11x faster than Chrome, uses 9x less memory, starts instantly, and is fully
CDP-compatible (Playwright/Puppeteer work with it unchanged).

For FinWise, this is not a testing tool. It is the intelligence backbone.

Here is what Lightpanda enables that was impossible before:

**Real-time interest rate scraping.** FinWise can run a Lightpanda instance on the
server, navigate to the websites of 200+ microfinance institutions across 20
countries, extract current loan rates, and update its database automatically every
24 hours. No manual data entry. No stale rates. A user in Lagos sees what LAPO is
actually offering today, not what someone typed in 6 months ago.

**Scam website verification.** When a user pastes a suspicious URL or company name,
Lightpanda fetches and renders that page in milliseconds, extracts the content, and
passes it to the local Ollama model for analysis. Does the site have a real address?
Is the registration number format valid for that country? Are there testimonials that
appear on other scam databases? All of this happens in one automated pipeline.

**Remittance rate monitoring.** Western Union, Wise, Remitly, WorldRemit all have
dynamic rates that change hourly. Lightpanda can scrape all of them on a schedule,
compare them, and give users real-time "best route" recommendations. This alone is
worth more than the entire existing remittance comparison feature.

**Financial news localization.** Lightpanda can crawl local financial news sources
(Central Bank of Nigeria announcements, Reserve Bank of India policy changes, Bank
of Ghana rate decisions) and the local Ollama model summarizes them in plain language
in the user's native language. A farmer in rural Nigeria gets the same policy
intelligence as a Lagos banker, 24 hours later.

The key architectural insight: Lightpanda runs on the server as a microservice.
It is not in the browser. A FinWise API route calls the Lightpanda container,
gets structured data back, and serves it to the client. The client never knows
Lightpanda exists. It just sees accurate, fresh data.

---

## Why Local Ollama Changes Everything

Ollama (ollama.ai) lets you run LLMs locally — on the server, no API costs,
no internet dependency for inference. For FinWise's architecture:

**Development:** Developers run Ollama locally. Zero cost. Zero rate limits.
Maya responds to every test message instantly. The mock layer is replaced by
a real LLM running on the developer's machine.

**Staging/Production:** A small Ollama server (even a $20/month VPS with 8GB RAM
can run Llama 3.2 3B or Phi-3 Mini) handles all coaching conversations. The
estimated cost for 10,000 monthly active users: ~$40/month in server costs vs
$400-4,000/month in Claude/Gemini API fees. At emerging market pricing, this
difference is the difference between a sustainable product and one that dies.

**Offline capability (future):** Ollama models can eventually be bundled with
the app for truly offline inference on higher-end devices. A 3B parameter model
quantized to 4-bit is ~2GB — feasible on a modern Android phone with 6GB RAM.

**Model selection by task:**
- Maya coaching conversations → Llama 3.2 3B (fast, conversational, multilingual)
- Scam analysis → Phi-3 Mini (strong reasoning, small footprint)
- Document translation → NLLB-200 (Meta's dedicated translation model, free)
- Financial news summarization → Mistral 7B (strong comprehension)

The development workflow becomes: `ollama serve` in one terminal,
`npm run dev` in another. Full AI functionality, zero API costs, works offline.

---

## MILESTONE MAP

```
Month 1-2    Month 3-4    Month 5-6    Month 7-9    Month 10-12   Month 13-18   Month 19-24
    │            │            │            │              │              │             │
  [MVP]      [Polish]    [Intelligence] [Scale]      [Platform]    [Ecosystem]   [Network]
    │            │            │            │              │              │             │
 Hackathon    Real         Ollama       Lightpanda    B2B API       MFI Portal    Peer
  Submit      Users        Local AI     Web Intel     Launch        Open          Network
              + PWA        Layer        Layer         + Mobile      Source        Launch
```

---

## ACT 1: SHIP (Months 1–4)

### Month 1 — Hackathon Sprint & Real Deployment

**Goal:** 6 hackathon submissions, live URL, first real users

#### Week 1–2: Core product completion (mock AI)
All work in `feature/core-product` branch.

**Testing infrastructure (expand beyond current 45 tests):**

Unit tests to add:
- `tests/unit/mock-responses.test.ts` — test all 8 mock response patterns
- `tests/unit/mock-scam-analyzer.test.ts` — test all rule combinations
- `tests/unit/health-score.test.ts` — test score calculation edge cases
  (zero income, all expenses, no lessons completed, perfect score)
- `tests/unit/loan-calculator.test.ts` — test APR conversion
  (daily → annual, weekly → annual, monthly → annual)
- `tests/unit/remittance.test.ts` — test corridor fee calculations
- `tests/unit/financial-entries.test.ts` — test category aggregation
- `tests/unit/i18n-completeness.test.ts` — verify all 15 language files
  have identical key sets (no missing translations)
- `tests/unit/onboarding-scoring.test.ts` — test literacy level calculation

E2E tests to add:
- `tests/e2e/scam-detector.spec.ts` — full flow: paste message → analyze → see result
- `tests/e2e/lesson-complete.spec.ts` — complete lesson + quiz + badge unlock
- `tests/e2e/financial-entry.spec.ts` — add entry → see dashboard update
- `tests/e2e/savings-goal.spec.ts` — create goal → add contribution → see progress
- `tests/e2e/language-switch.spec.ts` — switch language mid-session
- `tests/e2e/offline-mode.spec.ts` — disconnect network → navigate → reconnect
- `tests/e2e/pwa-install.spec.ts` — verify PWA manifest + service worker registration
- `tests/e2e/mobile-375px.spec.ts` — run full flow at 375px viewport

Performance tests (new category):
- `tests/performance/load-time.test.ts` — verify < 3s on throttled 3G
  (use Playwright network throttling)
- `tests/performance/bundle-size.test.ts` — verify first-load JS < 100KB
- `tests/performance/lighthouse.test.ts` — Lighthouse CI with score thresholds:
  Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90

Accessibility tests (new category):
- `tests/a11y/axe-audit.test.ts` — run axe-core on every page
- `tests/a11y/keyboard-nav.test.ts` — tab through all interactive elements
- `tests/a11y/color-contrast.test.ts` — verify WCAG AA on all text/background combos
- `tests/a11y/screen-reader.test.ts` — verify aria-labels on all icon buttons

**GitHub Actions additions:**
```yaml
# .github/workflows/quality.yml — runs on every PR
jobs:
  performance:
    - Lighthouse CI audit
    - Bundle size check (fail if > 100KB first load)
  accessibility:
    - axe-core audit on all pages
  security:
    - npm audit --audit-level=high
    - Check for hardcoded secrets (gitleaks)
  visual-regression:
    - Percy or Chromatic screenshot comparison
```

#### Week 3–4: Hackathon submissions + first real users

**New GitHub labels:**
- `priority:p0` — blocks submission
- `priority:p1` — needed for demo
- `priority:p2` — nice to have
- `bug:visual` — looks wrong
- `bug:functional` — doesn't work
- `enhancement:ai` — AI/coaching improvements
- `enhancement:ux` — user experience
- `enhancement:data` — content/data improvements

**Issue templates to create:**
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/data_quality.md` (for institution data errors)
- `.github/PULL_REQUEST_TEMPLATE.md`

---

### Month 2 — Post-Hackathon Real Users

**Goal:** 100 real users, feedback loop established, first bug fixes from production

**New branch: `feature/ollama-integration`**

This is the most important technical work of Month 2. Replace the mock layer
with real local AI using Ollama.

**`lib/ai/ollama-client.ts`:**
```typescript
// Unified AI client that tries providers in order:
// 1. Ollama (local) — if OLLAMA_BASE_URL set and reachable
// 2. Mock (built-in) — always available as fallback

class AIClient {
  async chat(messages: Message[], options: ChatOptions): Promise<ReadableStream>
  async isOllamaAvailable(): Promise<boolean>
  async getAvailableModels(): Promise<string[]>
}
```

**`lib/ai/ollama-system-prompt.ts`:**
Identical to the Claude system prompt but tuned for Llama 3.2. Key differences:
- More explicit instruction following needed (vs Claude's implicit understanding)
- Explicit "respond only in {language}" repeated twice
- Explicit "keep response under 200 words" (Llama tends to ramble)
- Explicit JSON format instructions for tool use responses

**Docker Compose for local development:**
```yaml
# docker-compose.dev.yml
services:
  ollama:
    image: ollama/ollama
    volumes:
      - ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  finwise:
    build: .
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
      - ANTHROPIC_API_KEY=mock
    depends_on:
      - ollama
```

**`scripts/setup-ollama.sh`:**
```bash
#!/bin/bash
# Pull the models FinWise needs
ollama pull llama3.2:3b        # Main coaching model (2GB)
ollama pull phi3:mini           # Scam analysis (2.4GB)
ollama pull nomic-embed-text    # Text embeddings for semantic search (274MB)
echo "FinWise AI models ready. Run: docker-compose -f docker-compose.dev.yml up"
```

**`DEVELOPMENT.md` — new file:**
Complete guide for running FinWise fully locally:
1. Install Ollama
2. Run `./scripts/setup-ollama.sh`
3. Run `docker-compose -f docker-compose.dev.yml up`
4. Open http://localhost:3000
Full AI, zero API costs, fully offline.

**New tests for Ollama integration:**
- `tests/unit/ollama-client.test.ts` — mock Ollama HTTP server, test fallback logic
- `tests/integration/ollama-chat.test.ts` — if OLLAMA_BASE_URL set in CI,
  test actual inference with a simple prompt
- `tests/integration/ollama-fallback.test.ts` — verify graceful degradation
  when Ollama is unreachable

---

### Month 3 — Content Depth & Data Quality

**Goal:** 30 complete lessons, 500 real institution records, community feedback

**New branch: `feature/content-expansion`**

**Content pipeline:**
```
data/
├── institutions/
│   ├── raw/          # scraped/manually collected JSON
│   ├── verified/     # human-reviewed, ready for DB
│   └── schema.ts     # TypeScript schema for validation
├── lessons/
│   ├── modules/      # lesson content JSON files
│   └── validate.ts   # content validation script
└── scam-patterns/
    ├── nigeria.json
    ├── india.json
    ├── bangladesh.json
    └── philippines.json
```

**`scripts/validate-content.ts`:**
Run as part of CI. Validates:
- All institution records have required fields
- All interest rates are within plausible range (5–500% APR)
- All lesson content has the required card structure
- All quiz questions have exactly 4 options with 1 correct answer
- All i18n keys referenced in content exist in all 15 language files

**New GitHub workflow: `content-validation.yml`**
Runs on any PR touching `data/` — validates all content, blocks merge if invalid.

---

### Month 4 — Mobile App + PWA Polish

**Goal:** Installable PWA that feels native, < 3s load on 3G

**New branch: `feature/pwa-native`**

**`tests/e2e/pwa.spec.ts` — comprehensive PWA test suite:**
```typescript
test('installs as PWA on Android Chrome', async ({ page }) => {
  // Check manifest is valid
  // Check service worker registers
  // Check beforeinstallprompt fires
  // Verify offline fallback works
})

test('loads in under 3s on 3G throttling', async ({ page }) => {
  await page.route('**', route => {
    route.continue({ // 3G throttling
      // 1.5 Mbps down, 750 Kbps up, 40ms RTT
    })
  })
  const start = Date.now()
  await page.goto('/')
  await page.waitForSelector('[data-testid="app-ready"]')
  expect(Date.now() - start).toBeLessThan(3000)
})

test('works fully offline after first load', async ({ page, context }) => {
  await page.goto('/')
  await page.waitForSelector('[data-testid="app-ready"]')
  await context.setOffline(true)
  // Navigate to lesson
  await page.click('[data-testid="learn-tab"]')
  await page.click('[data-testid="module-savings-basics"]')
  await page.click('[data-testid="lesson-1"]')
  // Lesson should load from service worker cache
  await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible()
})
```

---

## ACT 2: INTELLIGENCE (Months 5–12)

This is where FinWise goes from "a good hackathon project" to "a product people
rely on." The intelligence layer is built on three components:
Lightpanda for web intelligence, Ollama for local AI reasoning,
and a vector database for semantic search.

### Month 5 — Lightpanda Integration: Live Data Pipeline

**Goal:** Real-time institution rates, no manual data entry ever again

**New repository: `finwise-crawler`** (separate repo, imported as submodule)

Architecture:
```
finwise-crawler/
├── src/
│   ├── crawlers/
│   │   ├── mfi-rates.ts      # Microfinance institution rate crawler
│   │   ├── remittance.ts     # Remittance rate crawler
│   │   ├── scam-sites.ts     # Known scam site monitor
│   │   └── news.ts           # Local financial news crawler
│   ├── extractors/
│   │   ├── rate-extractor.ts # Parse interest rates from HTML
│   │   └── contact-extractor.ts
│   ├── validators/
│   │   └── rate-validator.ts # Sanity check scraped rates
│   └── scheduler.ts          # Cron job management
├── docker-compose.yml        # Lightpanda + crawler service
└── README.md
```

**`src/crawlers/mfi-rates.ts`:**
```typescript
import puppeteer from 'puppeteer-core'

// Connect to Lightpanda CDP server instead of Chrome
const browser = await puppeteer.connect({
  browserWSEndpoint: process.env.LIGHTPANDA_CDP_URL || 'ws://lightpanda:9222'
})

async function crawlInstitution(institution: Institution): Promise<RateData> {
  const page = await browser.newPage()
  await page.goto(institution.website, { waitUntil: 'networkidle0', timeout: 10000 })

  // Extract rate data using institution-specific selectors
  const rateData = await page.evaluate((selectors) => {
    // ... extract rates, contact info, product names
  }, institution.crawl_config.selectors)

  await page.close()
  return validateRates(rateData)
}
```

**Why Lightpanda specifically (not Playwright + Chrome):**
- Crawling 200 institutions nightly → Chrome would need 2GB+ RAM per batch
- Lightpanda uses ~100MB for the same workload
- 11x faster means the nightly job finishes in 2 minutes, not 22 minutes
- Can run on a $6/month VPS (1GB RAM) — critical for cost sustainability

**`docker-compose.crawler.yml`:**
```yaml
services:
  lightpanda:
    image: lightpanda/browser:nightly
    ports:
      - "9222:9222"
    command: serve --host 0.0.0.0 --port 9222

  crawler:
    build: ./finwise-crawler
    environment:
      - LIGHTPANDA_CDP_URL=ws://lightpanda:9222
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_SERVICE_KEY=${SUPABASE_SERVICE_KEY}
    depends_on:
      - lightpanda
```

**GitHub Actions: `crawler-nightly.yml`**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily
  workflow_dispatch:      # Manual trigger

jobs:
  crawl:
    runs-on: ubuntu-latest
    services:
      lightpanda:
        image: lightpanda/browser:nightly
        ports:
          - 9222:9222
    steps:
      - Run crawlers against all institutions
      - Validate extracted data
      - Push to Supabase if validation passes
      - Open GitHub Issue if crawl fails for > 5 institutions
      - Post summary to #data-quality Discord channel
```

**New tests for crawler:**
- `tests/unit/rate-extractor.test.ts` — test parsing of real HTML fixtures
- `tests/unit/rate-validator.test.ts` — test validation rules (rate ranges, etc.)
- `tests/integration/lightpanda-crawl.test.ts` — crawl a known test page,
  verify extraction works end-to-end
- `tests/e2e/fresh-rates.spec.ts` — verify app shows rates < 24 hours old

---

### Month 6 — Scam Intelligence: Lightpanda + Ollama Pipeline

**Goal:** Real-time scam site verification, not just rule-based text analysis

**New branch: `feature/scam-intelligence`**

**`lib/scam/site-analyzer.ts`:**
```typescript
interface SiteAnalysisResult {
  url: string
  is_accessible: boolean
  has_physical_address: boolean
  registration_number: string | null
  registration_valid: boolean  // verified against official registrar
  ssl_certificate: boolean
  domain_age_days: number
  scam_indicators: string[]
  trust_score: number  // 0-100
  lightpanda_screenshot_url: string  // stored in Supabase Storage
}

async function analyzeSite(url: string): Promise<SiteAnalysisResult> {
  // 1. Lightpanda fetches and renders the page
  // 2. Extract: address, reg number, contact info, testimonials
  // 3. Ollama (phi3:mini) analyzes the extracted text for red flags
  // 4. Check reg number format against country-specific patterns
  // 5. Return structured result
}
```

**The user flow:**
User in Nigeria receives WhatsApp: "BetterLoan Nigeria — get $500 instantly at 5%!
Visit betterloan-ng.xyz"
→ User pastes URL into FinWise scam detector
→ Lightpanda fetches betterloan-ng.xyz (renders JS, waits for content)
→ Ollama analyzes: no CBN registration number, 3-day-old domain, copy-pasted
  testimonials from known scam database
→ FinWise: "VERY HIGH RISK — This site has 6 serious red flags. Do not send money."

This is genuinely impossible with pure rule-based text matching.
It requires actually visiting the URL and understanding the rendered content.

---

### Month 7 — Semantic Search with Embeddings

**Goal:** "Find me a loan for my farming business" → returns relevant institutions

**New dependency:** Ollama `nomic-embed-text` model (274MB, free)

**`lib/search/embedding.ts`:**
```typescript
async function embedText(text: string): Promise<number[]> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
    method: 'POST',
    body: JSON.stringify({ model: 'nomic-embed-text', prompt: text })
  })
  return response.json().embedding
}

async function semanticSearch(query: string, table: 'institutions' | 'lessons'): Promise<SearchResult[]> {
  const queryEmbedding = await embedText(query)
  // pgvector extension in Supabase for similarity search
  return supabase.rpc('semantic_search', {
    query_embedding: queryEmbedding,
    table_name: table,
    match_threshold: 0.7,
    match_count: 5
  })
}
```

**Supabase pgvector migration:**
```sql
-- migration: 005_vector_search.sql
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE institutions ADD COLUMN embedding vector(768);
ALTER TABLE lessons ADD COLUMN embedding vector(768);
CREATE INDEX institutions_embedding_idx ON institutions
  USING ivfflat (embedding vector_cosine_ops);
```

**New tests:**
- `tests/unit/embedding.test.ts` — mock Ollama, test embedding dimensions
- `tests/integration/semantic-search.test.ts` — test similarity search accuracy
  with known query/result pairs

---

### Month 8–9 — Financial News Intelligence

**Goal:** Local central bank announcements → plain language summaries in user's language

**`finwise-crawler/src/crawlers/news.ts`:**

Sources to monitor:
```typescript
const NEWS_SOURCES = {
  NG: ['https://cbn.gov.ng/MonetaryPolicy', 'https://businessday.ng/finance'],
  KE: ['https://centralbank.go.ke/press-releases', 'https://businessdailyafrica.com'],
  IN: ['https://rbi.org.in/scripts/PressReleaseDisplay.aspx', 'https://economictimes.indiatimes.com/wealth'],
  BD: ['https://bb.org.bd/mediaroom/pressrelease', 'https://thefinancialexpress.com.bd'],
  PH: ['https://www.bsp.gov.ph/Pages/MediaAndResearch/PressReleases', 'https://mb.com.ph/category/business'],
}
```

Lightpanda fetches each source → extracts new articles → Ollama (Mistral 7B)
summarizes in plain language → translated via NLLB-200 → stored as "News" items
in the app's dashboard.

The feature: user opens FinWise dashboard → sees "Central Bank of Nigeria
raised interest rates today. This means: loans from formal banks will cost
more. Good time to refinance existing loans before the change takes effect."
In Yoruba, if that's their language.

---

### Month 10 — B2B API Launch

**Goal:** Microfinance institutions can integrate FinWise into their onboarding

**New branch: `feature/b2b-api`**

**`app/api/v1/` — public API:**
```
POST /api/v1/assess          — financial literacy assessment
GET  /api/v1/score/{userId}  — get user's literacy score
POST /api/v1/modules/assign  — assign custom learning path
GET  /api/v1/progress/{userId} — user's module progress
POST /api/v1/webhook         — receive completion events
```

**New repository: `finwise-sdk`**
```typescript
// JavaScript/TypeScript SDK
import FinWise from '@finwise/sdk'

const client = new FinWise({ apiKey: 'fw_live_...' })

// Microfinance institution flow:
const assessment = await client.assess(phoneNumber)
// Returns: { literacy_score: 72, recommended_modules: [...], can_proceed: true }

await client.assignModules(phoneNumber, ['smart-borrowing', 'loan-basics'])
// User gets notification to complete these modules in FinWise

client.onModuleComplete((event) => {
  // MFI gets notified when borrower completes required training
  approvalWorkflow.proceed(event.userId)
})
```

**Testing for B2B API:**
- `tests/integration/api-v1.test.ts` — full API contract tests
- `tests/load/api-load.test.ts` — k6 load test: 100 concurrent requests
- `tests/security/api-auth.test.ts` — test all authentication edge cases
- API documentation auto-generated from OpenAPI spec → published to `/docs`

---

### Month 11–12 — Mobile App (React Native)

**Goal:** Native app on Google Play (Android first — 80%+ of target market)

**New repository: `finwise-mobile`**

Architecture decision: React Native with Expo, sharing as much logic as
possible with the Next.js web app via a shared `@finwise/core` package.

**New repository: `finwise-core`** (shared business logic)
```
@finwise/core/
├── src/
│   ├── ai/           # AI client (Ollama + mock)
│   ├── financial/    # Calculations, health score
│   ├── i18n/         # All 15 language files
│   ├── types/        # Shared TypeScript types
│   └── validators/   # Zod schemas
```

Both `finwise` (web) and `finwise-mobile` (React Native) import from
`@finwise/core`. Business logic is never duplicated.

**Mobile-specific features:**
- Push notifications (Expo) for lesson reminders and goal milestones
- Biometric authentication (Face ID / fingerprint) as alternative to OTP
- Native voice recording (better than Web Speech API)
- Background sync more reliable than service workers

---

## ACT 3: ECOSYSTEM (Months 13–24)

### Month 13–15 — Open Source Community Build

**Goal:** 50 contributors, 500 GitHub stars, community-maintained institution data

**What to open source beyond the app:**

**`finwise-data`** — a standalone public repository:
The institution database as community-maintained JSON/CSV files. Anyone can
submit a PR to add a microfinance institution, correct a rate, or flag an
institution that has closed. CI validates all submissions against the schema.
This becomes the most comprehensive open-source database of emerging market
financial institutions in existence.

Structure:
```
finwise-data/
├── institutions/
│   ├── africa/
│   │   ├── nigeria.json
│   │   ├── kenya.json
│   │   └── ghana.json
│   ├── asia/
│   │   ├── india.json
│   │   ├── bangladesh.json
│   │   └── philippines.json
│   └── latam/
│       ├── peru.json
│       └── brazil.json
├── scam-patterns/
│   └── [country].json
├── validate.ts
└── CONTRIBUTING.md
```

GitHub Actions on `finwise-data`:
- Validate every PR against schema
- Check for duplicate institutions
- Verify URLs are reachable (using Lightpanda)
- Automatically sync verified data to production Supabase nightly

**Community programs:**
- `good-first-issue` label for translation PRs (add a missing language)
- `data-bounty` label for adding verified institution records
  (target: 100 institutions per country in top 10 markets)
- Monthly "data quality sprint" — focused effort on one country

---

### Month 16–18 — Peer Network (Savings Circles)

**Goal:** Digital chama/susu/rotating savings groups

This feature has no equivalent in any existing product at this price point.
Savings circles (called chama in Kenya, susu in Ghana, tandas in Mexico) are
the dominant savings mechanism for unbanked populations. FinWise digitalizes them.

**`feature/savings-circles` branch:**

Core data model:
```sql
CREATE TABLE savings_circles (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  creator_id uuid REFERENCES users(id),
  target_amount numeric NOT NULL,     -- contribution per period
  period text CHECK (period IN ('weekly','biweekly','monthly')),
  member_count integer,
  current_cycle integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE circle_members (
  circle_id uuid REFERENCES savings_circles(id),
  user_id uuid REFERENCES users(id),
  payout_position integer,            -- when they receive the pot
  total_contributed numeric DEFAULT 0,
  joined_at timestamptz DEFAULT now()
);

CREATE TABLE circle_contributions (
  id uuid PRIMARY KEY,
  circle_id uuid REFERENCES savings_circles(id),
  user_id uuid REFERENCES users(id),
  amount numeric NOT NULL,
  cycle integer NOT NULL,
  confirmed_by uuid[],                -- peer confirmation
  disputed boolean DEFAULT false
);
```

The peer confirmation system: when a member marks their contribution,
2 other members must confirm they received it (or dispute it). This
replaces the trust function that the circle organizer fills in person.
Disputes escalate to the full group for resolution.

**Testing for peer network:**
This is the most complex testing surface in the codebase.

- `tests/unit/circle-logic.test.ts` — payout order, contribution tracking
- `tests/unit/dispute-resolution.test.ts` — dispute state machine
- `tests/integration/circle-flow.test.ts` — full circle lifecycle:
  create → invite → contribute → payout → close
- `tests/e2e/circle-ux.spec.ts` — multi-user E2E with two browser contexts
- `tests/security/circle-permissions.test.ts` — verify members can't access
  other circles, can't modify others' contributions

---

### Month 19–21 — On-Device AI (Ollama WASM)

**Goal:** Fully offline AI inference in the browser, no server required

This is the moonshot feature. llama.cpp with WebAssembly is now mature enough
to run 1B-3B parameter models in the browser on mid-range phones.

**Architecture:**
```
User's phone browser
└── FinWise PWA
    ├── UI layer (React)
    ├── Service Worker
    │   └── Intercepts AI requests
    │       ├── If online → routes to Ollama server
    │       └── If offline → routes to WASM inference
    └── wasm/
        ├── llama.wasm          # llama.cpp compiled to WASM
        └── models/
            └── llama-1b-q4.gguf  # 500MB, downloaded on first use
```

**`lib/ai/wasm-client.ts`:**
```typescript
class WASMInferenceClient {
  private model: LlamaModel | null = null

  async initialize(): Promise<void> {
    // Download model to IndexedDB on first use (one-time, over WiFi)
    // Subsequent uses load from IndexedDB
    this.model = await loadModelFromIDB('llama-1b-q4')
  }

  async generate(prompt: string): Promise<string> {
    if (!this.model) await this.initialize()
    return this.model.generate(prompt, { maxTokens: 256 })
  }
}
```

This means: user in rural Nigeria with no internet, opens FinWise, asks Maya
"Is this loan safe?" — Maya responds. Completely offline. No server. No API key.
No cost. Forever.

**Progressive enhancement strategy:**
- Server Ollama available → use it (best quality, free)
- Server unavailable, WASM model downloaded → use WASM (good quality, offline)
- WASM not downloaded → use rule-based mock (functional, always works)

---

### Month 22–24 — Platform & Integrations

**Goal:** FinWise becomes infrastructure, not just an app

**MFI Integration Portal:**
A dedicated dashboard for microfinance institutions:
- View aggregate literacy scores of their applicant pool (anonymized)
- Assign pre-qualification courses to loan applicants
- API webhook when applicants complete required modules
- Branded white-label version of FinWise for their borrowers

**Mobile Money Integrations:**
- M-Pesa API (Kenya/Tanzania) — direct savings goal top-ups
- bKash API (Bangladesh) — direct contributions
- GCash API (Philippines) — direct contributions
- MTN Mobile Money (West Africa) — payments

These turn FinWise from a coaching app into a financial action app.
"Save $20 toward your school fees goal" → tap → M-Pesa deducted, goal updated.
The advice and the action happen in the same product.

**`finwise-mcp-server`** — a Model Context Protocol server:
Other AI assistants (Claude, Copilot, etc.) can call FinWise as a tool.
"What microfinance institutions offer loans under $500 with no collateral
in Lagos Nigeria?" → MCP call → FinWise returns live data from its crawled DB.

---

## TESTING PHILOSOPHY: THE PYRAMID

```
                    /\
                   /  \
                  / E2E \          30 tests → 100 tests
                 /________\        Full user journeys
                /          \
               / Integration \     20 tests → 80 tests
              /______________\     API contracts, DB operations
             /                \
            /   Performance    \   10 tests → 40 tests
           /____________________\  Load time, bundle size
          /                      \
         /    Accessibility       \  10 tests → 50 tests
        /____________________________\  WCAG compliance
       /                              \
      /          Unit Tests            \  45 tests → 200 tests
     /__________________________________ \ Pure logic, no I/O
    /                                    \
   /         Contract/Schema Tests        \  0 → 30 tests
  /________________________________________\  API responses, DB schema
 /                                          \
/          Visual Regression Tests           \  0 → 50 tests
\____________________________________________/  Screenshot diffs

Target by Month 12: 550+ total tests, 0 known flakiness
```

### Test Quality Standards

**Unit tests — must be:**
- Pure functions only (no network, no DB, no filesystem)
- Under 50ms each
- Deterministic — same input always same output
- Testing behavior, not implementation

**Integration tests — must:**
- Use real Supabase (local Docker) not mocks
- Use real Ollama (local Docker) not mocks
- Test the contract between two real systems
- Run in under 5 minutes total

**E2E tests — must:**
- Run against production-identical environment
- Test complete user journeys (not individual components)
- Run on both desktop (1280px) and mobile (375px) viewports
- Include network throttling tests (3G simulation)

**Performance tests — thresholds:**
- First Contentful Paint: < 1.5s on 4G, < 3s on 3G
- Time to Interactive: < 3s on 4G, < 5s on 3G
- First Load JS: < 100KB (current: 87KB — keep it here)
- Lighthouse Performance: ≥ 85
- Lighthouse Accessibility: ≥ 95

**Security tests — must cover:**
- SQL injection via all user inputs
- XSS via all rendered user content
- CSRF on all mutation endpoints
- Unauthorized access to other users' data (RLS verification)
- Rate limiting on auth and AI endpoints
- Secrets not in git history (run on every commit)

---

## GITHUB REPOSITORY STRUCTURE — FULL 2-YEAR VIEW

```
github.com/aaravjj2/
├── finwise                    # Main web app (this repo)
├── finwise-mobile             # React Native app (Month 11)
├── finwise-crawler            # Lightpanda web intelligence (Month 5)
├── finwise-core               # Shared business logic package (Month 11)
├── finwise-sdk                # B2B JavaScript SDK (Month 10)
├── finwise-data               # Community institution database (Month 13)
└── finwise-mcp-server         # MCP server for AI integrations (Month 22)
```

**`finwise` (main repo) branch strategy:**
```
main          → production, protected, requires 2 reviews
staging       → staging environment, requires 1 review
develop       → integration branch, CI required
feature/*     → individual features, off develop
fix/*         → bug fixes, off main for hotfixes
data/*        → content/data changes only, lighter review
```

**GitHub Projects:**
- "Hackathon Sprint" — active now, closes April 2026
- "Real Users V1" — Month 2–4
- "Intelligence Layer" — Month 5–9
- "Platform" — Month 10–12
- "Ecosystem" — Month 13–24

**Milestones with GitHub Milestones feature:**
- v0.1.0 — Hackathon submission (March 2026)
- v0.2.0 — First real users (May 2026)
- v0.3.0 — Ollama integration (June 2026)
- v1.0.0 — Lightpanda + live data (August 2026)
- v1.5.0 — Mobile app (December 2026)
- v2.0.0 — Peer network (March 2027)

---

## THE LIGHTPANDA + OLLAMA + FINWISE ARCHITECTURE (MONTH 12)

```
User's Phone (375px Android)
└── FinWise PWA
    ├── React UI
    ├── Service Worker (offline cache)
    └── IndexedDB (local data + sync queue)
         │
         │ HTTPS
         ▼
Vercel Edge (CDN + serverless)
├── Next.js API Routes
│   ├── /api/chat → Ollama server
│   ├── /api/scam-analyze → Lightpanda + Ollama
│   ├── /api/institutions → Supabase (crawled by Lightpanda nightly)
│   └── /api/rates → Redis cache (refreshed by Lightpanda hourly)
│
├── Supabase PostgreSQL + pgvector
│   ├── User data (RLS protected)
│   ├── Institution data (crawled, validated)
│   ├── Lesson content (versioned)
│   └── Conversation history
│
├── Ollama Server ($20/month VPS)
│   ├── llama3.2:3b (Maya coaching)
│   ├── phi3:mini (scam analysis)
│   ├── nomic-embed-text (semantic search)
│   └── mistral:7b (news summarization)
│
└── Lightpanda Container ($6/month VPS)
    ├── CDP server on port 9222
    ├── Nightly institution crawler (200 MFIs)
    ├── Hourly remittance rate scraper
    ├── Real-time scam site analyzer
    └── Daily news intelligence crawler
```

Monthly infrastructure cost at 10,000 MAU:
- Vercel: $0 (free tier covers this scale)
- Supabase: $25 (Pro plan)
- Ollama VPS: $20
- Lightpanda VPS: $6
- Redis (Upstash): $0 (free tier)
- **Total: $51/month**

Compare to API-based approach at 10,000 MAU:
- Claude API (avg 5 messages/user/month = 50k messages): ~$250
- ElevenLabs: ~$50
- Total: ~$300+/month

The Ollama + Lightpanda architecture is 6x cheaper at this scale,
and the gap widens as usage grows.

---

## METRICS TO TRACK IN GITHUB (via GitHub Insights + custom dashboard)

**Product metrics (tracked in Supabase, displayed in internal dashboard):**
- Daily/Monthly Active Users
- Messages per active user per session
- Lesson completion rate per module (target: > 60%)
- Quiz pass rate on first attempt (target: > 70%)
- Financial entries per user per month (habit formation metric)
- Scam detector uses per week (safety impact metric)
- D1/D7/D30 retention (D30 target: > 20%)

**Technical metrics (tracked in GitHub Actions):**
- CI pass rate (target: > 95%)
- Mean time to green after a failing commit (target: < 30 min)
- Bundle size trend (must stay < 100KB first load JS)
- Test coverage trend (must increase or stay flat, never decrease)
- Lighthouse score trend (must stay ≥ 85)
- Crawler success rate (target: > 98% of institutions successfully crawled)

**Community metrics (tracked in GitHub):**
- Stars, forks, watchers
- Open issues age (target: P0 issues closed < 48 hours)
- PR review time (target: < 2 days for community PRs)
- Contributors per month
- `finwise-data` PRs merged (institution data quality metric)
