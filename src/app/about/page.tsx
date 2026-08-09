"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { tintText } from "@/lib/tint";

/* ─── AI Tool Data ─── */
interface AITool {
  name: string;
  abbr: string;
  color: string;
  desc: string;
  category: string;
  useCase: string;
}

const innerRing: AITool[] = [
  { name: "Cursor", abbr: "Cu", color: "#0066FF", category: "Coding Agent", desc: "AI-powered IDE", useCase: "Primary development environment — code generation, refactoring, and multi-file editing with AI context." },
  { name: "Claude Code", abbr: "CC", color: "#D97706", category: "Coding Agent", desc: "Terminal coding agent", useCase: "Long-horizon coding tasks from the CLI — repo-wide refactors, spec-driven implementation, agentic tool use." },
  { name: "GitHub Copilot", abbr: "GC", color: "#6E40C9", category: "Coding Agent", desc: "Code completion", useCase: "Inline code suggestions, test generation, and pair-programming across all projects." },
  { name: "Claude", abbr: "Cl", color: "#D97706", category: "AI Reasoning", desc: "Complex reasoning", useCase: "Research synthesis, PRDs, product documentation, architecture decisions, and complex problem decomposition." },
  { name: "Emergent", abbr: "Em", color: "#7C3AED", category: "AI IDE", desc: "Agentic app builder", useCase: "End-to-end agentic app scaffolding — turns a product brief into a running app with iterative agent-led builds." },
  { name: "Replit", abbr: "Re", color: "#F26207", category: "AI IDE", desc: "Cloud AI coding", useCase: "Quick prototypes, collaborative coding sessions, and deploying small AI-powered tools." },
];

const middleRing: AITool[] = [
  { name: "Figma Make", abbr: "FM", color: "#A259FF", category: "Design AI", desc: "AI concept-to-prototype", useCase: "Rapid concept-to-prototype for design directions — pushes screens straight into Figma libraries for iteration." },
  { name: "UX Pilot", abbr: "UP", color: "#22D3EE", category: "Design AI", desc: "AI UX co-pilot", useCase: "AI-augmented user flow exploration, wireframe iteration, and lightweight usability heuristics review." },
  { name: "v0", abbr: "v0", color: "#171717", category: "UI Builder", desc: "AI UI prototyping", useCase: "Rapid component prototyping — generate production-ready React/Tailwind components from prompts." },
  { name: "ChatGPT", abbr: "GP", color: "#10A37F", category: "AI Assistant", desc: "Research & brainstorm", useCase: "Brainstorming, content drafting, data analysis, and exploring ideas across domains." },
  { name: "Gemini", abbr: "Ge", color: "#4285F4", category: "AI Assistant", desc: "Multi-modal AI", useCase: "Multi-modal analysis, long document processing, and Google ecosystem integrations." },
  { name: "Perplexity", abbr: "Px", color: "#20B2AA", category: "Research", desc: "AI search engine", useCase: "Real-time research with citations — technical docs, competitive analysis, and fact-checking." },
  { name: "Bolt.new", abbr: "Bn", color: "#FF6B00", category: "AI Builder", desc: "Full-stack builder", useCase: "Full-stack app scaffolding from natural language — MVPs and proof-of-concepts in minutes." },
  { name: "NotebookLM", abbr: "NB", color: "#FBBC05", category: "Research", desc: "AI notebook", useCase: "Document analysis, study guides, and turning research papers into actionable insights." },
];

const outerRing: AITool[] = [
  { name: "n8n", abbr: "n8", color: "#EA4B71", category: "Automation", desc: "Workflow automation", useCase: "Self-hosted automation pipelines — data sync, notifications, CI/CD hooks, and API orchestration." },
  { name: "Make", abbr: "Mk", color: "#6D00CC", category: "Automation", desc: "Visual automation", useCase: "Complex multi-step business workflows — CRM to Slack to Notion pipelines with error handling." },
  { name: "Zapier", abbr: "Zp", color: "#FF4A00", category: "Automation", desc: "Quick integrations", useCase: "Lightweight trigger-based automations — form submissions, email routing, calendar sync." },
  { name: "Midjourney", abbr: "Mj", color: "#5865F2", category: "Creative AI", desc: "Image generation", useCase: "Concept art, design exploration, hero visuals, and mood boards for client presentations." },
  { name: "DALL·E", abbr: "DE", color: "#10A37F", category: "Creative AI", desc: "OpenAI images", useCase: "Quick image generation within ChatGPT workflows — icons, illustrations, and social assets." },
  { name: "Figma AI", abbr: "Fi", color: "#A259FF", category: "Design AI", desc: "AI-assisted design", useCase: "Auto-layout suggestions, content generation, and AI-powered design iterations in Figma." },
];

const allAITools = [...innerRing, ...middleRing, ...outerRing];

const aiCategories = [
  { title: "Coding & Development", desc: "AI agents that accelerate my development workflow — from idea to production.", tools: innerRing },
  { title: "AI Assistants & Research", desc: "Thinking partners for research, brainstorming, and building full-stack prototypes.", tools: middleRing },
  { title: "Automation & Creative", desc: "Automation pipelines and generative AI for creative production at scale.", tools: outerRing },
];

const aiConnections: [string, string][] = [
  ["Cursor", "GitHub Copilot"], ["Cursor", "Claude"], ["GitHub Copilot", "Claude"],
  ["v0", "Cursor"], ["v0", "Replit"], ["Claude", "ChatGPT"], ["Replit", "Bolt.new"],
  ["v0", "Figma AI"], ["ChatGPT", "Gemini"], ["ChatGPT", "Perplexity"],
  ["Perplexity", "NotebookLM"], ["Gemini", "NotebookLM"], ["Bolt.new", "v0"],
  ["Claude", "n8n"], ["ChatGPT", "Zapier"], ["n8n", "Make"], ["n8n", "Zapier"],
  ["Make", "Zapier"], ["Midjourney", "DALL·E"], ["Figma AI", "Midjourney"], ["Figma AI", "DALL·E"],
];

