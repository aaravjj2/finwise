# FinWise Crawler

Nightly crawler for microfinance and remittance rate updates using Lightpanda.

## Local run

```bash
docker-compose up -d lightpanda
npm install
npm run crawl
```

## Scheduler mode

```bash
CRAWLER_INTERVAL_MS=86400000 npm run schedule
```

## Included crawler modules

- `mfi-rates`: captures lending-rate signals and updates `institution_rates`
- `remittance-rates`: refreshes fee/markup fields on known remittance providers
- `scam-registry`: checks scam-watch sources for reachability
- `news`: checks central bank/regulatory announcement pages

## Required env vars

- `LIGHTPANDA_CDP_URL` (default: `ws://localhost:9222`)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
