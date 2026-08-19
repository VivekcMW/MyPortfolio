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
- **/process visual redesign** ("visual + documentation + animated"): new `src/app/process/visuals.tsx` (~750 lines) with all diagram components — `MethodMap` (animated SVG journey spine, forks at stage 04 into 4 colored paradigm lanes with traveling pulse, clickable lanes switch paradigm, loop-back dashed arc), `SignalFunnel` (noise chips struck through → funnel → framed outcome + kill-switch toggle), `PrdPaper` (paper-doc artifact w/ margin sticky notes, animated gauge cards for metrics, tripwire bars for kill criteria), `InterviewGrid` (32 hoverable session dots colored by cluster + rotated sticky-note theme cards), `PipelinePath` (finding speech-bubble → principle chip → lock constraint → check decision with drawn arrows), `ParadigmPosters` (4 illustrated mini-posters as the switcher: chat stream/dashboard+sidecar/toolbar/pulsing device puck), `RadarChart` (6-criteria fit radar, active paradigm filled, others ghosted — replaced the dot-matrix table), `FlowSpine` (SVG node spine w/ diamond gates + traveling pulse above wireflow cards), `DemoChrome` (browser/hardware frame around stage-06 demos), `LaunchFunnel` (5 launch tiers w/ kill-threshold red lines), `Sparkline` (metric tiles), `DocsPanel` (method text → 1 bold sentence + "full method" expander), `GateChecklist` (kill criteria as 3-col stamped animated checkboxes). page.tsx: old text artifacts (PrdArtifact/PsychologyArtifact/matrix table/scoreDot) deleted, StageShell now title+chips inline → DocsPanel → visual → GateChecklist. Verified in browser: method map/radar/posters/32 dots/24 gate checks all render — build clean (33 routes)
- **Scroll-to-footer fix (all pages)**: root cause was Lenis caching a stale scroll limit — content grows after mount (entrance animations/fonts/route changes) and wheel scroll capped short of the footer. Fixed in `SmoothScroll.tsx`: ResizeObserver on `document.body` calls `lenis.resize()`, plus a pathname-change re-measure (400ms after paint); also removed `html { scroll-behavior: smooth }` from globals.css (fights Lenis's per-frame scrollTop writes — Lenis docs require `scroll-behavior: auto`), added `anchors: true` for #hash links, and Lenis now disabled entirely under `prefers-reduced-motion`. Verified via Playwright on /, /about, /process, /work/nocode-platform, /blog incl. SPA navigation — all reach exact bottom. NOTE: this project's dev server runs on **port 3001** (another project "SPMW" occupies 3000)
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
- **"Best portfolio" upgrade (5 phases)**: fixed muted contrast (#666→#8C8C8C, 5.2:1 AA), added motion tokens + `prefers-reduced-motion` CSS + global `MotionConfig reducedMotion="user"` via new `MotionProvider`; skip link + `#main-content` landmark + Person JSON-LD in layout; hero thesis line ("I run design like an engineering discipline"), static ambient blobs (motion hierarchy); metrics methodology footnote; CTA banner + contact page upgraded with availability badge/24h response (peak-end); flagship NoCode case study gained `decisions` (3 Decision Records: context→options→choice→result→principle) + `retro` (4 items) + NDA-labeled stylized artifact figure; new `/craft` page with 5 interaction studies (scramble/magnetic/disclosure/optimistic/fluid text, each with psychology principle + code); "Craft" in Navbar; new featured blog post `psychology-of-design-tokens`; BlogPosting JSON-LD on blog slug pages; sitemap +craft +design-system — 33 routes build clean
- **DS Lab upgrade**: new `src/lib/design-system/color-utils.ts` (WCAG contrast math: relativeLuminance, contrastRatio, wcagRating, applyStudioShift HSL mirror of canvas filter); `LiveContrastStrip` in StudioPanel (5 fg/bg pairs, live ratios + pass/fail while dragging sliders); AccessibilitySection's fake "98% compliance" card replaced with live contrast matrix (swatch previews, ratios, AAA/AA/AA-Large/Fail badges, takes `studioTokens` prop now); first-visit dismissible intro banner (localStorage `ds-lab-intro-seen`); aria-label/aria-pressed on all icon-only chrome buttons (domain, palette, device, split, export, tool rail, mobile panel) + aria-label on range sliders — build clean
- **NEW /process page** ("From Idea to Shipped"): 8-stage method page with running example "Companion" (fictional gen-AI workspace assistant for millions of daily users). Data layer in `src/lib/process/` (types.ts, principles.ts — 16 psychology principles with clickable chip popovers, companion.ts — PRD/personas/JTBD/research/psychology-map, paradigms.ts — 4 full paradigm variants + decision matrix + verdict, stages.ts — 8 StageMeta with gates). Stages 00–03 paradigm-agnostic (Signal, PRD w/ kill criteria, Research w/ interactive personas+affinity clusters, Psychology Mapping table finding→principle→constraint→decision). Stage 04 "Paradigm Gate": 4-way switcher (Agentic/Hybrid/Traditional/Zero-UI), 6-criteria decision matrix with fit dots, verdict card ("Hybrid, agentic-first defaults"). Stages 05–07 re-render per paradigm: clickable wireflows w/ failure branches, 4 interactive mini demos (agentic plan-preview streaming, hybrid diff-preview dashboard, traditional saved views, zero-UI device puck with LED grammar), Goodhart-resistant metrics per paradigm + loop CTA to work/DS Lab/craft. Paradigm syncs to ?paradigm= URL param; scroll-synced left stage rail (IntersectionObserver); sticky paradigm switcher from stage 04 down. Navbar: "Craft" → "Process" (craft still linked from stage 06 + sitemap). Every stage has GateCard (kill criteria) + PrincipleChip popovers — 34 routes build clean
- **Method Map redesign** (Card Flip Journey): Replaced SVG spine diagram with 3D interactive card flip design. 8 stage cards (00-07) + 4 paradigm fork cards, each with custom SVG icons (Bell→Signal, Document→PRD, Search→Research, Brain→Psychology, Diamond→Paradigm Gate, Waves→Flows, Palette→UI, Rocket→Ship). Icons appear large (48px) on card front, small (24px) next to title on back. Click/tap to flip, spring animations (0.6s duration, stiffness: 100), responsive grid (4-col → 2-col mobile). Replaced emojis with professional SVG line icons for portfolio-worthy aesthetic.
- **PM profile removal (full scrub)**: Site-wide identity changed from "Senior Lead UX Designer & AI Product Manager" to **"Senior UI/UX Designer & AI Product Designer"**. layout.tsx (title/description/keywords/OG/Twitter/JSON-LD jobTitle+knowsAbout+services+FAQ), about page (hero "UI/UX Designer. / AI Product Designer.", "Product / PM" skills category → "UX Strategy & Ops" with designer skills, Moving Walls role + description reframed), resume page + layout + resume-enhanced.md (headline, summary "design and engineering" framing, "Product Strategy & Execution" skills → "UX Strategy & Research"), work page + project-data.ts (roles "& Product (PRD Author)" → "Senior UI/UX Designer (Design Lead)", "AI PM" → "AI Product Designer", "Product Strategy (NDA)" → "Design Strategy (NDA)", PRD hero descriptions reframed to design language), blog.ts (PRD workflow mentions → "design brief"), process pages (visible "PRD" labels → "Design Brief" in stages.ts/principles.ts/layout.tsx/page.tsx/visuals.tsx BRIEF-001/FrameworkAlignment — internal `prd` ids unchanged). Kept: testimonial author "Product Manager" (Footer), research-subject personas (EmpathyMap), past job titles "Lead UI UX Designer" etc., outcome metrics like "go-to-market 3x faster". Build clean (34 routes).

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
