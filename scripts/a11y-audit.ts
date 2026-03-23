import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.A11Y_BASE_URL || 'http://localhost:3000';
const LOCALE = process.env.A11Y_LOCALE || 'en';

const PAGES = [
  `/${LOCALE}/login`,
  `/${LOCALE}/chat`,
  `/${LOCALE}/learn`,
  `/${LOCALE}/dashboard`,
  `/${LOCALE}/resources`,
  `/${LOCALE}/tools/scam-detector`,
  `/${LOCALE}/circles`,
];

async function run(): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const violationsByPage: Array<{ path: string; count: number; blockingCount: number; ids: string[] }> = [];

  for (const path of PAGES) {
    const url = `${BASE_URL}${path}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });

    const results = await new AxeBuilder({ page }).analyze();
    const ids = results.violations.map((v) => v.id);
    const blockingCount = results.violations.filter((v) => {
      return v.impact === 'critical' || v.impact === 'serious';
    }).length;

    violationsByPage.push({
      path,
      count: results.violations.length,
      blockingCount,
      ids,
    });
  }

  await context.close();
  await browser.close();

  const totalViolations = violationsByPage.reduce((sum, item) => sum + item.count, 0);
  const blockingViolations = violationsByPage.reduce((sum, item) => sum + item.blockingCount, 0);
  for (const entry of violationsByPage) {
    const detail = entry.ids.length > 0 ? ` (${entry.ids.join(', ')})` : '';
    console.log(`${entry.path}: ${entry.count} violation(s), blocking=${entry.blockingCount}${detail}`);
  }

  if (blockingViolations > 0) {
    throw new Error(`Blocking accessibility violations found: ${blockingViolations} (total findings: ${totalViolations})`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
