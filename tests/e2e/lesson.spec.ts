import { test, expect, type Page } from '@playwright/test'

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login')
  await page.getByRole('button', { name: /continue without account/i }).click()
  await page.waitForURL('**/en/chat')
}

test('learn page shows module list', async ({ page }) => {
  await enterDemoMode(page)
  await page.goto('/en/learn')

  await expect(page.getByRole('heading', { name: /all modules/i })).toBeVisible()
})
