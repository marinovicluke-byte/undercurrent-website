# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Undercurrent homepage to follow StoryBrand + Hormozi principles — outcome-first copy, dual CTAs, horizontal problem strip, animated outcome cards, and value-pricing offer section.

**Architecture:** Each homepage section maps to an existing component file. One new component (`ProofStrip`) is created for Section 2, which doesn't exist in the current homepage. The App.jsx component order stays identical; only Features is removed. All animations use the existing GSAP + ScrollTrigger setup already installed.

**Tech Stack:** React 18, Vite, GSAP + ScrollTrigger, Lucide React, inline styles (no Tailwind except where existing components already use it), DM Sans / Cormorant Garamond / DM Mono fonts.

---

## File Map

| File | Change |
|------|--------|
| `src/components/Hero.jsx` | Add second CTA button; update headline + trust chips |
| `src/components/ProofStrip.jsx` | **Create new** → Section 2 proof strip (4 outcome stats) |
| `src/App.jsx` | Import ProofStrip; remove Features import + JSX usage |
| `src/components/Benefits.jsx` | Full rewrite → Problem Strip (Section 3) |
| `src/components/WhatWeAutomate.jsx` | Full rewrite → Dream Cards (Section 4) |
| `src/components/Protocol.jsx` | Copy rewrite + connector line animation |
| `src/components/Pricing.jsx` | Full rewrite → Offer section (Section 6) |
| `src/components/FAQ.jsx` | Data rewrite only (4 questions), structure unchanged |
| `src/components/Contact.jsx` | Full rewrite → Final CTA (Section 8) |

---

## Before You Start

```bash
cd /Users/luke/Desktop/Website/undercurrent
npm run dev
```

Keep the dev server running. After each task, verify in the browser at `http://localhost:5173`.

---

## Task 1: Hero — Add Second CTA + Update Trust Chips

**Files:**
- Modify: `src/components/Hero.jsx`

The hero currently has one CTA button and no trust chips. Add a secondary ghost CTA linking to `/audit` and update the scroll indicator area with trust chips.

- [ ] **Step 1: Open Hero.jsx and locate the CTA block**

The CTA is at line ~275, inside the `ctaRef` div. The current code is:

```jsx
<div ref={ctaRef} style={{ opacity: 0, marginTop: '2.5rem' }}>
  <a href="https://cal.com/luke-marinovic-aqeosc/30min" target="_blank" rel="noopener noreferrer" className="btn-sage-hero" style={{ fontSize: '0.9rem' }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      Book a Workflow Review
      <ArrowRight size={16} />
    </span>
  </a>
</div>
```

- [ ] **Step 2: Replace the CTA block with dual CTAs + trust chips**

Replace the entire `ctaRef` div with:

```jsx
<div ref={ctaRef} style={{ opacity: 0, marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
  {/* Primary + Secondary CTA row */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
    <a
      href="https://cal.com/luke-marinovic-aqeosc/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="btn-sage-hero"
      style={{ fontSize: '0.9rem' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Book a Free Audit
        <ArrowRight size={16} />
      </span>
    </a>
    <a
      href="/audit"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 400,
        color: 'rgba(232,224,208,0.7)',
        border: '1px solid rgba(232,224,208,0.2)',
        borderRadius: '9999px',
        padding: '0.7rem 1.5rem',
        textDecoration: 'none',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'rgba(232,224,208,1)'
        e.currentTarget.style.borderColor = 'rgba(232,224,208,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(232,224,208,0.7)'
        e.currentTarget.style.borderColor = 'rgba(232,224,208,0.2)'
      }}
    >
      Try the Free Calculator
      <ArrowRight size={14} />
    </a>
  </div>

  {/* Trust chips */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
    {['No tech knowledge needed', 'Live in 14 days', 'Results in 30 days or we keep going'].map((chip, i) => (
      <span key={chip} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {i > 0 && <span style={{ color: 'rgba(143,175,159,0.3)', fontSize: '0.7rem' }}>·</span>}
        <span
          className="font-mono"
          style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(232,224,208,0.35)' }}
        >
          {chip}
        </span>
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 3: Update the hero headline copy**

Find the `<h1 ref={headlineRef}>` block (around line 226) and replace the entire `<h1>` with:

```jsx
<h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
  <span
    className="block font-dm"
    style={{
      fontSize: 'clamp(3.2rem, 7.5vw, 8rem)',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      color: '#F7F3ED',
      lineHeight: 1.0,
    }}
  >
    Your Business Should Run
  </span>
  <span
    className="block font-cormorant"
    style={{
      fontSize: 'clamp(3.2rem, 7.5vw, 8rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      letterSpacing: '-0.02em',
      color: 'rgba(143,175,159,0.9)',
      lineHeight: 1.05,
      marginTop: '0.05em',
    }}
  >
    Without You Doing Everything.
  </span>
