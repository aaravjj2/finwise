# FinWise — AI Financial Literacy Coach for Emerging Markets
## Complete Project Plan

---

## Vision Statement

FinWise is a voice-first, multilingual AI financial literacy platform designed for the 1.4 billion unbanked and underbanked adults in emerging markets. It meets users where they are — on cheap Android phones, with intermittent connectivity, in their native language — and guides them from zero financial knowledge to confident money management through conversational AI, personalized learning paths, and real-world action tools.

This is not another fintech app for the already-banked. FinWise targets the rural farmer in Nigeria who has never held a savings account, the garment worker in Bangladesh sending remittances home, the street vendor in Peru trying to understand microloans. The product speaks their language, works on their device, and solves their actual problems.

---

## Problem Statement

### The Gap
- **1.4 billion adults** globally have no bank account
- **3.5 billion more** are underbanked — they have accounts but lack access to credit, insurance, or investment products
- Financial illiteracy costs emerging market households an estimated **$170 billion annually** in bad financial decisions, predatory lending, and missed savings
- Existing financial literacy resources are: in English only, require fast internet, designed for desktop, assume basic financial vocabulary, and are not personalized

### The Consequence
- Farmers take out high-interest informal loans (200–400% APR) because they don't know microfinance institutions exist
- Remittance senders lose 6–10% to fees because they don't know lower-cost options exist
- Families keep cash under mattresses because they don't understand deposit insurance
- First-time borrowers default on microloan obligations they didn't fully understand

### Why Now
- Smartphone penetration in Sub-Saharan Africa, South Asia, and Latin America hit 50%+ in 2024
- LLM API costs have dropped 90% since 2022 — real-time AI is now economically viable at scale
- ElevenLabs and similar voice APIs can now produce natural speech in 30+ languages including Swahili, Hindi, Tagalog, and Bengali
- Mobile money infrastructure (M-Pesa, bKash, GCash) has created a foundation to build financial products on top of

---

## Target Users

### Primary Persona: "Amara" — Rural Micro-entrepreneur, Nigeria
- Age 32, sells produce at a market stall
- Has a basic Android phone (2GB RAM), uses mobile data sparingly
- Speaks Yoruba primarily, limited English
- Monthly income ~$180, variable
- Has heard of bank accounts but has never opened one — doesn't know how, fears minimum balances

### Secondary Persona: "Raj" — Urban Factory Worker, Bangladesh
- Age 26, sends $80/month to family in rural area
- Smartphone user, uses WhatsApp daily
- Speaks Bengali, some English
- Wants to start saving but doesn't trust banks after hearing stories from relatives
- Has been approached by loan sharks; doesn't know legal alternatives exist

### Tertiary Persona: "Maria" — Street Vendor, Peru
- Age 45, sells food from a cart
- Basic smartphone, Spanish only
- Has a savings account but never uses it — doesn't understand interest
- Was rejected for a microloan and doesn't know why or what to do

---

## Product Overview

### Core Features

#### 1. Conversational AI Financial Coach (Voice + Text)
- Natural language conversations in 15 languages at launch
- Asks questions to understand user's financial situation, goals, and knowledge level
- Explains concepts in plain language with local analogies (e.g., "interest is like rent you pay on money you borrow")
- Remembers conversation history and personalizes over time
- Works via text or voice (ElevenLabs TTS/STT)

#### 2. Personalized Learning Paths
- Adaptive curriculum based on user's baseline knowledge assessment
- Modules: Savings basics, Budgeting, Borrowing safely, Sending money home, Insurance, Starting a business
- Each module: 5-minute lessons, 3-question quizzes, real action steps
- Tracks progress, awards digital badges
- Offline-capable module content

#### 3. Financial Health Dashboard
- Simple income/expense tracker (manual entry or voice input)
- "Financial health score" — a plain-language meter with actionable tips
- Monthly summary in local language
- Savings goal tracker with visual progress

#### 4. Resource Connector
- Database of local microfinance institutions, NGOs, government programs by country/region
- Curated by verifiability — only institutions with public registration
- "Find a loan" — matches user to appropriate products based on their profile
- "Find a remittance option" — compares fees for sending money to common corridors

#### 5. Scam & Predatory Lending Detector
- User describes a financial offer → AI evaluates red flags
- Interest rate calculator: "Is this a good deal?"
- Loan shark identification checklist
- Phishing message analyzer (paste suspicious message)

#### 6. Action Toolkit
- Document templates: bank account opening checklist, loan application prep
- Step-by-step guides: "How to open your first bank account in [Kenya/India/Philippines]"
- Savings commitment device: user sets a goal, gets reminders
- Budget template generator (voice-input friendly)

---

## Technical Architecture

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Offline Support:** Service Workers + IndexedDB for lesson caching
- **PWA:** Installable on Android home screen, works without app store
- **Voice:** ElevenLabs SDK for TTS, Web Speech API for STT
- **i18n:** next-intl, 15 languages at launch

### Backend
- **Runtime:** Node.js with Next.js API routes
- **AI:** Claude claude-sonnet-4-6 via Anthropic SDK (primary reasoning), Claude Haiku for lightweight tasks
- **Voice Processing:** ElevenLabs API
- **Database:** PostgreSQL (Supabase) — user profiles, progress, conversation history
- **Cache:** Redis (Upstash) — session state, rate limiting
- **Auth:** Supabase Auth (phone number OTP — no email required)
- **File Storage:** Supabase Storage (audio files, user documents)

### Infrastructure
- **Hosting:** Vercel (frontend + API routes)
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics + Sentry
- **CI/CD:** GitHub Actions

