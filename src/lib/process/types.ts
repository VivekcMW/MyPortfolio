/* ─────────────────────────────────────────────────────────────
   /process — types for the Idea→Shipped method page
────────────────────────────────────────────────────────────── */

export type Paradigm = "agentic" | "hybrid" | "traditional" | "zero-ui";

export interface Principle {
  id: string;
  name: string;
  definition: string;
}

export interface PatternEntry {
  name: string;
  desc: string;
}

export interface MetricEntry {
  label: string;
  desc: string;
}

export interface FlowStep {
  id: string;
  label: string;
  desc: string;
  kind: "start" | "step" | "decision" | "failure" | "end";
  /** Failure/alternate branches attached to this step */
  branches?: { label: string; desc: string }[];
}

export interface ParadigmVariant {
  slug: Paradigm;
  name: string;
  tagline: string;
  /** Who holds the plan / where truth lives / blast-radius tolerance */
  model: string;
  holdsPlan: string;
  truthLives: string;
  patterns: PatternEntry[];
  failureModes: string[];
  /** Principle ids from principles.ts */
  psychology: string[];
  metrics: MetricEntry[];
  chooseWhen: string[];
  weakness: string;
  flow: FlowStep[];
}

export type MatrixScore = 0 | 1 | 2; // 0 = poor fit, 1 = workable, 2 = strong fit

export interface MatrixCriterion {
  criterion: string;
  detail: string;
  scores: Record<Paradigm, MatrixScore>;
}

export interface PsychologyMapping {
  principleId: string;
  finding: string;
  constraint: string;
  decision: string;
}

export interface Persona {
  name: string;
  label: string;
  quote: string;
  behaviors: string[];
  needs: string[];
  distrust: string;
}

export interface StageMeta {
  num: string;
  id: string;
  title: string;
  eyebrow: string;
  method: string;
  /** Principle ids surfaced in this stage */
  psychology: string[];
  /** Kill criteria — what must be true to proceed */
  gate: string[];
}
