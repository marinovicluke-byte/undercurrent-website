import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// easeOutExpo
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

const stats = [
  {
    id: 'always-on',
    display: '24/7',
    type: 'static',
    label: 'Always On',
  },
  {
    id: 'per-build',
    target: 2500,
    type: 'currency',
    format: (v) => `$${Math.round(v).toLocaleString()}`,
    label: 'Per Build',
    prefix: 'From ',
  },
  {
    id: 'admin',
    target: 80,
    type: 'percent',
    format: (v) => `${Math.round(v)}%`,
    label: 'Admin Eliminated',
  },
  {
    id: 'deploy',
    display: '48hr',
    type: 'static',
    label: 'Average Deploy',
  },
]

function StatItem({ stat, index, triggered }) {
  const numRef = useRef(null)
  const glowRef = useRef(null)
  const animRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!triggered || startedRef.current) return
    if (stat.type === 'static') return
    startedRef.current = true

    const DURATION = 1500
    const delay = index * 200

    // Pulse glow while counting
    gsap.to(glowRef.current, {
      opacity: 1,
      duration: 0.4,
      delay: delay / 1000,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: DURATION / 1000,
          ease: 'power2.in',
        })
      }
    })

    const startTime = performance.now() + delay
    let rafId

    const tick = (now) => {
      const elapsed = now - startTime
      if (elapsed < 0) { rafId = requestAnimationFrame(tick); return }

      const t = Math.min(elapsed / DURATION, 1)
      const eased = easeOutExpo(t)
      const current = eased * stat.target

      if (numRef.current) {
        const formatted = stat.format(current)
        numRef.current.textContent = stat.prefix ? `${stat.prefix}${formatted}` : formatted
      }

      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    animRef.current = rafId

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [triggered])

  const initialDisplay = stat.type === 'static'
    ? stat.display
    : stat.prefix
    ? `${stat.prefix}${stat.format(0)}`
    : stat.format(0)

  return (
    <div className="relative flex flex-col items-center md:items-start gap-2.5">
      {/* Sage glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '100px',
          height: '50px',
          backgroundColor: '#8FAF9F',
          borderRadius: '50%',
          filter: 'blur(24px)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      <span
        ref={numRef}
        style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400,
          color: '#1C1C1A',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {initialDisplay}
      </span>

      <span
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 300,
          fontSize: '0.9rem',
          letterSpacing: '0.07em',
          color: '#6B7C4A',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {stat.label}
      </span>
    </div>
  )
}

export default function StatsRow() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  // IntersectionObserver — fires count-up once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.children,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#F7F3ED', padding: '4rem 1.5rem' }}
    >
      <div className="max-w-7xl mx-auto">
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            fontWeight: 500,
            color: 'rgba(28,28,26,0.32)',
            marginBottom: '3rem',
          }}
        >
          BY THE NUMBERS
        </p>

        <div ref={gridRef} className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="stat-cell"
              style={{
                padding: '2.5rem 2rem',
                borderLeft: i % 2 === 1 ? '1px solid rgba(212,201,176,0.45)' : 'none',
                borderTop: i >= 2 ? '1px solid rgba(212,201,176,0.45)' : 'none',
              }}
            >
              <StatItem stat={stat} index={i} triggered={triggered} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
