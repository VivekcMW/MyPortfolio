"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, Fragment } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowRight, Check, Circle, Code, Dot, Square, Zap, ChevronLeft, ChevronRight, ChevronDown, Webhook, ShieldCheck, RefreshCw } from "lucide-react";
import { tintText } from "@/lib/tint";

/* ─── Data ─── */

const pricingTiers = [
  { name: "Free", price: "$0", users: "500 configs", features: ["1 manifest", "Community support"], color: "#64748B" },
  { name: "Builder", price: "$99", users: "5K configs", features: ["3 manifests", "Email support", "Basic analytics"], color: "#06B6D4" },
  { name: "Growth", price: "$399", users: "50K configs", features: ["10 manifests", "Webhooks", "Priority support"], color: "#8B5CF6" },
  { name: "Enterprise", price: "$1,500-5,000", users: "Unlimited", features: ["SLA", "HIPAA BAA", "Dedicated success", "Self-hosted option"], color: "#F97316" },
];

const tamCircles = [
  { name: "SAM", value: "28K companies", arr: "$134M", desc: "B2B SaaS 5-500 eng, multi-segment" },
  { name: "TAM", value: "180K orgs", arr: "$2.1B", desc: "+ Vertical SaaS + Enterprise internal tools" },
  { name: "Long-tail", value: "1.2M apps", arr: "$14B", desc: "+ Every React app with user roles" },
];

const archLayers = [
  { level: 1, name: "Capability Manifest", short: "Manifest", color: "#6366F1", desc: "A structured JSON contract describing every action, data shape, view, and permission the app exposes. Written once by the developer, versioned forever.", details: ["Entities, fields, actions declared in reverse-DNS format", "Versioned with semver — breaking changes require manifest migration", "JSON Schema validated with IDE autocomplete"] },
  { level: 2, name: "AI Compiler", short: "Compiler", color: "#8B5CF6", desc: "User describes their workflow in natural language. Compiler runs once → produces a versioned JSON config stored in Redis.", details: ["Constrained decoding ensures structurally valid JSON output", "98% valid first try, 99.7% after one retry loop", "Only emits configs referencing declared manifest fields"] },
  { level: 3, name: "Sandboxed Runtime", short: "Runtime", color: "#EC4899", desc: "A secure React component tree that renders the compiled config — typed props only, no DOM escape.", details: ["No eval, no Function, no dynamic imports", "JSONata-lite expression language — typed, no I/O, no window access", "<60KB gzipped per view, SSR-compatible"] },
  { level: 4, name: "Middleware Hooks", short: "Hooks", color: "#F59E0B", desc: "User-scoped middleware: custom filtering, routing rules, notification conditions in a restricted sandbox.", details: ["Hook points: on_email_receive, on_order_created, on_label_applied", "200ms timeout, 32MB memory limit per execution", "Can only call actions declared in the manifest"] },
  { level: 5, name: "Version Contract", short: "Contract", color: "#10B981", desc: "When the app ships an update, the system diffs old vs new manifest, auto-migrates deterministic changes, flags the rest.", details: ["Semantic diff engine — not string diff, semantic field mapping", "Auto-migrate at ≥0.85 confidence threshold", "7-day compatibility window — zero broken interfaces"] },
];

const archFlowSteps = [
  { label: "Manifest", tagline: "Capability contract", icon: Code, color: "#6366F1" },
  { label: "Compiler", tagline: "Constrained decoding", icon: Zap, color: "#8B5CF6" },
  { label: "Runtime", tagline: "Sandboxed render", icon: Square, color: "#EC4899" },
  { label: "Hooks", tagline: "Middleware · routing", icon: Webhook, color: "#F59E0B" },
  { label: "Contract", tagline: "Auto-migration", icon: ShieldCheck, color: "#10B981" },
];

