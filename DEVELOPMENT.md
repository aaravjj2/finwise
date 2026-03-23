# FinWise Development Guide

## Zero-cost local setup (mock AI)
```bash
git clone https://github.com/aaravjj2/finwise
cd finwise && npm install
cp .env.example .env.local
# Add your Supabase credentials to .env.local
# ANTHROPIC_API_KEY=mock  ← already the default
npm run dev
```
Open http://localhost:3000. Full app with intelligent mock AI responses.

## With local AI (Ollama — free, no API key)
```bash
npm run setup:ai  # installs Ollama, pulls llama3.2:3b
# Add to .env.local: OLLAMA_BASE_URL=http://localhost:11434
npm run dev
```
Maya now uses real AI. ~2GB disk space, $0 cost.

## With Docker (everything in containers)
```bash
docker-compose -f docker-compose.dev.yml up -d
npm run dev
```

## Database setup
```bash
supabase link --project-ref your-ref
supabase db push
supabase db query --file supabase/seed/seed_modules.sql
npm run import:institutions
```

## Running tests
```bash
npm test                    # unit tests
npx playwright test         # E2E tests
npm run lint                # ESLint
npx tsc --noEmit            # TypeScript
npm run build               # production build
```

## Crawler (institution rate updates)
```bash
cd finwise-crawler
docker-compose up -d lightpanda
npx ts-node src/index.ts
```
