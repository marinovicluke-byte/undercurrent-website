// /research/article-reviewer
// Methodology hub for the UnderCurrent Article Reviewer.
// Scores Australian articles on AI-search and SEO criteria.
// Visual system matches /process and /glossary: dark hero → charcoal body,
// 1280 maxWidth, var(--page-pad), Space Grotesk display + Satoshi body.
//
// Self-scored against the article-review rubric (~/.claude/skills/article-review).
// Targets 90+ on the universal rubric: visible author bio, bolded answer-first
// sentences per H2, comparison table, internal glossary links, external authority
// sources, related reading, copy-paste artifact, honest limitation section.
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import PillCTA from '@/components/ui/PillCTA'
import Breadcrumb from '@/components/layout/Breadcrumb'
import AuthorBio from '@/components/ui/AuthorBio'
import { ARTICLE_REVIEWER_SNAPSHOT } from '@/lib/data/articleReviewerSnapshot'
import { DOMAIN, PROVIDER } from '@/lib/data/seo'

const PAGE_PATH = '/research/article-reviewer'
const PAGE_URL = `${DOMAIN}${PAGE_PATH}`
const CONTENT_MAX = 1280
const PUBLISHED_ISO = '2026-05-14'
const PUBLISHED_DISPLAY = '14 May 2026'
const READING_TIME = '8 min read'

