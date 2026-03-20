import { FileText, Instagram, Calculator, CalendarDays, Facebook } from 'lucide-react'

const tiles = [
  {
    Icon: CalendarDays,
    label: 'FREE AUDIT',
    title: 'Book an Audit Review',
    sub: 'Get a free walkthrough of where your business is leaking time and money.',
    cta: 'Book Your Audit',
    href: '/#contact',
    primary: true,
  },
  {
    Icon: Calculator,
    label: 'CALCULATOR',
    title: 'Audit ROI Calculator',
    sub: 'See exactly how many hours and dollars you lose to manual work each week.',
    cta: 'Calculate Now',
    href: '/calculator',
    primary: false,
  },
  {
    Icon: FileText,
    label: 'CASE STUDIES',
    title: 'See Real Results',
    sub: 'Real businesses, real outcomes. See what automation looks like in practice.',
    cta: 'View Case Studies',
    href: '/case-study',
    primary: false,
  },
  {
    Icon: Instagram,
    label: 'SOCIAL',
    title: 'Follow Along',
    sub: 'Behind-the-scenes automation tips and real client wins.',
    cta: 'Follow Us',
    href: 'https://www.instagram.com/undercurrent.ai',
    primary: false,
    external: true,
  },
]

export default function Footer() {
  const services = [
    { label: 'Onboarding', href: '/services#onboarding' },
    { label: 'Customer Experience', href: '/services#customer-experience' },
    { label: 'Sales Automation', href: '/services#sales' },
    { label: 'Content Design', href: '/services#content-design' },
    { label: 'Personal Assistant', href: '/services#personal-assistant' },
  ]
  const company = [
    { label: 'About', href: '/about' },
    { label: 'How it works', href: '/#protocol' },
    { label: 'Contact', href: '/#contact' },
  ]
  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ]

  return (
    <footer style={{ backgroundColor: '#1C1C1A', borderRadius: '4rem 4rem 0 0', overflow: 'hidden', position: 'relative' }}>

      {/* ── Ambient background ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '900px', height: '700px', left: '-250px', top: '-100px', background: 'radial-gradient(ellipse, rgba(143,175,159,0.09) 0%, transparent 68%)' }} />
        <div style={{ position: 'absolute', width: '700px', height: '600px', right: '-180px', top: '100px', background: 'radial-gradient(ellipse, rgba(143,175,159,0.07) 0%, transparent 68%)' }} />
        <div style={{ position: 'absolute', width: '600px', height: '400px', left: '25%', bottom: '5%', background: 'radial-gradient(ellipse, rgba(212,201,176,0.06) 0%, transparent 68%)' }} />
      </div>

      {/* ── Tile CTA section ── */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '860px', margin: '0 auto', padding: '5.5rem 1.5rem 4.5rem' }}>

        {/* Label badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ border: '1px solid rgba(143,175,159,0.28)', padding: '0.28rem 0.9rem' }}>
            <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: '#8FAF9F' }}>
              WHAT&apos;S NEXT
            </p>
          </div>
        </div>

        {/* Heading */}
        <h2
          className="font-cormorant"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 400,
            color: '#F7F3ED',
            lineHeight: 1.2,
            marginBottom: '3rem',
            letterSpacing: '-0.01em',
          }}
        >
          Take the Next Step
        </h2>

        {/* 2×2 tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '0' }}>
          {tiles.map(({ Icon, label, title, sub, cta, href, primary, external }) => (
            <div
              key={title}
              style={{
                background: 'linear-gradient(135deg, rgba(143,175,159,0.07) 0%, rgba(28,28,26,0.15) 100%)',
                border: '1px solid rgba(143,175,159,0.12)',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Icon + label row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  background: 'rgba(143,175,159,0.1)',
                  border: '1px solid rgba(143,175,159,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={19} color="#8FAF9F" />
                </div>
                <div>
                  <p className="font-cormorant" style={{ fontWeight: 500, fontSize: '1.1rem', color: '#F7F3ED', lineHeight: 1.1 }}>
                    {title}
                  </p>
                  <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.65)', marginTop: '0.15rem' }}>
                    {label}
                  </p>
                </div>
              </div>

              {/* Body */}
              <p className="font-dm" style={{ fontSize: '0.8rem', color: 'rgba(212,201,176,0.45)', lineHeight: 1.68, marginBottom: '1.5rem', flexGrow: 1 }}>
                {sub}
              </p>

              {/* CTA */}
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="font-dm"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '0.6rem',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(212,201,176,0.18)',
                  color: 'rgba(212,201,176,0.72)',
                }}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer links — 3-column with dividers ── */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(212,201,176,0.08)' }}>
        <div className="max-w-7xl mx-auto" style={{ paddingBottom: '1.5rem' }}>

          {/* Responsive: stack on mobile, 3 cols on desktop */}
          <div className="flex flex-col md:flex-row">

            {/* ── Column 1: Logo + nav links + socials ── */}
            <div
              className="flex-1 order-3 md:order-1 border-b md:border-b-0 md:border-r"
              style={{ padding: '2.5rem 1.5rem', borderColor: 'rgba(212,201,176,0.08)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                <img src="/LOGO.png" alt="" style={{ height: '24px', width: '24px', objectFit: 'contain', opacity: 0.85 }} />
                <span className="font-cormorant" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#F7F3ED', lineHeight: 1 }}>
                  UnderCurrent
                </span>
              </div>
              <p className="font-dm" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 300, color: 'rgba(212,201,176,0.35)', marginBottom: '2rem', paddingLeft: '36px' }}>
                AI Business Automation
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3" style={{ marginBottom: '2rem' }}>
                {[...services, ...company, ...legal].map(s => (
                  <a key={s.label} href={s.href} className="font-dm nav-link" style={{ fontWeight: 300, fontSize: '0.82rem', color: 'rgba(212,201,176,0.45)' }}>
                    {s.label}
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { href: 'https://www.instagram.com/undercurrent.ai', Icon: Instagram, label: 'Instagram' },
                  { href: 'https://www.facebook.com/undercurrent.ai', Icon: Facebook, label: 'Facebook' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: 'rgba(212,201,176,0.35)', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8FAF9F' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,201,176,0.35)' }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Column 2: Newsletter signup ── */}
            <div
              className="flex-1 order-1 md:order-2 border-b md:border-b-0 md:border-r flex flex-col items-center text-center"
              style={{ padding: '2.5rem 1.5rem', borderColor: 'rgba(212,201,176,0.08)' }}
            >
              <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8FAF9F', marginBottom: '1rem' }}>
                STAY UPDATED
              </p>
              <h3 className="font-cormorant" style={{ fontSize: '1.6rem', fontWeight: 400, color: '#F7F3ED', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                Get Automation Insights
              </h3>
              <p className="font-dm" style={{ fontSize: '0.8rem', color: 'rgba(212,201,176,0.45)', lineHeight: 1.65, marginBottom: '1.75rem', maxWidth: '280px' }}>
                Tips, case studies and industry news for small business owners.
              </p>

              <form
                onSubmit={e => e.preventDefault()}
                style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  style={{
                    width: '100%', padding: '0.7rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212,201,176,0.15)',
                    borderRadius: '0.5rem', color: '#F7F3ED',
                    fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="First name"
                    style={{
                      flex: 1, padding: '0.7rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(212,201,176,0.15)',
                      borderRadius: '0.5rem', color: '#F7F3ED',
                      fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    className="font-dm"
                    style={{
                      padding: '0.7rem 1.1rem', background: '#F0EBE2', color: '#1C1C1A',
                      border: 'none', borderRadius: '0.5rem', fontSize: '0.78rem',
                      fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>

            {/* ── Column 3: Contact + legal ── */}
            <div
              className="flex-1 order-2 md:order-3"
              style={{ padding: '2.5rem 1.5rem' }}
            >
              <a
                href="/contact"
                className="font-dm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#F7F3ED', textDecoration: 'none', marginBottom: '2rem' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#8FAF9F' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#F7F3ED' }}
              >
                Send Us a Message <span>→</span>
              </a>

              <div style={{ marginBottom: '2rem' }}>
                <p className="font-mono mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: '#8FAF9F' }}>CONTACT</p>
                <p className="font-dm" style={{ fontSize: '0.82rem', color: 'rgba(212,201,176,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
                  luke@undercurrentautomations.com
                </p>
                <p className="font-dm" style={{ fontSize: '0.82rem', color: 'rgba(212,201,176,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
                  Melbourne, Australia
                </p>
              </div>

              <div>
                <p className="font-mono mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.16em', color: '#8FAF9F' }}>LEGAL</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {legal.map(s => (
                    <a key={s.label} href={s.href} className="font-dm nav-link" style={{ fontWeight: 300, fontSize: '0.82rem', color: 'rgba(212,201,176,0.4)' }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{ borderTop: '1px solid rgba(212,201,176,0.07)', padding: '1.25rem 1.5rem' }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: '#8FAF9F' }} />
              <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(143,175,159,0.45)', letterSpacing: '0.1em' }}>
                System Operational
              </span>
            </div>
            <span className="font-dm" style={{ fontWeight: 300, fontSize: '0.75rem', color: 'rgba(212,201,176,0.28)' }}>
              © 2026 UnderCurrent. All rights reserved.
            </span>
          </div>

        </div>
      </div>
    </footer>
  )
}
