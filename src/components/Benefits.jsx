import { useEffect, useRef, useState } from 'react'

const STORIES = [
  {
    stat: '+40%',
    label: 'more leads converted',
    color: '#8FAF9F',
    desc: 'Every enquiry gets an instant, personal reply — even at 11pm on a Sunday.',
    trigger: 'New enquiry received · just now',
    actionLabel: 'AUTO-REPLY · SENT INSTANTLY',
    message: "Hi Sarah! Thanks for reaching out — I'd love to help. Are you free for a quick 10-minute call tomorrow at 10am?",
    result: 'Meeting booked · Google Calendar',
  },
  {
    stat: '+31%',
    label: 'more 5-star reviews',
    color: '#C4A97A',
    desc: 'Timed follow-ups land when the job is still fresh. No awkward asks. No chasing required.',
    trigger: 'Job completed · 14 days ago',
    actionLabel: 'SMS TO CLIENT · AUTO-SENT',
    message: "Hi Mike — hope the kitchen's coming along nicely! If you have 30 seconds, a Google review would mean the world to us. 🙏",
    result: '★★★★★  Review posted · Google',
  },
  {
    stat: '12 hrs',
    label: 'back every week',
    color: '#89ACBE',
    desc: 'Your inbox, follow-ups, and reminders — handled automatically. You only touch what actually needs you.',
    trigger: '23 unread emails · 9:02am',
    actionLabel: 'INBOX PROCESSED · AUTO',
    message: '4 bookings confirmed · 9 routine enquiries answered · 3 invoices flagged for your review',
    result: 'Inbox zero · 9:14am',
  },
  {
    stat: '5 hrs',
    label: 'of content, every week, on autopilot',
    color: '#8FAF9F',
    desc: "You know you should post. You never have time. Now it happens while you're on the job.",
    trigger: 'Job completed · this morning',
    actionLabel: 'SOCIAL POST · AUTO-PUBLISHED',
    message: "Just wrapped this bathroom reno in Toorak — three weeks, zero hiccups. Swipe to see the before. ➡️",
    result: 'Posted · Instagram · 47 likes',
  },
  {
    stat: '$800+',
    label: 'saved per week in admin',
    color: '#C4A97A',
    desc: 'Every overdue invoice gets chased automatically. No more uncomfortable calls or forgotten follow-ups.',
    trigger: 'Invoice #1047 · overdue 14 days',
    actionLabel: 'PAYMENT REMINDER · AUTO-SENT',
    message: "Hi James — just a friendly nudge, invoice #1047 for $2,400 is still outstanding. Pay securely here: [link] 👍",
    result: 'Payment received · $2,400',
  },
]

// ─── Shared card body (used by both desktop and mobile) ───────────────────────
function CardBody({ story, phase, slideIndex }) {
  return (
    <>
      {/* Check badge */}
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: `${story.color}18`,
        border: `1px solid ${story.color}45`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.75rem', flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5L13 4.5" stroke={story.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stat */}
      <div className="font-dm" style={{
        fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
        fontWeight: 800,
        color: '#F7F3ED',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: '0.5rem',
      }}>
        {story.stat}
      </div>

      {/* Label */}
      <div className="font-dm" style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: story.color,
        marginBottom: '1rem',
      }}>
        {story.label}
      </div>

      {/* Description */}
      <p className="font-dm" style={{
        fontSize: '0.95rem',
        fontWeight: 300,
        color: 'rgba(247,243,237,0.55)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        margin: '0 0 1.5rem',
      }}>
        {story.desc}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(247,243,237,0.08)', marginBottom: '1.5rem' }} />

      {/* Story phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Trigger */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}>
          <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.28)', marginBottom: '0.4rem' }}>
            TRIGGER
          </p>
          <p className="font-mono" style={{ fontSize: '0.82rem', color: 'rgba(247,243,237,0.6)', margin: 0 }}>
            {story.trigger}
          </p>
        </div>

        {/* Action */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.45s ease 0.08s, transform 0.45s ease 0.08s',
        }}>
          <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.28)', marginBottom: '0.6rem' }}>
            {story.actionLabel}
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(247,243,237,0.08)',
            borderRadius: '0.75rem',
            padding: '0.9rem 1.1rem',
          }}>
            <p className="font-dm" style={{ fontSize: '0.88rem', color: 'rgba(247,243,237,0.75)', lineHeight: 1.6, margin: 0 }}>
              {story.message}
            </p>
          </div>
        </div>

        {/* Result */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.45s ease 0.08s, transform 0.45s ease 0.08s',
        }}>
          <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.28)', marginBottom: '0.4rem' }}>
            RESULT
          </p>
          <p className="font-mono" style={{ fontSize: '0.82rem', color: story.color, margin: 0 }}>
            {story.result}
          </p>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '2rem' }}>
        {STORIES.map((_, i) => (
          <div key={i} style={{
            height: 3,
            width: i === slideIndex ? '1.75rem' : '0.5rem',
            borderRadius: '9999px',
            background: i === slideIndex ? story.color : 'rgba(247,243,237,0.15)',
            transition: 'width 0.3s ease, background 0.3s ease',
          }} />
        ))}
      </div>
    </>
  )
}

