"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Info } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Framework Alignment Diagram
   Shows how the 8-stage process maps to industry frameworks
────────────────────────────────────────────────────────────── */

interface FrameworkStage {
  id: string;
  num: string;
  title: string;
  doubleD: "discover" | "define" | "develop" | "deliver";
  designT: "empathize" | "define" | "ideate" | "prototype" | "test";
  leanUX: "think" | "make" | "check";
  color: string;
  why: string;
}

const alignmentData: FrameworkStage[] = [
  {
    id: "signal",
    num: "00",
    title: "Signal",
    doubleD: "discover",
    designT: "empathize",
    leanUX: "think",
    color: "#FFB84D",
    why: "Observing user pain in the wild = empathy + discovery",
  },
  {
    id: "prd",
    num: "01",
    title: "PRD",
    doubleD: "define",
    designT: "define",
    leanUX: "think",
    color: "#FF8A4D",
    why: "Framing the problem statement with measurable hypotheses",
  },
  {
    id: "research",
    num: "02",
    title: "Research",
    doubleD: "discover",
    designT: "empathize",
    leanUX: "think",
    color: "#D946EF",
    why: "Contextual inquiry = deep empathy through observation",
  },
  {
    id: "psychology",
    num: "03",
    title: "Psychology",
    doubleD: "define",
    designT: "define",
    leanUX: "think",
    color: "#A855F7",
    why: "Synthesis: findings → principles → design constraints",
  },
  {
    id: "paradigm",
    num: "04",
    title: "Paradigm",
    doubleD: "develop",
    designT: "ideate",
    leanUX: "think",
    color: "#14B8A6",
    why: "Concept selection: choosing the right interaction paradigm",
  },
  {
    id: "flows",
    num: "05",
    title: "Flows",
    doubleD: "develop",
    designT: "prototype",
    leanUX: "make",
    color: "#10B981",
    why: "Low-fidelity prototyping: wireflows before pixels",
  },
  {
    id: "ui",
    num: "06",
    title: "UI",
    doubleD: "develop",
    designT: "prototype",
    leanUX: "make",
    color: "#1D65AF",
    why: "High-fidelity prototyping: design system + components",
  },
  {
    id: "ship",
    num: "07",
    title: "Ship",
    doubleD: "deliver",
    designT: "test",
    leanUX: "check",
    color: "#D4663E",
    why: "Validation testing + iterative delivery with metrics",
  },
];

const frameworkColors = {
  doubleD: {
    discover: "#D946EF",
    define: "#A855F7",
    develop: "#14B8A6",
    deliver: "#D4663E",
  },
  designT: {
    empathize: "#D946EF",
    define: "#A855F7",
    ideate: "#14B8A6",
    prototype: "#10B981",
    test: "#D4663E",
  },
  leanUX: {
    think: "#A855F7",
    make: "#10B981",
    check: "#D4663E",
  },
};

