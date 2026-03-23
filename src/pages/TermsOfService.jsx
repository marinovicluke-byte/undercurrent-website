import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'

const DOMAIN = 'https://www.undercurrentautomations.com'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

export default function TermsOfService() {
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
        title="Terms of Service | UnderCurrent"
        description="Terms and conditions for using the UnderCurrent website and AI automation services. Read our service agreement, limitations, and policies."
        canonical={`${DOMAIN}/terms`}
      />
      <Navbar ready />

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
          Terms of Service
        </h1>
        <p className="font-dm" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(212,201,176,0.4)', marginBottom: '4rem' }}>
          Last updated: {LAST_UPDATED}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Agreement to Terms</h2>
          <p style={pStyle}>
            By accessing or using the UnderCurrent website at {DOMAIN} ("the Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Site or use our services.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Services</h2>
          <p style={pStyle}>
            UnderCurrent provides AI-powered business automation services, including but not limited to:
          </p>
          <ul style={ulStyle}>
            <li>Business workflow mapping and audit</li>
            <li>Custom AI automation system design and deployment</li>
            <li>Ongoing system maintenance and optimisation</li>
            <li>Free online business audit tools</li>
            <li>ROI calculators and assessment tools</li>
          </ul>
          <p style={pStyle}>
            Services are provided on a project basis as agreed between UnderCurrent and the client. Specific deliverables, timelines, and pricing are outlined in individual service agreements.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Use of the Website</h2>
          <p style={pStyle}>You agree to use the Site only for lawful purposes and in accordance with these terms. You agree not to:</p>
          <ul style={ulStyle}>
            <li>Use the Site in any way that violates applicable Australian federal or state law</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
            <li>Use automated tools to scrape, crawl, or extract data from the Site beyond what is permitted by our robots.txt</li>
            <li>Transmit malware, viruses, or any other harmful code</li>
            <li>Interfere with or disrupt the integrity or performance of the Site</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Business Audit and Calculator Tools</h2>
          <p style={pStyle}>
            Our free business audit tool and ROI calculator provide estimates and general guidance based on the information you provide. These tools are for informational purposes only and should not be considered as financial, legal, or professional advice.
          </p>
          <p style={pStyle}>
            Results are approximations based on industry averages and the data you input. Actual results from implementing automation may vary. UnderCurrent does not guarantee specific outcomes from implementing any recommended automations.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Intellectual Property</h2>
          <p style={pStyle}>
            The Site and its entire contents, features, and functionality — including but not limited to text, design, graphics, logos, icons, and software — are owned by UnderCurrent and are protected by Australian and international copyright, trademark, and other intellectual property laws.
          </p>
          <p style={pStyle}>
            You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Client Work and Confidentiality</h2>
          <p style={pStyle}>
            Any automation systems, workflows, or tools built by UnderCurrent for a client remain the intellectual property of UnderCurrent unless explicitly transferred in a written agreement. Clients receive a perpetual licence to use systems built for them.
          </p>
          <p style={pStyle}>
            We treat all client business information as confidential. We will not share your business data, workflows, or operational details with third parties without your consent, except as required by law.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Limitation of Liability</h2>
          <p style={pStyle}>
            To the maximum extent permitted by Australian Consumer Law, UnderCurrent shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or our services.
          </p>
          <p style={pStyle}>
            Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Payment Terms</h2>
          <p style={pStyle}>
            Payment terms for services are outlined in individual service agreements. Unless otherwise agreed, invoices are due within 14 days of issue. We reserve the right to suspend services for overdue accounts.
          </p>
          <p style={pStyle}>
            All prices are quoted in Australian Dollars (AUD) and are exclusive of GST unless stated otherwise.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Termination</h2>
          <p style={pStyle}>
            Either party may terminate a service agreement with 30 days written notice. Upon termination, any outstanding fees for work already completed remain payable. We will provide reasonable assistance to transition your systems.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Governing Law</h2>
          <p style={pStyle}>
            These terms are governed by and construed in accordance with the laws of Victoria, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Victoria.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Changes to Terms</h2>
          <p style={pStyle}>
            We may revise these terms at any time by updating this page. Changes take effect when posted. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Contact</h2>
          <p style={pStyle}>
            For questions about these terms, contact us at:
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
          <a href="/privacy" style={{ flex: '1 1 200px', padding: '1rem 1.25rem', background: 'rgba(143,175,159,0.04)', border: '1px solid rgba(143,175,159,0.1)', borderRadius: '0.75rem', textDecoration: 'none', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#F7F3ED', margin: '0 0 0.2rem' }}>Privacy Policy</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', margin: 0 }}>Learn how we handle your data.</p>
          </a>
          <a href="/contact" style={{ flex: '1 1 200px', padding: '1rem 1.25rem', background: 'rgba(143,175,159,0.04)', border: '1px solid rgba(143,175,159,0.1)', borderRadius: '0.75rem', textDecoration: 'none', transition: 'border-color 0.3s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#F7F3ED', margin: '0 0 0.2rem' }}>Contact Us</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', margin: 0 }}>Have questions? Reach out to our team.</p>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
