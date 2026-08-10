# Studio Artifacts - Interaction Design Specification

## Overview
Transform the static studio canvas into an interactive exploration experience where each artifact opens a detailed, immersive view.

---

## Interaction Pattern

### **Option A: Fullscreen Modal Overlay** ⭐ RECOMMENDED
```
┌─────────────────────────────────────────────────────────────┐
│  [X Close]                            [← Prev | Next →]      │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │              ARTIFACT DETAIL CONTENT                 │    │
│  │              (See detailed layouts below)            │    │
│  │                                                       │    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  [●●●○○○○○○] Progress Indicator (9 artifacts)                │
└─────────────────────────────────────────────────────────────┘
```

**Why this works:**
- Dedicated focus on one artifact at a time
- Rich, scrollable content without cluttering the canvas
- Keyboard navigation (← → arrows, ESC to close)
- Swipe gestures on mobile
- Blur background with 40% opacity overlay

---

## Artifact Detail Layouts

### 1. 📄 **PRODUCT BRIEF**

```
┌───────────────────────────────────────────────────────────────┐
│  PRODUCT BRIEF                                    [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🎯 Goal                                                  │ │
│  │ Reduce booking drop-off by 20% within 3 months          │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────┬────────────────────────────────────────┐   │
│  │ 👥 Target    │ Operations Managers                     │   │
│  │ Users        │ • Age: 34-45 years                      │   │
│  │              │ • Experience: 5+ years in logistics     │   │
│  │              │ • Device: 70% mobile, 30% desktop       │   │
│  └──────────────┴────────────────────────────────────────┘   │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🚧 Constraints                                           │ │
│  │ ✓ Mobile-first approach (responsive design)             │ │
│  │ ✓ Works offline (critical for field ops)                │ │
│  │ ✓ Sub-3s load time on 3G networks                       │ │
│  │ ✓ Accessible (WCAG 2.1 AA minimum)                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 📊 Success Metrics                                       │ │
│  │ • Primary: Task completion rate (baseline: 62%)         │ │
│  │ • Secondary: Time-on-task (baseline: 8.2 min)           │ │
│  │ • Quality: Error rate <2% (data accuracy)               │ │
│  │ • Adoption: 80% team usage within 2 weeks               │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ 🚨 Kill Criteria (When to stop)                          │ │
│  │ • Completion rate doesn't improve by 10% in 6 weeks     │ │
│  │ • Error rate exceeds 5% (data quality degrades)         │ │
│  │ • User satisfaction drops below 6/10 (NPS)              │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

### 2. 👥 **USER RESEARCH**

```
┌───────────────────────────────────────────────────────────────┐
│  USER RESEARCH                                    [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  [All 32] [Cluster 1: Frustrated Mobile] [Cluster 2: Desktop]│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 📊 Research Summary                                       ││
│  │ • 32 interview sessions (22 hours total)                 ││
│  │ • 8 field observation sessions                           ││
│  │ • 3 usability tests (mid-fidelity prototypes)            ││
│  │ • Conducted: May 2025 | Location: Bangalore + Remote     ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌─────────────────────┐ ┌─────────────────────┐             │
│  │ 💬 Persona: Rajesh  │ │ 💬 Persona: Priya   │ ...         │
│  │ Ops Manager, 38yrs  │ │ Team Lead, 42yrs    │             │
│  │─────────────────────│ │─────────────────────│             │
│  │ "I always switch   │ │ "Too many steps to  │             │
│  │ to desktop for     │ │ complete a simple   │             │
│  │ bookings - mobile  │ │ booking. Just let   │             │
│  │ form is impossible"│ │ me scan & go!"      │             │
│  │                     │ │                     │             │
│  │ Pain Points:        │ │ Pain Points:        │             │
│  │ • 14 form fields   │ │ • No smart defaults │             │
│  │ • Tiny tap targets │ │ • Can't save drafts │             │
│  │ • No auto-fill     │ │ • Slow validation   │             │
│  └─────────────────────┘ └─────────────────────┘             │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🔑 Key Insights (Affinity Clusters)                       ││
│  │                                                            ││
│  │ 📱 Mobile Friction (18 mentions)                          ││
│  │ "Mobile forms are impossible" • "I switch to desktop"     ││
│  │ "Can't type on small keyboard" • "Too many fields"        ││
│  │                                                            ││
│  │ ⏱️ Speed & Efficiency (24 mentions)                        ││
│  │ "Too many steps" • "Why can't it remember my choices?"    ││
│  │ "Repeating same info every time" • "Slow, so slow"        ││
│  │                                                            ││
│  │ 🎯 Smart Defaults (12 mentions)                           ││
│  │ "Just give me the usual" • "90% of my bookings are same"  ││
│  │ "AI should know by now what I need"                       ││
│  └──────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

---

### 3. ⭐ **PARADIGM DECISION**

```
┌───────────────────────────────────────────────────────────────┐
│  PARADIGM DECISION MATRIX                         [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  Problem: How should users complete bookings on mobile?       │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ DECISION CRITERIA (6 dimensions)                        │  │
│  │ • Mobile UX        • Speed            • Error resilience│  │
│  │ • Familiarity      • Accessibility    • Tech feasibility│  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────┬─────────────────┬────────────────────┐  │
│  │ OPTION A        │ OPTION B ✓      │ OPTION C           │  │
│  │ Stepped Wizard  │ Smart Defaults  │ Progressive        │  │
│  │                 │ (AI-Assisted)   │ Disclosure         │  │
│  ├─────────────────┼─────────────────┼────────────────────┤  │
│  │ Mobile UX    ●● │ Mobile UX    ●●●│ Mobile UX     ●●   │  │
│  │ Speed        ●  │ Speed        ●●●│ Speed         ●●   │  │
│  │ Error resist ●●●│ Error resist ●● │ Error resist  ●●●  │  │
│  │ Familiarity  ●●●│ Familiarity  ●● │ Familiarity   ●    │  │
│  │ Accessible   ●●●│ Accessible   ●●●│ Accessible    ●●   │  │
│  │ Feasibility  ●●●│ Feasibility  ●● │ Feasibility   ●●●  │  │
│  ├─────────────────┼─────────────────┼────────────────────┤  │
│  │ SCORE: 15/18    │ SCORE: 16/18 ✓  │ SCORE: 13/18       │  │
│  └─────────────────┴─────────────────┴────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🏆 WINNER: Option B - Smart Defaults (AI-Assisted)       ││
│  │                                                            ││
│  │ Why this won:                                             ││
│  │ ✓ Fastest for 90% of repeat bookings (pre-filled)        ││
│  │ ✓ Mobile-optimized (fewer fields, bigger tap targets)    ││
│  │ ✓ Still allows manual override (flexibility)             ││
│  │ ✓ Accessible (ARIA labels, keyboard nav)                 ││
│  │                                                            ││
│  │ Trade-offs accepted:                                      ││
│  │ ⚠ Slight learning curve (users must trust AI suggestions)││
│  │ ⚠ Requires ML model (adds tech complexity)               ││
│  │ ⚠ Fallback to manual if AI fails (graceful degradation)  ││
│  └──────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

---

### 4. 🎨 **DESIGN SYSTEM**

```
┌───────────────────────────────────────────────────────────────┐
│  DESIGN SYSTEM TOKENS                             [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  [Colors] [Typography] [Spacing] [Components] [Patterns]      │
│                                                                │
│  🎨 COLOR PALETTE                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Primary (Indigo)                                          ││
│  │ ████ #2D3561   Light: #4A5584   Dark: #1F2540            ││
│  │ Usage: CTAs, headers, focus states                        ││
│  │ Contrast: 8.2:1 (AAA) on white background                ││
│  │                                                            ││
│  │ Accent (Burnt Sienna)                                     ││
│  │ ████ #D4663E   Light: #E88866   Dark: #B34C2A            ││
│  │ Usage: Highlights, interactive elements                   ││
│  │ Contrast: 4.8:1 (AA) on white background                 ││
│  │                                                            ││
│  │ Glow (Amber Gradient)                                     ││
│  │ ████ #FFB84D → #FF8A4D                                    ││
│  │ Usage: Hover states, energy/warmth                        ││
│  │                                                            ││
│  │ Surface & Borders                                         ││
│  │ Background: #FAFAF8 | Surface: #FFFFFF                    ││
│  │ Border: #E8E6E1 | Muted: #6B6B6B (5.8:1 contrast)        ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  📝 TYPOGRAPHY SCALE                                           │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Display: Fraunces (serif, 300/400/600/700)               ││
│  │ • Hero Headlines: 80px / 4.2em fluid                      ││
│  │ • Section Titles: 48px / 3em                              ││
│  │                                                            ││
│  │ Accent: Syne (geometric sans, 400/500/600/700)           ││
│  │ • Labels & Metadata: 12px / 0.75em uppercase              ││
│  │ • Tags & Badges: 14px / 0.875em                           ││
│  │                                                            ││
│  │ Body: Inter (400/500/600)                                 ││
│  │ • Paragraphs: 16px / 1em line-height 1.7                  ││
│  │ • Captions: 14px / 0.875em line-height 1.6                ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  📏 SPACING (8px base unit)                                    │
│  1 = 8px | 2 = 16px | 3 = 24px | 4 = 32px | 6 = 48px         │
│  Container: 120px desktop / 48px tablet / 24px mobile         │
└───────────────────────────────────────────────────────────────┘
```

---

### 5. 🗺️ **JOURNEY MAP**

```
┌───────────────────────────────────────────────────────────────┐
│  USER JOURNEY MAP                                 [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐    │
│  │ DISCOVER │ SELECT   │ CHECKOUT │ CONFIRM  │ COMPLETE │    │
│  │ Location │ Options  │ Details  │ Booking  │ Receipt  │    │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘    │
│     ↓          ↓          ↓          ↓          ↓             │
│                                                                │
│  😐 DOING: Opens app → Browse sites → Fills form → ...        │
│  🤔 THINKING: "Where was that site?" "Too many fields"         │
│  😤 FEELING: Neutral → Frustrated → Anxious → Relieved        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🔴 PAIN POINT #1: Mobile Form Fields (Stage: Checkout)   ││
│  │                                                            ││
│  │ What happens:                                             ││
│  │ • 14 required fields on a 5" mobile screen                ││
│  │ • Tiny tap targets (30px avg, should be 44px min)        ││
│  │ • No smart defaults or auto-fill                          ││
│  │ • Keyboard covers half the form on iOS                    ││
│  │                                                            ││
│  │ User quote:                                               ││
│  │ "I always switch to desktop for this step. Mobile form is ││
│  │  impossible - I make too many mistakes and it's slow."    ││
│  │  — Rajesh, 38, Ops Manager (18 similar quotes)           ││
│  │                                                            ││
│  │ Impact:                                                   ││
│  │ • 62% abandon on mobile at this step (analytics)          ││
│  │ • 8.2 min avg time-on-task (should be ~3 min)            ││
│  │ • 12% error rate (wrong site, wrong time slot)           ││
│  │                                                            ││
│  │ Solution → Paradigm B: Smart Defaults                     ││
│  │ • AI pre-fills based on history (90% accuracy)            ││
│  │ • Reduced to 6 fields (only exceptions shown)             ││
│  │ • 56px tap targets (accessible, thumb-friendly)           ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  12 touchpoints identified • 3 major pain points • 18 quotes  │
└───────────────────────────────────────────────────────────────┘
```

---

### 6. 📐 **WIREFRAMES V3**

```
┌───────────────────────────────────────────────────────────────┐
│  WIREFRAMES V3 - INTERACTIVE PROTOTYPE          [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  [Low-fi] [Mid-fi] [Hi-fi ●] | Flow: [Booking Happy Path ▼]  │
│                                                                │
│  ┌─────────────────────────────────────────┐                 │
│  │  ┌─────────────────────────────────┐    │ 📱 Mobile       │
│  │  │ ☰  Bookings         [+ New]     │    │ 375x667         │
│  │  ├─────────────────────────────────┤    │                 │
│  │  │                                  │    │ Screen 1/24     │
│  │  │  🎯 Quick Booking                │    │                 │
│  │  │  (AI suggests your usual)        │    │ [Interactive]   │
│  │  │                                  │    │ Click elements  │
│  │  │  📍 Site: MG Road Hub (pre-fill) │    │ to navigate     │
│  │  │  📅 Date: Tomorrow 9AM (pre-fill)│    │                 │
│  │  │  👤 Team: Your Squad (pre-fill)  │    │                 │
│  │  │                                  │    │                 │
│  │  │  ┌──────────────────────────┐   │    │                 │
│  │  │  │  Confirm Booking ✓       │   │    │                 │
│  │  │  └──────────────────────────┘   │    │                 │
│  │  │                                  │    │                 │
│  │  │  or customize ↓                  │    │                 │
│  │  │                                  │    │                 │
│  │  └─────────────────────────────────┘    │                 │
│  └─────────────────────────────────────────┘                 │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 📊 Design Decisions (this screen)                         ││
│  │                                                            ││
│  │ ✓ Smart defaults shown first (90% use case)               ││
│  │ ✓ One-tap confirm for repeat bookings                     ││
│  │ ✓ "Customize" expands to full form (10% edge case)        ││
│  │ ✓ 56px tap targets (thumb zone optimized)                 ││
│  │ ✓ Focus state: 4px primary border (WCAG compliant)        ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  Flow Coverage: 8 flows × 3 fidelity levels = 24 screens      │
│  [View all screens →] [Figma prototype →] [Dev handoff →]     │
└───────────────────────────────────────────────────────────────┘
```

---

### 7. 🔁 **NEXT ITERATION**

```
┌───────────────────────────────────────────────────────────────┐
│  ITERATION PLANNING                               [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 📚 Learning from Current Version                          ││
│  │                                                            ││
│  │ ✅ What worked:                                           ││
│  │ • Smart defaults reduced time-on-task by 45%              ││
│  │ • Completion rate jumped from 62% → 84% (+22%)            ││
│  │ • User satisfaction: 8.2/10 (NPS: +42)                    ││
│  │ • Zero accessibility complaints (WCAG 2.1 AA)             ││
│  │                                                            ││
│  │ ⚠️ What didn't work:                                      ││
│  │ • AI suggestions wrong 10% of the time (trust issue)      ││
│  │ • No voice input (field workers wear gloves)              ││
│  │ • Can't save multiple "favorites" (one default only)      ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 💡 Opportunity                                            ││
│  │ Add voice input for hands-free booking                    ││
│  │                                                            ││
│  │ Evidence:                                                 ││
│  │ • 18 users mentioned gloves/dirty hands in interviews     ││
│  │ • 12 users requested "talk to book" feature               ││
│  │ • Competitor "QuickSite" has voice (85% satisfaction)     ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🧪 Hypothesis                                             ││
│  │ If we add voice input with visual confirmation,           ││
│  │ time-on-task will drop by another 30% (4.4min → 3.1min)   ││
│  │                                                            ││
│  │ Success criteria:                                         ││
│  │ • Voice recognition accuracy >95% (noisy environments)    ││
│  │ • 40% adoption rate within 4 weeks of launch              ││
│  │ • Time-on-task: <3.5 min avg (stretch: <3 min)           ││
│  │ • Error rate stays below 2% (maintain quality)            ││
│  │                                                            ││
│  │ Kill criteria:                                            ││
│  │ • Accuracy below 90% after 2 weeks (too many errors)      ││
│  │ • Adoption below 15% (users don't trust it)               ││
│  │ • Increases error rate above 5% (quality degrades)        ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  🚀 Queue: Sprint 24 (Starting Aug 12, 2026)                  │
│  Team: 1 designer + 2 engineers + 1 ML specialist             │
└───────────────────────────────────────────────────────────────┘
```

---

### 8. 🧩 **COMPONENTS**

```
┌───────────────────────────────────────────────────────────────┐
│  COMPONENT LIBRARY                                [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  [All] [Form] [Navigation] [Feedback] [Data Display]          │
│                                                                │
│  🔘 BUTTON COMPONENT (6 variants)                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     ││
│  │ │ Primary  │ │Secondary │ │ Outline  │ │  Ghost   │     ││
│  │ └──────────┘ └──────────┘ └──────────┘ └──────────┘     ││
│  │                                                            ││
│  │ Sizes: sm (32px) | md (44px) | lg (56px)                  ││
│  │ States: default, hover, active, disabled, loading         ││
│  │                                                            ││
│  │ Accessibility:                                            ││
│  │ • 44px min touch target (WCAG 2.5.5)                      ││
│  │ • 4px focus ring (primary color, WCAG 2.4.7)              ││
│  │ • aria-label when icon-only                               ││
│  │ • disabled={true} with aria-disabled                      ││
│  │                                                            ││
│  │ Usage:                                                    ││
│  │ <Button variant="primary" size="lg">Confirm</Button>      ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  📝 INPUT COMPONENT (8 variants)                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Text | Email | Number | Date | Select | Textarea | ...    ││
│  │                                                            ││
│  │ [Live preview of each variant with states]                ││
│  │                                                            ││
│  │ 42 total variants across 12 base components               ││
│  │ React 19 + TypeScript + Tailwind CSS v4                   ││
│  │ Storybook documentation + Figma design file linked        ││
│  └──────────────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────────────┘
```

---

### 9. 📊 **IMPACT METRICS**

```
┌───────────────────────────────────────────────────────────────┐
│  IMPACT METRICS DASHBOARD                         [Close ×]    │
├───────────────────────────────────────────────────────────────┤
│  Launch: June 15, 2026 | Measured: 6 weeks post-launch        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🎯 PRIMARY METRIC: Task Completion Rate                   ││
│  │                                                            ││
│  │  Baseline (Before)        │  After Smart Defaults         ││
│  │  ████████░░░░░░░░░  62%   │  █████████████████  84%       ││
│  │                            │  +22pp (+35% improvement) ✓   ││
│  │                            │  Goal: 74% | Actual: 84%      ││
│  │                            │  EXCEEDED GOAL by 10pp        ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ ⏱️ SECONDARY: Time-on-Task                                 ││
│  │                                                            ││
│  │  Before: ████████  8.2 min                                ││
│  │  After:  ████      4.4 min  (-45%, -3.8 min saved) ✓      ││
│  │                                                            ││
│  │  Time savings per booking: 3.8 minutes                    ││
│  │  × 450 bookings/day = 1,710 min/day saved (28.5 hrs)      ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ ✅ QUALITY: Error Rate (Data Accuracy)                    ││
│  │                                                            ││
│  │  Before: 12% (wrong site, time, team)                     ││
│  │  After:  1.8%  (-85% reduction) ✓                         ││
│  │  Goal: <2% | Status: PASSED ✓                             ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 🔍 GOODHART'S LAW CHECK (Are we gaming the metric?)       ││
│  │                                                            ││
│  │ Question: Did we improve completion by making it easier   ││
│  │ to submit incorrect bookings?                             ││
│  │                                                            ││
│  │ Evidence:                                                 ││
│  │ ✓ Error rate DROPPED (12% → 1.8%)                         ││
│  │ ✓ User satisfaction UP (5.1 → 8.2 NPS)                    ││
│  │ ✓ No spike in cancellations (3.2% → 2.9%)                 ││
│  │ ✓ Qualitative feedback positive (18/20 interviews)        ││
│  │                                                            ││
│  │ Verdict: PASSED ✓ (Real improvement, not gaming)          ││
│  └──────────────────────────────────────────────────────────┘│
│                                                                │
│  📈 Overall: 4/4 success criteria met • Ready for scale       │
└───────────────────────────────────────────────────────────────┘
```

---

## Implementation Approach

### **Tech Stack**
```typescript
// Modal Component (Framer Motion)
<AnimatePresence>
  {selectedArtifact && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Blur backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={closeModal}
      />
      
      {/* Detail content */}
      <motion.div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto">
        <ArtifactDetailView artifact={selectedArtifact} />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### **Keyboard Navigation**
- **←** Previous artifact
- **→** Next artifact  
- **ESC** Close modal
- **TAB** Focus navigation within modal

### **Mobile Gestures**
- **Swipe left/right** Navigate between artifacts
- **Swipe down** Close modal
- **Pinch** Not used (maintain accessibility)

---

## Visual Design Elements

### **Artifact-Specific Styling**

| Artifact | Visual Treatment |
|----------|-----------------|
| **Product Brief** | Paper document with sticky notes in margins |
| **User Research** | Persona cards in a Kanban-style layout |
| **Paradigm Decision** | Decision matrix with radar chart |
| **Design System** | Color swatches + typography specimens |
| **Journey Map** | Horizontal timeline with emotion curve |
| **Wireframes** | Interactive prototype frames (clickable) |
| **Next Iteration** | Kanban board with hypothesis cards |
| **Components** | Storybook-style component showcase |
| **Impact Metrics** | Dashboard with live charts (Chart.js) |

---

## Animation Timing

```css
/* Modal entrance */
backdrop: 200ms ease-out
content:  300ms cubic-bezier(0.16, 1, 0.3, 1)

/* Artifact card click → modal */
1. Card scales up (150ms)
2. Backdrop fades in (200ms, overlap)
3. Content slides up (300ms, overlap)

/* Navigation (← →) */
Content swap: 250ms ease-in-out
New content: 300ms slide-in from side
```

---

## Example User Flow

```
1. User scrolls to "From signal to impact" section
2. Sees 9 artifact cards with hover lift effect
3. Clicks "Product Brief" card
   ↓
4. Card animates (scale + position transform)
5. Backdrop blurs background
6. Modal slides up with PRD content
   ↓
7. User reads goal, metrics, kill criteria
8. Presses → arrow key
   ↓
9. Content swaps to "User Research" (persona cards)
10. User explores 32 interview quotes
11. Presses ESC to close
    ↓
12. Modal fades out, focus returns to canvas
```

---

## Next Steps

1. **Build modal component** with Framer Motion
2. **Create 9 detail views** (one per artifact)
3. **Add keyboard navigation** (← → ESC)
4. **Implement swipe gestures** for mobile
5. **Test accessibility** (screen readers, focus management)
6. **Polish animations** (spring physics, stagger)

---

Ready to implement? Start with the modal shell and Product Brief detail view as a proof of concept. 🚀
