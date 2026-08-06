# Light Theme + Accessibility Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make light the default, WCAG 2.2 AA theme (indigo accent), keep dark as a secondary AA-compliant option, drop the highContrast/warm/cool variants, and fix six audit bugs found along the way — without changing any page's layout or content.

**Architecture:** All color decisions flow through CSS custom properties. `src/lib/theme-context.tsx` sets 9 `--color-*` variables on `document.documentElement` per theme (`light` | `dark`); `src/app/globals.css`'s `@theme inline` block registers matching Tailwind utilities (`bg-accent`, `text-accent-foreground`, etc.) so components never branch on theme name — they just use the utility classes, and the variables underneath swap.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme inline`), Framer Motion, TypeScript. No test framework is installed — verification is `npm run build` + `npm run lint` + a standalone contrast-math script + manual browser checks (matches this project's existing verification style).

## Global Constraints

- WCAG 2.2 AA: ≥4.5:1 contrast for normal text, ≥3:1 for large text and non-text UI components, ≥24×24px tap targets, correct heading hierarchy, visible focus states.
- No page layout, section structure, or content changes — color tokens and the 6 listed bugs only.
- Light theme is default; dark is secondary. `highContrast`, `warm`, `cool` are removed entirely.
- Accent: `#4F46E5` on light (`accent-foreground: #FFFFFF`), `#818CF8` on dark (`accent-foreground: #1A1A1A`).
- The DS Lab's (`/design-system`) internal 6-domain × 6-palette sandbox keeps its own default palette/domain state untouched — only its surrounding chrome (toolbar, nav rail, mobile bar) picks up site-wide tokens.
- `npm run build` and `npm run lint` must pass with zero new errors after every task.

---

### Task 1: Simplify the theme system to light/dark and wire the new tokens

**Files:**
- Modify: `src/lib/theme-context.tsx`
- Modify: `src/components/ThemeToggle.tsx`
- Modify: `src/app/globals.css:1-41`

**Interfaces:**
- Produces: `ThemeType = "light" | "dark"`, `useTheme(): { theme: ThemeType; setTheme: (t: ThemeType) => void }` (signature unchanged, values change). New CSS variables every later task relies on: `--color-accent`, `--color-accent-foreground`, `--color-overlay`.

- [ ] **Step 1: Rewrite `src/lib/theme-context.tsx`**

Replace the whole file with:

```tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeType | null;
    const initial: ThemeType = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "light";
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function applyTheme(theme: ThemeType) {
  const root = document.documentElement;

  const themeColors: Record<ThemeType, Record<string, string>> = {
    light: {
      background: "#FAFAFA",
      foreground: "#1A1A1A",
      surface: "#FFFFFF",
      surfaceHover: "#F5F5F5",
      border: "#E5E5E5",
      muted: "#5C5C5C",
      accent: "#4F46E5",
      accentForeground: "#FFFFFF",
      overlay: "0.02",
    },
    dark: {
      background: "#080808",
      foreground: "#F0EEE9",
      surface: "#111111",
      surfaceHover: "#191919",
      border: "#222222",
      muted: "#8C8C8C",
      accent: "#818CF8",
      accentForeground: "#1A1A1A",
      overlay: "0.15",
    },
  };

  const colors = themeColors[theme];

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  root.style.colorScheme = theme;
}
```

Note: `overlay` is stored as a bare opacity number (e.g. `"0.15"`), not a hex color — consumers use it as `opacity: var(--color-overlay)` on glow/gradient layers, not as a `background` value.

- [ ] **Step 2: Rewrite `src/components/ThemeToggle.tsx`** as a two-state toggle

```tsx
"use client";

import { useTheme } from "@/lib/theme-context";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-lg hover:bg-surface transition-colors text-foreground"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
```

- [ ] **Step 3: Update `src/app/globals.css`'s `@theme inline` block** — replace lines 3–29 with:

