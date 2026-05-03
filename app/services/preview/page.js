import Link from 'next/link'

export const metadata = {
  title: 'Service page reference — V5a',
  robots: { index: false, follow: false },
}

export default function Preview() {
  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: 128, paddingBottom: 96 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 var(--page-pad)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)', margin: 0, marginBottom: 16 }}>
          Service page reference
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, color: 'var(--off-white)', margin: 0, marginBottom: 12, lineHeight: 1.2 }}>
          V5a — the chosen layout for all service pages.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, marginBottom: 48, maxWidth: 620 }}>
          Kept as a reference for the rollout. Once every <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)' }}>SERVICES</span> entry renders with the V5a template, this preview route can be deleted.
        </p>

        <Link href="/services/preview/v5a" style={{ display: 'block', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,249,245,0.12)', padding: 32, textDecoration: 'none', borderRadius: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)' }}>V5a</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>Open →</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--off-white)', margin: 0, marginBottom: 12 }}>
            Boxed Q&amp;A, schema-true, brand-aligned.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
            Black hero, charcoal body. Each Q&amp;A in its own bordered card. Full <span style={{ fontFamily: 'var(--font-mono)' }}>Service + FAQPage + BreadcrumbList + Person</span> JSON-LD. BLUF opener, 27+ entities, priced offers. Sticky TOC centered in viewport, scroll-fade header.
          </p>
        </Link>
      </div>
    </div>
  )
}
