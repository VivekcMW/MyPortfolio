"use client";

import { motion } from "framer-motion";
import { Frown, Meh, Smile, TrendingDown, TrendingUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Journey Map - Shows user experience across 5 stages
   Each stage has actions, thoughts, feelings, pain points, opportunities
────────────────────────────────────────────────────────────── */

interface JourneyStage {
  phase: string;
  emotionScore: number; // -2 to +2
  actions: string[];
  thoughts: string[];
  painPoints: string[];
  opportunities: string[];
}

const alexJourney: JourneyStage[] = [
  {
    phase: "Getting Started",
    emotionScore: 1,
    actions: ["Opens AI assistant", "Asks initial question", "Reads response"],
    thoughts: ["This will save me time", "Feels like magic"],
    painPoints: ["No indication of confidence", "Output looks authoritative"],
    opportunities: ["Show confidence score", "Highlight uncertain claims"],
  },
  {
    phase: "First Use",
    emotionScore: 0,
    actions: ["Copy-pastes into document", "Starts to incorporate output"],
    thoughts: ["Is this accurate?", "Should I verify this?"],
    painPoints: ["No way to check sources", "Manual fact-checking needed"],
    opportunities: ["Inline citations", "Click-to-verify links"],
  },
  {
    phase: "Verification",
    emotionScore: -1,
    actions: ["Googles claims manually", "Cross-checks facts", "Finds error"],
    thoughts: ["How much of this is wrong?", "Did I catch everything?"],
    painPoints: ["Time-consuming", "No systematic way to verify", "Anxiety about missed errors"],
    opportunities: ["Auto-verify factual claims", "Flag uncertain statements"],
  },
  {
    phase: "Correction",
    emotionScore: -2,
    actions: ["Rewrites sections", "Adds hedging language", "Documents what was changed"],
    thoughts: ["Am I even saving time?", "This defeats the purpose"],
    painPoints: ["Lost trust in tool", "Double the work", "Can't delegate"],
    opportunities: ["Version tracking", "Human-AI collaboration UI", "Show AI uncertainty"],
  },
  {
    phase: "Future Attempts",
    emotionScore: -1,
    actions: ["Uses AI less", "Manually verifies everything", "Considers alternatives"],
    thoughts: ["I need better tools", "There must be a better way"],
    painPoints: ["Under-utilizing AI", "Stuck in verification loop"],
    opportunities: ["Transparent confidence", "Explainable outputs", "Trust signals"],
  },
];

export function JourneyMap({ data = alexJourney }: { data?: JourneyStage[] }) {
  const getEmotionIcon = (score: number) => {
    if (score >= 1) return <Smile className="w-5 h-5 text-green-600" />;
    if (score <= -1) return <Frown className="w-5 h-5 text-red-600" />;
    return <Meh className="w-5 h-5 text-yellow-600" />;
  };

  const getEmotionColor = (score: number) => {
    if (score >= 1) return "bg-green-500";
    if (score <= -1) return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8 overflow-x-auto">
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-2xl shrink-0">
            🗺️
          </div>
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
              UX Research Deliverable
            </p>
            <h3 className="text-xl sm:text-2xl font-bold">User Journey Map</h3>
            <p className="text-sm text-muted mt-1">
              Alex's experience using AI tools without transparency
            </p>
          </div>
        </div>
      </div>

      {/* Emotion Line Chart */}
      <div className="mb-8 pb-8 border-b border-border">
        <div className="flex items-end justify-between gap-2 h-32">
          {data.map((stage, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="relative flex flex-col items-center"
              >
                <span className="text-xs text-muted mb-1">{stage.emotionScore > 0 ? "+" : ""}{stage.emotionScore}</span>
                {getEmotionIcon(stage.emotionScore)}
                <div
                  className={`w-2 rounded-t-full ${getEmotionColor(stage.emotionScore)}`}
                  style={{
                    height: `${Math.abs(stage.emotionScore) * 20 + 20}px`,
                    opacity: 0.6,
                  }}
                />
              </motion.div>
              <p className="text-xs font-mono text-muted mt-2 text-center">{i + 1}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-green-600" />
            <span>Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Meh className="w-4 h-4 text-yellow-600" />
            <span>Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Frown className="w-4 h-4 text-red-600" />
            <span>Negative</span>
          </div>
        </div>
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-4">
          {data.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="space-y-4"
            >
              {/* Phase */}
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-primary">{i + 1}</span>
                  <h4 className="font-bold text-sm">{stage.phase}</h4>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-lg bg-background border border-border p-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-1">
                  <span>⚡</span> Actions
                </h5>
                <ul className="space-y-1">
                  {stage.actions.map((action, j) => (
                    <li key={j} className="text-xs text-muted">• {action}</li>
                  ))}
                </ul>
              </div>

              {/* Thoughts */}
              <div className="rounded-lg bg-background border border-border p-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 flex items-center gap-1">
                  <span>💭</span> Thoughts
                </h5>
                <ul className="space-y-1">
                  {stage.thoughts.map((thought, j) => (
                    <li key={j} className="text-xs text-muted italic">"{thought}"</li>
                  ))}
                </ul>
              </div>

              {/* Pain Points */}
              <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-2 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> Pains
                </h5>
                <ul className="space-y-1">
                  {stage.painPoints.map((pain, j) => (
                    <li key={j} className="text-xs text-muted">• {pain}</li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Opportunities
                </h5>
                <ul className="space-y-1">
                  {stage.opportunities.map((opp, j) => (
                    <li key={j} className="text-xs text-muted">• {opp}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="lg:hidden space-y-6">
        {data.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-background border-2 border-border p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {i + 1}
              </span>
              <h4 className="font-bold text-base">{stage.phase}</h4>
              {getEmotionIcon(stage.emotionScore)}
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">⚡ Actions</h5>
                <ul className="space-y-0.5">
                  {stage.actions.map((action, j) => (
                    <li key={j} className="text-xs text-muted">• {action}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1.5">💭 Thoughts</h5>
                <ul className="space-y-0.5">
                  {stage.thoughts.map((thought, j) => (
                    <li key={j} className="text-xs text-muted italic">"{thought}"</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Pains
                  </h5>
                  <ul className="space-y-0.5">
                    {stage.painPoints.map((pain, j) => (
                      <li key={j} className="text-xs text-muted">• {pain}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Opps
                  </h5>
                  <ul className="space-y-0.5">
                    {stage.opportunities.map((opp, j) => (
                      <li key={j} className="text-xs text-muted">• {opp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-foreground/80">Method:</strong> Journey synthesized from 8 contextual inquiry sessions, 24 diary study entries (7-day period), and 4 follow-up interviews. Emotion scores validated against diary self-reports (5-point Likert scale). Opportunity areas confirmed with 3 stakeholders.
        </p>
      </div>
    </div>
  );
}
