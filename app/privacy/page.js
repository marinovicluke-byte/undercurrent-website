// app/privacy/page.js — Privacy Policy, on the plain text template. Copy unchanged from the old page.
import PlainPage from '@/components/site/PlainPage'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How UnderCurrent collects, uses, and protects your personal information. We respect your privacy and handle data responsibly.',
  alternates: { canonical: 'https://undercurrentautomations.com/privacy' },
  openGraph: {
    title: 'Privacy Policy | UnderCurrent Automations',
    description: 'How UnderCurrent collects, uses, and protects your personal information.',
    url: 'https://undercurrentautomations.com/privacy',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

const DOMAIN = 'https://undercurrentautomations.com'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

export default function Page() {
  return (
    <PlainPage title="Privacy Policy" updated={LAST_UPDATED}>
          <h2>1. Who We Are</h2>
          <p>
          UnderCurrent Automations (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an AI automation studio based in Melbourne, Australia. We build custom workflow automation systems for small businesses. This policy explains how we collect, use, and protect your personal information when you visit our website at {DOMAIN} or engage our services.</p>
          <h2>2. Information We Collect</h2>
          <p>We collect information in the following ways:</p>
          <p>Information you provide directly:</p>
          <ul>
          <li>Name, email address, phone number, and business name when you fill out our contact form or business audit</li>
          <li>Business operations data you share during our audit process (hours spent on tasks, workflow details)</li>
          <li>Any other information you voluntarily provide through email or consultation</li>
          </ul>
          <p>Information collected automatically:</p>
          <ul>
          <li>Usage data through Vercel Analytics (page views, referrers, browser type, device type)</li>
          <li>Performance metrics through Vercel Speed Insights</li>
          <li>These tools do not use cookies and do not track individual users across sites</li>
          </ul>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
          <li>Respond to your enquiries and provide requested services</li>
          <li>Generate and deliver your business audit report</li>
          <li>Communicate with you about our services</li>
          <li>Improve our website performance and user experience</li>
          <li>Comply with legal obligations</li>
          </ul>
          <p>
          We do not sell, rent, or trade your personal information to third parties. We do not use your data for advertising or profiling.</p>
          <h2>4. Data Storage and Security</h2>
          <p>
          Your data is processed through secure, encrypted channels. Our website is hosted on Vercel with enterprise-grade security. Audit form submissions are transmitted via encrypted webhooks to our automation platform, which operates on secured infrastructure.</p>
          <p>
          We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law.</p>
          <h2>5. Third-Party Services</h2>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
          <li><strong>Vercel</strong> — website hosting and analytics (privacy-focused, no cookies)</li>
          <li><strong>Google Fonts</strong> — font delivery (subject to Google&apos;s privacy policy)</li>
          <li><strong>Cal.com</strong> — meeting scheduling (when you book a call)</li>
          </ul>
          <p>
          Each service operates under their own privacy policy. We select services that align with privacy-respecting practices.</p>
          <h2>6. Your Rights</h2>
          <p>Under Australian Privacy Principles (APPs), you have the right to:</p>
          <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of any marketing communications</li>
          <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
          </ul>
          <p>
          To exercise any of these rights, contact us at{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
          <h2>7. Cookies</h2>
          <p>
          Our website does not use tracking cookies. Vercel Analytics is a privacy-focused analytics solution that does not require cookies or collect personally identifiable information. No cookie consent banner is required for our site.</p>
          <h2>8. Changes to This Policy</h2>
          <p>
          We may update this policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>
          <h2>9. Contact Us</h2>
          <p>If you have questions about this privacy policy or how we handle your data, contact us at:</p>
          <p>
          <strong>UnderCurrent</strong><br />
          Melbourne, Australia<br />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p>See also our <a href="/terms">Terms of Service</a>, or <a href="/contact">contact us</a> with any question.</p>
    </PlainPage>
  )
}
