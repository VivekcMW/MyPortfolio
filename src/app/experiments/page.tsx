"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Section, SectionHeader } from "@/components/Section";
import Link from "next/link";

interface Experiment {
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: "active" | "experimenting" | "archived";
  links?: { label: string; href: string }[];
  icon: React.ReactNode;
}

const experiments: Experiment[] = [
  // ── AI Agents & Workflows ──
  {
    title: "Custom Cursor Rules Engine",
    description:
      "Built a modular rules engine for Cursor IDE that enforces project conventions, generates context-aware code, and auto-applies design token patterns across React components.",
    category: "AI Agents & Workflows",
    tags: ["Cursor", "AI Agents", "TypeScript", "Design Tokens"],
    status: "active",
    links: [
      { label: "AGENTS.md", href: "/AGENTS.md" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/>
      </svg>
    ),
  },
  {
    title: "AI Agent Skill System",
    description:
      "Designed a skill-plugin architecture for AI coding agents — composable, context-aware modules that let agents load domain-specific expertise on demand (React, Next.js, Tailwind).",
    category: "AI Agents & Workflows",
    tags: ["AI Agents", "Plugin Architecture", "Prompt Engineering", "Developer Tools"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "n8n Automation Pipeline for Design Ops",
    description:
      "Self-hosted n8n workflows that automate design system changelog generation, Figma-to-Storybook sync, Slack notifications on component updates, and GitHub release notes.",
    category: "AI Agents & Workflows",
    tags: ["n8n", "Automation", "Figma", "DevOps", "Design Ops"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Multi-Agent Code Review Pipeline",
    description:
      "Orchestrated a pipeline where Claude, GPT-4, and a local model each review PRs from different angles — architecture, a11y, performance — then consolidate into a single actionable report.",
    category: "AI Agents & Workflows",
    tags: ["Claude", "GPT-4", "Code Review", "CI/CD", "AI Agents"],
    status: "experimenting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>
      </svg>
    ),
  },

  // ── Design System Experiments ──
  {
    title: "Fluid Typography Scale Generator",
    description:
      "Experiment with a clamp()-based fluid type scale that adapts to viewport. Generated 12-step scale with configurable min/max ratios and exported as CSS custom properties.",
    category: "Design System Experiments",
    tags: ["CSS", "Typography", "Design Tokens", "Fluid Design"],
    status: "active",
    links: [
      { label: "Live Demo", href: "/design-system" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
  },
  {
    title: "Magnetic Interaction Primitives",
    description:
      "Built a reusable Magnetic component library with configurable strength, scale-on-hover, and spring physics. Used across CTAs, cards, and nav items for subtle interactive delight.",
    category: "Design System Experiments",
    tags: ["Framer Motion", "Interaction Design", "React", "Animations"],
    status: "active",
    links: [
      { label: "Component", href: "/src/components/Magnetic.tsx" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: "TiltCard & Parallax Depth System",
    description:
      "Created a 3D tilt card component using mouse tracking and CSS perspective transforms. Explored depth layering, glare effects, and performant hardware-accelerated animations.",
    category: "Design System Experiments",
    tags: ["React", "3D Effects", "CSS", "Interaction Design"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    title: "Theme-Aware Component Tokens",
    description:
      "Prototyped a token system where every component variant is aware of the active theme dimension (AdTech, Health, FinTech). Colors, radii, and motion parameters shift per domain.",
    category: "Design System Experiments",
    tags: ["Design Tokens", "Theming", "CSS Variables", "System Design"],
    status: "archived",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },

  // ── Tech Prototypes ──
  {
    title: "Real-Time IoT Data Viz Engine",
    description:
      "Built a WebSocket-powered dashboard prototype that renders thousands of IoT data points in real-time using Canvas-based rendering. Explored quadtree indexing for performant scatter plots.",
    category: "Tech Prototypes",
    tags: ["WebSocket", "Canvas", "D3.js", "IoT", "Performance"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    title: "MDX-Based Blog Engine",
    description:
      "Full MDX blog implementation with gray-matter frontmatter, reading time estimation, rehype plugins for syntax highlighting, and dynamic OG image generation per post.",
    category: "Tech Prototypes",
    tags: ["MDX", "Next.js", "Content Layer", "SEO", "Open Graph"],
    status: "active",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Source", href: "/src/lib/blog.ts" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    title: "Design-to-Code Bridge with Storybook",
    description:
      "Prototyped a workflow that auto-generates Storybook stories from Figma component metadata, creating a live component catalogue synced with the design system tokens.",
    category: "Tech Prototypes",
    tags: ["Storybook", "Figma", "Design Tokens", "React", "Automation"],
    status: "experimenting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    title: "Smooth Scroll + Lenis Integration",
    description:
      "Integrated Lenis smooth scrolling with Framer Motion animations, solving for scroll-linked animations, parallax, and horizontal scroll sections without layout breakage.",
    category: "Tech Prototypes",
    tags: ["Lenis", "Framer Motion", "Scroll Animations", "Performance"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },

  // ── Real-World Use Cases ──
  {
    title: "OOH Campaign Planning Workflow",
    description:
      "Designed and prototyped an end-to-end campaign planning experience for DOOH advertising — from audience selection and inventory booking to real-time performance analytics.",
    category: "Real-World Use Cases",
    tags: ["AdTech", "OOH/DOOH", "UX Research", "Data Viz", "Workflow Design"],
    status: "active",
    links: [
      { label: "Case Study", href: "/work/nocode-platform" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    title: "EHR Clinical Dashboard Redesign",
    description:
      "Reimagined the clinician dashboard for an EHR platform — reducing cognitive load with progressive disclosure, smart defaults, and context-aware data panels. Saved 2h/day per clinician.",
    category: "Real-World Use Cases",
    tags: ["Healthcare", "EHR", "Dashboard Design", "Accessibility", "UX Research"],
    status: "active",
    links: [
      { label: "Case Study", href: "/work/ehr-platform" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: "Multi-Tenant Design System for AdTech",
    description:
      "Architected a design system that serves 4+ product lines under one brand umbrella — shared tokens with per-product overrides, component variants, and a unified Storybook catalogue.",
    category: "Real-World Use Cases",
    tags: ["Design Systems", "AdTech", "Scalability", "Theming", "Storybook"],
    status: "active",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    title: "NoCode Platform Visual Builder",
    description:
      "Built the interaction model and component library for a visual app builder — drag-and-drop canvas, property panels, real-time preview. Reduced dev dependency by 60% for standard apps.",
    category: "Real-World Use Cases",
    tags: ["NoCode", "LowCode", "Visual Builder", "Interaction Design", "React"],
    status: "archived",
    links: [
      { label: "Case Study", href: "/work/nocode-platform" },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/>
      </svg>
    ),
  },
];

const categories = [
  "All",
  "AI Agents & Workflows",
  "Design System Experiments",
  "Tech Prototypes",
  "Real-World Use Cases",
];

const statusConfig = {
  active: { label: "Active", color: "#10B981", bg: "#10B98115" },
  experimenting: { label: "Experimenting", color: "#F59E0B", bg: "#F59E0B15" },
  archived: { label: "Archived", color: "#6B7280", bg: "#6B728015" },
} as const;

const categoryColors: Record<string, string> = {
  "AI Agents & Workflows": "#8B5CF6",
  "Design System Experiments": "#EC4899",
  "Tech Prototypes": "#06B6D4",
  "Real-World Use Cases": "#10B981",
};

function ExperimentCard({
  experiment,
  index,
}: {
  experiment: Experiment;
  index: number;
}) {
  const status = statusConfig[experiment.status];
  const catColor = categoryColors[experiment.category] || "var(--color-accent)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: catColor + "12",
            borderColor: catColor + "25",
            color: catColor,
          }}
        >
          {experiment.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
              {experiment.title}
            </h3>
            <span
              className="shrink-0 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border whitespace-nowrap"
              style={{
                backgroundColor: status.bg,
                borderColor: status.color + "30",
                color: status.color,
              }}
            >
              {status.label}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {experiment.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                style={{
                  borderColor: catColor + "18",
                  color: catColor,
                  backgroundColor: catColor + "08",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {experiment.links && experiment.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {experiment.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium transition-colors"
                  style={{ color: catColor }}
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperimentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? experiments
        : experiments.filter((e) => e.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="pt-24">
      {/* Hero */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
              The Lab
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Experiments &{" "}
              <span className="text-gradient">Use Cases.</span>
            </h1>
            <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto">
              A living collection of hands-on explorations — from AI agent
              architectures and design system primitives to real-world problems
              solved across AdTech, Healthcare, and IoT.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Filter Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const catColor = cat === "All" ? "var(--color-accent)" : (categoryColors[cat] || "var(--color-accent)");
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? catColor + "15" : "var(--color-surface)",
                    borderColor: isActive ? catColor + "35" : "var(--color-border)",
                    color: isActive ? catColor : "var(--color-muted)",
                    borderWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="cat-indicator"
                      className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full"
                      style={{ backgroundColor: catColor }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filtered.map((exp, i) => (
                <ExperimentCard key={exp.title} experiment={exp} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted py-20 font-mono text-sm"
            >
              No experiments in this category yet.
            </motion.p>
          )}

          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-xs font-mono text-muted">
                Showing {filtered.length} of {experiments.length} experiments
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
