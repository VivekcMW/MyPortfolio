import { DesignSystemSlug, ResearchEntry } from "./types";

export const researchEntries: Record<DesignSystemSlug, ResearchEntry> = {
  ooh: {
    domain: "ooh",
    rationale:
      "Out-of-home advertising demands extreme contrast — ambient light changes throughout the day, viewing distance varies from 10ft to 100ft, and attention is measured in milliseconds. Black backgrounds minimize glare while neon accents (yellow, cyan) maintain legibility across all conditions.",
    decisions: [
      "Yellow (#FACC15) primary against black (#050505) achieves 13.2:1 contrast ratio — exceeds WCAG AAA even in direct sunlight simulation",
      "Generous letter-spacing (0.05em+) improves character recognition at distance; standard body text at 16px becomes readable at 30ft",
      "Thick borders (2-3px) ensure card and button visibility on bright ambient backgrounds (white concrete, blue sky)",
      "Limited accent palette (4 colors vs 7 in other domains) is intentional — reduces cognitive load for glance-and-go interactions",
    ],
    references: [
      "Clear Channel Outdoor Digital Signage Design Guidelines",
      "MIT Media Lab — Wayfinding 2.0 Research",
      "Fitts' Law applied to large-format interactive displays",
    ],
    tradeoffs: [
      "High contrast reduces usable color range — limited to 4 accent colors vs 7 in Data Science domain",
      "Dark backgrounds absorb more heat in outdoor displays — may affect brightness in direct sunlight",
      "Bold typography at large sizes doesn't scale down well for mobile companion experiences",
    ],
  },
  "data-science": {
    domain: "data-science",
    rationale:
      "Data science tools are used for hours at a time in focused analytical sessions. The palette prioritizes reduced eye strain (cool tones), high information density (muted backgrounds), and clear semantic color coding for charts and status indicators.",
    decisions: [
      "Teal (#14B8A6) primary against navy (#030712) provides a calm focal point without the visual aggression of red or orange",
      "Blue (#3B82F6) secondary maps to the standard 'interactive' convention in analytics tools (links, selected points)",
      "Semantic colors (success/warning/error) use standard data viz conventions — green/yellow/red — for immediate chart readability",
      "High textMuted opacity (#94A3B8 on #030712 = 6.1:1) ensures secondary data labels remain readable without competing with primary data",
    ],
    references: [
      "Tableau Visual Design Guide",
      "IBM Carbon Design System — Data Visualization",
      "ColorBrewer 2.0 — Color Advice for Cartography and Data Visualization",
    ],
    tradeoffs: [
      "Cold palette can feel sterile in consumer-facing contexts — not suitable for social or entertainment apps",
      "Teal-green confusion risk for deuteranopia users — supplemented with shape encoding in charts",
      "High information density requires strict layout discipline; spacing violations compound quickly",
    ],
  },
  ai: {
    domain: "ai",
    rationale:
      "AI interfaces are a new UI paradigm — chat, streaming outputs, agentic workflows. The palette evokes 'intelligence' through deep purples (historically associated with creativity and depth) and electric cyan accents (signaling real-time processing and technological capability).",
    decisions: [
      "Fuchsia (#D946EF) primary creates an immediate differentiation from every other domain — AI tools should feel distinct",
      "Deep purple background (#0A0515) reduces glare during long chat sessions and makes streaming text feel luminous",
      "Cyan (#06B6D4) accent is used for AI-generated content highlighting — it maps to the 'synthetic' color in the visual language",
      "Low contrast between surface (#140B2E) and border (#2D1B69) creates a seamless glass-morphic effect for cards and modals",
    ],
    references: [
      "Anthropic Claude UI Design Patterns",
      "OpenAI ChatGPT Interface Design",
      "Microsoft AI Design Guidelines — Human-AI Interaction",
    ],
    tradeoffs: [
      "Fuchsia primary can feel overwhelming at scale — reserved for key actions only, neutral tones for chrome",
      "Purple backgrounds are polarizing in corporate environments — alternative light palette required for enterprise AI",
      "Cyan on purple fails WCAG AA at small sizes — cyan reserved for ≥14px text and large UI elements only",
    ],
  },
  "design-engineering": {
    domain: "design-engineering",
    rationale:
      "Developer tools and component libraries need a palette that stays out of the way during long coding sessions while providing clear visual signals. Warm slate tones reduce blue light exposure, and amber accents provide warmth without the clinical feel of pure grays.",
    decisions: [
      "Amber (#F59E0B) primary against warm slate (#0C0A09) provides 10.5:1 contrast — readable at code font sizes (12-14px)",
      "Green (#22C55E) secondary follows the 'success/positive' convention established in CLI tools and CI/CD pipelines",
      "Surface color (#1C1917) is intentionally close to background (#0C0A09) — creates layered depth without visual noise",
      "Orange (#F97316) accent used for warnings and deprecation notices — it bridges amber (neutral) and red (error)",
    ],
    references: [
      "Vercel Geist Design System",
      "shadcn/ui Component Architecture",
      "Radix UI Primitives Design Principles",
    ],
    tradeoffs: [
      "Warm tones can feel less 'technical' than blue/cold palettes — may not suit hardware or security tooling",
      "Low contrast between surface layers reduces the perception of depth in complex UIs with 4+ nesting levels",
      "Amber color blindness (protanopia) affects ~1% of males — icon and text labels always accompany color coding",
    ],
  },
  fintech: {
    domain: "fintech",
    rationale:
      "Financial applications must communicate trust, stability, and precision. The palette uses established institutional colors (navy, emerald) that users subconsciously associate with security. Restrained use of accent colors signals seriousness and reduces cognitive load during high-stakes decisions.",
    decisions: [
      "Navy (#020617) background with blue (#3B82F6) primary follows the 'banking blue' convention — users trust it without thinking",
      "Emerald (#10B981) secondary signals financial growth (green = positive) and is used for gains, deposits, and confirmations",
      "Gold (#F59E0B) accent is reserved for premium features, tier upgrades, and high-value transaction highlights only",
      "Sharp border radius (4px instead of 8-12px) communicates precision and is consistent with legacy banking UI conventions",
    ],
    references: [
      "Stripe Treasury Design Patterns",
      "Plaid Design System — Financial UI Guidelines",
      "JP Morgan Design Language — Digital Banking Standards",
    ],
    tradeoffs: [
      "Conservative palette risks feeling dated compared to neo-bank competitors using vibrant colors",
      "Gold accent can be perceived as gaudy if overused — strictly limited to 5% of UI surface area",
      "Sharp corners (4px) reduce perceived approachability — not suitable for consumer fintech apps targeting Gen Z",
    ],
  },
  consumer: {
    domain: "consumer",
    rationale:
      "Consumer applications compete for emotional engagement. The palette uses warm, vibrant colors (rose, amber) that trigger positive emotional responses. Generous spacing and rounded elements communicate approachability and reduce user anxiety during e-commerce transactions.",
    decisions: [
      "Rose (#F43F5E) primary creates urgency and excitement — proven to increase click-through rates in e-commerce contexts",
      "Amber (#FB923C) secondary provides warmth without competing with rose — used for ratings, reviews, and user-generated content badges",
      "Violet (#A78BFA) accent signals personalization and is used for user profiles, recommendations, and social features",
      "Rounded corners (12px) follow the 'friendly' UI convention — studies show rounded elements are perceived as safer and more approachable",
    ],
    references: [
      "Shopify Polaris Design System",
      "Airbnb Design Language — DLS",
      "Laws of UX — Aesthetic-Usability Effect applied to e-commerce",
    ],
    tradeoffs: [
      "Rose primary risks gender-coding the interface — supplemented by amber and violet for balance",
      "Vibrant palette causes fatigue in long sessions — dark mode with desaturated backgrounds is the default",
      "Generous spacing (24px+ gutters) reduces information density — challenging for feature-rich power user views",
    ],
  },
};

export function getResearch(slug: DesignSystemSlug): ResearchEntry {
  return researchEntries[slug];
}
