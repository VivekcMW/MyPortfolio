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

  // Load theme from localStorage on mount — a side effect (CSS vars), not a render gate,
  // so the tree renders immediately on the server and on first paint (no blank-page flash, no SEO gap).
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

/**
 * Keys are the exact CSS custom-property suffixes Tailwind's `@theme` block emits
 * (kebab-case — `accent-foreground`, not `accentForeground`), so an inline style on
 * <html> overrides the stylesheet's :root value and every `bg-*`/`text-*`/`border-*`
 * utility follows along. `overlay` is a bare opacity number, not a color: consumers
 * use it as `opacity: var(--color-overlay)` on ambient glow/gradient layers.
 */
const THEME_COLORS: Record<ThemeType, Record<string, string>> = {
  light: {
    background: "#FAFAFA",
    foreground: "#1A1A1A",
    surface: "#FFFFFF",
    "surface-hover": "#F5F5F5",
    border: "#E5E5E5",
    muted: "#5C5C5C",

    accent: "#4F46E5",
    "accent-foreground": "#FFFFFF",
    "accent-designer": "#A21CAF",
    "accent-scaler": "#B45309",
    "accent-coral": "#A21CAF",

    "prose-heading": "#1A1A1A",
    "prose-body": "#4B4B4B",
    "prose-code-bg": "#F0F0F0",

    overlay: "0.02",
  },
  dark: {
    background: "#080808",
    foreground: "#F0EEE9",
    surface: "#111111",
    "surface-hover": "#191919",
    border: "#262626",
    muted: "#8C8C8C",

    accent: "#818CF8",
    "accent-foreground": "#1A1A1A",
    "accent-designer": "#E879F9",
    "accent-scaler": "#FB923C",
    "accent-coral": "#E879F9",

    "prose-heading": "#F0EEE9",
    "prose-body": "#A3A3A3",
    "prose-code-bg": "#141414",

    overlay: "0.15",
  },
};

function applyTheme(theme: ThemeType) {
  const root = document.documentElement;

  Object.entries(THEME_COLORS[theme]).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
  root.style.colorScheme = theme;
}
