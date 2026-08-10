"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Clock, Users, BarChart, Shield, Target, ChevronDown, ChevronUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Process Summary Card
   At-a-glance metrics for recruiters
────────────────────────────────────────────────────────────── */

interface Metric {
  icon: typeof Clock;
  label: string;
  value: string;
  detail: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: Clock,
    label: "Typical Duration",
    value: "6-8 weeks",
    detail: "From problem discovery to shipped feature with validation",
    color: "#FFB84D",
  },
  {
    icon: Users,
    label: "Research Scale",
    value: "24-32 participants",
    detail: "Per project: contextual inquiry, usability testing, stakeholder interviews",
    color: "#D946EF",
  },
  {
    icon: BarChart,
    label: "Methods Mix",
    value: "Qual + Quant",
    detail: "Qualitative (observation, interviews) + Quantitative (analytics, A/B tests)",
    color: "#14B8A6",
  },
  {
    icon: Shield,
    label: "Accessibility",
    value: "WCAG AAA",
    detail: "Contrast, keyboard nav, screen readers — compliance by default, not retrofit",
    color: "#1D65AF",
  },
  {
    icon: Target,
    label: "Success Rate",
    value: "100%",
    detail: "All products shipped hit success metrics (kill criteria prevent bad launches)",
    color: "#D4663E",
  },
];

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const increment = end / (duration / 16); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function ProcessSummaryCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-accent/5 border-2 border-accent/20 p-6 sm:p-8 lg:sticky lg:top-24"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
            Process at a Glance
          </p>
          <h3 className="text-xl sm:text-2xl font-bold">By the Numbers</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="lg:hidden w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors"
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={`space-y-4 ${expanded ? "block" : "hidden lg:block"}`}>
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${metric.color}15`,
                  border: `1px solid ${metric.color}30`,
                }}
              >
                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-xs text-muted font-medium">{metric.label}</p>
                </div>
                <p className="text-lg sm:text-xl font-bold mb-1" style={{ color: metric.color }}>
                  {metric.label === "Research Scale" ? (
                    <>
                      <AnimatedCounter target={24} />-<AnimatedCounter target={32} /> participants
                    </>
                  ) : metric.label === "Success Rate" ? (
                    <>
                      <AnimatedCounter target={100} />%
                    </>
                  ) : (
                    metric.value
                  )}
                </p>
                <p className="text-xs text-muted leading-relaxed">{metric.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className={`mt-6 pt-6 border-t border-accent/20 ${expanded ? "block" : "hidden lg:block"}`}
      >
        <p className="text-xs text-muted leading-relaxed mb-3">
          <strong className="text-foreground/80">Methodology:</strong> Every stage has entry criteria (research findings, stakeholder sign-off) and exit gates (validation metrics, quality checks). No stage is skipped; no shortcut survives contact with real users.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-mono uppercase tracking-wider">
            User-Centered
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-mono uppercase tracking-wider">
            Evidence-Based
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-mono uppercase tracking-wider">
            Iterative
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-accent/10 text-accent font-mono uppercase tracking-wider">
            Gated
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
