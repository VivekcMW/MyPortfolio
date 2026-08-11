# Design System Wireframes
**Visual Layout Specifications for Multi-Platform Design System**

---

## 🏠 Main Landing Page: `/design-system-v2`

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Navbar: [Home] [About] [Process] [Work] [DS Lab ▼] [Research] [Contact]   │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                    🎨 Multi-Platform Design System                         │
│         A token-first design system supporting 10+ platforms               │
│                                                                            │
│    [Explore Tokens] [View Platforms] [See Demos] [Download Package]      │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Navigation Cards (Grid 2×3)                                               │
│  ┌──────────────────────────┐  ┌──────────────────────────┐              │
│  │  🎨 Token Studio          │  │  📱 Platform Adapters    │              │
│  │  ───────────────────      │  │  ───────────────────     │              │
│  │  Interactive token        │  │  10+ platform outputs    │              │
│  │  customization canvas     │  │  from single source      │              │
│  │  • 500+ design tokens     │  │  • Web, Mobile, Voice    │              │
│  │  • 6 domains × 6 palettes │  │  • Live previews         │              │
│  │  • Live contrast checker  │  │  • Code export           │              │
│  │  [Explore →]              │  │  [View All →]            │              │
│  └──────────────────────────┘  └──────────────────────────┘              │
│                                                                            │
│  ┌──────────────────────────┐  ┌──────────────────────────┐              │
│  │  ⚙️ Framework Comparison  │  │  🤖 Agentic UI Patterns  │              │
│  │  ───────────────────      │  │  ───────────────────     │              │
│  │  Tailwind vs Bootstrap    │  │  AI-first interaction    │              │
│  │  vs Ant Design            │  │  patterns & components   │              │
│  │  • 30 components          │  │  • 5 interactive demos   │              │
│  │  • Shared token layer     │  │  • Psychology notes      │              │
│  │  • Live code export       │  │  • Best practices        │              │
│  │  [Compare →]              │  │  [Try Demos →]           │              │
│  └──────────────────────────┘  └──────────────────────────┘              │
│                                                                            │
│  ┌──────────────────────────┐  ┌──────────────────────────┐              │
│  │  🎛️ Hybrid UI Demo        │  │  📦 Download Tokens      │              │
│  │  ───────────────────      │  │  ───────────────────     │              │
│  │  Density modes for        │  │  Export in multiple      │              │
│  │  B2B SaaS applications    │  │  formats                 │              │
│  │  • Relaxed/Default/Compact│  │  • NPM package           │              │
│  │  • Auto-detection logic   │  │  • Figma plugin          │              │
│  │  • Mini demo app          │  │  • JSON/CSS/SCSS         │              │
│  │  [Try Demo →]             │  │  [Download →]            │              │
│  └──────────────────────────┘  └──────────────────────────┘              │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Key Metrics (4 columns)                                                   │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                          │
│  │  500+  │  │  10+   │  │   30   │  │   5    │                          │
│  │ Tokens │  │Platforms│  │Component│  │ Agentic│                          │
│  │        │  │         │  │per Frame│  │Patterns│                          │
│  └────────┘  └────────┘  └────────┘  └────────┘                          │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Page 1: Token Studio `/design-system-v2/tokens`

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ← Back to DS Lab                                    [Split View] [Export]  │
└────────────────────────────────────────────────────────────────────────────┘

