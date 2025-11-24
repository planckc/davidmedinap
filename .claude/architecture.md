# Arquitectura del Proyecto - INTROS (Sitio Personal David Medina)

**Fecha de creación:** 2025-01-24
**Repositorio:** https://github.com/planckc/davidmedinap
**Estado:** Planificación aprobada - Listo para implementación

---

## 🎯 Resumen Ejecutivo

Sitio personal profesional con blog técnico multilenguaje (ES/EN/FR) enfocado en:
- IA & Machine Learning
- Business Intelligence & Data Engineering
- Proyectos comunitarios (MYSION, Faith Tech)

**Objetivo:** Portfolio profesional "clase mundial" - moderno, visual, interactivo.

---

## 🏗️ Stack Técnico

### Frontend Framework
- **Next.js 14.2+** (App Router)
- **React 18+**
- **TypeScript 5+**

**Decisión clave:** Next.js elegido sobre Astro por:
- Ecosistema superior de componentes interactivos (React)
- Acceso a librerías de UI "clase mundial" (Shadcn, Aceternity, Magic UI)
- Mejor integración con Vercel
- Componentes interactivos requeridos (2-3 posts/semana)

Ref: Ver `docs/architecture/decisions/001-nextjs-over-astro.md`

### Gestión de Contenido
- **ContentLayer** - Transformación de Markdown a TypeScript types
- **MDX** - Markdown con componentes React interactivos
- **Gray-matter** - Parsing de frontmatter

**Flujo de blog posts:**
```
1. Crear archivo: content/blog/{lang}/{category}/{slug}.mdx
2. ContentLayer auto-genera tipos TypeScript
3. Hot reload en desarrollo
4. Static generation en build
```

### Styling & UI
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Shadcn/ui** - Component library base (customizable)
- **Aceternity UI** - Componentes premium modernos
- **Magic UI** - Animaciones y efectos avanzados
- **Framer Motion** - Animaciones fluidas y transiciones
- **Lucide Icons** - Iconografía moderna

### Internacionalización (i18n)
- **Método:** File-based routing con carpetas `[lang]`
- **Idiomas soportados:** `en` (English), `es` (Español), `fr` (Français)
- **Estructura URL:** `/{lang}/{page}` (ej: `/es/blog/mi-post`)
- **Content routing:** `/content/blog/{lang}/{category}/{slug}.mdx`
- **Sin librerías externas** - i18n nativo de Next.js App Router

### Deployment & Hosting
- **Vercel** - Hosting, CI/CD, edge network
- **GitHub** - Control de versiones y trigger de deploys
- **Dominio:** TBD

**Flujo de deploy:**
- Push a `main` → Auto-deploy a producción
- Pull Request → Preview URL único automático
- Branches → Preview URLs por rama

---

## 🧩 Estructura de Directorios

