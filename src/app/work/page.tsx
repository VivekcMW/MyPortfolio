"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { tintText } from "@/lib/tint";

/*
 * Case study index. Slugs and metadata are the single source of truth here;
 * the detailed data lives under /work/[slug]/page.tsx. If a slug ships there,
 * add it to `caseStudies` below so it surfaces on this index.
 */

type Domain =
  | "AdTech"
  | "Design Systems"
  | "Construction"
  | "Healthcare"
  | "GovTech"
  | "Entertainment"
  | "IIoT"
  | "BigData"
  | "EV";

/* Domain hues double as filter-pill colors and per-card accent chips. */
const domainColors: Record<Domain, string> = {
  AdTech: "#6366F1",
  "Design Systems": "#8B5CF6",
  Construction: "#EAB308",
  Healthcare: "#10B981",
  GovTech: "#0EA5E9",
  Entertainment: "#EC4899",
  IIoT: "#F97316",
  BigData: "#14B8A6",
  EV: "#84CC16",
};

const domainList = Object.keys(domainColors) as Domain[];

const caseStudies: Array<{
  slug: string;
  title: string;
  category: string;
  domain: Domain;
  description: string;
  tags: string[];
  timeline: string;
  role: string;
  status?: "in-flight" | "shipped";
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  image: React.ReactNode;
}> = [
  {
    slug: "mw-activate",
    title: "Agentic Layer for a pDOOH DSP",
    category: "AI / AdTech (NDA)",
    domain: "AdTech",
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
    domain: "AdTech",
    description:
      "Designed the inventory experience onboarding cinema onto pDOOH — 5-level inventory model, dynamic slot generation from showtimes, real-time availability engine, DSP eligibility rules. In flight.",
    tags: ["pDOOH", "Cinema", "OpenRTB 2.6", "BDD Criteria"],
    timeline: "2025 — present",
    role: "Sr. UI/UX Designer",
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
    domain: "AdTech",
    description:
      "Defined the closed-loop static-OOH execution platform — no-login Magic Link portals for vendors, installers, and clients; geo-tagged offline-capable Proof-of-Play; payment-validation gates. In flight.",
    tags: ["OOH Ops", "Magic Link", "Proof-of-Play", "RBAC"],
    timeline: "2025 — present",
    role: "Sr. UI/UX Designer",
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
    category: "Design Strategy (NDA)",
    domain: "AdTech",
    description:
      "Platform-wide AI strategy across 7 DOOH products — four-paradigm framework, 6-criteria decision matrix, shared trust spine, three-horizon roadmap. Presented to product, engineering, and clients.",
    tags: ["Strategy", "Agentic UI", "Hybrid UI", "Roadmap"],
    timeline: "2025 — 2027",
    role: "Author (Sr. UI/UX & AI Product Designer)",
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
    domain: "Design Systems",
    description:
      "A 4-year build of a visual builder for non-engineers — 60% less dev dependency, NPS 32 → 71, shipped across enterprise pilots.",
    tags: ["Design Systems", "React", "User Research", "4-Year Program"],
    timeline: "2018 — 2022",
    role: "Design Lead",
    status: "shipped",
    featured: true,
    metrics: [
      { label: "Dev dependency", value: "−60%" },
      { label: "Builder NPS", value: "32 → 71" },
      { label: "Program length", value: "4 yrs" },
    ],
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
    domain: "Healthcare",
    description:
      "Purpose-built EHR for India's 28,000 daycare centres — 12 modules, 16 specialty overlays, ABDM-native from day one.",
    tags: ["Healthcare", "ABDM / ABHA", "16 Specialties", "NABH"],
    timeline: "2024 — 2026",
    role: "Design Lead",
    status: "shipped",
    featured: true,
    metrics: [
      { label: "Daycare centres", value: "28,000" },
      { label: "Modules", value: "12" },
      { label: "Specialty overlays", value: "16" },
    ],
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
    domain: "Construction",
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
    domain: "GovTech",
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
    domain: "Design Systems",
    description:
      "A multi-domain token architecture spanning 6 product types and 6 palettes — let 3 concurrent design teams scale from 1 product to 7 without design fracture.",
    tags: ["Design Systems", "Tokens", "Figma", "Accessibility"],
    timeline: "2023 — 2025",
    role: "Senior UI/UX Designer & Design Systems Architect",
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
    domain: "Construction",
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
    slug: "ev-bike-platform",
    title: "EV Bike OEM & Sales Platform",
    category: "EV / OEM Platform (NDA)",
    domain: "EV",
    description:
      "Foundation persona & use-case mapping for a low-speed EV bike OEM — multi-plant factory MES, dealer + D2C sales, in-house EMI financing, and alert-and-accept field service dispatch.",
    tags: ["EV", "OEM", "MES", "Field Dispatch", "EMI", "NDA"],
    timeline: "Feb 2026 — present",
    role: "Senior UI/UX Designer & AI Product Designer",
    status: "in-flight",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    slug: "iiot-smart-factory",
    title: "IIoT Smart Factory Platform",
    category: "IIoT / Industry 4.0",
    domain: "IIoT",
    description:
      "IIoT applications for Smart Factory / Industry 4.0 programs spanning Big Data, ML, AI, and IoT platforms — 6 product experiences shipped for industrial enterprise customers.",
    tags: ["IIoT", "Industry 4.0", "Smart Factory", "Progressive Disclosure"],
    timeline: "Sep 2018 — Jan 2020",
    role: "Senior UI UX Designer",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    slug: "bigdata-analytics",
    title: "Big Data Analytics Platform",
    category: "BigData / Enterprise Analytics",
    domain: "BigData",
    description:
      "Big Data and IoT product interfaces for enterprise monitoring and analytics — with an accessibility baseline built in from the first screen.",
    tags: ["BigData", "IoT", "Enterprise Analytics", "Accessibility"],
    timeline: "Jun 2016 — Nov 2017",
    role: "UI UX Designer — Big Data & IoT",
    status: "shipped",
    image: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    slug: "ott-platform",
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    domain: "Entertainment",
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
  const [activeDomain, setActiveDomain] = useState<Domain | "All">("All");

  const showSpotlight = activeDomain === "All";
  const featuredItems = caseStudies.filter((cs) => cs.featured);
  const filtered =
    activeDomain === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.domain === activeDomain);
  const gridItems = showSpotlight ? filtered.filter((cs) => !cs.featured) : filtered;

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
            {caseStudies.length}{" "}
            case studies across programmatic DOOH, cinema advertising, OOH ops,
            platform AI strategy, healthcare, IoT, construction, design systems,
            and entertainment — each with the role I played, the decisions that
            shaped it, and what I&apos;d do differently. Client work under NDA is
            labeled and shown as stylised recreations.
          </p>
        </motion.div>

        {/* Domain filter — single-select pills, colored per domain */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveDomain("All")}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
              activeDomain === "All"
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-surface border-border text-muted hover:border-primary/30"
            }`}
          >
            All <span className="opacity-60">({caseStudies.length})</span>
          </button>
          {domainList.map((d) => {
            const active = activeDomain === d;
            const color = domainColors[d];
            const count = caseStudies.filter((cs) => cs.domain === d).length;
            return (
              <button
                type="button"
                key={d}
                onClick={() => setActiveDomain(d)}
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer"
                style={{
                  backgroundColor: active ? `${color}1F` : "var(--color-surface)",
                  borderColor: active ? color : "var(--color-border)",
                  color: active ? tintText(color) : "var(--color-muted)",
                }}
              >
                {d} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Flagship spotlight — hidden while a domain filter narrows the grid */}
        {showSpotlight && featuredItems.length > 0 && (
          <div className="mb-16 space-y-8">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">
              Flagship Case Studies
            </p>
            {featuredItems.map((cs, i) => (
              <div key={cs.slug} className="relative">
                {cs.status === "in-flight" && (
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 border border-border text-[10px] font-mono text-accent uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />{" "}
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
                  domain={cs.domain}
                  domainColor={domainColors[cs.domain]}
                  featured
                  metrics={cs.metrics}
                />
                <div className="mt-3 flex items-center gap-3 text-xs text-muted font-mono px-1">
                  <span>{cs.role}</span>
                  <span className="w-1 h-1 rounded-full bg-muted/40" />
                  <span>{cs.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <SectionHeader
          eyebrow={`${gridItems.length} Case Stud${gridItems.length === 1 ? "y" : "ies"}`}
          title="Products that made an impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {gridItems.map((cs, i) => (
            <div key={cs.slug} className="relative">
              {cs.status === "in-flight" && (
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 border border-border text-[10px] font-mono text-accent uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />{" "}
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
                domain={cs.domain}
                domainColor={domainColors[cs.domain]}
              />
              <div className="mt-3 flex items-center gap-3 text-xs text-muted font-mono px-1">
                <span>{cs.role}</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span>{cs.timeline}</span>
              </div>
            </div>
          ))}
        </div>

        {gridItems.length === 0 && (
          <p className="text-sm text-muted font-mono py-16 text-center">
            No case studies in this domain yet — try another filter.
          </p>
        )}
      </Section>
    </main>
  );
}
