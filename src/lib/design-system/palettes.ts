import { ColorPalette, PaletteSlug } from "./types";

export const palettes: Record<PaletteSlug, ColorPalette> = {
  dark: {
    name: "Dark",
    description: "Default — low-light optimized",
    colors: {
      background: "#080808",
      text: "#F0EEE9",
      surface: "#111111",
      surfaceHover: "#191919",
      border: "#222222",
      textMuted: "#666666",
      overlay: "#00000080",
    },
  },
  light: {
    name: "Light",
    description: "Print & presentation friendly",
    colors: {
      background: "#FAFAFA",
      text: "#1A1A1A",
      surface: "#FFFFFF",
      surfaceHover: "#F5F5F5",
      border: "#E5E5E5",
      textMuted: "#737373",
      overlay: "#00000020",
    },
  },
  highContrast: {
    name: "High Contrast",
    description: "WCAG AAA — maximum readability",
    colors: {
      background: "#000000",
      text: "#FFFFFF",
      surface: "#0A0A0A",
      surfaceHover: "#1A1A1A",
      border: "#333333",
      textMuted: "#CCCCCC",
      overlay: "#000000CC",
    },
  },
  warm: {
    name: "Warm",
    description: "Amber undertone for editorial feel",
    colors: {
      background: "#1C1512",
      text: "#F5EDE6",
      surface: "#2A201C",
      surfaceHover: "#362B26",
      border: "#4A3B33",
      textMuted: "#B8A89E",
      overlay: "#1C1512CC",
    },
  },
  cool: {
    name: "Cool",
    description: "Blue-slate for technical mood",
    colors: {
      background: "#0F172A",
      text: "#E2E8F0",
      surface: "#1E293B",
      surfaceHover: "#334155",
      border: "#334155",
      textMuted: "#94A3B8",
      overlay: "#0F172ACC",
    },
  },
  sepia: {
    name: "Sepia",
    description: "Warm paper — reading mode",
    colors: {
      background: "#FBF1D3",
      text: "#5B4636",
      surface: "#FEF7E8",
      surfaceHover: "#F5E6C8",
      border: "#E8D5B5",
      textMuted: "#8B7355",
      overlay: "#5B463640",
    },
  },
};

export const paletteList = Object.entries(palettes).map(([slug, p]) => ({
  slug: slug as PaletteSlug,
  ...p,
}));
