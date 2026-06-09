"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sun, Moon, Monitor, Map, BarChart3, Calendar, Layout,
  Sliders, Target, Users, Radio, Grid3X3, Activity, Clock,
  TrendingUp, Crosshair, Layers, Play, Pause, RotateCcw,
  Palette, Type, Sparkles, Eye, Zap, ArrowRight, Square,
  Check, Dot, Diamond,
} from "lucide-react";

const C = {
  energyBlue: "#1E76BB",
  energyBlueLight: "#61CBF5",
  deepIndigo: "#2A3B8F",
  darkNavy: "#05080F",
  surfaceNavy: "#0C1425",
  hoverNavy: "#172242",
  borderBlue: "#1E2D4A",
  textWhite: "#FAFAFA",
  textMuted: "#94A3B8",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
} as const;

const ENERGY_BLUE_SCALE = [
  { name: "50", hex: "#E8F4FD" },
  { name: "100", hex: "#C4E4FA" },
  { name: "200", hex: "#9DD4F6" },
  { name: "300", hex: "#61CBF5" },
  { name: "400", hex: "#3AAEE0" },
  { name: "500", hex: "#1E76BB" },
  { name: "600", hex: "#155D9E" },
  { name: "700", hex: "#0E4680" },
  { name: "800", hex: "#2A3B8F" },
  { name: "900", hex: "#0D1B3E" },
];

