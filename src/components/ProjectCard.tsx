"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";
import TiltCard from "./TiltCard";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: ReactNode;
  href: string;
  index: number;
  accent?: string;
}

/* Unique wireframe-style UI mockup per card index */
function MockUI({ index, icon }: { index: number; icon: ReactNode }) {
  const layouts = [
    // 0 — NoCode: Visual builder with component blocks
    <div key="nocode" className="w-full h-full p-4 flex flex-col gap-2 relative">
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30" />
        <div className="flex-1 h-8 rounded-lg bg-border/40" />
      </div>
      <div className="flex-1 grid grid-cols-3 gap-2">
        <div className="col-span-1 space-y-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-8 rounded-md bg-accent/10 border border-accent/20" />
          ))}
        </div>
        <div className="col-span-2 rounded-xl border-2 border-dashed border-accent/20 p-3 flex flex-col gap-2">
          <div className="h-10 rounded-lg bg-accent/8 border border-accent/15" />
          <div className="flex gap-2 flex-1">
            <div className="flex-1 rounded-lg bg-surface-hover border border-border" />
            <div className="flex-1 rounded-lg bg-surface-hover border border-border" />
          </div>
          <div className="h-8 rounded-lg bg-accent/12 border border-accent/20" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15">{icon}</div>
    </div>,

    // 1 — EHR: Medical dashboard with vitals
    <div key="ehr" className="w-full h-full p-4 flex flex-col gap-2 relative">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-accent-coral/20 border border-accent-coral/30" />
        <div className="h-4 w-24 rounded bg-border/40" />
        <div className="ml-auto h-4 w-16 rounded bg-accent/10" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["HR", "BP", "SpO2", "Temp"].map((v) => (
          <div key={v} className="p-2 rounded-lg bg-surface-hover border border-border text-center">
            <div className="text-[8px] text-muted mb-1">{v}</div>
            <div className="h-3 w-8 mx-auto rounded bg-accent/20" />
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl bg-surface-hover border border-border p-3">
        <svg viewBox="0 0 200 60" className="w-full h-full text-accent/30" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="0,30 20,30 25,10 30,50 35,20 40,40 45,30 60,30 65,15 70,45 75,25 80,35 85,30 120,30 125,8 130,52 135,18 140,42 145,30 200,30" />
        </svg>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 h-6 rounded bg-border/30" />
        <div className="flex-1 h-6 rounded bg-border/30" />
        <div className="w-16 h-6 rounded bg-accent/15" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">{icon}</div>
    </div>,

    // 2 — IoT: Dashboard with metrics grid + bar chart
    <div key="iot" className="w-full h-full p-4 flex flex-col gap-2 relative">
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-border/40" />
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-2 h-2 rounded-full bg-accent/30" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="p-3 rounded-lg bg-surface-hover border border-border">
            <div className="h-2 w-8 rounded bg-accent/20 mb-2" />
            <div className="h-6 w-full rounded bg-accent/10" />
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface-hover border border-border p-3 flex items-end gap-1">
          {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-accent/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="rounded-xl bg-surface-hover border border-border p-3 space-y-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent/30" />
              <div className="flex-1 h-2 rounded bg-border/40" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">{icon}</div>
    </div>,

    // 3 — OTT: Content grid with video player
    <div key="ott" className="w-full h-full p-4 flex flex-col gap-2 relative">
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 rounded bg-accent-coral/20" />
        <div className="flex-1" />
        <div className="h-4 w-20 rounded bg-border/40" />
      </div>
      <div className="flex-1 rounded-xl bg-surface-hover border border-border p-3 flex items-center justify-center relative">
        <div className="w-10 h-10 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-10 border-l-accent/40 ml-1" />
        </div>
        <div className="absolute bottom-2 left-3 right-3 h-1 rounded bg-border/30">
          <div className="h-full w-1/3 rounded bg-accent/30" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="aspect-3/4 rounded-lg bg-surface-hover border border-border" />
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">{icon}</div>
    </div>,
  ];
  return layouts[index % layouts.length];
}

export default function ProjectCard({
  title,
  category,
  description,
  tags,
  image,
  href,
  index,
  accent = "accent",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <TiltCard>
        <div className="group block">
          <div className="relative overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-[0_0_60px_rgba(37,99,255,0.08)]">
            {/* Parallax Image Area */}
            <div className="relative h-55 sm:h-75 md:h-95 overflow-hidden bg-background">
              {/* Radial accent glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 80%, var(--color-${accent}) 0%, transparent 70%)`,
                  opacity: 0.08,
                }}
              />
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Parallax mock UI */}
              <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
              >
                <div className="relative w-full h-full max-w-90 mx-auto rounded-xl bg-surface/80 border border-border/60 shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden">
                  <MockUI index={index} icon={image} />
                </div>
              </motion.div>
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">
                {category}
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-accent transition-colors">
                {title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-background border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* CTA */}
              <Link
                href={href}
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium hover:bg-accent/20 transition-all group/btn"
              >
                View Case Study
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover/btn:translate-x-1">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