┌──────┬─────────────────────────────────────────────────────────────────────┐
│ 🎨   │                                                                     │
│ 📝   │                  Design Token Studio                                │
│ 📏   │                  Interactive Canvas                                 │
│ 🧩   │                                                                     │
│ 🎭   │  ┌──────────────────────────────────────────────────────────────┐ │
│ ♿   │  │  Domain: [OOH ▼] Palette: [Dark ▼] Device: [Desktop ▼]      │ │
│ 💻   │  └──────────────────────────────────────────────────────────────┘ │
│      │                                                                     │
│ Tool │  ┌─────────────────────────────────────────────────────┐          │
│ Rail │  │                                                     │  ┌─────┐ │
│      │  │                                                     │  │     │ │
│ (Ver │  │                                                     │  │Panel│ │
│ tical│  │                                                     │  │     │ │
│ Icon │  │         CANVAS AREA                                │  │Cust │ │
│ Bar) │  │         (Renders sections based on active tool)    │  │omize│ │
│      │  │                                                     │  │     │ │
│      │  │         • Colors: Swatches with contrast ratios    │  │     │ │
│      │  │         • Typography: Font specimens               │  │Token│ │
│      │  │         • Spacing: Visual scale                    │  │s:   │ │
│      │  │         • Components: Button/Card/Form examples    │  │     │ │
│      │  │         • Patterns: Layout examples                │  │━━━━ │ │
│      │  │         • Accessibility: Contrast matrix           │  │Rad: │ │
│      │  │         • Code: Exportable snippets                │  │ 12px│ │
│      │  │                                                     │  │     │ │
│      │  │                                                     │  │Font:│ │
│      │  │                                                     │  │Inter│ │
│      │  │                                                     │  │     │ │
│      │  │                                                     │  │Size:│ │
│      │  │                                                     │  │ 16px│ │
│      │  │                                                     │  │     │ │
│      │  └─────────────────────────────────────────────────────┘  └─────┘ │
│      │                                                                     │
│      │  Ambient gradient background + dot grid (like Figma)               │
└──────┴─────────────────────────────────────────────────────────────────────┘

SPLIT VIEW MODE (when toggled):
┌──────┬─────────────────────────────┬──────────────────────────────────────┐
│      │  Domain: OOH | Palette: Dark│  Domain: FinTech | Palette: Light   │
│ Tool │  ┌──────────────────────────┐│  ┌──────────────────────────────┐  │
│ Rail │  │                          ││  │                              │  │
│      │  │  Canvas A                ││  │  Canvas B                    │  │
│      │  │  (Independent controls)  ││  │  (Independent controls)      │  │
│      │  │                          ││  │                              │  │
│      │  └──────────────────────────┘│  └──────────────────────────────┘  │
└──────┴─────────────────────────────┴──────────────────────────────────────┘
```

### **Token Studio - Color Section Detail**

```
┌────────────────────────────────────────────────────────────────────────────┐
│  🎨 Colors                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  Primary Color Scale                                                       │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐                │
│  │ 50 │100 │200 │300 │400 │500 │600 │700 │800 │900 │950 │                │
│  │░░░░│▒▒▒▒│▒▒▒▒│▓▓▓▓│▓▓▓▓│████│████│████│████│████│████│                │
│  │#EEF │#D5E │#ABC │#72A │#419 │#287 │#1D6 │#165 │#104 │#0D3 │#071 │                │
│  └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘                │
│                                                                            │
│  Live Contrast Strip (Updates as you adjust sliders)                      │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Primary on Background      4.5:1  [AA ✓]    Copy: #1D65AF           │ │
│  │  ████████ Text Sample                                                │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  Text on Surface           7.2:1  [AAA ✓]    Copy: #0F172A          │ │
│  │  ░░░░░░░░ Text Sample                                                │ │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  Muted Text on Background   3.8:1  [FAIL]    Copy: #64748B          │ │
│  │  ▒▒▒▒▒▒▒▒ Text Sample                                                │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Semantic Colors                                                           │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                             │
│  │Success │ │Warning │ │ Error  │ │  Info  │                             │
│  │████████│ │████████│ │████████│ │████████│                             │
│  │#10B981 │ │#F59E0B │ │#EF4444 │ │#3B82F6 │                             │
│  └────────┘ └────────┘ └────────┘ └────────┘                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Page 2: Platform Adapters `/design-system-v2/platforms`

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Platform Adapters                                    [Export All Codes]   │
│  Same Token → Multiple Platforms                                           │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Platform Selector (Horizontal Tabs)                                       │
│  ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐ │
│  │ 🌐   │ 📱   │ 💻   │ 🎤   │ 🥽   │ 📧   │ 📺   │ 🎨   │ 🔧   │ 📦   │ │
│  │ Web  │Mobile│Deskt │Voice │ AR   │Email │ IoT  │Figma │ CLI  │ NPM  │ │
│  │(Acti)│      │      │      │      │      │      │      │      │      │ │
│  └──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘ │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  WEB PLATFORM VIEW (Active)                                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  Framework Tabs: [Tailwind CSS] [Bootstrap 5] [Ant Design 5]              │
│                                                                            │
│  ┌──────────────────────────────────────┐  ┌─────────────────────────┐   │
│  │  LIVE PREVIEW (iframe)               │  │  TOKEN MAPPING          │   │
│  │  ┌────────────────────────────────┐  │  │  ─────────────────────  │   │
│  │  │ Browser Chrome                 │  │  │  color.primary.500      │   │
│  │  ├────────────────────────────────┤  │  │  ↓                      │   │
│  │  │                                │  │  │  Tailwind:              │   │
│  │  │  [Primary Button]              │  │  │  bg-primary-500         │   │
│  │  │                                │  │  │                         │   │
│  │  │  ┌──────────────────────────┐  │  │  │  CSS Variable:          │   │
│  │  │  │ Card Component           │  │  │  │  --color-primary-500    │   │
│  │  │  │ • Header                 │  │  │  │                         │   │
│  │  │  │ • Body text              │  │  │  │  HEX: #1D65AF           │   │
│  │  │  │ • [Action]               │  │  │  │                         │   │
│  │  │  └──────────────────────────┘  │  │  │  [Copy Token]           │   │
│  │  │                                │  │  │  [Copy CSS]             │   │
│  │  │  Form Example:                 │  │  │  [Copy Tailwind]        │   │
│  │  │  [Input field_________]        │  │  │                         │   │
│  │  │  [Submit]                      │  │  │  Used in:               │   │
│  │  │                                │  │  │  • Buttons (primary)    │   │
│  │  └────────────────────────────────┘  │  │  • Links (hover)        │   │
│  └──────────────────────────────────────┘  │  • Badges (info)        │   │
│                                             └─────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  CODE EXPORT                                                        │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │  Language: [CSS Variables ▼] [Copy All] [Download]                │  │
│  │                                                                     │  │
│  │  :root {                                                           │  │
│  │    --color-primary-50: #EEF4FB;                                    │  │
│  │    --color-primary-500: #1D65AF;                                   │  │
│  │    --color-primary-900: #071E38;                                   │  │
│  │    --spacing-md: 1rem;                                             │  │
│  │    --radius-lg: 0.75rem;                                           │  │
│  │    --font-heading: 'DM Sans', sans-serif;                          │  │
│  │  }                                                                 │  │
│  │                                                                     │  │
│  │  /* Usage */                                                       │  │
│  │  .btn-primary {                                                    │  │
│  │    background: var(--color-primary-500);                           │  │
│  │    padding: var(--spacing-md);                                     │  │
│  │    border-radius: var(--radius-lg);                                │  │
│  │  }                                                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

