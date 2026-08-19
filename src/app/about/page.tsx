"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import { tintText } from "@/lib/tint";

/* ─── AI Tool Data ─── */
interface AITool {
  name: string;
  abbr: string;
  color: string;
  desc: string;
}

const aiCategories: { title: string; desc: string; tools: AITool[] }[] = [
  {
    title: "Coding & Development",
    desc: "AI agents that accelerate my development workflow — from idea to production.",
    tools: [
      { name: "Cursor", abbr: "Cu", color: "#0066FF", desc: "AI-powered IDE" },
      { name: "Claude Code", abbr: "CC", color: "#D97706", desc: "Terminal coding agent" },
      { name: "GitHub Copilot", abbr: "GC", color: "#6E40C9", desc: "Code completion" },
      { name: "Claude", abbr: "Cl", color: "#D97706", desc: "Complex reasoning" },
      { name: "Emergent", abbr: "Em", color: "#7C3AED", desc: "Agentic app builder" },
      { name: "Replit", abbr: "Re", color: "#F26207", desc: "Cloud AI coding" },
    ],
  },
  {
    title: "AI Assistants & Research",
    desc: "Thinking partners for research, brainstorming, and building full-stack prototypes.",
    tools: [
      { name: "Figma Make", abbr: "FM", color: "#A259FF", desc: "AI concept-to-prototype" },
      { name: "UX Pilot", abbr: "UP", color: "#22D3EE", desc: "AI UX co-pilot" },
      { name: "v0", abbr: "v0", color: "#171717", desc: "AI UI prototyping" },
      { name: "ChatGPT", abbr: "GP", color: "#10A37F", desc: "Research & brainstorm" },
      { name: "Gemini", abbr: "Ge", color: "#4285F4", desc: "Multi-modal AI" },
      { name: "Perplexity", abbr: "Px", color: "#20B2AA", desc: "AI search engine" },
      { name: "Bolt.new", abbr: "Bn", color: "#FF6B00", desc: "Full-stack builder" },
      { name: "NotebookLM", abbr: "NB", color: "#FBBC05", desc: "AI notebook" },
    ],
  },
  {
    title: "Automation & Creative",
    desc: "Automation pipelines and generative AI for creative production at scale.",
    tools: [
      { name: "n8n", abbr: "n8", color: "#EA4B71", desc: "Workflow automation" },
      { name: "Make", abbr: "Mk", color: "#6D00CC", desc: "Visual automation" },
      { name: "Zapier", abbr: "Zp", color: "#FF4A00", desc: "Quick integrations" },
      { name: "Midjourney", abbr: "Mj", color: "#5865F2", desc: "Image generation" },
      { name: "DALL·E", abbr: "DE", color: "#10A37F", desc: "OpenAI images" },
      { name: "Figma AI", abbr: "Fi", color: "#A259FF", desc: "AI-assisted design" },
    ],
  },
];

/* ─── Skills ─── */
const skills = [
  {
    category: "Design",
    color: "#8B5CF6",
    items: ["UI/UX Design", "Design Systems", "Interaction Design", "User Research", "Wireframing", "Prototyping", "Visual Design", "Design Thinking"],
  },
  {
    category: "Tools",
    color: "#EC4899",
    items: ["Figma", "Framer", "Adobe CC", "Storybook", "Miro", "Maze", "Principle", "ProtoPie"],
  },
  {
    category: "Development",
    color: "#06B6D4",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "D3.js", "HTML/CSS", "Git"],
  },
  {
    category: "Domain",
    color: "#10B981",
    items: ["AdTech (OOH/DOOH)", "Healthcare (EHR)", "IoT & BigData", "OTT Platforms", "SaaS / B2B", "NoCode/LowCode"],
  },
  {
    category: "UX Strategy & Ops",
    color: "#F97316",
    items: ["Personas & JTBD", "User Journey Mapping", "UX Strategy", "Usability Testing", "UX Metrics & KPIs", "Stakeholder Workshops"],
  },
  {
    category: "AdTech / OOH",
    color: "#0EA5E9",
    items: ["Programmatic DOOH", "OpenRTB 2.6", "IAB Taxonomies", "DSP / SSP Ecosystems", "Inventory & Yield", "Proof-of-Play & Verification"],
  },
];