```css
@theme inline {
  --color-background: #FAFAFA;
  --color-foreground: #1A1A1A;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F5F5F5;
  --color-border: #E5E5E5;
  --color-muted: #5C5C5C;

  --color-accent: #4F46E5;
  --color-accent-foreground: #FFFFFF;
  --color-overlay: 0.02;

  /* ── Prose ── */
  --color-prose-heading: #1A1A1A;
  --color-prose-body: #4B4B4B;
  --color-prose-code-bg: #F0F0F0;

  /* ── Fonts ── */
  --font-sans: var(--font-inter);
  --font-heading: var(--font-dm-sans);
  --font-mono: var(--font-jetbrains-mono);
}
```

This is the fallback used only before `ThemeProvider`'s effect runs (or with JS disabled) — it must match the `light` values in Step 1 so there's no flash-of-wrong-theme. Also delete the now-unused `--color-accent-designer`, `--color-accent-scaler`, `--color-accent-coral` variables and their consumers `.text-designer`, `.text-builder`, `.text-scaler` (grep confirms these three-pillar-accent classes/vars) — grep for each class name across `src/` first and inline the specific hex value at any remaining call site, since removing the variable without checking usage would break those spots silently.

- [ ] **Step 4: Update `:root`'s initial `color-scheme`** (`src/app/globals.css:40`) from `dark` to `light`.

- [ ] **Step 5: Verify**

```bash
grep -rn "highContrast\|warm\|cool" src/lib/theme-context.tsx src/components/ThemeToggle.tsx
```
Expected: no output (all three removed).

```bash
npm run build
```
Expected: succeeds with no new TypeScript errors. (Errors here likely mean something still imports `ThemeType` values `"highContrast" | "warm" | "cool"` — find and fix those call sites before continuing.)

- [ ] **Step 6: Commit**

```bash
git add src/lib/theme-context.tsx src/components/ThemeToggle.tsx src/app/globals.css
git commit -m "Simplify theme system to light (default) + dark, add accent/overlay tokens"
```

---

### Task 2: Add a standalone contrast-audit script

**Files:**
- Create: `scripts/check-contrast.mjs`

