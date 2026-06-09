<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Goal
- Build a portfolio site with a dynamic Design Systems Studio lab, a Forma research deep-dive, polished home page, and fix UI issues as reported.

## Constraints & Preferences
- Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion, dark theme
- Emojis must not be used in SVG icons — replaced with lucide-react components on Forma page
- No strategic roadmap section on Forma research page
- Page should be scrollable to the bottom without CSS clipping
- Design system page should feel like a studio canvas (art board) with interactive controls

## Progress
### Done
- Explored portfolio project structure and existing pages
- Created `/experiments` page with 4 categories, 16 experiment cards, filtering, status badges; added link to Navbar
- Explored Forma-Research monorepo (40+ docs, 16 packages, 6 apps) and created `/research/forma` page with 8 sections, interactive layers, package graph, component catalog, personas, use cases, market study, current status
- Added "Research" link to Navbar; added architecture flow diagram to Forma hero
- Removed "98 Lighthouse Score" metric from homepage (grid: lg:grid-cols-4)
- Fixed page scrolling: moved `overflow-x: clip` from root elements to a wrapper `<div>` in layout.tsx
- Replaced all emoji/symbol characters on Forma page (⚡→Zap, ◻→Square, ◇→Diamond, →→ArrowRight, ✓→Check, ◀/▶→ChevronLeft/Right, •→Dot, ◌→Circle) using lucide-react — build compiles clean
- Fixed duplicate key error on Forma page (two "Feedback" entries) — renamed second to "Status"
- Removed "Experiments" link from Navbar; the page still exists at `/experiments` for direct access
- Created `src/lib/design-system/` with 4 files: types.ts (DesignSystem, ColorPalette, ResearchEntry, StudioTokens interfaces), domains.ts (6 domains with 30 tokens each), palettes.ts (6 palettes with 7 tokens each), research.ts (design decisions per domain)
- Un-hid `/design-system` route: removed `notFound()` from layout.tsx, added full metadata + OG tags
- Added "DS Lab" link to Navbar (between About and Research)
- Redesigned `/design-system` page with studio layout: ambient gradient lighting, refined dot grid, thin h-10 toolbar, vertical icon tool palette (left), floating StudioPanel (right) with sliders for border radius, font family, base font size, shadow intensity, spacing scale, saturation/lightness shifts
- Added split-view mode (toggle in toolbar) — renders two independent domain+palette themes side-by-side with column controls
- Extracted section rendering into `SectionRenderer` helper component using a switch statement
- Updated `Card` component to use CSS variables (`--ds-radius-xl`, `--ds-shadow`) for dynamic customization
- Updated `TypographySection` to scale with `baseFontSize` token, display selected heading/body font names, and use CSS variable font families
- Updated `CodeSection` to accept `studioTokens` prop
- All 32 static routes build successfully

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- Experiments page: inline data, single page without detail routes (no MDX needed)
- Forma research page: all data from real Forma docs, interactive elements (expandable layers, filterable use cases, clickable personas)
- Design system studio: CSS custom variables on wrapper div + inline style references for dynamic customization — avoids context/prop threading overhead
- StudioPanel: right-side floating panel with collapsible toggle in toolbar — keeps canvas clean when not in use
- Split view: two independent theme objects rendered side-by-side when toggled — second domain/palette pickers in StudioPanel
- `SectionRenderer` component keeps section logic DRY — single switch instead of 8 conditionals both in single view and split view
- `SliderControl` accepts `colors` prop to avoid closure scope issues

## Next Steps
1. Polish any edge cases in the studio panel (mobile responsiveness, touch sliders)
2. Verify all section components render correctly with customized tokens
3. Consider adding shareable URL encoding for studio state

## Critical Context
- Build compiles successfully — 32 static routes including `/design-system`
- Design system page uses `"use client"` with Framer Motion animations; 6 domains × 6 palettes = 36 live theme combinations
- Card component uses `borderRadius: "var(--ds-radius-xl, 1rem)"` and `boxShadow: "0 0 0 1px ..., 0 calc(4px * var(--ds-shadow, 1)) calc(24px * var(--ds-shadow, 1)) ..."` for floating panel look
- Studio tokens: borderRadius, fontHeading, fontBody, baseFontSize, shadowIntensity, spacingScale, saturationShift, lightnessShift

## Relevant Files
- `src/app/design-system/page.tsx`: main studio page (~1725 lines) — toolbar, tool palette, StudioPanel, SectionRenderer, split view, CSS variable wrapper, 8 section components
- `src/app/design-system/layout.tsx`: metadata for design system page (removed notFound)
- `src/lib/design-system/types.ts`: DesignSystem, ColorPalette, ResearchEntry, StudioTokens interfaces + defaults
- `src/lib/design-system/domains.ts`: 6 domain definitions (OOH, Data Science, AI, Design Engineering, FinTech, Consumer)
- `src/lib/design-system/palettes.ts`: 6 color palette definitions
- `src/lib/design-system/research.ts`: research entries per domain (rationale, decisions, references, tradeoffs)
- `src/app/research/forma/page.tsx`: Forma research page (emojis replaced, duplicate key fixed)
- `src/components/Navbar.tsx`: nav links (Experiments removed, DS Lab added)
- `src/app/layout.tsx`: overflow-x-clip wrapper for scroll fix
- `src/app/experiments/page.tsx`: 16 experiments in 4 categories with filtering (still accessible at /experiments)
