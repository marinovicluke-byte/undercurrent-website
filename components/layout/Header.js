'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PillCTA from '@/components/ui/PillCTA'

// 3-wave glyph, inline SVG using currentColor (matches Footer's GlyphMono).
function GlyphMono({ size = 36 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 35 C 24.2 28, 37.8 28, 48 35 S 71.8 42, 82 35" />
        <path d="M14 48 C 24.2 41, 37.8 41, 48 48 S 71.8 55, 82 48" />
        <path d="M14 61 C 24.2 54, 37.8 54, 48 61 S 71.8 68, 82 61" />
      </g>
    </svg>
  )
}

function Wordmark({ size = 24 }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: size,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        color: 'var(--off-white)',
      }}
    >
      <b style={{ fontWeight: 700 }}>Under</b>Current
    </span>
  )
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Free Tools', href: '/audit' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
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
          className="uc-nav-row"
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
            aria-label="UnderCurrent Automations, home"
            className="uc-nav-logo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              justifySelf: 'start',
              color: 'var(--off-white)',
            }}
          >
            <GlyphMono size={36} />
            <Wordmark size={24} />
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
              <PillCTA label={ctaLabel} href="https://cal.com/luke-marinovic-aqeosc/30min" />
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
                borderRadius: 12,
                width: 48,
                height: 48,
                padding: 0,
                cursor: 'pointer',
                color: 'var(--off-white)',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 0 0 var(--blue)',
                transition: 'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          .uc-nav-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
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
          aria-label="UnderCurrent Automations, home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            color: 'var(--off-white)',
          }}
          onClick={onClose}
        >
          <GlyphMono size={30} />
          <Wordmark size={20} />
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
          padding: '24px var(--page-pad) 16px',
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
              padding: '22px 0',
              borderBottom: '1px solid var(--text-faint)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 10vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: isActive(link.href) ? 'var(--blue-light)' : 'var(--off-white)',
            }}
          >
            <span>{link.label}</span>
            <span aria-hidden style={{ fontSize: 24, opacity: 0.5 }}>→</span>
          </Link>
        ))}
      </nav>

      {/* CTA (sits right under nav links) */}
      <div
        style={{
          padding: '28px var(--page-pad) 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div className="uc-menu-cta" onClick={onClose}>
          <PillCTA label={ctaLabel} href="https://cal.com/luke-marinovic-aqeosc/30min" large />
        </div>
        <style>{`
          .uc-menu-cta > a,
          .uc-menu-cta > button {
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            padding: 22px 28px !important;
            font-size: 20px !important;
            border-radius: 999px !important;
          }
          .uc-menu-cta > a svg,
          .uc-menu-cta > button svg {
            width: 22px !important;
            height: 22px !important;
          }
        `}</style>
      </div>
    </div>
  )
}
