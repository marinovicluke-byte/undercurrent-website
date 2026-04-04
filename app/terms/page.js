import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the UnderCurrent website and AI automation services. Read our service agreement, limitations, and policies.',
}

const DOMAIN = 'https://undercurrentautomations.com.au'
const EMAIL = 'luke@undercurrentautomations.com'
const LAST_UPDATED = '23 March 2026'

const sectionStyle = 'mb-10'
const h2Class = 'font-display text-2xl font-semibold text-white mb-4 leading-snug'
const pClass = 'text-sm leading-relaxed mb-3 text-white/65'
const ulClass = 'text-sm leading-relaxed mb-3 text-white/65 list-disc pl-6 space-y-1'

export default function TermsPage() {
  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-16 overflow-x-hidden">

      <div className="mx-auto max-w-2xl px-6">
        <div className="flex justify-center mb-6">
          <div className="border border-blue/25 px-4 py-1">
            <p className="text-xs font-mono tracking-widest text-blue">LEGAL</p>
          </div>
        </div>

        <h1 className="font-display text-center text-4xl md:text-5xl font-normal text-white leading-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-white/40 mb-16">Last updated: {LAST_UPDATED}</p>

        <div className={sectionStyle}>
          <h2 className={h2Class}>1. Agreement to Terms</h2>
          <p className={pClass}>
            By accessing or using the UnderCurrent website at {DOMAIN} (&ldquo;the Site&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Site or use our services.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>2. Description of Services</h2>
          <p className={pClass}>
            UnderCurrent provides AI-powered business automation services, including but not limited to:
          </p>
          <ul className={ulClass}>
            <li>Business workflow mapping and audit</li>
            <li>Custom AI automation system design and deployment</li>
            <li>Ongoing system maintenance and optimisation</li>
            <li>Free online business audit tools</li>
            <li>ROI calculators and assessment tools</li>
          </ul>
          <p className={pClass}>
            Services are provided on a project basis as agreed between UnderCurrent and the client. Specific deliverables, timelines, and pricing are outlined in individual service agreements.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>3. Use of the Website</h2>
          <p className={pClass}>You agree to use the Site only for lawful purposes and in accordance with these terms. You agree not to:</p>
          <ul className={ulClass}>
            <li>Use the Site in any way that violates applicable Australian federal or state law</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its systems</li>
            <li>Use automated tools to scrape, crawl, or extract data from the Site beyond what is permitted by our robots.txt</li>
            <li>Transmit malware, viruses, or any other harmful code</li>
            <li>Interfere with or disrupt the integrity or performance of the Site</li>
          </ul>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>4. Business Audit and Calculator Tools</h2>
          <p className={pClass}>
            Our free business audit tool and ROI calculator provide estimates and general guidance based on the information you provide. These tools are for informational purposes only and should not be considered as financial, legal, or professional advice.
          </p>
          <p className={pClass}>
            Results are approximations based on industry averages and the data you input. Actual results from implementing automation may vary. UnderCurrent does not guarantee specific outcomes from implementing any recommended automations.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>5. Intellectual Property</h2>
          <p className={pClass}>
            The Site and its entire contents, features, and functionality — including but not limited to text, design, graphics, logos, icons, and software — are owned by UnderCurrent and are protected by Australian and international copyright, trademark, and other intellectual property laws.
          </p>
          <p className={pClass}>
            You may not reproduce, distribute, modify, or create derivative works from any content on this Site without our prior written consent.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>6. Client Work and Confidentiality</h2>
          <p className={pClass}>
            Any automation systems, workflows, or tools built by UnderCurrent for a client remain the intellectual property of UnderCurrent unless explicitly transferred in a written agreement. Clients receive a perpetual licence to use systems built for them.
          </p>
          <p className={pClass}>
            We treat all client business information as confidential. We will not share your business data, workflows, or operational details with third parties without your consent, except as required by law.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>7. Limitation of Liability</h2>
          <p className={pClass}>
            To the maximum extent permitted by Australian Consumer Law, UnderCurrent shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or our services.
          </p>
          <p className={pClass}>
            Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>8. Payment Terms</h2>
          <p className={pClass}>
            Payment terms for services are outlined in individual service agreements. Unless otherwise agreed, invoices are due within 14 days of issue. We reserve the right to suspend services for overdue accounts.
          </p>
          <p className={pClass}>
            All prices are quoted in Australian Dollars (AUD) and are exclusive of GST unless stated otherwise.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>9. Termination</h2>
          <p className={pClass}>
            Either party may terminate a service agreement with 30 days written notice. Upon termination, any outstanding fees for work already completed remain payable. We will provide reasonable assistance to transition your systems.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>10. Governing Law</h2>
          <p className={pClass}>
            These terms are governed by and construed in accordance with the laws of Victoria, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Victoria.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>11. Changes to Terms</h2>
          <p className={pClass}>
            We may revise these terms at any time by updating this page. Changes take effect when posted. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.
          </p>
        </div>

        <div className={sectionStyle}>
          <h2 className={h2Class}>12. Contact</h2>
          <p className={pClass}>For questions about these terms, contact us at:</p>
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
          <Link href="/privacy" className="flex-1 min-w-[180px] rounded-xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <p className="text-sm font-medium text-white mb-1">Privacy Policy</p>
            <p className="text-xs font-light text-white/40">Learn how we handle your data.</p>
          </Link>
          <Link href="/contact" className="flex-1 min-w-[180px] rounded-xl border border-white/10 p-4 hover:border-white/25 transition-colors">
            <p className="text-sm font-medium text-white mb-1">Contact Us</p>
            <p className="text-xs font-light text-white/40">Have questions? Reach out to our team.</p>
          </Link>
        </div>
      </div>

    </div>
  )
}
