// components/layout/Breadcrumb.js
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  // items: [{ label: 'Home', href: '/' }, { label: 'Services' }]
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} className="text-border" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-charcoal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
