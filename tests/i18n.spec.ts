import { test, expect } from '@playwright/test';

test.describe('i18n Language Switching Tests', () => {
  test('should switch from English to Spanish', async ({ page }) => {
    await page.goto('/en');

    // Verify we're on English
    await expect(page.locator('main h1')).toContainText('David Medina');
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' })).toBeVisible();

    // Click Spanish language switcher
    await page.locator('[aria-label="Language selector"]').getByRole('link', { name: 'Switch to ES' }).click();

    // Should be on Spanish page
    await expect(page).toHaveURL('/es');

    // Spanish text should be visible
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Inicio' })).toBeVisible();
  });

  test('should switch from Spanish to French', async ({ page }) => {
    await page.goto('/es');

    // Click French language switcher
    await page.locator('[aria-label="Language selector"]').getByRole('link', { name: 'Switch to FR' }).click();

    // Should be on French page
    await expect(page).toHaveURL('/fr');

    // French text should be visible
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Accueil' })).toBeVisible();
  });

  test('should maintain language when navigating', async ({ page }) => {
    await page.goto('/es');

    // Navigate to blog
    await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();

    // Should stay in Spanish
    await expect(page).toHaveURL('/es/blog');
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Inicio' })).toBeVisible();
  });

  test('should show correct language in header across all pages', async ({ page }) => {
    // English
    await page.goto('/en');
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Home' })).toBeVisible();

    // Spanish
    await page.goto('/es');
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Inicio' })).toBeVisible();

    // French
    await page.goto('/fr');
    await expect(page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Accueil' })).toBeVisible();
  });

  test('should highlight current language in switcher', async ({ page }) => {
    await page.goto('/en');

    // English should be highlighted (bolder color)
    const enLink = page.locator('[aria-label="Language selector"]').getByRole('link', { name: 'Switch to EN' });
    await expect(enLink).toHaveClass(/text-zinc-900/);
  });
});
