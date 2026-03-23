import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Breadcrumb from '../components/Breadcrumb'

const DOMAIN = 'https://www.undercurrentautomations.com'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

export default function PrivacyPolicy() {
  const sectionStyle = { marginBottom: '2.5rem' }
  const h2Style = {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
    fontWeight: 600,
    color: '#F7F3ED',
    marginBottom: '1rem',
    lineHeight: 1.2,
  }
  const pStyle = {
    fontSize: '0.9rem',
    color: 'rgba(212,201,176,0.65)',
    lineHeight: 1.85,
    marginBottom: '0.75rem',
  }
  const ulStyle = {
    ...pStyle,
    paddingLeft: '1.5rem',
    listStyleType: 'disc',
  }

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title="Privacy Policy | UnderCurrent"
        description="How UnderCurrent collects, uses, and protects your personal information. We respect your privacy and handle data responsibly."
        canonical={`${DOMAIN}/privacy`}
      />
      <Navbar ready />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto', padding: '10rem 1.5rem 6rem' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ border: '1px solid rgba(143,175,159,0.25)', padding: '0.28rem 0.9rem' }}>
            <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: '#8FAF9F' }}>
              LEGAL
            </p>
          </div>
        </div>

        <h1
          className="font-cormorant"
          style={{ textAlign: 'center', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.01em' }}
        >
          Privacy Policy
        </h1>
        <p className="font-dm" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(212,201,176,0.4)', marginBottom: '4rem' }}>
          Last updated: {LAST_UPDATED}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Who We Are</h2>
          <p style={pStyle}>
            UnderCurrent ("we", "us", "our") is an AI automation studio based in Melbourne, Australia. We build custom workflow automation systems for small businesses. This policy explains how we collect, use, and protect your personal information when you visit our website at {DOMAIN} or engage our services.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Information We Collect</h2>
          <p style={pStyle}>We collect information in the following ways:</p>
          <p style={{ ...pStyle, fontWeight: 500, color: 'rgba(212,201,176,0.8)' }}>Information you provide directly:</p>
          <ul style={ulStyle}>
            <li>Name, email address, phone number, and business name when you fill out our contact form or business audit</li>
            <li>Business operations data you share during our audit process (hours spent on tasks, workflow details)</li>
            <li>Any other information you voluntarily provide through email or consultation</li>
          </ul>
          <p style={{ ...pStyle, fontWeight: 500, color: 'rgba(212,201,176,0.8)' }}>Information collected automatically:</p>
          <ul style={ulStyle}>
            <li>Usage data through Vercel Analytics (page views, referrers, browser type, device type)</li>
            <li>Performance metrics through Vercel Speed Insights</li>
            <li>These tools do not use cookies and do not track individual users across sites</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. How We Use Your Information</h2>
          <p style={pStyle}>We use the information we collect to:</p>
          <ul style={ulStyle}>
            <li>Respond to your enquiries and provide requested services</li>
            <li>Generate and deliver your business audit report</li>
            <li>Communicate with you about our services</li>
            <li>Improve our website performance and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p style={pStyle}>
            We do not sell, rent, or trade your personal information to third parties. We do not use your data for advertising or profiling.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Data Storage and Security</h2>
          <p style={pStyle}>
            Your data is processed through secure, encrypted channels. Our website is hosted on Vercel with enterprise-grade security. Audit form submissions are transmitted via encrypted webhooks to our automation platform, which operates on secured infrastructure.
          </p>
          <p style={pStyle}>
            We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Third-Party Services</h2>
          <p style={pStyle}>We use the following third-party services that may process your data:</p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'rgba(212,201,176,0.8)' }}>Vercel</strong> — website hosting and analytics (privacy-focused, no cookies)</li>
            <li><strong style={{ color: 'rgba(212,201,176,0.8)' }}>Google Fonts</strong> — font delivery (subject to Google's privacy policy)</li>
            <li><strong style={{ color: 'rgba(212,201,176,0.8)' }}>Cal.com</strong> — meeting scheduling (when you book a call)</li>
          </ul>
          <p style={pStyle}>
            Each service operates under their own privacy policy. We select services that align with privacy-respecting practices.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Your Rights</h2>
          <p style={pStyle}>Under Australian Privacy Principles (APPs), you have the right to:</p>
          <ul style={ulStyle}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of any marketing communications</li>
            <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
          </ul>
          <p style={pStyle}>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${EMAIL}`} style={{ color: 'rgba(143,175,159,0.7)', textDecoration: 'none' }}>{EMAIL}</a>.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Cookies</h2>
          <p style={pStyle}>
            Our website does not use tracking cookies. Vercel Analytics is a privacy-focused analytics solution that does not require cookies or collect personally identifiable information. No cookie consent banner is required for our site.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of our website after changes constitutes acceptance of the revised policy.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Contact Us</h2>
          <p style={pStyle}>
            If you have questions about this privacy policy or how we handle your data, contact us at:
          </p>
          <p style={pStyle}>
            <strong style={{ color: 'rgba(212,201,176,0.8)' }}>UnderCurrent</strong><br />
            Melbourne, Australia<br />
            <a href={`mailto:${EMAIL}`} style={{ color: 'rgba(143,175,159,0.7)', textDecoration: 'none' }}>{EMAIL}</a>
          </p>
        </div>

      </div>

      {/* ── Related Pages ── */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a href="/terms" style={{ flex: '1 1 200px', padding: '1rem 1.25rem', background: 'rgba(143,175,159,0.04)', border: '1px solid rgba(143,175,159,0.1)', borderRadius: '0.75rem', textDecoration: 'none', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#F7F3ED', margin: '0 0 0.2rem' }}>Terms of Service</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', margin: 0 }}>Review our terms and conditions.</p>
          </a>
          <a href="/contact" style={{ flex: '1 1 200px', padding: '1rem 1.25rem', background: 'rgba(143,175,159,0.04)', border: '1px solid rgba(143,175,159,0.1)', borderRadius: '0.75rem', textDecoration: 'none', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#F7F3ED', margin: '0 0 0.2rem' }}>Contact Us</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', margin: 0 }}>Questions about your data? Get in touch.</p>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