MOBILE PLATFORM VIEW (when selected):
┌────────────────────────────────────────────────────────────────────────────┐
│  📱 MOBILE PLATFORM                                                        │
│  Framework: [React Native] [Flutter] [SwiftUI]                            │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────────┐  │
│  │   iPhone     │  │   Android    │  │  TOKEN MAPPING                 │  │
│  │  ┌────────┐  │  │  ┌────────┐  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │  │ 9:41   │  │  │  │ 10:32  │  │  │                                │  │
│  │  ├────────┤  │  │  ├────────┤  │  │  React Native:                 │  │
│  │  │        │  │  │  │        │  │  │  const colors = {              │  │
│  │  │ [BTN]  │  │  │  │ [BTN]  │  │  │    primary: '#1D65AF'          │  │
│  │  │        │  │  │  │        │  │  │  }                             │  │
│  │  │ Card   │  │  │  │ Card   │  │  │                                │  │
│  │  │ ────   │  │  │  │ ────   │  │  │  Flutter:                      │  │
│  │  │ Text   │  │  │  │ Text   │  │  │  Color primary =               │  │
│  │  │        │  │  │  │        │  │  │    Color(0xFF1D65AF)           │  │
│  │  └────────┘  │  │  └────────┘  │  │                                │  │
│  └──────────────┘  └──────────────┘  │  SwiftUI:                      │  │
│                                       │  Color.primary500              │  │
│                                       └────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

