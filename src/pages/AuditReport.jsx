import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { calcPillarMonthly } from '../audit/calculations.js'
import RadarChart from '../audit/RadarChart.jsx'

// ─── Config ───────────────────────────────────────────────────────────────────
const CALENDAR_LINK = 'https://cal.com/luke-marinovic-aqeosc/30min'

const PILLAR_COPY = {
  customer_experience: {
    label: 'Customer Experience',
    headline: "A lead messaged you at 9pm. By morning they'd booked someone else.",
    fix: "We set up an instant-response system that replies, qualifies, and books, while you sleep.",
  },
  sales: {
    label: 'Sales',
    headline: "Your best lead this month replied to your quote. Then went quiet. You followed up two weeks later.",
    fix: "We build a follow-up sequence that stays on them for 30 days without you touching it.",
  },
  content_design: {
    label: 'Content & Design',
    headline: "You know you need to post. You just never have time to sit down and do it.",
    fix: "One piece of content gets turned into a week of posts, captions, and emails, automatically.",
  },
  personal_systems: {
    label: 'Personal Systems',
    headline: "You're running the business and doing the admin of a business. That's two full-time jobs.",
    fix: "We take the second one off your plate, inbox, scheduling, meeting notes, reporting.",
  },
  finance: {
    label: 'Finance',
    headline: "You did the work. Getting paid for it is somehow still your problem.",
    fix: "Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot.",
  },
}

// Hours/week benchmark for businesses using automation
const AUTO_BENCHMARKS = {
  customer_experience: 1.5,
  sales: 2.0,
  content_design: 1.5,
  personal_systems: 2.5,
  finance: 0.5,
}

const STATS = [
  { n: '20 hrs', text: 'average time saved per week by small businesses using strategic automation' },
  { n: '20-30%', text: 'reduction in operational costs reported by businesses automating key workflows' },
  { n: '3-6 mo', text: 'typical time to achieve full ROI on automation investment' },
  { n: '3 to 10x', text: 'average ROI reported for every dollar invested in business automation' },
]

function fmt(n) {
  if (!n || n <= 0) return '$0'
  if (n >= 1000) return '$' + Math.round(n / 1000) + 'k'
  return '$' + Math.round(n)
}

const C = {
  bg: '#0c0c0c',
  surface: 'rgba(255,255,255,0.028)',
  border: 'rgba(255,255,255,0.07)',
  green: '#8FAF9F',
  greenBorder: 'rgba(143,175,159,0.18)',
  greenBg: 'rgba(143,175,159,0.06)',
  text: '#F7F3ED',
  muted: 'rgba(247,243,237,0.55)',
  faint: 'rgba(247,243,237,0.4)',
  red: '#FF6B50',
  redBg: 'rgba(255,80,60,0.06)',
  redBorder: 'rgba(255,80,60,0.18)',
  label: 'rgba(143,175,159,0.65)',
}

