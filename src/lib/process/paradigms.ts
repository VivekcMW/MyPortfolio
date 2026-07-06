import { ParadigmVariant, MatrixCriterion, Paradigm } from "./types";

/* ─────────────────────────────────────────────────────────────
   The four interface paradigms — same research, four futures.
────────────────────────────────────────────────────────────── */

export const paradigms: Record<Paradigm, ParadigmVariant> = {
  agentic: {
    slug: "agentic",
    name: "Agentic-only",
    tagline: "Delegation as the interface",
    model:
      "The user states intent; the agent plans, executes, and reports. The interface is a conversation plus an activity feed — no dashboards. State lives in the agent's memory and its receipts. Capability is discovered through suggestion and use, not menus.",
    holdsPlan: "The system plans; the user supervises",
    truthLives: "Conversation memory + action receipts",
    patterns: [
      { name: "Plan preview", desc: "Before executing, the agent streams its plan — steps, tools, blast radius — and waits for approval at the configured autonomy level." },
      { name: "Autonomy dial", desc: "Per task category: suggest → confirm-each → auto-with-receipt. Autonomy is earned, visible, and always revocable." },
      { name: "Action receipts", desc: "Every completed action produces a diff-style receipt: what changed, where, how to undo it." },
      { name: "Escalation path", desc: "The agent must know what it can't do — ambiguity or high risk escalates to the human with context attached, never fails silently." },
    ],
    failureModes: [
      "Capability blindness — users don't know what to ask (recall-heavy interface)",
      "Over-trust of fluent plans that hide flawed steps (automation bias)",
      "Undo across multi-step actions is genuinely hard — receipts must be transactional",
      "'What is it doing right now?' — invisible in-flight state destroys trust",
    ],
    psychology: ["automation-bias", "locus-of-control", "doherty-threshold", "error-prevention"],
    metrics: [
      { label: "Intervention rate", desc: "How often users stop or correct in-flight plans — falling is trust, rising is miscalibration" },
      { label: "Undo rate", desc: "Post-hoc reversals per 100 actions — the honest error signal" },
      { label: "Delegation depth", desc: "Distinct task categories per user on auto — the real adoption metric" },
      { label: "Trust-calibration gap", desc: "User-rated confidence minus measured accuracy, per category" },
    ],
    chooseWhen: [
      "High-frequency, repetitive workflows with clear success criteria",
      "Expert users with established trust and mental models of the domain",
      "Actions that are reversible or sandboxed",
    ],
    weakness:
      "Discoverability and error recovery. For millions of mixed-skill daily users in 2026, pure agentic asks novices to operate on recall and trust — both are in short supply.",
    flow: [
      { id: "intent", label: "Intent", desc: "User states a goal in natural language — or accepts a proactive suggestion.", kind: "start" },
      { id: "plan", label: "Plan streams", desc: "Agent decomposes into steps with tools and blast radius, streaming within 400ms.", kind: "step", branches: [{ label: "Ambiguity", desc: "Agent asks one clarifying question — never more than one before offering a best-guess plan." }] },
      { id: "approve", label: "Approval gate", desc: "Autonomy dial decides: auto-run, confirm-each, or suggest-only.", kind: "decision", branches: [{ label: "High risk detected", desc: "External sends and deletions always confirm, regardless of dial." }] },
      { id: "execute", label: "Execute + narrate", desc: "Live progress per step — current tool, current target — never a spinner.", kind: "step", branches: [{ label: "Step fails", desc: "Agent pauses, reports the failed step with context, offers retry / skip / escalate." }] },
      { id: "receipt", label: "Receipt", desc: "Diff-style record: what changed, where, undo affordance. Feeds the trust ladder.", kind: "end" },
    ],
  },

  hybrid: {
    slug: "hybrid",
    name: "Hybrid",
    tagline: "GUI as ground truth, agent as accelerator",
    model:
      "The dashboard and its clickable affordances remain the source of truth. The agent is embedded — a sidecar panel plus inline 'do this for me' on every widget. Two-way sync: agent actions render as visible diffs in the UI; UI context feeds the agent. Users fluidly mix clicking and delegating.",
    holdsPlan: "Shared — user directs, agent accelerates",
    truthLives: "The visible dashboard state",
    patterns: [
      { name: "Agent sidecar", desc: "A collapsible panel that sees the current screen. Its actions highlight the exact widgets they'll change before applying." },
      { name: "Inline delegation", desc: "Every card, table, and field carries a contextual 'ask Companion' affordance — capability is discovered where work happens." },
      { name: "Diff preview", desc: "Agent-proposed changes render as visual diffs on the actual UI — accept, edit, or reject. The GUI is the verification surface." },
      { name: "Activity ledger", desc: "A unified history of human and agent actions on the same timeline — no separate 'AI did this' silo." },
    ],
    failureModes: [
      "Dual-state drift — agent changes something off-screen and the user never sees it",
      "Mode confusion — 'was I supposed to click or ask?' when affordances compete",
      "Sidecar noise — suggestions that interrupt flow train users to dismiss everything",
      "Split attention between canvas and panel during complex tasks",
    ],
    psychology: ["recognition-recall", "locus-of-control", "hicks-law", "progressive-disclosure"],
    metrics: [
      { label: "Assist adoption", desc: "% of eligible tasks completed via agent vs. manual — per task category" },
      { label: "Correction rate", desc: "% of agent diffs edited before accept — quality signal per category" },
      { label: "Time-to-task Δ", desc: "Agent-assisted vs. manual baseline for the same red-route tasks" },
      { label: "Discovery via agent", desc: "Features first used through an agent suggestion — the onboarding dividend" },
    ],
    chooseWhen: [
      "Mixed skill population — novices click, experts delegate, both stay oriented",
      "High-stakes data where visual verification must be one glance away",
      "Enterprise scale, where auditability and gradual AI adoption are requirements",
    ],
    weakness:
      "Complexity tax — two interaction models must stay coherent through every feature, and the sync layer (agent action → visible diff) is engineering-expensive. Cheap hybrids ship a chat silo bolted to a dashboard; the value is entirely in the integration.",
    flow: [
      { id: "context", label: "Working context", desc: "User works in the dashboard; the sidecar passively understands the current view.", kind: "start" },
      { id: "trigger", label: "Delegate or click", desc: "Inline affordance, sidecar request, or plain manual work — all three coexist.", kind: "decision", branches: [{ label: "Proactive suggestion", desc: "Sidecar surfaces one suggestion max per view — dismissals train frequency down." }] },
      { id: "diff", label: "Diff preview", desc: "Proposed changes highlight on the real widgets — the UI itself is the preview.", kind: "step", branches: [{ label: "Partial accept", desc: "User accepts 3 of 5 proposed edits; rejections feed back as preference signal." }] },
      { id: "apply", label: "Apply + highlight", desc: "Accepted changes animate into place; off-screen changes badge their location.", kind: "step", branches: [{ label: "Off-screen change", desc: "Ledger entry + location badge — nothing changes invisibly." }] },
      { id: "ledger", label: "Unified ledger", desc: "Human and agent actions on one timeline, each reversible from the same surface.", kind: "end" },
    ],
  },

  traditional: {
    slug: "traditional",
    name: "Traditional UI",
    tagline: "Determinism as a feature",
    model:
      "Explicit direct manipulation. Every capability has a visible, stable affordance; automation exists but is deterministic — rules, saved filters, macros. No probabilistic behavior anywhere in the interaction loop. The same click produces the same result, forever.",
    holdsPlan: "The user, entirely",
    truthLives: "Persistent visual state — screens, lists, forms",
    patterns: [
      { name: "Command surfaces", desc: "Toolbar + command palette + keyboard shortcuts — three routes to every action, matching three levels of expertise." },
      { name: "Rule builder", desc: "Deterministic automation: 'when X arrives, file it to Y' — user-authored, inspectable, guaranteed repeatable." },
      { name: "Saved views", desc: "Filters, sorts, and layouts persist as named artifacts — spatial memory compounds into speed." },
      { name: "Batch operations", desc: "Multi-select + preview + apply — the deterministic ancestor of the agent's diff preview." },
    ],
    failureModes: [
      "Feature sprawl — every capability needs chrome; navigation depth grows past Hick's limits",
      "The repetition ceiling — users perform the same 12-step chore daily and the UI can't learn it",
      "Power features die in menus — discoverability of depth is the perennial loss",
      "Competitive erosion as AI-accelerated rivals reset user expectations",
    ],
    psychology: ["recognition-recall", "hicks-law", "mental-models", "progressive-disclosure"],
    metrics: [
      { label: "Task success", desc: "Classic red-route completion rate — deterministic UIs make this cleanly measurable" },
      { label: "Time on task", desc: "Against expert baseline — spatial memory should compound month over month" },
      { label: "Error rate", desc: "Slips and mistakes per session, with recovery time" },
      { label: "SUS score", desc: "System Usability Scale — the 40-year benchmark still earns its keep here" },
    ],
    chooseWhen: [
      "Regulated or safety-critical domains where every action needs an audit trail",
      "Low-trust environments — of AI or of the vendor",
      "Workflows where predictability outvalues speed: predictability is a UX feature probabilistic systems cannot offer",
    ],
    weakness:
      "The repetition ceiling. For Companion's core promise — giving back the repetitive 40% of the day — pure traditional UI can only offer rule builders, which the research shows only Marcus (1 of 3 personas) will ever author.",
    flow: [
      { id: "navigate", label: "Navigate", desc: "Stable IA: workspace → project → item. Spatial memory is the speed layer.", kind: "start" },
      { id: "locate", label: "Locate affordance", desc: "Toolbar, context menu, or ⌘K palette — recognition at three expertise levels.", kind: "step", branches: [{ label: "Not found", desc: "Palette search with synonyms — the deterministic answer to discoverability." }] },
      { id: "configure", label: "Configure", desc: "Forms with constrained inputs — invalid states unrepresentable where possible.", kind: "step" },
      { id: "preview", label: "Preview batch", desc: "Multi-item operations show affected items before commit.", kind: "decision", branches: [{ label: "Destructive", desc: "Type-to-confirm for irreversible operations — friction proportional to blast radius." }] },
      { id: "done", label: "Apply + persist", desc: "Result visible in place; view state persists; history log appends.", kind: "end" },
    ],
  },

  "zero-ui": {
    slug: "zero-ui",
    name: "Zero-UI / Hardware",
    tagline: "Context is the interface",
    model:
      "Companion as a desk device and wearable: voice in; earcons, haptics, and an LED grammar out. Ambient meeting capture, spoken queries, summaries pushed to whatever screen the user glances at next. No persistent visual state — the situation itself is the interface, and every signal must carry unambiguous meaning.",
    holdsPlan: "The system, within a tightly scripted envelope",
    truthLives: "Ambient context + a companion surface for anything that needs eyes",
    patterns: [
      { name: "Signal grammar", desc: "A token system for hardware: 3 earcons (done / needs-you / error), 4 haptic patterns, 3 LED states. Learned in a day, stable forever." },
      { name: "Risk-tiered voice confirm", desc: "Low-risk acts just happen; anything external or destructive requires spoken confirmation with the action read back." },
      { name: "Deferred detail", desc: "The device answers in one sentence; depth routes to the user's next glanced screen — 'the full summary is on your laptop.'" },
      { name: "Escape hatch", desc: "Every zero-UI product needs a companion surface. Deciding what does not fit in the ambient channel is the core design act." },
    ],
    failureModes: [
      "Memory burden — no visual state means the user's head is the state container",
      "Discoverability near zero — no menus, no hover, no affordances to scan",
      "Error recovery without a screen — misrecognition needs a repair loop of ≤ 2 turns or users walk to their laptop",
      "Always-listening privacy — social acceptability fails before the technology does",
    ],
    psychology: ["calm-technology", "paradox-of-choice", "error-prevention", "peak-end"],
    metrics: [
      { label: "Recognition accuracy", desc: "Intent match rate in real acoustic conditions — the floor everything rests on" },
      { label: "False activation rate", desc: "Unprompted wakes per day — the single fastest trust killer in the home/office" },
      { label: "Fallback rate", desc: "% of tasks abandoned to a screen — measures the envelope's honesty" },
      { label: "Habituation curve", desc: "Days until signal grammar is used without hesitation — target < 7" },
    ],
    chooseWhen: [
      "Hands-busy, eyes-busy contexts — commute, lab, kitchen, field work",
      "Micro-interactions where pulling out a phone costs more than the task",
      "Accessibility-first scenarios where screens are the barrier",
    ],
    weakness:
      "Bandwidth. Companion's core loop — verify, then trust — needs eyes: sources, diffs, receipts don't fit through an earcon. Zero-UI works as Companion's ambient satellite, not its home.",
    flow: [
      { id: "wake", label: "Context wake", desc: "Meeting starts, commute begins, or wake-word — the situation initiates.", kind: "start", branches: [{ label: "False wake", desc: "Single subtle LED pulse, no audio — errors must be quieter than successes." }] },
      { id: "capture", label: "Capture / query", desc: "Ambient capture or a spoken request; LED shows listening state unambiguously.", kind: "step" },
      { id: "confirm", label: "Risk gate", desc: "Read-only: proceed. External action: read back and await spoken confirm.", kind: "decision", branches: [{ label: "Misrecognition", desc: "One repair turn ('did you mean…'), then defer to screen — never loop." }] },
      { id: "respond", label: "One-sentence response", desc: "Earcon + minimal speech; anything longer routes to the next glanced screen.", kind: "step" },
      { id: "handoff", label: "Deferred handoff", desc: "Full artifact waits on the companion surface with provenance intact.", kind: "end" },
    ],
  },
};

