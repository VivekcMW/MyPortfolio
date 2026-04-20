"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Section } from "@/components/Section";

/* ─── Story Chapter Type ─── */
interface StoryChapter {
  phase: string;
  year: string;
  title: string;
  narrative: string;
  details: string[];
  aside?: { label: string; value: string }[];
  visual?: "timeline" | "grid" | "flow" | "metrics";
}

/* ─── Project Data ─── */
interface ProjectDetail {
  title: string;
  category: string;
  heroDesc: string;
  timeline?: string;
  tags: string[];
  challenge: string;
  approach: string[];
  impact: string[];
  features: { title: string; desc: string }[];
  prototypeSlug: string;
  story?: StoryChapter[];
}

/* ─── NoCode Story Chapters ─── */
const nocodeStory: StoryChapter[] = [
  {
    phase: "01 — Market Signal",
    year: "2018",
    title: "The gap no one was filling",
    narrative:
      "It was early 2018. Enterprise teams were stuck between two extremes: clunky spreadsheets for simple tasks, or 6-month dev cycles for anything real. The low-code market — then valued at $4.3B by Forrester — was accelerating at 40% year-over-year, yet every tool forced users to choose between power and simplicity. We saw the white space: a platform that felt like design but worked like engineering.",
    details: [
      "Analyzed 14 competing platforms across capability matrices — Appian, OutSystems, Mendix, PowerApps, Salesforce Lightning",
      "Identified the 'complexity cliff' — every tool became unusable past a certain threshold of business logic",
      "Mapped enterprise budget patterns: teams were spending $280K+/year on custom internal tools that took months to ship",
      "Validated demand through 60+ stakeholder interviews across 12 organizations in APAC and MENA markets",
    ],
    aside: [
      { label: "Market (2018)", value: "$4.3B" },
      { label: "YoY Growth", value: "40%" },
      { label: "Avg. Tool Cost", value: "$280K/yr" },
    ],
    visual: "metrics",
  },
  {
    phase: "02 — Research",
    year: "2018",
    title: "Understanding the humans behind the problem",
    narrative:
      "We spent Q3–Q4 of 2018 embedded with our target users — business analysts building reports, ops managers tracking workflows, IT admins managing internal tools. Over 10 weeks, we conducted deep contextual inquiries across 3 countries. The goal was to understand their mental models, not impose ours.",
    details: [
      "Conducted 40+ contextual inquiry sessions — watching users struggle with existing tools in their real environment",
      "Ran card sorting workshops with 24 participants to understand how non-technical users categorize UI components",
      "Created 5 distinct user personas ranging from 'Spreadsheet Power User' to 'Citizen Developer'",
      "Built journey maps for 8 common workflows — identifying 23 friction points and 7 complete dead-ends",
      "Synthesized findings into an affinity diagram with 340+ data points clustered into 12 core themes",
    ],
    aside: [
      { label: "Interviews", value: "40+" },
      { label: "Personas", value: "5" },
      { label: "Friction Points", value: "23" },
    ],
    visual: "timeline",
  },
  {
    phase: "03 — Define",
    year: "2019",
    title: "Framing the right problem to solve",
    narrative:
      "Entering 2019 with 340+ research data points, we discovered something unexpected: users didn't just want to 'build apps' — they wanted to automate decisions. The real job-to-be-done was turning business logic into working software without waiting for engineering. This reframing changed everything about our design direction.",
    details: [
      "Distilled research into 3 design principles: Progressive Disclosure, Visible Logic, and Instant Feedback",
      "Defined information architecture through tree testing with 32 participants — 89% task completion on first attempt",
      "Prioritized features using a weighted RICE framework aligned to user pain severity",
      "Established success metrics: Time-to-first-app < 30 min, Builder NPS > 60, Zero-code coverage for 80% of use cases",
      "Created a product requirements document co-authored with engineering to ensure feasibility from day one",
    ],
    aside: [
      { label: "Design Principles", value: "3" },
      { label: "Tree Test Success", value: "89%" },
      { label: "Target NPS", value: "> 60" },
    ],
    visual: "flow",
  },
  {
    phase: "04 — Design",
    year: "2019 – 2020",
    title: "From paper sketches to pixel-perfect systems",
    narrative:
      "Design spanned over a year — from mid-2019 through 2020. It happened in three waves. First, rapid paper prototyping to explore 12 layout paradigms for the builder canvas. Second, mid-fidelity Figma flows to test interaction patterns — drag-and-drop, contextual panels, visual logic. Third, a full design system with 120+ components that served both the builder UI and the apps users would generate.",
    details: [
      "Sketched 12 builder layout paradigms — tested 4 with users before converging on a 3-panel dock layout",
      "Designed the drag-and-drop canvas with snap-to-grid, nested containers, and responsive breakpoint preview",
      "Created a visual logic builder replacing code with node-based flowcharts — tested 6 interaction patterns",
      "Built a design system from scratch: 120+ components, 24 color tokens, 8 type scales, and dark/light themes",
      "Designed contextual property panels using progressive disclosure — only showing options relevant to the selected component",
      "Ran 6 rounds of moderated usability testing across each design wave, iterating after every round",
    ],
    aside: [
      { label: "Components", value: "120+" },
      { label: "Layout Paradigms", value: "12" },
      { label: "Usability Rounds", value: "6" },
    ],
    visual: "grid",
  },
  {
    phase: "05 — Development",
    year: "2020 – 2021",
    title: "Engineering the experience",
    narrative:
      "From late 2020 into 2021, design and development ran in lockstep — every design sprint fed directly into an engineering sprint. We built a custom rendering engine that could translate the visual canvas into production React code. The architecture had to be extensible (for a component marketplace), performant (real-time preview), and reliable (enterprise-grade).",
    details: [
      "Architected a component rendering engine that maps visual canvas state to production React output",
      "Built a real-time preview system with hot-reloading — changes on canvas reflected instantly in the preview device",
      "Developed a plugin API for the component marketplace — enabling third-party and community components",
      "Implemented collaborative editing with operational transforms — multiple users editing the same app simultaneously",
      "Integrated 40+ API connectors (REST, GraphQL, databases) with visual query builders",
      "Set up CI/CD pipeline: lint, type-check, 148 unit tests, 32 integration tests, visual regression tests",
    ],
    aside: [
      { label: "API Connectors", value: "40+" },
      { label: "Unit Tests", value: "148" },
      { label: "Integration Tests", value: "32" },
    ],
    visual: "flow",
  },
  {
    phase: "06 — Testing & QA",
    year: "2021",
    title: "Breaking it before users could",
    narrative:
      "Through H2 2021 we tested at every layer — component-level unit tests, integration tests for the rendering engine, accessibility audits for WCAG AA, and exhaustive cross-browser testing. But the most valuable testing was putting real users in front of the platform and watching them build real apps.",
    details: [
      "Ran 4 rounds of unmoderated usability tests with 48 participants via Maze — measuring task completion, time, and errors",
      "Achieved WCAG AA compliance across the entire builder interface — keyboard navigation, screen reader, contrast",
      "Performance benchmarked: canvas renders 500+ components at 60fps, preview loads in < 1.2s",
      "Conducted alpha testing with 15 internal teams — 3 weeks of daily usage capturing bugs and UX friction",
      "Resolved 94 bugs, 23 UX issues, and 8 accessibility violations before beta launch",
      "Load tested the collaborative editor: stable at 12 concurrent editors with < 50ms latency",
    ],
    aside: [
      { label: "Test Participants", value: "48" },
      { label: "Bugs Resolved", value: "94" },
      { label: "A11y Standard", value: "WCAG AA" },
    ],
    visual: "metrics",
  },
  {
    phase: "07 — Onboarding",
    year: "2022",
    title: "From sign-up to first app in under 30 minutes",
    narrative:
      "Early 2022, with the platform nearing launch, we turned attention to the first-run experience. A powerful tool is useless if no one knows how to use it. We designed an automated onboarding flow that guides new users from sign-up to their first working app — no documentation required.",
    details: [
      "Designed a role-based onboarding wizard: business analyst, ops manager, IT admin — each gets tailored first-run experience",
      "Built interactive guided tours with contextual tooltips — teaching by doing, not by reading",
      "Created 18 starter templates across common use cases: CRM, project tracker, inventory, dashboards, forms",
      "Implemented progressive feature unlocking — new capabilities revealed as users master basics",
      "Added an AI assistant to suggest components and auto-configure data bindings during first build",
      "Measured: 73% of new users completed their first app within 28 minutes — beating our 30-min target",
    ],
    aside: [
      { label: "Time to First App", value: "28 min" },
      { label: "Templates", value: "18" },
      { label: "Completion Rate", value: "73%" },
    ],
    visual: "timeline",
  },
  {
    phase: "08 — Launch & Impact",
    year: "2022",
    title: "The numbers that told the story",
    narrative:
      "Mid-2022, after four years of research, design, and engineering — we launched to 200+ teams in a phased rollout over 6 weeks. The results exceeded every target we'd set. By the end of 2022, the low-code market had grown to $26.9B (Gartner), validating the massive bet we placed in 2018.",
    details: [
      "60% reduction in development dependency — business teams shipped features without engineering tickets",
      "3x faster go-to-market for internal tools and client-facing applications",
      "NPS jumped from 32 to 71 within 6 months of the redesign",
      "Adopted by 200+ teams across the organization within the first quarter",
      "Platform generates 1,200+ active applications across the organization",
      "Support tickets dropped 45% due to intuitive UI and automated onboarding",
    ],
    aside: [
      { label: "Dev Dependency", value: "-60%" },
      { label: "Go-to-Market", value: "3x faster" },
    ],
    visual: "metrics",
  },
];