**Interfaces:**
- Consumes: nothing (self-contained, duplicates the pure-math functions from `src/lib/design-system/color-utils.ts` since that file isn't set up for standalone Node execution outside the Next.js/TS pipeline).
- Produces: a CLI script other tasks' verification steps run via `node scripts/check-contrast.mjs`, exits non-zero if any pairing fails AA.

- [ ] **Step 1: Write the script**

```js
// scripts/check-contrast.mjs
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = Number.parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const MIN_AA_TEXT = 4.5;

const pairs = [
  // [label, foreground, background, minRatio]
  ["light: foreground on background", "#1A1A1A", "#FAFAFA", MIN_AA_TEXT],
  ["light: muted on background", "#5C5C5C", "#FAFAFA", MIN_AA_TEXT],
  ["light: accent on surface", "#4F46E5", "#FFFFFF", MIN_AA_TEXT],
  ["light: accent-foreground on accent", "#FFFFFF", "#4F46E5", MIN_AA_TEXT],
  ["dark: foreground on background", "#F0EEE9", "#080808", MIN_AA_TEXT],
  ["dark: muted on background", "#8C8C8C", "#080808", MIN_AA_TEXT],
  ["dark: accent on background", "#818CF8", "#080808", MIN_AA_TEXT],
  ["dark: accent-foreground on accent", "#1A1A1A", "#818CF8", MIN_AA_TEXT],
];

let failed = false;
for (const [label, fg, bg, min] of pairs) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= min;
  if (!pass) failed = true;
  console.log(`${pass ? "PASS" : "FAIL"}  ${label}: ${ratio.toFixed(2)}:1 (needs ${min}:1)`);
}

if (failed) {
  console.error("\nContrast check failed.");
  process.exit(1);
}
console.log("\nAll pairings pass WCAG AA.");
```

- [ ] **Step 2: Run it**

```bash
node scripts/check-contrast.mjs
```
Expected: every line prints `PASS`, script exits 0. This confirms the exact values from Task 1 before they're wired into components — if anything fails, fix the hex values in Task 1 first and re-run this script before proceeding.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-contrast.mjs
git commit -m "Add standalone WCAG contrast-audit script for theme tokens"
```

---

### Task 3: Fix shared components (Navbar, ProjectCard, ReadingProgress, StatusBar, TiltCard)

**Files:**
- Modify: `src/components/Navbar.tsx:182,337`
- Modify: `src/components/ProjectCard.tsx:158-159`
- Modify: `src/components/ReadingProgress.tsx`
- Modify: `src/components/StatusBar.tsx`
- Modify: `src/components/TiltCard.tsx`

**Interfaces:**
- Consumes: `--color-accent`, `--color-accent-foreground` from Task 1.

- [ ] **Step 1: Fix Navbar CTA contrast** — at `src/components/Navbar.tsx:182` and `:337`, change `text-white` to `text-accent-foreground` on both CTA buttons (they currently read `className="magnetic-btn px-5 py-2.5 bg-accent text-white ..."` and `className="block px-4 py-3 bg-accent text-white ..."`). Result: `bg-accent text-accent-foreground` on both, so text color always matches whichever accent is active per-theme.

- [ ] **Step 2: Fix ProjectCard's missing `position: relative`** — at `src/components/ProjectCard.tsx:158-159`, the `motion.div` used as the `useScroll({ target: cardRef })` container has no position class. Add `relative` to its `className`:

```tsx
<motion.div
  ref={cardRef}
  className="relative ..." // keep all existing classes, just add "relative" to the list
```//
This silences the framer-motion "non-static position" console warning and fixes the scroll-offset calculation.

- [ ] **Step 3: Recolor `ReadingProgress.tsx`, `StatusBar.tsx`, `TiltCard.tsx`** — run:

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" src/components/ReadingProgress.tsx src/components/StatusBar.tsx src/components/TiltCard.tsx
```

For each hit, replace with the theme-aware equivalent using this mapping (there is no other mapping — apply exactly this table):
| Hardcoded | Replace with |
|---|---|
| `#000000` / `#000` used as a shadow/overlay color | `var(--color-foreground)` at reduced opacity via `color-mix(in srgb, var(--color-foreground) N%, transparent)`, or delete if it's a dark-mode-only glow (use `--color-overlay` as the opacity multiplier instead) |
| `bg-black` / `from-black` / `to-black` | `bg-background` / `from-background` / `to-background` |
| `text-white` | `text-foreground` (if it's body text) or `text-accent-foreground` (if it's text sitting on an accent-colored surface) |

Re-run the grep after editing each file — it must return no output.

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: succeeds, and the framer-motion console warning is gone (confirm by running `npm run dev` and checking the browser console on `/` or `/work`, which both render `ProjectCard`).

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/ProjectCard.tsx src/components/ReadingProgress.tsx src/components/StatusBar.tsx src/components/TiltCard.tsx
git commit -m "Fix shared component contrast, position bug, and hardcoded dark-only colors"
```

---

### Task 4: Fix /about — broken icon + recolor

**Files:**
- Modify: `src/app/about/page.tsx:1-10` (imports), `:457-461` (icon), plus hardcoded-color sweep across the file

**Interfaces:**
- Consumes: `lucide-react`'s `Palette` icon (already a project dependency).

- [ ] **Step 1: Fix the broken SVG path** — at `src/app/about/page.tsx:457-461`, the "Design" stage's inline SVG has a corrupted path (`M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125…` — truncated with a literal `…`). This is Lucide's `Palette` icon. Replace the whole inline `<svg>` block:

```tsx
icon: (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C20.577 6.223 16.867 2 12 2z"/>
  </svg>
),
```

(This is the same inline-SVG pattern the other stage icons in this file already use — keep it consistent rather than switching to a `lucide-react` component import for just this one icon.)

- [ ] **Step 2: Recolor the rest of the page** — run:

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b\|radial-gradient\|mix-blend\|backdrop-blur" src/app/about/page.tsx
```

Apply the same mapping table from Task 3 Step 3. For any `radial-gradient`/ambient glow effects specifically, wrap their opacity in `var(--color-overlay)` (e.g. `opacity: var(--color-overlay)` on the glow layer's inline style) rather than deleting them — this makes them nearly invisible in light and preserves the current dark-mode look.

- [ ] **Step 3: Verify**

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" src/app/about/page.tsx
```
Expected: no output.

```bash
npm run build
```
Expected: succeeds.

Manually load `/about` in the browser (light theme, default) and confirm the "Design" stage icon now renders a complete palette icon (outer blob + 4 dots), not 4 floating dots.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "Fix broken palette icon and recolor /about for light theme"
```

---

### Task 5: Fix /design-system mobile canvas bug + recolor chrome

**Files:**
- Modify: `src/app/design-system/page.tsx:440` (bug), plus chrome-only hardcoded-color sweep

**Interfaces:**
- Consumes: `--color-*` tokens from Task 1. Does NOT touch the sandbox's own `theme.colors.*` palette system (`src/lib/design-system/domains.ts`, `palettes.ts`) — that's a deliberate, separate theming demo and stays as-is per the spec.

- [ ] **Step 1: Fix the mobile canvas-collapse bug** — at `src/app/design-system/page.tsx:440`, the mobile icon-scroll bar has no width constraint, so inside its parent flex row (`src/app/design-system/page.tsx:352`, `className="flex flex-1 relative z-10 overflow-hidden"`) it grows to its natural content width (~766px) and pushes the sibling canvas div (`:460-461`, `className="flex-1 flex min-w-0"`) to zero width. Change line 440's className from:

```tsx
className="md:hidden flex items-center gap-1 px-3 py-2 overflow-x-auto border-b shrink-0"
```//
to:

```tsx
className="md:hidden w-full min-w-0 flex items-center gap-1 px-3 py-2 overflow-x-auto border-b shrink-0"
```//
Adding `w-full min-w-0` caps it at the parent's available width, so the pills scroll horizontally inside their own bounds instead of expanding the row.

- [ ] **Step 2: Recolor the surrounding chrome only** — the toolbar (~line 208 onward), the desktop nav rail (`:401-436`), and this mobile bar are all styled via `theme.colors.*` (the DS Lab's own theme object, which already tracks the site's palette system) — leave those untouched. Instead, grep specifically for any hardcoded colors OUTSIDE the `theme.colors`/`splitTheme.colors`/`t.colors` style objects:

```bash
grep -n "#000\|#fff\|bg-black\|text-white\b" src/app/design-system/page.tsx src/app/design-system/ooh/page.tsx
```

For any hit that is NOT inside a `style={{ ..., color: theme.colors.X, ... }}` block (i.e. genuinely hardcoded, not part of the sandbox's palette system), apply the Task 3 mapping table.

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: succeeds.

Manually resize the browser to 390px width on `/design-system` and confirm the canvas (colors/typography/components tabs) is visible and the mobile icon bar scrolls horizontally without pushing the canvas off-screen.

- [ ] **Step 4: Commit**

```bash
git add src/app/design-system/page.tsx src/app/design-system/ooh/page.tsx
git commit -m "Fix DS Lab mobile canvas-collapse bug, recolor chrome for light theme"
```

---

### Task 6: Fix homepage — heading hierarchy, carousel dot a11y, recolor

**Files:**
- Modify: `src/app/page.tsx:389` (h1, unchanged, reference only), `:426-441` (carousel dots), `:522-524` (heading hierarchy fix), plus hardcoded-color sweep

- [ ] **Step 1: Fix the heading-hierarchy gap** — the "IMPACT SPOTLIGHTS" section at `src/app/page.tsx:521-524` has no heading at all before its three `<h3>` metric-card titles (`:564`), so a screen reader jumps from the hero `<h1>` (`:389`) straight to `<h3>` with no `<h2>` landmark in between. Add a visually-hidden `<h2>` right after the section's inner wrapper div opens (`:523`):

```tsx
<section className="relative border-y border-border">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
    <h2 className="sr-only">Impact spotlights</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
```//
This fixes the hierarchy without any visible layout change (`sr-only` is a Tailwind utility that hides content visually while keeping it in the accessibility tree — confirm it's available; if not already used elsewhere in the project, it ships with Tailwind core so no config change is needed).

- [ ] **Step 2: Add accessible names + bigger tap targets to the role-rotator dots** — at `src/app/page.tsx:426-441`, each `<button>` wraps only an 8×6px `motion.div` with no `aria-label`. Update:

```tsx
{roles.map((role, i) => (
  <button
    key={role.word}
    onClick={() => { setRoleIndex(i); scrambleTo(roles[i].word); }}
    className="group flex items-center justify-center gap-1.5 min-w-6 min-h-6"
    aria-label={`Show role: ${role.word}`}
    aria-current={roleIndex === i ? "true" : undefined}
  >
    <motion.div
      animate={{
        width: roleIndex === i ? 24 : 8,
        backgroundColor: roleIndex === i ? "var(--color-accent)" : "var(--color-border)",
      }}
      className="h-1.5 rounded-full"
      transition={{ duration: 0.3 }}
    />
  </button>
))}
```//
(`min-w-6 min-h-6` = 24×24px, the WCAG AA minimum tap target; the visible dot inside stays its current small size.)

- [ ] **Step 3: Recolor the rest of the page** — run:

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b\|radial-gradient\|mix-blend\|backdrop-blur" src/app/page.tsx
```

Apply the Task 3 mapping table, using `var(--color-overlay)` for any ambient glow opacity as described in Task 4 Step 2.

- [ ] **Step 4: Verify**

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" src/app/page.tsx
```
Expected: no output.

```bash
npm run build
```
Expected: succeeds. Load `/` in the browser, open devtools accessibility tree, confirm heading order is h1 → h2 ("Impact spotlights") → h3s with no skipped level, and confirm the role-rotator dots now have accessible names (inspect via the Elements panel or a screen reader).

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "Fix homepage heading hierarchy, carousel dot a11y, recolor for light theme"
```

---

### Task 7: Recolor /blog, /craft, /process (+visuals.tsx), /research/forma, /not-found

**Files:**
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/craft/page.tsx`
- Modify: `src/app/process/page.tsx`
- Modify: `src/app/process/visuals.tsx`
- Modify: `src/app/research/forma/page.tsx`
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Recolor each file** — for each file in the list, run:

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b\|radial-gradient\|mix-blend\|backdrop-blur" <file>
```

Apply the Task 3 mapping table to every hit (`var(--color-overlay)` for glow opacities, `bg-background`/`text-foreground`/`text-accent-foreground` for solid fills, per that table). Do this one file at a time so each is independently verifiable.

- [ ] **Step 2: Verify each file after editing it**

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" <file>
```
Expected: no output, for every file in the list.

```bash
npm run build
```
Expected: succeeds after all six files are done.

Load `/blog`, `/craft`, `/process`, `/research/forma`, and a deliberately-broken URL like `/does-not-exist` (to trigger `not-found.tsx`) in the browser under the light theme — confirm no leftover black panels, white-on-white text, or invisible glows-turned-solid-blocks.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/page.tsx src/app/craft/page.tsx src/app/process/page.tsx src/app/process/visuals.tsx src/app/research/forma/page.tsx src/app/not-found.tsx
git commit -m "Recolor blog, craft, process, forma research, and 404 pages for light theme"
```

---

### Task 8: Recolor /contact and add form-field autocomplete

**Files:**
- Modify: `src/app/contact/page.tsx:268-363` (form fields), plus hardcoded-color sweep across the rest of the file

- [ ] **Step 1: Add `autoComplete` to the identity fields** — the form at `src/app/contact/page.tsx` already has correct `id`/`<label htmlFor>` pairs; it's missing autofill hints (WCAG 2.2 SC 1.3.5). Update three inputs:

At `:268` (name input), add `autoComplete="name"`:
```tsx
<input
  id="name"
  type="text"
  required
  autoComplete="name"
  ...
```//

At `:288` (email input), add `autoComplete="email"`:
```tsx
<input
  id="email"
  type="email"
  required
  autoComplete="email"
  ...
```//

At `:308` (mobile input), add `autoComplete="tel"`:
```tsx
<input
  id="mobile"
  type="tel"
  autoComplete="tel"
  ...
```//

Leave the `subject` `<select>` (`:327`) and `message` `<textarea>` (`:352`) as-is — there's no standard autocomplete token for either.

- [ ] **Step 2: Recolor the rest of the page** — run:

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" src/app/contact/page.tsx
```

Apply the Task 3 mapping table to any hits outside the form fields touched in Step 1.

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: succeeds. Load `/contact`, open browser devtools → Elements, confirm the three `autoComplete` attributes are present on their inputs.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "Add autocomplete hints to contact form, recolor for light theme"
```

---

### Task 9: Fix /resume title bug + recolor

**Files:**
- Modify: `src/app/resume/layout.tsx:4,8,24`
- Modify: `src/app/resume/page.tsx` (hardcoded-color sweep)

**Interfaces:**
- Consumes: whatever title-template mechanism is set in `src/app/layout.tsx`'s root metadata (read it before editing — the duplication bug is `"Resume — Vivekanand Choudhari" + " | Vivekanand Choudhari"` collapsing into one string, meaning the root layout applies a `%s | Vivekanand Choudhari` template on top of a child title that already contains the name).

- [ ] **Step 1: Read the root metadata template**

```bash
grep -n "template\|title" src/app/layout.tsx | head -20
```

Confirm it defines something like `title: { template: "%s | Vivekanand Choudhari", default: "..." }`. This means any child page's `title` string gets `" | Vivekanand Choudhari"` appended automatically.

- [ ] **Step 2: Fix the resume title** — at `src/app/resume/layout.tsx:4,8,24`, change each `title: "Resume — Vivekanand Choudhari"` to just `title: "Resume"`, letting the root template add the suffix once instead of the child pre-baking it in:

```tsx
title: "Resume",
```

Apply this at all three locations (lines 4, 8, 24 per the earlier grep — re-run `grep -n "title:" src/app/resume/layout.tsx` after editing to confirm exactly three clean occurrences of `"Resume"` with no `" — Vivekanand Choudhari"` suffix left).

- [ ] **Step 3: Recolor `src/app/resume/page.tsx`**

```bash
grep -n "#000\|#fff\|bg-black\|from-black\|to-black\|text-white\b" src/app/resume/page.tsx
```

Apply the Task 3 mapping table to any hits.

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: succeeds. Load `/resume`, check the browser tab title reads `Resume | Vivekanand Choudhari` (not duplicated).

- [ ] **Step 5: Commit**

```bash
git add src/app/resume/layout.tsx src/app/resume/page.tsx
git commit -m "Fix duplicated resume page title, recolor for light theme"
```

---

### Task 10: Link orphaned case studies + fix sitemap

**Files:**
- Modify: `src/app/work/page.tsx:14-194` (`caseStudies` array)
- Modify: `src/app/sitemap.ts:9-19` (`caseStudySlugs`), plus add `/research/forma` and `/resume`

**Interfaces:**
- Consumes: the two orphaned slugs' actual data keys in `src/app/work/[slug]/page.tsx`'s `projectData` object — confirm their exact slugs before editing:

```bash
grep -n '^\s*"[a-z-]*": {' src/app/work/[slug]/page.tsx | grep -i "design-systems-scale\|constructiviq"
```

- [ ] **Step 1: Add the two missing case studies to the work index** — in `src/app/work/page.tsx`, add two new entries to the `caseStudies` array (matching the existing object shape — `slug`, `title`, `category`, `description`, `tags`, `timeline`, `role`, `status`, `image`). Pull `title`/`category`/`timeline`/`role` straight from the matching `projectData` entries found in the grep above so the index card text matches the case-study page. Use a simple existing inline-SVG icon shape (e.g. reuse the grid-of-rects icon already used for `nocode-platform` or `construction-ai` at `src/app/work/page.tsx:151-158`) for the `image` field — don't invent new iconography.

- [ ] **Step 2: Add the same two slugs, plus `/research/forma` and `/resume`, to the sitemap** — in `src/app/sitemap.ts`, add `"design-systems-scale"` and `"constructiviq-construction-cloud"` to the `caseStudySlugs` array (`:9-19`), and add two new entries to `staticPages` (`:22-71`) matching the existing shape:

```tsx
{
  url: `${BASE_URL}/research/forma`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.7,
},
{
  url: `${BASE_URL}/resume`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.6,
},
```

- [ ] **Step 3: Verify**

```bash
npm run build
```
Expected: succeeds.

```bash
curl -s http://localhost:3000/work/design-systems-scale -o /dev/null -w "%{http_code}\n"
curl -s http://localhost:3000/work/constructiviq-construction-cloud -o /dev/null -w "%{http_code}\n"
```
(with `npm run dev` running) Expected: both `200`.

Load `/work` in the browser and confirm both new cards appear and link correctly. Load `/sitemap.xml` and confirm all four new URLs are present.

- [ ] **Step 4: Commit**

```bash
git add src/app/work/page.tsx src/app/sitemap.ts
git commit -m "Link orphaned case studies from /work index, add them + forma/resume to sitemap"
```

---

### Task 11: Give each case study its own page metadata

**Files:**
- Create: `src/lib/work/project-data.ts` (moves `projectData`, `nocodeStory`, `ehrStory`, and the `ProjectDetail`/`StoryChapter`/`RoleContext`/`DecisionRecord` types out of the client page)
- Create: `src/app/work/[slug]/CaseStudyClient.tsx` (the current page UI, now taking `slug` as a prop instead of reading `useParams` itself)
- Modify: `src/app/work/[slug]/page.tsx` (becomes a server component exporting `generateMetadata`)

**Interfaces:**
- Produces: `project-data.ts` exports `projectData: Record<string, ProjectDetail>` and the `ProjectDetail` type, importable from both a server file (`page.tsx`) and a client file (`CaseStudyClient.tsx`).
- `CaseStudyClient` signature: `export default function CaseStudyClient({ slug }: { slug: string })`.

This fixes the bug where every case study shares the literal title "Work | Vivekanand Choudhari" because `page.tsx` is a `"use client"` component and can't export `generateMetadata` (that export must run server-side).

- [ ] **Step 1: Extract data to a plain module** — create `src/lib/work/project-data.ts`. Cut the `StoryChapter`, `RoleContext`, `DecisionRecord`, `ProjectDetail` interfaces, the `nocodeStory`, `ehrStory` arrays, and the `projectData` object out of `src/app/work/[slug]/page.tsx` (everything from the current file's `interface StoryChapter` through the closing of `projectData`) and paste them into the new file, removing the `"use client"` directive (this file has none — it's pure data, no JSX). Export what's needed:

```ts
export interface StoryChapter { /* ...unchanged... */ }
export interface RoleContext { /* ...unchanged... */ }
export interface DecisionRecord { /* ...unchanged... */ }
export interface ProjectDetail { /* ...unchanged... */ }

const nocodeStory: StoryChapter[] = [ /* ...unchanged... */ ];
const ehrStory: StoryChapter[] = [ /* ...unchanged... */ ];

export const projectData: Record<string, ProjectDetail> = { /* ...unchanged... */ };
```

- [ ] **Step 2: Create the client component** — create `src/app/work/[slug]/CaseStudyClient.tsx`. Copy everything that's left in the old `page.tsx` (imports, the component body) into it, keeping `"use client"` at the top, but:
  - Import `projectData` and the types from `@/lib/work/project-data` instead of defining them inline.
  - Change the component signature from reading `useParams()` internally to accepting `slug` as a prop:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/Section";
import { projectData, type ProjectDetail } from "@/lib/work/project-data";
// ...keep every other existing import...

export default function CaseStudyClient({ slug }: { slug: string }) {
  const project = projectData[slug];
  // ...rest of the existing component body, unchanged, just replace
  // any `useParams()` call and its `params.slug` usage with the `slug` prop...
}
```

Remove the `import { useParams } from "next/navigation";` line and the `const params = useParams();` call — replace every reference to the old params-derived slug variable with the new `slug` prop directly.

- [ ] **Step 3: Rewrite `page.tsx` as a server component**

```tsx
import type { Metadata } from "next";
import { projectData } from "@/lib/work/project-data";
import CaseStudyClient from "./CaseStudyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectData[slug];
  if (!project) {
    return { title: "Case Study" };
  }
  return {
    title: project.title,
    description: project.heroDesc,
    openGraph: {
      title: project.title,
      description: project.heroDesc,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyClient slug={slug} />;
}
```

(Next.js 16's `params` is a `Promise` in both `generateMetadata` and page components — confirm this against `node_modules/next/dist/docs/` if the exact awaiting pattern differs from an older Next.js version's synchronous `params` object, per this project's AGENTS.md instruction to check the installed docs before writing routing code.)

- [ ] **Step 4: Verify**

```bash
npm run build
```
Expected: succeeds with no TypeScript errors (this is the step most likely to surface a prop/type mismatch between the extracted data file and the client component — fix any reported mismatch before continuing, don't suppress with `any`).

```bash
npm run dev
curl -s http://localhost:3000/work/nocode-platform -o /tmp/nocode.html && grep -o "<title>[^<]*</title>" /tmp/nocode.html
curl -s http://localhost:3000/work/mw-cinema -o /tmp/cinema.html && grep -o "<title>[^<]*</title>" /tmp/cinema.html
```
Expected: two different titles, each containing that case study's actual name (not the generic "Work | Vivekanand Choudhari" both used to share).

- [ ] **Step 5: Commit**

```bash
git add src/lib/work/project-data.ts src/app/work/[slug]/CaseStudyClient.tsx src/app/work/[slug]/page.tsx
git commit -m "Give each case study its own page metadata via generateMetadata"
```

---

### Task 12: Full-site verification pass

**Files:** none modified — verification only.

- [ ] **Step 1: Run the contrast script one more time**

```bash
node scripts/check-contrast.mjs
```
Expected: all PASS (confirms Task 1's values weren't altered by later tasks).

- [ ] **Step 2: Full build + lint**

```bash
npm run build && npm run lint
```
Expected: both succeed with zero errors.

- [ ] **Step 3: Manual browser sweep** — with `npm run dev` running, load each of these routes in the browser under the (now-default) light theme, then toggle to dark and reload: `/`, `/about`, `/work`, `/work/nocode-platform`, `/work/design-systems-scale`, `/craft`, `/process`, `/design-system` (desktop AND resized to 390px width), `/design-system/ooh`, `/research/forma`, `/blog`, `/contact`, `/resume`, `/does-not-exist` (404 page). For each: open the browser console and confirm no new errors/warnings, and visually confirm no black-on-black or white-on-white text, no leftover solid glow blocks.

- [ ] **Step 4: Confirm theme persistence** — toggle to dark, reload the page, confirm it stays dark. Navigate client-side between two pages (e.g. `/` → `/about` via the nav link, not a full reload), confirm no flash back to light mid-navigation.

- [ ] **Step 5: Final commit** (only if Step 3's sweep needed small fixes — otherwise this task produces no diff and can be skipped)

```bash
git status
```
If clean, this task is done with no commit needed. If any fixups were made during the sweep, commit them with a message describing what was found and fixed.

---

## Self-Review Notes

- **Spec coverage:** Theme architecture (Task 1), color tokens (Task 1 + verified by Task 2), visual character/minimal-editorial (implicit in the mapping table — no new glow/gradient effects added, existing ones dialed via `--color-overlay`), accessibility target (Tasks 2, 6, 8 cover contrast/heading/tap-target/autocomplete explicitly), page-by-page scope (Tasks 3–9 = shared components + every "needs rework" page from the spec; work/[slug] and work index explicitly marked "already clean" in the spec but still get Tasks 10–11 for the bug fixes), DS Lab special case (Task 5 explicitly preserves sandbox state), all 6 folded-in bugs (icon → Task 4, mobile canvas → Task 5, heading hierarchy → Task 6, orphaned case studies + sitemap → Task 10, per-case-study metadata → Task 11, resume title → Task 9), testing/verification plan (Task 12 mirrors the spec's four bullet points exactly).
- **Placeholder scan:** every step gives literal code or an exact command; the "mechanical recolor" tasks (3 Step 3, 4 Step 2, 6 Step 3, 7, 8 Step 2) are the closest thing to a repeated pattern, but each specifies the exact grep command, the exact replacement table, and an exact verification re-run — that's a concrete rule, not an unspecified "add appropriate styling."
- **Type consistency:** `ThemeType`, `useTheme()` return shape, `projectData`/`ProjectDetail` export names, and `CaseStudyClient({ slug })`'s prop name are each introduced once (Tasks 1, 11) and referenced identically everywhere else.
