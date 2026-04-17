"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";

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
  { name: "GitHub Copilot", abbr: "GC", color: "#6E40C9", category: "Coding Agent", desc: "Code completion", useCase: "Inline code suggestions, test generation, and pair-programming across all projects." },
  { name: "Claude", abbr: "Cl", color: "#D97706", category: "AI Reasoning", desc: "Complex reasoning", useCase: "Architecture decisions, code reviews, technical writing, and complex problem decomposition." },
  { name: "v0", abbr: "v0", color: "#171717", category: "UI Builder", desc: "AI UI prototyping", useCase: "Rapid component prototyping — generate production-ready React/Tailwind components from prompts." },
  { name: "Replit", abbr: "Re", color: "#F26207", category: "AI IDE", desc: "Cloud AI coding", useCase: "Quick prototypes, collaborative coding sessions, and deploying small AI-powered tools." },
];

const middleRing: AITool[] = [
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
                  style={{ backgroundColor: tool.color + "15", borderColor: tool.color + "30", color: tool.color, transform: isActive ? "scale(1.1)" : "scale(1)" }}
                >
                  {tool.abbr}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">{tool.name}</h4>
                  <span className="text-[10px] font-mono" style={{ color: tool.color }}>{tool.category}</span>
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
    year: "2024–Present",
    role: "Lead Design Engineer",
    company: "Moving Walls",
    description:
      "Heading design for the world's leading OOH/DOOH AdTech platform. Building design systems, leading a design team, and shipping products used across 30+ countries.",
  },
  {
    year: "2022–2024",
    role: "Senior UI/UX Designer",
    company: "Moving Walls",
    description:
      "Led design for multiple platform modules including campaign planning, audience analytics, and inventory management.",
  },
  {
    year: "2020–2022",
    role: "UI/UX Designer",
    company: "Product Studio",
    description:
      "Designed EHR platforms, IoT dashboards, and OTT streaming interfaces. Built and maintained cross-product design systems.",
  },
  {
    year: "2018–2020",
    role: "Frontend Developer & Designer",
    company: "Startup",
    description:
      "Full-stack design and development for NoCode/LowCode platforms. Bridged the gap between design and engineering.",
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
];