/* ─── EHR Daycare Story Chapters ─── */
const ehrStory: StoryChapter[] = [
  {
    phase: "01 — Market Signal",
    year: "2024",
    title: "The ₹47,000 Cr opportunity no one designed for",
    narrative:
      "India's daycare surgery market was projected to reach ₹47,000 Cr ($5.7B) by 2027, growing at 18% CAGR — driven by PMJAY coverage expansion, rising insurance penetration (from 3.7% to 12%), and Ayushman Bharat Digital Mission (ABDM) mandates. Yet 82% of daycare centres ran on paper registers, WhatsApp coordination, and legacy HIS systems designed for inpatient hospitals. The gap was glaring: no purpose-built EHR existed for India's daycare workflow — admission at 7 AM, procedure by 10 AM, discharge by 4 PM — all in a single shift.",
    details: [
      "Studied IRDAI daycare procedure list — 588 procedures approved across 23 specialties, each with unique clinical workflows",
      "Analyzed NHA PMJAY claims data — 42% of all Ayushman Bharat claims were daycare, yet average claim processing TAT was 47 days",
      "Mapped the ABDM ecosystem: ABHA IDs, Health Information Exchange (HIE), Unified Health Interface (UHI), and PHR app integration",
      "Benchmarked 8 existing Indian HIS vendors (Bahmni, HIS by C-DAC, NDHM-compliant, eHospital NIC) — none supported daycare-specific OT scheduling, procedure boards, or same-day discharge flows",
      "Identified regulatory requirements: NABH daycare standards, Clinical Establishment Act provisions, state-specific licensing (Karnataka KPME, Maharashtra Bombay Nursing Home Act)",
      "Estimated TAM: 28,000+ daycare centres and ambulatory surgery centres across India, 65% without any digital system",
    ],
    aside: [
      { label: "Market (2027)", value: "₹47K Cr" },
      { label: "CAGR", value: "18%" },
      { label: "Daycare Centres", value: "28,000+" },
      { label: "Digital Adoption", value: "18%" },
    ],
    visual: "metrics",
  },
  {
    phase: "02 — Research & Personas",
    year: "2024",
    title: "Becoming the fly on the wall across 16 specialties",
    narrative:
      "Over 14 weeks in Q2–Q3 2024, we embedded ourselves in 9 daycare facilities across 4 cities — Mumbai, Bengaluru, Hyderabad, and Jaipur — covering tier-1, tier-2, and semi-urban settings. We shadowed 68 clinicians, 24 nurses, 12 pharmacists, 8 billing staff, and 6 MIS analysts. The goal: map the exact workflow for a patient from the moment they walk in at 7 AM to the moment they're discharged post-procedure — for every major specialty.",
    details: [
      "Persona 1 — Dr. Priya Mehta (Ophthalmologist, 58): Does 12–15 phaco surgeries daily. Needs instant access to A-scan biometry, IOL power, and WHO checklist. Her biggest pain: switching between 4 different systems for a single case",
      "Persona 2 — Dr. Kavitha Reddy (Gynecologist, 42): Performs hysteroscopies and D&Cs. Obsessive about PCPNDT Form F compliance — has nightmares about missing documentation that could shut down her centre",
      "Persona 3 — Dr. Arun Shetty (Oral Surgeon, 32): Handles impacted third molars daily. Needs CBCT imaging inline, nerve proximity alerts, and Winter's classification at decision point",
      "Persona 4 — Sr. Nurse Rekha (OT In-charge, 15 yrs): Manages pre-op checklist, WHO surgical safety, and recovery scoring for 20+ patients/day. Currently uses a laminated A4 sheet with tick marks",
      "Persona 5 — Rajan Iyer (Billing Manager, 48): Juggles PMJAY pre-auth, TPA claims, CGHS reimbursement, and cash billing. Gets 40+ calls/day from TPAs asking for missing documents",
      "Persona 6 — Ananya Das (MIS Analyst, 28): Generates daily OT utilization reports manually in Excel. Spends 3 hours collating data from 6 sources to produce one dashboard for management",
      "Conducted 120+ contextual inquiry sessions, 32 journey maps, and catalogued 87 workflow friction points across all specialties",
      "Mapped clinical decision trees for 16 specialties: Ophthalmology, Gynecology, Dental Surgery, Cardiology (Cath Lab), Orthopedics, ENT, Oncology (Chemo), Nephrology (Dialysis), Dermatology, Urology, Gastroenterology, Pulmonology, Pain Management, Plastic Surgery, General Surgery, and Neurology",
    ],
    aside: [
      { label: "Facilities Visited", value: "9" },
      { label: "Clinicians Shadowed", value: "68" },
      { label: "Personas Created", value: "6" },
      { label: "Friction Points", value: "87" },
    ],
    visual: "timeline",
  },
  {
    phase: "03 — Specialty Workflow Mapping",
    year: "2024",
    title: "588 procedures, 16 specialties, 1 platform",
    narrative:
      "The core insight from research: every specialty has a unique clinical rhythm yet shares a common operational backbone. An ophthalmologist's phaco surgery day looks nothing like a cardiologist's cath lab day — but both need registration, OPD triage, pre-op workup, consent, procedure execution, recovery, billing, and discharge. We mapped the unique clinical layer for each specialty on top of a shared operational platform.",
    details: [
      "Ophthalmology (32% of daycare volume): Phaco + IOL, LASIK, Vitrectomy, Intravitreal injections. Key data: Visual acuity (Snellen), IOP (Goldmann), A-scan biometry, IOL power calc (SRK/T, Barrett), slit lamp findings, post-op Aldrete scoring",
      "Gynecology (18%): Hysteroscopy, D&C, LEEP, laparoscopic cystectomy. Key requirements: Mandatory UPT documentation, PCPNDT Form F auto-generation, menstrual history structured capture, TVS integration",
      "Dental Surgery (12%): Impacted 3rd molars, implants, full-mouth rehab. Key tools: FDI dental chart (32 teeth), Winter's classification, CBCT inline viewer, nerve proximity alerts, post-op instruction builder",
      "Cardiology — Cath Lab (8%): Coronary angiography, PCI/stenting, pacemaker implants. Key data: Cath report with vessel diagrams, stent registry (barcode), radiation dose logging, contrast volume tracking",
      "Orthopedics (7%): Arthroscopy (knee, shoulder), fracture fixation, carpal tunnel release. Key needs: Implant registry with batch tracking, intra-op imaging, physiotherapy prescription builder",
      "ENT (6%): FESS, tonsillectomy, myringotomy, septoplasty. Key tools: Endoscopy image capture, Lund-Mackay scoring, audiometry integration",
      "Oncology — Chemotherapy (5%): IV chemo day protocols, immunotherapy. Key requirements: BSA (body surface area) calculator, cycle tracking, CTCAE adverse event grading, regimen protocol library",
      "Nephrology — Dialysis (4%): Hemodialysis, peritoneal dialysis. Key data: Kt/V adequacy, access site rotation, fluid balance tracking, EPO dosing",
      "Dermatology (3%): Laser procedures, excision biopsies, Mohs surgery. Key tools: Lesion photography with body map, Fitzpatrick scale, dermatoscopy image comparison",
      "Remaining specialties (5%): Urology (cystoscopy, TURP), Gastroenterology (endoscopy, colonoscopy), Pulmonology (bronchoscopy), Pain Management (nerve blocks, epidurals), Plastic Surgery (scar revision), General Surgery (hernia, lipoma), Neurology (EMG/NCV)",
      "Created a 'Specialty Module Framework' — each specialty plugs a clinical overlay onto the shared operational spine without duplicating registration, billing, or discharge logic",
    ],
    aside: [
      { label: "IRDAI Procedures", value: "588" },
      { label: "Specialties Mapped", value: "16" },
      { label: "Ophthalmology Share", value: "32%" },
      { label: "Unique Data Fields", value: "340+" },
    ],
    visual: "grid",
  },
  {
    phase: "04 — Architecture & Define",
    year: "2024 – 2025",
    title: "Designing the operational spine for 28,000 centres",
    narrative:
      "Late 2024, with 16 specialty workflow maps, 6 personas, and 87 friction points in hand, we defined the platform architecture. The key decision: a modular 12-module operational backbone that every daycare centre shares, with pluggable specialty overlays. This meant a centre running only ophthalmology and dental could activate just those two specialty modules — while the registration, OPD, billing, pharmacy, and discharge modules work identically for everyone.",
    details: [
      "Module 1 — Dashboard: Real-time census, procedure board (airport-style), specialty distribution, insurance claim tracker, bed/bay occupancy map",
      "Module 2 — Registration: ABHA-linked patient master, 2-ID verification, allergy flagging, insurance pre-auth triggers, PMJAY eligibility check via NHA API",
      "Module 3 — OPD Queue: Token-based queue management, status cycling (waiting → vitals → in-consultation → completed), triage priority scoring",
      "Module 4 — Daycare Admission: Pre-op checklist (10-point WHO-aligned), consent digitization, NPO verification, site marking confirmation, bay allocation",
      "Module 5 — Procedure Board: Real-time OT schedule, WHO Surgical Safety Checklist (Sign-In, Time-Out, Sign-Out), anesthesia logging, estimated duration vs actual tracking",
      "Module 6 — Nursing Station: Vital signs capture with trend sparklines, MAR (Medication Administration Record), Aldrete/PADSS recovery scoring, nursing observation notes with timestamped entries",
      "Module 7 — Pharmacy: Drug dispensing with Schedule H/H1 enforcement, Jan Aushadhi generic substitution alerts, barcode-verified dispensing, drug interaction checker",
      "Module 8 — Laboratory: Pre-op panel management, barcode-tracked samples, result verification workflow, NABL-accredited report generation, critical alert auto-escalation",
      "Module 9 — Billing & Insurance: Multi-payer support (PMJAY, CGHS, ECHS, TPA, self-pay), package-based billing, real-time pre-auth, claim submission with auto-document assembly, UPI/card/net-banking payment capture",
      "Module 10 — Discharge: Bilingual discharge summary (English + regional language), ICD-11 coded diagnosis, discharge medication builder, follow-up scheduler, ABDM Health Record push to ABHA PHR",
      "Module 11 — MIS Dashboard: Revenue analytics, OT utilization, payer mix, specialty-wise performance, NABH quality indicators (SSI rate, re-admission, hand hygiene compliance, NPS)",
      "Module 12 — Consultation (Specialty): Pluggable clinical overlay per specialty — structured examination forms, procedure templates, operative record builders, post-op assessment workflows",
      "Defined 3 design principles: 'One-Screen Sufficiency' (80% of tasks on one screen), 'Clinical Context Persistence' (patient context always visible), 'Zero Data Re-entry' (information flows downstream without re-keying)",
    ],
    aside: [
      { label: "Core Modules", value: "12" },
      { label: "Design Principles", value: "3" },
      { label: "Shared vs Specialty", value: "11 + 16" },
      { label: "Target Centres", value: "28K+" },
    ],
    visual: "flow",
  },
  {
    phase: "05 — Design",
    year: "2025",
    title: "Dark mode for the operating theatre, light mode for the front desk",
    narrative:
      "Q1 2025, we moved into full design execution. The key insight that shaped our UI decisions: daycare staff work in two radically different environments — the bright, fluorescent-lit front desk and the dim, screen-intensive OT/procedure area. We designed a dual-theme system: a high-contrast dark UI for clinical/OT environments (reducing eye strain during 12-hour shifts) and an optional light theme for front-desk roles. The entire system was designed for a 3-panel layout — navigation, context, and action — optimized for 1366×768 (the most common hospital monitor resolution).",
    details: [
      "Built a healthcare-specific design system: 180+ components, 48 colour tokens (with clinical colour-coding — red for alerts, amber for elevated, green for normal), 6 typography scales, dedicated data-dense table variants",
      "Designed specialty-specific clinical forms: Ophthalmology (visual acuity grid, IOP tracker, slit lamp diagram, A-scan biometry card, IOL implant registry with barcode), Dental (interactive 32-tooth FDI chart, Winter's classification selector, procedure step builder), Gynecology (menstrual history structured form, PCPNDT compliance banner, hysteroscopy findings template)",
      "Created the Procedure Board — modelled after airport departure boards — showing real-time status of every OT/procedure room with time, patient, procedure, surgeon, room, and status (scheduled → in-progress → recovery → completed)",
      "Designed the Nursing Station with editable vital signs (click-to-edit), trend sparkline charts, medication administration record with 'Administer' action buttons, and a timestamped notes system",
      "Built the billing interface with Indian payment specifics: UPI QR, card, net banking, PMJAY pre-auth workflow, TPA claim lifecycle (submitted → query → settled), and GST-compliant invoice generation",
      "Designed ABDM integration touchpoints: ABHA scan at registration, health record push at discharge, consent management for data sharing, PHR app linking",
      "Ran 8 rounds of usability testing with clinicians, nurses, and billing staff — iterating after each round. Key finding: nurses needed one-tap vital recording, not form-filling",
      "Ensured WCAG AA compliance across all clinical interfaces — critical for clinicians with varying visual acuity reading screens in mixed-lighting OR environments",
    ],
    aside: [
      { label: "Components", value: "180+" },
      { label: "Colour Tokens", value: "48" },
      { label: "Specialty Forms", value: "16" },
      { label: "Usability Rounds", value: "8" },
    ],
    visual: "grid",
  },
  {
    phase: "06 — Patient Journey",
    year: "2025",
    title: "07:00 to 16:00 — one patient, twelve modules",
    narrative:
      "To validate the design worked end-to-end, we traced a single patient — Rajesh Kumar Sharma, 58, diabetic, cataract (left eye) — through every module from arrival to discharge. This 'golden path' testing revealed where data flowed seamlessly and where handoffs broke. The journey became our north star for the prototype.",
    details: [
      "06:45 Registration — ABHA scanned, demographics auto-filled from ABDM registry, allergy to Sulfa drugs and Iodine contrast flagged with red wristband alert, Star Health Gold insurance pre-auth triggered automatically",
      "07:00 OPD Queue — Token T-004 generated, status: Waiting. Triage nurse records vitals: BP 142/88 (elevated → amber alert), SpO₂ 97%, Temp 36.8°C, Pulse 78, RBS 148 (borderline → amber), Weight 72kg",
      "07:30 Consultation (Ophthalmology) — Dr. Priya Mehta opens visual acuity: OD 6/6, OS 6/24 (surgical eye). IOP: OD 16, OS 18. A-scan: axial length 23.12mm, ACD 3.2mm, SRK/T → IOL power +21.0D. Slit lamp: OS lens NO4 NC4 nuclear cataract. IOL selected: Alcon AcrySof IQ SN60WF, batch ACR-2026-0412",
      "08:00 Daycare Admission — Pre-op checklist: identity verified ✓, consent signed (procedure + anesthesia) ✓, NPO > 6hrs ✓, pre-op investigations reviewed ✓, anticoagulant hold verified ✓, site marking (left eye) ✓, allergy wristband (RED) ✓, blood group confirmed (B+) ✓, PAC completed (ASA II) ✓, Bay 3 allocated ✓",
      "08:30 Procedure Board — OT-1 slot 08:00, status changes: Scheduled → In-Progress. WHO Sign-In completed. Anesthesia: Topical (Proparacaine) + Peribulbar (Lignocaine 2% + Bupivacaine 0.5%). Phaco operative record: 8 steps tracked from clear corneal incision → IOL implantation → wound hydration",
      "09:00 Nursing Station — Post-op transfer to Recovery Bay 3. Aldrete score: 8/10 → monitoring q15min. Vitals recorded: BP 138/84 (improved), SpO₂ 97%, Pulse 76. Eye pad intact. Meds administered: Moxifloxacin 0.5% drops. Observation note: 'Patient comfortable, no complaints of pain'",
      "09:30 Pharmacy — Discharge medications prepared: Moxifloxacin 0.5% (4x/day, 2 weeks), Prednisolone 1% (6x/day → taper, 6 weeks), Nepafenac 0.1% (3x/day, 4 weeks), Paracetamol 500mg (SOS, 3 days). Schedule H verification ✓. Jan Aushadhi generic check ✓",
      "10:00 Laboratory — Pre-op panel verified: CBC, RBS (148 — borderline), HbA1c (6.8% — borderline diabetic), PT/INR (1.1 — normal), Creatinine (1.0), HIV/HBsAg/HCV (non-reactive). NABL-accredited report generated, barcode SMP-240006-RKS",
      "10:30 Nursing Recovery — Aldrete 10/10. Tolerated sips of water. Vision check: 6/18 (left eye). Discharge criteria met. Doctor clearance requested",
      "11:00 Billing — Package: Phaco + IOL (L) ₹18,500 + IOL implant (Alcon SN60WF) ₹12,000 + consumables + pharmacy ₹8,540 = Total ₹42,340. Star Health pre-auth approved ₹38,000. Patient co-pay: ₹4,340 via UPI. Invoice INV-2026-04-001 generated with GST",
      "11:30 Discharge — Bilingual summary generated (English + Hindi). ICD-11: H25.1. Procedure: Phaco + PCIOL (L). Medications listed with tapering schedule. Follow-up: 08 April 2026 (Day 2) with Dr. Priya Mehta. Emergency instructions documented. Health record pushed to ABHA PHR ✓",
      "Total time in facility: 4 hours 45 minutes. Total modules touched: 12. Data re-entry events: 0 (all information flowed downstream)",
    ],
    aside: [
      { label: "Total Duration", value: "4h 45m" },
      { label: "Modules Touched", value: "12" },
      { label: "Data Re-entry", value: "Zero" },
      { label: "Handoff Points", value: "11" },
    ],
    visual: "timeline",
  },
  {
    phase: "07 — Regulatory & Compliance",
    year: "2025",
    title: "Navigating India's healthcare compliance maze",
    narrative:
      "Healthcare software in India doesn't just need to work — it needs to comply. ABDM mandates, NABH accreditation requirements, PCPNDT Act enforcement, IRDAI daycare procedure lists, Drug & Cosmetics Act scheduling, and state-specific Clinical Establishment Rules — we designed compliance into the platform's DNA, not as a bolt-on afterthought.",
    details: [
      "ABDM / ABHA Integration — ABHA ID scan at registration, consent-based health record sharing, discharge summary auto-pushed to patient's PHR via Health Information Exchange (HIE-CM). Compliant with ABDM sandbox specifications v2.0",
      "NABH Daycare Standards — WHO Surgical Safety Checklist enforced as mandatory (Sign-In, Time-Out, Sign-Out). Quality indicators tracked: SSI rate, unplanned re-admission (48h), medication error rate, patient fall rate, hand hygiene compliance, ADR reporting rate, patient satisfaction (NPS)",
      "PCPNDT Act 1994 — For gynaecology: Form F auto-generated before any ultrasound scan. Mandatory fields: purpose, registered sonologist, patient consent, non-disclosure declaration. Audit trail maintained",
      "IRDAI Daycare Procedure List — 588 procedures mapped with procedure codes, specialty tagging, and standard package rates. TPA pre-auth workflow integrated with claim submission",
      "Drug Scheduling (D&C Act) — Schedule H and H1 drugs flagged in pharmacy module. Prescription verification mandatory. Jan Aushadhi generic alternatives suggested per NMC mandate",
      "Clinical Establishment Act — Facility registration validation, mandatory display of rates, clinical waste management logging, infection control checklists",
      "State-specific compliance: Karnataka KPME Act (rate display), Maharashtra Bombay Nursing Home Act (staffing ratios), Telangana Allopathic Private Medical Care Act (patient rights display)",
      "Data protection: Patient data encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based access control with audit logging. Consent framework aligned with upcoming DPDPA 2023 provisions",
    ],
    aside: [
      { label: "ABDM Version", value: "v2.0" },
      { label: "IRDAI Procedures", value: "588" },
      { label: "NABH Indicators", value: "9" },
      { label: "Encryption", value: "AES-256" },
    ],
    visual: "flow",
  },
  {
    phase: "08 — Prototyping & Testing",
    year: "2025",
    title: "The prototype that clinicians couldn't stop clicking",
    narrative:
      "Mid-2025, we built a comprehensive interactive prototype covering all 12 modules with 3 deep specialty workflows (Ophthalmology, Dental Surgery, Gynecology) and 9 Indian patient profiles. Every button, every status toggle, every checklist item, every vital sign edit, every procedure step — fully clickable. We put this prototype in front of 32 clinicians across 5 facilities for unmoderated testing.",
    details: [
      "Built 9 realistic patient profiles with Indian names, ABHA IDs, regional insurance providers (Star Health, PMJAY, CGHS, ECHS, ICICI Lombard, Niva Bupa, Self-Pay), and clinically accurate data per specialty",
      "Ophthalmology workflow: Complete visual acuity grid, IOP readings, A-scan biometry with IOL power calculation, slit lamp examination table, IOL implant details with barcode, 8-step phaco operative record (clickable to mark done), post-op assessment checklist",
      "Dental Surgery workflow: Interactive 32-tooth FDI dental chart (click any tooth for details), OPG/CBCT imaging panel, Winter's classification display, 6-step surgical extraction operative record, post-op instruction builder",
      "Gynecology workflow: Structured menstrual & obstetric history (G/P/A/L), mandatory UPT display, PCPNDT compliance banner with Form F generation, cervical screening panel, pre-procedure investigations, hysteroscopy operative findings, post-op counselling checklist",
      "Tested with 32 clinicians: 28 completed the full patient journey in under 6 minutes. Task success rate: 94%. SUS (System Usability Scale) score: 82/100 (excellent). Top feedback: 'Finally, a system that thinks like a daycare, not a 500-bed hospital'",
      "Identified and resolved 23 UX issues: nurses wanted one-tap vital recording (not dropdown menus), billing staff needed claim status visible from dashboard (not buried in billing), pharmacists wanted batch-level drug search (not brand-level)",
      "Performance: Prototype handles module switching in < 150ms, renders 32-tooth dental chart interactively, and processes 12-module patient journey without any page reloads",
    ],
    aside: [
      { label: "Patient Profiles", value: "9" },
      { label: "SUS Score", value: "82/100" },
      { label: "Task Success", value: "94%" },
      { label: "UX Issues Fixed", value: "23" },
    ],
    visual: "metrics",
  },
  {
    phase: "09 — Impact & Vision",
    year: "2025 – 2026",
    title: "From prototype to platform — the numbers that matter",
    narrative:
      "The prototype validated every hypothesis from our research phase. Clinician time savings, billing accuracy improvement, compliance automation — all measurable. We're now in early development, targeting pilot deployment at 3 daycare centres in Bengaluru, Mumbai, and Hyderabad by Q3 2026. The vision: become the default EHR for India's 28,000+ daycare centres — purpose-built, ABDM-native, and specialty-aware.",
    details: [
      "Projected 2+ hours saved per clinician per shift — from 23 minutes average per patient encounter (legacy) to 14 minutes (projected), primarily through zero data re-entry and one-screen sufficiency",
      "40% fewer clicks to access critical patient data — measured by comparing click-depth analysis between legacy HIS (average 7 clicks to see lab results) and our design (2 clicks from any module)",
      "100% NABH quality indicator automation — SSI rate, re-admission, consent documentation, hand hygiene, medication errors, ADR reporting, patient satisfaction — all tracked in real-time without manual data collection",
      "Insurance claim TAT projected reduction from 47 days (industry average) to 15 days — through auto-document assembly, pre-auth integration, and real-time claim tracking with TPA follow-up workflows",
      "ABDM readiness: Day-1 compliant with ABHA registration, health record push to PHR, consent framework, and Health Information Exchange. No bolt-on integration needed",
      "Accessibility: WCAG AA compliant across all modules. Tested in mixed-lighting OR environments, low-resolution monitors (1366×768), and touch-screen tablets for bedside nursing",
      "Scalability architecture: Multi-tenant SaaS model supporting 100+ concurrent centres, specialty module marketplace for community-contributed clinical overlays, regional language support (Hindi, Kannada, Telugu, Marathi, Tamil) for discharge summaries",
      "Target pilot: 3 centres (1 ophthalmology-focused, 1 multi-specialty, 1 government PMJAY-empanelled) across Bengaluru, Mumbai, and Hyderabad by Q3 2026. Success metric: 80% clinician adoption within 4 weeks of deployment",
    ],
    aside: [
      { label: "Time Saved/Shift", value: "2+ hrs" },
      { label: "Click Reduction", value: "40%" },
      { label: "Claim TAT Target", value: "15 days" },
      { label: "Pilot Centres", value: "3" },
    ],
    visual: "metrics",
  },
];

