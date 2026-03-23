import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should display login page by default', async ({ page }) => {
    await page.goto('/en/login');

    await expect(page.getByRole('heading', { name: 'FinWise' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /phone number/i })).toBeVisible();
  });

  test('should redirect unauthenticated user from onboarding to login', async ({ page }) => {
    await page.goto('/en/onboarding');

    await expect(page).toHaveURL(/\/en\/login/);
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
    await expect(page.getByText('United States')).toBeVisible();
    await expect(page.getByText('Nigeria')).toBeVisible();
    await expect(page.getByText('Kenya')).toBeVisible();
  });
});

test.describe('Onboarding Steps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/onboarding');
  });

  test('should keep onboarding behind authentication', async ({ page }) => {
    await expect(page).toHaveURL(/\/en\/login/);
    await expect(page.getByRole('button', { name: /continue without account/i })).toBeVisible();
  });

  test('should provide demo-mode entry from login', async ({ page }) => {
    await page.getByRole('button', { name: /continue without account/i }).click();
    await expect(page).toHaveURL(/\/en\/chat/);
  });
});