```
davidmedinap/
├── .claude/                          # Claude Code configuration
│   ├── architecture.md              # Este archivo
│   ├── guide.md                     # Guía de desarrollo
│   ├── mcp-config.md                # Configuración de MCPs
│   ├── commands/                    # Slash commands personalizados
│   │   ├── new-post.md             # /new-post - Crear blog post
│   │   ├── dev.md                  # /dev - Iniciar dev server
│   │   ├── test.md                 # /test - Run test suite
│   │   └── scrape-design.md        # /scrape-design - Analizar diseño
│   └── settings.local.json         # Settings de Claude Code
│
├── app/                             # Next.js App Router
│   ├── [lang]/                     # Dynamic language routing
│   │   ├── page.tsx                # Homepage (landing page)
│   │   ├── layout.tsx              # Layout por idioma
│   │   ├── about/
│   │   │   └── page.tsx            # Página "Acerca de"
│   │   ├── links/
│   │   │   └── page.tsx            # Página de enlaces
│   │   ├── services/
│   │   │   ├── page.tsx            # Overview de servicios
│   │   │   ├── ai/                 # IA & ML services
│   │   │   │   └── page.tsx
│   │   │   ├── data-engineering/   # BI & Power BI services
│   │   │   │   └── page.tsx
│   │   │   └── community/          # Community projects
│   │   │       └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx            # Lista de posts (todos)
│   │       ├── [category]/         # Filtro por categoría
│   │       │   └── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx        # Post individual
│   ├── api/                        # API Routes (futuro)
│   │   └── newsletter/             # Subscription (opcional)
│   ├── layout.tsx                  # Root layout
│   └── not-found.tsx               # 404 page
│
├── content/                         # Markdown content source
│   ├── blog/
│   │   ├── en/
│   │   │   ├── technology/
│   │   │   │   ├── my-first-post.mdx
│   │   │   │   └── ai-implementation-guide.mdx
│   │   │   ├── data-engineering/
│   │   │   │   └── powerbi-best-practices.mdx
│   │   │   └── community/
│   │   │       └── mysion-journey.mdx
│   │   ├── es/
│   │   │   ├── tecnologia/
│   │   │   ├── ingenieria-datos/
│   │   │   └── comunidad/
│   │   └── fr/
│   │       ├── technologie/
│   │       ├── ingenierie-donnees/
│   │       └── communaute/
│   └── pages/                      # Static pages content
│       ├── en/
│       │   ├── about.md
│       │   ├── links.md
│       │   └── services/
│       ├── es/
│       └── fr/
│
├── components/
│   ├── ui/                         # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── blog/
│   │   ├── PostCard.tsx           # Card de preview de post
│   │   ├── PostGrid.tsx           # Grid de posts
│   │   ├── PostHeader.tsx         # Header de post individual
│   │   ├── CategoryFilter.tsx     # Filtro de categorías
│   │   └── ReadingTime.tsx        # Tiempo de lectura
│   ├── sections/                   # Landing page sections
│   │   ├── Hero.tsx               # Hero section
│   │   ├── Services.tsx           # Servicios overview
│   │   ├── RecentPosts.tsx        # Posts recientes
│   │   ├── About.tsx              # About preview
│   │   └── CTA.tsx                # Call to action
│   └── layout/
│       ├── Header.tsx             # Navegación principal
│       ├── Footer.tsx             # Footer con links
│       └── LanguageSwitcher.tsx   # Selector de idioma
│
├── lib/
│   ├── contentlayer.ts            # ContentLayer utilities
│   ├── i18n.ts                    # i18n configuration
│   └── utils.ts                   # Utility functions
│
├── public/
│   └── assets/
│       ├── images/
│       │   ├── blog/              # Imágenes de posts
│       │   └── profile/           # Foto de perfil, etc
│       └── documents/
│           └── CVs/               # CVs en PDF
│
├── styles/
│   └── globals.css                # Tailwind imports + custom styles
│
├── tests/                          # Playwright E2E tests
│   ├── e2e/
│   │   ├── navigation.spec.ts
│   │   ├── blog.spec.ts
│   │   └── i18n.spec.ts
│   └── visual/
│       └── responsive.spec.ts
│
├── docs/                           # Project documentation
│   ├── architecture/
│   │   ├── decisions/             # ADRs (Architecture Decision Records)
│   │   │   └── 001-nextjs-over-astro.md
│   │   └── diagrams/
│   ├── design/
│   │   ├── style-guide.md
│   │   ├── components.md
│   │   └── references/            # Scraped design references
│   └── deployment/
│       └── vercel-setup.md
│
├── contentlayer.config.ts          # ContentLayer schemas
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── playwright.config.ts            # Playwright configuration
├── package.json
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔧 Configuraciones Clave

### ContentLayer Schema

**Blog Post Schema:**
```typescript
{
  title: string              // "Título del post"
  date: string               // "2025-01-24"
  category: enum             // "technology" | "data-engineering" | "community"
  lang: enum                 // "en" | "es" | "fr"
  excerpt: string            // Descripción corta para SEO
  image: string              // "/assets/images/blog/post-image.jpg"
  tags: string[]             // ["IA", "transformación digital"]
  published: boolean         // true | false (drafts)
}
```

**Computed Fields:**
- `url`: Genera automáticamente la ruta `/{lang}/blog/{slug}`
- `readingTime`: Calcula tiempo de lectura estimado
- `slug`: Deriva del filename

### i18n Configuration

```typescript
// lib/i18n.ts
export const locales = ['en', 'es', 'fr'] as const
export const defaultLocale = 'en'

