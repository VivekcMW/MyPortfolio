"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Paradigm, FlowStep, StageMeta } from "@/lib/process/types";
import { stages } from "@/lib/process/stages";
import { companion } from "@/lib/process/companion";
import { paradigms, paradigmList, decisionMatrix, verdict } from "@/lib/process/paradigms";
import { getPrinciple } from "@/lib/process/principles";
import {
  Bot, LayoutDashboard, MousePointerClick, Radio, Check, X, ChevronDown,
  AlertTriangle, ArrowRight, RotateCcw, Play, Sparkles, FileText, Users,
  Brain, GitBranch, Workflow, Palette, Rocket, CircleDot, Mic, Ear,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Paradigm visual identity
────────────────────────────────────────────────────────────── */
const paradigmMeta: Record<Paradigm, { icon: typeof Bot; color: string; short: string }> = {
  agentic: { icon: Bot, color: "var(--color-accent-designer)", short: "Agentic" },
  hybrid: { icon: LayoutDashboard, color: "var(--color-accent)", short: "Hybrid" },
  traditional: { icon: MousePointerClick, color: "#A3A3A3", short: "Traditional" },
  "zero-ui": { icon: Radio, color: "var(--color-accent-scaler)", short: "Zero-UI" },
};

const stageIcons: Record<string, typeof Bot> = {
  signal: Sparkles, prd: FileText, research: Users, psychology: Brain,
  paradigm: GitBranch, flows: Workflow, ui: Palette, ship: Rocket,
};

/* ─────────────────────────────────────────────────────────────
   Principle chip with popover
────────────────────────────────────────────────────────────── */
function PrincipleChip({ id }: { id: string }) {
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
   Gate card — kill criteria per stage
────────────────────────────────────────────────────────────── */
function GateCard({ gate }: { gate: string[] }) {
  return (
    <div className="mt-8 rounded-xl border border-accent-scaler/20 bg-accent-scaler/4 p-5">
      <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-widest mb-3 flex items-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5" />
        Gate — we don&apos;t proceed unless
      </p>
      <ul className="space-y-2">
        {gate.map((g) => (
          <li key={g} className="flex gap-2.5 text-sm text-foreground/75 leading-relaxed">
            <span className="mt-2 w-1 h-1 rounded-full bg-accent-scaler/60 shrink-0" />
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage shell — identical anatomy for every stage
────────────────────────────────────────────────────────────── */
function StageShell({ stage, children }: { stage: StageMeta; children: React.ReactNode }) {
  const Icon = stageIcons[stage.id] ?? CircleDot;
  return (
    <Section>
      <div id={`stage-${stage.id}`} data-stage={stage.id} className="scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest">
                Stage {stage.num} — {stage.eyebrow}
              </p>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{stage.title}</h2>
          <p className="text-base text-muted leading-relaxed max-w-3xl mb-4">{stage.method}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {stage.psychology.map((pid) => (
              <PrincipleChip key={pid} id={pid} />
            ))}
          </div>
          {children}
          <GateCard gate={stage.gate} />
        </motion.div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 00/01 — PRD artifact
────────────────────────────────────────────────────────────── */
function PrdArtifact() {
  const [expanded, setExpanded] = useState(false);
  const prd = companion.prd;
  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Companion — PRD excerpt</span>
        </div>
        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Teaching artifact</span>
      </div>
      <div className="p-5 sm:p-6 space-y-5">
        <div>
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Problem</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{prd.problem}</p>
        </div>
        <div>
          <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">Hypothesis — falsifiable, not aspirational</p>
          <p className="text-sm text-foreground/80 leading-relaxed">{prd.hypothesis}</p>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-5 pt-1">
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Success metrics — each with a measurement method</p>
                  <ul className="space-y-1.5">
                    {prd.successMetrics.map((m) => (
                      <li key={m} className="flex gap-2.5 text-sm text-foreground/75">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-1" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Non-goals — what we refuse to build</p>
                  <ul className="space-y-1.5">
                    {prd.nonGoals.map((m) => (
                      <li key={m} className="flex gap-2.5 text-sm text-muted">
                        <X className="w-3.5 h-3.5 text-muted shrink-0 mt-1" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-accent-scaler/20 bg-accent-scaler/4 p-4">
                  <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-widest mb-2">Kill criteria — written before anyone is invested</p>
                  <ul className="space-y-1.5">
                    {prd.killCriteria.map((m) => (
                      <li key={m} className="flex gap-2.5 text-sm text-foreground/75">
                        <AlertTriangle className="w-3.5 h-3.5 text-accent-scaler shrink-0 mt-1" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent/80 transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Collapse" : "Metrics, non-goals & kill criteria"}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 02 — Research artifact: personas + clusters + JTBD
────────────────────────────────────────────────────────────── */
function ResearchArtifact() {
  const [active, setActive] = useState(0);
  const persona = companion.personas[active];
  const maxCount = Math.max(...companion.research.clusters.map((c) => c.count));

  return (
    <div className="space-y-6">
      {/* Field stats */}
      <div className="grid grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {[
          { v: `${companion.research.interviews}`, l: "Contextual inquiries" },
          { v: `${companion.research.weeks} wks`, l: "Fieldwork" },
          { v: `${companion.research.clusters.length}`, l: "Behavior clusters" },
        ].map((s) => (
          <div key={s.l} className="bg-surface px-4 py-4 text-center">
            <p className="text-xl font-bold text-foreground">{s.v}</p>
            <p className="text-[10px] font-mono text-muted uppercase tracking-wider mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personas */}
        <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">
            Personas — behavioral, not demographic
          </p>
          <div className="flex gap-2 mb-5" role="tablist" aria-label="Personas">
            {companion.personas.map((p, i) => (
              <button
                key={p.name}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  active === i
                    ? "bg-accent/10 border-accent/40 text-foreground"
                    : "bg-transparent border-border text-muted hover:text-foreground"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={persona.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-semibold text-foreground mb-1">{persona.label}</p>
              <p className="text-sm text-accent italic mb-4">&ldquo;{persona.quote}&rdquo;</p>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5">Observed behavior</p>
                  <ul className="space-y-1">
                    {persona.behaviors.map((b) => (
                      <li key={b} className="flex gap-2 text-xs text-foreground/70 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5">Needs</p>
                  <ul className="space-y-1">
                    {persona.needs.map((n) => (
                      <li key={n} className="flex gap-2 text-xs text-foreground/70 leading-relaxed">
                        <Check className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-background border border-border">
                  <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-wider mb-1">Specific distrust</p>
                  <p className="text-xs text-foreground/75">{persona.distrust}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Affinity clusters + insight */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">
              Affinity clusters — mentions across {companion.research.interviews} sessions
            </p>
            <div className="space-y-3">
              {companion.research.clusters.map((c) => (
                <div key={c.theme}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground/80">{c.theme}</span>
                    <span className="font-mono text-muted">{c.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-background overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(c.count / maxCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full bg-accent/60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-accent/20 bg-accent/4 p-5">
            <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">The key insight</p>
            <p className="text-sm text-foreground/85 leading-relaxed">{companion.research.keyInsight}</p>
          </div>
        </div>
      </div>

      {/* JTBD */}
      <div className="rounded-2xl bg-surface border border-border p-5 sm:p-6">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-4">Jobs to be done</p>
        <div className="grid md:grid-cols-3 gap-4">
          {companion.jtbd.map((j, i) => (
            <div key={j} className="p-4 rounded-xl bg-background border border-border">
              <span className="text-xs font-mono text-accent">JTBD {String(i + 1).padStart(2, "0")}</span>
              <p className="text-xs text-foreground/75 leading-relaxed mt-2">{j}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 03 — Psychology mapping table
────────────────────────────────────────────────────────────── */
function PsychologyArtifact() {
  return (
    <div className="space-y-3">
      <div className="hidden md:grid grid-cols-[1fr_1fr_1fr] gap-px px-1">
        {["Finding → Principle", "Constraint (must obey)", "Design decision"].map((h) => (
          <p key={h} className="text-[10px] font-mono text-muted uppercase tracking-widest px-4 py-2">{h}</p>
        ))}
      </div>
      {companion.psychologyMap.map((row) => (
        <motion.div
          key={row.principleId + row.finding}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border"
        >
          <div className="bg-surface p-4">
            <p className="text-xs text-foreground/75 leading-relaxed mb-2">{row.finding}</p>
            <PrincipleChip id={row.principleId} />
          </div>
          <div className="bg-surface p-4 flex items-start gap-2">
            <ArrowRight className="w-3.5 h-3.5 text-accent-scaler shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/80 leading-relaxed font-medium">{row.constraint}</p>
          </div>
          <div className="bg-surface p-4 flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted leading-relaxed">{row.decision}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 04 — Paradigm switcher + decision matrix + verdict
────────────────────────────────────────────────────────────── */
function ParadigmSwitcher({ value, onChange, size = "md" }: {
  value: Paradigm;
  onChange: (p: Paradigm) => void;
  size?: "md" | "sm";
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-surface border border-border ${size === "sm" ? "" : "flex-wrap"}`}
      role="tablist"
      aria-label="Interface paradigm"
    >
      {paradigmList.map((p) => {
        const meta = paradigmMeta[p];
        const Icon = meta.icon;
        const isActive = value === p;
        return (
          <button
            key={p}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(p)}
            className={`flex items-center gap-1.5 rounded-lg font-medium transition-all ${
              size === "sm" ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-xs sm:text-sm"
            }`}
            style={{
              backgroundColor: isActive ? `color-mix(in srgb, ${meta.color} 15%, transparent)` : "transparent",
              color: isActive ? meta.color : "var(--color-muted)",
              boxShadow: isActive ? `inset 0 0 0 1px color-mix(in srgb, ${meta.color} 35%, transparent)` : "none",
            }}
          >
            <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
            {meta.short}
          </button>
        );
      })}
    </div>
  );
}

function scoreDot(score: number, color: string) {
  const labels = ["Poor fit", "Workable", "Strong fit"];
  return (
    <span className="inline-flex items-center justify-center gap-0.5" title={labels[score]} aria-label={labels[score]}>
      {[0, 1].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: i < score ? color : "var(--color-border)",
            opacity: score === 0 && i === 0 ? 0.35 : 1,
          }}
        />
      ))}
    </span>
  );
}

function ParadigmGateArtifact({ paradigm, onChange }: { paradigm: Paradigm; onChange: (p: Paradigm) => void }) {
  const active = paradigms[paradigm];
  const meta = paradigmMeta[paradigm];

  return (
    <div className="space-y-6">
      {/* Switcher */}
      <div className="flex flex-col items-start gap-3">
        <p className="text-xs text-muted">
          Same research. Four interface futures. Pick one — stages 05–07 below re-render for it.
        </p>
        <ParadigmSwitcher value={paradigm} onChange={onChange} />
      </div>

      {/* Active paradigm profile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={paradigm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-surface border overflow-hidden"
          style={{ borderColor: `color-mix(in srgb, ${meta.color} 25%, transparent)` }}
        >
          <div className="p-5 sm:p-6 border-b border-border">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}
              >
                <meta.icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{active.name}</h3>
                <p className="text-xs font-mono" style={{ color: meta.color }}>{active.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed">{active.model}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-border">
            <div className="bg-surface p-4">
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Who holds the plan</p>
              <p className="text-sm text-foreground/80">{active.holdsPlan}</p>
            </div>
            <div className="bg-surface p-4">
              <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1">Where truth lives</p>
              <p className="text-sm text-foreground/80">{active.truthLives}</p>
            </div>
          </div>
          <div className="p-5 sm:p-6 grid md:grid-cols-2 gap-6 border-t border-border">
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Signature patterns</p>
              <div className="space-y-2.5">
                {active.patterns.map((pt) => (
                  <div key={pt.name}>
                    <p className="text-xs font-semibold text-foreground">{pt.name}</p>
                    <p className="text-xs text-muted leading-relaxed">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Failure modes to design for</p>
                <ul className="space-y-1.5">
                  {active.failureModes.map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-foreground/70 leading-relaxed">
                      <AlertTriangle className="w-3 h-3 text-accent-scaler shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">Choose when</p>
                <ul className="space-y-1.5">
                  {active.chooseWhen.map((c) => (
                    <li key={c} className="flex gap-2 text-xs text-foreground/70 leading-relaxed">
                      <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: meta.color }} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="px-5 sm:px-6 py-4 bg-background/50 border-t border-border">
            <p className="text-xs text-muted leading-relaxed">
              <span className="font-mono text-[10px] uppercase tracking-wider mr-2" style={{ color: meta.color }}>
                Honest weakness
              </span>
              {active.weakness}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Decision matrix */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold">The decision matrix</p>
          <p className="text-xs text-muted mt-0.5">Fit per criterion — derived from the research, not preference. Two dots = strong fit.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-140">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-[10px] font-mono text-muted uppercase tracking-widest font-medium">Criterion</th>
                {paradigmList.map((p) => (
                  <th key={p} className="px-3 py-3 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: paradigmMeta[p].color }}>
                      {paradigmMeta[p].short}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {decisionMatrix.map((row) => (
                <tr key={row.criterion} className="border-b border-border/50 last:border-0">
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-medium text-foreground">{row.criterion}</p>
                    <p className="text-[11px] text-muted leading-relaxed mt-0.5 max-w-xs">{row.detail}</p>
                  </td>
                  {paradigmList.map((p) => (
                    <td key={p} className="px-3 py-3.5 text-center">
                      {scoreDot(row.scores[p], paradigmMeta[p].color)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-accent/25 bg-accent/5 p-5 sm:p-6">
        <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">The verdict — a paradigm choice must have spine</p>
        <p className="text-base font-bold text-foreground mb-2">{verdict.headline}</p>
        <p className="text-sm text-muted leading-relaxed">{verdict.reasoning}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 05 — Wireflow per paradigm
────────────────────────────────────────────────────────────── */
function WireflowArtifact({ paradigm }: { paradigm: Paradigm }) {
  const flow = paradigms[paradigm].flow;
  const meta = paradigmMeta[paradigm];
  const [openStep, setOpenStep] = useState<string | null>(null);

  const kindStyle: Record<FlowStep["kind"], { border: string; label: string }> = {
    start: { border: meta.color, label: "entry" },
    step: { border: "var(--color-border)", label: "step" },
    decision: { border: "var(--color-accent-scaler)", label: "gate" },
    failure: { border: "#f87171", label: "failure" },
    end: { border: meta.color, label: "outcome" },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={paradigm}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-surface border border-border p-5 sm:p-6"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: meta.color }}>
          {paradigms[paradigm].name} — red route wireflow
        </p>
        <p className="text-xs text-muted mb-6">
          Failure branches designed first. Click any node for its reasoning.
        </p>
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
          {flow.map((step, i) => {
            const isOpen = openStep === step.id;
            const ks = kindStyle[step.kind];
            return (
              <div key={step.id} className="flex flex-col lg:flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                    aria-expanded={isOpen}
                    className="flex-1 text-left p-3 rounded-xl bg-background border transition-all hover:border-accent/40 min-w-0"
                    style={{ borderColor: isOpen ? meta.color : "var(--color-border)" }}
                  >
                    <p className="text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: ks.border === "var(--color-border)" ? "var(--color-muted)" : ks.border }}>
                      {ks.label}
                    </p>
                    <p className="text-xs font-semibold text-foreground truncate">{step.label}</p>
                  </button>
                  {i < flow.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-muted shrink-0 hidden lg:block" />
                  )}
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 rounded-xl bg-background border border-border">
                        <p className="text-xs text-foreground/75 leading-relaxed">{step.desc}</p>
                        {step.branches?.map((b) => (
                          <div key={b.label} className="mt-2 p-2.5 rounded-lg border border-dashed border-accent-scaler/30 bg-accent-scaler/4">
                            <p className="text-[10px] font-mono text-accent-scaler uppercase tracking-wider mb-0.5">
                              ↳ {b.label}
                            </p>
                            <p className="text-[11px] text-muted leading-relaxed">{b.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 06 — Live mini demos per paradigm
────────────────────────────────────────────────────────────── */
function AgenticDemo() {
  const [phase, setPhase] = useState<"idle" | "planning" | "await" | "running" | "done">("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const planSteps = [
    "Read 47 unread threads across 3 channels",
    "Cluster into decisions-needed (4) vs FYI (43)",
    "Draft one-line summaries with source links",
  ];
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = () => {
    setPhase("planning");
    setVisibleSteps(0);
    planSteps.forEach((_, i) => {
      timers.current.push(setTimeout(() => setVisibleSteps(i + 1), 350 * (i + 1)));
    });
    timers.current.push(setTimeout(() => setPhase("await"), 350 * (planSteps.length + 1)));
  };

  const approve = () => {
    setPhase("running");
    timers.current.push(setTimeout(() => setPhase("done"), 1600));
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setPhase("idle");
    setVisibleSteps(0);
  };

  return (
    <div className="rounded-xl bg-background border border-border p-4 h-full flex flex-col">
      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-3">Plan preview → approval → receipt</p>
      {phase === "idle" && (
        <button
          onClick={start}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold w-fit"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-designer) 15%, transparent)", color: "var(--color-accent-designer)" }}
        >
          <Play className="w-3.5 h-3.5" />
          &ldquo;Triage my inbox from the last two days&rdquo;
        </button>
      )}
      {phase !== "idle" && (
        <div className="space-y-2 flex-1">
          <p className="text-xs text-foreground/80 font-medium">Plan — 3 steps, read-only blast radius:</p>
          {planSteps.slice(0, visibleSteps).map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xs text-muted"
            >
              {phase === "done" || (phase === "running" && i === 0) ? (
                <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
              ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0 flex items-center justify-center text-[8px] font-mono text-muted">{i + 1}</span>
              )}
              {s}
            </motion.div>
          ))}
          {phase === "await" && (
            <div className="flex gap-2 pt-2">
              <button onClick={approve} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-green-400/15 text-green-400">
                Approve
              </button>
              <button onClick={reset} className="px-3 py-1.5 rounded-lg text-[11px] font-medium bg-surface border border-border text-muted">
                Cancel
              </button>
            </div>
          )}
          {phase === "running" && <p className="text-[11px] font-mono text-accent-designer pt-1">executing · step 1/3 · reading #product-updates…</p>}
          {phase === "done" && (
            <div className="mt-2 p-3 rounded-lg border border-green-400/25 bg-green-400/6">
              <p className="text-[10px] font-mono text-green-400 uppercase tracking-wider mb-1">Receipt</p>
              <p className="text-[11px] text-muted leading-relaxed">47 threads triaged · 4 need decisions · 0 items modified · <button onClick={reset} className="text-foreground/70 underline underline-offset-2 inline-flex items-center gap-1"><RotateCcw className="w-2.5 h-2.5" />undo / replay</button></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HybridDemo() {
  const [state, setState] = useState<"idle" | "preview" | "applied">("idle");
  const rows = [
    { name: "Q3 status draft", tag: "stale", fixed: "updated · numbers pulled from source" },
    { name: "Vendor follow-up", tag: "overdue", fixed: "drafted · awaiting your review" },
    { name: "Sprint notes", tag: "ok", fixed: "" },
  ];
  return (
    <div className="rounded-xl bg-background border border-border p-4 h-full">
      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-3">Dashboard truth + agent diff preview</p>
      <div className="space-y-1.5 mb-3">
        {rows.map((r) => {
          const affected = r.tag !== "ok";
          const highlight = state === "preview" && affected;
          const applied = state === "applied" && affected;
          return (
            <div
              key={r.name}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs transition-all"
              style={{
                borderColor: highlight ? "var(--color-accent)" : "var(--color-border)",
                backgroundColor: highlight ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "var(--color-surface)",
              }}
            >
              <span className="text-foreground/80 truncate">{r.name}</span>
              {applied ? (
                <span className="text-[10px] font-mono text-green-400 shrink-0">{r.fixed}</span>
              ) : (
                <span className={`text-[10px] font-mono shrink-0 ${r.tag === "ok" ? "text-muted" : "text-accent-scaler"}`}>{r.tag}</span>
              )}
            </div>
          );
        })}
      </div>
      {state === "idle" && (
        <button
          onClick={() => setState("preview")}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold bg-accent/10 text-accent border border-accent/25"
        >
          <Sparkles className="w-3 h-3" />
          Ask Companion: &ldquo;fix what&apos;s stale&rdquo;
        </button>
      )}
      {state === "preview" && (
        <div className="flex items-center gap-2">
          <p className="text-[11px] text-muted flex-1">2 changes proposed — highlighted above.</p>
          <button onClick={() => setState("applied")} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-green-400/15 text-green-400">Apply</button>
          <button onClick={() => setState("idle")} className="px-3 py-1.5 rounded-lg text-[11px] bg-surface border border-border text-muted">Reject</button>
        </div>
      )}
      {state === "applied" && (
        <p className="text-[11px] text-muted flex items-center gap-2">
          <Check className="w-3 h-3 text-green-400" /> Applied · both entries in the shared ledger ·{" "}
          <button onClick={() => setState("idle")} className="underline underline-offset-2 inline-flex items-center gap-1 text-foreground/70">
            <RotateCcw className="w-2.5 h-2.5" /> undo
          </button>
        </p>
      )}
    </div>
  );
}

function TraditionalDemo() {
  const [view, setView] = useState<"all" | "overdue">("all");
  const rows = [
    { name: "Q3 status draft", due: "Today", overdue: false },
    { name: "Vendor follow-up", due: "3 days ago", overdue: true },
    { name: "Sprint notes", due: "Tomorrow", overdue: false },
    { name: "Budget review", due: "1 week ago", overdue: true },
  ];
  const visible = view === "all" ? rows : rows.filter((r) => r.overdue);
  return (
    <div className="rounded-xl bg-background border border-border p-4 h-full">
      <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-3">Saved views + deterministic rules</p>
      <div className="flex items-center gap-1.5 mb-3">
        {(["all", "overdue"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            aria-pressed={view === v}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              view === v ? "bg-surface-hover border-border text-foreground" : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {v === "all" ? "All items" : "⚑ Overdue (saved view)"}
          </button>
        ))}
      </div>
      <div className="space-y-1.5 mb-3">
        {visible.map((r) => (
          <div key={r.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface border border-border text-xs">
            <span className="text-foreground/80">{r.name}</span>
            <span className={`text-[10px] font-mono ${r.overdue ? "text-accent-scaler" : "text-muted"}`}>{r.due}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-mono text-muted">
        rule: when item overdue &gt; 2d → move to ⚑ · same input, same output, forever
      </p>
    </div>
  );
}

function ZeroUIDemo() {
  const [state, setState] = useState<"ambient" | "listening" | "confirm" | "done">("ambient");
  const ledColor: Record<typeof state, string> = {
    ambient: "#3f3f46",
    listening: "var(--color-accent)",
    confirm: "var(--color-accent-scaler)",
    done: "#4ade80",
  };
  const label: Record<typeof state, string> = {
    ambient: "Ambient — peripheral, silent",
    listening: "Listening — LED breathes, unambiguous",
    confirm: "Risk gate — reads the action back, awaits spoken confirm",
    done: "Done earcon — full summary deferred to your next screen",
  };
  const next: Record<typeof state, typeof state> = {
    ambient: "listening",
    listening: "confirm",
    confirm: "done",
    done: "ambient",
  };
  const stateIcons: Record<typeof state, typeof Mic> = {
    ambient: Radio,
    listening: Mic,
    confirm: Ear,
    done: Radio,
  };
  const StateIcon = stateIcons[state];
  return (
    <div className="rounded-xl bg-background border border-border p-4 h-full flex flex-col items-center justify-center gap-4">
      <p className="text-[10px] font-mono text-muted uppercase tracking-wider self-start">The signal grammar — a token system for hardware</p>
      {/* Device puck */}
      <button
        onClick={() => setState(next[state])}
        aria-label={`Device state: ${label[state]}. Tap to advance.`}
        className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors"
        style={{ borderColor: ledColor[state], backgroundColor: "var(--color-surface)" }}
      >
        <motion.span
          key={state}
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 24px ${ledColor[state]}` }}
          animate={state === "listening" ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.5 }}
          transition={state === "listening" ? { duration: 1.4, repeat: Infinity } : { duration: 0.3 }}
        />
        {state === "listening" ? (
          <Mic className="w-6 h-6 relative z-10" style={{ color: ledColor[state] }} />
        ) : (
          <StateIcon className="w-6 h-6 relative z-10" style={{ color: ledColor[state] }} />
        )}
      </button>
      <p className="text-[11px] text-muted text-center leading-relaxed max-w-60">{label[state]}</p>
      <p className="text-[10px] font-mono text-muted/70">tap the device to advance the state</p>
    </div>
  );
}

function DemoArtifact({ paradigm }: { paradigm: Paradigm }) {
  const meta = paradigmMeta[paradigm];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={paradigm}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-surface border border-border p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: meta.color }}>
            {paradigms[paradigm].name} — interactive vignette
          </p>
          <Link href="/craft" className="text-[11px] font-mono text-muted hover:text-foreground transition-colors underline underline-offset-4 decoration-border">
            execution quality lives in /craft →
          </Link>
        </div>
        <div className="min-h-60">
          {paradigm === "agentic" && <AgenticDemo />}
          {paradigm === "hybrid" && <HybridDemo />}
          {paradigm === "traditional" && <TraditionalDemo />}
          {paradigm === "zero-ui" && <ZeroUIDemo />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage 07 — Metrics per paradigm + loop
────────────────────────────────────────────────────────────── */
function ShipArtifact({ paradigm }: { paradigm: Paradigm }) {
  const active = paradigms[paradigm];
  const meta = paradigmMeta[paradigm];
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={paradigm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: meta.color }}>
            What we measure if we ship {active.name} — metrics that resist Goodhart
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {active.metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-surface border border-border">
                <p className="text-sm font-semibold text-foreground mb-1">{m.label}</p>
                <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* The loop */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center">
        <RotateCcw className="w-5 h-5 text-accent mx-auto mb-3" />
        <p className="text-sm text-foreground/85 max-w-xl mx-auto leading-relaxed mb-6">
          Shipped behavior becomes next quarter&apos;s research signal, and the loop closes at Stage 00.
          This is the method. Here it is applied to real, shipped products:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/work/nocode-platform" className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors">
            NoCode Platform — 4-year case study
          </Link>
          <Link href="/design-system" className="px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-xs font-medium text-foreground hover:border-accent/30 transition-colors">
            DS Lab — live token studio
          </Link>
          <Link href="/craft" className="px-4 py-2.5 rounded-xl bg-surface-hover border border-border text-xs font-medium text-foreground hover:border-accent/30 transition-colors">
            Craft — interaction studies
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stage rail — scroll-synced
────────────────────────────────────────────────────────────── */
function StageRail({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Process stages"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1"
    >
      {stages.map((s) => {
        const isActive = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#stage-${s.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2.5 py-1.5"
          >
            <span
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: isActive ? "var(--color-accent)" : "var(--color-border)",
                transform: isActive ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className={`text-[10px] font-mono uppercase tracking-wider transition-all ${
                isActive ? "text-foreground opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.num} {s.title}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
────────────────────────────────────────────────────────────── */
export default function ProcessPage() {
  const [paradigm, setParadigm] = useState<Paradigm>("hybrid");
  const [activeStage, setActiveStage] = useState("signal");
  const [showStickySwitcher, setShowStickySwitcher] = useState(false);

  /* URL state */
  useEffect(() => {
    const p = new URLSearchParams(globalThis.location.search).get("paradigm") as Paradigm | null;
    if (p && paradigmList.includes(p)) setParadigm(p);
  }, []);

  const changeParadigm = useCallback((p: Paradigm) => {
    setParadigm(p);
    const url = new URL(globalThis.location.href);
    url.searchParams.set("paradigm", p);
    globalThis.history.replaceState(null, "", url.toString());
  }, []);

  /* Scroll sync for rail + sticky switcher */
  useEffect(() => {
    const els = document.querySelectorAll("[data-stage]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-stage");
            if (id) {
              setActiveStage(id);
              setShowStickySwitcher(["paradigm", "flows", "ui", "ship"].includes(id));
            }
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stage = (id: string) => stages.find((s) => s.id === id)!;

  return (
    <div className="pt-24">
      <StageRail activeId={activeStage} />

      {/* Sticky paradigm switcher — appears from the Paradigm Gate down */}
      <AnimatePresence>
        {showStickySwitcher && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-16 lg:top-20 left-1/2 -translate-x-1/2 z-40 mt-2"
          >
            <div className="rounded-xl bg-background/85 border border-border shadow-2xl px-1.5 py-1" style={{ backdropFilter: "blur(16px)" }}>
              <ParadigmSwitcher value={paradigm} onChange={changeParadigm} size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <Section>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-mono text-sm uppercase tracking-widest mb-4"
          >
            The Process
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            From idea to shipped —<br />
            <span className="text-gradient">same research, four interface futures.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted leading-relaxed mb-6"
          >
            The complete method I run — PRD, research, psychology mapping, and the decision most
            teams never make deliberately: <strong className="text-foreground/90">should this product be
            agentic, hybrid, traditional, or have no screen at all?</strong> Demonstrated end-to-end on{" "}
            <strong className="text-foreground/90">Companion</strong>, a generative AI assistant for
            millions of knowledge workers&apos; daily work.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-muted"
          >
            Companion is a fictional teaching artifact — designed openly so every stage can show a real deliverable. 8 stages · every stage gated · psychology chips are clickable.
          </motion.p>
        </div>
      </Section>

      {/* Stages 00–03 — paradigm-agnostic */}
      <StageShell stage={stage("signal")}>
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">The signal, framed as an outcome</p>
          <p className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-3">
            &ldquo;Give knowledge workers back 45 minutes a day — verifiably.&rdquo;
          </p>
          <p className="text-sm text-muted leading-relaxed">
            Not &ldquo;add AI to productivity software.&rdquo; The framing names the user outcome, the measurement,
            and its own kill switch. Why now: model latency crossed the conversational threshold, tool APIs matured,
            and — per the research below — users are auditioning assistants task-by-task, which is a wedge.
          </p>
        </div>
      </StageShell>

      <StageShell stage={stage("prd")}>
        <PrdArtifact />
      </StageShell>

      <StageShell stage={stage("research")}>
        <ResearchArtifact />
      </StageShell>

      <StageShell stage={stage("psychology")}>
        <PsychologyArtifact />
      </StageShell>

      {/* Stage 04 — the fork */}
      <StageShell stage={stage("paradigm")}>
        <ParadigmGateArtifact paradigm={paradigm} onChange={changeParadigm} />
      </StageShell>

      {/* Stages 05–07 — re-render per paradigm */}
      <StageShell stage={stage("flows")}>
        <WireflowArtifact paradigm={paradigm} />
      </StageShell>

      <StageShell stage={stage("ui")}>
        <DemoArtifact paradigm={paradigm} />
      </StageShell>

      <StageShell stage={stage("ship")}>
        <ShipArtifact paradigm={paradigm} />
      </StageShell>
    </div>
  );
}