const packages = [
  { name: "@forma/schema", tier: 0, desc: "Manifest spec & validation", deps: [], color: "#6366F1" },
  { name: "@forma/types", tier: 0, desc: "Shared TypeScript types", deps: [], color: "#818CF8" },
  { name: "@forma/runtime", tier: 1, desc: "Core rendering engine", deps: ["schema"], color: "#EC4899" },
  { name: "@forma/runtime-react", tier: 1, desc: "React bindings", deps: ["runtime"], color: "#F472B6" },
  { name: "@forma/react", tier: 2, desc: "536 components, 48 categories", deps: ["runtime-react"], color: "#06B6D4" },
  { name: "@forma/packs-crm", tier: 3, desc: "CRM domain pack", deps: ["react"], color: "#F97316" },
  { name: "@forma/packs-analytics", tier: 3, desc: "Analytics domain pack", deps: ["react"], color: "#F59E0B" },
  { name: "@forma/packs-helpdesk", tier: 3, desc: "Helpdesk domain pack", deps: ["react"], color: "#10B981" },
  { name: "@forma/packs-charts", tier: 3, desc: "D3-powered charts", deps: ["react"], color: "#8B5CF6" },
  { name: "@forma/cli", tier: 0, desc: "7 commands: init, dev, validate, migrate, publish, introspect, doctor", deps: ["schema"], color: "#64748B" },
  { name: "@forma/devtools", tier: 0, desc: "Browser extension & React component", deps: [], color: "#94A3B8" },
  { name: "@forma/testing", tier: 0, desc: "Mock data sources, MSW handlers, ManifestBuilder", deps: ["schema"], color: "#A855F7" },
];

const packageTiers = [
  { tier: 0, label: "Core Foundation", note: "No internal deps — the ground floor" },
  { tier: 1, label: "Runtime", note: "Builds on the manifest contract" },
  { tier: 2, label: "UI Layer", note: "Renders through the runtime" },
  { tier: 3, label: "Domain Packs", note: "Ship on top of @forma/react" },
];

const domainCategories = [
  { name: "Health & Life", count: 21, color: "#10B981" },
  { name: "Science & Research", count: 24, color: "#A855F7" },
  { name: "Engineering & Industry", count: 43, color: "#F97316" },
  { name: "Transport & Mobility", count: 13, color: "#06B6D4" },
  { name: "Commerce & Trade", count: 34, color: "#F59E0B" },
  { name: "Government & Civic", count: 23, color: "#64748B" },
  { name: "People & Education", count: 18, color: "#EC4899" },
  { name: "Media & Arts", count: 20, color: "#F43F5E" },
  { name: "Legal & Compliance", count: 13, color: "#6366F1" },
  { name: "Agriculture & Food", count: 14, color: "#84CC16" },
  { name: "Real Estate & Property", count: 11, color: "#0EA5E9" },
  { name: "Frontier & Emerging", count: 13, color: "#2DD4BF" },
];

const personas = [
  { title: "Priya Sharma", role: "Sales VP", company: "Series B SaaS (200 emp)", pain: "Needs a forecast dashboard that shows pipeline by region, rep, and product line — she's built 3 in Excel this quarter alone.", color: "#6366F1" },
  { title: "Dr. Marcus Chen", role: "Computational Biologist", company: "Genomics Startup (50 emp)", pain: "Every new assay generates a unique data shape — he needs a new analysis UI every 3 days.", color: "#8B5CF6" },
  { title: "Sarah Mitchell", role: "VP of Product", company: "Mid-Market SaaS (300 emp)", pain: "50 enterprise customers each want their own interface variant — burning 40% of eng capacity on view customization.", color: "#EC4899" },
  { title: "Carlos Mendez", role: "ICU Nurse Manager", company: "Regional Hospital (1,200 beds)", pain: "EHR alerts fire at 47 per hour — he needs a filtered, role-specific view of critical alerts only.", color: "#10B981" },
  { title: "Emily Zhao", role: "Staff Engineer", company: "Big SaaS (5,000 emp)", pain: "Her team maintains 12 separate view configurations for the same data model — each one a fragile fork.", color: "#F59E0B" },
  { title: "James Okonkwo", role: "CTO", company: "Seed-stage Startup (15 emp)", pain: "His 3 frontend engineers are the bottleneck — every feature needs a new view.", color: "#F97316" },
];

