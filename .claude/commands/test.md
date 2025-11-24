---
description: Run Playwright tests and archive results
---

Run the Playwright test suite following the testing protocol:

1. Run tests for Chromium:
```bash
npx playwright test --project=chromium
```

2. Archive the test report with timestamp:
```bash
DATE=$(date +%Y-%m-%d_%H-%M)
STATUS="passing-X-of-Y"  # Update with actual counts
cp -r playwright-report tests/reports/${DATE}_${STATUS}
```

3. Update `tests/TEST_STATUS.md` with:
   - Timestamp
   - Test counts (passed/failed/skipped)
   - Duration
   - Any failures or fixes

4. Show test summary and ask if user wants to commit the results

Note: Follow the testing protocol defined in CLAUDE.md