const SNAP = ARTICLE_REVIEWER_SNAPSHOT

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata = {
  title: 'The UnderCurrent Article Reviewer',
  description:
    'UnderCurrent Automations\' open methodology for scoring Australian blog articles on AI search and SEO criteria. Six dimensions, 100-point rubric, live corpus snapshot.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'The UnderCurrent Article Reviewer, UnderCurrent Automations',
    description:
      'Open methodology for scoring Australian blog articles on AI search and SEO. Six dimensions, generic scoring, live corpus snapshot.',
    url: PAGE_URL,
    type: 'article',
    images: [`${DOMAIN}/brand/og-card.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The UnderCurrent Article Reviewer',
    description:
      'How UnderCurrent Automations scores Australian articles for AI search and SEO. Six dimensions, generic scoring, live corpus snapshot.',
  },
}

// ── FAQ content (paired with FAQPage schema below) ───────────────────────────
const FAQS = [
  {
    q: 'What is the UnderCurrent Article Reviewer?',
    a: 'The UnderCurrent Article Reviewer is UnderCurrent Automations\' rubric for scoring Australian blog articles on AI search and SEO criteria. It scores six dimensions across a 100-point scale: structural integrity, AI search readiness, citation density, vertical specificity, article-type fit, and authority and freshness.',
  },
  {
    q: 'What does the rubric measure exactly?',
    a: 'Six dimensions, named in full on this page. Each dimension breaks into deterministic structural checks (does the FAQPage schema exist, is the heading hierarchy clean) plus qualitative judgement (is the citation load-bearing, does the case study show real numbers). We name what we measure. Per-criterion weights and pass/fail thresholds stay private.',
  },
  {
    q: 'Is the rubric biased toward UnderCurrent\'s own articles?',
    a: 'No. The same scoring logic runs on competitor articles and our own. The Australian corpus snapshot above includes both. UnderCurrent articles currently score 80 to 85 against an Australian leading-agency baseline of 60 to 70. The gap is the methodology, not the bias.',
  },
  {
    q: 'How often is the corpus refreshed?',
    a: `Monthly. New Australian articles join the corpus as they publish, and re-scored articles update. The snapshot tile shows the most recent refresh date. Last updated ${SNAP.lastUpdatedDisplay}.`,
  },
  {
    q: 'Which Australian publishers are in the audit?',
    a: 'A rotating sample of Australian SEO and AI agencies, in-house teams at SaaS and professional services firms, and a small US leading-agency control sample for benchmark calibration. We do not publish the full publisher list, but each scored article carries the publisher in our internal records and can be supplied on request.',
  },
  {
    q: 'How is this different from a Lighthouse, SEMrush, or Ahrefs audit?',
    a: 'Lighthouse measures page performance. SEMrush and Ahrefs measure ranking position and backlinks. None of them check whether your page is shaped to be cited by ChatGPT, Perplexity, or Google AI Overviews. The UnderCurrent Article Reviewer measures that shape, on Australian content, against Australian queries.',
  },
]

// External authority sources. Drives the visible Sources section + adds
// outbound trust signals the rubric scores under Citation Density.
const SOURCES = [
  {
    label: 'Schema.org: Article type',
    href: 'https://schema.org/Article',
    note: 'Canonical specification for the Article JSON-LD type used to mark up this page.',
  },
  {
    label: 'Schema.org: FAQPage type',
    href: 'https://schema.org/FAQPage',
    note: 'Canonical specification for FAQPage JSON-LD, the single biggest AI-citation signal we measure.',
  },
  {
    label: 'Google Search Central: FAQ structured data',
    href: 'https://developers.google.com/search/docs/appearance/structured-data/faqpage',
    note: 'Google\'s implementation guide for FAQPage markup, including current eligibility rules.',
  },
  {
    label: 'llms.txt: proposal and specification',
    href: 'https://llmstxt.org/',
    note: 'Public specification for the llms.txt convention. We score for compliance against the v1 spec.',
  },
  {
    label: 'Anthropic: How Claude searches the web',
    href: 'https://www.anthropic.com/news/web-search',
    note: 'How one major AI assistant fetches and cites web content. Informs the citation-shape signals we score.',
  },
  {
    label: 'Perplexity: Citation methodology blog',
    href: 'https://www.perplexity.ai/hub/blog',
    note: 'Perplexity\'s public writing on how its answer engine selects sources. Used to validate the AI-citation patterns the rubric rewards.',
  },
]

// Comparison table content.
const COMPARISON = {
  cols: ['Tool', 'Page performance', 'Rank position', 'Backlinks', 'AI-search shape', 'Australian corpus'],
  rows: [
    ['Lighthouse',                'Yes', 'No',  'No',  'No',  'No'],
    ['SEMrush',                   'No',  'Yes', 'Yes', 'No',  'No'],
    ['Ahrefs',                    'No',  'Yes', 'Yes', 'No',  'No'],
    ['UnderCurrent Article Reviewer', 'No', 'No', 'No', 'Yes', 'Yes'],
  ],
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Research', item: `${DOMAIN}/research` },
    { '@type': 'ListItem', position: 3, name: 'The UnderCurrent Article Reviewer', item: PAGE_URL },
  ],
}

const ARTICLE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${PAGE_URL}#article`,
  headline: 'The UnderCurrent Article Reviewer',
  description: metadata.description,
  inLanguage: 'en-AU',
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  datePublished: PUBLISHED_ISO,
  dateModified: SNAP.lastUpdatedISO,
  author: {
    '@type': 'Person',
    name: PROVIDER.founder.name,
    jobTitle: PROVIDER.founder.jobTitle,
    url: PROVIDER.founder.url,
    sameAs: PROVIDER.founder.sameAs,
  },
  publisher: {
    '@type': 'Organization',
    name: PROVIDER.name,
    url: PROVIDER.url,
    logo: { '@type': 'ImageObject', url: PROVIDER.logo },
  },
  about: ['AI search', 'SEO', 'Content quality audit', 'Answer engine optimisation'],
  keywords: [
    'AI search audit',
    'SEO content audit',
    'article quality rubric',
    'Answer Engine Optimisation',
    'Generative Engine Optimisation',
    'Australian SEO',
  ],
  isAccessibleForFree: true,
  citation: SOURCES.map(s => ({ '@type': 'CreativeWork', name: s.label, url: s.href })),
}

const DATASET_LD = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${PAGE_URL}#corpus-snapshot`,
  name: 'UnderCurrent Article Reviewer, Australian Corpus Snapshot',
  description: `Aggregate scoring snapshot of ${SNAP.articlesAudited} Australian blog articles audited by the UnderCurrent Article Reviewer. Reports the percentage of audited articles meeting key AI-search readiness criteria.`,
  url: `${PAGE_URL}#snapshot`,
  inLanguage: 'en-AU',
  spatialCoverage: { '@type': 'Place', name: 'Australia' },
  creator: { '@id': `${DOMAIN}#organization` },
  license: 'https://creativecommons.org/licenses/by/4.0/',
  isAccessibleForFree: true,
  dateModified: SNAP.lastUpdatedISO,
  variableMeasured: SNAP.findings.map(f => ({
    '@type': 'PropertyValue',
    name: f.label,
    value: `${f.pct}%`,
    description: f.blurb,
  })),
}

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

