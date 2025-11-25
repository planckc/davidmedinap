# 🎨 FIGMA WORKFLOW GUIDE

**Version:** 1.0
**Last Updated:** November 2025
**Status:** Active Standard for All Projects

---

## 📋 Overview

This document describes the Figma-First design methodology that is now the standard workflow for all projects, starting with David Medina's Portfolio.

**Core Principle:** Design decisions are made visually in Figma BEFORE implementation, reducing iterations and ensuring alignment between design intent and code.

---

## 🎯 Why Figma First?

### Problems Solved
- ❌ Designer/developer miscommunication → ✅ Shared visual reference
- ❌ Multiple code iterations → ✅ Specs locked before coding
- ❌ No design documentation → ✅ Figma is self-documenting
- ❌ Hard to scale designs → ✅ Reusable design system template
- ❌ Client sees result after weeks → ✅ Client approves mockups early

### Time Investment
- **Figma creation:** 2-3 hours
- **Traditional approach:** Research → Code → Feedback → Recode (6-8 hours)
- **Total with Figma:** 15-18 hours (saved 2-4 hours)
- **Future projects:** Reuse template, save 5+ hours per project

---

## 📊 Complete Workflow

### Phase 1: Research & Analysis (4-5 hours)

**Tools:** Exa MCP, Firecrawl MCP, design docs

**Deliverables:**
- Design trends analysis
- Competitor portfolio analysis
- 3+ design options documented
- Color palettes, typography, layout patterns identified

**Output:** `docs/DESIGN_PROPOSAL.md` with specifications

---

### Phase 2: Figma Mockups (2-3 hours) ⭐ KEY

**Who:** Claude Code (AI Design)
**Tools:** Figma (web app)
**Input:** Design proposal specs, research findings

**What to Create:**

#### File Structure
```
ProjectName - Design System
├── Option A: [Design Name]
│   ├── 🖥️ DESKTOP (1440px)
│   │   ├── Homepage
│   │   │   └── Desktop mockup with all sections
│   │   ├── Blog Listing
│   │   │   └── Grid/list layout with cards
│   │   ├── Blog Post Detail
│   │   │   └── Full article view
│   │   └── About/Contact
│   │       └── Additional pages
│   ├── 📱 MOBILE (375px)
│   │   ├── Homepage (responsive)
│   │   ├── Blog Listing (mobile layout)
│   │   └── Blog Post (mobile view)
│   └── 🎨 COMPONENTS
│       ├── Button (default, hover, active, disabled)
│       ├── Card (blog card, project card variants)
│       ├── Navigation (desktop, mobile hamburger)
│       ├── Hero Section
│       ├── Form Elements
│       └── Badges/Tags
│
├── Option B: [Design Name]
│   ├── 🖥️ DESKTOP
│   ├── 📱 MOBILE
│   └── 🎨 COMPONENTS
│
├── Option C: [Design Name]
│   ├── 🖥️ DESKTOP
│   ├── 📱 MOBILE
│   └── 🎨 COMPONENTS
│
└── 🎨 SHARED DESIGN SYSTEM
    ├── Color Palettes (RGB, HEX)
    ├── Typography Scales
    ├── Spacing Grid
    ├── Shadows & Effects
    ├── Icons
    └── Breakpoints Guide
```

#### Design Specifications to Include

**Each mockup should be annotated with:**

1. **Colors**
   ```
   Background: #0f172a (RGB: 15, 23, 42)
   Text Primary: #f1f5f9 (RGB: 241, 245, 249)
   Accent: #38bdf8 (RGB: 56, 189, 248)
   ```

2. **Typography**
   ```
   H1: Inter Bold, 96px, line-height: 1.1
   Body: Inter Regular, 18px, line-height: 1.7
   ```

3. **Spacing**
   ```
   Base unit: 8px
   Padding: 16px, 24px, 32px, 48px
   Margins: 24px, 32px, 48px
   Gap: 16px (default)
   ```

4. **Component States**
   - Hover
   - Active
   - Disabled
   - Focus (accessibility)

5. **Responsive Breakpoints**
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

**Best Practices:**
- Use Figma's Grid system (8px base)
- Create reusable components
- Use Auto Layout for responsive design
- Add measurement guides
- Use meaningful layer names
- Group related elements

---

### Phase 3: Share & Client Review (30-60 min)

**Action Items:**

1. **Export Figma Link**
   ```
   https://www.figma.com/file/[projectid]/ProjectName
   ```

2. **Share with Client**
   - Give view/comment permissions
   - Provide instruction guide
   - Ask for feedback on:
     - Color preferences
     - Typography feeling
     - Layout and flow
     - Component interactions

3. **Feedback Channels**
   - Figma comments (preferred)
   - Email with specific sections
   - Video walkthrough (optional)

4. **Document Changes Requested**
   - Client marks areas with comments
   - List all requested changes
   - Prioritize changes

5. **Iterate in Figma** (if needed)
   - Update colors/layout based on feedback
   - Create alternate versions
   - Get re-approval

---

### Phase 4: Design System Finalization (30 min)

**Lock Design Decisions:**

1. **Extract Specs**
   - Finalize color values
   - Lock typography scale
   - Confirm spacing system
   - Document all decisions

2. **Update CSS Variables**
   ```css
   :root {
     --bg-primary: #0f172a;
     --text-primary: #f1f5f9;
     --accent: #38bdf8;
     /* etc */
   }
   ```

