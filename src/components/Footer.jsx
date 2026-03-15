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
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/#contact' },
  ]
  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ]

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#1C1C1A', borderRadius: '4rem 4rem 0 0' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16" style={{ borderBottom: '1px solid rgba(212,201,176,0.1)' }}>
          {/* Wordmark */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="font-cormorant text-off-white" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F7F3ED' }}>
                UnderCurrent
              </h3>
              <p className="font-dm text-warm-sand/60" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', fontWeight: 300, color: '#D4C9B060' }}>
                AI Automation Architecture
              </p>
            </div>
            <p className="font-dm" style={{ fontWeight: 300, fontSize: '0.875rem', color: '#D4C9B060', lineHeight: 1.7 }}>
              We design the undercurrent that drives your business forward.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-dm mb-5" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', color: '#8FAF9F' }}>
              SERVICES
            </p>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.label}>
                  <a href={s.href} className="font-dm nav-link" style={{ fontWeight: 300, fontSize: '0.875rem', color: '#D4C9B070' }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-dm mb-5" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', color: '#8FAF9F' }}>
              COMPANY
            </p>
            <ul className="space-y-3">
              {company.map(s => (
                <li key={s.label}>
                  <a href={s.href} className="font-dm nav-link" style={{ fontWeight: 300, fontSize: '0.875rem', color: '#D4C9B070' }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-dm mb-5" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', color: '#8FAF9F' }}>
              LEGAL
            </p>
            <ul className="space-y-3">
              {legal.map(s => (
                <li key={s.label}>
                  <a href={s.href} className="font-dm nav-link" style={{ fontWeight: 300, fontSize: '0.875rem', color: '#D4C9B070' }}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* System status */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: '#8FAF9F' }} />
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#8FAF9F60', letterSpacing: '0.1em' }}>
              System Operational
            </span>
          </div>

          <span className="font-dm" style={{ fontWeight: 300, fontSize: '0.8rem', color: '#D4C9B040' }}>
            Melbourne, Australia
          </span>

          <span className="font-dm" style={{ fontWeight: 300, fontSize: '0.8rem', color: '#D4C9B040' }}>
            © 2026 UnderCurrent
          </span>
        </div>
      </div>
    </footer>
  )
}
