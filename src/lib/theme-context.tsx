"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "dark" | "light" | "highContrast" | "warm" | "cool";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("dark");

  // Load theme from localStorage on mount — a side effect (CSS vars), not a render gate,
  // so the tree renders immediately on the server and on first paint (no blank-page flash, no SEO gap).
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeType | null;
    if (savedTheme && ["dark", "light", "highContrast", "warm", "cool"].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme: ThemeType = prefersDark ? "dark" : "light";
      setThemeState(defaultTheme);
      applyTheme(defaultTheme);
    }
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
    dark: {
      background: "#080808",
      foreground: "#F0EEE9",
      surface: "#111111",
      surfaceHover: "#191919",
      border: "#222222",
      muted: "#8C8C8C",
      accentBg: "#080808",
    },
    light: {
      background: "#FAFAFA",
      foreground: "#1A1A1A",
      surface: "#FFFFFF",
      surfaceHover: "#F5F5F5",
      border: "#E5E5E5",
      muted: "#737373",
      accentBg: "#FAFAFA",
    },
    highContrast: {
      background: "#000000",
      foreground: "#FFFFFF",
      surface: "#0A0A0A",
      surfaceHover: "#1A1A1A",
      border: "#333333",
      muted: "#CCCCCC",
      accentBg: "#000000",
    },
    warm: {
      background: "#1C1512",
      foreground: "#F5EDE6",
      surface: "#2A201C",
      surfaceHover: "#362B26",
      border: "#4A3B33",
      muted: "#B8A89E",
      accentBg: "#1C1512",
    },
    cool: {
      background: "#0F172A",
      foreground: "#E2E8F0",
      surface: "#1E293B",
      surfaceHover: "#334155",
      border: "#334155",
      muted: "#94A3B8",
      accentBg: "#0F172A",
    },
  };

  const colors = themeColors[theme];

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}
