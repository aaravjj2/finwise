# Local Development

## Quickstart (mock AI - no external services needed)

```bash
git clone https://github.com/aaravjj2/finwise
cd finwise
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 - full app works with mock AI responses.

## With Local AI (Ollama - free, no API key)

```bash
# Install Ollama from https://ollama.ai
ollama pull llama3.2:3b
ollama serve
# Add to .env.local:
# OLLAMA_BASE_URL=http://localhost:11434
npm run dev
```

Maya now responds with real AI. Zero cost.

## With Supabase (full backend)

1. Create free project at supabase.com
2. Run SQL migrations in Supabase SQL Editor:
   - supabase/migrations/001_initial_schema.sql
   - supabase/migrations/002_rls_policies.sql
   - supabase/seed/seed_modules.sql
3. Add to .env.local:
   - NEXT_PUBLIC_SUPABASE_URL=your-url
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
