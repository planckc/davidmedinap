# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with TypeScript, using the App Router architecture. The project integrates Velite for content management, enabling MDX-based blog posts with enhanced markdown processing. Styling is handled with Tailwind CSS v4 using the new PostCSS plugin architecture.

## Development Commands

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Key Architecture Patterns

### Content Management with Velite

The project uses Velite as a static content generator that processes MDX files at build time:

- **Content location**: `content/blog/**/*.mdx`
- **Output**: `.velite/` directory (gitignored, auto-generated)
- **Schema**: Defined in `velite.config.ts:10-27`
- **Webpack integration**: Custom `VeliteWebpackPlugin` in `next.config.ts:11-21` runs Velite during Next.js compilation
  - In development mode: Velite watches for changes
  - In production mode: Velite runs once with clean build

### Blog Post Schema

Posts require the following frontmatter fields:
- `title`: Max 99 characters
- `date`: ISO date format
- `lang`: One of 'en', 'es', 'fr'
- `category`: One of 'technology', 'data-engineering', 'community'
- `published`: Boolean (defaults to true)
- Optional: `description` (max 999 chars), `image`, `tags` (array of strings)

Posts expose a computed `slugAsParams` field (velite.config.ts:7) that strips the first slug segment for routing.

### MDX Processing Pipeline

Velite processes MDX with:
1. **rehype-slug**: Auto-generates heading IDs
2. **rehype-pretty-code**: Syntax highlighting with 'github-dark' theme and Shiki

### Styling Architecture

- **Tailwind v4**: Uses new `@import "tailwindcss"` syntax (app/globals.css:1)
- **Theme system**: Inline theme configuration in globals.css with CSS custom properties
- **Fonts**: Geist Sans and Geist Mono loaded via next/font/google, exposed as CSS variables
- **Dark mode**: Uses `prefers-color-scheme` media query

### Path Aliasing

TypeScript is configured with two important path aliases (tsconfig.json:21-24):
- `@/*` → Project root (e.g., `@/app/...`, `@/content/...`)
- `#site/content` → `.velite` directory for accessing Velite-generated types and data

Example: `import { posts } from '#site/content'`

## Custom Slash Commands

The project includes custom slash commands (defined in `.claude/commands/`) to streamline common workflows:

- `/new-post` - Creates a new MDX blog post with proper frontmatter validation
- `/sync` - Syncs local changes to GitHub (status, commit, push)
- `/test` - Runs Playwright tests and archives reports with timestamp
- `/dev` - Starts development server and shows status
- `/design-research` - Research design references using Exa and Firecrawl MCPs

## Testing Protocols

### Running and Documenting Tests

When running Playwright tests, **ALWAYS** follow this documentation protocol:

1. **Run the tests** (dev server auto-starts via playwright.config.ts:31-36):
   ```bash
   # Run on Chromium (default)
   npx playwright test --project=chromium

   # Run on other browsers
   npx playwright test --project=firefox
   npx playwright test --project=webkit
   ```

2. **Archive the test report** with timestamp:
   ```bash
   DATE=$(date +%Y-%m-%d_%H-%M)
   STATUS="passing-X-of-Y"  # Update with actual pass/fail counts
   cp -r playwright-report tests/reports/${DATE}_${STATUS}
   ```

3. **Update test documentation** in `tests/TEST_STATUS.md`:
   - Add timestamp of test run
   - Update test counts (passed/failed/skipped)
   - Update duration
   - Document any new failures or fixes
   - Add entry to historical test runs table

4. **Commit test artifacts** together with code changes:
   ```bash
   git add tests/reports/ tests/TEST_STATUS.md
   git commit -m "test: Update test reports - X passed, Y skipped"
   ```

### Test Documentation Files

- `tests/README.md` - Test suite overview and usage guide
- `tests/TEST_STATUS.md` - Current test status and historical runs
- `tests/reports/` - Archived HTML reports from test runs
- `tests/reports/README.md` - Guide for viewing archived reports

### Test Execution Standards

- **Before merging**: All tests must pass (skipped tests are acceptable if documented)
- **After fixing bugs**: Run full test suite and archive report
- **After adding features**: Update tests, run suite, archive report
- **Weekly**: Run cross-browser tests (Chromium, Firefox, WebKit)

## Important Notes

- The `.velite` directory is generated automatically - never edit it directly
- Static assets from Velite are output to `public/static/` with hash-based filenames
- The Velite webpack plugin ensures content is built before Next.js compilation
- When working with blog posts, always validate against the schema in velite.config.ts
- **Test reports must be archived after every significant test run** - this creates audit trail and helps track regressions
