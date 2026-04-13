import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getArticleBySlug, getArticlesByCluster, CLUSTER_LABELS } from '../utils/articles'

const DOMAIN = 'https://www.undercurrentautomations.com'

function AuthorRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'rgba(143,175,159,0.12)',
        border: '1px solid rgba(143,175,159,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span className="font-mono" style={{ fontSize: '0.7rem', color: '#8FAF9F', fontWeight: 600 }}>L</span>
      </div>
      <div>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <span className="font-dm" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#F7F3ED', display: 'block' }}>
            Luke — Founder, UnderCurrent Automations
          </span>
        </Link>
        <p className="font-dm" style={{
          fontSize: '0.78rem',
          fontWeight: 300,
          color: 'rgba(212,201,176,0.5)',
          margin: '0.15rem 0 0',
          lineHeight: 1.4,
        }}>
          Builds AI automation for small businesses across Australia.
        </p>
      </div>
    </div>
  )
}

function AuthorBox() {
  return (
    <Reveal>
      <aside style={{
        margin: '3rem 0 0',
        padding: '1.5rem 0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        borderTop: '1px solid rgba(143,175,159,0.12)',
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'rgba(143,175,159,0.1)',
          border: '1px solid rgba(143,175,159,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: '#8FAF9F', fontWeight: 600 }}>L</span>
        </div>
        <div>
          <p className="font-mono" style={{ fontSize: '0.55rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.45)', marginBottom: '0.4rem' }}>
            WRITTEN BY
          </p>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <span className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 500, color: '#F7F3ED' }}>
              Luke — Founder of UnderCurrent Automations
            </span>
          </Link>
          <p className="font-dm" style={{
            fontSize: '0.85rem',
            fontWeight: 300,
            color: 'rgba(212,201,176,0.45)',
            lineHeight: 1.6,
            marginTop: '0.35rem',
          }}>
            Builds AI automation systems for small businesses across Australia.
          </p>
        </div>
      </aside>
    </Reveal>
  )
}

