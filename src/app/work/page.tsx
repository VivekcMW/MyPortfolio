"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

/*
 * Case study index. Slugs and metadata are the single source of truth here;
 * the detailed data lives under /work/[slug]/page.tsx. If a slug ships there,
 * add it to `caseStudies` below so it surfaces on this index.
 */

const caseStudies: Array<{
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  timeline: string;
  role: string;
  status?: "in-flight" | "shipped";
  image: React.ReactNode;
}> = [
  {
    slug: "mw-activate",
    title: "Agentic Layer for a pDOOH DSP",
    category: "AI / AdTech (NDA)",
    description:
      "Designed the agentic UI for a programmatic Out-of-Home DSP — planner-first hybrid, diff-preview commits, evidence panel, guardrails matrix. In flight.",
    tags: ["Agentic UI", "AdTech", "AI Product Design", "React"],
    timeline: "2025 — present",
    role: "Design Lead",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
  {
    slug: "mw-cinema",
    title: "MW Cinema — Cinema as a Programmatic Asset Class",
    category: "AdTech / IMS (NDA)",
    description:
      "Authored the PRD onboarding cinema onto pDOOH — 5-level inventory model, dynamic slot generation from showtimes, real-time availability engine, DSP eligibility rules. In flight.",
    tags: ["pDOOH", "Cinema", "OpenRTB 2.6", "BDD Criteria"],
    timeline: "2025 — present",
    role: "Sr. Lead UX Designer & Product",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8h20" />
        <path d="M6 4v4" />
        <path d="M18 4v4" />
        <path d="M10 12l4 2-4 2z" />
      </svg>
    ),
  },
  {
    slug: "mw-posterops",
    title: "MW PosterOps — Closed-Loop OOH Execution",
    category: "AdTech / OOH Ops (NDA)",
    description:
      "Defined the closed-loop static-OOH execution platform — no-login Magic Link portals for vendors, installers, and clients; geo-tagged offline-capable Proof-of-Play; payment-validation gates. In flight.",
    tags: ["OOH Ops", "Magic Link", "Proof-of-Play", "RBAC"],
    timeline: "2025 — present",
    role: "Sr. Lead UX Designer & Product",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    slug: "ai-strategy",
    title: "Hybrid UI / Agentic UI Roadmap through 2027",
    category: "Product Strategy (NDA)",
    description:
      "Platform-wide AI strategy across 7 DOOH products — four-paradigm framework, 6-criteria decision matrix, shared trust spine, three-horizon roadmap. Presented to product, engineering, and clients.",
    tags: ["Strategy", "Agentic UI", "Hybrid UI", "Roadmap"],
    timeline: "2025 — 2027",
    role: "Author (Sr. Lead UX & AI PM)",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6" />
        <path d="M12 17v6" />
        <path d="M4.22 4.22l4.24 4.24" />
        <path d="M15.54 15.54l4.24 4.24" />
        <path d="M1 12h6" />
        <path d="M17 12h6" />
        <path d="M4.22 19.78l4.24-4.24" />
        <path d="M15.54 8.46l4.24-4.24" />
      </svg>
    ),
  },
  {
    slug: "nocode-platform",
    title: "NoCode / LowCode Platform",
    category: "Platform Design",
    description:
      "A 4-year build of a visual builder for non-engineers — 60% less dev dependency, NPS 32 → 71, shipped across enterprise pilots.",
    tags: ["Design Systems", "React", "User Research", "4-Year Program"],
    timeline: "2018 — 2022",
    role: "Design Lead",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    slug: "ehr-platform",
    title: "EHR for Indian Daycare Surgery",
    category: "Healthcare UX",
    description:
      "Purpose-built EHR for India's 28,000 daycare centres — 12 modules, 16 specialty overlays, ABDM-native from day one.",
    tags: ["Healthcare", "ABDM / ABHA", "16 Specialties", "NABH"],
    timeline: "2024 — 2026",
    role: "Design Lead",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    slug: "construction-ai",
    title: "Construction AI Platform",
    category: "ConTech / AI",
    description:
      "AI-powered construction intelligence — auto-linked schedules, RFIs, submittals, and material tracking across Procore / P6 / BIM.",
    tags: ["Construction", "AI/ML", "Predictive Analytics", "Procore"],
    timeline: "2025 — 2026",
    role: "Product Design Consultant",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    slug: "iot-dashboard",
    title: "CPCB Air Quality Command Center",
    category: "IoT / GovTech",
    description:
      "Real-time ambient air quality monitoring for India's pollution control boards — CAAQMS stations, NAAQS compliance, machine health across 12 cities.",
    tags: ["IoT", "CAAQMS", "NAAQS", "GovTech"],
    timeline: "2023",
    role: "UX Design Lead",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    slug: "design-systems-scale",
    title: "Design Systems at Scale — One Spine, Six Products",
    category: "Design Systems / Scale",
    description:
      "A multi-domain token architecture spanning 6 product types and 6 palettes — let 3 concurrent design teams scale from 1 product to 7 without design fracture.",
    tags: ["Design Systems", "Tokens", "Figma", "Accessibility"],
    timeline: "2023 — 2025",
    role: "Senior Lead UX Designer & Design Systems Architect",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    slug: "constructiviq-construction-cloud",
    title: "ConstructivIQ: Construction Cloud from Ground Up",
    category: "Construction Cloud / Design Systems",
    description:
      "Shipped a construction cloud SaaS from inception — design system, Submittals & Materials workflows, and AI routing. $1.2M ARR and 15+ enterprise customers in year one.",
    tags: ["Design Systems", "SaaS", "Construction Tech", "AI Workflows"],
    timeline: "05/2023 — 11/2024",
    role: "Lead UI UX Designer",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    slug: "ott-platform",
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    description:
      "Redesigned content discovery for a video-on-demand platform with 50K+ titles — 40% faster time-to-play, 25% engagement lift.",
    tags: ["OTT", "BigData", "Content Strategy", "Performance"],
    timeline: "2022 — 2023",
    role: "Senior Product Designer",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
];

export default function WorkIndexPage() {
  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
            Selected Work
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Case studies, in depth.
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Nine case studies across programmatic DOOH, cinema advertising,
            OOH ops, platform AI strategy, healthcare, IoT, construction, and
            entertainment — each with the role I played, the decisions that
            shaped it, and what I&apos;d do differently. Client work under NDA is
            labeled and shown as stylised recreations.
          </p>
        </motion.div>

        <SectionHeader eyebrow="9 Case Studies" title="Products that made an impact." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {caseStudies.map((cs, i) => (
            <div key={cs.slug} className="relative">
              {cs.status === "in-flight" && (
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 border border-border text-[10px] font-mono text-accent uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  In flight
                </span>
              )}
              <ProjectCard
                title={cs.title}
                category={cs.category}
                description={cs.description}
                tags={cs.tags}
                image={cs.image}
                href={`/work/${cs.slug}`}
                index={i}
              />
              <div className="mt-3 flex items-center gap-3 text-xs text-muted font-mono px-1">
                <span>{cs.role}</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span>{cs.timeline}</span>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 rounded-2xl bg-surface border border-border"
        >
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">
            A note on the metrics
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Numbers on these pages come from shipped releases at Moving Walls
            and client engagements between 2018 and 2026. Methodology and
            context are inline on each case study. Some product surfaces are
            under NDA and shown as stylised recreations — happy to walk through
            the actual product live in an interview.
          </p>
        </motion.div>
      </Section>
    </main>
  );
}
