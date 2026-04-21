'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import SectionShell from '@/components/ui/SectionShell'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const SERVICES = [
  {
    n: '01',
    title: 'Lead Generation',
    titleAccentWord: 'Generation',
    blurb:
      'Lead generation automation that finds prospects, writes personalised outreach, and keeps following up until someone replies.',
    bullets: ['AI cold email at scale', 'Lead capture and qualification', 'Automated follow-up sequences'],
    accent: 'blue',
  },
  {
    n: '02',
    title: 'Sales Automation',
    titleAccentWord: 'Automation',
    blurb:
      'Every step from lead to closed deal, automated. CRM stays clean. Nurture runs itself. Pipeline reports make sense.',
    bullets: ['CRM automation and data hygiene', 'AI lead nurture sequences', 'Pipeline reporting dashboards'],
    accent: 'orange',
  },
  {
    n: '03',
    title: 'Frontend Experiences',
    titleAccentWord: 'Experiences',
    blurb:
      'Websites and landing pages built to convert. Interactive demos that work like sales tools. Fast, credible, built to rank.',
    bullets: ['Marketing websites and landing pages', 'Interactive product demos', 'Conversion-focused redesigns'],
    accent: 'sage',
  },
  {
    n: '04',
    title: 'SEO & AI Visibility',
    titleAccentWord: 'Visibility',
    blurb:
      'SEO tuned for both Google rankings and AI search. The same work that earns rankings earns citations in ChatGPT, Claude, and Perplexity.',
    bullets: ['Technical and content SEO', 'AI search optimisation (AEO, GEO)', 'Citations in ChatGPT, Claude, Perplexity'],
    accent: 'blue',
  },
  {
    n: '05',
    title: 'AI Strategy & Training',
    titleAccentWord: 'Training',
    blurb:
      'AI strategy and training sized to your business. Workshops, audits, and roadmaps that fit your team\u2019s workflow and tools.',
    bullets: ['AI workshops and team training', '90-day AI roadmaps', 'Tool selection audits'],
    accent: 'orange',
  },
  {
    n: '06',
    title: 'Custom Integrations',
    titleAccentWord: 'Integrations',
    blurb:
      'Business process automation that connects the tools you already use. Custom APIs, multi-tool agents, and workflows that survive version updates and staff changes.',
    bullets: ['Custom API integrations', 'Multi-tool AI agent systems', 'Workflow automation across your stack'],
    accent: 'sage',
  },
]

const ACCENTS = {
  blue: { rgb: '106, 141, 173', light: '138, 174, 200' },
  orange: { rgb: '224, 122, 85', light: '236, 158, 128' },
  sage: { rgb: '143, 175, 159', light: '168, 196, 184' },
}

function renderTitleWithAccent(title, accentWord, a) {
  if (!accentWord || !title.toLowerCase().includes(accentWord.toLowerCase())) {
    return title
  }
  const idx = title.toLowerCase().indexOf(accentWord.toLowerCase())
  const before = title.slice(0, idx)
  const match = title.slice(idx, idx + accentWord.length)
  const after = title.slice(idx + accentWord.length)
  return (
    <>
      {before}
      <span style={{ color: `rgb(${a.light})` }}>{match}</span>
      {after}
    </>
  )
}

function useActiveCard(count) {
  const [active, setActive] = useState(0)
  const refs = useRef([])
  useEffect(() => {
    let raf = 0
    const compute = () => {
      const mid = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      refs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        compute()
      })
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count])
  const jump = i => {
    const el = refs.current[i]
    if (el) {
      const rect = el.getBoundingClientRect()
      const y = rect.top + window.scrollY - (window.innerHeight - rect.height) / 2
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
  return { active, refs, jump }
}

function ServiceCard({ s, active }) {
  const a = ACCENTS[s.accent]
  return (
    <article
      style={{
        position: 'relative',
        borderRadius: 14,
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        boxShadow: active ? `6px 6px 0 0 rgb(${a.rgb})` : '0 0 0 0 transparent',
        opacity: active ? 1 : 0.4,
        transition: 'opacity 400ms ease, box-shadow 300ms ease',
        padding: '34px 36px 32px',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(32px, 3.4vw, 44px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--off-white)',
        }}
      >
        {renderTitleWithAccent(s.title, s.titleAccentWord, a)}
      </h3>
      <p
        style={{
          margin: '18px 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          maxWidth: 540,
        }}
      >
        {s.blurb}
      </p>
      <ul
        style={{
          margin: '24px 0 0',
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {s.bullets.map((b, bi) => (
          <li
            key={bi}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--off-white)',
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: `rgb(${a.light})`,
                flexShrink: 0,
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="/services"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 24,
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          color: `rgb(${a.light})`,
          textDecoration: 'none',
          borderBottom: `1px solid rgba(${a.rgb}, 0.4)`,
          paddingBottom: 3,
        }}
      >
        Learn more <span>→</span>
      </a>
    </article>
  )
}

export default function ServicesOverview() {
  const { active, refs, jump } = useActiveCard(SERVICES.length)
  const activeSvc = SERVICES[active]
  const activeA = ACCENTS[activeSvc.accent]

  const stickyRef = useRef(null)
  const [stickyHalf, setStickyHalf] = useState(0)
  useLayoutEffect(() => {
    const el = stickyRef.current
    if (!el) return
    const measure = () => setStickyHalf(el.offsetHeight / 2)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <SectionShell anchor="services" bg="panel">
      <div
        className="uc-stack-2col"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.95fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <div
          ref={stickyRef}
          className="uc-services-sticky"
          style={{
            position: 'sticky',
            top: stickyHalf ? `calc(50vh - ${stickyHalf}px)` : '50vh',
            alignSelf: 'start',
            paddingRight: 24,
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <SectionEyebrow n="04" label="Our services" />
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 4.6vw, 68px)',
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 520,
            }}
          >
            What we <span className="uc-glow-word uc-glow-word--blue">specialise</span> in.
          </h2>

          <p
            style={{
              margin: '22px 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: 440,
            }}
          >
            Custom automation systems that give you 15+ hours a week back. No off-the-shelf
            shortcuts. No lock-in.
          </p>

          <div style={{ marginTop: 44 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 500,
                color: `rgb(${activeA.light})`,
                letterSpacing: '-0.01em',
                marginBottom: 14,
                transition: 'color 300ms ease',
              }}
            >
              {activeSvc.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {SERVICES.map((s, i) => {
                const a = ACCENTS[s.accent]
                const on = i === active
                return (
                  <button
                    key={s.n}
                    onClick={() => jump(i)}
                    aria-label={`Jump to ${s.title}`}
                    style={{
                      appearance: 'none',
                      border: 'none',
                      padding: 0,
                      width: on ? 40 : 20,
                      height: 3,
                      borderRadius: 2,
                      background: on ? `rgb(${a.light})` : 'rgba(255,255,255,0.16)',
                      transition: 'width 220ms ease, background 220ms ease',
                      cursor: 'pointer',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={s.n} ref={el => (refs.current[i] = el)} data-idx={i}>
              <ServiceCard s={s} active={i === active} />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
