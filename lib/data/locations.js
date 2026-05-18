// Location page data. One entry per city/region.
// Each entry renders a full SEO + AIO optimised LocationPage via
// components/pages/LocationPage.js (server) + LocationPageClient.js (view).
//
// Copy rules (see _config/voice-and-tone.md + _config/constraints.md):
// - No em dashes anywhere. Use commas or periods.
// - Full "UnderCurrent Automations" in meta + first FAQ sentence for AIO.
// - Each FAQ answer is answer-first, 60-80 words, self-contained.
// - Entity density: at least 6 named tools per page, 15+ total entities.
// - 9 FAQs per page, at least 4 naming the city by name.
// - Per-city angle is distinct. No find-and-replace.
//
// Headline fields use a lead/glow/tail triplet so the renderer can wrap the
// glow span in uc-glow-word--{accent} without markup leaking into the data.

export const LOCATIONS = [
  // ──────────────────────────────────────────────────────────────────────────
  // MELBOURNE — home base. Angle: the one we know inside out.
  // Accent: sage (positive, home signal).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-melbourne',
    city: 'Melbourne',
    region: 'VIC',
    heroAccent: 'sage',
    geo: { latitude: -37.8136, longitude: 144.9631 },
    dateModified: '2026-05-14',

    metaTitle: 'AI Automation Melbourne',
    metaDescription: 'UnderCurrent Automations is a Melbourne AI automation agency. Workflow, lead, sales and finance systems built on Xero, HubSpot and n8n. Live in 14 days.',

    heroPill: 'Melbourne, VIC',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Melbourne.',
    heroCopy: 'UnderCurrent Automations is a Melbourne AI automation agency for small businesses. We map where 15 to 25 hours a week is going, then build the workflow, lead and finance systems that quietly run it. Live in 14 days. Built on tools you already own.',
    heroStats: [
      { value: '15–25 hrs', label: 'reclaimed per week, per team' },
      { value: '14 days', label: 'from first call to live system' },
      { value: '+40%', label: 'more 5-star reviews, on autopilot' },
    ],

    quickAnswer: [
      'Most Melbourne small businesses lose 15 to 25 hours a week to admin work that should run itself. Quotes drafted by hand. Invoices chased one by one. Leads ignored while the team is on a job. Reviews that never get asked for.',
      'AI automation closes that gap. UnderCurrent Automations is a Melbourne agency that maps where the hours are leaking, then builds fixed-price systems on the tools you already use: Xero, HubSpot, n8n, Google Workspace.',
      'Most builds go from first call to live system in 14 days. No hourly billing. No platform migration. Just hours back on Monday, and a quoting and follow-up engine that runs while you sleep.',
    ],

    metroDetail: {
      heading: 'How AI automation runs across greater Melbourne.',
      body: [
        'Three things kill Melbourne small businesses on admin: quote turnaround, lead response, and invoice chase. None of them are growth work. All of them eat your week. We have rebuilt every one of those flows for businesses across the CBD, the inner north, and the eastern and western corridors, and the patterns repeat.',
        'Greater Melbourne spans roughly 50 kilometres from Werribee in the west to Lilydale in the east. Professional services cluster in the CBD, South Yarra, Richmond and Fitzroy. Trade businesses operate out of the inner north and outer growth corridors. Clinics and allied-health practices spread evenly across the metro. We run every build remotely, in AEDT business hours, with weekly check-ins and a working system at handover.',
        'For Melbourne trades, lead-response automation has to handle Hipages plus Google enquiries plus direct calls before a competitor in the next suburb picks up. For Melbourne consultants, the admin layer between signed engagement letter and onboarded client is where the hours go. Buyers agents in Toorak, Hawthorn and Brighton run a different shape again: vendor matching, suburb-watchlist nurturing, inspection scheduling. We build to that shape too.',
      ],
      regulators: [
        { name: 'WorkSafe Victoria', url: 'https://www.worksafe.vic.gov.au' },
        { name: 'Consumer Affairs Victoria', url: 'https://www.consumer.vic.gov.au' },
        { name: 'Office of the Australian Information Commissioner', url: 'https://www.oaic.gov.au' },
      ],
      stats: [
        { label: 'Actively trading businesses across Victoria (ABS, June 2024)', value: '768,000+', source: 'https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits' },
        { label: 'Share that are small businesses, under 20 employees', value: '~95%', source: 'https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits' },
        { label: 'Greater Melbourne dispatch radius we cover', value: '~50 km', source: null },
      ],
    },

    localProof: {
      excerpt: 'We rebuilt the search and AI-citation footprint for a south-east Melbourne plumbing business. SEO foundations and Google Business Profile signals first, answer-engine formatting on the high-intent service pages, structured-data scaffolding for AI search. The same playbook is what we put under every Melbourne automation build.',
      caseStudyLabel: 'Read the south-east Melbourne plumbers case study',
      caseStudyPath: '/case-studies/plumbers-south-east-melbourne-seo',
    },

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'What does an',
    industriesHeadlineGlow: 'AI automation agency in Melbourne',
    industriesHeadlineAccent: 'sage',
    industriesHeadlineTail: ' build for small businesses?',
    industriesCopy: 'Four verticals we have built the playbook for. From Fitzroy trades to South Yarra consultants, the workflow patterns repeat. We have solved them before.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'Quote fast. Win the job. Invoice the same day.',
        copy: 'Melbourne sparkies, plumbers, builders, tilers and landscapers across the inner north, east and bayside. Enquiries triaged, quotes personalised in Xero or MYOB, jobs booked, invoices raised and chased automatically.',
        bullets: [
          'Instant reply to Hipages and Google enquiries',
          'Quote pre-filled from your rate card in under 5 minutes',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'Onboarding, check-ins, reviews. All on rails.',
        copy: 'Advisory firms, accountants, lawyers and agencies from the CBD to Fitzroy and South Yarra. Welcome sequences, document requests, milestone check-ins and referral prompts run through HubSpot, Clio or your existing CRM.',
        bullets: [
          'Contract-signed trigger kicks off welcome flow',
          'Milestone reviews scheduled automatically',
          'Referral asks sent after positive feedback',
        ],
      },
      {
        label: 'Retail & Hospitality',
        headline: 'Bookings in. Reviews up. Inbox empty.',
        copy: 'Melbourne cafes, restaurants, studios and retail brands. Reservation confirmations, loyalty emails, stock alerts and review requests handled without a manager at the laptop after close.',
        bullets: [
          'Reservation flows through Square, Shopify or Lightspeed',
          'Post-visit review and rebooking prompts on time',
          'Stock and supplier nudges before the shelf runs empty',
        ],
      },
      {
        label: 'Allied Health',
        headline: 'Fewer no-shows. More returning patients.',
        copy: 'Clinics, physios, psychologists, chiros and allied health providers across greater Melbourne. Appointment reminders, intake forms, rebooking prompts and review requests run automatically around HICAPS and practice software.',
        bullets: [
          'SMS + email reminders tuned to your no-show rate',
          'Digital intake synced to Cliniko, Halaxy or Nookal',
          'Rebooking prompts at the right clinical interval',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'Why hire an agency for',
    benefitsHeadlineGlow: 'AI automation in Melbourne',
    benefitsHeadlineAccent: 'blue',
    benefitsHeadlineTail: ' instead of building it yourself?',
    benefits: [
      { title: 'Mapped to your ops',      copy: 'Every workflow is designed around how your Melbourne team operates. Not a generic template you have to bend your business around.' },
      { title: 'Maintained and improving', copy: 'We stay on after launch. Automations get monitored, maintained and tuned as your business shifts and grows.' },
      { title: 'Works with your stack',    copy: 'Xero, MYOB, HubSpot, Shopify, Gmail, Slack, Notion, n8n. We connect the tools you already use. No rip and replace.' },
      { title: 'Outcomes you can track',   copy: '3x more pipeline. 40% more reviews. 15 to 25 hours back per week. Numbers you can audit from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'How long does',
    processHeadlineGlow: 'AI automation in Melbourne',
    processHeadlineAccent: 'sage',
    processHeadlineTail: ' take from first call to live system?',
    processCopy: 'Three stages, 14 days. Fixed scope, fixed price, weekly check-ins, a working system at handover. No hourly billing, no surprise invoices.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Hiring an',
    comparisonHeadlineGlow: 'AI automation agency in Melbourne',
    comparisonAccent: 'blue',
    comparisonHeadlineTail: ' vs doing it yourself.',
    comparisonCopy: 'Most Melbourne business owners have tried three approaches before finding us. Here is how they compare against the outcome you were aiming for.',
    comparisonRows: [
      { label: 'Built around your exact processes',     uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',      uc: true, manual: true,  generic: false, agency: false },
      { label: 'Maintained and improved over time',     uc: true, manual: false, generic: false, agency: false },
      { label: 'Runs 24/7 without your input',          uc: true, manual: false, generic: true,  agency: false },
      { label: 'Human approval for critical decisions', uc: true, manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',           uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'AI Automation Melbourne, ',
    faqHeadlineGlow: 'Frequently Asked Questions',
    faqAccent: 'sage',
    faqHeadlineTail: '.',
    faqCopy: 'Honest answers to the questions that land in our inbox most, before anyone writes a cheque.',
    faqs: [
      {
        q: 'What is AI automation for Melbourne small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Melbourne small businesses. That means systems that replace repetitive, rule-based work: lead reply, client onboarding, invoice chasing, review requests, content scheduling. We design them around the tools you already use like Xero, HubSpot, Gmail, Slack and n8n. Nothing is ripped out or replaced, the manual parts just disappear.',
      },
      {
        q: 'Do you work with Melbourne trades and construction businesses?',
        a: 'Yes. Melbourne sparkies, plumbers, builders, tilers and landscapers are one of our biggest fits. We wire automation into your quoting, job booking, invoicing and review workflow across Xero, MYOB and HubSpot. Enquiries from your website, Hipages and Google get replied to within minutes, quotes pre-fill from your rate card, and review requests send themselves after every completed job.',
      },
      {
        q: 'How does automation help Melbourne consulting firms and professional services?',
        a: 'For Melbourne accountants, lawyers, advisory firms and agencies, automation handles the admin layer between signed contract and happy client. Welcome sequences, document collection, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Clio or your CRM. Partners stop pushing paperwork, clients get a consistent experience, the firm scales without new admin hires.',
      },
      {
        q: 'Do you work with businesses across all Melbourne suburbs?',
        a: 'Yes. We work with Melbourne businesses from the CBD to Fitzroy, Richmond, South Yarra, Brunswick, Footscray, Hawthorn and out to the eastern and western growth corridors. All build and support work is delivered remotely so location inside greater Melbourne does not affect how we operate. Onsite workshops are available on request for team rollouts.',
      },
      {
        q: 'How does automation help Melbourne retail, hospitality and allied health?',
        a: 'For Melbourne cafes, restaurants, studios and retail brands, automation runs reservations, loyalty, stock alerts and review requests through Square, Shopify or Lightspeed. For allied health clinics, it handles reminders, digital intake, HICAPS-aware rebooking and review prompts through Cliniko, Halaxy or Nookal. The front of house stops drowning in admin.',
      },
      {
        q: 'Do you build automation for buyers agencies in Melbourne?',
        a: 'Yes. Buyers agents in Toorak, Hawthorn, Brighton and South Yarra are a vertical we build for end-to-end. Automation handles vendor matching, suburb-watchlist nurturing, inspection scheduling, contract chase-ups and post-settlement review prompts. We integrate with Box+Dice, Rex or your CRM of choice, plus the email and SMS stack you already use. The buying agent stays on relationships, the admin layer runs itself.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, ClickUp, Clio, Cliniko, Halaxy and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does it take to go live in Melbourne?',
        a: 'Most automations go live within 14 days of our first call. We run a free 30-minute workflow review, scope the first build at a fixed price, ship week one, layer in the next wave week two, and you see hours back within the same fortnight. No long consulting runway, no hourly billing surprises.',
      },
      {
        q: 'What is the ROI for a Melbourne small business?',
        a: 'Most Melbourne clients see meaningful savings within the first two weeks. Typical results are 15 to 25 hours saved per week across the team, 3x more active pipeline without new headcount, and around 40% more Google and Facebook reviews from automated review requests. Full ROI usually lands within the first month, and compounds as more workflows come online.',
      },
      {
        q: 'Is my business data kept onshore and compliant?',
        a: 'We build on tools you already control. Your CRM, your email, your Xero account. Data stays in systems you own, not in a new UC platform. Where you require Australian data residency, we choose providers and regions that meet it. ATO, ASIC, Privacy Act and Fair Work obligations are considered during design, not bolted on after.',
      },
    ],

    ctaHeadline: 'Ready to reclaim your Melbourne week?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where your time is going, rank automations by value, and show you exactly what a 14-day build would cover. No pitch, no pressure.',
    ctaAccent: 'sage',

    internalLinks: [
      { label: 'Customer experience automation', path: '/customer-experience-automation' },
      { label: 'Sales automation',               path: '/sales-automation' },
      { label: 'Finance automation',             path: '/finance-automation' },
      { label: 'Content automation',             path: '/content-automation' },
      { label: 'Inbound lead management',        path: '/inbound-lead-management-melbourne' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SYDNEY — Angle: Speed + density. Highest lead density in Australia,
  // speed-to-reply wins deals. Financial services + property focus.
  // Accent: blue (informational, tech signal).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-sydney',
    city: 'Sydney',
    region: 'NSW',
    heroAccent: 'blue',

    metaTitle: 'AI Automation Sydney',
    metaDescription: 'UnderCurrent Automations builds AI automation for Sydney small businesses. Lead reply, onboarding and invoicing on Xero, HubSpot and n8n. Live in 14 days.',

    heroPill: 'Sydney, NSW',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Sydney.',
    heroCopy: 'Sydney runs on speed. High enquiry volume, a crowded service market, and the firm that replies first wins most of the deals. UnderCurrent Automations builds the systems that reply in minutes while your team stays on the tools.',
    heroStats: [
      { value: 'Under 5 min', label: 'reply to new enquiries, 24/7' },
      { value: '14 days', label: 'from first call to live system' },
      { value: '3x', label: 'pipeline without new headcount' },
    ],

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'Built for how',
    industriesHeadlineGlow: 'Sydney',
    industriesHeadlineAccent: 'blue',
    industriesHeadlineTail: ' businesses win deals.',
    industriesCopy: 'Four verticals where the speed-density problem bites hardest. From Northern Beaches trades to Eastern Suburbs agencies, the pattern is the same: more leads than your team can chase by hand.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'Reply first. Quote first. Win the job.',
        copy: 'Sydney sparkies, plumbers, builders, landscapers and concreters across the Northern Beaches, North Shore and Western Sydney. Enquiries from Hipages, Google and your site get acknowledged within five minutes, quotes pre-fill from your rate card, and invoices chase themselves in Xero.',
        bullets: [
          'Hipages and Google Local Service enquiries answered in minutes',
          'Quotes personalised and sent before a competitor replies',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'Onboarding, billing, reviews. All on rails.',
        copy: 'Advisory firms, accountants and law practices from Chatswood to Surry Hills and Parramatta. Welcome sequences, document requests, milestone check-ins and referral prompts run automatically through HubSpot, Clio or your existing CRM.',
        bullets: [
          'Contract-signed trigger kicks off onboarding',
          'Document collection nudged without manual chase',
          'Quarterly review cadences scheduled per client',
        ],
      },
      {
        label: 'Financial Services',
        headline: 'Compliance without the paper chase.',
        copy: 'Sydney mortgage brokers, financial advisers, accountants and insurance teams. Client intake, document collection, ASIC-aligned record keeping, review cadences and renewal prompts wired into Salesforce, HubSpot and the systems you already trust.',
        bullets: [
          'FSG, SoA and compliance document flow automated',
          'Audit trail captured across every client touchpoint',
          'Renewal and review diary kept current without a PA',
        ],
      },
      {
        label: 'Property & Real Estate',
        headline: 'Every enquiry, every suburb, replied.',
        copy: 'Agencies across the Eastern Suburbs, Inner West and Parramatta. Leads from REA and Domain captured, scored, replied to and booked for inspection without agents chasing between opens.',
        bullets: [
          'REA and Domain enquiries routed to the right agent',
          'Inspection bookings and reminders handled by the system',
          'Post-inspection follow-up sequences run themselves',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'Speed that',
    benefitsHeadlineGlow: 'compounds',
    benefitsHeadlineAccent: 'sage',
    benefitsHeadlineTail: ', week after week.',
    benefits: [
      { title: 'Sub-5-minute reply time', copy: 'Every enquiry acknowledged and triaged in under five minutes, day or night. Your Sydney competitors are still waiting on a junior to open the inbox.' },
      { title: 'Density-proof pipeline',  copy: 'More leads than a single operator can chase, triaged, scored and routed automatically. Hot enquiries get a human, cold ones get nurtured.' },
      { title: 'Works with your stack',   copy: 'Xero, MYOB, HubSpot, Salesforce, Clio, Gmail, Slack and n8n. We connect what you already use. No rip and replace, no platform lock-in.' },
      { title: 'Outcomes you can audit',  copy: '3x pipeline, 40% more reviews, 15 to 25 hours back per week. Numbers tracked per workflow from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'From first Sydney call to',
    processHeadlineGlow: 'live system',
    processHeadlineAccent: 'blue',
    processHeadlineTail: ' in 14 days.',
    processCopy: 'Remote-first from Melbourne, onsite in Sydney on request. Three stages, fixed price, no hourly billing. A working system at handover.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Sharper than',
    comparisonHeadlineGlow: 'every other option',
    comparisonAccent: 'blue',
    comparisonHeadlineTail: ' you have tried.',
    comparisonCopy: 'Most Sydney operators have tried three approaches before finding us. Here is how they compare against a system that replies in minutes, every time.',
    comparisonRows: [
      { label: 'Sub-5-minute reply to new enquiries',    uc: true, manual: false, generic: true,  agency: false },
      { label: 'Built around your exact processes',      uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',       uc: true, manual: true,  generic: false, agency: false },
      { label: 'Maintained and improved over time',      uc: true, manual: false, generic: false, agency: false },
      { label: 'Human approval for critical decisions',  uc: true, manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',            uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'Questions',
    faqHeadlineGlow: 'Sydney',
    faqAccent: 'blue',
    faqHeadlineTail: ' owners ask before starting.',
    faqCopy: 'Answers to the questions Sydney small business owners land on our inbox with, written plainly.',
    faqs: [
      {
        q: 'What is AI automation for Sydney small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Sydney small businesses. That means replacing repetitive, rule-based work with systems that run themselves. Lead reply, client onboarding, invoice chasing in Xero, review requests after every job. We design the workflows around the tools you already use like HubSpot, Salesforce, Clio, Gmail, Slack and n8n, so nothing is ripped out or replaced.',
      },
      {
        q: 'Do you work with Sydney trades, builders and construction businesses?',
        a: 'Yes. Sydney sparkies, plumbers, builders, landscapers and concreters are one of our core fits. We wire automation across your quoting, job booking, invoicing and review workflow in Xero, MYOB and HubSpot. Enquiries from Hipages, Google and your website get acknowledged within five minutes, quotes pre-fill from your rate card, and review requests send themselves after every completed job.',
      },
      {
        q: 'How does automation help Sydney consulting firms and professional services?',
        a: 'For Sydney accountants, lawyers, advisory firms and agencies from Chatswood to Surry Hills, automation removes the admin layer between signed contract and happy client. Welcome sequences, document requests, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Clio or your CRM. Partners stop pushing paperwork, clients get a consistent experience, the firm scales without new hires.',
      },
      {
        q: 'Do you work across Sydney CBD, North Shore, Eastern Suburbs and Western Sydney?',
        a: 'Yes. We work with Sydney businesses from the CBD to Chatswood, Surry Hills, Parramatta, Bondi and the Northern Beaches. All build and support work is delivered remotely from Melbourne, so your office location does not affect how we operate. Onsite workshops in Sydney are available on request for strategy days or team rollouts.',
      },
      {
        q: 'How does automation work for Sydney financial services firms?',
        a: 'For Sydney mortgage brokers, financial advisers, accountants and insurance teams, automation handles client intake, document collection, ASIC-aligned record keeping, review cadences and renewal prompts. We integrate with Salesforce, HubSpot, Xero and the systems you already trust, and keep a clean audit trail. Data stays in your accounts, not on a new platform you have to manage.',
      },
      {
        q: 'How does automation help Sydney real estate agencies?',
        a: 'For Sydney agencies across the Eastern Suburbs, Inner West and Parramatta, automation captures enquiries from REA and Domain, routes them to the right agent, books inspections, sends reminders and runs follow-up sequences for attendees. Agents spend time on the deal, not on data entry. Post-inspection review and referral asks send themselves on the right cadence.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, ClickUp, Clio and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does it take to go live for a Sydney business?',
        a: 'Most automations go live within 14 days of our first call. We have built these systems across Melbourne, Sydney and Brisbane before, so we know which integration quirks to expect. Your first workflow ships in week one, the next wave lands week two, and you see time back within the same fortnight. No long consulting runway.',
      },
      {
        q: 'Is my Sydney business data held securely and onshore?',
        a: 'We build on tools you already control. Your CRM, your email, your Xero account. Data stays in systems you own, not in a new UC platform. Where you require Australian data residency, we choose providers and regions that meet it. ASIC, ATO and Privacy Act implications are considered during design, not bolted on after.',
      },
    ],

    ctaHeadline: 'Ready to reply first in Sydney?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where your lead response time is leaking, rank the fastest fixes, and show you exactly what a 14-day Sydney build would cover.',
    ctaAccent: 'blue',

    internalLinks: [
      { label: 'Sales automation',               path: '/sales-automation' },
      { label: 'Customer experience automation', path: '/customer-experience-automation' },
      { label: 'SEO and AI visibility',          path: '/seo-ai-visibility' },
      { label: 'Inbound lead management',        path: '/inbound-lead-management-melbourne' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // BRISBANE — Angle: Scale + volume. SEQ turnover, high-volume trades,
  // mining corridor, freight. More work than hands, by design.
  // Accent: sage (growth, scale).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-brisbane',
    city: 'Brisbane',
    region: 'QLD',
    heroAccent: 'sage',

    metaTitle: 'AI Automation Brisbane',
    metaDescription: 'UnderCurrent Automations builds AI automation for Brisbane small businesses. Quoting, client onboarding and invoicing on Xero, HubSpot, n8n. Live in 14 days.',

    heroPill: 'Brisbane, QLD',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Brisbane.',
    heroCopy: 'Brisbane runs on volume. More quotes, more jobs, more invoices, more chase. UnderCurrent Automations builds the systems that keep up across SEQ, so your team stays on the tools instead of in the inbox.',
    heroStats: [
      { value: '20–100', label: 'quotes handled per week, per tradie' },
      { value: '14 days', label: 'from first call to live system' },
      { value: '3x', label: 'pipeline throughput without new hires' },
    ],

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'Built for how',
    industriesHeadlineGlow: 'Brisbane',
    industriesHeadlineAccent: 'sage',
    industriesHeadlineTail: ' and SEQ businesses scale.',
    industriesCopy: 'Four verticals where volume breaks manual admin. From Fortitude Valley consultants to Logan trades and the mining corridor north to Gladstone, the playbook is the same.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'High-volume quoting, handled.',
        copy: 'Brisbane sparkies, plumbers, builders, tilers and landscapers across SEQ. Enquiries from Hipages, Google and your site triaged, quotes pre-filled in Xero or MYOB, jobs scheduled, invoices chased. No dispatcher required to keep up.',
        bullets: [
          'Hipages and Google Local Service enquiries replied in minutes',
          '20 to 100 quotes a week handled without an office hire',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'Onboarding, check-ins, reviews. All on rails.',
        copy: 'Advisory, accounting and agency teams across Fortitude Valley, South Bank and New Farm. Welcome flows, onboarding, milestone check-ins and quarterly reviews run through HubSpot, Gmail and your existing CRM.',
        bullets: [
          'Contract-signed trigger kicks off onboarding',
          'Document collection nudged without manual chase',
          'Referral asks sent after positive feedback',
        ],
      },
      {
        label: 'Mining Services & Resources',
        headline: 'Field paperwork, office systems.',
        copy: 'Brisbane-based mining services, drilling and engineering firms feeding the Bowen Basin and Gladstone corridor. Timesheets, job packs, contractor compliance, HSE reporting and invoicing wired together so the office keeps up while crews are on site.',
        bullets: [
          'Timesheet capture offline, synced to Xero on reconnect',
          'HSE and compliance docs auto-routed to the right system',
          'Job pack generation pulled straight from the schedule',
        ],
      },
      {
        label: 'Logistics & Transport',
        headline: 'Jobs dispatched. Invoices chased. Automatically.',
        copy: 'Transport, 3PL and freight operators working Brisbane to the Port of Brisbane and down the SEQ corridor. Load bookings captured, POD collection automated, Peppol-compliant invoicing issued through Xero or MYOB without a bookkeeper chasing.',
        bullets: [
          'Load bookings and tracking links sent to customers',
          'POD captured on mobile, invoiced the same day',
          'Peppol e-invoicing compliant with ATO requirements',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'Volume that scales without',
    benefitsHeadlineGlow: 'new hires',
    benefitsHeadlineAccent: 'blue',
    benefitsHeadlineTail: '.',
    benefits: [
      { title: 'Quote velocity',        copy: 'From enquiry to personalised quote in under five minutes. The Brisbane office can handle 3x the volume without an extra admin seat.' },
      { title: 'Office runs itself',    copy: 'Invoicing, chasing, reviews and scheduling run in the background while your crews are on site. Peppol-ready, Xero and MYOB native.' },
      { title: 'Works with your stack', copy: 'Xero, MYOB, HubSpot, Cin7, Unleashed, Gmail, Slack, Hipages, n8n. Connected to what you already use, no rip and replace.' },
      { title: 'Outcomes you can audit', copy: '3x pipeline throughput, 40% more reviews, 15 to 25 hours back per week. Numbers tracked per workflow from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'From first Brisbane call to',
    processHeadlineGlow: 'live system',
    processHeadlineAccent: 'sage',
    processHeadlineTail: ' in 14 days.',
    processCopy: 'Remote-first from Melbourne, onsite in Brisbane on request. Three stages, fixed price, no hourly billing. A working system at handover.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Built to handle',
    comparisonHeadlineGlow: 'Queensland volume',
    comparisonAccent: 'sage',
    comparisonHeadlineTail: '.',
    comparisonCopy: 'Most Brisbane operators have tried three approaches before finding us. Here is how they compare against a system that scales with the job sheet.',
    comparisonRows: [
      { label: 'Handles 100+ quotes a week without admin hire', uc: true, manual: false, generic: true,  agency: false },
      { label: 'Built around your exact processes',             uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',              uc: true, manual: true,  generic: false, agency: false },
      { label: 'Peppol-compliant invoicing out of the box',     uc: true, manual: false, generic: true,  agency: false },
      { label: 'Runs while crews are offline on site',          uc: true, manual: false, generic: false, agency: false },
      { label: 'ROI measurable within weeks',                   uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'Questions',
    faqHeadlineGlow: 'Brisbane',
    faqAccent: 'sage',
    faqHeadlineTail: ' owners ask before starting.',
    faqCopy: 'Answers to the questions Brisbane small business owners send through first, written plainly.',
    faqs: [
      {
        q: 'What is AI automation for Brisbane small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Brisbane small businesses. That means systems that replace repetitive, rule-based admin: lead triage, quoting, client onboarding, invoice chasing in Xero or MYOB, review requests after every completed job. We connect HubSpot, Gmail, Slack, Cin7 and n8n to the tools your team already uses. You stay on your current stack, the manual parts disappear.',
      },
      {
        q: 'Do you work with Brisbane trades, plumbers, electricians and builders?',
        a: 'Yes. Brisbane trades are one of our biggest fits. We wire automation into your quoting, job booking, invoicing and review workflow across Xero, MYOB and HubSpot. Enquiries from Hipages, Google and your website get triaged instantly, quotes go out within five minutes, invoices chase themselves, and review requests fire after every job closes.',
      },
      {
        q: 'How does automation help Brisbane consulting firms and professional services?',
        a: 'For Brisbane accountants, advisers and agencies across Fortitude Valley and South Bank, automation handles the admin between a signed contract and a happy client. Welcome sequences, document collection, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Gmail and your CRM. Partners stop pushing paperwork, the firm scales without new admin hires.',
      },
      {
        q: 'Do you work with businesses across South East Queensland?',
        a: 'Yes. We work with businesses across the Brisbane CBD, Fortitude Valley, Logan, Ipswich, the Sunshine Coast and the Gold Coast. All build and support work is delivered remotely from Melbourne, so your SEQ location does not affect how we operate. Onsite workshops in Brisbane are available on request for strategy days or team rollouts.',
      },
      {
        q: 'How does this help Brisbane logistics and mining-services businesses?',
        a: 'For Brisbane logistics operators and mining-services firms working the Bowen Basin or the Port of Brisbane, automation handles site paperwork, contractor compliance, HSE reporting, load bookings and invoicing. Timesheets and POD collection feed straight into Xero or MYOB, Peppol-compliant invoices go out on schedule, and the office stops drowning while crews are on site.',
      },
      {
        q: 'Can you handle high-volume quoting for Brisbane tradies?',
        a: 'Yes. Brisbane tradies quoting 20 to 100 jobs a week are one of our best fits. We build the system that captures the enquiry, pre-fills the quote from your rate card, sends it within five minutes, follows up if it goes quiet, and flips to invoice and review request once the job is done. Xero, MYOB, Hipages and your scheduling tool stay in sync.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, ClickUp, Cin7, Unleashed, Hipages and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does it take to deploy in Brisbane?',
        a: 'Most automations go live within 14 days of our first call. We run the Brisbane build remotely from Melbourne, with onsite workshops available on request. Your first workflow ships in week one, the next wave lands week two, and your team sees hours back within the same fortnight. No long consulting runway.',
      },
      {
        q: 'What is the ROI for a Brisbane small business?',
        a: 'Most Brisbane clients see meaningful savings within the first two weeks. Typical results are 15 to 25 hours saved per week across the team, 3x pipeline throughput without new headcount, and around 40% more Google reviews from automated review requests. Full ROI usually lands within the first month, and compounds as additional workflows come online.',
      },
    ],

    ctaHeadline: 'Ready to scale Brisbane volume, not admin?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where quoting, invoicing and chasing is bottlenecking your week, rank the fastest fixes, and show you what a 14-day Brisbane build would cover.',
    ctaAccent: 'sage',

    internalLinks: [
      { label: 'Inbound lead management', path: '/inbound-lead-management-melbourne' },
      { label: 'Finance automation',      path: '/finance-automation' },
      { label: 'Content automation',      path: '/content-automation' },
      { label: 'Custom integrations',     path: '/custom-integrations' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // PERTH — Angle: Distance + isolation. AWST vs eastern-states gap,
  // offline field crews. Automation does not care about either.
  // Accent: blue (tech signal).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-perth',
    city: 'Perth',
    region: 'WA',
    heroAccent: 'blue',

    metaTitle: 'AI Automation Perth',
    metaDescription: 'UnderCurrent Automations builds AI automation for Perth small businesses. Lead reply, quoting and field ops on Xero, HubSpot and n8n. Live within 14 days.',

    heroPill: 'Perth, WA',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Perth.',
    heroCopy: 'Perth runs on WA time. Eastern offices are asleep when your leads wake up. Field crews are offline when admin is open. UnderCurrent Automations builds systems that do not care about either, so the office keeps moving while the sun catches up.',
    heroStats: [
      { value: '24/7', label: 'systems running across AWST + AEST' },
      { value: '14 days', label: 'from first call to live system' },
      { value: 'Offline-safe', label: 'capture for remote field teams' },
    ],

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'Built for how',
    industriesHeadlineGlow: 'Perth',
    industriesHeadlineAccent: 'blue',
    industriesHeadlineTail: ' businesses operate at distance.',
    industriesCopy: 'Four verticals where time zones and connectivity bite. From CBD advisers to resources crews in the Pilbara, the admin problem is the same: systems need to run when people cannot.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'Quote first. Even when the east is asleep.',
        copy: 'Perth sparkies, plumbers, builders, tilers and landscapers across the northern and southern suburbs. Enquiries triaged and quoted within minutes, jobs booked, invoices chased in Xero or MYOB, reviews asked automatically.',
        bullets: [
          'Enquiries replied to at any hour, AWST or AEST',
          'Quotes personalised from your rate card in minutes',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'East-coast-ready client experience.',
        copy: 'Advisory, accounting and legal teams in the Perth CBD, West Perth and Subiaco. Welcome sequences, onboarding, milestone check-ins and quarterly reviews run automatically through HubSpot, Gmail and your existing CRM, regardless of where the client sits.',
        bullets: [
          'Timezone-aware send windows for east-coast clients',
          'Document collection nudged without manual chase',
          'Handover rules for Perth + eastern co-counsel',
        ],
      },
      {
        label: 'Mining & Resources',
        headline: 'Field admin. Office systems. Same truth.',
        copy: 'Perth-based mining, drilling, engineering and resources-services firms feeding the Pilbara and Goldfields. Timesheets, job packs, contractor compliance, HSE reporting and invoicing wired together so the office keeps running while crews are out of range.',
        bullets: [
          'Timesheet and HSE capture offline, synced on reconnect',
          'Contractor compliance tracked without a spreadsheet',
          'Job packs pulled straight from the roster',
        ],
      },
      {
        label: 'Field Services & Remote Ops',
        headline: 'Crews offline. Systems still running.',
        copy: 'Field service, inspection and remote operations teams working across WA. Jobs dispatched, forms captured offline on mobile, data synced the moment connectivity returns, invoices raised in Xero without an office coordinator on standby.',
        bullets: [
          'Offline-first mobile capture for remote crews',
          'POD, inspection and form data queued and synced',
          'Invoicing raised automatically once the job closes',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'Systems that run when',
    benefitsHeadlineGlow: 'you cannot',
    benefitsHeadlineAccent: 'sage',
    benefitsHeadlineTail: '.',
    benefits: [
      { title: 'Timezone-proof',       copy: 'Workflows fire on customer time, not on office hours. A Sydney enquiry at 4pm AEST and a Perth lead at 7pm AWST get the same reply quality.' },
      { title: 'Offline-capable',       copy: 'Field data captured on mobile, queued locally, synced when signal returns. No re-entry, no paperwork at the end of a 12-hour shift.' },
      { title: 'Works with your stack', copy: 'Xero, MYOB, HubSpot, Gmail, Slack, Notion, n8n, plus the ops tools your crews already use. No rip and replace.' },
      { title: 'Outcomes you can audit', copy: '3x pipeline, 40% more reviews, 15 to 25 hours back per week. Numbers tracked per workflow from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'From first Perth call to',
    processHeadlineGlow: 'live system',
    processHeadlineAccent: 'blue',
    processHeadlineTail: ' in 14 days.',
    processCopy: 'Remote-first from Melbourne, onsite in Perth on request. Three stages, fixed price, no hourly billing. A working system at handover.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Engineered for',
    comparisonHeadlineGlow: 'WA distance',
    comparisonAccent: 'blue',
    comparisonHeadlineTail: '.',
    comparisonCopy: 'Most Perth operators have tried three approaches before finding us. Here is how they compare against a system designed for time-zone and connectivity reality.',
    comparisonRows: [
      { label: 'Runs 24/7 across AWST and AEST',        uc: true, manual: false, generic: true,  agency: false },
      { label: 'Works offline for field crews',          uc: true, manual: false, generic: false, agency: false },
      { label: 'Built around your exact processes',      uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',       uc: true, manual: true,  generic: false, agency: false },
      { label: 'Human approval for critical decisions',  uc: true, manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',            uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'Questions',
    faqHeadlineGlow: 'Perth',
    faqAccent: 'blue',
    faqHeadlineTail: ' owners ask before starting.',
    faqCopy: 'Answers to the questions Perth small business owners send through first, written plainly.',
    faqs: [
      {
        q: 'What is AI automation for Perth small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Perth small businesses. That means systems that replace repetitive, rule-based admin: lead triage, quoting, client onboarding, invoice chasing in Xero or MYOB, review requests after completed jobs. We connect HubSpot, Gmail, Slack and n8n to the tools your team already uses, so nothing is ripped out or replaced.',
      },
      {
        q: 'Do you work with Perth trades and construction businesses?',
        a: 'Yes. Perth trades are a core fit. We wire automation into your quoting, job booking, invoicing and review workflow across Xero, MYOB and HubSpot. Enquiries get replied to in minutes regardless of time zone, quotes pre-fill from your rate card, invoices chase themselves, and review requests fire after every job closes. Your site team stays on the tools.',
      },
      {
        q: 'How does automation help Perth consulting firms and professional services?',
        a: 'For Perth advisers, accountants and agencies around the CBD, West Perth and Subiaco, automation handles the admin between signed contract and happy client. Welcome sequences, document collection, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Gmail and your CRM, with send-time rules that respect east-coast client hours.',
      },
      {
        q: 'Do you work with Perth resources-sector and field-service businesses?',
        a: 'Yes. Perth resources-services, drilling, engineering and field-ops businesses are a strong fit. We wire together site paperwork, contractor compliance, HSE reporting, rostering and invoicing. Timesheets feed straight into Xero or MYOB, POD and inspection data syncs when crews return to coverage, and the office keeps running while teams are in the Pilbara, Goldfields or up the coast.',
      },
      {
        q: 'How do automations handle the Perth time-zone gap with the eastern states?',
        a: 'Automations do not care about the time zone. Workflows run 24/7 on your infrastructure, so a Sydney lead at 4pm AEST still triggers your Perth follow-up within minutes, and an enquiry at 7pm AWST still gets a reply while the east coast is asleep. We also build handover rules so work flowing between Perth and eastern offices routes correctly.',
      },
      {
        q: 'Can automations run when our field crews are offline?',
        a: 'Yes. For Perth field-services and resources teams, we design workflows that capture data offline on mobile devices, queue it locally, and sync the moment connectivity returns. Timesheets, job packs, inspection forms and PODs flow into Xero, MYOB and your ops system without manual re-entry. The office system stays up even when the crew is out of range.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, ClickUp and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does it take to deploy for a Perth business?',
        a: 'Most automations go live within 14 days of our first call. We run the Perth build remotely from Melbourne, with onsite workshops available on request. Your first workflow ships in week one, the next wave lands week two, and your team sees hours back within the same fortnight. No long consulting runway, no hourly billing.',
      },
      {
        q: 'What is the ROI for a Perth small business?',
        a: 'Most Perth clients see meaningful savings within the first two weeks. Typical results are 15 to 25 hours saved per week across the team, 3x more active pipeline without new headcount, and around 40% more Google reviews from automated review requests. Full ROI usually lands within the first month, and compounds as additional workflows come online.',
      },
    ],

    ctaHeadline: 'Ready to close the Perth distance gap?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where time-zone lag and offline crews are costing you admin hours, and show you what a 14-day Perth build would cover.',
    ctaAccent: 'blue',

    internalLinks: [
      { label: 'Custom integrations',         path: '/custom-integrations' },
      { label: 'Personal system automation',  path: '/personal-system-automation' },
      { label: 'AI strategy and training',    path: '/ai-strategy-training' },
      { label: 'Sales automation',            path: '/sales-automation' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ADELAIDE — Angle: Compliance + craft. Defence supply, food safety,
  // wine DTC, manufacturing QA. More paperwork per head than any state.
  // Accent: sage (craft signal).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-adelaide',
    city: 'Adelaide',
    region: 'SA',
    heroAccent: 'sage',

    metaTitle: 'AI Automation Adelaide',
    metaDescription: 'UnderCurrent Automations builds AI automation for Adelaide small businesses. Manufacturing, wine DTC, trades ops on Xero, HubSpot, n8n. Live in 14 days.',

    heroPill: 'Adelaide, SA',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Adelaide.',
    heroCopy: 'Adelaide businesses carry deep compliance paperwork. Defence supply, food safety, wine-club renewals, manufacturing QA. UnderCurrent Automations builds the systems that handle it so your team spends the day on the product, not the spreadsheet.',
    heroStats: [
      { value: '15–25 hrs', label: 'reclaimed from compliance admin' },
      { value: '14 days', label: 'from first call to live system' },
      { value: '100%', label: 'audit trail across every workflow' },
    ],

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'Built for how',
    industriesHeadlineGlow: 'Adelaide',
    industriesHeadlineAccent: 'sage',
    industriesHeadlineTail: ' businesses carry complexity.',
    industriesCopy: 'Four verticals where compliance, craft or both break manual admin. From Edinburgh Parks manufacturers to the Barossa wine corridor, the playbook is the same: handle the paperwork so the craft can scale.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'Quote to invoice. Without the chase.',
        copy: 'Adelaide sparkies, plumbers, builders, tilers and landscapers across the northern and southern suburbs. Enquiries triaged, quotes pre-filled in Xero or MYOB, jobs booked, invoices chased, reviews asked automatically.',
        bullets: [
          'Hipages and Google enquiries replied in minutes',
          'Quotes personalised from your rate card in minutes',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'Onboarding, reviews, referrals. All on rails.',
        copy: 'Advisory, accounting and agency teams across the Adelaide CBD, North Adelaide and Norwood. Welcome sequences, onboarding, milestone check-ins and quarterly reviews run through HubSpot, Gmail and your existing CRM.',
        bullets: [
          'Contract-signed trigger kicks off onboarding',
          'Milestone reviews scheduled per client',
          'Referral asks sent after positive feedback',
        ],
      },
      {
        label: 'Manufacturing & Defence Supply',
        headline: 'Sensitive ops, quiet paperwork.',
        copy: 'Adelaide manufacturers and defence-supply firms at Edinburgh Parks, Osborne and Elizabeth. Purchase orders, ITAR-sensitive document handling, supplier compliance, quality records and Cin7 or Unleashed inventory updates handled without a full admin team.',
        bullets: [
          'ITAR and export-control documents routed correctly',
          'Supplier compliance tracked against current standards',
          'Cin7 and Unleashed stock kept in sync with orders',
        ],
      },
      {
        label: 'Wine & Agribusiness',
        headline: 'Cellar door to cart. Without the spreadsheets.',
        copy: 'Barossa, McLaren Vale and Adelaide Hills producers. Cellar-door bookings, club renewals, allocation notifications, DTC order fulfilment in Shopify and distributor reporting all run through automations your team never has to chase.',
        bullets: [
          'Cellar-door bookings synced into the CRM',
          'Club renewals and allocations handled on cadence',
          'DTC Shopify fulfilment routed to the 3PL cleanly',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'Compliance that stays',
    benefitsHeadlineGlow: 'quiet',
    benefitsHeadlineAccent: 'blue',
    benefitsHeadlineTail: ', always.',
    benefits: [
      { title: 'Audit-ready by default', copy: 'Every workflow writes its own audit trail. ATO, ASIC, Fair Work, food safety and defence-sector requirements considered during design.' },
      { title: 'Craft stays craft',       copy: 'Cellar-door, kitchen, factory floor or site. The system handles the paperwork so your team stays on the work that makes the product.' },
      { title: 'Works with your stack',   copy: 'Xero, MYOB, HubSpot, Shopify, Cin7, Unleashed, Gmail, Slack, n8n. Connected to what you already use, no rip and replace.' },
      { title: 'Outcomes you can audit',  copy: '15 to 25 hours back per week, 3x pipeline, 40% more reviews. Numbers tracked per workflow from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'From first Adelaide call to',
    processHeadlineGlow: 'live system',
    processHeadlineAccent: 'sage',
    processHeadlineTail: ' in 14 days.',
    processCopy: 'Remote-first from Melbourne, onsite in Adelaide on request. Three stages, fixed price, no hourly billing. A working system at handover.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Designed for',
    comparisonHeadlineGlow: 'South Australian detail',
    comparisonAccent: 'sage',
    comparisonHeadlineTail: '.',
    comparisonCopy: 'Most Adelaide operators have tried three approaches before finding us. Here is how they compare against a system that respects compliance and craft.',
    comparisonRows: [
      { label: 'Audit trail on every workflow',          uc: true, manual: false, generic: false, agency: false },
      { label: 'Built around your exact processes',      uc: true, manual: false, generic: false, agency: false },
      { label: 'Works with tools you already use',       uc: true, manual: true,  generic: false, agency: false },
      { label: 'Handles ITAR and defence-supply rules',  uc: true, manual: true,  generic: false, agency: false },
      { label: 'Runs DTC and cellar-door cleanly',       uc: true, manual: false, generic: true,  agency: false },
      { label: 'ROI measurable within weeks',            uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'Questions',
    faqHeadlineGlow: 'Adelaide',
    faqAccent: 'sage',
    faqHeadlineTail: ' owners ask before starting.',
    faqCopy: 'Answers to the questions Adelaide small business owners send through first, written plainly.',
    faqs: [
      {
        q: 'What is AI automation for Adelaide small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Adelaide small businesses. That means systems that replace repetitive, rule-based admin: lead triage, quoting, client onboarding, invoice chasing in Xero or MYOB, compliance paperwork, review requests after completed work. We connect HubSpot, Gmail, Slack, Cin7, Unleashed and n8n to the tools your team already uses.',
      },
      {
        q: 'Do you work with Adelaide trades and construction businesses?',
        a: 'Yes. Adelaide trades are a core fit. We wire automation into your quoting, job booking, invoicing and review workflow across Xero, MYOB and HubSpot. Enquiries get triaged, quotes go out within five minutes, invoices chase themselves, and review requests fire after every job closes. Your site team stays on the tools, the office backlog disappears.',
      },
      {
        q: 'How does automation help Adelaide consulting firms and professional services?',
        a: 'For Adelaide advisers, accountants and agencies in the CBD, North Adelaide and Norwood, automation handles the admin between signed contract and happy client. Welcome sequences, document collection, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Gmail and your CRM. Partners stop pushing paperwork, the firm scales without new hires.',
      },
      {
        q: 'Do you work with Adelaide manufacturing, defence-supply and agribusiness firms?',
        a: 'Yes. Adelaide manufacturers at Edinburgh Parks, defence-supply firms at Osborne and producers across the Barossa, McLaren Vale and Adelaide Hills all fit our playbook. We wire together purchase orders, supplier compliance, Cin7 or Unleashed inventory, DTC order fulfilment and distributor reporting. The compliance and admin surface area shrinks without adding headcount.',
      },
      {
        q: 'How does automation help Adelaide wine and food producers?',
        a: 'For Adelaide wine and food producers, automation handles cellar-door bookings, wine-club renewals, allocation notifications, DTC order fulfilment in Shopify and distributor reporting. Stock stays accurate in Cin7 or Unleashed, customer data syncs into HubSpot without double entry, and the cellar-door team stops losing hours to post-weekend paperwork.',
      },
      {
        q: 'Is this compliant with Australian food and defence data requirements?',
        a: 'We design for the compliance you operate under. Food-safety record keeping, defence-sector data handling, ATO obligations, ASIC filings, Fair Work record retention. Data stays in systems you already control, not in a new UC platform. Where ITAR or defence-supply controls apply, we choose tooling, regions and access patterns that meet your documented requirements.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, Cin7, Unleashed and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does it take to deploy in Adelaide?',
        a: 'Most automations go live within 14 days of our first call. We run the Adelaide build remotely from Melbourne, with onsite workshops available on request. Your first workflow ships in week one, the next wave lands week two, and your team sees hours back within the same fortnight. No long consulting runway.',
      },
      {
        q: 'What is the ROI for an Adelaide small business?',
        a: 'Most Adelaide clients see meaningful savings within the first two weeks. Typical results are 15 to 25 hours saved per week across the team, 3x more active pipeline without new headcount, and around 40% more Google reviews from automated review requests. Full ROI usually lands within the first month, and compounds as additional workflows come online.',
      },
    ],

    ctaHeadline: 'Ready to quiet the Adelaide paperwork?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where compliance, quoting and DTC admin is costing you hours, and show you what a 14-day Adelaide build would cover.',
    ctaAccent: 'sage',

    internalLinks: [
      { label: 'Finance automation',    path: '/finance-automation' },
      { label: 'Custom integrations',   path: '/custom-integrations' },
      { label: 'Sales automation',      path: '/sales-automation' },
      { label: 'Content automation',    path: '/content-automation' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // AUSTRALIA (national) — Angle: Coverage + sovereignty. Multi-state
  // orchestration, data residency, national rollout playbook.
  // Accent: blue (primary, default).
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-automation-australia',
    city: 'Australia',
    region: 'AU',
    heroAccent: 'blue',

    metaTitle: 'AI Automation Australia',
    metaDescription: 'UnderCurrent Automations builds AI automation for Australian small businesses. Lead reply, onboarding, billing on Xero, HubSpot, n8n. Live in 14 days.',

    heroPill: 'Australia-wide',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Australia.',
    heroCopy: 'Australian small businesses lose a working day a week, every week. Every state, every industry, every size. UnderCurrent Automations builds the systems that run the same way in Perth and Parramatta, with the data residency the compliance team will accept.',
    heroStats: [
      { value: '8 regions', label: 'served across every state and territory' },
      { value: '14 days', label: 'from first call to live system' },
      { value: 'AU-resident', label: 'data on every workflow by default' },
    ],

    industriesLabel: 'Who we help',
    industriesHeadlineLead: 'Built for how',
    industriesHeadlineGlow: 'Australian',
    industriesHeadlineAccent: 'blue',
    industriesHeadlineTail: ' small businesses scale nationally.',
    industriesCopy: 'Four verticals where national coverage or cross-state handover matters. From Melbourne consultancies to Queensland trades, Perth field teams and national e-commerce brands, the workflow problem is the same.',
    industries: [
      {
        label: 'Trades & Construction',
        headline: 'Every state. Same system.',
        copy: 'Trades businesses Australia-wide. Sparkies, plumbers, builders, tilers and landscapers running multi-branch, multi-state operations. Enquiries triaged, quotes pre-filled in Xero or MYOB, jobs booked, invoices chased, reviews asked automatically.',
        bullets: [
          'Branch-aware routing across capital cities',
          'Quotes personalised from your rate card in minutes',
          'Review requests fire after every completed job',
        ],
      },
      {
        label: 'Consulting & Professional Services',
        headline: 'National firm, consistent client experience.',
        copy: 'Advisory, accounting, legal and agency teams with offices in multiple capitals. Welcome sequences, onboarding, milestone check-ins and quarterly reviews run through HubSpot, Gmail and your existing CRM with handover rules between offices.',
        bullets: [
          'Office-aware routing for conflict checks and handovers',
          'Timezone-safe send windows per client location',
          'Audit trail compliant with Privacy Act and Fair Work',
        ],
      },
      {
        label: 'E-commerce & Retail',
        headline: 'Orders handled. Reviews asked. Repeat.',
        copy: 'Australian Shopify and WooCommerce brands shipping nationally. Order-status emails, shipping notifications, review requests, loyalty tiers and re-engagement flows run in the background. Cin7 and Unleashed stock stays in sync, support tickets get routed and drafted before a human sees them.',
        bullets: [
          'Shopify and WooCommerce orders orchestrated end to end',
          'Cin7 and Unleashed stock synced across fulfilment',
          'Support tickets triaged and drafted for human review',
        ],
      },
      {
        label: 'Health & Allied Services',
        headline: 'Fewer no-shows. More returning patients.',
        copy: 'Clinics, physios, psychologists, chiros and allied health providers Australia-wide. Appointment reminders, intake-form capture, rebooking prompts and review requests run automatically around HICAPS and practice software.',
        bullets: [
          'SMS + email reminders tuned to your no-show rate',
          'Digital intake synced to Cliniko, Halaxy or Nookal',
          'Rebooking prompts at the right clinical interval',
        ],
      },
    ],

    benefitsLabel: 'What you get',
    benefitsHeadlineLead: 'National coverage.',
    benefitsHeadlineGlow: 'Australian data',
    benefitsHeadlineAccent: 'sage',
    benefitsHeadlineTail: '.',
    benefits: [
      { title: 'State-aware routing',  copy: 'Workflows respect state-level rules, time zones and office ownership. A Perth lead is not handed to a Sydney duty officer at 3am AEST.' },
      { title: 'Sovereignty by design', copy: 'Data stays in systems you already control. Where residency matters, we choose providers and regions that meet the compliance brief.' },
      { title: 'Works with your stack', copy: 'Xero, MYOB, HubSpot, Salesforce, Shopify, WooCommerce, Cin7, Unleashed, Cliniko, Slack, n8n. Connected to what you already use.' },
      { title: 'Outcomes you can audit', copy: '15 to 25 hours back per office per week, 3x pipeline, 40% more reviews. Tracked per workflow, per state, from week one.' },
    ],

    processLabel: 'How we work',
    processHeadlineLead: 'From first call to',
    processHeadlineGlow: 'national rollout',
    processHeadlineAccent: 'blue',
    processHeadlineTail: ' in 30 days.',
    processCopy: 'Ship the first workflow in week one, add state-level variations and office routing in week two, full nationwide coverage inside 30 days. Fixed price, no hourly billing.',

    comparisonLabel: 'Why UnderCurrent',
    comparisonHeadlineLead: 'Built for',
    comparisonHeadlineGlow: 'Australian sovereignty',
    comparisonAccent: 'blue',
    comparisonHeadlineTail: '.',
    comparisonCopy: 'Most multi-state operators have tried three approaches before finding us. Here is how they compare against a system designed for national scale and local rules.',
    comparisonRows: [
      { label: 'State-aware routing and timezone rules', uc: true, manual: false, generic: false, agency: false },
      { label: 'Australian data residency honoured',     uc: true, manual: true,  generic: false, agency: false },
      { label: 'Runs across every capital city',         uc: true, manual: false, generic: true,  agency: false },
      { label: 'Works with tools you already use',       uc: true, manual: true,  generic: false, agency: false },
      { label: 'Human approval for critical decisions',  uc: true, manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',            uc: true, manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing it manually', 'Off-the-shelf tools', 'Other agencies'],

    faqLabel: 'Common questions',
    faqHeadlineLead: 'Questions',
    faqHeadlineGlow: 'Australian',
    faqAccent: 'blue',
    faqHeadlineTail: ' owners ask before starting.',
    faqCopy: 'Answers to the questions multi-state Australian owners send through first, written plainly.',
    faqs: [
      {
        q: 'What is AI automation for Australian small businesses?',
        a: 'UnderCurrent Automations builds AI automation for Australian small businesses. That means systems that replace repetitive, rule-based admin: lead triage, quoting, client onboarding, invoice chasing in Xero or MYOB, review requests after completed work. We connect HubSpot, Gmail, Slack and n8n to the tools your team already uses, with handover rules that respect state lines and office hours.',
      },
      {
        q: 'Do you work with trades and construction businesses Australia-wide?',
        a: 'Yes. Trades are one of our biggest fits Australia-wide. Sparkies, plumbers, builders, tilers and landscapers in every state. We wire automation into your quoting, job booking, invoicing and review workflow across Xero, MYOB and HubSpot. Your crew stays on the tools, the office chases nothing, and the admin backlog stops growing on the weekend.',
      },
      {
        q: 'How does automation help Australian consulting firms and professional services?',
        a: 'For Australian accountants, advisers, agencies and consultancies with multi-state offices, automation handles the admin between signed contract and happy client. Welcome sequences, document collection, milestone check-ins, quarterly reviews and referral prompts run through HubSpot, Gmail and your CRM, with conflict-check and handover rules that route across offices correctly.',
      },
      {
        q: 'Can UnderCurrent work with a business anywhere in Australia?',
        a: 'Yes. UnderCurrent is Melbourne-based and serves businesses across every state and territory. Our build and support work is delivered remotely, so location does not change how we operate. Onsite workshops in Sydney, Brisbane, Perth, Adelaide, Hobart, Darwin or Canberra are available on request for strategy days or team rollouts. Most clients never need us in the room.',
      },
      {
        q: 'How do you handle businesses across multiple states and time zones?',
        a: 'Automations run 24/7 on your infrastructure, so time zones stop being a constraint. A Sydney lead at 4pm AEST triggers the same sequence as a Perth enquiry at 7pm AWST. For teams split across states, we design handover rules so leads, tickets and jobs route to the right office automatically. Weekends and public holidays get their own rules.',
      },
      {
        q: 'Do you meet Australian data sovereignty requirements?',
        a: 'Where it matters, yes. We build on tools you already control, so data stays in systems you own, not in a new UC platform. For clients with defence, health or government exposure, we choose providers and regions that meet documented sovereignty requirements. ATO, ASIC, Privacy Act and Fair Work obligations are considered during design, not bolted on later.',
      },
      {
        q: 'What tools do you integrate with?',
        a: 'We integrate with the tools you already use. Xero, MYOB, HubSpot, Salesforce, Shopify, WooCommerce, Gmail, Outlook, Slack, Notion, Asana, ClickUp, Cin7, Unleashed, Cliniko and n8n for custom workflows. If your stack has an API or a webhook, we can plug into it. We do not impose a new platform, and we do not ask you to migrate data you already trust.',
      },
      {
        q: 'How long does a nationwide rollout take?',
        a: 'Most workflows go live within 14 days of our first call, even for multi-state rollouts. We ship the first workflow in week one, then layer in state-specific variations, time-zone rules and office-level routing over the following fortnight. Full nationwide coverage typically lands inside 30 days, with time savings visible from week one.',
      },
      {
        q: 'What is the ROI for a multi-location Australian business?',
        a: 'Multi-location Australian clients see compounding returns. Typical results across a rollout are 15 to 25 hours saved per week per office, 3x more active pipeline without new headcount, and around 40% more Google reviews from automated review requests. Full ROI usually lands within the first month per location, and compounds as more workflows come online nationally.',
      },
    ],

    ctaHeadline: 'Ready to run Australia the same way, everywhere?',
    ctaCopy: 'Book a free 30-minute workflow review. We map where state-to-state handover is costing you time, and show you what a 14-day national rollout would cover.',
    ctaAccent: 'blue',

    internalLinks: [
      { label: 'Sales automation',               path: '/sales-automation' },
      { label: 'Customer experience automation', path: '/customer-experience-automation' },
      { label: 'Website design',                 path: '/website-design' },
      { label: 'SEO and AI visibility',          path: '/seo-ai-visibility' },
      { label: 'Custom integrations',            path: '/custom-integrations' },
    ],
  },
]

export function getLocation(slug) {
  return LOCATIONS.find(l => l.slug === slug) || null
}