/* ─── Connected Grid ─── */
function ConnectedGrid({
  tools,
  activeTool,
  onHover,
  onSelect,
}: {
  tools: AITool[];
  activeTool: AITool | null;
  onHover: (tool: AITool | null) => void;
  onSelect: (tool: AITool | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number; from: string; to: string }[]
  >([]);

  const updateLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const newLines = aiConnections
      .map(([a, b]) => {
        const nodeA = nodeRefs.current.get(a);
        const nodeB = nodeRefs.current.get(b);
        if (!nodeA || !nodeB) return null;
        const rA = nodeA.getBoundingClientRect();
        const rB = nodeB.getBoundingClientRect();
        return {
          x1: rA.left + rA.width / 2 - rect.left,
          y1: rA.top + rA.height / 2 - rect.top,
          x2: rB.left + rB.width / 2 - rect.left,
          y2: rB.top + rB.height / 2 - rect.top,
          from: a,
          to: b,
        };
      })
      .filter(Boolean) as typeof lines;
    setLines(newLines);
  }, []);

  useEffect(() => {
    updateLines();
    const observer = new ResizeObserver(updateLines);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("scroll", updateLines, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateLines);
    };
  }, [updateLines]);

  const connectedNames = activeTool
    ? aiConnections.filter(([a, b]) => a === activeTool.name || b === activeTool.name).flat().filter((n) => n !== activeTool.name)
    : [];

  const isRelated = (name: string) =>
    !activeTool || name === activeTool.name || connectedNames.includes(name);

  return (
    <div ref={containerRef} className="relative px-6 max-w-5xl mx-auto">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
        {lines.map((line, i) => {
          const isActive = activeTool && (line.from === activeTool.name || line.to === activeTool.name);
          const activeColor = activeTool?.color || "#06B6D4";
          return (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke={isActive ? activeColor : "var(--color-border)"}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={activeTool ? (isActive ? 0.6 : 0.08) : 0.2}
              strokeDasharray={isActive ? "none" : "4 4"}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
        {tools.map((tool, i) => {
          const isActive = activeTool?.name === tool.name;
          const related = isRelated(tool.name);
          return (
            <motion.div
              key={tool.name}
              ref={(el) => { if (el) nodeRefs.current.set(tool.name, el); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onMouseEnter={() => onHover(tool)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(activeTool?.name === tool.name ? null : tool)}
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isActive ? "bg-surface shadow-lg z-20" : related ? "bg-surface/80 hover:bg-surface" : "bg-surface/30"}`}
              style={{
                borderColor: isActive ? tool.color : related && activeTool ? tool.color + "30" : "var(--color-border)",
                opacity: activeTool && !related ? 0.35 : 1,
                boxShadow: isActive ? `0 0 30px ${tool.color}20` : "none",
              }}
            >
              {isActive && (
                <motion.div
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{ border: `2px solid ${tool.color}` }}
                  animate={{ opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {related && activeTool && !isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
              )}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold border shrink-0 transition-transform duration-300"
                  style={{ backgroundColor: tool.color + "15", borderColor: tool.color + "30", color: tintText(tool.color), transform: isActive ? "scale(1.1)" : "scale(1)" }}
                >
                  {tool.abbr}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">{tool.name}</h4>
                  <span className="text-[10px] font-mono" style={{ color: tintText(tool.color) }}>{tool.category}</span>
                </div>
              </div>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 pt-3 border-t text-xs text-muted leading-relaxed" style={{ borderColor: tool.color + "20" }}>
                      {tool.useCase}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const timeline = [
  {
    year: "Mar 2025 — Present",
    role: "Senior Lead UX Designer · AI Product Manager",
    company: "Moving Walls",
    description:
      "Scaled the DOOH portfolio from 3 to 7 shipped products. Lead and mentor 9+ UX designers. Authored PRDs, personas, business rules and roadmaps for MW Activate (pDOOH DSP), MW Cinema (IMS), and MW PosterOps (closed-loop OOH execution). Own the platform-wide Hybrid UI / Agentic UI strategy through 2027.",
  },
  {
    year: "May 2023 — Nov 2024",
    role: "Lead UI UX Designer",
    company: "ConstructivIQ India",
    description:
      "Designed a Construction Cloud SaaS platform from the ground up — Submittals and Materials — with a scalable design system and library-based front-end architecture. Developed AI-powered concepts for workflow automation and engaged customers directly during onboarding.",
  },
  {
    year: "Nov 2021 — Mar 2023",
    role: "Sr. Lead UI UX Designer",
    company: "Onx Software Systems (Slate Technologies)",
    description:
      "Led a team of four designers and front-end developers on Slate.ai — a construction-cloud SaaS application for the U.S. market. Owned research, wireframing, prototyping, and design implementation with engineering.",
  },
  {
    year: "May 2020 — Oct 2021",
    role: "Team Lead — Global UI UX",
    company: "Quinnox",
    description:
      "Led design and research for an AIOps automation SaaS platform in the DevOps space. Ran sprint planning, managed the team, and coordinated with global teams in an Agile environment.",
  },
  {
    year: "Sep 2018 — Jan 2020",
    role: "Senior UI UX Designer",
    company: "Microland Limited",
    description:
      "Designed IIoT applications for Smart Factory / Industry 4.0 programs spanning Big Data, ML, AI, and IoT platforms.",
  },
  {
    year: "Jun 2016 — Nov 2017",
    role: "UI UX Designer — Big Data & IoT",
    company: "Knowledge Lens",
    description:
      "Designed Big Data and IoT product interfaces across enterprise monitoring and analytics use cases.",
  },
];

const skills = [
  {
    category: "Design",
    color: "#8B5CF6",
    accent: "#8B5CF680",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="10.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
        <path d="M10.5 9.5 L8.5 8.5M15.5 9 L13.5 15"/>
      </svg>
    ),
    items: [
      { name: "UI/UX Design", level: 5 },
      { name: "Design Systems", level: 5 },
      { name: "Interaction Design", level: 4 },
      { name: "User Research", level: 4 },
      { name: "Wireframing", level: 5 },
      { name: "Prototyping", level: 5 },
      { name: "Visual Design", level: 4 },
      { name: "Design Thinking", level: 5 },
    ],
  },
  {
    category: "Tools",
    color: "#EC4899",
    accent: "#EC489980",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    items: [
      { name: "Figma", level: 5 },
      { name: "Framer", level: 4 },
      { name: "Adobe CC", level: 4 },
      { name: "Storybook", level: 4 },
      { name: "Miro", level: 5 },
      { name: "Maze", level: 3 },
      { name: "Principle", level: 3 },
      { name: "ProtoPie", level: 4 },
    ],
  },
  {
    category: "Development",
    color: "#06B6D4",
    accent: "#06B6D480",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    items: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "D3.js", level: 3 },
      { name: "HTML/CSS", level: 5 },
      { name: "Git", level: 4 },
    ],
  },
  {
    category: "Domain",
    color: "#10B981",
    accent: "#10B98180",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    items: [
      { name: "AdTech (OOH/DOOH)", level: 5 },
      { name: "Healthcare (EHR)", level: 4 },
      { name: "IoT & BigData", level: 3 },
      { name: "OTT Platforms", level: 4 },
      { name: "SaaS / B2B", level: 5 },
      { name: "NoCode/LowCode", level: 4 },
    ],
  },
  {
    category: "Product / PM",
    color: "#F97316",
    accent: "#F9731680",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
    items: [
      { name: "PRD Authoring", level: 5 },
      { name: "Roadmapping (RICE)", level: 5 },
      { name: "Personas & JTBD", level: 5 },
      { name: "BDD Acceptance Criteria", level: 4 },
      { name: "KPI / Success Metrics", level: 4 },
      { name: "Go-to-Market", level: 4 },
      { name: "Jira / Confluence", level: 5 },
      { name: "Miro / Intercom / GA", level: 4 },
    ],
  },
  {
    category: "AdTech / OOH",
    color: "#0EA5E9",
    accent: "#0EA5E980",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="12" rx="2"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>
      </svg>
    ),
    items: [
      { name: "Programmatic DOOH", level: 5 },
      { name: "OpenRTB 2.6", level: 5 },
      { name: "IAB Taxonomies", level: 4 },
      { name: "DSP / SSP Ecosystems", level: 5 },
      { name: "Broadsign · VIOOH · Place Exchange · LMX", level: 4 },
      { name: "Inventory & Yield", level: 4 },
      { name: "Proof-of-Play & Verification", level: 5 },
      { name: "Audience Measurement", level: 4 },
    ],
  },
];

const principles = [
  {
    title: "Start with the Problem, Not the Solution",
    description:
      "Every design decision traces back to a validated user need or business goal. If we can't articulate the problem clearly, we're not ready to design.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  },
  {
    title: "Design for the 80%, Extend for the 20%",
    description:
      "Platform thinking over bespoke solutions. Solve the common case elegantly, then provide escape hatches for edge cases — not the other way around.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    title: "Ship to Learn, Iterate to Impact",
    description:
      "Perfect is the enemy of shipped. I believe in rapid cycles — ship a thin slice of value, measure what happens, learn, and compound. Every cycle makes the product sharper.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  },
  {
    title: "Design Systems Are Culture, Not Just Components",
    description:
      "A design system only works if people adopt it. I invest in governance, documentation, and relationships — making it easier to use the system than to bypass it.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
  {
    title: "Design Is Code, Code Is Design",
    description:
      "The best products emerge when design and engineering share a common language. I own the journey from Figma to production — no handoff friction, no translation loss.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: "Accessibility Is a Design Constraint, Not a Checklist",
    description:
      "Inclusive design isn't a final polish step. I bake WCAG considerations into every component, every interaction, every content decision — from the first sketch.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="10"/><path d="M12 22c-2.5 0-4.5-2-4.5-4.5S9.5 13 12 13s4.5 2 4.5 4.5S14.5 22 12 22z"/><path d="M12 13V8"/><path d="M8 8h8"/></svg>,
  },
];

/* ─── Design Studio Artifacts (8-Stage Research Paper Flow) ─── */
const studioArtifacts = [
  {
    id: "discovery",
    stage: "01",
    type: "research-paper",
    color: "#FFF9C4",
    rotation: -1,
    position: { col: 1, row: 1, colSpan: 4, rowSpan: 2 },
    title: "Stage 01: Discovery & Problem Framing",
    content: [
      "Hypothesis: Mobile booking flow has 62% drop-off",
      "Market: 450 daily bookings, 8.2min avg time",
      "Problem: 14 form fields on mobile → user friction",
      "Goal: Reduce drop-off by 20% in 3 months",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6"/>
        <path d="M8 11h6"/>
      </svg>
    ),
  },
  {
    id: "research",
    stage: "02",
    type: "research-paper",
    color: "#E3F2FD",
    rotation: 1,
    position: { col: 5, row: 1, colSpan: 4, rowSpan: 2 },
    title: "Stage 02: User & Market Research",
    content: [
      "Method: 32 in-depth interviews (22 hrs total)",
      "Sample: Ops managers (n=32), age 34-45",
      "Findings: 18/32 mention mobile form friction",
      "Affinity clusters: 3 major pain themes",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: "synthesis",
    stage: "03",
    type: "research-paper",
    color: "#FFF3E0",
    rotation: -1,
    position: { col: 9, row: 1, colSpan: 4, rowSpan: 2 },
    title: "Stage 03: Synthesis & Journey Mapping",
    content: [
      "5 journey stages, 12 touchpoints mapped",
      "Pain #1: Mobile form (62% abandon rate)",
      "Pain #2: No smart defaults (repeat data)",
      "Opportunity: AI-assisted pre-fill",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: "fork",
    stage: "04",
    type: "fork-gate",
    color: "#FCE4EC",
    rotation: 0,
    position: { col: 1, row: 3, colSpan: 6, rowSpan: 2 },
    title: "⑂ Stage 04: Paradigm Gate (FORK)",
    content: [
      "Decision: Which interaction paradigm?",
      "Option A: Stepped wizard (15/18 score)",
      "Option B: Smart defaults (16/18) ✓ WINNER",
      "Option C: Progressive disclosure (13/18)",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="10"/>
        <line x1="12" y1="10" x2="6" y2="18"/>
        <line x1="12" y1="10" x2="18" y2="18"/>
        <circle cx="12" cy="10" r="2"/>
      </svg>
    ),
  },
  {
    id: "design-system",
    stage: "05",
    type: "research-paper",
    color: "#FFFFFF",
    rotation: 1,
    position: { col: 7, row: 3, colSpan: 3, rowSpan: 2 },
    title: "Stage 05: Design System",
    content: [
      "24 tokens (color, spacing, typography)",
      "Primary: #2D3561 (8.2:1 AAA contrast)",
      "Components: Button, Input, Card, Stepper",
      "42 variants, fully accessible",
    ],
    colors: ["#2D3561", "#D4663E", "#FFB84D", "#FAFAF8"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="13.5" cy="6.5" r=".5"/>
        <circle cx="17.5" cy="10.5" r=".5"/>
        <circle cx="8.5" cy="7.5" r=".5"/>
        <circle cx="6.5" cy="12.5" r=".5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C20.577 6.223 16.867 2 12 2z"/>
      </svg>
    ),
  },
  {
    id: "prototype",
    stage: "06",
    type: "research-paper",
    color: "#F5F5F5",
    rotation: -2,
    position: { col: 10, row: 3, colSpan: 3, rowSpan: 2 },
    title: "Stage 06: Prototype & Test",
    content: [
      "8 flows × 3 fidelity = 24 screens",
      "Lo-fi → Mid-fi → Hi-fi progression",
      "Figma prototype tested with 12 users",
      "Design decisions: 56px tap targets",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    id: "validation",
    stage: "07",
    type: "research-paper",
    color: "#E8F5E9",
    rotation: 1,
    position: { col: 1, row: 5, colSpan: 6, rowSpan: 2 },
    title: "Stage 07: Launch & Validation",
    content: [
      "Launch: June 15, 2026 (6 weeks measured)",
      "Primary: +22pp completion (62% → 84%)",
      "Secondary: -45% time-on-task (8.2m → 4.4m)",
      "Goodhart check: PASSED ✓",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    id: "iteration",
    stage: "08",
    type: "loop-gate",
    color: "#FFF9C4",
    rotation: -2,
    position: { col: 7, row: 5, colSpan: 6, rowSpan: 2 },
    title: "↻ Stage 08: Iteration Cycle (LOOP)",
    content: [
      "Learning: Smart defaults work (+22pp)",
      "Next opportunity: Voice input (hands-free)",
      "New hypothesis: -30% more time saved",
      "Loop to: Stage 02 (research) or 06 (prototype)",
    ],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
  },
];

/* ─── Design Studio Canvas Component ─── */

/* ─── Artifact Detail Views ─── */
interface ArtifactDetailViewProps {
  artifact: typeof studioArtifacts[0];
}

function ArtifactDetailView({ artifact }: ArtifactDetailViewProps) {
  switch (artifact.id) {
    case 'discovery':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#FFF9C4]/20 border border-[#FFF9C4]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">01</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary">Discovery & Problem Framing</h3>
                <p className="text-sm text-muted">Research Phase 1</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h4 className="font-bold text-primary mb-4">📊 Market Context</h4>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Volume:</strong> 450 booking transactions/day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Current state:</strong> 62% mobile drop-off rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Time-on-task:</strong> 8.2 minutes average</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Device split:</strong> 70% mobile, 30% desktop</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h4 className="font-bold text-primary mb-4">🎯 Problem Hypothesis</h4>
              <p className="text-lg font-display text-foreground mb-4">
                Mobile booking flow has 62% drop-off due to excessive form complexity (14 fields on 5" screen)
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-bold text-amber-900 mb-2">If validated, target:</p>
                <p className="text-amber-800">Reduce drop-off by 20% within 3 months of launch</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h4 className="font-bold text-primary mb-4">📐 Research Sketch: User Flow (Current State)</h4>
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-green-200 mx-auto mb-2 flex items-center justify-center text-green-900 font-bold">1</div>
                  <p className="text-sm font-bold">Browse</p>
                  <p className="text-xs text-muted">100%</p>
                </div>
                <div className="flex-1 mx-4 h-1 bg-gray-300 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-300"/>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-yellow-200 mx-auto mb-2 flex items-center justify-center text-yellow-900 font-bold">2</div>
                  <p className="text-sm font-bold">Form</p>
                  <p className="text-xs text-muted">75%</p>
                </div>
                <div className="flex-1 mx-4 h-1 bg-gray-300 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-300"/>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-red-200 mx-auto mb-2 flex items-center justify-center text-red-900 font-bold">3</div>
                  <p className="text-sm font-bold">Drop-off</p>
                  <p className="text-xs text-red-700">62%</p>
                </div>
              </div>
              <p className="text-sm text-center text-muted italic">38% conversion rate — below industry benchmark (55%)</p>
            </div>
          </div>
        </div>
      );

    case 'research':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#E3F2FD]/20 border border-[#E3F2FD]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">02</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary">User & Market Research</h3>
                <p className="text-sm text-muted">Qualitative Study</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h4 className="font-bold text-primary mb-4">🔬 Research Methodology</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-900 mb-2">Sample</p>
                <p className="text-sm text-blue-800">n=32 operations managers, age 34-45, 5+ years experience</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-900 mb-2">Method</p>
                <p className="text-sm text-blue-800">Semi-structured interviews (60 min each), contextual inquiry (8 field observations)</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <p className="font-bold text-blue-900 mb-2">Duration</p>
                <p className="text-sm text-blue-800">22 hours total interview time, 3 weeks data collection</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-bold text-xl">R</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-blue-900">Rajesh (Persona 1)</h3>
                  <p className="text-sm text-blue-700">Ops Manager, 38 years, high-volume user</p>
                </div>
              </div>
              <blockquote className="text-blue-900 italic mb-4 text-lg border-l-4 border-blue-400 pl-4">
                "I always switch to desktop for bookings - mobile form is impossible"
              </blockquote>
              <div>
                <p className="font-bold text-blue-900 mb-2">Key Pain Points:</p>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• 14 form fields (overwhelming on mobile)</li>
                  <li>• Tiny tap targets (28px avg, needs 44px)</li>
                  <li>• No auto-fill or smart suggestions</li>
                  <li>• Keyboard covers half the screen (iOS)</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-900 font-bold text-xl">P</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-purple-900">Priya (Persona 2)</h3>
                  <p className="text-sm text-purple-700">Team Lead, 42 years, efficiency-focused</p>
                </div>
              </div>
              <blockquote className="text-purple-900 italic mb-4 text-lg border-l-4 border-purple-400 pl-4">
                "Too many steps. Just let me scan & go — 90% of my bookings are the same"
              </blockquote>
              <div>
                <p className="font-bold text-purple-900 mb-2">Key Pain Points:</p>
                <ul className="space-y-1 text-purple-800 text-sm">
                  <li>• No memory of previous bookings</li>
                  <li>• Can't save templates or favorites</li>
                  <li>• Slow validation (waits for server)</li>
                  <li>• Repetitive data entry every time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h4 className="font-bold text-primary mb-4">📊 Affinity Clustering: 3 Major Themes</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔴</span>
                  <h5 className="font-bold text-red-900">Theme 1: Mobile Friction (18/32 mentions)</h5>
                </div>
                <p className="text-sm text-red-800">"Mobile is impossible" • "14 fields too many" • "Tiny buttons" • "Keyboard covers form"</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🟡</span>
                  <h5 className="font-bold text-amber-900">Theme 2: Speed & Repetition (24/32 mentions)</h5>
                </div>
                <p className="text-sm text-amber-800">"Too many steps" • "Repeating same info" • "Can't save defaults" • "Slow validation"</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🟢</span>
                  <h5 className="font-bold text-green-900">Theme 3: Smart Suggestions (12/32 mentions)</h5>
                </div>
                <p className="text-sm text-green-800">"Just give me the usual" • "90% same bookings" • "AI should know by now"</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'synthesis':
    case 'fork':
    case 'design-system':
    case 'prototype':
    case 'validation':
    case 'iteration':
      // Reuse existing detail views with updated IDs
      // Map to old artifact detail logic
      return (
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <div className="flex items-center gap-3 mb-4">
            {artifact.stage && (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">{artifact.stage}</span>
              </div>
            )}
            <h3 className="font-display text-xl font-bold text-primary">{artifact.title}</h3>
          </div>
          <div className="space-y-2">
            {artifact.content.map((line, i) => (
              <p key={`content-${i}`} className="text-foreground">{line}</p>
            ))}
          </div>
          <p className="text-sm text-muted mt-6 italic">Detailed view in development...</p>
        </div>
      );

    // Legacy artifact IDs for backward compatibility
    case 'prd':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#FFF9C4]/20 border border-[#FFF9C4]/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎯</span>
              <h3 className="font-display text-xl font-bold text-primary">Goal</h3>
            </div>
            <p className="text-lg text-foreground">Reduce booking drop-off by 20% within 3 months</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">👥</span>
                <h3 className="font-display text-lg font-bold text-primary">Target Users</h3>
              </div>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Role:</strong> Operations Managers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Age:</strong> 34-45 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Experience:</strong> 5+ years in logistics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span><strong>Device:</strong> 70% mobile, 30% desktop</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚧</span>
                <h3 className="font-display text-lg font-bold text-primary">Constraints</h3>
              </div>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Mobile-first approach (responsive design)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Works offline (critical for field ops)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Sub-3s load time on 3G networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Accessible (WCAG 2.1 AA minimum)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="font-display text-lg font-bold text-primary">Success Metrics</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-accent font-bold text-primary mb-1 uppercase">Primary</p>
                <p className="text-foreground">Task completion rate <span className="text-muted">(baseline: 62%)</span></p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-accent font-bold text-primary mb-1 uppercase">Secondary</p>
                <p className="text-foreground">Time-on-task <span className="text-muted">(baseline: 8.2 min)</span></p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-accent font-bold text-primary mb-1 uppercase">Quality</p>
                <p className="text-foreground">Error rate &lt;2% <span className="text-muted">(data accuracy)</span></p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-accent font-bold text-primary mb-1 uppercase">Adoption</p>
                <p className="text-foreground">80% team usage within 2 weeks</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚨</span>
              <h3 className="font-display text-lg font-bold text-red-700">Kill Criteria (When to stop)</h3>
            </div>
            <ul className="space-y-2 text-red-900">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">×</span>
                <span>Completion rate doesn't improve by 10% in 6 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">×</span>
                <span>Error rate exceeds 5% (data quality degrades)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">×</span>
                <span>User satisfaction drops below 6/10 (NPS)</span>
              </li>
            </ul>
          </div>
        </div>
      );

    case 'interviews':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="font-display text-lg font-bold text-primary">Research Summary</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">32</div>
                <div>
                  <p className="font-bold text-foreground">Interview sessions</p>
                  <p className="text-sm text-muted">22 hours total</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">8</div>
                <div>
                  <p className="font-bold text-foreground">Field observations</p>
                  <p className="text-sm text-muted">On-site research</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-bold text-xl">R</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-blue-900">Rajesh</h3>
                  <p className="text-sm text-blue-700">Ops Manager, 38 years</p>
                </div>
              </div>
              <blockquote className="text-blue-900 italic mb-4 text-lg border-l-4 border-blue-400 pl-4">
                "I always switch to desktop for bookings - mobile form is impossible"
              </blockquote>
              <div>
                <p className="font-bold text-blue-900 mb-2">Pain Points:</p>
                <ul className="space-y-1 text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>14 form fields (overwhelming)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Tiny tap targets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>No auto-fill</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-900 font-bold text-xl">P</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-purple-900">Priya</h3>
                  <p className="text-sm text-purple-700">Team Lead, 42 years</p>
                </div>
              </div>
              <blockquote className="text-purple-900 italic mb-4 text-lg border-l-4 border-purple-400 pl-4">
                "Too many steps to complete a simple booking. Just let me scan & go!"
              </blockquote>
              <div>
                <p className="font-bold text-purple-900 mb-2">Pain Points:</p>
                <ul className="space-y-1 text-purple-800">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>No smart defaults</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Can't save drafts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>Slow validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔑</span>
              <h3 className="font-display text-lg font-bold text-primary">Key Insights (Affinity Clusters)</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📱</span>
                  <h4 className="font-bold text-red-900">Mobile Friction <span className="text-sm font-normal text-red-700">(18 mentions)</span></h4>
                </div>
                <p className="text-red-800 text-sm">"Mobile forms are impossible" • "I switch to desktop" • "Can't type on small keyboard" • "Too many fields"</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⏱️</span>
                  <h4 className="font-bold text-amber-900">Speed & Efficiency <span className="text-sm font-normal text-amber-700">(24 mentions)</span></h4>
                </div>
                <p className="text-amber-800 text-sm">"Too many steps" • "Why can't it remember my choices?" • "Repeating same info every time" • "Slow, so slow"</p>
              </div>
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🎯</span>
                  <h4 className="font-bold text-green-900">Smart Defaults <span className="text-sm font-normal text-green-700">(12 mentions)</span></h4>
                </div>
                <p className="text-green-800 text-sm">"Just give me the usual" • "90% of my bookings are same" • "AI should know by now what I need"</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'paradigm':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <p className="text-lg text-foreground mb-2"><strong>Problem:</strong> How should users complete bookings on mobile?</p>
            <p className="text-muted">Evaluated 3 paradigms across 6 dimensions to find the optimal solution</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface border-2 border-border">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Option A: Stepped Wizard</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Mobile UX</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Speed</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Error Resilience</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Familiarity</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Accessibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Feasibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-bold text-foreground">Score: 15/18</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-green-50 border-2 border-green-400">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-display text-xl font-bold text-green-900">Option B: Smart Defaults</h3>
                <span className="text-2xl">✓</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Mobile UX</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Speed</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Error Resilience</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Familiarity</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Accessibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Feasibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-600" />
                    <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-300">
                <p className="font-bold text-green-900">Score: 16/18 ✓ WINNER</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface border-2 border-border">
              <h3 className="font-display text-xl font-bold text-primary mb-4">Option C: Progressive</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Mobile UX</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Speed</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Error Resilience</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Familiarity</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Accessibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Feasibility</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-bold text-foreground">Score: 13/18</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏆</span>
              <h3 className="font-display text-xl font-bold text-green-900">Winner: Smart Defaults (AI-Assisted)</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-green-900 mb-3">Why this won:</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Fastest for 90% of repeat bookings (pre-filled)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Mobile-optimized (fewer fields, bigger tap targets)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Still allows manual override (flexibility)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Accessible (ARIA labels, keyboard nav)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-900 mb-3">Trade-offs accepted:</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠</span>
                    <span>Slight learning curve (users must trust AI suggestions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠</span>
                    <span>Requires ML model (adds tech complexity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">⚠</span>
                    <span>Fallback to manual if AI fails (graceful degradation)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 'palette':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-6">Color Palette</h3>
            <div className="grid gap-6">
              <div>
                <h4 className="font-bold text-foreground mb-3">Primary (Indigo)</h4>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#2D3561' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#4A5584' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#1F2540' }} />
                </div>
                <p className="text-sm text-muted mt-2">Main: #2D3561 • Light: #4A5584 • Dark: #1F2540</p>
                <p className="text-sm text-foreground mt-1"><strong>Usage:</strong> CTAs, headers, focus states</p>
                <p className="text-sm text-green-700 mt-1"><strong>Contrast:</strong> 8.2:1 (AAA) on white background</p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-3">Accent (Burnt Sienna)</h4>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#D4663E' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#E88866' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#B34C2A' }} />
                </div>
                <p className="text-sm text-muted mt-2">Main: #D4663E • Light: #E88866 • Dark: #B34C2A</p>
                <p className="text-sm text-foreground mt-1"><strong>Usage:</strong> Highlights, interactive elements</p>
                <p className="text-sm text-green-700 mt-1"><strong>Contrast:</strong> 4.8:1 (AA) on white background</p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-3">Glow (Amber)</h4>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl shadow-lg" style={{ backgroundColor: '#FFB84D' }} />
                </div>
                <p className="text-sm text-muted mt-2">#FFB84D</p>
                <p className="text-sm text-foreground mt-1"><strong>Usage:</strong> Hover states, energy/warmth</p>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-3">Surface & Borders</h4>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 rounded-2xl shadow-lg border border-border" style={{ backgroundColor: '#FAFAF8' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg border border-border" style={{ backgroundColor: '#FFFFFF' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg border border-border" style={{ backgroundColor: '#E8E6E1' }} />
                  <div className="w-20 h-20 rounded-2xl shadow-lg border border-border" style={{ backgroundColor: '#6B6B6B' }} />
                </div>
                <p className="text-sm text-muted mt-2">Background: #FAFAF8 • Surface: #FFFFFF • Border: #E8E6E1 • Muted: #6B6B6B (5.8:1)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-6">Typography Scale</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-accent font-bold text-primary mb-2 uppercase">Display: Fraunces</p>
                <p className="font-display text-4xl text-foreground mb-2">The quick brown fox</p>
                <p className="text-sm text-muted">Serif, 300/400/600/700 weights • Hero headlines, section titles</p>
              </div>
              <div>
                <p className="text-sm font-accent font-bold text-primary mb-2 uppercase">Accent: Syne</p>
                <p className="font-accent text-2xl text-foreground mb-2">THE QUICK BROWN FOX</p>
                <p className="text-sm text-muted">Geometric sans, 400/500/600/700 weights • Labels, metadata, tags</p>
              </div>
              <div>
                <p className="text-sm font-accent font-bold text-primary mb-2 uppercase">Body: Inter</p>
                <p className="text-base text-foreground mb-2">The quick brown fox jumps over the lazy dog. This is body text for paragraphs and long-form content.</p>
                <p className="text-sm text-muted">Sans-serif, 400/500/600 weights • 16px base, 1.7 line-height</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'journey':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-4">User Journey Map</h3>
            <div className="flex items-center justify-between mb-8">
              {['Discovery', 'Selection', 'Checkout', 'Confirm', 'Complete'].map((stage, i) => (
                <div key={stage} className="flex-1 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold mb-2">
                    {i + 1}
                  </div>
                  <p className="text-sm font-bold text-foreground">{stage}</p>
                </div>
              ))}
            </div>
            <p className="text-muted text-center">12 touchpoints identified • 3 major pain points • 18 user quotes</p>
          </div>

          <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔴</span>
              <h3 className="font-display text-xl font-bold text-red-900">Pain Point #1: Mobile Form Fields</h3>
            </div>
            <p className="text-sm text-red-700 mb-4"><strong>Stage:</strong> Checkout</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-red-900 mb-2">What happens:</h4>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>14 required fields on a 5" mobile screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Tiny tap targets (30px avg, should be 44px min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>No smart defaults or auto-fill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Keyboard covers half the form on iOS</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-100/50">
                <h4 className="font-bold text-red-900 mb-2">User quote:</h4>
                <blockquote className="text-red-900 italic border-l-4 border-red-400 pl-4">
                  "I always switch to desktop for this step. Mobile form is impossible - I make too many mistakes and it's slow."
                  <footer className="text-sm text-red-700 mt-2">— Rajesh, 38, Ops Manager (18 similar quotes)</footer>
                </blockquote>
              </div>

              <div>
                <h4 className="font-bold text-red-900 mb-2">Impact:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-red-100">
                    <p className="text-2xl font-bold text-red-900">62%</p>
                    <p className="text-sm text-red-700">Abandon on mobile</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-100">
                    <p className="text-2xl font-bold text-red-900">8.2 min</p>
                    <p className="text-sm text-red-700">Avg time-on-task</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-100">
                    <p className="text-2xl font-bold text-red-900">12%</p>
                    <p className="text-sm text-red-700">Error rate</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-300">
                <h4 className="font-bold text-green-900 mb-2">Solution → Paradigm B: Smart Defaults</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>AI pre-fills based on history (90% accuracy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Reduced to 6 fields (only exceptions shown)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>56px tap targets (accessible, thumb-friendly)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 'wireframes':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-4">Wireframes V3 - Interactive Prototype</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">Hi-fi</span>
              <span className="text-sm text-muted">Flow: Booking Happy Path</span>
              <span className="text-sm text-muted">Screen 1/24</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gray-100 border border-gray-300">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 bg-gray-800 rounded" />
                    <div className="w-6 h-1 bg-gray-800 rounded" />
                    <div className="w-6 h-1 bg-gray-800 rounded" />
                  </div>
                  <div className="text-xl font-bold text-gray-800">Bookings</div>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xl">+</div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#FFB84D]/20 border-2 border-[#FFB84D]">
                    <p className="font-bold text-gray-800 mb-3">🎯 Quick Booking</p>
                    <p className="text-sm text-gray-600 mb-3">(AI suggests your usual)</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span>📍</span>
                        <span className="text-gray-700"><strong>Site:</strong> MG Road Hub (pre-fill)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>📅</span>
                        <span className="text-gray-700"><strong>Date:</strong> Tomorrow 9AM (pre-fill)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>👤</span>
                        <span className="text-gray-700"><strong>Team:</strong> Your Squad (pre-fill)</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 p-3 rounded-xl bg-primary text-white font-bold">
                      Confirm Booking ✓
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-3">or customize ↓</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h4 className="font-bold text-primary mb-4">📊 Design Decisions (this screen)</h4>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Smart defaults shown first (90% use case)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>One-tap confirm for repeat bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>"Customize" expands to full form (10% edge case)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>56px tap targets (thumb zone optimized)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Focus state: 4px primary border (WCAG compliant)</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted mb-2">Flow Coverage:</p>
                <p className="font-bold text-foreground">8 flows × 3 fidelity levels = 24 screens</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'components':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-6">Component Library</h3>
            <p className="text-muted mb-4">42 variants across 12 base components • React 19 + TypeScript + Tailwind CSS v4</p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h4 className="font-bold text-primary mb-4">🔘 Button Component (6 variants)</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold">Primary</button>
              <button className="px-6 py-3 rounded-xl bg-accent text-white font-bold">Secondary</button>
              <button className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold">Outline</button>
              <button className="px-6 py-3 rounded-xl text-primary font-bold hover:bg-primary/10">Ghost</button>
            </div>

            <div className="space-y-3 text-sm text-foreground">
              <div className="flex items-start gap-2">
                <span className="font-bold min-w-[100px]">Sizes:</span>
                <span>sm (32px) | md (44px) | lg (56px)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold min-w-[100px]">States:</span>
                <span>default, hover, active, disabled, loading</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
              <h5 className="font-bold text-green-900 mb-2">Accessibility:</h5>
              <ul className="space-y-1 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>44px min touch target (WCAG 2.5.5)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>4px focus ring (primary color, WCAG 2.4.7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>aria-label when icon-only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>disabled=&#123;true&#125; with aria-disabled</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gray-100">
              <p className="text-sm font-mono text-gray-800">&lt;Button variant="primary" size="lg"&gt;Confirm&lt;/Button&gt;</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h4 className="font-bold text-primary mb-4">📝 Input Component (8 variants)</h4>
            <div className="space-y-3">
              <input type="text" placeholder="Text input" className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none" />
              <input type="email" placeholder="Email input" className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none">
                <option>Select option</option>
              </select>
            </div>
            <p className="text-sm text-muted mt-4">Text | Email | Number | Date | Select | Textarea | Search | Tel</p>
          </div>
        </div>
      );

    case 'metrics':
      return (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="font-display text-xl font-bold text-primary mb-2">Impact Metrics Dashboard</h3>
            <p className="text-sm text-muted">Launch: June 15, 2026 | Measured: 6 weeks post-launch</p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 border-2 border-green-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="font-display text-xl font-bold text-green-900">PRIMARY METRIC: Task Completion Rate</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-green-700 mb-2">Baseline (Before)</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-green-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500" style={{ width: '62%' }} />
                  </div>
                  <span className="font-bold text-3xl text-green-900">62%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-green-700 mb-2">After Smart Defaults</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-8 bg-green-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-600" style={{ width: '84%' }} />
                  </div>
                  <span className="font-bold text-3xl text-green-900">84%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-green-100 border border-green-300">
              <p className="text-green-900 font-bold">+22pp (+35% improvement) ✓</p>
              <p className="text-sm text-green-800 mt-1">Goal: 74% | Actual: 84% | <strong>EXCEEDED GOAL by 10pp</strong></p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⏱️</span>
                <h3 className="font-display text-lg font-bold text-blue-900">Time-on-Task</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-700 mb-1">Before:</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-blue-200 rounded" />
                    <span className="font-bold text-2xl text-blue-900">8.2 min</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-blue-700 mb-1">After:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1/2 h-6 bg-blue-600 rounded" />
                    <span className="font-bold text-2xl text-blue-900">4.4 min</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-blue-900 mt-4 font-bold">-45% improvement (-3.8 min saved) ✓</p>
              <p className="text-xs text-blue-700 mt-2">450 bookings/day = 1,710 min/day saved (28.5 hrs)</p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✅</span>
                <h3 className="font-display text-lg font-bold text-purple-900">Quality: Error Rate</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-purple-700 mb-1">Before:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1/3 h-6 bg-red-400 rounded" />
                    <span className="font-bold text-2xl text-purple-900">12%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-purple-700 mb-1">After:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 rounded" />
                    <span className="font-bold text-2xl text-purple-900">1.8%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-purple-900 mt-4 font-bold">-85% reduction ✓</p>
              <p className="text-xs text-green-700 mt-2">Goal: &lt;2% | Status: PASSED ✓</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔍</span>
              <h3 className="font-display text-xl font-bold text-amber-900">Goodhart's Law Check</h3>
            </div>
            <p className="text-amber-900 mb-4"><strong>Question:</strong> Did we improve completion by making it easier to submit incorrect bookings?</p>
            
            <div className="space-y-3">
              <h4 className="font-bold text-amber-900">Evidence:</h4>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Error rate DROPPED (12% → 1.8%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>User satisfaction UP (5.1 → 8.2 NPS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>No spike in cancellations (3.2% → 2.9%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Qualitative feedback positive (18/20 interviews)</span>
                </li>
              </ul>

              <div className="mt-4 p-4 rounded-xl bg-green-100 border border-green-300">
                <p className="font-bold text-green-900 text-lg">Verdict: PASSED ✓ (Real improvement, not gaming)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/10 border-2 border-primary">
            <p className="text-center font-display text-xl font-bold text-primary">
              📈 Overall: 4/4 success criteria met • Ready for scale
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-6 rounded-2xl bg-surface border border-border">
          <h3 className="font-display text-xl font-bold text-primary mb-4">{artifact.title}</h3>
          <div className="space-y-2">
            {artifact.content.map((line, i) => (
              <p key={i} className="text-foreground">{line}</p>
            ))}
          </div>
        </div>
      );
  }
}

function DesignStudioCanvas() {
  const [visibleArtifacts, setVisibleArtifacts] = useState<string[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasRun.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          hasRun.current = true;
          // Stagger artifact appearances
          studioArtifacts.forEach((artifact, i) => {
            setTimeout(() => {
              setVisibleArtifacts(prev => [...prev, artifact.id]);
            }, i * 150);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedArtifact) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = studioArtifacts.findIndex(a => a.id === selectedArtifact);
      
      if (e.key === 'Escape') {
        setSelectedArtifact(null);
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % studioArtifacts.length;
        setSelectedArtifact(studioArtifacts[nextIndex].id);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + studioArtifacts.length) % studioArtifacts.length;
        setSelectedArtifact(studioArtifacts[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtifact]);

  const selectedArtifactData = studioArtifacts.find(a => a.id === selectedArtifact);
  const selectedIndex = studioArtifacts.findIndex(a => a.id === selectedArtifact);

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % studioArtifacts.length;
    setSelectedArtifact(studioArtifacts[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (selectedIndex - 1 + studioArtifacts.length) % studioArtifacts.length;
    setSelectedArtifact(studioArtifacts[prevIndex].id);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Flow Legend */}
      <div className="mb-6 p-4 rounded-2xl bg-surface border border-border flex items-center justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">01</span>
          </div>
          <span className="text-muted">8 Stages</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="2" x2="12" y2="10"/>
            <line x1="12" y1="10" x2="6" y2="18"/>
            <line x1="12" y1="10" x2="18" y2="18"/>
            <circle cx="12" cy="10" r="2"/>
          </svg>
          <span className="text-muted">1 Fork (Stage 04)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"/>
            <polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span className="text-muted">1 Loop (Stage 08)</span>
        </div>
      </div>

      {/* Studio canvas grid */}
      <div className="grid grid-cols-12 auto-rows-[80px] gap-4 p-8 bg-background/50 rounded-3xl border border-border relative">
        {/* Stage flow connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
          {/* Flow lines connecting stages */}
          <motion.path
            d="M 15 15 L 40 15"
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visibleArtifacts.length > 1 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.path
            d="M 40 15 L 65 15"
            stroke="var(--color-primary)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visibleArtifacts.length > 2 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          {/* Fork indicator at Stage 04 */}
          <motion.circle
            cx="30%"
            cy="42%"
            r="16"
            stroke="var(--color-accent)"
            strokeWidth="3"
            fill="none"
            initial={{ scale: 0 }}
            animate={{ scale: visibleArtifacts.length > 3 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.text
            x="30%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-accent)"
            fontSize="20"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleArtifacts.length > 3 ? 1 : 0 }}
            transition={{ delay: 1 }}
          >
            ⑂
          </motion.text>
          {/* Loop indicator from Stage 08 */}
          <motion.path
            d="M 80 70 Q 90 50 80 30"
            stroke="var(--color-accent)"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visibleArtifacts.length === studioArtifacts.length ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent)" />
            </marker>
          </defs>
        </svg>

        {studioArtifacts.map((artifact) => {
          const isVisible = visibleArtifacts.includes(artifact.id);
          const style = {
            gridColumn: `${artifact.position.col} / span ${artifact.position.colSpan}`,
            gridRow: `${artifact.position.row} / span ${artifact.position.rowSpan}`,
          };

          const isFork = artifact.id === 'fork';
          const isLoop = artifact.id === 'iteration';

          return (
            <motion.div
              key={artifact.id}
              style={style}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
                rotate: isVisible ? artifact.rotation : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0,
              }}
              whileHover={{
                y: -8,
                rotate: 0,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onClick={() => setSelectedArtifact(artifact.id)}
              className="relative group cursor-pointer"
            >
              {/* Stage Number Badge */}
              {artifact.stage && (
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg z-20 group-hover:scale-110 transition-transform">
                  {artifact.stage}
                </div>
              )}

              {/* Fork/Loop Badge */}
              {isFork && (
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-xl shadow-lg z-20 group-hover:scale-110 transition-transform">
                  ⑂
                </div>
              )}
              {isLoop && (
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-xl shadow-lg z-20 group-hover:scale-110 transition-transform">
                  ↻
                </div>
              )}

              {/* Artifact card */}
              <div
                className={`h-full rounded-2xl border-2 p-4 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col ${
                  isFork || isLoop ? 'border-accent/50' : 'border-border'
                }`}
                style={{ backgroundColor: artifact.color }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="text-primary/70">
                      {artifact.icon}
                    </div>
                    <h3 className="font-accent text-xs font-bold text-primary uppercase tracking-wider">
                      {artifact.title.replace(/^Stage \d+: /, '').replace(/^[⑂↻] /, '')}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5 overflow-hidden">
                  {artifact.type === "color-swatches" && artifact.colors ? (
                    <div className="flex gap-2 flex-wrap">
                      {artifact.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  ) : (
                    artifact.content.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -4 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="text-sm text-foreground/80 leading-relaxed"
                      >
                        {line}
                      </motion.p>
                    ))
                  )}
                </div>

                {/* Hover indicator */}
                <div className={`absolute inset-0 rounded-2xl border-2 ${
                  isFork || isLoop ? 'border-accent/0 group-hover:border-accent/50' : 'border-accent/0 group-hover:border-accent/30'
                } transition-colors pointer-events-none`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom note */}
      {visibleArtifacts.length === studioArtifacts.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted italic font-display">
            8 Stages → 1 Fork (Paradigm Gate) → 1 Loop (Continuous Improvement) = Systematic Design Process
          </p>
        </motion.div>
      )}

      {/* Artifact Detail Side Popover */}
      <AnimatePresence>
        {selectedArtifactData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-stretch justify-end"
            onClick={() => setSelectedArtifact(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            
            {/* Side Panel Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-2xl h-full overflow-auto bg-surface shadow-2xl border-l border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-6 bg-surface/95 backdrop-blur-sm border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {selectedArtifactData.icon}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-primary">
                    {selectedArtifactData.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    aria-label="Previous artifact"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <span className="text-sm text-muted font-mono">
                    {selectedIndex + 1} / {studioArtifacts.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    aria-label="Next artifact"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedArtifact(null)}
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors ml-2"
                    aria-label="Close"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <ArtifactDetailView artifact={selectedArtifactData} />
              </div>

              {/* Progress Dots */}
              <div className="sticky bottom-0 flex items-center justify-center gap-2 px-8 py-6 bg-surface/95 backdrop-blur-sm border-t border-border">
                {studioArtifacts.map((artifact, i) => (
                  <button
                    key={artifact.id}
                    onClick={() => setSelectedArtifact(artifact.id)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      artifact.id === selectedArtifact ? 'bg-primary w-8' : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Go to ${artifact.title}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Kanban Board ─── */
/* ─── Workflow Scrollytelling ─── */
const workflowPhases = [
  {
    phase: "01",
    title: "Discover",
    tagline: "I reach for empathy tools before I open Figma.",
    detail: "Every project starts with questions, not screens. I sit with users, map pain points, and build a shared understanding of the problem space.",
    color: "#F59E0B",
    tools: ["Miro", "Maze", "User Research", "Design Thinking"],
    context: "Research & Strategy",
  },
  {
    phase: "02",
    title: "Define",
    tagline: "I turn ambiguity into structure.",
    detail: "Flows, information architecture, wireframes — I sketch fast and iterate until the skeleton of the solution is solid before adding any polish.",
    color: "#8B5CF6",
    tools: ["Figma", "Wireframing", "Miro", "Prototyping"],
    context: "Information Architecture",
  },
  {
    phase: "03",
    title: "Design",
    tagline: "I craft the visual language — components, motion, interactions.",
    detail: "High-fidelity design with a system mindset. Every component is a token, every interaction is intentional, every state is accounted for.",
    color: "#EC4899",
    tools: ["Figma", "Framer", "Adobe CC", "ProtoPie", "Principle", "Design Systems"],
    context: "Visual & Interaction Design",
  },
  {
    phase: "04",
    title: "Engineer",
    tagline: "I write the code myself — no handoff, no translation loss.",
    detail: "I am both sides of the table. What I design, I build. React, TypeScript, Tailwind — the same brain that laid out the pixels writes the component.",
    color: "#06B6D4",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js"],
    context: "Frontend Engineering",
  },
  {
    phase: "05",
    title: "Ship & Learn",
    tagline: "Shipping is the beginning, not the end.",
    detail: "I validate against real users, instrument with analytics, and close the feedback loop. Each release teaches the next iteration.",
    color: "#10B981",
    tools: ["Storybook", "Git", "Maze", "HTML/CSS", "AdTech (OOH/DOOH)", "SaaS / B2B"],
    context: "Delivery & Validation",
  },
];

function WorkflowScrollytelling() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border hidden md:block" />

      <div className="space-y-3 md:space-y-0">
        {workflowPhases.map((phase, i) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative md:pl-14"
          >
            {/* Timeline dot */}
            <div
              className="absolute left-[11px] top-7 w-[18px] h-[18px] rounded-full border-2 border-background hidden md:flex items-center justify-center z-10"
              style={{ backgroundColor: phase.color }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-background" />
            </div>

            {/* Connector arrow between phases */}
            {i < workflowPhases.length - 1 && (
              <div
                className="absolute left-[18px] hidden md:block z-0"
                style={{ top: "calc(1.75rem + 18px)", height: "calc(100% - 1.75rem)" }}
              >
                <div className="w-px h-full" style={{ backgroundColor: phase.color + "30" }} />
              </div>
            )}

            <div
              className="rounded-2xl border bg-surface overflow-hidden md:mb-3 transition-all duration-300 group hover:shadow-lg"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* Colored top accent bar */}
              <div className="h-0.5 w-full" style={{ backgroundColor: phase.color }} />

              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Left: phase number + context */}
                  <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1">
                    <span
                      className="text-4xl sm:text-5xl font-black leading-none select-none opacity-15 group-hover:opacity-25 transition-opacity"
                      style={{ color: phase.color }}
                    >
                      {phase.phase}
                    </span>
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest whitespace-nowrap"
                      style={{ color: tintText(phase.color) }}
                    >
                      {phase.context}
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    className="hidden sm:block w-px self-stretch"
                    style={{ backgroundColor: phase.color + "20" }}
                  />

                  {/* Right: content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1 text-foreground">{phase.title}</h3>
                    <p
                      className="text-sm font-medium mb-2 leading-snug"
                      style={{ color: tintText(phase.color) }}
                    >
                      {phase.tagline}
                    </p>
                    <p className="text-sm text-muted leading-relaxed mb-4">{phase.detail}</p>

                    {/* Tool chips — stagger in */}
                    <div className="flex flex-wrap gap-2">
                      {phase.tools.map((tool, ti) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, y: 6, scale: 0.92 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: 0.15 + ti * 0.06 }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 hover:scale-105"
                          style={{
                            borderColor: phase.color + "35",
                            color: tintText(phase.color),
                            backgroundColor: phase.color + "0d",
                          }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activeTool, setActiveTool] = useState<AITool | null>(null);

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
              Senior Lead UX Designer · AI Product Manager · Bengaluru
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Designer. Builder.
              <br />
              <span className="text-accent">Product Manager.</span>
            </h1>
            <div className="space-y-4 text-base md:text-lg text-muted leading-relaxed">
              <p>
                I&apos;m a <span className="text-foreground font-medium">product design leader</span> with
                9+ years building B2B SaaS and AI platforms used by over a million
                people across AdTech, Construction Cloud, Healthcare, AIOps, IIoT, and Big&nbsp;Data.
              </p>
              <p>
                I operate at the intersection of{" "}
                <span className="text-foreground font-medium">design and product management</span>
                {" "}— authoring PRDs, personas, business rules, and roadmaps, then leading the
                design systems and screens that ship them.
              </p>
              <p>
                Currently I own design strategy and product definition across a{" "}
                <span className="text-foreground font-medium">7-product DOOH portfolio</span>
                {" "}at Moving Walls, mentoring{" "}
                <span className="text-foreground font-medium">9+ designers</span>, and running an
                AI-augmented practice — Claude, Figma Make, UX Pilot, and Cursor alongside
                Figma, Sketch, and Adobe XD.
              </p>
              <p>
                Recent product-defining work: <span className="text-foreground font-medium">MW Activate</span>
                {" "}(pDOOH DSP designed against OpenRTB 2.6 and IAB standards),{" "}
                <span className="text-foreground font-medium">MW Cinema</span>
                {" "}(cinema as a first-class programmatic asset class), and{" "}
                <span className="text-foreground font-medium">MW PosterOps</span>
                {" "}(closed-loop OOH execution with no-login Magic Link portals for vendors, installers, and clients).
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                Cert · Human Factor Interaction
              </span>
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                MBA (IT) · BCA
              </span>
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                EN · HI · MR · KN
              </span>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* What I Own — Design Function */}
      <Section>
        <SectionHeader
          eyebrow="Design Leadership"
          title="I own the full stack of design."
          description="Not just screens — I own the systems, the code, and the strategy that makes great products happen at scale."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leader Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">As a Design Leader</h3>
                  <p className="text-xs font-mono text-accent">Strategic & Organizational</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Team Building & Hiring", desc: "Recruit, mentor, and grow designers — from junior to senior. Build diverse teams that complement each other's strengths." },
                  { title: "Design Ops & Process", desc: "Establish design workflows, review cadences, handoff standards, and tooling decisions that keep the team efficient at scale." },
                  { title: "Design Strategy", desc: "Align design direction with business goals. Define the design roadmap, prioritize initiatives, and measure design impact." },
                  { title: "Stakeholder Management", desc: "Translate design decisions into business language. Build trust with PMs, engineering leads, and executives through clarity and results." },
                  { title: "Design Culture", desc: "Foster a culture of critique, experimentation, and continuous learning. Run design sprints, team rituals, and knowledge sharing." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Practitioner Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-coral/10 border border-accent-coral/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">As a Practitioner</h3>
                  <p className="text-xs font-mono text-accent-coral">Hands-on & Technical</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Design Systems", desc: "Architect and maintain component libraries, tokens, and guidelines that ensure consistency across products and teams." },
                  { title: "Product Design", desc: "End-to-end UI/UX — from user research and wireframes to high-fidelity prototypes and interaction design." },
                  { title: "Frontend Engineering", desc: "Ship production React/Next.js code. I don't throw designs over the wall — I build what I design." },
                  { title: "Data Visualization", desc: "Turn complex datasets into clear, actionable visual stories using D3.js, charts, and dashboard design patterns." },
                  { title: "Design-to-Code Bridge", desc: "Eliminate the gap between design and engineering. Figma ↔ Storybook ↔ Production with pixel-perfect fidelity." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-coral shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Design Philosophy — Studio Canvas */}
      <Section>
        <SectionHeader
          eyebrow="Process"
          title="From signal to impact."
          description="My design process is a studio canvas — artifacts emerge, connect, and iterate toward measurable outcomes."
        />
        <DesignStudioCanvas />

        {/* Principles below the canvas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-5 sm:p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
            >
              <div className="text-4xl mb-6">{p.icon}</div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section>
        <SectionHeader
          eyebrow="Leadership"
          title="Building teams, not just products."
          description="Design leadership is measured by the designers you grow, the systems you build, and the org velocity you unlock."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="text-xl font-bold">Team Building</h3>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Hired and mentored 12 designers across 3 organizations — 6 progressed from mid to senior level under my coaching. Established design critique rituals, career ladders, and peer review processes that became org-wide standards.
            </p>
            <p className="text-sm text-muted/70">
              Built a design org handbook documenting our hiring rubric, IC → manager transition criteria, and design review SLAs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3 className="text-xl font-bold">Design Systems at Scale</h3>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Led the design system serving 40+ engineers and 8 product teams — reduced design-to-dev handoff time by 55%. Established governance: quarterly contribution cycles, RFC process for breaking changes, and automated Figma → code sync.
            </p>
            <p className="text-sm text-muted/70">
              Design system adoption reached 92% with zero design-drift bugs in the final 18 months.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="text-xl font-bold">Stakeholder Alignment</h3>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Ran bi-weekly design reviews with C-suite and product leadership across 7 products. Successfully killed 3 exec-driven feature requests by presenting user research + opportunity cost data — earned trust to say "no" backed by evidence.
            </p>
            <p className="text-sm text-muted/70">
              Introduced a "design decision log" ritual that surfaced trade-offs early and reduced late-stage scope churn by 40%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 className="text-xl font-bold">Velocity Engineering</h3>
            </div>
            <p className="text-muted leading-relaxed mb-4">
              Introduced design sprints, research ops tooling, and Figma-to-code workflows that cut feature delivery cycles from 8 weeks to 3 weeks. Established a "ship small, measure, iterate" culture with instrumented releases and weekly metric reviews.
            </p>
            <p className="text-sm text-muted/70">
              Org shipped 3x more features per quarter without increasing headcount — velocity came from process, not bodies.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <h3 className="text-lg font-bold mb-3">Hiring Philosophy</h3>
          <p className="text-muted leading-relaxed">
            I hire for <strong className="text-foreground">curiosity over credentials</strong> — the best designers I've brought in were career-changers, self-taught engineers, and product managers who could draw. My interview process tests judgment (trade-off scenarios), craft (portfolio deep-dive on decisions, not pixels), and collaboration (how they give/receive critique). Zero leetcode-style whiteboard exercises.
          </p>
        </motion.div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader
          eyebrow="Skills"
          title="My toolkit."
          description="Not a list of logos — a story of how I work."
        />
        <WorkflowScrollytelling />
      </Section>

      {/* Talks & Writing */}
      <Section>
        <SectionHeader
          eyebrow="Thought Leadership"
          title="Talks & Writing."
          description="Sharing knowledge through articles, talks, and community contributions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: "Article",
              title: "Design Thinking in AdTech: How OOH is Going Digital",
              venue: "Blog",
              date: "Mar 2026",
              href: "/blog/design-thinking-adtech-ooh",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Article",
              title: "Building Design Systems That Scale",
              venue: "Blog",
              date: "Feb 2026",
              href: "/blog/building-design-systems-scale",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Article",
              title: "AI is Changing How We Design — Here's How I Use It",
              venue: "Blog",
              date: "Jan 2026",
              href: "/blog/ai-changing-design",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Topic",
              title: "System Design for Designers: Think Like an Engineer",
              venue: "Blog",
              date: "Dec 2025",
              href: "/blog/system-design-for-designers",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/20 transition-colors">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-accent uppercase">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted">{item.date}</span>
                  </div>
                  <h4 className="font-semibold group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted mt-1">{item.venue}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AI Ecosystem */}
      <Section>
        <SectionHeader
          eyebrow="AI Stack"
          title="My AI Ecosystem."
          description="The agents, automations, and creative tools that power my daily workflow — from code to deployment."
        />
        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-mono text-accent"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {allAITools.length} tools in my ecosystem — hover or click to explore connections
          </motion.div>
        </div>
      </Section>

      {/* Connected Grid */}
      <section className="mb-16 sm:mb-24">
        <ConnectedGrid
          tools={allAITools}
          activeTool={activeTool}
          onHover={setActiveTool}
          onSelect={setActiveTool}
        />
      </section>

      {/* Category Breakdown */}
      {aiCategories.map((cat, catIdx) => (
        <Section key={cat.title}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <SectionHeader title={cat.title} description={cat.desc} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {cat.tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-2xl bg-surface border border-border hover:border-border/80 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold border shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: tool.color + "12", borderColor: tool.color + "30", color: tintText(tool.color) }}
                    >
                      {tool.abbr}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{tool.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: tintText(tool.color) }}>{tool.category}</span>
                      <p className="text-xs text-muted leading-relaxed mt-2">{tool.useCase}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>
      ))}

      {/* AI Philosophy */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              How I Think About <span className="text-accent">AI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Augment, Don't Replace",
                  desc: "AI amplifies my creativity and speed — but the design decisions, user empathy, and architectural thinking remain deeply human.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                },
                {
                  title: "Automate the Mundane",
                  desc: "If I do it more than twice, I build a pipeline. n8n, Make, and Zapier handle the repetitive so I can focus on what matters.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
                },
                {
                  title: "Stay Tool-Agnostic",
                  desc: "The best tool is the one that solves the problem. I continuously evaluate and adopt — no loyalty, only effectiveness.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                },
              ].map((principle) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-surface border border-border"
                >
                  <div className="mb-3">{principle.icon}</div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">{principle.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Want to work together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg mb-8 max-w-lg mx-auto"
          >
            I&apos;m always open to discussing new opportunities, collaborations,
            and interesting projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
