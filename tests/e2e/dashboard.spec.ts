import { test, expect, type Page } from '@playwright/test'

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login')
  await page.getByRole('button', { name: /continue without account/i }).click()
  await page.waitForURL('**/en/chat')
}

test('dashboard page loads and shows money section', async ({ page }) => {
  await enterDemoMode(page)
  await page.goto('/en/dashboard')

  await expect(page.getByRole('heading', { name: /my money/i })).toBeVisible()
})
