"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { Section, SectionHeader } from "@/components/Section";

/* ─── Tool Data ─── */
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

const allTools = [...innerRing, ...middleRing, ...outerRing];

const categories = [
  {
    title: "Coding & Development",
    desc: "AI agents that accelerate my development workflow — from idea to production.",
    tools: innerRing,
    accent: "accent",
  },
  {
    title: "AI Assistants & Research",
    desc: "Thinking partners for research, brainstorming, and building full-stack prototypes.",
    tools: middleRing,
    accent: "accent-coral",
  },
  {
    title: "Automation & Creative",
    desc: "Automation pipelines and generative AI for creative production at scale.",
    tools: outerRing,
    accent: "accent",
  },
];

/* ─── Connections between tools ─── */
const connections: [string, string][] = [
  // Coding cluster
  ["Cursor", "GitHub Copilot"],
  ["Cursor", "Claude"],
  ["GitHub Copilot", "Claude"],
  ["v0", "Cursor"],
  ["v0", "Replit"],
  // Cross: coding → assistants
  ["Claude", "ChatGPT"],
  ["Replit", "Bolt.new"],
  ["v0", "Figma AI"],
  // Assistants cluster
  ["ChatGPT", "Gemini"],
  ["ChatGPT", "Perplexity"],
  ["Perplexity", "NotebookLM"],
  ["Gemini", "NotebookLM"],
  ["Bolt.new", "v0"],
  // Cross: assistants → automation
  ["Claude", "n8n"],
  ["ChatGPT", "Zapier"],
  // Automation cluster
  ["n8n", "Make"],
  ["n8n", "Zapier"],
  ["Make", "Zapier"],
  // Creative cluster
  ["Midjourney", "DALL·E"],
  ["Figma AI", "Midjourney"],
  ["Figma AI", "DALL·E"],
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
    const newLines = connections
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

  // Which tools are connected to active tool?
  const connectedNames = activeTool
    ? connections
        .filter(([a, b]) => a === activeTool.name || b === activeTool.name)
        .flat()
        .filter((n) => n !== activeTool.name)
    : [];

  const isRelated = (name: string) =>
    !activeTool || name === activeTool.name || connectedNames.includes(name);

  return (
    <div ref={containerRef} className="relative px-6 max-w-5xl mx-auto">
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        {lines.map((line, i) => {
          const isActive =
            activeTool &&
            (line.from === activeTool.name || line.to === activeTool.name);
          const activeColor = activeTool?.color || "#06B6D4";
          return (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={isActive ? activeColor : "var(--color-border)"}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={activeTool ? (isActive ? 0.6 : 0.08) : 0.2}
              strokeDasharray={isActive ? "none" : "4 4"}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Grid of tool nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
        {tools.map((tool, i) => {
          const isActive = activeTool?.name === tool.name;
          const related = isRelated(tool.name);
          return (
            <motion.div
              key={tool.name}
              ref={(el) => {
                if (el) nodeRefs.current.set(tool.name, el);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onMouseEnter={() => onHover(tool)}
              onMouseLeave={() => onHover(null)}
              onClick={() =>
                onSelect(activeTool?.name === tool.name ? null : tool)
              }
              className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-surface shadow-lg z-20"
                  : related
                  ? "bg-surface/80 hover:bg-surface"
                  : "bg-surface/30"
              }`}
              style={{
                borderColor: isActive
                  ? tool.color
                  : related && activeTool
                  ? tool.color + "30"
                  : "var(--color-border)",
                opacity: activeTool && !related ? 0.35 : 1,
                boxShadow: isActive ? `0 0 30px ${tool.color}20` : "none",
              }}
            >
              {/* Pulse ring on active */}
              {isActive && (
                <motion.div
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{ border: `2px solid ${tool.color}` }}
                  animate={{ opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Connection dots */}
              {related && activeTool && !isActive && (
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: tool.color }}
                />
              )}

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold border shrink-0 transition-transform duration-300"
                  style={{
                    backgroundColor: tool.color + "15",
                    borderColor: tool.color + "30",
                    color: tool.color,
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {tool.abbr}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                    {tool.name}
                  </h4>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: tool.color }}
                  >
                    {tool.category}
                  </span>
                </div>
              </div>

              {/* Expanded detail on active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 pt-3 border-t text-xs text-muted leading-relaxed"
                      style={{ borderColor: tool.color + "20" }}
                    >
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

/* ─── Main Page ─── */
export default function MyAIPage() {
  const [activeTool, setActiveTool] = useState<AITool | null>(null);

  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      {/* ===== HERO ===== */}
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-mono text-accent mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {allTools.length} tools in my ecosystem
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            My AI{" "}
            <span className="text-accent">Ecosystem</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted max-w-xl mx-auto"
          >
            The agents, automations, and creative tools that power my daily workflow — from code to deployment.
          </motion.p>
        </div>
      </Section>

      {/* ===== CONNECTED GRID ===== */}
      <section className="mb-16 sm:mb-24">
        <ConnectedGrid
          tools={allTools}
          activeTool={activeTool}
          onHover={setActiveTool}
          onSelect={setActiveTool}
        />
      </section>

      {/* ===== CATEGORY BREAKDOWN ===== */}
      {categories.map((cat, catIdx) => (
        <Section key={cat.title}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <SectionHeader
              title={cat.title}
              description={cat.desc}
            />
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
                      style={{
                        backgroundColor: tool.color + "12",
                        borderColor: tool.color + "30",
                        color: tool.color,
                      }}
                    >
                      {tool.abbr}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-foreground">
                          {tool.name}
                        </h4>
                      </div>
                      <span
                        className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-2"
                        style={{
                          color: tool.color,
                          backgroundColor: tool.color + "12",
                        }}
                      >
                        {tool.category}
                      </span>
                      <p className="text-xs text-muted leading-relaxed">
                        {tool.useCase}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>
      ))}

      {/* ===== AI PHILOSOPHY ===== */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              How I Think About{" "}
              <span className="text-accent">AI</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Augment, Don't Replace",
                  desc: "AI amplifies my creativity and speed — but the design decisions, user empathy, and architectural thinking remain deeply human.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  title: "Automate the Mundane",
                  desc: "If I do it more than twice, I build a pipeline. n8n, Make, and Zapier handle the repetitive so I can focus on what matters.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral">
                      <polyline points="16 3 21 3 21 8" />
                      <line x1="4" y1="20" x2="21" y2="3" />
                      <polyline points="21 16 21 21 16 21" />
                      <line x1="15" y1="15" x2="21" y2="21" />
                      <line x1="4" y1="4" x2="9" y2="9" />
                    </svg>
                  ),
                },
                {
                  title: "Stay Tool-Agnostic",
                  desc: "The best tool is the one that solves the problem. I continuously evaluate and adopt — no loyalty, only effectiveness.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  ),
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
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {principle.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