VOICE UI PLATFORM VIEW:
┌────────────────────────────────────────────────────────────────────────────┐
│  🎤 VOICE UI PLATFORM                                                      │
│  Platform: [Alexa Skills] [Google Actions]                                │
│                                                                            │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │  CONVERSATION FLOW           │  │  TOKEN MAPPING                   │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━ │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                              │  │                                  │  │
│  │  Alexa: "Welcome to App"    │  │  Primary → Voice Emphasis        │  │
│  │  [Friendly tone]             │  │  <emphasis level="strong">       │  │
│  │                              │  │                                  │  │
│  │  User: "Show me orders"      │  │  Success → Positive tone         │  │
│  │                              │  │  <prosody rate="medium"          │  │
│  │  Alexa: "You have 3 pending │  │           pitch="+5%">           │  │
│  │  orders. Would you like to   │  │                                  │  │
│  │  hear details?"              │  │  Error → Alert tone              │  │
│  │  [Informative, slightly      │  │  <prosody rate="slow"            │  │
│  │   upbeat]                    │  │           pitch="+10%">          │  │
│  │                              │  │                                  │  │
│  │  User: "Yes"                 │  │  Muted → Soft tone               │  │
│  │                              │  │  <prosody volume="soft">         │  │
│  │  [Details follow...]         │  │                                  │  │
│  └──────────────────────────────┘  └──────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Page 3: Framework Comparison `/design-system-v2/frameworks`

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Framework Comparison Studio                                               │
│  Same Token → Three Popular Frameworks                                     │
│                                                                            │
│  [Change Primary Color] ──────────────────> Updates all 3 in real-time    │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Live Token Controls (Top Bar)                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  Primary Color: [████] #1D65AF                                      │  │
│  │  ────────────────●────────────────────────                          │  │
│  │                                                                     │  │
│  │  Border Radius: 12px  ───────●──────                               │  │
│  │  Font Size: 16px      ──────●───────                               │  │
│  │  [Reset to Defaults]                                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────┬──────────────────────────────┐
│  TAILWIND CSS        │  BOOTSTRAP 5         │  ANT DESIGN 5                │
│  ━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                      │                      │                              │
│  Components:         │  Components:         │  Components:                 │
│                      │                      │                              │
│  [Primary Button]    │  [Primary Button]    │  [Primary Button]            │
│  [Secondary Button]  │  [Secondary Button]  │  [Secondary Button]          │
│                      │                      │                              │
│  ┌────────────────┐  │  ┌────────────────┐  │  ┌────────────────────────┐ │
│  │ Card Component │  │  │ Card Component │  │  │ Card Component         │ │
│  │ ────────────── │  │  │ ────────────── │  │  │ ──────────────────     │ │
│  │ Header text    │  │  │ Header text    │  │  │ Header text            │ │
│  │ Body content   │  │  │ Body content   │  │  │ Body content           │ │
│  │ [Action]       │  │  │ [Action]       │  │  │ [Action]               │ │
│  └────────────────┘  │  └────────────────┘  │  └────────────────────────┘ │
│                      │                      │                              │
│  Form:               │  Form:               │  Form:                       │
│  Email               │  Email               │  Email                       │
│  [input_______]      │  [input_______]      │  [input_______________]      │
│  Password            │  Password            │  Password                    │
│  [input_______]      │  [input_______]      │  [input_______________]      │
│  [Submit]            │  [Submit]            │  [Submit]                    │
│                      │                      │                              │
│  ━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  CODE:               │  CODE:               │  CODE:                       │
│                      │                      │                              │
│  <button             │  <button             │  <Button                     │
│    className=        │    className=        │    type="primary"            │
│    "bg-primary-500   │    "btn btn-primary" │    size="large">             │
│     px-4 py-2        │  >                   │    Click Me                  │
│     rounded-lg">     │    Click Me          │  </Button>                   │
│    Click Me          │  </button>           │                              │
│  </button>           │                      │                              │
│                      │                      │                              │
│  [Copy Code]         │  [Copy Code]         │  [Copy Code]                 │
│  [Export All]        │  [Export All]        │  [Export All]                │
└──────────────────────┴──────────────────────┴──────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Token Usage Table                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌────────────────┬──────────────────┬──────────────────┬──────────────┐  │
│  │ Token          │ Tailwind         │ Bootstrap        │ Ant Design   │  │
│  ├────────────────┼──────────────────┼──────────────────┼──────────────┤  │
│  │ Primary Color  │ bg-primary-500   │ $primary         │ colorPrimary │  │
│  │ Spacing MD     │ p-4 (1rem)       │ $spacer (1rem)   │ marginMD     │  │
│  │ Border Radius  │ rounded-lg       │ $border-radius-lg│ borderRadius │  │
│  │ Font Heading   │ font-heading     │ $headings-font   │ fontFamily   │  │
│  │ Shadow MD      │ shadow-md        │ $box-shadow      │ boxShadow    │  │
│  └────────────────┴──────────────────┴──────────────────┴──────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