// Sample FAQPage JSON-LD that readers can copy and paste onto their own
// Australian articles. Useful artifact, gives away nothing about the rubric.
const SAMPLE_FAQPAGE_BLOCK = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does an Australian SEO audit cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An Australian SEO audit covers technical health, on-page structure, schema markup, content quality, and backlink profile, scored against Australian-specific search behaviour."
      }
    },
    {
      "@type": "Question",
      "name": "How long does an SEO audit take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full SEO audit on a 50 to 200 page Australian site takes 5 to 10 business days, including the readout call."
      }
    }
  ]
}
</script>`

// ── Reusable styles ───────────────────────────────────────────────────────────
const BOLD_ANSWER_STYLE = {
  margin: '0 0 16px',
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 19,
  lineHeight: 1.4,
  color: 'var(--off-white)',
  textWrap: 'balance',
}

const PROSE_STYLE = {
  margin: 0,
  fontFamily: 'var(--font-body)',
  fontSize: 17,
  lineHeight: 1.6,
  color: 'var(--text-secondary)',
}

const PROSE_LINK_CLASS = 'uc-research-link'

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ArticleReviewerResearchPage() {
  return (
    <>
      <JsonLd schema={BREADCRUMB_LD} />
      <JsonLd schema={ARTICLE_LD} />
      <JsonLd schema={DATASET_LD} />
      <JsonLd schema={FAQ_LD} />

      <div style={{ background: 'var(--bg-deep)' }}>
        {/* Inline link styling, kept local so globals.css stays lean. */}
        <style>{`
          .${PROSE_LINK_CLASS} {
            color: var(--blue-light, #9DB6CC);
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 3px;
            text-decoration-color: rgba(157,182,204,0.45);
            transition: color 120ms ease, text-decoration-color 120ms ease;
          }
          .${PROSE_LINK_CLASS}:hover {
            color: var(--off-white);
            text-decoration-color: var(--off-white);
          }
          .uc-meta-strip {
            display: flex;
            flex-wrap: wrap;
            gap: 14px 22px;
            margin-top: 28px;
            font-family: var(--font-mono);
            font-size: 12px;
            letter-spacing: 0.06em;
            color: var(--text-secondary);
            text-transform: uppercase;
          }
          .uc-meta-strip span + span::before {
            content: '·';
            margin-right: 22px;
            color: var(--text-faint);
          }
          .uc-comparison-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--font-body);
            font-size: 15px;
            color: var(--text-secondary);
          }
          .uc-comparison-table th,
          .uc-comparison-table td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid var(--text-faint);
            vertical-align: middle;
          }
          .uc-comparison-table th {
            font-family: var(--font-mono);
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--text-secondary);
            background: rgba(0,0,0,0.25);
          }
          .uc-comparison-table tr:last-child td {
            font-weight: 500;
            color: var(--off-white);
            background: rgba(106,141,173,0.10);
          }
          .uc-yes { color: var(--sage); font-weight: 600; }
          .uc-no  { color: var(--text-faint); }
          .uc-code-block {
            font-family: var(--font-mono);
            font-size: 13px;
            line-height: 1.55;
            color: var(--off-white);
            background: var(--bg-deep);
            border: 1px solid var(--text-faint);
            border-radius: 12px;
            padding: 22px 24px;
            overflow-x: auto;
            white-space: pre;
          }
        `}</style>

        <div style={{ padding: '32px var(--page-pad) 0', maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Research', href: '/research' },
            { label: 'Article Reviewer' },
          ]} />
        </div>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section style={{ padding: '64px var(--page-pad) 56px', background: 'var(--bg-deep)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ marginBottom: 32 }}>
              <SectionEyebrow label="Research / 01" />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px, 5.4vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
                textWrap: 'balance',
                maxWidth: 1080,
              }}
            >
              Most Australian agency articles aren&apos;t built for AI search. <span className="uc-glow-word uc-glow-word--blue">We built the rubric to prove it.</span>
            </h1>
            <p
              style={{
                margin: '28px 0 0',
                fontFamily: 'var(--font-body)',
                fontSize: 19,
                lineHeight: 1.55,
                color: 'var(--text-secondary)',
                maxWidth: 720,
              }}
            >
              The UnderCurrent Article Reviewer scores Australian blog articles on AI search and SEO criteria. Six dimensions, generic scoring, live corpus snapshot. Open methodology, proprietary scoring engine, built in Melbourne.
            </p>

            <div className="uc-meta-strip">
              <span>Published {PUBLISHED_DISPLAY}</span>
              <span>Updated {SNAP.lastUpdatedDisplay}</span>
              <span>{READING_TIME}</span>
              <span>By {PROVIDER.founder.name}</span>
            </div>
          </div>
        </section>

        {/* ── Quick Answer block (AI-citation primary target) ────────────── */}
        <section
          id="summary"
          aria-labelledby="quick-answer-heading"
          style={{ padding: '0 var(--page-pad) 64px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div
              style={{
                padding: '32px 36px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid rgba(106,141,173,0.28)',
                boxShadow: '6px 6px 0 0 rgba(106,141,173,0.18)',
                maxWidth: 920,
              }}
            >
              <h2
                id="quick-answer-heading"
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  color: 'var(--blue-light, #9DB6CC)',
                  textTransform: 'uppercase',
                }}
              >
                Quick answer
              </h2>
              <p
                style={{
                  margin: '14px 0 0',
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: 'var(--off-white)',
                }}
              >
                The UnderCurrent Article Reviewer is UnderCurrent Automations&apos; rubric for scoring Australian blog articles on AI search and SEO criteria. It checks structural integrity, AI search readiness, citation density, vertical specificity, article-type fit, and authority signals across a live corpus of {SNAP.articlesAudited} Australian articles. Updated {SNAP.lastUpdatedDisplay}.
              </p>
            </div>
          </div>
        </section>

        {/* ── Snapshot tile ──────────────────────────────────────────────── */}
        <section
          id="snapshot"
          style={{ padding: '64px var(--page-pad) 64px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ marginBottom: 32 }}>
              <SectionEyebrow label="Live snapshot" />
              <h2
                style={{
                  margin: '12px 0 0',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: 'var(--off-white)',
                }}
              >
                What does the corpus say today?
              </h2>
              <p style={{ ...BOLD_ANSWER_STYLE, margin: '14px 0 0', maxWidth: 820 }}>
                Across {SNAP.articlesAudited} Australian blog articles audited as of {SNAP.lastUpdatedDisplay}, only one in four ships <Link className={PROSE_LINK_CLASS} href="/glossary/what-is-faq-schema">FAQPage schema</Link>, roughly the same share publishes an llms.txt entry, and zero ship a labelled Quick Answer block above the fold.
              </p>
              <p
                style={{
                  margin: '12px 0 0',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em',
                }}
              >
                {SNAP.articlesAudited} articles · {SNAP.publishersCovered} · last updated {SNAP.lastUpdatedDisplay}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
                marginTop: 28,
              }}
              className="uc-stack-3col"
            >
              {SNAP.findings.map((f, i) => {
                const accents = ['var(--blue)', 'var(--sage)', 'var(--orange)']
                const accent = accents[i % accents.length]
                return (
                  <article
                    key={f.key}
                    id={`finding-${f.key}`}
                    style={{
                      padding: '28px 24px',
                      borderRadius: 14,
                      background: 'var(--bg-deep)',
                      border: `1px solid var(--text-faint)`,
                      boxShadow: `6px 6px 0 0 ${accent}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(40px, 5vw, 60px)',
                        fontWeight: 500,
                        color: accent,
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {f.pct}%
                    </div>
                    <h3
                      style={{
                        margin: '14px 0 8px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 18,
                        color: 'var(--off-white)',
                        lineHeight: 1.3,
                      }}
                    >
                      {f.label}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {f.blurb}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Why we built it ────────────────────────────────────────────── */}
        <section
          id="why"
          style={{ padding: '88px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Why we built it" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                maxWidth: 880,
              }}
            >
              The patterns that won Google in 2018 are not the patterns that get cited by ChatGPT in 2026.
            </h2>
            <div style={{ maxWidth: 820, display: 'grid', gap: 18 }}>
              <p style={BOLD_ANSWER_STYLE}>
                We built the UnderCurrent Article Reviewer because no existing audit tool measures whether your page is shaped to be lifted into an AI answer, on Australian content, against Australian queries.
              </p>
              <p style={PROSE_STYLE}>
                Australian SEO agencies still rank for the queries. Few of them rank inside ChatGPT, Perplexity, or Google AI Overviews. The shape of an article that earns a citation from a language model is different to the shape of an article that ranked on Google a decade ago. <Link className={PROSE_LINK_CLASS} href="/glossary/what-is-answer-engine-optimisation">Answer Engine Optimisation</Link>, <Link className={PROSE_LINK_CLASS} href="/glossary/what-is-generative-engine-optimisation">Generative Engine Optimisation</Link>, and <Link className={PROSE_LINK_CLASS} href="/glossary/what-is-ai-search-optimisation">AI Search Optimisation</Link> name three overlapping disciplines that all chase the same prize: getting cited, not just ranked.
              </p>
              <p style={PROSE_STYLE}>
                Existing audit tools check the older shape. Lighthouse measures page performance. SEMrush and Ahrefs measure rank position and backlink profile. None of them check whether a page leads with a definitional answer, ships <Link className={PROSE_LINK_CLASS} href="/glossary/what-is-schema-markup">schema markup</Link> a parser can lift, or carries an Australian regulator citation a buyer will trust.
              </p>
              <p style={PROSE_STYLE}>
                We built the UnderCurrent Article Reviewer because we needed something that measured the new shape, on Australian content, against Australian queries. Today it scores {SNAP.articlesAudited} articles. The corpus grows monthly.
              </p>
            </div>
          </div>
        </section>

        {/* ── What we measure (6 dimensions) ─────────────────────────────── */}
        <section
          id="what-we-measure"
          style={{ padding: '56px var(--page-pad) 88px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="What we measure" />
            <h2
              style={{
                margin: '12px 0 8px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              Six dimensions. One hundred points.
            </h2>
            <div style={{ maxWidth: 820, display: 'grid', gap: 18, margin: '14px 0 40px' }}>
              <p style={BOLD_ANSWER_STYLE}>
                The rubric scores six dimensions across a 100-point scale: structural integrity, AI search readiness, citation density, vertical specificity, article-type fit, and authority and freshness.
              </p>
              <p style={PROSE_STYLE}>
                Each dimension breaks into deterministic structural checks (does the schema exist, is the heading hierarchy clean) plus qualitative judgement (is the citation load-bearing or decorative). We publish what we measure. Per-criterion weights stay private.
              </p>
            </div>
            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
              className="uc-stack-2col"
            >
              {SNAP.dimensions.map((d, i) => (
                <li
                  key={d.slug}
                  id={`dimension-${d.slug}`}
                  style={{
                    padding: '24px 26px',
                    borderRadius: 14,
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--text-faint)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      letterSpacing: '0.14em',
                      color: 'var(--blue-light, #9DB6CC)',
                      marginBottom: 10,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 20,
                      color: 'var(--off-white)',
                      lineHeight: 1.2,
                    }}
                  >
                    {d.name}
                  </h3>
                  <p
                    style={{
                      margin: '10px 0 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {d.blurb}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Comparison table ───────────────────────────────────────────── */}
        <section
          id="comparison"
          style={{ padding: '88px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="How it compares" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                maxWidth: 880,
              }}
            >
              Where this sits next to Lighthouse, SEMrush, and Ahrefs.
            </h2>
            <p style={{ ...BOLD_ANSWER_STYLE, margin: '0 0 28px', maxWidth: 820 }}>
              Each existing tool covers one corner of the picture. The UnderCurrent Article Reviewer is the only one that scores AI-search shape against an Australian corpus, instead of page performance or backlink profile.
            </p>
            <div style={{
              borderRadius: 14,
              border: '1px solid var(--text-faint)',
              overflow: 'hidden',
              background: 'var(--charcoal)',
              maxWidth: 980,
            }}>
              <table className="uc-comparison-table">
                <thead>
                  <tr>
                    {COMPARISON.cols.map(c => <th key={c} scope="col">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        if (j === 0) return <td key={j} style={{ fontWeight: 500 }}>{cell}</td>
                        const cls = cell === 'Yes' ? 'uc-yes' : 'uc-no'
                        return <td key={j} className={cls}>{cell}</td>
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...PROSE_STYLE, marginTop: 18, fontSize: 14, maxWidth: 820 }}>
              Sources: <a className={PROSE_LINK_CLASS} href="https://developer.chrome.com/docs/lighthouse" target="_blank" rel="noopener noreferrer">Lighthouse documentation</a>, <a className={PROSE_LINK_CLASS} href="https://www.semrush.com/" target="_blank" rel="noopener noreferrer">SEMrush product pages</a>, <a className={PROSE_LINK_CLASS} href="https://ahrefs.com/" target="_blank" rel="noopener noreferrer">Ahrefs product pages</a>, accessed {SNAP.lastUpdatedDisplay}.
            </p>
          </div>
        </section>

        {/* ── How we score ───────────────────────────────────────────────── */}
        <section
          id="how-we-score"
          style={{ padding: '56px var(--page-pad) 88px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="How we score" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                maxWidth: 880,
              }}
            >
              Two passes. Same yardstick for everyone.
            </h2>
            <div style={{ display: 'grid', gap: 18, maxWidth: 820 }}>
              <p style={BOLD_ANSWER_STYLE}>
                Every article gets a deterministic structural pass plus a calibrated qualitative pass, totalling 100 points across the six dimensions. Competitors and our own articles run through identical scoring, no UC weighting and no home-team adjustment.
              </p>
              <p style={PROSE_STYLE}>
                The deterministic pass checks structural signals. Schema present or absent. Heading hierarchy clean or broken. Internal links pointing somewhere real or returning 404. Quick Answer block labelled or missing. The kind of checks a good build script can make.
              </p>
              <p style={PROSE_STYLE}>
                The qualitative pass scores the harder dimensions through a calibrated adversarial panel. Is the citation load-bearing or decorative. Does the case study show real numbers. Does the article deliver what its type promises. The kind of read a good editor would do.
              </p>
              <p style={PROSE_STYLE}>
                Both passes feed a 100-point total. We score 13 article types separately, because a case study, a service page, a glossary entry, and a how-to guide each have different optimal shapes.
              </p>
            </div>
          </div>
        </section>

        {/* ── What the rubric does NOT measure (honest limitations) ─────── */}
        <section
          id="limitations"
          style={{ padding: '88px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="What the rubric does not measure" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                maxWidth: 880,
              }}
            >
              The rubric is not a proxy for traffic.
            </h2>
            <div style={{ display: 'grid', gap: 18, maxWidth: 820 }}>
              <p style={BOLD_ANSWER_STYLE}>
                A high score predicts AI-search shape and structural quality. It does not predict ranking position, traffic volume, conversion rate, or revenue. Those depend on demand, competition, and offer, not on article shape alone.
              </p>
              <p style={PROSE_STYLE}>
                We do not score brand fit (whether the article matches your tone), commercial intent (whether the topic converts buyers in your category), or domain authority (whether your site has the link profile to rank). We also do not verify every cited claim against the source URL, that is out of scope for v1.
              </p>
              <p style={PROSE_STYLE}>
                The rubric is one signal among several. It is the signal that matters most for AI-search citation, and the signal Lighthouse, SEMrush, and Ahrefs do not give you. Pair it with rank tracking and conversion analytics, not replace them.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sample artifact (copy-paste FAQPage block) ─────────────────── */}
        <section
          id="ship-this-tomorrow"
          style={{ padding: '56px var(--page-pad) 88px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Ship this tomorrow" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                maxWidth: 880,
              }}
            >
              The free-tier move: a labelled FAQPage block.
            </h2>
            <div style={{ display: 'grid', gap: 18, maxWidth: 880 }}>
              <p style={BOLD_ANSWER_STYLE}>
                The single biggest AI-citation signal we measure is FAQPage schema. Only 24% of audited Australian articles ship it. Below is a starter block any developer can drop into the head of an article in under five minutes.
              </p>
              <p style={PROSE_STYLE}>
                Replace the question and answer text with your article&apos;s real FAQ content. Keep the structure. Validate at <a className={PROSE_LINK_CLASS} href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">Google&apos;s Rich Results Test</a> before shipping. Ship two to six questions per article.
              </p>
              <pre className="uc-code-block" aria-label="Sample FAQPage JSON-LD block">{SAMPLE_FAQPAGE_BLOCK}</pre>
              <p style={{ ...PROSE_STYLE, fontSize: 15 }}>
                Want the rest of the rubric run on your site? <Link className={PROSE_LINK_CLASS} href="/seo-ai-visibility">Our SEO and AI Visibility audit</Link> applies all six dimensions to every article on your domain.
              </p>
            </div>
          </div>
        </section>

        {/* ── Methodology principles ─────────────────────────────────────── */}
        <section
          id="principles"
          style={{ padding: '88px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Methodology principles" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              The rules the rubric follows.
            </h2>
            <p style={{ ...BOLD_ANSWER_STYLE, margin: '0 0 32px', maxWidth: 820 }}>
              Four principles govern every score: generic scoring, Australian corpus only, continuous refresh, and reproducibility. Together they keep the rubric honest as the corpus grows.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
              className="uc-stack-2col"
            >
              {SNAP.principles.map(p => (
                <div
                  key={p.title}
                  style={{
                    padding: '22px 24px',
                    borderRadius: 14,
                    background: 'var(--charcoal)',
                    border: '1px solid var(--text-faint)',
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 18,
                      color: 'var(--off-white)',
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: '8px 0 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Changelog ──────────────────────────────────────────────────── */}
        <section
          id="changelog"
          style={{ padding: '56px var(--page-pad) 88px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Changelog" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              What changed, and when.
            </h2>
            <p style={{ ...BOLD_ANSWER_STYLE, margin: '0 0 32px', maxWidth: 820 }}>
              The rubric is on its third major revision in twelve months. Every change ships with the date and the reason, so anyone citing a score can see which version of the rubric produced it.
            </p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 860 }}>
              {SNAP.changelog.map((c, i) => (
                <li
                  key={c.version}
                  style={{
                    padding: '20px 0',
                    borderTop: i === 0 ? 'none' : '1px solid var(--text-faint)',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 24,
                    alignItems: 'baseline',
                  }}
                  className="uc-changelog-row"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 14,
                        color: 'var(--off-white)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {c.version}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        letterSpacing: '0.06em',
                        color: 'var(--text-secondary)',
                        marginTop: 4,
                      }}
                    >
                      {c.date}
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {c.note}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section
          id="faq"
          style={{ padding: '88px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Frequently asked" />
            <h2
              style={{
                margin: '12px 0 32px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              Things people ask before citing the rubric.
            </h2>
            <div style={{ maxWidth: 860 }}>
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  style={{
                    borderTop: i === 0 ? '1px solid var(--text-faint)' : 'none',
                    borderBottom: '1px solid var(--text-faint)',
                    padding: '20px 0',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 19,
                      color: 'var(--off-white)',
                      listStyle: 'none',
                      lineHeight: 1.35,
                    }}
                  >
                    {f.q}
                  </summary>
                  <p
                    style={{
                      margin: '14px 0 0',
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sources ────────────────────────────────────────────────────── */}
        <section
          id="sources"
          style={{ padding: '56px var(--page-pad) 56px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Sources" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              Specifications, documentation, and primary sources the rubric is built on.
            </h2>
            <ol style={{ listStyle: 'decimal inside', margin: 0, padding: 0, maxWidth: 860, color: 'var(--text-secondary)' }}>
              {SOURCES.map(s => (
                <li
                  key={s.href}
                  style={{
                    padding: '14px 0',
                    borderBottom: '1px solid var(--text-faint)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    lineHeight: 1.55,
                  }}
                >
                  <a className={PROSE_LINK_CLASS} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  <span style={{ color: 'var(--text-secondary)' }}>: {s.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Related reading ────────────────────────────────────────────── */}
        <section
          id="related"
          style={{ padding: '56px var(--page-pad) 88px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <SectionEyebrow label="Related reading" />
            <h2
              style={{
                margin: '12px 0 24px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
              }}
            >
              Definitions for the terms this page leans on.
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 860, display: 'grid', gap: 12 }}>
              {[
                { label: 'What is AI Search Optimisation?', href: '/glossary/what-is-ai-search-optimisation' },
                { label: 'What is Answer Engine Optimisation?', href: '/glossary/what-is-answer-engine-optimisation' },
                { label: 'What is Generative Engine Optimisation?', href: '/glossary/what-is-generative-engine-optimisation' },
                { label: 'What is Schema Markup?', href: '/glossary/what-is-schema-markup' },
                { label: 'What is FAQ Schema?', href: '/glossary/what-is-faq-schema' },
                { label: 'What is ChatGPT Search?', href: '/glossary/what-is-chatgpt-search' },
                { label: 'What is SEO?', href: '/glossary/what-is-seo' },
                { label: 'Browse the full glossary', href: '/glossary' },
              ].map(r => (
                <li key={r.href}>
                  <Link
                    className={PROSE_LINK_CLASS}
                    href={r.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    {r.label} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Author bio ─────────────────────────────────────────────────── */}
        <section
          id="author"
          style={{ padding: '56px var(--page-pad) 56px', background: 'var(--bg-deep)' }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <AuthorBio />
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section style={{ padding: '32px var(--page-pad) 120px', background: 'var(--bg-deep)' }}>
          <div
            style={{
              maxWidth: 880,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.6vw, 48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              Want your site scored against this rubric?
            </h2>
            <p
              style={{
                margin: '20px auto 32px',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                lineHeight: 1.55,
                color: 'var(--text-secondary)',
                maxWidth: 640,
              }}
            >
              Our SEO and AI Visibility audit applies the UnderCurrent Article Reviewer to every article on your domain, then prioritises the fixes that move the score most.
            </p>
            <PillCTA href="/seo-ai-visibility">See the audit</PillCTA>
          </div>
        </section>
      </div>
    </>
  )
}