// ─── Mobile: stacked cards, each animates on scroll-enter ────────────────────
function MobileStoryCard({ story, index }) {
  const ref = useRef(null)
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          timers.current = [
            setTimeout(() => setPhase(1), 400),
            setTimeout(() => setPhase(2), 950),
            setTimeout(() => setPhase(3), 1550),
          ]
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => { obs.disconnect(); timers.current.forEach(clearTimeout) }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #1a1a18 0%, #1e2d24 100%)',
        border: `1px solid ${story.color}22`,
        borderTop: `2px solid ${story.color}55`,
        borderRadius: '1.25rem',
        padding: '1.75rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <CardBody story={story} phase={phase} slideIndex={index} />
    </div>
  )
}

// ─── Desktop: sticky scroll driver ───────────────────────────────────────────
export default function Benefits() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [phase, setPhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const phaseTimers = useRef([])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Advance story phases whenever the active slide changes
  useEffect(() => {
    phaseTimers.current.forEach(clearTimeout)
    setPhase(0)
    phaseTimers.current = [
      setTimeout(() => setPhase(1), 350),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
    ]
    return () => phaseTimers.current.forEach(clearTimeout)
  }, [activeIndex])

  // Desktop scroll driver
  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top
      const scrollable = rect.height - window.innerHeight
      if (scrolled < 0 || scrolled > scrollable) return
      const progress = scrolled / scrollable
      const newIndex = Math.min(
        Math.floor(progress * STORIES.length),
        STORIES.length - 1
      )
      setActiveIndex(prev => (prev !== newIndex ? newIndex : prev))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ backgroundColor: '#1C1C1A', padding: '5rem 1.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: '#8FAF9F', marginBottom: '0.75rem', fontWeight: 500 }}>
            THE PROBLEM
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15 }}>
            You're the most expensive person<br />doing the cheapest tasks.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {STORIES.map((story, i) => (
            <MobileStoryCard key={i} story={story} index={i} />
          ))}
        </div>
      </section>
    )
  }

  // ── Desktop layout (sticky scroll) ────────────────────────────────────────
  const story = STORIES[activeIndex]

  return (
    <section
      ref={sectionRef}
      style={{
        height: `${STORIES.length * 120 + 40}vh`,
        position: 'relative',
        backgroundColor: '#1C1C1A',
      }}
    >
      {/* Section header — scrolls away naturally */}
      <div style={{ padding: '7rem 1.5rem 3rem', textAlign: 'center' }}>
        <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: '#8FAF9F', marginBottom: '1rem', fontWeight: 500 }}>
          THE PROBLEM
        </p>
        <h2 className="font-cormorant" style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '1rem',
        }}>
          You're the most expensive person in your business —<br />doing the cheapest tasks.
        </h2>
        <p className="font-dm" style={{
          fontSize: '1.05rem', fontWeight: 300,
          color: 'rgba(247,243,237,0.45)',
          maxWidth: '520px', margin: '0 auto', lineHeight: 1.7,
        }}>
          Every hour you spend chasing invoices, following up leads, or writing the same email again is an hour you're not growing your business.
        </p>
      </div>

      {/* Sticky card */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}>
        <div
          key={activeIndex}
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'linear-gradient(160deg, #1a1a18 0%, #1e2d24 100%)',
            border: `1px solid ${story.color}22`,
            borderTop: `2px solid ${story.color}55`,
            borderRadius: '1.5rem',
            padding: 'clamp(2rem, 4vw, 3rem)',
            animation: 'slideCardIn 0.35s ease forwards',
          }}
        >
          <style>{`
            @keyframes slideCardIn {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <CardBody story={story} phase={phase} slideIndex={activeIndex} />
        </div>
      </div>
    </section>
  )
}
