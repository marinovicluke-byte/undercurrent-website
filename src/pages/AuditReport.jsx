import { useMemo, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { calcPillarMonthly } from '../audit/calculations.js'
import RadarChart from '../audit/RadarChart.jsx'

// ─── Config ───────────────────────────────────────────────────────────────────
const CALENDAR_LINK = 'https://cal.com/luke-marinovic-aqeosc/30min'

const PILLAR_META = {
  customer_experience: {
    label: 'Customer Experience',
    headline: "A lead messaged you at 9pm. By morning they'd booked someone else.",
    fix: "An instant-response system that replies, qualifies, and books, while you sleep.",
    subtaskLabels: {
      responding_to_enquiries: 'Responding to enquiries',
      followup_after_quote: 'Follow-up after quote',
      postwork_followup_review: 'Post-work follow-up & reviews',
      new_client_onboarding: 'New client onboarding',
      complaints_support: 'Complaints & support',
    },
  },
  sales: {
    label: 'Sales',
    headline: "Your best lead replied to your quote. Then went quiet. You followed up two weeks later.",
    fix: "A follow-up sequence that stays on them for 30 days without you touching it.",
    subtaskLabels: {
      speed_to_lead_followup: 'Speed-to-lead follow-up',
      proposal_quote_creation: 'Proposal/quote creation',
      crm_pipeline_updates: 'CRM & pipeline tracking',
      booking_discovery_calls: 'Booking discovery calls',
      reengaging_cold_leads: 'Re-engaging cold leads',
    },
  },
  content_design: {
    label: 'Content & Design',
    headline: "You know you need to post. You just never have time to sit down and do it.",
    fix: "One piece of content turned into a week of posts, captions, and emails, automatically.",
    subtaskLabels: {
      writing_social_captions: 'Social captions & posts',
      creating_graphics: 'Graphics & visuals',
      writing_emails_newsletters: 'Emails & newsletters',
      repurposing_content: 'Repurposing content',
      scheduling_publishing: 'Scheduling & publishing',
    },
  },
  personal_systems: {
    label: 'Personal Systems',
    headline: "You're running the business and doing the admin of a business. That's two full-time jobs.",
    fix: "We take the second one off your plate, inbox, scheduling, meeting notes, reporting.",
    subtaskLabels: {
      email_inbox_management: 'Email inbox management',
      calendar_scheduling: 'Calendar & scheduling',
      meeting_notes_actions: 'Meeting notes & actions',
      admin_document_prep: 'Admin & document prep',
      internal_reporting: 'Internal reporting',
    },
  },
  finance: {
    label: 'Finance',
    headline: "You did the work. Getting paid for it is somehow still your problem.",
    fix: "Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot.",
    subtaskLabels: {
      sending_invoices: 'Sending invoices',
      chasing_overdue_payments: 'Chasing overdue payments',
      bookkeeping_data_entry: 'Bookkeeping data entry',
      expense_tracking: 'Expense tracking',
      financial_reporting: 'Financial reporting',
    },
  },
}

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
  { n: '3-10x', text: 'average ROI reported for every dollar invested in business automation' },
]

function fmt(n) {
  if (!n || n <= 0) return '$0'
  return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const CARD = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '16px',
}

const CARD_ACCENT = {
  background: 'rgba(143,175,159,0.08)',
  border: '1px solid rgba(143,175,159,0.22)',
  borderRadius: '16px',
}

const CARD_RED = {
  background: 'rgba(255,107,80,0.07)',
  border: '1px solid rgba(255,107,80,0.20)',
  borderRadius: '16px',
}

