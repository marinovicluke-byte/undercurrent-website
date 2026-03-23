import { useEffect } from 'react'

export default function Breadcrumb({ items }) {
  // items = [{ label: 'Home', href: '/' }, { label: 'Services' }]
  // Last item has no href (current page)

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        ...(item.href ? { item: `https://www.undercurrentautomations.com${item.href === '/' ? '' : item.href}` } : {}),
      })),
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'breadcrumb-json-ld'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById('breadcrumb-json-ld')
      if (el) el.remove()
    }
  }, [items])

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        position: 'relative',
        zIndex: 20,
        padding: '6.5rem 1.5rem 0',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <ol
        className="font-mono"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '0.55rem',
          letterSpacing: '0.14em',
        }}
      >
        {items.map((item, i) => (
          <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {i > 0 && (
              <span style={{ color: 'rgba(143,175,159,0.25)' }}>/</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                style={{
                  color: 'rgba(143,175,159,0.45)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#8FAF9F' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(143,175,159,0.45)' }}
              >
                {item.label}
              </a>
            ) : (
              <span style={{ color: 'rgba(212,201,176,0.35)' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
