// Service page — server component. One layout for all entries in lib/data/services.js.
// Dispatched from app/[slug]/page.js. No 'use client' — crawlers read initial HTML only.
// Layout matches the V5a exploration (boxed Q&A, high contrast, sticky TOC).

import { execSync } from 'node:child_process'
import Link from 'next/link'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import PillCTA from '@/components/ui/PillCTA'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { DOMAIN, PROVIDER, AREAS_SERVED, LOCATIONS } from '@/lib/data/seo'

// Default "last reviewed" date for service pages, ISO 8601 (YYYY-MM-DD).
// Derived from the last git commit that touched lib/data/services.js so any
// service edit automatically bumps freshness without a manual field update.
// Per-service override: set `dateModified` on the entry in lib/data/services.js
// (useful when a single service gets a content refresh unrelated to a commit).
// Fallback constant is used when git isn't available (sandboxed build envs).
const GIT_FALLBACK_DATE = '2026-04-19'
function resolveDefaultDateModified() {
  try {
    const iso = execSync('git log -1 --format=%cI -- lib/data/services.js', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso.slice(0, 10)
  } catch {}
  return GIT_FALLBACK_DATE
}
const DEFAULT_SERVICE_DATE_MODIFIED = resolveDefaultDateModified()

function formatReviewedDate(iso) {
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

// ─── Display helpers ────────────────────────────────────────────────────────
// Services can set `displayName` to override slug-derived naming when the slug
// form is wrong, e.g. acronyms like "ai-strategy-training" → "AI Strategy & Training".
function serviceDisplayName(service) {
  // "customer-experience-automation" → "Customer experience automation"
  // "inbound-lead-management-melbourne" → "Inbound lead management"
  if (service.displayName) return service.displayName
  const clean = service.slug.replace(/-melbourne$/, '')
  const words = clean.split('-')
  return words.map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
}

function serviceTitleCase(service) {
  // "Sales Automation", "Inbound Lead Management"
  if (service.displayName) return service.displayName
  const clean = service.slug.replace(/-melbourne$/, '')
  return clean.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
}

function serviceLocation(service) {
  return service.slug.endsWith('-melbourne') ? 'Melbourne' : 'Australia'
}

function priceRangeFromTiers(tiers) {
  const nums = tiers
    .map(t => parseInt(String(t.priceFrom).replace(/[^\d]/g, ''), 10))
    .filter(Number.isFinite)
  if (!nums.length) return '$$-$$$'
  const lo = Math.min(...nums)
  if (lo < 4000) return '$$'
  if (lo < 8000) return '$$-$$$'
  return '$$$'
}

// ─── JSON-LD builder ────────────────────────────────────────────────────────
function buildServiceJsonLd(service) {
  const url          = `${DOMAIN}/${service.slug}`
  const name         = serviceTitleCase(service)
  const nameLc       = serviceDisplayName(service)
  const location     = serviceLocation(service)
  const orgRef       = { '@id': `${DOMAIN}#organization` }
  const dateModified = service.dateModified || DEFAULT_SERVICE_DATE_MODIFIED

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${DOMAIN}/services` },
      { '@type': 'ListItem', position: 3, name,             item: url },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType: `${name} for Australian small businesses`,
    description: service.metaDescription,
    url,
    dateModified,
    provider: orgRef,
    areaServed: AREAS_SERVED.map(a => ({ '@type': 'Place', name: a })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: `Australian small and medium businesses using ${nameLc.toLowerCase()}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} deliverables`,
      itemListElement: service.whatWeDeliver.map((item, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      priceRange: priceRangeFromTiers(service.pricingTiers),
      availability: 'https://schema.org/InStock',
      url,
    },
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${PROVIDER.founder.url}#person`,
    name: PROVIDER.founder.name,
    jobTitle: PROVIDER.founder.jobTitle,
    url: PROVIDER.founder.url,
    sameAs: PROVIDER.founder.sameAs,
    worksFor: orgRef,
  }

  return [breadcrumb, serviceLd, faq, person]
}

