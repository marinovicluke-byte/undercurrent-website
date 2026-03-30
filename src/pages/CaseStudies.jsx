import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'

function OceanCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const currents = [
      { yFrac: 0.2, amp: 40, freq: 0.003, speed: 0.008, alpha: 0.08, lw: 2 },
      { yFrac: 0.35, amp: 30, freq: 0.004, speed: -0.006, alpha: 0.06, lw: 1.5 },
      { yFrac: 0.5, amp: 50, freq: 0.002, speed: 0.01, alpha: 0.07, lw: 2.5 },
      { yFrac: 0.65, amp: 25, freq: 0.005, speed: -0.007, alpha: 0.05, lw: 1 },
      { yFrac: 0.8, amp: 35, freq: 0.003, speed: 0.009, alpha: 0.06, lw: 1.8 },
    ]

    let t = 0
    const draw = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach(c => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(143,175,159,${c.alpha})`
        ctx.lineWidth = c.lw
        for (let x = 0; x <= W; x += 4) {
          const y = c.yFrac * H + Math.sin(x * c.freq + t * c.speed * 60) * c.amp + Math.cos(x * c.freq * 0.5 + t * c.speed * 30) * c.amp * 0.4
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}
    />
  )
}

export default function CaseStudies() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3)
    tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
  }, [])

  const tabs = ['01', '02', '03', '04']

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title="Case Studies - AI Automation Results | UnderCurrent"
        description="See how we've helped small businesses reclaim their time and scale their operations with AI automation. Real businesses, real results."
        canonical="https://www.undercurrentautomations.com/case-study"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'UnderCurrent Case Studies',
          description: 'Real results from AI automation for small businesses. See how we have helped businesses reclaim their time and scale operations.',
          url: 'https://www.undercurrentautomations.com/case-study',
          provider: {
            '@type': 'Organization',
            '@id': 'https://www.undercurrentautomations.com/#business',
            name: 'UnderCurrent',
          },
        }}
      />
      <ScrollProgressBar />
      <Navbar ready isSubPage />
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100dvh', minHeight: '600px', background: '#1C1C1A' }}
      >
        <video
          ref={videoRef}
          preload="auto"
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.35, pointerEvents: 'none',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
            'linear-gradient(to right,  #1C1C1A 0%, transparent 22%)',
            'linear-gradient(to left,   #1C1C1A 0%, transparent 22%)',
          ].join(', '),
        }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: '3rem' }}>
          <p className="font-mono mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)' }}>
            CASE STUDIES
          </p>
          <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
              AI Automation
            </span>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
              Case Studies.
            </span>
          </h1>
          <p ref={subRef} className="font-dm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '48ch', marginTop: '2rem', opacity: 0 }}>
            Real businesses. Real results. See how we've helped small businesses reclaim their time and scale their operations with AI automation.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(143,175,159,0.35)' }}>
          ↓ scroll to explore
        </div>
        <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
      </section>

      {/* ── Ambient background ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: '700px', height: '600px', left: '-250px', top: '60%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.1) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-150px', top: '70%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.07) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
      </div>

      <OceanCanvas />

      {/* ── Album section ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '7.5rem 1.5rem 7.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(145deg, rgba(143,175,159,0.06) 0%, rgba(28,28,26,0.3) 100%)',
              border: '1px solid rgba(143,175,159,0.12)',
              borderRadius: '1.5rem',
              minHeight: '420px',
              overflow: 'hidden',
            }}>
              {/* Tab edges */}
              <div style={{
                position: 'absolute', right: '-1px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', gap: '0.35rem', zIndex: 20,
              }}>
                {tabs.map((label, i) => (
                  <div
                    key={label}
                    style={{
                      width: i === 0 ? '36px' : '36px',
                      height: '52px',
                      background: i === 0 ? 'rgba(143,175,159,0.12)' : 'rgba(143,175,159,0.08)',
                      border: `1px solid ${i === 0 ? 'rgba(143,175,159,0.35)' : 'rgba(143,175,159,0.18)'}`,
                      borderRight: 'none',
                      borderRadius: '0.5rem 0 0 0.5rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.width = '44px'; e.currentTarget.style.background = 'rgba(143,175,159,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.width = '36px'; e.currentTarget.style.background = i === 0 ? 'rgba(143,175,159,0.12)' : 'rgba(143,175,159,0.08)' }}
                  >
                    <span className="font-mono" style={{
                      fontSize: '0.5rem', color: 'rgba(143,175,159,0.6)',
                      letterSpacing: '0.1em', writingMode: 'vertical-rl', textOrientation: 'mixed',
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Album page content: Coming Soon */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', minHeight: '420px',
                padding: '4rem 3rem', textAlign: 'center',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '1rem',
                  background: 'rgba(143,175,159,0.08)', border: '1px solid rgba(143,175,159,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '2rem',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8FAF9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <p className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8FAF9F', marginBottom: '0.75rem' }}>
                  COMING SOON
                </p>
                <h2 className="font-cormorant" style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400,
                  color: '#F7F3ED', marginBottom: '0.75rem',
                }}>
                  Case Studies Arriving Shortly
                </h2>
                <p className="font-dm" style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.7, maxWidth: '360px' }}>
                  We're documenting the results from our latest automation builds. Check back soon to see the impact.
                </p>
              </div>

              {/* Wave animation inside album */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', overflow: 'hidden', opacity: 0.35 }}>
                <svg style={{ position: 'absolute', bottom: 0, width: '200%', height: '80px', animation: 'albumWave1 8s ease-in-out infinite' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
                  <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1440,20 1440,40 L1440,80 L0,80 Z" fill="rgba(143,175,159,0.15)" />
                </svg>
                <svg style={{ position: 'absolute', bottom: 0, width: '200%', height: '80px', animation: 'albumWave2 12s ease-in-out infinite reverse', opacity: 0.5 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
                  <path d="M0,50 C240,20 480,70 720,40 C960,10 1200,60 1440,35 L1440,80 L0,80 Z" fill="rgba(143,175,159,0.1)" />
                </svg>
                <svg style={{ position: 'absolute', bottom: 0, width: '200%', height: '80px', animation: 'albumWave1 10s ease-in-out infinite', opacity: 0.3 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
                  <path d="M0,35 C300,65 600,15 900,45 C1100,60 1300,25 1440,45 L1440,80 L0,80 Z" fill="rgba(143,175,159,0.08)" />
                </svg>
              </div>

              {/* Flip hint */}
              <div className="font-mono" style={{
                position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
                fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(143,175,159,0.3)', zIndex: 15,
              }}>
                CLICK TABS TO BROWSE
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Pages ── */}
      <section style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {[
              { href: '/roi', label: 'ROI Calculator', desc: 'See exactly how much time and money AI automation can save your business.' },
              { href: '/audit', label: 'Free Business Audit', desc: 'Get a personalised breakdown of where your business is leaking time.' },
              { href: '/contact', label: 'Get in Touch', desc: 'Ready to talk? Reach out and let\'s discuss your automation needs.' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  flex: '1 1 240px', maxWidth: '280px',
                  padding: '1.25rem 1.5rem',
                  background: 'linear-gradient(145deg, rgba(143,175,159,0.05) 0%, rgba(28,28,26,0.2) 100%)',
                  border: '1px solid rgba(143,175,159,0.1)',
                  borderRadius: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#F7F3ED', marginBottom: '0.3rem' }}>{link.label}</p>
                <p className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.6, margin: 0 }}>{link.desc}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes albumWave1 { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-25%); } }
        @keyframes albumWave2 { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-25%); } }
      `}</style>

      <Footer />
    </div>
  )
}
