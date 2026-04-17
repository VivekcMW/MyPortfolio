"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";

const timeline = [
  {
    year: "2024–Present",
    role: "Lead Design Engineer",
    company: "Moving Walls",
    description:
      "Heading design for the world's leading OOH/DOOH AdTech platform. Building design systems, leading a design team, and shipping products used across 30+ countries.",
  },
  {
    year: "2022–2024",
    role: "Senior UI/UX Designer",
    company: "Moving Walls",
    description:
      "Led design for multiple platform modules including campaign planning, audience analytics, and inventory management.",
  },
  {
    year: "2020–2022",
    role: "UI/UX Designer",
    company: "Product Studio",
    description:
      "Designed EHR platforms, IoT dashboards, and OTT streaming interfaces. Built and maintained cross-product design systems.",
  },
  {
    year: "2018–2020",
    role: "Frontend Developer & Designer",
    company: "Startup",
    description:
      "Full-stack design and development for NoCode/LowCode platforms. Bridged the gap between design and engineering.",
  },
];

const skills = [
  {
    category: "Design",
    items: [
      "UI/UX Design",
      "Design Systems",
      "Interaction Design",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Design Thinking",
    ],
  },
  {
    category: "Tools",
    items: [
      "Figma",
      "Framer",
      "Adobe CC",
      "Storybook",
      "Miro",
      "Maze",
      "Principle",
      "ProtoPie",
    ],
  },
  {
    category: "Development",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "D3.js",
      "HTML/CSS",
      "Git",
    ],
  },
  {
    category: "Domain",
    items: [
      "AdTech (OOH/DOOH)",
      "Healthcare (EHR)",
      "IoT & BigData",
      "OTT Platforms",
      "SaaS / B2B",
      "NoCode/LowCode",
    ],
  },
];

const principles = [
  {
    title: "Data-Informed, Not Data-Driven",
    description:
      "Numbers guide decisions, but empathy and craft drive innovation. I combine quantitative insights with qualitative understanding.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    title: "Ship to Learn",
    description:
      "Perfect is the enemy of good. I believe in rapid iteration — ship, measure, learn, improve. Every pixel ships with purpose.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  },
  {
    title: "Design is Code, Code is Design",
    description:
      "The best products emerge when design and engineering speak the same language. I bridge both worlds fluently.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
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
              About Me
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Vivekanand
              <br />
              <span className="text-gradient">Choudhari</span>
            </h1>
            <div className="space-y-4 text-base md:text-lg text-muted leading-relaxed">
              <p>
                I&apos;m a <span className="text-foreground font-medium">Lead Design Engineer</span> with
                8+ years of experience crafting digital products that millions
                of people use every day.
              </p>
              <p>
                Currently heading design at{" "}
                <span className="text-foreground font-medium">Moving Walls</span>,
                the world&apos;s leading OOH/DOOH advertising technology
                platform, where I lead a team building tools used across 30+
                countries.
              </p>
              <p>
                I live in the intersection of{" "}
                <span className="text-foreground font-medium">design and code</span>
                . I don&apos;t just design interfaces — I build them. From
                Figma to production React, I own the full journey from pixel to
                deployment.
              </p>
              <p>
                My work spans{" "}
                <span className="text-foreground font-medium">
                  AdTech, Healthcare, IoT, and OTT
                </span>{" "}
                — industries where complex data meets real human needs. I
                specialize in making the complicated feel simple.
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all"
              >
                Get in Touch
              </Link>
              <a
                href="/resume.pdf"
                className="px-6 py-3 bg-surface border border-border text-foreground font-semibold rounded-xl hover:bg-surface-hover transition-all"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* What I Own — Design Function */}
      <Section>
        <SectionHeader
          eyebrow="Design Leadership"
          title="I own the design vertical."
          description="I don't just design products — I build and lead the teams, systems, and culture that make great design happen at scale."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leader Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
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
                  { title: "Team Building & Hiring", desc: "Recruit, mentor, and grow designers — from junior to senior. Build diverse teams that complement each other's strengths." },
                  { title: "Design Ops & Process", desc: "Establish design workflows, review cadences, handoff standards, and tooling decisions that keep the team efficient at scale." },
                  { title: "Design Strategy", desc: "Align design direction with business goals. Define the design roadmap, prioritize initiatives, and measure design impact." },
                  { title: "Stakeholder Management", desc: "Translate design decisions into business language. Build trust with PMs, engineering leads, and executives through clarity and results." },
                  { title: "Design Culture", desc: "Foster a culture of critique, experimentation, and continuous learning. Run design sprints, team rituals, and knowledge sharing." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Practitioner Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
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
                  { title: "Design Systems", desc: "Architect and maintain component libraries, tokens, and guidelines that ensure consistency across products and teams." },
                  { title: "Product Design", desc: "End-to-end UI/UX — from user research and wireframes to high-fidelity prototypes and interaction design." },
                  { title: "Frontend Engineering", desc: "Ship production React/Next.js code. I don't throw designs over the wall — I build what I design." },
                  { title: "Data Visualization", desc: "Turn complex datasets into clear, actionable visual stories using D3.js, charts, and dashboard design patterns." },
                  { title: "Design-to-Code Bridge", desc: "Eliminate the gap between design and engineering. Figma ↔ Storybook ↔ Production with pixel-perfect fidelity." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-coral shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Design Philosophy */}
      <Section>
        <SectionHeader
          eyebrow="Philosophy"
          title="How I think about design."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-5 sm:p-8 rounded-2xl bg-surface border border-border hover:border-accent/20 transition-all"
            >
              <div className="text-4xl mb-6">{p.icon}</div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader
          eyebrow="Skills"
          title="My toolkit."
          description="A design engineer's arsenal — from pixels to production."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-surface border border-border"
            >
              <h3 className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm rounded-lg bg-background border border-border text-foreground/70 hover:text-foreground hover:border-accent/20 transition-colors"
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
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Article",
              title: "Building Design Systems That Scale",
              venue: "Blog",
              date: "Feb 2026",
              href: "/blog/building-design-systems-scale",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Article",
              title: "AI is Changing How We Design — Here's How I Use It",
              venue: "Blog",
              date: "Jan 2026",
              href: "/blog/ai-changing-design",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              ),
            },
            {
              type: "Topic",
              title: "System Design for Designers: Think Like an Engineer",
              venue: "Blog",
              date: "Dec 2025",
              href: "/blog/system-design-for-designers",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              ),
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
                  {item.icon}
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
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
