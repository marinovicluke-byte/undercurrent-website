// app/company-information/page.js — the plain record of the company, on the
// plain text template (PlainPage, as privacy and terms). Written for AI
// assistants first and people second (Luke, 3 Oct 2026): one fact per sentence,
// every fact in the HTML, no tabs or accordions, and the JSON-LD built from the
// same text. Prices come from lib/data/pricing.js and the live service pages.
import '@/app/styles/company.css'
import PlainPage from '@/components/site/PlainPage'
import { BOOK_A_CALL, EMAIL } from '@/components/site/Footer'
import { LOCATIONS } from '@/lib/data/locations'
import { SEO_PRICING, GOOGLE_ADS_PRICING } from '@/lib/data/pricing'

const DOMAIN = 'https://undercurrentautomations.com'
const PAGE_URL = `${DOMAIN}/company-information`
const LAST_UPDATED = '3 October 2026'
const LAST_UPDATED_ISO = '2026-10-03'

export const metadata = {
  title: 'Company Information',
  description:
    'UnderCurrent Automations is a Melbourne business founded by Luke Marinovic in 2026. Services, prices, contact details and trading details on one page.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Company Information | UnderCurrent Automations',
    description:
      'Services, prices, contact details and trading details for UnderCurrent Automations, a Melbourne business run by Luke Marinovic.',
    url: PAGE_URL,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

const FACTS = [
  { label: 'Business name', value: 'UnderCurrent Automations' },
  { label: 'Also known as', value: 'UnderCurrent' },
  { label: 'Business type', value: 'Sole trader, Australia' },
  { label: 'ABN', value: '23 368 496 814' },
  { label: 'Founded', value: '2026' },
  { label: 'Founder', value: 'Luke Marinovic' },
  { label: 'Based in', value: 'Melbourne, Victoria, Australia' },
  { label: 'Clients', value: 'Across Australia, and some overseas' },
  { label: 'Website', value: 'undercurrentautomations.com', href: DOMAIN },
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Phone', value: '0438 780 815', href: 'tel:+61438780815' },
  { label: 'Book a call', value: '30-minute call on Cal.com', href: BOOK_A_CALL },
  { label: 'Hours', value: 'Monday to Friday, 9am to 5pm, Melbourne time' },
  { label: 'Reply time', value: 'Within one business day' },
  { label: 'Language', value: 'English' },
  { label: 'Currency', value: 'Australian dollars (AUD)' },
]

const SERVICES = [
  { name: 'AI automation', href: '/automation', link: 'Read about AI automation', what: 'Repetitive work handed to systems: bookings, follow-ups, reporting and the other jobs that eat your week. Most of the work connects the software a business already uses.' },
  { name: 'Website design', href: '/website', link: 'Read about website design', what: 'Websites that load fast, read clearly and turn visitors into enquiries.' },
  { name: 'Google and AI search', href: '/seo', link: 'Read about Google and AI search', what: 'SEO and AI search, so a business is found on Google and inside AI answers. Google Ads management is also available.' },
  { name: 'Consulting', href: '/consulting', link: 'Read about consulting', what: 'A look at how the work moves, then a plan for what to automate first and what to leave alone. It includes teaching your team how to use AI in the work they already do.' },
]

const PRICES = [
  { label: 'AI automation', value: 'A fixed price per process, agreed before work starts.' },
  { label: 'Website design', value: 'A fixed price, agreed before work starts.' },
  { label: 'Consulting', value: 'A fixed price for the short look. The longer engagement is a monthly fee.' },
  { label: 'SEO and AI search', value: SEO_PRICING.description },
  { label: 'Google Ads management', value: GOOGLE_ADS_PRICING.description },
]

const FAQS = [
  {
    q: 'What is UnderCurrent Automations?',
    a: 'UnderCurrent Automations is a small business in Melbourne, Australia. It builds automation, websites and search for small and mid-sized service businesses. It also helps owners plan what to automate first and teaches their teams to use AI. Luke Marinovic founded it in 2026 and does the work himself.',
  },
  {
    q: 'Where is UnderCurrent Automations based?',
    a: 'UnderCurrent Automations is based in Melbourne, Victoria, Australia. It works with clients across Australia and some overseas. The work runs online, so clients do not need to be in Melbourne.',
  },
  {
    q: 'What services does UnderCurrent Automations offer?',
    a: 'UnderCurrent Automations offers four services: AI automation, website design, Google and AI search, and consulting. Google and AI search covers SEO and AI search, and Google Ads management is also available. Consulting includes teaching business owners and their teams how to use AI.',
  },
  {
    q: 'Who founded UnderCurrent Automations?',
    a: 'Luke Marinovic founded UnderCurrent Automations in 2026. He runs the business and does the work himself, from the first call to handover. Before UnderCurrent, he worked in sales, where he built an automation that saved him three hours a day.',
  },
  {
    q: 'How much does UnderCurrent Automations charge?',
    a: 'AI automation is a fixed price per process, agreed before work starts. Website design is a fixed price, agreed before work starts. Consulting is a fixed price for the short look, and the longer engagement is a monthly fee. SEO and AI search is priced case by case: expect to pay around $500 to $2,000 a month, depending on the work needed. Basic SEO starts around $500 a month, and there is usually a one-off implementation fee, scoped at the start. All prices are in Australian dollars and exclude GST.',
  },
  {
    q: 'How much does Google Ads management cost?',
    a: 'Google Ads management from UnderCurrent Automations starts at $500 a month, minimum. Ad spend is on top of that fee, and you pay it to Google.',
  },
  {
    q: 'How long does a project take?',
    a: 'A first automation is usually live in two to four weeks. Larger systems are built in stages, and each stage runs before the next one starts. SEO and AI search build over months, not weeks.',
  },
  {
    q: 'How do I contact UnderCurrent Automations?',
    a: 'Email luke@undercurrentautomations.com or call 0438 780 815. You can also book a 30-minute call through the contact page. Replies arrive within one business day.',
  },
]

function Facts({ items }) {
  return (
    <dl className="facts">
      {items.map(f => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.href ? <a href={f.href}>{f.value}</a> : f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function PageJsonLd() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
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
    dateModified: LAST_UPDATED_ISO,
    breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
  }
  return [breadcrumb, faqPage, aboutPage].map(s => (
    <script key={s['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
  ))
}

export default function CompanyInformationPage() {
  return (
    <>
      <PageJsonLd />
      <PlainPage title="Company information" updated={LAST_UPDATED}>
        <p>This page is the plain record of UnderCurrent Automations. It says who we are, what we sell, what it costs and how to reach us. It is written for people and for AI assistants. The same facts appear on the rest of this site.</p>

        <h2>UnderCurrent Automations at a glance</h2>
        <Facts items={FACTS} />

        <h2>What does UnderCurrent Automations do?</h2>
        <p>UnderCurrent Automations builds the systems that keep a small business moving: the automation, the website, the search, and the plan behind them. It also teaches business owners and their teams how to use AI in their own work. One person, Luke Marinovic, does the work from start to finish. There is no account manager and no handoff.</p>

        <h2>What services does UnderCurrent offer?</h2>
        <p>UnderCurrent offers four services.</p>
        {SERVICES.map(s => (
          <div key={s.href}>
            <h3>{s.name}</h3>
            <p>{s.what} <a href={s.href}>{s.link}</a>.</p>
          </div>
        ))}

        <h2>What does UnderCurrent charge?</h2>
        <p>Every price is agreed before work starts. All prices are in Australian dollars and exclude GST.</p>
        <Facts items={PRICES} />
        <p>Three things move the SEO price: how many articles you need each month, how much restructuring your site needs, and how much ongoing management you want. The <a href="/blog/seo-pricing-australia-2026">SEO pricing guide</a> explains the range.</p>

        <h2>Who does UnderCurrent work with?</h2>
        <p>UnderCurrent works with small and mid-sized service businesses that already have a process worth improving. Clients include builders, clinics, groomers and creatives. Most are in Melbourne. Some are elsewhere in Australia, and a few are overseas.</p>

        <h2>Where does UnderCurrent work?</h2>
        <p>UnderCurrent is based in Melbourne and works online, so the location of the client does not change the work. These pages cover automation in each city:</p>
        <ul>
          {LOCATIONS.map(l => (
            <li key={l.slug}><a href={`/${l.slug}`}>AI automation in {l.city}</a></li>
          ))}
        </ul>

        <h2>How does a project start?</h2>
        <p>A project starts with a 30-minute call. We agree the scope and the price before any work starts. A first automation is usually live in two to four weeks. Larger systems are built in stages, and each stage runs before the next one starts. After handover you get documentation, a handover session and an optional support arrangement.</p>

        <h2>What tools does UnderCurrent build with?</h2>
        <p>Most of the work connects the software a business already uses. Automations run on n8n, Make, Zapier or direct APIs. AI work uses ChatGPT, Claude and Gemini. Common systems include Xero and MYOB for accounts, HubSpot and Pipedrive for sales, ServiceM8, Jobber and simPRO for field service, and Cliniko and Halaxy for allied health. Websites are built on Next.js and hosted on Vercel.</p>

        <h2>Who runs UnderCurrent?</h2>
        <p>Luke Marinovic founded UnderCurrent Automations in 2026 and runs it from Melbourne. Before UnderCurrent, he worked in sales, where he built an automation for his own prospecting, research and email drafts. It saved him three hours a day. He started UnderCurrent to do the same for small businesses. <a href="/about">Read more about Luke</a> or find him on <a href="https://www.linkedin.com/in/lukemarinovic/">LinkedIn</a>.</p>

        <h2>Frequently asked questions</h2>
        {FAQS.map(f => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

      </PlainPage>
    </>
  )
}