export const paradigmList: Paradigm[] = ["agentic", "hybrid", "traditional", "zero-ui"];

/* ─── The Paradigm Gate decision matrix ─── */

export const decisionMatrix: MatrixCriterion[] = [
  {
    criterion: "Task frequency",
    detail: "Daily repetitive chores reward delegation; occasional tasks reward recognition",
    scores: { agentic: 2, hybrid: 2, traditional: 1, "zero-ui": 1 },
  },
  {
    criterion: "Blast radius",
    detail: "Emails send externally, files change — wrong actions have real cost",
    scores: { agentic: 0, hybrid: 2, traditional: 2, "zero-ui": 0 },
  },
  {
    criterion: "Skill spread",
    detail: "Millions of users: Priya, Marcus, and Elena in the same product",
    scores: { agentic: 0, hybrid: 2, traditional: 1, "zero-ui": 1 },
  },
  {
    criterion: "Context of use",
    detail: "Desk-based knowledge work — screens available, hands and eyes free",
    scores: { agentic: 1, hybrid: 2, traditional: 2, "zero-ui": 0 },
  },
  {
    criterion: "Trust maturity",
    detail: "2026: trust in AI is per-task and fragile; verification demand is high",
    scores: { agentic: 0, hybrid: 2, traditional: 2, "zero-ui": 1 },
  },
  {
    criterion: "Repetition relief",
    detail: "The core promise — returning the repetitive 40% of the day",
    scores: { agentic: 2, hybrid: 2, traditional: 0, "zero-ui": 1 },
  },
];

export const verdict = {
  choice: "hybrid" as Paradigm,
  headline: "For Companion at daily-work scale: Hybrid, with agentic-first defaults.",
  reasoning:
    "The research is unambiguous: trust is per-task and fragile (Priya), capability must be discoverable (Elena), and delegation must be schedulable (Marcus). Hybrid is the only paradigm that serves all three — the GUI is the verification surface that makes agentic trust affordable. The agent carries the repetition relief; the dashboard carries the trust. Zero-UI ships later as an ambient satellite for capture; pure agentic is the 3-year destination the autonomy dial walks users toward, one earned task category at a time.",
};
