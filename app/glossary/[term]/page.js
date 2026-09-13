// app/glossary/[term]/page.js — the glossary entry, the sandbox skeleton poured
// with the live front-matter: the definition, the body, FAQ, sources, related
// terms, the service it sits under, previous and next. Schema as before.
import '@/app/styles/term.css'
import { notFound } from 'next/navigation'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import { SocialLinks, EMAIL } from '@/components/site/Footer'
import { getAllGlossaryTerms, getGlossaryTermBySlug, GLOSSARY_CATEGORIES } from '@/lib/glossary'
import { serviceRoute, fmtDate, isoDate } from '@/lib/categories'
import { splitBlocks, decorate, text } from '@/lib/articleBody'
import { GROUP_IDS } from '@/lib/glossaryGroups'

const SITE_URL = 'https://undercurrentautomations.com'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllGlossaryTerms().map(t => ({ term: t.slug }))
}

export async function generateMetadata({ params }) {
  const { term } = await params
  const entry = await getGlossaryTermBySlug(term)
  if (!entry) return {}
  const fm = entry.frontmatter
  const seoTitle = fm.titleShort || fm.term
  const url = `${SITE_URL}/glossary/${entry.slug}`
  return {
    title: seoTitle,
    description: fm.shortDefinition,
    alternates: { canonical: url },
    openGraph: {
      title: `${seoTitle} | UnderCurrent Glossary`, description: fm.shortDefinition, type: 'article', url,
      publishedTime: isoDate(fm.datePublished), modifiedTime: isoDate(fm.dateModified || fm.datePublished),
      authors: [fm.author || 'Luke Marinovic'],
      images: [{ url: `${SITE_URL}/brand/og-card.png`, width: 1200, height: 630, alt: fm.term }],
    },
    twitter: { card: 'summary_large_image', title: `${seoTitle} | UnderCurrent Glossary`, description: fm.shortDefinition, images: [`${SITE_URL}/brand/og-card.png`] },
  }
}

const faqsOf = fm => (Array.isArray(fm?.faqs) ? fm.faqs : []).map(f => ({ question: (f.q || f.question || '').trim(), answer: (f.a || f.answer || '').trim() })).filter(f => f.question && f.answer)

// "Publisher: title" → the two halves the sources list wants; otherwise the host and the title
function sourceParts(s) {
  const m = s.title.match(/^([^:]{2,40}):\s+(.+)$/)
  if (m) return [m[1], m[2]]
  try { return [new URL(s.url).hostname.replace(/^www\./, ''), s.title] } catch { return ['Source', s.title] }
}