Component Selector (Bottom):
┌────────────────────────────────────────────────────────────────────────────┐
│  Show: [Buttons] [Cards] [Forms] [Tables] [Modals] [Badges] [Tabs] [All]  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 Page 4: Agentic UI Patterns `/design-system-v2/agentic`

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Agentic UI Patterns                                                       │
│  AI-First Interaction Design for Modern Products                           │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Pattern Navigation (Tabs)                                                 │
│  [Proactive Suggestions] [Conversational Form] [Contextual Actions]        │
│  [Adaptive Dashboard] [Intelligent Defaults]                               │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  PATTERN 1: Proactive Suggestions Panel (Active)                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  ┌─────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │  LIVE DEMO (Interactive)            │  │  PSYCHOLOGY NOTE           │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │  ━━━━━━━━━━━━━━━━━━━━━━━ │ │
│  │                                     │  │                            │ │
│  │  Dashboard                          │  │  🧠 Cognitive Principle:   │ │
│  │  ┌────────────┬────────────┐        │  │                            │ │
│  │  │ Revenue    │ Orders     │        │  │  **Prospective Memory**   │ │
│  │  │ $245K      │ 1,247      │        │  │  Users forget to check    │ │
│  │  └────────────┴────────────┘        │  │  for issues. AI proactively│ │
│  │                                     │  │  surfaces anomalies.       │ │
│  │  ┌─────────────────────────────────┐│  │                            │ │
│  │  │ 💡 AI Suggestions          [×] ││  │  **Peak-End Rule**         │ │
│  │  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ││  │  High-value insights at    │ │
│  │  │                                 ││  │  right moment = positive   │ │
│  │  │ ✓ Revenue dip detected in Q3   ││  │  product impression.       │ │
│  │  │   APAC region down 15%         ││  │                            │ │
│  │  │   [View Details] [Apply Fix]   ││  │  When to Use:              │ │
│  │  │                                 ││  │  • Dashboards              │ │
│  │  │ • 5 filters used daily          ││  │  • Analytics tools         │ │
│  │  │   Create saved rule?            ││  │  • Admin panels            │ │
│  │  │   [1-Click Create]              ││  │                            │ │
│  │  │                                 ││  │  [Read Full Psychology →] │ │
│  │  │ • Dashboard for EU market?      ││  │                            │ │
│  │  │   [Generate] [Customize]        ││  │                            │ │
│  │  └─────────────────────────────────┘│  └────────────────────────────┘ │
│  │                                     │                                  │
│  │  [Try Interaction: Click suggestions]                                  │
│  └─────────────────────────────────────┘                                  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  DESIGN TOKENS FOR THIS PATTERN                                     │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                                                                     │  │
│  │  color.ai.suggestion: #8B5CF6                                      │  │
│  │  color.ai.background: #F5F3FF                                      │  │
│  │  color.ai.border: #DDD6FE                                          │  │
│  │  motion.ai.pulse: opacity 2s ease-in-out infinite                 │  │
│  │  shadow.ai.suggestion: 0 0 0 2px var(--color-ai-border),...       │  │
│  │  z-index.ai-panel: 1000                                            │  │
│  │                                                                     │  │
│  │  [Copy All Tokens] [Export CSS]                                    │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  IMPLEMENTATION CODE                                                │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                                                                     │  │
│  │  <AISuggestionsPanel                                               │  │
│  │    suggestions={[                                                  │  │
│  │      { type: 'insight', message: 'Revenue dip detected...' },     │  │
│  │      { type: 'action', message: 'Create saved rule?' }            │  │
│  │    ]}                                                              │  │
│  │    onAction={(action) => handleAIAction(action)}                  │  │
│  │    position="bottom-right"                                         │  │
│  │  />                                                                │  │
│  │                                                                     │  │
│  │  [Copy Code] [View Full Component]                                 │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

