"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { ArrowRight, Check, Circle, Code, Dot, MapPin, Users, Shield, Store, Utensils, Car, Wallet, Building2, ChevronRight } from "lucide-react";

/* ─── Data ─── */

const milestones = [
  { phase: "v1 — Society App", label: "RWA-Centric", color: "#6366F1", year: "2024", desc: "Feed, safety, chat, marketplace, classifieds, SOS, society ops — a single app replacing WhatsApp groups + MyGate + classifieds." },
  { phase: "v2 — Peer Economy", label: "200m Radius", color: "#8B5CF6", year: "2025", desc: "Peer roles (cook/rider/coach/reseller), local business hub, community creation, group buying — anyone is supply within 200m." },
  { phase: "v3 — National OS", label: "Bharat Infrastructure", color: "#10B981", year: "2026+", desc: "40 modules across 12 categories — rural economy, healthcare, education, civic governance, disaster resilience — serving 1.44B Indians." },
];

const tamCircles = [
  { name: "SAM", value: "28K societies", arr: "₹1,450 Cr/Yr", desc: "Urban gated societies in top-8 metros with RWA structures" },
  { name: "TAM", value: "180K localities", arr: "₹8,200 Cr/Yr", desc: "+ Urban non-gated neighborhoods + tier-2 city clusters" },
  { name: "Long-tail", value: "1.2M clusters", arr: "₹47,000 Cr/Yr", desc: "+ Rural gram panchayats + semi-urban pin codes across India" },
];

const peerRoles = [
  { name: "Cook", icon: Utensils, color: "#F97316", desc: "List daily food menu, accept tiffin orders, receive payments — no GST, no shop required" },
  { name: "Rider", icon: Car, color: "#06B6D4", desc: "Post availability for errands/deliveries within 200m, get matched, earn per trip" },
  { name: "Coach", icon: Users, color: "#8B5CF6", desc: "List sessions/batches, booking calendar, accept payments — fitness, music, language, tutoring" },
  { name: "Reseller", icon: Store, color: "#EC4899", desc: "Buy and relist items with markup within the neighborhood — zero inventory risk" },
];

const personas = [
  { title: "Priya", role: "Resident-Everything", desc: "26–45, urban India. Uses 8 WhatsApp groups for society, kirana, rides, school. Needs one place that replaces them all.", color: "#6366F1" },
  { title: "Ramesh", role: "Kirana Owner", desc: "35–55, local shopkeeper. Knows customers by face but loses business to BigBasket. Needs a digital storefront reaching exactly his 500m.", color: "#F97316" },
  { title: "Meena", role: "Peer Cook", desc: "28–50, homemaker with excess cooking capacity. Makes biryani neighbors love. Needs a way to earn without formal business setup.", color: "#EC4899" },
  { title: "Arun", role: "Coach", desc: "25–40, fitness trainer. Has capacity beyond current students, works within 1km. Needs discovery + booking + payment in one place.", color: "#06B6D4" },
  { title: "Rajan", role: "Senior Resident", desc: "60+, lives alone. Trusts neighbors deeply. Needs large-font UI, regional language, SOS, and someone to run errands.", color: "#10B981" },
  { title: "Ananya", role: "New Arrival", desc: "22–32, just moved in. Knows nobody. Needs local discovery — which kirana is good, who are her neighbors, what's nearby.", color: "#F59E0B" },
];

const designDecisions = [
  { decision: "Radius as Primitive", choice: "200m/500m/2km is the core filter — not social graph, not categories", why: "Geography binds real neighborhood commerce. A kirana 200m away is relevant; one 2km away is not. Users expand radius deliberately — it's never the default.", color: "#6366F1" },
  { decision: "Role Fluidity", choice: "One profile, many roles — toggle activates Cook/Rider/Coach/Reseller mode", why: "Every user is simultaneously resident, buyer, seller, and service provider. Creating separate apps or accounts kills adoption. The toggle is instant, reversible, and cost-free.", color: "#8B5CF6" },
  { decision: "Tiered Trust", choice: "Bronze (phone) → Silver (address) → Gold (ID + selfie); features gated by tier", why: "Trust is not binary. A phone-verified user can read the feed; an address-verified user can transact; an ID-verified user can become a merchant or RWA admin. Escalation is possible.", color: "#10B981" },
  { decision: "Anyone Is Supply", choice: "No gatekeeping on who can offer services — a toggle activates a role", why: "The biryani Mrs. Mehta makes is better than anything Swiggy delivers — and 20 neighbors want it. Lokul doesn't create supply; it surfaces what already exists within verified proximity.", color: "#F97316" },
  { decision: "Businesses Are Peers", choice: "Local businesses post in the same feed as residents — no separate 'ads section'", why: "The kirana announcing a dal arrival is as useful as a neighbor's post. Segregating businesses into a 'sponsored' silo destroys the community feel and reduces merchant ROI.", color: "#EC4899" },
  { decision: "Offline India First", choice: "Works on 3G, low-end Android, regional languages — not every user has Jio 5G", why: "India's next 500M smartphone users are on budget devices with patchy connectivity. The app must feel native on a ₹8,000 phone in a tier-3 city with 10Mbps down.", color: "#F59E0B" },
  { decision: "Government as Partner", choice: "Integrate with Aadhaar, DigiLocker, ONDC, ABDM — don't compete with them", why: "India's digital public infrastructure is a gift, not a threat. Aadhaar e-KYC saves years of identity build. ONDC connects Lokul merchants to all buyer apps. ABDM makes healthcare interoperable.", color: "#06B6D4" },
];

