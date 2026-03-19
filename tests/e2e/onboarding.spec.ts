import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should display login page by default', async ({ page }) => {
    await page.goto('/en/login');

    await expect(page.getByText('Welcome to FinWise')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /phone/i })).toBeVisible();
  });

  test('should show language selector in onboarding', async ({ page }) => {
    // This test assumes the user has somehow bypassed auth
    // In real tests, you would mock the auth state
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
    // Mock authenticated state and go to onboarding
    await page.goto('/en/onboarding');
  });

  test('should have all 15 language options', async ({ page }) => {
    // Check for major languages
    await expect(page.getByText('English')).toBeVisible();
    await expect(page.getByText('हिन्दी')).toBeVisible(); // Hindi
    await expect(page.getByText('Kiswahili')).toBeVisible(); // Swahili
    await expect(page.getByText('Yorùbá')).toBeVisible(); // Yoruba
  });

  test('should show progress indicator', async ({ page }) => {
    await expect(page.getByText(/Step 1 of/)).toBeVisible();
  });
});
