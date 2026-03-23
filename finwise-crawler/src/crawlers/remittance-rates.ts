import { createClient } from '@supabase/supabase-js';
import type { Browser } from 'puppeteer-core';
import type { CrawlResult } from '../types.ts';
import { extractRateWindow } from '../extractors/rate-extractor.ts';

const SOURCES = [
  { name: 'Wise', url: 'https://wise.com/gb/compare/', feeHint: 0.7, markupHint: 0.3 },
  { name: 'Remitly', url: 'https://www.remitly.com', feeHint: 1.2, markupHint: 0.8 },
  { name: 'Western Union', url: 'https://www.westernunion.com', feeHint: 2.9, markupHint: 2.0 },
];

export async function crawlRemittanceRates(browser: Browser): Promise<CrawlResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const result: CrawlResult = { success: 0, failed: 0, errors: [] };

  for (const source of SOURCES) {
    const page = await browser.newPage();

    try {
      await page.goto(source.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

      const bodyText = await page.evaluate(() => document.body?.innerText ?? '');
      const rateWindow = extractRateWindow(bodyText);

      const fee = Number(rateWindow?.minRate ?? source.feeHint);
      const markup = Number(rateWindow?.maxRate ?? source.markupHint);

      const { error } = await supabase
        .from('remittance_providers')
        .update({
          fee_percentage: Math.max(0.1, Math.min(9.9, fee)),
          exchange_rate_markup: Math.max(0.1, Math.min(9.9, markup)),
        })
        .eq('name', source.name);

      if (error) {
        throw new Error(error.message);
      }

      result.success += 1;
    } catch (error) {
      result.failed += 1;
      result.errors.push(
        `[remittance-rates] ${source.url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      await page.close();
    }
  }

  return result;
}
