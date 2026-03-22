# FinWise — 2-Year Strategic Plan & Implementation Roadmap
## From Live MVP to Financial Infrastructure Platform

---

## WHERE YOU ARE RIGHT NOW (March 2026)

**What's real:**
- Live at https://finwise-azure.vercel.app
- Auth wall working, demo mode working
- CI/CD pipeline green, 82 workflow runs
- Supabase connected, schema live
- 6 hackathon submissions window still open
- 0 open PRs, clean main branch

**What's missing for judges to be impressed:**
- The chat page likely shows a blank state or errors without Supabase session
- No visible AI response yet (mock streaming needs verification)
- Dashboard has no data to display
- Learning modules may be scaffolded but not content-complete
- No screenshots in the README
- No live demo link in README

**The gap between "deployed" and "demoable" is 1-2 days of focused work.**
That is the immediate priority before any 2-year thinking matters.

---

## THE 2-YEAR VISION

FinWise in March 2028 is not a web app. It is a financial operating system
that runs on any device, speaks any language, works without internet, costs
almost nothing to operate, and is trusted by microfinance institutions in
12+ countries as the literacy layer before loan disbursement.

The product has three layers by Year 2:

**Layer 1 — The Coach (Maya):** Conversational AI that knows the user's
financial history, speaks their language, runs locally via Ollama on cheap
servers, and gives advice that is actually calibrated to their country's
regulations, institutions, and economic context.

**Layer 2 — The Network:** A community-maintained database of 2,000+
verified microfinance institutions, scam registries, and remittance routes —
kept fresh automatically by Lightpanda crawlers running nightly, with humans
reviewing flagged entries.

**Layer 3 — The Platform:** An API and white-label SDK that lets MFIs,
NGOs, and government programs embed FinWise as their financial literacy
requirement layer. When a borrower applies for a loan, the MFI sends them
to FinWise first. FinWise trains them, certifies them, and sends a
literacy score back. The MFI uses that score in underwriting.

This is the business model. Layer 1 and 2 build the trust and the user
base. Layer 3 monetizes it without charging users a cent.

---

## ACT 1: WIN + STABILIZE (Months 1-4, March–June 2026)

### The Immediate Week (Before March 23 Dev Annual Deadline)

**Priority 1: Verify the demo flow works end-to-end**
Open https://finwise-azure.vercel.app in an incognito window.
Click "Continue without account."
Complete onboarding — does it work? Does language selection persist?
Send a message to Maya — does streaming work? Does a response appear?
Go to Learn — do module cards show? Can you click into a lesson?
Go to Dashboard — does it load without crashing?

Every "no" in that list is a hackathon submission killer.
Fix those before writing a single Devpost description.

**Priority 2: The 5 demo screenshots**
Mobile viewport (375px in Chrome DevTools), 5 screens:
1. Language picker — colorful grid of 15 flags
2. Chat with Maya — a real response visible on screen
3. Module grid — 6 modules with progress indicators
4. Dashboard — health score ring + monthly summary cards
5. Scam detector — "VERY HIGH RISK" result for the example input

These screenshots go in the README and on every Devpost submission.

**Priority 3: README live demo badge**
`[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://finwise-azure.vercel.app)`
This needs to be the first thing in the README, before the description.

**Priority 4: Devpost descriptions (different angle per hackathon)**

Dev Annual (Mar 23) — Social Good angle:
Open with: "Amara is 32. She sells vegetables at a market stall in Lagos.
Last month, a man offered her a loan at 5% per week. She almost took it —
that's 260% APR. She didn't know. FinWise would have told her."

MidNight Hackers (Mar 25) — Innovation + ElevenLabs angle:
Open with the technical architecture. Lead with voice-first, multilingual,
15 languages, ElevenLabs integration. Judges here want to see technical depth.

NextGen Product Lab (Mar 25) — Product thinking angle:
Open with the problem-solution fit. Show user research thinking. Talk about
Amara, Raj, and Maria as personas. Show the product decisions that came from
understanding the user.

