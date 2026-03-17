import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

// Canvas-based water current animation
function WaterCanvas({ opacity }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Hi-DPI — cap dpr at 2 on mobile to reduce canvas memory
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    let visible = true
    const visObserver = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    visObserver.observe(canvas)
    // Throttle to 30fps on mobile to reduce jank
    const isMobile = window.innerWidth < 768
    let lastFrame = 0
    const frameInterval = isMobile ? 33 : 16

    // Each "current" is a sine-based ribbon that flows horizontally
    // and gently bobs vertically over time
    const currents = [
      // { yBase, amplitude, frequency, speed, phase, color, lineWidth, dashLen, gapLen }
      // Outer wide slow sage current
      { yFrac: 0.38, amp: 38, freq: 0.008, speed: 0.18, phase: 0,    color: 'rgba(143,175,159,0.20)', lw: 1.0,  dash: 0,   gap: 0 },
      // Second sage, drifts opposite direction
      { yFrac: 0.48, amp: 28, freq: 0.010, speed: -0.14, phase: 1.2, color: 'rgba(143,175,159,0.16)', lw: 0.8,  dash: 0,   gap: 0 },
      // Sand tone, mid
      { yFrac: 0.52, amp: 20, freq: 0.013, speed: 0.22, phase: 2.4,  color: 'rgba(212,201,176,0.13)', lw: 0.7,  dash: 0,   gap: 0 },
      // Faster thin wisp, sage
      { yFrac: 0.44, amp: 44, freq: 0.007, speed: -0.28, phase: 0.6, color: 'rgba(143,175,159,0.12)', lw: 0.5,  dash: 0,   gap: 0 },
      // Broken dashed current — sand, slow
      { yFrac: 0.56, amp: 16, freq: 0.011, speed: 0.12, phase: 3.6,  color: 'rgba(212,201,176,0.18)', lw: 1.2,  dash: 60,  gap: 90 },
      // Tight ripple, sage bright
      { yFrac: 0.50, amp: 12, freq: 0.018, speed: 0.35, phase: 1.8,  color: 'rgba(143,175,159,0.22)', lw: 0.6,  dash: 0,   gap: 0 },
      // Very slow deep sand undulation
      { yFrac: 0.42, amp: 52, freq: 0.005, speed: -0.08, phase: 4.2, color: 'rgba(212,201,176,0.09)', lw: 1.5,  dash: 0,   gap: 0 },
      // Small fast ripple, sage
      { yFrac: 0.54, amp: 8,  freq: 0.022, speed: 0.42, phase: 2.0,  color: 'rgba(143,175,159,0.14)', lw: 0.4,  dash: 40,  gap: 70 },
    ]

    // Slow vertical drift: each current's yFrac gently oscillates
    const driftPhases = currents.map((_, i) => i * 0.7)
    const driftAmps   = [0.035, 0.028, 0.022, 0.040, 0.018, 0.012, 0.044, 0.015]
    const driftSpeeds = [0.0004, 0.0003, 0.0005, 0.00035, 0.00025, 0.0006, 0.0002, 0.0007]

    let t = 0

    const draw = (timestamp) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visible) return
      if (timestamp - lastFrame < frameInterval) return
      lastFrame = timestamp

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      currents.forEach((c, i) => {
        // Vertical drift
        const drift = Math.sin(t * driftSpeeds[i] * 1000 + driftPhases[i]) * driftAmps[i]
        const yCenter = (c.yFrac + drift) * H

        ctx.beginPath()
        ctx.strokeStyle = c.color
        ctx.lineWidth = c.lw
        ctx.lineCap = 'round'

        if (c.dash > 0) {
          ctx.setLineDash([c.dash, c.gap])
          // Animate dash offset so it crawls along
          ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap)
        } else {
          ctx.setLineDash([])
        }

        // Draw the sine wave across full width with slight x-extend for seamless wrap
        const step = isMobile ? 6 : 4
        for (let x = -step; x <= W + step; x += step) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          if (x === -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.stroke()
      })

      t += 0.016 // ~60fps increment
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      visObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Hero({ ready = true }) {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const hasAnimated = useRef(false)
  const canvasOpacity = useRef(0)
  const canvasElRef = useRef(null)

  useEffect(() => {
    if (!ready || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 })

      // Background glow + water canvas bloom in together
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
      )
      .fromTo(ringRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power2.out' },
        '<'
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
        background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 30%, #3d4f42 55%, #8FAF9F 80%, #D4C9B0 100%)',
      }}
    >
      {/* Ambient radial glow — centred sage bloom */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          maxWidth: '900px',
          height: '80vw',
          maxHeight: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(143,175,159,0.22) 0%, rgba(143,175,159,0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
        }}
      />

      {/* Water current canvas — full section */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <WaterCanvas opacity={1} />
      </div>

      {/* Content — centred */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: '5rem' }}
      >
        {/* Headline */}
        <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
          <span
            className="block font-dm"
            style={{
              fontSize: 'clamp(3.8rem, 9vw, 9.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F7F3ED',
              lineHeight: 1.0,
            }}
          >
            Less Work,
          </span>
          <span
            className="block font-cormorant"
            style={{
              fontSize: 'clamp(3.8rem, 9vw, 9.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'rgba(143,175,159,0.9)',
              lineHeight: 1.05,
              marginTop: '0.08em',
            }}
          >
            More Growth.
          </span>
        </h1>

        {/* Description */}
        <p
          ref={bodyRef}
          className="font-dm"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.18rem)',
            fontWeight: 300,
            color: 'rgba(232,224,208,0.65)',
            lineHeight: 1.7,
            maxWidth: '42ch',
            marginTop: '2rem',
            opacity: 0,
          }}
        >
          We automate the busywork so your business grows faster.<br />
          You focus on the work you love.<br />
          We handle the rest.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0, marginTop: '2.5rem' }}>
          <a href="https://cal.com/luke-marinovic-aqeosc/30min" target="_blank" rel="noopener noreferrer" className="btn-sage-hero" style={{ fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Book a Workflow Review
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator — bottom centre */}
      <div
        className="absolute bottom-6 left-1/2 font-mono"
        style={{
          transform: 'translateX(-50%)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'rgba(212,201,176,0.35)',
          whiteSpace: 'nowrap',
        }}
      >
        ↓ scroll to explore
      </div>

      {/* Sentinel for navbar IntersectionObserver */}
      <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
    </section>
  )
}