const projectData: Record<string, ProjectDetail> = {
  "nocode-platform": {
    title: "NoCode / LowCode Platform",
    category: "Platform Design",
    heroDesc:
      "A 4-year journey from market signal to full-fledged product — designing an intuitive visual builder that empowered non-engineers to create complex applications, reducing development dependency by 60%.",
    timeline: "2018 — 2022",
    tags: ["Design Systems", "React", "Figma", "User Research"],
    challenge:
      "Business users needed to build complex, data-driven applications without writing code. Existing tools were either too simplistic (no real logic) or too technical (might as well code). We needed to find the sweet spot — powerful enough for real apps, simple enough for non-developers.",
    approach: [
      "Conducted 40+ user interviews with business analysts, citizen developers, and IT admins to map mental models",
      "Designed a drag-and-drop canvas with contextual property panels — hiding complexity behind progressive disclosure",
      "Built a visual logic builder for workflows, conditions, and API integrations — replacing code with flowcharts",
      "Created a living design system with 120+ components shared between the builder UI and the apps it generates",
      "Ran 6 rounds of usability testing, iterating on affordance and learnability",
    ],
    impact: [
      "60% reduction in development dependency — business teams shipped features autonomously",
      "3x faster go-to-market for internal tools and client-facing apps",
      "NPS jumped from 32 to 71 within 6 months of the redesign",
      "Adopted by 200+ teams across the organization",
    ],
    features: [
      { title: "Visual App Builder", desc: "Drag-and-drop canvas with snap-to-grid, nested containers, and responsive breakpoint preview." },
      { title: "Logic Flow Editor", desc: "Node-based visual programming for business rules, API calls, and conditional branching." },
      { title: "Component Marketplace", desc: "Pre-built templates and components users can install and customize for their apps." },
      { title: "Real-time Preview", desc: "Instant preview of the built application with device simulation and data binding." },
    ],
    prototypeSlug: "nocode-platform",
    story: nocodeStory,
  },
  "ehr-platform": {
    title: "EHR Healthcare Platform",
    category: "Healthcare UX",
    heroDesc:
      "A purpose-built Electronic Health Record for India's ₹47,000 Cr daycare surgery market — covering 588 IRDAI procedures across 16 specialties, from ABHA-linked registration at 7 AM to ABDM-compliant discharge by 4 PM.",
    timeline: "2024 — 2026",
    tags: ["Healthcare", "ABDM / ABHA", "16 Specialties", "NABH Compliant", "Data Viz", "Design Thinking"],
    challenge:
      "India's 28,000+ daycare centres perform 588 unique procedures across 16 specialties — yet 82% run on paper registers and legacy HIS designed for inpatient hospitals. No EHR existed for the daycare rhythm: admit at 7 AM, operate by 10 AM, discharge by 4 PM. We needed to build a specialty-aware, ABDM-native platform from zero.",
    approach: [
      "Embedded in 9 daycare facilities across 4 cities over 14 weeks — shadowed 68 clinicians, 24 nurses, 12 pharmacists, and 8 billing staff",
      "Mapped clinical workflows for 16 specialties: Ophthalmology, Gynecology, Dental, Cardiology, Orthopedics, ENT, Oncology, Nephrology, Dermatology, Urology, Gastro, Pulmonology, Pain, Plastic Surgery, General Surgery, Neurology",
      "Designed a 12-module operational backbone with pluggable specialty overlays — centres activate only the specialties they offer",
      "Built deep specialty workflows for Ophthalmology (phaco + IOL), Dental Surgery (impacted extraction), and Gynecology (hysteroscopy) with full clinical data models",
      "Integrated ABDM ecosystem: ABHA scan at registration, health record push at discharge, consent management, PHR linking",
      "Tested with 32 clinicians across 5 facilities — 94% task success rate, SUS score 82/100",
    ],
    impact: [
      "2+ hours saved per clinician per shift through zero data re-entry and one-screen sufficiency",
      "40% fewer clicks to access critical patient data — from 7 clicks (legacy) to 2 clicks from any module",
      "100% NABH quality indicator automation — 9 indicators tracked in real-time without manual collection",
      "Insurance claim TAT projected from 47 days (industry avg) to 15 days through auto-document assembly",
    ],
    features: [
      { title: "12-Module Platform", desc: "Dashboard, Registration, OPD, Daycare Admission, Procedure Board, Nursing, Pharmacy, Lab, Billing, Discharge, MIS, and Specialty Consultation — all connected." },
      { title: "16 Specialty Workflows", desc: "Pluggable clinical overlays for each specialty — from visual acuity grids in Ophthalmology to FDI dental charts in Oral Surgery to PCPNDT compliance in Gynecology." },
      { title: "ABDM-Native", desc: "ABHA ID registration, health record push to PHR, consent framework, and Health Information Exchange — built in from day one, not bolted on." },
      { title: "Indian Billing Engine", desc: "PMJAY, CGHS, ECHS, TPA, and self-pay support with real-time pre-auth, claim lifecycle tracking, UPI/card payments, and GST-compliant invoicing." },
    ],
    prototypeSlug: "ehr-platform",
    story: ehrStory,
  },
  "iot-dashboard": {
    title: "CPCB Air Quality Command Center",
    category: "IoT / GovTech",
    heroDesc:
      "Designed a real-time ambient air quality monitoring system for India's pollution control boards — tracking CAAQMS stations, NAAQS compliance, and machine health across 12 cities.",
    tags: ["IoT", "CAAQMS", "CPCB", "Air Quality", "NAAQS", "GovTech", "Real-time"],
    challenge:
      "India's CAAQMS network spans 400+ stations operated by CPCB and state boards, yet operators relied on fragmented spreadsheets and delayed PDFs. Critical exceedances went unnoticed for hours, sensor faults degraded data quality undetected, and GRAP-level decisions lacked a single-pane view. Alert fatigue was rampant — 70% of notifications were low-priority or duplicated.",
    approach: [
      "Mapped the CPCB CAAQMS data pipeline — BAM, TEOM, chemiluminescence analyzers feeding Envidas DAS → SAFAR portal → NAQI calculation",
      "Designed a 7-module command center: Dashboard, Stations, Pollutant Detail, Compliance Alerts, Machine Health, NAAQS Standards, and Reports",
      "Built AQI category bands (Good → Severe) with real-time color coding across 12 Indian monitoring stations spanning 9 states",
      "Created a machine health tracker for 12 CAAQMS instruments — calibration schedules, firmware versions, uptime, and service requests",
      "Implemented NAAQS compliance checking against the 2009 notification standards for 9 pollutants (PM2.5, PM10, SO₂, NO₂, CO, O₃, NH₃, Pb, Benzene)",
    ],
    impact: [
      "Exceedance detection time reduced from hours to real-time with severity-tiered compliance alerts",
      "Machine downtime visibility improved — calibration-due and fault instruments flagged proactively",
      "Single dashboard replaced 6 fragmented tools used by SPCB field engineers",
      "Report generation (daily bulletin, monthly compliance, GRAP activation) reduced from 2 days manual to one-click",
    ],
    features: [
      { title: "National AQI Dashboard", desc: "Live AQI category distribution, worst-5 stations, PM2.5 bar chart, and network uptime across all CAAQMS stations." },
      { title: "Station Deep Dive", desc: "Per-station pollutant cards with NAAQS limit gauges, 24h trend charts, meteorological data, and system health metadata." },
      { title: "Compliance Alerts", desc: "NAAQS exceedance alerts with severity tiers (critical/warning/info), regulatory action tracking, and one-click acknowledgement." },
      { title: "Machine Health Tracker", desc: "12 CAAQMS instruments — BAM, TEOM, analyzers, DAS — with calibration schedule, firmware, uptime, and service request workflow." },
    ],
    prototypeSlug: "iot-dashboard",
  },
  "ott-platform": {
    title: "OTT Streaming Platform",
    category: "Entertainment / BigData",
    heroDesc:
      "Scaled UI for millions of data points in a video-on-demand platform, balancing content discovery with performance.",
    tags: ["OTT", "BigData", "Content Strategy", "Performance"],
    challenge:
      "With a catalog of 50K+ titles and millions of daily active users, content discovery was broken. Users couldn't find what to watch, recommendation carousels felt random, and the platform struggled with performance under load. We needed to redesign discovery without sacrificing speed.",
    approach: [
      "Analyzed viewing behavior data across 2M users — identified 6 distinct user personas with different browsing patterns",
      "Redesigned the content architecture with contextual shelves — mood-based, trending, continue-watching, and personalized",
      "Built a performant virtualized grid that lazy-loads metadata and images progressively",
      "Designed an immersive player experience with smart previews, skip-intro, and post-play recommendations",
      "A/B tested 12 layout variations measuring engagement, time-to-play, and session duration",
    ],
    impact: [
      "25% increase in content engagement through improved discovery UX",
      "40% reduction in time-to-play — users found content faster",
      "Page load time reduced from 4.2s to 1.1s through virtualization and lazy loading",
      "Platform scaled to handle 2M+ concurrent streams during peak events",
    ],
    features: [
      { title: "Smart Discovery", desc: "AI-powered content shelves with mood-based browsing, contextual recommendations, and trending sections." },
      { title: "Immersive Player", desc: "Full-screen player with gesture controls, picture-in-picture, and intelligent subtitle positioning." },
      { title: "Content Grid", desc: "Virtualized infinite scroll grid with progressive image loading and hover-activated previews." },
      { title: "User Profiles", desc: "Multi-profile support with individual watch history, preferences, and parental controls." },
    ],
    prototypeSlug: "ott-platform",
  },
  "construction-ai": {
    title: "Construction AI Platform",
    category: "ConTech / AI",
    heroDesc:
      "An AI-powered construction intelligence platform merging material procurement planning with predictive analytics — minimizing schedule risk, preventing delays, and delivering data-driven insights across 95% of previously unused project data.",
    timeline: "2025 — 2026",
    tags: ["Construction", "AI/ML", "Procurement", "Predictive Analytics", "Risk Management", "Procore", "P6", "BIM"],
    challenge:
      "The construction industry generates massive amounts of data — schedules, RFIs, submittals, change orders, material deliveries — yet 95% goes unused. Projects routinely face budget overruns and schedule delays hidden in siloed systems. Material procurement, critical to project success, lacks proactive planning tools. We needed to build a platform that connects this fragmented data, predicts risks before they become problems, and gives project teams actionable intelligence.",
    approach: [
      "Analyzed the $1.3T US construction market — identified that material procurement delays cause 23% of schedule slips, yet no tool existed for proactive planning",
      "Studied leading platforms (Procore, P6, Autodesk, ACONEX) — found data remained siloed, requiring manual correlation across 6+ systems",
      "Designed an auto-linking AI engine that connects schedules, submittals, RFIs, change orders, and delivery data across integrations",
      "Built predictive risk models trained on historical project data — identifying patterns that lead to delays, cost overruns, and quality issues",
      "Created specialty workflows for material tracking (lead times, submittal status, delivery scheduling) and progress monitoring (percent complete, variance analysis)",
      "Integrated with major construction tech stack: Procore, Oracle P6, Autodesk BIM 360, MS Project, ACONEX, SAP S/4HANA",
    ],
    impact: [
      "Risk detection time reduced from weeks to real-time with AI-powered anomaly detection and severity-tiered alerts",
      "Material delivery on-time rate improved to 87% through proactive lead time tracking and submittal workflow automation",
      "14-day schedule recovery identified through AI analysis of float optimization opportunities",
      "Single platform replaced 6 fragmented tools used by project managers, procurement teams, and field engineers",
    ],
    features: [
      { title: "AI Risk Intelligence", desc: "Real-time risk detection with AI confidence scoring, severity classification, impact analysis, and automated mitigation recommendations." },
      { title: "Material Procurement Tracker", desc: "End-to-end material planning from submittal to delivery — tracking lead times, supplier status, PO numbers, and schedule dependencies." },
      { title: "Predictive Analytics", desc: "Schedule and cost predictions using SPI/CPI metrics, estimated completion dates, and probability-based delay forecasting." },
      { title: "Auto-Linking Engine", desc: "Patented technology that connects data across Procore, P6, Autodesk, and other systems — creating a unified intelligence layer from 95% of unused data." },
    ],
    prototypeSlug: "construction-ai",
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
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

            {/* Prototype CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={`/work/${slug}/prototype`}
                target="_blank"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Open App Prototype
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </motion.div>
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
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-accent via-accent/60 to-purple-500 origin-left"
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
                  <div className="absolute left-5 top-full w-px h-16 sm:h-20 bg-gradient-to-b from-border to-transparent hidden sm:block" />
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
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent/0" />
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
                      <div key={mi} className="text-center p-5 rounded-2xl bg-gradient-to-b from-accent/5 to-transparent border border-accent/10">
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

          {/* Open Prototype CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Link
              href={`/work/${slug}/prototype`}
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Open App Prototype
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
          </motion.div>
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

    </main>
  );
}
