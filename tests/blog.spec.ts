import { test, expect } from '@playwright/test';

test.describe('Blog Tests', () => {
  test('should display blog listing page', async ({ page }) => {
    await page.goto('/en/blog');

    // Check page title
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();

    // Check description
    await expect(
      page.getByText('Thoughts on technology, data engineering, and community building')
    ).toBeVisible();
  });

  test('should show blog posts in English', async ({ page }) => {
    await page.goto('/en/blog');

    // Should show at least one post
    await expect(page.getByRole('article').first()).toBeVisible();

    // Should show post title
    await expect(page.getByRole('heading', { name: /Next.js 16/i })).toBeVisible();
  });

  test('should have category filter', async ({ page }) => {
    await page.goto('/en/blog');

    // Check filter label
    await expect(page.getByText('Filter by category:')).toBeVisible();

    // Check "All posts" button
    await expect(page.getByRole('button', { name: 'All posts' })).toBeVisible();

    // Check category button exists
    await expect(page.getByRole('button', { name: 'Technology' })).toBeVisible();
  });

  test('should filter posts by category', async ({ page }) => {
    await page.goto('/en/blog');

    // Click Technology category
    await page.getByRole('button', { name: 'Technology' }).click();

    // Should show filtered message
    await expect(page.getByText(/in Technology/i)).toBeVisible();
  });

  test('should navigate to blog post', async ({ page }) => {
    await page.goto('/en/blog');

    // Click "Read more" on first post
    const firstPost = page.getByRole('article').first();
    await firstPost.getByRole('link', { name: 'Read more' }).click();

    // Should be on post page
    await expect(page).toHaveURL(/\/en\/blog\/.+/);

    // Post title should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should show correct posts per language', async ({ page }) => {
    // English blog
    await page.goto('/en/blog');
    await expect(page.getByRole('heading', { name: /Getting Started with Next.js/i })).toBeVisible();

    // Spanish blog
    await page.goto('/es/blog');
    await expect(page.getByRole('heading', { name: /Primeros Pasos con Next.js/i })).toBeVisible();

    // French blog
    await page.goto('/fr/blog');
    await expect(page.getByRole('heading', { name: /Débuter avec Next.js/i })).toBeVisible();
  });
});
