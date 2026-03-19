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
