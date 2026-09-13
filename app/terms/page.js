// app/terms/page.js — Terms of Service, on the plain text template. Copy unchanged from the old page.
import PlainPage from '@/components/site/PlainPage'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the UnderCurrent website and AI automation services. Read our service agreement, limitations, and policies.',
  alternates: { canonical: 'https://undercurrentautomations.com/terms' },
  openGraph: {
    title: 'Terms of Service | UnderCurrent Automations',
    description: 'Terms and conditions for using the UnderCurrent website and AI automation services.',
    url: 'https://undercurrentautomations.com/terms',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

const DOMAIN = 'https://undercurrentautomations.com'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

export default function Page() {
  return (
    <PlainPage title="Terms of Service" updated={LAST_UPDATED}>
          <h2>1. Agreement to Terms</h2>
          <p>
          By accessing or using the UnderCurrent website at {DOMAIN} (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Site or use our services.</p>
          <h2>2. Description of Services</h2>
          <p>
          UnderCurrent provides AI-powered business automation services, including but not limited to:</p>
          <ul>
          <li>Business workflow mapping and audit</li>
          <li>Custom AI automation system design and deployment</li>
          <li>Ongoing system maintenance and optimisation</li>
          <li>Free online business audit tools</li>
          <li>ROI calculators and assessment tools</li>
          </ul>
          <p>
          Services are provided on a project basis as agreed between UnderCurrent and the client. Specific deliverables, timelines, and pricing are outlined in individual service agreements.</p>
          <h2>3. Use of the Website</h2>
          <p>You agree to use the Site only for lawful purposes and in accordance with these terms. You agree not to:</p>
          <ul>
          <li>Use the Site in any way that violates applicable Australian federal or state law</li>
          <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
          <li>Use automated tools to scrape, crawl, or extract data from the Site beyond what is permitted by our robots.txt</li>
          <li>Transmit malware, viruses, or any other harmful code</li>
          <li>Interfere with or disrupt the integrity or performance of the Site</li>
          </ul>
          <h2>4. Business Audit and Calculator Tools</h2>
          <p>
          Our free business audit tool and ROI calculator provide estimates and general guidance based on the information you provide. These tools are for informational purposes only and should not be considered as financial, legal, or professional advice.</p>
          <p>
          Results are approximations based on industry averages and the data you input. Actual results from implementing automation may vary. UnderCurrent does not guarantee specific outcomes from implementing any recommended automations.</p>
          <h2>5. Intellectual Property</h2>
          <p>
          The Site and its entire contents, features, and functionality — including but not limited to text, design, graphics, logos, icons, and software — are owned by UnderCurrent and are protected by Australian and international copyright, trademark, and other intellectual property laws.</p>
          <p>
          You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.</p>
          <h2>6. Client Work and Confidentiality</h2>
          <p>
          Any automation systems, workflows, or tools built by UnderCurrent for a client remain the intellectual property of UnderCurrent unless explicitly transferred in a written agreement. Clients receive a perpetual licence to use systems built for them.</p>
          <p>
          We treat all client business information as confidential. We will not share your business data, workflows, or operational details with third parties without your consent, except as required by law.</p>
          <h2>7. Limitation of Liability</h2>
          <p>
          To the maximum extent permitted by Australian Consumer Law, UnderCurrent shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or our services.</p>
          <p>
          Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.</p>
          <h2>8. Payment Terms</h2>
          <p>
          Payment terms for services are outlined in individual service agreements. Unless otherwise agreed, invoices are due within 14 days of issue. We reserve the right to suspend services for overdue accounts.</p>
          <p>
          All prices are quoted in Australian Dollars (AUD) and are exclusive of GST unless stated otherwise.</p>
          <h2>9. Termination</h2>
          <p>
          Either party may terminate a service agreement with 30 days written notice. Upon termination, any outstanding fees for work already completed remain payable. We will provide reasonable assistance to transition your systems.</p>
          <h2>10. Governing Law</h2>
          <p>
          These terms are governed by and construed in accordance with the laws of Victoria, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Victoria.</p>
          <h2>11. Changes to Terms</h2>
          <p>
          We may revise these terms at any time by updating this page. Changes take effect when posted. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.</p>
          <h2>12. Contact</h2>
          <p>For questions about these terms, contact us at:</p>
          <p>
          <strong>UnderCurrent</strong><br />
          Melbourne, Australia<br />
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p>See also our <a href="/privacy">Privacy Policy</a>, or <a href="/contact">contact us</a> with any question.</p>
    </PlainPage>
  )
}
