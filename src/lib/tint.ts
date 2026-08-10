/**
 * Categorical hues (tool-brand colors, diagram lanes, stage accents) are authored
 * at dark-theme brightness — #10B981, #F59E0B, #22D3EE and friends. Used verbatim
 * as TEXT they sit around 1.5–2.5:1 on a light background, well under WCAG AA.
 *
 * Mixing 50% toward --color-foreground solves both themes with one expression:
 * on light, foreground is near-black so the hue darkens; on dark it's near-white
 * so the hue lightens. Hue identity survives either way. Measured across all 23
 * hues in use, the worst pairing is 4.79:1 on light and 7.85:1 on dark.
 *
 * Use for text only. Backgrounds and borders keep the raw hue — they're
 * decorative and carry no contrast requirement at these alpha levels.
 */
export function tintText(hue: string): string {
  return `color-mix(in srgb, ${hue} 50%, var(--color-foreground))`;
}
