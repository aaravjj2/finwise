import { createClient } from '@supabase/supabase-js';
import type { Browser } from 'puppeteer-core';
import type { CrawlResult } from '../types.ts';

interface MfiRateRow {
  institution_name: string;
  country: string;
  product_type: string;
  interest_rate_min: number;
  interest_rate_max: number;
  effective_date: string;
  source_url: string;
  confidence_score: number;
}

const SOURCES = [
  {
    url: 'https://www.centralbank.go.ke/rates/microfinance-rates',
    country: 'KE',
    institutionHint: 'Kenya MFI',
  },
  {
    url: 'https://www.cbn.gov.ng/rates/mfi-rates',
    country: 'NG',
    institutionHint: 'Nigeria MFI',
  },
];

function parseNumericRate(value: string | null | undefined): number | null {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/[^\d.]+/g, '');
  if (!normalized) {
    return null;
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function crawlMfiRates(browser: Browser): Promise<CrawlResult> {
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

      const scraped = await page.evaluate((institutionHint) => {
        const text = document.body?.innerText ?? '';

        const rateMatches = text.match(/\b\d{1,2}(?:\.\d{1,2})?\s?%/g) ?? [];
        const sample = rateMatches.slice(0, 2);

        return {
          institution_name: institutionHint,
          product_type: 'microloan',
          rate_min_raw: sample[0] ?? null,
          rate_max_raw: sample[1] ?? sample[0] ?? null,
        };
      }, source.institutionHint);

      const minRate = parseNumericRate(scraped.rate_min_raw);
      const maxRate = parseNumericRate(scraped.rate_max_raw);

      if (minRate === null || maxRate === null) {
        throw new Error(`No parseable rates found for ${source.url}`);
      }

      const payload: MfiRateRow = {
        institution_name: scraped.institution_name,
        country: source.country,
        product_type: scraped.product_type,
        interest_rate_min: minRate,
        interest_rate_max: maxRate,
        effective_date: new Date().toISOString().slice(0, 10),
        source_url: source.url,
        confidence_score: 0.55,
      };

      const { error } = await supabase.from('institution_rates').insert(payload);
      if (error) {
        throw new Error(error.message);
      }

      result.success += 1;
    } catch (error) {
      result.failed += 1;
      result.errors.push(
        `[mfi-rates] ${source.url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      await page.close();
    }
  }

  return result;
}
