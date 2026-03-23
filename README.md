# 🌍 FinWise — AI Financial Coach for Emerging Markets

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://finwise-azure.vercel.app)
[![Try Without Signup](https://img.shields.io/badge/try-no%20signup%20needed-blue)](https://finwise-azure.vercel.app/en/login)
[![CI](https://github.com/aaravjj2/finwise/actions/workflows/ci.yml/badge.svg)](https://github.com/aaravjj2/finwise/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

> Maya speaks your language, knows your market, and is completely free —
> AI financial coaching for the 1.4 billion unbanked adults in emerging markets.

## 🌐 Live Demo

**Try FinWise now → https://finwise-azure.vercel.app**

No signup required. Click **"Continue without account"** to explore the full product instantly.

---

## The Problem

Amara is 32. She sells vegetables at a market stall in Lagos.
Last month someone offered her a loan at "5% per week — very reasonable!"
She almost accepted. That's **260% annual interest**. She didn't know.

**1.4 billion adults** have no bank account. Without financial literacy:
- They pay 300%+ APR to loan sharks because they don't know alternatives exist
- They lose 6–10% of every remittance to fees 10× higher than necessary
- They can't build credit, access insurance, or start businesses safely

## The Solution

**FinWise is Maya** — an AI financial coach who meets users where they are:
on a $50 Android phone, in their language, explaining money in terms
that make sense to their daily life.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Coach (Maya)** | Streaming conversational coaching in 15 languages |
| 🛡️ **Scam Detector** | Paste any offer — get instant risk analysis with APR calculation |
| 🏦 **Institution Finder** | 10+ verified microfinance institutions across 8 countries |
| 💸 **Remittance Comparison** | Real fee data for 5 major money transfer corridors |
| 🎓 **Learning Modules** | 6 modules, 30 lessons, quizzes, badges, progress tracking |
| 💰 **Financial Dashboard** | Income/expense tracking, savings goals, health score |
| 📱 **Offline PWA** | Installs to home screen, works without internet |
| 🔒 **Demo Mode** | Full product access, zero signup friction |

## 🌍 Languages

English · हिन्दी · Kiswahili · Yorùbá · বাংলা · Filipino · Español ·
Português · Hausa · አማርኛ · isiZulu · Igbo · தமிழ் · Bahasa Indonesia · Tiếng Việt

## 🛠️ Tech Stack

**Frontend:** Next.js 14 · TypeScript · Tailwind CSS · Zustand · next-intl
**Backend:** Supabase (PostgreSQL + Auth + RLS) · Vercel Edge
**AI:** Mock AI layer → Ollama (llama3.2:3b) → Claude API
**Testing:** Vitest (45 tests) · Playwright (30 E2E) · GitHub Actions
**PWA:** Service Worker · IndexedDB offline sync

## 🚀 Quick Start

```bash
git clone https://github.com/aaravjj2/finwise.git
cd finwise
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
# ANTHROPIC_API_KEY=mock  ← works without any API key
npm run dev
```

**With local AI (free, no API key):**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2:3b
# Add to .env.local: OLLAMA_BASE_URL=http://localhost:11434
npm run dev
```

## 📊 Architecture

```
User (Android PWA)
    ↓ HTTPS
Vercel Edge (Next.js 14)
    ├── /api/chat      → AI streaming (Ollama/Mock)
    ├── /api/health    → Status endpoint
    └── /api/scam-analyze → Risk assessment
    ↓
Supabase PostgreSQL
    ├── users, conversations, messages
    ├── learning_modules, lessons, user_progress
    ├── financial_entries, savings_goals
    └── institutions, remittance_providers
```

## 🗺️ Roadmap

- **Now:** Mock AI, 15 languages, 6 modules, scam detector, institution finder
- **Month 2:** Ollama local AI on $20/month VPS (zero API costs)
- **Month 5:** Lightpanda web crawler — live institution rates, automated nightly
- **Month 10:** B2B API for MFI integration
- **Month 16:** Savings circles (chama/susu/tanda digitization)
- **Month 21:** On-device WASM inference — fully offline AI

## 📄 License

MIT — see [LICENSE](LICENSE)

## 🙏 Built For

The 1.4 billion people who deserve the same financial guidance
that used to require a banker, a lawyer, and a financial planner.