</h1>
```

- [ ] **Step 4: Update the body copy**

Find the `<p ref={bodyRef}>` block and replace its content:

```jsx
<p
  ref={bodyRef}
  className="font-dm"
  style={{
    fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
    fontWeight: 300,
    color: 'rgba(232,224,208,0.65)',
    lineHeight: 1.7,
    maxWidth: '42ch',
    marginTop: '2rem',
    opacity: 0,
  }}
>
  We build AI systems that chase your leads, follow up your clients, and clear your inbox — so you can get back to the work that actually grows your business.
</p>
```

- [ ] **Step 5: Verify in browser**

Check `http://localhost:5173` — hero should show two buttons side by side, trust chips below, updated headline and copy. On mobile (resize window to 375px) both buttons should stack nicely.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: hero dual CTAs, updated headline and trust chips"
```

---

## Task 1.5: Create Proof Strip (Section 2)

**Files:**
- Create: `src/components/ProofStrip.jsx`
- Modify: `src/App.jsx`

The main homepage has no proof strip. Create a new component and insert it into App.jsx between `<Hero>` and `<Benefits>`.

- [ ] **Step 1: Create `src/components/ProofStrip.jsx`**

```jsx
export default function ProofStrip() {
  const STATS = [
    { stat: '12 hrs', label: 'Saved every week', color: '#D4C9B0' },
    { stat: '+40%', label: 'More leads converted', color: '#8FAF9F' },
    { stat: '+31%', label: 'More 5-star reviews', color: '#C4A97A' },
    { stat: '$800+', label: 'Saved per week in admin costs', color: '#89ACBE' },
  ]

  return (
    <section
      style={{
        backgroundColor: '#1C1C1A',
        borderTop: '1px solid rgba(143,175,159,0.08)',
        borderBottom: '1px solid rgba(143,175,159,0.08)',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        className="proof-strip-grid"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          textAlign: 'center',
        }}
      >
        {STATS.map((item) => (
          <div key={item.label} style={{ padding: '0.5rem' }}>
            <p
              className="font-cormorant"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: item.color,
                margin: '0 0 0.35rem',
                lineHeight: 1,
              }}
            >
              {item.stat}
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                color: 'rgba(212,201,176,0.45)',
                margin: 0,
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          .proof-strip-grid { grid-template-columns: 1fr 1fr !important; gap: 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Import and insert ProofStrip in App.jsx**

Add import at top of `src/App.jsx` alongside the other component imports:
```jsx
import ProofStrip from './components/ProofStrip'
```

In the `HomePage` function, insert `<ProofStrip />` immediately after `<Hero ready={loaderDone} />`:
```jsx
<Hero ready={loaderDone} />
<ProofStrip />
<Benefits />
```

- [ ] **Step 3: Verify in browser**

A dark bar should appear between the Hero and the Problem Strip showing 4 stats: 12 hrs / +40% / +31% / $800+. On mobile (≤600px) the grid should be 2×2.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProofStrip.jsx src/App.jsx
git commit -m "feat: add proof strip — 4 outcome stats below hero"
```

---

## Task 2: Remove Features from Homepage

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Remove the Features import**

In `src/App.jsx`, find and delete this line:
```jsx
import Features from './components/Features'
```

- [ ] **Step 2: Remove the Features JSX usage**

In the `HomePage` function, find and delete:
```jsx
<Features />
```

- [ ] **Step 3: Verify no console errors**

Check the browser console at `http://localhost:5173` — no import errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: remove Features component from homepage"
```

---

## Task 3: Section 3 — Problem Strip (Benefits.jsx full rewrite)

**Files:**
- Modify: `src/components/Benefits.jsx`

Full rewrite of Benefits.jsx. The existing animated stat cards are replaced with a horizontal strip of 5 problem cards on cream background.

**Desktop:** 5 cards in a flex row, equal width, no overflow. **Mobile:** horizontal scroll carousel, edge fade both sides, active card scales up.

- [ ] **Step 1: Replace Benefits.jsx entirely**

```jsx
import { useState, useRef, useEffect } from 'react'

const PROBLEMS = [
  {
    num: '01',
    title: "You're losing clients before they even start",
    desc: 'No follow-up system means leads go cold and clients feel ignored.',
  },
  {
    num: '02',
    title: "Your best leads are going cold right now",
    desc: 'Every hour without a reply is a deal sliding to your competitor.',
  },
  {
    num: '03',
    title: "You're invisible online because content takes too long",
    desc: "You know you should post. You never have time.",
  },
  {
    num: '04',
    title: "Your inbox is running your day, not you",
    desc: '3–4 hours a day on email and scheduling. Every single day.',
  },
  {
    num: '05',
    title: "You're chasing money you've already earned",
    desc: 'Late invoices and manual reconciliation are costing you hours and cash.',
  },
]

function ProblemCard({ problem, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(212,201,176,0.6)',
        borderRadius: '1.25rem',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 12px 40px rgba(143,175,159,0.15)'
          : '0 2px 8px rgba(28,28,26,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Sage accent bar — slides in from left on hover */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '3px',
          width: '100%',
          background: '#8FAF9F',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.35s ease',
          borderRadius: '0 0 2px 2px',
        }}
      />

      {/* Pulsing dot — top right */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#D97757',
          animation: 'problem-pulse 2s ease-in-out infinite',
          animationDelay: `${index * 0.3}s`,
        }}
      />

      {/* Ghost number */}
      <div
        className="font-cormorant"
        style={{
          fontSize: '5rem',
          fontWeight: 700,
          lineHeight: 1,
          color: hovered ? '#8FAF9F' : 'rgba(28,28,26,0.06)',
          opacity: hovered ? 0.45 : 1,
          transition: 'color 0.3s ease, opacity 0.3s ease',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
          marginBottom: '-0.5rem',
        }}
      >
        {problem.num}
      </div>

      {/* Title */}
      <p
        className="font-dm"
        style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#1C1C1A',
          lineHeight: 1.35,
          margin: 0,
        }}
      >
        {problem.title}
      </p>

      {/* Description */}
      <p
        className="font-dm"
        style={{
          fontSize: '0.82rem',
          fontWeight: 300,
          color: 'rgba(28,28,26,0.5)',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {problem.desc}
      </p>

      {/* Warm glow overlay on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1.25rem',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(196,169,122,0.07) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default function Benefits() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const stripRef = useRef(null)
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Detect active card on mobile scroll
  useEffect(() => {
    if (!isMobile || !stripRef.current) return
    const el = stripRef.current
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / PROBLEMS.length
      const idx = Math.round(el.scrollLeft / cardWidth)
      setActiveIndex(Math.min(idx, PROBLEMS.length - 1))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Fade in section
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#F7F3ED',
        padding: '7rem 1.5rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <style>{`
        @keyframes problem-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 0.3; }
        }
        .problem-strip::-webkit-scrollbar { display: none; }
        .problem-strip { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p
            className="font-mono"
            style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: '#8FAF9F', marginBottom: '1rem', fontWeight: 500 }}
          >
            THE PROBLEM
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              color: '#1C1C1A',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            You're the most expensive person in your business —<br />doing the cheapest tasks.
          </h2>
          <p
            className="font-dm"
            style={{
              fontSize: '1.05rem',
              fontWeight: 300,
              color: 'rgba(28,28,26,0.55)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Every hour you spend chasing invoices, following up leads, or writing the same email again is an hour you're not growing your business.
          </p>
        </div>

        {/* Card strip */}
        <div style={{ position: 'relative' }}>
          {/* Edge fade — left */}
          {isMobile && (
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, #F7F3ED, transparent)',
            }} />
          )}
          {/* Edge fade — right */}
          {isMobile && (
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to left, #F7F3ED, transparent)',
            }} />
          )}

          <div
            ref={stripRef}
            className="problem-strip"
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: isMobile ? 'auto' : 'visible',
              paddingBottom: isMobile ? '0.5rem' : 0,
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
            }}
          >
            {PROBLEMS.map((p, i) => (
              <div
                key={p.num}
                style={{
                  scrollSnapAlign: isMobile ? 'center' : 'none',
                  flexShrink: isMobile ? 0 : 1,
                  width: isMobile ? '78vw' : 'auto',
                  flex: isMobile ? 'none' : '1 1 0',
                  transform: isMobile && activeIndex !== i ? 'scale(0.97)' : 'scale(1)',
                  opacity: isMobile && activeIndex !== i ? 0.8 : 1,
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
              >
                <ProblemCard problem={p} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile scroll dots */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1.5rem' }}>
            {PROBLEMS.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '3px',
                  width: activeIndex === i ? '1.5rem' : '0.5rem',
                  borderRadius: '9999px',
                  background: activeIndex === i ? '#8FAF9F' : 'rgba(143,175,159,0.25)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Section 3 should show a cream background, headline, and 5 white cards in a row (desktop) or swipeable carousel (mobile). Each card should lift on hover with sage accent bar. The pulsing dot should be visible top-right of each card.

- [ ] **Step 3: Commit**

```bash
git add src/components/Benefits.jsx
git commit -m "feat: problem strip — horizontal card layout with hover interactions"
```

---

## Task 4: Section 4 — Dream Cards (WhatWeAutomate.jsx full rewrite)

**Files:**
- Modify: `src/components/WhatWeAutomate.jsx`

Full rewrite. Three outcome cards on dark background. Card 1 and 2 use animated counters (reusing the `useCounter` pattern from original Benefits.jsx). Card 3 uses a pipeline SVG animation.

- [ ] **Step 1: Replace WhatWeAutomate.jsx entirely**

```jsx
import { useEffect, useRef, useState } from 'react'

// ─── Counter hook (scroll-triggered, fires once) ──────────────────────────────
function useScrollCounter(target, duration) {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    let start = null
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return [ref, count]
}

// ─── Pipeline animation (Card 3) ─────────────────────────────────────────────
function PipelineVisual({ color }) {
  const [dotPos, setDotPos] = useState(0) // 0 = start, 1 = node1, 2 = node2, 3 = end
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    let pos = 0
    const advance = () => {
      pos = (pos + 1) % 4
      setDotPos(pos)
    }
    // Each node: 1.5s traverse + 0.5s pause
    const intervals = [1500, 500, 1500, 500]
    let i = 0
    const loop = () => {
      const t = setTimeout(() => { advance(); i = (i + 1) % 4; loop() }, intervals[i])
      return t
    }
    const t = loop()
    return () => clearTimeout(t)
  }, [active])

  const nodes = [
    { x: 20,  label: 'Enquiry' },
    { x: 110, label: 'Follow-up' },
    { x: 200, label: 'Booked' },
  ]

  // Dot x position based on dotPos (0 = before node 0, 1 = at node 0, 2 = at node 1, 3 = at node 2)
  const dotX = dotPos === 0 ? 0 : nodes[Math.min(dotPos - 1, 2)].x

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 60"
      fill="none"
      style={{ width: '100%', maxWidth: '220px', display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      {/* Track line */}
      <line x1={20} y1={28} x2={200} y2={28} stroke={`${color}30`} strokeWidth={1} strokeDasharray="3 4" />

      {/* Animated dot */}
      <circle
        cx={dotX}
        cy={28}
        r={5}
        fill={color}
        style={{ transition: 'cx 1.3s cubic-bezier(0.4,0,0.2,1)' }}
      />

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={28} r={8} fill="rgba(28,28,26,0.8)" stroke={`${color}50`} strokeWidth={1} />
          <circle cx={n.x} cy={28} r={3} fill={`${color}80`} />
          <text
            x={n.x}
            y={50}
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontSize={8}
            fill={`${color}70`}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── Service pill tags ────────────────────────────────────────────────────────
function ServiceTags({ tags, color }) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '1rem' }}>
      {tags.map(tag => (
        <span
          key={tag}
          className="font-mono"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            color: `${color}80`,
            border: `1px solid ${color}30`,
            borderRadius: '9999px',
            padding: '0.18rem 0.55rem',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// ─── Card 1 — Time ────────────────────────────────────────────────────────────
function TimeCard() {
  const color = '#8FAF9F'
  const [ref, count] = useScrollCounter(12, 2500)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        TIME
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        {count} <span style={{ fontSize: '1.5rem' }}>hrs/week</span>
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        Back every week
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Your follow-ups, reminders, and inbox — handled automatically. You only touch what actually needs you.
      </p>
      <ServiceTags tags={['Sales', 'Personal Admin']} color={color} />
    </div>
  )
}

// ─── Card 2 — Money ───────────────────────────────────────────────────────────
function MoneyCard() {
  const color = '#C4A97A'
  const [ref, count] = useScrollCounter(800, 2500)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        MONEY
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        ${count}<span style={{ fontSize: '1.5rem' }}>+</span>
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        Saved per week in admin costs
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Every invoice chased, every receipt logged, every overdue payment followed up — without you lifting a finger.
      </p>
      <ServiceTags tags={['Finance', 'Customer Experience']} color={color} />
    </div>
  )
}

// ─── Card 3 — Growth ──────────────────────────────────────────────────────────
function GrowthCard() {
  const color = '#89ACBE'

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        GROWTH
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        +40%
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        More leads converted
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Every enquiry gets a fast, personal reply. Every lead gets followed up. No one slips through the cracks.
      </p>
      <div style={{ marginBottom: '1.5rem' }}>
        <PipelineVisual color={color} />
      </div>
      <ServiceTags tags={['Sales', 'Content']} color={color} />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function WhatWeAutomate() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={ref}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.9)', marginBottom: '1rem', fontWeight: 500 }}>
            WHAT CHANGES
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '0.5rem' }}>
            Here's what your business looks like when it runs itself.
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <TimeCard />
          <MoneyCard />
          <GrowthCard />
        </div>

        {/* Tagline */}
        <p
          className="font-cormorant"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(247,243,237,0.45)',
            marginTop: '3rem',
            letterSpacing: '-0.01em',
          }}
        >
          "We do the repetitive work so you can focus on the work only you can do."
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Section 4 should show 3 dark cards. Cards 1 and 2 should animate their number from 0 on scroll-enter. Card 3 should show the pipeline dot moving left to right on loop. All cards have service pill tags at the bottom.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatWeAutomate.jsx
git commit -m "feat: dream cards — animated counters, pipeline visual, service tags"
```

---

## Task 5: Section 5 — Plan (Protocol.jsx copy rewrite + connector line)

**Files:**
- Modify: `src/components/Protocol.jsx`

The Protocol component is structurally solid. Changes needed:
1. Update all copy (headline, tagline, step bodies, tags)
2. Add a dashed connector line that draws between the three cards on scroll-enter (desktop), vertical version on mobile

- [ ] **Step 1: Update the STEPS data array**

Find the `const STEPS = [...]` array (around line 303) and replace it:

```js
const STEPS = [
  {
    num: '01',
    word: 'Audit',
    color: '#8FAF9F',
    tagline: 'We find where your time is going.',
    body: 'In a free 30-minute call we look at everything you do every week. We show you exactly what can be automated and how much time it will give back.',
    tag: 'Free 30-min call',
    visual: <MapVisual />,
  },
  {
    num: '02',
    word: 'Build',
    color: '#C4A97A',
    tagline: "We build it. You don't touch a thing.",
    body: "We set everything up inside the tools you already use. No new software. No learning curve. Nothing changes about how you work — we just remove the slow parts.",
    tag: 'Done for you · 2 weeks',
    visual: <BuildVisual />,
  },
  {
    num: '03',
    word: 'Flow',
    color: '#6B7C4A',
    tagline: "It runs. You get your time back.",
    body: "Your leads get followed up. Your clients feel looked after. Your inbox stays clear. It works around the clock so you don't have to.",
    tag: 'Ongoing · Always on',
    visual: <FlowVisual />,
  },
]
```

- [ ] **Step 2: Update section header copy**

Find the `<h2 className="proto-h2">` block and replace its content:

```jsx
<h2 className="proto-h2" style={{
  fontFamily: 'Cormorant Garamond, serif',
  fontSize: 'clamp(3rem, 7vw, 6rem)',
  fontWeight: 600, lineHeight: 0.93,
  letterSpacing: '-0.03em', color: '#F7F3ED',
  opacity: 0,
}}>
  Three steps.<br />
  <span style={{ color: '#8FAF9F' }}>Then it runs itself.</span>
</h2>
```

Find the `<p>` inside `proto-sub` (around line 531 of Protocol.jsx) and replace its text content only — keep all existing style props intact:
```jsx
<p style={{
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
  color: 'rgba(247,243,237,0.42)',
  lineHeight: 1.65, fontWeight: 300, marginBottom: 16,
}}>
  You don't need to know how it works. You just need to know it does.
</p>
```

- [ ] **Step 3: Update StepCard to show the tag at the bottom**

Find the StepCard render (around line 331) and add a tag element after the body `<p>`. Inside the content `<div style={{ position: 'relative', zIndex: 1 }}>`, after the body paragraph, add:

```jsx
{/* Tag */}
<div style={{
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: '1.25rem',
  padding: '0.3rem 0.75rem',
  borderRadius: '9999px',
  background: `${step.color}15`,
  border: `1px solid ${step.color}35`,
}}>
  <span
    className="font-mono"
    style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: step.color, fontWeight: 500 }}
  >
    {step.tag}
  </span>
</div>
```

Note: The `step` data object doesn't currently have a `tag` field — you added it in Step 1 above.

- [ ] **Step 4: Add connector line between cards**

In the grid container `<div ref={gridRef}>`, wrap the cards in a relative position container and add an SVG connector line. Replace the grid div with:

```jsx
<div
  ref={gridRef}
  style={{
    maxWidth: 1100,
    margin: '0 auto',
    padding: 'clamp(16px, 3vw, 32px) clamp(24px, 5vw, 64px) clamp(56px, 7vw, 88px)',
    position: 'relative',
  }}
>
  {/* Connector line — desktop only, draws on scroll-enter */}
  <ConnectorLine gridRef={gridRef} />

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(14px, 2vw, 22px)',
  }}>
    {STEPS.map((step, i) => (
      <StepCard key={step.num} step={step} index={i} />
    ))}
  </div>
</div>
```

Then add the `ConnectorLine` component above the `Protocol` export:

```jsx
function ConnectorLine({ gridRef }) {
  const lineRef = useRef(null)
  const [drawn, setDrawn] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDrawn(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  if (isMobile) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(clamp(16px, 3vw, 32px) + 80px)',
        left: 'clamp(24px, 5vw, 64px)',
        right: 'clamp(24px, 5vw, 64px)',
        height: '1px',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        ref={lineRef}
        style={{
          height: '1px',
          width: '100%',
          background: 'repeating-linear-gradient(to right, rgba(143,175,159,0.35) 0px, rgba(143,175,159,0.35) 6px, transparent 6px, transparent 12px)',
          transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 5: Verify in browser**

Section 5 should show the updated copy and tags on each card. On desktop, a dashed sage line should draw left to right across the three cards on scroll-enter. No connector line on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/components/Protocol.jsx
git commit -m "feat: plan section — updated copy, outcome tags, connector line animation"
```

---

## Task 6: Section 6 — Offer (Pricing.jsx full rewrite)

**Files:**
- Modify: `src/components/Pricing.jsx`

Full rewrite to value-pricing offer section with Cormorant italic statements, pulsing guarantee card, and dual CTAs.

- [ ] **Step 1: Replace Pricing.jsx entirely**

```jsx
import { useEffect, useRef, useState } from 'react'
import { Shield, ArrowRight } from 'lucide-react'

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

function useFadeIn(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return [ref, visible]
}

export default function Pricing() {
  const [sectionRef, sectionVisible] = useFadeIn(0)
  const [lineRef, lineVisible] = useFadeIn(200)
  const [s1Ref, s1Visible] = useFadeIn(300)
  const [s2Ref, s2Visible] = useFadeIn(450)
  const [s3Ref, s3Visible] = useFadeIn(600)
  const [shimmered, setShimmered] = useState(false)

  // Shimmer fires once when CTA section enters view
  const ctaRef = useRef(null)
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shimmered) {
          setShimmered(true)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [shimmered])

  const STATEMENTS = [
    'Priced on the value it creates — not an hourly rate.',
    'Done for you, inside the tools you already use.',
    'Results in 30 days. Or we keep going — no charge.',
  ]

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
      <style>{`
        @keyframes guarantee-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,175,159,0); }
          50% { box-shadow: 0 0 0 8px rgba(143,175,159,0.08); }
        }
        @keyframes btn-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .offer-btn-primary {
          position: relative;
          overflow: hidden;
        }
        .offer-btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          width: 40%;
          transform: translateX(-100%) skewX(-15deg);
        }
        .offer-btn-primary.shimmer::after {
          animation: btn-shimmer 0.6s ease forwards;
        }
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>

        {/* Eyebrow */}
        <div
          ref={sectionRef}
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.9)', marginBottom: '1rem', fontWeight: 500 }}>
            THE OFFER
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '1rem' }}>
            You only pay based on what it saves you.
          </h2>
          <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(247,243,237,0.5)', lineHeight: 1.7, marginBottom: '3rem' }}>
            We price on the value we create — not an hourly rate. If your business saves $20,000 a year, you keep most of it. We take a small share. Most clients see their full investment back within six months.
          </p>
        </div>

        {/* Drawing divider */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'rgba(143,175,159,0.2)',
            marginBottom: '2.5rem',
            transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 0.6s ease-in-out',
          }}
        />

        {/* Cormorant italic statements — three individual refs, no hooks in loops */}
        <div style={{ marginBottom: '2.5rem' }}>
          {[
            { ref: s1Ref, visible: s1Visible, text: STATEMENTS[0], last: false },
            { ref: s2Ref, visible: s2Visible, text: STATEMENTS[1], last: false },
            { ref: s3Ref, visible: s3Visible, text: STATEMENTS[2], last: true },
          ].map(({ ref, visible, text, last }) => (
            <p
              key={text}
              ref={ref}
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: last ? '#8FAF9F' : 'rgba(247,243,237,0.7)',
                margin: last ? 0 : '0 0 0.5rem',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Guarantee card */}
        <div
          style={{
            backgroundColor: 'rgba(143,175,159,0.06)',
            border: '1px solid rgba(143,175,159,0.25)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            textAlign: 'left',
            animation: 'guarantee-pulse 3s ease-in-out infinite',
          }}
        >
          <Shield size={18} color="#8FAF9F" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#F7F3ED', fontWeight: 500 }}>Zero-Risk Guarantee.</strong>{' '}
            If we can't find you at least 5 hours a week to automate in the free audit — the call is free and you keep every insight.
          </p>
        </div>

        {/* Dual CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-sage-hero offer-btn-primary${shimmered ? ' shimmer' : ''}`}
              style={{ fontSize: '0.95rem', padding: '0.85rem 1.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Book Your Free Audit <ArrowRight size={16} />
            </a>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.88rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                color: 'rgba(247,243,237,0.55)',
                border: '1px solid rgba(247,243,237,0.15)',
                borderRadius: '9999px',
                padding: '0.7rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              Try the Free Calculator <ArrowRight size={14} />
            </a>
          </div>
          <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.2)', margin: 0 }}>
            No obligation · No tech knowledge needed
          </p>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Section 6 should show: headline, value pricing sub-copy, a sage line that draws across, three italic statements fading in staggered, the guarantee card with a subtle pulsing glow, and two CTAs. The primary button should shimmer once when scrolled into view.

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.jsx
git commit -m "feat: offer section — value pricing, guarantee card pulse, dual CTAs, shimmer"
```

---

## Task 7: Section 7 — FAQ Copy Rewrite

**Files:**
- Modify: `src/components/FAQ.jsx`

Copy rewrite only. Replace the `faqs` array data with 4 new questions. Keep all component logic, animation, and layout exactly as-is.

- [ ] **Step 1: Replace the faqs array (lines 7–32)**

```js
const faqs = [
  {
    q: 'Will this work for my type of business?',
    a: "If you run a service business and you have repetitive tasks — yes. We work with coaches, consultants, trades, agencies, and healthcare practices. If you're wearing too many hats, we can help. The free audit tells you exactly how much.",
  },
  {
    q: 'Do I need to learn new software?',
    a: "No. We build everything inside the tools you already use — Gmail, Notion, HubSpot, Slack, whatever you've got. Nothing changes about how you work. We just remove the slow parts.",
  },
  {
    q: 'How long until I see results?',
    a: "Most clients save meaningful time in the first two weeks. Full ROI usually lands within six months. We move fast because we've done this before.",
  },
  {
    q: "What if it doesn't work?",
    a: "That's what the free audit is for. Before we build anything, we show you exactly what we'll automate and how many hours it saves. You see the numbers first. If they don't impress you — walk away, no charge.",
  },
]
```

- [ ] **Step 2: Update section heading copy**

Find the heading block (around line 214) and update:
```jsx
<p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
  QUESTIONS
</p>
<h2 className="font-cormorant text-charcoal" style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
  You probably have a few questions.<br />Here are the honest answers.
</h2>
<p className="font-dm text-charcoal/50 mt-4" style={{ fontSize: '1.05rem', fontWeight: 300, maxWidth: '480px', lineHeight: 1.7 }}>
  Straightforward answers to the questions we hear most.
</p>
```

- [ ] **Step 3: Verify in browser**

FAQ section should show 4 questions with the updated copy. Desktop shows left-column selector + right panel. Mobile shows accordion. Interaction unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/components/FAQ.jsx
git commit -m "feat: FAQ copy rewrite — 4 outcome-focused questions"
```

---

## Task 8: Section 8 — Final CTA (Contact.jsx full rewrite)

**Files:**
- Modify: `src/components/Contact.jsx`

Replace Contact with a simple, restrained final CTA section. No forms. No cards. Two CTAs, trust chips, Cormorant italic headline.

- [ ] **Step 1: Replace Contact.jsx entirely**

```jsx
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

function useFadeIn(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return [ref, visible]
}

export default function Contact() {
  const [h2Ref, h2Visible] = useFadeIn(0)
  const [subRef, subVisible] = useFadeIn(120)
  const [ctaRef, ctaVisible] = useFadeIn(220)
  const [chipsRef, chipsVisible] = useFadeIn(300)

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Headline */}
        <h2
          ref={h2Ref}
          className="font-cormorant"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F7F3ED',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            opacity: h2Visible ? 1 : 0,
            transform: h2Visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          "What would you do with 12 hours back every week?"
        </h2>

        {/* Sub-copy */}
        <p
          ref={subRef}
          className="font-dm"
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            color: 'rgba(247,243,237,0.5)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            opacity: subVisible ? 1 : 0,
            transform: subVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Book a free 30-minute call. We'll show you exactly where your time is going and what an automated version of your business looks like. No obligation. No tech knowledge needed.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sage-hero"
            style={{ fontSize: '1rem', padding: '0.9rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Book Your Free Audit <ArrowRight size={18} />
          </a>
          <a
            href="/audit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              color: 'rgba(247,243,237,0.55)',
              border: '1px solid rgba(247,243,237,0.15)',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
            }}
          >
            Try the Free Calculator <ArrowRight size={14} />
          </a>
        </div>

        {/* Trust chips */}
        <div
          ref={chipsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            opacity: chipsVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          {['No tech knowledge needed', 'Live in 14 days', 'Results in 30 days or we keep going'].map((chip, i) => (
            <span key={chip} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {i > 0 && <span style={{ color: 'rgba(143,175,159,0.2)', fontSize: '0.7rem' }}>·</span>}
              <span
                className="font-mono"
                style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(247,243,237,0.22)' }}
              >
                {chip}
              </span>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Final CTA section should show the italic Cormorant headline, sub-copy, two CTA buttons, and trust chips. Clean and restrained — no cards or grids. Staggered fade-up on scroll.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: final CTA section — simple, restrained, dual CTAs"
```

---

## Task 9: Final Review Pass

- [ ] **Step 1: Check full page scroll**

Scroll from top to bottom of `http://localhost:5173`. Verify:

- [ ] Hero: two buttons side by side, trust chips below, updated headline
- [ ] Proof strip: 4 stats (12hrs / +40% / +31% / $800+)
- [ ] Problem strip: 5 white cards, hover lifts + sage bar + pulsing dots, mobile swipes
- [ ] Dream cards: counters animate from 0, pipeline dot moves on Card 3
- [ ] Plan: updated copy, connector line draws on desktop
- [ ] Offer: italic statements fade in staggered, guarantee card pulses, primary button shimmers once
- [ ] FAQ: 4 updated questions, accordion/panel works
- [ ] Final CTA: headline, two buttons, trust chips

- [ ] **Step 2: Check mobile (resize to 375px)**

- [ ] Hero buttons stack vertically
- [ ] Problem strip swipes horizontally, active card scales up, dots indicate position
- [ ] Dream cards stack single column
- [ ] Plan cards stack single column, no connector line
- [ ] All text readable, no overflow

- [ ] **Step 3: Check console for errors**

No React errors, no missing imports, no GSAP warnings.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: homepage redesign complete — StoryBrand + Hormozi structure"
```