// URL Structure
// /{locale}/{page}
// Ejemplos:
// /en/blog/my-post
// /es/blog/mi-post
// /fr/blog/mon-article
```

**Detección de idioma:** Basada en URL (no cookies, no browser detection)

### Tailwind Configuration

**Paleta de colores:** TBD en Fase 7 (diseño)
**Tipografía:** TBD en Fase 7
**Plugins:**
- `@tailwindcss/typography` - Para prose content en posts
- Custom animations - Para micro-interactions

**Dark mode:** `class` strategy (opcional, a definir)

---

## 📝 Convenciones de Código

### Naming Conventions
- **Componentes:** PascalCase (`PostCard.tsx`)
- **Utilidades:** camelCase (`formatDate.ts`)
- **Archivos de página:** lowercase (`page.tsx`, `layout.tsx`)
- **Constantes:** UPPER_SNAKE_CASE (`DEFAULT_LOCALE`)
- **Carpetas:** kebab-case (`data-engineering/`)

### Blog Post Frontmatter Template

```yaml
---
title: "Título del Post"
date: 2025-01-24
category: "technology"
lang: "es"
excerpt: "Descripción corta para SEO (150-160 caracteres)"
image: "/assets/images/blog/post-image.jpg"
tags: ["tag1", "tag2", "tag3"]
published: true
---

# Título del Post

Contenido del post en Markdown/MDX...

Puedes usar componentes React:
<CustomComponent prop="value" />
```

### Component Structure Pattern

```typescript
// 1. Imports
import { ... } from '...'

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export function ComponentName({ ...props }: ComponentProps) {
  // Hooks
  const [state, setState] = useState(...)

  // Logic
  const handleAction = () => { ... }

  // Return JSX
  return (
    <div>...</div>
  )
}
```

---

## 🔌 MCPs Configuration

### MCPs Instalados

#### 1. Exa MCP
**Propósito:** Búsqueda semántica de sitios web de alta calidad
**Uso principal:** Encontrar portfolios de referencia para Fase 7 (diseño)

**API Key:** Configurar en `CLAUDE_EXA_API_KEY`
**Tier gratuito:** 1000 búsquedas/mes

**Casos de uso:**
- Buscar "modern AI portfolio designs with animations"
- Encontrar sitios tech de referencia
- Research de tendencias de diseño

---

#### 2. Firecrawl MCP
**Propósito:** Scraping y análisis de diseños web
**Uso principal:** Analizar sitios de referencia encontrados con Exa

**API Key:** Configurar en `FIRECRAWL_API_KEY`
**Tier gratuito:** 500 páginas/mes

**Casos de uso:**
- Scraping de sitios aprobados por el cliente
- Extracción de paletas de colores
- Análisis de tipografía y spacing
- Captura de patrones de diseño

**Comando:** `/scrape-design [URL]`

---

#### 3. Playwright MCP
**Propósito:** Testing E2E y visual regression
**Uso principal:** Validación de funcionalidad e integración continua

**Sin API Key** (instalación local)

**Casos de uso:**
- Tests E2E de navegación
- Visual regression testing
- Responsive testing (mobile/tablet/desktop)
- Tests de componentes interactivos
- Pre-deploy validation

**Comando:** `/test` o `/test responsive`

---

### Herramientas Nativas (Sin MCP)

**GitHub CLI (`gh`):**
- Operaciones de GitHub via Bash
- Crear PRs, issues, reviews
- No requiere MCP adicional

**WebSearch (nativo de Claude):**
- Búsquedas web generales
- Fallback si Exa alcanza límites
- Búsqueda de docs y soluciones técnicas

---

## 🎨 Estrategia de Diseño

### Proceso de Diseño (Fase 7)

**Workflow propuesto:**

1. **Research activo (Claude):**
   - Buscar 5-6 portfolios "clase mundial" con Exa
   - Scraping con Firecrawl de sitios seleccionados
   - Análisis de patrones (colores, tipografía, spacing, animaciones)
   - Crear moodboard digital en `docs/design/references/`

2. **Propuesta (Claude → Cliente):**
   - Presentar 2-3 opciones de diseño (Opción A, B, C)
   - Screenshots y descripciones
   - Referencias concretas

3. **Feedback (Cliente → Claude):**
   - Aprobación: "Me gusta Opción A"
   - Mixto: "Combina A + B"
   - Ajuste: "Cambia los colores de A"

4. **Implementación (Claude):**
   - Implementar diseño aprobado
   - Deploy a preview URL (Vercel)

5. **Revisión (Cliente):**
   - Revisar en preview URL real
   - Feedback: ✅ "Perfecto" / "Ajusta X"

6. **Iteración:**
   - Ajustes según feedback
   - Tests visuales con Playwright
   - Merge a main cuando esté aprobado

**Objetivo:** Diseño moderno, elegante, "clase mundial" - visual, interactivo, profesional.

### Referencias de Estilo (Ejemplos de sitios "clase mundial")
- Vercel.com - Minimalista, elegante, animaciones sutiles
- Linear.app - Ultra moderno, gradientes, transiciones
- Stripe.com - Profesional, limpio, efectos 3D
- Raycast.com - Vibrante, dinámico, llamativo

**Nota:** Referencias finales a definir en Fase 7 con Exa research.

---

## 🚀 Flujo de Trabajo

### Desarrollo Local

```bash
# Setup inicial
git clone https://github.com/planckc/davidmedinap.git
cd davidmedinap
npm install