PATTERN 2: Conversational Form Fill
┌────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │  LIVE DEMO                          │  │  PSYCHOLOGY NOTE           │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │  ━━━━━━━━━━━━━━━━━━━━━━━ │ │
│  │                                     │  │  🧠 Cognitive Load Reduction│ │
│  │  Create New Campaign                │  │                            │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │  Traditional 15-field form │ │
│  │                                     │  │  = High abandonment rate   │ │
│  │  🤖 AI: What type of campaign?     │  │                            │ │
│  │  💬 You: Social ads for Q4 launch  │  │  Conversational = Natural  │ │
│  │                                     │  │  Feels like chat, not work │ │
│  │  🤖 AI: ✓ Got it. Budget range?   │  │                            │ │
│  │  💬 You: $50k-$75k                 │  │  Research: 3-step convo =  │ │
│  │                                     │  │  2x completion vs 15 fields│ │
│  │  🤖 AI: ✓ Target audience?        │  │                            │ │
│  │  💬 [You are typing...]            │  │  [Read Research Paper →]   │ │
│  │                                     │  │                            │ │
│  │  ┌───────────────────────────────┐ │  │                            │ │
│  │  │ Preview: Campaign Draft       │ │  │                            │ │
│  │  │ Type: Social Media            │ │  │                            │ │
│  │  │ Budget: $62,500 (suggested)   │ │  │                            │ │
│  │  │ [Edit Form View] [Confirm]    │ │  │                            │ │
│  │  └───────────────────────────────┘ │  │                            │ │
│  │                                     │  │                            │ │
│  │  [Type your message...]             │  │                            │ │
│  └─────────────────────────────────────┘  └────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘

