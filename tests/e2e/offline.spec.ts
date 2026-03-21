import { test, expect, type Page } from '@playwright/test'

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login')
  await page.getByRole('button', { name: /continue without account/i }).click()
  await page.waitForURL('**/en/chat')
}

test('offline fallback page renders', async ({ page }) => {
  await enterDemoMode(page)
  await page.goto('/offline')

  await expect(page.getByRole('heading', { name: /you're offline/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()
})
