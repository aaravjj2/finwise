import { test, expect } from '@playwright/test';

async function enterDemoMode(page: import('@playwright/test').Page): Promise<void> {
  await page.goto('/en/login');
  await page.getByRole('button', { name: /continue without account/i }).click();
  await page.waitForURL('**/en/chat');
}

test.describe('Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    await enterDemoMode(page);
  });

  test('should display welcome message for new chat', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /hello! i'm maya/i })).toBeVisible();
  });

  test('should show starter prompts', async ({ page }) => {
    // Check for starter prompts
    const chips = page.getByTestId('suggestion-chip');
    await expect(chips.first()).toBeVisible();
    await expect(chips).toHaveCount(6);
  });

  test('should have functional chat input', async ({ page }) => {
    const chatInput = page.getByPlaceholder(/Ask Maya/i);

    await expect(chatInput).toBeVisible();
    await chatInput.fill('Hello Maya');

    await expect(chatInput).toHaveValue('Hello Maya');
  });

  test('should have send button', async ({ page }) => {
    const sendButton = page.getByRole('button').filter({ has: page.locator('svg') }).last();

    await expect(sendButton).toBeVisible();
  });

  test('starter prompt should populate input when clicked', async ({ page }) => {
    const starterPrompt = page.getByTestId('suggestion-chip').first();

    await starterPrompt.click();

    await expect(page.getByTestId('user-message').first()).toBeVisible();
  });
});

test.describe('Chat Mobile View', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have large tap targets on mobile', async ({ page }) => {
    await enterDemoMode(page);

    // Check that send button is at least 44px (tap target size)
    const sendButton = page.getByRole('button').filter({ has: page.locator('svg') }).last();
    const box = await sendButton.boundingBox();

    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should show bottom navigation on mobile', async ({ page }) => {
    await enterDemoMode(page);

    // Check for bottom nav items
    await expect(page.getByRole('link', { name: /Learn/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /My Money/i })).toBeVisible();
  });
});

test.describe('Chat Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await enterDemoMode(page);

    // Check for heading
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible();
  });

  test('should have labeled form elements', async ({ page }) => {
    await enterDemoMode(page);

    // Chat input should have a placeholder (acting as label)
    const chatInput = page.getByPlaceholder(/Ask Maya/i);
    await expect(chatInput).toBeVisible();
  });
});
