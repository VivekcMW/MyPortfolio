# Light Theme + Accessibility Redesign

Status: Approved
Date: 2026-08-06

## Context

The portfolio currently defaults to a dark theme with a 5-way theme switcher (`dark`, `light`, `highContrast`, `warm`, `cool`) added in the previous session. The switcher only swaps 7 CSS variables (`background`, `foreground`, `surface`, `surfaceHover`, `border`, `muted`, `accentBg`) via `src/lib/theme-context.tsx` — most components still hardcode dark-theme-specific styling (glows, gradients, `#000`/`#fff` literals) rather than reading the variables, so the `light` option is visually broken/unfinished in practice.

A recent browser-based audit (Chrome DevTools MCP across all major routes) additionally found several bugs unrelated to color that overlap with this redesign's file touch-list: a fully broken mobile layout on `/design-system`, a broken SVG icon on `/about`, failing contrast ratios, a skipped heading level on `/`, two case studies not linked/sitemapped, and generic per-page metadata on case studies.

This is phase 1 of a larger portfolio overhaul (real Figma-sourced case studies, and new color-psychology/process-methodology content are phases 2–3, scoped separately once Figma links are available).

## Goals

1. Make light the default theme, fully designed and WCAG 2.2 AA compliant, replacing the current unfinished light option.
2. Keep dark mode as a secondary, equally-accessible option; drop `highContrast`/`warm`/`cool` to reduce the themes that must be kept accessible as content grows.
3. Introduce a new indigo brand accent (`#4F46E5` light / `#818CF8` dark), replacing the current sky-blue accent that fails contrast in its current button usage.
4. Fold in the audit's non-color bugs while their files are already being touched, rather than as a separate pass.
5. Do not change page layouts, section structure, or content — this is a color/token/bugfix pass only. Layout rework is explicitly out of scope and deferred to a future phase if wanted.

## Theme system architecture

- Reduce `ThemeType` in `src/lib/theme-context.tsx` from 5 values to 2: `"light" | "dark"`.
- Remove `highContrast`, `warm`, `cool` from the type, the `applyTheme` color map, and `ThemeToggle.tsx`'s option list. `ThemeToggle` becomes a two-state sun/moon toggle instead of a dropdown menu.
- Change the default-resolution logic: on first visit (no saved `localStorage` preference), default to `light` regardless of OS `prefers-color-scheme`. If the user has a saved preference (`light` or `dark`), always honor it.
- Add two new tokens to the theme color map, applied via the same `root.style.setProperty` mechanism as the existing ones: `accent` and `accentForeground` (text-on-filled-accent-surface). Also add `overlay` for ambient glow/gradient effects, so components that want a background glow read this token (near-zero opacity in light, current dark-mode opacity preserved in dark) instead of being deleted outright.
- No component should branch on `theme === "dark"` after this change — all color decisions flow through CSS variables so light/dark stay in sync automatically as tokens evolve.

## Color tokens

**Light (default):**

| Token | Value | Contrast vs. its typical pairing |
|---|---|---|
| `background` | `#FAFAFA` | — |
| `surface` | `#FFFFFF` | — |
| `foreground` | `#1A1A1A` | vs `background`: passes AA |
| `muted` | `#5C5C5C` (darkened from current `#737373`, which fails AA at small text sizes) | vs `background`: ≥4.5:1 |
| `border` | `#E5E5E5` | — (non-text, no contrast requirement) |
| `accent` | `#4F46E5` | vs `#FFFFFF`: 6.3:1 |
| `accentForeground` | `#FFFFFF` | text on filled `accent` buttons: 6.3:1 |

**Dark (secondary, unchanged except accent):**

| Token | Value | Contrast vs. its typical pairing |
|---|---|---|
| `background` | `#080808` | unchanged |
| `surface` | `#111111` | unchanged |
| `foreground` | `#F0EEE9` | unchanged, already passes AA |
| `muted` | `#8C8C8C` | unchanged, already passes AA |
| `border` | `#222222` | unchanged |
| `accent` | `#818CF8` (lighter indigo tint, replaces sky blue) | vs `#080808`: passes AA for text/links |
| `accentForeground` | `#1A1A1A` (dark text reads better on the lighter tint than white) | text on filled `accent` buttons: passes AA |

