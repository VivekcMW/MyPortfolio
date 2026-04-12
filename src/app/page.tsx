"use client";

import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import FluidText from "@/components/FluidText";
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
    title: "Design Thinking in AdTech: How OOH is Going Digital",
    excerpt:
      "The Out-of-Home advertising industry is undergoing a massive digital transformation. Here's how design thinking is reshaping how brands connect with audiences in physical spaces.",
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
  {
    title: "AI is Changing How We Design — Here's How I Use It",
    excerpt:
      "From AI-assisted prototyping to intelligent layout suggestions, here's my workflow.",
    date: "Jan 2026",
    readTime: "5 min read",
    category: "AI × Design",
    slug: "ai-changing-design",
  },
];

const stats = [
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Products Shipped", value: 15, suffix: "+" },
  { label: "Design Systems Built", value: 5, suffix: "" },
];

function AnimatedCounter({
  value,
  suffix,
}: Readonly<{
  value: number;
  suffix: string;
}>) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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
    title: "Research & Discover",
    desc: "Deep-dive into user needs, business context, and technical constraints. I believe in designing with data, not assumptions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    accent: "from-accent/20 to-accent/5",
  },
  {
    num: "02",
    title: "Design & Prototype",
    desc: "Rapid iteration from wireframes to high-fidelity. I design in Figma and prototype in code — bridging the gap between vision and reality.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    accent: "from-accent-coral/20 to-accent-coral/5",
  },
  {
    num: "03",
    title: "Build & Ship",
    desc: "From pixels to production. I write the frontend code that brings designs to life, ensuring every interaction is pixel-perfect.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    accent: "from-accent/20 to-accent/5",
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
        style={{ scale, opacity, top: `calc(6rem + ${index * 2.5}rem)` }}
        className="sticky w-full group p-6 sm:p-10 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center`}>
              {step.icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-accent font-mono text-sm mb-2">{step.num}</div>
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
  const roles = [
    { word: "research", color: "text-accent" },
    { word: "design", color: "text-accent-coral" },
    { word: "build", color: "text-accent" },
    { word: "ship", color: "text-accent-coral" },
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0].word);
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const scrambleTo = useCallback(
    (target: string) => {
      setIsScrambling(true);
      const maxLen = Math.max(displayText.length, target.length);
      let iteration = 0;
      const totalIterations = 10;
      const interval = setInterval(() => {
        iteration++;
        const revealed = Math.floor((iteration / totalIterations) * target.length);
        let result = "";
        for (let i = 0; i < maxLen; i++) {
          if (i < revealed) {
            result += target[i] || "";
          } else if (i < target.length) {
            result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        setDisplayText(result);
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(target);
          setIsScrambling(false);
        }
      }, 40);
    },
    [displayText.length]
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

  const terminalContent = useMemo(
    () => ({
      research: {
        file: "research.ts",
        lines: [
          { type: "comment" as const, text: "// Analyzing user behavior patterns" },
          { type: "command" as const, text: "$ analyze --sessions 2,847" },
          { type: "blank" as const, text: "" },
          { type: "success" as const, text: "✓ User interviews       (24 sessions)" },
          { type: "success" as const, text: "✓ Heatmap analysis      (complete)" },
          { type: "success" as const, text: "✓ Journey mapping       (5 flows)" },
          { type: "loading" as const, text: "◌ Insight synthesis...   ██████░░ 78%" },
          { type: "blank" as const, text: "" },
          { type: "output" as const, text: "> 3 critical pain points identified" },
          { type: "output" as const, text: "> Drop-off at step 4: 62% of users" },
          { type: "accent" as const, text: "> Recommendation: Simplify onboarding" },
        ],
      },
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
      ship: {
        file: "deploy.yml",
        lines: [
          { type: "comment" as const, text: "// Deploying to production" },
          { type: "command" as const, text: "$ deploy --env production" },
          { type: "blank" as const, text: "" },
          { type: "success" as const, text: "✓ Pre-flight checks         (passed)" },
          { type: "success" as const, text: "✓ Database migrations       (2 applied)" },
          { type: "success" as const, text: "✓ Edge functions            (deployed)" },
          { type: "success" as const, text: "✓ CDN cache invalidated     (global)" },
          { type: "blank" as const, text: "" },
          { type: "output" as const, text: "  Region: 12 edge locations" },
          { type: "output" as const, text: "  Uptime: 99.99% SLA" },
          { type: "accent" as const, text: "  ● Live at production.app  →  ● Live" },
        ],
      },
    }),
    []
  );

  const activeTerminal = terminalContent[roles[roleIndex].word as keyof typeof terminalContent];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-accent) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_70%)]" />

          {/* Animated mesh gradient blobs */}
          <motion.div
            animate={{
              x: [0, 50, -30, 20, 0],
              y: [0, -40, 20, -10, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
              borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 30% 70% / 60% 40% 60% 40%", "70% 30% 50% 50% / 40% 60% 40% 60%", "40% 60% 60% 40% / 50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[20%] w-[28rem] h-[28rem] bg-accent/6 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -40, 30, -20, 0],
              y: [0, 30, -40, 10, 0],
              scale: [1, 0.9, 1.15, 0.95, 1],
              borderRadius: ["50% 50% 30% 70% / 60% 40% 60% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%", "40% 60% 60% 40% / 50% 50% 50% 50%", "70% 30% 50% 50% / 40% 60% 40% 60%", "50% 50% 30% 70% / 60% 40% 60% 40%"],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[15%] w-[24rem] h-[24rem] bg-accent-coral/5 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 25, -35, 15, 0],
              y: [0, -20, 35, -25, 0],
              scale: [1, 1.1, 0.85, 1.05, 1],
              borderRadius: ["60% 40% 40% 60% / 60% 30% 70% 40%", "40% 60% 70% 30% / 30% 60% 40% 70%", "50% 50% 50% 50% / 50% 50% 50% 50%", "70% 30% 60% 40% / 40% 70% 30% 60%", "60% 40% 40% 60% / 60% 30% 70% 40%"],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[40%] left-[50%] w-[20rem] h-[20rem] bg-accent/4 blur-[80px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Eyebrow */}
              {/* Main Title with word rotator */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
                  <span className="block">I</span>
                  <span className="block mt-1">
                    <span
                      className={`inline-block font-mono transition-colors duration-300 ${roles[roleIndex].color}`}
                    >
                      {displayText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.75 h-[0.85em] bg-accent ml-1 align-middle"
                      />
                    </span>
                  </span>
                  <span className="block mt-1 text-foreground/70 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <FluidText text="digital products." minWeight={300} maxWeight={800} radius={100} />
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle — replaced by marquee below */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-6 text-base md:text-lg text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Where complex data meets elegant, user-centered experiences.
              </motion.p>

              {/* Role cycle indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 flex items-center justify-center lg:justify-start gap-2"
              >
                {roles.map((role, i) => (
                  <button
                    key={role.word}
                    onClick={() => {
                      setRoleIndex(i);
                      scrambleTo(roles[i].word);
                    }}
                    className="group flex items-center gap-1.5"
                  >
                    <motion.div
                      animate={{
                        width: roleIndex === i ? 24 : 8,
                        backgroundColor:
                          roleIndex === i
                            ? "var(--color-accent)"
                            : "var(--color-border)",
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
              <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-sm overflow-hidden shadow-lg shadow-accent/5">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeTerminal.file}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-mono text-muted"
                    >
                      {activeTerminal.file}
                    </motion.span>
                  </AnimatePresence>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 text-muted">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                    </div>
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

      {/* ===== INFINITE MARQUEE ===== */}
      <section className="relative py-16 overflow-hidden border-y border-border/40">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Top row — Data/Tech terms, scrolling LEFT */}
        <div className="mb-4 flex">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0"
          >
            {[...Array(2)].map((_, dupeIdx) => (
              <div key={dupeIdx} className="flex items-center">
                {["React", "TypeScript", "Next.js", "GraphQL", "D3.js", "PostgreSQL", "WebSocket", "REST API", "Figma API", "Node.js", "Tailwind", "Redis"].map((item) => (
                  <span
                    key={`${dupeIdx}-${item}`}
                    className="mx-3 sm:mx-4 px-4 py-2 rounded-full border border-border/50 text-xs sm:text-sm font-mono text-muted/60 whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center row — Domain highlights, static */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 my-4 relative z-20">
          {[
            { name: "AdTech", color: "text-accent" },
            { name: "Healthcare", color: "text-accent-coral" },
            { name: "IoT", color: "text-accent" },
            { name: "OTT", color: "text-accent-coral" },
          ].map((domain) => (
            <Magnetic key={domain.name} strength={0.35} scaleOnHover={1.08} tilt>
              <span
                className={`px-4 sm:px-5 py-2 rounded-full bg-surface border border-border text-xs sm:text-sm font-semibold ${domain.color} whitespace-nowrap cursor-default`}
              >
                {domain.name}
              </span>
            </Magnetic>
          ))}
        </div>

        {/* Bottom row — Design/UX terms, scrolling RIGHT */}
        <div className="mt-4 flex">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0"
          >
            {[...Array(2)].map((_, dupeIdx) => (
              <div key={dupeIdx} className="flex items-center">
                {["User Research", "Design Systems", "Wireframes", "Prototyping", "A11y", "Interaction Design", "Data Visualization", "Motion Design", "Design Thinking", "Usability Testing", "Information Architecture", "Visual Design"].map((item) => (
                  <span
                    key={`${dupeIdx}-${item}`}
                    className="mx-3 sm:mx-4 px-4 py-2 rounded-full border border-border/50 text-xs sm:text-sm font-mono text-muted/60 whitespace-nowrap"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

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
              { name: "Moving Walls", highlight: true },
              { name: "Healthcare SaaS", highlight: false },
              { name: "IoT Platforms", highlight: false },
              { name: "OTT Networks", highlight: false },
              { name: "Enterprise B2B", highlight: false },
              { name: "NoCode Startups", highlight: false },
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

      {/* ===== SELECTED WORK (Horizontal Scroll) ===== */}
      <HorizontalScrollProjects projects={projects} />

      {/* ===== APPROACH (Stacked Cards) ===== */}
      <Section>
        <SectionHeader
          eyebrow="My Approach"
          title="Design is how it works."
          description="I bring a systematic, data-informed approach to every product I touch."
        />
        <StackedApproachCards />
      </Section>

      {/* ===== WHAT I CAN HELP WITH ===== */}
      <Section>
        <SectionHeader
          eyebrow="Services"
          title="What I can help with."
          description="Whether you need a design leader, a hands-on builder, or both — here's how I add value."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Design Leadership",
              desc: "Building and scaling design teams, establishing design ops, and driving design strategy at the organizational level.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              ),
            },
            {
              title: "Product Design",
              desc: "End-to-end product design from research to high-fidelity prototypes. Specializing in complex data-heavy B2B products.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              ),
            },
            {
              title: "Design Systems",
              desc: "Creating token-driven, accessible component libraries that unify products and accelerate development across teams.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              ),
            },
            {
              title: "Frontend Engineering",
              desc: "Production-grade React, Next.js, and TypeScript. Pixel-perfect implementations with motion design and performance.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
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

      {/* ===== CTA BANNER ===== */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-surface border border-border p-8 sm:p-12 md:p-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-150 h-50 sm:h-75 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative z-10">
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
            >
              <Magnetic strength={0.4} scaleOnHover={1.05}>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  Get in Touch
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