const designDecisions = [
  { decision: "Open-Core Model", choice: "MIT for schema/runtime/primitives; closed-source compiler + flagship packs", why: "The compiler is the moat — it improves with every customer's training signal. Same play as Vercel (Next.js OSS, deploy infra closed).", color: "#6366F1" },
  { decision: "CRM-First Wedge", choice: "Only @forma/packs-crm until it reaches $50K ARR", why: "CRM has the most complex entity graph. If the manifest handles CRM, it handles everything.", color: "#F97316" },
  { decision: "Never Proxy Data", choice: "Sandbox calls the host app's own API with the user's own auth token", why: "Forma never holds PII, PHI, or any customer data. The security conversation becomes: 'We never touch your data.'", color: "#10B981" },
  { decision: "Typed Props Only", choice: "No className, no style, no dangerouslySetInnerHTML in sandbox components", why: "The compiler can only produce configs referencing declared capabilities. Makes the system accessible by construction.", color: "#EC4899" },
  { decision: "Compile Once, Cache Forever", choice: "LLM call happens once per user per view; config stored in Redis; subsequent renders are 5ms lookups", why: "The 2-5s LLM latency is a one-time cost per user per view. Pricing is per compile-call ceiling, not per user.", color: "#F59E0B" },
  { decision: "Framework-Agnostic Core", choice: "@forma/runtime is pure TypeScript; React bindings are a thin adapter", why: "React is the install path (95% of B2B SaaS frontends), not the bet. Vue/Svelte/Solid adapters are 6-week ports each.", color: "#8B5CF6" },
];

const useCases = [
  { id: "crm", title: "CRM — Sales Pipeline Customization", color: "#6366F1", summary: "A Series B CRM company with 200 employees and 50 enterprise customers. Each customer wants a different pipeline view. Before Forma: 6-week custom dashboard builds. After Forma: user describes their workflow once, AI compiles a config, sandboxed runtime renders it instantly.", transformation: ["Before: 40% of frontend sprint capacity spent on interface variation", "After: interface variation costs zero engineering time", "Before: 6-week wait for a custom view", "After: 30 seconds from request to rendered interface"], metrics: [{ label: "Frontend capacity recovered", value: "40%" }, { label: "Time to custom view", value: "30s" }, { label: "Customer NPS impact", value: "+28" }] },
  { id: "healthcare", title: "Healthcare — EHR Alert Triage", color: "#10B981", summary: "A regional hospital with 1,200 beds runs an EHR that fires 47 alerts per hour per nurse. Before Forma: IT quotes a $200K professional services engagement to customize views. After Forma: the manifest declares all alert types; each role compiles their own filtered triage view.", transformation: ["Before: 47 alerts/hour/nurse — alert fatigue causes missed criticals", "After: role-filtered views reduce alert noise by 78%", "Before: $200K PS engagement for view customization", "After: self-serve config, zero professional services cost"], metrics: [{ label: "Alert noise reduction", value: "78%" }, { label: "Critical alert response", value: "-62%" }, { label: "IT tickets for view changes", value: "→ 0" }] },
];

const manifestCode = `{
  "name": "com.acmecorp.crm",
  "version": "1.2.0",
  "entities": {
    "deal": {
      "fields": [{ "name": "id", "type": "string" }, { "name": "name", "type": "string" }, { "name": "value", "type": "currency", "currency": "USD" }, { "name": "stage", "type": "enum", "values": ["discovery","proposal","negotiation","closed_won","closed_lost"] }, { "name": "owner", "type": "reference", "entity": "user" }],
      "actions": [{ "name": "move_stage", "params": { "stage": "enum" } }, { "name": "assign_owner", "params": { "user_id": "string" } }],
      "permissions": ["sales_rep: move_stage, assign_owner", "sales_vp: + delete, close_won"]
    }
  }
}`;

const userConfigCode = `{
  "view": "pipeline", "entity": "deal",
  "type": "kanban", "groupBy": "stage",
  "sortBy": "value", "sortOrder": "desc",
  "columns": ["name","value","probability","owner"],
  "filters": [{ "field": "stage", "op": "neq", "value": "closed_lost" }],
  "highlights": [{ "field": "closed_at", "op": "before", "value": "+7d", "style": { "dot": true } }]
}`;

