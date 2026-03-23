import puppeteer from 'puppeteer-core';
import { crawlMfiRates } from './crawlers/mfi-rates.ts';
import type { CrawlResult } from './types.ts';

async function main(): Promise<void> {
  const wsEndpoint = process.env.LIGHTPANDA_CDP_URL ?? 'ws://localhost:9222';

  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpoint,
    defaultViewport: { width: 1280, height: 720 },
  });

  const totals: CrawlResult = {
    success: 0,
    failed: 0,
    errors: [],
  };

  try {
    const mfi = await crawlMfiRates(browser);
    totals.success += mfi.success;
    totals.failed += mfi.failed;
    totals.errors.push(...mfi.errors);
  } finally {
    await browser.close();
  }

  if (totals.errors.length > 0) {
    for (const err of totals.errors) {
      console.error(err);
    }
  }

  console.log(
    JSON.stringify(
      {
        crawler: 'finwise-crawler',
        success: totals.success,
        failed: totals.failed,
      },
      null,
      2,
    ),
  );

  if (totals.failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
