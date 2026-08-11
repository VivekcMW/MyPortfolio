"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Palette,
  Smartphone,
  Code2,
  Sparkles,
  Sliders,
  Download,
  ArrowRight,
  Layers,
  Zap,
  Brain,
  Grid3X3,
} from "lucide-react";

const navigationCards = [
  {
    id: "tokens",
    title: "Token Studio",
    description: "Interactive token customization canvas",
    icon: Palette,
    href: "/design-system",
    features: ["500+ design tokens", "6 domains × 6 palettes", "Live contrast checker"],
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
  },
  {
    id: "platforms",
    title: "Platform Adapters",
    description: "10+ platform outputs from single source",
    icon: Smartphone,
    href: "/design-system-v2/platforms",
    features: ["Web, Mobile, Voice, AR", "Live previews", "Code export"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: "frameworks",
    title: "Framework Comparison",
    description: "Tailwind vs Bootstrap vs Ant Design",
    icon: Code2,
    href: "/design-system-v2/frameworks",
    features: ["30 components", "Shared token layer", "Live code export"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    id: "agentic",
    title: "Agentic UI Patterns",
    description: "AI-first interaction patterns & components",
    icon: Sparkles,
    href: "/design-system-v2/agentic",
    features: ["5 interactive demos", "Psychology notes", "Best practices"],
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: "hybrid",
    title: "Hybrid UI Demo",
    description: "Density modes for B2B SaaS applications",
    icon: Sliders,
    href: "/design-system-v2/hybrid",
    features: ["Relaxed/Default/Compact", "Auto-detection logic", "Mini demo app"],
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    id: "download",
    title: "Download Tokens",
    description: "Export in multiple formats",
    icon: Download,
    href: "/design-system-v2/download",
    features: ["NPM package", "Figma plugin", "JSON/CSS/SCSS"],
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
  },
];

const metrics = [
  { value: "500+", label: "Design Tokens", icon: Layers },
  { value: "10+", label: "Platforms", icon: Grid3X3 },
  { value: "30", label: "Components", icon: Code2 },
  { value: "5", label: "AI Patterns", icon: Brain },
];

export default function DesignSystemV2Page() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E8E6E1] bg-gradient-to-b from-[#2D3561]/5 via-transparent to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,53,97,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2D3561]/20 bg-[#2D3561]/10 px-4 py-2 text-sm text-[#2D3561] font-medium">
              <Zap className="h-4 w-4" />
              Design System V2.0 — Published Research
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#2B2B2B] lg:text-6xl">
              Intelligence-Native Design System
            </h1>
            
            <p className="mb-8 text-xl text-[#4B4B4B]">
              A token-first design system supporting 10+ platforms with framework-agnostic architecture,
              5 Agentic AI patterns, 3 B2B density modes, and 96 pages of published research documenting
              design decisions AI cannot replicate.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/design-system"
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4663E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B85330]"
              >
                Explore Token Studio
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/docs/DESIGN-SYSTEM-EVOLUTION-PLAN.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#2D3561] bg-[#2D3561] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1F2847]"
              >
                <Brain className="h-4 w-4" />
                96-Page Research Doc
              </a>
              <Link
                href="/design-system-v2/platforms"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-6 py-3 font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
              >
                View Platforms
              </Link>
              <Link
                href="/design-system-v2/download"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-6 py-3 font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
              >
                <Download className="h-4 w-4" />
                Download
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="border-b border-[#E8E6E1] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2D3561]/10">
                    <Icon className="h-6 w-6 text-[#2D3561]" />
                  </div>
                  <div className="text-3xl font-bold text-[#2B2B2B]">{metric.value}</div>
                  <div className="text-sm text-[#6B6B6B]">{metric.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">Explore the System</h2>
            <p className="text-lg text-[#6B6B6B]">
              Six integrated sections covering tokens, platforms, frameworks, and patterns
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {navigationCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={card.href}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white p-6 transition-all hover:border-[#2D3561]/30 hover:shadow-lg"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 transition-opacity group-hover:opacity-5`} />
                    
                    {/* Content */}
                    <div className="relative">
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${card.borderColor} bg-[#FAFAF8]`}>
                        <Icon className="h-6 w-6 text-[#2D3561]" />
                      </div>
                      
                      <h3 className="mb-2 text-xl font-semibold text-[#2B2B2B]">
                        {card.title}
                      </h3>
                      
                      <p className="mb-4 text-sm text-[#6B6B6B]">
                        {card.description}
                      </p>
                      
                      <ul className="mb-4 space-y-2">
                        {card.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-[#4B4B4B]">
                            <div className="h-1 w-1 rounded-full bg-[#D4663E]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex items-center gap-2 text-sm font-medium text-[#D4663E] transition-transform group-hover:translate-x-1">
                        Explore
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="border-t border-[#E8E6E1] bg-[#F5F5F3] py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#2B2B2B]">
            Why Multi-Platform?
          </h2>
          
          <div className="space-y-6 text-[#4B4B4B]">
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Token-First Architecture</h3>
              <p className="text-sm">
                Design decisions stored as JSON tokens, not hardcoded CSS. Single source of truth
                generates outputs for web (CSS variables), mobile (JS objects, Swift structs), voice (SSML),
                and AR (spatial units).
              </p>
            </div>
            
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Framework Agnostic</h3>
              <p className="text-sm">
                Works with Tailwind, Bootstrap, Ant Design, and any CSS-in-JS solution. Tokens translate
                to each framework's conventions automatically, reducing vendor lock-in.
              </p>
            </div>
            
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">AI-First Patterns</h3>
              <p className="text-sm">
                Includes Agentic UI patterns (proactive suggestions, conversational forms, adaptive dashboards)
                grounded in cognitive psychology research. Future-proof for AI-powered products.
              </p>
            </div>
            
            <div className="rounded-xl border border-[#E8E6E1] bg-white p-6">
              <h3 className="mb-2 font-semibold text-[#2B2B2B]">Adaptive Density</h3>
              <p className="text-sm">
                Hybrid UI system with three density modes (relaxed, default, compact) solves the novice vs.
                power user problem in B2B SaaS. Auto-detection based on behavioral metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-[#2B2B2B]">
            Ready to Explore?
          </h2>
          <p className="mb-8 text-lg text-[#6B6B6B]">
            Start with the Token Studio to see interactive customization, or jump to Platform Adapters
            to see cross-platform token translation in action.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/design-system"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4663E] px-8 py-4 font-medium text-white transition-colors hover:bg-[#B85330]"
            >
              Start with Token Studio
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/design-system-v2/agentic"
              className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6E1] bg-white px-8 py-4 font-medium text-[#2B2B2B] transition-colors hover:bg-[#F5F5F3]"
            >
              <Sparkles className="h-5 w-5" />
              View AI Patterns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
