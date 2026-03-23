import { setTimeout as sleep } from 'node:timers/promises';
import { runCrawlers } from './index.ts';

async function main(): Promise<void> {
  const intervalMs = Number(process.env.CRAWLER_INTERVAL_MS || 24 * 60 * 60 * 1000);

  // Basic polling scheduler for non-cron environments.
  for (;;) {
    await runCrawlers();
    await sleep(intervalMs);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
