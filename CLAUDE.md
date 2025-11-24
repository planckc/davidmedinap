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

TypeScript is configured with `@/*` mapping to project root (tsconfig.json:22-23), allowing imports like `@/app/...` or `@/content/...`.

## Important Notes

- The `.velite` directory is generated automatically - never edit it directly
- Static assets from Velite are output to `public/static/` with hash-based filenames
- The Velite webpack plugin ensures content is built before Next.js compilation
- When working with blog posts, always validate against the schema in velite.config.ts
