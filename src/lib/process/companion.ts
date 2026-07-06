import { Persona, PsychologyMapping } from "./types";

/* ─────────────────────────────────────────────────────────────
   "Companion" — the running example.
   A generative AI workspace assistant for millions of knowledge
   workers' daily work. Fictional teaching artifact — designed
   openly so every stage of the method can show a real deliverable.
────────────────────────────────────────────────────────────── */

export const companion = {
  name: "Companion",
  oneLiner:
    "A generative AI workspace assistant that summarizes, drafts, retrieves, and automates the repetitive 40% of knowledge work.",

  prd: {
    problem:
      "Knowledge workers lose 2.1 hours/day to low-leverage work: summarizing threads, drafting routine documents, hunting for information across tools, and repeating multi-step chores. Existing AI assistants are trusted for trivia but not for work — 68% of surveyed users verify every AI output manually, erasing the time saved.",
    hypothesis:
      "If Companion produces verifiable output (sources attached, diffs previewed) at conversational latency, users will delegate progressively larger tasks — and daily active delegation, not chat volume, will compound into retention.",
    successMetrics: [
      "≥ 45 min/day median time returned (measured, not self-reported)",
      "Trust-calibration gap < 10% (user confidence vs. actual accuracy)",
      "≥ 60% of AI actions accepted without edit by week 4",
      "D30 retention ≥ 40% among users who delegated ≥ 3 task types",
    ],
    nonGoals: [
      "Not a general chatbot — no open-domain conversation",
      "Not autonomous by default — autonomy is earned per task category",
      "No engagement-time targets — we optimize time saved, not time spent",
    ],
    killCriteria: [
      "If < 30% of pilot users delegate a second task type by week 2 → the delegation model is wrong, stop and reframe",
      "If verification time exceeds 50% of generation time saved → output trust is broken, no UI can fix it",
      "If p95 first-token latency > 2s under load → the conversational model collapses; renegotiate scope",
    ],
  },

  personas: [
    {
      name: "Priya",
      label: "The Skeptic — Senior Analyst",
      quote: "I've been burned. It cited a report that didn't exist.",
      behaviors: [
        "Verifies every AI output against source documents",
        "Uses AI for first drafts only, never for numbers",
        "Keeps a private list of AI failures to justify her distrust",
      ],
      needs: [
        "Sources attached to every claim, one click away",
        "Visible confidence signals that are actually calibrated",
        "An easy way to correct output and see the correction stick",
      ],
      distrust: "Fluent hallucinations — confident prose with fabricated facts.",
    },
    {
      name: "Marcus",
      label: "The Power User — Ops Lead",
      quote: "I don't want to chat. I want it done before I ask.",
      behaviors: [
        "Builds elaborate prompt templates and shares them with his team",
        "Chains tools together; hits every rate limit",
        "Abandons any assistant that can't be scripted or scheduled",
      ],
      needs: [
        "Repeatable, schedulable delegations — not conversations",
        "An autonomy dial: from suggest-only to fully automatic",
        "Receipts — a ledger of what ran, what changed, what it cost",
      ],
      distrust: "Systems that make him re-explain context every session.",
    },
    {
      name: "Elena",
      label: "The Overwhelmed Novice — Project Coordinator",
      quote: "I never know what I'm allowed to ask it.",
      behaviors: [
        "Uses AI only when a colleague shows her a specific trick",
        "Types full polite sentences; apologizes to the assistant",
        "Gives up silently after one bad output — never reports it",
      ],
      needs: [
        "Suggestions embedded where she already works — zero blank canvas",
        "Visible, clickable capabilities — recognition, not recall",
        "Safe undo for everything, prominently displayed",
      ],
      distrust: "Blank text boxes. 'Ask me anything' reads as 'you should already know.'",
    },
  ] satisfies Persona[],

  jtbd: [
    "When I return from two days of meetings, I want the noise triaged into decisions-needed vs. FYI, so I can re-enter work in 10 minutes instead of 2 hours.",
    "When I send a weekly status, I want the numbers pulled and formatted from the systems that hold them, so the update takes 5 minutes and is never wrong.",
    "When I delegate a chore to software, I want proof of what it did, so I can trust it with the next, bigger chore.",
  ],

  research: {
    interviews: 32,
    weeks: 6,
    method: "Contextual inquiry in real workspaces across 3 time zones — watching actual work, not demo tasks.",
    clusters: [
      { theme: "Verification is the hidden cost", count: 27 },
      { theme: "Blank canvas paralysis", count: 21 },
      { theme: "Trust is per-task, not per-product", count: 19 },
      { theme: "Receipts beat explanations", count: 16 },
      { theme: "Interruption is the enemy of delegation", count: 12 },
    ],
    keyInsight:
      "Users don't adopt an assistant — they audition it, one task category at a time. Trust earned on summarization does not transfer to sending emails. Design for trust as a per-category ladder, not a global score.",
  },

  psychologyMap: [
    {
      principleId: "automation-bias",
      finding: "Users either over-trust fluent output or armor themselves with total verification — few calibrate.",
      constraint: "Confidence must be shown per claim, and it must be honest — miscalibration destroys the product.",
      decision: "Citation-first answers: every factual claim carries a source chip; unsourced text is visually distinct.",
    },
    {
      principleId: "recognition-recall",
      finding: "Novices (Elena) can't discover capabilities in a blank chat box; they only use what they've seen.",
      constraint: "Capabilities must be visible in context — no capability may exist only behind free-text.",
      decision: "Inline 'do this for me' affordances on every content surface; the chat box is optional, never required.",
    },
    {
      principleId: "locus-of-control",
      finding: "Power users (Marcus) want autonomy; skeptics (Priya) want control. Same product.",
      constraint: "Autonomy must be adjustable per task category, and its current level must always be visible.",
      decision: "The autonomy dial: suggest → confirm-each → auto-with-receipt, set independently per task type.",
    },
    {
      principleId: "doherty-threshold",
      finding: "Perceived intelligence collapses when latency breaks conversational rhythm.",
      constraint: "First token < 400ms perceived; long tasks must show live progress, never spinners.",
      decision: "Streaming everything: plans stream before execution, results stream during, receipts render instantly after.",
    },
    {
      principleId: "hicks-law",
      finding: "Given five AI suggestions, users evaluated none and chose manually (n=14 of 18 in testing).",
      constraint: "One best suggestion, not a menu. Alternatives on demand only.",
      decision: "Companion always proposes exactly one action with one alternative behind a 'more' affordance.",
    },
    {
      principleId: "error-prevention",
      finding: "A single destructive AI mistake (wrong email sent) ends trust permanently — no recovery observed.",
      constraint: "Destructive actions need friction proportional to blast radius, regardless of autonomy level.",
      decision: "Risk-tiered confirmation: read-only acts free; reversible writes preview a diff; external sends always confirm.",
    },
  ] satisfies PsychologyMapping[],
};
