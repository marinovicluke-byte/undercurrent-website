import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'

gsap.registerPlugin(ScrollTrigger)

// Reveal wrapper
function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay }
        )
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

// Typewriter terminal — used in multiple service visualisations
function Terminal({ lines, typingSpeed = 38 }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    if (lineIdx >= lines.length) {
      const reset = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine('')
        setLineIdx(0)
        setCharIdx(0)
      }, 3000)
      return () => clearTimeout(reset)
    }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => {
        setCurrentLine(prev => prev + lines[lineIdx][charIdx])
        setCharIdx(c => c + 1)
      }, typingSpeed)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, lines[lineIdx]])
        setCurrentLine('')
        setCharIdx(0)
        setLineIdx(l => l + 1)
      }, 480)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx, lines, typingSpeed])

  return (
    <div className="rounded-2xl p-5 font-mono overflow-hidden" style={{ backgroundColor: '#1C1C1A', height: '240px', display: 'flex', flexDirection: 'column' }}>
      <div className="flex gap-1.5 mb-4">
        {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.85, opacity: i < displayedLines.length - 1 ? 0.45 : 0.75 }}>
            {line}
          </div>
        ))}
        {lineIdx < lines.length && (
          <div style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.85 }}>
            {currentLine}
            <span style={{ color: '#6B7C4A', animation: 'blink 1s step-end infinite' }}>█</span>
          </div>
        )}
        {lineIdx >= lines.length && (
          <div className="flex items-center gap-2 mt-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#6B7C4A', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.75rem', color: '#6B7C4A', letterSpacing: '0.1em' }}>COMPLETE</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Flowing pipeline visualiser
function Pipeline({ steps, accentColor = '#8FAF9F' }) {
  const [active, setActive] = useState(0)
  const [done, setDone] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % (steps.length + 1)
        if (next < steps.length) setDone(d => [...d.slice(-(steps.length)), prev])
        if (next === 0) setDone([])
        return next
      })
    }, 950)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="space-y-2">
      {steps.map((s, i) => {
        const isActive = i === active
        const isDone = done.includes(i) || active >= steps.length
        return (
          <div
            key={s}
            className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-500"
            style={{
              backgroundColor: isDone || isActive ? `${accentColor}18` : 'transparent',
              border: `1px solid ${isDone || isActive ? accentColor + '30' : 'transparent'}`,
              opacity: isDone || isActive ? 1 : 0.3,
              transform: isActive ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            <span className="font-mono transition-all duration-300" style={{ fontSize: '0.75rem', color: isDone || isActive ? accentColor : '#1C1C1A30', width: '1rem', textAlign: 'center' }}>
              {isDone ? '✓' : isActive ? '◎' : '○'}
            </span>
            <span className="font-dm" style={{ fontSize: '0.82rem', fontWeight: isDone ? 400 : isActive ? 500 : 300, color: 'rgba(28,28,26,0.7)' }}>
              {s}
            </span>
            {isActive && (
              <span className="ml-auto font-mono" style={{ fontSize: '0.75rem', color: 'rgba(28,28,26,0.3)' }}>
                running<span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Metric badge
function MetricBadge({ value, label, color = '#6B7C4A' }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-cormorant" style={{ fontSize: '2.2rem', fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
      <span className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(28,28,26,0.5)' }}>{label}</span>
    </div>
  )
}

// Expandable FAQ within service
function ServiceFAQ({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="space-y-2 mt-8">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(212,201,176,0.5)', backgroundColor: 'rgba(247,243,237,0.5)' }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 400, color: '#1C1C1A' }}>{item.q}</span>
            <ChevronDown
              size={16}
              style={{
                color: '#8FAF9F', flexShrink: 0, marginLeft: '1rem',
                transform: open === i ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s ease',
              }}
            />
          </button>
          <div
            style={{
              maxHeight: open === i ? '300px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            <p className="font-dm px-5 pb-4" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.7, color: 'rgba(28,28,26,0.6)' }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ───────────────────────────────────────────────
// SERVICE SECTIONS DATA
// ───────────────────────────────────────────────

const services = [
  {
    id: 'customer-experience',
    index: '01',
    label: 'CUSTOMER EXPERIENCE',
    headline: 'Every customer feels like your only one.',
    subhead: 'From the moment they sign to the day they refer their friends — the full journey, automated.',
    description: `Customer experience is the entire arc of a client relationship — and it starts the second they say yes. Onboarding sets the tone. Consistent follow-up builds trust. Timely check-ins prevent churn. Reviews and referrals come naturally when the journey feels effortless.

    We build automated systems that handle the full lifecycle: welcome sequences, setup checklists, intake forms, milestone celebrations, satisfaction surveys, review requests, and referral programs. Every touchpoint lands at the right time, on the right channel — without your team manually firing each one.`,
    accentColor: '#8FAF9F',
    bgDark: 'rgba(143,175,159,0.06)',
    metric: { value: '68%', label: 'reduction in early churn' },
    whatWeDeliver: [
      'Welcome email sequences with conditional branching',
      'Automated intake form + CRM data capture',
      'Portal access + resource delivery workflows',
      'Milestone-based check-in triggers',
      'Satisfaction pulse surveys at key moments',
      'Automated review request sequences',
      'Referral program trigger + tracking',
      'Re-engagement flows for inactive clients',
    ],
    pipeline: [
      'Contract signed → trigger fires',
      'Welcome email sequence begins',
      'Intake form delivered & captured',
      'CRM record populated automatically',
      'Week 1 check-in message sent',
      'Month 2: satisfaction survey sent',
      'Positive response → review request',
      'Review received → referral offer sent',
    ],
    faqs: [
      { q: 'What tools do you build this on?', a: 'We work tool-agnostic — Zapier, Make (Integromat), n8n, or native API integrations depending on what\'s already in your stack. We don\'t impose a platform.' },
      { q: 'How do you personalise at scale?', a: 'We use data already in your CRM — service type, purchase date, usage patterns, location — to branch automation flows so each client gets a message relevant to their situation.' },
      { q: 'What if a client gives negative feedback?', a: 'We build conditional branches for negative sentiment — routing them to a human escalation flow rather than the review request sequence. These clients get personal outreach instead.' },
    ],
  },
  {
    id: 'sales',
    index: '02',
    label: 'SALES',
    headline: 'More pipeline. Same headcount.',
    subhead: 'Outreach, qualification, follow-up, nurture. The entire sales process is automatable — most businesses just haven\'t done it yet.',
    description: `Sales is where most automation has the clearest ROI. Every hour your team spends manually researching prospects, writing first-contact emails, or chasing non-replies is an hour not spent closing.

    We build end-to-end sales automation: lead sourcing, enrichment, personalised outreach, follow-up sequences, qualification workflows, and pipeline management. All of it running in the background — so when a prospect replies, they're already warmed up and your team just has to close.`,
    accentColor: '#6B7C4A',
    bgDark: 'rgba(107,124,74,0.06)',
    metric: { value: '3×', label: 'more pipeline, same team' },
    whatWeDeliver: [
      'Lead sourcing and enrichment automation',
      'Personalised outreach at scale (email + LinkedIn)',
      'Multi-step follow-up sequences with conditional logic',
      'Lead scoring and qualification routing',
      'CRM pipeline automation + stage progression',
      'Meeting booking + pre-meeting research briefs',
    ],
    terminalLines: [
      '> Sourcing leads from LinkedIn Sales Nav...',
      '> 47 prospects matched ICP criteria.',
      '> Enriching contact data via Apollo...',
      '> Drafting personalised email for: James K.',
      '> Subject line variant A/B split applied.',
      '> Sequence queued. Day 1 sends: 47.',
      '> Day 3 follow-up scheduled.',
      '> Meeting booked: Sarah M. — Thursday 2pm.',
    ],
    faqs: [
      { q: 'Is this just mass cold email?', a: 'No. Mass, non-personalised outreach is spam and damages your domain. We build personalised sequences that use real data points about each prospect — their company, role, recent activity — to make every message feel individually written.' },
      { q: 'How do you avoid landing in spam?', a: 'We configure proper email infrastructure: SPF, DKIM, DMARC, mailbox warm-up, send volume management, and domain health monitoring. This is foundational to everything we build.' },
      { q: 'Do you write the copy?', a: 'Yes. Copywriting for outreach sequences is included. We work with you to nail your ICP, value proposition, and tone — then build sequences that sound like you, not a robot.' },
    ],
  },
  {
    id: 'content-design',
    index: '03',
    label: 'CONTENT DESIGN',
    headline: 'Publish more. Write less.',
    subhead: 'Content is your compounding asset — but only if you actually publish consistently. We make that the easy part.',
    description: `Most businesses know they should be publishing content. Most businesses don't, because the process of creating, formatting, reviewing, and distributing is too slow and too manual to sustain.

    We build content automation pipelines that take you from brief (or no brief) to published — across every channel you use. Blog posts drafted from transcripts. Social content repurposed from long-form. Newsletters assembled from existing content. All reviewed, all formatted, all distributed. You show up to give feedback. The system handles everything else.`,
    accentColor: '#8FAF9F',
    bgDark: 'rgba(143,175,159,0.06)',
    metric: { value: '10×', label: 'output, same creative effort' },
    whatWeDeliver: [
      'Blog and long-form content from recordings or briefs',
      'Social content repurposing (LinkedIn, Instagram, X)',
      'Email newsletter automation + scheduling',
      'Content calendar management and auto-scheduling',
      'SEO brief generation from keyword research',
      'Distribution across all platforms from one source',
    ],
    contentRotator: [
      { label: 'LinkedIn Post', preview: 'Why most agencies fail at AI: a thread on what we actually build for clients and what the data shows...', tag: 'Social', color: '#8FAF9F' },
      { label: 'Case Study', preview: 'How a 3-person firm replaced 20 hrs/wk of admin with a single automation stack — and doubled revenue...', tag: 'Long-form', color: '#6B7C4A' },
      { label: 'Newsletter', preview: 'This week: 3 workflows we deployed, 1 client result, and a tool you should know about...', tag: 'Email', color: '#A89F7A' },
      { label: 'Blog Article', preview: 'The four areas where small business automation has the clearest ROI — and how to sequence them...', tag: 'SEO', color: '#D4C9B0' },
    ],
    faqs: [
      { q: 'Does this replace a content writer?', a: 'It replaces the production work — drafting, formatting, scheduling, distributing. Strategy, voice, and final approval stay with you or your team. We\'re the production engine, not the creative director.' },
      { q: 'How do you maintain brand voice at scale?', a: 'We document your brand voice in detail at the start of the engagement: tone, vocabulary, things to avoid, example posts you love. This becomes the system prompt layer that governs every output.' },
      { q: 'Which platforms can you publish to?', a: 'LinkedIn, Instagram, Facebook, X, TikTok (caption + brief), your WordPress or Webflow blog, your email platform (Mailchimp, ConvertKit, ActiveCampaign, etc.), and more.' },
    ],
  },
  {
    id: 'personal-system',
    index: '04',
    label: 'PERSONAL SYSTEM',
    headline: 'Your inbox, handled. Your calendar, owned.',
    subhead: 'You didn\'t start a business to spend your days in email. We give you your time back.',
    description: `The average business owner loses 3–4 hours a day to email, scheduling, and admin. That's 800+ hours a year not building, not selling, not thinking. AI-powered personal assistance changes that — not by giving you another tool to manage, but by handling the management for you.

    We build custom AI assistant workflows that draft replies, summarise threads, book meetings, manage follow-ups, brief you before calls, and keep your calendar clean. Connected to your actual inbox, your actual calendar, your actual tools.`,
    accentColor: '#8FAF9F',
    bgDark: 'rgba(143,175,159,0.06)',
    metric: { value: '8 hrs', label: 'saved per week, per person' },
    whatWeDeliver: [
      'Inbox triage + draft reply generation',
      'Meeting scheduling and calendar management',
      'Thread summarisation for inbox zero',
      'Pre-meeting research briefs',
      'Task extraction from email to project management tool',
      'Follow-up reminders and flagging system',
    ],
    terminalLines: [
      '> Processing inbox: 24 unread messages.',
      '> Urgent flagged: contract renewal (3 days).',
      '> Drafting reply to: sarah@clientco.com...',
      '> Summarising 5-thread project discussion...',
      '> Booking: discovery call — Wed 10am confirmed.',
      '> Pre-meeting brief generated for Thursday.',
      '> No-meeting block applied: Friday afternoon.',
      '> Inbox: 0 items requiring action.',
    ],
    faqs: [
      { q: 'Is this an AI agent with access to my inbox?', a: 'Yes. We set up a secure OAuth connection to your Gmail or Outlook. The AI reads, drafts, and flags — but never sends without your review (unless you explicitly configure it to). Full audit trail maintained.' },
      { q: 'What if the AI gets something wrong?', a: 'All drafts go to a review queue first. Over time, as you approve and edit, the system learns your preferences and improves. We also build escalation rules so genuinely sensitive emails always reach you directly.' },
      { q: 'Which calendar and email tools work with this?', a: 'Gmail, Google Calendar, Outlook, Microsoft 365. For task management: Notion, Asana, ClickUp, Linear, Monday.com. We configure the stack to match what you already use.' },
    ],
  },
  {
    id: 'finance',
    index: '05',
    label: 'FINANCE',
    headline: 'Your finances, tracked. Your admin, gone.',
    subhead: 'Invoice chasing, expense tracking, financial research — the back-office work that eats hours every week. Automated.',
    description: `Finance admin is one of the most consistent time drains in any small business. Invoices go out late. Expenses pile up unreconciled. Cash flow visibility is murky. And every hour spent chasing payments or compiling reports is an hour not spent growing.

    We build financial automation systems that handle invoice creation and follow-up, expense categorisation, cash flow reporting, and vendor research — so your books stay clean and your attention stays where it belongs.`,
    accentColor: '#A89F7A',
    bgDark: 'rgba(168,159,122,0.06)',
    metric: { value: '5 hrs', label: 'saved on finance admin per week' },
    whatWeDeliver: [
      'Automated invoice generation and delivery',
      'Overdue invoice follow-up sequences',
      'Expense capture and categorisation workflows',
      'Cash flow reporting and alerts',
      'Vendor and supplier research automation',
      'Financial data syncing across tools',
    ],
    invoiceFlow: true,
    faqs: [
      { q: 'Which accounting tools do you integrate with?', a: 'We integrate with Xero, QuickBooks, MYOB, and FreshBooks. If your accounting tool has an API, we can connect it.' },
      { q: 'Can you automate invoice chasing without being annoying?', a: 'Yes. We build smart sequences that adjust tone based on how overdue an invoice is — a gentle reminder at 7 days, firmer language at 21, and escalation routing at 30+. All personalised, all on autopilot.' },
      { q: 'What about expense tracking?', a: 'We connect to bank feeds, receipt scanning tools (like Dext or Hubdoc), and card providers to automatically categorise and push expenses into your accounting software — no manual data entry.' },
    ],
  },
]

// Invoice flow diagram — animated step-by-step workflow
function InvoiceFlow() {
  const [phase, setPhase] = useState(0)
  const [paid, setPaid] = useState(true)

  useEffect(() => {
    const sequence = [
      { phase: 1, delay: 600 },
      { phase: 2, delay: 1400 },
      { phase: 3, delay: 1200 },
      { phase: 4, delay: 1600 },
      { phase: 5, delay: 1200 },
      { phase: 6, delay: 900 },
    ]
    let timers = []
    let accumulated = 0
    sequence.forEach(({ phase: p, delay }) => {
      accumulated += delay
      timers.push(setTimeout(() => setPhase(p), accumulated))
    })
    const reset = setTimeout(() => {
      setPhase(0)
      setPaid(prev => !prev)
      setTimeout(() => setPhase(1), 600)
    }, accumulated + 2400)
    timers.push(reset)
    return () => timers.forEach(clearTimeout)
  }, [paid])

  const accent = '#A89F7A'
  const green = '#6B7C4A'
  const red = '#C07A6A'
  const dim = 'rgba(28,28,26,0.15)'
  const notifyColor = paid ? green : red

  const step1Done = phase >= 2, step1Active = phase === 1
  const step2Done = phase >= 3, step2Active = phase === 2
  const step3Done = phase >= 4, step3Active = phase === 3
  const paidDone = phase >= 5 && paid,   paidActive  = phase === 4 && paid
  const unpaidDone = phase >= 5 && !paid, unpaidActive = phase === 4 && !paid
  const notifyDone = phase >= 6, notifyActive = phase === 5

  // ── shared styles ──────────────────────────────
  const node = (active, done, color = accent) => ({
    display: 'flex', alignItems: 'center', gap: '0.85rem',
    opacity: active || done ? 1 : 0.32,
    transition: 'opacity 0.5s ease',
  })

  const circle = (active, done, color = accent) => ({
    width: '2.6rem', height: '2.6rem', borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: done ? color : active ? `${color}22` : 'rgba(28,28,26,0.05)',
    border: `1.5px solid ${done || active ? color : dim}`,
    boxShadow: active ? `0 0 0 5px ${color}14` : 'none',
    transition: 'all 0.5s ease',
  })

  const label = (active, done, sub = '') => (
    <div>
      <div style={{
        fontSize: '0.82rem', fontWeight: active || done ? 500 : 300,
        color: active || done ? '#1C1C1A' : 'rgba(28,28,26,0.38)',
        fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3,
        transition: 'color 0.4s ease',
      }}>{sub}</div>
    </div>
  )

  const vertLine = (active, color = accent, height = '2rem') => (
    <div style={{
      width: '1.5px', height, marginLeft: '1.3rem',
      backgroundColor: active ? color : dim,
      transition: 'background-color 0.5s ease',
    }} />
  )

  // ── icons ──────────────────────────────────────
  const Check = ({ c = '#F7F3ED' }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const Doc = ({ c }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <rect x="3" y="1.5" width="8" height="11" rx="1" stroke={c} strokeWidth="1.5"/>
      <path d="M5.5 5h3M5.5 7.5h3M5.5 10h2" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
  const Send = ({ c }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const Clock = ({ c }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.5"/>
      <path d="M7 4.5V7l2 1.5" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
  const GreenTick = ({ c }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.5"/>
      <path d="M4.5 7l2 2 3-3" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  const Cross = ({ c }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke={c} strokeWidth="1.5"/>
      <path d="M4 4l4 4M8 4l-4 4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
  const Bell = ({ c }) => (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M7 2a4 4 0 0 1 4 4v2.5l1 1.5H2l1-1.5V6a4 4 0 0 1 4-4z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5.5 10.5a1.5 1.5 0 0 0 3 0" stroke={c} strokeWidth="1.3"/>
    </svg>
  )

  const iconColor = (active, done, color) =>
    done ? '#F7F3ED' : active ? (color === accent ? accent : '#F7F3ED') : 'rgba(28,28,26,0.28)'

  return (
    <div style={{ padding: '0.25rem 0.25rem' }}>

      {/* Step 1 — Generate */}
      <div style={node(step1Active, step1Done)}>
        <div style={circle(step1Active, step1Done)}>
          {step1Done
            ? <Check />
            : <Doc c={iconColor(step1Active, step1Done, accent)} />}
        </div>
        {label(step1Active, step1Done, 'Generate invoice')}
      </div>

      {vertLine(step2Active || step2Done)}

      {/* Step 2 — Send */}
      <div style={node(step2Active, step2Done)}>
        <div style={circle(step2Active, step2Done)}>
          {step2Done
            ? <Check />
            : <Send c={iconColor(step2Active, step2Done, accent)} />}
        </div>
        {label(step2Active, step2Done, 'Send invoice to client')}
      </div>

      {vertLine(step3Active || step3Done)}

      {/* Step 3 — Awaiting */}
      <div style={node(step3Active, step3Done)}>
        <div style={circle(step3Active, step3Done)}>
          {step3Done
            ? <Check />
            : <Clock c={iconColor(step3Active, step3Done, accent)} />}
        </div>
        {label(step3Active, step3Done, 'Awaiting payment')}
      </div>

      {/* Branch split line */}
      {vertLine(phase >= 4)}

      {/* Branch row */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {/* Paid */}
        <div style={{
          ...node(paidActive, paidDone, green),
          flex: 1,
          padding: '0.65rem 0.75rem',
          borderRadius: '0.75rem',
          backgroundColor: paidDone ? `${green}10` : paidActive ? `${green}08` : 'rgba(28,28,26,0.03)',
          border: `1px solid ${paidDone || paidActive ? `${green}30` : dim}`,
          transition: 'all 0.5s ease',
        }}>
          <div style={circle(paidActive, paidDone, green)}>
            {paidDone
              ? <Check />
              : <GreenTick c={iconColor(paidActive, paidDone, green)} />}
          </div>
          <div style={{
            fontSize: '0.78rem', fontWeight: paidActive || paidDone ? 500 : 300,
            color: paidActive || paidDone ? green : 'rgba(28,28,26,0.35)',
            fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3,
            transition: 'color 0.4s ease',
          }}>Payment<br/>received</div>
        </div>

        {/* Not paid */}
        <div style={{
          ...node(unpaidActive, unpaidDone, red),
          flex: 1,
          padding: '0.65rem 0.75rem',
          borderRadius: '0.75rem',
          backgroundColor: unpaidDone ? `${red}10` : unpaidActive ? `${red}08` : 'rgba(28,28,26,0.03)',
          border: `1px solid ${unpaidDone || unpaidActive ? `${red}30` : dim}`,
          transition: 'all 0.5s ease',
        }}>
          <div style={circle(unpaidActive, unpaidDone, red)}>
            {unpaidDone
              ? <Cross c="#F7F3ED" />
              : <Cross c={iconColor(unpaidActive, unpaidDone, red)} />}
          </div>
          <div style={{
            fontSize: '0.78rem', fontWeight: unpaidActive || unpaidDone ? 500 : 300,
            color: unpaidActive || unpaidDone ? red : 'rgba(28,28,26,0.35)',
            fontFamily: 'DM Sans, sans-serif', lineHeight: 1.3,
            transition: 'color 0.4s ease',
          }}>Not<br/>received</div>
        </div>
      </div>

      {vertLine(phase >= 5, notifyColor)}

      {/* Step 5 — Notify */}
      <div style={node(notifyActive, notifyDone, notifyColor)}>
        <div style={circle(notifyActive, notifyDone, notifyColor)}>
          <Bell c={notifyDone || notifyActive ? '#F7F3ED' : 'rgba(28,28,26,0.28)'} />
        </div>
        {label(notifyActive, notifyDone, paid ? 'Receipt confirmation sent' : 'Automated reminder sent')}
      </div>

      {/* Status badge */}
      <div style={{ marginTop: '1.4rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.35rem 1rem', borderRadius: '9999px',
          backgroundColor: phase >= 6 ? (paid ? `${green}12` : `${red}12`) : 'rgba(28,28,26,0.04)',
          border: `1px solid ${phase >= 6 ? (paid ? `${green}35` : `${red}35`) : 'rgba(28,28,26,0.1)'}`,
          transition: 'all 0.5s ease',
        }}>
          <div style={{
            width: '0.38rem', height: '0.38rem', borderRadius: '50%',
            backgroundColor: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.18)',
            transition: 'background-color 0.5s ease',
          }} />
          <span style={{
            fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
            letterSpacing: '0.09em',
            color: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.28)',
            transition: 'color 0.5s ease',
          }}>
            {phase >= 6 ? (paid ? 'PAID — COMPLETE' : 'OVERDUE — CHASING') : 'IN PROGRESS'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Content rotator for content design section
function ContentRotator({ items }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % items.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [items.length])

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()
    const duration = 3500
    const frame = () => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / duration) * 100, 100))
      if (elapsed < duration) requestAnimationFrame(frame)
    }
    const raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return (
    <div>
      <div className="h-0.5 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'rgba(212,201,176,0.3)' }}>
        <div className="h-full rounded-full transition-none" style={{ width: `${progress}%`, backgroundColor: items[active].color, transition: progress === 0 ? 'none' : 'width 0.1s linear' }} />
      </div>
      <div className="relative" style={{ minHeight: '140px' }}>
        {items.map((item, i) => {
          const offset = (i - active + items.length) % items.length
          const isActive = offset === 0
          const isNext = offset === 1
          return (
            <div
              key={item.label}
              className="absolute inset-0 rounded-2xl p-5 transition-all duration-700"
              style={{
                backgroundColor: isActive ? '#1C1C1A' : '#E8E0D0',
                opacity: isActive ? 1 : isNext ? 0.45 : 0.15,
                transform: isActive ? 'translateY(0) scale(1)' : isNext ? 'translateY(-10px) scale(0.96)' : 'translateY(-18px) scale(0.92)',
                zIndex: isActive ? 3 : isNext ? 2 : 1,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-dm rounded-full px-2.5 py-0.5" style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', backgroundColor: `${item.color}25`, color: item.color }}>
                  {item.tag}
                </span>
                <span className="font-dm" style={{ fontSize: '0.75rem', color: isActive ? 'rgba(255,255,255,0.35)' : 'rgba(28,28,26,0.3)' }}>{item.label}</span>
              </div>
              <p className="font-dm" style={{ fontSize: '0.82rem', lineHeight: 1.55, fontWeight: 300, color: isActive ? 'rgba(255,255,255,0.65)' : 'rgba(28,28,26,0.45)' }}>
                {item.preview}
              </p>
            </div>
          )
        })}
      </div>
      <div className="flex gap-1.5 justify-center mt-4">
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-500" style={{ width: active === i ? '1.5rem' : '0.4rem', height: '0.4rem', backgroundColor: active === i ? '#6B7C4A' : '#D4C9B0', border: 'none', cursor: 'pointer', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}

// Individual service section
function ServiceSection({ service, isEven }) {
  const sectionRef = useRef(null)

  return (
    <section
      ref={sectionRef}
      id={service.id}
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: isEven ? '#F7F3ED' : '#EEEAE2', scrollMarginTop: '8rem' }}
    >
      {/* Large background number */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(10rem, 20vw, 22rem)',
          fontWeight: 700,
          color: 'rgba(28,28,26,0.03)',
          lineHeight: 1,
          top: '-0.15em',
          right: '-0.05em',
          letterSpacing: '-0.05em',
        }}
      >
        {service.index}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: service.accentColor, opacity: 0.8 }}>
              {service.index}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: `${service.accentColor}30`, maxWidth: '3rem' }} />
            <span className="font-dm" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(28,28,26,0.4)' }}>
              {service.label}
            </span>
          </div>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#1C1C1A', marginBottom: '1rem', maxWidth: '18ch' }}>
            {service.headline}
          </h2>
          <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.6, color: 'rgba(28,28,26,0.55)', maxWidth: '60ch', marginBottom: '3rem' }}>
            {service.subhead}
          </p>
        </Reveal>

        {/* Two-column layout: description + visual */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-14`}>
          {/* Left: description + deliverables */}
          <Reveal delay={0.05}>
            <div className="space-y-5 mb-8">
              {service.description.split('\n\n').map((para, i) => (
                <p key={i} className="font-dm" style={{ fontSize: '0.975rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(28,28,26,0.65)' }}>
                  {para.trim()}
                </p>
              ))}
            </div>
            <div>
              <p className="font-dm mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 500, color: service.accentColor }}>
                WHAT WE DELIVER
              </p>
              <div className="grid grid-cols-1 gap-2">
                {service.whatWeDeliver.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: i < service.whatWeDeliver.length - 1 ? '1px solid rgba(212,201,176,0.4)' : 'none' }}>
                    <span style={{ color: service.accentColor, fontSize: '0.7rem', flexShrink: 0, marginTop: '0.2rem' }}>◆</span>
                    <span className="font-dm" style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(28,28,26,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: animated visual */}
          <Reveal delay={0.12}>
            <div
              className="rounded-4xl p-7 sticky top-24"
              style={{ backgroundColor: service.bgDark, border: `1px solid ${service.accentColor}20` }}
            >
              {/* Metric */}
              <div className="mb-5 pb-5" style={{ borderBottom: `1px solid ${service.accentColor}20` }}>
                <MetricBadge value={service.metric.value} label={service.metric.label} color={service.accentColor} />
              </div>

              {/* Visual animation — differs by service */}
              {service.pipeline && (
                <Pipeline steps={service.pipeline} accentColor={service.accentColor} />
              )}
              {service.terminalLines && (
                <Terminal lines={service.terminalLines} typingSpeed={35} />
              )}
              {service.contentRotator && (
                <ContentRotator items={service.contentRotator} />
              )}
              {service.invoiceFlow && (
                <InvoiceFlow />
              )}

              {/* CTA */}
              <div className="mt-6">
                <a href="mailto:hello@undercurrent.au" className="btn-sage" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Automate my {service.label.toLowerCase()}
                    <ArrowRight size={14} />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQs */}
        <Reveal delay={0.1}>
          <div>
            <p className="font-dm mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(28,28,26,0.4)' }}>
              COMMON QUESTIONS
            </p>
            <ServiceFAQ items={service.faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Nav pills for jumping to each service
function ServiceNav() {
  const [active, setActive] = useState(null)
  const [visible, setVisible] = useState(false)
  const [navTop, setNavTop] = useState(80)
  const scrollRef = useRef(null)
  const activeRef = useRef(null)

  useEffect(() => {
    const measureNavbar = () => {
      const nav = document.querySelector('nav[class*="fixed"]')
      if (nav) {
        const rect = nav.getBoundingClientRect()
        setNavTop(rect.bottom + 8)
      }
    }
    measureNavbar()
    window.addEventListener('resize', measureNavbar)

    const sentinel = document.getElementById('hero-sentinel')
    if (sentinel) {
      const sentinelObs = new IntersectionObserver(([entry]) => {
        setVisible(!entry.isIntersecting)
      }, { threshold: 0 })
      sentinelObs.observe(sentinel)
    }

    const observers = services.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(s.id)
      }, { threshold: 0.3 })
      observer.observe(el)
      return observer
    })
    return () => {
      observers.forEach(o => o && o.disconnect())
      window.removeEventListener('resize', measureNavbar)
    }
  }, [])

  // Auto-scroll active pill into view on mobile
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const pill = activeRef.current
      const containerRect = container.getBoundingClientRect()
      const pillRect = pill.getBoundingClientRect()
      const scrollLeft = container.scrollLeft + (pillRect.left - containerRect.left) - (containerRect.width / 2) + (pillRect.width / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [active])

  return (
    <div
      className="fixed left-0 right-0 z-[150] flex justify-center transition-all duration-500"
      style={{
        top: `${navTop}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-10px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Outer wrapper — pill shape, handles blur + border */}
      <div
        style={{
          backgroundColor: 'rgba(232,224,208,0.92)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          border: '1px solid rgba(212,201,176,0.65)',
          borderRadius: '9999px',
          boxShadow: '0 4px 32px rgba(28,28,26,0.10), 0 1px 0 rgba(255,255,255,0.5) inset',
          maxWidth: '820px',
          width: 'calc(100% - 2rem)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Label — hidden on very small screens */}
        <span
          className="font-dm hidden sm:block flex-shrink-0 pl-4 pr-2"
          style={{ fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 500, color: 'rgba(28,28,26,0.32)', whiteSpace: 'nowrap' }}
        >
          JUMP TO:
        </span>

        {/* Left fade edge (mobile) */}
        <div
          className="absolute left-0 top-0 bottom-0 pointer-events-none sm:hidden z-10"
          style={{ width: '1.5rem', background: 'linear-gradient(to right, rgba(232,224,208,0.95), transparent)' }}
        />

        {/* Scrollable pills row — scrollbar hidden via CSS */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1.5 px-3 py-2 service-nav-scroll"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            flex: 1,
          }}
        >
          {services.map(s => {
            const isActive = active === s.id
            return (
              <a
                key={s.id}
                ref={isActive ? activeRef : null}
                href={`#${s.id}`}
                className="flex-shrink-0 font-dm"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? s.accentColor : 'rgba(28,28,26,0.05)',
                  color: isActive ? '#1C1C1A' : 'rgba(28,28,26,0.55)',
                  border: `1px solid ${isActive ? s.accentColor : 'rgba(28,28,26,0.10)'}`,
                  borderRadius: '9999px',
                  padding: '0.3rem 0.9rem',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? `0 1px 10px ${s.accentColor}40` : 'none',
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                }}
              >
                {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
              </a>
            )
          })}
        </div>

        {/* Right fade edge */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
          style={{ width: '2rem', background: 'linear-gradient(to left, rgba(232,224,208,0.95), transparent)' }}
        />
      </div>
    </div>
  )
}

// Hero canvas — pared back version
function HeroCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let visible = true
    const visObserver = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    visObserver.observe(canvas)
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const currents = [
      { yFrac: 0.55, amp: 30, freq: 0.009, speed: 0.15, color: 'rgba(143,175,159,0.18)', lw: 1.0, dash: 0, gap: 0 },
      { yFrac: 0.62, amp: 20, freq: 0.012, speed: -0.12, color: 'rgba(212,201,176,0.12)', lw: 0.7, dash: 0, gap: 0 },
      { yFrac: 0.48, amp: 42, freq: 0.007, speed: 0.20, color: 'rgba(143,175,159,0.10)', lw: 0.5, dash: 60, gap: 90 },
      { yFrac: 0.58, amp: 14, freq: 0.016, speed: 0.30, color: 'rgba(143,175,159,0.20)', lw: 0.5, dash: 0, gap: 0 },
    ]
    let t = 0
    const draw = () => {
      if (!visible) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach(c => {
        const yCenter = c.yFrac * H
        ctx.beginPath()
        ctx.strokeStyle = c.color
        ctx.lineWidth = c.lw
        ctx.lineCap = 'round'
        if (c.dash > 0) {
          ctx.setLineDash([c.dash, c.gap])
          ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap)
        } else {
          ctx.setLineDash([])
        }
        for (let x = -4; x <= W + 4; x += 4) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          x === -4 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); visObserver.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

export default function Services() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <PageHead
        title="Services — UnderCurrent | CX, Sales, Content, Personal & Finance Automation"
        description="Deep-dive into UnderCurrent's five automation services: customer experience, sales, content design, personal system, and finance. Built for small businesses."
        canonical="https://undercurrent.au/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "url": "https://undercurrent.au/services",
          "name": "UnderCurrent Services",
          "description": "AI automation services for small businesses: customer experience, sales automation, content design, personal system, and finance.",
          "provider": {
            "@type": "Organization",
            "name": "UnderCurrent",
            "url": "https://undercurrent.au"
          },
          "hasPart": [
            { "@type": "Service", "name": "Customer Experience Automation", "url": "https://undercurrent.au/services#customer-experience", "description": "Full customer lifecycle automation — onboarding, satisfaction surveys, review requests, referral programs, and re-engagement flows." },
            { "@type": "Service", "name": "Sales Automation", "url": "https://undercurrent.au/services#sales", "description": "Lead sourcing, personalised outreach, follow-up sequences, and CRM pipeline automation." },
            { "@type": "Service", "name": "Content Design Automation", "url": "https://undercurrent.au/services#content-design", "description": "Content creation pipelines — blog posts, social content, newsletters, and multi-channel distribution." },
            { "@type": "Service", "name": "Personal System AI", "url": "https://undercurrent.au/services#personal-system", "description": "AI-powered inbox management, calendar automation, meeting scheduling, and task extraction." },
            { "@type": "Service", "name": "Finance Automation", "url": "https://undercurrent.au/services#finance", "description": "Invoice generation, overdue follow-up, expense tracking, cash flow reporting, and financial research automation." }
          ]
        }}
      />
      <ScrollProgressBar />
      <Navbar ready={true} isSubPage={true} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: '80dvh',
          background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 30%, #3d4f42 55%, #8FAF9F 80%, #D4C9B0 100%)',
        }}
      >
        <div ref={glowRef} style={{
          position: 'absolute', top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw', maxWidth: '1000px', height: '90vw', maxHeight: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(143,175,159,0.2) 0%, rgba(143,175,159,0.06) 45%, transparent 70%)',
          pointerEvents: 'none', opacity: 0,
        }} />
        <HeroCanvas />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center" style={{ minHeight: '80dvh', paddingTop: '8rem', paddingBottom: '5rem' }}>
          <p className="font-mono mb-5" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)' }}>
            WHAT WE BUILD
          </p>
          <h1 ref={headlineRef} style={{ opacity: 0 }}>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
              Five systems.
            </span>
            <span className="block font-cormorant" style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05 }}>
              Infinite leverage.
            </span>
          </h1>
          <p ref={subRef} className="font-dm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.6)', lineHeight: 1.75, maxWidth: '48ch', marginTop: '2rem', opacity: 0 }}>
            We go deep in five operational areas — the ones where small businesses consistently lose the most time, money, and momentum. Each one is a complete system, built to run without you.
          </p>

          {/* Service index preview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
            {services.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex flex-col gap-1 p-4 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(143,175,159,0.22)',
                  border: '1px solid rgba(143,175,159,0.55)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(143,175,159,0.35)'
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.8)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(143,175,159,0.22)'
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.55)'
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)'
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: s.accentColor, opacity: 1 }}>
                  {s.index}
                </span>
                <span className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(247,243,237,0.95)', letterSpacing: '0.02em' }}>
                  {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
      </section>

      {/* Sticky service nav */}
      <ServiceNav />

      {/* Service deep dives */}
      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} isEven={i % 2 === 0} />
      ))}

      {/* Final CTA */}
      <section
        className="py-28 px-6 md:px-12 relative overflow-hidden"
        style={{ backgroundColor: '#1C1C1A' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(143,175,159,0.08) 0%, transparent 60%)',
        }} />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <p className="font-mono mb-5" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.6)' }}>
              GET STARTED
            </p>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#F7F3ED', marginBottom: '1.5rem', maxWidth: '18ch' }}>
              Not sure where to start?
            </h2>
            <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(247,243,237,0.5)', maxWidth: '48ch', marginBottom: '3rem' }}>
              Book a 30-minute workflow review. We'll map your biggest time drains across all five areas and tell you exactly where automation will have the most impact — ranked by ROI.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:hello@undercurrent.au" className="btn-sage-hero" style={{ fontSize: '0.95rem', padding: '0.9rem 2.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Book a Workflow Review
                  <ArrowRight size={16} />
                </span>
              </a>
              <a href="/about" className="btn-sage-hero" style={{ fontSize: '0.95rem', padding: '0.9rem 2.5rem' }}>
                <span>About UnderCurrent</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
