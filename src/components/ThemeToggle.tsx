"use client";

import { useTheme, type ThemeType } from "@/lib/theme-context";
import { Moon, Sun, Monitor, Flame, Snowflake } from "lucide-react";
import { useState } from "react";

const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
  { value: "dark", label: "Dark", icon: <Moon size={16} /> },
  { value: "light", label: "Light", icon: <Sun size={16} /> },
  { value: "highContrast", label: "High Contrast", icon: <Monitor size={16} /> },
  { value: "warm", label: "Warm", icon: <Flame size={16} /> },
  { value: "cool", label: "Cool", icon: <Snowflake size={16} /> },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find((t) => t.value === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-surface transition-colors text-foreground"
        aria-label="Toggle theme"
        title={currentTheme?.label}
      >
        {currentTheme?.icon}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-surface border border-border shadow-lg overflow-hidden z-50">
          <div className="p-3 border-b border-border">
            <p className="text-xs font-mono text-muted uppercase tracking-widest">Theme</p>
          </div>
          <div className="grid gap-1 p-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all text-sm ${
                  theme === t.value
                    ? "bg-accent/20 text-accent font-medium"
                    : "text-foreground hover:bg-surface-hover"
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
                {theme === t.value && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
