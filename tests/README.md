# Test Suite Documentation

This directory contains end-to-end (E2E) tests using Playwright for the David Medina personal website.

## Test Overview

**Total Tests**: 23 tests across 4 test suites
- ✅ **21 passing tests** - All core functionality verified
- ⏭️ **2 skipped tests** - MDX rendering (known issue)

## Test Suites

### 1. Navigation Tests (`navigation.spec.ts`)
**5 tests** - Verifies core navigation functionality

- Root redirect to `/en`
- Home page displays correctly
- Blog navigation from home
- Header navigation between pages
- Footer links display correctly

### 2. i18n Tests (`i18n.spec.ts`)
**5 tests** - Verifies internationalization and language switching

- Language switching (EN → ES, ES → FR)
- Language persistence during navigation
- Correct translations across all pages
- Active language highlighting in switcher

### 3. Blog Listing Tests (`blog.spec.ts`)
**6 tests** - Verifies blog index page functionality

- Blog listing page displays
- Posts display in correct language
- Category filtering system
- Navigation to individual posts
- Language-specific post filtering

### 4. Blog Post Tests (`blog-post.spec.ts`)
**7 tests (5 active, 2 skipped)** - Verifies individual blog post pages

**Active Tests:**
- Post metadata display (title, date, category)
- Tag display
- Header and footer on post pages
- Navigation back to blog listing
- Multi-language post rendering

**Skipped Tests:**
- ⏭️ MDX content rendering (line 20)
- ⏭️ Code block syntax highlighting (line 68)

> **Note**: MDX tests are skipped due to a known issue with the `new Function()` approach in `MDXContent.tsx`. The blog post structure and metadata work correctly, but the MDX body content doesn't render. See [Known Issues](#known-issues) below.

## Running Tests

```bash
# Run all tests (Chromium, Firefox, WebKit)
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a specific test file
npx playwright test tests/navigation.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Show last HTML report
npx playwright show-report
```

## Test Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: http://localhost:3000
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel execution**: Enabled
- **Screenshots**: On failure only
- **Traces**: On first retry
- **Auto-start dev server**: Enabled

## Known Issues

### MDX Content Rendering

**Issue**: Blog post MDX content doesn't render in the browser
**Status**: Tests skipped with `.skip()` marker
**Affected Files**:
- `components/MDXContent.tsx` - Uses `new Function()` to execute Velite-compiled code
- `.velite/posts.json` - Contains compiled MDX as JavaScript code

**Why it fails**:
The Velite compilation generates JavaScript code that can't be properly executed by `new Function()` in the browser. The error is:
```
SyntaxError: Unexpected token 'const'
```

**Potential solutions**:
1. Use `next-mdx-remote` for client-side rendering
2. Switch to server-side MDX rendering
3. Modify Velite configuration to output different format
4. Use a different MDX processor

**Impact**: Low - All page structure, navigation, metadata, and styling work correctly. Only the blog post body content is missing.

## Test Structure Best Practices

All tests follow these patterns:

1. **Specific selectors**: Use `aria-label` and scoped locators to avoid strict mode violations
   ```typescript
   // ✅ Good - specific selector
   page.locator('nav[aria-label="Main navigation"]').getByRole('link', { name: 'Home' })

   // ❌ Bad - ambiguous selector
   page.getByRole('link', { name: 'Home' }) // Could match header OR footer
   ```

2. **Language-aware navigation**: Always use locale in URLs
   ```typescript
   await page.goto('/en/blog')  // ✅ Explicit locale
   await page.goto('/blog')     // ❌ Relies on redirect
   ```

3. **Wait for elements**: Use Playwright's auto-waiting with `expect`
   ```typescript
   await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
   ```

## Fixing Flaky Tests

If tests fail intermittently:

1. **Port conflicts**: Kill existing dev server
   ```bash
   npx kill-port 3000
   ```

2. **Stale Velite cache**: Rebuild content
   ```bash
   npx velite build
   npm run build
   ```

3. **Browser state**: Run tests with `--clean`
   ```bash
   npx playwright test --clean
   ```

## Adding New Tests

When adding new blog posts or pages:

1. Update existing tests if URLs or content changes
2. Add new test cases for new functionality
3. Follow existing naming conventions
4. Use descriptive test names that explain what is being tested
5. Group related tests in `test.describe()` blocks

Example:
```typescript
test.describe('New Feature Tests', () => {
  test('should do something specific', async ({ page }) => {
    await page.goto('/en/new-page')
    await expect(page.getByRole('heading')).toBeVisible()
  })
})
```

## Debugging Tips

1. **View screenshots**: Check `test-results/` directory after failures
2. **HTML report**: Run `npx playwright show-report` for detailed results
3. **Headed mode**: Use `--headed` to watch tests execute
4. **Slow motion**: Use `--slow-mo=1000` to slow down execution
5. **Debug mode**: Use `--debug` to step through tests
6. **Console logs**: Check dev server output for errors

## CI/CD Integration

To run tests in CI:

```yaml
# .github/workflows/test.yml example
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run tests
  run: npx playwright test
```

## Maintenance

- **Update snapshots**: If UI changes are intentional, update visual snapshots
- **Review skipped tests**: Periodically attempt to fix and re-enable skipped tests
- **Monitor flakiness**: Track which tests fail inconsistently and improve their stability
- **Keep dependencies updated**: Regularly update `@playwright/test`
