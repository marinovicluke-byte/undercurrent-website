// Location page data — one entry per city/suburb
// Each entry renders a full SEO-optimised LocationPage
// Structured for easy expansion to new locations

export const LOCATIONS = [
  {
    slug: 'ai-automation-melbourne',
    city: 'Melbourne',
    region: 'VIC',

    // Visual variant — controls hero headline font order and type treatment
    // 'default'   : DM Sans bold line 1, Cormorant italic line 2
    // 'editorial' : Cormorant italic line 1, DM Sans bold line 2
    // 'mono'      : DM Mono line 1, Cormorant italic line 2
    heroVariant: 'default',

    // SEO
    metaTitle: 'AI Automation Melbourne — Custom Workflows for Small Business | UnderCurrent',
    metaDescription: 'Melbourne small businesses use UnderCurrent to automate lead follow-up, client onboarding, and admin — saving 15 or more hours a week. Book a free workflow audit.',

    // Hero
    heroPill: 'Melbourne, VIC',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Melbourne.',
    heroCopy: 'Melbourne businesses lose 15 to 25 hours a week to tasks a well-built system handles entirely. We map what is costing you time and build the automation that runs it.',

    // Industries section
    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for how Melbourne businesses actually operate.',
    industriesCopy: 'Every industry has its own repetitive work. We have seen it all and we have built the systems to handle it.',
    industries: [
      {
        label: 'Professional Services',
        headline: 'Clients looked after. No manual admin.',
        copy: 'From the moment a contract is signed, welcome sequences, onboarding, check-ins and review requests all run automatically. Every client gets the same great experience every time.',
        animType: 'pipeline',
      },
      {
        label: 'Trades and Construction',
        headline: 'Quote to invoice. Without the back-and-forth.',
        copy: 'Enquiries triaged, quotes personalised, jobs booked, invoices sent and chased. Your pipeline keeps moving without you touching it.',
        animType: 'terminal',
      },
      {
        label: 'Lead Generation',
        headline: 'More leads. Fewer that slip through.',
        copy: 'New enquiries captured and scored, follow-up sequences sent automatically, meetings booked without the back-and-forth. Leads that go quiet get followed up so you do not lose the work.',
        animType: 'leadgen',
      },
    ],

    // Benefits section
    benefitsLabel: 'WHAT YOU GET',
    benefitsHeadline: 'What you get with UnderCurrent.',
    benefits: [
      {
        title: 'Custom-Built for Your Business',
        copy: 'Every workflow is designed around how you actually operate. Not a generic template you have to adapt to.',
        animType: 'network',
      },
      {
        title: 'Maintained and Always Improving',
        copy: 'We stay on after the build. Your automations get monitored, maintained and improved as your business changes and grows.',
        animType: 'retainer',
      },
      {
        title: 'Works With What You Have',
        copy: 'Xero, HubSpot, Shopify, Gmail, Slack, Notion. We connect the stack you already use. No rip-and-replace.',
        animType: 'integrations',
      },
      {
        title: 'Results You Can Measure',
        copy: '3x more pipeline. 40% more reviews. 15 hours back per week. Outcomes you can track from day one.',
        animType: 'results',
      },
    ],

    // How it works (shared STEPS constant in LocationPage)
    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    // Comparison
    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to doing it yourself.',
    comparisonCopy: 'Most Melbourne business owners have tried three things before finding us. Here is how they stack up.',
    comparisonRows: [
      { label: 'Built around your exact processes',     uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',      uc: true, manual: true,  generic: false, agency: false },
      { label: 'Maintained and improved over time',     uc: true, manual: false, generic: false, agency: false },
      { label: 'Runs 24/7 without your input',          uc: true, manual: false, generic: true,  agency: false },
      { label: 'Human approval for critical decisions', uc: true, manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',           uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    // FAQ
    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'What is AI automation for Melbourne small businesses?',
        a: 'AI automation replaces repetitive, rule-based tasks with systems that run automatically. Lead follow-up, client onboarding, invoice chasing, content publishing. UnderCurrent builds these custom for Melbourne businesses, integrating with the tools you already use.',
      },
      {
        q: 'Do you work with businesses across all Melbourne suburbs?',
        a: 'Yes. We work with businesses across Melbourne CBD, inner suburbs like Fitzroy, Richmond and South Yarra, and outer metro areas. All our work is delivered remotely so your location does not affect how we operate.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Shopify, Gmail, Outlook, Slack, Notion, Asana and more. We do not impose a new platform on your business.',
      },
      {
        q: 'How long does it take to get up and running?',
        a: 'Most automations go live within 7 to 14 days of our first call. We have built these systems before so we move quickly because we know where to start.',
      },
      {
        q: 'Can I keep my existing software?',
        a: 'Entirely. We build on top of what you already have. No new platforms to learn, nothing to migrate. We just remove the slow, manual parts of your current stack.',
      },
      {
        q: 'What is the ROI for a Melbourne small business?',
        a: 'Most clients see meaningful time savings within the first two weeks. Typical results include 15 to 25 hours saved per week, 3x more pipeline activity and 40% more customer reviews. Full ROI typically lands within the first month.',
      },
      {
        q: 'Is my business data kept securely?',
        a: 'We build automations using tools you control. Your CRM, your email, your accounts. Data flows between the systems you already own. Security and data sovereignty are built into how we work, not bolted on.',
      },
    ],

    // CTA
    ctaHeadline: 'Ready to reclaim your time?',
    ctaCopy: 'Book a free 30-minute call. We will map your biggest time drains and show you exactly what can be automated. No obligation. Just a clear picture.',

    // Internal links (SEO)
    internalLinks: [
      { label: 'Customer Experience Automation', path: '/services' },
      { label: 'Sales Automation', path: '/services' },
      { label: 'Content Design Automation', path: '/services' },
      { label: 'Personal System AI', path: '/services' },
      { label: 'Finance Automation', path: '/services' },
    ],
  },
]

export function getLocation(slug) {
  return LOCATIONS.find(l => l.slug === slug) || null
}
