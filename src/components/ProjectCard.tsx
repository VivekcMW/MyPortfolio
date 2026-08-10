"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import Link from "next/link";
import TiltCard from "./TiltCard";
import { tintText } from "@/lib/tint";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: ReactNode;
  href: string;
  index: number;
  accent?: string;
  domain?: string;
  domainColor?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
}

/* Wireframe-style UI mockup, keyed by domain so related case studies share a visual language */
function MockUI({ domain, icon }: { domain?: string; icon: ReactNode }) {
  const layoutMap: Record<string, ReactNode> = {
    // Design Systems: Visual builder with component blocks
    "Design Systems": (
      <div key="design-systems" className="w-full h-full p-4 flex flex-col gap-2 relative">
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
      </div>
    ),

    // Healthcare: Medical dashboard with vitals
    Healthcare: (
      <div key="healthcare" className="w-full h-full p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30" />
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
      </div>
    ),

    // GovTech: Dashboard with metrics grid + bar chart
    GovTech: (
      <div key="govtech" className="w-full h-full p-4 flex flex-col gap-2 relative">
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
      </div>
    ),

    // Entertainment: Content grid with video player
    Entertainment: (
      <div key="entertainment" className="w-full h-full p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded bg-accent/20" />
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
      </div>
    ),

    // AdTech: Agentic planner list + diff-preview panel
    AdTech: (
      <div key="adtech" className="w-full h-full p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30" />
          <div className="h-4 w-28 rounded bg-border/40" />
          <div className="ml-auto h-4 w-14 rounded-full bg-accent/10 border border-accent/20" />
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-border bg-surface-hover p-3 space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm border border-accent/40" />
                <div className="flex-1 h-2 rounded bg-border/40" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-surface-hover p-3 space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-accent/15" />
            <div className="h-2 w-1/2 rounded bg-border/30" />
            <div className="h-2 w-2/3 rounded bg-accent/20" />
            <div className="h-2 w-1/3 rounded bg-border/30" />
          </div>
        </div>
        <div className="h-7 rounded-lg bg-accent/10 border border-accent/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">{icon}</div>
      </div>
    ),

    // Construction: Schedule bars + kanban board
    Construction: (
      <div key="construction" className="w-full h-full p-4 flex flex-col gap-2 relative">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 rounded bg-border/40" />
          <div className="ml-auto flex gap-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-2 h-2 rounded-full bg-accent/30" />
            ))}
          </div>
        </div>
        <div className="flex-1 rounded-xl border border-border bg-surface-hover p-3 space-y-2">
          {[70, 45, 90, 30].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-2 rounded bg-border/40" />
              <div className="flex-1 h-3 rounded-full bg-border/20 overflow-hidden">
                <div className="h-full rounded-full bg-accent/25" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["To do", "Doing", "Done"].map((v) => (
            <div key={v} className="rounded-lg bg-surface-hover border border-border p-2">
              <div className="text-[8px] text-muted mb-1">{v}</div>
              <div className="h-4 rounded bg-accent/15" />
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">{icon}</div>
      </div>
    ),
  };
  return layoutMap[domain ?? ""] ?? layoutMap["Design Systems"];
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
  domain,
  domainColor,
  featured = false,
  metrics,
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
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <TiltCard>
        <div className="group block">
          <div
            className={`relative overflow-hidden rounded-2xl bg-surface border border-border transition-all duration-500 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10 ${
              featured ? "lg:flex lg:flex-row" : ""
            }`}
          >
            {/* Parallax Image Area */}
            <div
              className={`relative overflow-hidden bg-background ${
                featured ? "h-64 sm:h-80 lg:h-auto lg:w-2/5" : "h-55 sm:h-75 md:h-95"
              }`}
            >
              {/* Radial accent glow */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--color-${accent}) 3%, transparent)`,
                  // Ambient wash: all but invisible in light, keeps its weight in dark.
                  opacity: "calc(var(--color-overlay) * 0.5)",
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
              {/* Domain chip */}
              {domain && domainColor && (
                <span
                  className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 border text-[10px] font-mono uppercase tracking-wider"
                  style={{ borderColor: `${domainColor}40`, color: tintText(domainColor) }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domainColor }} />
                  {domain}
                </span>
              )}
              {/* Parallax mock UI */}
              <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
              >
                <div className="relative w-full h-full max-w-90 mx-auto rounded-xl bg-surface/80 border border-border/60 shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden">
                  <MockUI domain={domain} icon={image} />
                </div>
              </motion.div>
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-surface/80 opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className={`p-4 sm:p-6 lg:p-8 ${featured ? "lg:w-3/5 lg:flex lg:flex-col lg:justify-center" : ""}`}>
              {featured && (
                <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-1.5">
                  Flagship Case Study
                </p>
              )}
              <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">
                {category}
              </p>
              <h3 className={`font-bold mb-3 group-hover:text-accent transition-colors ${featured ? "text-2xl lg:text-4xl" : "text-2xl lg:text-3xl"}`}>
                {title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">{description}</p>
              {featured && metrics && metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border bg-background p-3">
                      <div className="text-lg lg:text-xl font-bold text-accent">{m.value}</div>
                      <div className="text-[10px] text-muted font-mono uppercase tracking-wide mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
