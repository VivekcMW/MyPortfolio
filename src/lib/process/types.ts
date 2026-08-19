/* ─────────────────────────────────────────────────────────────
   /process — types for the Idea→Shipped method page
────────────────────────────────────────────────────────────── */

export interface Principle {
  id: string;
  name: string;
  definition: string;
}

export interface StageMeta {
  num: string;
  id: string;
  title: string;
  eyebrow: string;
  industryLabel: string; // Recruiter-friendly UX label
  methodTags: string[]; // Qualitative, Quantitative, Workshop, etc.
  method: string;
  /** Principle ids surfaced in this stage */
  psychology: string[];
  /** Kill criteria — what must be true to proceed */
  gate: string[];
  /** Real shipped work that demonstrates this stage */
  caseStudy: { label: string; href: string };
}