/* ─── Design Principles ─── */
const principles = [
  {
    title: "Start with the Problem, Not the Solution",
    description:
      "Every design decision traces back to a validated user need or business goal. If we can't articulate the problem clearly, we're not ready to design.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
  },
  {
    title: "Design for the 80%, Extend for the 20%",
    description:
      "Platform thinking over bespoke solutions. Solve the common case elegantly, then provide escape hatches for edge cases — not the other way around.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    title: "Ship to Learn, Iterate to Impact",
    description:
      "Perfect is the enemy of shipped. I believe in rapid cycles — ship a thin slice of value, measure what happens, learn, and compound.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  },
  {
    title: "Design Systems Are Culture, Not Just Components",
    description:
      "A design system only works if people adopt it. I invest in governance, documentation, and relationships — making it easier to use the system than to bypass it.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
  {
    title: "Design Is Code, Code Is Design",
    description:
      "The best products emerge when design and engineering share a common language. I own the journey from Figma to production — no handoff friction, no translation loss.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    title: "Accessibility Is a Design Constraint, Not a Checklist",
    description:
      "Inclusive design isn't a final polish step. I bake WCAG considerations into every component, every interaction, every content decision — from the first sketch.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 22c-2.5 0-4.5-2-4.5-4.5S9.5 13 12 13s4.5 2 4.5 4.5S14.5 22 12 22z"/><path d="M12 13V8"/><path d="M8 8h8"/></svg>,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
              Senior UI/UX Designer · AI Product Designer · Bengaluru
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              UI/UX Designer.
              <br />
              <span className="text-accent">AI Product Designer.</span>
            </h1>
            <div className="space-y-4 text-base md:text-lg text-muted leading-relaxed">
              <p>
                I&apos;m a <span className="text-foreground font-medium">design leader</span> with
                9+ years building B2B SaaS and AI platforms used by over a million
                people across AdTech, Construction Cloud, Healthcare, AIOps, IIoT, and Big&nbsp;Data.
              </p>
              <p>
                I operate at the intersection of{" "}
                <span className="text-foreground font-medium">design and engineering</span>
                {" "}— turning research and journey maps into the systems that ship. Currently I lead
                design strategy across a <span className="text-foreground font-medium">7-product DOOH portfolio</span>,
                mentoring 9+ designers, with an AI-augmented practice spanning Claude, Figma Make, and Cursor.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono">
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                Cert · Human Factor Interaction
              </span>
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                MBA (IT) · BCA
              </span>
              <span className="px-3 py-1.5 rounded-full border border-border text-muted">
                EN · HI · MR · KN
              </span>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* What I Own — Design Function */}
      <Section>
        <SectionHeader
          eyebrow="Design Leadership"
          title="I own the full stack of design."
          description="Not just screens — I own the systems, the code, and the strategy that makes great products happen at scale."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leader Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">As a Design Leader</h3>
                <p className="text-xs font-mono text-accent">Strategic & Organizational</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Team Building & Hiring", desc: "Recruit, mentor, and grow designers from junior to senior." },
                { title: "Design Ops & Process", desc: "Establish workflows, review cadences, and tooling that keep teams efficient." },
                { title: "Design Strategy", desc: "Align design direction with business goals and measure impact." },
                { title: "Stakeholder Management", desc: "Translate design decisions into business language leaders trust." },
                { title: "Design Culture", desc: "Foster critique, experimentation, and continuous learning through team rituals." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Practitioner Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-coral/10 border border-accent-coral/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">As a Practitioner</h3>
                <p className="text-xs font-mono text-accent-coral">Hands-on & Technical</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Design Systems", desc: "Architect component libraries and tokens that keep products consistent." },
                { title: "Product Design", desc: "End-to-end UI/UX — research, wireframes, prototypes, interaction design." },
                { title: "Frontend Engineering", desc: "Ship production React/Next.js code — I build what I design." },
                { title: "Data Visualization", desc: "Turn complex datasets into clear, actionable visual stories." },
                { title: "Design-to-Code Bridge", desc: "Close the gap between design and engineering with pixel-perfect fidelity." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-coral shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Design Principles */}
      <Section>
        <SectionHeader
          eyebrow="Principles"
          title="How I think about design."
          description="A handful of beliefs that shape every product decision I make."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 sm:p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
            >
              <div className="text-accent mb-6">{p.icon}</div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Leadership */}
      <Section>
        <SectionHeader
          eyebrow="Leadership"
          title="Building teams, not just products."
          description="Design leadership is measured by the designers you grow, the systems you build, and the org velocity you unlock."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Team Building",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              desc: "Hired and mentored 12 designers across 3 organizations — 6 progressed from mid to senior level under my coaching, with critique rituals and career ladders that became org-wide standards.",
              iconBg: "bg-accent/10",
            },
            {
              title: "Design Systems at Scale",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
              desc: "Led the design system serving 40+ engineers and 8 product teams, reducing design-to-dev handoff time by 55% through governance and automated Figma-to-code sync.",
              iconBg: "bg-primary/10",
            },
            {
              title: "Stakeholder Alignment",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
              desc: "Ran bi-weekly design reviews with C-suite and product leadership across 7 products, using research and opportunity-cost data to earn trust and cut late-stage scope churn by 40%.",
              iconBg: "bg-accent/10",
            },
            {
              title: "Velocity Engineering",
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              desc: "Introduced design sprints and Figma-to-code workflows that cut delivery cycles from 8 weeks to 3 — the org shipped 3x more features per quarter without adding headcount.",
              iconBg: "bg-primary/10",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-surface border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader
          eyebrow="Skills"
          title="My toolkit."
          description="What I bring to a product, organized by domain."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-surface border border-border"
            >
              <h4 className="text-sm font-semibold mb-3" style={{ color: tintText(cat.color) }}>
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                    style={{ borderColor: cat.color + "35", color: tintText(cat.color), backgroundColor: cat.color + "0d" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Talks & Writing */}
      <Section>
        <SectionHeader
          eyebrow="Thought Leadership"
          title="Talks & Writing."
          description="Sharing knowledge through articles, talks, and community contributions."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: "Article",
              title: "Design Thinking in AdTech: How OOH is Going Digital",
              venue: "Blog",
              date: "Mar 2026",
              href: "/blog/design-thinking-adtech-ooh",
            },
            {
              type: "Article",
              title: "Building Design Systems That Scale",
              venue: "Blog",
              date: "Feb 2026",
              href: "/blog/building-design-systems-scale",
            },
            {
              type: "Article",
              title: "AI is Changing How We Design — Here's How I Use It",
              venue: "Blog",
              date: "Jan 2026",
              href: "/blog/ai-changing-design",
            },
            {
              type: "Topic",
              title: "System Design for Designers: Think Like an Engineer",
              venue: "Blog",
              date: "Dec 2025",
              href: "/blog/system-design-for-designers",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-accent uppercase">
                      {item.type}
                    </span>
                    <span className="text-xs text-muted">{item.date}</span>
                  </div>
                  <h4 className="font-semibold group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted mt-1">{item.venue}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AI Toolkit */}
      <Section>
        <SectionHeader
          eyebrow="AI Stack"
          title="My AI Toolkit."
          description="The agents and tools I use daily, organized by role in my workflow."
        />
        <div className="space-y-10">
          {aiCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08 }}
            >
              <h3 className="text-lg font-bold mb-1">{cat.title}</h3>
              <p className="text-sm text-muted mb-4">{cat.desc}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0"
                      style={{ backgroundColor: tool.color + "12", borderColor: tool.color + "30", color: tintText(tool.color) }}
                    >
                      {tool.abbr}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{tool.name}</p>
                      <p className="text-xs text-muted truncate">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* AI Philosophy */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              How I Think About <span className="text-accent">AI</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: "Augment, Don't Replace",
                  desc: "AI amplifies my creativity and speed — but the design decisions and user empathy remain deeply human.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                },
                {
                  title: "Automate the Mundane",
                  desc: "If I do it more than twice, I build a pipeline — n8n, Make, and Zapier handle the repetitive.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
                },
                {
                  title: "Stay Tool-Agnostic",
                  desc: "The best tool is the one that solves the problem — no loyalty, only effectiveness.",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                },
              ].map((principle) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-surface border border-border"
                >
                  <div className="mb-3">{principle.icon}</div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">{principle.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Want to work together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg mb-8 max-w-lg mx-auto"
          >
            I&apos;m always open to discussing new opportunities, collaborations,
            and interesting projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