Every text/background pairing above must be verified at implementation time with the existing `src/lib/design-system/color-utils.ts` contrast helpers (already built for the DS Lab's live contrast strip) — reuse that math rather than re-deriving it.

## Visual character

Light theme direction: **minimal editorial**. Whitespace-driven, thin hairline borders (`border` token), no glow/gradient/blur effects beyond what the new `overlay` token allows at near-zero opacity. The accent color and real work content carry visual interest — not ambient chrome effects. This is a deliberate departure from the dark theme's current heavier use of glows/gradients; those effects stay in dark mode via the `overlay` token but are dialed down to ~0 in light.

## Accessibility target

WCAG 2.2 AA across both themes:
- ≥4.5:1 contrast for normal text, ≥3:1 for large text (18pt+/bold 14pt+), non-text contrast ≥3:1 for UI components.
- Visible focus states on all interactive elements (buttons, links, form fields, custom controls like sliders).
- Correct heading hierarchy (no skipped levels) on every page.
- Tap targets ≥24×24px for interactive elements (fixes the homepage carousel dots).
- Proper `aria-label`/`autocomplete`/`id` on icon-only buttons and form fields flagged by the audit.

## Page-by-page scope

**Shared components — fixed once, cascades to every page:**
- `src/components/Navbar.tsx` — fix "Let's Talk" CTA contrast (currently white text on `#38bdf8` at 2.14:1); migrate to `accent`/`accentForeground` tokens.
- `src/components/ProjectCard.tsx` — add `relative` positioning to the `motion.div` used as a `useScroll` target (fixes framer-motion console warning); migrate hardcoded colors to tokens.
- `src/components/ReadingProgress.tsx`, `src/components/StatusBar.tsx`, `src/components/TiltCard.tsx` — replace hardcoded `#000`/`#fff`/gradient literals with tokens.

**Pages requiring real rework** (currently hardcode dark-only colors/gradients, per grep of `bg-black|from-black|to-black|#000|#fff|text-white|radial-gradient|mix-blend|backdrop-blur` across `src/app` and `src/components`):
`src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/blog/page.tsx`, `src/app/contact/page.tsx`, `src/app/craft/page.tsx`, `src/app/process/page.tsx` + `src/app/process/visuals.tsx`, `src/app/design-system/page.tsx` + `src/app/design-system/ooh/page.tsx`, `src/app/research/forma/page.tsx`, `src/app/resume/page.tsx`, `src/app/not-found.tsx`.

**Already clean, no rework expected:** `src/app/work/page.tsx` and all `src/app/work/[slug]/page.tsx` case studies — these already read theme tokens correctly per the grep above. Still get the metadata fix below.

**DS Lab (`/design-system`) special case:** its internal 6-domain × 6-palette sandbox is a deliberate demo of arbitrary design systems and keeps its own default palette/domain state untouched. Only the surrounding site chrome (toolbar, nav, non-canvas UI) picks up the new site-wide tokens, plus the mobile bug fix below.

## Bugs folded in (fixed inline while touching the files above)

- `src/app/about/page.tsx` — restore the "Design" stage icon's SVG path (currently truncated with a literal `…` ellipsis character, causing Chrome to drop the path).
- `src/app/design-system/page.tsx` — fix the mobile (`<768px`) icon-scroll bar that has no width constraint, pushing its flex sibling (and the entire studio canvas) to `width: 0`. Constrain it (e.g. `w-full` or `shrink-0` with an explicit max-width) so the canvas stays visible.
- `src/app/page.tsx` — fix heading hierarchy: currently `h1` → `h3` (×2) → first `h2` much later in the page. Reorder so heading levels never skip.
- `src/app/work/page.tsx` — add links to the two orphaned case studies: `design-systems-scale` and `constructiviq-construction-cloud`.
- `src/app/sitemap.ts` — add `design-systems-scale`, `constructiviq-construction-cloud` to `caseStudySlugs`; add `/research/forma` and `/resume`.
- `src/app/work/[slug]/page.tsx` — add `generateMetadata` so each case study gets its own `<title>`/OG image instead of inheriting the static "Work | Vivekanand Choudhari" from the layout.
- `src/app/resume/page.tsx` (or its metadata source) — fix the duplicated name in the `%s | Vivekanand Choudhari` title template producing "Resume — Vivekanand Choudhari | Vivekanand Choudhari".
- Homepage carousel pagination dots (`src/app/page.tsx`) — add `aria-label`, increase hit area to ≥24×24px.
- DS Lab slider controls and the contact form — add missing `id`/`name`/`autocomplete` attributes.

## Out of scope (deferred to later phases)

- Real application case studies sourced from Figma (pharma, local club, etc.) — phase 2, needs the user's Figma links first.
- New content about color psychology philosophy, design-system methodology, and scalable design-system approach — phase 3.
- Any layout/structural redesign beyond color tokens and the bug fixes listed above.
- Redesigning the DS Lab's internal palette/domain sandbox content.

## Testing / verification plan

- Run the existing `src/lib/design-system/color-utils.ts` contrast math against every token pairing in both themes before considering the color system done.
- Re-run the Chrome DevTools MCP audit (console errors, Lighthouse accessibility score, screenshots at 1440px/390px on `/`, `/about`, `/work`, `/process`, `/design-system`) after implementation to confirm the flagged bugs are resolved and no new contrast/console issues were introduced.
- Manually verify the theme toggle persists across a reload and across client-side navigation (no flash of wrong theme).
- `npm run build` must succeed with no new TypeScript or lint errors after removing the 3 dropped theme variants.
