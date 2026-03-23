import { test, expect, type Page } from '@playwright/test'

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login')
  await page.getByRole('button', { name: /continue without account/i }).click()
  await page.waitForURL('**/en/chat')
}

test('circles route requires authentication', async ({ page }) => {
  await page.goto('/en/circles')
  await expect(page).toHaveURL(/\/en\/login(\?|$)/)
})

test('join circles page is reachable', async ({ page }) => {
  await enterDemoMode(page)
  await page.goto('/en/circles')
  await expect(page).toHaveURL(/\/en\/circles$/)
})
