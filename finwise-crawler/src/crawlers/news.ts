import type { Browser } from 'puppeteer-core';
import type { CrawlResult } from '../types.ts';

const SOURCES = [
  'https://www.centralbank.go.ke/news/',
  'https://www.cbn.gov.ng/News/',
  'https://www.bangladesh-bank.org/mediaroom/',
];

export async function crawlRegulatoryNews(browser: Browser): Promise<CrawlResult> {
  const result: CrawlResult = { success: 0, failed: 0, errors: [] };

  for (const source of SOURCES) {
    const page = await browser.newPage();
    try {
      await page.goto(source, { waitUntil: 'domcontentloaded', timeout: 30000 });
      result.success += 1;
    } catch (error) {
      result.failed += 1;
      result.errors.push(`[news] ${source}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await page.close();
    }
  }

  return result;
}