export default async function TermPage({ params }) {
  const { term } = await params
  const entry = await getGlossaryTermBySlug(term)
  if (!entry) return notFound()
  const fm = entry.frontmatter
  const url = `${SITE_URL}/glossary/${entry.slug}`
  const all = getAllGlossaryTerms()
  const idx = all.findIndex(t => t.slug === entry.slug)
  const prev = all[(idx - 1 + all.length) % all.length], next = all[(idx + 1) % all.length]
  const group = GLOSSARY_CATEGORIES.find(c => c.key === fm.category)
  const faqs = faqsOf(fm)
  const sources = (Array.isArray(fm.sources) ? fm.sources : []).filter(s => s && s.url)
  const related = (fm.relatedTerms || []).map(s => all.find(t => t.slug === s)).filter(Boolean).slice(0, 3)
  const [svcHref, svcLabel] = serviceRoute(Array.isArray(fm.relatedServices) ? fm.relatedServices[0] : '')
  const updated = fm.dateModified || fm.datePublished

  // the body opens with the definition in bold; the strip above already says it
  const html = entry.html.replace(/^<p><strong>[\s\S]*?<\/strong><\/p>\n?/, '')
  const mins = Math.max(1, Math.round(text(html).split(/\s+/).length / 200))
  const { intro, blocks } = splitBlocks(html)

  const definedTerm = { '@context': 'https://schema.org', '@type': 'DefinedTerm', name: fm.term, description: fm.shortDefinition, url, inDefinedTermSet: `${SITE_URL}/glossary` }
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: fm.term, description: fm.shortDefinition, url, mainEntityOfPage: url, inLanguage: 'en-AU',
    datePublished: isoDate(fm.datePublished), dateModified: isoDate(updated), articleSection: 'Glossary',
    author: { '@id': `${SITE_URL}/about#luke` }, publisher: { '@id': `${SITE_URL}#organization` }, isPartOf: { '@id': `${SITE_URL}#website` },
  }
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
      ...(group ? [{ '@type': 'ListItem', position: 3, name: group.label, item: `${SITE_URL}/glossary#${GROUP_IDS[group.key]}` }] : []),
      { '@type': 'ListItem', position: group ? 4 : 3, name: fm.term, item: url },
    ],
  }
  const faqSchema = faqs.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) } : null

  return (
    <div className="c-gloss">
      <PageFx share />
      <JsonLd schema={definedTerm} />
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumb} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <main>
        <article>
          <header className="hero" id="top" data-reveal="">
            <div className="hero__layer band"></div>
            <div className="hero__layer hero__glow b"></div>
            <div className="hero__layer hero__static"></div>
            <div className="hero__layer hero__grain"></div>
            <div className="hero__inner">
              <nav className="crumb eyebrow rv" aria-label="Breadcrumb"><a href="/glossary">Glossary</a>{group && <><em>·</em><a href={`/glossary#${GROUP_IDS[group.key]}`}>{group.label}</a></>}</nav>
              <h1 className="rv">{fm.term}</h1>
            </div>
          </header>

          <section className="def" data-reveal="" aria-label="Definition"><div className="wrap">
            <p className="eyebrow rv">Definition</p>
            <p className="def__t rv" style={{ '--i': '1' }}>{fm.shortDefinition}</p>
            {fm.complianceNote && <p className="def__x rv" style={{ '--i': '2' }}><b>Compliance note:</b> {fm.complianceNote}</p>}
          </div></section>

          <div className="art"><div className="wrap"><div className="art__col">
            <div className="meta">
              <a className="meta__ph" href="#author"><img src="/assets/luke-sq.jpg" width="600" height="600" decoding="async" alt="" /></a>
              <a className="meta__name" href="#author" rel="author"><b>Luke Marinovic</b><small>Founder, UnderCurrent Automations</small></a>
              <span className="meta__d">Updated <time dateTime={isoDate(updated)}>{fmtDate(updated)}</time><em>·</em>{mins} min read</span>
            </div>
            <div className="body">
              {intro && <div className="blk" data-reveal="" id="about" dangerouslySetInnerHTML={{ __html: decorate(intro) }} />}
              {blocks.map(b => (
                <div key={b.id} className="blk" data-reveal="" id={b.id}>
                  <h2 className="rv" dangerouslySetInnerHTML={{ __html: b.title }} />
                  <div dangerouslySetInnerHTML={{ __html: decorate(b.html) }} />
                </div>
              ))}
              {faqs.length > 0 && (
                <div className="blk" data-reveal="" id="faq">
                  <h2 className="rv">Common questions</h2>
                  <div className="faq rv" style={{ '--i': '1' }}>
                    {faqs.map((f, i) => <details key={i} open={i === 0 || undefined}><summary>{f.question}</summary><p>{f.answer}</p></details>)}
                  </div>
                </div>
              )}
              {sources.length > 0 && (
                <div className="blk" data-reveal="" id="sources">
                  <h2 className="rv">Sources</h2>
                  <ol className="src rv" style={{ '--i': '1' }}>
                    {sources.map((s, i) => { const [pub, title] = sourceParts(s); return <li key={i}><a href={s.url} rel="nofollow noopener" target="_blank"><b>{pub}</b><span>{title}</span></a></li> })}
                  </ol>
                </div>
              )}
            </div>
            <div className="end"><span>Published <time dateTime={isoDate(fm.datePublished)}>{fmtDate(fm.datePublished)}</time></span><div className="share"><a data-share="li" href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener">LinkedIn</a><a data-share="x" href="https://twitter.com/intent/tweet" target="_blank" rel="noopener">X</a><button data-copy="">Copy link</button></div></div>
            <div id="author">
              <section className="author" data-reveal="">
                <div className="author__g">
                  <figure className="author__ph who rv"><img className="who__img" src="/assets/luke-800.jpg" srcSet="/assets/luke-800.jpg 800w, /assets/luke.jpg 1600w" sizes="(max-width:640px) 100vw, 300px" width="800" height="1000" loading="lazy" decoding="async" alt="Luke Marinovic" /><figcaption className="who__c">
                    <span className="who__n">Luke Marinovic<small>Founder, UnderCurrent Automations</small>
                      <span className="who__s"><SocialLinks /></span>
                    </span>
                  </figcaption></figure>
                  <div className="author__t rv" style={{ '--i': '1' }}>
                    <h2>Hey, I’m Luke, founder of UnderCurrent Automations.</h2>
                    <p className="author__p">I started UnderCurrent after watching Australian small businesses grind through work they didn’t have to. Now I build the systems that take it off their plate, from lead follow-up and invoicing to the search work that gets a business named by Google and ChatGPT, with most builds live in 14 days.</p>
                    <p className="author__p">At UnderCurrent, we build with purpose. We care how something looks, but more about whether it keeps working when nobody’s watching. If your business has outgrown its admin and you want a partner who gets it, <a href={`mailto:${EMAIL}`}>let’s talk</a>.</p>
                  </div>
                </div>
              </section>
            </div>
          </div></div></div>
        </article>

        <section className="sec sec--off" id="related" data-reveal=""><div className="wrap">
          <div className="sec__head"><span className="eyebrow">Related terms</span><a className="link" href="/glossary">All {all.length} terms</a></div>
          {related.length > 0 && (
            <div className="rel">
              {related.map((t, i) => <a key={t.slug} className="rv" style={{ '--i': String(i + 1) }} href={`/glossary/${t.slug}`}><h3>{t.term}</h3><p>{t.shortDefinition}</p></a>)}
            </div>
          )}
          <div className="svc rv" style={{ '--i': '3' }}><span>The service this sits under</span><a className="link" href={svcHref}>{svcLabel}</a></div>
          <nav className="pn rv" style={{ '--i': '3' }} aria-label="More terms">
            <a href={`/glossary/${prev.slug}`}><span>Previous</span><b>{prev.term}</b></a>
            <a href={`/glossary/${next.slug}`}><span>Next</span><b>{next.term}</b></a>
          </nav>
        </div></section>

        <section className="cta" data-reveal="">
          <div className="wrap"><div className="cta__in"><h2 className="rv">Not sure which of these your business actually needs?</h2><a className="link rv" style={{ '--i': '1' }} href={`mailto:${EMAIL}`}>Let&apos;s chat</a></div></div>
        </section>
      </main>
    </div>
  )
}
