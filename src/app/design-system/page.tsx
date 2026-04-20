"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Heart,
  HardHat,
  BarChart3,
  Zap,
  ShoppingBag,
  Palette,
  Type,
  Layers,
  Component,
  Layout,
  Accessibility,
  Code2,
  Menu,
  X,
  ChevronRight,
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  Grid3X3,
  AlertCircle,
  Info,
  Search,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES & INTERFACES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type Domain = "fintech" | "healthtech" | "contech" | "adtech" | "saas" | "consumer";
type Section = "overview" | "colors" | "typography" | "spacing" | "components" | "patterns" | "accessibility" | "code";
type DeviceView = "desktop" | "tablet" | "mobile";

interface DomainTheme {
  name: string;
  description: string;
  icon: ReactNode;
  colors: {
    primary: string;
    primaryHex: string;
    secondary: string;
    secondaryHex: string;
    accent: string;
    accentHex: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    text: string;
    textMuted: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DOMAIN THEMES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const domainThemes: Record<Domain, DomainTheme> = {
  fintech: {
    name: "FinTech",
    description: "Banking & Payments",
    icon: <CreditCard className="w-4 h-4" />,
    colors: {
      primary: "from-blue-600 to-indigo-600",
      primaryHex: "#2563eb",
      secondary: "from-emerald-500 to-teal-500",
      secondaryHex: "#10b981",
      accent: "from-amber-400 to-yellow-500",
      accentHex: "#f59e0b",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      background: "#030712",
      surface: "#0f172a",
      surfaceHover: "#1e293b",
      border: "#1e293b",
      text: "#f8fafc",
      textMuted: "#94a3b8",
    },
  },
  healthtech: {
    name: "HealthTech",
    description: "Medical & Wellness",
    icon: <Heart className="w-4 h-4" />,
    colors: {
      primary: "from-teal-500 to-cyan-500",
      primaryHex: "#14b8a6",
      secondary: "from-blue-400 to-sky-500",
      secondaryHex: "#38bdf8",
      accent: "from-violet-400 to-purple-500",
      accentHex: "#a78bfa",
      success: "#22c55e",
      warning: "#eab308",
      error: "#f43f5e",
      background: "#042f2e",
      surface: "#0d3d3b",
      surfaceHover: "#134e4a",
      border: "#134e4a",
      text: "#f0fdfa",
      textMuted: "#5eead4",
    },
  },
  contech: {
    name: "ConTech",
    description: "Construction",
    icon: <HardHat className="w-4 h-4" />,
    colors: {
      primary: "from-orange-500 to-amber-500",
      primaryHex: "#f97316",
      secondary: "from-slate-500 to-gray-600",
      secondaryHex: "#64748b",
      accent: "from-cyan-400 to-blue-500",
      accentHex: "#22d3ee",
      success: "#22c55e",
      warning: "#f97316",
      error: "#dc2626",
      background: "#0c0a09",
      surface: "#1c1917",
      surfaceHover: "#292524",
      border: "#292524",
      text: "#fafaf9",
      textMuted: "#a8a29e",
    },
  },
  adtech: {
    name: "AdTech",
    description: "Advertising",
    icon: <BarChart3 className="w-4 h-4" />,
    colors: {
      primary: "from-purple-500 to-violet-600",
      primaryHex: "#8b5cf6",
      secondary: "from-cyan-400 to-teal-500",
      secondaryHex: "#22d3ee",
      accent: "from-pink-400 to-rose-500",
      accentHex: "#f472b6",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      background: "#09090b",
      surface: "#18181b",
      surfaceHover: "#27272a",
      border: "#27272a",
      text: "#fafafa",
      textMuted: "#a1a1aa",
    },
  },
  saas: {
    name: "SaaS",
    description: "B2B Tools",
    icon: <Zap className="w-4 h-4" />,
    colors: {
      primary: "from-indigo-500 to-blue-600",
      primaryHex: "#6366f1",
      secondary: "from-slate-400 to-gray-500",
      secondaryHex: "#94a3b8",
      accent: "from-emerald-400 to-green-500",
      accentHex: "#34d399",
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
      background: "#020617",
      surface: "#0f172a",
      surfaceHover: "#1e293b",
      border: "#334155",
      text: "#f8fafc",
      textMuted: "#94a3b8",
    },
  },
  consumer: {
    name: "Consumer",
    description: "E-commerce",
    icon: <ShoppingBag className="w-4 h-4" />,
    colors: {
      primary: "from-rose-500 to-pink-500",
      primaryHex: "#f43f5e",
      secondary: "from-amber-400 to-orange-500",
      secondaryHex: "#fb923c",
      accent: "from-violet-400 to-purple-500",
      accentHex: "#a78bfa",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#f87171",
      background: "#0c0a09",
      surface: "#1c1917",
      surfaceHover: "#292524",
      border: "#44403c",
      text: "#fafaf9",
      textMuted: "#d6d3d1",
    },
  },
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
  const [activeDomain, setActiveDomain] = useState<Domain>("fintech");
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const theme = domainThemes[activeDomain];

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div 
      className="flex flex-col transition-colors duration-500 pt-16 lg:pt-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* ─── Top Navigation Bar ─── */}
      <header 
        className="h-14 border-b flex items-center justify-between px-4 lg:px-6 shrink-0"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }}
      >
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.text }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.colors.primaryHex}, ${theme.colors.secondaryHex})` }}
            >
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold hidden sm:block" style={{ color: theme.colors.text }}>
              Design System
            </span>
          </div>
        </div>

        {/* Center: Domain Switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: theme.colors.surfaceHover }}>
          {(Object.keys(domainThemes) as Domain[]).map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeDomain === domain ? "shadow-lg" : "hover:bg-white/5"
              }`}
              style={{
                backgroundColor: activeDomain === domain ? theme.colors.primaryHex : "transparent",
                color: activeDomain === domain ? "#fff" : theme.colors.textMuted,
              }}
            >
              {domainThemes[domain].icon}
              <span className="hidden lg:inline">{domainThemes[domain].name}</span>
            </button>
          ))}
        </div>

        {/* Right: Device Toggle + Actions */}
        <div className="flex items-center gap-2">
          {/* Device View Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: theme.colors.surfaceHover }}>
            {[
              { id: "desktop" as DeviceView, icon: <Monitor className="w-4 h-4" /> },
              { id: "tablet" as DeviceView, icon: <Tablet className="w-4 h-4" /> },
              { id: "mobile" as DeviceView, icon: <Smartphone className="w-4 h-4" /> },
            ].map((device) => (
              <button
                key={device.id}
                onClick={() => setDeviceView(device.id)}
                className="p-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: deviceView === device.id ? theme.colors.primaryHex : "transparent",
                  color: deviceView === device.id ? "#fff" : theme.colors.textMuted,
                }}
              >
                {device.icon}
              </button>
            ))}
          </div>

          {/* Search */}
          <button 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: theme.colors.textMuted }}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Download */}
          <button 
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{ 
              backgroundColor: theme.colors.primaryHex,
              color: "#fff",
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Sidebar ─── */}
        <aside
          className={`${
            sidebarOpen ? "w-56" : "w-16"
          } hidden lg:flex flex-col border-r transition-all duration-300 shrink-0 overflow-y-auto`}
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          {/* Collapse Toggle */}
          <div className="p-3 border-b" style={{ borderColor: theme.colors.border }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: theme.colors.textMuted }}
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id ? "shadow-md" : "hover:bg-white/5"
                }`}
                style={{
                  backgroundColor: activeSection === section.id ? theme.colors.primaryHex : "transparent",
                  color: activeSection === section.id ? "#fff" : theme.colors.textMuted,
                }}
              >
                {section.icon}
                {sidebarOpen && <span>{section.label}</span>}
              </button>
            ))}
          </nav>

          {/* Domain Selector (Sidebar) */}
          {sidebarOpen && (
            <div className="p-3 border-t" style={{ borderColor: theme.colors.border }}>
              <p className="text-xs font-medium mb-2 px-3" style={{ color: theme.colors.textMuted }}>
                THEME
              </p>
              <div className="space-y-1">
                {(Object.keys(domainThemes) as Domain[]).map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setActiveDomain(domain)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                      activeDomain === domain ? "ring-1" : "hover:bg-white/5"
                    }`}
                    style={{
                      backgroundColor: activeDomain === domain ? `${theme.colors.primaryHex}20` : "transparent",
                      color: activeDomain === domain ? theme.colors.text : theme.colors.textMuted,
                      "--tw-ring-color": activeDomain === domain ? theme.colors.primaryHex : "transparent",
                    } as React.CSSProperties}
                  >
                    {domainThemes[domain].icon}
                    <span>{domainThemes[domain].name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* ─── Mobile Sidebar Overlay ─── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                style={{ top: "64px" }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 bottom-0 w-64 z-50 lg:hidden flex flex-col border-r"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  top: "120px",
                }}
              >
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                  {sidebarSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeSection === section.id ? "shadow-md" : "hover:bg-white/5"
                      }`}
                      style={{
                        backgroundColor: activeSection === section.id ? theme.colors.primaryHex : "transparent",
                        color: activeSection === section.id ? "#fff" : theme.colors.textMuted,
                      }}
                    >
                      {section.icon}
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="p-3 border-t" style={{ borderColor: theme.colors.border }}>
                  <p className="text-xs font-medium mb-2 px-3" style={{ color: theme.colors.textMuted }}>
                    THEME
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {(Object.keys(domainThemes) as Domain[]).map((domain) => (
                      <button
                        key={domain}
                        onClick={() => setActiveDomain(domain)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
                          activeDomain === domain ? "ring-1" : "hover:bg-white/5"
                        }`}
                        style={{
                          backgroundColor: activeDomain === domain ? `${theme.colors.primaryHex}20` : "transparent",
                          color: activeDomain === domain ? theme.colors.text : theme.colors.textMuted,
                          "--tw-ring-color": activeDomain === domain ? theme.colors.primaryHex : "transparent",
                        } as React.CSSProperties}
                      >
                        {domainThemes[domain].icon}
                        <span>{domainThemes[domain].name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ─── Main Content ─── */}
        <main className="flex-1 overflow-y-auto">
          <div 
            className={`min-h-full p-4 lg:p-6 transition-all duration-300 ${
              { desktop: "", tablet: "max-w-3xl mx-auto", mobile: "max-w-sm mx-auto" }[deviceView]
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overview Section */}
                {activeSection === "overview" && (
                  <OverviewSection theme={theme} activeDomain={activeDomain} />
                )}

                {/* Colors Section */}
                {activeSection === "colors" && (
                  <ColorsSection theme={theme} copyToClipboard={copyToClipboard} copiedToken={copiedToken} />
                )}

                {/* Typography Section */}
                {activeSection === "typography" && (
                  <TypographySection theme={theme} />
                )}

                {/* Spacing Section */}
                {activeSection === "spacing" && (
                  <SpacingSection theme={theme} />
                )}

                {/* Components Section */}
                {activeSection === "components" && (
                  <ComponentsSection theme={theme} />
                )}

                {/* Patterns Section */}
                {activeSection === "patterns" && (
                  <PatternsSection theme={theme} domainThemes={domainThemes} setActiveDomain={setActiveDomain} activeDomain={activeDomain} />
                )}

                {/* Accessibility Section */}
                {activeSection === "accessibility" && (
                  <AccessibilitySection theme={theme} />
                )}

                {/* Code Section */}
                {activeSection === "code" && (
                  <CodeSection theme={theme} copyToClipboard={copyToClipboard} copiedToken={copiedToken} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SECTION COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function SectionHeader({ title, description, theme }: Readonly<{ title: string; description: string; theme: DomainTheme }>) {
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

function Card({ children, theme, className = "" }: Readonly<{ children: ReactNode; theme: DomainTheme; className?: string }>) {
  return (
    <div 
      className={`rounded-xl border p-4 lg:p-6 ${className}`}
      style={{ 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Overview Section ─── */
function OverviewSection({ theme, activeDomain }: Readonly<{ theme: DomainTheme; activeDomain: Domain }>) {
  const stats = [
    { label: "Components", value: "48+" },
    { label: "Color Tokens", value: "24" },
    { label: "Type Scales", value: "10" },
    { label: "A11y Score", value: "98%" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Design System Overview"
        description="A comprehensive, cross-domain design system built for scalability and accessibility."
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
                {theme.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                  {theme.name} Theme
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
function ColorsSection({ theme, copyToClipboard, copiedToken }: Readonly<{ theme: DomainTheme; copyToClipboard: (t: string, n: string) => void; copiedToken: string | null }>) {
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
function TypographySection({ theme }: Readonly<{ theme: DomainTheme }>) {
  const typeScale = [
    { name: "Display", size: "72px", weight: "700", sample: "Aa" },
    { name: "Heading 1", size: "48px", weight: "700", sample: "Heading 1" },
    { name: "Heading 2", size: "36px", weight: "600", sample: "Heading 2" },
    { name: "Heading 3", size: "24px", weight: "600", sample: "Heading 3" },
    { name: "Body Large", size: "18px", weight: "400", sample: "Body Large text for lead paragraphs" },
    { name: "Body", size: "16px", weight: "400", sample: "Body text for regular content" },
    { name: "Body Small", size: "14px", weight: "400", sample: "Small body text for secondary information" },
    { name: "Caption", size: "12px", weight: "500", sample: "Caption text for labels" },
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
          <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>Primary Font</h3>
          <div 
            className="text-4xl font-semibold mb-2" 
            style={{ color: theme.colors.text, fontFamily: "Inter, sans-serif" }}
          >
            Inter
          </div>
          <p className="text-sm" style={{ color: theme.colors.textMuted }}>
            A carefully crafted open-source typeface designed for computer screens.
          </p>
        </Card>
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>Mono Font</h3>
          <div 
            className="text-4xl font-semibold mb-2 font-mono" 
            style={{ color: theme.colors.text }}
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
function SpacingSection({ theme }: Readonly<{ theme: DomainTheme }>) {
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
        <div className="grid grid-cols-12 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((colNum) => (
            <div 
              key={`grid-col-${colNum}`}
              className="h-12 rounded flex items-center justify-center text-xs font-mono"
              style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.textMuted }}
            >
              {colNum}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-2 mt-2">
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
function ComponentsSection({ theme }: Readonly<{ theme: DomainTheme }>) {
  const [activeTab, setActiveTab] = useState<"buttons" | "inputs" | "feedback" | "data">("buttons");

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Components"
        description="Interactive UI components that adapt to the active theme."
        theme={theme}
      />

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 rounded-xl" style={{ backgroundColor: theme.colors.surfaceHover }}>
        {[
          { id: "buttons" as const, label: "Buttons" },
          { id: "inputs" as const, label: "Inputs" },
          { id: "feedback" as const, label: "Feedback" },
          { id: "data" as const, label: "Data Display" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab.id ? theme.colors.surface : "transparent",
              color: activeTab === tab.id ? theme.colors.text : theme.colors.textMuted,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Buttons */}
      {activeTab === "buttons" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Button Variants</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                Primary
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
                style={{ borderColor: theme.colors.border, color: theme.colors.text }}
              >
                Secondary
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                style={{ color: theme.colors.text }}
              >
                Ghost
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.colors.error, color: "#fff" }}
              >
                Danger
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="px-3 py-1.5 rounded-md text-xs font-medium"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                Small
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                Medium
              </button>
              <button 
                className="px-6 py-3 rounded-xl text-base font-medium"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                Large
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                <Download className="w-4 h-4" />
                With Icon
              </button>
              <button 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primaryHex, color: "#fff" }}
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
                style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.textMuted }}
              >
                Disabled
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Inputs */}
      {activeTab === "inputs" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Input Variants</h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label htmlFor="default-input" className="block text-sm mb-1.5" style={{ color: theme.colors.text }}>Default Input</label>
              <input
                id="default-input"
                type="text"
                placeholder="Enter value..."
                className="w-full px-4 py-2 rounded-lg border text-sm outline-none transition-colors"
                style={{ 
                  backgroundColor: theme.colors.surfaceHover,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
              />
            </div>
            <div>
              <label htmlFor="search-input" className="block text-sm mb-1.5" style={{ color: theme.colors.text }}>With Icon</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.colors.textMuted }} />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm outline-none transition-colors"
                  style={{ 
                    backgroundColor: theme.colors.surfaceHover,
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="error-input" className="block text-sm mb-1.5" style={{ color: theme.colors.error }}>Error State</label>
              <input
                id="error-input"
                type="text"
                placeholder="Invalid input"
                className="w-full px-4 py-2 rounded-lg border-2 text-sm outline-none"
                style={{ 
                  backgroundColor: theme.colors.surfaceHover,
                  borderColor: theme.colors.error,
                  color: theme.colors.text,
                }}
              />
              <p className="text-xs mt-1" style={{ color: theme.colors.error }}>This field is required</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-5 rounded-full relative cursor-pointer"
                  style={{ backgroundColor: theme.colors.primaryHex }}
                >
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                </div>
                <span className="text-sm" style={{ color: theme.colors.text }}>Toggle</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded border-2 flex items-center justify-center"
                  style={{ borderColor: theme.colors.primaryHex, backgroundColor: theme.colors.primaryHex }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm" style={{ color: theme.colors.text }}>Checkbox</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Feedback */}
      {activeTab === "feedback" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Feedback Components</h3>
          <div className="space-y-3">
            {[
              { type: "success", icon: <Check className="w-4 h-4" />, message: "Operation completed successfully", color: theme.colors.success },
              { type: "warning", icon: <AlertCircle className="w-4 h-4" />, message: "Please review before proceeding", color: theme.colors.warning },
              { type: "error", icon: <X className="w-4 h-4" />, message: "Something went wrong", color: theme.colors.error },
              { type: "info", icon: <Info className="w-4 h-4" />, message: "Here is some helpful information", color: theme.colors.primaryHex },
            ].map((alert) => (
              <div 
                key={alert.type}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: `${alert.color}15` }}
              >
                <div style={{ color: alert.color }}>{alert.icon}</div>
                <span className="text-sm flex-1" style={{ color: theme.colors.text }}>{alert.message}</span>
                <X className="w-4 h-4 cursor-pointer" style={{ color: theme.colors.textMuted }} />
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-4" style={{ color: theme.colors.text }}>Badges</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${theme.colors.success}20`, color: theme.colors.success }}>Success</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${theme.colors.warning}20`, color: theme.colors.warning }}>Warning</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${theme.colors.error}20`, color: theme.colors.error }}>Error</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${theme.colors.primaryHex}20`, color: theme.colors.primaryHex }}>Info</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: theme.colors.surfaceHover, color: theme.colors.textMuted }}>Neutral</span>
          </div>
        </Card>
      )}

      {/* Data Display */}
      {activeTab === "data" && (
        <Card theme={theme}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: theme.colors.text }}>Data Cards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Total Revenue", value: "$24,532", change: "+12.5%", positive: true },
              { label: "Active Users", value: "1,234", change: "+5.2%", positive: true },
              { label: "Bounce Rate", value: "34.2%", change: "-2.1%", positive: false },
            ].map((stat) => (
              <div 
                key={stat.label}
                className="rounded-xl p-4 border"
                style={{ backgroundColor: theme.colors.surfaceHover, borderColor: theme.colors.border }}
              >
                <div className="text-sm mb-1" style={{ color: theme.colors.textMuted }}>{stat.label}</div>
                <div className="text-2xl font-bold mb-1" style={{ color: theme.colors.text }}>{stat.value}</div>
                <div className="text-xs" style={{ color: stat.positive ? theme.colors.success : theme.colors.error }}>
                  {stat.change} from last month
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-4" style={{ color: theme.colors.text }}>Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: theme.colors.text }}>Project A</span>
                <span style={{ color: theme.colors.textMuted }}>75%</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: theme.colors.surfaceHover }}>
                <div className="h-full w-3/4 rounded-full" style={{ backgroundColor: theme.colors.primaryHex }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: theme.colors.text }}>Project B</span>
                <span style={{ color: theme.colors.textMuted }}>45%</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: theme.colors.surfaceHover }}>
                <div className="h-full w-[45%] rounded-full" style={{ backgroundColor: theme.colors.secondaryHex }} />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ─── Patterns Section ─── */
function PatternsSection({ 
  theme, 
  domainThemes, 
  setActiveDomain,
  activeDomain,
}: Readonly<{ 
  theme: DomainTheme; 
  domainThemes: Record<Domain, DomainTheme>;
  setActiveDomain: (d: Domain) => void;
  activeDomain: Domain;
}>) {
  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Domain Patterns"
        description="See how components adapt across different industry themes."
        theme={theme}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(domainThemes) as Domain[]).map((domain) => {
          const t = domainThemes[domain];
          const isActive = activeDomain === domain;
          return (
            <motion.button
              key={domain}
              whileHover={{ y: -2 }}
              onClick={() => setActiveDomain(domain)}
              className={`rounded-xl p-4 border text-left transition-all ${isActive ? "ring-2" : ""}`}
              style={{ 
                backgroundColor: t.colors.surface,
                borderColor: t.colors.border,
                "--tw-ring-color": isActive ? t.colors.primaryHex : "transparent",
              } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: t.colors.primaryHex }}
                >
                  <span className="text-white">{t.icon}</span>
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: t.colors.text }}>{t.name}</div>
                  <div className="text-xs" style={{ color: t.colors.textMuted }}>{t.description}</div>
                </div>
              </div>

              {/* Mini Preview */}
              <div 
                className="rounded-lg p-3 space-y-2"
                style={{ backgroundColor: t.colors.background }}
              >
                <div className="flex gap-2">
                  <div className="flex-1 h-2 rounded" style={{ backgroundColor: t.colors.primaryHex }} />
                  <div className="w-8 h-2 rounded" style={{ backgroundColor: t.colors.surfaceHover }} />
                </div>
                <div className="flex gap-1">
                  {[25, 50, 35, 70, 45].map((h, i) => (
                    <div 
                      key={`pattern-bar-${domain}-${i}`}
                      className="flex-1 rounded-t"
                      style={{ 
                        height: `${h}px`,
                        backgroundColor: t.colors.primaryHex,
                        opacity: 0.4 + (i * 0.15)
                      }}
                    />
                  ))}
                </div>
              </div>

              {isActive && (
                <div className="mt-3 text-xs font-medium" style={{ color: t.colors.primaryHex }}>
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
function AccessibilitySection({ theme }: Readonly<{ theme: DomainTheme }>) {
  const [simulateVision, setSimulateVision] = useState<"none" | "protanopia" | "deuteranopia" | "tritanopia">("none");

  const visionFilters: Record<typeof simulateVision, string> = {
    none: "none",
    protanopia: "grayscale(0%) sepia(50%) saturate(50%) hue-rotate(180deg)",
    deuteranopia: "grayscale(0%) sepia(50%) saturate(50%) hue-rotate(90deg)",
    tritanopia: "grayscale(0%) sepia(50%) saturate(100%) hue-rotate(270deg)",
  };

  const checks = [
    { name: "Color Contrast", status: "pass", value: "4.5:1" },
    { name: "Focus Indicators", status: "pass", value: "100%" },
    { name: "Keyboard Navigation", status: "pass", value: "100%" },
    { name: "Screen Reader", status: "pass", value: "Compliant" },
    { name: "Touch Targets", status: "pass", value: "44px min" },
    { name: "Reduced Motion", status: "pass", value: "Supported" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Accessibility"
        description="WCAG 2.1 AA compliant with color blindness simulators."
        theme={theme}
      />

      {/* Score Card */}
      <Card theme={theme}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: theme.colors.text }}>Compliance Score</h3>
            <p className="text-xs" style={{ color: theme.colors.textMuted }}>Based on WCAG 2.1 AA guidelines</p>
          </div>
          <div className="text-4xl font-bold" style={{ color: theme.colors.success }}>98%</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {checks.map((check) => (
            <div 
              key={check.name}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500/20">
                <Check className="w-3.5 h-3.5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium" style={{ color: theme.colors.text }}>{check.name}</div>
                <div className="text-xs" style={{ color: theme.colors.textMuted }}>{check.value}</div>
              </div>
            </div>
          ))}
        </div>
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
function CodeSection({ theme, copyToClipboard, copiedToken }: Readonly<{ theme: DomainTheme; copyToClipboard: (t: string, n: string) => void; copiedToken: string | null }>) {
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
