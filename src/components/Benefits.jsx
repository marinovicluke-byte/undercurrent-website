import { useEffect, useRef, useState } from 'react'

// StoryBrand framing: Problem → Villain → Guide → Result
const STORIES = [
  {
    stat: '+40%',
    label: 'more leads converted',
    color: '#8FAF9F',
    desc: "Sarah enquired at 9:47pm. By morning, three competitors had already replied. You were still asleep. Every hour without a reply is a deal sliding away.",
    trigger: 'New enquiry received · 9:47 PM',
    actionLabel: 'AUTO-REPLY TO SARAH · INSTANT',
    message: "Hey Sarah! Thanks for reaching out — I'd love to help. Are you free for a quick chat this week? 📅",
    result: 'Call booked · next morning',
  },
  {
    stat: '+31%',
    label: 'more 5-star reviews',
    color: '#C4A97A',
    desc: "You do great work. Your clients love you. But asking for a review feels awkward — so it never happens. Meanwhile your competitor has 200 reviews and you have 12.",
    trigger: 'Job completed · 14 days ago',
    actionLabel: 'SMS TO MIKE · AUTO-SENT',
    message: "Hi Mike — hope the kitchen's coming along nicely! If you have 30 seconds, a Google review would mean the world to us. 🙏",
    result: '★★★★★  Review posted · Google',
  },
  {
    stat: '12 hrs',
    label: 'back every week',
    color: '#89ACBE',
    desc: "It's 9pm. You're still doing invoices. The actual work finished at 4. The paperwork followed you home — again. This is the hidden cost no one warns you about.",
    trigger: 'Job marked complete · 4:15 PM',
    actionLabel: 'INVOICE · AUTO-SENT',
    message: 'Invoice #247 · $3,200\nDue in 14 days — sent automatically.',
    result: 'Paid · 6 days early',
  },
  {
    stat: '5 hrs',
    label: 'of content every week, on autopilot',
    color: '#8FAF9F',
    desc: "Your competitor posts every day. You haven't posted in six weeks. You know consistent content builds trust — you just never have time to sit down and write it.",
    trigger: 'Job completed · this morning',
    actionLabel: 'SOCIAL POST · AUTO-PUBLISHED',
    message: "Just wrapped this bathroom reno in Toorak ✨ Three weeks, zero hiccups. Swipe to see the before. ➡️",
    result: 'Posted · Instagram · 47 likes',
  },
  {
    stat: '$800+',
    label: 'saved per week in admin',
    color: '#C4A97A',
    desc: "You've already done the work. You've already earned the money. But it's still sitting in their account while you send polite follow-up emails into the void.",
    trigger: 'Invoice #1047 · overdue 14 days',
    actionLabel: 'REMINDER TO JAMES · AUTO-SENT',
    message: "Hi James — just a friendly nudge. Invoice #1047 for $2,400 is still outstanding. Pay securely here: [link] 👍",
    result: 'Payment received · $2,400',
  },
]

