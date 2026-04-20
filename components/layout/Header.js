'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import PillCTA from '@/components/ui/PillCTA'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Audit', href: '/audit' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

const MOBILE_SECONDARY = [
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Process', href: '/process' },
  { label: 'ROI calculator', href: '/roi' },
  { label: 'Missed revenue tool', href: '/missed-revenue' },
]

export default function Header({ ctaLabel = "Let's talk" }) {
  const pathname = usePathname()
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: scrolled ? '12px var(--page-pad)' : '20px var(--page-pad)',
          background: scrolled ? 'rgba(18,18,16,0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(130%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(130%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--text-faint)' : '1px solid transparent',
          transition: 'background 220ms ease, padding 220ms ease, border-color 220ms ease, backdrop-filter 220ms ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            width: '100%',
            boxSizing: 'border-box',
            gap: 16,
          }}
        >
          <Link
            href="/"
            aria-label="UnderCurrent Automations — home"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              justifySelf: 'start',
            }}
          >
            <Image
              src="/brand/logo-horizontal-dark.svg"
              width={240}
              height={48}
              alt="UnderCurrent"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <div
            className="uc-nav-desktop"
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              background: scrolled ? 'transparent' : 'rgba(28,28,26,0.5)',
              border: scrolled ? '1px solid transparent' : '1px solid var(--text-faint)',
              borderRadius: 999,
              padding: 4,
              transition: 'background 220ms ease, border-color 220ms ease',
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`)
              const anyHovered = hoveredIdx !== null
              const isHovered = hoveredIdx === i
              const dim = anyHovered && !isHovered
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(i)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color:
                      isActive || isHovered ? 'var(--off-white)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(250,249,245,0.06)' : 'transparent',
                    padding: '7px 14px',
                    borderRadius: 999,
                    textDecoration: 'none',
                    opacity: dim ? 0.35 : 1,
                    transition: 'opacity 180ms ease, color 180ms ease, background 180ms ease',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side: CTA (desktop) + hamburger (mobile) */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div className="uc-nav-cta-desktop">
              <PillCTA label={ctaLabel} href="/contact" />
            </div>
            <button
              type="button"
              className="uc-nav-hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              style={{
                display: 'none',
                appearance: 'none',
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                borderRadius: 10,
                padding: 10,
                cursor: 'pointer',
                color: 'var(--off-white)',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0 0 var(--blue)',
                transition: 'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7 H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M4 12 H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M4 17 H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <MobileMenu
          pathname={pathname}
          ctaLabel={ctaLabel}
          onClose={() => setMenuOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .uc-nav-desktop { display: none !important; }
          .uc-nav-cta-desktop { display: none !important; }
          .uc-nav-hamburger { display: inline-flex !important; }
        }
        .uc-nav-hamburger:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 0 var(--blue);
        }
      `}</style>
    </>
  )
}

function MobileMenu({ pathname, ctaLabel, onClose }) {
  const isActive = href =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--charcoal-deep)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* Top bar inside the menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px var(--page-pad)',
          borderBottom: '1px solid var(--text-faint)',
        }}
      >
        <Link
          href="/"
          aria-label="UnderCurrent Automations — home"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          onClick={onClose}
        >
          <Image
            src="/brand/logo-horizontal-dark.svg"
            width={200}
            height={40}
            alt="UnderCurrent"
            priority
            unoptimized
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          style={{
            appearance: 'none',
            background: 'var(--charcoal)',
            border: '1px solid var(--text-faint)',
            borderRadius: 10,
            padding: 10,
            cursor: 'pointer',
            color: 'var(--off-white)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '3px 3px 0 0 var(--orange)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Primary links — big type */}
      <nav
        aria-label="Primary"
        style={{
          padding: '40px var(--page-pad) 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{
              padding: '18px 0',
              borderBottom: '1px solid var(--text-faint)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 6vw, 40px)',
              letterSpacing: '-0.025em',
              color: isActive(link.href) ? 'var(--blue-light)' : 'var(--off-white)',
            }}
          >
            <span>{link.label}</span>
            <span aria-hidden style={{ fontSize: 20, opacity: 0.5 }}>→</span>
          </Link>
        ))}
      </nav>

      {/* Secondary links — smaller, grouped */}
      <nav
        aria-label="Secondary"
        style={{
          padding: '8px var(--page-pad) 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 12,
          }}
        >
          More
        </span>
        {MOBILE_SECONDARY.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{
              padding: '12px 0',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: isActive(link.href) ? 'var(--blue-light)' : 'var(--text-secondary)',
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: 'auto',
          padding: '24px var(--page-pad) 40px',
          borderTop: '1px solid var(--text-faint)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div onClick={onClose}>
          <PillCTA label={ctaLabel} href="/contact" large />
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          Melbourne, Australia · Reply within 1 business day
        </p>
      </div>
    </div>
  )
}
