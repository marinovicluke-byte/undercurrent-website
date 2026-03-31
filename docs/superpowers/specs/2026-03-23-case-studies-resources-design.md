# Case Studies & Resources Pages — Design Spec

## Overview

Two new pages for the UnderCurrent website, both launching in "Coming Soon" state with placeholder content. Both follow the dark-mode aesthetic with video hero and ocean wave canvas animations.

## Pages

### 1. Case Studies (`/case-study`)

**Hero Section:**
- Full-height (100dvh) dark hero with `hero-bg.mp4` video background
- Left-aligned headline: "Real Businesses." / "Real Results." (sage second line)
- Inward masking gradients on all edges (same as homepage)
- Eyebrow: "CASE STUDIES"
- Sub-copy: "See how we've helped small businesses reclaim their time and scale their operations with AI automation."
- Scroll hint at bottom: "↓ scroll to explore"
- GSAP staggered entrance animation (video → headline → sub → scroll hint)

**Album Section (below hero):**
- Dark background (`#1C1C1A`) with fixed ocean wave canvas animation behind content
- Ambient radial gradient blurs (sage-tinted, subtle)
- Centered album container (max-width 900px):
  - Background: `linear-gradient(145deg, rgba(143,175,159,0.06), rgba(28,28,26,0.3))`
  - Border: `1px solid rgba(143,175,159,0.12)`, border-radius: 1.5rem
  - Min-height: 420px
- **Tab edges** on right side: 4 tabs (01-04), vertically centered
  - Each tab: 36px wide, 52px tall, sage-tinted background
  - Hover: extends to 44px, brighter background
  - Active tab: highlighted border
  - Labels: DM Mono, vertical text, "01" through "04"
  - Mobile: tabs shrink to 28x44px
- **Coming Soon content** (centered in album):
  - Book icon (24x24 SVG, sage stroke)
  - DM Mono eyebrow: "COMING SOON"
  - Cormorant heading: "Case Studies Arriving Shortly"
  - DM Sans body: "We're documenting the results from our latest automation builds. Check back soon to see the impact."
- **Wave animation** inside album bottom: 3 layered SVG waves drifting horizontally
- **Flip hint** at bottom: "CLICK TABS TO BROWSE" (DM Mono, very subtle)

**Future state (when case studies are added):**
- Each tab flips to a case study page with 3D CSS perspective page-curl animation
- Case study content: client name, industry, problem, solution, key metrics, quote
- Swipe gesture support on mobile

### 2. Resources (`/resources`)

**Hero Section:**
- Identical pattern to Case Studies hero
- Left-aligned headline: "Insights From" / "the Field." (sage second line)
- Eyebrow: "RESOURCES"
- Sub-copy: "Guides, playbooks, and lessons we've learned building AI automation for small businesses."
- Scroll hint, GSAP entrance animation

**Content Section (below hero):**
- Dark background with fixed ocean wave canvas animation
- Ambient radial gradient blurs

- **Section header** (centered, max-width 600px):
  - Eyebrow: "BROWSE RESOURCES"
  - Cormorant heading: "Everything We Know, Packaged for You"
  - Sub-copy about actionable guides

- **Filter pills** (centered row, flex-wrap):
  - ALL (active by default), GUIDES, ARTICLES, PLAYBOOKS, TOOLS
  - DM Mono, 0.6rem, pill-shaped (border-radius 9999px)
  - Active: sage background tint, sage border, sage text
  - Non-functional in Coming Soon state

- **Card grid** (max-width 1100px, 3 columns on desktop, 1 on mobile):
  - `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`, gap 1.25rem
  - 6 placeholder cards

- **Resource card structure:**
  - Dark glassmorphic background with sage-tinted gradient
  - Border: `1px solid rgba(143,175,159,0.1)`, border-radius: 1.25rem
  - Hover: translateY(-4px), brighter border, box-shadow
  - **Image area** (180px height):
    - Dark gradient background
    - Placeholder image icon (SVG, very faint)
    - Subtle wave animation at bottom of image area
    - "COMING SOON" overlay with backdrop blur
  - **Card body:**
    - Category label: DM Mono, sage, uppercase (GUIDE / ARTICLE / PLAYBOOK / TOOL)
    - Title: Cormorant, 1.25rem, 600 weight, off-white
    - Description: DM Sans, 0.82rem, 300 weight, muted parchment
    - CTA: "Read More →" or "Download →" in sage, arrow moves on hover

- **Bottom message:** "More resources are on the way..."

**Placeholder card content (6 cards):**
1. GUIDE — "The Small Business Automation Playbook"
2. ARTICLE — "5 Signs Your Follow-Up Is Costing You Clients"
3. PLAYBOOK — "Automating Onboarding Without Losing the Personal Touch"
4. TOOL — "The AI Readiness Checklist"
5. ARTICLE — "Why Most Businesses Automate the Wrong Things First"
6. GUIDE — "From Inbox Zero to Inbox Automated"

## Shared Patterns

**Both pages use:**
- `Navbar` component with `isSubPage={true}`, `ready={true}`
- `PageHead` with title, description, canonical URL, JSON-LD (WebPage schema)
- `Footer` component
- `Reveal` component for scroll-triggered fade-in animations
- `WaterCanvas` or equivalent ocean wave canvas animation (fixed behind content)
- Video hero with `preload="none"` (lazy load)
- Dark background throughout (`#1C1C1A`)
- Ambient radial gradient blurs (sage-tinted)

**SEO:**
- Canonical tags: `/case-study` and `/resources`
- Added to sitemap via prerender.js ROUTES array
- JSON-LD WebPage schema on each
- Not added to navbar — accessible via footer links and sitemap only
- Footer link for Case Studies already exists (update href if needed)
- Add Resources link to footer

## Routing

- Add to `App.jsx`:
  - `<Route path="/case-study" element={<CaseStudies />} />`
  - `<Route path="/resources" element={<Resources />} />`
- Lazy-loaded with `Suspense` wrapper

## File Structure

- `src/pages/CaseStudies.jsx` — album page
- `src/pages/Resources.jsx` — card grid page

## Mobile Responsiveness

- Hero: reduces min-height, text scales with clamp()
- Album: tabs shrink, padding reduces
- Card grid: single column
- Filter pills: wrap to multiple rows
- All touch-friendly tap targets
