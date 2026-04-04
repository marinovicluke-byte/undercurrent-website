import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How UnderCurrent collects, uses, and protects your personal information. We respect your privacy and handle data responsibly.',
}

const DOMAIN = 'https://undercurrentautomations.com.au'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

const sectionStyle = 'mb-10'
const h2Class = 'font-display text-2xl font-semibold text-white mb-4 leading-snug'
const pClass = 'text-sm leading-relaxed mb-3 text-white/65'
const ulClass = 'text-sm leading-relaxed mb-3 text-white/65 list-disc pl-6 space-y-1'

export default function PrivacyPage() {
  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-16 overflow-x-hidden">

      <div className="mx-auto max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="border border-blue/25 px-4 py-1">
            <p className="text-xs font-mono tracking-widest text-blue">LEGAL</p>
          </div>
        </div>

        <h1 className="font-display text-center text-4xl md:text-5xl font-normal text-white leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-white/40 mb-16">Last updated: {LAST_UPDATED}</p>

        <div className={sectionStyle}>
          <h2 className={h2Class}>1. Who We Are</h2>
          <p className={pClass}>
            UnderCurrent (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an AI automation studio based in Melbourne, Australia. We build custom workflow automation systems for small businesses. This policy explains how we collect, use, and protect your personal information when you visit our website at {DOMAIN} or engage our services.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>2. Information We Collect</h2>
          <p className={pClass}>We collect information in the following ways:</p>
          <p className="text-sm text-white/80 font-medium mb-2">Information you provide directly:</p>
          <ul className={ulClass}>
            <li>Name, email address, phone number, and business name when you fill out our contact form or business audit</li>
            <li>Business operations data you share during our audit process (hours spent on tasks, workflow details)</li>
            <li>Any other information you voluntarily provide through email or consultation</li>
          </ul>
          <p className="text-sm text-white/80 font-medium mb-2">Information collected automatically:</p>
          <ul className={ulClass}>
            <li>Usage data through Vercel Analytics (page views, referrers, browser type, device type)</li>
            <li>Performance metrics through Vercel Speed Insights</li>
            <li>These tools do not use cookies and do not track individual users across sites</li>
          </ul>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>3. How We Use Your Information</h2>
          <p className={pClass}>We use the information we collect to:</p>
          <ul className={ulClass}>
            <li>Respond to your enquiries and provide requested services</li>
            <li>Generate and deliver your business audit report</li>
            <li>Communicate with you about our services</li>
            <li>Improve our website performance and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className={pClass}>
            We do not sell, rent, or trade your personal information to third parties. We do not use your data for advertising or profiling.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>4. Data Storage and Security</h2>
          <p className={pClass}>
            Your data is processed through secure, encrypted channels. Our website is hosted on Vercel with enterprise-grade security. Audit form submissions are transmitted via encrypted webhooks to our automation platform, which operates on secured infrastructure.
          </p>
          <p className={pClass}>
            We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>5. Third-Party Services</h2>
          <p className={pClass}>We use the following third-party services that may process your data:</p>
          <ul className={ulClass}>
            <li><strong className="text-white/80">Vercel</strong> — website hosting and analytics (privacy-focused, no cookies)</li>
            <li><strong className="text-white/80">Google Fonts</strong> — font delivery (subject to Google&apos;s privacy policy)</li>
            <li><strong className="text-white/80">Cal.com</strong> — meeting scheduling (when you book a call)</li>
          </ul>
          <p className={pClass}>
            Each service operates under their own privacy policy. We select services that align with privacy-respecting practices.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>6. Your Rights</h2>
          <p className={pClass}>Under Australian Privacy Principles (APPs), you have the right to:</p>
          <ul className={ulClass}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of any marketing communications</li>
            <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
          </ul>
          <p className={pClass}>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${EMAIL}`} className="text-blue/70 hover:text-blue transition-colors">{EMAIL}</a>.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>7. Cookies</h2>
          <p className={pClass}>
            Our website does not use tracking cookies. Vercel Analytics is a privacy-focused analytics solution that does not require cookies or collect personally identifiable information. No cookie consent banner is required for our site.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>8. Changes to This Policy</h2>
          <p className={pClass}>
            We may update this policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the revised policy.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>9. Contact Us</h2>
          <p className={pClass}>If you have questions about this privacy policy or how we handle your data, contact us at:</p>
          <p className={pClass}>
            <strong className="text-white/80">UnderCurrent</strong><br />
            Melbourne, Australia<br />
            <a href={`mailto:${EMAIL}`} className="text-blue/70 hover:text-blue transition-colors">{EMAIL}</a>
          </p>
        </div>
      </div>

      {/* Related links */}
      <div className="mx-auto max-w-2xl px-6 mt-4 pb-8">
        <div className="flex flex-wrap gap-3">
          <Link href="/terms" className="flex-1 min-w-[180px] rounded-xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <p className="text-sm font-medium text-white mb-1">Terms of Service</p>
            <p className="text-xs font-light text-white/40">Review our terms and conditions.</p>
          </Link>
          <Link href="/contact" className="flex-1 min-w-[180px] rounded-xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <p className="text-sm font-medium text-white mb-1">Contact Us</p>
            <p className="text-xs font-light text-white/40">Questions about your data? Get in touch.</p>
          </Link>
        </div>
      </div>

    </div>
  )
}
