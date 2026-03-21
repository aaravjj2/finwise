import { test, expect, type Page } from '@playwright/test'

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login')
  await page.getByRole('button', { name: /continue without account/i }).click()
  await page.waitForURL('**/en/chat')
}

test('analyzes scam text and shows risk level', async ({ page }) => {
  await enterDemoMode(page)
  await page.goto('/en/tools/scam-detector')

  await page.getByTestId('offer-textarea').fill(
    'URGENT LOAN OFFER. Guaranteed approval. Pay $150 processing fee first. Offer expires tonight.'
  )
  await page.getByTestId('analyze-button').click()

  await expect(page.getByTestId('risk-badge')).toContainText(/HIGH|VERY HIGH/i, { timeout: 10000 })
  await expect(page.getByTestId('red-flags-list').first()).toBeVisible()
})
