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
    <div className="rounded-2xl p-5 font-mono overflow-hidden" style={{ backgroundColor: '#1C1C1A', minHeight: '180px' }}>
      <div className="flex gap-1.5 mb-4">
        {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c, opacity: 0.7 }} />
        ))}
      </div>
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
          <span style={{ fontSize: '0.65rem', color: '#6B7C4A', letterSpacing: '0.1em' }}>COMPLETE</span>
        </div>
      )}
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
              <span className="ml-auto font-mono" style={{ fontSize: '0.65rem', color: 'rgba(28,28,26,0.3)' }}>
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
    id: 'onboarding',
    index: '01',
    label: 'ONBOARDING',
    headline: 'First impressions that never miss.',
    subhead: 'Your client just signed. From that moment, every touchpoint should feel crafted — not cobbled together.',
    description: `Onboarding is the moment that defines a client relationship. Done well, it builds trust, reduces churn, and turns new clients into advocates before they've even seen a result. Done badly, it costs you the deal you just won.

    We build automated onboarding flows that trigger the right message, at the right time, across every channel — email, SMS, portal, Slack. Welcome sequences, setup checklists, intake forms, milestone celebrations. All without your team manually firing each one.`,
    accentColor: '#8FAF9F',
    bgDark: 'rgba(143,175,159,0.06)',
    metric: { value: '68%', label: 'reduction in early churn' },
    whatWeDeliver: [
      'Welcome email sequences with conditional branching',
      'Automated intake form + CRM data capture',
      'Portal access + resource delivery workflows',
      'Milestone-based check-in triggers',
      'Internal Slack/Teams notifications for your team',
      'Handoff flow from sales to delivery',
    ],
    pipeline: [
      'Contract signed → trigger fires',
      'Welcome email sequence begins',
      'Intake form delivered & captured',
      'CRM record populated automatically',
      'Onboarding portal access granted',
      'Team notified & project created',
      'Day 3 check-in scheduled',
    ],
    faqs: [
      { q: 'What tools do you build this on?', a: 'We work tool-agnostic — Zapier, Make (Integromat), n8n, or native API integrations depending on what\'s already in your stack. We don\'t impose a platform.' },
      { q: 'How long does it take to build?', a: 'A standard onboarding automation takes 2–4 weeks from scoping to live, depending on complexity and how many tools need to be connected.' },
      { q: 'Can this work with my existing CRM?', a: 'Yes. We\'ve integrated with HubSpot, Salesforce, Pipedrive, GoHighLevel, ActiveCampaign, and many others. If it has an API, we can connect it.' },
    ],
  },
  {
    id: 'customer-experience',
    index: '02',
    label: 'CUSTOMER EXPERIENCE',
    headline: 'Every customer feels like your only one.',
    subhead: 'The gap between a good client relationship and a great one is consistent, timely communication — and most businesses can\'t sustain it manually.',
    description: `Customer experience isn't a department. It's a system. Every message your clients receive, every follow-up they get (or don't get), every moment they feel seen or forgotten — these are all outputs of the processes you have (or don't have) in place.

    We automate the full customer lifecycle: from the moment they become a client, through their active engagement, into nurture, and all the way to review-generation and referral. The result is a customer base that feels deeply cared for, with almost none of the manual effort.`,
    accentColor: '#A89F7A',
    bgDark: 'rgba(168,159,122,0.06)',
    metric: { value: '40%', label: 'more 5-star reviews' },
    whatWeDeliver: [
      'Full lifecycle automation (onboard → active → nurture → advocate)',
      'Satisfaction pulse surveys at key moments',
      'Automated review request sequences',
      'Re-engagement flows for inactive clients',
      'Referral program trigger + tracking',
      'NPS collection and response routing',
    ],
    pipeline: [
      'Client activated → lifecycle starts',
      'Week 1 check-in message sent',
      'Usage milestone auto-detected',
      'Personalised tip sequence triggered',
      'Month 2: satisfaction survey sent',
      'Positive response → review request',
      'Review received → referral offer sent',
    ],
    faqs: [
      { q: 'How do you personalise at scale?', a: 'We use data already in your CRM — service type, purchase date, usage patterns, geographic location — to branch automation flows so each client gets a message relevant to their situation.' },
      { q: 'What if a client gives negative feedback?', a: 'We build conditional branches for negative sentiment — routing them to a human escalation flow rather than the review request sequence. These clients get personal outreach instead.' },
      { q: 'Can this integrate with my helpdesk?', a: 'Yes — we integrate with Zendesk, Intercom, Freshdesk, and others. Support ticket data can trigger or modify lifecycle automations.' },
    ],
  },
  {
    id: 'sales',
    index: '03',
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
    index: '04',
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
    id: 'personal-assistant',
    index: '05',
    label: 'PERSONAL ASSISTANT',
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
]

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
                <span className="font-dm rounded-full px-2.5 py-0.5" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', backgroundColor: `${item.color}25`, color: item.color }}>
                  {item.tag}
                </span>
                <span className="font-dm" style={{ fontSize: '0.68rem', color: isActive ? 'rgba(255,255,255,0.35)' : 'rgba(28,28,26,0.3)' }}>{item.label}</span>
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
            <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: service.accentColor, opacity: 0.8 }}>
              {service.index}
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: `${service.accentColor}30`, maxWidth: '3rem' }} />
            <span className="font-dm" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(28,28,26,0.4)' }}>
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

  useEffect(() => {
    // Measure the actual bottom of the floating navbar pill + 8px gap
    const measureNavbar = () => {
      const nav = document.querySelector('nav[class*="fixed"]')
      if (nav) {
        const rect = nav.getBoundingClientRect()
        setNavTop(rect.bottom + 8)
      }
    }
    measureNavbar()
    window.addEventListener('resize', measureNavbar)

    // Show nav only after scrolling past the hero
    const sentinel = document.getElementById('hero-sentinel')
    if (sentinel) {
      const sentinelObs = new IntersectionObserver(([entry]) => {
        setVisible(!entry.isIntersecting)
      }, { threshold: 0 })
      sentinelObs.observe(sentinel)
    }

    // Track which section is active
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

  return (
    <div
      className="fixed left-0 right-0 z-[150] flex justify-center px-4 transition-all duration-300"
      style={{
        top: `${navTop}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 overflow-x-auto"
        style={{
          backgroundColor: 'rgba(232,224,208,0.88)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          border: '1px solid rgba(212,201,176,0.6)',
          borderRadius: '9999px',
          boxShadow: '0 2px 24px rgba(28,28,26,0.08)',
          maxWidth: '820px',
          width: '100%',
        }}
      >
        <span className="font-dm mr-1 flex-shrink-0" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 500, color: 'rgba(28,28,26,0.35)' }}>
          JUMP TO:
        </span>
        {services.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex-shrink-0 rounded-full px-3.5 py-1 font-dm transition-all duration-300"
            style={{
              fontSize: '0.75rem',
              fontWeight: active === s.id ? 600 : 400,
              backgroundColor: active === s.id ? s.accentColor : 'transparent',
              color: active === s.id ? '#1C1C1A' : 'rgba(28,28,26,0.6)',
              border: `1px solid ${active === s.id ? s.accentColor : 'rgba(28,28,26,0.15)'}`,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              boxShadow: active === s.id ? `0 1px 8px ${s.accentColor}35` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
          </a>
        ))}
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
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
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
        title="Services — UnderCurrent | Onboarding, Sales, CX & Content Automation"
        description="Deep-dive into UnderCurrent's five automation services: onboarding, customer experience, sales, content design, and personal assistant AI. Built for small businesses."
        canonical="https://undercurrent.au/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "url": "https://undercurrent.au/services",
          "name": "UnderCurrent Services",
          "description": "AI automation services for small businesses: onboarding, customer experience, sales automation, content design, and personal assistant workflows.",
          "provider": {
            "@type": "Organization",
            "name": "UnderCurrent",
            "url": "https://undercurrent.au"
          },
          "hasPart": [
            { "@type": "Service", "name": "Onboarding Automation", "url": "https://undercurrent.au/services#onboarding", "description": "Automated client onboarding sequences — welcome emails, intake forms, portal access, and milestone triggers." },
            { "@type": "Service", "name": "Customer Experience Automation", "url": "https://undercurrent.au/services#customer-experience", "description": "Full customer lifecycle automation — satisfaction surveys, review requests, referral programs, and re-engagement flows." },
            { "@type": "Service", "name": "Sales Automation", "url": "https://undercurrent.au/services#sales", "description": "Lead sourcing, personalised outreach, follow-up sequences, and CRM pipeline automation." },
            { "@type": "Service", "name": "Content Design Automation", "url": "https://undercurrent.au/services#content-design", "description": "Content creation pipelines — blog posts, social content, newsletters, and multi-channel distribution." },
            { "@type": "Service", "name": "Personal Assistant AI", "url": "https://undercurrent.au/services#personal-assistant", "description": "AI-powered inbox management, calendar automation, meeting scheduling, and task extraction." }
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
                <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: s.accentColor, opacity: 1 }}>
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
            <p className="font-mono mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.6)' }}>
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
