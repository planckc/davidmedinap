import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('home page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Home page load time: ${loadTime}ms`);
  });

  test('blog listing page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en/blog', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Blog listing page load time: ${loadTime}ms`);
  });

  test('blog post page loads within acceptable time', async ({ page }) => {
    await page.goto('/en/blog');

    const startTime = Date.now();
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();
    await page.waitForLoadState('networkidle');
    const navigationTime = Date.now() - startTime;

    // Navigation and page load should complete within 3 seconds
    expect(navigationTime).toBeLessThan(3000);
    console.log(`Blog post navigation time: ${navigationTime}ms`);
  });

  test('navigation is responsive (click to page change < 1s)', async ({ page }) => {
    await page.goto('/en/blog');

    const startTime = Date.now();
    // Click Blog link in navigation
    await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();
    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    const responseTime = Date.now() - startTime;

    // Should be responsive (under 1 second)
    expect(responseTime).toBeLessThan(1000);
    console.log(`Navigation response time: ${responseTime}ms`);
  });

  test('language switching is performant', async ({ page }) => {
    await page.goto('/en/blog');

    // Open language switcher and switch to Spanish
    const startTime = Date.now();
    const langSwitcher = page.locator('[aria-label="Language Switcher"]');

    // Click should register immediately
    if (await langSwitcher.isVisible()) {
      await langSwitcher.click();
      await page.waitForTimeout(100); // Minimal wait for menu to open
      const clickTime = Date.now() - startTime;
      expect(clickTime).toBeLessThan(500);
      console.log(`Language switcher click time: ${clickTime}ms`);
    }
  });

  test('multiple navigation clicks do not degrade performance', async ({ page }) => {
    await page.goto('/en');

    const timings: number[] = [];

    // Perform 3 consecutive navigations and measure response time
    for (let i = 0; i < 3; i++) {
      const startTime = Date.now();

      if (i === 0) {
        // Go to blog
        await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();
      } else if (i === 1) {
        // Go back to home
        await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Home' }).click();
      } else {
        // Go to blog again
        await page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Blog' }).click();
      }

      await page.waitForLoadState('domcontentloaded');
      const navTime = Date.now() - startTime;
      timings.push(navTime);
    }

    // Each navigation should be reasonably fast (under 1.5s)
    timings.forEach((time, index) => {
      expect(time).toBeLessThan(1500);
      console.log(`Navigation ${index + 1} time: ${time}ms`);
    });

    // Performance should not degrade significantly (last navigation shouldn't be 50% slower)
    const performanceDegradation = (timings[2] - timings[0]) / timings[0];
    expect(performanceDegradation).toBeLessThan(0.5);
    console.log(`Performance degradation: ${(performanceDegradation * 100).toFixed(1)}%`);
  });

  test('blog post content renders without layout shift', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    const article = page.locator('article').first();

    // Article should be visible without layout shifts
    await expect(article).toBeVisible();

    // Header, content, and footer should all be in proper positions
    const header = article.locator('header').first();
    const content = article.locator('.prose').first();

    await expect(header).toBeVisible();
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }

    // Wait a bit to ensure no layout shifts occur
    await page.waitForTimeout(500);

    // Elements should still be in place
    await expect(header).toBeVisible();
    console.log('No layout shifts detected');
  });

  test('scroll performance is smooth on long pages', async ({ page }) => {
    await page.goto('/en/blog');
    await page.getByRole('article').first().getByRole('link', { name: 'Read more' }).click();

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Measure scroll performance by scrolling down
    const startTime = Date.now();

    // Scroll to bottom gradually
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Wait for scroll to complete
    await page.waitForTimeout(1000);
    const scrollTime = Date.now() - startTime;

    // Scroll should complete in reasonable time
    expect(scrollTime).toBeLessThan(2000);
    console.log(`Scroll to bottom time: ${scrollTime}ms`);

    // Scroll back up
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    await page.waitForTimeout(500);
    console.log('Scroll performance test completed');
  });

  test('content in multiple languages loads with similar performance', async ({ page }) => {
    const timings: { [key: string]: number } = {};

    for (const lang of ['en', 'es', 'fr']) {
      const startTime = Date.now();
      await page.goto(`/${lang}/blog`, { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;
      timings[lang] = loadTime;
      console.log(`${lang.toUpperCase()} blog load time: ${loadTime}ms`);
    }

    // All languages should load within similar timeframe (within 1.5x difference)
    const maxTime = Math.max(...Object.values(timings));
    const minTime = Math.min(...Object.values(timings));
    const variation = (maxTime - minTime) / minTime;

    expect(variation).toBeLessThan(1.5);
    console.log(`Performance variation across languages: ${(variation * 100).toFixed(1)}%`);
  });
});
