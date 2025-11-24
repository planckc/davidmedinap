# Playwright Test Reports Archive

This directory contains archived HTML reports from Playwright test runs.

## Available Reports

### 2025-01-24_passing-21-of-23
**Date**: January 24, 2025
**Status**: ✅ PASSING
**Results**: 21 passed, 2 skipped (23 total)
**Duration**: 38.6s
**Browser**: Chromium

**View Report**:
```bash
# Option 1: Open directly in browser
open tests/reports/2025-01-24_passing-21-of-23/index.html

# Option 2: Serve with HTTP server
cd tests/reports/2025-01-24_passing-21-of-23
npx http-server -p 8080
# Then visit: http://localhost:8080
```

## How to View Reports

### Method 1: Direct File Access
Simply open the `index.html` file in any browser:
```bash
# macOS
open tests/reports/2025-01-24_passing-21-of-23/index.html

# Linux
xdg-open tests/reports/2025-01-24_passing-21-of-23/index.html

# Windows
start tests/reports/2025-01-24_passing-21-of-23/index.html
```

### Method 2: Local HTTP Server
For better functionality (especially for loading assets):
```bash
# Using Python
cd tests/reports/2025-01-24_passing-21-of-23
python -m http.server 8080

# Using Node.js http-server
cd tests/reports/2025-01-24_passing-21-of-23
npx http-server -p 8080

# Using Playwright's built-in server
npx playwright show-report tests/reports/2025-01-24_passing-21-of-23
```

## Report Contents

Each report includes:
- ✅ Summary of all tests (passed/failed/skipped)
- 📊 Test execution timeline
- 🔍 Detailed test results with steps
- 📸 Screenshots on failures
- 🎬 Video recordings (if enabled)
- 📝 Trace files for debugging
- ⏱️ Performance metrics

## Creating New Reports

After running tests, archive the report:

```bash
# Run tests
npx playwright test

# Archive the report with timestamp
DATE=$(date +%Y-%m-%d)
STATUS="passing-X-of-Y"  # Update with actual results
cp -r playwright-report tests/reports/${DATE}_${STATUS}

# Or let Playwright generate it automatically
npx playwright test --reporter=html
```

## Comparing Reports

To compare test results over time:

1. Open multiple report index.html files in different tabs
2. Use browser dev tools to compare metrics
3. Check for regression in test duration
4. Identify newly failing/passing tests

## Best Practices

1. **Archive after significant changes**: Keep reports when major features are added
2. **Name with status**: Use descriptive names like `2025-01-24_passing-21-of-23`
3. **Clean old reports**: Remove outdated reports to save space
4. **Git ignore**: Reports are large, add to .gitignore if needed
5. **CI/CD artifacts**: Store reports as artifacts in CI/CD pipeline

## Report Retention Policy

- Keep reports from last 30 days
- Archive milestone reports (releases, major features)
- Delete reports older than 90 days unless they document critical issues
- Keep at least one "baseline" passing report for comparison

## Troubleshooting

**Report won't load assets**:
- Use HTTP server instead of opening file directly
- Check browser console for CORS errors

**Report too large**:
- Videos and traces take up space
- Disable in playwright.config.ts for routine runs
- Enable only for debugging or CI

**Missing test details**:
- Ensure reporter is set to 'html' in playwright.config.ts
- Check that tests completed successfully

## Additional Resources

- [Playwright HTML Reporter Docs](https://playwright.dev/docs/test-reporters#html-reporter)
- Main test documentation: `tests/README.md`
- Test status: `tests/TEST_STATUS.md`