3. **Create Components Checklist**
   - [ ] Button (all states)
   - [ ] Card (variants)
   - [ ] Navigation
   - [ ] Forms
   - [ ] Badges
   - [ ] etc.

4. **Export Assets** (if needed)
   - SVG icons
   - Illustrations
   - Large images
   - Patterns

---

### Phase 5: Implementation (6-8 hours)

**Build from Figma:**

1. **Create React Components**
   ```tsx
   // Use Figma as reference
   // Match colors exactly
   // Replicate spacing precisely
   // Implement all states (hover, active, etc.)
   ```

2. **Styling Approach**
   - Tailwind CSS + custom CSS variables
   - Match Figma design system
   - Implement dark/light mode if designed
   - Responsive mobile-first

3. **Component Implementation Order**
   1. Layout/Container components
   2. Basic components (Button, Card)
   3. Complex components (Header, Hero)
   4. Page layouts
   5. Animations (Framer Motion)

4. **Quality Assurance**
   - Pixel-perfect match to Figma
   - All interactive states working
   - Responsive on all breakpoints
   - Accessibility compliant

---

### Phase 6: Testing & Optimization (2-3 hours)

**Run Tests:**
```bash
npx playwright test --project=chromium
```

**Verify:**
- ✅ Lighthouse Performance > 90
- ✅ Accessibility > 95
- ✅ All tests passing
- ✅ Mobile responsiveness
- ✅ WCAG 2.1 AA compliance

**Optimize:**
- Image sizes
- CSS/JS bundle
- Font loading
- Animations performance

---

### Phase 7: Deploy & Iterate (1-2 hours)

**Deploy to Vercel:**
```bash
git push origin main
```

**Gather Live Feedback:**
- Client reviews live site
- Minor adjustments if needed
- Performance monitoring

---

## 🛠️ Tools & Resources

### Figma Features to Use
- **Components** - Create reusable UI elements
- **Auto Layout** - Build responsive designs
- **Grids** - Maintain alignment
- **Prototyping** - Show interactions
- **Design System** - Libraries for consistency
- **Dev Handoff** - Built-in specs for developers

### Figma Plugins Recommended
- **Figma Tokens** - Design token management
- **Unsplash** - Stock images
- **Iconify** - Icon sets
- **Measure** - Spacing measurements
- **Able – Accessible Colors** - Color accessibility

### Shared Resources
- Figma project template (create first time)
- Design system file (reusable)
- Color palette library
- Typography scales
- Icon sets

---

## 📝 Figma Best Practices

### Organization
- ✅ Use frames for each screen
- ✅ Group related components
- ✅ Name layers descriptively
- ✅ Use color styles for consistency
- ✅ Create text styles for typography
- ✅ Organize pages by section

### Documentation
- ✅ Add notes to complex sections
- ✅ Include measurement guides
- ✅ Document color meanings
- ✅ List breakpoints
- ✅ Explain component variations
- ✅ Link to design specs doc

### Handoff to Developers
- ✅ Create developer copy of file
- ✅ Lock non-development layers
- ✅ Add measurements/specs
- ✅ Include component guide
- ✅ Export necessary assets
- ✅ Provide color/spacing reference

---

## 🔄 For Future Projects

### Reuse Template
1. **Duplicate Figma file**
   - Keep David Medina template as base
   - Save as "ProjectName - Design System"

2. **Customize**
   - Update project-specific colors
   - Adjust typography if needed
   - Modify sections for scope
   - Keep component library

3. **Apply Workflow**
   - Follow same 7 phases
   - Use proven process
   - Leverage existing components
   - Faster deliverables

### Scaling
- **For design teams:** Collaborate in Figma directly
- **For multiple projects:** Maintain shared component library
- **For contractors:** Use Figma as contract specification
- **For documentation:** Figma is source of truth

---

## 📊 Success Metrics

### Process Success
- ✅ Design finalized before development
- ✅ 0-2 code iterations needed
- ✅ Client happy on first review
- ✅ Timeline accurate

### Design Success
- ✅ Figma matches implementation
- ✅ All breakpoints responsive
- ✅ Component library complete
- ✅ Design system reusable

### Technical Success
- ✅ Lighthouse 90+
- ✅ WCAG AA compliant
- ✅ All tests passing
- ✅ Performance optimized

---

## 🚀 Quick Reference

### Phase Duration Summary
| Phase | Time | Owner |
|-------|------|-------|
| Research | 4-5 hrs | Claude Code |
| Figma Mockups | 2-3 hrs | Claude Code |
| Client Review | 0.5-1 hr | Client |
| Implementation | 6-8 hrs | Claude Code |
| Testing | 2-3 hrs | Claude Code |
| Deployment | 1-2 hrs | Claude Code |
| **TOTAL** | **16-22 hrs** | - |

### File Locations
- Design proposal: `docs/DESIGN_PROPOSAL.md`
- Figma file: Share link with client
- Implementation: Code in `/app`, `/components`
- Documentation: `CLAUDE.md`, this file

### Key Contacts
- Client: [David Medina](https://linkedin.com/in/planckcode)
- Repo: [GitHub](https://github.com/planckc/davidmedinap)
- Deployment: Vercel

---

## 📚 References

- Figma Help: https://help.figma.com
- Design System Guide: https://www.designsystems.com
- Responsive Design: https://web.dev/responsive-web-design-basics
- Accessibility: https://www.w3.org/WAI/WCAG21/quickref

---

**Status:** Active workflow standard
**Next:** Implement Figma mockups for David Medina portfolio (Phase 6)
**Last Updated:** November 2025

