"use client";

/* ─────────────────────────────────────────────────────────────
   /process visual components — diagrams first, text as captions.
   All SVG is hand-rolled (no chart deps); animation via Framer,
   which inherits the global reduced-motion config.
────────────────────────────────────────────────────────────── */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Paradigm } from "@/lib/process/types";
import { companion } from "@/lib/process/companion";
import { decisionMatrix, paradigmList } from "@/lib/process/paradigms";
import { getPrinciple } from "@/lib/process/principles";
import { Check, ChevronDown, Lock, ArrowRight, AlertTriangle } from "lucide-react";

export const paradigmColors: Record<Paradigm, string> = {
  agentic: "var(--color-accent-designer)",
  hybrid: "var(--color-accent)",
  traditional: "#A3A3A3",
  "zero-ui": "var(--color-accent-scaler)",
};

export const paradigmShort: Record<Paradigm, string> = {
  agentic: "Agentic",
  hybrid: "Hybrid",
  traditional: "Traditional",
  "zero-ui": "Zero-UI",
};

/* ─────────────────────────────────────────────────────────────
   Principle chip with popover (shared)
────────────────────────────────────────────────────────────── */
export function PrincipleChip({ id }: Readonly<{ id: string }>) {
  const [open, setOpen] = useState(false);
  const p = getPrinciple(id);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors ${
          open
            ? "bg-accent-coral/15 border-accent-coral/40 text-accent-coral"
            : "bg-accent-coral/5 border-accent-coral/15 text-accent-coral/80 hover:border-accent-coral/40"
        }`}
      >
        {p.name}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-30 block w-64 p-3 rounded-xl bg-background border border-border shadow-2xl"
          >
            <span className="block text-xs font-semibold text-foreground mb-1">{p.name}</span>
            <span className="block text-[11px] text-muted leading-relaxed">{p.definition}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Docs panel — 1 bold sentence, full method on demand
────────────────────────────────────────────────────────────── */
export function DocsPanel({ method }: Readonly<{ method: string }>) {
  const [open, setOpen] = useState(false);
  const firstSentence = method.split(/(?<=\.)\s/)[0];
  const rest = method.slice(firstSentence.length).trim();
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-base sm:text-lg text-foreground/85 font-medium leading-relaxed">
        {firstSentence}
      </p>
      {rest && (
        <>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted leading-relaxed pt-2">{rest}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-accent hover:text-accent/80 transition-colors"
          >
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
            {open ? "collapse" : "full method"}
          </button>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Gate checklist — stamped kill criteria
────────────────────────────────────────────────────────────── */
export function GateChecklist({ gate }: Readonly<{ gate: string[] }>) {
  return (
    <div className="mt-8 rounded-xl border border-accent-scaler/20 bg-accent-scaler/4 p-5">
      <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-widest mb-4 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5" />
        Gate — we don&apos;t proceed unless
      </p>
      <ul className="grid sm:grid-cols-3 gap-3">
        {gate.map((g, i) => (
          <motion.li
            key={g}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex gap-2.5 p-3 rounded-lg bg-background/60 border border-border"
          >
            <span className="relative w-4 h-4 rounded border border-accent-scaler/50 shrink-0 mt-0.5">
              <motion.svg
                viewBox="0 0 16 16"
                className="absolute inset-0 text-accent-scaler"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.path
                  d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1, transition: { delay: 0.3 + i * 0.12, duration: 0.3 } },
                  }}
                />
              </motion.svg>
            </span>
            <span className="text-xs text-foreground/75 leading-relaxed">{g}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Method map — the animated journey spine with the fork
────────────────────────────────────────────────────────────── */
const MAIN_NODES = [
  { id: "signal", num: "00", x: 50 },
  { id: "prd", num: "01", x: 148 },
  { id: "research", num: "02", x: 246 },
  { id: "psychology", num: "03", x: 344 },
  { id: "paradigm", num: "04", x: 448 },
];
const LANE_YS: Record<Paradigm, number> = { agentic: 45, hybrid: 95, traditional: 145, "zero-ui": 195 };

export function MethodMap({ paradigm, onSelect }: Readonly<{ paradigm: Paradigm; onSelect: (p: Paradigm) => void }>) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (d: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: d, duration: 0.6, ease: "easeInOut" as const }, opacity: { delay: d, duration: 0.1 } },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.6 }}
      className="rounded-2xl bg-surface border border-border p-4 sm:p-6 overflow-x-auto"
    >
      <div className="flex items-center justify-between gap-3 mb-2 min-w-155">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
          The method — 8 stages · one fork · one loop
        </p>
        <p className="text-[10px] font-mono hidden sm:block" style={{ color: paradigmColors[paradigm] }}>
          lane: {paradigmShort[paradigm]} — click a lane to switch
        </p>
      </div>
      <svg viewBox="0 0 960 260" className="w-full min-w-155" role="img" aria-label="Method map: stages 00 to 03 in sequence, forking at stage 04 into four paradigm lanes, converging at stage 07 and looping back">
        {/* spine 00 → 04 */}
        <motion.line
          x1="50" y1="120" x2="448" y2="120"
          stroke="var(--color-border)" strokeWidth="2"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={draw} custom={0}
        />
        {/* fork + lanes */}
        {paradigmList.map((p, i) => {
          const y = LANE_YS[p];
          const isActive = p === paradigm;
          const color = paradigmColors[p];
          return (
            <g key={p} onClick={() => onSelect(p)} className="cursor-pointer" role="button" aria-label={`Select ${paradigmShort[p]} paradigm`}>
              <motion.path
                d={`M 458 120 C 505 120, 512 ${y}, 558 ${y} L 745 ${y}`}
                fill="none"
                stroke={color}
                strokeWidth={isActive ? 3 : 1.5}
                strokeOpacity={isActive ? 1 : 0.3}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={draw} custom={0.5 + i * 0.1}
              />
              <motion.path
                d={`M 745 ${y} C 792 ${y}, 799 120, 846 120`}
                fill="none"
                stroke={color}
                strokeWidth={isActive ? 3 : 1.5}
                strokeOpacity={isActive ? 1 : 0.3}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={draw} custom={0.9 + i * 0.1}
              />
              {/* stage dots on lane */}
              {[608, 690].map((x) => (
                <circle key={x} cx={x} cy={y} r={isActive ? 5 : 3.5} fill="var(--color-surface)" stroke={color} strokeWidth="2" strokeOpacity={isActive ? 1 : 0.35} />
              ))}
              {/* lane label */}
              <text x="562" y={y - 8} fontSize="10" fontFamily="var(--font-mono)" fill={color} fillOpacity={isActive ? 1 : 0.45}>
                {paradigmShort[p]}
              </text>
              {/* pulse on active lane */}
              {isActive && (
                <motion.circle
                  r="4" cy={y} fill={color}
                  initial={{ cx: 560 }}
                  animate={{ cx: 742 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
                />
              )}
            </g>
          );
        })}
        {/* loop back 07 → 00 */}
        <motion.path
          d="M 856 133 C 856 235, 60 235, 50 133"
          fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeDasharray="5 6" strokeOpacity="0.5"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={draw} custom={1.4}
        />
        <text x="453" y="248" fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle">
          shipped behavior → next quarter&apos;s research signal
        </text>
        {/* main nodes 00–04 */}
        {MAIN_NODES.map((n, i) => (
          <a key={n.id} href={`#stage-${n.id}`} aria-label={`Go to stage ${n.num}`}>
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 260 }}
              style={{ transformOrigin: `${n.x}px 120px` }}
            >
              {n.id === "paradigm" ? (
                <rect x={n.x - 9} y={111} width="18" height="18" transform={`rotate(45 ${n.x} 120)`} fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
              ) : (
                <circle cx={n.x} cy="120" r="9" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
              )}
              <text x={n.x} y="150" fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle">{n.num}</text>
            </motion.g>
          </a>
        ))}
        {/* node 07 */}
        <a href="#stage-ship" aria-label="Go to stage 07">
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, type: "spring", stiffness: 260 }}
            style={{ transformOrigin: "856px 120px" }}
          >
            <circle cx="856" cy="120" r="9" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="856" y="150" fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle">07</text>
          </motion.g>
        </a>
        {/* stage labels for lanes */}
        <text x="608" y="222" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle">05 flows</text>
        <text x="690" y="222" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle">06 ui</text>
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 00 — Signal funnel
────────────────────────────────────────────────────────────── */
const NOISE_SIGNALS = ["“add AI”", "competitor launched", "chatbot for everything", "engagement is up", "GPT wrapper", "voice-first hype"];
const REAL_SIGNALS = ["2.1 h/day lost to chores", "68% verify AI output manually", "tool APIs matured"];