const revenueStreams = [
  { stream: "Booking Take-Rate", value: "5–8%", desc: "On in-app bookings (cook, coach, rider, formal services) — seller earns net", color: "#6366F1" },
  { stream: "Business Listing", value: "₹299–999/mo", desc: "Storefront subscription for kirana, salon, clinic, school — catalogue, hours, orders", color: "#8B5CF6" },
  { stream: "Hyperlocal Reach Boost", value: "₹20–500", desc: "Promote offers to users within chosen radius — self-serve, auction-based", color: "#F97316" },
  { stream: "Community Tools", value: "2–3%", desc: "On ticketed events and group buys — organizer pays", color: "#EC4899" },
  { stream: "RWA SaaS", value: "0.5%", desc: "On dues collected (capped ₹10/txn) — society ops digitization", color: "#10B981" },
  { stream: "Delivery Network", value: "₹10–30", desc: "Per local rider delivery — buyer pays for last-mile from kirana/home", color: "#06B6D4" },
];

const builtItems = [
  "Monorepo: Next.js 16 web + React Native/Expo mobile + ui-tokens package",
  "42 Prisma models across identity, societies, feed, marketplace, safety, wallet, platform",
  "90+ mobile screens across 28 route groups with full navigation",
  "46+ API routes covering auth, mobile, admin, webhooks, integrations",
  "Full admin CMS with 43 route groups — users, posts, merchants, moderation, KYC, analytics",
  "22 Zustand stores for mobile state management",
  "Ably real-time integration for chat, feed, SOS, group buying",
  "Razorpay payment gateway integration (dev mode)",
  "Prisma schema with 7 Prisma migrations",
  "Cloudflare Worker for geo-headers + SOS escalation cron",
  "Playwright E2E test suite with mobile emulation",
  "Load testing script (autocannon) for API benchmarking",
];

const nextItems = [
  "Production payment gateway wiring (Razorpay/Cashfree)",
  "SMS OTP provider integration (MSG91) to production",
  "Push notification delivery (FCM + APNs certificates)",
  "Production database + secrets (Vercel + Neon/PlanetScale)",
  "RBI PPI compliance for wallet >₹10k/month",
  "Terms of Service, Privacy Policy, Grievance Officer",
  "App Store + Play Store submission",
  "Real-time chat (currently REST polling, needs full Ably wiring)",
  "Google Maps API key for production",
  "Rate limiting + auth hardening on API routes",
];

