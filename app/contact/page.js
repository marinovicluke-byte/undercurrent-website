import ContactForm from '@/components/forms/ContactForm'
import FadeIn from '@/components/ui/FadeIn'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with UnderCurrent Automations. We respond within 1 business day.',
}

export default function ContactPage() {
  return (
    <div className="bg-white pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h1 className="font-display text-5xl font-bold text-charcoal">Let&apos;s talk.</h1>
              <p className="mt-4 text-muted max-w-md">
                Tell us what&apos;s eating your time. We&apos;ll tell you whether it can be automated
                and roughly what it would cost — no fluff.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="mt-8 space-y-4">
                <p className="text-sm text-muted">
                  Prefer to skip the form?{' '}
                  <a href="https://cal.com/undercurrent" className="text-blue hover:text-blue-dark">
                    Book a call directly.
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