export function SignalFunnel() {
  return (
    <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
      <div className="grid md:grid-cols-[1fr_auto_1.2fr] gap-6 items-center">
        {/* Noise + signal chips */}
        <div className="flex flex-wrap gap-2 content-start">
          {NOISE_SIGNALS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 0.35, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-muted border border-border line-through decoration-muted/60"
            >
              {s}
            </motion.span>
          ))}
          {REAL_SIGNALS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-accent border border-accent/30 bg-accent/8"
            >
              {s}
            </motion.span>
          ))}
        </div>
        {/* Funnel */}
        <svg viewBox="0 0 80 100" className="w-14 h-24 mx-auto hidden md:block" aria-hidden="true">
          <motion.path
            d="M 5 10 L 75 10 L 48 55 L 48 90 L 32 82 L 32 55 Z"
            fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </svg>
        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
          className="rounded-xl border border-accent/30 bg-accent/5 p-5"
        >
          <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">The signal, framed as an outcome</p>
          <p className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-4">
            &ldquo;Give knowledge workers back 45 minutes a day — verifiably.&rdquo;
          </p>
          {/* Kill switch */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border">
            <span className="relative inline-flex w-9 h-5 rounded-full bg-accent-scaler/20 border border-accent-scaler/40 shrink-0" aria-hidden="true">
              <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-accent-scaler" />
            </span>
            <p className="text-[11px] text-muted leading-snug">
              Kill switch armed at framing: if the outcome can&apos;t be measured, the project doesn&apos;t start.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 01 — PRD paper artifact with gauges & tripwires
────────────────────────────────────────────────────────────── */
function GaugeCard({ label, index }: Readonly<{ label: string; index: number }>) {
  const [metric, ...rest] = label.split(" (");
  const target = 0.55 + (index % 4) * 0.12;
  const angle = -180 + target * 180;
  return (
    <div className="p-3 rounded-xl bg-background border border-border">
      <svg viewBox="0 0 100 56" className="w-full h-12 mb-1" aria-hidden="true">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-border)" strokeWidth="6" strokeLinecap="round" />
        <motion.path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: target }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: "easeOut" }}
        />
        <motion.line
          x1="50" y1="50" x2="50" y2="18"
          stroke="var(--color-foreground)" strokeWidth="2" strokeLinecap="round"
          initial={{ rotate: -180 }}
          whileInView={{ rotate: angle }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          style={{ transformOrigin: "50px 50px" }}
        />
      </svg>
      <p className="text-[11px] text-foreground/80 leading-snug font-medium">{metric}</p>
      {rest.length > 0 && <p className="text-[10px] text-muted leading-snug mt-0.5">({rest.join(" (")}</p>}
    </div>
  );
}