const principles = [
  {
    title: "Data-Informed, Not Data-Driven",
    description:
      "Numbers guide decisions, but empathy and craft drive innovation. I combine quantitative insights with qualitative understanding.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    title: "Ship to Learn",
    description:
      "Perfect is the enemy of good. I believe in rapid iteration — ship, measure, learn, improve. Every pixel ships with purpose.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  },
  {
    title: "Design is Code, Code is Design",
    description:
      "The best products emerge when design and engineering speak the same language. I bridge both worlds fluently.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
];

/* ─── Compiler Pipeline ─── */
const pipelineStages = [
  {
    id: "prd",
    label: "PRD",
    sublabel: "Requirements",
    color: "#6366F1",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    lines: [
      "// user_needs.prd",
      "GOAL: reduce booking drop-off",
      "USER: ops manager, 34–45",
      "METRIC: +20% task completion",
      "CONSTRAINT: mobile-first",
    ],
  },
  {
    id: "ux",
    label: "UX",
    sublabel: "Information Architecture",
    color: "#8B5CF6",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    lines: [
      "// parsing user_needs.prd…",
      "→ flow: dashboard → form → confirm",
      "→ components: 12 identified",
      "→ edge cases: 4 flagged",
      "✓ IA compiled successfully",
    ],
  },
  {
    id: "design",
    label: "Design",
    sublabel: "Visual Layer",
    color: "#EC4899",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125…"/>
      </svg>
    ),
    lines: [
      "// rendering visual_layer…",
      "→ tokens: 42 design vars applied",
      "→ components: Button, Card, Form…",
      "→ states: default hover focus error",
      "✓ Figma handoff ready",
    ],
  },
  {
    id: "code",
    label: "Code",
    sublabel: "Implementation",
    color: "#06B6D4",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    lines: [
      "// compiling components…",
      "→ React 19 + TypeScript strict",
      "→ bundle: 42kb gzipped",
      "→ a11y: 0 violations",
      "✓ build successful in 2.1s",
    ],
  },
  {
    id: "qa",
    label: "QA",
    sublabel: "Validation",
    color: "#F59E0B",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    lines: [
      "// running test suite…",
      "→ unit: 48/48 passed",
      "→ integration: 12/12 passed",
      "→ lighthouse: 98/100",
      "✓ all checks green",
    ],
  },
  {
    id: "prod",
    label: "PROD",
    sublabel: "Live",
    color: "#10B981",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    lines: [
      "// deploying to production…",
      "→ CDN: 47 edge nodes",
      "→ uptime: 99.98%",
      "→ users: 2.4M sessions/mo",
      "✓ [BUILD SUCCESSFUL] 🚀",
    ],
  },
];

function CompilerPipeline() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [lineIdx, setLineIdx] = useState<Record<number, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runPipeline = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setRunning(true);
    setCompletedStages([]);
    setActiveStage(null);
    setLineIdx({});

    pipelineStages.forEach((stage, stageIndex) => {
      const stageDelay = stageIndex * 1000;

      const t1 = setTimeout(() => {
        setActiveStage(stageIndex);
        stage.lines.forEach((_line, lineIndex) => {
          const t = setTimeout(() => {
            setLineIdx((prev) => ({ ...prev, [stageIndex]: lineIndex + 1 }));
          }, lineIndex * 130);
          timersRef.current.push(t);
        });
      }, stageDelay);
      timersRef.current.push(t1);

      const t2 = setTimeout(() => {
        setCompletedStages((prev) => [...prev, stageIndex]);
        if (stageIndex === pipelineStages.length - 1) {
          setActiveStage(null);
          setRunning(false);
        }
      }, stageDelay + stage.lines.length * 130 + 250);
      timersRef.current.push(t2);
    });
  }, []);

  // Trigger once when element scrolls into view using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runPipeline();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [runPipeline]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => { timersRef.current.forEach(clearTimeout); };
  }, []);

  const handleRerun = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    hasRun.current = false;
    setRunning(false);
    setCompletedStages([]);
    setActiveStage(null);
    setLineIdx({});
    // small delay so state clears before re-running
    const t = setTimeout(() => runPipeline(), 50);
    timersRef.current.push(t);
  }, [runPipeline]);

  return (
    <div ref={containerRef} className="relative">
      {/* Title bar */}
      <div className="rounded-t-2xl border border-b-0 border-border bg-[#0d1117] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-xs font-mono text-white/30">design-pipeline.sh</span>
        <button
          type="button"
          onClick={handleRerun}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono transition-all disabled:opacity-40"
          style={{ borderColor: "#10B981" + "40", color: "#10B981" }}
        >
          <span className={running ? "animate-pulse" : ""}>{running ? "▶ running…" : "↺ rerun"}</span>
        </button>
      </div>

      {/* Horizontal columns — scrollable on mobile */}
      <div className="overflow-x-auto rounded-b-2xl border border-border bg-[#0d1117]">
        <div className="flex min-w-[900px]">
          {pipelineStages.map((stage, i) => {
            const isDone = completedStages.includes(i);
            const isActive = activeStage === i;
            const visibleLines = lineIdx[i] ?? 0;
            const isLast = i === pipelineStages.length - 1;

            return (
              <div
                key={stage.id}
                className={`flex-1 flex flex-col border-r border-white/5 ${isLast ? "border-r-0" : ""}`}
              >
                {/* Column header */}
                <div
                  className="px-3 py-3 border-b border-white/5 relative"
                  style={{
                    opacity: !running && completedStages.length === 0 ? 0.4 : isDone || isActive ? 1 : 0.35,
                    transition: "opacity 0.3s",
                  }}
                >
                  {/* Active progress underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ backgroundColor: stage.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: isDone ? "100%" : isActive ? "55%" : "0%" }}
                    transition={{ duration: isDone ? 0.4 : 1.2, ease: "easeInOut" }}
                  />
                  <div className="flex items-center gap-2 mb-0.5">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isDone || isActive ? stage.color + "20" : "transparent",
                        color: isDone || isActive ? stage.color : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {isDone ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : stage.icon}
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: isDone || isActive ? stage.color : "rgba(255,255,255,0.3)" }}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/30 pl-7">{stage.sublabel}</p>
                </div>

                {/* Column terminal body */}
                <div className="p-3 flex-1 font-mono text-[10px] leading-relaxed space-y-0.5 min-h-[160px]">
                  {/* Idle state */}
                  {!isDone && !isActive && completedStages.length === 0 && (
                    <span className="text-white/15">—</span>
                  )}

                  {/* Active: typewriter lines */}
                  {(isActive || isDone) && stage.lines.slice(0, visibleLines).map((line, li) => (
                    <motion.div
                      key={`${stage.id}-${li}`}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.12 }}
                      style={{
                        color: line.startsWith("✓")
                          ? "#10B981"
                          : line.startsWith("→")
                          ? "rgba(255,255,255,0.65)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}

                  {/* Blinking cursor on active stage */}
                  {isActive && visibleLines < stage.lines.length && (
                    <span className="inline-block w-1.5 h-3 bg-accent/70 animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="mt-3 flex items-center gap-3 px-1">
        {completedStages.length === pipelineStages.length && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-mono"
            style={{ color: "#10B981" }}
          >
            <span>✓</span>
            <span>[BUILD SUCCESSFUL] — PRD to Production</span>
          </motion.div>
        )}
        {running && (
          <div className="flex items-center gap-2 text-xs font-mono text-white/30">
            <span className="animate-pulse">▶</span>
            <span>compiling stage {(activeStage ?? 0) + 1} of {pipelineStages.length}…</span>
          </div>
        )}
      </div>
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
                      style={{ color: phase.color }}
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
                      style={{ color: phase.color }}
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
                            color: phase.color,
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
              About Me
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Vivekanand
              <br />
              <span className="text-gradient">Choudhari</span>
            </h1>
            <div className="space-y-4 text-base md:text-lg text-muted leading-relaxed">
              <p>
                I&apos;m a <span className="text-foreground font-medium">Lead Design Engineer</span> with
                8+ years of experience crafting digital products that millions
                of people use every day.
              </p>
              <p>
                Currently heading design at{" "}
                <span className="text-foreground font-medium">Moving Walls</span>,
                the world&apos;s leading OOH/DOOH advertising technology
                platform, where I lead a team building tools used across 30+
                countries.
              </p>
              <p>
                I live in the intersection of{" "}
                <span className="text-foreground font-medium">design and code</span>
                . I don&apos;t just design interfaces — I build them. From
                Figma to production React, I own the full journey from pixel to
                deployment.
              </p>
              <p>
                My work spans{" "}
                <span className="text-foreground font-medium">
                  AdTech, Healthcare, IoT, and OTT
                </span>{" "}
                — industries where complex data meets real human needs. I
                specialize in making the complicated feel simple.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all"
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
          title="I own the design vertical."
          description="I don't just design products — I build and lead the teams, systems, and culture that make great design happen at scale."
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

      {/* Design Philosophy — Compiler Pipeline */}
      <Section>
        <SectionHeader
          eyebrow="Philosophy"
          title="How I think about design."
          description="Every product starts as requirements and compiles into reality — here's my pipeline."
        />
        <CompilerPipeline />

        {/* Principles below the pipeline */}
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
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
                      style={{ backgroundColor: tool.color + "12", borderColor: tool.color + "30", color: tool.color }}
                    >
                      {tool.abbr}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">{tool.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: tool.color }}>{tool.category}</span>
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
            <div className="grid sm:grid-cols-3 gap-6 text-left">
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
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
