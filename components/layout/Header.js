'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PillCTA from '@/components/ui/PillCTA'

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
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
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

const MEGA_SERVICES = [
  {
    num: '01',
    accentHex: '#6A8DAD', accentLt: '#8AAEC8', accentRgb: '106,141,173',
    name: 'Search Ecosystem',
    href: '/seo-ai-visibility',
    tagline: 'Rank everywhere your buyers are looking.',
    desc: 'SEO, AEO, PPC, and Maps — wired together so the same work earns Google rankings, ChatGPT citations, and local visibility at once.',
    items: ['Local SEO', 'AI Search (AEO)', 'PPC', 'Google Profile Management', 'National SEO', 'Small Business SEO', 'Technical SEO', 'Google Places'],
  },
  {
    num: '02',
    accentHex: '#8FAF9F', accentLt: '#A8C4B8', accentRgb: '143,175,159',
    name: 'Website Design',
    href: '/website-design',
    tagline: 'The face of your business, built to convert.',
    desc: 'Marketing sites and SEO migrations built on Next.js, wired to your CRM, calendar and payment stack.',
    items: ['Custom Website', 'SEO Website Migration'],
  },
  {
    num: '03',
    accentHex: '#E07A55', accentLt: '#E8967A', accentRgb: '224,122,85',
    name: 'AI Automation',
    href: '/custom-integrations',
    tagline: 'Automate the work that eats your week.',
    desc: 'Lead, review, content and sales automation wired into one stack using n8n, Make, and direct APIs.',
    items: ['Lead Automation', 'Review Automation', 'Marketing & Ads Automation', 'Content Automation', 'Sales Automation', 'CRM Automation', 'Email Automation', 'Reporting Automation'],
  },
  {
    num: '04',
    accentHex: '#E07A55', accentLt: '#E8967A', accentRgb: '224,122,85',
    name: 'Custom Training',
    href: '/ai-strategy-training',
    tagline: 'The right tools. Used the right way.',
    desc: 'Hands-on training so your team uses AI with confidence, from ChatGPT basics to Claude Code for power users.',
    items: ['AI Training Workshop', 'ChatGPT Training', 'Claude Training', 'Claude Co-work Training', 'Claude Code Training', 'AI Workflow Design', 'Tool Selection Audits', 'Team Onboarding'],
  },
]

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Free Tools', href: '/audit' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Header({ ctaLabel = "Let's talk" }) {
  const pathname = usePathname()
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const wrapRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    if (!megaOpen) return
    const onMouseDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMegaOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMegaOpen(false) }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [megaOpen])

  const isServicesActive = megaOpen || pathname === '/services' ||
    MEGA_SERVICES.some(s => pathname === s.href || pathname.startsWith(s.href + '/'))

  return (
    <>
      <div ref={wrapRef} style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <nav
          style={{
            padding: scrolled || megaOpen ? '12px var(--page-pad)' : '20px var(--page-pad)',
            background: megaOpen
              ? 'rgba(28,28,26,1)'
              : scrolled
              ? 'rgba(18,18,16,0.72)'
              : 'transparent',
            backdropFilter: scrolled || megaOpen ? 'blur(14px) saturate(130%)' : 'none',
            WebkitBackdropFilter: scrolled || megaOpen ? 'blur(14px) saturate(130%)' : 'none',
            borderBottom: megaOpen
              ? '1px solid rgba(250,249,245,0.09)'
              : scrolled
              ? '1px solid var(--text-faint)'
              : '1px solid transparent',
            transition: 'background 220ms ease, padding 220ms ease, border-color 220ms ease',
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

            <div
              className="uc-nav-desktop"
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                background: scrolled || megaOpen ? 'transparent' : 'rgba(28,28,26,0.5)',
                border: scrolled || megaOpen ? '1px solid transparent' : '1px solid var(--text-faint)',
                borderRadius: 999,
                padding: 4,
                transition: 'background 220ms ease, border-color 220ms ease',
              }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = link.mega
                  ? isServicesActive
                  : link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`)
                const isHovered = hoveredIdx === i
                const dim = hoveredIdx !== null && !isHovered

                if (link.mega) {
                  return (
                    <button
                      key={link.label}
                      type="button"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onClick={() => setMegaOpen(v => !v)}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive || isHovered ? 'var(--off-white)' : 'var(--text-secondary)',
                        background: isActive ? 'rgba(250,249,245,0.06)' : 'transparent',
                        padding: '7px 14px',
                        borderRadius: 999,
                        border: 'none',
                        cursor: 'pointer',
                        opacity: dim ? 0.35 : 1,
                        transition: 'opacity 180ms ease, color 180ms ease, background 180ms ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      {link.label}
                      <span style={{
                        fontSize: 9,
                        display: 'inline-block',
                        transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 220ms ease',
                        opacity: 0.6,
                      }}>▾</span>
                    </button>
                  )
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredIdx(i)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive || isHovered ? 'var(--off-white)' : 'var(--text-secondary)',
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

        {megaOpen && (
          <MegaMenu
            activeIdx={activeService}
            onSetActive={setActiveService}
            onClose={() => setMegaOpen(false)}
          />
        )}
      </div>

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
        .uc-mega-item:hover {
          border-color: var(--item-accent) !important;
          box-shadow: 3px 3px 0 0 var(--item-accent) !important;
          transform: translate(-1px, -1px);
          color: var(--off-white) !important;
        }
      `}</style>
    </>
  )
}

