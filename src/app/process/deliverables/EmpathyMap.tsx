"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Empathy Map - Classic 4-quadrant UX research deliverable
   Shows Says, Thinks, Feels, Does for a persona
────────────────────────────────────────────────────────────── */

interface EmpathyMapData {
  persona: {
    name: string;
    role: string;
    context: string;
  };
  says: string[];
  thinks: string[];
  feels: string[];
  does: string[];
  pains: string[];
  gains: string[];
}

const alexEmpathyMap: EmpathyMapData = {
  persona: {
    name: "Alex",
    role: "Product Manager",
    context: "Uses AI tools 20+ times/day for research, writing, planning",
  },
  says: [
    '"I need to verify this before using it"',
    '"How do I know if this is accurate?"',
    '"I can\'t tell if I should trust this output"',
    '"This sounds confident but is it correct?"',
  ],
  thinks: [
    "Am I over-relying on AI?",
    "What if this answer is wrong and I don't catch it?",
    "How much time am I actually saving vs. spending on verification?",
    "I wish I could see the confidence level per claim",
  ],
  feels: [
    "Anxious about trusting AI-generated content",
    "Frustrated by copy-paste-verify workflow",
    "Relieved when output includes sources",
    "Overwhelmed by fluency bias (sounds right ≠ is right)",
  ],
  does: [
    "Copy-pastes AI output into fact-checking tools",
    "Manually Googles claims to verify",
    "Rewrites sections to add hedging language",
    "Screenshots outputs to track what was AI vs. human",
  ],
  pains: [
    "No way to see confidence per claim",
    "Can't delegate without re-verifying everything",
    "Fluent output masks uncertainty",
  ],
  gains: [
    "Faster first drafts",
    "Better research breadth",
    "More time for strategic thinking",
  ],
};

export function EmpathyMap({ data = alexEmpathyMap }: { data?: EmpathyMapData }) {
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  return (
    <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8">
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-2xl shrink-0">
            🧠
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
              UX Research Deliverable
            </p>
            <h3 className="text-xl sm:text-2xl font-bold">Empathy Map</h3>
            <p className="text-sm text-muted mt-1">
              <span className="font-semibold text-foreground">{data.persona.name}</span> —{" "}
              {data.persona.role}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted leading-relaxed pl-15">
          {data.persona.context}
        </p>
      </div>

      {/* Desktop: 2x2 Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 mb-6">
        {/* Says */}
        <motion.div
          onMouseEnter={() => setActiveQuadrant("says")}
          onMouseLeave={() => setActiveQuadrant(null)}
          className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
            activeQuadrant === "says"
              ? "border-blue-500 bg-blue-500/5 scale-[1.02]"
              : "border-border bg-background/50"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">💬</span>
            <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600">Says</h4>
          </div>
          <ul className="space-y-2">
            {data.says.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm text-muted leading-relaxed pl-3 border-l-2 border-blue-500/30"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Thinks */}
        <motion.div
          onMouseEnter={() => setActiveQuadrant("thinks")}
          onMouseLeave={() => setActiveQuadrant(null)}
          className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
            activeQuadrant === "thinks"
              ? "border-purple-500 bg-purple-500/5 scale-[1.02]"
              : "border-border bg-background/50"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤔</span>
            <h4 className="font-bold text-sm uppercase tracking-wider text-purple-600">Thinks</h4>
          </div>
          <ul className="space-y-2">
            {data.thinks.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm text-muted leading-relaxed italic pl-3 border-l-2 border-purple-500/30"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Does */}
        <motion.div
          onMouseEnter={() => setActiveQuadrant("does")}
          onMouseLeave={() => setActiveQuadrant(null)}
          className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
            activeQuadrant === "does"
              ? "border-green-500 bg-green-500/5 scale-[1.02]"
              : "border-border bg-background/50"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚡</span>
            <h4 className="font-bold text-sm uppercase tracking-wider text-green-600">Does</h4>
          </div>
          <ul className="space-y-2">
            {data.does.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm text-muted leading-relaxed pl-3 border-l-2 border-green-500/30"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Feels */}
        <motion.div
          onMouseEnter={() => setActiveQuadrant("feels")}
          onMouseLeave={() => setActiveQuadrant(null)}
          className={`rounded-2xl p-5 border-2 transition-all duration-200 ${
            activeQuadrant === "feels"
              ? "border-pink-500 bg-pink-500/5 scale-[1.02]"
              : "border-border bg-background/50"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">❤️</span>
            <h4 className="font-bold text-sm uppercase tracking-wider text-pink-600">Feels</h4>
          </div>
          <ul className="space-y-2">
            {data.feels.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm text-muted leading-relaxed pl-3 border-l-2 border-pink-500/30"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden space-y-4 mb-6">
        {["says", "thinks", "does", "feels"].map((quadrant) => {
          const config = {
            says: { emoji: "💬", color: "blue", items: data.says },
            thinks: { emoji: "🤔", color: "purple", items: data.thinks },
            does: { emoji: "⚡", color: "green", items: data.does },
            feels: { emoji: "❤️", color: "pink", items: data.feels },
          }[quadrant]!;

          return (
            <div
              key={quadrant}
              className={`rounded-2xl p-4 border-2 border-${config.color}-500/30 bg-${config.color}-500/5`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{config.emoji}</span>
                <h4 className={`font-bold text-xs uppercase tracking-wider text-${config.color}-600`}>
                  {quadrant}
                </h4>
              </div>
              <ul className="space-y-2">
                {config.items.map((item, i) => (
                  <li
                    key={i}
                    className={`text-sm text-muted leading-relaxed pl-3 border-l-2 border-${config.color}-500/30`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Pains & Gains */}
      <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-red-600 mb-2 flex items-center gap-2">
            <span>⚠️</span> Pains
          </h4>
          <ul className="space-y-1.5">
            {data.pains.map((pain, i) => (
              <li key={i} className="text-sm text-muted">
                • {pain}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-2">
            <span>✨</span> Gains
          </h4>
          <ul className="space-y-1.5">
            {data.gains.map((gain, i) => (
              <li key={i} className="text-sm text-muted">
                • {gain}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-foreground/80">Method:</strong> Derived from 8 contextual inquiry sessions (90 min each) with product managers in tech companies. Patterns emerged after 5th session; 3 additional sessions confirmed saturation. Each quadrant synthesized from verbatims and behavioral observations.
        </p>
      </div>
    </div>
  );
}
