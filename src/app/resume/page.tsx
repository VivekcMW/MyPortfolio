"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-accent hover:text-accent/80 transition-colors">
            VC
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Print to PDF
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-6 lg:px-8 py-16 space-y-16"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-2">
              Vivekanand Choudhari
            </h1>
            <p className="text-xl text-accent font-medium">
              Senior Lead UX Designer — AI & Agentic Products · AI Product Manager
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-accent" />
              <a href="mailto:vivekanand.design@gmail.com" className="hover:text-foreground transition-colors">
                vivekanand.design@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-accent" />
              <span>(+91) 9071933517</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              <span>Bengaluru, India</span>
            </div>
          </div>

          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            Product design leader with 9+ years building B2B SaaS and AI platforms used by over 1M users across AdTech, Construction Cloud, Healthcare, AIOps, IIoT, and Big Data. I operate at the intersection of design and product management — authoring PRDs, personas, business rules, and roadmaps, then leading the design systems and screens that ship them.
          </p>

          <p className="text-base text-muted leading-relaxed">
            Currently own design strategy and product definition across a 7-product DOOH (Digital Out-of-Home) portfolio, mentoring 9+ designers. Strategic focus: designing agentic and hybrid-UI product experiences; building design systems that scale across product lines; defining go-to-market and product positioning alongside engineering and leadership.
          </p>
        </motion.section>

        {/* Featured Case Studies */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Featured Case Studies</h2>
            <p className="text-sm text-muted">Strategic projects showcasing problem-solving, design decisions, and business impact</p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Design Systems at Scale: One Spine, Six Products",
                desc: "Architected a multi-domain design system (6 domains × 6 palettes) with semantic tokens and WCAG AAA accessibility. Enabled 3 teams to scale 7 products without design fracture; reduced design reviews by 40%, accessibility violations to 1%.",
                href: "/work/design-systems-scale",
                metrics: ["6 domains", "6 palettes", "40% faster reviews", "WCAG AAA"],
              },
              {
                title: "MW Activate: Programmatic DSP from PRD to 120+ Adoption",
                desc: "Authored end-to-end PRD (personas, workflows, OpenRTB/IAB alignment) and designed against programmatic standards. Influenced pricing/integration strategy that drove 45% inventory expansion and 92% activation rate.",
                href: "/work/mw-activate",
                metrics: ["120+ advertisers", "92% activation", "45% expansion", "18 integration partners"],
              },
              {
                title: "MW PosterOps: Magic Link Design & Closed-Loop Execution",
                desc: "Designed no-login Magic Link vendor experience for static OOH execution. Reduced onboarding from 5 days to 2 hours, improved field compliance to 85%, lifted client NPS from 42 to 71.",
                href: "/work/mw-posterops",
                metrics: ["5d → 2h onboarding", "85% compliance", "NPS 42 → 71", "12,000+ installations"],
              },
              {
                title: "ConstructivIQ: Building Cloud Platform from Ground Up",
                desc: "Designed ground-up Construction Cloud platform with design system (80+ components) and AI-powered Submittals workflow. Generated $1.2M ARR, onboarded 15+ enterprises, reduced implementation time by 45%.",
                href: "/work/constructiviq-construction-cloud",
                metrics: ["$1.2M ARR", "15+ customers", "45% faster impl.", "82% mobile adoption"],
              },
            ].map((study, idx) => (
              <Link
                key={idx}
                href={study.href}
                className="group p-6 rounded-xl border border-border hover:border-accent/50 bg-surface hover:bg-surface-hover transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-accent transition-colors flex-1">{study.title}</h3>
                  <ExternalLink size={16} className="text-muted group-hover:text-accent transition-colors flex-shrink-0 ml-3 mt-1" />
                </div>
                <p className="text-sm text-muted mb-4">{study.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((metric, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                      {metric}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Work Experience */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">Work Experience</h2>
            <p className="text-sm text-muted">9+ years building products at scale across multiple domains</p>
          </div>

          {[
            {
              role: "Senior Lead UX Designer · Product Designer",
              company: "AdTech Platform Company",
              period: "03/2025 – Present",
              location: "Bengaluru",
              highlights: [
                "Scaled design portfolio from 3 to 7 shipped DOOH products; implemented shared design language lifting team usability by 25% and reducing handoff time by 35%",
                "Led & mentored 9+ UX designers; established design standards, critique culture, component library reducing redlines by 40%",
                "Authored platform-wide Hybrid UI/Agentic UI strategy & roadmap (2025–2027); presented to product, engineering, and external clients",
                "Designed 3 flagship platforms: MW Activate (Programmatic DSP, 120+ advertisers), MW Cinema (Cinema Inventory, 18% revenue uplift), MW PosterOps (Closed-loop OOH, NPS 42→71)",
              ],
            },
            {
              role: "Lead UI UX Designer",
              company: "ConstructivIQ India Private Limited",
              period: "05/2023 – 11/2024",
              location: "Bengaluru",
              highlights: [
                "Designed Construction Cloud SaaS from inception; established scalable design system (80+ components) & library-based front-end architecture with engineering",
                "Developed AI-based concepts for Submittals workflow (auto-categorization reducing manual effort 35%, intelligent routing); engaged customers during onboarding validating product-market fit",
                "Generated $1.2M ARR with 15+ enterprise customers in 6 months; average customer implementation time reduced 45% through optimized onboarding",
                "Built component library enabling 3 concurrent feature teams to ship independently; reduced design-to-dev handoff by 50%, design review cycles by 40%",
              ],
            },
            {
              role: "Sr. Lead UI UX Designer",
              company: "Onx Software Systems (Slate Technologies)",
              period: "11/2021 – 03/2023",
              location: "Bengaluru",
              highlights: [
                "Led team of 4 designers and front-end developers on Slate.ai (construction-cloud SaaS for U.S.); owned research, wireframing, prototyping, design implementation",
                "Achieved 92% customer satisfaction (NPS 58) and 85% feature adoption for core workflows through iterative user research and design refinement",
                "Collaborated with stakeholders and engineering on requirements, maintaining alignment to industry standards; established weekly design-engineering syncs improving spec clarity by 25%",
              ],
            },
            {
              role: "Team Lead — Global UI UX",
              company: "Quinnox",
              period: "05/2020 – 10/2021",
              location: "Bengaluru",
              highlights: [
                "Led design & research for AIOps automation SaaS in DevOps space; ran sprint planning, managed team, coordinated with global teams in Agile environment",
                "Increased platform adoption 55% YoY; lifted customer satisfaction from 62 to 78/100 through iterative user research and workflow optimization",
              ],
            },
          ].map((job, idx) => (
            <div key={idx} className="space-y-3 pb-8 border-b border-border last:border-b-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="text-accent font-medium">{job.company}</p>
                </div>
                <div className="text-sm text-muted whitespace-nowrap">
                  <div>{job.period}</div>
                  <div>{job.location}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-muted flex gap-3">
                    <span className="text-accent mt-1.5 flex-shrink-0">▪</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.section>

        {/* Skills */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Key Skills</h2>
            <p className="text-sm text-muted">9+ years across product, design, and leadership</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                category: "Product Strategy & Execution",
                items: ["PRD Authoring & Specs", "Roadmapping & Prioritization (RICE)", "Product Decisions & Trade-offs", "Go-to-Market & Positioning", "User Story Mapping & BDD", "Personas & Jobs-to-be-Done", "Metrics & KPI Definition", "Business Case & ROI"],
              },
              {
                category: "Domain Expertise (AdTech / OOH)",
                items: ["Programmatic DOOH & DSP/SSP", "OpenRTB 2.6 & IAB Taxonomies", "Inventory & Yield Management", "Proof-of-Play & Campaign Verification", "Audience Measurement"],
              },
              {
                category: "Design & Systems",
                items: ["User Research & Analysis", "Information Architecture", "Design Systems & Components", "Responsive & Accessible Design (WCAG 2.1 AA/AAA)", "Visual Design & Brand Systems"],
              },
              {
                category: "AI & Emerging Tech",
                items: ["Agentic UI / Hybrid UI Strategy", "AI-Powered Workflow Design", "Prompt Engineering for Research", "Claude, Figma Make, UX Pilot"],
              },
              {
                category: "Leadership & Operations",
                items: ["Design Team Leadership", "Stakeholder Engagement", "Design Critique & Process", "Design Ops & Agile/Scrum"],
              },
              {
                category: "Tools & Technologies",
                items: ["Figma (expert)", "Sketch, Adobe XD", "Claude, Claude Code, Claude Design", "Jira, Confluence, Miro", "Google Analytics, Intercom"],
              },
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-3 text-accent">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted flex gap-2">
                      <span className="text-accent flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certification */}
        <motion.section variants={itemVariants} className="space-y-4 pb-16">
          <h2 className="text-2xl font-bold">Certification & Languages</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Certification: Human Factor Interaction</h3>
            </div>
            <div>
              <h3 className="font-semibold">Languages</h3>
              <p className="text-sm text-muted">English · Hindi · Marathi · Kannada</p>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 py-8 border-t border-border"
        >
          <div>
            <p className="text-sm text-muted mb-4">
              Ready to discuss strategic design, AI products, or design systems at scale?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:vivekanand.design@gmail.com"
                className="px-6 py-3 rounded-lg bg-accent text-background font-medium hover:bg-accent/90 transition-colors"
              >
                Get in touch
              </a>
              <a
                href="https://linkedin.com/in/vivekanand-choudhari-817829118"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent/10 transition-colors font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
            color: black;
          }

          button {
            display: none;
          }

          a {
            color: #0066cc;
          }

          .print\\:hidden {
            display: none;
          }

          * {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
