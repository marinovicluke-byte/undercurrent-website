// app/glossary/page.js — Glossary hub. Categorised index of definitional entries.
// DefinedTermSet + BreadcrumbList JSON-LD. Visual system matches /blog (var(--page-pad),
// maxWidth 1280, left-aligned, near-black hero → charcoal body, rounded rows).
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { getAllGlossaryTerms, getGlossaryTermsByCategory } from '@/lib/glossary'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280

export const metadata = {
  title: 'Glossary',
  description:
    'Plain-English definitions for AI search, automation, and the regulators that shape Australian service businesses — SEO, AEO, GEO, AI agents, ASIC Best Interests Duty and more. Built by Luke at UnderCurrent Automations.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: 'Glossary — UnderCurrent Automations',
    description: 'Plain-English definitions for AI search, automation, and Australian compliance.',
    type: 'website',
    url: `${SITE_URL}/glossary`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossary — UnderCurrent Automations',
    description: 'Plain-English definitions for AI search, automation, and Australian compliance.',
  },
}

export default function GlossaryHub() {
  const all = getAllGlossaryTerms()
  const byCategory = getGlossaryTermsByCategory()

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'UnderCurrent Automations Glossary',
    description: metadata.description,
    url: `${SITE_URL}/glossary`,
    inLanguage: 'en-AU',
    hasDefinedTerm: all.map(t => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.shortDefinition,
      url: `${SITE_URL}/glossary/${t.slug}`,
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
    ],
  }

  return (
    <>
      <JsonLd schema={definedTermSet} />
      <JsonLd schema={breadcrumb} />

      {/* ═══ HERO — near-black ═══ */}
      <section style={{ position: 'relative', padding: '120px var(--page-pad) 64px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <SectionEyebrow label={`Glossary · ${all.length} ${all.length === 1 ? 'term' : 'terms'}`} />
          </div>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px, 5.4vw, 80px)', lineHeight: 1.04, letterSpacing: '-0.035em', color: 'var(--off-white)', textWrap: 'balance' }}>
            The <span className="uc-glow-word uc-glow-word--blue">words</span> behind AI search & automation.
          </h1>
          <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 660 }}>
            Plain definitions for the terms we use with clients — search disciplines, automation tools, the workflows that save the hours, and the Australian regulators that set the rules. Every entry is one screen, with sources.
          </p>
          {byCategory.length > 1 && (
            <nav aria-label="Glossary categories" style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {byCategory.map(c => (
                  <a key={c.key} href={`#${c.key}`} className="uc-glossary-pill">
                    <span>{c.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6 }}>{c.terms.length}</span>
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </section>

      <style>{`
        .uc-glossary-pill { display:inline-flex; align-items:center; gap:10px; padding:10px 18px; border-radius:999px; background:rgba(250,249,245,0.03); border:1px solid var(--text-faint); color:var(--text-secondary); font-family:var(--font-body); font-size:13px; text-decoration:none; transition:all .15s ease; }
        .uc-glossary-pill:hover { background:rgba(106,141,173,0.08); border-color:var(--blue); color:var(--blue); }
        .uc-glossary-row { display:flex; align-items:flex-start; justify-content:space-between; gap:24px; padding:18px 16px; margin:0 -16px; border-radius:12px; text-decoration:none; transition:background .15s ease; }
        .uc-glossary-row:hover { background:rgba(250,249,245,0.02); }
        .uc-glossary-row:hover .uc-glossary-term { color:var(--blue); }
      `}</style>

      {/* ═══ TERMS BY CATEGORY ═══ */}
      <section style={{ padding: '40px var(--page-pad) 120px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          {byCategory.length === 0 && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-muted)', paddingTop: 40 }}>
              No glossary entries published yet.
            </p>
          )}
          {byCategory.map(c => (
            <section key={c.key} id={c.key} style={{ paddingTop: 72, scrollMarginTop: 96 }}>
              <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--text-faint)' }}>
                <SectionEyebrow label={`${c.terms.length} ${c.terms.length === 1 ? 'term' : 'terms'}`} />
                <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--off-white)' }}>
                  {c.label}
                </h2>
              </div>
              <div>
                {c.terms.map((t, i) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="uc-glossary-row"
                    style={{ borderBottom: i < c.terms.length - 1 ? '1px solid var(--text-faint)' : 'none', borderRadius: 0 }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 className="uc-glossary-term" style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: 'var(--text-primary)', transition: 'color .15s ease' }}>
                        {t.term}
                      </h3>
                      <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {t.shortDefinition}
                      </p>
                    </div>
                    {t.complianceNote && (
                      <span style={{ flexShrink: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-light)', opacity: 0.8, paddingTop: 4 }}>
                        Compliance
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <div style={{ marginTop: 88, paddingTop: 32, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              {all.length} {all.length === 1 ? 'term' : 'terms'}
            </p>
            <Link href="/blog" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              Browse the blog →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
