import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should redirect root to /en', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en');
  });

  test('should display home page with correct title', async ({ page }) => {
    await page.goto('/en');

    // Check main heading (h1 in main, not footer)
    await expect(page.locator('main h1')).toContainText('David Medina');

    // Check tagline in main section
    await expect(page.locator('main').getByText('AI/ML Engineer • Data Architect • Community Builder')).toBeVisible();
  });

  test('should navigate to blog from home', async ({ page }) => {
    await page.goto('/en');

    // Click blog button
    await page.getByRole('link', { name: 'Blog' }).first().click();

    // Should be on blog page
    await expect(page).toHaveURL('/en/blog');
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  });

  test('should have working header navigation', async ({ page }) => {
    await page.goto('/en/blog');

    // Click home in header (use navigation to be specific)
    await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/en');

    // Go back to blog
    await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/en/blog');
  });

  test('should display footer with correct links', async ({ page }) => {
    await page.goto('/en');

    // Check footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check social links
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'MYSION.CO' })).toBeVisible();
  });
});