// ─── Individual story card ────────────────────────────────────────────────────
function StoryCard({ story, isActive, index, totalCards }) {
  const [phase, setPhase] = useState(0)
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    if (isActive) {
      setPhase(0)
      timers.current = [
        setTimeout(() => setPhase(1), 400),
        setTimeout(() => setPhase(2), 950),
        setTimeout(() => setPhase(3), 1600),
      ]
    } else {
      setPhase(0)
    }
    return () => timers.current.forEach(clearTimeout)
  }, [isActive])

  return (
    <div
      style={{
        flexShrink: 0,
        width: 'var(--card-width)',
        background: 'linear-gradient(160deg, #1a1a18 0%, #1e2d24 100%)',
        border: `1px solid ${story.color}22`,
        borderTop: `2px solid ${story.color}55`,
        borderRadius: '1.25rem',
        padding: '1.75rem',
        scrollSnapAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? 'scale(1)' : 'scale(0.97)',
      }}
    >
      {/* Check badge */}
      <div style={{
        width: 38, height: 38, borderRadius: '50%',
        background: `${story.color}15`,
        border: `1px solid ${story.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', flexShrink: 0,
      }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5L13 4.5" stroke={story.color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stat */}
      <div className="font-dm" style={{
        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
        fontWeight: 800,
        color: '#F7F3ED',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: '0.4rem',
      }}>
        {story.stat}
      </div>

      {/* Label */}
      <div className="font-dm" style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        color: story.color,
        marginBottom: '0.85rem',
      }}>
        {story.label}
      </div>

      {/* Description */}
      <p className="font-dm" style={{
        fontSize: '0.88rem',
        fontWeight: 300,
        color: 'rgba(247,243,237,0.5)',
        lineHeight: 1.7,
        margin: '0 0 1.25rem',
        flex: 1,
      }}>
        {story.desc}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(247,243,237,0.07)', marginBottom: '1.25rem' }} />

      {/* Story phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        {/* Trigger */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <p className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.25)', marginBottom: '0.35rem' }}>
            TRIGGER
          </p>
          <p className="font-mono" style={{ fontSize: '0.78rem', color: 'rgba(247,243,237,0.55)', margin: 0 }}>
            {story.trigger}
          </p>
        </div>

        {/* Action / message */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease 0.07s, transform 0.4s ease 0.07s',
        }}>
          <p className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.25)', marginBottom: '0.5rem' }}>
            {story.actionLabel}
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(247,243,237,0.07)',
            borderRadius: '0.65rem',
            padding: '0.75rem 0.9rem',
          }}>
            <p className="font-dm" style={{ fontSize: '0.85rem', color: 'rgba(247,243,237,0.72)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
              {story.message}
            </p>
          </div>
        </div>

        {/* Result */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease 0.07s, transform 0.4s ease 0.07s',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <div style={{ flexShrink: 0 }}>
            <p className="font-mono" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', color: 'rgba(247,243,237,0.25)', marginBottom: '0.35rem' }}>
              RESULT
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: `${story.color}20`,
                border: `1px solid ${story.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 4.5" stroke={story.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-mono" style={{ fontSize: '0.78rem', color: story.color, margin: 0 }}>
                {story.result}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ display: 'flex', gap: '0.3rem', marginTop: '1.75rem' }}>
        {STORIES.map((_, i) => (
          <div key={i} style={{
            height: 3,
            width: i === index ? '1.5rem' : '0.4rem',
            borderRadius: '9999px',
            background: i === index ? story.color : 'rgba(247,243,237,0.12)',
            transition: 'width 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Benefits() {
  const stripRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track active card by scroll position
  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const handleScroll = () => {
      // Each card is card-width + gap. Read the actual card width from the first child.
      const firstCard = el.firstElementChild
      if (!firstCard) return
      const cardW = firstCard.offsetWidth + 20 // gap = 20px
      const idx = Math.round(el.scrollLeft / cardW)
      setActiveIndex(Math.min(idx, STORIES.length - 1))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '6rem 0' }}>
      <style>{`
        .story-strip::-webkit-scrollbar { display: none; }
        .story-strip { -ms-overflow-style: none; scrollbar-width: none; }

        /* Desktop: ~3 cards visible */
        :root { --card-width: min(400px, 34vw); }

        /* Mobile: 1 card + peek */
        @media (max-width: 768px) {
          :root { --card-width: min(85vw, 360px); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 1.5rem', marginBottom: '3.5rem' }}>
        <p className="font-mono" style={{
          fontSize: '0.68rem', letterSpacing: '0.18em',
          color: '#8FAF9F', marginBottom: '1rem', fontWeight: 500,
        }}>
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
          Every hour spent chasing invoices, following up leads, or writing the same email again is an hour you're not growing.
        </p>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={stripRef}
        className="story-strip"
        style={{
          display: 'flex',
          gap: '1.25rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0.5rem 2.5rem 1.5rem',
          alignItems: 'stretch',
        }}
      >
        {STORIES.map((story, i) => (
          <StoryCard
            key={i}
            story={story}
            isActive={activeIndex === i}
            index={i}
            totalCards={STORIES.length}
          />
        ))}
      </div>

      {/* Hint arrow on desktop — fades out after first scroll */}
      <p className="font-mono" style={{
        textAlign: 'center',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        color: 'rgba(247,243,237,0.2)',
        marginTop: '0.5rem',
      }}>
        SCROLL TO EXPLORE →
      </p>
    </section>
  )
}
