# David Medina - Personal Portfolio & Blog

A modern, multilingual (EN/ES/FR) portfolio and technical blog built with Next.js 16, featuring AI/ML, Data Engineering, and Community content.

## Project Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Content**: Velite (MDX processing)
- **Styling**: Tailwind CSS v4
- **Languages**: TypeScript 5
- **Deployment**: Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## MCP Servers

This project uses 4 MCP servers for enhanced development:

### 1. Exa - Semantic Web Search
- **Purpose**: Find high-quality web content and design references
- **API Key**: Required (configured in `.claude/mcp.json`)
- **Tools**: `web_search_exa`, `deep_search_exa`, `company_research_exa`, etc.
- **Use case**: Design research, finding portfolio references

### 2. Firecrawl - Web Scraping
- **Purpose**: Scrape and analyze website designs
- **API Key**: Required (configured in `.claude/mcp.json`)
- **Use case**: Extract design patterns, color schemes, layouts from reference sites

### 3. RefTools - Documentation Optimization
- **Purpose**: Get accurate, version-specific library documentation
- **API Key**: Not required (free Upstash service)
- **Advantage**: Token-optimized alternative to Context7 with caching
- **Use case**: Get docs for Next.js 16, Velite, Tailwind 4, React 19

### 4. Playwright - E2E Testing
- **Purpose**: End-to-end and visual regression testing
- **API Key**: Not required (local installation)
- **Use case**: Test navigation, i18n, responsive design

**Note**: API keys in `.claude/mcp.json` are gitignored for security.

See [mcp-config.md](mcp-config.md) for detailed MCP documentation.

## Project Structure

```
davidmedinap/
├── .claude/              # Claude Code configuration
│   ├── README.md         # This file
│   ├── mcp.json          # MCP server configuration (gitignored)
│   ├── mcp-config.md     # Detailed MCP documentation
│   └── commands/         # Custom slash commands
├── app/                  # Next.js App Router
│   ├── [lang]/          # Multilingual routes (en/es/fr)
│   ├── globals.css      # Tailwind v4 config
│   └── layout.tsx       # Root layout
├── content/             # MDX blog posts
│   └── blog/
│       ├── en/          # English posts
│       ├── es/          # Spanish posts
│       └── fr/          # French posts
├── components/          # React components
├── lib/                 # Utilities and i18n
└── velite.config.ts    # Content processing config
```

## Content Management

Blog posts use MDX format with frontmatter:

```mdx
---
title: "My Post Title"
date: "2025-01-24"
lang: "en"
category: "technology"
published: true
description: "Post description"
tags: ["nextjs", "ai"]
---

# Post content here...
```

**Categories**: `technology`, `data-engineering`, `community`
**Languages**: `en`, `es`, `fr`

Posts are processed by Velite at build time into `.velite/` (gitignored).

## Key Features

- **Multilingual**: File-based i18n with `/[lang]/` routing
- **MDX**: Enhanced markdown with React components
- **Optimized**: Velite pre-processes content at build time
- **Modern**: Tailwind v4, Next.js 16, React 19
- **Type-safe**: Full TypeScript with generated content types

## Important Notes

- Never edit `.velite/` directory (auto-generated)
- Content schema defined in `velite.config.ts`
- MCP configuration in `.claude/mcp.json` (not committed)
- See `CLAUDE.md` in root for architecture details

## Development Workflow

1. Create MDX post in `content/blog/{lang}/{category}/`
2. Velite watches and regenerates types
3. Import in pages using generated types
4. Test with Playwright before deploy
5. Push to GitHub → Auto-deploy to Vercel

## Reference Documentation

- [Architecture Details](.claude/architecture.md)
- [MCP Configuration](.claude/mcp-config.md)
- [Project Guide](../CLAUDE.md)
