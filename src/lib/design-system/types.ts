import { ReactNode } from "react";

export type DesignSystemSlug = "ooh" | "data-science" | "ai" | "design-engineering" | "fintech" | "consumer";
export type PaletteSlug = "dark" | "light" | "highContrast" | "warm" | "cool" | "sepia";

export interface DesignSystemColors {
  primary: string;
  primaryHex: string;
  secondary: string;
  secondaryHex: string;
  accent: string;
  accentHex: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textMuted: string;
  overlay: string;
}

export interface DesignSystem {
  name: string;
  description: string;
  icon: ReactNode;
  colors: DesignSystemColors;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  rationale: string;
}

export interface ColorPalette {
  name: string;
  description: string;
  colors: Pick<DesignSystemColors, "background" | "text" | "surface" | "surfaceHover" | "border" | "textMuted" | "overlay">;
}

export interface ResearchEntry {
  domain: DesignSystemSlug;
  rationale: string;
  decisions: string[];
  references: string[];
  tradeoffs: string[];
}

export type SpacingScale = "compact" | "default" | "relaxed";

export interface StudioTokens {
  borderRadius: number;
  fontHeading: string;
  fontBody: string;
  baseFontSize: number;
  shadowIntensity: number;
  spacingScale: SpacingScale;
  saturationShift: number;
  lightnessShift: number;
}

export const defaultStudioTokens: StudioTokens = {
  borderRadius: 12,
  fontHeading: "DM Sans",
  fontBody: "Inter",
  baseFontSize: 16,
  shadowIntensity: 1,
  spacingScale: "default",
  saturationShift: 0,
  lightnessShift: 0,
};

export const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "DM Sans", label: "DM Sans" },
  { value: "JetBrains Mono", label: "JetBrains Mono" },
  { value: "system-ui", label: "System UI" },
  { value: "Georgia", label: "Georgia" },
  { value: "monospace", label: "Monospace" },
];
