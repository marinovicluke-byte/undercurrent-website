// app/blog/[slug]/page.js — the article, the sandbox's Ground skeleton poured
// with the live markdown. Category ground hero, the rail, the quick answer
// strip, the byline with the photo, the body in blocks, FAQ from front-matter,
// the end row, the who card, Read next, the closing band. Schema as before.
// A `photo` in front-matter puts a photo from the library beside the title.
import '@/app/styles/article.css'
import '@/app/styles/article-blocks.css'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import TradieAdminCalculator from '@/components/calculators/TradieAdminCalculator'
import { SocialLinks, EMAIL } from '@/components/site/Footer'
import { PostRow, hasCover } from '@/components/site/Post'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { LUKE_PERSON } from '@/lib/schema/person'
import { categoryOf, CLOSE_LINES, fmtDate, isoDate } from '@/lib/categories'
import { extractQuickAnswer, stripSection, splitBlocks, decorate } from '@/lib/articleBody'
import { photoOf } from '@/lib/photos'

const SITE_URL = 'https://undercurrentautomations.com'
const CALC_TOKEN = '<!-- calc:tradie-admin -->'

// The looks for the article blocks, one class each (app/styles/article-blocks.css): steps
// ledger|track|tiles|ramp, pairs panel|offset|deep|pills, tables fit|rail|stack|pinned, Quick Answer
// plain|bluf|split|tiles, workings receipt|tile|column. Side by side: /article-blocks-concepts.html
const BLOCK_LOOKS = { steps: 'ledger', pairs: 'panel', data: 'fit', qa: 'plain', work: 'receipt' }
const LOOKS = `ucb-looks ${Object.entries(BLOCK_LOOKS).map(([k, v]) => `ucb-${k}--${v}`).join(' ')}`

// the share and schema image: the library photo when the article has one, else the old poster, else the brand card
function shareImage(slug, fm) {
  const hero = photoOf(fm.photo)
  if (hero) return { url: `${SITE_URL}${hero.path}`, width: hero.width, height: hero.height, alt: fm.photoAlt || hero.alt }
  if (hasCover(slug)) return { url: `${SITE_URL}/articles/${slug}/hero.jpg`, width: 1536, height: 1024, alt: fm.title }
  return { url: `${SITE_URL}/brand/og-card.png`, width: 1536, height: 1024, alt: fm.title }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  const fm = article.frontmatter
  const share = shareImage(slug, fm)
  const description = fm.metaDescription || fm.description || fm.summary
  return {
    title: { absolute: fm.title },
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: fm.title, description, type: 'article',
      publishedTime: isoDate(fm.date), modifiedTime: isoDate(fm.dateModified || fm.date),
      url: `${SITE_URL}/blog/${slug}`, authors: [fm.author || 'Luke Marinovic'],
      images: [share],
    },
    twitter: { card: 'summary_large_image', title: fm.title, description, images: [share.url] },
  }
}

function faqsOf(fm) {
  if (!Array.isArray(fm?.faqs)) return []
  return fm.faqs.map(f => ({ question: (f.q || f.question || '').trim(), answer: (f.a || f.answer || '').trim() })).filter(f => f.question && f.answer)
}

