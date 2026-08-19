"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import Magnetic from "@/components/Magnetic";

const projects = [
  {
    title: "NoCode / LowCode Platform",
    category: "Platform Design",
    description:
      "Designed an intuitive visual builder empowering non-engineers to create complex applications — reducing development dependency by 60% and accelerating go-to-market.",
    tags: ["Design Systems", "React", "Figma", "User Research"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
    href: "/work/nocode-platform",
  },
  {
    title: "EHR Healthcare Platform",
    category: "Healthcare UX",
    description:
      "Reimagined clinical workflows for electronic health records, making complex medical data accessible and actionable — saving clinicians 2+ hours daily.",
    tags: ["Healthcare", "Data Viz", "Accessibility", "Design Thinking"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    href: "/work/ehr-platform",
  },
  {
    title: "IoT Command Center",
    category: "IoT / BigData",
    description:
      "Built a real-time monitoring dashboard for connected devices, making complex sensor data elegant and actionable at scale.",
    tags: ["IoT", "Real-time", "Dashboard", "D3.js"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    href: "/work/iot-dashboard",
  },
  {
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    description:
      "Scaled UI for millions of data points in a video-on-demand platform, balancing content discovery with performance.",
    tags: ["OTT", "BigData", "Content Strategy", "Performance"],
    image: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    href: "/work/ott-platform",
  },
];

const heroStats = [
  { value: "9+", label: "Years leading design" },
  { value: "2M+", label: "Daily active users across 30+ countries" },
  { value: "7", label: "Products launched" },
  { value: "60%", label: "Faster go-to-market" },
];

const featuredPosts = [
  {
    title: "The Psychology Behind My Design Tokens: 8 Decisions, Explained",
    excerpt:
      "This portfolio is case study zero. Every color, motion curve, and contrast ratio on this site encodes a perception principle — here are the eight decisions and the evidence behind each one.",
    date: "Dec 2024",
    readTime: "10 min read",
    category: "Design Systems",
    slug: "psychology-of-design-tokens",
  },
  {
    title: "How I Use 20+ AI Tools to 10x My Design Output",
    excerpt:
      "From AI-assisted coding to generative design exploration, here's the complete AI toolkit I use daily to design, build, and ship products faster than ever.",
    date: "Mar 2025",
    readTime: "12 min read",
    category: "AI × Design",
    slug: "ai-changing-design",
  },
  {
    title: "Design Thinking in AdTech: How OOH is Going Digital",
    excerpt:
      "The OOH advertising industry is undergoing a massive digital transformation — how design thinking is reshaping how brands connect with audiences in physical spaces.",
    date: "Jun 2025",
    readTime: "8 min read",
    category: "Industry Insights",
    slug: "design-thinking-adtech-ooh",
  },
];

/* ===== Horizontal Scroll Projects Section ===== */
function HorizontalScrollProjects({ projects }: { projects: Array<{ title: string; category: string; description: string; tags: string[]; image: React.ReactNode; href: string }> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-65%"]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${(projects.length + 1) * 50}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12">
          <SectionHeader
            eyebrow="Selected Work"
            title="Products that made an impact."
          />
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-4 sm:pl-8">
          {projects.map((project, i) => (
            <div 
              key={project.title} 
              className={`flex-shrink-0 ${
                project.title === "OTT Streaming Platform"
                  ? "w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw]"
                  : "w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw]"
              }`}
            >
              <ProjectCard {...project} index={i} />
            </div>
          ))}
          {/* End card — CTA */}
          <div className="w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 flex items-center justify-center">
            <Link
              href="/work"
              className="group flex flex-col items-center gap-4 text-center p-12 rounded-2xl border border-border hover:border-accent/30 bg-surface transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full border-2 border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <span className="text-xl font-bold">View All Work</span>
              <span className="text-muted text-sm">Explore the full case studies</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Mobile Selected Work Grid ===== */
function MobileSelectedWork({ projects }: { projects: Array<{ title: string; category: string; description: string; tags: string[]; image: React.ReactNode; href: string }> }) {
  return (
    <Section>
      <SectionHeader eyebrow="Selected Work" title="Products that made an impact." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all duration-200"
        >
          View all case studies
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </Section>
  );
}

/* ===== Selected Work — renders exactly ONE variant based on viewport ===== */
function SelectedWorkSection({ projects }: { projects: Array<{ title: string; category: string; description: string; tags: string[]; image: React.ReactNode; href: string }> }) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // SSR / pre-hydration: render the mobile grid so crawlers see one canonical block.
  if (isDesktop === null) {
    return (
      <section id="work">
        <MobileSelectedWork projects={projects} />
      </section>
    );
  }

  return (
    <section id="work">
      {isDesktop ? (
        <HorizontalScrollProjects projects={projects} />
      ) : (
        <MobileSelectedWork projects={projects} />
      )}
    </section>
  );
}

/* ===== Stacked Approach Cards ===== */
const approachSteps = [
  {
    num: "01",
    title: "Designer",
    desc: "Every interface decision is backed by shipped product evidence. I design with 500+ tokens, psychology principles, and multi-platform constraints — frameworks that engineers trust and AI can't replicate because they encode 10 years of B2B judgment.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    color: "var(--color-accent-designer)",
  },
  {
    num: "02",
    title: "Builder",
    desc: "From pixels to production in the same sprint. I write the React, TypeScript, and Next.js that makes design real — not throwaway prototypes, but actual code that ships to millions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    color: "var(--color-accent)",
  },
  {
    num: "03",
    title: "Product Scaler",
    desc: "Shipping features is table stakes. I connect user problems to business outcomes, identify the 20% of work that drives 80% of growth, and design for 100 users and 2 million simultaneously.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    color: "var(--color-accent-scaler)",
  },
];

function StackedApproachCard({ step, index }: { step: typeof approachSteps[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 1]);

  return (
    <div ref={cardRef} style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity, top: `calc(6rem + ${index * 2.5}rem)`, borderColor: "transparent" }}
        className="sticky w-full group p-6 sm:p-10 rounded-2xl bg-surface border border-border transition-all duration-500"
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = step.color + "33"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "transparent"; }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `${step.color}1F`, color: step.color }}
            >
              {step.icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-sm mb-2" style={{ color: step.color }}>{step.num}</div>
            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted leading-relaxed max-w-xl">{step.desc}</p>
          </div>
          <div className="hidden md:block text-8xl font-bold text-border/30 font-mono">
            {step.num}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StackedApproachCards() {
  return (
    <div className="space-y-8">
      {approachSteps.map((step, i) => (
        <StackedApproachCard key={step.num} step={step} index={i} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-24">
        {/* Cursor-reactive grid background */}
        <div className="cursor-reactive-grid" />
        
        {/* Ambient glows */}
        <div className="absolute top-[10%] left-[15%] w-[32rem] h-[32rem] bg-accent/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[15%] right-[10%] w-[28rem] h-[28rem] bg-primary/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 container-premium w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Hero headline - 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="mb-6">
                <span className="font-accent text-sm font-bold text-accent uppercase tracking-widest">
                  Design Leader Who Ships
                </span>
              </div>
              
              <h1 className="font-display font-bold text-primary mb-8">
                I architect design languages that make complexity feel simple
              </h1>
              
              <p className="text-xl md:text-2xl text-muted leading-relaxed mb-10 max-w-2xl">
                Leading design strategy across a{" "}
                <span className="text-primary font-semibold">7-product programmatic DOOH portfolio</span>
                {" "}— building frameworks, systems, and research artifacts that AI cannot generate because they require lived B2B product decisions.
              </p>

              {/* Contact info - make it visible */}
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <a href="mailto:vivekanand.design@gmail.com" className="flex items-center gap-2 text-muted hover:text-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                  vivekanand.design@gmail.com
                </a>
                <span className="text-border">·</span>
                <a href="tel:+919071933517" className="flex items-center gap-2 text-muted hover:text-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +91 907 193 3517
                </a>
                <span className="text-border">·</span>
                <span className="flex items-center gap-2 text-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Bengaluru, India
                </span>
              </div>

              {/* Proof stats — scannable at a glance instead of buried in copy */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 pt-6 border-t border-border">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display font-bold text-3xl md:text-4xl text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Magnetic strength={0.4}>
                  <a
                    href="mailto:vivekanand.design@gmail.com?subject=Let's collaborate&body=Hi Vivekanand,%0D%0A%0D%0AI'd love to discuss..."
                    className="magnetic-btn px-8 py-4 bg-accent text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                    </svg>
                    <span>Get in Touch</span>
                  </a>
                </Magnetic>
                
                <Link
                  href="/work"
                  className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <span>View Work</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-border text-foreground font-semibold rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                >
                  Book a Call
                </Link>
              </div>
            </motion.div>
            
            {/* Right: How I think - 5 columns */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <PrinciplesPanel />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue — orients first-time visitors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Ink spread divider */}
      <div className="ink-spread-divider my-24" />

      {/* ===== SELECTED WORK ===== */}
      <section className="section-spacing">
        <div className="container-premium">
          <div className="mb-16">
            <span className="font-accent text-sm font-bold text-accent uppercase tracking-widest block mb-4">
              Selected Work
            </span>
            <h2 className="font-display font-bold text-primary">
              Products that made an impact
            </h2>
          </div>
          
          {/* Bento Grid */}
          <div className="bento-grid">
            {projects.map((project, i) => (
              <BentoCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="section-spacing bg-surface/50">
        <div className="container-premium">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="font-accent text-sm font-bold text-accent uppercase tracking-widest block mb-4">
              How I Work
            </span>
            <h2 className="font-display font-bold text-primary mb-6">
              Design × Build × Scale
            </h2>
            <p className="text-lg text-muted">
              I don't just design screens — I build systems and scale impact.
            </p>
          </div>
          <StackedApproachCards />
        </div>
      </section>

      {/* ===== LATEST THINKING ===== */}
      <section className="section-spacing">
        <div className="container-premium">
          <div className="mb-16">
            <span className="font-accent text-sm font-bold text-accent uppercase tracking-widest block mb-4">
              Latest Thinking
            </span>
            <h2 className="font-display font-bold text-primary">
              From the blog
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BlogCard {...post} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-spacing">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="font-display font-bold text-white mb-4 text-3xl md:text-4xl">
                Let's build something remarkable
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Available for full-time and consulting opportunities. Response within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:scale-105 transition-transform duration-300"
              >
                <span>Start a Conversation</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* How I Think — interactive accordion: auto-advances, click/hover to pin, one clear focus at a time */
function PrinciplesPanel() {
  const principles = [
    {
      label: "Systems Thinking",
      gist: "Tokens, not one-offs",
      desc: "Every screen is a token; every flow anticipates the edge case.",
      color: "var(--color-accent)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
    },
    {
      label: "Psychology-Led",
      gist: "Perception over preference",
      desc: "Decisions grounded in how people actually perceive and decide.",
      color: "var(--color-primary)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a4.5 4.5 0 0 0-4.5 4.5c0 1.4.6 2.6 1.5 3.5v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V10a4.5 4.5 0 0 0 2-3.5V6"/><circle cx="9.5" cy="6.5" r="4.5"/></svg>,
    },
    {
      label: "Data-Driven",
      gist: "Evidence over opinion",
      desc: "Instrumented from day one — opinions lose to evidence.",
      color: "var(--color-accent)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    },
    {
      label: "Goodhart-Aware",
      gist: "Metrics that resist gaming",
      desc: "Metrics chosen to resist gaming, not just to move up and to the right.",
      color: "var(--color-primary)",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>,
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % principles.length), 3200);
    return () => clearInterval(id);
  }, [paused, principles.length]);

  const activeColor = principles[active].color;

  return (
    <div
      className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-accent text-xs font-bold text-accent uppercase tracking-widest">
          How I Think
        </span>
        <span className="font-mono text-xs text-muted">
          {String(active + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
        </span>
      </div>

      <div className="space-y-1">
        {principles.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="w-full text-left rounded-2xl cursor-pointer"
              style={{ background: isActive ? `${p.color}12` : "transparent" }}
            >
              <div className="flex items-center gap-4 p-3">
                <motion.div
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${p.color}1F`, color: p.color }}
                >
                  {p.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted"}`}>
                    {p.label}
                  </div>
                  {!isActive && (
                    <div className="text-xs text-muted/70 mt-0.5 truncate">{p.gist}</div>
                  )}
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{ color: p.color, transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted leading-relaxed pb-4 pl-[3.75rem] pr-3">
                      {p.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Progress dots — double as manual navigation */}
      <div className="flex items-center gap-2 mt-6 pl-1">
        {principles.map((p, i) => (
          <button
            key={p.label}
            type="button"
            aria-label={`Show ${p.label}`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              width: i === active ? "1.5rem" : "0.375rem",
              background: i === active ? activeColor : "var(--color-border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* Bento Card Component */
function BentoCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRotations = [-2, 1, -1, 2];
  const gridSpans = [
    "lg:col-span-7 lg:row-span-2", // Large hero
    "lg:col-span-5",
    "lg:col-span-5",
    "lg:col-span-7",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${gridSpans[index]} card-paper-stack`}
      style={{ '--card-rotation': cardRotations[index] } as React.CSSProperties}
    >
      <Link
        href={project.href}
        className="block h-full p-8 rounded-2xl border border-border bg-surface hover:border-accent/30 transition-all duration-300 group"
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 text-accent">{project.image}</div>
          <span className="font-accent text-xs font-bold text-accent uppercase tracking-wider mb-3">
            {project.category}
          </span>
          <h3 className="font-display text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-muted leading-relaxed mb-4 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-surface-hover rounded-full text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
