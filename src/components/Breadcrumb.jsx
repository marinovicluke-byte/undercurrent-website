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

  // Visually hidden — SEO structured data is injected via JSON-LD above
  return null
}
