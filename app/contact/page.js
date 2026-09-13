// app/contact/page.js — the sandbox's contact mockup poured in. Markup verbatim,
// the form is the one client island on the page.
import '@/app/styles/contact.css'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import ContactForm from '@/components/site/ContactForm'
import { BOOK_A_CALL } from '@/components/site/Footer'

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://undercurrentautomations.com' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://undercurrentautomations.com/contact' },
  ],
}

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with UnderCurrent Automations. Melbourne-based, serving Australia-wide. We respond within 1 business day.',
  alternates: { canonical: 'https://undercurrentautomations.com/contact' },
  openGraph: {
    title: 'Contact UnderCurrent Automations',
    description: 'Melbourne AI automation agency. We respond within 1 business day.',
    url: 'https://undercurrentautomations.com/contact',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact UnderCurrent Automations',
    description: 'Melbourne AI automation agency. We respond within 1 business day.',
  },
}

export default function ContactPage() {
  return (
    <>
      <PageFx />
      <JsonLd schema={BREADCRUMB_SCHEMA} />
<section className="sec centre" id="top" data-reveal="">
  <div className="wrap centre__wrap">
    <span className="eyebrow rv">Contact</span>
    <h1 className="rv" style={{"--i":"1"}}>Let&apos;s talk.</h1>
    <p className="sub rv" style={{"--i":"2"}}>Tell us what&apos;s eating your week. We&apos;ll tell you what we&apos;d fix first.</p>
    <p className="d-skip rv" style={{"--i":"3"}}>Prefer to skip the form? <a href={BOOK_A_CALL} target="_blank" rel="noopener">Book a call directly</a>.</p>
    <ContactForm />
  </div>
</section>

<section className="sec sec--off" data-reveal="">
  <div className="wrap">
    <div className="strip rv">
      <div><span className="eyebrow">Email</span><b><a href="mailto:luke@undercurrentautomations.com">luke@undercurrentautomations.com</a></b></div>
      <div><span className="eyebrow">Phone</span><b><a href="tel:+61438780815">0438 780 815</a></b></div>
      <div><span className="eyebrow">Where</span><b>Melbourne, VIC. Serving Australia-wide.</b></div>
      <div><span className="eyebrow">Hours</span><b>Mon–Fri, 09:00–17:00 AEDT</b></div>
    </div>
  </div>
</section>
    </>
  )
}
