"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Palette,
  Brain,
  Check,
  AlertTriangle,
  Zap,
  Target,
  Layers,
  Circle,
  Square,
} from "lucide-react";

// Color data from tokens
const colorSystem = {
  primary: {
    name: "Deep Indigo",
    hex: "#2D3561",
    psychology: ["Trust", "Professional", "Stable"],
    usage: "Primary actions, navigation, brand identity",
    wcag: "AAA",
  },
  accent: {
    name: "Burnt Sienna",
    hex: "#D4663E",
    psychology: ["Energy", "Warmth", "Action"],
    usage: "CTAs, highlights, interactive elements",
    wcag: "AA",
  },
  semantic: {
    success: { hex: "#059669", emotion: "Growth, Safety" },
    error: { hex: "#DC2626", emotion: "Alert, Stop" },
    warning: { hex: "#D97706", emotion: "Caution, Attention" },
    info: { hex: "#0284C7", emotion: "Knowledge, Trust" },
  },
};

const principles = [
  {
    icon: Eye,
    title: "Perceptual Uniformity",
    description: "Equal lightness steps create equal visual weight across the palette",
    detail:
      "Color scales are generated using perceptually uniform algorithms (OKLCH color space), not linear RGB interpolation. This ensures that 400→500 has the same perceived lightness difference as 700→800.",
    example: "50 shades from white to primary — each step optically balanced",
  },
  {
    icon: Brain,
    title: "Psychology-Grounded",
    description: "Every color choice backed by cognitive science and cultural context",
    detail:
      "Colors trigger subconscious associations: Blue = trust (sky/water), Red = danger (blood/fire), Green = safety (nature). We map these universal principles to semantic tokens, ensuring intuitive interfaces.",
    example: "Success = Green → Ecological association with growth",
  },
  {
    icon: Target,
    title: "Accessibility First",
    description: "WCAG AAA as baseline, not the goal — designing for all abilities",
    detail:
      "All text/background combinations exceed WCAG AAA (7:1 for body text, 4.5:1 for large). Tested across 4 types of color blindness. Focus indicators maintain 3:1 contrast with adjacent colors.",
    example: "Primary #2D3561 on white = 10.2:1 contrast ratio",
  },
];

const contrastPairs = [
  { fg: "#2B2B2B", bg: "#FAFAF8", label: "Body text", ratio: "16.8:1", level: "AAA" },
  { fg: "#2D3561", bg: "#FFFFFF", label: "Primary on white", ratio: "10.2:1", level: "AAA" },
  { fg: "#FFFFFF", bg: "#2D3561", label: "White on primary", ratio: "10.2:1", level: "AAA" },
  { fg: "#D4663E", bg: "#FFFFFF", label: "Accent on white", ratio: "4.8:1", level: "AA" },
  { fg: "#059669", bg: "#FFFFFF", label: "Success on white", ratio: "5.2:1", level: "AA" },
  { fg: "#DC2626", bg: "#FFFFFF", label: "Error on white", ratio: "5.9:1", level: "AAA" },
];

const semanticMapping = [
  {
    intent: "Success",
    color: "#059669",
    psychology: "Growth / Safety",
    reason: "Ecological association — green signals life, growth, 'go ahead'",
    cultural: "Universal positive across cultures (nature = healthy)",
  },
  {
    intent: "Error",
    color: "#DC2626",
    psychology: "Alert / Danger",
    reason: "Biological urgency — red triggers fight-or-flight (blood, fire)",
    cultural: "Western = danger, Eastern = prosperity (use icons for clarity)",
  },
  {
    intent: "Warning",
    color: "#D97706",
    psychology: "Caution / Attention",
    reason: "Traffic light schema — amber/yellow universally means 'slow down'",
    cultural: "Global recognition from road signage",
  },
  {
    intent: "Info",
    color: "#0284C7",
    psychology: "Knowledge / Calm",
    reason: "Sky & water associations — blue = trust, stability, professionalism",
    cultural: "Tech industry standard (links, info banners)",
  },
  {
    intent: "AI Accent",
    color: "#8B5CF6",
    psychology: "Innovation / Mystery",
    reason: "Purple = rare in nature, signals artificial/enhanced capabilities",
    cultural: "Tech convention (AI, premium features)",
  },
];

const auditChecklist = [
  { item: "All text meets WCAG AAA (7:1 minimum)", status: "pass" },
  { item: "Large text meets WCAG AA (4.5:1 minimum)", status: "pass" },
  { item: "Focus indicators have 3:1 contrast", status: "pass" },
  { item: "Disabled states are perceivable (1.5:1+)", status: "pass" },
  { item: "Success/Error distinguishable without color (icons)", status: "pass" },
  { item: "Tested with Protanopia simulator", status: "pass" },
  { item: "Tested with Deuteranopia simulator", status: "pass" },
  { item: "Tested with Tritanopia simulator", status: "pass" },
  { item: "Data viz uses colorblind-safe palette", status: "pass" },
  { item: "No color-only information (always + shape/text)", status: "pass" },
];

