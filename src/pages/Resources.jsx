import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { getAllArticles, CLUSTER_LABELS } from '../utils/articles'

function OceanCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const currents = [
      { yFrac: 0.2, amp: 40, freq: 0.003, speed: 0.008, alpha: 0.08, lw: 2 },
      { yFrac: 0.35, amp: 30, freq: 0.004, speed: -0.006, alpha: 0.06, lw: 1.5 },
      { yFrac: 0.5, amp: 50, freq: 0.002, speed: 0.01, alpha: 0.07, lw: 2.5 },
      { yFrac: 0.65, amp: 25, freq: 0.005, speed: -0.007, alpha: 0.05, lw: 1 },
      { yFrac: 0.8, amp: 35, freq: 0.003, speed: 0.009, alpha: 0.06, lw: 1.8 },
    ]

    let t = 0
    const draw = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach(c => {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(143,175,159,${c.alpha})`
        ctx.lineWidth = c.lw
        for (let x = 0; x <= W; x += 4) {
          const y = c.yFrac * H + Math.sin(x * c.freq + t * c.speed * 60) * c.amp + Math.cos(x * c.freq * 0.5 + t * c.speed * 30) * c.amp * 0.4
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.35, pointerEvents: 'none' }}
    />
  )
}

const publishedArticles = getAllArticles()

function PublishedArticleCard({ article, delay }) {
  return (
    <Reveal delay={delay} y={30}>
      <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="resource-card"
          style={{
            background: 'linear-gradient(145deg, rgba(143,175,159,0.05) 0%, rgba(28,28,26,0.2) 100%)',
            border: '1px solid rgba(143,175,159,0.1)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
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
          {/* Hero image area */}
          <div style={{
            width: '100%', height: '180px',
            background: 'linear-gradient(135deg, rgba(143,175,159,0.06) 0%, rgba(28,28,26,0.4) 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <img
              src={`/articles/${article.slug}/hero.jpg`}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            {/* Card wave decoration */}
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', overflow: 'hidden' }}>
              <svg style={{ position: 'absolute', bottom: 0, width: '200%', height: '40px', animation: `cardWave 7s ease-in-out infinite` }} viewBox="0 0 1440 40" preserveAspectRatio="none">
                <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1440,10 1440,20 L1440,40 L0,40 Z" fill="rgba(143,175,159,0.12)" />
              </svg>
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.6)' }}>
                {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
              </span>
              <span className="font-mono" style={{ fontSize: '0.45rem', letterSpacing: '0.12em', color: 'rgba(212,201,176,0.3)' }}>
                {article.readingTime} MIN
              </span>
              <span className="font-mono" style={{
                fontSize: '0.45rem', letterSpacing: '0.12em',
                color: 'rgba(212,201,176,0.3)',
                border: '1px solid rgba(212,201,176,0.1)',
                padding: '0.1rem 0.4rem',
                borderRadius: '9999px',
              }}>
                {article.level?.toUpperCase() || 'GUIDE'}
              </span>
            </div>
            <h3 className="font-cormorant" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              {article.title}
            </h3>
            <p className="font-dm" style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.65, marginBottom: '1rem' }}>
              {article.description}
            </p>
            <span className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 400, color: '#8FAF9F', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Read Article <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Resources() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3)
    tl.fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
  }, [])

  // Group published articles by cluster
  const clusterGroups = publishedArticles.reduce((acc, article) => {
    const key = article.cluster || 'uncategorised'
    if (!acc[key]) acc[key] = []
    acc[key].push(article)
    return acc
  }, {})

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title="Blog - AI & Automation Guides | UnderCurrent"
        description="Guides, playbooks, and lessons from the field. Everything we've learned building AI automation for small businesses, organised by topic."
        canonical="https://www.undercurrentautomations.com/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'UnderCurrent Blog',
          description: 'Guides, playbooks, and lessons from the field. AI automation knowledge for Australian small businesses.',
          url: 'https://www.undercurrentautomations.com/blog',
          provider: {
            '@type': 'Organization',
            '@id': 'https://www.undercurrentautomations.com/#business',
            name: 'UnderCurrent',
          },
        }}
      />
      <ScrollProgressBar />
      <Navbar ready isSubPage />
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100dvh', minHeight: '600px', background: '#1C1C1A' }}
      >
        <video
          ref={videoRef}
          preload="auto"
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.35, pointerEvents: 'none',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
            'linear-gradient(to right,  #1C1C1A 0%, transparent 22%)',
            'linear-gradient(to left,   #1C1C1A 0%, transparent 22%)',
          ].join(', '),
        }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: '3rem' }}>
          <p className="font-mono mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)' }}>
            RESOURCES
          </p>
          <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
              AI & Automation
            </span>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
              Guides.
            </span>
          </h1>
          <p ref={subRef} className="font-dm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '48ch', marginTop: '2rem', opacity: 0 }}>
            Insights from the field. Guides, playbooks, and lessons we've learned building AI automation for small businesses — organised by topic.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(143,175,159,0.35)' }}>
          ↓ scroll to explore
        </div>
        <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
      </section>

      {/* ── Ambient background ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: '700px', height: '600px', left: '-250px', top: '60%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.1) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-150px', top: '70%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.07) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
      </div>

      <OceanCanvas />

      {/* ── Content section ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '7.5rem 1.5rem 7.5rem' }}>

        {/* Section header */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', fontWeight: 500, color: '#8FAF9F', marginBottom: '1rem' }}>
              BROWSE BY TOPIC
            </p>
            <h2 className="font-cormorant" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600,
              color: '#F7F3ED', lineHeight: 1.15, letterSpacing: '-0.01em', marginBottom: '0.75rem',
            }}>
              Deep Dives, Organised<br />by What Matters
            </h2>
            <p className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,201,176,0.45)', lineHeight: 1.7 }}>
              Guides, playbooks, and lessons from the field, organised by topic.
            </p>
          </div>
        </Reveal>

        {/* Articles grouped by cluster */}
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {Object.entries(clusterGroups).map(([cluster, articles], gi) => (
            <div key={cluster} style={{ marginBottom: gi < Object.keys(clusterGroups).length - 1 ? '4rem' : 0 }}>
              <Reveal delay={0.05}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '28px', height: '1px', background: 'rgba(143,175,159,0.3)' }} />
                  <h3 className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#8FAF9F', fontWeight: 500 }}>
                    {CLUSTER_LABELS[cluster]?.toUpperCase() || cluster.toUpperCase()}
                  </h3>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(143,175,159,0.08)' }} />
                  <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.3)' }}>
                    {articles.length} {articles.length === 1 ? 'ARTICLE' : 'ARTICLES'}
                  </span>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article, ai) => (
                  <PublishedArticleCard
                    key={article.slug}
                    article={article}
                    delay={0.05 * (ai + 1)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes cardWave { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-25%); } }
      `}</style>

      <Footer />
    </div>
  )
}
