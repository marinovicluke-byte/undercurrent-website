import ContactForm from '@/components/forms/ContactForm'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with UnderCurrent Automations. Melbourne-based, serving Australia-wide. We respond within 1 business day.',
  alternates: { canonical: 'https://undercurrentautomations.com/contact' },
  openGraph: {
    title: 'Contact UnderCurrent Automations',
    description: 'Melbourne AI automation agency. We respond within 1 business day.',
    url: 'https://undercurrentautomations.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact UnderCurrent Automations',
    description: 'Melbourne AI automation agency. We respond within 1 business day.',
  },
}

export default function ContactPage() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad) 120px',
        background: 'var(--bg-deep)',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0, width: '100%' }}>
        <div style={{ marginBottom: 32 }}>
          <SectionEyebrow label="Contact" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
            gap: 80,
            alignItems: 'start',
          }}
          className="uc-stack-2col"
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(44px, 5.6vw, 80px)',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
              }}
            >
              Let&apos;s <span className="uc-glow-word uc-glow-word--blue">talk</span>.
            </h1>
            <p
              style={{
                margin: '28px 0 0',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                lineHeight: 1.55,
                color: 'var(--text-secondary)',
                maxWidth: 480,
              }}
            >
              Tell us what&apos;s eating your time. We&apos;ll tell you whether it can be automated and roughly what it would cost, no fluff.
            </p>

            <div
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: '1px solid var(--text-faint)',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-muted)',
              }}
            >
              <p style={{ margin: 0 }}>
                Prefer to skip the form?{' '}
                <a
                  href="https://cal.com/luke-marinovic-aqeosc/30min"
                  style={{ color: 'var(--blue-light)', textDecoration: 'underline', textDecorationColor: 'rgba(138,174,200,0.4)', textUnderlineOffset: 3 }}
                >
                  Book a call directly
                </a>.
              </p>

              <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
                <p style={{ margin: 0 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Email </span>
                  <a
                    href="mailto:luke@undercurrentautomations.com"
                    style={{ color: 'var(--off-white)', textDecoration: 'none' }}
                  >
                    luke@undercurrentautomations.com
                  </a>
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phone </span>
                  <a
                    href="tel:+61438780815"
                    style={{ color: 'var(--off-white)', textDecoration: 'none' }}
                  >
                    0438 780 815
                  </a>
                </p>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                  Melbourne, VIC · Serving Australia-wide · Mon–Fri 09:00–17:00 AEDT
                </p>
              </div>

              <p style={{ margin: '16px 0 0' }}>We respond within 1 business day.</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
