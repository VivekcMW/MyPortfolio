"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Section } from "@/components/Section";
import {
  projectData,
  type DecisionRecord,
} from "@/lib/work/project-data";


/* ─── Decision Records — context → options → choice → result ─── */
function DecisionsSection({ decisions }: { decisions: DecisionRecord[] }) {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
          Decision Records
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          The three calls that shaped the product — with the options considered,
          the evidence behind each choice, and the psychology principle at work.
        </p>
        <div className="space-y-6">
          {decisions.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-surface border border-border overflow-hidden"
            >
              <div className="p-5 sm:p-6 border-b border-border flex items-start gap-4">
                <span className="font-mono text-sm text-accent shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold mb-1">{d.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{d.context}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-border">
                <div className="bg-surface p-5 sm:p-6">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
                    Options considered
                  </p>
                  <ul className="space-y-2">
                    {d.options.map((opt, oi) => (
                      <li key={oi} className="flex gap-2.5 text-sm text-foreground/70 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-muted shrink-0" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface p-5 sm:p-6">
                  <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">
                    The call → the result
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{d.choice}</p>
                  <p className="text-sm text-muted leading-relaxed">{d.result}</p>
                </div>
              </div>
              <div className="px-5 sm:px-6 py-3.5 bg-background/50 border-t border-border">
                <p className="text-xs text-muted leading-relaxed">
                  <span className="font-mono text-accent-coral uppercase tracking-wider text-[10px] mr-2">
                    Principle
                  </span>
                  {d.principle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

/* ─── Retro — what I'd do differently ─── */
function RetroSection({ retro }: { retro: string[] }) {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
          What I&apos;d Do Differently
        </h2>
        <p className="text-sm text-muted mb-8">
          Honest hindsight — the calls I&apos;d change if I ran this again.
        </p>
        <div className="space-y-4">
          {retro.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 p-4 rounded-xl bg-surface border border-border"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-coral shrink-0 mt-1">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <p className="text-sm text-foreground/75 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

export default function CaseStudyClient({ slug }: { slug: string }) {
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link href="/" className="text-accent hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  /* ─── Story-based layout for projects with chapters ─── */
  if (project.story) {
    const uniqueYears = [...new Set(project.story.map((c) => c.year.split(/\s*[–—]\s*/)[0]))];
    return (
      <main className="min-h-screen pt-24 sm:pt-32">
        {/* Back link */}
        <Section>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to projects
          </Link>

          {/* Hero */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-accent font-mono text-sm uppercase tracking-widest">{project.category}</span>
              {project.timeline && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span className="text-muted font-mono text-sm">{project.timeline}</span>
                </>
              )}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mb-10"
            >
              {project.heroDesc}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-full bg-surface border border-border text-muted">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Role Banner */}
            {project.role && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mb-10 p-5 rounded-2xl bg-accent/5 border border-accent/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">Leadership Context</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Role</p>
                    <p className="text-sm font-semibold text-foreground">{project.role.title}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Scope</p>
                    <p className="text-xs text-foreground/70">{project.role.scope}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Team</p>
                    <p className="text-xs text-foreground/70">{project.role.team}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── Product Artifact (stylized recreation) ─── */}
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-4"
            >
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="text-[10px] font-mono text-muted ml-2">app-builder / canvas</span>
                </div>
                {/* Builder canvas wireframe */}
                <div className="p-4 sm:p-6 grid grid-cols-12 gap-3 min-h-[280px] sm:min-h-[340px]" aria-hidden="true">
                  {/* Component palette */}
                  <div className="col-span-3 sm:col-span-2 space-y-2">
                    <div className="h-6 rounded bg-border/40 w-3/4" />
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="h-9 rounded-lg bg-accent/8 border border-accent/15" />
                    ))}
                  </div>
                  {/* Canvas */}
                  <div className="col-span-6 sm:col-span-7 rounded-xl border-2 border-dashed border-accent/20 p-3 sm:p-4 flex flex-col gap-3">
                    <div className="h-10 rounded-lg bg-accent/10 border border-accent/20" />
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      <div className="rounded-lg bg-surface-hover border border-border" />
                      <div className="rounded-lg bg-surface-hover border border-border flex items-end p-2 gap-1">
                        {[40, 70, 50, 85, 60].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t bg-accent/25" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="h-9 rounded-lg bg-accent-coral/10 border border-accent-coral/20 w-1/2" />
                  </div>
                  {/* Property panel — progressive disclosure */}
                  <div className="col-span-3 space-y-2">
                    <div className="h-6 rounded bg-border/40 w-2/3" />
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="h-8 rounded-lg bg-surface-hover border border-border" />
                    ))}
                    <div className="h-8 rounded-lg border border-dashed border-border flex items-center justify-center">
                      <span className="text-[9px] font-mono text-muted">+ Advanced</span>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-xs text-muted font-mono">
                Stylized recreation of the builder canvas — palette, drag-and-drop
                canvas, and progressively disclosed property panel. Original screens
                are under NDA.
              </figcaption>
            </motion.figure>

          </div>
        </Section>

        {/* ─── Horizontal Journey Bar ─── */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Bar track */}
            <div className="relative h-px bg-border my-6">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 right-0 bg-accent origin-left"
              />
            </div>
            {/* Year markers */}
            <div className="flex justify-between items-start">
              {uniqueYears.map((yr, i) => (
                <motion.div
                  key={yr}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-background -mt-[7px] relative z-10" />
                  <span className="text-xs font-mono text-accent mt-2">{yr}</span>
                  <span className="text-[10px] text-muted mt-0.5">
                    {i === 0 ? "Kickoff" : i === uniqueYears.length - 1 ? "Launch" : `Year ${i + 1}`}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ─── Story Chapters ─── */}
        {project.story.map((chapter, idx) => {
          /* Visual icon per chapter type */
          const phaseIcons: Record<string, React.ReactNode> = {
            "metrics": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
            "timeline": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            "flow": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="6.5" y1="8.5" x2="10.5" y2="15.5"/><line x1="17.5" y1="8.5" x2="13.5" y2="15.5"/></svg>,
            "grid": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
          };

          return (
            <Section key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Vertical connector */}
                {idx < project.story!.length - 1 && (
                  <div className="absolute left-5 top-full w-px h-16 sm:h-20 bg-border/50 hidden sm:block" />
                )}

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Phase label + year */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 mb-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        {phaseIcons[chapter.visual || "metrics"]}
                      </div>
                      <div>
                        <p className="text-xs font-mono text-accent uppercase tracking-widest">{chapter.phase.replace(/^\d+\s*—\s*/, "")}</p>
                        <p className="text-[10px] font-mono text-muted">{chapter.year}</p>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{chapter.title}</h2>

                    {/* Narrative */}
                    <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-2xl">{chapter.narrative}</p>

                    {/* Detail points */}
                    <div className="space-y-3">
                      {chapter.details.map((detail, di) => (
                        <motion.div
                          key={di}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: di * 0.04 }}
                          className="flex gap-3"
                        >
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                          <p className="text-sm text-foreground/70 leading-relaxed">{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Aside — Key Metrics with animated bar */}
                  {chapter.aside && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                      className="lg:w-64 shrink-0"
                    >
                      <div className="lg:sticky lg:top-32 space-y-3">
                        {chapter.aside.map((item, ai) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + ai * 0.08 }}
                            className="p-4 rounded-xl bg-surface border border-border relative overflow-hidden"
                          >
                            {/* Accent top bar */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/50" />
                            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-xl font-bold text-foreground">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Per-chapter visual decorators */}
                {chapter.visual === "metrics" && idx === project.story!.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
                  >
                    {chapter.aside?.map((m, mi) => (
                      <div key={mi} className="text-center p-5 rounded-2xl bg-accent/5 border border-accent/10">
                        <motion.p
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + mi * 0.1, type: "spring", stiffness: 200 }}
                          className="text-3xl sm:text-4xl font-bold text-accent mb-1"
                        >
                          {m.value}
                        </motion.p>
                        <p className="text-xs text-muted">{m.label}</p>
                      </div>
                    ))}

                  </motion.div>
                )}
              </motion.div>
            </Section>
          );
        })}

        {/* ─── Decision Records + Retro ─── */}
        {project.decisions && <DecisionsSection decisions={project.decisions} />}
        {project.retro && <RetroSection retro={project.retro} />}

      </main>
    );
  }

  /* ─── Default layout for other projects ─── */
  return (
    <main className="min-h-screen pt-24 sm:pt-32">
      {/* Back link */}
      <Section>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to projects
        </Link>

        {/* Hero */}
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-mono text-sm uppercase tracking-widest mb-4"
          >
            {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mb-10"
          >
            {project.heroDesc}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 text-xs font-mono rounded-full bg-surface border border-border text-muted">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Role Banner */}
          {project.role && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="mb-10 p-5 rounded-2xl bg-accent/5 border border-accent/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">Leadership Context</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Role</p>
                  <p className="text-sm font-semibold text-foreground">{project.role.title}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Scope</p>
                  <p className="text-xs text-foreground/70">{project.role.scope}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted uppercase tracking-wider mb-0.5">Team</p>
                  <p className="text-xs text-foreground/70">{project.role.team}</p>
                </div>
              </div>
            </motion.div>
          )}


        </div>
      </Section>

      {/* Challenge */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-3">The Challenge</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">{project.challenge}</p>
        </motion.div>
      </Section>

      {/* Approach */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">The Approach</h2>
          <div className="space-y-4">
            {project.approach.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4"
              >
                <span className="text-accent font-mono text-sm mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground/70 leading-relaxed">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Key Features */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-8">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-surface border border-border"
              >
                <h4 className="text-sm font-semibold text-foreground mb-2">{feat.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Impact */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest mb-6">The Impact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.impact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-4 rounded-xl bg-surface border border-border"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0 mt-0.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Decision Records + Retro (when available) */}
      {project.decisions && <DecisionsSection decisions={project.decisions} />}
      {project.retro && <RetroSection retro={project.retro} />}

    </main>
  );
}
