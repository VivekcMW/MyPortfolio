"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Section } from "@/components/Section";

/* ─── Story Chapter Type ─── */
interface StoryChapter {
  phase: string;
  year: string;
  title: string;
  narrative: string;
  details: string[];
  aside?: { label: string; value: string }[];
  visual?: "timeline" | "grid" | "flow" | "metrics";
}

/* ─── Project Data ─── */
interface ProjectDetail {
  title: string;
  category: string;
  heroDesc: string;
  timeline?: string;
  tags: string[];
  challenge: string;
  approach: string[];
  impact: string[];
  features: { title: string; desc: string }[];
  prototypeSlug: string;
  story?: StoryChapter[];
}

/* ─── NoCode Story Chapters ─── */
const nocodeStory: StoryChapter[] = [
  {
    phase: "01 — Market Signal",
    year: "2018",
    title: "The gap no one was filling",
    narrative:
      "It was early 2018. Enterprise teams were stuck between two extremes: clunky spreadsheets for simple tasks, or 6-month dev cycles for anything real. The low-code market — then valued at $4.3B by Forrester — was accelerating at 40% year-over-year, yet every tool forced users to choose between power and simplicity. We saw the white space: a platform that felt like design but worked like engineering.",
    details: [
      "Analyzed 14 competing platforms across capability matrices — Appian, OutSystems, Mendix, PowerApps, Salesforce Lightning",
      "Identified the 'complexity cliff' — every tool became unusable past a certain threshold of business logic",
      "Mapped enterprise budget patterns: teams were spending $280K+/year on custom internal tools that took months to ship",
      "Validated demand through 60+ stakeholder interviews across 12 organizations in APAC and MENA markets",
    ],
    aside: [
      { label: "Market (2018)", value: "$4.3B" },
      { label: "YoY Growth", value: "40%" },
      { label: "Avg. Tool Cost", value: "$280K/yr" },
    ],
    visual: "metrics",
  },
  {
    phase: "02 — Research",
    year: "2018",
    title: "Understanding the humans behind the problem",
    narrative:
      "We spent Q3–Q4 of 2018 embedded with our target users — business analysts building reports, ops managers tracking workflows, IT admins managing internal tools. Over 10 weeks, we conducted deep contextual inquiries across 3 countries. The goal was to understand their mental models, not impose ours.",
    details: [
      "Conducted 40+ contextual inquiry sessions — watching users struggle with existing tools in their real environment",
      "Ran card sorting workshops with 24 participants to understand how non-technical users categorize UI components",
      "Created 5 distinct user personas ranging from 'Spreadsheet Power User' to 'Citizen Developer'",
      "Built journey maps for 8 common workflows — identifying 23 friction points and 7 complete dead-ends",
      "Synthesized findings into an affinity diagram with 340+ data points clustered into 12 core themes",
    ],
    aside: [
      { label: "Interviews", value: "40+" },
      { label: "Personas", value: "5" },
      { label: "Friction Points", value: "23" },
    ],
    visual: "timeline",
  },
  {
    phase: "03 — Define",
    year: "2019",
    title: "Framing the right problem to solve",
    narrative:
      "Entering 2019 with 340+ research data points, we discovered something unexpected: users didn't just want to 'build apps' — they wanted to automate decisions. The real job-to-be-done was turning business logic into working software without waiting for engineering. This reframing changed everything about our design direction.",
    details: [
      "Distilled research into 3 design principles: Progressive Disclosure, Visible Logic, and Instant Feedback",
      "Defined information architecture through tree testing with 32 participants — 89% task completion on first attempt",
      "Prioritized features using a weighted RICE framework aligned to user pain severity",
      "Established success metrics: Time-to-first-app < 30 min, Builder NPS > 60, Zero-code coverage for 80% of use cases",
      "Created a product requirements document co-authored with engineering to ensure feasibility from day one",
    ],
    aside: [
      { label: "Design Principles", value: "3" },
      { label: "Tree Test Success", value: "89%" },
      { label: "Target NPS", value: "> 60" },
    ],
    visual: "flow",
  },
  {
    phase: "04 — Design",
    year: "2019 – 2020",
    title: "From paper sketches to pixel-perfect systems",
    narrative:
      "Design spanned over a year — from mid-2019 through 2020. It happened in three waves. First, rapid paper prototyping to explore 12 layout paradigms for the builder canvas. Second, mid-fidelity Figma flows to test interaction patterns — drag-and-drop, contextual panels, visual logic. Third, a full design system with 120+ components that served both the builder UI and the apps users would generate.",
    details: [
      "Sketched 12 builder layout paradigms — tested 4 with users before converging on a 3-panel dock layout",
      "Designed the drag-and-drop canvas with snap-to-grid, nested containers, and responsive breakpoint preview",
      "Created a visual logic builder replacing code with node-based flowcharts — tested 6 interaction patterns",
      "Built a design system from scratch: 120+ components, 24 color tokens, 8 type scales, and dark/light themes",
      "Designed contextual property panels using progressive disclosure — only showing options relevant to the selected component",
      "Ran 6 rounds of moderated usability testing across each design wave, iterating after every round",
    ],
    aside: [
      { label: "Components", value: "120+" },
      { label: "Layout Paradigms", value: "12" },
      { label: "Usability Rounds", value: "6" },
    ],
    visual: "grid",
  },
  {
    phase: "05 — Development",
    year: "2020 – 2021",
    title: "Engineering the experience",
    narrative:
      "From late 2020 into 2021, design and development ran in lockstep — every design sprint fed directly into an engineering sprint. We built a custom rendering engine that could translate the visual canvas into production React code. The architecture had to be extensible (for a component marketplace), performant (real-time preview), and reliable (enterprise-grade).",
    details: [
      "Architected a component rendering engine that maps visual canvas state to production React output",
      "Built a real-time preview system with hot-reloading — changes on canvas reflected instantly in the preview device",
      "Developed a plugin API for the component marketplace — enabling third-party and community components",
      "Implemented collaborative editing with operational transforms — multiple users editing the same app simultaneously",
      "Integrated 40+ API connectors (REST, GraphQL, databases) with visual query builders",
      "Set up CI/CD pipeline: lint, type-check, 148 unit tests, 32 integration tests, visual regression tests",
    ],
    aside: [
      { label: "API Connectors", value: "40+" },
      { label: "Unit Tests", value: "148" },
      { label: "Integration Tests", value: "32" },
    ],
    visual: "flow",
  },
  {
    phase: "06 — Testing & QA",
    year: "2021",
    title: "Breaking it before users could",
    narrative:
      "Through H2 2021 we tested at every layer — component-level unit tests, integration tests for the rendering engine, accessibility audits for WCAG AA, and exhaustive cross-browser testing. But the most valuable testing was putting real users in front of the platform and watching them build real apps.",
    details: [
      "Ran 4 rounds of unmoderated usability tests with 48 participants via Maze — measuring task completion, time, and errors",
      "Achieved WCAG AA compliance across the entire builder interface — keyboard navigation, screen reader, contrast",
      "Performance benchmarked: canvas renders 500+ components at 60fps, preview loads in < 1.2s",
      "Conducted alpha testing with 15 internal teams — 3 weeks of daily usage capturing bugs and UX friction",
      "Resolved 94 bugs, 23 UX issues, and 8 accessibility violations before beta launch",
      "Load tested the collaborative editor: stable at 12 concurrent editors with < 50ms latency",
    ],
    aside: [
      { label: "Test Participants", value: "48" },
      { label: "Bugs Resolved", value: "94" },
      { label: "A11y Standard", value: "WCAG AA" },
    ],
    visual: "metrics",
  },
  {
    phase: "07 — Onboarding",
    year: "2022",
    title: "From sign-up to first app in under 30 minutes",
    narrative:
      "Early 2022, with the platform nearing launch, we turned attention to the first-run experience. A powerful tool is useless if no one knows how to use it. We designed an automated onboarding flow that guides new users from sign-up to their first working app — no documentation required.",
    details: [
      "Designed a role-based onboarding wizard: business analyst, ops manager, IT admin — each gets tailored first-run experience",
      "Built interactive guided tours with contextual tooltips — teaching by doing, not by reading",
      "Created 18 starter templates across common use cases: CRM, project tracker, inventory, dashboards, forms",
      "Implemented progressive feature unlocking — new capabilities revealed as users master basics",
      "Added an AI assistant to suggest components and auto-configure data bindings during first build",
      "Measured: 73% of new users completed their first app within 28 minutes — beating our 30-min target",
    ],
    aside: [
      { label: "Time to First App", value: "28 min" },
      { label: "Templates", value: "18" },
      { label: "Completion Rate", value: "73%" },
    ],
    visual: "timeline",
  },
  {
    phase: "08 — Launch & Impact",
    year: "2022",
    title: "The numbers that told the story",
    narrative:
      "Mid-2022, after four years of research, design, and engineering — we launched to 200+ teams in a phased rollout over 6 weeks. The results exceeded every target we'd set. By the end of 2022, the low-code market had grown to $26.9B (Gartner), validating the massive bet we placed in 2018.",
    details: [
      "60% reduction in development dependency — business teams shipped features without engineering tickets",
      "3x faster go-to-market for internal tools and client-facing applications",
      "NPS jumped from 32 to 71 within 6 months of the redesign",
      "Adopted by 200+ teams across the organization within the first quarter",
      "Platform generates 1,200+ active applications across the organization",
      "Support tickets dropped 45% due to intuitive UI and automated onboarding",
    ],
    aside: [
      { label: "Dev Dependency", value: "-60%" },
      { label: "Go-to-Market", value: "3x faster" },
    ],
    visual: "metrics",
  },
];

