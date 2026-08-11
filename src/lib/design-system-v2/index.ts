// Design System V2 - Token Exports
import tokens from "./tokens.json";
import type { DesignTokensV2, Platform, DensityMode } from "./types";

export const designTokens = tokens as DesignTokensV2;

// Helper functions for token access
export function getColorToken(path: string): string {
  const parts = path.split(".");
  let value: any = designTokens.color;
  for (const part of parts) {
    value = value?.[part];
  }
  return value || "";
}

export function getSpacingToken(mode: DensityMode, size: keyof typeof designTokens.spacing.default): string {
  return designTokens.spacing[mode][size];
}

export function getTypographyToken(property: keyof typeof designTokens.typography, key: string): string | number {
  return (designTokens.typography[property] as any)[key];
}

// Platform converters
export function convertToWebTokens(tokens: DesignTokensV2): string {
  let css = ":root {\n";
  
  // Colors
  Object.entries(tokens.color.brand.primary).forEach(([key, value]) => {
    css += `  --color-primary-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.color.brand.secondary).forEach(([key, value]) => {
    css += `  --color-secondary-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.color.brand.accent).forEach(([key, value]) => {
    css += `  --color-accent-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.color.ai).forEach(([key, value]) => {
    css += `  --color-ai-${key}: ${value};\n`;
  });
  
  // Spacing (default mode)
  Object.entries(tokens.spacing.default).forEach(([key, value]) => {
    css += `  --spacing-${key}: ${value};\n`;
  });
  
  // Typography
  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    css += `  --font-${key}: ${value};\n`;
  });
  
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    css += `  --font-size-${key}: ${value};\n`;
  });
  
  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    css += `  --radius-${key}: ${value};\n`;
  });
  
  // Shadows
  Object.entries(tokens.shadow).forEach(([key, value]) => {
    css += `  --shadow-${key}: ${value};\n`;
  });
  
  css += "}\n";
  return css;
}

export function convertToMobileTokens(tokens: DesignTokensV2) {
  return {
    colors: {
      primary: tokens.color.brand.primary,
      secondary: tokens.color.brand.secondary,
      accent: tokens.color.brand.accent,
      semantic: tokens.color.semantic,
      ai: tokens.color.ai,
    },
    typography: tokens.typography,
    spacing: tokens.spacing.default,
    radius: tokens.radius,
    shadow: tokens.shadow,
  };
}

export function convertToVoiceTokens(tokens: DesignTokensV2) {
  return {
    emphasis: {
      primary: '<emphasis level="strong">',
      secondary: '<emphasis level="moderate">',
      muted: '<emphasis level="reduced">',
    },
    prosody: {
      success: '<prosody rate="medium" pitch="+5%">',
      error: '<prosody rate="slow" pitch="+10%">',
      warning: '<prosody rate="medium" pitch="+3%">',
    },
    volume: {
      primary: '<prosody volume="loud">',
      secondary: '<prosody volume="medium">',
      muted: '<prosody volume="soft">',
    },
  };
}

export function convertToTailwindConfig(tokens: DesignTokensV2) {
  return {
    theme: {
      extend: {
        colors: {
          primary: tokens.color.brand.primary,
          secondary: tokens.color.brand.secondary,
          accent: tokens.color.brand.accent,
          ai: tokens.color.ai,
        },
        fontFamily: {
          heading: [tokens.typography.fontFamily.heading],
          body: [tokens.typography.fontFamily.body],
          mono: [tokens.typography.fontFamily.mono],
        },
        fontSize: tokens.typography.fontSize,
        spacing: tokens.spacing.default,
        borderRadius: tokens.radius,
        boxShadow: tokens.shadow,
      },
    },
  };
}

export * from "./types";
