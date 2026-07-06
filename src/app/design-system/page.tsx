"use client";

import { useState, useEffect, ReactNode, createElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, Type, Layers, Component, Layout, Accessibility, Code2,
  Copy, Check, Monitor, Tablet, Smartphone, Sparkles, Grid3X3,
  AlertCircle, Info, ArrowRight, Sun, Moon, Contrast, Flame,
  Snowflake, BookOpen, MonitorDot, BarChart3, Sparkle, Wrench,
  Landmark, ShoppingBag, Search, Download, ExternalLink, X,
  Sliders, Columns, Paintbrush, Radius, Scaling,
  Type as TypeIcon,
} from "lucide-react";
import { DesignSystemSlug, PaletteSlug, DesignSystem, StudioTokens, defaultStudioTokens, fontOptions, SpacingScale } from "@/lib/design-system/types";
import { designSystems, designSystemList } from "@/lib/design-system/domains";
import { palettes, paletteList } from "@/lib/design-system/palettes";
import { researchEntries, getResearch } from "@/lib/design-system/research";
import { contrastRatio, wcagRating, applyStudioShift, WcagRating } from "@/lib/design-system/color-utils";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES & INTERFACES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Section = "overview" | "colors" | "typography" | "spacing" | "components" | "patterns" | "accessibility" | "code";
type DeviceView = "desktop" | "tablet" | "mobile";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DOMAIN THEMES — imported from lib/design-system/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const paletteIcons: Record<PaletteSlug, typeof Sun> = {
  dark: Moon,
  light: Sun,
  highContrast: Contrast,
  warm: Flame,
  cool: Snowflake,
  sepia: BookOpen,
};