[Similar layouts for Patterns 3, 4, 5...]
```

---

## 🎛️ Page 5: Hybrid UI Demo `/design-system-v2/hybrid`

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Hybrid UI for B2B SaaS                                                    │
│  Adaptive Density Modes for Different User Types                           │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Density Mode Selector (Live Toggle)                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  ( ) Relaxed    (•) Default    ( ) Compact    ( ) Auto-Detect      │  │
│  │  ━━━━━━━━━━    ━━━━━━━━━━    ━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━  │  │
│  │  Novice         Balanced       Power User    Based on behavior     │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┬──────────────────────────┬──────────────────────┐
│  RELAXED MODE            │  DEFAULT MODE            │  COMPACT MODE        │
│  (Currently showing)     │  (Preview)               │  (Preview)           │
│  ━━━━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━━━━━ │  ━━━━━━━━━━━━━━━━━ │
│                          │                          │                      │
│  Create Order            │  Create Order            │  Create Order  ⌘N   │
│                          │                          │                      │
│  Step 1 of 4: Client     │  Client *                │  Clnt Campaign Start │
│  ━━━━━━━━━━━━━━━━━━━━━ │  [Dropdown__________]    │  [___][___][____]   │
│                          │                          │                      │
│  Select Client *         │  Campaign                │  End    Budget $tatus│
│  [Dropdown: Search...]   │  [Dropdown__________]    │  [____][_____][___] │
│  ℹ️  Choose the client   │                          │         ⌘S │ ⌘⏎    │
│  this order is for       │  Start Date  End Date    │                      │
│                          │  [Date___][Date_____]    │                      │
│  Campaign (Optional)     │                          │                      │
│  [Dropdown: Select...]   │  Budget      Status      │                      │
│  ℹ️  Link to existing    │  [$_____][Active____]    │                      │
│  campaign if applicable  │                          │                      │
│                          │  [Cancel] [Save] [Create]│                      │
│            [Next Step →] │                          │                      │
│                          │                          │                      │
│  Token Values:           │  Token Values:           │  Token Values:       │
│  spacing: 24px           │  spacing: 16px           │  spacing: 8px        │
│  fontSize: 18px          │  fontSize: 16px          │  fontSize: 14px      │
│  lineHeight: 1.8         │  lineHeight: 1.5         │  lineHeight: 1.3     │
│  showTooltips: true      │  showTooltips: false     │  showLabels: false   │
└──────────────────────────┴──────────────────────────┴──────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Live Mini B2B SaaS App Demo                                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  [Orders] [Dashboard] [Clients] [Reports]                                 │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │  Orders List (Reflows based on density mode selected above)         │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│  │                                                                      │ │
│  │  [RELAXED: Large rows with status explanations]                     │ │
│  │  [DEFAULT: Standard table with icons]                               │ │
│  │  [COMPACT: Dense grid with abbreviations]                           │ │
│  │                                                                      │ │
│  │  Click any row to see detail page adapt to density mode             │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Auto-Detection Logic (When "Auto-Detect" is enabled)                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  Factors analyzed:                                                         │
│  • Screen width: 1920px → Desktop → Default or Compact                    │
│  • Actions per minute: 8 APM → Moderate → Default                         │
│  • Error rate: 2% → Low errors → Default or Compact                       │
│  • Task complexity: Simple CRUD → Compact OK                              │
│                                                                            │
│  Recommendation: DEFAULT MODE                                              │
│                                                                            │
│  User can override at any time → Preference saved                         │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Design Tokens (CSS Variables)                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  :root[data-density="relaxed"] {                                           │
│    --spacing-vertical: 1.5rem;                                             │
│    --font-size-base: 1.125rem;                                             │
│    --line-height: 1.8;                                                     │
│    --show-tooltips: block;                                                 │
│  }                                                                         │
│                                                                            │
│  :root[data-density="default"] {                                           │
│    --spacing-vertical: 1rem;                                               │
│    --font-size-base: 1rem;                                                 │
│    --line-height: 1.5;                                                     │
│  }                                                                         │
│                                                                            │
│  :root[data-density="compact"] {                                           │
│    --spacing-vertical: 0.5rem;                                             │
│    --font-size-base: 0.875rem;                                             │
│    --line-height: 1.3;                                                     │
│    --show-labels: none; /* Labels become placeholders */                   │
│  }                                                                         │
│                                                                            │
│  [Copy All] [Download SCSS] [Download CSS]                                │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Use Cases                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  ✓ Relaxed: Onboarding flows, training mode, occasional users             │
│  ✓ Default: Daily operations, most users, balanced workflows              │
│  ✓ Compact: Data entry teams, analysts, keyboard-heavy power users        │
│  ✓ Auto: Multi-tenant SaaS with diverse user skill levels                 │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Page 6: Download Center `/design-system-v2/download`

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Download Design Tokens                                                    │
│  Export in Multiple Formats                                                │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Package Options (Cards)                                                   │
│                                                                            │
│  ┌───────────────────┐  ┌───────────────────┐  ┌────────────────────────┐│
│  │ 📦 NPM Package    │  │ 🎨 Figma Plugin   │  │ 📄 JSON Export         ││
│  │ ───────────────── │  │ ───────────────── │  │ ──────────────────     ││
│  │ Install via npm:  │  │ Import tokens     │  │ Raw token data         ││
│  │                   │  │ directly into     │  │ for custom build       ││
│  │ npm install       │  │ Figma variables   │  │ pipelines              ││
│  │ @uxvivek/tokens   │  │                   │  │                        ││
│  │                   │  │ [Install Plugin]  │  │ [Download JSON]        ││
│  │ [View Docs]       │  │ [View Guide]      │  │ [Preview Schema]       ││
│  └───────────────────┘  └───────────────────┘  └────────────────────────┘│
│                                                                            │
│  ┌───────────────────┐  ┌───────────────────┐  ┌────────────────────────┐│
│  │ 🎨 CSS Variables  │  │ 📐 SCSS Variables │  │ ⚙️ Tailwind Config     ││
│  │ ───────────────── │  │ ───────────────── │  │ ──────────────────     ││
│  │ :root CSS file    │  │ Sass variables    │  │ tailwind.config.js     ││
│  │ for any project   │  │ for Bootstrap     │  │ with custom theme      ││
│  │                   │  │                   │  │                        ││
│  │ [Download CSS]    │  │ [Download SCSS]   │  │ [Download Config]      ││
│  │ [Preview]         │  │ [Preview]         │  │ [Preview]              ││
│  └───────────────────┘  └───────────────────┘  └────────────────────────┘│
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Custom Export Builder                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  Select what to include:                                                   │
│  ☑ Colors (All scales)         ☑ Typography                               │
│  ☑ Spacing                      ☑ Border Radius                           │
│  ☑ Shadows                      ☐ Motion (easing, duration)               │
│  ☐ Agentic AI tokens            ☐ Density mode tokens                     │
│                                                                            │
│  Select domains:                                                           │
│  ☑ OOH  ☐ Data Science  ☐ AI  ☑ FinTech  ☐ Consumer  ☐ Design Eng        │
│                                                                            │
│  Select palettes:                                                          │
│  ☑ Dark  ☑ Light  ☐ High Contrast  ☐ Warm  ☐ Cool  ☐ Sepia               │
│                                                                            │
│  Output format:                                                            │
│  ( ) CSS Variables   (•) JSON   ( ) SCSS   ( ) JavaScript   ( ) TypeScript│
│                                                                            │
│  [Generate Custom Package] [Preview]                                       │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│  Installation Instructions                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│  NPM:                                                                      │
│  npm install @uxvivek/design-tokens                                        │
│                                                                            │
│  Usage:                                                                    │
│  import { tokens } from '@uxvivek/design-tokens';                          │
│  console.log(tokens.color.primary[500]); // #1D65AF                       │
│                                                                            │
│  CSS:                                                                      │
│  <link rel="stylesheet" href="tokens.css">                                │
│  .button { background: var(--color-primary-500); }                        │
│                                                                            │
│  [Copy Installation Command] [View Full Documentation]                     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile Responsive Layout (All Pages)

```
┌──────────────────────────┐
│ ☰  Design System  [?]    │  ← Hamburger menu
└──────────────────────────┘

