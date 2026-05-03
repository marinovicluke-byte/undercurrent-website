import Link from 'next/link'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { getService } from '@/lib/data/services'
import {
  BASE_METADATA, buildJsonLd, PROVIDER, INTEGRATIONS, LOCATIONS,
  HERO_STATS, PIPELINE_STAGES, PRICING_TIERS, WIKI_REFS, TOC,
} from '@/lib/preview/sales-automation-content'

export const metadata = { ...BASE_METADATA, title: 'V5a — Boxed cards' }

const S = {
  heroBand:  { background: 'var(--bg-deep)' },
  contentBand: { background: 'var(--charcoal)' },
  card: { background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(250,249,245,0.12)', borderRadius: 14, padding: 32 },
  subcard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(250,249,245,0.1)', borderRadius: 10, padding: 20 },
  chip: { display: 'inline-block', padding: '5px 10px', border: '1px solid rgba(250,249,245,0.14)', background: 'rgba(255,255,255,0.025)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', borderRadius: 6 },
  eyebrowNum:  { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' },
  h1:  { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(36px, 4vw, 54px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--off-white)' },
  h2:  { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.3vw, 28px)', lineHeight: 1.22, letterSpacing: '-0.015em', color: 'var(--off-white)' },
  h3:  { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.35, color: 'var(--off-white)' },
  lede:  { margin: 0, fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65, color: 'var(--text-primary)' },
  body:  { margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.75, color: 'var(--text-primary)', fontWeight: 400 },
  small: { margin: 0, fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-secondary)' },
  strong: { color: 'var(--off-white)', fontWeight: 500 },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: 'var(--off-white)', color: 'var(--charcoal-deep)', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, borderRadius: 6, textDecoration: 'none' },
  btnGhost:   { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', border: '1px solid rgba(250,249,245,0.2)', color: 'var(--off-white)', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, borderRadius: 6, textDecoration: 'none' },
}

export default function V5a() {
  const s = getService('sales-automation')
  const jsonLd = buildJsonLd(s)

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', paddingTop: 96 }}>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}

      <div aria-hidden style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, var(--bg-deep) 0%, rgba(18,18,16,0.85) 50%, transparent 100%)', pointerEvents: 'none', zIndex: 20 }} />

      {/* HERO BAND */}
      <section style={{ ...S.heroBand, padding: '0 var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ listStyle: 'none', padding: '20px 0 40px', margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: 'var(--text-faint)' }}>/</li>
              <li><Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
              <li style={{ color: 'var(--text-faint)' }}>/</li>
              <li style={{ color: 'var(--blue-light)' }}>Sales Automation</li>
            </ol>
          </nav>

          <div style={{ display: 'grid', gap: 72, gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', paddingBottom: 96 }} className="uc-hero-grid">
            <div>
              <div style={{ marginBottom: 28 }}>
                <SectionEyebrow n="00" label="Service · Sales automation" />
              </div>
              <h1 style={{ ...S.h1, maxWidth: 720, marginBottom: 28 }}>
                Sales automation,{' '}
                <span className="uc-glow-word uc-glow-word--blue">built custom</span>
                {' '}for Australian small businesses.
              </h1>
              <p style={{ ...S.lede, maxWidth: 640, marginBottom: 28 }}>
                <strong style={S.strong}>Sales automation</strong> is the infrastructure layer that captures every lead, qualifies it, routes it, and moves it through your pipeline without anyone remembering to act. UnderCurrent builds it end-to-end on the CRM and tools you already use.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                <span style={S.chip}>Melbourne · Australia-wide</span>
                <span style={{ ...S.chip, color: 'var(--sage)', borderColor: 'rgba(143,175,159,0.35)' }}>Live in ~14 days</span>
                <span style={S.chip}>By {PROVIDER.name}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link href="/contact" style={S.btnPrimary}>Book a scoping call →</Link>
                <Link href="/audit" style={S.btnGhost}>Free workflow audit</Link>
              </div>
            </div>

            <aside style={{ ...S.card, padding: 0 }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(250,249,245,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Pipeline flow</span>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--sage)', boxShadow: '0 0 10px rgba(143,175,159,0.6)' }} />
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {PIPELINE_STAGES.map((st, i) => (
                  <li key={i} style={{ padding: '14px 24px', display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 14, alignItems: 'center', borderBottom: i < PIPELINE_STAGES.length - 1 ? '1px solid rgba(250,249,245,0.06)' : 'none' }}>
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

          <aside style={{ alignSelf: 'start', position: 'sticky', top: '38vh' }}>
            <div style={{ paddingBottom: 14, marginBottom: 18, borderBottom: '1px solid rgba(250,249,245,0.12)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>On this page</span>
            </div>
            <nav aria-label="Table of contents" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {TOC.map((t, i) => (
                <a key={t.id} href={`#${t.id}`} style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  <span style={{ ...S.eyebrowNum, marginRight: 8 }}>{String(i+1).padStart(2, '0')}</span>{t.label}
                </a>
              ))}
            </nav>
          </aside>

          <article style={{ maxWidth: 780, display: 'grid', gap: 24 }}>

            <QACard id="what" n="01" q="What is sales automation?">
              <p style={S.body}><strong style={S.strong}>Sales automation</strong> is the infrastructure layer that handles lead capture, qualification, routing, outreach, CRM progression, meeting booking, and reactivation — without a human remembering to act. It is not a tool you buy; it is the orchestration on top of the tools you already pay for.</p>
              <p style={{ ...S.body, marginTop: 14 }}>Done properly, it responds within <strong style={S.strong}>5 minutes</strong> instead of the <strong style={S.strong}>47-hour</strong> industry average, and recovers <strong style={S.strong}>10+ hours per rep per week</strong>.</p>
            </QACard>

            <QACard id="included" n="02" q="What does the build include?">
              <p style={S.body}>Seven deliverables by default. Each is a self-contained component of the pipeline, tuned to how your business actually sells.</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: 10 }}>
                {s.whatWeDeliver.map((item, i) => (
                  <li key={i} style={{ ...S.subcard, display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, padding: '14px 18px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--sage)', marginTop: 3 }}>{String(i+1).padStart(2, '0')}</span>
                    <span style={{ ...S.body, fontSize: 14 }}>{item}</span>
                  </li>
                ))}
              </ol>
            </QACard>

            <QACard id="who" n="03" q="Who is it built for?">
              <p style={S.body}>Sales automation pays off fastest for businesses already leaking pipeline to slow response, dropped follow-up, or CRM decay. Three audience segments see the largest lift:</p>
              <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
                {s.industries.map((ind, i) => (
                  <div key={i} style={S.subcard}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue)', margin: 0, marginBottom: 8 }}>{ind.label}</p>
                    <p style={{ ...S.h3, marginBottom: 8 }}>{ind.headline}</p>
                    <p style={S.small}>{ind.copy}</p>
                  </div>
                ))}
              </div>
            </QACard>

            <QACard id="stack" n="04" q="What tools does it work with?">
              <p style={S.body}>We build on your existing CRM and communication stack. If your tool has an API, we can wire into it.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '20px 0' }}>
                {INTEGRATIONS.map((tool) => (<span key={tool} style={S.chip}>{tool}</span>))}
              </div>
              <p style={S.body}>For businesses without a CRM, we help you choose a lightweight option — usually <strong style={S.strong}>Pipedrive</strong> or <strong style={S.strong}>HubSpot Free</strong>. Email infrastructure (SPF, DKIM, DMARC) is configured as part of every outbound build.</p>
            </QACard>

            <QACard id="process" n="05" q="How does UnderCurrent build it?">
              <p style={S.body}>Three stages. We move in weeks, not months.</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gap: 10 }}>
                <StepCard n="01" title="Map"   body="Audit your pipeline. Lead sources, CRM, sequences, drop-off points. Output: a leak map with priority fixes." />
                <StepCard n="02" title="Build" body="Deploy automation against your existing stack. Capture, scoring, sequences, CRM progression, reactivation — configured and tested." />
                <StepCard n="03" title="Flow"  body="Hand over, train, monitor for 30 days. Pipeline movement visible within 2–3 weeks." />
              </ol>
            </QACard>

            <QACard id="compare" n="06" q="How does it compare to alternatives?">
              <p style={S.body}>Rows are capabilities; columns are approaches. A check means the approach consistently delivers.</p>
              <div style={{ ...S.subcard, padding: 0, overflowX: 'auto', marginTop: 20 }}>
                <table style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(250,249,245,0.12)' }}>
                      <th style={{ textAlign: 'left', padding: 14, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Capability</th>
                      {s.comparisonColumns.map((c, i) => (
                        <th key={i} style={{ padding: 14, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: i === 0 ? 'var(--blue-light)' : 'var(--text-muted)' }}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.comparisonRows.map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < s.comparisonRows.length - 1 ? '1px solid rgba(250,249,245,0.06)' : 'none' }}>
                        <td style={{ padding: 14, fontSize: 13.5, color: 'var(--text-primary)' }}>{row.label}</td>
                        <td style={{ padding: 14, textAlign: 'center' }}><Check on={row.uc} highlight /></td>
                        <td style={{ padding: 14, textAlign: 'center' }}><Check on={row.manual} /></td>
                        <td style={{ padding: 14, textAlign: 'center' }}><Check on={row.generic} /></td>
                        <td style={{ padding: 14, textAlign: 'center' }}><Check on={row.agency} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </QACard>

            <QACard id="pricing" n="07" q="What does it cost?">
              <p style={S.body}>Project-priced, not per-seat. No ongoing software licence fees — we build on the stack you already pay for.</p>
              <div style={{ display: 'grid', gap: 12, marginTop: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                {PRICING_TIERS.map((t) => (
                  <div key={t.name} style={S.subcard}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', margin: 0, marginBottom: 6 }}>{t.priceFrom}</p>
                    <p style={{ ...S.h3, marginBottom: 4 }}>{t.name}</p>
                    <p style={{ ...S.small, color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{t.tag}</p>
                    <p style={S.small}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </QACard>

            <QACard id="timeline" n="08" q="How long does it take?">
              <p style={S.body}>Most builds go live within <strong style={S.strong}>14 days</strong> of the first scoping call. Discovery week one, build + rollout week two. Pipeline movement visible within 2–3 weeks of live.</p>
              <p style={{ ...S.body, marginTop: 14 }}>Full pipeline systems with outbound sequencing run <strong style={S.strong}>3–4 weeks</strong> end-to-end. We give a firm timeline before committing.</p>
            </QACard>

            <QACard id="where" n="09" q="Where does UnderCurrent operate?">
              <p style={S.body}>Based in <strong style={S.strong}>Melbourne, Australia</strong>. We serve clients nationally — most discovery and build work runs remotely. Onsite sessions available across greater Melbourne.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                {LOCATIONS.map((loc) => (<span key={loc} style={S.chip}>{loc}</span>))}
              </div>
            </QACard>

            <QACard id="faq" n="10" q="Frequently asked questions">
              <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                {s.faqs.map((f, i) => (
                  <div key={i} style={S.subcard}>
                    <h3 style={{ ...S.h3, fontSize: 15, marginBottom: 10 }}>{f.q}</h3>
                    <p style={S.small}>{f.a}</p>
                  </div>
                ))}
              </div>
            </QACard>

            <section style={{ ...S.card, padding: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <SectionEyebrow n="11" label="Written by" />
              </div>
              <p style={{ ...S.h3, fontSize: 18, marginBottom: 6 }}>Luke Marinovic</p>
              <p style={{ ...S.small, marginBottom: 14 }}>Founder of UnderCurrent Automations. Builds sales, content and ops automation for Australian small businesses.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <Link href="/about" style={S.chip}>About Luke →</Link>
              </div>
            </section>

            <section style={S.card}>
              <div style={{ marginBottom: 20 }}>
                <SectionEyebrow n="12" label="Further reading" />
              </div>
              <p style={{ ...S.h2, fontSize: 20, marginBottom: 20 }}>References, related services, and source material.</p>
              <div style={{ borderTop: '1px solid rgba(250,249,245,0.1)' }}>
                {WIKI_REFS.map((r, i) => (
                  <Link key={i} href={r.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '14px 0', borderBottom: '1px solid rgba(250,249,245,0.08)', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', width: 64, flexShrink: 0 }}>{r.kind}</span>
                      <span style={{ ...S.body, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', flexShrink: 0 }}>→</span>
                  </Link>
                ))}
              </div>
            </section>

            <section style={{ ...S.card, padding: 40, background: 'linear-gradient(135deg, rgba(138,174,200,0.08), rgba(143,175,159,0.05))', borderColor: 'rgba(138,174,200,0.25)' }}>
              <p style={{ ...S.h2, maxWidth: 560, marginBottom: 24 }}>Your pipeline should not depend on who remembered to follow up.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link href="/contact" style={S.btnPrimary}>Book a scoping call →</Link>
                <Link href="/audit" style={S.btnGhost}>Free workflow audit</Link>
              </div>
            </section>
          </article>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .uc-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .uc-body-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function QACard({ id, n, q, children }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(250,249,245,0.1)', borderRadius: 14, padding: 32 }}>
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
  if (!on) return <span style={{ color: 'var(--text-faint)' }}>—</span>
  return <span style={{ color: highlight ? 'var(--sage)' : 'var(--text-muted)' }}>✓</span>
}
