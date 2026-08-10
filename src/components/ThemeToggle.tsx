"use client";

import { useTheme } from "@/lib/theme-context";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-lg hover:bg-surface-hover transition-colors text-foreground"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
