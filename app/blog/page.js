// app/blog/page.js — the blog index, the sandbox's blog-index skeleton poured
// with the live articles. Recent four, then the five categories, four rows each
// and the rest behind Show more.
import '@/app/styles/blog.css'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import { Thumb, PostRow, Mins } from '@/components/site/Post'
import { getAllArticles } from '@/lib/articles'
import { CATEGORIES, CATEGORY_ORDER, categoryOf } from '@/lib/categories'

const SITE_URL = 'https://undercurrentautomations.com'
const SHOW = 4

// ISR: rebuilt hourly, so a scheduled article joins the index on its date with no deploy
export const revalidate = 3600

export const metadata = {
  title: 'Blog',
  description: 'Notes from the work. Guides on AI search, automation, websites and strategy for Australian small business, filed under the service each one belongs to.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog | UnderCurrent Automations',
    description: 'Guides on AI search, automation, websites and strategy for Australian small business.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: ['/brand/og-card.png'],
  },
}

export default function BlogIndex() {
  const articles = getAllArticles()
  const byCat = Object.fromEntries(CATEGORY_ORDER.map(k => [k, articles.filter(a => categoryOf(a.cluster).key === k)]))
  const cats = CATEGORY_ORDER.filter(k => byCat[k].length)
  const [feat, ...rest] = articles
  const fc = categoryOf(feat.cluster)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnderCurrent Blog',
    url: `${SITE_URL}/blog`,
    description: metadata.description,
    isPartOf: { '@id': `${SITE_URL}#website` },
    hasPart: cats.map(k => ({
      '@type': 'ItemList',
      name: CATEGORIES[k].label,
      numberOfItems: byCat[k].length,
      itemListElement: byCat[k].map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/blog/${a.slug}`, name: a.title })),
    })),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  }

  return (
    <>
      <PageFx more />
      <JsonLd schema={schema} />
      <JsonLd schema={breadcrumb} />

      <section className="hero" id="top" data-reveal="">
        <div className="hero__layer hero__photo"></div>
        <div className="hero__layer hero__glow a"></div>
        <div className="hero__layer hero__glow b"></div>
        <div className="hero__layer hero__static"></div>
        <div className="hero__layer hero__grain"></div>
        <div className="hero__inner">
          <h1 className="rv">Blog</h1>
          <p className="hero__sub rv" style={{ '--i': '1' }}>Notes from the work.</p>
        </div>
      </section>
      <div id="content"></div>

      <section className="sec" id="recent" data-reveal="">
        <div className="wrap">
          <div className="sec__head"><span className="eyebrow">Recent</span><span className="eyebrow">{articles.length} articles</span></div>
          <div className="feat">
            <a className={`fp c-${fc.key} rv`} href={`/blog/${feat.slug}`}>
              <Thumb slug={feat.slug} big />
              <span className="pmeta"><b className="pcat">{fc.label}</b><span className="pm-d"><em>·</em><Mins a={feat} /></span></span>
              <h3>{feat.title}</h3>
              <p>{feat.description || feat.summary}</p>
              <span className="pdate"><Mins a={feat} /></span>
            </a>
            <div className="posts">{rest.slice(0, 3).map((a, i) => <PostRow key={a.slug} a={a} i={i + 1} ex />)}</div>
          </div>
        </div>
      </section>

      <section className="sec sec--off" id="by-service" data-reveal="">
        <div className="wrap">
          <div className="sec__head"><span className="eyebrow">By service</span></div>
          <div className="two">
            <h2 className="rv">Filed under the service it belongs to.</h2>
            <p className="rv" style={{ '--i': '1' }}>Every article sits under one of the five things we do, so you can read your way through one problem at a time.</p>
          </div>
          <nav className="jump rv" style={{ '--i': '1' }}>
            {cats.map(k => <a key={k} className={`c-${k}`} href={`#cat-${k}`}><b><i className="dot"></i>{CATEGORIES[k].label}</b><span>{byCat[k].length}</span></a>)}
          </nav>
        </div>
      </section>

      {cats.map((k, i) => (
        <section key={k} className={`sec cat c-${k}${i % 2 ? ' sec--off' : ''}`} id={`cat-${k}`} data-reveal="">
          <div className="chead rv"><div className="hero__layer band"></div><div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
            <div className="chead__in"><span className="eyebrow">{CATEGORIES[k].label}</span><span className="eyebrow">{byCat[k].length} articles</span></div>
          </div>
          <div className="wrap">
            <div className="posts plist">{byCat[k].map((a, j) => <PostRow key={a.slug} a={a} i={j + 1} cat={false} hidden={j >= SHOW} />)}</div>
            <div className="more rv" style={{ '--i': '2' }}><span data-shown=""></span><button className="link" data-more="">Show more</button></div>
          </div>
        </section>
      ))}
    </>
  )
}
