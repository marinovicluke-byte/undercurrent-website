import Link from 'next/link'
import PillCTA from '@/components/ui/PillCTA'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { SERVICES } from '@/lib/data/services'
import { LOCATIONS } from '@/lib/data/locations'
import { PRICING_TIERS } from '@/lib/data/pricing'

const DOMAIN = 'https://undercurrentautomations.com'
const PAGE_URL = `${DOMAIN}/company-information`
const LAST_UPDATED = '7 May 2026'

export const metadata = {
  title: 'Company Information',
  description:
    'Company information for UnderCurrent Automations. Melbourne AI automation agency founded by Luke Marinovic in 2026. Trading details, services, locations served, pricing, founder, contact, hours, and FAQ.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Company Information | UnderCurrent Automations',
    description:
      'Trading details, services, locations served, pricing, founder, contact, hours, and FAQ for UnderCurrent Automations, Melbourne AI automation agency.',
    url: PAGE_URL,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
const AC_BLUE   = { rgb: '106, 141, 173', light: '138, 174, 200' }
const AC_SAGE   = { rgb: '143, 175, 159', light: '168, 196, 184' }
const AC_ORANGE = { rgb: '224, 122, 85',  light: '236, 158, 128' }

// Service one-liners. Source: lib/data/services metaDescription, hand-trimmed.
const SERVICE_BLURBS = {
  'customer-experience-automation':
    'Onboarding, check-ins, review requests and referral prompts that run for every client, every time.',
  'sales-automation':
    'Lead capture, outreach and CRM pipelines that respond in minutes and chase quiet leads on autopilot.',
  'content-automation':
    'Content pipelines that turn a brief or recording into long-form, social and newsletter on every channel.',
  'personal-system-automation':
    'Inbox, calendar and task systems that give business owners back the working hours buried in admin.',
  'finance-automation':
    'Invoicing, payment chasing, expense capture and cash-flow reporting wired to Xero or MYOB.',
  'inbound-lead-management-melbourne':
    'Instant reply, qualify and book for service businesses. Wired to ServiceM8, Jobber or HubSpot.',
  'website-design':
    'Conversion-focused sites, client portals and booking flows on Next.js, wired to your back-end stack.',
  'seo-ai-visibility':
    'Get found in Google and cited in ChatGPT, Claude and Perplexity. Audits, content, schema and entity work.',
  'front-end-experience':
    'Marketing sites, client portals and dashboards built on Next.js and wired to your existing systems.',
  'ai-strategy-training':
    '90-day AI roadmap with workshops on ChatGPT, Claude and Copilot. Role-based, hands-on, no slideware.',
  'custom-integrations':
    'Wire every tool in your stack via n8n, Make, Zapier or direct APIs. Scoped, shipped, documented.',
}

function titleCaseLabel(str) {
  return str.split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 01 — Hero
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad) 96px',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="01" label="Company information" />
        </div>

        <h1
          style={{
            margin: '0 0 36px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.8vw, 64px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 1100,
          }}
        >
          Everything a human or AI needs to know about{' '}
          <span className="uc-glow-word uc-glow-word--sage">UnderCurrent Automations</span>,
          on one page.
        </h1>

        <p
          style={{
            margin: '0 0 36px',
            fontFamily: 'var(--font-body)',
            fontSize: 20,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: 760,
          }}
        >
          UnderCurrent Automations is a Melbourne AI automation agency founded by Luke Marinovic in 2026.
          The page below is the canonical record of who we are, what we build, who we serve, and how to reach us.
          Indexed for search engines. Structured for AI assistants. Useful for humans.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <PillCTA label="Book a workflow review" href="/contact" tone="blue" />
          <PillCTA label="See what we build" href="/services" tone="sage" />
        </div>

        <p
          style={{
            margin: '40px 0 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          Last updated {LAST_UPDATED}
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 02 — At a glance (entity facts)
// ═══════════════════════════════════════════════════════════════════════════════
const FACTS = [
  { label: 'Trading name',   value: 'UnderCurrent Automations' },
  { label: 'Also known as',  value: 'UnderCurrent' },
  { label: 'Entity type',    value: 'Sole trader, Australia' },
  { label: 'ABN',            value: '23 368 496 814' },
  { label: 'Founded',        value: 'February 2026' },
  { label: 'Founder',        value: 'Luke Marinovic' },
  { label: 'Headquarters',   value: 'Melbourne, VIC, Australia' },
  { label: 'Service area',   value: 'Australia-wide, remote' },
  { label: 'Website',        value: 'undercurrentautomations.com' },
  { label: 'Email',          value: 'luke@undercurrentautomations.com', href: 'mailto:luke@undercurrentautomations.com' },
  { label: 'Phone',          value: '0438 780 815', href: 'tel:+61438780815' },
  { label: 'Hours',          value: 'Mon to Fri, 09:00 to 17:00 AEDT' },
  { label: 'Reply time',     value: 'Within 1 business day' },
  { label: 'Languages',      value: 'English' },
  { label: 'Payment terms',  value: '50% upfront, 50% on go-live. Retainers monthly in advance.' },
  { label: 'Currencies',     value: 'AUD' },
]

function AtAGlance() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="02" label="At a glance" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          The boring but useful details, in one block.
        </h2>

        <div
          className="uc-facts-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 0,
            border: '1px solid var(--text-faint)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <style>{`
            @media (max-width: 720px) {
              .uc-facts-grid { grid-template-columns: 1fr !important; }
            }
            .uc-fact-link { color: var(--blue-light); text-decoration: none; transition: color 140ms ease; }
            .uc-fact-link:hover { color: var(--off-white); }
          `}</style>
          {FACTS.map((f, i) => {
            const isLastRowEven = i >= FACTS.length - 2 && FACTS.length % 2 === 0
            const isLastSingle = i === FACTS.length - 1 && FACTS.length % 2 === 1
            return (
              <div
                key={f.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 18,
                  padding: '18px 22px',
                  borderBottom: isLastRowEven || isLastSingle ? 'none' : '1px solid var(--text-faint)',
                  borderRight: i % 2 === 0 ? '1px solid var(--text-faint)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <dt
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {f.label}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: 'var(--off-white)',
                  }}
                >
                  {f.href ? (
                    <a href={f.href} className="uc-fact-link">{f.value}</a>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 03 — What we do
// ═══════════════════════════════════════════════════════════════════════════════
function WhatWeDo() {
  const pillars = [
    { ac: AC_ORANGE, label: 'Get found online',
      text: 'AI search, SEO, and content automation that put a small business in front of the people already searching. Google, ChatGPT, Claude, Perplexity, the lot.' },
    { ac: AC_SAGE,   label: 'Turn traffic into revenue',
      text: 'Lead capture, qualification and follow-up that turn enquiries into booked calls and paid invoices. Every lead chased, every handoff tracked.' },
    { ac: AC_BLUE,   label: 'Build AI capability',
      text: 'Strategy, training and custom integrations for teams that want to run AI themselves. Real workflows, role-based, no workshop theatre.' },
  ]

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="03" label="What we do" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          We help Australian small businesses{' '}
          <span className="uc-glow-word uc-glow-word--blue">grow revenue</span> through AI automation.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 820 }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 18,
                padding: '22px 0',
                borderBottom: i < pillars.length - 1 ? '1px solid var(--text-faint)' : 'none',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 3,
                  minHeight: 48,
                  background: `rgb(${p.ac.rgb})`,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <div>
                <h3 style={{
                  margin: '0 0 8px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 11,
                  color: `rgb(${p.ac.light})`,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}>
                  {p.label}
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 04 — Services we offer
// ═══════════════════════════════════════════════════════════════════════════════
function ServicesOffered() {
  const services = SERVICES.map(s => ({
    slug: s.slug,
    name: s.displayName || titleCaseLabel(s.label),
    blurb: SERVICE_BLURBS[s.slug] || s.metaDescription,
  }))

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="04" label="Services we offer" />
        </div>

        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          {services.length} services. One playbook.
        </h2>

        <p
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 720,
          }}
        >
          Every engagement starts with one workflow. From there, you stack the others as the business proves it can absorb them.
        </p>

        <div
          className="uc-services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
          }}
        >
          <style>{`
            @media (max-width: 760px) {
              .uc-services-grid { grid-template-columns: 1fr !important; }
            }
            .uc-service-card { transition: transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1); }
            .uc-service-card:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 0 var(--blue) !important; }
          `}</style>
          {services.map(s => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="uc-service-card"
              style={{
                display: 'block',
                padding: '24px 26px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                boxShadow: '6px 6px 0 0 var(--blue)',
                textDecoration: 'none',
              }}
            >
              <h3 style={{
                margin: '0 0 10px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 20,
                letterSpacing: '-0.02em',
                color: 'var(--off-white)',
                lineHeight: 1.25,
              }}>
                {s.name}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 14.5,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}>
                {s.blurb}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 05 — Industries we serve
// ═══════════════════════════════════════════════════════════════════════════════
const INDUSTRIES = [
  {
    label: 'Trades and construction',
    copy: 'Sparkies, plumbers, builders, tilers, landscapers and cleaners. Quote fast, win the job, invoice the same day, get the review. Wired to ServiceM8, Jobber, simPRO, Xero or MYOB.',
  },
  {
    label: 'Business services and consultants',
    copy: 'Accountants, lawyers, advisory firms and agencies. Onboarding, document requests, milestone check-ins and referral prompts on rails. Built into HubSpot, Pipedrive or your existing CRM.',
  },
  {
    label: 'Allied health practitioners',
    copy: 'Clinics, physios, psychs, podiatrists and allied health practices. Fewer no-shows, more rebookings, automated review capture. Compatible with Cliniko, Halaxy and Power Diary.',
  },
  {
    label: 'Service-business owners and founders',
    copy: 'Solo operators and small teams who run on inboxes and spreadsheets. Personal system automation that gives the founder back the morning before the team arrives.',
  },
]

function Industries() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="05" label="Industries we serve" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Four verticals we have built the playbook for.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 880 }}>
          {INDUSTRIES.map((ind, i) => (
            <div
              key={ind.label}
              style={{
                padding: '26px 0',
                borderTop: '1px solid var(--text-faint)',
                borderBottom: i === INDUSTRIES.length - 1 ? '1px solid var(--text-faint)' : 'none',
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                gap: 32,
                alignItems: 'baseline',
              }}
            >
              <h3 style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 19,
                letterSpacing: '-0.015em',
                color: 'var(--off-white)',
                lineHeight: 1.25,
              }}>
                {ind.label}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 15.5,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}>
                {ind.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 06 — Where we work
// ═══════════════════════════════════════════════════════════════════════════════
function WhereWeWork() {
  const cities = LOCATIONS.map(l => ({
    name: l.city,
    region: l.region,
    href: `/${l.slug}`,
  }))

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="06" label="Where we work" />
        </div>

        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Based in Melbourne. Working{' '}
          <span className="uc-glow-word uc-glow-word--sage">across Australia</span>.
        </h2>

        <p
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 720,
          }}
        >
          Discovery, design and build all run remotely. Every workflow is delivered, documented and supported online.
          City pages below cover the local stack and the operators we have shipped for.
        </p>

        <div
          className="uc-locations-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 720px) {
              .uc-locations-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 460px) {
              .uc-locations-grid { grid-template-columns: 1fr !important; }
            }
            .uc-loc-card { transition: transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1); }
            .uc-loc-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--sage) !important; }
          `}</style>
          {cities.map(c => (
            <Link
              key={c.href}
              href={c.href}
              className="uc-loc-card"
              style={{
                display: 'block',
                padding: '20px 22px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                boxShadow: '4px 4px 0 0 var(--sage)',
                textDecoration: 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 11,
                color: 'var(--text-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                {c.region || 'AU'}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 19,
                color: 'var(--off-white)',
                letterSpacing: '-0.02em',
              }}>
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 07 — How we work
// ═══════════════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  { n: '01', label: 'Discovery',  body: 'Free 30-minute call. Map where 15 to 25 hours a week is going, name the workflow that hurts most.' },
  { n: '02', label: 'Scoped',     body: 'Written scope, fixed price, 14-day build window. Tools, integrations and access requests laid out upfront.' },
  { n: '03', label: 'Built',      body: 'Workflow built on your existing stack. Reviewed in a shared queue before anything goes live.' },
  { n: '04', label: 'Live',       body: 'Cutover, walkthrough recording, written runbook. The team using it is in the room, not on the email chain.' },
  { n: '05', label: 'Supported',  body: '30 days bug-fix support included. Optional retainer for new workflows and ongoing optimisation.' },
]

function HowWeWork() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="07" label="How we work" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Five steps. Two weeks. One workflow live.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 920 }}>
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: 24,
                padding: '24px 0',
                borderTop: '1px solid var(--text-faint)',
                borderBottom: i === PROCESS_STEPS.length - 1 ? '1px solid var(--text-faint)' : 'none',
                alignItems: 'baseline',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 15,
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
              }}>
                {s.n}
              </span>
              <div>
                <h3 style={{
                  margin: '0 0 6px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  lineHeight: 1.25,
                }}>
                  {s.label}
                </h3>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  maxWidth: 720,
                }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 08 — Pricing
