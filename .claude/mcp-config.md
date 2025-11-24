# MCP Configuration Guide

**Proyecto:** INTROS - Sitio Personal David Medina
**Fecha:** 2025-01-24
**Estado:** Configurado y listo para usar

---

## 📋 MCPs Instalados

### 1. Exa MCP - Búsqueda Semántica Web

**Propósito:** Búsqueda inteligente de contenido de alta calidad en internet

**Herramientas disponibles:**
- `web_search_exa` - Búsqueda web estándar
- `deep_search_exa` - Búsqueda profunda con análisis
- `get_code_context_exa` - Búsqueda de código y snippets
- `crawling_exa` - Crawling de sitios
- `company_research_exa` - Research de empresas
- `linkedin_search_exa` - Búsqueda en LinkedIn
- `deep_researcher_start` - Iniciar research profundo
- `deep_researcher_check` - Verificar progreso de research

**API Key:** Configurada en `.claude/mcp.json`
**Tier:** Gratuito - 1000 búsquedas/mes

**Casos de uso en este proyecto:**
- Buscar portfolios de referencia "clase mundial"
- Encontrar tendencias de diseño moderno
- Research de componentes UI
- Análisis de competencia

**Ejemplo:**
```
"Busca portfolios modernos de desarrolladores AI con diseño interactivo y animaciones"
→ Exa encuentra sitios de alta calidad, filtrados por relevancia
```

---

### 2. Firecrawl MCP - Web Scraping & Analysis

**Propósito:** Scraping y análisis de diseños web

**Herramientas disponibles:**
- Scraping de páginas completas
- Extracción de estructura HTML/CSS
- Captura de screenshots
- Análisis de metadata

**API Key:** Configurada en `.claude/mcp.json`
**Tier:** Gratuito - 500 páginas/mes

**Casos de uso en este proyecto:**
- Analizar diseños de sitios seleccionados
- Extraer paletas de colores
- Identificar tipografía utilizada
- Analizar spacing y layouts
- Documentar patrones de diseño

**Workflow típico:**
1. Exa encuentra sitios de referencia
2. Firecrawl hace scraping y análisis
3. Extraemos patrones para implementar
4. Documentamos en `docs/design/references/`

---

### 3. Playwright MCP - E2E Testing

**Propósito:** Testing end-to-end y visual regression

**Herramientas disponibles:**
- E2E testing de flujos completos
- Visual regression testing
- Screenshot testing
- Cross-browser testing
- Responsive testing

**API Key:** No requiere (instalación local)

**Casos de uso en este proyecto:**
- Validar navegación multilenguaje
- Test de componentes interactivos
- Visual regression (detectar cambios no deseados)
- Responsive testing (mobile/tablet/desktop)
- Pre-deploy validation

**Tests planeados:**
- Navigation tests (header, footer, language switcher)
- Blog tests (lista, filtros, post individual)
- i18n tests (cambio de idioma, URLs correctas)
- Responsive tests (breakpoints)

---

## 🔧 Configuración Técnica

### Archivo de configuración

**Ubicación:** `.claude/mcp.json`

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": [
        "-y",
        "exa-mcp-server",
        "--tools",
        "web_search_exa,deep_search_exa,..."
      ],
      "env": {
        "EXA_API_KEY": "***"
      }
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "@firecrawl/mcp-server-firecrawl"],
      "env": {
        "FIRECRAWL_API_KEY": "***"
      }
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "env": {}
    }
  }
}
```

### Reiniciar Claude Code

Después de cambios en `mcp.json`:
1. Cerrar Claude Code
2. Reabrir Claude Code
3. MCPs se cargan automáticamente

---

## 🎯 Workflows con MCPs

### Workflow 1: Design Research (Fase 7)

**Objetivo:** Encontrar y analizar referencias de diseño

```
1. Claude usa Exa:
   "Busca portfolios de desarrolladores AI con diseño moderno y animaciones"

2. Exa retorna 5-6 URLs de alta calidad

3. Claude usa Firecrawl en cada URL:
   - Scraping de la página
   - Análisis de colores, tipografía, layout
   - Captura de screenshots

