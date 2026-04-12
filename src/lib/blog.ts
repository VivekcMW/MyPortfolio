export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "design-thinking-adtech-ooh",
    title: "Design Thinking in AdTech: How OOH is Going Digital",
    excerpt:
      "The Out-of-Home advertising industry is undergoing a massive digital transformation. Here's how design thinking is reshaping how brands connect with audiences in physical spaces.",
    date: "2026-03-15",
    readTime: "8 min read",
    category: "Industry Insights",
    tags: ["AdTech", "OOH", "DOOH", "Design Thinking"],
    featured: true,
    content: `
# Design Thinking in AdTech: How OOH is Going Digital

The Out-of-Home (OOH) advertising industry is experiencing its most significant transformation in decades. What was once a world of static billboards and manual negotiations is rapidly becoming a data-driven, programmatic ecosystem.

## The Digital Shift

Traditional OOH was simple — buy a billboard for a month, hope the right people see it. Digital OOH (DOOH) changes everything:

- **Real-time targeting**: Serve different ads based on time, weather, and audience demographics
- **Programmatic buying**: Automated, data-driven ad placement across thousands of screens
- **Measurability**: Finally, OOH can prove ROI with foot traffic data, mobile signals, and computer vision

## Where Design Thinking Comes In

The challenge isn't just technological — it's experiential. Media planners who've bought billboards for 20 years now need to navigate complex dashboards, audience segments, and real-time bidding interfaces.

### Understanding the User

Through extensive user research at Moving Walls, we discovered three critical insights:

1. **Planners think spatially** — they want to see inventory on a map, not in spreadsheets
2. **Campaign logic is visual** — decision trees and audience flows need visual representation
3. **Trust requires transparency** — every data point needs a clear source and methodology

### Designing for Complexity

The key principle: **progressive disclosure**. Don't show everything at once. Surface the essential information, and let users drill down into details when needed.

\`\`\`
Simple View → Campaign Overview → Detailed Analytics → Raw Data
\`\`\`

Each layer adds complexity only when the user asks for it.

## The Future

OOH advertising is becoming the most exciting frontier in AdTech. As screens become smarter and data becomes richer, the design challenges will only get more interesting.

The companies that win won't be the ones with the most data — they'll be the ones that make complex data feel effortless.

---

*Vivekanand Choudhari is a Lead Design Engineer at Moving Walls, working at the intersection of design and technology in the OOH advertising space.*
    `,
  },
  {
    slug: "building-design-systems-scale",
    title: "Building Design Systems That Scale",
    excerpt:
      "Lessons learned from building and maintaining a cross-product design system used by 5+ product teams. From token architecture to adoption strategies.",
    date: "2026-02-20",
    readTime: "6 min read",
    category: "Design Systems",
    tags: ["Design System", "Figma", "React", "Tokens"],
    content: `
# Building Design Systems That Scale

After building design systems across multiple companies and products, I've learned that the hardest part isn't creating components — it's creating a system that teams actually want to use.

## The Problem

In most organizations, I've seen the same pattern:

1. Each product team builds their own buttons, cards, and modals
2. Visual inconsistencies multiply across products
3. Design-to-dev handoff becomes a game of "spot the differences"
4. Someone says "we need a design system" and a team is formed

## What Actually Works

### 1. Start with an Audit, Not Components

Before building anything, audit what exists. In our last audit, we found:
- **47 unique button variations** across 5 products
- **12 different card patterns** with slight layout differences
- **8 color palettes** that were "almost the same but not quite"

This audit gives you the ammunition to justify the effort and the roadmap for what to build first.

### 2. Tokens First, Components Second

Design tokens are the foundation. Get these right, and everything else follows:

\`\`\`json
{
  "color": {
    "primary": { "value": "#2563FF" },
    "surface": { "value": "#111111" },
    "border": { "value": "#222222" }
  },
  "spacing": {
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  }
}
\`\`\`

### 3. Build for Adoption, Not Perfection

The most elegant design system is useless if nobody uses it. Strategies that work:

- **Make it easier to use the system than to not use it**
- Every component should be a copy-paste away
- Documentation with real examples, not abstract guidelines
- Migration guides for existing code

### 4. Figma and Code Must Be in Sync

One source of truth isn't enough — you need **two synchronized sources of truth**: Figma for designers, React for developers. When a designer updates a component, the coded version should follow within a sprint.

## Results

After 4 months of building and 6 months of adoption:

- **40% faster** design-to-dev handoff
- **90% reduction** in UI inconsistencies
- **120+ components** in the shared library
- **5 product teams** actively contributing

## The Secret

The real secret to a successful design system isn't technical — it's political. You need executive buy-in, team champions, and a culture that values consistency.

Build the system, but more importantly, build the community around it.
    `,
  },
  {
    slug: "ai-changing-design",
    title: "AI is Changing How We Design — Here's How I Use It",
    excerpt:
      "From AI-assisted prototyping to intelligent layout suggestions, here's how I've integrated AI into my design and development workflow.",
    date: "2026-01-10",
    readTime: "5 min read",
    category: "AI × Design",
    tags: ["AI", "Design", "Workflow", "Productivity"],
    content: `
# AI is Changing How We Design — Here's How I Use It

I was skeptical about AI in design at first. "It'll never replace human creativity," I thought. I still believe that — but I've discovered that AI isn't here to replace designers. It's here to amplify us.

## My AI-Enhanced Workflow

### 1. Research & Discovery

**Before AI**: Spend days reading industry reports, analyzing competitor products, and synthesizing insights manually.

**With AI**: I use AI to quickly synthesize research — summarizing user interview transcripts, identifying patterns across competitive analyses, and generating initial hypothesis maps.

### 2. Ideation & Wireframing

AI helps me generate layout variations I wouldn't have considered. I describe a component's requirements, and use AI to explore 10+ approaches in minutes instead of hours.

The key: **AI generates options, I curate and refine.** My design judgment is still the filter.

### 3. Design-to-Code

This is where AI has the biggest impact on my workflow:

- **Copy generation**: First drafts of UI copy, error messages, and empty states
- **Code generation**: Converting Figma designs to React components as a starting point
- **Accessibility checks**: AI flags potential accessibility issues in my designs

### 4. Documentation

AI helps me write better component documentation, generate usage guidelines, and create API references for the design system.

## What AI Can't Do (Yet)

- **Understand business context deeply** — it can analyze data, but it can't feel the organizational politics that shape product decisions
- **Judge emotional resonance** — a design that "feels right" still requires human intuition
- **Navigate ambiguity** — when requirements are unclear, experienced designers ask the right questions. AI tries to answer with assumptions

## My Prediction

In 3 years, every designer will use AI daily — just like we all use auto-layout and component libraries today. The designers who thrive won't be the ones who resist AI, but the ones who learn to orchestrate it.

**The future isn't AI vs. Designers. It's AI × Designers.**

---

*What's your experience with AI in design? I'd love to hear — reach out on LinkedIn or Twitter.*
    `,
  },
  {
    slug: "system-design-for-designers",
    title: "System Design for Designers: Think Like an Engineer",
    excerpt:
      "Why understanding system architecture makes you a 10x better designer, and how to start thinking about scalability, latency, and data flow.",
    date: "2025-12-05",
    readTime: "7 min read",
    category: "System Design",
    tags: ["System Design", "Engineering", "Architecture", "Career"],
    content: `
# System Design for Designers: Think Like an Engineer

The best product designers I've worked with have one thing in common: they understand how systems work under the hood. Not at the level of writing backend code — but at the level of understanding constraints.

## Why It Matters

When you understand system design, you can:

1. **Design realistic features** instead of impossible ones
2. **Communicate with engineers** using shared vocabulary
3. **Anticipate edge cases** that purely visual designers miss
4. **Make better tradeoffs** between ideal and feasible

## Core Concepts Every Designer Should Know

### 1. Client-Server Architecture

Everything you design is happening in two places: the user's device (client) and the company's servers (backend). Understanding this split explains:

- Why some features work offline and others don't
- Why loading states exist (data is traveling between client and server)
- Why real-time features are harder than they look

### 2. Latency and Perceived Performance

Users don't care about actual speed — they care about **perceived speed**. Design patterns that help:

- **Optimistic updates**: Show the change before the server confirms
- **Skeleton screens**: Show layout shapes while content loads
- **Progressive loading**: Load critical content first, details later

### 3. Data Models

Everything in your app is a data model. A "user profile" is a structured object:

\`\`\`json
{
  "id": "user_123",
  "name": "Vivekanand",
  "role": "designer",
  "projects": ["proj_1", "proj_2"],
  "lastActive": "2026-01-15T10:30:00Z"
}
\`\`\`

Understanding data models helps you design forms, lists, and detail views that actually match the underlying structure.

### 4. API Boundaries

Every screen in your app makes API calls. When you design a dashboard with 5 different data widgets, you're potentially asking for 5 separate API calls. Understanding this helps you:

- Design loading states for each independent section
- Group related data into logical views
- Avoid designs that require impossible data combinations

## How to Learn

1. **Ask engineers "why"** — not to challenge, but to understand constraints
2. **Read technical architecture docs** for your product
3. **Use browser DevTools** — watch network requests as you use your product
4. **Build side projects** — nothing beats hands-on experience

The gap between design and engineering is where the best products are born. Close that gap.
    `,
  },
  {
    slug: "dooh-future-advertising",
    title: "The Future of DOOH: Why Physical Screens Are the Next Digital Frontier",
    excerpt:
      "Digital Out-of-Home advertising is evolving faster than anyone predicted. Here's what's coming and why it matters for design.",
    date: "2025-11-18",
    readTime: "6 min read",
    category: "Industry Insights",
    tags: ["DOOH", "OOH", "AdTech", "Future"],
    content: `
# The Future of DOOH: Why Physical Screens Are the Next Digital Frontier

While everyone's talking about the metaverse and AR, a quieter revolution is happening in the physical world. Digital Out-of-Home (DOOH) screens are becoming the most interesting canvas in advertising.

## The Numbers Tell the Story

- **$45 billion** global OOH industry, growing at 10%+ annually
- **500K+ digital screens** worldwide (and accelerating)
- **Programmatic DOOH** growing at 30% CAGR

## Three Trends Reshaping DOOH

### 1. Contextual Intelligence

Screens that adapt to their environment:
- Weather-triggered creative (hot day? Show cold drinks)
- Audience-aware content (mall screen at lunch vs. dinner)
- Event-triggered displays (game day, concert night)

### 2. Measurement Revolution

The biggest historical weakness of OOH — "who actually saw it?" — is being solved:
- Mobile device data for foot traffic attribution
- Computer vision for anonymous audience counting
- Cross-channel attribution connecting OOH exposure to online conversion

### 3. Creative Programmatic

Dynamic creative optimization (DCO) for physical screens:
- Thousands of creative variations per campaign
- A/B testing across locations in real-time
- Personalized messaging by location demographics

## Design Challenges

As a designer working in this space, the challenges are unique:

1. **Designing for attention fragments** — people glance at screens for 1-3 seconds
2. **Environmental context** — a screen in a mall vs. a highway has different requirements
3. **Scale variance** — designs must work from tablet-sized screens to building-sized displays
4. **Data visualization** — making complex campaign data intuitive for media planners

## The Opportunity

DOOH is where physical meets digital, where data meets creativity, where global scale meets local relevance. For designers and engineers, it's one of the most exciting problem spaces in tech right now.

And we're just getting started.
    `,
  },
  {
    slug: "salon-management-ideation-to-deployment",
    title: "Building a Salon Management App: From Ideation to Open-Source Deployment",
    excerpt:
      "How I designed and built an end-to-end salon management system — covering customer tracking, appointment scheduling, automated follow-ups, and business analytics — and why I open-sourced it.",
    date: "2026-04-12",
    readTime: "12 min read",
    category: "Case Study",
    tags: ["Product Design", "Open Source", "SaaS", "Full Stack", "Case Study"],
    featured: true,
    content: `
# Building a Salon Management App: From Ideation to Open-Source Deployment

Most independent salons run on chaos — paper registers for customer details, WhatsApp groups for bookings, mental math for revenue tracking. I set out to change that. Here's the full story of how I took a salon management system from a napkin idea to an open-source, production-ready product.

## The Problem Worth Solving

I noticed a pattern while visiting local salons: the owner would flip through a dog-eared register to find my last visit, the receptionist would double-book a stylist because the calendar was on a whiteboard, and follow-ups simply didn't happen. Customers slipped through the cracks.

The salon industry is massive — millions of small businesses worldwide — yet most management software is either too expensive, too complex, or designed for enterprise chains for the single. Independent salons need something **simple, affordable, and purpose-built**.

### The core pain points I identified:

- **Fragmented customer data** — details scattered across registers, phone contacts, and memory
- **No follow-up system** — customers are forgotten after they walk out the door
- **Appointment chaos** — verbal bookings lead to clashes and no-shows
- **Revenue blindness** — owners have no real-time visibility into daily/monthly earnings
- **Zero retention tools** — no loyalty programs, birthday messages, or re-engagement triggers

## My Role: Ideation to Deployment

This wasn't a project where I handed off a Figma file and moved on. I owned the entire lifecycle:

- **Product strategy** — PRD, feature prioritization, phased roadmap
- **User research** — interviews with salon owners, receptionists, and stylists
- **UX/UI design** — information architecture, wireframes, high-fidelity designs, prototypes
- **Frontend development** — React.js with Tailwind CSS, responsive and mobile-first
- **Backend architecture** — REST API design, database schema, authentication flows
- **Deployment** — CI/CD pipeline, hosting setup, open-source release

## Designing for Non-Technical Users

The biggest design constraint wasn't technical — it was **the user**. Salon receptionists aren't power users. They're multitasking between greeting customers, answering phones, and managing payments. Every interaction needs to be fast, forgiving, and obvious.

### Design principles I followed:

1. **One primary action per screen** — the most important thing you can do should be immediately visible
2. **Search-first architecture** — customer lookup by name or phone in under 2 seconds
3. **Progressive disclosure** — simple by default, detailed when needed
4. **Status visibility** — color-coded appointments (Booked, In Progress, Completed, No-show) at a glance
5. **Mobile-first responsive** — works on the tablet at the counter and the owner's phone at home

## Feature Deep Dive

### Customer Management — The Heart of the System

Every salon runs on relationships. The customer profile became the central hub of the entire application:

- **Quick add flow** — Name, phone, and gender are enough to create a profile in 10 seconds
- **Rich profile view** — visit history, total spend, preferences, notes (hair type, allergies, preferred stylist)
- **Smart tagging** — customers auto-tagged as New, Regular, VIP, or Inactive based on visit frequency
- **Search** — instant results by name or phone number

The key design decision: the profile page is a **timeline**, not a form. Every visit, payment, and message is a chronological entry — giving staff instant context when a customer walks in.

### Appointment Scheduling — Eliminating the Chaos

The calendar view was the most complex UI challenge. It needed to show:

- All stylists' schedules simultaneously
- Color-coded status at a glance
- Easy drag-and-drop rescheduling
- Walk-in support without friction

I chose a **daily column view** as the default — one column per stylist, time slots as rows. This mirrors how salons actually think about their day. The weekly view provides a zoomed-out planning perspective.

Double-booking prevention was critical. The system checks stylist availability in real-time and visually grays out unavailable slots. Appointment duration is auto-calculated based on selected services — no mental math required.

### Automated Follow-ups — The Retention Engine

This is where the product delivers its biggest ROI. Most salons lose customers not because of bad service, but because of **no follow-up**. The communication system runs on three automated triggers:

**Pre-visit reminders:**
- 24 hours before: "Hi [Name], reminder: your appointment is tomorrow at [Time] with [Stylist]"
- 2 hours before: "See you soon! Your [Service] appointment is at [Time] today"

**Post-visit engagement:**
- Thank-you message sent after appointment completion
- Birthday messages with optional promo codes
- Re-engagement trigger if no visit in 45 days (configurable)

**The impact:** In early testing with a pilot salon, no-show rates dropped by approximately 35%, and the re-engagement messages brought back 1 in 5 inactive customers within the first month.

### Billing & Payments — Speed at the Counter

Billing happens at the busiest moment — when a customer is standing at the counter, ready to leave. Speed is everything:

- Invoice **auto-generates** when an appointment is marked complete
- Services, prices, and totals are pre-filled
- Discounts (flat or percentage) applied with one tap
- Payment mode recorded: Cash, UPI, Card, or flagged as Pending
- Invoice shared via WhatsApp or printed — customer's choice

### Dashboard & Reports — Data-Driven Decisions

The owner dashboard was designed to answer one question: **"How is my business doing?"** — in under 5 seconds.

Above the fold:
- Today's appointment count
- Revenue today and this month
- New customers this month
- No-show count

Below the fold:
- Monthly revenue trend (bar chart)
- Top 5 services by bookings and revenue
- New vs. returning customer ratio
- Stylist performance rankings
- Export to CSV or PDF for accountants

## Technical Architecture

I chose a stack optimized for **speed of development, low cost, and scalability**:

- **Frontend:** React.js + Tailwind CSS — fast, component-driven, responsive
- **Backend:** Node.js with Express — lightweight REST API
- **Database:** Supabase (PostgreSQL) — free tier covers most salons, built-in auth
- **Messaging:** WhatsApp Business API integration for automated messages
- **Hosting:** Vercel (frontend) + Railway (backend) — free-to-start, scales when needed
- **Reports:** Client-side generation with jsPDF and CSV export

The database schema centers around five core tables: Customers, Appointments, Services, Staff, and Invoices — with junction tables for service-staff mapping and appointment-service linking.

## The Phased Approach

I shipped this in 4 phases over 12 weeks:

**Phase 1 (Weeks 1–4): Core MVP**
Customer profiles, appointment calendar, services setup, basic billing. This alone replaced the paper register and whiteboard calendar.

**Phase 2 (Weeks 5–7): Communication**
Automated reminders, post-visit messages, birthday messaging, re-engagement triggers. This is where retention metrics started moving.

**Phase 3 (Weeks 8–9): Analytics**
Owner dashboard, revenue reports, performance tracking, data exports. Owners could finally see their business clearly.

**Phase 4 (Weeks 10–12): Polish & Loyalty**
Visit-based loyalty rewards, referral tracking, staff attendance, settings panel, and final QA before open-source release.

## Why Open Source?

I believe tools like this shouldn't be locked behind expensive SaaS subscriptions for small business owners who are already operating on thin margins. Open-sourcing the project means:

- Any salon can self-host it for free
- Developers can extend it for their local market
- The community can contribute features I haven't thought of
- It serves as a real-world reference for full-stack product development

## Lessons Learned

**1. Design for the busiest moment.** The true test of your UX isn't the happy path — it's when three customers are waiting, the phone is ringing, and the receptionist needs to check someone out in 15 seconds.

**2. Automation is the product.** The appointment calendar is table stakes. The automated follow-ups, birthday messages, and re-engagement triggers are what actually move business metrics.

**3. Non-technical users are the hardest audience.** Every extra click, every ambiguous label, every hidden action is a support ticket waiting to happen. Simplicity isn't dumbing down — it's the hardest design work there is.

**4. Ship the MVP, then listen.** Phase 1 wasn't pretty, but it was functional. Real salon staff using it daily surfaced insights no amount of user research could have predicted.

**5. Full-stack ownership accelerates everything.** Owning both design and code meant I could prototype in the morning, validate with users at lunch, and ship to production by evening. No handoff delays, no lost-in-translation moments.

## What's Next

Version 2 is on the horizon with:
- Customer self-service booking portal
- Multi-branch support
- Inventory management for products
- Regional language support (Hindi, Kannada)
- Native mobile app

The source code is available on GitHub — contributions welcome. If you're a salon owner, developer, or designer interested in this space, I'd love to connect.

*Building products for underserved markets isn't glamorous, but it's where design and engineering create the most tangible impact. Sometimes the best product work happens not in a Silicon Valley startup, but in a neighborhood salon.*
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((post) => post.category))];
}
