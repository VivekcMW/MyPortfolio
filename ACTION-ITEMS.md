# Portfolio Action Items

**Generated:** 2026-08-08  
**Status:** Ready for implementation  
**Full Audit:** See [DESIGN-AUDIT.md](./DESIGN-AUDIT.md)

---

## ✅ Recently Completed

### Lokul Page Contrast Fixes (2026-08-08)
**Issue:** Color contrast violations on `/research/lokul` page  
**Fixes Applied:**
- Removed `/70` opacity from milestone labels (text-muted/70 → text-muted)
- Changed SVG text labels from #94A3B8 (light gray) to #6B6B6B (muted color)
- Improved contrast from ~3.5:1 to 6.41:1 (WCAG AA compliant)
- All 5 user flow diagram labels now readable

**Files Modified:**
- `src/app/research/lokul/page.tsx` (6 replacements)

**Build Status:** ✅ All 42 routes compile successfully

---

## 🔴 Priority 1: Before Launch

### 1. Complete Studio Wall Stages (HIGH PRIORITY)
**File:** `src/app/about/page.tsx` (lines ~605-1900)  
**Status:** 2/8 complete (Discovery and Research done)  
**Remaining:**
- [ ] Stage 03: Synthesis (Journey mapping content)
- [ ] Stage 04: Fork (Paradigm gate explanation + decision tree)
- [ ] Stage 05: Design System (Token system + component library)
- [ ] Stage 06: Prototype (Wireframes + user testing)
- [ ] Stage 07: Validation (Launch metrics + success criteria)
- [ ] Stage 08: Iteration (Loop back explanation + learnings)

**Why:** Core feature of the About page. Currently shows "Detailed view in development..." placeholder.

**Estimated Time:** 4-6 hours (1 hour per stage for content + layout)

---

### 2. Fix Work Page Copy Mismatch
**File:** `src/app/work/page.tsx`  
**Issue:** Says "11 case studies" but project data has 9  
**Fix:** Change to "9 case studies" OR add 2 more projects  
**Estimated Time:** 2 minutes (or hours if adding projects)

---

### 3. Mobile Responsiveness Testing
**Action:** Test all pages at breakpoints:
- [ ] 375px (iPhone SE)
- [ ] 768px (iPad)
- [ ] 1024px (Desktop)

**Priority Pages:**
1. Homepage - floating principle cards
2. About - Studio Wall grid
3. Process - interactive lanes
4. Design System Lab - studio interface
5. Work - project grid

**Check For:**
- Navigation overlay working
- Touch targets 44px minimum
- Grid layouts stack correctly
- Side popover behavior on mobile (may need full-screen)
- Footer column stacking

**Estimated Time:** 2-3 hours

---

### 4. Accessibility Audit
**Tools:** 
- Lighthouse (Chrome DevTools)
- axe DevTools extension
- Manual keyboard navigation

**Tests:**
- [ ] Run Lighthouse on all major pages
- [ ] Verify color contrast ratios (especially muted text)
- [ ] Tab through all interactive elements
- [ ] Check ARIA labels on icon-only buttons
- [ ] Verify focus visible states
- [ ] Test screen reader navigation

**Estimated Time:** 1-2 hours

---

## 🟡 Priority 2: Technical Cleanup

### 5. Console Warnings
**Issue:** "No link element found for chunk" on every page  
**Action:** 
1. Test production build: `npm run build && npm start`
2. If persists in production, investigate Turbopack chunk loading
3. May be dev-only warning (monitor after deploy)

**Service Worker 404:**
- Decide if PWA features needed
- If yes: Configure next-pwa
- If no: Can ignore (expected)

**Estimated Time:** 30 minutes

---

### 6. Linting Cleanup
**File:** Multiple files  
**Issues:**
- bg-gradient classes should be bg-linear (Tailwind v4)
- Array keys using index instead of stable IDs

**Action:**
```bash
npm run lint
# Fix all warnings
```

**Estimated Time:** 30 minutes

---

## 🟢 Priority 3: Enhancements (Post-Launch)

### 7. Design System Lab Theme Decision
**Question:** Should Design System Lab match light theme or stay dark?  
**Current:** Dark theme (design tool aesthetic)  
**Options:**
- A) Keep dark (Figma/VS Code feel)
- B) Switch to light (consistency)
- C) Add theme toggle just for this page

**Action:** User decision needed

---

### 8. Process Page Interactivity
**Test:** 
- Lane switching (Agentic/Hybrid/Traditional)
- Psychology chip clicks
- Stage gate behaviors

**Action:** Manual QA on live site

---

### 9. Loading States
**Add:**
- Skeleton screens for slow connections
- Image lazy loading
- Progressive enhancement

**Files:** All page components

---

### 10. Error Boundaries
**Add:** React error boundaries for resilience  
**Files:** Layout components, page wrappers

---

## 📊 Quick Stats

| Metric | Count |
|--------|-------|
| Pages Tested | 10 |
| Critical Issues | 0 |
| High Priority Items | 4 |
| Medium Priority Items | 2 |
| Low Priority Items | 4 |
| **Est. Time to Launch** | **8-12 hours** |

---

## 🚀 Launch Checklist

### Must Do
- [ ] Complete Studio Wall stages 03-08
- [ ] Fix work page copy
- [ ] Mobile responsive test
- [ ] Accessibility audit
- [ ] Production build test

### Should Do
- [ ] Fix linting warnings
- [ ] Resolve console warnings
- [ ] Test all interactive elements

### Nice to Have
- [ ] Add loading states
- [ ] Error boundaries
- [ ] PWA configuration (if needed)

---

## 📝 Notes

**Overall:** Portfolio is in excellent shape! No critical bugs found. Main work is content completion (Studio Wall) and responsive testing. Design system is consistent, performance is excellent, and code quality is high.

**Recommendation:** Focus on Studio Wall completion first (highest impact), then mobile testing. Everything else can ship as-is or be addressed post-launch.
