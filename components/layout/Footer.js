// components/layout/Footer.js
import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="font-display text-xl font-bold text-white">UnderCurrent</span>
            <p className="mt-2 text-sm text-white/40">AI Automation for Small Business. Melbourne, Australia.</p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-sm text-white/30">
          © {new Date().getFullYear()} UnderCurrent Automations. ABN: [YOUR ABN].
        </div>
      </div>
    </footer>
  )
}
