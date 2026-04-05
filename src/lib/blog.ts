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
