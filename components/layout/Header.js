// components/layout/Header.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b-4 border-charcoal">
      <div className="px-8 md:px-16 flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-charcoal tracking-tight">
          UnderCurrent
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body text-muted hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://cal.com/undercurrent"
            className="bg-blue px-4 py-2 text-sm font-body font-medium text-white hover:bg-blue-dark transition-colors btn-pop"
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-charcoal bg-white px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-body text-charcoal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://cal.com/undercurrent"
              onClick={() => setOpen(false)}
              className="inline-block bg-blue px-4 py-2 text-sm font-body font-medium text-white text-center hover:bg-blue-dark transition-colors"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