// ─── Report Nav (stripped-back: wave logo + CTA only) ────────────────────────
function ReportWave() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = 52, H = 20
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const currents = [
      { yFrac: 0.30, amp: 3.8, freq: 0.11, speed: 0.126, alpha: 0.90, lw: 1.3 },
      { yFrac: 0.55, amp: 3.0, freq: 0.09, speed: -0.098, alpha: 0.55, lw: 0.9 },
      { yFrac: 0.78, amp: 2.2, freq: 0.13, speed: 0.182, alpha: 0.30, lw: 0.6 },
    ]

    let t = 0
    let lastTs = 0
    const interval = window.innerWidth < 768 ? 50 : 16
    const draw = (ts) => {
      rafRef.current = requestAnimationFrame(draw)
      if (ts - lastTs < interval) return
      lastTs = ts
      ctx.clearRect(0, 0, W, H)
      currents.forEach(c => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(143,175,159,${c.alpha})`
        ctx.lineWidth = c.lw
        for (let x = 0; x <= W; x += 2) {
          const y = c.yFrac * H + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ width: '52px', height: '20px', display: 'block', flexShrink: 0 }} />
}

function ReportNav() {
  return (
    <nav style={{
      position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)', maxWidth: '520px', zIndex: 200,
    }}>
      <div style={{
        borderRadius: '9999px', padding: '10px 10px 10px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'rgba(28,28,26,0.55)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border: '1px solid rgba(143,175,159,0.35)',
        boxShadow: '0 2px 24px rgba(0,0,0,0.35)',
      }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.7rem', fontWeight: 600, letterSpacing: '-0.02em',
            color: '#F7F3ED', lineHeight: 1,
          }}>
            UnderCurrent
          </span>
          <span className="report-nav-wave"><ReportWave /></span>
        </a>
        <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#8FAF9F', color: '#1C1C1A',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 700,
          padding: '12px 36px', borderRadius: '9999px', textDecoration: 'none', fontSize: '0.9rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(143,175,159,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          Book a Call
        </a>
      </div>
    </nav>
  )
}

// ─── Contextual SVG Graphs for Stat Cards ────────────────────────────────────

// 20 hrs saved → before/after comparison bars
function TimeSavedGraph() {
  return (
    <svg width="120" height="56" viewBox="0 0 120 56" style={{ display: 'block' }}>
      {/* "Before" bar — full width, warm/red tone */}
      <text x="0" y="10" fill="rgba(247,243,237,0.3)" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.08em">BEFORE</text>
      <rect x="0" y="14" width="0" height="10" rx="5" fill="rgba(255,107,80,0.5)">
        <animate attributeName="width" from="0" to="110" dur="1.2s" fill="freeze" begin="0.3s" />
      </rect>
      {/* "After" bar — short, green */}
      <text x="0" y="40" fill="rgba(247,243,237,0.3)" fontSize="7" fontFamily="'DM Mono', monospace" letterSpacing="0.08em">AFTER</text>
      <rect x="0" y="44" width="0" height="10" rx="5" fill="#8FAF9F">
        <animate attributeName="width" from="0" to="38" dur="1s" fill="freeze" begin="0.6s" />
      </rect>
    </svg>
  )
}

// 20-30% cost reduction → donut ring
function CostReductionGraph() {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const filled = circumference * 0.25 // 25% filled
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" style={{ display: 'block' }}>
      {/* Background ring */}
      <circle cx="30" cy="30" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      {/* Filled arc */}
      <circle cx="30" cy="30" r={radius} fill="none" stroke="#8FAF9F" strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        strokeDashoffset={circumference * 0.25}
        transform="rotate(-90 30 30)"
        style={{ opacity: 0 }}
      >
        <animate attributeName="stroke-dasharray" from={`0 ${circumference}`} to={`${filled} ${circumference}`} dur="1.4s" fill="freeze" begin="0.4s" />
        <animate attributeName="opacity" from="0" to="1" dur="0.01s" fill="freeze" begin="0.4s" />
      </circle>
      {/* Center percentage */}
      <text x="30" y="33" textAnchor="middle" fill="rgba(247,243,237,0.35)" fontSize="9" fontFamily="'DM Mono', monospace" fontWeight="500">25%</text>
    </svg>
  )
}

// 3-6 mo ROI timeline → milestone dots with connecting line
function ROITimelineGraph() {
  return (
    <svg width="120" height="44" viewBox="0 0 120 44" style={{ display: 'block' }}>
      {/* Track line */}
      <line x1="8" y1="22" x2="112" y2="22" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      {/* Animated progress line */}
      <line x1="8" y1="22" x2="8" y2="22" stroke="#8FAF9F" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="x2" from="8" to="82" dur="1.6s" fill="freeze" begin="0.3s" />
      </line>
      {/* Milestone: Invest */}
      <circle cx="8" cy="22" r="4" fill="rgba(255,107,80,0.6)" stroke="rgba(255,107,80,0.3)" strokeWidth="1.5">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.3s" />
      </circle>
      <text x="8" y="38" textAnchor="middle" fill="rgba(247,243,237,0.25)" fontSize="6" fontFamily="'DM Mono', monospace">START</text>
      {/* Milestone: Breakeven */}
      <circle cx="45" cy="22" r="4" fill="rgba(212,201,176,0.6)" stroke="rgba(212,201,176,0.3)" strokeWidth="1.5">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="0.8s" />
      </circle>
      <text x="45" y="38" textAnchor="middle" fill="rgba(247,243,237,0.25)" fontSize="6" fontFamily="'DM Mono', monospace">EVEN</text>
      {/* Milestone: ROI */}
      <circle cx="82" cy="22" r="5" fill="#8FAF9F" stroke="rgba(143,175,159,0.4)" strokeWidth="2">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="1.3s" />
      </circle>
      <text x="82" y="38" textAnchor="middle" fill="rgba(143,175,159,0.5)" fontSize="6" fontFamily="'DM Mono', monospace" fontWeight="600">ROI</text>
      {/* Profit zone arrow */}
      <line x1="95" y1="22" x2="112" y2="22" stroke="rgba(143,175,159,0.25)" strokeWidth="1.5" strokeDasharray="3 3">
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin="1.6s" />
      </line>
    </svg>
  )
}

// 3-10x ROI → ascending stepped blocks
function ROIMultiplierGraph() {
  const steps = [
    { x: 4, h: 10, label: '1x', color: 'rgba(255,255,255,0.1)' },
    { x: 28, h: 20, label: '3x', color: 'rgba(143,175,159,0.25)' },
    { x: 52, h: 32, label: '5x', color: 'rgba(143,175,159,0.4)' },
    { x: 76, h: 44, label: '7x', color: 'rgba(143,175,159,0.55)' },
    { x: 100, h: 54, label: '10x', color: '#8FAF9F' },
  ]
  return (
    <svg width="120" height="64" viewBox="0 0 120 64" style={{ display: 'block' }}>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={60 - s.h} width="16" rx="3" height="0" fill={s.color}>
            <animate attributeName="height" from="0" to={s.h} dur={`${0.6 + i * 0.15}s`} fill="freeze" begin="0.2s" />
            <animate attributeName="y" from="60" to={60 - s.h} dur={`${0.6 + i * 0.15}s`} fill="freeze" begin="0.2s" />
          </rect>
          <text x={s.x + 8} y={60 - s.h - 4} textAnchor="middle" fill="rgba(247,243,237,0.3)" fontSize="6.5" fontFamily="'DM Mono', monospace" fontWeight="500" opacity="0">
            {s.label}
            <animate attributeName="opacity" from="0" to="1" dur="0.3s" fill="freeze" begin={`${0.6 + i * 0.15 + 0.2}s`} />
          </text>
        </g>
      ))}
    </svg>
  )
}

const STAT_GRAPHS = [TimeSavedGraph, CostReductionGraph, ROITimelineGraph, ROIMultiplierGraph]

// ─── Scroll-triggered visibility ──────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function FadeSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const visible = useInView(ref)
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.68rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'rgba(143,175,159,0.55)',
      margin: '0 0 14px',
      fontWeight: 500,
    }}>
      {children}
    </p>
  )
}

function ScrollPrompt({ text = 'Scroll to continue' }) {
  return (
    <div className="mobile-hide-scroll-prompt" style={{
      position: 'absolute',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      animation: 'gentle-bob 2.5s ease-in-out infinite',
    }}>
      <p style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(143,175,159,0.5)',
        margin: '0 0 6px',
        fontWeight: 500,
      }}>
        {text}
      </p>
      <span style={{ color: 'rgba(143,175,159,0.4)', fontSize: '1.2rem' }}>&#8595;</span>
    </div>
  )
}

function SectionDivider() {
  return <div className="section-divider" />
}

function PageNumber({ current, total }) {
  return (
    <div style={{
      position: 'absolute',
      top: '72px',
      right: '32px',
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.6rem',
      letterSpacing: '0.1em',
      color: 'rgba(247,243,237,0.18)',
    }}>
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
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

  const pillars = useMemo(() => {
    if (!data?.p) return []
    return Object.entries(data.p)
      .map(([key, pillar]) => ({
        key,
        hours: pillar.hours_per_week || 0,
        monthlyLoss: calcPillarMonthly(pillar.hours_per_week || 0, data.r || 0),
        meta: PILLAR_META[key],
        benchmark: AUTO_BENCHMARKS[key] || 2,
        subtasks: pillar.subtasks || {},
      }))
      .filter(p => p.hours > 0 && p.meta)
      .sort((a, b) => b.monthlyLoss - a.monthlyLoss)
  }, [data])

  const totalMonthly = useMemo(() => pillars.reduce((s, p) => s + p.monthlyLoss, 0), [pillars])
  const totalYearly = totalMonthly * 12
  const totalHoursWeekly = useMemo(() => pillars.reduce((s, p) => s + p.hours, 0), [pillars])
  const totalHoursMonthly = Math.round(totalHoursWeekly * 4.33)

  const TOTAL_PAGES = 5

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: '#1C1C1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(247,243,237,0.5)' }}>Report not found.</p>
      </div>
    )
  }

  const firstName = (data.n || '').split(' ')[0]

  return (
    <>
      <PageHead
        title={`${data.b} — Audit Report | Undercurrent`}
        description="Your personalised business automation audit report."
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #1C1C1A; margin: 0; overflow-x: hidden; }

        .report-scroll-container {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          height: 100vh;
        }
        .report-page {
          min-height: 100vh;
          scroll-snap-align: start;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 90px 32px 60px;
          overflow: hidden;
          background: #1C1C1A;
        }
        .section-divider {
          display: none;
        }
        .report-inner {
          max-width: 820px;
          margin: 0 auto;
          width: 100%;
        }
        @keyframes gentle-bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .benchmark-bar { transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .leak-card { display: grid; grid-template-columns: 2fr 3fr; gap: 0; }
        .stat-cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

        .stat-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px 28px;
        }

        @media (max-width: 640px) {
          .report-scroll-container {
            scroll-snap-type: none !important;
            height: auto !important;
          }
          .report-page {
            min-height: auto !important;
            scroll-snap-align: none !important;
            padding: 40px 16px 40px !important;
          }
          .report-page:first-of-type {
            padding-top: 130px !important;
          }
          .section-divider {
            display: block !important;
            height: 2px;
            margin: 0 24px;
            border-radius: 1px;
            background: rgba(143,175,159,0.25);
            box-shadow: 0 0 12px rgba(143,175,159,0.15), 0 0 4px rgba(143,175,159,0.1);
          }
          .hero-stats-grid { grid-template-columns: 1fr !important; }
          .hero-stat-box { padding: 24px 20px !important; }
          .hero-stat-box p.hero-stat-number { font-size: clamp(2rem, 5vw, 2.8rem) !important; }
          .mobile-hide-cta { display: none !important; }
          .mobile-hide-scroll-prompt { display: none !important; }
          .leak-card { grid-template-columns: 1fr !important; }
          .leak-card-divider { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .stats-row { grid-template-columns: 1fr !important; }
          .recovery-grid { grid-template-columns: 1fr !important; }
          .stat-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .report-inner { max-width: 100% !important; }
          .report-nav-wave { display: none; }
        }
      `}</style>

      {/* Nav — logo + CTA only */}
      <ReportNav />

      <div className="report-scroll-container">

        {/* ══════════════ PAGE 1 — COVER ══════════════ */}
        <section className="report-page">
          <PageNumber current={1} total={TOTAL_PAGES} />
          <div className="report-inner">
            <FadeSection delay={0.1}>
              <SectionLabel>Business Health Report &middot; {data.i}</SectionLabel>
              <h1 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(36px, 7vw, 60px)',
                fontWeight: 800,
                color: '#F7F3ED',
                margin: '0 0 8px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {data.b}
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(247,243,237,0.38)', margin: '0 0 44px' }}>
                Prepared for {data.n}
              </p>
            </FadeSection>

            <FadeSection delay={0.3}>
              <div className="hero-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                <div className="hero-stat-box" style={{ ...CARD_RED, padding: '36px 32px' }}>
                  <SectionLabel>Est. monthly loss</SectionLabel>
                  <p className="hero-stat-number" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(2.6rem, 6vw, 3.8rem)', fontWeight: 800, color: '#FF6B50', margin: 0, lineHeight: 1 }}>
                    {fmt(totalMonthly)}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(247,243,237,0.32)', margin: '10px 0 0' }}>
                    in unbilled time, missed leads & manual work
                  </p>
                </div>
                <div className="hero-stat-box" style={{ ...CARD_RED, padding: '36px 32px', background: 'rgba(255,107,80,0.10)', border: '1px solid rgba(255,107,80,0.25)' }}>
                  <SectionLabel>That's per year</SectionLabel>
                  <p className="hero-stat-number" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(3rem, 7vw, 4.4rem)', fontWeight: 800, color: '#FF6B50', margin: 0, lineHeight: 1 }}>
                    {fmt(totalYearly)}
                  </p>
                </div>
              </div>

              {/* Pillar pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {pillars.map((p) => (
                  <div key={p.key} style={{ ...CARD, padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: 'rgba(247,243,237,0.5)' }}>{p.meta.label}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: '#FF6B50', fontWeight: 500 }}>{p.hours} hrs/wk</span>
                  </div>
                ))}
              </div>
            </FadeSection>

            {/* CTA — below pills, above scroll prompt */}
            <FadeSection delay={0.45}>
              <div className="mobile-hide-cta" style={{ textAlign: 'center', marginTop: '32px' }}>
                <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block', background: '#8FAF9F', color: '#1C1C1A',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 700,
                  padding: '16px 60px', borderRadius: '9999px', textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(143,175,159,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Show me how to stop the bleeding &rarr;
                </a>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: 'rgba(247,243,237,0.3)', margin: '10px 0 0' }}>
                  Free 30-min strategy call, no pitch deck, no obligation
                </p>
              </div>
            </FadeSection>
          </div>
          <ScrollPrompt text="Scroll to see your biggest leaks" />
        </section>
        <SectionDivider />

        {/* ══════════════ PAGE 2 — TIME WASTERS ══════════════ */}
        <section className="report-page" style={{ justifyContent: 'flex-start', paddingTop: '100px' }}>
          <PageNumber current={2} total={TOTAL_PAGES} />
          <div className="report-inner">
            <FadeSection delay={0.1}>
              <SectionLabel>Where your time is going</SectionLabel>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#F7F3ED', margin: '0 0 40px', lineHeight: 1.15 }}>
                Your biggest time wasters
              </h2>
            </FadeSection>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pillars.map((leak, i) => (
                <FadeSection key={leak.key} delay={0.15 + i * 0.08}>
                  <div className="leak-card" style={{ ...(i === 0 ? CARD_RED : CARD), overflow: 'hidden' }}>
                    <div className="leak-card-divider" style={{
                      padding: '28px 24px',
                      borderRight: `1px solid ${i === 0 ? 'rgba(255,107,80,0.14)' : 'rgba(255,255,255,0.08)'}`,
                      display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    }}>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: i === 0 ? 'rgba(255,107,80,0.7)' : 'rgba(143,175,159,0.5)', margin: '0 0 8px', fontWeight: 500 }}>
                        {i === 0 ? '● Biggest leak' : `#${i + 1} Leak`}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#F7F3ED', margin: '0 0 14px' }}>
                        {leak.meta.label}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 800, color: i === 0 ? '#FF6B50' : '#F7F3ED', margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {fmt(leak.monthlyLoss)}
                      </p>
                      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: 'rgba(247,243,237,0.4)' }}>
                        per month &middot; {leak.hours} hrs/wk
                      </p>
                    </div>
                    <div style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', fontWeight: 500, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 22px' }}>
                        &ldquo;{leak.meta.headline}&rdquo;
                      </p>
                      <div style={{ background: 'rgba(143,175,159,0.06)', borderLeft: '3px solid rgba(143,175,159,0.5)', borderRadius: '0 10px 10px 0', padding: '16px 20px' }}>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(143,175,159,0.5)', margin: '0 0 8px', fontWeight: 500 }}>
                          The automation
                        </p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: '#8FAF9F', margin: 0, lineHeight: 1.65 }}>
                          {leak.meta.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
          <ScrollPrompt text="Scroll to see how you compare" />
        </section>
        <SectionDivider />

        {/* ══════════════ PAGE 3 — BENCHMARKS ══════════════ */}
        <section className="report-page" style={{ justifyContent: 'flex-start', paddingTop: '100px' }}>
          <PageNumber current={3} total={TOTAL_PAGES} />
          <div className="report-inner">
            <FadeSection delay={0.1}>
              <SectionLabel>Industry benchmark</SectionLabel>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#F7F3ED', margin: '0 0 6px', lineHeight: 1.15 }}>
                How you compare
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(247,243,237,0.38)', margin: '0 0 36px' }}>
                Your manual hours vs. businesses using automation in {data.i}
              </p>
            </FadeSection>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {pillars.map((p, i) => {
                const max = Math.max(p.hours, p.benchmark, 10)
                const over = p.hours > p.benchmark * 2.5
                const subs = Object.entries(p.subtasks || {}).filter(([, v]) => v && v > 0)
                const labels = p.meta.subtaskLabels || {}
                return (
                  <FadeSection key={p.key} delay={0.12 + i * 0.06}>
                    <div style={{ ...CARD, padding: '22px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', fontWeight: 600, color: '#F7F3ED' }}>{p.meta.label}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: over ? '#FF6B50' : 'rgba(247,243,237,0.4)' }}>{p.hours} hrs vs {p.benchmark} hrs</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' }}>
                          <div className="benchmark-bar" style={{ height: '100%', width: `${(p.hours / max) * 100}%`, background: over ? '#FF6B50' : '#e8a05a', borderRadius: '5px' }} />
                        </div>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(247,243,237,0.4)', width: '30px' }}>You</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(p.benchmark / max) * 100}%`, background: '#8FAF9F', borderRadius: '5px' }} />
                        </div>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(143,175,159,0.55)', width: '30px' }}>Auto</span>
                      </div>
                      {subs.length > 0 && (
                        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {subs.map(([k, v]) => (
                              <span key={k} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(247,243,237,0.35)', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                {labels[k] || k}: {v} hrs
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FadeSection>
                )
              })}
            </div>
            <FadeSection delay={0.5}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '18px', height: '6px', borderRadius: '3px', background: '#e8a05a' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(247,243,237,0.35)' }}>Your current hours</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '18px', height: '6px', borderRadius: '3px', background: '#8FAF9F' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'rgba(143,175,159,0.5)' }}>Automated benchmark</span>
                </div>
              </div>
            </FadeSection>
          </div>
          <ScrollPrompt text="Scroll to see the big picture" />
        </section>
        <SectionDivider />

        {/* ══════════════ PAGE 4 — STATS + RADAR ══════════════ */}
        <section className="report-page" style={{ justifyContent: 'flex-start', paddingTop: '100px' }}>
          <PageNumber current={4} total={TOTAL_PAGES} />
          <div className="report-inner">
            <FadeSection delay={0.1}>
              <SectionLabel>The bigger picture</SectionLabel>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#F7F3ED', margin: '0 0 12px', lineHeight: 1.15 }}>
                What businesses like yours are seeing with automation
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: 'rgba(247,243,237,0.38)', margin: '0 0 36px' }}>
                Industry data from businesses that have automated their operations.
              </p>
            </FadeSection>

            {/* 4 stat cards with contextual graphs */}
            <FadeSection delay={0.2}>
              <div className="stat-cards-grid" style={{ marginBottom: '40px' }}>
                {STATS.map((card, i) => {
                  const GraphComponent = STAT_GRAPHS[i]
                  return (
                    <div key={i} style={{
                      ...CARD,
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease, background 0.3s ease',
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(143,175,159,0.35)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }}
                    >
                      <div className="stat-card-inner">
                        <div style={{ marginBottom: '20px', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <GraphComponent />
                        </div>
                        <p style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 'clamp(2rem, 5vw, 2.6rem)',
                          fontWeight: 800,
                          color: '#8FAF9F',
                          margin: '0 0 10px',
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                        }}>
                          {card.n}
                        </p>
                        <div style={{ width: '32px', height: '2px', background: 'rgba(143,175,159,0.25)', borderRadius: '1px', margin: '0 0 14px' }} />
                        <p style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.82rem',
                          color: 'rgba(247,243,237,0.42)',
                          margin: 0,
                          lineHeight: 1.6,
                        }}>
                          {card.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </FadeSection>

            {/* Radar chart */}
            <FadeSection delay={0.4}>
              <SectionLabel>Your business at a glance</SectionLabel>
              <div style={{ ...CARD, padding: '36px 28px', textAlign: 'center' }}>
                <RadarChart pillars={data.p} size={300} />
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(247,243,237,0.22)', margin: '18px 0 0', letterSpacing: '0.08em' }}>
                  Larger area = more manual hours = more opportunity to automate
                </p>
              </div>
            </FadeSection>
          </div>
          <ScrollPrompt text="Scroll for your next steps" />
        </section>
        <SectionDivider />

        {/* ══════════════ PAGE 5 — SUMMARY + CTA ══════════════ */}
        <section className="report-page">
          <PageNumber current={5} total={TOTAL_PAGES} />
          <div className="report-inner" style={{ textAlign: 'center' }}>
            <FadeSection delay={0.1}>
              <SectionLabel>What you get back</SectionLabel>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(30px, 6vw, 48px)', fontWeight: 800, color: '#F7F3ED', margin: '0 0 12px', lineHeight: 1.15 }}>
                What would you do with {totalHoursMonthly} extra hours a month?
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'rgba(247,243,237,0.38)', margin: '0 auto 52px', maxWidth: '500px', lineHeight: 1.7 }}>
                That's {totalHoursWeekly} hours every week you're spending on tasks that could run themselves.
              </p>
            </FadeSection>

            <FadeSection delay={0.25}>
              <div className="recovery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '52px' }}>
                {[
                  { stat: fmt(totalMonthly), sub: '/mo', label: 'Revenue recovered' },
                  { stat: String(totalHoursMonthly), sub: ' hrs', label: 'Freed each month' },
                  { stat: '3-10x', sub: '', label: 'Average ROI' },
                ].map((item, i) => (
                  <div key={i} style={{ ...CARD_ACCENT, padding: '36px 24px' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 800, color: '#8FAF9F', margin: 0, lineHeight: 1 }}>
                      {item.stat}<span style={{ fontSize: '0.45em', fontWeight: 400, opacity: 0.55 }}>{item.sub}</span>
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'rgba(247,243,237,0.45)', margin: '10px 0 0' }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeSection>

            <FadeSection delay={0.4}>
              <div style={{ ...CARD_ACCENT, padding: '52px 44px', background: 'rgba(143,175,159,0.09)', border: '1px solid rgba(143,175,159,0.25)', borderRadius: '20px' }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: '#F7F3ED', margin: '0 0 14px', lineHeight: 1.2 }}>
                  Let's plug the leaks, {firstName}.
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: 'rgba(247,243,237,0.42)', margin: '0 auto 36px', maxWidth: '440px', lineHeight: 1.7 }}>
                  Book a free 30-minute strategy call. We'll walk through your top leaks and map out exactly what to automate first, no fluff, no pitch deck.
                </p>
                <a href={CALENDAR_LINK} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block', background: '#8FAF9F', color: '#1C1C1A',
                  fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700,
                  padding: '18px 48px', borderRadius: '9999px', textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(143,175,159,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Book a Free Strategy Call &rarr;
                </a>
              </div>
            </FadeSection>

            <FadeSection delay={0.55}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.12)', margin: '48px 0 0' }}>
                &copy; 2026 Undercurrent Automations &middot; Australia
              </p>
            </FadeSection>
          </div>
        </section>

      </div>
    </>
  )
}
