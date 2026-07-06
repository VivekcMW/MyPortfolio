import { StageMeta } from "./types";

/* ─── The 8 stages of the method ─── */

export const stages: StageMeta[] = [
  {
    num: "00",
    id: "signal",
    title: "Signal & Framing",
    eyebrow: "Most products die here",
    method:
      "Before anything is designed, the problem gets interrogated. What is the observed pain (not the requested feature)? Why is now the moment — what changed in technology, behavior, or market? And crucially: what would make us walk away? A problem framed as an outcome ('give back 45 minutes a day') survives contact with reality; a problem framed as a technology ('add AI') never does.",
    psychology: ["framing-effect", "survivorship-bias"],
    gate: [
      "The problem is observed in the wild, not inferred from a competitor's launch",
      "The 'why now' names a specific shift — not general enthusiasm",
      "Kill criteria are written before anyone is emotionally invested",
    ],
  },
  {
    num: "01",
    id: "prd",
    title: "PRD & Alignment",
    eyebrow: "Hypotheses, not specs",
    method:
      "The PRD is written as a falsifiable document: every requirement is a hypothesis with a measurement attached. Success metrics are outcomes users would notice, not outputs teams can game. Non-goals get equal billing with goals — what we refuse to build shapes the product more than what we accept. The document is short enough that everyone actually reads it, and signed hypotheses prevent the goal drift that kills projects in month four.",
    psychology: ["commitment-consistency", "goodharts-law"],
    gate: [
      "Every success metric has a measurement method named — no vanity metrics survive",
      "Non-goals are explicit and stakeholder-signed",
      "At least one kill criterion could realistically fire",
    ],
  },
  {
    num: "02",
    id: "research",
    title: "User Research",
    eyebrow: "Watch, don't ask",
    method:
      "Contextual inquiry over interviews, interviews over surveys — because the say–do gap is real and expensive. We watch actual work in actual workspaces, capture verbatims, and cluster observations into themes only after fieldwork ends (clustering early contaminates what you're able to see). Personas are built from behavioral patterns, not demographics — what people do under pressure, what they distrust, what they've silently abandoned.",
    psychology: ["say-do-gap", "mental-models"],
    gate: [
      "≥ 3 behavioral patterns replicate across independent participants",
      "Each persona names a specific distrust — trust design starts here",
      "The key insight surprises at least one stakeholder (if nothing surprised anyone, the research just confirmed biases)",
    ],
  },
  {
    num: "03",
    id: "psychology",
    title: "Psychology Mapping",
    eyebrow: "Findings become constraints",
    method:
      "This is the translation layer most teams skip: each research finding is mapped to the cognitive principle that explains it, and the principle generates a design constraint — a rule the design must obey regardless of aesthetics. 'Users over-trust fluent output' isn't a note in a report; it becomes 'confidence must be shown per claim and must be calibrated,' which every subsequent screen must satisfy. Constraints written here are cheaper than redesigns discovered in usability testing.",
    psychology: ["automation-bias", "hicks-law", "locus-of-control", "doherty-threshold"],
    gate: [
      "Every major finding maps to a named principle and a testable constraint",
      "Constraints are phrased so a designer can violate them detectably",
      "The constraint list fits on one page — more than ~8 and none get enforced",
    ],
  },
  {
    num: "04",
    id: "paradigm",
    title: "The Paradigm Gate",
    eyebrow: "Chat, dashboard, or no screen at all?",
    method:
      "The most consequential decision in modern product design, and it is not a style preference — it's a consequence of the research. Four questions decide it: Who holds the plan — the user or the system? Where does truth live — persistent visual state, conversation memory, or ambient context? What's the blast radius of a wrong action? And how mature is user trust in this domain? The same product built agentic, hybrid, traditional, or zero-UI is four different products. Choose deliberately, with a written verdict — then let the losing paradigms inform the roadmap.",
    psychology: ["mental-models", "locus-of-control", "automation-bias"],
    gate: [
      "The paradigm is derived from the decision matrix, not from what's fashionable",
      "The verdict names what each rejected paradigm contributes to the roadmap",
      "The choice is falsifiable — a metric is named that would prove it wrong",
    ],
  },
  {
    num: "05",
    id: "flows",
    title: "Architecture & Flows",
    eyebrow: "Design the failures first",
    method:
      "Red routes get wireflows before any screen gets pixels — and every flow is designed failure-first: what happens on ambiguity, latency, misrecognition, partial success? The happy path is easy; products earn trust in the branches. Information architecture follows the paradigm: agentic flows are approval loops, hybrid flows are diff-and-apply cycles, traditional flows are navigate-and-configure paths, zero-UI flows are risk-gated voice envelopes.",
    psychology: ["error-prevention", "progressive-disclosure", "recognition-recall"],
    gate: [
      "Every red route has explicit failure branches with recovery designed",
      "No flow step depends on the user remembering system state",
      "A new team member can trace any flow without a walkthrough",
    ],
  },
  {
    num: "06",
    id: "ui",
    title: "UI & System",
    eyebrow: "Tokens are claims with evidence",
    method:
      "Only now do pixels happen — and they happen as a system, not as screens. Tokens encode the psychology constraints from stage 03: contrast ratios that pass for the median eye, one accent per surface, motion in three speeds. Components are built once and themed; the paradigm decides the component vocabulary (plan cards and receipts for agentic, diff overlays for hybrid, signal grammar for hardware). Craft lives here — the micro-interactions that make the system feel inevitable.",
    psychology: ["hicks-law", "doherty-threshold", "peak-end"],
    gate: [
      "Every token value can be defended with a reason, not a preference",
      "The accessibility audit is live and computed, not claimed",
      "One deliberate peak moment exists per red route",
    ],
  },
  {
    num: "07",
    id: "ship",
    title: "Validate, Ship, Loop",
    eyebrow: "Metrics that can't lie",
    method:
      "Usability rounds validate the constraints (not the aesthetics), instrumentation ships with the feature (not after), and the metrics are chosen to resist Goodhart's law — time saved, not time spent; delegation depth, not chat volume. Launch is tiered: internal → design-partner cohort → percentage rollout, each tier with a named kill threshold. Then the loop closes: shipped behavior becomes next quarter's research signal, and the retro writes down what we'd do differently while it still stings.",
    psychology: ["goodharts-law", "peak-end", "commitment-consistency"],
    gate: [
      "Every launch tier has a kill threshold decided before launch day",
      "Novelty effect is discounted — no metric read before week 3",
      "The retro produces at least one change to this very process",
    ],
  },
];
