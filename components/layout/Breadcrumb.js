// Visible breadcrumb chrome. Matches the BreadcrumbList JSON-LD injected on
// service, blog, case-study, cluster and location pages. Tailwind v4 classes
// drive layout; CSS-var tokens drive colours so it stays in lock-step with
// the rest of the design system defined in app/globals.css.
//
// Do not add visual steps that aren't in the corresponding JSON-LD — Google
// flags mismatches between visible breadcrumb and schema as spam.
import Link from 'next/link'

export default function Breadcrumb({ items, tone = 'dark' }) {
  // items: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Sales Automation' }]
  const isLight = tone === 'light'
  const mutedCls = isLight ? 'text-[rgba(28,28,26,0.45)]' : 'text-[color:var(--text-muted)]'
  const linkCls  = isLight ? 'text-[rgba(28,28,26,0.6)] hover:text-[color:var(--charcoal)]' : 'text-[color:var(--text-secondary)] hover:text-[color:var(--blue-light)]'
  const activeCls = isLight ? 'text-[rgba(28,28,26,0.88)]' : 'text-[color:var(--text-primary)]'
  const sepCls   = isLight ? 'text-[rgba(28,28,26,0.25)]' : 'text-[color:var(--text-faint)]'

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 font-[family-name:var(--font-body)] text-[13px] leading-snug ${mutedCls}`}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className={`text-[11px] ${sepCls}`}>›</span>
            )}
            {item.href && !isLast ? (
              <Link href={item.href} className={`no-underline transition-colors ${linkCls}`}>
                {item.label}
              </Link>
            ) : (
              <span className={activeCls} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