// ─── TOC builder ────────────────────────────────────────────────────────────
function buildToc(service) {
  // Preserve casing when displayName is set (protects acronyms like "AI").
  const display = service.displayName ? service.displayName : serviceDisplayName(service).toLowerCase()
  return [
    { id: 'what',     label: `What is ${display}?` },
    { id: 'included', label: 'What does the build include?' },
    { id: 'who',      label: 'Who is it built for?' },
    { id: 'stack',    label: 'What tools does it work with?' },
    { id: 'process',  label: 'How does UnderCurrent build it?' },
    { id: 'compare',  label: 'How does it compare to alternatives?' },
    { id: 'pricing',  label: 'What does it cost?' },
    { id: 'timeline', label: 'How long does it take?' },
    { id: 'where',    label: 'Where does UnderCurrent operate?' },
    { id: 'faq',      label: 'Frequently asked questions' },
  ]
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const S = {
  heroBand:    { background: 'var(--bg-deep)' },
  contentBand: { background: 'var(--charcoal)' },
  card:        { background: 'var(--charcoal)', border: '1px solid var(--text-faint)', borderRadius: 14, padding: 32 },
  subcard:     { background: 'rgba(255,255,255,0.02)', border: '1px solid var(--text-faint)', borderRadius: 10, padding: 20 },
  chip:        { display: 'inline-block', padding: '5px 10px', border: '1px solid rgba(250,249,245,0.14)', background: 'rgba(255,255,255,0.025)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-primary)', borderRadius: 999 },
  eyebrowNum:  { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' },
  h1:          { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(36px, 4vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--off-white)' },
  h2:          { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.3vw, 28px)', lineHeight: 1.22, letterSpacing: '-0.015em', color: 'var(--off-white)' },
  h3:          { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.35, color: 'var(--off-white)' },
  lede:        { margin: 0, fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65, color: 'var(--text-primary)' },
  body:        { margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-primary)', fontWeight: 400 },
  small:       { margin: 0, fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-secondary)' },
  strong:      { color: 'var(--off-white)', fontWeight: 500 },
  label:       { fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' },
}

const ROW_KEYS = ['uc', 'manual', 'generic', 'agency']

// ─── Main component ─────────────────────────────────────────────────────────
export default function ServicePage({ service }) {
  const jsonLd       = buildServiceJsonLd(service)
  const toc          = buildToc(service)
  // When displayName is set, preserve its casing (protects acronyms like "AI").
  const displaySc    = serviceDisplayName(service)   // sentence case
  const displayLc    = service.displayName ? service.displayName : displaySc.toLowerCase()
  const location     = serviceLocation(service)
  const locationChip = 'Melbourne · Australia-wide'
  const areaServed   = AREAS_SERVED.join(', ')
  const dateModified = service.dateModified || DEFAULT_SERVICE_DATE_MODIFIED
  const reviewedLbl  = formatReviewedDate(dateModified)

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', paddingTop: 96 }}>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      {/* Scroll fade at the top so content dissolves into the fixed header */}
      <div aria-hidden style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, var(--bg-deep) 0%, rgba(18,18,16,0.85) 50%, transparent 100%)', pointerEvents: 'none', zIndex: 20 }} />

      {/* HERO BAND */}
      <section style={{ ...S.heroBand, padding: '0 var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ padding: '40px 0 0' }}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: serviceTitleCase(service) },
              ]}
            />
          </div>

          <div style={{ display: 'grid', gap: 72, gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', padding: '20px 0 96px' }} className="uc-hero-grid">
            <div>
              <div style={{ marginBottom: 28 }}>
                <SectionEyebrow n={service.index} label={`Service · ${displaySc}`} />
              </div>
              <h1 style={{ ...S.h1, maxWidth: 720, marginBottom: 28 }}>
                {displaySc} {location},{' '}
                <span className="uc-glow-word uc-glow-word--blue">built custom</span>
                {' '}by UnderCurrent.
              </h1>
              <p style={{ ...S.lede, maxWidth: 640, marginBottom: 28 }}>
                <strong style={S.strong}>{displaySc}</strong>{' '}{blufAfterTerm(service.bluf, displaySc)}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                <span style={S.chip}>{locationChip}</span>
                <span style={{ ...S.chip, color: 'var(--sage)', borderColor: 'rgba(143,175,159,0.35)' }}>Live in ~14 days</span>
                <span style={S.chip}>By {PROVIDER.name}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <PillCTA label="Book a scoping call" href="/contact" tone="blue" />
                <Link href="/audit" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, border: '1px solid var(--text-faint)', background: 'transparent', color: 'var(--off-white)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Free workflow audit <span aria-hidden style={{ fontSize: 13 }}>→</span>
                </Link>
              </div>
            </div>

            <aside style={{ ...S.card, padding: 0, boxShadow: '6px 6px 0 0 var(--sage)' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--text-faint)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={S.label}>Pipeline flow</span>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--sage)' }} />
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.pipelineStages.map((st, i) => (
                  <li key={i} style={{ padding: '14px 24px', display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 14, alignItems: 'center', borderBottom: i < service.pipelineStages.length - 1 ? '1px solid rgba(250,249,245,0.06)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--sage)', fontVariantNumeric: 'tabular-nums' }}>{st.n}</span>
                    <div>
                      <p style={{ ...S.h3, fontSize: 14, marginBottom: 3 }}>{st.label}</p>
                      <p style={{ ...S.small, fontSize: 12 }}>{st.sub}</p>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>→</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      {/* CONTENT BAND */}
      <section style={{ ...S.contentBand, padding: '80px var(--page-pad) 120px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gap: 64, gridTemplateColumns: '220px minmax(0, 1fr)' }} className="uc-body-grid">

          <aside className="uc-svc-toc" style={{ alignSelf: 'start', position: 'sticky', top: '38vh' }}>
            <div style={{ paddingBottom: 14, marginBottom: 18, borderBottom: '1px solid var(--text-faint)' }}>
              <span style={S.label}>On this page</span>
            </div>
            <nav aria-label="Table of contents" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {toc.map((t, i) => (
                <a key={t.id} href={`#${t.id}`} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  <span style={{ ...S.eyebrowNum, marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>{t.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="uc-svc-article" style={{ maxWidth: 780, display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0, 1fr)', minWidth: 0 }}>

            <QACard id="what" n="01" q={`What is ${displayLc}?`}>
              <p style={S.body}>
                <strong style={S.strong}>{displaySc}</strong>{' '}{blufAfterTerm(service.bluf, displaySc)}
              </p>
              <p style={{ ...S.body, marginTop: 14 }}>
                It is not a single tool you buy; it is the orchestration layer on top of the tools you already pay for, tuned to how <strong style={S.strong}>{service.heroPill}</strong> runs in your business day to day.
              </p>
            </QACard>

            <QACard id="included" n="02" q="What does the build include?">
              <p style={S.body}>{service.deliversHeadline} {service.whatWeDeliver.length} deliverables by default, each tuned to how your business already operates.</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 10 }}>
                {service.whatWeDeliver.map((item, i) => (
                  <li key={i} style={{ ...S.subcard, display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, padding: '14px 18px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--sage)', marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ ...S.body, fontSize: 14 }}>{item}</span>
                  </li>
                ))}
              </ol>
            </QACard>

            <QACard id="who" n="03" q="Who is it built for?">
              <p style={S.body}>{service.industriesCopy}</p>
              <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
                {service.industries.map((ind, i) => (
                  <div key={i} style={S.subcard}>
                    <p style={{ ...S.label, color: 'var(--blue-light)', margin: 0, marginBottom: 8 }}>{ind.label}</p>
                    <p style={{ ...S.h3, marginBottom: 8 }}>{ind.headline}</p>
                    <p style={S.small}>{ind.copy}</p>
                  </div>
                ))}
              </div>
            </QACard>

            <QACard id="stack" n="04" q="What tools does it work with?">
              <p style={S.body}>We build on the stack you already run. If a tool has an API, we can wire into it. Common integrations we deploy for <strong style={S.strong}>{displayLc}</strong>:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '20px 0' }}>
                {service.integrations.map(tool => (<span key={tool} style={S.chip}>{tool}</span>))}
              </div>
              <p style={S.body}>If you don't have a system in place yet, we help you choose a lightweight option that fits your business without adding overhead.</p>
            </QACard>

            <QACard id="process" n="05" q="How does UnderCurrent build it?">
              <p style={S.body}>{service.processHeadline} We move in weeks, not months.</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10 }}>
                <StepCard n="01" title="Map"   body="Audit how this works today. Sources, tools, handoffs, drop-off points. Output: a map with priority fixes." />
                <StepCard n="02" title="Build" body="Deploy automation against your existing stack. Configured, tested, and documented end to end." />
                <StepCard n="03" title="Flow"  body="Hand over, train, monitor for 30 days. Results visible within 2–3 weeks of live." />
              </ol>
            </QACard>

            <QACard id="compare" n="06" q="How does it compare to alternatives?">
              <p style={S.body}>{service.comparisonCopy} Rows are capabilities; columns are approaches. A check means the approach consistently delivers.</p>
              <div style={{ ...S.subcard, padding: 0, overflowX: 'auto', marginTop: 20 }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--text-faint)' }}>
                      <th style={{ textAlign: 'left', padding: 14, ...S.label }}>Capability</th>
                      {service.comparisonColumns.map((c, i) => (
                        <th key={i} style={{ padding: 14, textAlign: 'center', ...S.label, color: i === 0 ? 'var(--blue-light)' : 'var(--text-muted)' }}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {service.comparisonRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < service.comparisonRows.length - 1 ? '1px solid rgba(250,249,245,0.06)' : 'none' }}>
                        <td style={{ padding: 14, fontSize: 13.5, color: 'var(--text-primary)' }}>{row.label}</td>
                        {service.comparisonColumns.map((_, ci) => (
                          <td key={ci} style={{ padding: 14, textAlign: 'center' }}>
                            <Check on={row[ROW_KEYS[ci]]} highlight={ci === 0} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </QACard>

            <QACard id="pricing" n="07" q="What does it cost?">
              <p style={S.body}>Project-priced, not per-seat. No ongoing software licence fees, because we build on the stack you already pay for.</p>
              <div style={{ display: 'grid', gap: 12, marginTop: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                {service.pricingTiers.map((t) => (
                  <div key={t.name} style={S.subcard}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage-light)', margin: 0, marginBottom: 6 }}>{t.priceFrom}</p>
                    <p style={{ ...S.h3, marginBottom: 4 }}>{t.name}</p>
                    <p style={{ ...S.label, fontSize: 11, letterSpacing: '0.08em', marginBottom: 10 }}>{t.tag}</p>
                    <p style={S.small}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </QACard>

            <QACard id="timeline" n="08" q="How long does it take?">
              <p style={S.body}>Most builds go live within <strong style={S.strong}>7 to 14 days</strong> of the first scoping call. Week one is discovery; week two is build and rollout. Measurable results are visible within 2 to 3 weeks of going live.</p>
              <p style={{ ...S.body, marginTop: 14 }}>Full, multi-channel systems run <strong style={S.strong}>3 to 4 weeks</strong> end-to-end. We give you a firm timeline before committing, with no scope creep.</p>
            </QACard>

            <QACard id="where" n="09" q="Where does UnderCurrent operate?">
              <p style={S.body}>Based in <strong style={S.strong}>Melbourne, Australia</strong>. We serve clients across {areaServed}. Most discovery and build work runs remotely; onsite sessions are available across greater Melbourne.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                {LOCATIONS.map(loc => (<span key={loc} style={S.chip}>{loc}</span>))}
              </div>
            </QACard>

            <QACard id="faq" n="10" q="Frequently asked questions">
              <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                {service.faqs.map((f, i) => (
                  <div key={i} style={S.subcard}>
                    <h3 style={{ ...S.h3, fontSize: 15, marginBottom: 10 }}>{f.q}</h3>
                    <p style={S.small}>{f.a}</p>
                  </div>
                ))}
              </div>
            </QACard>

            {/* Author */}
            <section style={{ ...S.card, padding: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <SectionEyebrow n="11" label="Written by" />
              </div>
              <p style={{ ...S.h3, fontSize: 18, marginBottom: 6 }}>{PROVIDER.founder.name}</p>
              <p style={{ ...S.small, marginBottom: 14 }}>Founder of {PROVIDER.name}. Builds sales, content, finance and operations automation for Australian small businesses.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                <Link href="/about" style={{ ...S.chip, textDecoration: 'none' }}>About Luke →</Link>
                <time dateTime={dateModified} style={{ ...S.label, fontSize: 11, letterSpacing: '0.12em' }}>
                  Last reviewed {reviewedLbl}
                </time>
              </div>
            </section>

            {/* Further reading: service cross-links */}
            <section style={S.card}>
              <div style={{ marginBottom: 20 }}>
                <SectionEyebrow n="12" label="Further reading" />
              </div>
              <p style={{ ...S.h2, fontSize: 20, marginBottom: 20 }}>Related services and source material.</p>
              <div style={{ borderTop: '1px solid rgba(250,249,245,0.1)' }}>
                {service.internalLinks.map(l => ({ label: l.label, href: l.path, kind: 'Service' })).map((r, i) => (
                  <Link key={i} href={r.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--text-faint)', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                      <span style={{ ...S.label, color: 'var(--sage-light)', width: 64, flexShrink: 0 }}>{r.kind}</span>
                      <span style={{ ...S.body, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="uc-svc-cta" style={{ ...S.card, padding: 40, boxShadow: '6px 6px 0 0 var(--blue)' }}>
              <p style={{ ...S.h2, maxWidth: 560, marginBottom: 12 }}>{service.ctaHeadline}</p>
              <p style={{ ...S.body, maxWidth: 560, marginBottom: 24 }}>{service.ctaCopy}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <PillCTA label="Book a scoping call" href="/contact" tone="blue" />
                <Link href="/audit" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, border: '1px solid var(--text-faint)', background: 'transparent', color: 'var(--off-white)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>
                  Free workflow audit <span aria-hidden style={{ fontSize: 13 }}>→</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .uc-hero-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 40px !important; }
          .uc-body-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 32px !important; }
          .uc-svc-toc { position: static !important; top: auto !important; }
        }
        @media (max-width: 700px) {
          .uc-svc-qacard { padding: 22px !important; }
          .uc-svc-subcard { padding: 16px !important; }
          .uc-svc-cta { padding: 28px !important; }
        }
      `}</style>
    </div>
  )
}

// Strip the repeated bolded term from the start of the BLUF so we can inline it
// with a <strong> tag without printing the term twice.
function blufAfterTerm(bluf, term) {
  const lower = bluf.toLowerCase()
  const t = term.toLowerCase()
  if (lower.startsWith(t)) return bluf.slice(term.length).replace(/^\s+/, '')
  return bluf
}

function QACard({ id, n, q, children }) {
  return (
    <section id={id} className="uc-svc-qacard" style={{ scrollMarginTop: 96, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,249,245,0.1)', borderRadius: 14, padding: 32, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{n}</span>
        <span style={{ width: 24, height: 1, background: 'var(--text-faint)', display: 'inline-block' }} />
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.3vw, 28px)', lineHeight: 1.22, letterSpacing: '-0.015em', color: 'var(--off-white)' }}>{q}</h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

function StepCard({ n, title, body }) {
  return (
    <li style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(250,249,245,0.1)', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--sage)', width: 36, flexShrink: 0, marginTop: 2 }}>{n}</span>
      <div>
        <p style={{ margin: 0, marginBottom: 6, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, color: 'var(--off-white)' }}>{title}</p>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{body}</p>
      </div>
    </li>
  )
}

function Check({ on, highlight }) {
  if (!on) return <span style={{ color: 'var(--text-faint)' }}>·</span>
  return <span style={{ color: highlight ? 'var(--sage)' : 'var(--text-muted)' }}>✓</span>
}
