import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

function NavWave({ scrolled }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const scrolledRef = useRef(scrolled)

  useEffect(() => { scrolledRef.current = scrolled }, [scrolled])

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
      { yFrac: 0.30, amp: 3.8, freq: 0.11, speed: 0.126,  alpha: 0.90, lw: 1.3 },
      { yFrac: 0.55, amp: 3.0, freq: 0.09, speed: -0.098, alpha: 0.55, lw: 0.9 },
      { yFrac: 0.78, amp: 2.2, freq: 0.13, speed: 0.182,  alpha: 0.30, lw: 0.6 },
    ]

    let t = 0
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)
      const base = scrolledRef.current ? '107,124,74' : '143,175,159'
      currents.forEach(c => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${base},${c.alpha})`
        ctx.lineWidth = c.lw
        ctx.setLineDash([])
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

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '52px', height: '20px', display: 'block', flexShrink: 0 }}
    />
  )
}

export default function Navbar({ ready = true, isSubPage = false }) {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hasAnimated = useRef(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  // IntersectionObserver on hero bottom edge (home page only)
  useEffect(() => {
    if (!onHome) {
      // On sub-pages, always use scroll-based detection
      const handleScroll = () => setScrolled(window.scrollY > 60)
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const hero = document.querySelector('#hero-sentinel')
    if (!hero) {
      const handleScroll = () => setScrolled(window.scrollY > 60)
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setScrolled(!entry.isIntersecting)
        })
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [onHome])

  // Entrance animation — fires when ready (after loader)
  useEffect(() => {
    if (!ready || hasAnimated.current) return
    hasAnimated.current = true

    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [ready])

  // Nav links — anchor-based on home, page links on sub-pages
  const links = onHome
    ? [
        { label: 'How it works', href: '#protocol' },
        { label: 'Services', href: '/services' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Business Audit', href: '/audit' },
        { label: 'About', href: '/about' },
      ]
    : [
        { label: 'How it works', href: '/#protocol' },
        { label: 'Services', href: '/services' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Business Audit', href: '/audit' },
        { label: 'About', href: '/about' },
      ]

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[200]"
        style={{
          opacity: isSubPage ? 1 : 0,
          width: 'calc(100% - 2rem)',
          maxWidth: scrolled ? '820px' : '1024px',
          transition: 'max-width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          className="rounded-[9999px] px-4 py-2.5 flex items-center justify-between"
          style={{
            backgroundColor: scrolled
              ? 'rgba(232,224,208,0.88)'
              : 'rgba(28,28,26,0.55)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            border: scrolled
              ? '1px solid rgba(212,201,176,0.6)'
              : '1px solid rgba(143,175,159,0.35)',
            boxShadow: scrolled
              ? '0 2px 24px rgba(28,28,26,0.08)'
              : '0 2px 24px rgba(0,0,0,0.35)',
            transition: 'background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        >
          {/* Wordmark */}
          <a href="/" style={{ textDecoration: 'none' }}>
            <div className="flex items-center gap-2">
              <span
                className="font-cormorant font-semibold"
                style={{
                  fontSize: '1.9rem',
                  letterSpacing: '-0.02em',
                  color: scrolled ? '#1C1C1A' : '#F7F3ED',
                  lineHeight: 1,
                  transition: 'color 0.5s ease',
                }}
              >
                UnderCurrent
              </span>
              <span className="hidden md:block"><NavWave scrolled={scrolled} /></span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  color: scrolled ? 'rgba(28,28,26,0.75)' : 'rgba(247,243,237,0.85)',
                  transition: 'color 0.5s ease',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {scrolled ? (
              <a href="https://cal.com/luke-marinovic-aqeosc/30min" target="_blank" rel="noopener noreferrer" className="btn-sage" style={{ padding: '0.5rem 1.25rem' }}>
                <span>Book a Call</span>
              </a>
            ) : (
              <a href="https://cal.com/luke-marinovic-aqeosc/30min" target="_blank" rel="noopener noreferrer" className="btn-sage-hero" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
                <span>Book a Call</span>
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{
              color: scrolled ? '#1C1C1A' : '#F7F3ED',
              transition: 'color 0.5s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <NavWave scrolled={scrolled} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="mt-2 rounded-4xl p-6 flex flex-col gap-4"
            style={{
              backgroundColor: 'rgba(232,224,208,0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,201,176,0.6)',
            }}
          >
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{ fontSize: '1.1rem', color: '#1C1C1A' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://cal.com/luke-marinovic-aqeosc/30min" target="_blank" rel="noopener noreferrer"
              className="btn-sage mt-2"
              style={{ justifyContent: 'center' }}
              onClick={() => setMobileOpen(false)}
            >
              <span>Book a Discovery Call</span>
            </a>
          </div>
        )}
      </nav>
    </>
  )
}