function RelatedArticles({ cluster, currentSlug }) {
  const related = getArticlesByCluster(cluster).filter(a => a.slug !== currentSlug).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section style={{ maxWidth: '820px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'rgba(143,175,159,0.3)' }} />
          <h3 className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#8FAF9F', fontWeight: 500 }}>
            MORE IN {CLUSTER_LABELS[cluster]?.toUpperCase() || cluster.toUpperCase()}
          </h3>
          <div style={{ flex: 1, height: '1px', background: 'rgba(143,175,159,0.08)' }} />
        </div>
      </Reveal>
      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {related.map((article, i) => (
          <Reveal key={article.slug} delay={0.05 * (i + 1)} y={30}>
            <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{
                  background: 'linear-gradient(145deg, rgba(143,175,159,0.05) 0%, rgba(28,28,26,0.2) 100%)',
                  border: '1px solid rgba(143,175,159,0.1)',
                  borderRadius: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.6)', marginBottom: '0.6rem' }}>
                  {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
                </p>
                <h4 className="font-cormorant" style={{ fontSize: '1.15rem', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.25, marginBottom: '0.5rem' }}>
                  {article.title}
                </h4>
                <p className="font-dm" style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.6 }}>
                  {article.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <Reveal>
      <section style={{
        maxWidth: '820px',
        margin: '4rem auto',
        padding: '2.5rem',
        background: 'linear-gradient(145deg, rgba(143,175,159,0.08) 0%, rgba(28,28,26,0.3) 100%)',
        border: '1px solid rgba(143,175,159,0.15)',
        borderRadius: '1.25rem',
        textAlign: 'center',
      }}>
        <h3 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F7F3ED', marginBottom: '0.75rem' }}>
          Want this automated for your business?
        </h3>
        <p className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,201,176,0.5)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '48ch', margin: '0 auto 1.5rem' }}>
          We build custom automation systems for small businesses. Get a free audit to see where you're leaking time.
        </p>
        <Link
          to="/audit"
          className="font-dm"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'rgba(143,175,159,0.12)',
            border: '1px solid rgba(143,175,159,0.3)',
            borderRadius: '9999px',
            color: '#8FAF9F',
            fontSize: '0.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(143,175,159,0.2)'
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(143,175,159,0.12)'
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.3)'
          }}
        >
          Book a Free Audit
        </Link>
      </section>
    </Reveal>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function buildJsonLdSchemas(article, canonical) {
  const heroImage = article.image
    ? (article.image.startsWith('http') ? article.image : `${DOMAIN}${article.image}`)
    : `${DOMAIN}/articles/${article.slug}/hero.jpg`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: 'Luke',
      url: `${DOMAIN}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
      url: DOMAIN,
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
    },
    datePublished: article.date,
    dateModified: article.updated || article.date,
    keywords: article.keyword,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image: { '@type': 'ImageObject', url: heroImage },
    wordCount: article.html
      ? article.html.replace(/<[^>]+>/g, '').trim().split(/\s+/).length
      : undefined,
    articleSection: CLUSTER_LABELS[article.cluster] || article.cluster,
    inLanguage: 'en-AU',
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}/blog` },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonical },
    ],
  }

  const schemas = [articleLd, breadcrumbLd]

  if (article.faqItems && article.faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  if (article.howToSteps && article.howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: article.title,
      step: article.howToSteps.map((step, i) => ({
        '@type': 'HowToStep',
        name: step.name || `Step ${i + 1}`,
        text: step.text,
      })),
    })
  }

  return schemas
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <Navigate to="/blog" replace />

  const canonical = `${DOMAIN}/blog/${article.slug}`
  const jsonLdSchemas = buildJsonLdSchemas(article, canonical)
  const heroImage = article.image || null

  const extraMeta = [
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: 'UnderCurrent Automations' },
    { property: 'article:published_time', content: article.date },
    { property: 'article:author', content: 'Luke' },
    { property: 'article:section', content: CLUSTER_LABELS[article.cluster] || article.cluster },
    { property: 'article:tag', content: article.keyword },
  ]

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title={`${article.title} | UnderCurrent`}
        description={article.description}
        canonical={canonical}
        ogImage={heroImage
          ? (heroImage.startsWith('http') ? heroImage : `${DOMAIN}${heroImage}`)
          : `${DOMAIN}/articles/${article.slug}/hero.jpg`
        }
        jsonLd={jsonLdSchemas}
        extraMeta={extraMeta}
      />
      <ScrollProgressBar />
      <Navbar ready isSubPage />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: article.title },
      ]} />

      {/* Ambient background glow */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: '700px', height: '600px', left: '-250px', top: '40%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.08) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-150px', top: '60%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.05) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
      </div>

      {/* Article */}
      <article
        style={{ position: 'relative', zIndex: 10, paddingTop: '5.5rem', paddingBottom: '4rem' }}
        itemScope
        itemType="https://schema.org/Article"
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 1.5rem' }}>

          <Reveal>
            {/* Meta pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {article.cluster && (
                <span className="font-mono" style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: '#8FAF9F',
                  border: '1px solid rgba(143,175,159,0.3)',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '9999px',
                  background: 'rgba(143,175,159,0.08)',
                  whiteSpace: 'nowrap',
                }}>
                  {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
                </span>
              )}
              {article.level && (
                <span className="font-mono" style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(212,201,176,0.55)',
                  border: '1px solid rgba(212,201,176,0.15)',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                }}>
                  {article.level.toUpperCase()}
                </span>
              )}
              <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(143,175,159,0.45)', whiteSpace: 'nowrap' }}>
                {formatDate(article.date)}
              </span>
              {article.readingTime && (
                <span className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(143,175,159,0.45)', whiteSpace: 'nowrap' }}>
                  {article.readingTime} MIN READ
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="font-cormorant"
              itemProp="headline"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#F7F3ED',
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                marginBottom: '1rem',
              }}
            >
              {article.title}
            </h1>

            {/* Description */}
            <p
              className="font-dm"
              itemProp="description"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                fontWeight: 300,
                color: 'rgba(232,224,208,0.72)',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}
            >
              {article.description}
            </p>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(143,175,159,0.15)', marginBottom: '1.5rem' }} />

            {/* Author row */}
            <AuthorRow />

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(143,175,159,0.15)', margin: '1.5rem 0 2rem' }} />
          </Reveal>

          {/* Hero image — shown when `image` frontmatter field is set */}
          {heroImage && (
            <Reveal delay={0.05}>
              <figure style={{ margin: '0 0 2.5rem' }}>
                <img
                  src={heroImage}
                  alt={article.title}
                  loading="eager"
                  itemProp="image"
                  style={{
                    width: '100%',
                    borderRadius: '0.75rem',
                    display: 'block',
                    aspectRatio: '16 / 9',
                    objectFit: 'cover',
                  }}
                />
              </figure>
            </Reveal>
          )}

          {/* Article body */}
          <Reveal delay={heroImage ? 0.1 : 0.05}>
            <div itemProp="articleBody">
              <MarkdownRenderer html={article.html} />
            </div>
          </Reveal>

          <AuthorBox />
        </div>
      </article>

      <RelatedArticles cluster={article.cluster} currentSlug={article.slug} />
      <CTASection />
      <Footer />
    </div>
  )
}
