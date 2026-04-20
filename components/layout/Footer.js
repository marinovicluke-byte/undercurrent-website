import Link from 'next/link'
import { SERVICES } from '@/lib/data/services'
import { LOCATIONS } from '@/lib/data/locations'

const BRAND_TAG =
  'AI automation for Australian small businesses. Built in Melbourne. You own every workflow.'

const COMPANY = [
  { label: 'About', href: '/about' },
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
]

function titleCaseLabel(str) {
  return str
    .split(' ')
    .map(w => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ')
}

const SERVICES_LINKS = [
  { label: 'All services', href: '/services' },
  ...SERVICES.map(s => ({
    label: s.displayName || titleCaseLabel(s.label),
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
      <h4
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
      </h4>
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
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="uc-footer-link"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                color: 'var(--off-white)',
                textDecoration: 'none',
                letterSpacing: '-0.005em',
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
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
            aria-label="UnderCurrent Automations — home"
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
          </dl>

          {/* Social tiles hidden until real URLs are wired. Re-enable by passing
              real Instagram/LinkedIn/X URLs to the SocialIcon href props. */}
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
