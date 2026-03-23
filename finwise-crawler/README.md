# FinWise Crawler

Nightly crawler for microfinance and remittance rate updates using Lightpanda.

## Local run

```bash
docker-compose up -d lightpanda
npm install
npm run crawl
```

## Required env vars

- `LIGHTPANDA_CDP_URL` (default: `ws://localhost:9222`)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