Quantum Sprint (Mar 30) — FinTech SaaS angle:
Open with the business model. MFI licensing, B2B API, $51/month infra cost
at 10k MAU vs $300+/month cloud AI. Show the unit economics.

Quest Hackathon (Mar 31) — Business tech angle:
Lead with the market size. 1.4B unbanked, $170B lost annually to bad
financial decisions. Show the FinTech + AI stack. Emphasize responsiveness.

HACKHAZARDS (Apr 4) — AI + community angle:
Lead with the open source angle. Community institution database. Groq
integration for fast inference. Future Polygon integration for on-chain
literacy certificates. Show the builder story.

---

### Month 2 (April 2026) — First Real Users

**Goal: 50 real users outside of hackathon judges**

Where to find them:
- Post on r/fintech, r/financialindependence, r/investing (international subs)
- Share in WhatsApp groups in Nigeria, Kenya, Bangladesh (if you have contacts)
- Post on LinkedIn with the story about Amara
- Submit to Product Hunt
- Post on Hacker News "Show HN: FinWise — free financial coaching for emerging markets"

**The feedback infrastructure:**
- Add a simple in-app feedback button (bottom of every page): "Was this helpful? 👍 👎"
- Add a post-session prompt after 3rd chat message: "Rate Maya (1-5 stars)"
- Create a public Notion page: "FinWise — What we're building and why"
- Create a Discord server for early users

**What to fix based on expected feedback:**
Users will likely say: Maya's responses feel generic, the loading is slow on
mobile data, and they don't understand what "financial health score" means.
Those three things will come up constantly. Fix them first.

**Ollama integration:**
Month 2 is when you replace mock AI with real local AI using Ollama.
This is zero cost and dramatically improves response quality.
- Set up a $20/month VPS (Hetzner CX21 or DigitalOcean Droplet)
- Install Ollama + pull llama3.2:3b
- Set OLLAMA_BASE_URL in Vercel environment variables
- Maya is now powered by real AI at $20/month total infrastructure cost

---

### Month 3 (May 2026) — Content Depth

**Goal: 30 complete lessons, 200 institution records, scam pattern library**

**Lesson completion target:**
- Savings Basics: 5 lessons + 5 quizzes ✓
- Smart Borrowing: 5 lessons + 5 quizzes
- Sending Money Home: 5 lessons + 5 quizzes
- Protecting Your Money: 5 lessons + 5 quizzes
- Running a Business: 5 lessons + 5 quizzes
- Planning Your Future: 5 lessons + 5 quizzes

Each lesson: culturally-specific analogies per target market. A lesson on
compound interest should use different analogies for a Nigerian farmer vs
a Bangladeshi garment worker vs a Peruvian street vendor.

**Institution database expansion:**
Create `finwise-data` as a separate public GitHub repository.
Structure: one JSON file per country. Community PRs to add institutions.
Target: 20 verified institutions per top-10 country = 200 records.
GitHub Actions validates every PR against the schema before merging.

**Scam pattern library:**
Create `data/scam-patterns/` with country-specific JSON files.
Each file: array of scam types with patterns, red flags, real examples.
These feed the scam detector to make it country-aware, not generic.

---

### Month 4 (June 2026) — PWA Polish + Mobile Performance

**Goal: Installable, 90+ Lighthouse, < 3s on 3G**

