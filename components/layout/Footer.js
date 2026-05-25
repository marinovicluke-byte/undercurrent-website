import Link from 'next/link'
import { SERVICES_V2 } from '@/lib/data/services-v2'
import { LOCATIONS } from '@/lib/data/locations'

const BRAND_TAG =
  'AI automation for Australian small businesses. Built in Melbourne. You own every workflow.'

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Company information', href: '/company-information' },
  { label: 'Process', href: '/process' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const TOOLS = [
  { label: 'Free audit', href: '/audit' },
]

const LEGAL = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml', external: true },
]

const SERVICES_LINKS = [
  { label: 'All services', href: '/services' },
  ...SERVICES_V2.map(s => ({
    label: s.name,
    href: `/${s.slug}`,
  })),
]

const LOCATION_LINKS = LOCATIONS.map(l => ({
  label: `AI Automation ${l.city}`,
  href: `/${l.slug}`,
}))

// Inline 3-wave glyph using currentColor so it inherits text color.
function GlyphMono({ size = 52 }) {
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

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="uc-footer-social"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: 10,
        border: '1px solid var(--text-faint)',
        background: 'var(--charcoal)',
        boxShadow: '3px 3px 0 0 var(--blue)',
        color: 'var(--off-white)',
        textDecoration: 'none',
        transition:
          'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
      }}
    >
      {children}
    </a>
  )
}

function NavColumn({ title, links }) {
  return (
    <div>
      <h3
        style={{
          margin: '0 0 18px',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {links.map(l => {
          const linkStyle = {
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: 'var(--off-white)',
            textDecoration: 'none',
            letterSpacing: '-0.005em',
          }
          return (
            <li key={l.href}>
              {l.external ? (
                <a href={l.href} className="uc-footer-link" style={linkStyle}>
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="uc-footer-link" style={linkStyle}>
                  {l.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0E0E0C',
        borderTop: '1px solid var(--text-faint)',
        color: 'var(--off-white)',
      }}
    >
      <style>{`
        .uc-footer-link { transition: color 140ms ease; }
        .uc-footer-link:hover { color: var(--blue-light); }
        .uc-footer-social:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 0 var(--blue);
        }
        @media (max-width: 900px) {
          .uc-footer-body { grid-template-columns: 1fr !important; gap: 48px !important; }
          .uc-footer-nav { grid-template-columns: repeat(2, 1fr) !important; }
          .uc-footer-base { grid-template-columns: 1fr !important; gap: 14px !important; }
          .uc-footer-base > * { justify-self: flex-start !important; }
        }
      `}</style>

      <div
        className="uc-footer-body"
        style={{
          maxWidth: 1280,
          margin: 0,
          padding: '96px var(--page-pad) 48px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Brand panel */}
        <div>
          <Link
            href="/"
            aria-label="UnderCurrent Automations, home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 18,
              color: 'var(--off-white)',
              textDecoration: 'none',
            }}
          >
            <GlyphMono size={52} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(32px, 3.6vw, 46px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'var(--off-white)',
              }}
            >
              <b style={{ fontWeight: 700 }}>Under</b>Current
            </span>
          </Link>

          <p
            style={{
              margin: '20px 0 28px',
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              maxWidth: 380,
            }}
          >
            {BRAND_TAG}
          </p>

          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: '90px 1fr',
              gap: 10,
              fontSize: 13,
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}
          >
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              Based
            </dt>
            <dd style={{ margin: 0, color: 'var(--off-white)' }}>Melbourne, VIC</dd>
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              Reply
            </dt>
            <dd style={{ margin: 0, color: 'var(--off-white)' }}>Within 1 business day</dd>
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              Email
            </dt>
            <dd style={{ margin: 0 }}>
              <a
                href="mailto:luke@undercurrentautomations.com"
                style={{ color: 'var(--blue-light)', textDecoration: 'none' }}
              >
                luke@undercurrentautomations.com
              </a>
            </dd>
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              Phone
            </dt>
            <dd style={{ margin: 0 }}>
              <a
                href="tel:+61438780815"
                style={{ color: 'var(--blue-light)', textDecoration: 'none' }}
              >
                0438 780 815
              </a>
            </dd>
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              Hours
            </dt>
            <dd style={{ margin: 0, color: 'var(--off-white)' }}>Mon–Fri 09:00–17:00 AEDT</dd>
            <dt
              style={{
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontFamily: 'var(--font-display)',
              }}
            >
              ABN
            </dt>
            <dd style={{ margin: 0, color: 'var(--off-white)' }}>23 368 496 814</dd>
          </dl>

          <div style={{ display: 'flex', gap: 8 }} aria-label="Social">
            <SocialIcon href="https://www.instagram.com/undercurrent.automations/" label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/company/undercurrent-automations/" label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 10 L8 16 M8 7 L8 7.01 M12 16 L12 10 M12 13 C 12 10 16 10 16 13 L 16 16" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://x.com/UC_Automations" label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4 L20 20 M20 4 L4 20" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.facebook.com/profile.php?id=61578553167947" label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14 8 L14 5 C 14 3.5, 15 3, 16.5 3 L 18 3 L 18 7 L 16.5 7 C 15.8 7, 15.5 7.3, 15.5 8 L 15.5 10 L 18 10 L 17.5 13.5 L 15.5 13.5 L 15.5 21 L 12 21 L 12 13.5 L 10 13.5 L 10 10 L 12 10 L 12 8 Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://www.google.com/maps/place/Undercurrent+Automations/data=!4m2!3m1!1s0x0:0xfa88043129a24340" label="Google Business Profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21.8 10.2H12v3.6h5.7C17 16.2 14.7 17.6 12 17.6c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c1.4 0 2.7.5 3.7 1.4l2.6-2.6C16.5 3.5 14.4 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.1 0-.6-.1-1.4-.2-2.1z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Nav columns */}
        <nav
          className="uc-footer-nav"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40,
            paddingTop: 12,
          }}
        >
          <NavColumn title="Services" links={SERVICES_LINKS} />
          <NavColumn title="Company" links={COMPANY} />
          <div>
            <NavColumn title="Tools" links={TOOLS} />
            {LOCATION_LINKS.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <NavColumn title="Locations" links={LOCATION_LINKS} />
              </div>
            )}
            <div style={{ marginTop: 28 }}>
              <NavColumn title="Legal" links={LEGAL} />
            </div>
          </div>
        </nav>
      </div>

      <div
        className="uc-footer-base"
        style={{
          maxWidth: 1280,
          margin: 0,
          padding: '22px var(--page-pad) 36px',
          borderTop: '1px solid var(--text-faint)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--sage)',
            }}
          />
          System operational
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            color: 'var(--text-muted)',
            justifySelf: 'center',
          }}
        >
          © {new Date().getFullYear()} UnderCurrent Automations · All rights reserved
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          Built by UnderCurrent Automations
        </span>
      </div>
    </footer>
  )
}