export default function FormaResearchPage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeUseCase, setActiveUseCase] = useState("crm");
  const currentUseCase = useCases.find((u) => u.id === activeUseCase) || useCases[0];

  return (
    <div className="pt-24">
      {/* ════════════════════════════════════════ */}
      {/* 1. HERO + ARCHITECTURE OVERVIEW        */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Research · Architecture · Design</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                The <span className="text-accent">Forma</span> Project.
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-8">
                Infrastructure for malleable software — the full-stack platform that lets SaaS companies ship one product that feels custom-built for every user.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden max-w-3xl mx-auto">
              {[{ value: "16", label: "Packages" }, { value: "1,600+", label: "Components" }, { value: "360", label: "Domains Researched" }, { value: "5", label: "Architecture Layers" }].map((s) => (
                <div key={s.label} className="bg-background p-6">
                  <div className="text-2xl md:text-3xl font-heading font-bold">{s.value}</div>
                  <p className="text-xs font-mono text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 5-Layer Stack + Open-Core */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-2 max-w-3xl mx-auto mb-4">
              {[{ name: "Manifest", color: "#6366F1", desc: "Contract" }, { name: "Compiler", color: "#8B5CF6", desc: "Intent→Config" }, { name: "Runtime", color: "#EC4899", desc: "Sandboxed Render" }, { name: "Hooks", color: "#F59E0B", desc: "Middleware" }, { name: "Contract", color: "#10B981", desc: "Migration" }].map((layer) => (
                <div key={layer.name} className="text-center">
                  <div className="h-1.5 sm:h-2 rounded-full mb-1.5 sm:mb-2" style={{ backgroundColor: layer.color }} />
                  <p className="text-[9px] sm:text-[11px] font-bold text-foreground leading-tight">{layer.name}</p>
                  <p className="text-[7px] sm:text-[9px] font-mono text-muted">{layer.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-6 text-[9px] sm:text-xs font-mono">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#10B981]" />
                <span className="text-muted">OSS (MIT)</span><span className="text-muted">·</span><span className="text-foreground">12 packages</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#F59E0B]" />
                <span className="text-muted">Closed</span><span className="text-muted">·</span><span className="text-foreground">Compiler + Packs</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-accent font-semibold">360</span><span className="text-muted">domains</span>
              </div>
            </div>
          </motion.div>

          {/* End-to-End Flow */}
          <div className="flex items-center justify-center gap-1 sm:gap-3 mb-6 flex-wrap text-[10px] sm:text-xs font-mono">
            {[
              { label: "Developer", icon: ChevronLeft, color: "#6366F1" },
              { label: "Manifest", icon: Code, color: "#8B5CF6" },
              { label: "AI Compiler", icon: Zap, color: "#EC4899" },
              { label: "Runtime", icon: Square, color: "#06B6D4" },
              { label: "User", icon: ChevronRight, color: "#10B981" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-1 sm:gap-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg border" style={{ borderColor: step.color + "30", backgroundColor: step.color + "08" }}>
                  <step.icon size={12} style={{ color: tintText(step.color) }} />
                  <span className="text-foreground font-semibold text-[10px] sm:text-xs">{step.label}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight size={14} className="text-muted shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* ARCHITECTURE FLOW — CARD STRIP        */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Architecture Flow" title="From intent to interface." description="How Forma's 5-layer stack processes a developer's manifest and user intent into a secure, personalized interface — recompiled continuously as either one changes." />

          <div className="flex items-center justify-between mb-4 px-1 text-[11px] sm:text-xs font-mono">
            <span className="text-foreground font-semibold">User intent</span>
            <span className="text-foreground font-semibold text-right">Personalized interface</span>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2">
            {archFlowSteps.map((step, i) => (
              <Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex-1 p-5 rounded-2xl border"
                  style={{ borderColor: step.color + "25", backgroundColor: step.color + "04" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border shrink-0"
                      style={{ borderColor: step.color + "30", color: tintText(step.color), backgroundColor: step.color + "10" }}
                    >
                      0{i + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: step.color + "15" }}>
                      <step.icon size={16} style={{ color: tintText(step.color) }} />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{step.label}</h4>
                  <p className="text-[11px] font-mono text-muted leading-relaxed">{step.tagline}</p>
                </motion.div>
                {i < archFlowSteps.length - 1 && (
                  <ChevronRight size={18} className="text-muted shrink-0 self-center rotate-90 lg:rotate-0" />
                )}
              </Fragment>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6 text-[11px] sm:text-xs font-mono text-muted"
          >
            <RefreshCw size={12} className="text-accent" />
            <span>360° continuous — recompiles automatically on every manifest change</span>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 2. THE THESIS                          */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="The Genesis" title="Software should take your shape." description="Before AI, every user got the same interface. Enterprise software required forward-deployed engineers at enormous cost. Forma changes that." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-bold mb-3 text-foreground">The One-Size-Fits-All Trap</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex gap-3"><ArrowRight size={14} className="text-accent shrink-0 mt-0.5" /><span>Every B2B SaaS company builds role-based views from scratch, badly, forever.</span></li>
                <li className="flex gap-3"><ArrowRight size={14} className="text-accent shrink-0 mt-0.5" /><span>#1 churn reason in B2B SaaS: &ldquo;Doesn&apos;t fit our workflow&rdquo; — not price, not bugs.</span></li>
                <li className="flex gap-3"><ArrowRight size={14} className="text-accent shrink-0 mt-0.5" /><span>30-40% of frontend engineering sprint capacity goes to interface variation.</span></li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-bold mb-3" style={{ color: tintText("#10B981") }}>The Forma Thesis</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex gap-3"><Check size={14} className="text-hue-green shrink-0 mt-0.5" /><span>Software companies ship capabilities (manifests), not fixed interfaces.</span></li>
                <li className="flex gap-3"><Check size={14} className="text-hue-green shrink-0 mt-0.5" /><span>Users describe their workflow once. The AI compiler produces a stable, versioned config.</span></li>
                <li className="flex gap-3"><Check size={14} className="text-hue-green shrink-0 mt-0.5" /><span>App updates don&apos;t break user interfaces — version contract auto-migrates configs.</span></li>
              </ul>
            </motion.div>
          </div>
          <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 p-8 rounded-2xl border-l-4 border-accent bg-surface/50" style={{ borderLeftColor: "var(--color-accent)" }}>
            <p className="text-lg md:text-xl italic text-muted leading-relaxed">&ldquo;In the future, software companies will ship shared primitives with the full intention that users will heavily modify the final interfaces. Coding agents have reached the quality threshold where every user can be their own forward-deployed engineer.&rdquo;</p>
            <p className="mt-4 text-sm font-mono text-accent">— Y Combinator Research Thesis, 2026</p>
          </motion.blockquote>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 3. CORE ARCHITECTURE                   */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Architecture" title="The 5-Layer Stack." description="Forma is organized as five distinct layers — each independently versioned, each with a clear contract. Open-core: schema, runtime, and primitives are MIT-licensed; the compiler and flagship packs are closed-source." />
          <div className="space-y-4">
            {archLayers.map((layer, i) => {
              const isActive = activeLayer === i;
              return (
                <motion.div key={layer.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer" style={{ borderColor: isActive ? layer.color + "50" : "var(--color-border)", backgroundColor: isActive ? layer.color + "06" : "var(--color-surface)" }} onClick={() => setActiveLayer(isActive ? null : i)}>
                  <div className="p-5 sm:p-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: layer.color + "20", color: tintText(layer.color) }}>{layer.level}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">{layer.name}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: layer.color + "30", color: tintText(layer.color), backgroundColor: layer.color + "10" }}>{layer.short}</span>
                      </div>
                      <p className="text-sm text-muted mt-1">{layer.desc}</p>
                    </div>
                    <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-muted shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-border/50">
                          <ul className="space-y-2 mt-4">
                            {layer.details.map((d, j) => (
                              <li key={j} className="flex gap-2 text-sm text-muted">
                                <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Package Graph — tiered dependency stack */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Package Architecture</h3>
            <p className="text-muted mb-6 max-w-2xl">16 packages across 4 tiers — open-core with MIT-licensed schema/runtime and closed-source compiler/flagship packs. Each tier only depends on the one below it.</p>
            <div className="space-y-0">
              {packageTiers.map((band, bandIndex) => {
                const items = packages.filter((pkg) => pkg.tier === band.tier);
                return (
                  <Fragment key={band.tier}>
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: bandIndex * 0.1 }} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted shrink-0">Tier {band.tier}</span>
                        <h4 className="text-sm font-bold text-foreground">{band.label}</h4>
                        <span className="text-xs text-muted font-mono ml-auto shrink-0">{items.length} pkgs</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((pkg) => (
                          <div key={pkg.name} className="p-3 rounded-xl border text-sm" style={{ borderColor: pkg.color + "25", backgroundColor: pkg.color + "06" }}>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: pkg.color }} />
                              <span className="font-mono text-xs font-semibold text-foreground">{pkg.name}</span>
                            </div>
                            <p className="text-[11px] text-muted">{pkg.desc}</p>
                            {pkg.deps.length > 0 && <p className="text-[10px] text-muted mt-1 font-mono">depends on: {pkg.deps.join(", ")}</p>}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted font-mono mt-4">{band.note}</p>
                    </motion.div>
                    {bandIndex < packageTiers.length - 1 && (
                      <div className="flex justify-center py-1.5">
                        <ChevronDown size={16} className="text-muted" />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 4. COMPONENTS + DOMAINS                */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Component Catalog" title={`${domainCategories.reduce((s, c) => s + c.count, 0)}+ Components.`} description="A curated library of 1,600+ components across 48 categories — tree-shakeable, per-component deep imports, bundle-size CI gate." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {domainCategories.map((cat) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-3 rounded-xl border border-border bg-surface text-center">
                <div className="text-lg font-bold" style={{ color: tintText(cat.color) }}>{cat.count}</div>
                <p className="text-xs text-muted mt-1">{cat.name}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 p-5 rounded-2xl border border-border bg-surface">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">Per-Component Deep Imports</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Every component is individually importable via <code className="text-accent text-[10px]">@forma/react/table</code>, <code className="text-accent text-[10px]">@forma/react/kanban</code>, etc. 879 deep-import paths configured. Bundle-size CI gate on every PR — target: &lt;60KB gzipped per view.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 5. DESIGN DECISIONS                    */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Design Decisions" title="The key choices that shaped Forma." description="Every architecture is a set of tradeoffs. Here are the most consequential decisions made during Forma's design." />
          <div className="space-y-4">
            {designDecisions.map((d, i) => (
              <motion.div key={d.decision} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 sm:p-6 rounded-2xl border" style={{ borderColor: d.color + "20", backgroundColor: d.color + "04" }}>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: d.color }} />
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">{d.decision}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: d.color + "15", color: tintText(d.color) }}>{d.choice}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{d.why}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 6. USE CASES + MARKET                  */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Use Cases" title="Real scenarios. Real transformation." description="In-depth use cases showing how Forma transforms software across CRM and Healthcare — with concrete before/after comparisons and measurable outcomes." />
          <div className="flex flex-wrap gap-2 mb-8">
            {useCases.map((uc) => (
              <motion.button key={uc.id} onClick={() => setActiveUseCase(uc.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200" style={{ backgroundColor: activeUseCase === uc.id ? uc.color + "15" : "var(--color-surface)", borderColor: activeUseCase === uc.id ? uc.color + "35" : "var(--color-border)", color: activeUseCase === uc.id ? tintText(uc.color) : "var(--color-muted)", borderWidth: 1, borderStyle: "solid" }}>
                {uc.title.split(" —")[0]}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={currentUseCase.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="p-6 sm:p-8 rounded-2xl border mb-6" style={{ borderColor: currentUseCase.color + "25", backgroundColor: currentUseCase.color + "04" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: tintText(currentUseCase.color) }}>{currentUseCase.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-3xl">{currentUseCase.summary}</p>
              </div>
              <div className="space-y-2 mb-6">
                {currentUseCase.transformation.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-surface">
                    <span className="shrink-0 mt-0.5" style={{ color: tintText(currentUseCase.color) }}>
                      {t.startsWith("Before") ? <ChevronLeft size={14} /> : t.startsWith("After") ? <ChevronRight size={14} /> : <Dot size={14} />}
                    </span>
                    <span className="text-xs text-muted">{t}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentUseCase.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-xl text-center border" style={{ borderColor: currentUseCase.color + "20", backgroundColor: currentUseCase.color + "06" }}>
                    <div className="text-xl font-heading font-bold" style={{ color: tintText(currentUseCase.color) }}>{m.value}</div>
                    <p className="text-[10px] text-muted mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Market + Pricing */}
          <div className="mt-16">
            <SectionHeader eyebrow="Market Analysis" title="Cost, pricing & market size." description="Forma's GTM is developer-led, bottoms-up — the same motion as Stripe, Vercel, and Twilio. Pricing is tiered for land-and-expand." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {tamCircles.map((circle, i) => (
                <motion.div key={circle.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-6 rounded-2xl border border-border bg-surface text-center overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#EC4899" }} />
                  <div className="relative">
                    <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: tintText(i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#EC4899") }}>{circle.name}</p>
                    <div className="text-xl font-bold text-foreground">{circle.value}</div>
                    <div className="text-2xl font-heading font-bold mt-1" style={{ color: tintText(i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#EC4899") }}>{circle.arr}</div>
                    <p className="text-[10px] text-muted mt-2">{circle.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-4">Pricing Model</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {pricingTiers.map((tier) => (
                <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-5 rounded-2xl border bg-surface" style={{ borderColor: tier.color + "25" }}>
                  <h4 className="text-sm font-bold text-foreground">{tier.name}</h4>
                  <div className="text-2xl font-heading font-bold my-2" style={{ color: tintText(tier.color) }}>{tier.price}</div>
                  <p className="text-[10px] font-mono text-muted mb-3">/month · {tier.users}</p>
                  <ul className="space-y-1.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0" style={{ color: tintText(tier.color) }}><polyline points="20 6 9 17 4 12" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 7. CURRENT STATUS + LINKS              */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Current Status" title="Where Forma is today." description="June 2026 snapshot: the monorepo is scaffolded with 16 packages, 6 apps, and a locked manifest v1 spec. Component library, domain packs, CLI, and devtools are live." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/05">
              <h4 className="text-sm font-bold text-hue-green mb-3 flex items-center gap-1.5"><Check size={14} /> Built</h4>
              <ul className="space-y-2">
                {["Manifest spec v1 LOCKED (June 3, 2026)", "16 packages scaffolded", "@forma/react: 536 components across 48 categories", "4 domain packs: CRM, Analytics, Helpdesk, Charts-D3", "6 apps: Website, Playground, Docs, Studio, Storybook, E2E", "CLI with 7 commands", "Devtools browser extension + React component", "Testing utilities: mock data, MSW handlers, ManifestBuilder", "879 deep-import paths configured", "100+ strategy documents"].map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-muted"><Check size={12} className="text-hue-green shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/05">
              <h4 className="text-sm font-bold text-hue-amber mb-3 flex items-center gap-1.5"><Circle size={14} /> In Progress / Next</h4>
              <ul className="space-y-2">
                {["Manifest registry API (Go service)", "AI compiler service (Python/FastAPI)", "Version contract management dashboard", "Changesets + npm publishing pipeline", "Per-component build output", "Third-party security audit (NCC Group / Trail of Bits)", "E2E test suite completion", "3 design partner commitments", "First paying customer ($500/mo target)", "@forma/scientific package family"].map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-muted"><Circle size={12} className="text-hue-amber shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Personas Grid */}
          <SectionHeader eyebrow="Personas" title="Who Forma serves." description="Six distinct user personas — each represents a different buying center, a different pain, and a different Forma entry point." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {personas.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-5 rounded-2xl border border-border bg-surface">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: p.color + "20", color: tintText(p.color) }}>{p.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="text-[10px] font-mono" style={{ color: tintText(p.color) }}>{p.role}</p>
                  </div>
                </div>
                <p className="text-[10px] font-mono text-muted mb-2">{p.company}</p>
                <p className="text-xs text-muted leading-relaxed">{p.pain}</p>
              </motion.div>
            ))}
          </div>

          {/* Links */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Dive into the <span className="text-accent">Forma ecosystem.</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Live Website", href: "https://forma.dev", desc: "Marketing site with interactive demo", color: "#06B6D4" },
                { label: "Playground", href: "https://forma.dev/playground", desc: "Live manifest editor + preview", color: "#8B5CF6" },
                { label: "GitHub", href: "https://github.com/vivekanand/forma-design-system", desc: "Monorepo with 16 packages", color: "#64748B" },
                { label: "Storybook", href: "https://forma.dev/storybook", desc: "1,100+ component stories", color: "#F43F5E" },
                { label: "Manifest Spec", href: "https://forma.dev/docs/manifest-spec", desc: "Full v1 specification", color: "#F97316" },
                { label: "CLI Docs", href: "https://forma.dev/docs/cli", desc: "npx @forma/cli init", color: "#10B981" },
              ].map((link, i) => (
                <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group p-5 rounded-2xl border border-border bg-surface hover:border-accent/20 transition-all duration-300 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: link.color }} />
                    <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{link.label}</span>
                  </div>
                  <p className="text-xs text-muted">{link.desc}</p>
                </motion.a>
              ))}
            </div>
            
            {/* CTA to DS Lab */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center"
            >
              <p className="text-sm text-muted mb-4">
                Interested in multi-platform design systems?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/design-system-v2"
                  className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
                >
                  Multi-Platform Design System — 10+ platforms
                </a>
                <a
                  href="/design-system-v2/platforms"
                  className="px-5 py-2.5 rounded-xl bg-surface-hover border border-border text-sm font-medium text-foreground hover:border-accent/30 transition-colors"
                >
                  Platform Adapters
                </a>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-xs font-mono text-muted">Forma — Software that takes your shape.</motion.p>
          </div>
        </div>
      </Section>
    </div>
  );
}
