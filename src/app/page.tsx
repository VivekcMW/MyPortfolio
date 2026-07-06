"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import FluidText from "@/components/FluidText";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import Magnetic from "@/components/Magnetic";

const projects = [
  {
    title: "NoCode / LowCode Platform",
    category: "Platform Design",
    description:
      "Designed an intuitive visual builder empowering non-engineers to create complex applications — reducing development dependency by 60% and accelerating go-to-market.",
    tags: ["Design Systems", "React", "Figma", "User Research"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
    href: "/work/nocode-platform",
  },
  {
    title: "EHR Healthcare Platform",
    category: "Healthcare UX",
    description:
      "Reimagined clinical workflows for electronic health records, making complex medical data accessible and actionable — saving clinicians 2+ hours daily.",
    tags: ["Healthcare", "Data Viz", "Accessibility", "Design Thinking"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    href: "/work/ehr-platform",
  },
  {
    title: "IoT Command Center",
    category: "IoT / BigData",
    description:
      "Built a real-time monitoring dashboard for connected devices, making complex sensor data elegant and actionable at scale.",
    tags: ["IoT", "Real-time", "Dashboard", "D3.js"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    href: "/work/iot-dashboard",
  },
  {
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    description:
      "Scaled UI for millions of data points in a video-on-demand platform, balancing content discovery with performance.",
    tags: ["OTT", "BigData", "Content Strategy", "Performance"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    href: "/work/ott-platform",
  },
];

const featuredPosts = [
  {
    title: "The Psychology Behind My Design Tokens: 8 Decisions, Explained",
    excerpt:
      "This portfolio is case study zero. Every color, motion curve, and contrast ratio on this site encodes a perception principle — here are the eight decisions and the evidence behind each one.",
    date: "Jul 2026",
    readTime: "10 min read",
    category: "Design Systems",
    slug: "psychology-of-design-tokens",
  },
  {
    title: "Design Thinking in AdTech: How OOH is Going Digital",
    excerpt:
      "The OOH advertising industry is undergoing a massive digital transformation — how design thinking is reshaping how brands connect with audiences in physical spaces.",
    date: "Mar 2026",
    readTime: "8 min read",
    category: "Industry Insights",
    slug: "design-thinking-adtech-ooh",
  },
  {
    title: "Building Design Systems That Scale",
    excerpt:
      "Lessons from building component libraries across multiple products and teams.",
    date: "Feb 2026",
    readTime: "6 min read",
    category: "Design Systems",
    slug: "building-design-systems-scale",
  },
];

/* ===== Horizontal Scroll Projects Section ===== */
function HorizontalScrollProjects({ projects }: { projects: Array<{ title: string; category: string; description: string; tags: string[]; image: React.ReactNode; href: string }> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-65%"]);

  return (
    <section id="work" ref={containerRef} className="relative" style={{ height: `${(projects.length + 1) * 50}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
          <SectionHeader
            eyebrow="Selected Work"
            title="Products that made an impact."
          />
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-4 sm:pl-8">
          {projects.map((project, i) => (
            <div key={project.title} className="w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0">
              <ProjectCard {...project} index={i} />
            </div>
          ))}
          {/* End card — CTA */}
          <div className="w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 flex items-center justify-center">
            <Link
              href="/work/nocode-platform"
              className="group flex flex-col items-center gap-4 text-center p-12 rounded-2xl border border-border hover:border-accent/30 bg-surface transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border-2 border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <span className="text-xl font-bold">View All Work</span>
              <span className="text-muted text-sm">Explore the full case studies</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Stacked Approach Cards ===== */
const approachSteps = [
  {
    num: "01",
    title: "Designer",
    desc: "Systems thinker, not screen pusher. I design with the builder's mind — every component is a token, every layout anticipates edge cases. Design systems that 10 engineers use without asking questions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    color: "var(--color-accent-designer)",
  },
  {
    num: "02",
    title: "Builder",
    desc: "From pixels to production in the same sprint. I write the React, TypeScript, and Next.js that makes design real — not throwaway prototypes, but actual code that ships to millions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    color: "var(--color-accent)",
  },
  {
    num: "03",
    title: "Product Scaler",
    desc: "Shipping features is table stakes. I connect user problems to business outcomes, identify the 20% of work that drives 80% of growth, and design for 100 users and 2 million simultaneously.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    color: "var(--color-accent-scaler)",
  },
];

function StackedApproachCard({ step, index }: { step: typeof approachSteps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);

  return (
    <div ref={cardRef} style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity, top: `calc(6rem + ${index * 2.5}rem)`, borderColor: "transparent" }}
        className="sticky w-full group p-6 sm:p-10 rounded-2xl bg-surface border border-border transition-all duration-500"
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = step.color + "33"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${step.color}1F`, color: step.color }}
            >
              {step.icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-sm mb-2" style={{ color: step.color }}>{step.num}</div>
            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted leading-relaxed max-w-xl">{step.desc}</p>
          </div>
          <div className="hidden md:block text-8xl font-bold text-border/30 font-mono">
            {step.num}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StackedApproachCards() {
  return (
    <div className="space-y-8">
      {approachSteps.map((step, i) => (
        <StackedApproachCard key={step.num} step={step} index={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const terminalContent = useMemo(
    () => ({
      design: {
        file: "design.figma",
        lines: [
          { type: "comment" as const, text: "// Component library structure" },
          { type: "command" as const, text: "$ figma export --system" },
          { type: "blank" as const, text: "" },
          { type: "output" as const, text: "  ├── foundations/" },
          { type: "output" as const, text: "  │   ├── colors.tokens    (24 vars)" },
          { type: "output" as const, text: "  │   ├── typography        (8 scales)" },
          { type: "output" as const, text: "  │   └── spacing           (12 steps)" },
          { type: "output" as const, text: "  ├── components/" },
          { type: "success" as const, text: "  │   ├── Button ✓         (6 variants)" },
          { type: "success" as const, text: "  │   ├── Card ✓           (4 variants)" },
          { type: "loading" as const, text: "  │   └── DataTable ◌      (building...)" },
          { type: "accent" as const, text: "  └── 94% design system coverage" },
        ],
      },
      build: {
        file: "index.tsx",
        lines: [
          { type: "comment" as const, text: "// Production build pipeline" },
          { type: "command" as const, text: "$ next build --turbopack" },
          { type: "blank" as const, text: "" },
          { type: "success" as const, text: "✓ Compiled successfully     (1.2s)" },
          { type: "success" as const, text: "✓ TypeScript                (0 errors)" },
          { type: "success" as const, text: "✓ Lint                      (0 warnings)" },
          { type: "success" as const, text: "✓ Unit tests                (148 passed)" },
          { type: "success" as const, text: "✓ Integration tests         (32 passed)" },
          { type: "blank" as const, text: "" },
          { type: "output" as const, text: "  Bundle size: 142kb (gzipped)" },
          { type: "output" as const, text: "  First paint:  0.8s" },
          { type: "accent" as const, text: "  Lighthouse:   98 / 100" },
        ],
      },
      scale: {
        file: "growth.ts",
        lines: [
          { type: "comment" as const, text: "// Measuring product impact" },
          { type: "command" as const, text: "$ analyze --product growth" },
          { type: "blank" as const, text: "" },
          { type: "success" as const, text: "✓ User retention        +38% QoQ" },
          { type: "success" as const, text: "✓ Time-to-ship          -60% vs prev" },
          { type: "success" as const, text: "✓ Design system coverage  94%" },
          { type: "loading" as const, text: "◌ Scaling to next market... ████░░ 72%" },
          { type: "blank" as const, text: "" },
          { type: "output" as const, text: "  Sessions: 2.4M / month" },
          { type: "output" as const, text: "  Markets:  30+ countries" },
          { type: "accent" as const, text: "  Impact:   measured, not assumed" },
        ],
      },
    }),
    []
  );

  const roles = [
    { word: "design", color: "text-accent" },
    { word: "build",  color: "text-accent-coral" },
    { word: "scale",  color: "text-accent" },
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0].word);
  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const scrambleTo = useCallback(
    (target: string) => {
      let iteration = 0;
      const totalIterations = 10;
      const interval = setInterval(() => {
        iteration++;
        const revealed = Math.floor((iteration / totalIterations) * target.length);
        let result = "";
        for (let i = 0; i < target.length; i++) {
          if (i < revealed) {
            result += target[i];
          } else {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        setDisplayText(result);
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(target);
        }
      }, 40);
    },
    [scrambleChars]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => {
        const next = (prev + 1) % roles.length;
        scrambleTo(roles[next].word);
        return next;
      });
    }, 2800);
    return () => clearInterval(timer);
  }, [scrambleTo, roles.length]);

  const activeTerminal = terminalContent[roles[roleIndex].word as keyof typeof terminalContent];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_70%)]" />
          {/* Static ambient glows — motion is reserved for the terminal (one moment per screen) */}
          <div className="absolute top-[15%] left-[20%] w-[28rem] h-[28rem] bg-accent/6 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[24rem] h-[24rem] bg-accent-coral/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Word rotator */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
                  <span className="block">I</span>
                  <span className="block mt-1">
                    <span className="inline-block font-mono transition-colors duration-300 text-accent">
                      build
                    </span>
                  </span>
                  <span className="block mt-1 text-foreground/70 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <FluidText text="design organizations." minWeight={300} maxWeight={800} radius={100} />
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-6 text-base md:text-lg text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                <span className="text-foreground/90 font-medium">
                  I run design like an engineering discipline
                </span>{" "}
                — systems, tokens, and shipped code. I build design teams, design
                systems, and the strategies that turn complex problems into
                products used in 30+ countries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 flex items-center justify-center lg:justify-start gap-2"
              >
                {roles.map((role, i) => (
                  <button
                    key={role.word}
                    onClick={() => { setRoleIndex(i); scrambleTo(roles[i].word); }}
                    className="group flex items-center gap-1.5"
                  >
                    <motion.div
                      animate={{
                        width: roleIndex === i ? 24 : 8,
                        backgroundColor: roleIndex === i ? "var(--color-accent)" : "var(--color-border)",
                      }}
                      className="h-1.5 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Right: Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeTerminal.file}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-mono text-muted"
                    >
                      {activeTerminal.file}
                    </motion.span>
                  </AnimatePresence>
                  <div className="w-4 h-4 text-muted">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed min-h-80 sm:min-h-90">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={roleIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTerminal.lines.map((line, i) => (
                        <motion.div
                          key={`${roleIndex}-${i}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                          className={`py-0.5 ${
                            line.type === "comment"
                              ? "text-muted/50"
                              : line.type === "command"
                                ? "text-accent"
                                : line.type === "success"
                                  ? "text-green-400"
                                  : line.type === "loading"
                                    ? "text-yellow-400"
                                    : line.type === "accent"
                                      ? "text-accent font-medium"
                                      : line.type === "blank"
                                        ? "h-4"
                                        : "text-foreground/70"
                          }`}
                        >
                          {line.text}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT SPOTLIGHTS ===== */}
      <section className="relative border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                value: "30+",
                label: "Countries",
                title: "Global OOH/DOOH Scale",
                desc: "Design systems and products shipped across 30+ countries via the Moving Walls platform — reaching millions of screens daily.",
                href: "/work/ehr-platform",
              },
              {
                value: "60%",
                label: "Faster Delivery",
                title: "NoCode Platform",
                desc: "Reduced development dependency by 60% with an intuitive visual builder — non-engineers shipping production apps independently.",
                href: "/work/nocode-platform",
              },
              {
                value: "94%",
                label: "Coverage",
                title: "Design System Maturity",
                desc: "Token-driven component library covering 94% of product surfaces — one source of truth, zero handoff friction across 3 products.",
                href: "/design-system",
              },
            ].map((spot, i) => (
              <motion.div
                key={spot.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="px-6 py-7 sm:py-9 bg-background group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-foreground tabular-nums tracking-tight">
                    {spot.value}
                  </div>
                  <div className="text-[11px] font-mono text-muted uppercase tracking-widest leading-tight">
                    {spot.label}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {spot.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-3">
                  {spot.desc}
                </p>
                <Link
                  href={spot.href}
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  View case study
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-muted/70 font-mono">
            * Metrics measured on shipped releases at Moving Walls and client engagements, 2018–2026. Methodology and context in each case study.
          </p>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted text-sm font-mono uppercase tracking-widest mb-8">
            Built products for teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {[
              { name: "AI Agents for B2B Apps", highlight: true },
              { name: "OOH/DOOH", highlight: false },
              { name: "Construction Cloud", highlight: false },
              { name: "IIoT Platforms", highlight: false },
              { name: "Enterprise B2B", highlight: false },
              { name: "NoCode/LowCode Startup", highlight: false },
              { name: "Healthcare SaaS (India)", highlight: false },
            ].map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`text-lg md:text-xl font-bold tracking-tight ${
                  company.highlight ? "text-foreground" : "text-muted/40"
                } hover:text-foreground/70 transition-colors`}
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ===== SELECTED WORK ===== */}
      {/* Mobile / tablet: simple vertical grid (horizontal scroll unusable < lg) */}
      <Section className="lg:hidden">
        <SectionHeader eyebrow="Selected Work" title="Products that made an impact." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/work/nocode-platform"
            className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-200"
          >
            View all case studies
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </Section>
      {/* Desktop: sticky horizontal scroll */}
      <div className="hidden lg:block">
        <HorizontalScrollProjects projects={projects} />
      </div>

      {/* ===== APPROACH (Stacked Cards) ===== */}
      <Section>
        {/* Margin annotation */}
        <div className="absolute left-0 top-0 bottom-0 hidden lg:flex items-center pl-2 pointer-events-none select-none">
          <span
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ writingMode: "vertical-rl", color: "var(--color-border)" }}
          >
            [ 03 / PILLARS ]
          </span>
        </div>
        <SectionHeader
          eyebrow="The Three Pillars"
          title="Three rare things. One person."
          description="Most teams hire separately for design, engineering, and product strategy. Here's why you shouldn't have to."
        />
        <StackedApproachCards />
      </Section>

      {/* ===== WHAT I CAN HELP WITH ===== */}
      <Section>
        <SectionHeader
          eyebrow="Services"
          title="What I bring to the table."
          description="Whether you need a design system, production code, or product thinking — I cover it end-to-end."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Design Systems",
              desc: "Token-driven component libraries that give teams velocity. One source of truth — design decisions encoded into code, zero handoff friction.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              ),
            },
            {
              title: "Product Engineering",
              desc: "Production-grade React, Next.js, and TypeScript that brings designs to life in the same sprint. Pixel-perfect, accessible, Lighthouse 98+ by default.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              ),
            },
            {
              title: "Product Thinking",
              desc: "Connecting UX decisions to business metrics. Identifying the 20% of work that drives 80% of growth — and knowing what not to build.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              ),
            },
            {
              title: "Design Leadership",
              desc: "Building design functions from scratch — systems, culture, hiring, and standards that compound over time and scale with the team.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              ),
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== LATEST THINKING ===== */}
      <Section>
        <SectionHeader
          eyebrow="Latest Thinking"
          title="Insights & Ideas."
          description="Writing about design systems, AdTech, AI-powered workflows, and the future of digital experiences."
        />
        <div className="space-y-8">
          <BlogCard {...featuredPosts[0]} index={0} featured slug={featuredPosts[0].slug} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.slice(1).map((post, i) => (
              <BlogCard key={post.slug} {...post} index={i + 1} />
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
          >
            Read all posts
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </Section>

      {/* ===== CTA BANNER — the designed ending (peak‑end) ===== */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-surface border border-border p-8 sm:p-12 md:p-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-150 h-50 sm:h-75 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-mono text-foreground/80">
                Available for select engagements · responds within 24h
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Let&apos;s build something{" "}
              <span className="text-gradient">extraordinary.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg max-w-xl mx-auto mb-8"
            >
              Whether you&apos;re a startup looking for a design partner or a
              FAANG team seeking a design engineer — I&apos;d love to chat.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Magnetic strength={0.4} scaleOnHover={1.05}>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  Get in Touch
                </Link>
              </Magnetic>
              <a
                href="mailto:vivekanand.design@gmail.com"
                className="text-sm font-mono text-muted hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
              >
                vivekanand.design@gmail.com
              </a>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