const projectData: Record<string, ProjectDetail> = {
  "nocode-platform": {
    title: "NoCode / LowCode Platform",
    category: "Platform Design",
    heroDesc:
      "A 4-year journey from market signal to full-fledged product — designing an intuitive visual builder that empowered non-engineers to create complex applications, reducing development dependency by 60%.",
    timeline: "2018 — 2022",
    tags: ["Design Systems", "React", "Figma", "User Research"],
    challenge:
      "Business users needed to build complex, data-driven applications without writing code. Existing tools were either too simplistic (no real logic) or too technical (might as well code). We needed to find the sweet spot — powerful enough for real apps, simple enough for non-developers.",
    approach: [
      "Conducted 40+ user interviews with business analysts, citizen developers, and IT admins to map mental models",
      "Designed a drag-and-drop canvas with contextual property panels — hiding complexity behind progressive disclosure",
      "Built a visual logic builder for workflows, conditions, and API integrations — replacing code with flowcharts",
      "Created a living design system with 120+ components shared between the builder UI and the apps it generates",
      "Ran 6 rounds of usability testing, iterating on affordance and learnability",
    ],
    impact: [
      "60% reduction in development dependency — business teams shipped features autonomously",
      "3x faster go-to-market for internal tools and client-facing apps",
      "NPS jumped from 32 to 71 within 6 months of the redesign",
      "Adopted by 200+ teams across the organization",
    ],
    features: [
      { title: "Visual App Builder", desc: "Drag-and-drop canvas with snap-to-grid, nested containers, and responsive breakpoint preview." },
      { title: "Logic Flow Editor", desc: "Node-based visual programming for business rules, API calls, and conditional branching." },
      { title: "Component Marketplace", desc: "Pre-built templates and components users can install and customize for their apps." },
      { title: "Real-time Preview", desc: "Instant preview of the built application with device simulation and data binding." },
    ],
    prototypeSlug: "nocode-platform",
    story: nocodeStory,
  },
  "ehr-platform": {
    title: "EHR Healthcare Platform",
    category: "Healthcare UX",
    heroDesc:
      "Reimagined clinical workflows for electronic health records, making complex medical data accessible and actionable — saving clinicians 2+ hours daily.",
    tags: ["Healthcare", "Data Viz", "Accessibility", "Design Thinking"],
    challenge:
      "Clinicians were drowning in data — patient records, lab results, vitals, medications, and notes scattered across fragmented interfaces. Screen fatigue was real, and critical information was buried under layers of navigation. We needed to surface the right data at the right time.",
    approach: [
      "Shadowed 15 clinicians across 3 hospitals to observe real workflow pain points",
      "Mapped patient encounter flows and identified 12 critical decision points where UI friction caused delays",
      "Designed a unified patient dashboard with smart data prioritization — recent/abnormal values surfaced automatically",
      "Built an accessible color-coded vitals system meeting WCAG AAA for clinical environments",
      "Prototyped and tested with nurse practitioners, physicians, and pharmacists across 4 iterative cycles",
    ],
    impact: [
      "2+ hours saved per clinician per shift through reduced navigation",
      "40% fewer clicks to access critical patient data",
      "Zero critical accessibility violations — full WCAG AA compliance",
      "Adopted across 3 hospital networks serving 500K+ patients",
    ],
    features: [
      { title: "Patient Dashboard", desc: "Unified view with smart prioritization — abnormal values, recent changes, and pending orders surfaced first." },
      { title: "Vitals Timeline", desc: "Interactive timeline chart with trend analysis, threshold alerts, and comparative historical view." },
      { title: "Medication Tracker", desc: "Visual medication schedule with interaction warnings, dosage calculator, and administration logging." },
      { title: "Clinical Notes", desc: "Structured note-taking with voice input, template shortcuts, and AI-assisted summarization." },
    ],
    prototypeSlug: "ehr-platform",
  },
  "iot-dashboard": {
    title: "IoT Command Center",
    category: "IoT / BigData",
    heroDesc:
      "Built a real-time monitoring dashboard for connected devices, making complex sensor data elegant and actionable at scale.",
    tags: ["IoT", "Real-time", "Dashboard", "D3.js"],
    challenge:
      "Managing thousands of IoT devices across multiple locations was chaos — alerts were noisy, data was overwhelming, and operators had no way to quickly identify what needed attention. The existing dashboard was a wall of numbers no one could parse.",
    approach: [
      "Analyzed alert fatigue data — 80% of alerts were false positives or low priority, drowning the critical 20%",
      "Designed a hierarchical monitoring system: overview → cluster → device → sensor drill-down",
      "Built real-time data visualization with D3.js — streaming charts, heatmaps, and geo-spatial device maps",
      "Created an intelligent alert system with severity tiers, smart grouping, and suggested actions",
      "Performance-optimized the frontend to handle 10K+ concurrent data streams with <100ms render time",
    ],
    impact: [
      "70% reduction in mean-time-to-detect (MTTD) for critical device failures",
      "Alert noise reduced by 60% through intelligent grouping and threshold tuning",
      "Dashboard handles 10K+ concurrent device streams with sub-100ms render",
      "Deployed across 4 industrial facilities monitoring 50K+ sensors",
    ],
    features: [
      { title: "Real-time Monitoring", desc: "Live streaming data from thousands of sensors with intelligent sampling and aggregation." },
      { title: "Device Heatmap", desc: "Geo-spatial visualization showing device health, utilization, and anomaly detection across locations." },
      { title: "Alert Command Center", desc: "Prioritized alert feed with severity tiers, root cause analysis, and one-click incident creation." },
      { title: "Analytics Engine", desc: "Historical trend analysis, predictive maintenance scoring, and exportable reports with D3.js charts." },
    ],
    prototypeSlug: "iot-dashboard",
  },
  "ott-platform": {
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    heroDesc:
      "Scaled UI for millions of data points in a video-on-demand platform, balancing content discovery with performance.",
    tags: ["OTT", "BigData", "Content Strategy", "Performance"],
    challenge:
      "With a catalog of 50K+ titles and millions of daily active users, content discovery was broken. Users couldn't find what to watch, recommendation carousels felt random, and the platform struggled with performance under load. We needed to redesign discovery without sacrificing speed.",
    approach: [
      "Analyzed viewing behavior data across 2M users — identified 6 distinct user personas with different browsing patterns",
      "Redesigned the content architecture with contextual shelves — mood-based, trending, continue-watching, and personalized",
      "Built a performant virtualized grid that lazy-loads metadata and images progressively",
      "Designed an immersive player experience with smart previews, skip-intro, and post-play recommendations",
      "A/B tested 12 layout variations measuring engagement, time-to-play, and session duration",
    ],
    impact: [
      "25% increase in content engagement through improved discovery UX",
      "40% reduction in time-to-play — users found content faster",
      "Page load time reduced from 4.2s to 1.1s through virtualization and lazy loading",
      "Platform scaled to handle 2M+ concurrent streams during peak events",
    ],
    features: [
      { title: "Smart Discovery", desc: "AI-powered content shelves with mood-based browsing, contextual recommendations, and trending sections." },
      { title: "Immersive Player", desc: "Full-screen player with gesture controls, picture-in-picture, and intelligent subtitle positioning." },
      { title: "Content Grid", desc: "Virtualized infinite scroll grid with progressive image loading and hover-activated previews." },
      { title: "User Profiles", desc: "Multi-profile support with individual watch history, preferences, and parental controls." },
    ],
    prototypeSlug: "ott-platform",
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  /* ─── Story-based layout for projects with chapters ─── */
  if (project.story) {
    const uniqueYears = [...new Set(project.story.map((c) => c.year.split(/\s*[–—]\s*/)[0]))];
    return (
      <main className="min-h-screen pt-24 sm:pt-32">
        {/* Back link */}
        <Section>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to projects
          </Link>

          {/* Hero */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-accent font-mono text-sm uppercase tracking-widest">{project.category}</span>
              {project.timeline && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span className="text-muted font-mono text-sm">{project.timeline}</span>
                </>
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mb-10"
            >
              {project.heroDesc}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-full bg-surface border border-border text-muted">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Prototype CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={`/work/${slug}/prototype`}
                target="_blank"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Open App Prototype
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* ─── Horizontal Journey Bar ─── */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Bar track */}
            <div className="relative h-px bg-border my-6">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-accent via-accent/60 to-purple-500 origin-left"
              />
            </div>
            {/* Year markers */}
            <div className="flex justify-between items-start">
              {uniqueYears.map((yr, i) => (
                <motion.div
                  key={yr}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-background -mt-[7px] relative z-10" />
                  <span className="text-xs font-mono text-accent mt-2">{yr}</span>
                  <span className="text-[10px] text-muted mt-0.5">
                    {i === 0 ? "Kickoff" : i === uniqueYears.length - 1 ? "Launch" : `Year ${i + 1}`}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ─── Story Chapters ─── */}
        {project.story.map((chapter, idx) => {
          /* Visual icon per chapter type */
          const phaseIcons: Record<string, React.ReactNode> = {
            "metrics": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
            "timeline": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            "flow": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="6.5" y1="8.5" x2="10.5" y2="15.5"/><line x1="17.5" y1="8.5" x2="13.5" y2="15.5"/></svg>,
            "grid": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
          };

          return (
            <Section key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Vertical connector */}
                {idx < project.story!.length - 1 && (
                  <div className="absolute left-5 top-full w-px h-16 sm:h-20 bg-gradient-to-b from-border to-transparent hidden sm:block" />
                )}

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Phase label + year */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        {phaseIcons[chapter.visual || "metrics"]}
                      </div>
                      <div>
                        <p className="text-xs font-mono text-accent uppercase tracking-widest">{chapter.phase.replace(/^\d+\s*—\s*/, "")}</p>
                        <p className="text-[10px] font-mono text-muted">{chapter.year}</p>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{chapter.title}</h2>

                    {/* Narrative */}
                    <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-2xl">{chapter.narrative}</p>

                    {/* Detail points */}
                    <div className="space-y-3">
                      {chapter.details.map((detail, di) => (
                        <motion.div
                          key={di}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: di * 0.04 }}
                          className="flex gap-3"
                        >
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                          <p className="text-sm text-foreground/70 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Aside — Key Metrics with animated bar */}
                  {chapter.aside && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                      className="lg:w-64 shrink-0"
                    >
                      <div className="lg:sticky lg:top-32 space-y-3">
                        {chapter.aside.map((item, ai) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + ai * 0.08 }}
                            className="p-4 rounded-xl bg-surface border border-border relative overflow-hidden"
                          >
                            {/* Accent top bar */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent/0" />
                            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-xl font-bold text-foreground">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Per-chapter visual decorators */}
                {chapter.visual === "metrics" && idx === project.story!.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
                  >
                    {chapter.aside?.map((m, mi) => (
                      <div key={mi} className="text-center p-5 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent border border-accent/10">
                        <motion.p
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + mi * 0.1, type: "spring", stiffness: 200 }}
                          className="text-3xl sm:text-4xl font-bold text-accent mb-1"
                        >
                          {m.value}
                        </motion.p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}

                  </motion.div>
                )}
              </motion.div>
            </Section>
          );
        })}

      </main>
    );
  }

  /* ─── Default layout for other projects ─── */
  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      {/* Back link */}
      <Section>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to projects
        </Link>

        {/* Hero */}
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-mono text-sm uppercase tracking-widest mb-4"
          >
            {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mb-10"
          >
            {project.heroDesc}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-full bg-surface border border-border text-muted">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Open Prototype CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link
              href={`/work/${slug}/prototype`}
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Open App Prototype
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Challenge */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-3">The Challenge</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">{project.challenge}</p>
        </motion.div>
      </Section>

      {/* Approach */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">The Approach</h2>
          <div className="space-y-4">
            {project.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4"
              >
                <span className="text-accent font-mono text-sm mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground/70 leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Key Features */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-surface border border-border"
              >
                <h4 className="text-sm font-semibold text-foreground mb-2">{feat.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Impact */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">The Impact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.impact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-4 rounded-xl bg-surface border border-border"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

    </main>
  );
}