// the body html, with the calculator component dropped in where its token sits
function Body({ html }) {
  const at = html.indexOf(CALC_TOKEN)
  if (at < 0) return <div dangerouslySetInnerHTML={{ __html: html }} />
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html.slice(0, at) }} />
      <TradieAdminCalculator />
      <div dangerouslySetInnerHTML={{ __html: html.slice(at + CALC_TOKEN.length) }} />
    </>
  )
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return notFound()
  const fm = article.frontmatter
  const cat = categoryOf(fm.cluster)
  const faqs = faqsOf(fm)
  const hero = photoOf(fm.photo)
  const heroAlt = hero && (fm.photoAlt || hero.alt)

  const { qa, html: afterQa } = extractQuickAnswer(article.html)
  const body = faqs.length ? stripSection(afterQa, 'Frequently Asked Questions') : afterQa
  const { intro, blocks } = splitBlocks(body)
  const rail = [...blocks.map(b => ({ id: b.id, label: b.toc })), ...(faqs.length ? [{ id: 'faq', label: 'FAQ' }] : [])]

  const all = getAllArticles()
  const related = [
    ...all.filter(a => a.slug !== slug && categoryOf(a.cluster).key === cat.key),
    ...all.filter(a => a.slug !== slug && categoryOf(a.cluster).key !== cat.key),
  ].slice(0, 3)

  const updated = fm.dateModified || fm.date
  const url = `${SITE_URL}/blog/${slug}`
  const aboutEntities = (Array.isArray(fm.about) && fm.about.length > 0)
    ? fm.about.map(e => ({ '@type': e.type || 'Thing', name: e.name || e }))
    : [{ '@type': 'Thing', name: cat.label }, { '@type': 'Place', name: 'Australia' }]
  const mentionEntities = Array.isArray(fm.mentions) && fm.mentions.length > 0
    ? fm.mentions.map(e => ({ '@type': e.type || 'Thing', name: e.name || e })) : null

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${url}#article`, headline: fm.title,
        description: fm.metaDescription || fm.description || fm.summary,
        datePublished: isoDate(fm.date), dateModified: isoDate(updated),
        author: { '@id': `${SITE_URL}/about#luke` }, publisher: { '@id': `${SITE_URL}#organization` },
        mainEntityOfPage: url, articleSection: cat.label,
        keywords: [fm.keyword, cat.label, fm.level].filter(Boolean).join(', '),
        inLanguage: 'en-AU', about: aboutEntities, ...(mentionEntities && { mentions: mentionEntities }),
        ...((hero || hasCover(slug)) && { image: shareImage(slug, fm).url }),
      },
      LUKE_PERSON,
    ],
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: cat.label, item: `${SITE_URL}/blog#cat-${cat.key}` },
      { '@type': 'ListItem', position: 4, name: fm.title, item: url },
    ],
  }
  const faqSchema = faqs.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  } : null

  return (
    <div className={`c-${cat.key}`}>
      <PageFx share rail />
      <JsonLd schema={pageSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <main>
        <article className={LOOKS}>
          <header className={`hero${hero ? ' hero--photo' : ''}`} id="top" data-reveal="">
            <div className="hero__layer band"></div>
            <div className="hero__layer hero__glow b"></div>
            <div className="hero__layer hero__static"></div>
            <div className="hero__layer hero__grain"></div>
            <div className="hero__inner">
              <a className="eyebrow hero__cat rv" href={`/blog#cat-${cat.key}`}>{cat.label}</a>
              <h1 className="rv" style={{ '--i': '1' }}>{fm.title}</h1>
              {fm.description && <p className="hero__sub rv" style={{ '--i': '2' }}>{fm.description}</p>}
            </div>
            {hero && (
              <figure className="hero__fig">
                <Image src={hero.path} width={hero.width} height={hero.height} alt={heroAlt} preload
                  sizes="(min-width: 961px) 44vw, 100vw" style={{ objectPosition: fm.photoFocus || 'center' }} />
              </figure>
            )}
          </header>
          <div id="content"></div>

          {rail.length > 0 && (
            <nav className="rail" aria-label="On this page"><div className="wrap"><div className="rail__in">
              {rail.map(r => <a key={r.id} href={`#${r.id}`}>{r.label}</a>)}
            </div></div></nav>
          )}

          {qa && (
            <section className="qa" data-reveal="" aria-label="Quick answer"><div className="wrap"><div className="qa__in">
              <p className="eyebrow rv">Quick answer</p>
              <p className={`qa__lead rv${qa.answer ? ' qa__lead--answer' : ''}`} style={{ '--i': '1' }} dangerouslySetInnerHTML={{ __html: qa.lead }} />
              {qa.items.length > 0 && !qa.ordered && (
                <ul className="qa__pts rv" style={{ '--i': '2' }}>
                  {qa.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}
                </ul>
              )}
              {qa.items.length > 0 && qa.ordered && (
                <ol className="qa__cells rv" style={{ '--i': '2' }}>
                  {qa.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}
                </ol>
              )}
              {qa.close.map((c, i) => <p key={i} className="qa__close rv" style={{ '--i': '3' }} dangerouslySetInnerHTML={{ __html: c }} />)}
            </div></div></section>
          )}

          <div className="art"><div className="wrap"><div className="art__col">
            <div className="meta meta--photo">
              <a className="meta__ph" href="#author"><img src="/assets/luke-sq.jpg" width="600" height="600" decoding="async" alt="" /></a>
              <a className="meta__name" href="#author" rel="author"><b>Luke Marinovic</b><small>Founder, UnderCurrent Automations</small></a>
              <span className="meta__d">Updated <time dateTime={isoDate(updated)}>{fmtDate(updated)}</time><em>·</em>{fm.readingTime || 5} min read</span>
            </div>
            <div className="body">
              {intro && <div className="blk intro" data-reveal=""><Body html={decorate(intro, { lead: true })} /></div>}
              {blocks.map(b => (
                <div key={b.id} className="blk" data-reveal="" id={b.id}>
                  <h2 className="rv" data-toc={b.toc} dangerouslySetInnerHTML={{ __html: b.title }} />
                  <Body html={decorate(b.html)} />
                </div>
              ))}
              {faqs.length > 0 && (
                <div className="blk" data-reveal="" id="faq">
                  <h2 className="rv" data-toc="FAQ">Frequently asked questions</h2>
                  <div className="faq rv" style={{ '--i': '1' }}>
                    {faqs.map((f, i) => <details key={i}><summary>{f.question}</summary><p>{f.answer}</p></details>)}
                  </div>
                </div>
              )}
            </div>
            <div className="end"><span className="eyebrow">Published <time dateTime={isoDate(fm.date)}>{fmtDate(fm.date)}</time></span><div className="share"><a data-share="li" href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener">LinkedIn</a><a data-share="x" href="https://twitter.com/intent/tweet" target="_blank" rel="noopener">X</a><button data-copy="">Copy link</button></div></div>
            <div id="author">
              <section className="author" data-reveal="">
                <div className="author__g">
                  <figure className="author__ph who rv"><img className="who__img" src="/assets/luke-800.jpg" srcSet="/assets/luke-800.jpg 800w, /assets/luke.jpg 1600w" sizes="(max-width:640px) 100vw, 300px" width="800" height="1000" loading="lazy" decoding="async" alt="Luke Marinovic" /><figcaption className="who__c">
                    <span className="who__n">Luke Marinovic<small>Founder, UnderCurrent Automations</small>
                      <span className="who__s"><SocialLinks /></span>
                    </span>
                  </figcaption></figure>
                  <div className="author__t rv" style={{ '--i': '1' }}>
                    <h3>Hey, I’m Luke, founder of UnderCurrent Automations.</h3>
                    <p className="author__p">I started UnderCurrent after watching Australian small businesses grind through work they didn’t have to. Now I build the systems that take it off their plate, from lead follow-up and invoicing to the search work that gets a business named by Google and ChatGPT, with most builds live in 14 days.</p>
                    <p className="author__p">At UnderCurrent, we build with purpose. We care how something looks, but more about whether it keeps working when nobody’s watching. If your business has outgrown its admin and you want a partner who gets it, <a href={`mailto:${EMAIL}`}>let’s talk</a>.</p>
                  </div>
                </div>
              </section>
            </div>
          </div></div></div>
        </article>

        {related.length > 0 && (
          <section className="sec sec--off related" id="related" data-reveal=""><div className="wrap">
            <div className="sec__head"><span className="eyebrow">Read next</span><a className="link" href="/blog">All articles</a></div>
            <div className="rel">{related.map((a, i) => <PostRow key={a.slug} a={a} i={i + 1} />)}</div>
          </div></section>
        )}

        <section className="cband" data-reveal="">
          <div className="hero__layer band"></div><div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
          <div className="wrap cband__in"><h2 className="rv">{CLOSE_LINES[cat.key]}</h2><a className="link rv" style={{ '--i': '1' }} href={`mailto:${EMAIL}`}>Let&apos;s chat</a></div>
        </section>
      </main>
    </div>
  )
}
