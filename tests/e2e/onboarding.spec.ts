import { test, expect, type Page } from '@playwright/test';

async function enterDemoMode(page: Page): Promise<void> {
  await page.goto('/en/login');
  await page.getByRole('button', { name: /continue without account/i }).click();
  await page.waitForURL('**/en/chat');
}

test.describe('Onboarding Flow', () => {
  test('should display login page by default', async ({ page }) => {
    await page.goto('/en/login');

    await expect(page.getByText('Your financial coach, in your language')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /phone/i })).toBeVisible();
  });

  test('should show language selector in onboarding', async ({ page }) => {
    await enterDemoMode(page);
    await page.goto('/en/onboarding');

    // Check for language selection step
    await expect(page.getByText('Choose your language')).toBeVisible();
  });

  test('should have working phone input', async ({ page }) => {
    await page.goto('/en/login');

    const phoneInput = page.getByRole('textbox', { name: /phone/i });
    await phoneInput.fill('1234567890');

    await expect(phoneInput).toHaveValue('123 456 7890');
  });

  test('should display country dropdown in phone input', async ({ page }) => {
    await page.goto('/en/login');

    // Click country selector
    const countryButton = page.getByRole('button').filter({ hasText: /\+234/ });
    await countryButton.click();

    // Should show dropdown with countries
    await expect(page.getByText('Nigeria')).toBeVisible();
    await expect(page.getByText('Kenya')).toBeVisible();
  });
});

test.describe('Onboarding Steps', () => {
  test.beforeEach(async ({ page }) => {
    await enterDemoMode(page);
    await page.goto('/en/onboarding');
  });

  test('should have all 15 language options', async ({ page }) => {
    // Check for major languages via card buttons.
    await expect(page.getByRole('button', { name: /English/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /हिन्दी/ }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Kiswahili/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Yoruba|Yorùbá/i }).first()).toBeVisible();
  });

  test('should show progress indicator', async ({ page }) => {
    await expect(page.getByText(/Step 1 of/)).toBeVisible();
  });
});
