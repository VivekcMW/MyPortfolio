import { Principle } from "./types";

/* ─── Psychology principles referenced across the process page ─── */

export const principles: Record<string, Principle> = {
  "framing-effect": {
    id: "framing-effect",
    name: "Framing effect",
    definition:
      "The same information leads to different decisions depending on how it's presented. A problem framed as 'save 2 hours' beats 'AI-powered productivity' — outcomes over technology.",
  },
  "survivorship-bias": {
    id: "survivorship-bias",
    name: "Survivorship bias",
    definition:
      "Market signals over-represent winners. Studying only successful AI products hides the graveyard of identical ideas that died — the failures carry more information.",
  },
  "commitment-consistency": {
    id: "commitment-consistency",
    name: "Commitment & consistency",
    definition:
      "People align future behavior with prior written commitments. A PRD with explicit hypotheses and kill criteria prevents goal drift better than any status meeting.",
  },
  "say-do-gap": {
    id: "say-do-gap",
    name: "Say–do gap",
    definition:
      "What users report doing and what they actually do diverge — often dramatically. Contextual observation beats interviews; interviews beat surveys; surveys beat guessing.",
  },
  "mental-models": {
    id: "mental-models",
    name: "Mental models",
    definition:
      "Users act on their internal theory of how a system works, not on how it actually works. Design must match the model users bring — or deliberately, visibly teach a new one.",
  },
  "automation-bias": {
    id: "automation-bias",
    name: "Automation bias",
    definition:
      "People over-trust automated output, accepting confident-sounding results without verification. The more fluent the AI, the more dangerous the bias — trust must be calibrated, not maximized.",
  },
  "locus-of-control": {
    id: "locus-of-control",
    name: "Locus of control",
    definition:
      "Perceived agency drives satisfaction and adoption. Systems that act on users' behalf must return control signals — previews, undo, autonomy dials — or users abandon them.",
  },
  "doherty-threshold": {
    id: "doherty-threshold",
    name: "Doherty threshold",
    definition:
      "Under ~400ms response latency, interaction feels conversational and attention holds. Streaming output, optimistic UI, and skeleton states all exist to stay under this line.",
  },
  "hicks-law": {
    id: "hicks-law",
    name: "Hick's law",
    definition:
      "Decision time grows with the number and complexity of choices. Fewer visible options isn't minimalism — it's measurably faster task completion.",
  },
  "recognition-recall": {
    id: "recognition-recall",
    name: "Recognition over recall",
    definition:
      "Recognizing an option is far easier than recalling it from memory. GUIs win on recognition; chat interfaces are recall-heavy — users must remember what the system can do.",
  },
  "progressive-disclosure": {
    id: "progressive-disclosure",
    name: "Progressive disclosure",
    definition:
      "Show the essential first; reveal complexity on demand. Keeps cognitive load low for the 80% case without capping the power ceiling.",
  },
  "error-prevention": {
    id: "error-prevention",
    name: "Error prevention",
    definition:
      "Preventing an error beats any error message. Typed connections, constrained inputs, and risk-tiered confirmations make wrong actions hard to express.",
  },
  "peak-end": {
    id: "peak-end",
    name: "Peak–end rule",
    definition:
      "Experiences are remembered by their most intense moment and their ending — not the average. Engineer one peak per journey and never ship a weak ending.",
  },
  "goodharts-law": {
    id: "goodharts-law",
    name: "Goodhart's law",
    definition:
      "When a measure becomes a target, it stops being a good measure. Engagement metrics on an AI assistant reward addiction, not usefulness — measure time saved, not time spent.",
  },
  "calm-technology": {
    id: "calm-technology",
    name: "Calm technology",
    definition:
      "Weiser's principle: technology should inform without demanding attention — moving between the periphery and the center of awareness. The measure of a good ambient device is how rarely you look at it.",
  },
  "paradox-of-choice": {
    id: "paradox-of-choice",
    name: "Paradox of choice",
    definition:
      "More options increase anxiety and decrease satisfaction with the chosen one. Zero-UI's constraint — one interaction, one outcome — is a feature, not a limitation.",
  },
};

export const getPrinciple = (id: string): Principle =>
  principles[id] ?? { id, name: id, definition: "" };