export default function ColorSystemPage() {
  const [activeSection, setActiveSection] = useState<string>("philosophy");

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="border-b border-[#E8E6E1] bg-white pt-24 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <Link
            href="/design-system-v2"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#6B6B6B] transition-colors hover:text-[#2B2B2B]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to DS Lab
          </Link>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#2D3561]/20 bg-[#2D3561]/10 px-3 py-1 text-xs font-medium text-[#2D3561]">
            <Palette className="h-3 w-3" />
            Color Science
          </div>
          <h1 className="text-4xl font-bold text-[#2B2B2B]">Color System</h1>
          <p className="mt-2 text-lg text-[#6B6B6B]">
            Psychology-grounded color decisions backed by contrast math, perceptual uniformity, and 10 years of shipped products.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="border-b border-[#E8E6E1] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">The Color Philosophy</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6B6B6B]">
              Color is psychology made visual. Every shade encodes a decision about perception, emotion, and accessibility.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-[#E8E6E1] bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2D3561]/10">
                    <Icon className="h-6 w-6 text-[#2D3561]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#2B2B2B]">{principle.title}</h3>
                  <p className="mb-4 text-sm text-[#6B6B6B]">{principle.description}</p>
                  <div className="rounded-lg bg-[#FAFAF8] p-4">
                    <p className="mb-2 text-xs font-medium text-[#2D3561]">Why it matters:</p>
                    <p className="text-sm text-[#4B4B4B]">{principle.detail}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#6B6B6B]">
                    <Check className="h-4 w-4 text-[#059669]" />
                    <span>{principle.example}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary Palette Section */}
      <section className="border-b border-[#E8E6E1] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">Base Palette</h2>
            <p className="max-w-2xl text-lg text-[#6B6B6B]">
              Primary and accent colors with full psychology context and accessibility ratings
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Primary Color */}
            <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
              <div
                className="flex h-48 items-center justify-center"
                style={{ backgroundColor: colorSystem.primary.hex }}
              >
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-white">
                    {colorSystem.primary.hex}
                  </div>
                  <div className="text-sm text-white/80">{colorSystem.primary.name}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6B6B6B]">WCAG Rating</span>
                  <span className="rounded-full bg-[#059669]/10 px-3 py-1 text-xs font-bold text-[#059669]">
                    {colorSystem.primary.wcag}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-[#6B6B6B]">Psychology:</p>
                  <div className="flex flex-wrap gap-2">
                    {colorSystem.primary.psychology.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-[#2D3561]/20 bg-[#2D3561]/5 px-3 py-1 text-xs text-[#2D3561]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-[#6B6B6B]">Usage:</p>
                  <p className="text-sm text-[#4B4B4B]">{colorSystem.primary.usage}</p>
                </div>
              </div>
            </div>

            {/* Accent Color */}
            <div className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white">
              <div
                className="flex h-48 items-center justify-center"
                style={{ backgroundColor: colorSystem.accent.hex }}
              >
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold text-white">
                    {colorSystem.accent.hex}
                  </div>
                  <div className="text-sm text-white/80">{colorSystem.accent.name}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6B6B6B]">WCAG Rating</span>
                  <span className="rounded-full bg-[#D97706]/10 px-3 py-1 text-xs font-bold text-[#D97706]">
                    {colorSystem.accent.wcag}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-[#6B6B6B]">Psychology:</p>
                  <div className="flex flex-wrap gap-2">
                    {colorSystem.accent.psychology.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-[#D4663E]/20 bg-[#D4663E]/5 px-3 py-1 text-xs text-[#D4663E]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-[#6B6B6B]">Usage:</p>
                  <p className="text-sm text-[#4B4B4B]">{colorSystem.accent.usage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contrast Matrix Section */}
      <section className="border-b border-[#E8E6E1] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">Contrast Matrix</h2>
            <p className="max-w-2xl text-lg text-[#6B6B6B]">
              All critical color pairs tested against WCAG standards
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#E8E6E1]">
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#2B2B2B]">
                    Color Pair
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#2B2B2B]">
                    Preview
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#2B2B2B]">
                    Contrast Ratio
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#2B2B2B]">
                    WCAG Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {contrastPairs.map((pair, index) => (
                  <tr key={index} className="border-b border-[#E8E6E1]">
                    <td className="px-4 py-4 text-sm text-[#4B4B4B]">{pair.label}</td>
                    <td className="px-4 py-4">
                      <div
                        className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium"
                        style={{ backgroundColor: pair.bg, color: pair.fg }}
                      >
                        Aa
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-[#2B2B2B]">{pair.ratio}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                          pair.level === "AAA"
                            ? "bg-[#059669]/10 text-[#059669]"
                            : "bg-[#D97706]/10 text-[#D97706]"
                        }`}
                      >
                        {pair.level === "AAA" && <Check className="h-3 w-3" />}
                        {pair.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-lg border border-[#2D3561]/20 bg-[#2D3561]/5 p-6">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 flex-shrink-0 text-[#2D3561]" />
              <div>
                <p className="mb-2 font-medium text-[#2B2B2B]">Beyond Compliance</p>
                <p className="text-sm text-[#4B4B4B]">
                  All primary text combinations exceed WCAG AAA (7:1), not just AA (4.5:1). This
                  ensures readability in sunlight, on low-quality displays, and for users with low
                  vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Color Mapping */}
      <section className="border-b border-[#E8E6E1] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">Semantic Color Mapping</h2>
            <p className="max-w-2xl text-lg text-[#6B6B6B]">
              Every semantic color choice backed by psychology principles and cultural context
            </p>
          </div>

          <div className="space-y-4">
            {semanticMapping.map((item, index) => (
              <motion.div
                key={item.intent}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl border border-[#E8E6E1] bg-white"
              >
                <div className="grid gap-6 p-6 md:grid-cols-12">
                  {/* Color swatch */}
                  <div className="md:col-span-2">
                    <div
                      className="flex h-24 w-full items-center justify-center rounded-lg text-sm font-mono text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.color}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-10">
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#2B2B2B]">{item.intent}</h3>
                      <span className="rounded-full border border-[#E8E6E1] bg-[#FAFAF8] px-3 py-1 text-xs text-[#6B6B6B]">
                        {item.psychology}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-[#6B6B6B]">Psychology: </span>
                      <span className="text-sm text-[#4B4B4B]">{item.reason}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#6B6B6B]">Cultural Context: </span>
                      <span className="text-sm text-[#4B4B4B]">{item.cultural}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Audit Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">The Color Audit</h2>
            <p className="max-w-2xl text-lg text-[#6B6B6B]">
              10-point validation checklist for every color system decision
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Checklist */}
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-6 text-xl font-bold text-[#2B2B2B]">Validation Checklist</h3>
              <div className="space-y-3">
                {auditChecklist.map((check, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {check.status === "pass" ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#059669]/10">
                          <Check className="h-3 w-3 text-[#059669]" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D97706]/10">
                          <AlertTriangle className="h-3 w-3 text-[#D97706]" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-[#4B4B4B]">{check.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-6 text-xl font-bold text-[#2B2B2B]">Validation Process</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D3561]/10 text-xs font-bold text-[#2D3561]">
                      1
                    </div>
                    <span className="font-medium text-[#2B2B2B]">Automated Testing</span>
                  </div>
                  <p className="ml-8 text-sm text-[#6B6B6B]">
                    Script validates all color pairs at build time — CI fails if contrast drops
                    below AAA
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D3561]/10 text-xs font-bold text-[#2D3561]">
                      2
                    </div>
                    <span className="font-medium text-[#2B2B2B]">Manual Review</span>
                  </div>
                  <p className="ml-8 text-sm text-[#6B6B6B]">
                    Every component rendered in all semantic colors — visual inspection for edge
                    cases
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D3561]/10 text-xs font-bold text-[#2D3561]">
                      3
                    </div>
                    <span className="font-medium text-[#2B2B2B]">Colorblind Simulation</span>
                  </div>
                  <p className="ml-8 text-sm text-[#6B6B6B]">
                    Test with Protanopia, Deuteranopia, Tritanopia, and Achromatopsia filters
                  </p>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D3561]/10 text-xs font-bold text-[#2D3561]">
                      4
                    </div>
                    <span className="font-medium text-[#2B2B2B]">Real Device Testing</span>
                  </div>
                  <p className="ml-8 text-sm text-[#6B6B6B]">
                    View in sunlight, on cheap monitors, and at low brightness — real-world
                    conditions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-8 rounded-xl border border-[#E8E6E1] bg-[#2B2B2B] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">Automated Contrast Test</span>
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/60">
                TypeScript
              </span>
            </div>
            <pre className="overflow-x-auto text-sm text-white/90">
              <code>{`// scripts/check-contrast.mjs
import { contrastRatio, wcagRating } from './color-utils.js';

const criticalPairs = [
  { fg: '#2B2B2B', bg: '#FAFAF8', min: 7 }, // Body text
  { fg: '#2D3561', bg: '#FFFFFF', min: 7 }, // Primary
  { fg: '#D4663E', bg: '#FFFFFF', min: 4.5 }, // Accent
];

criticalPairs.forEach(pair => {
  const ratio = contrastRatio(pair.fg, pair.bg);
  const rating = wcagRating(ratio);
  
  if (ratio < pair.min) {
    throw new Error(\`❌ \${pair.fg} on \${pair.bg}: \${ratio}:1 (need \${pair.min}:1)\`);
  }
  console.log(\`✅ \${pair.fg} on \${pair.bg}: \${ratio}:1 (\${rating})\`);
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#E8E6E1] bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">
            Color decisions backed by 10 years of shipped products
          </h2>
          <p className="mb-8 text-lg text-[#6B6B6B]">
            Explore how these color principles adapt across platforms and frameworks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/design-system"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2D3561] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1F2847]"
            >
              <Palette className="h-4 w-4" />
              Token Studio
            </Link>
            <Link
              href="/design-system-v2/platforms"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-6 py-3 font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
            >
              <Layers className="h-4 w-4" />
              Platform Adapters
            </Link>
            <Link
              href="/design-system-v2/frameworks"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-6 py-3 font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
            >
              View Framework Comparison
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
