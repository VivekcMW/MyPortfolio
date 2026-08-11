// Design System V2 Types - Multi-Platform Token System

export interface TokenMeta {
  version: string;
  lastUpdated: string;
  platforms: Platform[];
}

export type Platform = "web" | "mobile" | "desktop" | "voice" | "ar" | "email" | "iot";

export type DensityMode = "relaxed" | "default" | "compact";

export interface ColorScale {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
}

export interface SemanticColor {
  light: string;
  dark: string;
}

export interface AIColors {
  suggestion: string;
  background: string;
  border: string;
  approved: string;
  rejected: string;
  thinking: string;
}

export interface ColorTokens {
  brand: {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
  };
  semantic: {
    success: SemanticColor;
    error: SemanticColor;
    warning: SemanticColor;
    info: SemanticColor;
  };
  ai: AIColors;
  neutral: ColorScale;
}

export interface TypographyTokens {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface SpacingSet {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface SpacingTokens {
  compact: SpacingSet;
  default: SpacingSet;
  relaxed: SpacingSet;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  ai: string;
  glow: string;
}

export interface MotionTokens {
  duration: {
    fast: string;
    base: string;
    slow: string;
    slower: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
  ai: {
    pulse: string;
    shimmer: string;
    slideIn: string;
  };
}

export interface DensityTokens {
  mode: DensityMode[];
  current: DensityMode;
}

export interface PlatformConfig {
  web: {
    output: string;
    prefix: string;
  };
  mobile: {
    output: string;
    multiplier: number;
  };
  voice: {
    output: string;
    volumeMap: Record<string, string>;
    emphasisMap: Record<string, string>;
  };
  ar: {
    output: string;
    depthMultiplier: number;
  };
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface DesignTokensV2 {
  meta: TokenMeta;
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
  density: DensityTokens;
  platform: PlatformConfig;
  breakpoints: BreakpointTokens;
}

// Platform-specific types
export interface WebTokens {
  cssVariables: string;
  tailwindConfig: string;
  scssVariables: string;
}

export interface MobileTokens {
  reactNative: Record<string, any>;
  flutter: string;
  swiftUI: string;
}

export interface VoiceTokens {
  ssmlAttributes: Record<string, string>;
  conversationFlow: any[];
}

export interface ARTokens {
  spatialUnits: Record<string, number>;
  materialShaders: Record<string, string>;
}

// Component types
export interface AgenticPattern {
  id: string;
  name: string;
  description: string;
  psychologyPrinciple: string;
  research: string[];
  useCases: string[];
  demoComponent: React.ComponentType<any>;
  tokens: Partial<DesignTokensV2>;
}

export interface PlatformAdapter {
  id: Platform;
  name: string;
  description: string;
  icon: React.ReactNode;
  outputFormat: string;
  converter: (tokens: DesignTokensV2) => string | object;
}

export interface FrameworkIntegration {
  id: "tailwind" | "bootstrap" | "antdesign";
  name: string;
  description: string;
  icon: React.ReactNode;
  tokenMapper: (tokens: DesignTokensV2) => any;
  components: React.ComponentType<any>[];
}
