import Link from "next/link";
import { Section } from "@/components/Section";
import { stages } from "@/lib/process/stages";
import { getPrinciple } from "@/lib/process/principles";
import {
  Sparkles, FileText, Users, Brain, Workflow, Palette, Rocket,
  Check, ArrowUpRight, ArrowRight, CircleDot,
} from "lucide-react";

const stageIcons: Record<string, typeof Sparkles> = {
  signal: Sparkles, prd: FileText, research: Users, psychology: Brain,
  flows: Workflow, ui: Palette, ship: Rocket,
};

function StageSection({ stage }: Readonly<{ stage: (typeof stages)[number] }>) {
  const Icon = stageIcons[stage.id] ?? CircleDot;

  return (
    <Section>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-xs font-mono text-accent uppercase tracking-widest">
            Stage {stage.num} — {stage.eyebrow}
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">{stage.title}</h2>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-sm text-primary font-semibold uppercase tracking-wide">
            {stage.industryLabel}
          </span>
          <span className="text-muted">·</span>
          <span className="text-xs text-muted">{stage.methodTags.join(" · ")}</span>
        </div>

        <p className="text-muted leading-relaxed mb-6">{stage.method}</p>

        {/* Psychology principles */}
        <div className="mb-6">
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2">
            Psychology applied
          </p>
          <div className="space-y-2">
            {stage.psychology.map((pid) => {
              const p = getPrinciple(pid);
              return (
                <div key={pid} className="text-sm">
                  <span className="font-semibold text-foreground">{p.name}</span>
                  <span className="text-muted"> — {p.definition}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exit gate */}
        <div className="rounded-2xl bg-surface border border-border p-5 mb-6">
          <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
            Exit gate — what must be true to proceed
          </p>
          <ul className="space-y-2">
            {stage.gate.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                {g}
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence */}
        <Link
          href={stage.caseStudy.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
        >
          See it shipped — {stage.caseStudy.label}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}

export default function ProcessPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
            The Process
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            From idea to shipped.
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4">
            The method I run on every product: frame the problem, write a falsifiable brief,
            go watch real users, map findings to psychology, design the architecture and
            failure paths, build the system, then validate and ship with metrics that resist
            gaming.
          </p>
          <p className="text-xs font-mono text-muted">
            7 stages · every stage has a written exit gate · every stage links to real shipped work
          </p>
        </div>
      </Section>

      {stages.map((stage) => (
        <StageSection key={stage.id} stage={stage} />
      ))}

      {/* Closing CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">This is the method, applied.</h2>
          <p className="text-muted leading-relaxed mb-8">
            Every stage above is demonstrated in shipped, real-world work — not a hypothetical.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/work"
              className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-1.5"
            >
              View Case Studies
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-surface-hover border border-border text-sm font-medium text-foreground hover:border-accent/30 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
