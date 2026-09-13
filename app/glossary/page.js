// app/glossary/page.js — the glossary index, the sandbox skeleton poured with
// the live terms. Every term in the markup, grouped; the find box only hides
// rows that are already there.
import '@/app/styles/glossary.css'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import { getAllGlossaryTerms, getGlossaryTermsByCategory } from '@/lib/glossary'
import { EMAIL } from '@/components/site/Footer'
import { GROUP_IDS } from '@/lib/glossaryGroups'

const SITE_URL = 'https://undercurrentautomations.com'

export const metadata = {
  title: 'Glossary',
  description: 'Plain-English definitions for AI search, automation, and the regulators shaping Australian service businesses: SEO, AEO, GEO, AI agents and more.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: 'Glossary | UnderCurrent Automations',
    description: 'Plain-English definitions for AI search, automation, and Australian compliance.',
    type: 'website',
    url: `${SITE_URL}/glossary`,
    images: ['/brand/og-card.png'],
  },
}

export default function GlossaryIndex() {
  const all = getAllGlossaryTerms()
  const groups = getGlossaryTermsByCategory()

  const termSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/glossary`,
    name: 'UnderCurrent Glossary',
    description: metadata.description,
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: all.map(t => ({ '@type': 'DefinedTerm', name: t.term, description: t.shortDefinition, url: `${SITE_URL}/glossary/${t.slug}` })),
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
    <div className="c-gloss">
      <PageFx find />
      <JsonLd schema={termSet} />
      <JsonLd schema={breadcrumb} />
      <main>
        <section className="hero" id="top" data-reveal="">
          <div className="hero__layer hero__photo"></div>
          <div className="hero__layer hero__glow a"></div>
          <div className="hero__layer hero__glow b"></div>
          <div className="hero__layer hero__static"></div>
          <div className="hero__layer hero__grain"></div>
          <div className="hero__inner">
            <h1 className="rv">Glossary</h1>
          </div>
        </section>
        <div id="content"></div>

        <section className="sec" id="browse" data-reveal="">
          <div className="wrap">
            <div className="sec__head"><span className="eyebrow">Browse</span><span className="eyebrow" data-count="">{all.length} terms</span></div>
            <div className="two">
              <h2 className="rv">Every entry is one screen, with sources.</h2>
              <p className="rv" style={{ '--i': '1' }}>Plain definitions for the words we use with clients. Search, automation, the workflows that save the hours, and the Australian regulators that set the rules. If a word costs a business owner ten minutes on a call, it belongs here.</p>
            </div>
            <div className="find rv" style={{ '--i': '1' }}>
              <div><label htmlFor="q">Find a term</label><input id="q" type="search" autoComplete="off" placeholder="Type a word, say schema, or agent" /></div>
              <span className="find__n" data-found=""></span>
            </div>
            <nav className="jump rv" style={{ '--i': '2' }} aria-label="Groups">
              {groups.map(g => <a key={g.key} href={`#${GROUP_IDS[g.key]}`}><b>{g.label}</b><span>{g.terms.length}</span></a>)}
            </nav>
            <p className="empty" hidden>Nothing under that word yet. Try a shorter one, or <a href={`mailto:${EMAIL}`} style={{ borderBottom: '1px solid var(--line)' }}>ask us</a>.</p>
          </div>
        </section>

        {groups.map((g, i) => (
          <section key={g.key} className={`sec grp${i % 2 ? '' : ' sec--off'}`} id={GROUP_IDS[g.key]} data-reveal="">
            <div className="ghead rv"><div className="hero__layer band"></div><div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
              <div className="ghead__in"><h2 className="eyebrow">{g.label}</h2><span className="eyebrow">{g.terms.length} terms</span></div>
            </div>
            <div className="wrap"><dl className="terms rv" style={{ '--i': '1' }}>
              {g.terms.map(t => <div key={t.slug} className="t"><dt><a href={`/glossary/${t.slug}`}>{t.term}</a></dt><dd>{t.shortDefinition}</dd></div>)}
            </dl></div>
          </section>
        ))}

        <section className="sec--off cta" data-reveal="">
          <div className="wrap"><div className="cta__in"><h2 className="rv">Not sure which of these your business actually needs?</h2><a className="link rv" style={{ '--i': '1' }} href={`mailto:${EMAIL}`}>Let&apos;s chat</a></div></div>
        </section>
      </main>
    </div>
  )
}
