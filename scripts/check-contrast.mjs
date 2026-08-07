// scripts/check-contrast.mjs
//
// Standalone WCAG 2.2 contrast audit for the site's theme tokens.
// Mirrors the pure math in src/lib/design-system/color-utils.ts, duplicated here
// because that module lives inside the Next.js/TS pipeline and can't be run by
// bare `node`. Keep the two in sync if either changes.
//
//   node scripts/check-contrast.mjs   → exits non-zero if any pairing fails.

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
const MIN_AA_LARGE = 3.0; // large text (18pt+/bold 14pt+) and non-text UI components

const LIGHT = {
  background: "#FAFAFA",
  surface: "#FFFFFF",
  foreground: "#1A1A1A",
  muted: "#5C5C5C",
  accent: "#4F46E5",
  accentForeground: "#FFFFFF",
  designer: "#A21CAF",
  scaler: "#B45309",
  proseBody: "#4B4B4B",
  success: "#047857",
  danger: "#B91C1C",
  warning: "#A16207",
};

const DARK = {
  background: "#080808",
  surface: "#111111",
  foreground: "#F0EEE9",
  muted: "#8C8C8C",
  accent: "#818CF8",
  accentForeground: "#1A1A1A",
  designer: "#E879F9",
  scaler: "#FB923C",
  proseBody: "#A3A3A3",
  success: "#4ADE80",
  danger: "#F87171",
  warning: "#FBBF24",
};

const pairs = [
  // [label, foreground, background, minRatio]
  ["light: foreground on background", LIGHT.foreground, LIGHT.background, MIN_AA_TEXT],
  ["light: foreground on surface", LIGHT.foreground, LIGHT.surface, MIN_AA_TEXT],
  ["light: muted on background", LIGHT.muted, LIGHT.background, MIN_AA_TEXT],
  ["light: muted on surface", LIGHT.muted, LIGHT.surface, MIN_AA_TEXT],
  ["light: prose-body on background", LIGHT.proseBody, LIGHT.background, MIN_AA_TEXT],
  ["light: accent on background", LIGHT.accent, LIGHT.background, MIN_AA_TEXT],
  ["light: accent on surface", LIGHT.accent, LIGHT.surface, MIN_AA_TEXT],
  ["light: accent-foreground on accent", LIGHT.accentForeground, LIGHT.accent, MIN_AA_TEXT],
  ["light: designer accent on background", LIGHT.designer, LIGHT.background, MIN_AA_TEXT],
  ["light: scaler accent on background", LIGHT.scaler, LIGHT.background, MIN_AA_TEXT],

  ["dark: foreground on background", DARK.foreground, DARK.background, MIN_AA_TEXT],
  ["dark: foreground on surface", DARK.foreground, DARK.surface, MIN_AA_TEXT],
  ["dark: muted on background", DARK.muted, DARK.background, MIN_AA_TEXT],
  ["dark: muted on surface", DARK.muted, DARK.surface, MIN_AA_TEXT],
  ["dark: prose-body on background", DARK.proseBody, DARK.background, MIN_AA_TEXT],
  ["dark: accent on background", DARK.accent, DARK.background, MIN_AA_TEXT],
  ["dark: accent on surface", DARK.accent, DARK.surface, MIN_AA_TEXT],
  ["dark: accent-foreground on accent", DARK.accentForeground, DARK.accent, MIN_AA_TEXT],
  ["dark: designer accent on background", DARK.designer, DARK.background, MIN_AA_TEXT],
  ["dark: scaler accent on background", DARK.scaler, DARK.background, MIN_AA_TEXT],

  ["light: success on surface", LIGHT.success, LIGHT.surface, MIN_AA_TEXT],
  ["light: danger on surface", LIGHT.danger, LIGHT.surface, MIN_AA_TEXT],
  ["light: warning on surface", LIGHT.warning, LIGHT.surface, MIN_AA_TEXT],
  ["dark: success on surface", DARK.success, DARK.surface, MIN_AA_TEXT],
  ["dark: danger on surface", DARK.danger, DARK.surface, MIN_AA_TEXT],
  ["dark: warning on surface", DARK.warning, DARK.surface, MIN_AA_TEXT],

  // Non-text / large-text UI components (3:1 floor)
  ["light: accent as UI component on background", LIGHT.accent, LIGHT.background, MIN_AA_LARGE],
  ["dark: accent as UI component on background", DARK.accent, DARK.background, MIN_AA_LARGE],
];

/**
 * Categorical hues (tool brands, diagram lanes) are authored at dark-theme
 * brightness and rendered through tintText() in src/lib/tint.ts, which mixes
 * 50% toward --color-foreground. Verify every hue in use still clears AA under
 * that transform in BOTH themes — this is what stops a newly-added brand color
 * from silently landing at 2:1 on the light theme.
 */
const TINT_RATIO = 0.5;
const HUES = [
  "#10B981", "#8B5CF6", "#6366F1", "#EC4899", "#F59E0B", "#06B6D4", "#F97316",
  "#94A3B8", "#F43F5E", "#84CC16", "#0EA5E9", "#2DD4BF", "#4285F4", "#FBBC05",
  "#5865F2", "#A259FF", "#10A37F", "#EA4B71", "#22D3EE", "#20B2AA", "#0066FF",
  "#FF4A00", "#D97706", "#7C3AED", "#6E40C9", "#F26207", "#FF6B00", "#6D00CC",
];

function mix(hexA, hexB, p) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const c = a.map((v, i) => Math.round(v * p + b[i] * (1 - p)));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}

for (const hue of HUES) {
  pairs.push([
    `light: tinted ${hue} on surface`,
    mix(hue, LIGHT.foreground, TINT_RATIO),
    LIGHT.surface,
    MIN_AA_TEXT,
  ]);
  pairs.push([
    `dark: tinted ${hue} on surface`,
    mix(hue, DARK.foreground, TINT_RATIO),
    DARK.surface,
    MIN_AA_TEXT,
  ]);
}

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
