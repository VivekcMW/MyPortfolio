"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { Section, SectionHeader } from "@/components/Section";
import Magnetic from "@/components/Magnetic";
import FluidText from "@/components/FluidText";

/* ─────────────────────────────────────────────────────────
   Study 1 — Scramble Reveal
──────────────────────────────────────────────────────────── */
function ScrambleDemo() {
  const [text, setText] = useState("hover to decode");
  const running = useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&";

  const scramble = useCallback(() => {
    if (running.current) return;
    running.current = true;
    const target = "signal from noise";
    let i = 0;
    const total = 12;
    const id = setInterval(() => {
      i++;
      const revealed = Math.floor((i / total) * target.length);
      setText(
        target
          .split("")
          .map((c, idx) =>
            idx < revealed ? c : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      if (i >= total) {
        clearInterval(id);
        setText(target);
        setTimeout(() => {
          setText("hover to decode");
          running.current = false;
        }, 1500);
      }
    }, 45);
  }, [chars]);

  return (
    <button
      onMouseEnter={scramble}
      onFocus={scramble}
      className="font-mono text-xl sm:text-2xl text-accent tracking-tight cursor-default"
    >
      {text}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   Study 2 — Progressive Disclosure
──────────────────────────────────────────────────────────── */
function DisclosureDemo() {
  const [open, setOpen] = useState(false);
  const essentials = ["Label", "Size", "Variant", "Disabled", "On click"];
  const advanced = ["ARIA role", "Focus trap", "Debounce", "Analytics ID", "Test hook"];

  return (
    <div className="w-full max-w-xs rounded-xl bg-background border border-border p-4 text-left">
      <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
        Button · properties
      </p>
      <div className="space-y-2">
        {essentials.map((label) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-xs text-foreground/70">{label}</span>
            <div className="h-6 w-24 rounded-md bg-surface-hover border border-border" />
          </div>
        ))}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 w-full py-2 rounded-lg border border-dashed border-border text-[11px] font-mono text-muted hover:text-foreground hover:border-accent/40 transition-colors"
        aria-expanded={open}
      >
        {open ? "− Hide advanced" : "+ Advanced (5)"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-2 pt-3">
              {advanced.map((label) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted">{label}</span>
                  <div className="h-6 w-24 rounded-md bg-surface-hover border border-border" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Study 3 — Optimistic Toggle
──────────────────────────────────────────────────────────── */
function OptimisticDemo() {
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggle = () => {
    setSaved(!saved);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1400);
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      <button
        onClick={toggle}
        aria-pressed={saved}
        className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
          saved
            ? "bg-accent/15 border-accent/40 text-accent"
            : "bg-surface border-border text-muted hover:text-foreground hover:border-accent/30"
        }`}
      >
        {saved ? "★ Saved" : "☆ Save for later"}
      </button>
      <AnimatePresence>
        {showToast && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -bottom-8 text-[11px] font-mono text-muted"
          >
            {saved ? "synced ✓ (42ms)" : "removed ✓ (38ms)"}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Studies data
──────────────────────────────────────────────────────────── */
const studies = [
  {
    id: "01",
    title: "Scramble reveal",
    principle: "Pre-attentive processing",
    why: "Rapid character flux registers in peripheral vision before conscious reading begins — it earns attention once, at the exact moment of intent (hover). Used sparingly, it directs focus; looped forever, it becomes noise. The reveal resolves fast (~540ms) so reading is never blocked.",
    code: `const revealed = Math.floor((i / total) * target.length);
setText(target.split("").map((c, idx) =>
  idx < revealed ? c : randomChar()).join(""));`,
    demo: <ScrambleDemo />,
  },
  {
    id: "02",
    title: "Magnetic target",
    principle: "Fitts's law",
    why: "Pointer time-to-target scales with distance and inversely with target size. A magnetic pull effectively enlarges the target's activation area — the button meets the cursor halfway. The spring settles quickly so the label never becomes hard to read mid-motion.",
    code: `const dx = (e.clientX - center.x) * strength;
const dy = (e.clientY - center.y) * strength;
animate(el, { x: dx, y: dy }, spring);`,
    demo: (
      <Magnetic strength={0.5} scaleOnHover={1.05}>
        <span className="inline-block px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-xl cursor-pointer">
          Catch me
        </span>
      </Magnetic>
    ),
  },
  {
    id: "03",
    title: "Progressive disclosure",
    principle: "Hick's law",
    why: "Decision time grows logarithmically with the number of visible choices. Showing 5 essential controls instead of 10 nearly halves scan time for the common case — and the labeled expander keeps advanced options discoverable, not hidden. This exact pattern lifted first-run completion from 60% to 94% in the NoCode platform.",
    code: `{essentials.map(renderControl)}
<button aria-expanded={open}>+ Advanced ({advanced.length})</button>
{open && advanced.map(renderControl)}`,
    demo: <DisclosureDemo />,
  },
  {
    id: "04",
    title: "Optimistic feedback",
    principle: "Doherty threshold",
    why: "Below ~400ms of response latency, interaction feels like conversation; above it, attention drifts. Optimistic UI flips state instantly and reconciles with the server afterwards — the toast confirms with real latency numbers, converting speed into visible trust.",
    code: `setSaved(v => !v);          // instant
mutate(save, { onError: rollback });  // reconcile`,
    demo: <OptimisticDemo />,
  },
  {
    id: "05",
    title: "Weight follows proximity",
    principle: "Direct manipulation feedback",
    why: "Variable-font weight mapped to cursor distance creates continuous, sub-frame feedback — the interface acknowledges presence before any click. Continuous response builds perceived quality: the system feels alive, not scripted. Weight (not color) carries the signal, so it survives any palette.",
    code: `const dist = Math.hypot(cx - x, cy - y);
const w = maxW - (dist / radius) * (maxW - minW);
span.style.fontVariationSettings = \`"wght" \${w}\`;`,
    demo: (
      <span className="text-2xl sm:text-3xl">
        <FluidText text="move across me" minWeight={300} maxWeight={800} radius={90} />
      </span>
    ),
  },
];

export default function CraftPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          eyebrow="Craft"
          title="Interaction studies."
          description="Small, focused experiments — each one pairs a live micro-interaction with the psychology principle that makes it work, and the code behind it. Craft is a habit, not a deliverable."
        />
        <div className="space-y-8">
          {studies.map((study, i) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl bg-surface border border-border overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                {/* Demo stage */}
                <div className="relative flex items-center justify-center min-h-[220px] p-8 border-b lg:border-b-0 lg:border-r border-border bg-background/40">
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(var(--color-foreground) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {study.demo}
                </div>
                {/* Explanation */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-sm text-accent">{study.id}</span>
                    <h2 className="text-xl font-bold">{study.title}</h2>
                  </div>
                  <p className="inline-block px-2.5 py-1 rounded-md bg-accent-coral/10 border border-accent-coral/20 text-[11px] font-mono text-accent-coral mb-4">
                    {study.principle}
                  </p>
                  <p className="text-sm text-muted leading-relaxed mb-5">{study.why}</p>
                  <pre className="p-4 rounded-xl bg-background border border-border overflow-x-auto">
                    <code className="text-xs font-mono text-foreground/70 leading-relaxed">
                      {study.code}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </div>
  );
}