// ═══════════════════════════════════════════════════════════════════════════════
function Pricing() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="08" label="Pricing" />
        </div>

        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Three engagement models.
        </h2>

        <p
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 720,
          }}
        >
          All prices in AUD, exclusive of GST. Most clients start with a Starter Project and move to a Growth Retainer once the first workflow proves itself.
        </p>

        <div
          className="uc-pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .uc-pricing-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {PRICING_TIERS.map((tier, i) => {
            const accent = tier.featured ? 'var(--sage)' : i === 0 ? 'var(--orange)' : 'var(--blue)'
            return (
              <div
                key={tier.name}
                style={{
                  padding: '28px 26px',
                  borderRadius: 14,
                  background: 'var(--charcoal)',
                  border: '1px solid var(--text-faint)',
                  boxShadow: `6px 6px 0 0 ${accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div>
                  <h3 style={{
                    margin: '0 0 6px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    color: 'var(--off-white)',
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 18,
                    color: 'var(--off-white)',
                    letterSpacing: '-0.005em',
                  }}>
                    {tier.price}
                  </p>
                </div>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}>
                  {tier.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}>
                  {tier.features.map(feat => (
                    <li
                      key={feat}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{ color: 'var(--off-white)', flexShrink: 0, marginTop: 1 }}>·</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 09 — Tools we build with
// ═══════════════════════════════════════════════════════════════════════════════
const TOOL_GROUPS = [
  { label: 'AI models',
    tools: ['OpenAI / ChatGPT', 'Anthropic / Claude', 'Google / Gemini', 'Microsoft Copilot', 'Perplexity'] },
  { label: 'Automation runtime',
    tools: ['n8n', 'Make', 'Zapier', 'direct REST and GraphQL APIs'] },
  { label: 'CRM and sales',
    tools: ['HubSpot', 'Pipedrive', 'ActiveCampaign', 'Mailchimp', 'Close'] },
  { label: 'Field service and ops',
    tools: ['ServiceM8', 'Jobber', 'simPRO', 'Tradify'] },
  { label: 'Allied health',
    tools: ['Cliniko', 'Halaxy', 'Power Diary'] },
  { label: 'Finance',
    tools: ['Xero', 'MYOB', 'Stripe', 'Hubdoc', 'Dext'] },
  { label: 'Knowledge and docs',
    tools: ['Notion', 'Airtable', 'Google Workspace', 'Slack', 'Microsoft 365'] },
  { label: 'Web and search',
    tools: ['Next.js', 'Vercel', 'Google Search Console', 'Ahrefs', 'Schema.org'] },
]

function Tools() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="09" label="Tools we build with" />
        </div>

        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Built on tools you already own.
        </h2>

        <p
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 720,
          }}
        >
          We do not sell a platform. Every workflow lives in tools you can audit, export and own. If a vendor disappears, the system migrates.
        </p>

        <div
          className="uc-tools-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 18,
          }}
        >
          <style>{`
            @media (max-width: 760px) {
              .uc-tools-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {TOOL_GROUPS.map(g => (
            <div
              key={g.label}
              style={{
                padding: '20px 22px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
              }}
            >
              <h3 style={{
                margin: '0 0 12px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--blue-light)',
              }}>
                {g.label}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 14.5,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}>
                {g.tools.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — Founder
// ═══════════════════════════════════════════════════════════════════════════════
function Founder() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="10" label="Founder" />
        </div>

        <h2
          style={{
            margin: '0 0 36px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Luke Marinovic, founder.
        </h2>

        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}>
            Luke Marinovic founded UnderCurrent Automations in February 2026 in Melbourne, Australia, after a decade
            spent building, breaking and rebuilding software for clients across consumer, fintech and ops.
            UnderCurrent is the consolidation of that work into one offer, for one kind of buyer:
            the Australian small business owner who needs a working automation system in days, not months.
          </p>

          <p style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.65,
            color: 'var(--text-muted)',
          }}>
            Every workflow is built, reviewed and shipped by Luke directly. There is no junior layer between you and the
            person responsible for the system running. This is deliberate. It is also the constraint that keeps the
            client roster small.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
            <PillCTA label="Read the longer story" href="/about" tone="blue" />
            <a
              href="https://www.linkedin.com/in/lukemarinovic/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                color: 'var(--blue-light)',
                textDecoration: 'none',
                letterSpacing: '-0.005em',
              }}
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — FAQ
// ═══════════════════════════════════════════════════════════════════════════════
const FAQS = [
  {
    q: 'What is UnderCurrent Automations?',
    a: 'UnderCurrent Automations is a Melbourne AI automation agency that builds custom workflow, sales, content, finance and lead-management systems for Australian small businesses. The agency was founded by Luke Marinovic in February 2026 and operates Australia-wide. Every workflow is built on tools the client already owns, such as HubSpot, Xero, n8n, ServiceM8 or Notion, so the client retains ownership of the system end to end.',
  },
  {
    q: 'Where is UnderCurrent Automations based?',
    a: 'UnderCurrent Automations is based in Melbourne, Victoria, Australia. The agency works remotely with clients across every Australian capital city, including Sydney, Brisbane, Perth, Adelaide, Canberra and regional centres. Discovery, design, build and support all run online. There is no requirement for an on-site visit, although in-person scoping is available for Melbourne-based clients on request.',
  },
  {
    q: 'What services does UnderCurrent Automations offer?',
    a: 'UnderCurrent Automations offers eleven services: customer experience automation, sales automation, content automation, personal system automation, finance automation, inbound lead management, website design, SEO and AI visibility, front-end experience, AI strategy and training, and custom integrations. Each service is a self-contained workflow that can run on its own or stack with the others.',
  },
  {
    q: 'Who founded UnderCurrent Automations?',
    a: 'UnderCurrent Automations was founded by Luke Marinovic in February 2026. Luke is the sole operator and ships every workflow personally. Before founding UnderCurrent, Luke spent more than a decade building production software for clients across consumer, fintech and operations. He is based in Melbourne, Australia, and contactable on LinkedIn or directly at luke@undercurrentautomations.com.',
  },
  {
    q: 'What industries does UnderCurrent Automations work with?',
    a: 'UnderCurrent Automations works with four core industries: trades and construction, business services and consultants, allied health practitioners, and service-business owners or founders running small teams. Clients usually run on tools such as ServiceM8, Jobber, simPRO, HubSpot, Pipedrive, Cliniko, Halaxy, Power Diary, Xero or MYOB. Other industries are taken on a case-by-case basis where the workflow patterns repeat.',
  },
  {
    q: 'How much does UnderCurrent Automations charge?',
    a: 'UnderCurrent Automations charges from $1,500 AUD for a Starter Project, which is one workflow built and handed over with 30 days of bug-fix support. The Growth Retainer starts at $1,200 AUD per month and covers up to three new workflows monthly with same-day support. A Done-With-You option starts at $500 AUD per month and includes weekly strategy sessions for teams that want to build internally. All prices exclude GST.',
  },
  {
    q: 'How long does an UnderCurrent build take?',
    a: 'A typical UnderCurrent Automations workflow goes live within 14 days of the first call. Discovery is a single 30-minute session. Scoping takes two to three days. Build runs for one to two weeks depending on integration complexity. Cutover and walkthrough happen on a single day. Most clients see the first measurable outcome, more booked calls or hours reclaimed, within three weeks of starting.',
  },
  {
    q: 'What tools and platforms does UnderCurrent build on?',
    a: 'UnderCurrent Automations builds on n8n, Make and Zapier for orchestration; OpenAI, Anthropic Claude and Google Gemini for AI models; HubSpot, Pipedrive and ActiveCampaign for CRM; ServiceM8, Jobber and simPRO for field services; Cliniko, Halaxy and Power Diary for allied health; Xero and MYOB for finance; and Next.js on Vercel for web. Where a tool is not pre-built, UnderCurrent integrates directly via REST or GraphQL APIs.',
  },
  {
    q: 'Does UnderCurrent serve clients outside Melbourne?',
    a: 'Yes. UnderCurrent Automations serves clients across Australia, including Sydney, Brisbane, Perth, Adelaide, Canberra, Hobart, the Gold Coast and regional centres. Engagements run remotely on Zoom or Google Meet, with a shared workspace in Notion or Slack throughout the build. There is no premium for clients outside Melbourne; pricing is the same nationwide.',
  },
  {
    q: 'How do I contact UnderCurrent Automations?',
    a: 'The fastest way to contact UnderCurrent Automations is to book a free 30-minute call at undercurrentautomations.com/contact or to email luke@undercurrentautomations.com directly. Phone enquiries during Australian business hours go to 0438 780 815. Replies arrive within one business day, Mon to Fri, 09:00 to 17:00 AEDT.',
  },
]

function FAQ() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="11" label="Frequently asked questions" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Questions before getting in touch.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 920 }}>
          {FAQS.map((f, i) => (
            <details
              key={i}
              style={{
                borderTop: '1px solid var(--text-faint)',
                borderBottom: i === FAQS.length - 1 ? '1px solid var(--text-faint)' : 'none',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  padding: '22px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: '-0.015em',
                  color: 'var(--off-white)',
                  lineHeight: 1.35,
                }}
              >
                {f.q}
                <span aria-hidden="true" style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 18,
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                }}>+</span>
              </summary>
              <div style={{ padding: '0 0 22px' }}>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: 820,
                }}>
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — Resources
// ═══════════════════════════════════════════════════════════════════════════════
const RESOURCES = [
  { label: 'About', href: '/about', desc: 'The longer story behind the build.' },
  { label: 'Services', href: '/services', desc: 'Every service in detail.' },
  { label: 'Process', href: '/process', desc: 'How a build runs, week by week.' },
  { label: 'Case studies', href: '/case-studies', desc: 'Workflows already running in production.' },
  { label: 'Blog', href: '/blog', desc: 'Articles on AI search, SEO and operations.' },
  { label: 'Free audit', href: '/audit', desc: 'Tell us where the time goes. We send back a punch list.' },
  { label: 'Contact', href: '/contact', desc: 'Book a workflow review or send a question.' },
]

function Resources() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow n="12" label="Resources" />
        </div>

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          Where to go from here.
        </h2>

        <div
          className="uc-resources-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 720px) {
              .uc-resources-grid { grid-template-columns: 1fr !important; }
            }
            .uc-res-card { transition: transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1); }
            .uc-res-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--blue) !important; }
          `}</style>
          {RESOURCES.map(r => (
            <Link
              key={r.href}
              href={r.href}
              className="uc-res-card"
              style={{
                display: 'block',
                padding: '20px 22px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                boxShadow: '4px 4px 0 0 var(--blue)',
                textDecoration: 'none',
              }}
            >
              <h3 style={{
                margin: '0 0 4px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 17,
                letterSpacing: '-0.015em',
                color: 'var(--off-white)',
              }}>
                {r.label}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                lineHeight: 1.55,
                color: 'var(--text-muted)',
              }}>
                {r.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — Closing CTA
// ═══════════════════════════════════════════════════════════════════════════════
function ClosingCTA() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
        overflow: 'hidden',
      }}
    >
      {/* one allowed radial glow per page, in closing CTA */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 900,
          height: 900,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(106,141,173,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 1100, margin: 0, position: 'relative' }}>
        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 4.4vw, 56px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 880,
          }}
        >
          Ready to{' '}
          <span className="uc-glow-word uc-glow-word--blue">work together</span>?
        </h2>

        <p
          style={{
            margin: '0 0 32px',
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: 640,
          }}
        >
          A 30-minute call. Free. No deck, no sales pitch. We map where the time goes,
          name the workflow that hurts most, and show you what a working system looks like for your business.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
          <PillCTA label="Book a workflow review" href="/contact" tone="blue" large />
          <PillCTA label="Run the free audit" href="/audit" tone="sage" />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// JSON-LD
// ═══════════════════════════════════════════════════════════════════════════════
function PageJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Company information', item: PAGE_URL },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const aboutPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#aboutpage`,
    url: PAGE_URL,
    name: 'Company Information | UnderCurrent Automations',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${DOMAIN}#website` },
    about: { '@id': `${DOMAIN}#organization` },
    mainEntity: { '@id': `${DOMAIN}#organization` },
    dateModified: '2026-05-07',
    breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumb, '@id': `${PAGE_URL}#breadcrumb` }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }}
      />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════════
export default function CompanyInformationPage() {
  return (
    <>
      <PageJsonLd />
      <Hero />
      <AtAGlance />
      <WhatWeDo />
      <ServicesOffered />
      <Industries />
      <WhereWeWork />
      <HowWeWork />
      <Pricing />
      <Tools />
      <Founder />
      <FAQ />
      <Resources />
      <ClosingCTA />
    </>
  )
}
