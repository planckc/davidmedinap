# David Medina - Personal Portfolio & Blog

A modern, multilingual (EN/ES/FR) portfolio and technical blog focused on AI/ML, Data Engineering, and Community content.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Content**: Velite (MDX processing with rehype-pretty-code)
- **Styling**: Tailwind CSS v4
- **Languages**: TypeScript 5, React 19
- **Testing**: Playwright E2E
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint

# Run tests (auto-starts dev server)
npx playwright test --project=chromium
```

## Project Structure

```
davidmedinap/
├── .claude/              # Claude Code configuration
│   ├── commands/         # Custom slash commands (/new-post, /sync, /test, etc.)
│   └── mcp.json          # MCP server configuration (gitignored)
├── app/                  # Next.js App Router
│   ├── [lang]/          # Multilingual routes (en/es/fr)
│   ├── globals.css      # Tailwind v4 config with @theme inline
│   └── layout.tsx       # Root layout with Geist fonts
├── content/             # MDX blog posts
│   └── blog/
│       ├── en/          # English posts
│       ├── es/          # Spanish posts
│       └── fr/          # French posts
├── components/          # React components
├── lib/                 # Utilities and i18n helpers
├── tests/               # Playwright E2E tests and reports
└── velite.config.ts    # Content processing configuration
```

## Content Management

Create blog posts as MDX files with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-01-24"
lang: "en"
category: "technology"
published: true
description: "Optional description"
tags: ["nextjs", "typescript"]
---

# Your content here...
```

**Categories**: `technology`, `data-engineering`, `community`
**Languages**: `en`, `es`, `fr`

Posts are processed by Velite at build time into `.velite/` (auto-generated, gitignored).

## Development Workflow

1. **Create content**: Add MDX in `content/blog/{lang}/{category}/`
2. **Velite watches**: Auto-regenerates types on save
3. **Import content**: Use `import { posts } from '#site/content'`
4. **Test**: Run Playwright tests before deployment
5. **Deploy**: Push to GitHub → Auto-deploy to Vercel

## Key Features

- **Multilingual routing**: File-based i18n with `/[lang]/` dynamic segments
- **MDX support**: Write React components inside markdown
- **Type-safe content**: Velite generates TypeScript types from schema
- **Optimized builds**: Content pre-processed at build time, not runtime
- **Syntax highlighting**: rehype-pretty-code with Shiki and 'github-dark' theme
- **Modern styling**: Tailwind v4 with PostCSS plugin and inline @theme

## Path Aliases

- `@/*` → Project root
- `#site/content` → `.velite` (Velite-generated types)

## Documentation

- [CLAUDE.md](CLAUDE.md) - Architecture patterns and development protocols
- [.claude/README.md](.claude/README.md) - Claude Code integration and MCP servers
- [tests/README.md](tests/README.md) - Testing guide and standards

## Important Notes

- Never edit `.velite/` directory (auto-generated)
- Static assets output to `public/static/` with hash-based filenames
- Velite runs via custom webpack plugin during Next.js compilation
- Test reports must be archived after significant test runs

## MCP Servers

This project uses 4 MCP servers for enhanced development:

1. **Exa** - Semantic web search for design research
2. **Firecrawl** - Web scraping and analysis
3. **RefTools** - Token-optimized documentation lookup
4. **Playwright** - E2E and visual regression testing

See [.claude/README.md](.claude/README.md) for MCP configuration details.

## Repository

https://github.com/planckc/davidmedinap