# Development
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint

# Testing
npm run test         # Run Playwright tests
npm run test:e2e     # E2E tests only
npm run test:visual  # Visual regression tests
```

### Crear Nuevo Blog Post

**Opción 1: Slash command (recomendado)**
```
/new-post
→ Seleccionar idioma (en/es/fr)
→ Seleccionar categoría (technology/data-engineering/community)
→ Ingresar título y slug
→ Archivo creado con template
```

**Opción 2: Manual**
```bash
# Crear archivo
touch content/blog/es/tecnologia/mi-nuevo-post.mdx

# Escribir contenido con frontmatter
# Preview automático en http://localhost:3000
# ContentLayer regenera tipos automáticamente
```

### Deployment Workflow

```bash
# Desarrollo en feature branch
git checkout -b feature/new-design
git add .
git commit -m "Implement new hero section"
git push origin feature/new-design

# → Vercel crea Preview URL automático

# Después de aprobación
gh pr create --title "New hero section" --body "..."
# → Merge genera deploy a producción automáticamente
```

---

## 🎯 Contenido del Sitio

### Estructura de Contenido Actual

**3 Pilares de Servicios:**
1. **Technology / IA & ML**
   - AI solution development
   - Machine Learning implementation
   - Digital transformation consulting

2. **Data Engineering / BI & Power BI**
   - Power BI dashboard development
   - Data modeling and BI architecture
   - Business Intelligence consulting

3. **Community / Proyectos Comunitarios**
   - MYSION.CO (350+ members)
   - Faith Tech Montreal
   - MIEES IT community

**Páginas Estáticas:**
- **About:** Bio profesional, trayectoria, ubicación (Montreal)
- **Links:** Enlaces a LinkedIn, MYSION, calendarios, redes
- **Services:** Overview de los 3 pilares

**Blog:**
- Categorías alineadas con pilares de servicios
- Frecuencia: 2-3 posts por semana
- Multilenguaje: EN/ES (FR preparado)

**Assets:**
- CVs en PDF (múltiples versiones)
- Imágenes de blog (a crear)
- Fotos de perfil (a agregar)

---

## 📊 Performance & SEO

### Performance Targets

- **Lighthouse Score:** >95 (all categories)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Largest Contentful Paint:** <2.5s
- **Bundle Size (initial):** <200KB

### SEO Strategy

- **Static Site Generation (SSG):** Todo el contenido pre-renderizado
- **Meta tags:** Automáticos por página/post
- **Open Graph:** Imágenes y metadata para social sharing
- **Sitemap.xml:** Generado automáticamente
- **robots.txt:** Configurado para indexación
- **Structured data:** JSON-LD para posts y profile

### Optimizaciones

- **next/image:** Optimización automática de imágenes
- **next/font:** Optimización de fuentes
- **Code splitting:** Automático por ruta
- **Lazy loading:** Componentes pesados bajo demanda
- **Edge caching:** Via Vercel CDN

---

## 🔐 Security & Privacy

- **No authentication:** Sitio público, no login
- **No database:** Stateless, content en archivos
- **No sensitive data:** Contenido público
- **API keys:** Almacenadas en Vercel environment variables
- **Content validation:** ContentLayer schemas validan estructura

---

## 🗺️ Roadmap

### Fase 1: MVP (Actual) ✅
- Setup de proyecto
- Migración de contenido
- Blog funcional
- Deploy en Vercel
- Diseño profesional

### Fase 2: Enhancements (Futuro)
- Newsletter subscription
- Analytics (Vercel Analytics o Plausible)
- Search functionality (Algolia o Pagefind)
- RSS feed
- Reading time estimation
- View counts

### Fase 3: Advanced Features (Opcional)
- Comments system (Giscus/utterances)
- Related posts recommendation
- Social share buttons
- Tag filtering
- Archive by date
- Dark mode toggle

---

## 📚 Decisiones de Arquitectura (ADRs)

### ADR-001: Next.js sobre Astro
**Decisión:** Usar Next.js 14 con App Router
**Contexto:** Blog con componentes interactivos, diseño "clase mundial"
**Alternativas:** Astro, Hugo, Gatsby
**Razón:** Ecosistema React superior para componentes UI modernos
**Ver:** `docs/architecture/decisions/001-nextjs-over-astro.md`

### ADR-002: ContentLayer sobre CMS headless
**Decisión:** ContentLayer con Markdown local
**Contexto:** Solo un autor, contenido versionado
**Alternativas:** Sanity, Contentful, Strapi
**Razón:** Simplicidad, git-based, type-safety, sin backend

### ADR-003: Vercel sobre CapRover
**Decisión:** Vercel para hosting
**Contexto:** GitHub workflow, preview URLs
**Alternativas:** CapRover, Netlify
**Razón:** Flujo transparente GitHub → Vercel, Next.js optimizations nativas

### ADR-004: File-based i18n sobre next-i18next
**Decisión:** Routing `[lang]` nativo
**Contexto:** Multilenguaje EN/ES/FR
**Alternativas:** next-i18next, next-intl
**Razón:** Cero dependencias, URLs limpias, simplicidad

---

## 🔗 Enlaces Importantes

**Repositorio:** https://github.com/planckc/davidmedinap
**Deploy (producción):** TBD (configurar dominio)
**Deploy (preview):** Auto-generado por Vercel en PRs
**Vercel Dashboard:** TBD (después de conectar)

**Documentación Técnica:**
- Next.js App Router: https://nextjs.org/docs/app
- ContentLayer: https://contentlayer.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- Shadcn/ui: https://ui.shadcn.com/
- Playwright: https://playwright.dev/

---

## 📞 Contacto del Proyecto

**Cliente:** David Medina
**LinkedIn:** https://www.linkedin.com/in/planckcode
**MYSION Profile:** https://mysion.co/davidmedina
**Meeting:** https://zcal.co/i/1mbSU6B9

---

**Última actualización:** 2025-01-24
**Versión:** 1.0 (Baseline aprobado)
**Estado:** Listo para implementación