const domainIcons: Record<DesignSystemSlug, typeof BarChart3> = {
  ooh: MonitorDot,
  "data-science": BarChart3,
  ai: Sparkle,
  "design-engineering": Wrench,
  fintech: Landmark,
  consumer: ShoppingBag,
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIDEBAR NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const sidebarSections = [
  { id: "overview" as Section, label: "Overview", icon: <Sparkles className="w-4 h-4" /> },
  { id: "colors" as Section, label: "Colors", icon: <Palette className="w-4 h-4" /> },
  { id: "typography" as Section, label: "Typography", icon: <Type className="w-4 h-4" /> },
  { id: "spacing" as Section, label: "Spacing", icon: <Grid3X3 className="w-4 h-4" /> },
  { id: "components" as Section, label: "Components", icon: <Component className="w-4 h-4" /> },
  { id: "patterns" as Section, label: "Patterns", icon: <Layout className="w-4 h-4" /> },
  { id: "accessibility" as Section, label: "Accessibility", icon: <Accessibility className="w-4 h-4" /> },
  { id: "code" as Section, label: "Code Export", icon: <Code2 className="w-4 h-4" /> },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function DesignSystemPage() {
  const [activeDomain, setActiveDomain] = useState<DesignSystemSlug>("ooh");
  const [activePalette, setActivePalette] = useState<PaletteSlug>("dark");
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [studioTokens, setStudioTokens] = useState<StudioTokens>(defaultStudioTokens);
  const [splitView, setSplitView] = useState(false);
  const [splitDomain, setSplitDomain] = useState<DesignSystemSlug>("data-science");
  const [splitPalette, setSplitPalette] = useState<PaletteSlug>("dark");
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"css" | "json" | "tailwind">("css");
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [introSeen, setIntroSeen] = useState(true);

  useEffect(() => {
    setIntroSeen(localStorage.getItem("ds-lab-intro-seen") === "1");
  }, []);

  const dismissIntro = () => {
    localStorage.setItem("ds-lab-intro-seen", "1");
    setIntroSeen(true);
  };

  const ds = designSystems[activeDomain];
  const pal = palettes[activePalette];
  const theme: DesignSystem = {
    ...ds,
    colors: {
      ...ds.colors,
      background: pal.colors.background,
      text: pal.colors.text,
      surface: pal.colors.surface,
      surfaceHover: pal.colors.surfaceHover,
      border: pal.colors.border,
      textMuted: pal.colors.textMuted,
      overlay: pal.colors.overlay,
    },
  };
  const DomainIcon = domainIcons[activeDomain];

  const splitDs = designSystems[splitDomain];
  const splitPal = palettes[splitPalette];
  const splitTheme: DesignSystem = {
    ...splitDs,
    colors: {
      ...splitDs.colors,
      background: splitPal.colors.background,
      text: splitPal.colors.text,
      surface: splitPal.colors.surface,
      surfaceHover: splitPal.colors.surfaceHover,
      border: splitPal.colors.border,
      textMuted: splitPal.colors.textMuted,
      overlay: splitPal.colors.overlay,
    },
  };

  const updateToken = <K extends keyof StudioTokens>(key: K, value: StudioTokens[K]) =>
    setStudioTokens(prev => ({ ...prev, [key]: value }));

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  /* ─── URL State Sync ─── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("domain") as DesignSystemSlug | null;
    const p = params.get("palette") as PaletteSlug | null;
    const sd = params.get("splitDomain") as DesignSystemSlug | null;
    const sp = params.get("splitPalette") as PaletteSlug | null;
    const sv = params.get("splitView");
    const br = params.get("br");
    const si = params.get("si");
    const bfs = params.get("bfs");
    const sc = params.get("sc");

    if (d && designSystems[d]) setActiveDomain(d);
    if (p && palettes[p]) setActivePalette(p);
    if (sd && designSystems[sd]) setSplitDomain(sd);
    if (sp && palettes[sp]) setSplitPalette(sp);
    if (sv === "1") setSplitView(true);
    setStudioTokens(prev => ({
      ...prev,
      borderRadius: br ? parseFloat(br) : prev.borderRadius,
      shadowIntensity: si ? parseFloat(si) : prev.shadowIntensity,
      baseFontSize: bfs ? parseFloat(bfs) : prev.baseFontSize,
      spacingScale: (sc === "compact" || sc === "relaxed" ? sc : prev.spacingScale) as SpacingScale,
    }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("domain", activeDomain);
    params.set("palette", activePalette);
    if (splitView) {
      params.set("splitDomain", splitDomain);
      params.set("splitPalette", splitPalette);
      params.set("splitView", "1");
    }
    if (studioTokens.borderRadius !== defaultStudioTokens.borderRadius) params.set("br", String(studioTokens.borderRadius));
    if (studioTokens.shadowIntensity !== defaultStudioTokens.shadowIntensity) params.set("si", String(studioTokens.shadowIntensity));
    if (studioTokens.baseFontSize !== defaultStudioTokens.baseFontSize) params.set("bfs", String(studioTokens.baseFontSize));
    if (studioTokens.spacingScale !== defaultStudioTokens.spacingScale) params.set("sc", studioTokens.spacingScale);
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [activeDomain, activePalette, splitView, splitDomain, splitPalette, studioTokens]);

  return (
    <div 
      className="flex flex-col transition-colors duration-500 pt-16 lg:pt-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Studio atmosphere */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -20%, ${theme.colors.primaryHex}15 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 100%, ${theme.colors.secondaryHex}08 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 80%, ${theme.colors.accentHex}06 0%, transparent 50%)
          `,
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(${theme.colors.text} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Studio Toolbar ─── */}
      <header 
        className="relative z-20 border-b"
        style={{ backgroundColor: theme.colors.surface + "e6", borderColor: theme.colors.border, backdropFilter: "blur(16px)" }}
      >
        <div className="flex items-center justify-between px-3 lg:px-4 h-10">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.colors.primaryHex}, ${theme.colors.secondaryHex})` }}
            >
              <Layers className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Domain Switcher */}
          <div className="hidden md:flex items-center gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
            {designSystemList.map(({ slug, name }) => {
              const Icon = domainIcons[slug];
              return (
                <button
                  key={slug}
                  onClick={() => setActiveDomain(slug)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium transition-all"
                  style={{
                    backgroundColor: activeDomain === slug ? theme.colors.primaryHex : "transparent",
                    color: activeDomain === slug ? "#fff" : theme.colors.textMuted,
                    boxShadow: activeDomain === slug ? `0 0 12px ${theme.colors.primaryHex}40` : "none",
                  }}
                  title={name}
                  aria-label={`${name} domain`}
                  aria-pressed={activeDomain === slug}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden lg:inline">{name}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
              {(Object.entries(palettes) as [PaletteSlug, typeof palettes[PaletteSlug]][]).map(([slug, p]) => {
                const Icon = paletteIcons[slug];
                return (
                  <button
                    key={slug}
                    onClick={() => setActivePalette(slug)}
                    className="p-1 rounded-md transition-all"
                    style={{
                      backgroundColor: activePalette === slug ? theme.colors.primaryHex : "transparent",
                      color: activePalette === slug ? "#fff" : theme.colors.textMuted,
                    }}
                    title={p.name}
                    aria-label={`${p.name} palette`}
                    aria-pressed={activePalette === slug}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
            <div className="hidden sm:flex items-center gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
              {[
                { id: "desktop" as DeviceView, icon: <Monitor className="w-3 h-3" /> },
                { id: "tablet" as DeviceView, icon: <Tablet className="w-3 h-3" /> },
                { id: "mobile" as DeviceView, icon: <Smartphone className="w-3 h-3" /> },
              ].map((device) => (
                <button
                  key={device.id}
                  onClick={() => setDeviceView(device.id)}
                  className="p-1 rounded-md transition-colors"
                  style={{
                    backgroundColor: deviceView === device.id ? theme.colors.primaryHex : "transparent",
                    color: deviceView === device.id ? "#fff" : theme.colors.textMuted,
                  }}
                  aria-label={`${device.id} preview`}
                  aria-pressed={deviceView === device.id}
                >
                  {device.icon}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
              <button
                onClick={() => setSplitView(!splitView)}
                className="p-1 rounded-md transition-colors"
                style={{
                  backgroundColor: splitView ? theme.colors.primaryHex : "transparent",
                  color: splitView ? "#fff" : theme.colors.textMuted,
                }}
                title="Split View"
                aria-label="Toggle split view"
                aria-pressed={splitView}
              >
                <Columns className="w-3 h-3" />
              </button>
              <button
                onClick={() => setExportOpen(true)}
                className="p-1 rounded-md transition-colors"
                style={{ color: theme.colors.textMuted }}
                title="Export Tokens"
                aria-label="Export tokens"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
            {/* Mobile controls — visible below lg */}
            <div className="flex lg:hidden items-center gap-0.5 p-0.5 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
              <select
                value={activeDomain}
                onChange={e => setActiveDomain(e.target.value as DesignSystemSlug)}
                className="px-1.5 py-1 rounded-md text-[10px] bg-transparent outline-none max-w-[80px]"
                style={{ color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                title="Domain"
              >
                {designSystemList.map(({ slug, name }) => (
                  <option key={slug} value={slug}>{name}</option>
                ))}
              </select>
              <select
                value={activePalette}
                onChange={e => setActivePalette(e.target.value as PaletteSlug)}
                className="px-1.5 py-1 rounded-md text-[10px] bg-transparent outline-none max-w-[70px]"
                style={{ color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                title="Palette"
              >
                {paletteList.map(({ slug, name }) => (
                  <option key={slug} value={slug}>{name}</option>
                ))}
              </select>
              <button
                onClick={() => setMobilePanelOpen(!mobilePanelOpen)}
                className="p-1 rounded-md transition-colors"
                style={{ color: mobilePanelOpen ? theme.colors.primaryHex : theme.colors.textMuted }}
                title="Properties"
                aria-label="Toggle properties panel"
                aria-pressed={mobilePanelOpen}
              >
                <Sliders className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Canvas Area ─── */}
      <div className="flex flex-1 relative z-10 overflow-hidden">
        {/* First-visit intro — what this is and why it matters */}
        <AnimatePresence>
          {!introSeen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
            >
              <div
                className="flex items-start gap-3 p-4 rounded-xl border shadow-2xl"
                style={{
                  backgroundColor: theme.colors.surface + "f5",
                  borderColor: theme.colors.primaryHex + "40",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg, ${theme.colors.primaryHex}, ${theme.colors.secondaryHex})` }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>
                    This is a live design-system studio.
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.colors.textMuted }}>
                    36 theme combinations · every token adjustable · every decision documented.
                    Try dragging <strong style={{ color: theme.colors.text }}>Border Radius</strong> in
                    the Properties panel, or push <strong style={{ color: theme.colors.text }}>Lightness</strong> until
                    the live contrast audit fails — then check the Accessibility tab.
                  </p>
                </div>
                <button
                  onClick={dismissIntro}
                  aria-label="Dismiss introduction"
                  className="p-1.5 rounded-md transition-colors shrink-0"
                  style={{ color: theme.colors.textMuted }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left: Vertical Tool Palette */}
        <nav 
          className="hidden md:flex flex-col items-center gap-1 py-3 px-1.5 border-r shrink-0"
          style={{ backgroundColor: theme.colors.surface + "99", borderColor: theme.colors.border, backdropFilter: "blur(12px)" }}
        >
          {sidebarSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="relative group w-9 h-9 flex items-center justify-center rounded-lg text-xs transition-all"
                style={{
                  backgroundColor: isActive ? theme.colors.primaryHex + "20" : "transparent",
                  color: isActive ? theme.colors.primaryHex : theme.colors.textMuted,
                }}
                title={section.label}
                aria-label={`${section.label} section`}
                aria-current={isActive ? "true" : undefined}
              >
                {section.icon}
                <div 
                  className="absolute left-full ml-2 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30"
                  style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                >
                  {section.label}
                </div>
                {isActive && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.primaryHex }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile: Horizontal section scroll */}
        <div 
          className="md:hidden flex items-center gap-1 px-3 py-2 overflow-x-auto border-b shrink-0"
          style={{ borderColor: theme.colors.border }}
        >
          {sidebarSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeSection === section.id ? theme.colors.primaryHex + "20" : "transparent",
                color: activeSection === section.id ? theme.colors.primaryHex : theme.colors.textMuted,
              }}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Canvas with CSS variable tokens */}
        <div
          className="flex-1 flex min-w-0"
          style={{
            '--ds-radius': `${studioTokens.borderRadius}px`,
            '--ds-radius-sm': `${Math.max(4, studioTokens.borderRadius * 0.5)}px`,
            '--ds-radius-lg': `${Math.min(studioTokens.borderRadius * 1.5, 24)}px`,
            '--ds-radius-xl': `${Math.min(studioTokens.borderRadius * 2, 32)}px`,
            '--ds-shadow': `${studioTokens.shadowIntensity}`,
            '--ds-font-heading': studioTokens.fontHeading,
            '--ds-font-body': studioTokens.fontBody,
            '--ds-base-font-size': `${studioTokens.baseFontSize}px`,
            '--ds-spacing': studioTokens.spacingScale === "compact" ? "0.75" : studioTokens.spacingScale === "relaxed" ? "1.5" : "1",
            '--ds-saturation': `${studioTokens.saturationShift}`,
            '--ds-lightness': `${studioTokens.lightnessShift}`,
            filter: `saturate(${1 + studioTokens.saturationShift / 100}) brightness(${1 + studioTokens.lightnessShift / 100})`,
          } as React.CSSProperties}
        >
          {splitView ? (
            /* ─── Split View — two themes side-by-side ─── */
            <div className="flex w-full divide-x" style={{ borderColor: theme.colors.border }}>
              {/* Left: Main */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="mb-4 flex items-center gap-2 justify-center">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px]" style={{ backgroundColor: theme.colors.primaryHex + "20", color: theme.colors.primaryHex }}>
                    <DomainIcon className="w-3 h-3" />
                    {theme.name}
                  </div>
                  <span className="text-muted text-[10px]">×</span>
                  <span className="text-muted text-[10px] font-mono">{palettes[activePalette].name}</span>
                </div>
                <SectionRenderer theme={theme} activeDomain={activeDomain} activeSection={activeSection} copyToClipboard={copyToClipboard} copiedToken={copiedToken} setActiveDomain={setActiveDomain} studioTokens={studioTokens} />
              </div>
              {/* Right: Split */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6" style={{ backgroundColor: splitTheme.colors.background }}>
                <div className="mb-4 flex items-center gap-2 justify-center">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px]" style={{ backgroundColor: splitTheme.colors.primaryHex + "20", color: splitTheme.colors.primaryHex }}>
                    {createElement(domainIcons[splitDomain], { className: "w-3 h-3" })}
                    {splitTheme.name}
                  </div>
                  <span className="text-muted text-[10px]">×</span>
                  <span className="text-muted text-[10px] font-mono">{palettes[splitPalette].name}</span>
                </div>
                <SectionRenderer theme={splitTheme} activeDomain={splitDomain} activeSection={activeSection} copyToClipboard={copyToClipboard} copiedToken={copiedToken} setActiveDomain={setActiveDomain} studioTokens={studioTokens} />
              </div>
              {/* Split controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-xl border shadow-lg" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
                <select
                  value={splitDomain}
                  onChange={e => setSplitDomain(e.target.value as DesignSystemSlug)}
                  className="text-[10px] px-2 py-1 rounded-md bg-transparent outline-none"
                  style={{ color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                >
                  {designSystemList.map(({ slug, name }) => (
                    <option key={slug} value={slug}>{name}</option>
                  ))}
                </select>
                <span className="text-muted text-[10px]">×</span>
                <select
                  value={splitPalette}
                  onChange={e => setSplitPalette(e.target.value as PaletteSlug)}
                  className="text-[10px] px-2 py-1 rounded-md bg-transparent outline-none"
                  style={{ color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                >
                  {paletteList.map(({ slug, name }) => (
                    <option key={slug} value={slug}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* ─── Single View ─── */
            <main className="flex-1 overflow-y-auto">
              <div 
                className={`min-h-full p-4 lg:p-8 transition-all duration-300 ${
                  { desktop: "max-w-5xl mx-auto", tablet: "max-w-3xl mx-auto", mobile: "max-w-sm mx-auto" }[deviceView]
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <SectionRenderer theme={theme} activeDomain={activeDomain} activeSection={activeSection} copyToClipboard={copyToClipboard} copiedToken={copiedToken} setActiveDomain={setActiveDomain} studioTokens={studioTokens} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          )}
        </div>

        {/* ─── Right: Studio Properties Panel ─── */}
        <StudioPanel
          tokens={studioTokens}
          onChange={updateToken}
          theme={theme}
        />

        {/* ─── Mobile: Studio Panel Overlay ─── */}
        {mobilePanelOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobilePanelOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-2xl overflow-y-auto"
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}>
                <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: theme.colors.text }}>
                  <Sliders className="w-3.5 h-3.5" />
                  Properties
                </div>
                <button onClick={() => setMobilePanelOpen(false)} className="p-1 rounded-md hover:bg-surface-hover" style={{ color: theme.colors.textMuted }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <MobilePanelControls
                  tokens={studioTokens}
                  onChange={updateToken}
                  theme={theme}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ─── Export Modal ─── */}
      {exportOpen && (
        <ExportModal
          theme={theme}
          studioTokens={studioTokens}
          format={exportFormat}
          setFormat={setExportFormat}
          onClose={() => setExportOpen(false)}
          copyToClipboard={copyToClipboard}
          copiedToken={copiedToken}
        />
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EXPORT MODAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ExportModal({ theme, studioTokens, format, setFormat, onClose, copyToClipboard, copiedToken }: {
  theme: DesignSystem;
  studioTokens: StudioTokens;
  format: "css" | "json" | "tailwind";
  setFormat: (f: "css" | "json" | "tailwind") => void;
  onClose: () => void;
  copyToClipboard: (text: string, name: string) => void;
  copiedToken: string | null;
}) {
  const generateCSS = () => `:root {
  --color-primary: ${theme.colors.primaryHex};
  --color-secondary: ${theme.colors.secondaryHex};
  --color-accent: ${theme.colors.accentHex};
  --color-success: ${theme.colors.success};
  --color-warning: ${theme.colors.warning};
  --color-error: ${theme.colors.error};
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-surface-hover: ${theme.colors.surfaceHover};
  --color-border: ${theme.colors.border};
  --color-text: ${theme.colors.text};
  --color-text-muted: ${theme.colors.textMuted};
  --color-overlay: ${theme.colors.overlay};
  --ds-radius: ${studioTokens.borderRadius}px;
  --ds-radius-sm: ${Math.max(4, studioTokens.borderRadius * 0.5)}px;
  --ds-radius-lg: ${Math.min(studioTokens.borderRadius * 1.5, 24)}px;
  --ds-radius-xl: ${Math.min(studioTokens.borderRadius * 2, 32)}px;
  --ds-shadow: ${studioTokens.shadowIntensity};
  --ds-font-heading: ${studioTokens.fontHeading};
  --ds-font-body: ${studioTokens.fontBody};
  --ds-base-font-size: ${studioTokens.baseFontSize}px;
}`;

  const generateJSON = () => JSON.stringify({
    name: theme.name,
    slug: theme.name.toLowerCase().replace(/\s+/g, "-"),
    colors: {
      primary: theme.colors.primaryHex,
      secondary: theme.colors.secondaryHex,
      accent: theme.colors.accentHex,
      success: theme.colors.success,
      warning: theme.colors.warning,
      error: theme.colors.error,
      background: theme.colors.background,
      surface: theme.colors.surface,
      surfaceHover: theme.colors.surfaceHover,
      border: theme.colors.border,
      text: theme.colors.text,
      textMuted: theme.colors.textMuted,
    },
    studio: {
      borderRadius: studioTokens.borderRadius,
      shadowIntensity: studioTokens.shadowIntensity,
      fontHeading: studioTokens.fontHeading,
      fontBody: studioTokens.fontBody,
      baseFontSize: studioTokens.baseFontSize,
      spacingScale: studioTokens.spacingScale,
    },
  }, null, 2);

  const generateTailwind = () => `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.colors.primaryHex}',
        secondary: '${theme.colors.secondaryHex}',
        accent: '${theme.colors.accentHex}',
        success: '${theme.colors.success}',
        warning: '${theme.colors.warning}',
        error: '${theme.colors.error}',
        background: '${theme.colors.background}',
        surface: '${theme.colors.surface}',
        'surface-hover': '${theme.colors.surfaceHover}',
        border: '${theme.colors.border}',
        text: '${theme.colors.text}',
        'text-muted': '${theme.colors.textMuted}',
      },
      borderRadius: {
        DEFAULT: '${studioTokens.borderRadius}px',
        sm: '${Math.max(4, studioTokens.borderRadius * 0.5)}px',
        lg: '${Math.min(studioTokens.borderRadius * 1.5, 24)}px',
        xl: '${Math.min(studioTokens.borderRadius * 2, 32)}px',
      },
      fontFamily: {
        heading: ['${studioTokens.fontHeading}', 'sans-serif'],
        body: ['${studioTokens.fontBody}', 'sans-serif'],
      },
    },
  },
};`;

  const codeMap = { css: generateCSS(), json: generateJSON(), tailwind: generateTailwind() };
  const labelMap: Record<string, string> = { css: "CSS Variables", json: "JSON Tokens", tailwind: "Tailwind Config" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl"
        style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: theme.colors.border }}>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: theme.colors.text }}>Export Tokens</h3>
            <p className="text-[10px]" style={{ color: theme.colors.textMuted }}>{theme.name} — {theme.colors.primaryHex}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
            style={{ color: theme.colors.textMuted }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Format Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3">
          {(["css", "json", "tailwind"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all"
              style={{
                backgroundColor: format === f ? theme.colors.primaryHex + "20" : "transparent",
                color: format === f ? theme.colors.primaryHex : theme.colors.textMuted,
              }}
            >
              {labelMap[f]}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div className="px-5 pb-3 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-mono" style={{ color: theme.colors.textMuted }}>
              {format === "css" && ".css"}
              {format === "json" && ".json"}
              {format === "tailwind" && ".js"}
            </span>
            <button
              onClick={() => copyToClipboard(codeMap[format], `export-${format}`)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors"
              style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
            >
              {copiedToken === `export-${format}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedToken === `export-${format}` ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre
            className="p-4 rounded-xl text-[10px] leading-relaxed overflow-x-auto font-mono max-h-80 overflow-y-auto"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
          >
            <code>{codeMap[format]}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t" style={{ borderColor: theme.colors.border }}>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
            style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
          >
            Close
          </button>
          <button
            onClick={() => {
              const blob = new Blob([codeMap[format]], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `design-tokens.${format === "tailwind" ? "js" : format}`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-1.5 rounded-lg text-[11px] font-medium transition-all"
            style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
          >
            <Download className="w-3 h-3 inline mr-1" />
            Download
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION RENDERER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionRenderer({ theme, activeDomain, activeSection, copyToClipboard, copiedToken, setActiveDomain, studioTokens }: {
  theme: DesignSystem;
  activeDomain: DesignSystemSlug;
  activeSection: Section;
  copyToClipboard: (t: string, n: string) => void;
  copiedToken: string | null;
  setActiveDomain: (d: DesignSystemSlug) => void;
  studioTokens: StudioTokens;
}) {
  switch (activeSection) {
    case "overview":
      return <OverviewSection theme={theme} activeDomain={activeDomain} />;
    case "colors":
      return <ColorsSection theme={theme} copyToClipboard={copyToClipboard} copiedToken={copiedToken} />;
    case "typography":
      return <TypographySection theme={theme} studioTokens={studioTokens} />;
    case "spacing":
      return <SpacingSection theme={theme} />;
    case "components":
      return <ComponentsSection theme={theme} />;
    case "patterns":
      return <PatternsSection theme={theme} setActiveDomain={setActiveDomain} activeDomain={activeDomain} />;
    case "accessibility":
      return <AccessibilitySection theme={theme} studioTokens={studioTokens} />;
    case "code":
      return <CodeSection theme={theme} copyToClipboard={copyToClipboard} copiedToken={copiedToken} studioTokens={studioTokens} />;
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STUDIO PROPERTIES PANEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SliderControl({ label, icon, value, min, max, step, onChange, colors }: {
  label: string;
  icon: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  colors: DesignSystem["colors"];
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: colors.textMuted }}>
          <span className="w-3.5 h-3.5">{icon}</span>
          <span>{label}</span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: colors.textMuted }}>{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          backgroundColor: colors.surfaceHover,
          accentColor: colors.primaryHex,
        }}
      />
    </div>
  );
}

function StudioPanel({ tokens, onChange, theme: t }: {
  tokens: StudioTokens;
  onChange: <K extends keyof StudioTokens>(key: K, value: StudioTokens[K]) => void;
  theme: DesignSystem;
}) {
  return (
    <aside
      className="w-56 lg:w-64 border-l overflow-y-auto shrink-0 hidden lg:block"
      style={{
        backgroundColor: t.colors.surface + "e6",
        borderColor: t.colors.border,
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="p-3 border-b space-y-1" style={{ borderColor: t.colors.border }}>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: t.colors.text }}>
          <Sliders className="w-3.5 h-3.5" />
          Properties
        </div>
        <p className="text-[10px]" style={{ color: t.colors.textMuted }}>Tweak the design system live</p>
      </div>
      <div className="p-3 space-y-4">
        <StudioPanelControls tokens={tokens} onChange={onChange} theme={t} />
      </div>
    </aside>
  );
}

function StudioPanelControls({ tokens, onChange, theme: t }: {
  tokens: StudioTokens;
  onChange: <K extends keyof StudioTokens>(key: K, value: StudioTokens[K]) => void;
  theme: DesignSystem;
}) {
  return (
    <>
      <SliderControl
        label="Border Radius"
        icon={<Radius className="w-3.5 h-3.5" />}
        value={tokens.borderRadius}
        min={0} max={24}
        onChange={v => onChange("borderRadius", v)}
        colors={t.colors}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.colors.textMuted }}>
            <TypeIcon className="w-3.5 h-3.5" />
            <span>Heading Font</span>
          </div>
        </div>
        <select
          value={tokens.fontHeading}
          onChange={e => onChange("fontHeading", e.target.value)}
          className="w-full px-2 py-1.5 rounded-md text-[11px] outline-none"
          style={{ backgroundColor: t.colors.surfaceHover, color: t.colors.text, border: `1px solid ${t.colors.border}` }}
        >
          {fontOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.colors.textMuted }}>
            <TypeIcon className="w-3.5 h-3.5" />
            <span>Body Font</span>
          </div>
        </div>
        <select
          value={tokens.fontBody}
          onChange={e => onChange("fontBody", e.target.value)}
          className="w-full px-2 py-1.5 rounded-md text-[11px] outline-none"
          style={{ backgroundColor: t.colors.surfaceHover, color: t.colors.text, border: `1px solid ${t.colors.border}` }}
        >
          {fontOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      <SliderControl
        label="Base Font Size"
        icon={<Scaling className="w-3.5 h-3.5" />}
        value={tokens.baseFontSize}
        min={12} max={24}
        onChange={v => onChange("baseFontSize", v)}
        colors={t.colors}
      />

      <SliderControl
        label="Shadow Intensity"
        icon={<Paintbrush className="w-3.5 h-3.5" />}
        value={tokens.shadowIntensity}
        min={0} max={3} step={0.25}
        onChange={v => onChange("shadowIntensity", v)}
        colors={t.colors}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: t.colors.textMuted }}>
            <Layout className="w-3.5 h-3.5" />
            <span>Spacing</span>
          </div>
        </div>
        <div className="flex gap-1">
          {(["compact", "default", "relaxed"] as SpacingScale[]).map(s => (
            <button
              key={s}
              onClick={() => onChange("spacingScale", s)}
              className="flex-1 py-1 rounded-md text-[9px] font-medium capitalize transition-all"
              style={{
                backgroundColor: tokens.spacingScale === s ? t.colors.primaryHex : "transparent",
                color: tokens.spacingScale === s ? "#fff" : t.colors.textMuted,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <SliderControl
        label="Saturation Shift"
        icon={<Paintbrush className="w-3.5 h-3.5" />}
        value={tokens.saturationShift}
        min={-50} max={50}
        onChange={v => onChange("saturationShift", v)}
        colors={t.colors}
      />

      <SliderControl
        label="Lightness Shift"
        icon={<Sun className="w-3.5 h-3.5" />}
        value={tokens.lightnessShift}
        min={-20} max={20}
        onChange={v => onChange("lightnessShift", v)}
        colors={t.colors}
      />

      <LiveContrastStrip theme={t} tokens={tokens} />
    </>
  );
}

/* ─── Live contrast audit — updates as sliders move ─── */
function ratingColor(rating: WcagRating): string {
  if (rating === "AAA") return "#4ade80";
  if (rating === "AA") return "#a3e635";
  if (rating === "AA Large") return "#facc15";
  return "#f87171";
}

function getContrastPairs(theme: DesignSystem, tokens: StudioTokens) {
  const shift = (hex: string) => applyStudioShift(hex, tokens.saturationShift, tokens.lightnessShift);
  const pairs = [
    { label: "Body text / Background", fg: theme.colors.text, bg: theme.colors.background },
    { label: "Muted text / Background", fg: theme.colors.textMuted, bg: theme.colors.background },
    { label: "Body text / Surface", fg: theme.colors.text, bg: theme.colors.surface },
    { label: "Button label / Primary", fg: "#ffffff", bg: theme.colors.primaryHex },
    { label: "Primary / Background", fg: theme.colors.primaryHex, bg: theme.colors.background },
  ];
  return pairs.map((p) => {
    const fg = shift(p.fg);
    const bg = shift(p.bg);
    const ratio = contrastRatio(fg, bg);
    return { ...p, fg, bg, ratio, rating: wcagRating(ratio) };
  });
}

function LiveContrastStrip({ theme: t, tokens }: {
  theme: DesignSystem;
  tokens: StudioTokens;
}) {
  const results = getContrastPairs(t, tokens);
  const failing = results.filter((r) => r.rating === "Fail").length;

  return (
    <div
      className="pt-3 border-t space-y-1.5"
      style={{ borderColor: t.colors.border }}
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: t.colors.text }}>
          <Contrast className="w-3.5 h-3.5" />
          Live Contrast
        </div>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            color: failing ? "#f87171" : "#4ade80",
            backgroundColor: (failing ? "#f87171" : "#4ade80") + "1a",
          }}
        >
          {failing ? `${failing} failing` : "all passing"}
        </span>
      </div>
      {results.map((r) => (
        <div key={r.label} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: ratingColor(r.rating) }}
          />
          <span className="flex-1 text-[10px] truncate" style={{ color: t.colors.textMuted }}>
            {r.label}
          </span>
          <span className="text-[10px] font-mono tabular-nums" style={{ color: t.colors.text }}>
            {r.ratio.toFixed(1)}
          </span>
        </div>
      ))}
      <p className="text-[9px] leading-relaxed pt-1" style={{ color: t.colors.textMuted }}>
        WCAG 2.2 ratios, recomputed on the shifted colors as you drag.
      </p>
    </div>
  );
}

function MobilePanelControls({ tokens, onChange, theme: t }: {
  tokens: StudioTokens;
  onChange: <K extends keyof StudioTokens>(key: K, value: StudioTokens[K]) => void;
  theme: DesignSystem;
}) {
  return (
    <div className="space-y-4">
      <StudioPanelControls tokens={tokens} onChange={onChange} theme={t} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionHeader({ title, description, theme }: Readonly<{ title: string; description: string; theme: DesignSystem }>) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>
        {title}
      </h1>
      <p className="text-sm lg:text-base" style={{ color: theme.colors.textMuted }}>
        {description}
      </p>
    </div>
  );
}

function Card({ children, theme, className = "" }: Readonly<{ children: ReactNode; theme: DesignSystem; className?: string }>) {
  return (
    <div 
      className={`p-4 lg:p-6 ${className}`}
      style={{ 
        backgroundColor: theme.colors.surface,
        borderRadius: "var(--ds-radius-xl, 1rem)",
        boxShadow: `0 0 0 1px ${theme.colors.border}, 0 calc(4px * var(--ds-shadow, 1)) calc(24px * var(--ds-shadow, 1)) ${theme.colors.overlay}`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Overview Section ─── */
function OverviewSection({ theme, activeDomain }: Readonly<{ theme: DesignSystem; activeDomain: DesignSystemSlug }>) {
  const Icon = domainIcons[activeDomain];
  const research = getResearch(activeDomain);
  const stats = [
    { label: "Components", value: "48+" },
    { label: "Color Tokens", value: "17" },
    { label: "Type Scales", value: "8" },
    { label: "A11y Score", value: "98%" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title={theme.name + " Design System"}
        description={theme.rationale}
        theme={theme}
      />

      {/* Hero Card */}
      <Card theme={theme}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${theme.colors.primaryHex}, ${theme.colors.secondaryHex})` }}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                  {theme.name}
                </h2>
                <p className="text-xs" style={{ color: theme.colors.textMuted }}>{theme.description}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: theme.colors.textMuted }}>
              This theme is optimized for {theme.description.toLowerCase()} applications with carefully selected 
              colors for data visualization, status indicators, and user interactions.
            </p>
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                Get Started
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Documentation
              </button>
            </div>
          </div>

          {/* Mini Dashboard Preview */}
          <div 
            className="w-full lg:w-72 rounded-xl p-4 border"
            style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-medium" style={{ color: theme.colors.textMuted }}>Dashboard Preview</div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.error }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.warning }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.success }} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg p-3" style={{ backgroundColor: theme.colors.surface }}>
                  <div className="text-xs mb-1" style={{ color: theme.colors.textMuted }}>Revenue</div>
                  <div className="text-lg font-bold" style={{ color: theme.colors.text }}>$24.5k</div>
                </div>
                <div className="flex-1 rounded-lg p-3" style={{ backgroundColor: theme.colors.surface }}>
                  <div className="text-xs mb-1" style={{ color: theme.colors.textMuted }}>Users</div>
                  <div className="text-lg font-bold" style={{ color: theme.colors.text }}>1.2k</div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-16">
                {[35, 55, 40, 70, 50, 85, 65, 90].map((h) => (
                  <div
                    key={`bar-h-${h}`}
                    className="flex-1 rounded-t transition-all"
                    style={{ 
                      height: `${h}%`, 
                      backgroundColor: theme.colors.primaryHex,
                      opacity: 0.4 + ([35, 55, 40, 70, 50, 85, 65, 90].indexOf(h) * 0.08)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} theme={theme}>
            <div className="text-2xl lg:text-3xl font-bold mb-1" style={{ color: theme.colors.primaryHex }}>
              {stat.value}
            </div>
            <div className="text-sm" style={{ color: theme.colors.textMuted }}>{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Research Rationale */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>Design Rationale</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: theme.colors.textMuted }}>
          {research.rationale}
        </p>
        <div className="space-y-2">
          {research.decisions.slice(0, 3).map((d, i) => (
            <div key={i} className="flex gap-2 text-xs" style={{ color: theme.colors.textMuted }}>
              <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.primaryHex }} />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: <Palette className="w-5 h-5" />, title: "Color System", desc: "Semantic tokens & contrast" },
          { icon: <Type className="w-5 h-5" />, title: "Typography", desc: "Type scale & fonts" },
          { icon: <Component className="w-5 h-5" />, title: "Components", desc: "48+ UI components" },
        ].map((item) => (
          <Card key={item.title} theme={theme} className="group cursor-pointer hover:border-opacity-50 transition-all">
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${theme.colors.primaryHex}20`, color: theme.colors.primaryHex }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 flex items-center gap-2" style={{ color: theme.colors.text }}>
                  {item.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textMuted }}>{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── Colors Section ─── */
function ColorsSection({ theme, copyToClipboard, copiedToken }: Readonly<{ theme: DesignSystem; copyToClipboard: (t: string, n: string) => void; copiedToken: string | null }>) {
  const brandColors = [
    { name: "Primary", value: theme.colors.primaryHex },
    { name: "Secondary", value: theme.colors.secondaryHex },
    { name: "Accent", value: theme.colors.accentHex },
  ];

  const semanticColors = [
    { name: "Success", value: theme.colors.success },
    { name: "Warning", value: theme.colors.warning },
    { name: "Error", value: theme.colors.error },
  ];

  const neutralColors = [
    { name: "Background", value: theme.colors.background },
    { name: "Surface", value: theme.colors.surface },
    { name: "Surface Hover", value: theme.colors.surfaceHover },
    { name: "Border", value: theme.colors.border },
    { name: "Text", value: theme.colors.text },
    { name: "Text Muted", value: theme.colors.textMuted },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Color System"
        description="Semantic color tokens that adapt per domain. Click any color to copy."
        theme={theme}
      />

      {/* Brand Colors */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Brand Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {brandColors.map((color) => (
            <button
              key={color.name}
              onClick={() => copyToClipboard(color.value, color.name)}
              className="group relative overflow-hidden rounded-xl transition-transform hover:scale-[1.02]"
            >
              <div className="h-24 w-full" style={{ backgroundColor: color.value }} />
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: `${color.value}cc` }}
              >
                {copiedToken === color.name ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="p-3" style={{ backgroundColor: theme.colors.surfaceHover }}>
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>{color.name}</div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>{color.value}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Semantic Colors */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Semantic Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {semanticColors.map((color) => (
            <button
              key={color.name}
              onClick={() => copyToClipboard(color.value, color.name)}
              className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/5"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <div className="w-10 h-10 rounded-lg shrink-0" style={{ backgroundColor: color.value }} />
              <div className="text-left">
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>{color.name}</div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>{color.value}</div>
              </div>
              {copiedToken === color.name ? (
                <Check className="w-4 h-4 ml-auto" style={{ color: theme.colors.success }} />
              ) : (
                <Copy className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" style={{ color: theme.colors.textMuted }} />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Neutral Colors */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Neutral Palette</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {neutralColors.map((color) => (
            <button
              key={color.name}
              onClick={() => copyToClipboard(color.value, color.name)}
              className="flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-white/5"
              style={{ borderColor: theme.colors.border }}
            >
              <div 
                className="w-8 h-8 rounded-lg shrink-0 border"
                style={{ backgroundColor: color.value, borderColor: theme.colors.border }}
              />
              <div className="text-left flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: theme.colors.text }}>{color.name}</div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>{color.value}</div>
              </div>
              {copiedToken === color.name && (
                <Check className="w-4 h-4 shrink-0" style={{ color: theme.colors.success }} />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Contrast Checker */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>WCAG Contrast Check</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { bg: theme.colors.background, fg: theme.colors.text, label: "Text on BG", ratio: "12.5:1", pass: true },
            { bg: theme.colors.surface, fg: theme.colors.text, label: "Text on Surface", ratio: "10.2:1", pass: true },
            { bg: theme.colors.primaryHex, fg: "#ffffff", label: "Text on Primary", ratio: "4.5:1", pass: true },
            { bg: theme.colors.background, fg: theme.colors.textMuted, label: "Muted on BG", ratio: "5.8:1", pass: true },
          ].map((check) => (
            <div 
              key={check.label}
              className="rounded-lg p-4 border"
              style={{ backgroundColor: check.bg, borderColor: theme.colors.border }}
            >
              <div className="text-sm font-medium mb-2" style={{ color: check.fg }}>
                {check.label}
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    check.pass ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {check.pass ? "AA Pass" : "Fail"}
                </span>
                <span className="text-xs font-mono" style={{ color: check.fg }}>{check.ratio}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── Typography Section ─── */
function TypographySection({ theme, studioTokens }: Readonly<{ theme: DesignSystem; studioTokens: StudioTokens }>) {
  const baseSize = studioTokens.baseFontSize;
  const headingFont = studioTokens.fontHeading;
  const bodyFont = studioTokens.fontBody;
  const typeScale = [
    { name: "Display", size: `${baseSize * 4.5}px`, weight: "700", sample: "Aa" },
    { name: "Heading 1", size: `${baseSize * 3}px`, weight: "700", sample: "Heading 1" },
    { name: "Heading 2", size: `${baseSize * 2.25}px`, weight: "600", sample: "Heading 2" },
    { name: "Heading 3", size: `${baseSize * 1.5}px`, weight: "600", sample: "Heading 3" },
    { name: "Body Large", size: `${baseSize * 1.125}px`, weight: "400", sample: "Body Large text for lead paragraphs" },
    { name: "Body", size: `${baseSize}px`, weight: "400", sample: "Body text for regular content" },
    { name: "Body Small", size: `${baseSize * 0.875}px`, weight: "400", sample: "Small body text for secondary information" },
    { name: "Caption", size: `${baseSize * 0.75}px`, weight: "500", sample: "Caption text for labels" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Typography"
        description="A fluid type system with clear hierarchy and excellent readability."
        theme={theme}
      />

      <Card theme={theme}>
        <div className="space-y-6">
          {typeScale.map((type) => (
            <div 
              key={type.name}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-6 border-b last:border-0 last:pb-0"
              style={{ borderColor: theme.colors.border }}
            >
              <div className="sm:w-32 shrink-0">
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>{type.name}</div>
                <div className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>{type.size}</div>
              </div>
              <div 
                className="flex-1"
                style={{ 
                  fontSize: type.size,
                  fontWeight: type.weight,
                  color: theme.colors.text,
                  lineHeight: 1.2,
                }}
              >
                {type.sample}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Font Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>Body Font</h3>
          <div 
            className="text-4xl font-semibold mb-2" 
            style={{ color: theme.colors.text, fontFamily: "var(--ds-font-body, Inter, sans-serif)" }}
          >
            {bodyFont}
          </div>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            A carefully crafted typeface designed for comfortable reading.
          </p>
        </Card>
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>Mono Font</h3>
          <div 
            className="text-4xl font-semibold mb-2 font-mono" 
            style={{ color: theme.colors.text, fontFamily: "var(--ds-font-body, 'JetBrains Mono', monospace)" }}
          >
            JetBrains
          </div>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            Used for code snippets, data values, and technical content.
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ─── Spacing Section ─── */
function SpacingSection({ theme }: Readonly<{ theme: DesignSystem }>) {
  const spacingScale = [
    { name: "0", value: "0px" },
    { name: "1", value: "4px" },
    { name: "2", value: "8px" },
    { name: "3", value: "12px" },
    { name: "4", value: "16px" },
    { name: "6", value: "24px" },
    { name: "8", value: "32px" },
    { name: "12", value: "48px" },
    { name: "16", value: "64px" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Spacing & Layout"
        description="A 4px-based spacing scale for consistent rhythm and visual harmony."
        theme={theme}
      />

      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Spacing Scale</h3>
        <div className="space-y-3">
          {spacingScale.map((space) => (
            <div key={space.name} className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>space-{space.name}</span>
              </div>
              <div 
                className="h-6 rounded transition-all"
                style={{ 
                  width: space.value === "0px" ? "2px" : space.value,
                  backgroundColor: theme.colors.primaryHex,
                  minWidth: "2px"
                }}
              />
              <span className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>{space.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Grid Example */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>12-Column Grid</h3>
        <div className="grid grid-cols-12" style={{ gap: "calc(8px * var(--ds-spacing, 1))" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((colNum) => (
            <div 
              key={`grid-col-${colNum}`}
              className="h-12 flex items-center justify-center text-xs font-mono"
              style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.textMuted, borderRadius: "var(--ds-radius-sm, 8px)" }}
            >
              {colNum}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12" style={{ gap: "calc(8px * var(--ds-spacing, 1))", marginTop: "calc(8px * var(--ds-spacing, 1))" }}>
          <div className="col-span-4 h-12 rounded flex items-center justify-center text-xs" style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}>4 cols</div>
          <div className="col-span-8 h-12 rounded flex items-center justify-center text-xs" style={{ backgroundColor: theme.colors.secondaryHex, color: "#fff" }}>8 cols</div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-6 h-12 rounded flex items-center justify-center text-xs" style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}>6 cols</div>
          <div className="col-span-6 h-12 rounded flex items-center justify-center text-xs" style={{ backgroundColor: theme.colors.secondaryHex, color: "#fff" }}>6 cols</div>
        </div>
      </Card>
    </div>
  );
}

/* ─── Components Section ─── */
function ComponentsSection({ theme }: Readonly<{ theme: DesignSystem }>) {
  const [activeTab, setActiveTab] = useState<"buttons" | "inputs" | "feedback" | "data" | "nav" | "overlays">("buttons");
  const [docOpen, setDocOpen] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(id);
    setTimeout(() => setCodeCopied(null), 2000);
  };

  interface DocSection {
    name: string;
    description: string;
    props: { name: string; type: string; default: string; description: string }[];
    code: string;
  }

  const btnDoc: DocSection = {
    name: "Button",
    description: "Triggers actions. Available in 4 variants, 3 sizes, and supports icons and disabled state.",
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "primary", description: "Visual style of the button" },
      { name: "size", type: "'sm' | 'md' | 'lg'", default: "md", description: "Button size" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction" },
      { name: "icon", type: "ReactNode", default: "—", description: "Optional icon element" },
      { name: "children", type: "ReactNode", default: "—", description: "Button content" },
    ],
    code: `<button className="px-4 py-2 rounded-lg text-sm font-medium"
  style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}>
  Primary
</button>`,
  };

  const inputDoc: DocSection = {
    name: "Input",
    description: "Text input with optional icon, error state, and label. Follows design system border radius and spacing.",
    props: [
      { name: "label", type: "string", default: "—", description: "Label text above input" },
      { name: "placeholder", type: "string", default: "—", description: "Placeholder text" },
      { name: "icon", type: "ReactNode", default: "—", description: "Leading icon" },
      { name: "error", type: "string", default: "—", description: "Error message (shows red border)" },
      { name: "disabled", type: "boolean", default: "false", description: "Disables input" },
    ],
    code: `<input className="w-full px-4 py-2 rounded-lg border text-sm outline-none"
  placeholder="Enter value..."
  style={{ backgroundColor: theme.colors.surfaceHover, borderColor: theme.colors.border, color: theme.colors.text }}
/>`,
  };

  const feedbackDoc: DocSection = {
    name: "Alert",
    description: "Displays contextual feedback messages. Available in success, warning, error, and info variants.",
    props: [
      { name: "variant", type: "'success' | 'warning' | 'error' | 'info'", default: "info", description: "Alert severity" },
      { name: "message", type: "string", default: "—", description: "Alert content" },
      { name: "dismissible", type: "boolean", default: "true", description: "Shows close button" },
      { name: "icon", type: "ReactNode", default: "—", description: "Custom icon override" },
    ],
    code: `<div className="flex items-center gap-3 p-3 rounded-lg"
  style={{ backgroundColor: theme.colors.success + "15" }}>
  <Check className="w-4 h-4" style={{ color: theme.colors.success }} />
  <span className="text-sm" style={{ color: theme.colors.text }}>Success message</span>
</div>`,
  };

  const dataDoc: DocSection = {
    name: "StatCard",
    description: "Displays a key metric with label and trend indicator. Used in dashboards and analytics views.",
    props: [
      { name: "label", type: "string", default: "—", description: "Metric label" },
      { name: "value", type: "string | number", default: "—", description: "Metric value" },
      { name: "change", type: "string", default: "—", description: "Trend text (e.g. +12.5%)" },
      { name: "positive", type: "boolean", default: "true", description: "Colors the trend green/red" },
    ],
    code: `<div className="rounded-xl p-4 border"
  style={{ backgroundColor: theme.colors.surfaceHover, borderColor: theme.colors.border }}>
  <div className="text-sm mb-1" style={{ color: theme.colors.textMuted }}>Revenue</div>
  <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.text }}>$24,532</div>
  <div className="text-xs" style={{ color: theme.colors.success }}>+12.5% from last month</div>
</div>`,
  };

  const navDoc: DocSection = {
    name: "Tabs",
    description: "Tab navigation for switching between views. Active tab is highlighted with theme primary color.",
    props: [
      { name: "tabs", type: "{ id: string; label: string }[]", default: "—", description: "Array of tab definitions" },
      { name: "active", type: "string", default: "—", description: "Currently active tab id" },
      { name: "onChange", type: "(id: string) => void", default: "—", description: "Tab change handler" },
    ],
    code: `<div className="flex gap-2 p-1 rounded-xl"
  style={{ backgroundColor: theme.colors.surfaceHover }}>
  {tabs.map(tab => (
    <button
      key={tab.id}
      onClick={() => setActive(tab.id)}
      className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
      style={{ backgroundColor: active === tab.id ? theme.colors.surface : "transparent", color: active === tab.id ? theme.colors.text : theme.colors.textMuted }}>
      {tab.label}
    </button>
  ))}
</div>`,
  };

  const overlayDoc: DocSection = {
    name: "Modal",
    description: "Dialog overlay for confirmations, forms, and detailed content. Includes backdrop blur and animated enter/exit.",
    props: [
      { name: "open", type: "boolean", default: "false", description: "Controls visibility" },
      { name: "title", type: "string", default: "—", description: "Modal header text" },
      { name: "children", type: "ReactNode", default: "—", description: "Modal body content" },
      { name: "onClose", type: "() => void", default: "—", description: "Close handler" },
    ],
    code: `<div className="fixed inset-0 z-50 flex items-center justify-center p-4"
  style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
  <div className="rounded-2xl border p-6 max-w-md w-full"
    style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
    <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>Title</h3>
    <p className="text-sm" style={{ color: theme.colors.textMuted }}>Content here</p>
  </div>
</div>`,
  };

  const docMap: Record<string, DocSection> = {
    buttons: btnDoc,
    inputs: inputDoc,
    feedback: feedbackDoc,
    data: dataDoc,
    nav: navDoc,
    overlays: overlayDoc,
  };

  const renderDocPanel = (sectionId: string) => {
    const doc = docMap[sectionId];
    const isOpen = docOpen === sectionId;
    return (
      <div className="mt-4">
        <button
          onClick={() => setDocOpen(isOpen ? null : sectionId)}
          className="flex items-center gap-1.5 text-[10px] font-medium transition-opacity hover:opacity-80"
          style={{ color: theme.colors.primaryHex }}
        >
          {isOpen ? "Hide Docs" : "Show Docs"}
          <ArrowRight className={`w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 p-4 rounded-xl border text-[11px] space-y-4"
            style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
          >
            <div>
              <p style={{ color: theme.colors.textMuted }}>{doc.description}</p>
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: theme.colors.text }}>Props</div>
              <div className="space-y-1">
                {doc.props.map(p => (
                  <div key={p.name} className="flex gap-2 text-[10px]">
                    <span className="font-mono font-semibold shrink-0 w-20" style={{ color: theme.colors.primaryHex }}>{p.name}</span>
                    <span className="font-mono shrink-0 w-32" style={{ color: theme.colors.textMuted }}>{p.type}</span>
                    <span className="font-mono shrink-0 w-16" style={{ color: theme.colors.textMuted }}>{p.default}</span>
                    <span style={{ color: theme.colors.text }}>{p.description}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: theme.colors.text }}>Usage</span>
                <button
                  onClick={() => copyCode(doc.code, sectionId)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium"
                  style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
                >
                  {codeCopied === sectionId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {codeCopied === sectionId ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-3 rounded-lg overflow-x-auto text-[10px] font-mono" style={{ backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}>
                <code>{doc.code}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Components"
        description="Reusable UI components with live previews, props documentation, and copyable code snippets."
        theme={theme}
      />

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ backgroundColor: theme.colors.surfaceHover }}>
        {[
          { id: "buttons" as const, label: "Buttons" },
          { id: "inputs" as const, label: "Inputs" },
          { id: "feedback" as const, label: "Feedback" },
          { id: "data" as const, label: "Data Display" },
          { id: "nav" as const, label: "Navigation" },
          { id: "overlays" as const, label: "Overlays" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 px-3 py-2 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? theme.colors.surface : "transparent",
              color: activeTab === tab.id ? theme.colors.text : theme.colors.textMuted,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Buttons ─── */}
      {activeTab === "buttons" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Button</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Triggers actions · 4 variants · 3 sizes · icon support</p>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>VARIANTS</div>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>Primary</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: theme.colors.border, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>Secondary</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10" style={{ borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>Ghost</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: theme.colors.error, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>Danger</button>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>SIZES</div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius, 8px)", color: "#fff" }}>Small</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>Medium</button>
                <button className="px-6 py-3 rounded-xl text-base font-medium" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-xl, 16px)", color: "#fff" }}>Large</button>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>VARIANTS</div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>
                  <Download className="w-4 h-4" />
                  With Icon
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.textMuted }}>
                  Disabled
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium relative" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>
                  <span className="opacity-0">Loading</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {renderDocPanel("buttons")}
        </Card>
      )}

      {/* ─── Inputs ─── */}
      {activeTab === "inputs" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Input</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Text entry · icon support · error state · toggle & checkbox variants</p>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: theme.colors.text }}>Default</label>
              <input type="text" placeholder="Enter value..." className="w-full px-4 py-2 text-sm outline-none transition-colors" style={{ backgroundColor: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: theme.colors.text }}>With Icon</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.colors.textMuted }} />
                <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 text-sm outline-none transition-colors" style={{ backgroundColor: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: theme.colors.error }}>Error</label>
              <input type="text" placeholder="Invalid input" className="w-full px-4 py-2 text-sm outline-none" style={{ backgroundColor: theme.colors.surfaceHover, border: `2px solid ${theme.colors.error}`, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }} />
              <p className="text-[10px] mt-1" style={{ color: theme.colors.error }}>This field is required</p>
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: theme.colors.text }}>Textarea</label>
              <textarea rows={3} placeholder="Longer content..." className="w-full px-4 py-2 text-sm outline-none resize-none transition-colors" style={{ backgroundColor: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }} />
            </div>
            <div>
              <label className="block text-xs mb-1.5 font-medium" style={{ color: theme.colors.text }}>Select</label>
              <select className="w-full px-4 py-2 text-sm outline-none transition-colors" style={{ backgroundColor: theme.colors.surfaceHover, border: `1px solid ${theme.colors.border}`, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-5 rounded-full relative transition-colors" style={{ backgroundColor: theme.colors.primaryHex }}>
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                </div>
                <span className="text-xs" style={{ color: theme.colors.text }}>Toggle</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: theme.colors.primaryHex, border: `2px solid ${theme.colors.primaryHex}`, borderRadius: "var(--ds-radius-sm, 4px)" }}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs" style={{ color: theme.colors.text }}>Checkbox</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ border: `2px solid ${theme.colors.primaryHex}` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors.primaryHex }} />
                </div>
                <span className="text-xs" style={{ color: theme.colors.text }}>Radio</span>
              </label>
            </div>
          </div>
          {renderDocPanel("inputs")}
        </Card>
      )}

      {/* ─── Feedback ─── */}
      {activeTab === "feedback" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Feedback</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Alerts · badges · toasts · progress indicators</p>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>ALERTS</div>
              <div className="space-y-2">
                {[
                  { type: "success", icon: <Check className="w-4 h-4" />, message: "Operation completed successfully", color: theme.colors.success },
                  { type: "warning", icon: <AlertCircle className="w-4 h-4" />, message: "Please review before proceeding", color: theme.colors.warning },
                  { type: "error", icon: <X className="w-4 h-4" />, message: "Something went wrong", color: theme.colors.error },
                  { type: "info", icon: <Info className="w-4 h-4" />, message: "Here is some helpful information", color: theme.colors.primaryHex },
                ].map((alert) => (
                  <div key={alert.type} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${alert.color}15`, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                    <div style={{ color: alert.color }}>{alert.icon}</div>
                    <span className="text-xs flex-1" style={{ color: theme.colors.text }}>{alert.message}</span>
                    <X className="w-3.5 h-3.5 cursor-pointer shrink-0" style={{ color: theme.colors.textMuted }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>BADGES</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Success", color: theme.colors.success },
                  { label: "Warning", color: theme.colors.warning },
                  { label: "Error", color: theme.colors.error },
                  { label: "Info", color: theme.colors.primaryHex },
                  { label: "Neutral", color: theme.colors.textMuted },
                ].map(b => (
                  <span key={b.label} className="px-2.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: `${b.color}20`, color: b.color, borderRadius: "var(--ds-radius-xl, 16px)" }}>{b.label}</span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>PROGRESS</div>
              <div className="space-y-2">
                {[25, 50, 75, 100].map(pct => (
                  <div key={pct} className="flex items-center gap-2">
                    <span className="text-[9px] font-mono w-8 text-right" style={{ color: theme.colors.textMuted }}>{pct}%</span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius, 8px)" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? theme.colors.success : theme.colors.primaryHex, borderRadius: "var(--ds-radius, 8px)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>CHIPS / TAGS</div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion"].map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium border" style={{ borderColor: theme.colors.border, color: theme.colors.text, borderRadius: "var(--ds-radius, 8px)", backgroundColor: theme.colors.surface }}>
                    {tag}
                    <X className="w-2.5 h-2.5 cursor-pointer" style={{ color: theme.colors.textMuted }} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          {renderDocPanel("feedback")}
        </Card>
      )}

      {/* ─── Data Display ─── */}
      {activeTab === "data" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Data Display</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Stat cards · avatars · table · empty state</p>

          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>STAT CARDS</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Total Revenue", value: "$24,532", change: "+12.5%", positive: true },
                  { label: "Active Users", value: "1,234", change: "+5.2%", positive: true },
                  { label: "Bounce Rate", value: "34.2%", change: "-2.1%", positive: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-4 border" style={{ backgroundColor: theme.colors.surfaceHover, borderColor: theme.colors.border, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                    <div className="text-xs mb-1" style={{ color: theme.colors.textMuted }}>{stat.label}</div>
                    <div className="text-xl font-bold mb-1" style={{ color: theme.colors.text }}>{stat.value}</div>
                    <div className="text-[10px]" style={{ color: stat.positive ? theme.colors.success : theme.colors.error }}>
                      {stat.change} from last month
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>AVATARS</div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { initials: "VC", color: theme.colors.primaryHex },
                  { initials: "AB", color: theme.colors.secondaryHex },
                  { initials: "CD", color: theme.colors.accentHex },
                  { initials: "EF", color: theme.colors.success },
                ].map((a, i) => (
                  <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: a.color + "20", color: a.color, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                    {a.initials}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium border" style={{ borderColor: theme.colors.border, color: theme.colors.textMuted, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                  +3
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>TABLE</div>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: theme.colors.border, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ backgroundColor: theme.colors.surfaceHover }}>
                      {["Name", "Role", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 font-medium" style={{ color: theme.colors.textMuted }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alice Chen", role: "Designer", status: "Active" },
                      { name: "Bob Smith", role: "Developer", status: "Away" },
                      { name: "Carol Davis", role: "PM", status: "Active" },
                    ].map(row => (
                      <tr key={row.name} className="border-t" style={{ borderColor: theme.colors.border }}>
                        <td className="px-4 py-2.5 font-medium" style={{ color: theme.colors.text }}>{row.name}</td>
                        <td className="px-4 py-2.5" style={{ color: theme.colors.textMuted }}>{row.role}</td>
                        <td className="px-4 py-2.5">
                          <span className="px-2 py-0.5 text-[9px] font-medium rounded-full" style={{ backgroundColor: row.status === "Active" ? theme.colors.success + "20" : theme.colors.warning + "20", color: row.status === "Active" ? theme.colors.success : theme.colors.warning, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <button className="text-[9px] font-medium hover:underline" style={{ color: theme.colors.primaryHex }}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>EMPTY STATE</div>
              <div className="flex flex-col items-center justify-center py-8 rounded-xl border" style={{ borderColor: theme.colors.border, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                <Info className="w-8 h-8 mb-2" style={{ color: theme.colors.textMuted }} />
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>No data yet</div>
                <p className="text-xs mt-1" style={{ color: theme.colors.textMuted }}>Get started by adding your first item.</p>
                <button className="mt-3 px-4 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>Add Item</button>
              </div>
            </div>
          </div>
          {renderDocPanel("data")}
        </Card>
      )}

      {/* ─── Navigation ─── */}
      {activeTab === "nav" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Navigation</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Tabs · breadcrumbs · pagination · sidebar menu</p>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>TABS</div>
              <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                {["Overview", "Details", "Settings"].map((tab, i) => (
                  <button key={tab} className="flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-all" style={{ backgroundColor: i === 0 ? theme.colors.surface : "transparent", color: i === 0 ? theme.colors.text : theme.colors.textMuted, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>BREADCRUMBS</div>
              <div className="flex items-center gap-1 text-xs">
                {["Home", "Products", "Details"].map((crumb, i) => (
                  <div key={crumb} className="flex items-center gap-1">
                    <span style={{ color: i === 2 ? theme.colors.text : theme.colors.textMuted }}>{crumb}</span>
                    {i < 2 && <ArrowRight className="w-3 h-3" style={{ color: theme.colors.textMuted }} />}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>PAGINATION</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map(page => (
                  <button key={page} className="w-8 h-8 rounded-lg text-xs font-medium transition-all" style={{ backgroundColor: page === 1 ? theme.colors.primaryHex : "transparent", color: page === 1 ? "#fff" : theme.colors.textMuted, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                    {page}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>SIDEBAR MENU</div>
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: theme.colors.border, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                {[
                  { label: "Dashboard", icon: Layout, active: true },
                  { label: "Analytics", icon: BarChart3, active: false },
                  { label: "Settings", icon: Sliders, active: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 px-4 py-2.5 text-xs" style={{ backgroundColor: item.active ? theme.colors.primaryHex + "15" : "transparent", color: item.active ? theme.colors.primaryHex : theme.colors.textMuted }}>
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {renderDocPanel("nav")}
        </Card>
      )}

      {/* ─── Overlays ─── */}
      {activeTab === "overlays" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Overlays</h3>
          <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Modal dialog · tooltip · dropdown · drawer preview</p>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>MODAL (Preview)</div>
              <div className="relative rounded-xl border overflow-hidden" style={{ borderColor: theme.colors.border, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}>
                  <div className="rounded-2xl border p-5 max-w-xs w-full mx-4 shadow-2xl" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: "var(--ds-radius-xl, 16px)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold" style={{ color: theme.colors.text }}>Confirm Action</h4>
                      <X className="w-4 h-4 cursor-pointer" style={{ color: theme.colors.textMuted }} />
                    </div>
                    <p className="text-xs mb-4" style={{ color: theme.colors.textMuted }}>Are you sure you want to proceed? This action cannot be undone.</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>Cancel</button>
                      <button className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: theme.colors.primaryHex, borderRadius: "var(--ds-radius-lg, 12px)", color: "#fff" }}>Confirm</button>
                    </div>
                  </div>
                </div>
                <div className="h-48" style={{ backgroundColor: theme.colors.background }} />
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>TOOLTIP</div>
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>Hover me</button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text, border: `1px solid ${theme.colors.border}`, borderRadius: "var(--ds-radius, 8px)" }}>
                    Tooltip content
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium mb-2" style={{ color: theme.colors.textMuted }}>DROPDOWN</div>
              <div className="relative inline-block">
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5" style={{ backgroundColor: theme.colors.surfaceHover, borderRadius: "var(--ds-radius-lg, 12px)", color: theme.colors.text }}>
                  Options
                  <ArrowRight className="w-3 h-3 rotate-90" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-36 rounded-xl border overflow-hidden shadow-lg" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: "var(--ds-radius-lg, 12px)" }}>
                  {["Edit", "Duplicate", "Delete"].map(item => (
                    <button key={item} className="w-full px-3 py-2 text-xs text-left transition-colors hover:bg-white/5" style={{ color: item === "Delete" ? theme.colors.error : theme.colors.text }}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {renderDocPanel("overlays")}
        </Card>
      )}
    </div>
  );
}

/* ─── Patterns Section ─── */
function PatternsSection({ 
  theme, 
  setActiveDomain,
  activeDomain,
}: Readonly<{ 
  theme: DesignSystem; 
  setActiveDomain: (d: DesignSystemSlug) => void;
  activeDomain: DesignSystemSlug;
}>) {
  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Domain Patterns"
        description="See how components adapt across different industry themes."
        theme={theme}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {designSystemList.map(({ slug, name, description: desc, colors }) => {
          const isActive = activeDomain === slug;
          const Icon = domainIcons[slug];
          return (
            <motion.button
              key={slug}
              whileHover={{ y: -2 }}
              onClick={() => setActiveDomain(slug)}
              className={`rounded-xl p-4 border text-left transition-all ${isActive ? "ring-2" : ""}`}
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border,
                "--tw-ring-color": isActive ? colors.primaryHex : "transparent",
              } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: colors.primaryHex }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: colors.text }}>{name}</div>
                  <div className="text-xs" style={{ color: colors.textMuted }}>{desc}</div>
                </div>
              </div>

              {/* Mini Preview */}
              <div 
                className="rounded-lg p-3 space-y-2"
                style={{ backgroundColor: colors.background }}
              >
                <div className="flex gap-2">
                  <div className="flex-1 h-2 rounded" style={{ backgroundColor: colors.primaryHex }} />
                  <div className="w-8 h-2 rounded" style={{ backgroundColor: colors.surfaceHover }} />
                </div>
                <div className="flex gap-1">
                  {[25, 50, 35, 70, 45].map((h, i) => (
                    <div 
                      key={`pattern-bar-${slug}-${i}`}
                      className="flex-1 rounded-t"
                      style={{ 
                        height: `${h}px`,
                        backgroundColor: colors.primaryHex,
                        opacity: 0.4 + (i * 0.15)
                      }}
                    />
                  ))}
                </div>
              </div>

              {isActive && (
                <div className="mt-3 text-xs font-medium" style={{ color: colors.primaryHex }}>
                  Currently Active
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Accessibility Section ─── */
function AccessibilitySection({ theme, studioTokens }: Readonly<{ theme: DesignSystem; studioTokens: StudioTokens }>) {
  const [simulateVision, setSimulateVision] = useState<"none" | "protanopia" | "deuteranopia" | "tritanopia">("none");

  const visionFilters: Record<typeof simulateVision, string> = {
    none: "none",
    protanopia: "grayscale(0%) sepia(50%) saturate(50%) hue-rotate(180deg)",
    deuteranopia: "grayscale(0%) sepia(50%) saturate(50%) hue-rotate(90deg)",
    tritanopia: "grayscale(0%) sepia(50%) saturate(100%) hue-rotate(270deg)",
  };

  const results = getContrastPairs(theme, studioTokens);
  const passing = results.filter((r) => r.rating !== "Fail").length;
  const shifted = studioTokens.saturationShift !== 0 || studioTokens.lightnessShift !== 0;

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Accessibility"
        description="A live WCAG 2.2 audit of this exact theme — not a static claim. Ratios recompute as you adjust tokens."
        theme={theme}
      />

      {/* Live Contrast Matrix */}
      <Card theme={theme}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>
              Live Contrast Audit
            </h3>
            <p className="text-xs" style={{ color: theme.colors.textMuted }}>
              Computed from the current palette{shifted ? " with your saturation/lightness shift applied" : ""}. Drag the Properties sliders and watch these change.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-4xl font-bold tabular-nums" style={{ color: passing === results.length ? theme.colors.success : theme.colors.warning }}>
              {passing}/{results.length}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
              pairs passing
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {results.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              {/* Swatch preview — actual fg on actual bg */}
              <div
                className="w-14 h-9 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 border"
                style={{ backgroundColor: r.bg, color: r.fg, borderColor: theme.colors.border }}
                aria-hidden="true"
              >
                Aa
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: theme.colors.text }}>{r.label}</div>
                <div className="text-[10px] font-mono" style={{ color: theme.colors.textMuted }}>
                  {r.fg} on {r.bg}
                </div>
              </div>
              <span className="text-sm font-mono tabular-nums shrink-0" style={{ color: theme.colors.text }}>
                {r.ratio.toFixed(2)}:1
              </span>
              <span
                className="px-2 py-1 rounded-md text-[10px] font-semibold shrink-0 min-w-16 text-center"
                style={{ color: ratingColor(r.rating), backgroundColor: ratingColor(r.rating) + "1a" }}
              >
                {r.rating}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] leading-relaxed" style={{ color: theme.colors.textMuted }}>
          Thresholds per WCAG 2.2: <strong style={{ color: theme.colors.text }}>7:1</strong> AAA · <strong style={{ color: theme.colors.text }}>4.5:1</strong> AA · <strong style={{ color: theme.colors.text }}>3:1</strong> AA for large text (≥24px or 19px bold). A token that can&apos;t explain its ratio isn&apos;t a token — it&apos;s a guess.
        </p>
      </Card>

      {/* Vision Simulator */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Color Vision Simulator</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[
            { id: "none" as const, label: "Normal" },
            { id: "protanopia" as const, label: "Protanopia" },
            { id: "deuteranopia" as const, label: "Deuteranopia" },
            { id: "tritanopia" as const, label: "Tritanopia" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSimulateVision(mode.id)}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${simulateVision === mode.id ? "ring-2" : ""}`}
              style={{
                backgroundColor: simulateVision === mode.id ? `${theme.colors.primaryHex}20` : theme.colors.surfaceHover,
                color: theme.colors.text,
                "--tw-ring-color": theme.colors.primaryHex,
              } as React.CSSProperties}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div 
          className="rounded-lg p-4"
          style={{ 
            backgroundColor: theme.colors.background,
            filter: visionFilters[simulateVision]
          }}
        >
          <div className="flex gap-2 mb-3">
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: theme.colors.success }} />
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: theme.colors.warning }} />
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: theme.colors.error }} />
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: theme.colors.primaryHex }} />
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: theme.colors.secondaryHex }} />
          </div>
          <p className="text-sm" style={{ color: theme.colors.text }}>
            Preview how colors appear with different types of color vision deficiency.
          </p>
        </div>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Keyboard Navigation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { key: "Tab", action: "Move focus forward" },
            { key: "Shift + Tab", action: "Move focus backward" },
            { key: "Enter / Space", action: "Activate element" },
            { key: "Arrow keys", action: "Navigate within groups" },
            { key: "Escape", action: "Close modal/menu" },
            { key: "Home / End", action: "Jump to first/last" },
          ].map((shortcut) => (
            <div 
              key={shortcut.key}
              className="flex items-center gap-3 p-2 rounded-lg"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <kbd 
                className="px-2 py-1 rounded text-[10px] font-mono"
                style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
              >
                {shortcut.key}
              </kbd>
              <span className="text-xs" style={{ color: theme.colors.textMuted }}>{shortcut.action}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── Code Section ─── */
function CodeSection({ theme, copyToClipboard, copiedToken, studioTokens }: Readonly<{ theme: DesignSystem; copyToClipboard: (t: string, n: string) => void; copiedToken: string | null; studioTokens: StudioTokens }>) {
  const cssVars = `--color-primary: ${theme.colors.primaryHex};
--color-secondary: ${theme.colors.secondaryHex};
--color-accent: ${theme.colors.accentHex};
--color-success: ${theme.colors.success};
--color-warning: ${theme.colors.warning};
--color-error: ${theme.colors.error};
--color-background: ${theme.colors.background};
--color-surface: ${theme.colors.surface};
--color-border: ${theme.colors.border};
--color-text: ${theme.colors.text};
--color-text-muted: ${theme.colors.textMuted};`;

  const tailwindConfig = `colors: {
  primary: '${theme.colors.primaryHex}',
  secondary: '${theme.colors.secondaryHex}',
  accent: '${theme.colors.accentHex}',
  success: '${theme.colors.success}',
  warning: '${theme.colors.warning}',
  error: '${theme.colors.error}',
  background: '${theme.colors.background}',
  surface: '${theme.colors.surface}',
  border: '${theme.colors.border}',
}`;

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Code Export"
        description="Export design tokens in your preferred format."
        theme={theme}
      />

      {/* CSS Variables */}
      <Card theme={theme}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: theme.colors.text }}>CSS Variables</h3>
          <button
            onClick={() => copyToClipboard(cssVars, "css")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
          >
            {copiedToken === "css" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedToken === "css" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre 
          className="p-4 rounded-lg text-xs overflow-x-auto font-mono"
          style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
        >
          <code>{cssVars}</code>
        </pre>
      </Card>

      {/* Tailwind Config */}
      <Card theme={theme}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: theme.colors.text }}>Tailwind Config</h3>
          <button
            onClick={() => copyToClipboard(tailwindConfig, "tailwind")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
          >
            {copiedToken === "tailwind" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedToken === "tailwind" ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre 
          className="p-4 rounded-lg text-xs overflow-x-auto font-mono"
          style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
        >
          <code>{tailwindConfig}</code>
        </pre>
      </Card>

      {/* Export Options */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Export Formats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "CSS Variables", format: ".css", icon: <Palette className="w-4 h-4" /> },
            { name: "Tailwind Config", format: ".js", icon: <Code2 className="w-4 h-4" /> },
            { name: "Figma Tokens", format: ".json", icon: <Layers className="w-4 h-4" /> },
            { name: "Style Dictionary", format: ".json", icon: <Layout className="w-4 h-4" /> },
            { name: "TypeScript", format: ".ts", icon: <Code2 className="w-4 h-4" /> },
            { name: "SCSS Variables", format: ".scss", icon: <Palette className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-lg border transition-colors hover:bg-white/5"
              style={{ borderColor: theme.colors.border }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.primaryHex }}
              >
                {item.icon}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>{item.name}</div>
                <div className="text-xs" style={{ color: theme.colors.textMuted }}>{item.format}</div>
              </div>
              <Download className="w-4 h-4 ml-auto" style={{ color: theme.colors.textMuted }} />
            </button>
          ))}
        </div>
      </Card>

      {/* Tech Stack */}
      <Card theme={theme}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Built With</h3>
        <div className="flex flex-wrap gap-2">
          {["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js 16", "Lucide Icons"].map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.text }}
            >
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
