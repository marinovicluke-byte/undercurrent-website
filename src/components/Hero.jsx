import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function Hero({ ready = true }) {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)
  const videoRef = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ready || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 })

      tl.fromTo(videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(bodyRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.25'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '100dvh',
        minHeight: '640px',
        background: '#1C1C1A',
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Inward masking gradients — fade video into dark bg on all edges */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
            'linear-gradient(to right,  #1C1C1A 0%, transparent 22%)',
            'linear-gradient(to left,   #1C1C1A 0%, transparent 22%)',
          ].join(', '),
        }}
      />

      {/* Content — left-aligned, top-positioned */}
      <div
        className="absolute inset-0 flex flex-col px-6 md:px-12"
        style={{ paddingTop: '8rem', paddingBottom: '5rem', maxWidth: '1200px' }}
      >
        {/* Headline */}
        <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
          <span
            className="block font-dm"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F7F3ED',
              lineHeight: 1.0,
            }}
          >
            Your Business Should Run
          </span>
          <span
            className="block font-dm"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'rgba(143,175,159,0.9)',
              lineHeight: 1.05,
              marginTop: '0.03em',
            }}
          >
            Without You Doing Everything.
          </span>
        </h1>

        {/* Description */}
        <p
          ref={bodyRef}
          className="font-dm"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            fontWeight: 300,
            color: 'rgba(232,224,208,0.65)',
            lineHeight: 1.7,
            maxWidth: '44ch',
            marginTop: '1.5rem',
            opacity: 0,
          }}
        >
          We build AI systems that chase your leads, follow up your clients, and clear your inbox — so you can get back to the work that actually grows your business.
        </p>

        {/* Single CTA */}
        <div ref={ctaRef} style={{ opacity: 0, marginTop: '2rem' }}>
          <a
            href="/audit"
            className="btn-sage-hero"
            style={{ fontSize: '0.9rem', padding: '0.75rem 1.6rem', flexDirection: 'column', gap: '0.2rem', alignItems: 'center' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              See What You're Losing Each Month
              <ArrowRight size={16} />
            </span>
            <span className="font-mono" style={{
              fontSize: '0.55rem',
              letterSpacing: '0.14em',
              color: 'rgba(212,201,176,0.55)',
              position: 'relative',
              zIndex: 1,
            }}>
              FREE · TAKES 3 MINUTES
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator — bottom left, clearly below all content */}
      <div
        className="absolute font-mono"
        style={{
          bottom: '5.5rem',
          left: '1.5rem',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          color: 'rgba(212,201,176,0.6)',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        ↓ scroll to explore
      </div>

      {/* Bottom wave — charcoal rises into the hero gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 3,
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '80px', display: 'block' }}
        >
          <path
            d="M0,44 C240,80 480,12 720,52 C960,80 1200,16 1440,48 L1440,80 L0,80 Z"
            fill="#1C1C1A"
          />
        </svg>
      </div>

      {/* Sentinel for navbar IntersectionObserver */}
      <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
    </section>
  )
}