4. Claude presenta opciones al cliente:
   "Opción A: Estilo minimalista (como vercel.com)"
   "Opción B: Estilo vibrante (como raycast.com)"

5. Cliente aprueba: "Me gusta Opción A"

6. Claude implementa diseño basado en análisis
```

---

### Workflow 2: Testing (Después de cada feature)

**Objetivo:** Validar funcionalidad y diseño

```
1. Claude implementa feature (ej: Hero section)

2. Comando: /test

3. Playwright ejecuta:
   - E2E test: navegación funciona
   - Visual regression: diseño no cambió donde no debía
   - Responsive test: mobile/tablet/desktop OK

4. Si tests pasan → Deploy a preview
   Si tests fallan → Fix y re-test
```

---

### Workflow 3: Blog Post Creation

**Objetivo:** Crear y validar nuevo blog post

```
1. Comando: /new-post
   - Seleccionar idioma, categoría
   - Escribir contenido en MDX

2. Preview local: npm run dev

3. Comando: /test blog
   - Playwright valida: post aparece en lista
   - Metadata correcta
   - Links funcionan

4. Git commit + push → Vercel deploy
```

---

## 📊 Límites y Consideraciones

### Exa MCP
- **Límite:** 1000 búsquedas/mes (tier gratuito)
- **Estimado para proyecto:** ~50-100 búsquedas (Fase 7)
- **Fallback:** WebSearch nativo de Claude si se agotan

### Firecrawl MCP
- **Límite:** 500 páginas/mes (tier gratuito)
- **Estimado para proyecto:** ~20-30 páginas (Fase 7)
- **Fallback:** WebFetch manual si se agotan

### Playwright MCP
- **Sin límites** (local)
- **Consideración:** Requiere ~200MB para browsers
- **Instalación:** `npx playwright install`

---

## 🐛 Troubleshooting

### MCP no se carga
**Problema:** MCP no aparece disponible en Claude Code

**Solución:**
1. Verificar sintaxis en `.claude/mcp.json` (JSON válido)
2. Reiniciar Claude Code completamente
3. Verificar que `npx` esté disponible: `npx --version`

---

### Exa: API key inválida
**Problema:** Error de autenticación

**Solución:**
1. Verificar API key en https://exa.ai/dashboard
2. Actualizar en `.claude/mcp.json`
3. Reiniciar Claude Code

---

### Firecrawl: Rate limit excedido
**Problema:** "Rate limit exceeded"

**Solución:**
1. Esperar al siguiente ciclo mensual
2. Usar WebFetch como alternativa
3. Considerar upgrade a tier pago si necesario

---

### Playwright: Browsers no instalados
**Problema:** "Executable doesn't exist at ..."

**Solución:**
```bash
npx playwright install
```

---

## 🔐 Seguridad

### API Keys
- **NO** commitear `.claude/mcp.json` con API keys a Git
- Agregado a `.gitignore`
- API keys solo en entorno local

### .gitignore entry:
```
.claude/mcp.json
```

**Alternativa para compartir:**
- Crear `.claude/mcp.json.example` sin keys
- Documentar dónde obtener keys

---

## 📚 Documentación Adicional

**Exa:**
- Docs: https://docs.exa.ai
- Dashboard: https://exa.ai/dashboard

**Firecrawl:**
- Docs: https://docs.firecrawl.dev
- Dashboard: https://firecrawl.dev/dashboard

**Playwright:**
- Docs: https://playwright.dev
- MCP Docs: https://github.com/microsoft/playwright-mcp

---

## ✅ Checklist de Verificación

Después de configurar MCPs, verificar:

- [ ] Archivo `.claude/mcp.json` creado con API keys correctas
- [ ] Claude Code reiniciado
- [ ] Exa MCP disponible (test: buscar algo simple)
- [ ] Firecrawl MCP disponible (test: scrape una URL)
- [ ] Playwright instalado: `npx playwright install`
- [ ] `.claude/mcp.json` en `.gitignore`

---

**Última actualización:** 2025-01-24
**Estado:** ✅ Configurado y verificado
