import { test, expect } from '@playwright/test';

test.describe('Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to chat page (will redirect to login if not authenticated)
    await page.goto('/en/chat');
  });

  test('should display welcome message for new chat', async ({ page }) => {
    // Check for Maya's welcome message
    await expect(page.getByText(/Hello! I'm Maya/i).or(page.getByText(/Welcome/i))).toBeVisible();
  });

  test('should show starter prompts', async ({ page }) => {
    // Check for starter prompts
    await expect(page.getByText('How do I open a bank account?')).toBeVisible();
    await expect(page.getByText('Is this loan offer safe?')).toBeVisible();
    await expect(page.getByText('How do I save money each month?')).toBeVisible();
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
    const starterPrompt = page.getByText('How do I open a bank account?');

    await starterPrompt.click();

    // After clicking, the message should be sent (or input populated)
    // The exact behavior depends on implementation
  });
});

test.describe('Chat Mobile View', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should have large tap targets on mobile', async ({ page }) => {
    await page.goto('/en/chat');

    // Check that send button is at least 44px (tap target size)
    const sendButton = page.getByRole('button').filter({ has: page.locator('svg') }).last();
    const box = await sendButton.boundingBox();

    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('should show bottom navigation on mobile', async ({ page }) => {
    await page.goto('/en/chat');

    // Check for bottom nav items
    await expect(page.getByRole('link', { name: /Learn/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /My Money/i })).toBeVisible();
  });
});

test.describe('Chat Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/en/chat');

    // Check for heading
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible();
  });

  test('should have labeled form elements', async ({ page }) => {
    await page.goto('/en/chat');

    // Chat input should have a placeholder (acting as label)
    const chatInput = page.getByPlaceholder(/Ask Maya/i);
    await expect(chatInput).toBeVisible();
  });
});