┌──────────────────────────┐
│  🎨 Token Studio         │  ← Cards stack vertically
│  ──────────────────────  │
│  Interactive token       │
│  customization           │
│  [Explore →]             │
└──────────────────────────┘

┌──────────────────────────┐
│  📱 Platform Adapters    │
│  ──────────────────────  │
│  10+ platforms           │
│  [View All →]            │
└──────────────────────────┘

On mobile:
• Sidebar becomes bottom sheet
• Studio panel becomes full-screen modal
• Split view shows one at a time with toggle
• Framework comparison becomes tabbed carousel
• Code snippets get horizontal scroll
```

---

## 🎨 Visual Design System

### Color Palette
```
Background: Soft gradient (purple/blue ambient)
Dot Grid: Subtle 16px grid (Figma-style)
Cards: Frosted glass effect (backdrop-blur + subtle border)
Text: High contrast (#0F172A on light bg)
Accents: Purple (#8B5CF6) for AI features
```

### Typography
```
Headings: DM Sans (Bold)
Body: Inter (Regular/Medium)
Code: JetBrains Mono
```

### Layout Grid
```
Desktop: 1400px max-width, 24px gutters
Tablet: 100% width, 16px gutters
Mobile: 100% width, 16px padding
```

---

## 🔄 Interaction Patterns

### Hover States
- Cards: Lift + shadow increase
- Buttons: Background lighten + scale 1.02
- Code blocks: Border highlight

### Animations
- Page transitions: Fade + slide up (300ms)
- Modal/Panel: Slide in from side (400ms spring)
- Token updates: Color morph (150ms ease-out)

### Loading States
- Skeleton screens for iframe previews
- Shimmer effect for code blocks loading
- Progress bar for token compilation

---

## 📊 Key Metrics Display

On every page, show:
```
┌────────────────────────────────────────┐
│  🎨 500+ Tokens  |  📱 10+ Platforms  │
│  ⚙️ 30 Components  |  🤖 5 AI Patterns  │
└────────────────────────────────────────┘
```

---

**Total Pages:** 6 main pages + 1 landing page = 7 pages  
**Estimated Development:** 10-12 weeks  
**Mobile Responsive:** 100%  
**Interactive Demos:** 15+ explorable components