function Label({ children, style }) {
  return (
    <p style={{
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.72rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: C.label,
      margin: '0 0 10px',
      ...style,
    }}>
      {children}
    </p>
  )
}

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(143,175,159,0.1)', margin: '52px 0' }} />
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuditReport() {
  const [searchParams] = useSearchParams()

  const data = useMemo(() => {
    try {
      const encoded = searchParams.get('d')
      if (!encoded) return null
      return JSON.parse(atob(decodeURIComponent(encoded)))
    } catch {
      return null
    }
  }, [searchParams])

  const topLeaks = useMemo(() => {
    if (!data?.p) return []
    return Object.entries(data.p)
      .map(([key, pillar]) => ({
        key,
        hours: pillar.hours_per_week || 0,
        monthlyLoss: calcPillarMonthly(pillar.hours_per_week || 0, data.r || 0),
        copy: PILLAR_COPY[key],
      }))
      .filter(p => p.hours > 0 && p.copy)
      .sort((a, b) => b.monthlyLoss - a.monthlyLoss)
      .slice(0, 3)
  }, [data])

  const totalHoursMonthly = useMemo(() => {
    if (!data?.p) return 0
    return Math.round(Object.values(data.p).reduce((s, p) => s + (p.hours_per_week || 0), 0) * 4.33)
  }, [data])

  const totalRecovery = useMemo(() =>
    topLeaks.reduce((s, l) => s + l.monthlyLoss, 0),
    [topLeaks]
  )

  const exactTotal = useMemo(() => {
    if (!data?.p || !data?.r) return 0
    return Math.round(Object.values(data.p).reduce((sum, p) => sum + calcPillarMonthly(p.hours_per_week || 0, data.r), 0))
  }, [data])

  const fmtTotal = '$' + exactTotal.toLocaleString('en-AU')

  const activePillars = useMemo(() =>
    Object.entries(data?.p || {}).filter(([, p]) => (p.hours_per_week || 0) > 0),
    [data]
  )

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: C.muted }}>Report not found.</p>
      </div>
    )
  }

  const firstName = (data.n || '').split(' ')[0]

  return (
    <>
      <PageHead
        title={`${data.b}, Audit Report | Undercurrent`}
        description="Your personalised business automation audit report."
      />

      <style>{`
        * { box-sizing: border-box; }
        body { background: ${C.bg}; margin: 0; }
        .ri { animation: fadeUp 0.55s ease forwards; opacity: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .recovery-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding: 0 20px !important; }
          .header-inner { padding: 16px 20px !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: '80px' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="header-inner" style={{ maxWidth: '840px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/LOGO.png" width="30" height="30" alt="Undercurrent" style={{ borderRadius: '7px', display: 'block' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.label }}>
              Undercurrent Automations
            </span>
            <span style={{ marginLeft: 'auto', fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', color: C.faint }}>
              CONFIDENTIAL
            </span>
          </div>
        </div>

        <div className="page-pad" style={{ maxWidth: '840px', margin: '0 auto', padding: '0 32px' }}>

          {/* ── Hero ───────────────────────────────────────────────────────── */}
          <div className="ri" style={{ padding: '56px 0 48px', animationDelay: '0.05s' }}>
            <Label>Business Health Report, {data.i}</Label>
            <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, color: C.text, margin: '0 0 6px', lineHeight: 1.1 }}>
              {data.b}
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: C.muted, margin: '0 0 40px' }}>
              Prepared for {data.n}
            </p>

            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: '14px', padding: '24px 28px' }}>
                <Label style={{ color: 'rgba(255,107,80,0.7)' }}>Est. monthly loss</Label>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 700, color: C.red, margin: 0, lineHeight: 1 }}>
                  {fmtTotal}
                </p>
              </div>
              <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: '14px', padding: '24px 28px' }}>
                <Label>Hours lost / month</Label>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 700, color: C.green, margin: 0, lineHeight: 1 }}>
                  {totalHoursMonthly}
                  <span style={{ fontSize: '1rem', fontWeight: 400, marginLeft: '5px', opacity: 0.6 }}>hrs</span>
                </p>
              </div>
            </div>

            {/* CTA under hero stats */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <a
                href={CALENDAR_LINK}
                style={{
                  display: 'inline-block',
                  background: C.green,
                  color: '#0c0c0c',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  padding: '15px 36px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                Show me how to stop the bleeding →
              </a>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: C.faint, margin: '10px 0 0' }}>
                Free 30-min strategy call · No pitch deck · No obligation
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '32px 0 0' }}>
            <p style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(143,175,159,0.35)',
              margin: 0,
            }}>
              ↓ SCROLL DOWN FOR MORE
            </p>
          </div>

          <Divider />

          {/* ── Top 3 Leaks ────────────────────────────────────────────────── */}
          <div className="ri" style={{ animationDelay: '0.15s' }}>
            <Label>Revenue leaks, ranked</Label>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: C.text, margin: '0 0 28px' }}>
              Where the money is going
            </h2>

            {topLeaks.map((leak, i) => (
              <div key={leak.key} style={{
                marginBottom: '14px',
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: '14px',
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Watermark rank */}
                <div style={{ position: 'absolute', top: '-14px', right: '24px', fontFamily: 'DM Sans, sans-serif', fontSize: '8rem', fontWeight: 700, color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {i + 1}
                </div>

                {/* Hero row: big number left, label + title right */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '20px' }}>
                  {/* Left — dollar hero */}
                  <div style={{ flexShrink: 0 }}>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 800, color: i === 0 ? C.red : C.text, margin: 0, lineHeight: 1 }}>
                      {fmt(leak.monthlyLoss)}
                    </p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: C.muted, margin: '6px 0 0', letterSpacing: '0.01em' }}>
                      per month &nbsp;·&nbsp; {leak.hours} hrs/wk
                    </p>
                  </div>
                  {/* Right — rank + title */}
                  <div style={{ paddingTop: '6px' }}>
                    <span style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: i === 0 ? C.red : C.label,
                    }}>
                      {i === 0 ? '⬤ Biggest leak' : i === 1 ? '◎ Second leak' : '◌ Third leak'}
                    </span>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: C.text, margin: '6px 0 0' }}>
                      {leak.copy.label}
                    </p>
                  </div>
                </div>

                <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.1rem', fontStyle: 'italic', color: C.muted, lineHeight: 1.65, margin: '0 0 18px' }}>
                  "{leak.copy.headline}"
                </p>

                <div style={{ background: C.greenBg, borderLeft: `2px solid ${C.green}`, borderRadius: '0 8px 8px 0', padding: '14px 18px' }}>
                  <Label style={{ margin: '0 0 5px', fontSize: '0.58rem' }}>The fix</Label>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: C.green, margin: 0, lineHeight: 1.6 }}>
                    {leak.copy.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── What you get back ──────────────────────────────────────────── */}
          <div className="ri" style={{ animationDelay: '0.25s' }}>
            <Label>What you get back</Label>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: C.text, margin: '0 0 28px' }}>
              What would you do with {totalHoursMonthly} extra hours a month?
            </h2>

            <div className="recovery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { stat: fmt(totalRecovery) + '/mo', label: 'Revenue recovered', sub: 'From your top 3 leaks' },
                { stat: totalHoursMonthly + ' hrs', label: 'Freed each month', sub: 'Time to grow, not operate' },
                { stat: '3 to 10x', label: 'Average ROI', sub: 'Per $1 spent on automation' },
              ].map((item, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px' }}>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 700, color: C.green, margin: '0 0 4px', lineHeight: 1 }}>
                    {item.stat}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: C.text, margin: '0 0 4px' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: C.faint, margin: 0 }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 18px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '10px' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: C.green, flexShrink: 0, lineHeight: 1.2 }}>
                    {s.n}
                  </span>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: C.muted, margin: 0, lineHeight: 1.6 }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Industry Benchmark ─────────────────────────────────────────── */}
          <div className="ri" style={{ animationDelay: '0.35s' }}>
            <Label>Industry Benchmark</Label>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: C.text, margin: '0 0 6px' }}>
              How you compare
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: C.muted, margin: '0 0 32px' }}>
              Hours/week spent manually vs. businesses using automation in {data.i}
            </p>

            {activePillars.map(([key, pillar]) => {
              const copy = PILLAR_COPY[key]
              if (!copy) return null
              const yours = pillar.hours_per_week || 0
              const bench = AUTO_BENCHMARKS[key] || 2
              const max = Math.max(yours, bench, 8)
              const overThreshold = yours > bench * 2.5

              return (
                <div key={key} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 500, color: C.text }}>
                      {copy.label}
                    </span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: C.muted }}>
                      {yours} hrs vs {bench} hrs
                    </span>
                  </div>

                  <div style={{ marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '7px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${(yours / max) * 100}%`,
                          background: overThreshold ? C.red : '#e8a05a',
                          borderRadius: '4px',
                          transition: 'width 1s ease',
                        }} />
                      </div>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: C.muted, width: '36px' }}>You</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '7px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(bench / max) * 100}%`, background: C.green, borderRadius: '4px' }} />
                      </div>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'rgba(143,175,159,0.75)', width: '36px' }}>Auto</span>
                    </div>
                  </div>
                </div>
              )
            })}

            <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '14px', height: '4px', borderRadius: '2px', background: '#e8a05a' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: C.muted }}>Your current hours</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '14px', height: '4px', borderRadius: '2px', background: C.green }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'rgba(143,175,159,0.75)' }}>Automated benchmark</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className="ri" style={{ animationDelay: '0.4s' }}>
            <Label>Your Business at a Glance</Label>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: C.text, margin: '0 0 32px' }}>
              Where your time is going
            </h2>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '32px 24px' }}>
              <RadarChart pillars={data.p} size={320} />
            </div>
          </div>

          <Divider />

          {/* ── CTA ────────────────────────────────────────────────────────── */}
          <div className="ri" style={{ animationDelay: '0.45s' }}>
            <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: '18px', padding: '48px 40px', textAlign: 'center' }}>
              <Label style={{ textAlign: 'center', display: 'block' }}>Next step</Label>
              <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.2 }}>
                Let's plug the leaks, {firstName}.
              </h2>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: C.muted, margin: '0 auto 32px', maxWidth: '440px', lineHeight: 1.7 }}>
                Book a free 30-minute strategy call. We'll walk through your top leaks and map out exactly what to automate first, no fluff, no pitch deck.
              </p>
              <a
                href={CALENDAR_LINK}
                style={{
                  display: 'inline-block',
                  background: C.green,
                  color: '#0c0c0c',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  padding: '16px 40px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                Book a Free Strategy Call →
              </a>
            </div>
          </div>

          {/* ── Footer ─────────────────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', padding: '48px 0 0' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(247,243,237,0.18)', letterSpacing: '0.1em', margin: 0 }}>
              UnderCurrent Automations
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
