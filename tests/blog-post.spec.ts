import { test, expect } from '@playwright/test';

test.describe('Blog Post Tests', () => {
  test('should display individual blog post', async ({ page }) => {
    await page.goto('/en/blog');

    // Click first post
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Should show post title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Should show date
    await expect(page.locator('time')).toBeVisible();

    // Should show category in header metadata
    await expect(page.locator('article header').getByText('technology')).toBeVisible();
  });

  test('should render MDX content', async ({ page }) => {
    // MDX rendering is now fixed - using proper Function wrapping for Velite code
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Should render headings from MDX (check for any h2)
    await expect(page.locator('article .prose h2').first()).toBeVisible();

    // Should render paragraphs
    await expect(page.locator('article .prose p').first()).toBeVisible();

    // Should render lists
    await expect(page.locator('article .prose ul').first()).toBeVisible();
  });

  test('should show tags if present', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Should show tags
    await expect(page.getByText(/#nextjs/i)).toBeVisible();
    await expect(page.getByText(/#react/i)).toBeVisible();
  });

  test('should have header and footer on post page', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Header should be present
    await expect(page.getByRole('link', { name: 'David Medina' })).toBeVisible();

    // Footer should be present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should navigate back to blog from post', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Click Blog in header
    await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();

    // Should be back at blog listing
    await expect(page).toHaveURL('/en/blog');
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
  });

  test('should display code blocks with syntax highlighting', async ({ page }) => {
    // MDX rendering is now fixed - code blocks should render with syntax highlighting
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Should have code blocks (from MDX content) - wait for prose content
    const codeBlock = page.locator('article .prose pre').first();
    await expect(codeBlock).toBeVisible();

    // Should contain bash code example
    await expect(codeBlock).toContainText('npx');
  });

  test('should render post in correct language', async ({ page }) => {
    // English post
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();
    await expect(page.getByRole('heading', { name: /Getting Started/i })).toBeVisible();

    // Spanish post
    await page.goto('/es/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Leer más' }).click();
    await expect(page.getByRole('heading', { name: /Primeros Pasos/i })).toBeVisible();

    // French post
    await page.goto('/fr/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Lire plus' }).click();
    await expect(page.getByRole('heading', { name: /Débuter/i })).toBeVisible();
  });
});