const ELEVATION = [
  { name: "Flat", shadow: "0 0 0 1px rgba(30, 45, 74, 0.5)" },
  { name: "Raised", shadow: "0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(30, 45, 74, 0.5)" },
  { name: "Overlay", shadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(30, 45, 74, 0.5)" },
  { name: "Modal", shadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(30, 45, 74, 0.5)" },
];

const SECTIONS = [
  { id: "brand", label: "Brand Identity", icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: "tokens", label: "Design Tokens", icon: <Palette className="w-3.5 h-3.5" /> },
  { id: "components", label: "Components", icon: <Grid3X3 className="w-3.5 h-3.5" /> },
  { id: "patterns", label: "DOOH Patterns", icon: <Activity className="w-3.5 h-3.5" /> },
  { id: "preview", label: "Billboard Preview", icon: <Monitor className="w-3.5 h-3.5" /> },
];

const oohComponents = [
  {
    category: "Media",
    items: [
      { name: "Billboard Frame", description: "Standard DOOH display container with dynamic content zones", icon: Monitor },
      { name: "Digital Screen", description: "Programmable screen with resolution, refresh rate, brightness controls", icon: Radio },
      { name: "Media Player", description: "Content playback engine with playlist scheduling", icon: Play },
      { name: "Screen Layout", description: "Grid-based layout builder for multi-zone creative", icon: Layout },
    ],
  },
  {
    category: "Campaign",
    items: [
      { name: "Campaign Card", description: "Campaign summary with status, budget, and performance snapshot", icon: TrendingUp },
      { name: "Campaign Timeline", description: "Gantt-style schedule showing flight dates and rotations", icon: Calendar },
      { name: "Content Schedule", description: "Programmatic playlist with dayparting rules", icon: Clock },
      { name: "Reach Estimator", description: "Audience reach and frequency projection tool", icon: Crosshair },
    ],
  },
  {
    category: "Audience",
    items: [
      { name: "Audience Meter", description: "Real-time foot traffic and dwell time gauge", icon: BarChart3 },
      { name: "Audience Profile", description: "Demographic breakdown of audience segments", icon: Users },
      { name: "Placement Map", description: "Geospatial view of inventory with heatmap overlay", icon: Map },
      { name: "Zone Selector", description: "Geofence-based zone picker for targeted placements", icon: Target },
    ],
  },
  {
    category: "Operations",
    items: [
      { name: "Inventory Grid", description: "Filterable data grid of available screens with status", icon: Grid3X3 },
      { name: "Network Status", description: "Real-time health dashboard for screen network", icon: Activity },
      { name: "Analytics Card", description: "KPI card showing impressions, CTR, and cost metrics", icon: Sliders },
      { name: "Campaign Budget", description: "Budget allocation and spend tracking widget", icon: Eye },
    ],
  },
];

const doohPatterns = [
  {
    title: "Campaign Planning Flow",
    steps: ["Define Audience", "Select Zones", "Choose Screens", "Set Schedule", "Allocate Budget", "Launch"],
    description: "End-to-end workflow from audience definition through campaign launch with automated inventory matching.",
  },
  {
    title: "Audience Targeting",
    techniques: ["Location-Based", "Demographic", "Behavioral", "Contextual", "Retargeting"],
    description: "Multi-dimensional audience targeting combining geofence data with behavioral insights for precision OOH.",
  },
  {
    title: "Real-Time Analytics",
    metrics: ["Impressions", "Dwell Time", "Reach", "Frequency", "CTR", "ROAS"],
    description: "Live dashboard streaming impression data, foot traffic patterns, and campaign ROI metrics.",
  },
];

/* ─── SECTION COMPONENTS ─── */

function BrandIdentity() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.textWhite }}>Brand Identity</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          A movement-first design language built for the out-of-home advertising ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: C.energyBlue + "20" }}>
              <Sparkles className="w-5 h-5" style={{ color: C.energyBlue }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: C.textWhite }}>Brand Story</h3>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                Moving Walls was born from a simple insight: people spend 70% of their time outside their homes,
                yet advertising technology had largely ignored the physical world. We set out to build the operating
                system for out-of-home — connecting digital screens, audience data, and programmatic buying into
                a seamless platform that makes OOH as measurable and targeted as digital.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: C.energyBlue + "20" }}>
              <Eye className="w-5 h-5" style={{ color: C.energyBlue }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: C.textWhite }}>Vision & Strategy</h3>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                To become the global operating system for OOH advertising — powering every billboard, digital screen,
                and transit display with data-driven intelligence. Our strategy: unify planning, buying, verification,
                and content delivery into a single platform spanning 17+ countries and 100,000+ measured media sites.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: C.energyBlue + "20" }}>
              <Diamond className="w-5 h-5" style={{ color: C.energyBlue }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: C.textWhite }}>Design Philosophy</h3>
              <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
                <span className="font-medium" style={{ color: C.textWhite }}>Movement-First.</span> Every interface element is designed around the idea of motion — data flows, 
                screens transition, audiences move through spaces. Our visual language uses kinetic energy: flowing gradients,
                dynamic data visualizations, and spatial interfaces that mirror the physical world of OOH.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: C.energyBlue + "20" }}>
              <Target className="w-5 h-5" style={{ color: C.energyBlue }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: C.textWhite }}>Core Values</h3>
              <div className="space-y-1.5">
                {[
                  { label: "Measurement", desc: "Data-driven decisions, not gut feelings" },
                  { label: "Reach", desc: "Connecting brands with audiences at scale" },
                  { label: "Innovation", desc: "Patented technology for location intelligence" },
                  { label: "Simplicity", desc: "Complex systems, simple interfaces" },
                ].map(v => (
                  <div key={v.label} className="flex items-center gap-2">
                    <Check className="w-3 h-3 shrink-0" style={{ color: C.energyBlue }} />
                    <div>
                      <span className="text-xs font-medium" style={{ color: C.textWhite }}>{v.label}</span>
                      <span className="text-xs ml-1" style={{ color: C.textMuted }}>— {v.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TokenReference() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.textWhite }}>Design Tokens</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          Energy Blue palette with flowing teal accents, Poppins typography, and a 4pt-based spatial system.
        </p>
      </div>

      {/* Color Palette */}
      <Card>
        <h3 className="text-sm font-semibold mb-1" style={{ color: C.textWhite }}>Energy Blue Scale</h3>
        <p className="text-xs mb-4" style={{ color: C.textMuted }}>Primary palette — 10-step blue scale with flowing teal accents</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {ENERGY_BLUE_SCALE.map(c => (
            <div key={c.name} className="rounded-lg overflow-hidden border" style={{ borderColor: C.borderBlue }}>
              <div className="h-12" style={{ backgroundColor: c.hex }} />
              <div className="p-2" style={{ backgroundColor: C.surfaceNavy }}>
                <div className="text-[10px] font-mono font-semibold" style={{ color: C.textWhite }}>{c.name}</div>
                <div className="text-[9px] font-mono" style={{ color: C.textMuted }}>{c.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Semantic Colors */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: C.textWhite }}>Semantic Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Primary", hex: C.energyBlue, use: "Buttons, links, active states" },
            { label: "Secondary", hex: C.deepIndigo, use: "Navigation, headers" },
            { label: "Accent", hex: C.energyBlueLight, use: "Highlights, badges, focus" },
            { label: "Success", hex: C.success, use: "Confirmations, metrics up" },
            { label: "Warning", hex: C.warning, use: "Alerts, thresholds" },
            { label: "Error", hex: C.error, use: "Errors, critical states" },
            { label: "Surface", hex: C.surfaceNavy, use: "Cards, panels, containers" },
            { label: "Border", hex: C.borderBlue, use: "Dividers, outlines" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2.5 p-2.5 rounded-lg border" style={{ borderColor: C.borderBlue, backgroundColor: C.darkNavy }}>
              <div className="w-8 h-8 rounded-lg shrink-0" style={{ backgroundColor: s.hex }} />
              <div>
                <div className="text-[11px] font-semibold" style={{ color: C.textWhite }}>{s.label}</div>
                <div className="text-[9px]" style={{ color: C.textMuted }}>{s.use}</div>
                <div className="text-[9px] font-mono" style={{ color: C.energyBlueLight }}>{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Typography */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: C.textWhite }}>Typography</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: C.borderBlue, backgroundColor: C.darkNavy }}>
            <div className="text-[10px] font-medium mb-2" style={{ color: C.textMuted }}>HEADING</div>
            <div className="text-3xl font-bold mb-1" style={{ color: C.textWhite, fontFamily: "Poppins, sans-serif" }}>
              Poppins
            </div>
            <div className="text-xs" style={{ color: C.textMuted }}>Bold · 600/700 weights · Display & Headings</div>
          </div>
          <div className="p-4 rounded-lg border" style={{ borderColor: C.borderBlue, backgroundColor: C.darkNavy }}>
            <div className="text-[10px] font-medium mb-2" style={{ color: C.textMuted }}>BODY</div>
            <div className="text-3xl font-semibold mb-1" style={{ color: C.textWhite, fontFamily: "Inter, sans-serif" }}>
              Inter
            </div>
            <div className="text-xs" style={{ color: C.textMuted }}>Regular · 400/500 weights · Body & UI</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { level: "H1", size: "40px", weight: 700, sample: "Energy Blue" },
            { level: "H2", size: "32px", weight: 600, sample: "Movement Forward" },
            { level: "H3", size: "24px", weight: 600, sample: "Audience Insights" },
            { level: "Body", size: "16px", weight: 400, sample: "Data-driven OOH" },
          ].map(t => (
            <div key={t.level} className="p-3 rounded-lg border" style={{ borderColor: C.borderBlue, backgroundColor: C.darkNavy }}>
              <div className="text-[9px] font-mono mb-1" style={{ color: C.textMuted }}>{t.level} · {t.size} · {t.weight}</div>
              <div style={{ fontSize: t.size, fontWeight: t.weight, color: C.textWhite, fontFamily: t.level === "Body" ? "Inter, sans-serif" : "Poppins, sans-serif" }}>
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Spacing & Elevation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.textWhite }}>4pt Grid System</h3>
          <p className="text-xs mb-4" style={{ color: C.textMuted }}>Consistent 4px baseline for all spacing and sizing</p>
          <div className="space-y-2">
            {[
              { name: "xs", value: "4px", px: 4 },
              { name: "sm", value: "8px", px: 8 },
              { name: "md", value: "16px", px: 16 },
              { name: "lg", value: "24px", px: 24 },
              { name: "xl", value: "32px", px: 32 },
              { name: "2xl", value: "48px", px: 48 },
              { name: "3xl", value: "64px", px: 64 },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="w-12 text-right text-[10px] font-mono" style={{ color: C.textMuted }}>{s.name}</div>
                <div className="h-3 rounded-sm transition-all" style={{ width: s.px * 2, backgroundColor: C.energyBlue }} />
                <div className="text-[10px] font-mono" style={{ color: C.textMuted }}>{s.value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.textWhite }}>Elevation Shadows</h3>
          <p className="text-xs mb-4" style={{ color: C.textMuted }}>Four-tier shadow system for depth hierarchy</p>
          <div className="space-y-3">
            {ELEVATION.map(e => (
              <div key={e.name} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: C.darkNavy, boxShadow: e.shadow }}>
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{ color: C.textWhite }}>{e.name}</div>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.energyBlue }} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ComponentCatalog() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.textWhite }}>Component Catalog</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          16 OOH-specific components across 4 categories — media, campaign, audience, and operations.
        </p>
      </div>

      {oohComponents.map(group => (
        <div key={group.category}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-0.5 rounded-full" style={{ backgroundColor: C.energyBlue }} />
            <h3 className="text-sm font-semibold" style={{ color: C.textWhite }}>{group.category}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {group.items.map(item => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  className="p-3.5 rounded-xl border cursor-pointer transition-colors"
                  style={{ borderColor: C.borderBlue, backgroundColor: C.surfaceNavy }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.hoverNavy; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.surfaceNavy; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: C.energyBlue + "20" }}>
                    <Icon className="w-4 h-4" style={{ color: C.energyBlue }} />
                  </div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: C.textWhite }}>{item.name}</div>
                  <div className="text-[10px] leading-relaxed" style={{ color: C.textMuted }}>{item.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function DOOHPatterns() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.textWhite }}>DOOH Patterns</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          Reusable workflows and interaction patterns for digital out-of-home advertising.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doohPatterns.map(pattern => (
          <Card key={pattern.title}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: C.textWhite }}>{pattern.title}</h3>
            <p className="text-xs mb-4 leading-relaxed" style={{ color: C.textMuted }}>{pattern.description}</p>

            {pattern.steps && (
              <div className="space-y-2">
                {pattern.steps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: C.energyBlue + "20", color: C.energyBlue }}>
                      {i + 1}
                    </div>
                    <span className="text-xs" style={{ color: C.textWhite }}>{step}</span>
                  </div>
                ))}
              </div>
            )}

            {pattern.techniques && (
              <div className="flex flex-wrap gap-1.5">
                {pattern.techniques.map(t => (
                  <span key={t} className="px-2 py-1 rounded-md text-[9px] font-medium border" style={{ borderColor: C.borderBlue, color: C.energyBlueLight, backgroundColor: C.energyBlue + "10" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {pattern.metrics && (
              <div className="grid grid-cols-3 gap-1.5">
                {pattern.metrics.map(m => (
                  <div key={m} className="p-2 rounded-lg text-center border" style={{ borderColor: C.borderBlue, backgroundColor: C.darkNavy }}>
                    <div className="text-[9px] font-medium" style={{ color: C.textMuted }}>{m}</div>
                    <div className="text-sm font-bold font-mono" style={{ color: C.energyBlueLight }}>
                      {Math.floor(Math.random() * 900) + 100}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function BillboardPreview({ theme, setTheme, isPlaying, setIsPlaying }: {
  theme: "day" | "dusk" | "night";
  setTheme: (t: "day" | "dusk" | "night") => void;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}) {
  const skyColors = {
    day: { top: "#87CEEB", bottom: "#E0F0FF", text: "#1a1a2e" },
    dusk: { top: "#FF6B35", bottom: "#1a1a2e", text: "#ffffff" },
    night: { top: "#0D1B3E", bottom: "#05080F", text: "#61CBF5" },
  };

  const sky = skyColors[theme];
  const adContent = [
    { brand: "MOVEMENT", tagline: "See the city differently", color: "#1E76BB" },
    { brand: "ENERGY", tagline: "Power your campaign", color: "#61CBF5" },
    { brand: "REACH", tagline: "Connect at scale", color: "#2A3B8F" },
  ];
  const [adIndex, setAdIndex] = useState(0);

  const rotateAd = () => {
    setAdIndex(i => (i + 1) % adContent.length);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: C.textWhite }}>Billboard Preview</h2>
        <p className="text-sm" style={{ color: C.textMuted }}>
          Interactive DOOH billboard mockup with theme switching and content rotation.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 p-2 rounded-xl border" style={{ borderColor: C.borderBlue, backgroundColor: C.surfaceNavy }}>
        <span className="text-[10px] font-medium px-2" style={{ color: C.textMuted }}>Environment:</span>
        {(["day", "dusk", "night"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className="px-3 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all"
            style={{
              backgroundColor: theme === t ? C.energyBlue : "transparent",
              color: theme === t ? "#fff" : C.textMuted,
            }}
          >
            {t === "day" && <Sun className="w-3 h-3 inline mr-1" />}
            {t === "dusk" && <Sun className="w-3 h-3 inline mr-1" />}
            {t === "night" && <Moon className="w-3 h-3 inline mr-1" />}
            {t}
          </button>
        ))}
        <div className="w-px h-5" style={{ backgroundColor: C.borderBlue }} />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
          style={{ backgroundColor: C.energyBlue, color: "#fff" }}
        >
          {isPlaying ? <Pause className="w-3 h-3 inline mr-1" /> : <Play className="w-3 h-3 inline mr-1" />}
          {isPlaying ? "Pause" : "Auto-Rotate"}
        </button>
        <button
          onClick={rotateAd}
          className="px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all"
          style={{ backgroundColor: "transparent", color: C.textMuted }}
        >
          <RotateCcw className="w-3 h-3 inline mr-1" />
          Rotate
        </button>
      </div>

      {/* Billboard Scene */}
      <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: C.borderBlue, aspectRatio: "16/9" }}>
        {/* Sky */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${sky.top} 0%, ${sky.bottom} 100%)`,
        }} />

        {/* City silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
            <rect x="0" y="80" width="60" height="120" fill="#1a1a2e" />
            <rect x="70" y="40" width="50" height="160" fill="#1a1a2e" />
            <rect x="130" y="100" width="40" height="100" fill="#2a2a4e" />
            <rect x="180" y="20" width="55" height="180" fill="#1a1a2e" />
            <rect x="245" y="70" width="35" height="130" fill="#2a2a4e" />
            <rect x="290" y="50" width="60" height="150" fill="#1a1a2e" />
            <rect x="360" y="90" width="45" height="110" fill="#2a2a4e" />
            <rect x="415" y="10" width="70" height="190" fill="#1a1a2e" />
            <rect x="495" y="60" width="40" height="140" fill="#2a2a4e" />
            <rect x="545" y="30" width="65" height="170" fill="#1a1a2e" />
            <rect x="620" y="80" width="50" height="120" fill="#2a2a4e" />
            <rect x="680" y="45" width="55" height="155" fill="#1a1a2e" />
            <rect x="745" y="15" width="60" height="185" fill="#1a1a2e" />
            <rect x="815" y="55" width="45" height="145" fill="#2a2a4e" />
            <rect x="870" y="70" width="55" height="130" fill="#1a1a2e" />
            <rect x="935" y="25" width="50" height="175" fill="#1a1a2e" />
            <rect x="995" y="85" width="40" height="115" fill="#2a2a4e" />
            <rect x="1045" y="35" width="60" height="165" fill="#1a1a2e" />
            <rect x="1115" y="60" width="50" height="140" fill="#2a2a4e" />
            <rect x="1175" y="75" width="45" height="125" fill="#1a1a2e" />
          </svg>
        </div>

        {/* Billboard structure */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Pole */}
          <div className="absolute bottom-[18%] w-2 h-[30%]" style={{ backgroundColor: "#2a2a2e" }} />

          {/* Billboard frame */}
          <AnimatePresence mode="wait">
            <motion.div
              key={adIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-[65%] rounded-lg overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "#0a0a0f",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              {/* Ad creative */}
              <div className="aspect-[2/1] flex flex-col items-center justify-center p-6" style={{ backgroundColor: adContent[adIndex].color + "22" }}>
                <div className="text-[clamp(1rem,3vw,2.5rem)] font-bold tracking-tight" style={{ color: adContent[adIndex].color }}>
                  {adContent[adIndex].brand}
                </div>
                <div className="text-[clamp(0.5rem,1.5vw,1.2rem)] font-medium mt-1 opacity-80" style={{ color: "#fff" }}>
                  {adContent[adIndex].tagline}
                </div>

                {/* Decorative dots */}
                <div className="flex gap-1.5 mt-3">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-[clamp(4px,0.8vw,8px)] h-[clamp(4px,0.8vw,8px)] rounded-full" style={{ backgroundColor: adContent[adIndex].color, opacity: i === 1 ? 1 : 0.4 }} />
                  ))}
                </div>
              </div>

              {/* Frame border glow */}
              <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                boxShadow: `inset 0 0 20px ${adContent[adIndex].color}44`,
              }} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[15%]" style={{
          background: `radial-gradient(ellipse at center, ${adContent[adIndex].color}33 0%, transparent 70%)`,
        }} />
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`p-4 rounded-xl border ${className}`}
      style={{ borderColor: C.borderBlue, backgroundColor: C.surfaceNavy }}
    >
      {children}
    </div>
  );
}

/* ─── MAIN PAGE ─── */

export default function OOHDesignSystem() {
  const [activeSection, setActiveSection] = useState("brand");
  const [previewTheme, setPreviewTheme] = useState<"day" | "dusk" | "night">("dusk");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main className="min-h-screen" style={{ backgroundColor: C.darkNavy, color: C.textWhite }}>
      {/* ─── Top Breadcrumb ─── */}
      <div className="sticky top-0 z-30 border-b backdrop-blur-xl" style={{ backgroundColor: C.darkNavy + "e6", borderColor: C.borderBlue }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-11 gap-1.5">
            <Link href="/design-system" className="text-[11px] font-medium hover:underline" style={{ color: C.textMuted }}>
              DS Lab
            </Link>
            <span className="text-[11px]" style={{ color: C.textMuted }}>/</span>
            <span className="text-[11px] font-semibold tracking-wide" style={{ color: C.energyBlue }}>OOH Advertising</span>
          </div>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: C.borderBlue }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${C.energyBlue}11 0%, ${C.deepIndigo}22 50%, ${C.darkNavy} 100%)`,
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 60%, ${C.energyBlue}22 0%, transparent 60%)`,
        }} />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-4 h-4" style={{ color: C.energyBlueLight }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.energyBlueLight }}>Design System</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-3 tracking-tight" style={{ color: C.textWhite }}>
              OOH <span style={{ color: C.energyBlue }}>Advertising</span>
            </h1>
            <p className="text-sm lg:text-base leading-relaxed" style={{ color: C.textMuted }}>
              A movement-first design system for the out-of-home advertising ecosystem.
              Powered by Energy Blue, driven by audience intelligence, built for global scale.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: C.textMuted }}>
                <Map className="w-3 h-3" />
                <span>17 Countries</span>
              </div>
              <Dot className="w-3 h-3" style={{ color: C.energyBlue }} />
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: C.textMuted }}>
                <BarChart3 className="w-3 h-3" />
                <span>100K+ Screens</span>
              </div>
              <Dot className="w-3 h-3" style={{ color: C.energyBlue }} />
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: C.textMuted }}>
                <Zap className="w-3 h-3" />
                <span>10B+ Data Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Section Nav ─── */}
      <div className="sticky top-11 z-20 border-b" style={{ backgroundColor: C.surfaceNavy, borderColor: C.borderBlue }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeSection === section.id ? C.energyBlue + "20" : "transparent",
                  color: activeSection === section.id ? C.energyBlueLight : C.textMuted,
                }}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === "brand" && <BrandIdentity />}
            {activeSection === "tokens" && <TokenReference />}
            {activeSection === "components" && <ComponentCatalog />}
            {activeSection === "patterns" && <DOOHPatterns />}
            {activeSection === "preview" && (
              <BillboardPreview theme={previewTheme} setTheme={setPreviewTheme} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