### External APIs
- **ElevenLabs:** TTS in 15 languages
- **Anthropic:** Claude API for AI coaching
- **Exchange Rate API:** Real-time rates for remittance comparison
- **Google Maps API:** Locate nearby financial institutions

---

## Languages at Launch
1. English
2. Hindi
3. Swahili
4. Yoruba
5. Bengali
6. Tagalog
7. Spanish (LatAm)
8. Portuguese (Brazil)
9. Hausa
10. Amharic
11. Zulu
12. Igbo
13. Tamil
14. Bahasa Indonesia
15. Vietnamese

---

## Monetization (For Pitch)

### B2C (Free + Premium)
- Free tier: 3 AI coaching sessions/month, 2 learning modules, basic dashboard
- Premium ($1.99/month): Unlimited coaching, all modules, resource connector, offline mode
- Price point designed for emerging market purchasing power

### B2B (Main Revenue)
- White-label licensing to microfinance institutions: they deploy FinWise branded as their own financial literacy tool for loan applicants
- NGO/Government partnerships: license to financial inclusion programs
- API access: financial institutions integrate FinWise coaching into their onboarding flows

### Estimated TAM
- 200M smartphone-owning unbanked adults in target markets × $12/year = $2.4B TAM
- MFI licensing: 10,000+ MFIs globally × $500–$5,000/year = $50M–$500M

---

## Hackathon Submission Framing

### MidNight Hackers / NextGen Product Lab
- Emphasize: AI innovation (voice + LLM + multilingual), real-world applicability, clean UX
- Highlight: ElevenLabs sponsor integration, product thinking

### Dev Annual Hackathon
- Emphasize: Social Good track, AI/ML implementation, real-world impact on underserved populations
- Highlight: 1.4B addressable problem, measurable impact metrics

### Quantum Sprint
- Emphasize: FinTech track, SaaS business model, scalability, production-readiness
- Highlight: B2B licensing model, white-label architecture

### Quest Hackathon
- Emphasize: Business technology, FinTech, practical solution, responsiveness
- Highlight: Mobile-first PWA, offline capability

### HACKHAZARDS '26
- Emphasize: AI track, social impact, Polygon Web3 angle (on-chain credit scoring via Polygon sponsor)
- Highlight: GROQ sponsor integration (fast inference for voice conversations)

---

## Demo Flow (3-minute video script outline)

1. **Hook (0:00–0:20):** Show the problem — a farmer in Nigeria turns down a 300% APR loan from a loan shark because he doesn't know alternatives exist. Cut to: "What if he had a coach in his pocket?"
2. **Onboarding (0:20–0:45):** User opens FinWise, selects Yoruba, does a 60-second financial baseline assessment via voice. App identifies: no savings account, limited borrowing knowledge.
3. **AI Coaching (0:45–1:30):** User asks "How do I borrow money safely?" — AI responds in Yoruba with a clear explanation, asks follow-up questions, and creates a personalized action plan.
4. **Resource Discovery (1:30–2:00):** App shows 3 microfinance institutions near the user's location, compares rates, explains what documentation is needed.
5. **Learning Module (2:00–2:30):** Show the "Borrowing safely" module — 5 slides, voice narration, quiz at end, badge earned.
6. **Impact Statement (2:30–3:00):** "FinWise has helped 1.4 billion people find their financial footing. Let's build it." — show the tech stack, GitHub repo, live demo link.

---

## Project File Structure

```
finwise/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group
│   │   ├── login/
│   │   └── onboarding/
│   ├── (dashboard)/              # Main app
│   │   ├── chat/                 # AI coaching interface
│   │   ├── learn/                # Learning modules
│   │   ├── dashboard/            # Financial health
│   │   ├── resources/            # Institution finder
│   │   └── tools/                # Calculator, scam detector
│   ├── api/                      # API routes
│   │   ├── chat/
│   │   ├── tts/
│   │   ├── stt/
│   │   ├── resources/
│   │   └── progress/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                       # Base components
│   ├── chat/                     # Chat-specific
│   ├── learn/                    # Learning UI
│   └── dashboard/                # Dashboard widgets
├── lib/
│   ├── ai/                       # Claude integration
│   ├── voice/                    # ElevenLabs integration
│   ├── db/                       # Supabase client
│   └── i18n/                     # Translations
├── public/
│   ├── locales/                  # Translation files
│   └── modules/                  # Offline lesson content
├── prisma/                       # DB schema
├── tests/
└── docs/
```

---

## Success Metrics (For Judges)

- Time to first "aha moment": < 3 minutes from onboarding
- Lesson completion rate target: > 70%
- Languages supported: 15 at launch
- Offline capability: Core features work without internet
- Load time on 3G: < 3 seconds
- Demo: Live, deployed, working — not a mockup

---

## Timeline (Hackathon Sprint)

| Phase | Tasks | Duration |
|-------|-------|----------|
| 1 — Foundation | Project setup, auth, DB schema, i18n scaffold | Day 1 |
| 2 — AI Core | Claude integration, chat UI, system prompt tuning | Day 1–2 |
| 3 — Voice Layer | ElevenLabs TTS/STT, voice chat interface | Day 2 |
| 4 — Learning System | Module structure, quiz engine, progress tracking | Day 2–3 |
| 5 — Dashboard | Financial tracker, health score, savings goals | Day 3 |
| 6 — Resource Connector | Institution DB, search, recommendation engine | Day 3–4 |
| 7 — Tools | Scam detector, rate calculator, document templates | Day 4 |
| 8 — Polish | UI polish, mobile optimization, PWA setup | Day 4–5 |
| 9 — Demo | Video recording, Devpost writeup, deployment | Day 5 |