function MegaMenu({ activeIdx, onSetActive, onClose }) {
  const s = MEGA_SERVICES[activeIdx]

  return (
    <div
      style={{
        background: '#1C1C1A',
        borderBottom: `3px solid ${s.accentHex}`,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        transition: 'border-color 200ms ease',
      }}
    >
      {/* Sidebar */}
      <div style={{ borderRight: '1px solid rgba(250,249,245,0.09)', padding: '16px 0' }}>
        {MEGA_SERVICES.map((svc, i) => (
          <button
            key={svc.num}
            type="button"
            onClick={() => onSetActive(i)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: '100%',
              padding: '14px 24px',
              background: i === activeIdx ? `rgba(${svc.accentRgb},0.07)` : 'transparent',
              border: 'none',
              borderLeft: `3px solid ${i === activeIdx ? svc.accentHex : 'transparent'}`,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 140ms ease, border-color 140ms ease',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: i === activeIdx ? svc.accentLt : 'rgba(250,249,245,0.45)', fontFamily: 'var(--font-body)' }}>
              {svc.num}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: i === activeIdx ? svc.accentLt : 'var(--off-white)', fontFamily: 'var(--font-display)' }}>
              {svc.name}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(250,249,245,0.45)', fontFamily: 'var(--font-body)' }}>
              {svc.tagline}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div style={{ padding: '28px 36px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: s.accentLt, marginBottom: 4, fontFamily: 'var(--font-body)' }}>
            {s.num} — {s.name}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: s.accentLt, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
            {s.tagline}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(250,249,245,0.55)', maxWidth: 480, lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
            {s.desc}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {s.items.map(item => (
            <Link
              key={item}
              href={s.href}
              onClick={onClose}
              className="uc-mega-item"
              style={{
                '--item-accent': s.accentHex,
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid rgba(250,249,245,0.09)',
                textDecoration: 'none',
                color: 'rgba(250,249,245,0.85)',
                fontSize: 13,
                fontWeight: 500,
                background: 'rgba(250,249,245,0.04)',
                transition: 'border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease, color 140ms ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.accentHex, flexShrink: 0, display: 'inline-block' }} />
              {item}
            </Link>
          ))}
        </div>

        <Link
          href={s.href}
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: s.accentLt,
            textDecoration: 'none',
            paddingTop: 12,
            borderTop: '1px solid rgba(250,249,245,0.09)',
            marginTop: 2,
            fontFamily: 'var(--font-body)',
          }}
        >
          View all {s.name} services →
        </Link>
      </div>
    </div>
  )
}

function MobileMenu({ pathname, ctaLabel, onClose }) {
  const [servicesOpen, setServicesOpen] = useState(false)
  const isActive = href =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const bigLinkStyle = (active) => ({
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
    color: active ? 'var(--blue-light)' : 'var(--off-white)',
  })

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
      {/* Top bar */}
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
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--off-white)' }}
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

      {/* Nav links */}
      <nav aria-label="Primary" style={{ padding: '24px var(--page-pad) 16px', display: 'flex', flexDirection: 'column' }}>
        <Link href="/" onClick={onClose} style={bigLinkStyle(isActive('/'))}>
          <span>Home</span>
          <span aria-hidden style={{ fontSize: 24, opacity: 0.5 }}>→</span>
        </Link>

        {/* Services accordion */}
        <div style={{ borderBottom: '1px solid var(--text-faint)' }}>
          <button
            type="button"
            onClick={() => setServicesOpen(v => !v)}
            style={{
              ...bigLinkStyle(isActive('/services') || MEGA_SERVICES.some(s => isActive(s.href))),
              background: 'none',
              border: 'none',
              borderBottom: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <span>Services</span>
            <span aria-hidden style={{
              fontSize: 24,
              opacity: 0.5,
              display: 'inline-block',
              transform: servicesOpen ? 'rotate(90deg)' : 'none',
              transition: 'transform 250ms ease',
            }}>→</span>
          </button>
          {servicesOpen && (
            <div style={{ paddingBottom: 20, display: 'flex', flexDirection: 'column' }}>
              {MEGA_SERVICES.map(svc => (
                <Link
                  key={svc.num}
                  href={svc.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(250,249,245,0.06)',
                    textDecoration: 'none',
                    color: isActive(svc.href) ? svc.accentLt : 'rgba(250,249,245,0.75)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(24px, 6vw, 36px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: svc.accentLt, fontFamily: 'var(--font-body)', flexShrink: 0 }}>{svc.num}</span>
                    {svc.name}
                  </span>
                  <span aria-hidden style={{ fontSize: 16, opacity: 0.4, flexShrink: 0 }}>→</span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--blue-light)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                View all services →
              </Link>
            </div>
          )}
        </div>

        {[
          { label: 'Free Tools', href: '/audit' },
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog' },
        ].map(link => (
          <Link key={link.href} href={link.href} onClick={onClose} style={bigLinkStyle(isActive(link.href))}>
            <span>{link.label}</span>
            <span aria-hidden style={{ fontSize: 24, opacity: 0.5 }}>→</span>
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ padding: '28px var(--page-pad) 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="uc-menu-cta" onClick={onClose}>
          <PillCTA label={ctaLabel} href="https://cal.com/luke-marinovic-aqeosc/30min" large />
        </div>
        <style>{`
          .uc-menu-cta > a, .uc-menu-cta > button {
            display: flex !important;
            width: 100% !important;
            justify-content: center !important;
            padding: 22px 28px !important;
            font-size: 20px !important;
            border-radius: 999px !important;
          }
          .uc-menu-cta > a svg, .uc-menu-cta > button svg {
            width: 22px !important;
            height: 22px !important;
          }
        `}</style>
      </div>
    </div>
  )
}