export function FrameworkAlignment() {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8 lg:p-10 overflow-hidden">
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Industry Framework Alignment</h3>
            <p className="text-muted text-sm leading-relaxed">
              My 8-stage process maps directly to frameworks recruiters recognize: Double Diamond, Design Thinking, and Lean UX. This isn&apos;t a rebrand — it&apos;s the same rigorous methodology, shown in familiar language.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: 4-column grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-6">
          {/* Column 1: Your Process */}
          <div>
            <div className="mb-4 pb-3 border-b border-border">
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Your Process
              </p>
              <p className="text-[11px] text-muted mt-1">8 Stages</p>
            </div>
            <div className="space-y-3">
              {alignmentData.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className="relative group cursor-pointer"
                >
                  <div
                    className={`rounded-xl p-3 border-2 transition-all duration-200 ${
                      hoveredStage === stage.id
                        ? "border-accent shadow-lg scale-105 z-10"
                        : "border-border hover:border-muted"
                    }`}
                    style={{
                      backgroundColor: hoveredStage === stage.id ? `${stage.color}10` : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${stage.color}20`,
                          color: stage.color,
                        }}
                      >
                        {stage.num}
                      </span>
                      <span className="text-sm font-semibold">{stage.title}</span>
                    </div>
                  </div>
                  {/* Tooltip */}
                  {hoveredStage === stage.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full mt-2 z-20 w-64 rounded-lg bg-background border-2 border-accent p-3 shadow-2xl"
                    >
                      <p className="text-xs text-muted leading-relaxed">{stage.why}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Double Diamond */}
          <div>
            <div className="mb-4 pb-3 border-b border-border">
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Double Diamond
              </p>
              <p className="text-[11px] text-muted mt-1">British Design Council</p>
            </div>
            <div className="space-y-3">
              {alignmentData.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className={`rounded-xl p-3 border transition-all duration-200 ${
                    hoveredStage === stage.id ? "border-accent scale-105" : "border-border"
                  }`}
                  style={{
                    backgroundColor:
                      hoveredStage === stage.id
                        ? `${frameworkColors.doubleD[stage.doubleD]}10`
                        : "transparent",
                  }}
                >
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{
                      color:
                        hoveredStage === stage.id
                          ? frameworkColors.doubleD[stage.doubleD]
                          : "var(--color-muted)",
                    }}
                  >
                    {stage.doubleD === "discover" && "◇ Discover"}
                    {stage.doubleD === "define" && "◆ Define"}
                    {stage.doubleD === "develop" && "◇ Develop"}
                    {stage.doubleD === "deliver" && "◆ Deliver"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 3: Design Thinking */}
          <div>
            <div className="mb-4 pb-3 border-border">
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Design Thinking
              </p>
              <p className="text-[11px] text-muted mt-1">IDEO / d.school</p>
            </div>
            <div className="space-y-3">
              {alignmentData.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.15 }}
                  className={`rounded-xl p-3 border transition-all duration-200 ${
                    hoveredStage === stage.id ? "border-accent scale-105" : "border-border"
                  }`}
                  style={{
                    backgroundColor:
                      hoveredStage === stage.id
                        ? `${frameworkColors.designT[stage.designT]}10`
                        : "transparent",
                  }}
                >
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{
                      color:
                        hoveredStage === stage.id
                          ? frameworkColors.designT[stage.designT]
                          : "var(--color-muted)",
                    }}
                  >
                    {stage.designT === "empathize" && "❶ Empathize"}
                    {stage.designT === "define" && "❷ Define"}
                    {stage.designT === "ideate" && "❸ Ideate"}
                    {stage.designT === "prototype" && "❹ Prototype"}
                    {stage.designT === "test" && "❺ Test"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 4: Lean UX */}
          <div>
            <div className="mb-4 pb-3 border-b border-border">
              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Lean UX
              </p>
              <p className="text-[11px] text-muted mt-1">Jeff Gothelf</p>
            </div>
            <div className="space-y-3">
              {alignmentData.map((stage, i) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className={`rounded-xl p-3 border transition-all duration-200 ${
                    hoveredStage === stage.id ? "border-accent scale-105" : "border-border"
                  }`}
                  style={{
                    backgroundColor:
                      hoveredStage === stage.id
                        ? `${frameworkColors.leanUX[stage.leanUX]}10`
                        : "transparent",
                  }}
                >
                  <span
                    className="text-xs font-semibold capitalize"
                    style={{
                      color:
                        hoveredStage === stage.id
                          ? frameworkColors.leanUX[stage.leanUX]
                          : "var(--color-muted)",
                    }}
                  >
                    {stage.leanUX === "think" && "🧠 Think"}
                    {stage.leanUX === "make" && "🛠️ Make"}
                    {stage.leanUX === "check" && "✓ Check"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Stacked view */}
      <div className="lg:hidden space-y-4">
        {alignmentData.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border p-4"
            style={{ backgroundColor: `${stage.color}05` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-mono font-bold px-2 py-1 rounded"
                style={{
                  backgroundColor: `${stage.color}20`,
                  color: stage.color,
                }}
              >
                {stage.num}
              </span>
              <span className="font-semibold">{stage.title}</span>
            </div>
            <p className="text-xs text-muted mb-3 leading-relaxed">{stage.why}</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-background/50 p-2 border border-border">
                <p className="text-[10px] text-muted mb-1">Double Diamond</p>
                <p
                  className="text-xs font-semibold capitalize"
                  style={{ color: frameworkColors.doubleD[stage.doubleD] }}
                >
                  {stage.doubleD}
                </p>
              </div>
              <div className="rounded-lg bg-background/50 p-2 border border-border">
                <p className="text-[10px] text-muted mb-1">Design Thinking</p>
                <p
                  className="text-xs font-semibold capitalize"
                  style={{ color: frameworkColors.designT[stage.designT] }}
                >
                  {stage.designT}
                </p>
              </div>
              <div className="rounded-lg bg-background/50 p-2 border border-border">
                <p className="text-[10px] text-muted mb-1">Lean UX</p>
                <p
                  className="text-xs font-semibold capitalize"
                  style={{ color: frameworkColors.leanUX[stage.leanUX] }}
                >
                  {stage.leanUX}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-foreground/80">Why this matters:</strong> When recruiters see your process, they need instant recognition. Showing how your stages map to industry frameworks proves you&apos;re not inventing wheels — you&apos;re applying proven methodologies with discipline and depth.
        </p>
      </div>
    </div>
  );
}
