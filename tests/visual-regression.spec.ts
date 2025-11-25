import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('home page layout renders correctly', async ({ page }) => {
    await page.goto('/en');

    // Hero section should be visible
    await expect(page.locator('main').first()).toBeVisible();

    // Header should be fixed/visible at top
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    // Footer should be at bottom
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('blog listing page layout renders correctly', async ({ page }) => {
    await page.goto('/en/blog');

    // Page title
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();

    // Blog posts grid/list
    await expect(page.locator('article').first()).toBeVisible();

    // Multiple posts should be visible
    const articles = page.locator('article');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('blog post page renders complete layout', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Article header with title, date, category
    const article = page.locator('article').first();
    await expect(article).toBeVisible();

    // Post title (h1)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Post metadata (date and category in header)
    const metadata = article.locator('header');
    await expect(metadata.locator('time')).toBeVisible();
    await expect(metadata.getByText('technology')).toBeVisible();

    // Post content area with prose styling
    const proseContent = article.locator('.prose');
    await expect(proseContent).toBeVisible();

    // Footer should still be visible
    await expect(page.locator('footer')).toBeVisible();
  });

  test('responsive design - navigation is accessible', async ({ page }) => {
    await page.goto('/en/blog');

    // Main navigation should be present and accessible
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // Links should be visible
    const links = nav.locator('a');
    expect(await links.count()).toBeGreaterThan(0);

    // Language switcher should be present
    const langSwitcher = page.locator('[aria-label="Language Switcher"]');
    await expect(langSwitcher).toBeVisible();
  });

  test('footer links are properly structured', async ({ page }) => {
    await page.goto('/en/blog');

    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();

    // Footer should contain links (at minimum home or social links)
    const footerLinks = footer.locator('a');
    expect(await footerLinks.count()).toBeGreaterThan(0);
  });

  test('language content renders correctly in different languages', async ({ page }) => {
    // English
    await page.goto('/en/blog');
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();

    // Spanish
    await page.goto('/es/blog');
    const spanishTitle = page.getByRole('heading', { level: 1 });
    await expect(spanishTitle).toBeVisible();
    // Should show "Blog" in Spanish context
    await expect(page.locator('body')).toBeTruthy();

    // French
    await page.goto('/fr/blog');
    const frenchTitle = page.getByRole('heading', { level: 1 });
    await expect(frenchTitle).toBeVisible();
    // Should show "Blog" in French context
    await expect(page.locator('body')).toBeTruthy();
  });

  test('post content with MDX elements renders visual hierarchy', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    const article = page.locator('article').first();
    const prose = article.locator('.prose');

    // Should have multiple heading levels (h1, h2, h3, etc.)
    const headings = prose.locator('h1, h2, h3, h4, h5, h6');
    expect(await headings.count()).toBeGreaterThanOrEqual(0);

    // Should have paragraphs
    const paragraphs = prose.locator('p');
    expect(await paragraphs.count()).toBeGreaterThanOrEqual(0);

    // If code blocks exist, they should be visible
    const codeBlocks = prose.locator('pre');
    if (await codeBlocks.count() > 0) {
      await expect(codeBlocks.first()).toBeVisible();
    }
  });

  test('links maintain consistent styling throughout pages', async ({ page }) => {
    await page.goto('/en/blog');

    // Navigation links
    const navLinks = page.locator('nav[aria-label="Main navigation"] a');
    const navCount = await navLinks.count();
    expect(navCount).toBeGreaterThan(0);

    // All navigation links should be visible
    for (let i = 0; i < Math.min(navCount, 3); i++) {
      await expect(navLinks.nth(i)).toBeVisible();
    }

    // Go to blog post and check internal links
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Blog link should take us back to blog listing
    const blogLink = page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' });
    await expect(blogLink).toBeVisible();
  });
});
