"use client";

import { motion } from "framer-motion";
import { Eye, Shield, Zap, Brain, Scale, Target } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Design Principles - 6 core principles derived from research
   Each principle has icon, title, description, example, rationale
────────────────────────────────────────────────────────────── */

interface DesignPrinciple {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
  example: string;
  rationale: string;
  color: string;
}

const companionPrinciples: DesignPrinciple[] = [
  {
    icon: Eye,
    title: "Visible Uncertainty",
    tagline: "Never hide what the system doesn't know",
    description: "Every AI output must show its confidence level. Uncertain claims are highlighted, not buried.",
    example: "Claims tagged with confidence scores; 'Low confidence' badges on speculative answers",
    rationale: "Research showed 8/8 participants struggled with fluency bias. Explicit uncertainty markers reduced over-reliance by 40%.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Verify-in-Place",
    tagline: "Make fact-checking effortless",
    description: "Users shouldn't leave the interface to verify. Citations, sources, and cross-checks inline.",
    example: "Click any claim to see sources; one-tap verify against knowledge base",
    rationale: "Average verification time: 4.2 minutes per output. Inline verification reduced this to 45 seconds.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Fast + Safe",
    tagline: "Speed never compromises trust",
    description: "Instant outputs with clear confidence. Users choose between fast-but-uncertain vs. slower-but-verified.",
    example: "'Quick draft' mode shows uncertainty; 'Verified' mode auto-checks facts before surfacing",
    rationale: "Users want both speed AND accuracy. Offering choice increased satisfaction from 6.2 → 8.4/10.",
    color: "yellow",
  },
  {
    icon: Brain,
    title: "Explainable Decisions",
    tagline: "Show the reasoning, not just the result",
    description: "Every suggestion includes why the AI chose that path. Users understand the logic.",
    example: "'I suggested X because Y' summaries; hover any output to see reasoning chain",
    rationale: "Explainability increased delegation willingness by 3x. Users trusted outputs they understood.",
    color: "purple",
  },
  {
    icon: Scale,
    title: "Human-AI Balance",
    tagline: "AI augments, never replaces judgment",
    description: "Interface always positions AI as a tool, not an authority. Final decisions stay human.",
    example: "Outputs labeled 'AI suggestion'; UI uses 'Consider' not 'Recommended'",
    rationale: "Language framing shifted perception from 'doing my job' to 'helping me think'.",
    color: "indigo",
  },
  {
    icon: Target,
    title: "Context-Aware Defaults",
    tagline: "Interface adapts to risk level",
    description: "High-stakes tasks default to verified mode. Low-stakes allows faster, less certain outputs.",
    example: "Drafting: fast mode. Compliance docs: verified mode. Legal: human-only suggested.",
    rationale: "Risk-adaptive defaults reduced errors in critical workflows by 85%.",
    color: "pink",
  },
];

export function DesignPrinciples({ principles = companionPrinciples }: { principles?: DesignPrinciple[] }) {
  const colorClasses: Record<string, { bg: string; border: string; icon: string; accent: string }> = {
    blue: { bg: "bg-blue-500/5", border: "border-blue-500/20", icon: "text-blue-600", accent: "text-blue-600" },
    green: { bg: "bg-green-500/5", border: "border-green-500/20", icon: "text-green-600", accent: "text-green-600" },
    yellow: { bg: "bg-yellow-500/5", border: "border-yellow-500/20", icon: "text-yellow-600", accent: "text-yellow-600" },
    purple: { bg: "bg-purple-500/5", border: "border-purple-500/20", icon: "text-purple-600", accent: "text-purple-600" },
    indigo: { bg: "bg-indigo-500/5", border: "border-indigo-500/20", icon: "text-indigo-600", accent: "text-indigo-600" },
    pink: { bg: "bg-pink-500/5", border: "border-pink-500/20", icon: "text-pink-600", accent: "text-pink-600" },
  };

  return (
    <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
            📐
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
              UX Research Deliverable
            </p>
            <h3 className="text-xl sm:text-2xl font-bold">Design Principles</h3>
            <p className="text-sm text-muted mt-1">
              6 core principles derived from research findings
            </p>
          </div>
        </div>
        <p className="text-xs text-muted leading-relaxed pl-15">
          Each principle directly addresses a pattern discovered in user research. These guide every design decision from wireframes through final UI.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {principles.map((principle, i) => {
          const Icon = principle.icon;
          const colors = colorClasses[principle.color] || colorClasses.blue;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring" }}
              className={`rounded-2xl ${colors.bg} border-2 ${colors.border} p-5 hover:scale-[1.02] transition-transform cursor-default group`}
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold text-sm mb-0.5 ${colors.accent}`}>{principle.title}</h4>
                  <p className="text-xs text-muted italic">{principle.tagline}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed mb-3">{principle.description}</p>

              {/* Example */}
              <div className="rounded-lg bg-background/50 border border-border p-2.5 mb-3">
                <p className="text-xs text-muted font-mono">
                  <span className="font-bold text-foreground/70">Example:</span> {principle.example}
                </p>
              </div>

              {/* Rationale */}
              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-bold text-foreground/70">Why:</span> {principle.rationale}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="rounded-xl bg-accent/5 border border-accent/20 p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-accent mb-1">6</p>
            <p className="text-xs text-muted uppercase tracking-wider">Principles</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent mb-1">24</p>
            <p className="text-xs text-muted uppercase tracking-wider">Research Insights</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent mb-1">100%</p>
            <p className="text-xs text-muted uppercase tracking-wider">Validated</p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-foreground/80">Method:</strong> Principles derived from affinity mapping exercise (168 research findings → 24 patterns → 6 principles). Each principle validated against research data and confirmed with 3 stakeholder review sessions. Directly traceable to user quotes and behavioral observations.
        </p>
      </div>
    </div>
  );
}
