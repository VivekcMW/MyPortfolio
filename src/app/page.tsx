"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";

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
          <motion.div
            animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-accent/4 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 30, 0], y: [0, 20, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/3 right-1/4 w-64 md:w-80 h-64 md:h-80 bg-accent-coral/3 rounded-full blur-3xl"
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
                    digital products.
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
              <div className="rounded-xl border border-border bg-surface/80 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.06)]">
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
            <span
              key={domain.name}
              className={`px-4 sm:px-5 py-2 rounded-full bg-surface border border-border text-xs sm:text-sm font-semibold ${domain.color} whitespace-nowrap`}
            >
              {domain.name}
            </span>
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

      {/* ===== SELECTED WORK ===== */}
      <Section id="work">
        <SectionHeader
          eyebrow="Selected Work"
          title="Products that made an impact."
          description="From NoCode platforms to real-time IoT dashboards — each project pushed the boundaries of design and engineering."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </Section>

      {/* ===== APPROACH ===== */}
      <Section>
        <SectionHeader
          eyebrow="My Approach"
          title="Design is how it works."
          description="I bring a systematic, data-informed approach to every product I touch."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Research & Discover",
              desc: "Deep-dive into user needs, business context, and technical constraints. I believe in designing with data, not assumptions.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
            },
            {
              num: "02",
              title: "Design & Prototype",
              desc: "Rapid iteration from wireframes to high-fidelity. I design in Figma and prototype in code — bridging the gap between vision and reality.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
            },
            {
              num: "03",
              title: "Build & Ship",
              desc: "From pixels to production. I write the frontend code that brings designs to life, ensuring every interaction is pixel-perfect.",
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
            },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group p-5 sm:p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all duration-500"
            >
              <div className="text-4xl mb-6">{step.icon}</div>
              <div className="text-accent font-mono text-sm mb-2">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed">{step.desc}</p>
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
              <Link
                href="/contact"
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,255,0.3)]"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