export default function LokulResearchPage() {
  const [activeRole, setActiveRole] = useState<number | null>(null);

  return (
    <div className="pt-24">
      {/* ════════════════════════════════════════ */}
      {/* 1. EXECUTIVE SUMMARY & HERO            */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Research · Product · Architecture</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                The <span className="text-gradient">Lokul</span> Project.
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto mb-8">
                The hyperlocal neighborhood economy platform for urban India — making 200 meters the most valuable radius in Indian commerce.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden max-w-3xl mx-auto">
              {[{ value: "90+", label: "Mobile Screens" }, { value: "42", label: "DB Models" }, { value: "46+", label: "API Routes" }, { value: "3", label: "Product Phases" }].map((s) => (
                <div key={s.label} className="bg-background p-6">
                  <div className="text-2xl md:text-3xl font-heading font-bold">{s.value}</div>
                  <p className="text-xs font-mono text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product Evolution Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {milestones.map((m, i) => (
              <motion.div key={m.phase} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="relative p-6 rounded-2xl border overflow-hidden" style={{ borderColor: m.color + "25", backgroundColor: m.color + "04" }}>
                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-[0.04]" style={{ backgroundColor: m.color }} />
                <div className="relative">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ borderColor: m.color + "30", color: m.color, backgroundColor: m.color + "10" }}>{m.year}</span>
                  <h3 className="text-lg font-bold mt-3 mb-1" style={{ color: m.color }}>{m.phase}</h3>
                  <p className="text-xs font-mono text-muted/70 mb-2">{m.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 2. ISOMETRIC WORKFLOW                  */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="User Flow" title="From onboarding to transaction." description="How a user moves through the Lokul ecosystem — from first signup to active participation in the 200-meter economy." />
          <div className="relative w-full overflow-x-auto">
            <svg viewBox="0 0 960 340" className="min-w-[640px] md:min-w-0 md:w-full h-auto" fill="none">
              {/* Defs */}
              <defs>
                <linearGradient id="flowGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>
                {[
                  { id: "top1", color: "#6366F1" },
                  { id: "left1", color: "#4F46E5" },
                  { id: "right1", color: "#4338CA" },
                  { id: "top2", color: "#8B5CF6" },
                  { id: "left2", color: "#7C3AED" },
                  { id: "right2", color: "#6D28D9" },
                  { id: "top3", color: "#10B981" },
                  { id: "left3", color: "#059669" },
                  { id: "right3", color: "#047857" },
                  { id: "top4", color: "#F59E0B" },
                  { id: "left4", color: "#D97706" },
                  { id: "right4", color: "#B45309" },
                  { id: "top5", color: "#EC4899" },
                  { id: "left5", color: "#DB2777" },
                  { id: "right5", color: "#BE185D" },
                ].map((g) => (
                  <linearGradient key={g.id + "-g"} id={g.id}>
                    <stop offset="0%" stopColor={g.color} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={g.color} stopOpacity="0.6" />
                  </linearGradient>
                ))}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Connector paths with animated flow */}
              {[
                { d: "M225,170 Q280,130 340,115", color: "#8B5CF6", delay: 0 },
                { d: "M415,110 Q470,150 530,170", color: "#10B981", delay: 0.3 },
                { d: "M605,165 Q660,125 720,115", color: "#F59E0B", delay: 0.6 },
                { d: "M795,110 Q840,165 870,220", color: "#EC4899", delay: 0.9 },
              ].map((conn, i) => (
                <g key={conn.d}>
                  {/* Glow path */}
                  <motion.path
                    d={conn.d}
                    stroke={conn.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.15"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: conn.delay + 0.5, ease: "easeInOut" }}
                  />
                  {/* Animated dashed flow line */}
                  <motion.path
                    d={conn.d}
                    stroke={conn.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="6 8"
                    fill="none"
                    opacity="0.7"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: conn.delay + 0.5, ease: "easeInOut" }}
                  />
                  {/* Continuous flow dots */}
                  <motion.circle
                    r="3.5"
                    fill={conn.color}
                    filter="url(#glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: conn.delay }}
                    style={{ offsetPath: `path('${conn.d}')` }}
                  />
                </g>
              ))}

              {/* Node 1 — Onboard */}
              <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <polygon points="128,177 180,157 232,177 180,197" fill="url(#top1)" />
                <polygon points="128,177 180,197 180,224 128,204" fill="url(#left1)" />
                <polygon points="180,197 232,177 232,204 180,224" fill="url(#right1)" />
                {/* Icon group */}
                <g transform="translate(180,193)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <rect x="-8" y="-12" width="16" height="22" rx="2" />
                  <line x1="-4" y1="-7" x2="4" y2="-7" />
                  <line x1="-4" y1="-3" x2="4" y2="-3" />
                  <line x1="-4" y1="1" x2="0" y2="1" />
                  <line x1="0" y1="6" x2="0" y2="8" />
                </g>
                <motion.text x="180" y="258" textAnchor="middle" className="text-[11px] sm:text-[13px]" fill="white" fontWeight="700" fontFamily="var(--font-heading)">
                  Onboard
                </motion.text>
                <text x="180" y="273" textAnchor="middle" className="text-[8px] sm:text-[10px]" fill="#94A3B8" fontFamily="var(--font-mono)">
                  Phone OTP · PIN
                </text>
              </motion.g>

              {/* Node 2 — KYC */}
              <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                <polygon points="308,112 360,92 412,112 360,132" fill="url(#top2)" />
                <polygon points="308,112 360,132 360,159 308,139" fill="url(#left2)" />
                <polygon points="360,132 412,112 412,139 360,159" fill="url(#right2)" />
                <g transform="translate(360,128)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </g>
                <motion.text x="360" y="192" textAnchor="middle" className="text-[11px] sm:text-[13px]" fill="white" fontWeight="700" fontFamily="var(--font-heading)">
                  KYC
                </motion.text>
                <text x="360" y="207" textAnchor="middle" className="text-[8px] sm:text-[10px]" fill="#94A3B8" fontFamily="var(--font-mono)">
                  Bronze → Silver → Gold
                </text>
              </motion.g>

              {/* Node 3 — Locality */}
              <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                <polygon points="498,177 550,157 602,177 550,197" fill="url(#top3)" />
                <polygon points="498,177 550,197 550,224 498,204" fill="url(#left3)" />
                <polygon points="550,197 602,177 602,204 550,224" fill="url(#right3)" />
                <g transform="translate(550,193)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M10 20S4 13.5 4 9a6 6 0 0 1 12 0c0 4.5-6 11-6 11z" />
                  <circle cx="10" cy="9" r="2" />
                </g>
                <motion.text x="550" y="258" textAnchor="middle" className="text-[11px] sm:text-[13px]" fill="white" fontWeight="700" fontFamily="var(--font-heading)">
                  Locality
                </motion.text>
                <text x="550" y="273" textAnchor="middle" className="text-[8px] sm:text-[10px]" fill="#94A3B8" fontFamily="var(--font-mono)">
                  Society · Tower · 200m Radius
                </text>
              </motion.g>

              {/* Node 4 — Engage */}
              <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
                <polygon points="688,112 740,92 792,112 740,132" fill="url(#top4)" />
                <polygon points="688,112 740,132 740,159 688,139" fill="url(#left4)" />
                <polygon points="740,132 792,112 792,139 740,159" fill="url(#right4)" />
                <g transform="translate(740,128)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </g>
                <motion.text x="740" y="192" textAnchor="middle" className="text-[11px] sm:text-[13px]" fill="white" fontWeight="700" fontFamily="var(--font-heading)">
                  Engage
                </motion.text>
                <text x="740" y="207" textAnchor="middle" className="text-[8px] sm:text-[10px]" fill="#94A3B8" fontFamily="var(--font-mono)">
                  Feed · Chat · Communities
                </text>
              </motion.g>

              {/* Node 5 — Transact */}
              <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8 }}>
                <polygon points="838,227 890,207 942,227 890,247" fill="url(#top5)" />
                <polygon points="838,227 890,247 890,274 838,254" fill="url(#left5)" />
                <polygon points="890,247 942,227 942,254 890,274" fill="url(#right5)" />
                <g transform="translate(890,243)" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </g>
                <motion.text x="890" y="308" textAnchor="middle" className="text-[11px] sm:text-[13px]" fill="white" fontWeight="700" fontFamily="var(--font-heading)">
                  Transact
                </motion.text>
                <text x="890" y="323" textAnchor="middle" className="text-[8px] sm:text-[10px]" fill="#94A3B8" fontFamily="var(--font-mono)">
                  Marketplace · Peer Roles
                </text>
              </motion.g>
            </svg>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 3. MARKET & THESIS                     */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Market Analysis" title="The 200-Meter Thesis." description="India's informal hyperlocal economy is massive, alive, and completely unplatformed. Lokul does not need to create demand or supply — it needs to make them discoverable to each other within a verified, trusted, geography-bounded radius." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-bold mb-3 text-foreground">The Unplatformed Economy</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex gap-3"><Dot size={16} className="text-accent shrink-0 mt-0.5" /><span>The biryani Mrs. Mehta makes is better than anything Swiggy delivers — and 20 neighbors want it.</span></li>
                <li className="flex gap-3"><Dot size={16} className="text-accent shrink-0 mt-0.5" /><span>The kirana below your building stocks exactly what you need — and loses business to BigBasket because it has no digital presence.</span></li>
                <li className="flex gap-3"><Dot size={16} className="text-accent shrink-0 mt-0.5" /><span>The gym trainer two floors up has 6 paying clients through WhatsApp — and could have 60.</span></li>
                <li className="flex gap-3"><Dot size={16} className="text-accent shrink-0 mt-0.5" /><span>The school 300 meters away posts admissions on a physical board — parents 200m away never see them.</span></li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-surface border border-border">
              <h3 className="text-lg font-bold mb-3" style={{ color: "#10B981" }}>The Three Unlocks</h3>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex gap-3"><Check size={14} className="text-[#10B981] shrink-0 mt-0.5" /><span><strong className="text-foreground">Radius as primitive</strong> — 200m / 500m / 2km is the core filter, not city, not category, not social graph.</span></li>
                <li className="flex gap-3"><Check size={14} className="text-[#10B981] shrink-0 mt-0.5" /><span><strong className="text-foreground">Role fluidity</strong> — every user is simultaneously resident, buyer, seller, cook, rider, coach; roles activate with a toggle.</span></li>
                <li className="flex gap-3"><Check size={14} className="text-[#10B981] shrink-0 mt-0.5" /><span><strong className="text-foreground">Trust by proximity</strong> — neighbors already know each other; Lokul adds verified identity + transaction infrastructure on top.</span></li>
              </ul>
            </motion.div>
          </div>

          {/* TAM Circles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {tamCircles.map((circle, i) => (
              <motion.div key={circle.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-6 rounded-2xl border border-border bg-surface text-center overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#10B981" }} />
                <div className="relative">
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#10B981" }}>{circle.name}</p>
                  <div className="text-xl font-bold text-foreground">{circle.value}</div>
                  <div className="text-2xl font-heading font-bold mt-1" style={{ color: i === 0 ? "#6366F1" : i === 1 ? "#8B5CF6" : "#10B981" }}>{circle.arr}</div>
                  <p className="text-[10px] text-muted mt-2">{circle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 4. PERSONAS                            */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="User Personas" title="Who Lokul serves." description="Seven distinct user personas — from the resident-everything to the kirana owner to the senior citizen. Each represents a different pain point, a different buying center, and a different entry into the Lokul ecosystem." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-5 rounded-2xl border border-border bg-surface">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: p.color + "20", color: p.color }}>{p.title[0]}</div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="text-[10px] font-mono" style={{ color: p.color }}>{p.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 5. ARCHITECTURE & SYSTEM DESIGN        */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Architecture" title="System Design & Data Model." description="Lokul is built as a monorepo with 3 packages: a Next.js 16 web app, a React Native + Expo mobile app (90+ screens), and a shared ui-tokens design system. The backend serves 42 database models across identity, society, feed, marketplace, safety, wallet, and platform domains." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Code size={14} className="text-accent" /> Tech Stack</h3>
              <div className="space-y-2">
                {[
                  { label: "Framework", value: "Next.js 16 (web) + Expo SDK 56 (mobile)" },
                  { label: "Database", value: "PostgreSQL 16 with PostGIS, Prisma 7 ORM" },
                  { label: "Cache & Queue", value: "Redis 7 + BullMQ (rate limiting, job queues)" },
                  { label: "Realtime", value: "Ably (chat, feed, SOS, live updates)" },
                  { label: "Auth", value: "Phone OTP via MSG91; NextAuth for admin" },
                  { label: "Payments", value: "Razorpay primary, Cashfree secondary" },
                  { label: "Storage", value: "Cloudflare R2 (media, KYC documents)" },
                  { label: "Edge", value: "Cloudflare Worker (geo-headers, SOS cron)" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <span className="text-[11px] font-mono text-muted">{t.label}</span>
                    <span className="text-[11px] text-foreground font-medium text-right">{t.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Building2 size={14} className="text-accent" /> Data Model (42 Models)</h3>
              <div className="space-y-2">
                {[
                  { category: "Identity", models: "User, KycDocument, Vouch, OtpVerification, PushToken" },
                  { category: "Societies", models: "Society, Tower, SocietyAdmin, UserResidence" },
                  { category: "Feed", models: "Post, PostMedia, PostTag, Reaction, Comment" },
                  { category: "Marketplace", models: "Classified, Merchant, ServiceSlot, Appointment, QuoteRequest, Order, Rating" },
                  { category: "Peer Services", models: "ServiceListing, Order, Rating" },
                  { category: "Safety", models: "SosIncident, SosResponder, SafetyContact, SafetyJourney, Volunteer, MedicalProfile, IncidentReport" },
                  { category: "Chat", models: "ChatThread, ChatMembership, ChatMessage" },
                  { category: "Wallet", models: "WalletEntry, RazorpayOrder" },
                  { category: "Platform", models: "Report, ModAction, StrikeRecord, AuditLog, FeatureFlag, Broadcast, IntegrationConfig" },
                ].map((m) => (
                  <div key={m.category} className="flex items-start gap-2 py-1 border-b border-border/50 last:border-0">
                    <span className="text-[10px] font-mono text-accent shrink-0 w-20">{m.category}</span>
                    <span className="text-[10px] font-mono text-muted">{m.models}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Architectural Principles */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
            <h3 className="text-sm font-bold text-foreground mb-4">Architectural Principles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: "PIN-code is the unit", desc: "Every entity has a PIN code + geocode. Discovery, feed, and safety all radiate from this.", color: "#6366F1" },
                { title: "Trust is tiered", desc: "Bronze → Silver → Gold. Features gate by tier. Downgrade is possible.", color: "#8B5CF6" },
                { title: "Realtime by default", desc: "Feed, chat, SOS, polls — all push-updated via Ably, never poll-based.", color: "#EC4899" },
                { title: "Offline-first reads", desc: "Last 200 feed items, chat, profile cached locally. Writes queue for retry.", color: "#10B981" },
              ].map((p) => (
                <div key={p.title} className="p-3 rounded-xl border" style={{ borderColor: p.color + "20", backgroundColor: p.color + "06" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-xs font-bold text-foreground">{p.title}</span>
                  </div>
                  <p className="text-[10px] text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 6. CORE FEATURES DEEP-DIVE             */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Core Features" title="The 200-Meter Product." description="Lokul's feature set spans feed-based discovery, safety infrastructure, peer economy marketplace, community tools, and society operations — all within a geography-bounded radius." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center"><MapPin size={18} className="text-[#6366F1]" /></div>
                <div><h4 className="text-sm font-bold text-foreground">Feed + Radius Discovery</h4><p className="text-[10px] font-mono text-muted">200m / 500m / 2km</p></div>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">A single chronological feed of all neighborhood activity — posts, safety alerts, lost items, events, polls, business offers — filtered by a user-selectable radius. The default is 200m; users expand deliberately.</p>
              <ul className="space-y-1.5">
                {["Post types: update, safety, lost, event, poll, sell, RWA notice, SOS", "Business posts appear alongside resident posts — no separate ads silo", "Reactions (like/love/thanks/support/concern) + nested comments", "Stories: 24-hour ephemeral posts with view tracking"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11px] text-muted"><Check size={10} className="text-[#6366F1] shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="p-6 rounded-2xl border border-border bg-surface">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center"><Shield size={18} className="text-[#10B981]" /></div>
                <div><h4 className="text-sm font-bold text-foreground">Safety & SOS</h4><p className="text-[10px] font-mono text-muted">Panic button · Proximity waves · Responders</p></div>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">A persistent SOS button accessible from anywhere in the app. On trigger: 5s countdown → live GPS broadcast to trusted contacts → 200m proximity wave to nearby volunteers → auto-record + cloud upload.</p>
              <ul className="space-y-1.5">
                {["200m → 400m proximity escalation waves if no responder in 60s", "Volunteer responder network with verified identity", "Safety Journey: guardian watches a user's route in real-time", "Medical Profile: blood group, allergies, conditions accessible to responders"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11px] text-muted"><Check size={10} className="text-[#10B981] shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Peer Roles Interactive */}
          <h3 className="text-2xl font-bold mb-4">Peer Roles — The Supply Side</h3>
          <p className="text-muted mb-6 max-w-2xl">Any resident can activate a peer role with a single toggle. No business registration, no GST, no separate account. The same profile serves buyer and seller identities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {peerRoles.map((role, i) => {
              const isActive = activeRole === i;
              return (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActiveRole(isActive ? null : i)}
                  className="p-5 rounded-2xl border cursor-pointer transition-all duration-300"
                  style={{ borderColor: isActive ? role.color + "50" : "var(--color-border)", backgroundColor: isActive ? role.color + "06" : "var(--color-surface)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: role.color + "15" }}>
                      <role.icon size={18} style={{ color: role.color }} />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">{role.name}</h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{role.desc}</p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-[10px] font-mono" style={{ color: role.color }}>
                            {role.name === "Cook" ? "Activated at Silver KYC. List menu, set pricing, receive orders & payments in-app." :
                             role.name === "Rider" ? "Activated at Silver KYC. Post availability windows, get matched to nearby delivery requests." :
                             role.name === "Coach" ? "Activated at Silver KYC. Set up session types, calendar, pricing. Booking + payment in-app." :
                             "Activated at Silver KYC. List items with markup, manage listings, arrange meetups via Lokul chat."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Users, label: "Communities", desc: "Anyone creates micro-communities — morning walk, book club, parents network — with join policies and member roles.", color: "#8B5CF6" },
              { icon: Wallet, label: "Group Buying", desc: "Community-coordinated bulk purchases with commit thresholds, pooled orders, and wallet-split payments.", color: "#F97316" },
              { icon: Car, label: "Carpool", desc: "Driver posts trip → passengers join within locality. Price splitting and route matching.", color: "#06B6D4" },
              { icon: Store, label: "Local Business Hub", desc: "Digital storefronts for kirana, salon, clinic, school — catalogue, slot booking, order management.", color: "#EC4899" },
              { icon: Utensils, label: "Tiffin Ordering", desc: "Daily food menu from home cooks with pre-order, subscription, and in-app payments.", color: "#F59E0B" },
              { icon: Building2, label: "Society Ops", desc: "Visitor e-passes, staff attendance, RWA notices, binding polls, dues collection, lost & found.", color: "#10B981" },
            ].map((f) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-4 rounded-xl border border-border bg-surface flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: f.color + "10" }}><f.icon size={14} style={{ color: f.color }} /></div>
                <div><h4 className="text-xs font-bold text-foreground">{f.label}</h4><p className="text-[10px] text-muted mt-0.5">{f.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 7. DESIGN DECISIONS                    */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Design Decisions" title="The key choices that shaped Lokul." description="Every product is a set of tradeoffs. Here are the most consequential decisions made during Lokul's design — and why each one was chosen." />
          <div className="space-y-4">
            {designDecisions.map((d, i) => (
              <motion.div key={d.decision} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 sm:p-6 rounded-2xl border" style={{ borderColor: d.color + "20", backgroundColor: d.color + "04" }}>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: d.color }} />
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-foreground">{d.decision}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: d.color + "15", color: d.color }}>{d.choice}</span>
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
      {/* 8. BUSINESS MODEL & MONETIZATION       */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Business Model" title="Revenue streams & unit economics." description="Lokul earns by enabling transactions, not by charging for visibility. Supply-side earns; Lokul takes a small share. Multiple revenue lines create a diversified, resilient model." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {revenueStreams.map((r, i) => (
              <motion.div key={r.stream} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="p-5 rounded-2xl border" style={{ borderColor: r.color + "20", backgroundColor: r.color + "04" }}>
                <div className="text-xl font-heading font-bold" style={{ color: r.color }}>{r.value}</div>
                <h4 className="text-sm font-bold text-foreground mt-1">{r.stream}</h4>
                <p className="text-[10px] text-muted mt-1">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Fundraising */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
            <h4 className="text-sm font-bold text-foreground mb-4">Fundraising Thesis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { round: "Pre-Seed", target: "₹1–2 Cr ($120–240K)", structure: "SAFE at ₹15–20 Cr valuation cap", color: "#6366F1" },
                { round: "Seed", target: "₹8–15 Cr ($1–2M)", structure: "18-month runway, team of 8–12", color: "#8B5CF6" },
                { round: "Target Investors", target: "Blume, Prime, Elevation, Stellaris, 3one4", structure: "Angel: Kunal Shah, Amrish Rau, Jitendra Gupta", color: "#10B981" },
              ].map((f) => (
                <div key={f.round} className="p-4 rounded-xl border" style={{ borderColor: f.color + "20", backgroundColor: f.color + "06" }}>
                  <p className="text-[10px] font-mono" style={{ color: f.color }}>{f.round}</p>
                  <p className="text-sm font-bold text-foreground mt-1">{f.target}</p>
                  <p className="text-[10px] text-muted mt-0.5">{f.structure}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 9. CURRENT STATUS & ROADMAP            */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Current Status" title="Where Lokul is today." description="The monorepo is fully scaffolded with 42 database models, 90+ mobile screens, 46+ API routes, and a full admin CMS. The backend is code-complete across most domains with ~4–6 weeks of production integration work remaining." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/05">
              <h4 className="text-sm font-bold text-[#10B981] mb-3 flex items-center gap-1.5"><Check size={14} /> Built</h4>
              <ul className="space-y-2">
                {builtItems.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-muted"><Check size={12} className="text-[#10B981] shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/05">
              <h4 className="text-sm font-bold text-[#F59E0B] mb-3 flex items-center gap-1.5"><Circle size={14} /> In Progress / Next</h4>
              <ul className="space-y-2">
                {nextItems.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-muted"><Circle size={12} className="text-[#F59E0B] shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Release Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
            <h4 className="text-sm font-bold text-foreground mb-4">Release Plan</h4>
            <div className="space-y-3">
              {[
                { phase: "α — Closed Alpha", when: "T+3 mo", scope: "1 locality, 100 users, 10 businesses; Feed, Chat, Business Hub, 1 peer role (Cook)", color: "#6366F1" },
                { phase: "β — Open Beta", when: "T+5 mo", scope: "10 localities, 2,000 users, 100 businesses; All peer roles, Community, Group buying", color: "#8B5CF6" },
                { phase: "GA 2.0", when: "T+8 mo", scope: "Mumbai MMR open; all 20 modules; 50K users, 2,000 businesses", color: "#EC4899" },
                { phase: "v2.1", when: "T+11 mo", scope: "Pune + Bangalore; Tamil/Kannada; AI assistant; school bus carpool", color: "#F59E0B" },
                { phase: "v2.2", when: "T+14 mo", scope: "Top-8 metros; Telugu, Bengali, Gujarati; business subscription engine", color: "#10B981" },
              ].map((r) => (
                <div key={r.phase} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: r.color + "08" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                    <div>
                      <p className="text-xs font-medium text-foreground">{r.phase}</p>
                      <p className="text-[10px] text-muted">{r.scope}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: r.color }}>{r.when}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 10. V3 — NATIONAL OS VISION            */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="Phase 3 Vision" title="The Operating System of Bharat." description="From hyperlocal app to national infrastructure — 40 modules across 12 empowerment categories serving India's 1.44 billion people. Rural economy, healthcare, education, women empowerment, civic governance, and disaster resilience." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              { name: "Rural Economy & Farmer", count: "8 modules", color: "#10B981" },
              { name: "Healthcare & Wellness", count: "5 modules", color: "#06B6D4" },
              { name: "Education & Skilling", count: "4 modules", color: "#8B5CF6" },
              { name: "Women Empowerment", count: "4 modules", color: "#EC4899" },
              { name: "Civic Governance", count: "4 modules", color: "#6366F1" },
              { name: "Disaster Resilience", count: "3 modules", color: "#F97316" },
              { name: "Senior Care", count: "3 modules", color: "#F59E0B" },
              { name: "Financial Inclusion", count: "3 modules", color: "#84CC16" },
            ].map((cat) => (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface">
                <span className="text-xs font-medium text-foreground">{cat.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: cat.color + "15", color: cat.color }}>{cat.count}</span>
              </motion.div>
            ))}
          </div>

          {/* Population segments */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-border bg-surface">
            <h4 className="text-sm font-bold text-foreground mb-4">Population Segments — Non-Negotiable Coverage</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { seg: "Rural households", pop: "900M" },
                { seg: "Informal workers", pop: "500M+" },
                { seg: "Women not in workforce", pop: "350M" },
                { seg: "Agricultural workers", pop: "270M" },
                { seg: "Senior citizens (60+)", pop: "180M" },
                { seg: "Youth seeking income", pop: "200M" },
                { seg: "Differently abled", pop: "50M" },
                { seg: "Tribal communities", pop: "104M" },
              ].map((s) => (
                <div key={s.seg} className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-background">
                  <span className="text-[10px] text-muted">{s.seg}</span>
                  <span className="text-[10px] font-mono text-foreground font-semibold">{s.pop}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════ */}
      {/* 11. LINKS & ECOSYSTEM                  */}
      {/* ════════════════════════════════════════ */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Explore Further</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Dive into the <span className="text-gradient">Lokul ecosystem.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Monorepo", href: "https://github.com/VivekcMW/lokul.club", desc: "Full stack with 3 packages, 42 models", color: "#6366F1" },
              { label: "PRD v1", href: "#", desc: "Society app: 16 documents", color: "#8B5CF6" },
              { label: "PRD v2", href: "#", desc: "Peer economy: 11 documents", color: "#EC4899" },
              { label: "Phase 3 Vision", href: "#", desc: "National OS: 40 modules", color: "#10B981" },
              { label: "Investor Analysis", href: "#", desc: "Market thesis + financial model", color: "#F97316" },
              { label: "Playwright Tests", href: "#", desc: "E2E suite with mobile emulation", color: "#06B6D4" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-5 rounded-2xl border border-border bg-surface hover:border-accent/20 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: link.color }} />
                  <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{link.label}</span>
                </div>
                <p className="text-xs text-muted">{link.desc}</p>
              </motion.a>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-xs font-mono text-muted">Lokul — 200 meters is the most valuable radius in Indian commerce.</motion.p>
        </div>
      </Section>
    </div>
  );
}