export function PrdPaper() {
  const prd = companion.prd;
  return (
    <div className="relative">
      {/* paper */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-2xl shadow-black/30">
        <div className="px-5 sm:px-6 py-3 border-b border-border flex items-center justify-between bg-background/40">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted">PRD-001</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span className="text-xs font-semibold text-foreground">Companion — Product Requirements</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/25">v0.3 · signed</span>
        </div>
        <div className="p-5 sm:p-6 grid lg:grid-cols-[1fr_260px] gap-6">
          <div className="space-y-5 min-w-0">
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1.5">Problem</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{prd.problem}</p>
            </div>
            <div className="p-4 rounded-xl border border-accent/25 bg-accent/5">
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1.5">Hypothesis — falsifiable, not aspirational</p>
              <p className="text-sm text-foreground/85 leading-relaxed">{prd.hypothesis}</p>
            </div>
            {/* metrics as gauges */}
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Success metrics — targets with measurement methods</p>
              <div className="grid grid-cols-2 gap-3">
                {prd.successMetrics.map((m, i) => (
                  <GaugeCard key={m} label={m} index={i} />
                ))}
              </div>
            </div>
            {/* kill criteria as tripwires */}
            <div>
              <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-widest mb-2">Kill criteria — tripwires armed before anyone is invested</p>
              <div className="space-y-2">
                {prd.killCriteria.map((k, i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-4 py-2.5 pr-3 rounded-lg bg-background/60 border border-border overflow-hidden"
                  >
                    <motion.span
                      className="absolute left-0 top-0 bottom-0 w-1 bg-accent-scaler"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      style={{ transformOrigin: "top" }}
                    />
                    <p className="text-xs text-foreground/75 leading-relaxed">{k}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* margin notes */}
          <div className="space-y-3 lg:border-l lg:border-dashed lg:border-border lg:pl-5">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Margin notes</p>
            {[
              "Every requirement is a hypothesis with a measurement attached — no vanity metrics survive review.",
              "Non-goals get equal billing: no open-domain chat, no default autonomy, no engagement-time targets.",
              "Short enough that everyone actually reads it. Signed hypotheses prevent month-four goal drift.",
            ].map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, rotate: 0, y: 8 }}
                whileInView={{ opacity: 1, rotate: i % 2 === 0 ? -1 : 1.2, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="p-3 rounded-md bg-accent-coral/8 border border-accent-coral/20 shadow-lg"
              >
                <p className="text-[11px] text-foreground/75 leading-relaxed">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 02 — Interview dot grid + sticky-note clusters
────────────────────────────────────────────────────────────── */
const CLUSTER_COLORS = ["var(--color-accent)", "var(--color-accent-designer)", "var(--color-accent-scaler)", "#4ade80", "#f87171"];
const DOT_QUOTES = [
  "“I re-read everything it writes. Everything.”",
  "“I stopped asking after it invented a meeting.”",
  "“Show me where that number came from.”",
  "“I don't know what it can do, so I don't ask.”",
  "“If I could schedule it, I'd use it daily.”",
  "“The receipt is what made me trust it.”",
];

export function InterviewGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  // Distribute 32 sessions across 5 clusters proportional to mention counts
  const clusterOf = (i: number) => {
    if (i < 9) return 0;
    if (i < 16) return 1;
    if (i < 22) return 2;
    if (i < 27) return 3;
    return 4;
  };
  return (
    <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
          {companion.research.interviews} contextual inquiries · {companion.research.weeks} weeks · hover a session
        </p>
        <p className="text-[10px] font-mono text-accent min-h-4">
          {hovered !== null ? DOT_QUOTES[hovered % DOT_QUOTES.length] : ""}
        </p>
      </div>
      <div className="grid grid-cols-8 gap-2 mb-5 max-w-sm">
        {Array.from({ length: 32 }, (_, i) => (
          <motion.button
            key={`session-${clusterOf(i)}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, type: "spring", stiffness: 300 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            aria-label={`Session ${i + 1}: ${companion.research.clusters[clusterOf(i)].theme}`}
            className="aspect-square rounded-full transition-transform hover:scale-125"
            style={{ backgroundColor: CLUSTER_COLORS[clusterOf(i)], opacity: hovered === null || hovered === i ? 0.9 : 0.25 }}
          />
        ))}
      </div>
      {/* sticky-note clusters */}
      <div className="flex flex-wrap gap-3">
        {companion.research.clusters.map((c, i) => (
          <motion.div
            key={c.theme}
            initial={{ opacity: 0, y: 12, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="px-3 py-2.5 rounded-md border shadow-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${CLUSTER_COLORS[i]} 8%, var(--color-background))`,
              borderColor: `color-mix(in srgb, ${CLUSTER_COLORS[i]} 30%, transparent)`,
            }}
          >
            <p className="text-[11px] font-medium text-foreground/85">{c.theme}</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: CLUSTER_COLORS[i] }}>{c.count} of 32 sessions</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 03 — Translation pipeline
────────────────────────────────────────────────────────────── */
export function PipelinePath() {
  return (
    <div className="space-y-4">
      {/* legend */}
      <div className="hidden lg:flex items-center gap-2 px-1 text-[10px] font-mono text-muted uppercase tracking-widest">
        <span className="flex-1">Finding (observed)</span>
        <span className="w-8" />
        <span className="w-44">Principle</span>
        <span className="w-8" />
        <span className="flex-1">Constraint (must obey)</span>
        <span className="w-8" />
        <span className="flex-1">Decision (shipped)</span>
      </div>
      {companion.psychologyMap.map((row, ri) => (
        <motion.div
          key={row.principleId + row.finding}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: ri * 0.05 }}
          className="flex flex-col lg:flex-row lg:items-stretch gap-2"
        >
          {/* finding — speech bubble */}
          <div className="flex-1 relative p-3.5 rounded-xl rounded-bl-sm bg-surface border border-border">
            <p className="text-xs text-foreground/75 leading-relaxed italic">{row.finding}</p>
          </div>
          <PipeArrow delay={0.15 + ri * 0.05} />
          {/* principle */}
          <div className="lg:w-44 flex items-center">
            <PrincipleChip id={row.principleId} />
          </div>
          <PipeArrow delay={0.25 + ri * 0.05} />
          {/* constraint */}
          <div className="flex-1 p-3.5 rounded-xl bg-surface border border-accent-scaler/25 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-accent-scaler shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/85 leading-relaxed font-medium">{row.constraint}</p>
          </div>
          <PipeArrow delay={0.35 + ri * 0.05} />
          {/* decision */}
          <div className="flex-1 p-3.5 rounded-xl bg-surface border border-accent/25 flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted leading-relaxed">{row.decision}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PipeArrow({ delay }: Readonly<{ delay: number }>) {
  return (
    <div className="flex items-center justify-center lg:w-8 shrink-0" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <ArrowRight className="w-3.5 h-3.5 text-muted rotate-90 lg:rotate-0" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 04 — Paradigm posters (the switcher) + radar chart
────────────────────────────────────────────────────────────── */
function PosterIllustration({ p }: Readonly<{ p: Paradigm }>) {
  const c = paradigmColors[p];
  if (p === "agentic") {
    return (
      <div className="h-20 flex flex-col justify-center gap-1.5 px-4" aria-hidden="true">
        <div className="self-end w-2/3 h-3 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${c} 30%, transparent)` }} />
        <div className="w-3/4 h-3 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${c} 18%, transparent)` }} />
        <div className="w-1/2 h-3 rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${c} 18%, transparent)` }} />
        <div className="flex gap-1 mt-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }}
              animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </div>
      </div>
    );
  }
  if (p === "hybrid") {
    return (
      <div className="h-20 flex gap-1.5 p-3" aria-hidden="true">
        <div className="flex-2 grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded border" style={{ borderColor: "var(--color-border)", backgroundColor: i === 1 ? `color-mix(in srgb, ${c} 15%, transparent)` : "var(--color-background)" }} />
          ))}
        </div>
        <div className="flex-1 rounded border flex flex-col gap-1 p-1.5" style={{ borderColor: `color-mix(in srgb, ${c} 40%, transparent)` }}>
          <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: `color-mix(in srgb, ${c} 35%, transparent)` }} />
          <div className="h-1.5 rounded-full w-2/3" style={{ backgroundColor: `color-mix(in srgb, ${c} 25%, transparent)` }} />
        </div>
      </div>
    );
  }
  if (p === "traditional") {
    return (
      <div className="h-20 p-3" aria-hidden="true">
        <div className="h-full rounded border border-border bg-background flex flex-col">
          <div className="flex gap-1 p-1.5 border-b border-border">
            {[0, 1, 2, 3].map((i) => <div key={i} className="w-4 h-2 rounded-sm bg-border" />)}
          </div>
          <div className="flex-1 p-1.5 space-y-1">
            {[0, 1].map((i) => <div key={i} className="h-2 rounded-sm" style={{ backgroundColor: `color-mix(in srgb, ${c} ${18 - i * 6}%, transparent)` }} />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-20 flex items-center justify-center" aria-hidden="true">
      <motion.div
        className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: c }}
        animate={{ boxShadow: [`0 0 6px ${c}40`, `0 0 18px ${c}70`, `0 0 6px ${c}40`] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
      </motion.div>
    </div>
  );
}

export function ParadigmPosters({ value, onChange }: Readonly<{ value: Paradigm; onChange: (p: Paradigm) => void }>) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Interface paradigm">
      {paradigmList.map((p, i) => {
        const isActive = value === p;
        const c = paradigmColors[p];
        return (
          <motion.button
            key={p}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(p)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border text-left overflow-hidden transition-all"
            style={{
              borderColor: isActive ? c : "var(--color-border)",
              backgroundColor: isActive ? `color-mix(in srgb, ${c} 6%, var(--color-surface))` : "var(--color-surface)",
              boxShadow: isActive ? `0 0 24px color-mix(in srgb, ${c} 18%, transparent)` : "none",
            }}
          >
            <PosterIllustration p={p} />
            <div className="px-3.5 pb-3 pt-1 border-t border-border/50">
              <p className="text-xs font-bold" style={{ color: isActive ? c : "var(--color-foreground)" }}>{paradigmShort[p]}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* Radar chart over the 6 decision criteria */
export function RadarChart({ paradigm }: Readonly<{ paradigm: Paradigm }>) {
  const cx = 170, cy = 150, rMax = 100;
  const n = decisionMatrix.length;
  const angle = (i: number) => (-90 + (i * 360) / n) * (Math.PI / 180);
  const pt = (i: number, r: number) => `${cx + r * Math.cos(angle(i))},${cy + r * Math.sin(angle(i))}`;
  const scoreR = (s: number) => 20 + (s / 2) * (rMax - 20);
  const poly = (p: Paradigm) => decisionMatrix.map((row, i) => pt(i, scoreR(row.scores[p]))).join(" ");

  return (
    <div className="rounded-2xl bg-surface border border-border p-4 sm:p-5">
      <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">Fit radar — 6 criteria, 4 paradigms</p>
      <p className="text-[11px] text-muted mb-2">Derived from the research, not preference. Selected paradigm filled.</p>
      <svg viewBox="0 0 340 300" className="w-full max-w-sm mx-auto" role="img" aria-label={`Radar chart of paradigm fit. ${paradigmShort[paradigm]} highlighted.`}>
        {/* grid rings */}
        {[20, 60, 100].map((r) => (
          <polygon key={r} points={decisionMatrix.map((_, i) => pt(i, r)).join(" ")} fill="none" stroke="var(--color-border)" strokeWidth="1" />
        ))}
        {/* axes + labels */}
        {decisionMatrix.map((row, i) => {
          const lx = cx + (rMax + 24) * Math.cos(angle(i));
          const ly = cy + (rMax + 24) * Math.sin(angle(i));
          return (
            <g key={row.criterion}>
              <line x1={cx} y1={cy} x2={cx + rMax * Math.cos(angle(i))} y2={cy + rMax * Math.sin(angle(i))} stroke="var(--color-border)" strokeWidth="1" />
              <text x={lx} y={ly} fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-muted)" textAnchor="middle" dominantBaseline="middle">
                {row.criterion}
              </text>
            </g>
          );
        })}
        {/* ghost polygons */}
        {paradigmList.filter((p) => p !== paradigm).map((p) => (
          <polygon key={p} points={poly(p)} fill="none" stroke={paradigmColors[p]} strokeWidth="1.5" strokeOpacity="0.25" />
        ))}
        {/* active polygon */}
        <motion.polygon
          key={paradigm}
          points={poly(paradigm)}
          fill={paradigmColors[paradigm]}
          fillOpacity="0.18"
          stroke={paradigmColors[paradigm]}
          strokeWidth="2.5"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 05 — Node-graph spine (drawn above the step cards)
────────────────────────────────────────────────────────────── */
export function FlowSpine({ paradigm, kinds }: Readonly<{ paradigm: Paradigm; kinds: string[] }>) {
  const c = paradigmColors[paradigm];
  const n = kinds.length;
  const w = 700, y = 30;
  const xAt = (i: number) => 40 + (i * (w - 80)) / (n - 1);
  return (
    <svg viewBox={`0 0 ${w} 60`} className="w-full hidden lg:block mb-2" aria-hidden="true">
      <motion.line
        x1={xAt(0)} y1={y} x2={xAt(n - 1)} y2={y}
        stroke={c} strokeWidth="2" strokeOpacity="0.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      />
      {kinds.map((kind, i) => (
        <g key={`${kind}-${xAt(i)}`}>
          {kind === "decision" ? (
            <rect x={xAt(i) - 7} y={y - 7} width="14" height="14" transform={`rotate(45 ${xAt(i)} ${y})`} fill="var(--color-surface)" stroke="var(--color-accent-scaler)" strokeWidth="2" />
          ) : (
            <circle cx={xAt(i)} cy={y} r={kind === "start" || kind === "end" ? 8 : 6} fill="var(--color-surface)" stroke={c} strokeWidth="2" />
          )}
          {kind === "end" && <circle cx={xAt(i)} cy={y} r="3" fill={c} />}
        </g>
      ))}
      {/* traveling pulse */}
      <motion.circle
        r="4" cy={y} fill={c}
        initial={{ cx: xAt(0) }}
        animate={{ cx: xAt(n - 1) }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 06 — Browser / hardware chrome framing
────────────────────────────────────────────────────────────── */
export function DemoChrome({ paradigm, children }: Readonly<{ paradigm: Paradigm; children: React.ReactNode }>) {
  const c = paradigmColors[paradigm];
  if (paradigm === "zero-ui") {
    return (
      <div className="rounded-2xl border border-border overflow-hidden" style={{ background: `radial-gradient(ellipse 80% 90% at 50% 110%, color-mix(in srgb, ${c} 8%, transparent), var(--color-background))` }}>
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-[10px] font-mono text-muted">companion · desk device rev-B</span>
          <span className="text-[10px] font-mono" style={{ color: c }}>hardware</span>
        </div>
        {children}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-background">
      <div className="px-4 py-2 border-b border-border flex items-center gap-2">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full bg-border" />)}
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-surface border border-border text-[10px] font-mono text-muted truncate">
          companion.app/workspace
        </div>
        <span className="text-[10px] font-mono shrink-0" style={{ color: c }}>{paradigmShort[paradigm]}</span>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 07 — Launch funnel + sparkline metric tiles
────────────────────────────────────────────────────────────── */
const TIERS = [
  { name: "Internal dogfood", width: 100, users: "120 users", kill: "verification time > 50% of time saved" },
  { name: "Design partners", width: 78, users: "8 orgs", kill: "< 30% delegate a 2nd task type by wk 2" },
  { name: "5% rollout", width: 56, users: "~40K users", kill: "trust-calibration gap > 15%" },
  { name: "50% rollout", width: 36, users: "~400K users", kill: "p95 first-token latency > 2s" },
  { name: "GA", width: 20, users: "millions", kill: "D30 retention < 30% among delegators" },
];

export function LaunchFunnel() {
  return (
    <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
      <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">
        Tiered launch — every tier armed with a kill threshold before launch day
      </p>
      <div className="space-y-2.5">
        {TIERS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09 }}
            className="flex items-center gap-3"
          >
            <div className="w-28 sm:w-32 shrink-0 text-right">
              <p className="text-xs font-semibold text-foreground">{t.name}</p>
              <p className="text-[10px] font-mono text-muted">{t.users}</p>
            </div>
            <div className="flex-1 relative h-9">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-lg bg-accent/15 border border-accent/30"
                initial={{ width: 0 }}
                whileInView={{ width: `${t.width}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.5, ease: "easeOut" }}
              />
              {/* kill threshold line */}
              <div className="absolute inset-y-0 flex items-center gap-1.5" style={{ left: `${t.width}%` }}>
                <span className="block w-0.5 h-full bg-accent-scaler/70" />
                <span className="text-[9px] font-mono text-accent-scaler whitespace-nowrap hidden md:block">
                  kill: {t.kill}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[10px] font-mono text-muted md:hidden">Kill thresholds: verification cost, delegation breadth, trust gap, latency, retention.</p>
    </div>
  );
}

export function Sparkline({ seed, color }: Readonly<{ seed: number; color: string }>) {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const v = 26 - (Math.sin(seed * 3.7 + i * 0.9) * 7 + i * (seed % 2 === 0 ? 1.1 : 0.7));
    return `${4 + i * 8},${Math.max(4, Math.min(32, v))}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 96 36" className="w-24 h-9" aria-hidden="true">
      <motion.polyline
        points={pts}
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}