**Performance audit:**
- Run Lighthouse CI on every PR (already in pipeline — verify it's running)
- Target: Performance ≥ 90, Accessibility ≥ 95
- Bundle size must stay < 100KB first load JS
- Images: all through next/image with proper sizing
- Fonts: subset Noto Sans to only the character sets needed

**PWA completeness:**
- App installs on Android Chrome (test on a real device)
- Offline fallback page shows when network disconnected
- Service worker caches all lesson content on first load
- IndexedDB sync queue processes on reconnection

**The real mobile test:**
Find someone with a $100-150 Android phone (Tecno, Infinix, or similar —
the phones that dominate emerging markets). Let them use the app.
Watch where they get stuck. Fix those things. Nothing else matters more.

---

## ACT 2: INTELLIGENCE (Months 5-12, July 2026–February 2027)

### Month 5-6 — Lightpanda Web Intelligence Layer

**Goal: Zero manual data entry. Every institution rate is live and verified.**

This is the most technically interesting part of the 2-year plan and the
thing that makes FinWise genuinely defensible. Nobody else is doing this.

**What Lightpanda enables:**
Lightpanda is a headless browser written in Zig. 11x faster than Chrome,
9x less memory, CDP-compatible. It runs as a $6/month container and crawls
200+ microfinance institution websites nightly.

The result: when a user in Lagos opens the institution finder, she sees
LAPO's current rate — not a rate someone typed in 6 months ago.

**New repository: `finwise-crawler`**
```
finwise-crawler/
├── src/
│   ├── crawlers/
│   │   ├── mfi-rates.ts         # MFI website rate extraction
│   │   ├── remittance-rates.ts  # Wise/WU/Remitly rate scraping
│   │   ├── scam-registry.ts     # Known scam site monitoring
│   │   └── news.ts              # Central bank announcement monitoring
│   ├── extractors/
│   │   └── rate-extractor.ts    # Parse rates from rendered HTML
│   └── scheduler.ts             # Cron job management
├── docker-compose.yml           # Lightpanda + crawler
└── README.md
```

**Crawler connects to Lightpanda via CDP:**
```typescript
import puppeteer from 'puppeteer-core'
const browser = await puppeteer.connect({
  browserWSEndpoint: process.env.LIGHTPANDA_CDP_URL
})
```

**GitHub Actions nightly job:**
Runs at 2 AM UTC. Crawls all institutions. Validates rates.
Pushes to Supabase if validation passes. Opens a GitHub Issue if
more than 5 institutions fail to crawl. Posts summary to Discord.

**The scam site analyzer:**
User pastes a URL → Lightpanda fetches and renders it → Ollama analyzes
the full rendered content → returns structured risk assessment.
This is not rule-based keyword matching. It visits the actual site.
A 3-day-old domain with copied testimonials and no CBN license number
gets caught. A legitimate MFI with a proper registration page does not.

---

### Month 7-8 — Semantic Search + Knowledge Base

**Goal: "Find me a loan for my farming business" returns the right results**

**Stack addition: pgvector + nomic-embed-text**

Supabase supports pgvector natively. Ollama serves the embedding model.
Every institution record and every lesson gets embedded on creation.
Search becomes semantic, not keyword.

```sql
-- One migration
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE institutions ADD COLUMN embedding vector(768);
ALTER TABLE lessons ADD COLUMN embedding vector(768);
CREATE INDEX ON institutions USING ivfflat (embedding vector_cosine_ops);
```

**The knowledge base:**
Build a structured financial knowledge base specific to each country.
Nigeria: CBN regulations, approved MFI list, common scam types, APR legal max.
Kenya: CMA regulations, M-Pesa rules, SACCO structure, microfinance law.
Bangladesh: Bangladesh Bank rules, MRA-licensed MFIs, bKash regulations.

Maya uses this knowledge base in every response — she knows the local
regulatory context, not just generic global financial advice.
This makes FinWise 10x more useful than any generic financial AI.

---

### Month 9-10 — B2B API

**Goal: First paying MFI customer**

This is the monetization unlock. One MFI paying $500/month is more
valuable than 1,000 free users for proving the business model.

**Target customers:**
- LAPO Nigeria (already in institution DB — warm connection opportunity)
- BRAC Bangladesh (world's largest MFI — a logo that opens doors)
- Kenya Women Microfinance Bank
- Any MFI that has a digital lending product and needs financial literacy
  as a loan eligibility requirement

**The pitch:**
"Before you disburse a loan, require the borrower to complete 3 FinWise
modules. Their literacy score is available via API. Borrowers who complete
training have 23% lower default rates (cite research, not our own data yet).
$500/month for unlimited API calls. First 3 months free."

**API surface:**
```
POST /api/v1/assess          — run literacy assessment
GET  /api/v1/score/:phone    — get user's current score
POST /api/v1/assign          — assign required modules
GET  /api/v1/progress/:phone — check completion status
POST /api/v1/webhook         — register completion webhook
```

**New repository: `finwise-sdk`**
A JavaScript/TypeScript SDK that wraps the API. MFIs integrate it into
their loan origination workflow in an afternoon.

---

### Month 11-12 — React Native Mobile App

**Goal: Google Play listing, 1,000 installs**

The PWA covers most use cases but a native app has two advantages that
matter enormously for the target market: push notifications and better
offline performance on low-RAM Android devices.

**New repository: `finwise-mobile`**
React Native + Expo. Shares all business logic with web via `@finwise/core`.
The monorepo structure:
```
finwise-core/     # Shared TypeScript logic
finwise/          # Next.js web app (imports from core)
finwise-mobile/   # React Native app (imports from core)
```

**Mobile-specific features:**
- Push notifications: lesson reminders, goal milestones, scam alerts
- Biometric auth: Face ID / fingerprint instead of OTP
- Native voice: better than Web Speech API on Android
- Background sync: more reliable than service workers

**Google Play submission:**
- Target: 3 screenshots + short description + privacy policy
- Category: Finance
- Content rating: Everyone
- Initial rollout: Nigeria, Kenya, Bangladesh, Philippines (4 countries)

---

## ACT 3: ECOSYSTEM (Months 13-24, March 2027–March 2028)

### Month 13-15 — Open Source Community

**Goal: 50 contributors, 1,000 GitHub stars, self-sustaining data quality**

**`finwise-data` as the core community asset:**
This repository becomes the most comprehensive open-source database of
emerging market financial institutions in existence. It is valuable
independent of the app. Researchers, journalists, NGOs, and competing
apps all want this data.

Community programs:
- `good-first-issue` label for translation PRs
- `data-bounty` label: add 10 verified institutions in your country,
  get a FinWise contributor badge and your name in the README
- Monthly "data quality sprint" — pick a country, verify all records

**`finwise-mcp-server`:**
A Model Context Protocol server so other AI assistants can call FinWise
as a tool. Claude, Copilot, or Gemini can answer "what microfinance
institutions offer loans in Lagos?" by querying FinWise's live database.
This dramatically expands distribution without building a new product.

---

### Month 16-18 — Savings Circles (Chama Feature)

**Goal: The killer social feature that drives viral growth**

Savings circles — called chama in Kenya, susu in Ghana, tanda in Mexico,
hui in China — are the dominant savings mechanism for unbanked populations
worldwide. An estimated 600 million people participate in informal savings
circles. None of them have a digital tool designed for them.

**The feature:**
A group creates a circle. Everyone contributes the same amount each period.
One member receives the full pot each round, rotating until everyone has
received once. FinWise digitizes the trust layer that the circle organizer
fills in person — peer confirmation of payments, dispute resolution, and
transparent ledger.

**Why this drives growth:**
When one member invites their circle online, they bring 5-15 other users
with them. The circle creates a social obligation to remain active. It is
the highest-retention feature in the product by design — you cannot leave
a savings circle mid-cycle without social consequences.

**The data model:**
```sql
CREATE TABLE savings_circles (
  id uuid PRIMARY KEY,
  name text,
  contribution_amount numeric,
  period text,  -- weekly/monthly
  current_cycle integer DEFAULT 1
);

CREATE TABLE circle_members (
  circle_id uuid,
  user_id uuid,
  payout_position integer,
  confirmed_by uuid[]  -- peer confirmation array
);
```

---

### Month 19-21 — On-Device AI (WASM Inference)

**Goal: Full offline AI on mid-range Android phones**

llama.cpp compiled to WebAssembly now runs 1B-3B parameter models in
a browser on a modern phone. The model file (~500MB for a quantized 1B
model) downloads once over WiFi and is stored in IndexedDB.

After that: no server, no API, no cost, no internet required.
Maya responds from the phone itself.

This is the product promise fully realized: a farmer in rural Nigeria
with no mobile data, asking Maya whether a loan is safe, getting a
real answer. Completely offline. Forever.

**Progressive enhancement:**
```
Ollama server available → use it (best quality, ~$20/month)
Ollama unavailable + WASM model downloaded → use WASM (good quality, free)
WASM not downloaded → use rule-based mock (functional, always works)
```

The user never notices which mode they are in. Maya just responds.

---

### Month 22-24 — Mobile Money Integrations

**Goal: FinWise is where you coach AND where you act**

The gap between financial literacy and financial action is enormous.
Knowing you should save $20/month and actually saving $20/month require
different products. FinWise closes that gap by integrating directly with
the payment rails users already trust.

**Integrations:**
- M-Pesa API (Kenya, Tanzania, Ethiopia) — direct savings goal contributions
- bKash API (Bangladesh) — link savings goals to bKash wallet
- GCash API (Philippines) — link savings goals to GCash
- MTN Mobile Money (Ghana, Nigeria, Uganda) — universal West Africa integration

**The user experience:**
User creates a savings goal: "School fees — 120,000 NGN by September."
FinWise calculates: "Save 8,000 NGN per week to hit your goal."
User taps "Set up automatic saving."
Every Monday, 8,000 NGN moves from their MTN Mobile Money to a
designated savings bucket, automatically.
FinWise tracks it, notifies them of progress, and adjusts the
weekly amount if they miss a week.

This is not fintech. This is the full financial coach experience.

---

## THE COST STORY (Why This Is Sustainable)

| Scale | Ollama + Lightpanda | Cloud AI (Claude/GPT) |
|-------|--------------------|-----------------------|
| 1,000 MAU | $26/month | $30/month |
| 10,000 MAU | $51/month | $300/month |
| 100,000 MAU | $110/month | $3,000/month |
| 1,000,000 MAU | $420/month | $30,000/month |

At 1M MAU, Ollama + Lightpanda is 71x cheaper than cloud AI.
This is not an optimization — it is the difference between a
sustainable product and one that dies at scale.

---

## THE REPOSITORY ECOSYSTEM (Full 2-Year View)

```
github.com/aaravjj2/
├── finwise              # Main web app — Next.js PWA
├── finwise-mobile       # React Native app (Month 11)
├── finwise-crawler      # Lightpanda intelligence layer (Month 5)
├── finwise-core         # Shared business logic package (Month 11)
├── finwise-sdk          # B2B TypeScript SDK (Month 10)
├── finwise-data         # Community institution database (Month 13)
└── finwise-mcp-server   # MCP server for AI integrations (Month 22)
```

**Versioning:**
- v0.1.0 — Hackathon submission (March 2026) ← YOU ARE HERE
- v0.2.0 — First real users + Ollama (May 2026)
- v0.3.0 — Lightpanda live data (August 2026)
- v1.0.0 — B2B API launch (October 2026)
- v1.5.0 — Mobile app (January 2027)
- v2.0.0 — Savings circles + mobile money (March 2027)
- v2.5.0 — On-device WASM AI (September 2027)
- v3.0.0 — Full platform (March 2028)

---

## METRICS THAT MATTER

**Product health (monthly):**
- D1 retention: % users who return next day after onboarding
- D30 retention: % users still active after 30 days (target: >20%)
- Lesson completion rate: % started lessons that get finished (target: >60%)
- Messages per active user per session (target: >5)
- Scam detector uses per week (impact metric)
- Financial entries logged per user per month (habit formation)

**Technical health (per commit):**
- CI pass rate: >99%
- Bundle size: <100KB first load JS
- Lighthouse Performance: ≥90
- Test coverage: never decreasing
- Mean time to deploy: <5 minutes

**Business health (quarterly):**
- MFI API integrations (target: 1 by Month 10, 5 by Month 18)
- Revenue per MFI customer (target: $500/month)
- Cost per active user (target: <$0.05/month)
- GitHub stars (target: 500 by Month 12, 2,000 by Month 24)
