// Service page data — one entry per service
// Each entry renders a full SEO-optimised ServicePage
// Structured for easy expansion to new services

export const SERVICES = [
  {
    slug: 'customer-experience-automation',
    id: 'customer-experience',
    seedQueries: [
      'automated client onboarding',
      'google review request automation',
      'automated customer follow up',
      'client retention automation small business',
      'post service follow up automation',
      'automated referral program',
    ],
    index: '01',
    label: 'CUSTOMER EXPERIENCE',

    // Visual variant — controls hero headline font order
    // 'default'   : DM Sans bold line 1, Cormorant italic line 2
    // 'editorial' : Cormorant italic line 1, DM Sans bold line 2
    // 'mono'      : DM Mono line 1, Cormorant italic line 2
    heroVariant: 'editorial',

    accentColor: '#8FAF9F',

    // SEO
    metaTitle: 'Customer Experience Automation Melbourne',
    metaDescription: 'UnderCurrent Automations builds automated onboarding, check-in, review, and referral systems for Melbourne small businesses.',

    // Hero
    heroPill: 'Customer Experience',
    heroHeadline1: 'Every client feels',
    heroHeadline2: 'looked after.',
    heroCopy: 'Most clients have a great first week and then fall silent. Not because the work suffers, but because follow-up never happens. We build the system that keeps every client engaged, every time, without you lifting a finger.',

    // Large demo animation type
    demoAnimType: 'customer-journey',
    demoLabel: 'CLIENT LIFECYCLE AUTOMATION',
    demoHeadline: 'From contract signed to referral received.',
    demoCopy: 'A sequence of touchpoints that runs automatically, at the right moment, for every single client.',

    // What we deliver
    deliversLabel: 'WHAT WE BUILD',
    deliversHeadline: 'The full client lifecycle, on autopilot.',
    whatWeDeliver: [
      'Welcome email sequence triggered on contract sign',
      'Automated intake form delivery and CRM capture',
      'Milestone-based check-in messages at weeks 1, 4 and 8',
      'Satisfaction surveys at key moments in the engagement',
      'Conditional branching: negative feedback routes to you, positive to review request',
      'Automated review request sequences (Google, Facebook, industry platforms)',
      'Referral program trigger after positive review received',
      'Re-engagement flow for clients who go quiet',
    ],

    // Who we help
    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for service businesses with repeat clients.',
    industriesCopy: 'If your business depends on clients coming back and referring others, this system is for you.',
    industries: [
      {
        label: 'Professional Services',
        headline: 'Every client looked after, every engagement.',
        copy: 'Accountants, lawyers, consultants, agencies. From the day a contract is signed, onboarding, check-ins and review requests all run without anyone on your team managing it.',
        animType: 'pipeline',
      },
      {
        label: 'Health and Wellness',
        headline: 'Fewer no-shows. More returning patients.',
        copy: 'Clinics, physios, spas and allied health providers. Automated appointment follow-up, satisfaction checks and rebooking prompts mean more revenue from existing clients.',
        animType: 'leadgen',
      },
      {
        label: 'Trades and Home Services',
        headline: 'Reviews and referrals without asking twice.',
        copy: 'Builders, electricians, plumbers, cleaners. After every completed job, the system sends a review request and a referral prompt. Most clients are happy to help, they just need to be asked.',
        animType: 'terminal',
      },
    ],

    // Process
    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    // Comparison
    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to manual follow-up.',
    comparisonCopy: 'Most businesses have tried at least one of these before finding a system that actually works.',
    comparisonRows: [
      { label: 'Follows up every client, every time',          uc: true,  manual: false, generic: false, agency: false },
      { label: 'Personalised to each client situation',        uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Routes unhappy clients away from reviews',     uc: true,  manual: false, generic: false, agency: false },
      { label: 'Runs 24/7 without your input',                 uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Integrates with your existing CRM and tools',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'ROI measurable within weeks',                  uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    // FAQ
    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'What tools does this connect to?',
        a: 'We work with whatever you already use. HubSpot, Pipedrive, ActiveCampaign, Mailchimp, Monday.com, Notion, Gmail, Outlook. We build around your existing stack, not on top of a new one.',
      },
      {
        q: 'Can unhappy clients be handled differently?',
        a: 'Yes, and this is one of the most important parts of the build. When a client indicates dissatisfaction in a check-in or survey, the automation routes them directly to you for personal follow-up rather than triggering a review request. Negative feedback stays private.',
      },
      {
        q: 'How personalised are the messages?',
        a: 'We use data already in your CRM to branch and personalise messages. Service type, engagement date, usage, location. Each client receives messaging that is relevant to their situation, not a generic broadcast.',
      },
      {
        q: 'How long does it take to go live?',
        a: 'Most client experience automation systems go live within 7 to 14 days of our first session. We have built these flows many times so we move quickly and know where to start.',
      },
      {
        q: 'What if I want to approve messages before they send?',
        a: 'We can configure the system with a review queue so you approve messages before they go out, or with full automation if you prefer. Most clients start with review mode and switch to full automation after a month of seeing it work.',
      },
      {
        q: 'Do I need to change how my team works?',
        a: 'No. We build on top of what your team already does. The automation handles the follow-up that was either falling through the cracks or taking manual effort. Your team continues working the same way.',
      },
    ],

    // CTA
    ctaHeadline: 'Stop losing clients you should keep.',
    ctaCopy: 'Book a free 30-minute call. We will map your current client journey and show you exactly what a well-built system would look like for your business.',

    // Internal links
    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Finance Automation', path: '/finance-automation' },
    ],

    bluf: 'Customer experience automation is the system that runs every client touchpoint after the contract is signed. Welcome, onboarding, milestone check-ins, surveys, review requests and referral prompts all fire automatically at the right moment. UnderCurrent Automations builds it on your existing CRM and email stack so every client feels looked after.',

    pipelineStages: [
      { n: '01', label: 'Signed',     sub: 'Contract captured, client record created' },
      { n: '02', label: 'Welcomed',   sub: 'Intake form, onboarding email sequence' },
      { n: '03', label: 'Checked in', sub: 'Milestone touchpoints at weeks 1, 4, 8' },
      { n: '04', label: 'Surveyed',   sub: 'Satisfaction capture at key moments' },
      { n: '05', label: 'Reviewed',   sub: 'Positive → review request. Negative → you' },
      { n: '06', label: 'Referred',   sub: 'Advocate flow fires after a 5-star review' },
    ],

    integrations: [
      'HubSpot', 'ActiveCampaign', 'Mailchimp', 'Klaviyo', 'Intercom',
      'Zendesk', 'Gmail', 'Outlook', 'Google Workspace', 'Microsoft 365',
      'Typeform', 'Tally', 'Google Business Profile', 'Birdeye', 'Podium',
      'Monday.com', 'Notion', 'Airtable', 'n8n', 'Zapier',
    ],

    pricingTiers: [
      { name: 'Foundation',     priceFrom: 'from AUD $4,000', tag: 'Single flow',      desc: 'Welcome sequence, check-ins and a review request loop. Fits a business with one primary service line.' },
      { name: 'Full lifecycle', priceFrom: 'from AUD $7,500', tag: 'End-to-end',       desc: 'Onboarding, milestone messaging, surveys with branching, review requests and referral prompts, all personalised from CRM data.' },
      { name: 'Custom',         priceFrom: 'by quote',        tag: 'Multi-service',    desc: 'Multi-brand or multi-service lifecycle, Intercom or Zendesk integration, CSAT and NPS reporting, retention dashboards.' },
    ],
  },

  {
    slug: 'sales-automation',
    id: 'sales',
    seedQueries: [
      'automated lead follow up',
      'crm automation small business',
      'sales pipeline automation',
      'lead response time automation',
      'automated outreach sequences',
      'sales follow up software australia',
    ],
    index: '02',
    label: 'SALES',

    heroVariant: 'default',
    accentColor: '#6B7C4A',

    metaTitle: 'Sales Automation Melbourne',
    metaDescription: 'UnderCurrent Automations builds automated lead capture, outreach, and CRM pipelines that keep your sales moving around the clock.',

    heroPill: 'Sales Automation',
    heroHeadline1: 'More pipeline.',
    heroHeadline2: 'Same headcount.',
    heroCopy: 'Every hour your team spends on manual outreach, CRM updates and follow-up chasing is an hour not spent closing. We automate the entire pipeline so your team only shows up when a prospect is ready to talk.',

    demoAnimType: 'sales-pipeline',
    demoLabel: 'SALES PIPELINE AUTOMATION',
    demoHeadline: 'Leads in. Qualified prospects out.',
    demoCopy: 'Lead capture to booked meeting, running in the background while your team focuses on what only people can do.',

    deliversLabel: 'WHAT WE BUILD',
    deliversHeadline: 'Every stage of your pipeline, handled.',
    whatWeDeliver: [
      'Lead capture from all sources into a single CRM view',
      'Automatic lead scoring and qualification routing',
      'Personalised outreach sequences at scale (email and LinkedIn)',
      'Multi-step follow-up sequences with conditional logic',
      'CRM stage progression automation (no manual dragging cards)',
      'Meeting booking with pre-meeting research briefs',
      'Reactivation sequences for leads that went cold',
      'Pipeline reporting delivered to your inbox weekly',
    ],

    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for businesses that sell.',
    industriesCopy: 'If your business has a pipeline, a CRM, and a follow-up problem, this is what we build.',
    industries: [
      {
        label: 'B2B Professional Services',
        headline: 'More conversations. Less prospecting admin.',
        copy: 'Consultants, agencies, coaches and advisors. We automate lead sourcing, outreach and follow-up so your time goes to conversations with qualified prospects, not filling a spreadsheet.',
        animType: 'terminal',
      },
      {
        label: 'Trades and Construction',
        headline: 'Quote every enquiry. Win more jobs.',
        copy: 'Enquiries hit at 7pm and fall through the cracks by morning. We capture every inbound lead, send an immediate acknowledgement, and trigger a personalised quote sequence before your competitors respond.',
        animType: 'pipeline',
      },
      {
        label: 'Recruitment and Staffing',
        headline: 'Fill roles faster. Automate the candidate flow.',
        copy: 'From job ad to placed candidate, the admin is constant. We automate application screening, candidate sequencing, client updates and follow-up so your team works the pipeline, not the inbox.',
        animType: 'leadgen',
      },
    ],

    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to hoping leads follow up.',
    comparisonCopy: 'If you have tried to fix this before, here is why those approaches did not stick.',
    comparisonRows: [
      { label: 'Responds to every lead within minutes',         uc: true,  manual: false, generic: false, agency: false },
      { label: 'Personalised outreach, not mass blasts',        uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Updates your CRM without manual input',         uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Follows up leads that go quiet',                uc: true,  manual: false, generic: false, agency: false },
      { label: 'Integrates with tools you already use',         uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Measurable pipeline impact within weeks',       uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'Is this just mass cold email?',
        a: 'No. Mass, non-personalised outreach is spam and damages your domain reputation. We build personalised sequences using real data about each prospect: their company, role, recent activity, and fit with your ICP. Every message reads like it was written for that person.',
      },
      {
        q: 'What CRM systems do you work with?',
        a: 'HubSpot, Pipedrive, Salesforce, Monday.com, Notion, Close.io, and others. If your CRM has an API, we can build on top of it. If you do not have a CRM yet, we will help you choose one that fits.',
      },
      {
        q: 'How do you avoid landing in spam?',
        a: 'We configure proper email infrastructure: SPF, DKIM, DMARC, mailbox warm-up, send volume management, and domain health monitoring. Getting into inboxes is foundational to everything we build on the outreach side.',
      },
      {
        q: 'Do you write the outreach copy?',
        a: 'Yes. Copywriting for outreach sequences is included in the build. We work with you to nail your ICP, value proposition, and tone, then write sequences that sound like you, not a template.',
      },
      {
        q: 'What if a lead is not ready to buy yet?',
        a: 'We build nurture sequences for leads at different stages of readiness. Prospects who are not ready today get moved to a long-term sequence that keeps UnderCurrent visible until the timing is right.',
      },
      {
        q: 'How long before I see pipeline results?',
        a: 'Most clients see meaningful changes to pipeline activity within the first two to three weeks of going live. The exact timeline depends on your sales cycle length and lead volume.',
      },
      {
        q: 'Who builds sales pipeline and CRM automation in Melbourne?',
        a: 'UnderCurrent Automations builds sales pipeline and CRM automation for Melbourne businesses and across Australia. We capture and enrich every lead, score it against your ICP, route it to the right rep, and sequence personalised follow-up until a meeting is booked, all wired into HubSpot, Pipedrive or Salesforce. Most pipelines go live in two to three weeks. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'Your pipeline should not depend on who remembered to follow up.',
    ctaCopy: 'Book a free 30-minute call. We will walk through your current pipeline, find where leads are slipping through, and show you what an automated version looks like.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
      { label: 'Content Automation', path: '/content-automation' },
      { label: 'Website Design', path: '/website-design' },
    ],

    bluf: 'Sales automation is the infrastructure layer that captures every lead, qualifies it, routes it to the right rep, sequences follow-up and books meetings without anyone remembering to act. UnderCurrent Automations builds it end-to-end on the CRM you already use, so pipeline keeps moving while your team focuses on closing.',

    pipelineStages: [
      { n: '01', label: 'Lead lands', sub: 'Web, Meta, Google, LinkedIn, referral' },
      { n: '02', label: 'Captured',   sub: 'Enriched, de-duped, CRM-written' },
      { n: '03', label: 'Scored',     sub: 'ICP + intent = fit score' },
      { n: '04', label: 'Routed',     sub: 'Hot → rep. Cold → nurture' },
      { n: '05', label: 'Sequenced',  sub: 'Personalised, multi-step, auto-pause' },
      { n: '06', label: 'Booked',     sub: 'Calendar held with pre-meeting brief' },
    ],

    integrations: [
      'HubSpot', 'Pipedrive', 'Salesforce', 'Close', 'ActiveCampaign',
      'Mailchimp', 'Monday.com', 'Notion', 'Gmail', 'Outlook',
      'Microsoft 365', 'Google Workspace', 'Calendly', 'Cal.com',
      'LinkedIn Sales Navigator', 'Apollo', 'Clearbit', 'n8n', 'Zapier', 'Make',
    ],

    pricingTiers: [
      { name: 'Foundation',   priceFrom: 'from AUD $5,000', tag: 'Single pipeline', desc: 'Capture, CRM progression, automated follow-up, reactivation. Fits a business with one primary channel.' },
      { name: 'Multi-source', priceFrom: 'from AUD $9,000', tag: 'Cross-channel',    desc: 'Multi-channel capture, lead scoring, personalised outreach, meeting booking with pre-meeting briefs.' },
      { name: 'Full system',  priceFrom: 'by quote',        tag: 'End-to-end',       desc: 'Outbound sequencing at scale, Clearbit or Apollo enrichment, Salesforce or HubSpot customisation, analytics.' },
    ],
  },

  {
    slug: 'content-automation',
    id: 'content-design',
    seedQueries: [
      'social media automation small business',
      'automated content distribution',
      'ai content workflow',
      'automated blog publishing',
      'repurpose content automation',
      'content production automation',
    ],
    index: '03',
    label: 'CONTENT',

    heroVariant: 'mono',
    accentColor: '#8FAF9F',

    metaTitle: 'Content Automation Melbourne',
    metaDescription: 'UnderCurrent Automations builds content pipelines that take a brief or recording and publish across every channel automatically.',

    heroPill: 'Content Automation',
    heroHeadline1: 'Publish more.',
    heroHeadline2: 'Write less.',
    heroCopy: 'A month of content used to mean 10 hours of writing, formatting, scheduling and posting. We build the pipeline that takes a voice note or rough brief and handles everything else from draft to publish.',

    demoAnimType: 'content-flow',
    demoLabel: 'CONTENT PIPELINE AUTOMATION',
    demoHeadline: 'One brief. Every channel.',
    demoCopy: 'A single input transforms into formatted content ready for every platform you publish on.',

    deliversLabel: 'WHAT WE BUILD',
    deliversHeadline: 'From brief to published, without the bottleneck.',
    whatWeDeliver: [
      'Blog and long-form content generated from briefs or recordings',
      'Social content repurposing across LinkedIn, Instagram, Facebook and X',
      'Email newsletter automation and scheduling',
      'Content calendar management with auto-scheduling',
      'SEO brief generation from keyword research',
      'Distribution across all platforms from a single source',
      'Brand voice documentation and system-level consistency',
      'Performance reporting: which content is working',
    ],

    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for businesses that should be publishing.',
    industriesCopy: 'Most business owners know they should be showing up consistently online. This is what makes it possible.',
    industries: [
      {
        label: 'Professional Services',
        headline: 'Thought leadership without the time investment.',
        copy: 'Consultants, accountants, lawyers, advisors. Your expertise is the product. We build content pipelines that turn your knowledge into published articles, social posts and newsletters consistently, without writing sessions that never happen.',
        animType: 'pipeline',
      },
      {
        label: 'Ecommerce and Retail',
        headline: 'Product content at the scale your catalogue needs.',
        copy: 'Product descriptions, category pages, seasonal campaigns, review responses. We automate the production so your catalogue stays current and your brand stays visible without a full-time content team.',
        animType: 'terminal',
      },
      {
        label: 'Service Businesses',
        headline: 'Stay visible without stopping what you are doing.',
        copy: 'Trades, health, hospitality, real estate. You are busy doing the work. We build systems that pull content from what you already do, completed jobs, client stories, your expertise, and turn it into published content.',
        animType: 'leadgen',
      },
    ],

    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to sporadic publishing.',
    comparisonCopy: 'Most businesses have tried at least one version of a content plan before. Here is the difference.',
    comparisonRows: [
      { label: 'Publishes consistently, not when time allows',  uc: true,  manual: false, generic: false, agency: false },
      { label: 'Maintains your brand voice across all output',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Distributes to every platform automatically',   uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Starts from your existing knowledge',           uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Integrates with your publishing tools',         uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Output volume measurable from week one',        uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'Does this replace a content writer?',
        a: 'It replaces the production work: drafting, formatting, scheduling, distributing. Strategy, voice direction, and final approval stay with you or your team. We are the production engine, not the creative director.',
      },
      {
        q: 'How do you maintain brand voice at scale?',
        a: 'We document your brand voice in detail at the start: tone, vocabulary, things to avoid, example posts you like. This becomes the system-level instruction that governs every piece of output. You review and adjust early on, and the system improves.',
      },
      {
        q: 'Which platforms can you publish to?',
        a: 'LinkedIn, Instagram, Facebook, X, your WordPress or Webflow blog, and your email platform (Mailchimp, ConvertKit, ActiveCampaign and others). We configure the distribution to match how you already publish.',
      },
      {
        q: 'What do I actually need to provide?',
        a: 'The minimum is a rough brief, a voice note, or a topic list. Some clients record a short audio each week and the system handles everything from there. We design the input to be as low-friction as possible.',
      },
      {
        q: 'Can I review content before it publishes?',
        a: 'Yes. We can configure a review step before any content goes live, or set the system to publish directly once you are confident in it. Most clients start with review mode and reduce it over time as the output meets their standard.',
      },
      {
        q: 'How quickly can I go from no content system to publishing regularly?',
        a: 'Most content pipeline builds go live within 10 to 14 days of the first session. The first week is usually discovery and voice documentation, the second is the build. You start publishing in week three.',
      },
    ],

    ctaHeadline: 'Your expertise should be visible. Consistently.',
    ctaCopy: 'Book a free 30-minute call. We will map your current content situation and show you what a pipeline built around your business would look like.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Personal System Automation', path: '/personal-system-automation' },
      { label: 'Website Design', path: '/website-design' },
    ],

    bluf: 'Content automation is the production pipeline that turns a brief, a voice note or a transcript into published articles, social posts and newsletters across every channel you use. UnderCurrent Automations builds it on your existing publishing stack, so expertise gets distributed consistently without a weekly writing session that never happens.',

    pipelineStages: [
      { n: '01', label: 'Brief',     sub: 'Voice note, doc or topic list in' },
      { n: '02', label: 'Drafted',   sub: 'Long-form and platform variants generated' },
      { n: '03', label: 'Reviewed',  sub: 'Brand voice plus approval queue' },
      { n: '04', label: 'Formatted', sub: 'Per-channel sizing, hashtags, hooks' },
      { n: '05', label: 'Scheduled', sub: 'Calendar slots held across platforms' },
      { n: '06', label: 'Published', sub: 'Posted, tracked, performance logged' },
    ],

    integrations: [
      'Notion', 'Airtable', 'WordPress', 'Webflow', 'Ghost',
      'LinkedIn', 'Instagram', 'Facebook', 'X', 'Buffer',
      'Later', 'Hootsuite', 'Mailchimp', 'ConvertKit', 'ActiveCampaign',
      'Beehiiv', 'Descript', 'Otter.ai', 'n8n', 'Zapier',
    ],

    pricingTiers: [
      { name: 'Starter',       priceFrom: 'from AUD $4,500', tag: 'Single channel',  desc: 'One pipeline, one primary channel. Blog, LinkedIn or newsletter, plus a review queue and scheduling.' },
      { name: 'Multi-channel', priceFrom: 'from AUD $8,500', tag: 'Cross-platform',   desc: 'Long-form plus repurposing across LinkedIn, Instagram, Facebook, X and newsletter. Voice documentation, brief templates, calendar management.' },
      { name: 'Full pipeline', priceFrom: 'by quote',        tag: 'System-wide',      desc: 'Brand voice at scale, SEO brief generation, multi-brand or multi-author, performance reporting and content experiments.' },
    ],
  },

  {
    slug: 'personal-system-automation',
    id: 'personal-system',
    seedQueries: [
      'ai email assistant',
      'inbox triage automation',
      'ai assistant for founders',
      'email automation for business owners',
      'ai task management',
      'ai meeting scheduling',
    ],
    index: '04',
    label: 'PERSONAL SYSTEM',

    heroVariant: 'editorial',
    accentColor: '#8FAF9F',

    metaTitle: 'Personal System Automation Melbourne',
    metaDescription: 'UnderCurrent Automations builds AI-powered inbox, calendar, and task systems that give Melbourne business owners their time back.',

    heroPill: 'Personal System',
    heroHeadline1: 'Your inbox,',
    heroHeadline2: 'handled.',
    heroCopy: 'The average business owner loses 3 to 4 hours a day to email, scheduling, and admin. That is over 800 hours a year not building, selling, or thinking. We build the system that handles the routine so you only touch what genuinely needs you.',

    demoAnimType: 'inbox-triage',
    demoLabel: 'INBOX AND TASK AUTOMATION',
    demoHeadline: 'Every email processed. Every task captured.',
    demoCopy: 'Your inbox is sorted, your calendar is managed, and your tasks are extracted, without you touching any of it.',

    deliversLabel: 'WHAT WE BUILD',
    deliversHeadline: 'Your back-office, running on autopilot.',
    whatWeDeliver: [
      'Inbox triage: automatic labelling, prioritisation and routing',
      'Draft reply generation for common email types',
      'Meeting scheduling and calendar management',
      'Thread summarisation for inbox zero',
      'Pre-meeting research briefs delivered to your calendar',
      'Task extraction from email to your project management tool',
      'Follow-up flag system so nothing important slips',
      'Weekly summary of key activity across all inputs',
    ],

    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for founders and operators who run on email.',
    industriesCopy: 'If your inbox is your to-do list and your calendar is chaos, this system is for you.',
    industries: [
      {
        label: 'Business Owners and Founders',
        headline: 'Stop running your business from your inbox.',
        copy: 'You did not start a business to spend your days in email. We build an AI-powered assistant layer that triages, drafts, books and summarises, so you show up to a cleared inbox instead of a backlog.',
        animType: 'terminal',
      },
      {
        label: 'Consultants and Advisors',
        headline: 'Deliver at full capacity without the admin overhead.',
        copy: 'Client communication, scheduling, deliverable tracking. We automate the coordination layer so your billable hours go to client work, not the admin that surrounds it.',
        animType: 'pipeline',
      },
      {
        label: 'Agency and Studio Leads',
        headline: 'Manage clients without managing an inbox.',
        copy: 'Multiple clients, multiple projects, constant communication. We build a personal system that keeps every client thread organised, every deadline visible, and every follow-up handled.',
        animType: 'leadgen',
      },
    ],

    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to managing everything yourself.',
    comparisonCopy: 'If you have tried to solve your inbox problem before, here is what is different about building a system around it.',
    comparisonRows: [
      { label: 'Triages your inbox automatically each day',     uc: true,  manual: false, generic: false, agency: false },
      { label: 'Drafts replies using your voice and context',   uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Extracts tasks without manual copy-paste',      uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Connects to your existing tools',               uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Human approval before anything is sent',        uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Time saved measurable within the first week',   uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'Is this an AI agent with access to my inbox?',
        a: 'Yes. We set up a secure OAuth connection to your Gmail or Outlook. The AI reads, drafts, labels and flags, but never sends without your review unless you explicitly configure it to. A full audit trail is maintained so you can always see what was done.',
      },
      {
        q: 'What if the AI drafts something wrong?',
        a: 'All drafts go to a review queue first. Over time, as you approve and edit, the system learns your tone and improves. We also configure escalation rules so genuinely sensitive emails always come to you directly rather than being auto-handled.',
      },
      {
        q: 'Which email and calendar tools does this work with?',
        a: 'Gmail, Google Calendar, Outlook, and Microsoft 365 on the email and calendar side. For task management: Notion, Asana, ClickUp, Linear, and Monday.com. We configure the stack to match what you already use.',
      },
      {
        q: 'How does it learn how I write?',
        a: 'We document your communication style at the start: your tone, phrases you use, how you address different types of people, and examples of emails you have sent that you are happy with. This becomes the reference layer for every draft it writes.',
      },
      {
        q: 'Can I keep my current email setup?',
        a: 'Yes. We layer on top of your current inbox. No migration, no new email client, no changes to how your contacts reach you. The system works behind the scenes inside the inbox you already use.',
      },
      {
        q: 'How long does the build take?',
        a: 'Most personal system builds go live within 7 to 10 days. The first session is discovery: we go through your inbox, understand your common email types, and map the decision rules. The build follows from there.',
      },
    ],

    ctaHeadline: 'You should not be managing your inbox. It should be managing itself.',
    ctaCopy: 'Book a free 30-minute call. We will go through your current setup and show you exactly what a well-built personal system looks like for the way you work.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
      { label: 'Finance Automation', path: '/finance-automation' },
    ],

    bluf: 'Personal system automation is the assistant layer that sits over your inbox, calendar and task tools. It triages messages, drafts replies, books meetings, extracts tasks and surfaces what matters, without sending anything you have not approved. UnderCurrent Automations builds it on Gmail, Outlook, Notion or the tools you already run on.',

    pipelineStages: [
      { n: '01', label: 'Email lands', sub: 'Gmail, Outlook, shared inbox' },
      { n: '02', label: 'Triaged',     sub: 'Labelled, prioritised, routed' },
      { n: '03', label: 'Drafted',     sub: 'Reply written in your voice' },
      { n: '04', label: 'Scheduled',   sub: 'Meetings booked, calendar held' },
      { n: '05', label: 'Tasked',      sub: 'Actions extracted to PM tool' },
      { n: '06', label: 'Summarised',  sub: 'Daily digest of what matters' },
    ],

    integrations: [
      'Gmail', 'Google Calendar', 'Outlook', 'Microsoft 365', 'Superhuman',
      'Notion', 'Asana', 'ClickUp', 'Linear', 'Monday.com',
      'Todoist', 'Fathom', 'Otter.ai', 'Zoom', 'Google Meet',
      'Slack', 'Calendly', 'Cal.com', 'n8n', 'Zapier',
    ],

    pricingTiers: [
      { name: 'Foundation',  priceFrom: 'from AUD $3,500', tag: 'Inbox triage',       desc: 'Inbox triage, labels, priority sorting and a drafted-replies queue. Fits a founder running a single inbox.' },
      { name: 'Full system', priceFrom: 'from AUD $6,500', tag: 'Inbox and calendar', desc: 'Triage, drafting, meeting booking, task extraction into Notion or Asana, and a weekly summary. The complete assistant layer.' },
      { name: 'Custom',      priceFrom: 'by quote',        tag: 'Team or multi-role', desc: 'Multi-inbox, multi-role, or custom approval rules. Includes integration with bespoke internal tools or CRMs.' },
    ],
  },

  {
    slug: 'finance-automation',
    id: 'finance',
    seedQueries: [
      'invoice automation small business',
      'automated overdue invoice follow up',
      'xero automation',
      'automated expense tracking',
      'cash flow automation',
      'payment follow up automation',
    ],
    index: '05',
    label: 'FINANCE',

    heroVariant: 'default',
    accentColor: '#A89F7A',

    metaTitle: 'Finance Automation Melbourne',
    metaDescription: 'Automated invoicing, payment chasing, expense tracking and cash flow reporting. UnderCurrent builds finance automation for Melbourne SMBs.',

    heroPill: 'Finance Automation',
    heroHeadline1: 'Stop chasing',
    heroHeadline2: 'invoices.',
    heroCopy: 'Every hour spent chasing a late payment or reconciling expenses is an hour not spent growing your business. We build the automation that handles your financial back-office, so your books stay clean without you touching them.',

    demoAnimType: 'finance-flow',
    demoLabel: 'INVOICE AND PAYMENT AUTOMATION',
    demoHeadline: 'Every invoice tracked. Every payment chased.',
    demoCopy: 'From invoice creation to payment confirmation, or overdue reminder, the entire flow runs without manual input.',

    deliversLabel: 'WHAT WE BUILD',
    deliversHeadline: 'Your financial admin, fully automated.',
    whatWeDeliver: [
      'Automated invoice generation triggered by job completion or contract milestone',
      'Invoice delivery and a multi-step overdue follow-up sequence',
      'Payment confirmation acknowledgement sent to the client automatically',
      'Expense capture and categorisation from receipts and bank feeds',
      'Weekly cash flow snapshot delivered to your inbox',
      'Vendor and supplier research automation',
      'Financial data syncing across Xero, QuickBooks or MYOB',
      'Alerts when invoices hit 7, 21 and 30 days overdue',
    ],

    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'Built for businesses with high invoice volume.',
    industriesCopy: 'If you spend more than a few hours a week on financial admin, this is where that time comes back.',
    industries: [
      {
        label: 'Trades and Construction',
        headline: 'Job complete. Invoice sent. Payment tracked.',
        copy: 'Builders, plumbers, electricians, landscapers. The job is done but the admin is not. We automate invoice creation from your job management system, delivery to the client, and a smart follow-up sequence that adjusts in tone as the invoice ages.',
        animType: 'terminal',
      },
      {
        label: 'Professional Services',
        headline: 'Bill your time without billing your time.',
        copy: 'Agencies, consultants, accountants. Retainer invoices go out on the right date, project invoices trigger on milestone completion, and nothing slips through because someone forgot to raise it.',
        animType: 'pipeline',
      },
      {
        label: 'Ecommerce and Retail',
        headline: 'Reconcile without the spreadsheet.',
        copy: 'Orders, refunds, supplier invoices, ad spend. We connect your sales platform, payment gateway and accounting software so your books reconcile automatically and you always have a clear view of cash position.',
        animType: 'leadgen',
      },
    ],

    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to chasing payments manually.',
    comparisonCopy: 'Most business owners have tried at least one thing to fix this before finding a system that actually sticks.',
    comparisonRows: [
      { label: 'Sends invoices on time, every time',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Follows up overdue invoices automatically',     uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Adjusts tone as invoice gets older',            uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Categorises expenses without data entry',       uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Integrates with Xero, QuickBooks and MYOB',     uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Cash flow visibility updated daily',            uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually', 'Off-the-Shelf Tools', 'Other Agencies'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'Which accounting tools do you integrate with?',
        a: 'We integrate with Xero, QuickBooks, MYOB, and FreshBooks. If your accounting tool has an API, we can connect it. We do not require you to switch platforms.',
      },
      {
        q: 'Can you automate invoice chasing without being aggressive?',
        a: 'Yes, and this is built into the system. The follow-up sequence adjusts tone based on how overdue an invoice is: a gentle reminder at 7 days, firmer language at 21, and an escalation prompt at 30 days. All personalised, all on schedule.',
      },
      {
        q: 'How does expense tracking work?',
        a: 'We connect to bank feeds, receipt scanning tools like Dext or Hubdoc, and card providers to automatically categorise and push expenses into your accounting software. No manual data entry required.',
      },
      {
        q: 'What triggers an invoice being generated?',
        a: 'We configure the trigger based on how your business works. Common triggers: a job being marked complete in your job management tool, a contract milestone being reached, a subscription renewal date, or a manual trigger from a simple form.',
      },
      {
        q: 'Is my financial data secure?',
        a: 'We build using tools you control, primarily your existing accounting software and the integrations it already supports. Data flows between platforms you own via secure OAuth connections. We do not store financial data ourselves.',
      },
      {
        q: 'What if a client disputes an invoice?',
        a: 'The automation pauses the follow-up sequence when you flag a dispute. We configure a simple mechanism for you to put an invoice into a review hold, which stops further automated contact until you resolve it and restart the sequence.',
      },
    ],

    ctaHeadline: 'Your cash flow should not depend on you remembering to follow up.',
    ctaCopy: 'Book a free 30-minute call. We will go through your current invoicing and expense workflow and show you what an automated version would look like.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
    ],

    bluf: 'Finance automation is the system that handles invoicing, payment follow-up, expense capture and cash flow reporting without manual data entry. UnderCurrent Automations builds it on Xero, QuickBooks, MYOB or your existing accounting stack, so invoices go out on time, overdue payments chase themselves and your books stay reconciled while you run the business.',

    pipelineStages: [
      { n: '01', label: 'Job complete', sub: 'Trigger from job tool or milestone' },
      { n: '02', label: 'Invoiced',     sub: 'Drafted in Xero, QuickBooks or MYOB' },
      { n: '03', label: 'Delivered',    sub: 'Sent via email with payment link' },
      { n: '04', label: 'Chased',       sub: 'Tone escalates at 7, 21, 30 days' },
      { n: '05', label: 'Paid',         sub: 'Confirmation fired, record synced' },
      { n: '06', label: 'Reconciled',   sub: 'Bank feed matched, expenses coded' },
    ],

    integrations: [
      'Xero', 'QuickBooks', 'MYOB', 'FreshBooks', 'Stripe',
      'Square', 'PayPal', 'GoCardless', 'Dext', 'Hubdoc',
      'ServiceM8', 'Jobber', 'AroFlo', 'simPRO', 'Fergus',
      'Notion', 'Monday.com', 'n8n', 'Zapier', 'Make',
    ],

    pricingTiers: [
      { name: 'Foundation', priceFrom: 'from AUD $4,000', tag: 'Invoice + chase',   desc: 'Invoice creation on trigger, delivery, and a tone-escalating overdue sequence. Fits a trades or services business with steady invoice volume.' },
      { name: 'Full admin', priceFrom: 'from AUD $7,500', tag: 'Invoice + expense', desc: 'Invoicing, follow-up, expense capture via Dext or Hubdoc, weekly cash flow snapshots, alerts at 7, 21 and 30 days overdue.' },
      { name: 'Custom',     priceFrom: 'by quote',        tag: 'Multi-entity',      desc: 'Multi-entity reconciliation, bespoke ERP or job-management integration, custom financial reporting for management or board use.' },
    ],
  },

  {
    slug: 'inbound-lead-management-melbourne',
    id: 'inbound-lead-mgmt',
    seedQueries: [
      'instant lead response',
      'website enquiry follow up',
      'google ads lead automation',
      'service business lead management',
      'tradesman lead management',
      'automated lead qualification',
    ],
    index: '06',
    label: 'INBOUND LEAD MANAGEMENT',

    heroVariant: 'outfit',
    heroMockup: true,
    accentColor: '#8FAF9F',

    metaTitle: 'Inbound Lead Management Melbourne',
    metaDescription: 'UnderCurrent Automations builds inbound lead systems for Melbourne service businesses. Capture and follow up every enquiry in ServiceM8, Jobber or HubSpot.',

    heroPill: 'Inbound Lead Management',
    heroHeadline1: 'Stop losing money on',
    heroHeadline2: 'wasted leads.',
    heroCopy: 'You\'re already paying for ads and getting regular web enquiries. Lead generation isn\'t the issue. The leak happens after the form submits, in the follow-up gap no one has time to plug. We build a simple inbound lead management system that captures every enquiry, sends an instant reply, and turns more of your existing leads into booked jobs.',

    demoAnimType: 'lead-booking',
    demoLabel: 'INBOUND LEAD PIPELINE',
    demoHeadline: 'Every enquiry captured. Every lead followed up.',
    demoCopy: 'From first contact to booked job, every inbound lead is captured, qualified and followed up automatically, without anyone slipping through the cracks.',

    deliversLabel: 'WHAT WE SET UP FOR YOU',
    deliversHeadline: 'The full inbound lead system, built and connected.',
    whatWeDeliver: [
      'Lead capture from ads, website forms, and inbound channels',
      'A simple lead pipeline with clear stages: New, Contacted, Qualified, Quoted, Booked, Lost',
      'Basic qualification and tagging rules tailored to your services',
      'Instant email and SMS follow-up so fewer leads go cold',
      'A short nurture sequence for leads that need more time',
      'Internal notifications and task reminders for you or your admin',
      'Simple reporting so you can see what happened to every lead',
    ],

    industriesLabel: 'WHO WE HELP',
    industriesHeadline: 'For Melbourne service businesses that can\'t afford to waste enquiries.',
    industriesCopy: 'You\'re already getting leads. The issue is the handoff between enquiry and booking. Tradies, allied health practitioners, consultants and business services: if enquiries land in different inboxes, get followed up from memory, or get missed when you\'re on the job, this system is built for you.',
    industries: [
      {
        label: 'Trades',
        headline: 'Quote every enquiry. Win more jobs.',
        copy: 'Plumbers, electricians, builders, roofers and home service crews. Enquiries hit at 7pm and go cold by morning. We capture every inbound lead, send an immediate acknowledgement, and prompt a follow-up before your competitors reply.',
        animType: 'jobflow',
      },
      {
        label: 'Allied Health',
        headline: 'Every enquiry tracked from first contact to booking.',
        copy: 'Physios, chiros, osteos, podiatrists and mobile clinics. Your schedule fills from inbound demand, but enquiries disappear in the follow-up gap when reception is busy or the practitioner is with a patient. We close that gap with a simple automated system.',
        animType: 'jobflow',
      },
      {
        label: 'Consultants & Business Services',
        headline: 'Reply first. Win more work.',
        copy: 'Bookkeepers, mortgage brokers, advisors, boutique law firms. Most prospects contact two or three providers. The one who replies first usually wins the work. We make sure that\'s you, every time.',
        animType: 'jobflow',
      },
    ],

    processStyle: 'vertical',
    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to losing paid leads.',
    comparisonCopy: 'If you\'re already spending to generate leads, the real work sits downstream of the ad spend. The fix is a handoff that captures, qualifies and follows up every enquiry before it goes cold.',
    comparisonRows: [
      { label: 'Captures every enquiry automatically',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Follows up leads before they go cold',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Shows exactly where leads are dropping off',      uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Works with tools you already use',                uc: true,  manual: true,  generic: false, agency: false },
      { label: 'No new software or tech headache',                uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Done-for-you setup, live within days',            uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent Automations', 'Doing It Manually'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'What is the 5 minute rule for leads?',
        a: 'The 5 minute rule is the observation that response time is the single biggest factor in whether an inbound lead converts. A lead contacted within 5 minutes is significantly more likely to qualify than one contacted an hour later. UnderCurrent Automations builds the instant acknowledgement and internal alert so the first reply goes out within minutes, not hours. You or your admin can then follow up before the prospect contacts a competitor.',
      },
      {
        q: 'How quickly should you respond to an inbound lead?',
        a: 'Within 5 minutes is the benchmark. Most service businesses reply within 24 hours, and many only during business hours. That gap is where paid leads leak to competitors. UnderCurrent Automations sets up an instant system-generated reply within seconds of the enquiry arriving, followed by an internal alert so your team can send a personal reply before the lead goes cold.',
      },
      {
        q: 'What is a website enquiry?',
        a: 'A website enquiry is any inbound lead that comes through a form, contact page, quote request or chat widget on your website. UnderCurrent Automations captures every website enquiry and routes it into a single pipeline alongside Google Ads, Meta Ads, Google Business Profile and direct email, so nothing sits in a shared inbox waiting for someone to notice.',
      },
      {
        q: 'Can Google Ads generate leads?',
        a: 'Yes. Google Ads generates leads through search campaigns, lead form assets and Performance Max. The common mistake is generating volume without a receiving system. UnderCurrent Automations wires Google Ads lead forms directly into your pipeline with instant acknowledgement, qualification tags and follow-up, so the budget you spend on clicks turns into booked jobs instead of cold enquiries.',
      },
      {
        q: 'Does my team need to learn new software?',
        a: 'No. The system works around tools you already run, ServiceM8, Jobber, simPRO, Pipedrive, HubSpot, Gmail or Outlook. Most clients manage leads from a single shared screen or their phone. The automation handles capture, acknowledgement and follow-up. Your team just actions the leads that need a human reply.',
      },
      {
        q: 'How long before it\'s live?',
        a: 'Most inbound lead systems go live within 14 days of the first call. Days one and two are discovery: we map your current lead flow, sources and follow-up process. Days three to ten cover the build and integrations. The final days are test runs, training and handover, so the system is running cleanly before you rely on it.',
      },
      {
        q: 'Who can set up automated lead follow-up for my business in Australia?',
        a: 'UnderCurrent Automations, based in Melbourne, sets up automated lead follow-up for Australian service businesses. We capture every enquiry from ads, website forms and direct contact, send an instant SMS or email acknowledgement, qualify the lead by service type and urgency, and trigger personalised follow-up sequences automatically. Most systems go live within 14 days of the first call. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'See how many paid enquiries are slipping past you.',
    ctaCopy: 'If even a handful of enquiries slip each month, that\'s real revenue you\'ve already paid to generate. On the call, we review your current lead flow, spot the biggest leaks and outline how this system would work for your business. No pressure, no jargon, clear options.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
      { label: 'Website Design', path: '/website-design' },
    ],

    bluf: 'Inbound lead management is the system that catches every enquiry from ads, forms and direct contact, sends an instant acknowledgement, qualifies the lead and triggers follow-up before a competitor replies. UnderCurrent Automations builds it for Melbourne service businesses so paid leads stop slipping between inboxes and phone notes.',

    pipelineStages: [
      { n: '01', label: 'Enquiry in',   sub: 'Ads, website, GBP, direct contact' },
      { n: '02', label: 'Captured',     sub: 'Unified pipeline, no more lost inboxes' },
      { n: '03', label: 'Acknowledged', sub: 'Instant email and SMS reply' },
      { n: '04', label: 'Qualified',    sub: 'Tagged by service, area, urgency' },
      { n: '05', label: 'Followed up',  sub: 'Nurture for slow movers, prompt for admin' },
      { n: '06', label: 'Booked',       sub: 'Job scheduled or quote sent' },
    ],

    integrations: [
      'Google Ads', 'Meta Ads', 'Google Business Profile', 'WordPress', 'Webflow',
      'Typeform', 'Tally', 'ServiceM8', 'Jobber', 'simPRO',
      'AroFlo', 'HubSpot', 'Pipedrive', 'Twilio', 'MessageMedia',
      'Gmail', 'Outlook', 'Calendly', 'n8n', 'Zapier',
    ],

    pricingTiers: [
      { name: 'Starter',  priceFrom: 'from AUD $2,500', tag: 'Done-for-you',   desc: 'Single-source capture, instant acknowledgement, and a simple shared pipeline. Fits a sole trader or small team.' },
      { name: 'Standard', priceFrom: 'from AUD $4,500', tag: 'Multi-source',   desc: 'All ad channels, website forms and direct enquiries in one pipeline. SMS and email follow-up, stage tracking, simple reporting.' },
      { name: 'Custom',   priceFrom: 'by quote',        tag: 'Multi-location', desc: 'Multi-location routing, territory rules, integration with Jobber, ServiceM8 or simPRO, and custom reporting for operations.' },
    ],
  },

  {
    slug: 'website-design',
    id: 'website-design',
    seedQueries: [
      'website design small business australia',
      'service business website design',
      'conversion focused website design',
      'website redesign for trades',
      'client portal development',
      'booking website design',
    ],
    index: '07',
    label: 'WEBSITE DESIGN',
    displayName: 'Website Design',

    accentColor: '#8FAF9F',

    metaTitle: 'Website Design Melbourne',
    metaDescription: 'UnderCurrent Automations designs conversion-focused websites, client portals and booking flows for Melbourne service businesses. Next.js, wired to your stack.',

    heroPill: 'Website Design',

    deliversHeadline: 'The customer-facing layer, built to convert and wired to your stack.',
    whatWeDeliver: [
      'Marketing websites on Next.js with App Router, edge caching and Core Web Vitals green at launch',
      'Client portals with authenticated dashboards, file delivery and role-based access',
      'Booking and scheduling flows connected to your calendar, CRM and payment stack',
      'Operational dashboards for pipeline, revenue and performance, refreshed from live data',
      'Interactive demos, calculators and configurators that qualify leads before a call is booked',
      'Headless CMS integration (Sanity, Contentful, Payload) so your team ships content without engineering bottlenecks',
      'Design-system components reused across every surface, one brand and one codebase',
      'Analytics wiring across GA4, Plausible and PostHog, with conversion and funnel events baked in',
    ],

    industriesCopy: 'When the thing a prospect or client sees, a website, a booking page, a portal, is the bottleneck between interest and revenue, this is the layer we rebuild.',
    industries: [
      {
        label: 'Service Businesses',
        headline: 'A site that works harder than a brochure.',
        copy: 'Trades, allied health, legal, advisory. Marketing sites that rank, convert and integrate with the booking, CRM and payment tools you already run on. No more handing a hot lead to a static page and hoping they fill in a form.',
      },
      {
        label: 'SaaS and Product Teams',
        headline: 'Marketing and product UI, built by the same hand.',
        copy: 'Startups and product teams moving off Webflow or a patchwork of templates. Marketing site, app shell and customer dashboard built on one design system, shipped fast and kept consistent across every surface.',
      },
      {
        label: 'Client Services and Agencies',
        headline: 'Portals that replace the weekly update email.',
        copy: 'Consultants, agencies, accountants. Client portals with authenticated dashboards, document delivery and status views. Clients self-serve what they need, you stop answering the same three emails every Monday morning.',
      },
    ],

    processHeadline: 'Three stages. Then it ships.',

    comparisonCopy: 'Most teams have tried a template site, a freelancer build, or an agency retainer before finding something they want to own.',
    comparisonRows: [
      { label: 'Built on a modern stack (Next.js, App Router)',    uc: true,  manual: false, generic: false, agency: true  },
      { label: 'Core Web Vitals green at launch and after',        uc: true,  manual: false, generic: false, agency: false },
      { label: 'Integrated with your CRM, calendar and payments',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Design system reusable across every page',         uc: true,  manual: false, generic: false, agency: true  },
      { label: 'You own the code, deploy to your Vercel account',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Shipped in weeks, not quarters',                   uc: true,  manual: false, generic: true,  agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'In-House DIY', 'Template Builders', 'Other Agencies'],

    faqs: [
      {
        q: 'How much does a website cost in Australia?',
        a: 'Website builds are priced by page count. Three pages starts from AUD $2,000, five pages is AUD $3,500, ten pages is AUD $5,000. Every build includes the design system, CMS and CRM wiring. Hosting and maintenance is AUD $40 per month with one iteration included each month. Authenticated portals, booking apps and custom dashboards are quoted on scope, because integrations and user roles drive the work.',
      },
      {
        q: 'What is conversion-focused website design?',
        a: 'Conversion-focused website design starts from the action you want a visitor to take, a booking, an enquiry, a checkout, and works backwards. Every page has one primary job. Hero, proof, offer and call-to-action sit above the fold. Forms are short and wired directly into your CRM. Page speed, mobile layout and trust signals get treated as conversion levers, not afterthoughts. Analytics track the funnel, not just the traffic.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'Three to four weeks from the first scoping call for a marketing site of five to ten pages. Week one is discovery and design, weeks two and three are build and integrations, week four is content population, QA and launch. Core Web Vitals green is confirmed before handover (LCP under 2.5 seconds, CLS under 0.1). Client portals and booking apps run four to six weeks because integrations and user roles add scope.',
      },
      {
        q: 'Do you design the site, or do I bring a designer?',
        a: 'Either works. UnderCurrent Automations runs its own design system and can drive a build end to end, or builds against your brand, Figma files and existing identity. Most clients start with the in-house design language and evolve it as the brand grows. Production code ships either way; the design system gets handed over with the build, and the brand assets stay yours.',
      },
      {
        q: 'Is a template website as good as a custom build?',
        a: "Templates ship faster and cost less, but lock you into someone else's page speed and design system. A custom build on Next.js runs several times faster than a typical WordPress or Squarespace site, wires directly into your CRM, calendar and payment stack (HubSpot, Stripe, Cal.com, GA4) and stays yours. Template agencies optimise for production speed. Custom builds optimise for conversion, integration and long-term ownership.",
      },
      {
        q: 'Do I own the code and the site when you finish?',
        a: 'Yes. The build ships to your GitHub repository and deploys to your Vercel account. No proprietary CMS lock-in, no monthly platform rent, no hostage ongoing contract. The codebase, design system, documentation and admin credentials all get handed over so another developer could pick it up tomorrow and keep shipping without friction. Ongoing support from UnderCurrent Automations is optional and stays that way for the life of the build.',
      },
      {
        q: 'Who does conversion-focused website design for small businesses in Australia?',
        a: 'UnderCurrent Automations designs and builds conversion-focused websites for Australian small businesses, based in Melbourne. Every site is built on Next.js and wired directly into your CRM, calendar and payment stack, so enquiry forms route into your pipeline automatically and every visitor lands on a page with one clear job. Builds go from brief to live in three to four weeks. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'Your site should earn its keep.',
    ctaCopy: 'Book a free 30-minute call. A short audit of your current front end, the gaps between traffic and conversion, and what a custom build looks like for your business.',

    internalLinks: [
      { label: 'Front-end Experience', path: '/front-end-experience' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Inbound Lead Management Melbourne', path: '/inbound-lead-management-melbourne' },
      { label: 'Content Automation', path: '/content-automation' },
    ],

    bluf: 'Website Design is more than a marketing site. It is the customer-facing layer of your business: the booking flow, the client portal, the operational dashboard. UnderCurrent Automations builds it on Next.js and wires it directly into your CRM, calendar and payment stack, so every click lands on a system that already runs the rest of your operation.',

    pipelineStages: [
      { n: '01', label: 'Brief',       sub: 'Goals, audiences, integrations' },
      { n: '02', label: 'Designed',    sub: 'Design system, wireframes, brand' },
      { n: '03', label: 'Built',       sub: 'Next.js, Tailwind, component kit' },
      { n: '04', label: 'Integrated',  sub: 'CRM, calendar, payments, CMS' },
      { n: '05', label: 'Shipped',     sub: 'Vercel deploy, CWV green, analytics live' },
      { n: '06', label: 'Iterated',    sub: 'A/B tests, conversion lifts, content ops' },
    ],

    integrations: [
      'Next.js', 'React', 'Tailwind CSS', 'Vercel', 'TypeScript',
      'Supabase', 'Postgres', 'Sanity', 'Contentful', 'Payload',
      'Clerk', 'NextAuth', 'Stripe', 'Cal.com', 'Calendly',
      'HubSpot', 'Pipedrive', 'Resend', 'PostHog', 'GA4',
    ],

    pricingTiers: [
      { name: 'Website',   priceFrom: 'from AUD $2,000', tag: 'Public-facing', desc: 'From AUD $2,000 for three pages, AUD $3,500 for five pages, AUD $5,000 for ten pages. Includes design system, CMS, analytics and CRM wiring. Monthly hosting and maintenance is AUD $40, with one iteration included each month.' },
      { name: 'Dashboard', priceFrom: 'by quote',        tag: 'Authenticated', desc: 'Authenticated client portal, dashboard or booking app. Includes role-based access, data integrations and operational views. Quoted on scope because integrations and user roles drive the work.' },
      { name: 'Custom',    priceFrom: 'by quote',        tag: 'Platform',      desc: 'Multi-surface build: marketing site, app and dashboards on one design system. Ongoing product support and iteration cadence included.' },
    ],
  },

  {
    slug: 'seo-ai-visibility',
    id: 'seo-ai-visibility',
    seedQueries: [
      'ai search optimisation',
      'google ai overview optimisation',
      'answer engine optimisation',
      'chatgpt seo visibility',
      'local seo small business australia',
      'seo for service business',
    ],
    index: '08',
    label: 'SEO & AI VISIBILITY',
    displayName: 'SEO & AI Visibility',

    accentColor: '#6A8DAD',

    metaTitle: 'SEO & AI Visibility Australia',
    metaDescription: 'SEO & AI Visibility gets Australian small businesses ranked in Google and cited in ChatGPT. UnderCurrent Automations Melbourne handles audits, content, schema.',

    heroPill: 'SEO & AI Visibility',

    deliversHeadline: 'Ranking in Google, cited in ChatGPT. Everywhere your buyers look.',
    whatWeDeliver: [
      'Technical SEO audit covering crawl, indexation, Core Web Vitals, internal linking, and schema validation',
      'Entity-dense topic cluster architecture with pillar hubs and interlinked supporting articles',
      'Answer engine optimisation retrofit: BLUF paragraphs, question-led H2s, verbatim-citable FAQ blocks',
      'Google AI Overview optimisation: definitional openers, concise answers, topical authority signals',
      'JSON-LD stack on every page: Organization, LocalBusiness, Service, FAQPage, Person, Article, BreadcrumbList',
      'llms.txt signal file plus clean robots.txt directives for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)',
      'Google Business Profile setup, local citations, and review generation for suburb-level search',
      'Monthly reporting on Google rankings, AI search citations, and organic pipeline attribution',
    ],

    industriesCopy: 'If you want buyers to find you whether they search on Google, ask ChatGPT, or use Perplexity, and the business behind the page can actually deliver, this is the discipline we run.',
    industries: [
      {
        label: 'Service Businesses',
        headline: 'Rank for the questions your buyers already type and ask.',
        copy: 'Consultants, advisors, agencies, tradies, allied health practices. Topic clusters built around the queries your buyers type into Google and speak into ChatGPT, interlinked into a pillar architecture that compounds every month. Local SEO layered underneath so suburb-level searches still land on your page, not on a directory listing.',
      },
      {
        label: 'SaaS and Product Companies',
        headline: 'Own the category, not just the brand term.',
        copy: 'Startups and product teams who need inbound pipeline, not just paid ads. Category-defining content, comparison pages, and use-case hubs built so ChatGPT, Claude, and Perplexity cite them as sources, and so Google ranks them for the queries that convert into demos, not just traffic.',
      },
      {
        label: 'Local and Multi-location',
        headline: 'Found by the suburb, not just the postcode.',
        copy: 'Melbourne and Sydney service businesses running multiple service areas. Google Business Profile, local landing pages, review capture, and suburb-level schema layered together so you show up in Maps, in AI Overviews, and in the direct enquiries that actually convert into bookings.',
      },
    ],

    processHeadline: 'Audit, architect, publish. Then it compounds.',

    comparisonCopy: 'Most businesses have tried a cheap SEO retainer, a generic AI content tool, or posting on LinkedIn, and ended up ranking for nothing.',
    comparisonRows: [
      { label: 'Earns Google top-10 rankings on buyer queries',     uc: true,  manual: false, generic: false, agency: true  },
      { label: 'Optimised for ChatGPT and Perplexity citations',    uc: true,  manual: false, generic: false, agency: false },
      { label: 'Entity density and topical authority built in',     uc: true,  manual: false, generic: false, agency: false },
      { label: 'JSON-LD schema validated on every page',            uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Local SEO + Google Business Profile managed',       uc: true,  manual: true,  generic: true,  agency: true  },
      { label: 'Content authored by humans, not spun',              uc: true,  manual: true,  generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'DIY Blog Posts', 'Generic AI Tools', 'Other Agencies'],

    faqs: [
      {
        q: 'What is AI visibility in SEO?',
        a: 'AI visibility is how often your brand, content, and expertise surface inside AI answers like ChatGPT, Claude, Perplexity, and Google AI Overviews when buyers ask buying-stage questions. Traditional SEO earns a blue-link ranking; AI visibility earns a verbatim citation inside a generated answer. Both matter, because buyers now split research between Google and AI assistants. We build for both and measure citations monthly.',
      },
      {
        q: 'Is SEO dead or evolving in 2026?',
        a: 'SEO is evolving, not dead. Google still drives the majority of organic discovery for most Australian service businesses, but the ranking surface is splitting. Classic blue links now share space with AI Overviews, featured snippets, Maps results, and People Also Ask. The discipline has widened into answer engine optimisation and AI search performance work. Businesses still doing 2020-era tactics are losing ground; the ones adapting are compounding.',
      },
      {
        q: 'How do you optimise for Google AI Overviews?',
        a: 'Only 38% of Google AI Overview citations now come from pages in the organic top 10, a major shift since the Gemini 3 rollout in early 2026. Selection is driven by semantic completeness, entity density, E-E-A-T signals, answer-first structure, and freshness. Open with a definitional sentence, use question-led H2s, keep paragraphs tight, add FAQ schema, and name real tools and authorities relevant to the query. Internal linking reinforces topical authority, one signal among several.',
      },
      {
        q: 'What does answer engine optimisation mean?',
        a: 'Answer engine optimisation, AEO, gets your content cited directly inside AI answers from ChatGPT, Claude, and Perplexity. Instead of earning a blue-link ranking for a keyword, you earn a verbatim mention inside a generated response. It uses question-led headings, BLUF paragraphs, clean schema markup, and named entities. AEO runs alongside traditional SEO, because buyers now research inside AI assistants before they ever open a search results page.',
      },
      {
        q: 'How will ChatGPT affect SEO?',
        a: 'ChatGPT has already absorbed a chunk of top-of-funnel research. Instead of typing a question into Google, buyers ask ChatGPT and often never click through to a website. That shifts the goal from winning clicks to winning citations. Practically, it means writing content ChatGPT can read and quote, making sure GPTBot gets a clean crawl, and tracking your citation rate across prompts, not just your Google rankings.',
      },
      {
        q: 'Can you do SEO with AI?',
        a: 'Yes, but AI is a tool inside the workflow, not a replacement for strategy. AI speeds up keyword clustering, draft writing, schema generation, competitor analysis, and technical audits. It still misses the judgement work: brand voice, entity positioning, editorial ranking of what matters. Our team uses ChatGPT, Claude, Ahrefs, Semrush, and Screaming Frog together, with a human editor in the loop. AI-generated slop gets caught in quality review and never ships.',
      },
      {
        q: 'How long before rankings move?',
        a: 'Technical SEO fixes and on-page retrofits typically move rankings in 4 to 8 weeks. Topical authority, which is ranking for a whole cluster of queries rather than one term, takes 4 to 6 months of consistent publishing. AEO and AI Overview citations can land within days of a page being indexed, but compound over the same 3 to 6 month horizon. No credible SEO service promises week-one rankings, especially on competitive buyer queries.',
      },
      {
        q: 'Who does SEO and AI visibility for small businesses in Australia?',
        a: 'UnderCurrent Automations runs SEO and AI visibility for Australian small businesses, based in Melbourne. We combine classic organic SEO with answer engine optimisation (AEO) and generative engine optimisation (GEO), so your business ranks in Google and earns verbatim citations inside ChatGPT, Perplexity and Google AI Overviews. Technical audits and on-page retrofits typically move rankings in four to eight weeks, with AI citations often landing faster. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'Found in Google. Cited in ChatGPT. Both.',
    ctaCopy: 'Book a free 30-minute call. We audit your current organic visibility across Google rankings, AI citations, and Google Business Profile, then show you the highest-impact moves for the next 90 days.',

    internalLinks: [
      { label: 'Content Automation', path: '/content-automation' },
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Website Design', path: '/website-design' },
    ],

    bluf: 'SEO & AI Visibility is the discipline that earns your business citations across every tool buyers search on: Google, ChatGPT, Perplexity, Claude, and Google AI Overviews. UnderCurrent Automations, based in Melbourne, combines classic SEO with answer engine optimisation (AEO) and generative engine optimisation (GEO) into one compounding system for Australian service businesses.',

    pipelineStages: [
      { n: '01', label: 'Audited',     sub: 'Crawl, index, CWV, entity gaps' },
      { n: '02', label: 'Architected', sub: 'Topic clusters, pillar hubs, internal links' },
      { n: '03', label: 'Written',     sub: 'Answer-first, BLUF, FAQ schema' },
      { n: '04', label: 'Structured',  sub: 'JSON-LD stack, llms.txt, sitemaps' },
      { n: '05', label: 'Published',   sub: 'Google, GBP, LinkedIn, syndication' },
      { n: '06', label: 'Measured',    sub: 'Rankings, AI citations, organic pipeline' },
    ],

    integrations: [
      'Google Search Console', 'Google Business Profile', 'Ahrefs', 'Semrush', 'Screaming Frog',
      'Sitebulb', 'Schema.org', 'Next.js', 'Sanity', 'Webflow',
      'ChatGPT', 'Claude', 'Perplexity', 'Google AI Overviews', 'GA4',
      'PostHog', 'BrightLocal', 'Birdeye', 'n8n', 'Zapier',
    ],

    pricingTiers: [
      { name: 'Audit',     priceFrom: 'from AUD $1,500',  tag: 'One-off',  desc: 'Technical and content audit, entity gap analysis, topic-cluster plan, 90-day roadmap. Delivered as a written report with prioritised actions.' },
      { name: 'Build',     priceFrom: 'from AUD $2,500',  tag: 'Retrofit', desc: 'On-page retrofit across 15 to 25 existing pages, JSON-LD stack, llms.txt, pillar hub build-out. Usually a one-time project, not a retainer.' },
      { name: 'Ongoing',   priceFrom: 'from AUD $750/mo', tag: 'Retainer', desc: 'Monthly maintenance and content production: $750 to $1,500 per month depending on scope. Ongoing schema tuning, answer-engine work, and a monthly rankings and citations report.' },
    ],
  },


  {
    slug: 'front-end-experience',
    id: 'front-end-experience',
    index: '07',
    label: 'FRONT END EXPERIENCE',

    accentColor: '#8FAF9F',

    metaTitle: 'Front-End Experience — Websites, Portals & Dashboards',
    metaDescription: 'Marketing sites, client portals, and dashboards built on Next.js and wired to your back-end. Front-end experiences that convert.',

    heroPill: 'Front End Experience',

    deliversHeadline: 'The customer-facing layer, built to convert and wired to your stack.',
    whatWeDeliver: [
      'Marketing websites on Next.js with App Router, edge caching and Core Web Vitals green',
      'Client portals with authenticated dashboards, file delivery and role-based access',
      'Booking and scheduling flows connected to your calendar, CRM and payment stack',
      'Operational dashboards for pipeline, revenue and performance, refreshed from live data',
      'Interactive demos and calculators that qualify leads before a call is booked',
      'Headless CMS integration so your team ships content without engineering bottlenecks',
      'Design-system components reused across every surface — one brand, one codebase',
      'Analytics wiring: GA4, Plausible, PostHog, with conversion and funnel events baked in',
    ],

    industriesCopy: 'If the thing a prospect or client sees — a website, a booking page, a portal — is the bottleneck between interest and revenue, this is the layer we rebuild.',
    industries: [
      {
        label: 'Service Businesses',
        headline: 'A site that works harder than a brochure.',
        copy: 'Trades, health, legal, advisory. We build marketing sites that rank, convert and integrate with the booking, CRM and payment tools you already run on. No more handing leads to a static page and hoping.',
      },
      {
        label: 'SaaS and Product Teams',
        headline: 'Marketing and product UI, built by the same hand.',
        copy: 'Startups and product teams moving from Webflow to something serious. We build the marketing site, the app shell and the customer dashboard on the same design system — shipped fast and kept consistent.',
      },
      {
        label: 'Client Services and Agencies',
        headline: 'Portals that replace the weekly update email.',
        copy: 'Consultants, agencies, accountants. We build client portals with authenticated dashboards, document delivery and status views. Clients self-serve what they need, you stop answering the same three emails.',
      },
    ],

    processHeadline: 'Three stages. Then it ships.',

    comparisonCopy: 'Most teams have tried a template site, a freelancer build, or an agency retainer before finding something they actually want to own.',
    comparisonRows: [
      { label: 'Built on a modern stack (Next.js, App Router)',    uc: true,  manual: false, generic: false, agency: true  },
      { label: 'Core Web Vitals green at launch and after',        uc: true,  manual: false, generic: false, agency: false },
      { label: 'Integrated with your CRM, calendar and payments',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Design system reusable across every page',         uc: true,  manual: false, generic: false, agency: true  },
      { label: 'You own the code, deploy to your Vercel account',  uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Shipped in weeks, not quarters',                   uc: true,  manual: false, generic: true,  agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'In-House DIY', 'Template Builders', 'Other Agencies'],

    faqs: [
      {
        q: 'What stack do you build on?',
        a: 'Next.js 15 with the App Router, React 19, Tailwind CSS, deployed to Vercel by default. For data: Supabase, Postgres or your existing API. For auth: Clerk or NextAuth. For CMS: Sanity, Contentful or Payload. We match the stack to your team and your scale, not the other way around.',
      },
      {
        q: 'Will it be fast?',
        a: 'Yes. Core Web Vitals green at launch is table stakes: LCP under 2.5s, CLS under 0.1, INP under 200ms. We ship on Vercel Edge, use static rendering where possible, and image-optimise everything. If your current site is slow, page speed is usually the first lift we see in conversions.',
      },
      {
        q: 'Do you design the site, or do I bring a designer?',
        a: 'Both works. We have our own design system and can drive end-to-end, or we build against your brand and Figma files. Most clients start with our design language and adjust as the brand evolves. Either way you get production code, not a prototype.',
      },
      {
        q: 'Can you integrate with the tools we already use?',
        a: 'Yes. Calendars (Cal.com, Calendly, Google), CRMs (HubSpot, Pipedrive, Salesforce), payments (Stripe, GoCardless), email (Resend, Postmark), analytics (GA4, PostHog) and everything in between. If there is an API, we can wire it. If there is no API, we build the webhook layer.',
      },
      {
        q: 'Do I own the code?',
        a: 'Yes. Code ships to your GitHub and deploys to your Vercel account. No proprietary CMS lock-in, no monthly platform rent. We document the build and hand over credentials so another developer could pick it up tomorrow. Ongoing support is optional, not a hostage situation.',
      },
      {
        q: 'How long does a full site take?',
        a: 'A marketing site with 8 to 12 pages ships in 3 to 4 weeks from first call. A client portal with auth, dashboards and integrations is 4 to 6 weeks. Interactive calculators or lead-qualification tools fold into the main build. We give a firm timeline after the first scoping session.',
      },
    ],

    ctaHeadline: 'Your site should earn its keep.',
    ctaCopy: 'Book a free 30-minute call. We will audit your current front end, find the leaks between traffic and conversion, and show you what a custom build looks like for your business.',

    internalLinks: [
      { label: 'Website Design', path: '/website-design' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Inbound Lead Management Melbourne', path: '/inbound-lead-management-melbourne' },
      { label: 'Content Automation', path: '/content-automation' },
    ],

    bluf: 'Front end experience is the customer-facing layer of your business: the marketing site, the booking flow, the client portal, the operational dashboard. UnderCurrent builds it on Next.js 15 and wires it directly into your CRM, calendar and payment stack, so every click connects to a system that already runs the rest of your operation.',

    pipelineStages: [
      { n: '01', label: 'Brief',       sub: 'Goals, audiences, integrations' },
      { n: '02', label: 'Designed',    sub: 'Design system, wireframes, brand' },
      { n: '03', label: 'Built',       sub: 'Next.js, Tailwind, component kit' },
      { n: '04', label: 'Integrated',  sub: 'CRM, calendar, payments, CMS' },
      { n: '05', label: 'Shipped',     sub: 'Vercel deploy, CWV green, analytics live' },
      { n: '06', label: 'Iterated',    sub: 'A/B tests, conversion lifts, content ops' },
    ],

    integrations: [
      'Next.js', 'React', 'Tailwind CSS', 'Vercel', 'TypeScript',
      'Supabase', 'Postgres', 'Sanity', 'Contentful', 'Payload',
      'Clerk', 'NextAuth', 'Stripe', 'Cal.com', 'Calendly',
      'HubSpot', 'Pipedrive', 'Resend', 'PostHog', 'GA4',
    ],

    pricingTiers: [
      { name: 'Website',   priceFrom: 'by quote', tag: 'Public-facing', desc: 'From AUD $2,500. 8 to 12 pages, design system, CMS, analytics and CRM wiring. The marketing site most small businesses actually need.' },
      { name: 'Dashboard', priceFrom: 'by quote', tag: 'Authenticated', desc: 'Authenticated client portal, dashboard or booking app. Includes role-based access, data integrations and operational views.' },
      { name: 'Custom',    priceFrom: 'by quote', tag: 'Platform',      desc: 'Multi-surface build: marketing site plus app plus dashboards, on one design system. Includes ongoing product support and iteration cadence.' },
    ],
  },

  {
    slug: 'ai-strategy-training',
    id: 'ai-strategy-training',
    seedQueries: [
      'what is ai strategy and training',
      'ai strategy and training australia',
      'ai strategy small business',
      'ai training small business owners',
      'ai workshop for staff',
      'ai implementation roadmap',
      'ai consulting small business australia',
    ],
    index: '09',
    label: 'AI STRATEGY & TRAINING',
    displayName: 'AI Strategy & Training',

    accentColor: '#E07A55',

    metaTitle: 'AI Strategy & Training Australia',
    metaDescription: 'UnderCurrent Automations runs AI Strategy and Training for Australian small businesses: 90-day roadmap, ChatGPT, Claude and Copilot picks, role-based workshops.',

    heroPill: 'AI Strategy & Training',

    deliversHeadline: 'A 90-day AI roadmap the team uses, with prompts and policies they keep.',
    whatWeDeliver: [
      'Current-state assessment: tool stack, data readiness, policy gaps, team AI literacy',
      '90-day AI roadmap with use cases ranked by ROI, effort and data readiness',
      'Vendor-neutral tool selection across ChatGPT, Claude, Microsoft Copilot, GitHub Copilot, Cursor, Notion AI, Gemini and Perplexity',
      'Policy and governance framework: data handling, model access, prompt logging, Australian Privacy Act coverage',
      'Role-specific team workshops for sales, ops, finance, marketing and leadership',
      'Prompt libraries and playbooks the team writes in the workshop and keeps using',
      'One-on-one executive coaching for founders and leadership teams',
      'Three months of monthly office hours after handover, for questions, drift correction and new use cases',
    ],

    industriesCopy: 'If the team is already using ChatGPT or Claude on the side, but nothing has been adopted at the business level and tool spend is going into seats nobody uses, this is the discipline we run before any automation work begins. Common across tradies, business services, consultants and allied health practitioners in Australia.',
    industries: [
      {
        label: 'Tradies and field-services teams',
        headline: 'AI training that reaches staff who are not at a desk.',
        copy: 'Plumbers, electricians, builders, logistics crews, field techs. ServiceM8 or Jobber runs the jobs, Xero sends the invoices, and the owner answers quotes from the ute. We train field and office staff on voice-based ChatGPT and Claude for quote drafting, job-note clean-up and inbound-enquiry triage, with a short AI policy written around the tools you already pay for.',
      },
      {
        label: 'Business services, agencies and consultants',
        headline: 'AI adoption that moves past the pilot and into billable work.',
        copy: 'Accounting firms, agencies, strategy consultants, RevOps teams. HubSpot, Salesforce, Xero, Notion, Slack. We run role-based workshops for account managers, analysts, BDRs and partners on ChatGPT, Claude, Copilot, Cursor and Notion AI, then layer a policy draft so client-data exposure is controlled before anyone ships work to a public model.',
      },
      {
        label: 'Allied health practitioners',
        headline: 'AI for the front desk and the clinical admin.',
        copy: 'Physios, psychologists, osteopaths, podiatrists, GPs. Cliniko, Halaxy or Nookal runs bookings, HICAPS handles claiming. We train front-desk and practitioner staff on AI-assisted inbound replies, intake summarisation and referral drafting with ChatGPT and Claude, written to fit the Australian Privacy Act, health-sector standards and the practice management tool you already run.',
      },
    ],

    processHeadline: 'Assess, plan, train, stay for three months.',

    comparisonCopy: 'Most Australian small businesses have sat through a ChatGPT Enterprise pitch, a Microsoft Copilot demo and a Big-4 consultancy one-pager. Nothing changed afterward.',
    comparisonRows: [
      { label: 'Vendor-neutral tool recommendations',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Role-specific workshops on real data',           uc: true,  manual: false, generic: false, agency: true  },
      { label: 'Policy and governance framework included',       uc: true,  manual: false, generic: false, agency: true  },
      { label: 'Delivered in weeks on a fixed timeline',         uc: true,  manual: true,  generic: true,  agency: false },
      { label: 'Post-engagement office hours for 3 months',      uc: true,  manual: false, generic: false, agency: false },
      { label: 'Small-business engagement pricing',              uc: true,  manual: true,  generic: true,  agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Figuring It Out Internally', 'Vendor Training', 'Big-4 Consultancies'],

    faqs: [
      {
        q: 'How to use AI to improve a small business?',
        a: 'Start with three tasks you do every week that are slow, repeatable and low-risk: for example drafting quotes, writing follow-up emails, cleaning up job notes or researching prospects. Run a two-week pilot on ChatGPT or Claude with clear success criteria, then expand to the tools that earn their seat. UnderCurrent Automations runs this as a structured AI Strategy and Training engagement in Australia, covering assessment, a 90-day roadmap, vendor-neutral tool selection across ChatGPT, Claude, Copilot, Cursor and Notion AI, and hands-on workshops so the team adopts the work rather than bookmarks it.',
      },
      {
        q: 'How do small business owners use AI?',
        a: 'Owners of Australian small businesses use AI for three recurring jobs: drafting client-facing writing (quotes, proposals, follow-ups, social posts), making sense of incoming information (long emails, meeting notes, PDFs, spreadsheets) and automating small decisions (lead triage, invoice chasing, review replies). The common stack is ChatGPT or Claude for writing, Microsoft Copilot or Gemini in Office or Google Workspace for documents, and n8n or Zapier wired to Xero, HubSpot, ServiceM8 or Cliniko for the automated parts.',
      },
      {
        q: 'What is AI training for employees?',
        a: 'AI training for employees is role-specific, hands-on work that teaches staff how to use tools like ChatGPT, Claude, Microsoft Copilot and Notion AI on the jobs they do every day, with the data they handle every day, under a written policy that defines what can go into a public model and what cannot. UnderCurrent Automations delivers AI training for employees as half-day or full-day workshops for sales, ops, finance, marketing and leadership teams across Australia, producing a prompt library and a policy draft the team keeps using after the session.',
      },
      {
        q: 'How to teach employees how to use AI?',
        a: 'Run structured training in three stages, not a single all-hands demo. First, general AI literacy so the team understands how ChatGPT, Claude, Gemini and Copilot differ and what each is good at. Second, role-specific workshops where each team builds a prompt library on real tasks (a BDR on outreach, an accountant on reconciliations, a physio on intake notes). Third, a written AI policy covering data handling and approved tools, reviewed monthly. UnderCurrent Automations packages this as a three-stage training program for Australian small businesses, with three months of monthly office hours to correct drift and answer questions as usage scales.',
      },
      {
        q: 'What type of AI is good for business?',
        a: 'For Australian small businesses the useful categories are three. First, general-purpose assistants (ChatGPT, Claude, Gemini) for writing, research and structured-data tasks. Second, productivity-embedded AI (Microsoft Copilot in Office 365, Gemini in Google Workspace, Notion AI) for in-context drafting and review. Third, workflow and agent AI (OpenAI and Anthropic APIs wired through n8n, Zapier or Make) for actions that run without a human triggering every step. We pick the mix per business based on stack, budget and team literacy, and document the decision so nothing is locked to one vendor.',
      },
      {
        q: 'Why do 85% of AI projects fail?',
        a: 'The 85% figure, commonly cited from Gartner and RAND Corporation analyses, covers AI projects that never reach production or are abandoned within twelve months. The usual causes sit upstream of model capability: weak data readiness, unclear success metrics, no named internal owner, no change-management plan. UnderCurrent Automations addresses these with a current-state assessment, three to five measurable outcomes defined upfront, role-specific workshops that build owner habits, and three months of office hours so drift is caught before adoption dies.',
      },
      {
        q: 'Who can run AI strategy and training for my team in Australia?',
        a: 'UnderCurrent Automations runs AI strategy and training for Australian business teams, based in Melbourne. We deliver a current-state assessment, a 90-day implementation roadmap, vendor-neutral tool selection across ChatGPT, Claude and Microsoft Copilot, role-specific workshops where each team builds a working prompt library, and three months of monthly office hours to correct drift after the sessions. Most engagements run six to eight weeks from kick-off. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'Adopt AI without burning a quarter on pilots that stall.',
    ctaCopy: 'Book a free 30-minute call. We walk through what the team already uses, what is working and what is not, then sketch what a focused 90-day AI Strategy and Training engagement looks like for your business. No deck, no pitch.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Personal System Automation', path: '/personal-system-automation' },
      { label: 'Custom Integrations', path: '/custom-integrations' },
    ],

    bluf: 'AI Strategy and Training is a structured advisory engagement that turns scattered AI use into a plan a team adopts. UnderCurrent Automations delivers it from Melbourne to Australian small businesses: current-state assessment, 90-day roadmap, vendor-neutral tool picks across ChatGPT, Claude and Copilot, role-based workshops, and three months of office hours.',

    pipelineStages: [
      { n: '01', label: 'Assessed',    sub: 'Tools, data readiness, policy, literacy' },
      { n: '02', label: 'Prioritised', sub: 'Use cases ranked by ROI, effort, data fit' },
      { n: '03', label: 'Planned',     sub: '90-day roadmap, tool shortlist, budget band' },
      { n: '04', label: 'Trained',     sub: 'Role-based workshops, prompt library built in the room' },
      { n: '05', label: 'Governed',    sub: 'Policy draft, data handling, model access' },
      { n: '06', label: 'Supported',   sub: 'Three months of monthly office hours, drift correction' },
    ],

    integrations: [
      'ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'GitHub Copilot',
      'Cursor', 'Notion AI', 'Perplexity', 'Cohere', 'Mistral',
      'Ollama', 'Azure OpenAI', 'AWS Bedrock', 'Anthropic API', 'OpenAI API',
      'Zapier', 'n8n', 'Make', 'Loom', 'Otter.ai',
    ],

    pricingTiers: [
      { name: 'Workshop', priceFrom: 'from AUD $2,500',  tag: 'Single session',    desc: 'A half-day role-based workshop for a team of up to 15. Prompt library, playbook and session recording included. Good entry point before a full engagement.' },
      { name: 'Roadmap',  priceFrom: 'from AUD $5,000',  tag: 'Assessment + plan', desc: 'Full assessment, 90-day roadmap, vendor-neutral tool selection, two role-based workshops and a written AI policy draft. The standard small-business engagement.' },
      { name: 'Program',  priceFrom: 'Contact for quote', tag: 'Team-wide',        desc: 'Roadmap plus role-based workshops for up to four teams, executive coaching, and three months of monthly office hours. Fits 20 to 100-person businesses.' },
    ],
  },

  {
    slug: 'custom-integrations',
    id: 'custom-integrations',
    seedQueries: [
      'custom api integration small business',
      'software integration services',
      'connect saas tools business',
      'custom workflow integration',
      'business tool integration services',
      'bespoke software integration',
    ],
    index: '10',
    label: 'CUSTOM INTEGRATIONS',
    displayName: 'Custom Integrations',

    accentColor: '#8FAF9F',

    metaTitle: 'Custom Integrations Australia',
    metaDescription: 'Custom Integrations wire every tool in an Australian small business via n8n, Make, Zapier and direct APIs. UnderCurrent Automations Melbourne scopes and ships.',

    heroPill: 'Custom Integrations',

    deliversHeadline: 'One connected system, not ten disconnected subscriptions.',
    whatWeDeliver: [
      'Workflow builds on n8n (self-hosted or cloud), Make, Zapier and Pipedream',
      'Direct API integrations in Node.js or Python when a no-code platform will not do the job',
      'Webhook plumbing: receive, transform, route and retry, with full audit trails in every step',
      'OAuth and API-key management across every vendor your workflows touch, stored in your account',
      'Multi-step AI agent systems using OpenAI, Anthropic and Cohere APIs wired into your business data',
      'Error handling and alerting into Slack, email or PagerDuty the moment a workflow breaks',
      'Documentation: every integration ships with a diagram, a runbook and a named maintainer',
      'Monthly monitoring retainer for workflows that touch revenue, with SLA-backed fixes',
    ],

    industriesCopy: 'If your stack is a collection of tools that should be a system, and the gap between them is costing a day a week in manual work, this is the discipline we run. Common across tradies, business services, consultants and allied health practices in Australia.',
    industries: [
      {
        label: 'Tradies and field services',
        headline: 'Stop re-typing the same job four times.',
        copy: 'Plumbers, electricians, builders, logistics crews. ServiceM8 or Jobber runs the job, Xero sends the invoice, Gmail handles the client reply, and someone on your team rekeys the address into each one. We wire job-management, accounting, CRM, SMS and calendar so a job flows end-to-end without duplicate data entry.',
      },
      {
        label: 'Business services and consultants',
        headline: 'The integration your SaaS vendor has not shipped.',
        copy: 'Accounting firms, agencies, strategy consultants, RevOps teams. Stripe into HubSpot with custom segmentation, Clio into Xero, Notion into Slack with approval flows, your internal tool into the vendor that should have shipped the integration already. We build what the roadmap never will.',
      },
      {
        label: 'Allied health practices',
        headline: 'Clinic admin that does not eat your Friday.',
        copy: 'Physios, psychologists, osteopaths, podiatrists. Cliniko, Halaxy or Nookal runs bookings, HICAPS handles claiming, Xero does the books, and a patient-email tool sends reminders. We connect all of it, then layer an AI agent on top for inbound enquiries using OpenAI or Anthropic APIs wired into your n8n workflow.',
      },
    ],

    processHeadline: 'Scope, build, document, monitor. Then it runs.',

    comparisonCopy: 'Most businesses have tried a Zapier subscription, a half-built integration from a freelancer, or waited 18 months for a vendor to ship something.',
    comparisonRows: [
      { label: 'Works when an API has no ready-made connector',     uc: true,  manual: false, generic: false, agency: false },
      { label: 'Handles auth, retries and error routing properly',  uc: true,  manual: false, generic: true,  agency: true  },
      { label: 'Documented diagrams and runbooks on handover',      uc: true,  manual: false, generic: false, agency: false },
      { label: 'Self-hosting option (n8n, no per-task fees)',       uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Includes AI agent orchestration',                   uc: true,  manual: false, generic: false, agency: false },
      { label: 'Fixable by another dev after we leave',             uc: true,  manual: true,  generic: true,  agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'DIY Zapier', 'No-Code Only', 'Dev Freelancer'],

    faqs: [
      {
        q: 'What does custom integration mean?',
        a: 'A custom integration is a workflow UnderCurrent Automations builds to sync non-standard data between tools via APIs, webhooks, or platforms like n8n, Make and Zapier. It is custom because a generic connector either does not exist, or the one that does misses the fields and rules your business runs on. The result is one connected system instead of staff retyping data between ServiceM8, Xero, HubSpot, Cliniko or whatever stack you already pay for.',
      },
      {
        q: 'What are software integration services?',
        a: 'Software integration services connect two or more business tools so data, triggers and actions flow between them without manual copy-paste. The work covers scoping the APIs involved, choosing a platform (n8n, Make, Zapier) or writing direct code (Node.js, Python), handling authentication, routing errors, and documenting the result. For Australian small businesses, the goal is usually fewer subscriptions acting as islands and more revenue-critical steps happening on their own.',
      },
      {
        q: 'When should I use n8n vs Make vs Zapier?',
        a: 'Zapier for simple one-to-one triggers between popular apps when speed-to-live matters more than cost. Make when a workflow has branching, loops and five or more steps and running cost starts to matter. n8n when you want self-hosting, full JavaScript in nodes, or to avoid per-task fees at high volume. We recommend based on your usage pattern and budget, not vendor preference.',
      },
      {
        q: 'What are examples of integration tools?',
        a: 'The three most common for Australian small businesses are n8n, Make and Zapier. Beyond those, Pipedream and Workato cover heavier iPaaS work, and direct SDKs in Node.js or Python handle anything with a strange auth flow or no public connector. Typical stacks we join include HubSpot, Salesforce, Stripe, Xero, ServiceM8, Jobber, Notion and Supabase, plus Cliniko and HICAPS on the allied health side.',
      },
      {
        q: 'Can you build AI agents, not just integrations?',
        a: 'Yes. Many of our integrations now include an AI layer: a GPT-4 call inside an n8n workflow, a Claude-powered research step, a multi-agent system that handles inbound leads. We use OpenAI, Anthropic and Cohere APIs directly and wire them into your existing tools, so the agent can read a CRM, send an email and write to a database, not just answer in a chat window.',
      },
      {
        q: 'What happens when an API changes or breaks?',
        a: 'Every workflow ships with error routing and alerting into Slack, email or PagerDuty. For workflows that touch revenue, our monthly monitoring retainer covers detection, diagnosis and fix within a defined SLA. For one-off builds, we hand over documentation and a runbook so your team, or any other developer, can repair it without us. Nothing is locked to UnderCurrent, you own every credential and every workflow export.',
      },
      {
        q: 'How long until a custom integration goes live?',
        a: 'A single-flow integration on n8n, Make or Zapier is usually scoped, built and documented in 1 to 2 weeks. A multi-system workflow across 4 to 8 tools with error routing and an AI step runs 3 to 5 weeks depending on vendor API complexity. Direct API builds in Node.js or Python are project-priced with their own timeline. We move in weeks, not months, and scope the dates in writing before anyone commits.',
      },
      {
        q: 'Who builds custom integrations in Melbourne?',
        a: 'UnderCurrent Automations builds custom integrations in Melbourne for Australian small businesses. We connect the tools you already run, HubSpot, Xero, ServiceM8, Stripe, Cliniko and others, via APIs, webhooks and platforms like n8n, Make and Zapier, with AI agent steps layered in where the workflow needs to act rather than just move data. A single-flow integration is scoped and live within one to two weeks. Book a free 30-minute call: https://cal.com/luke-marinovic-aqeosc/30min',
      },
    ],

    ctaHeadline: 'Connect the stack. Stop the duplicate data entry.',
    ctaCopy: 'Book a free 30-minute call. We map your stack, find the integration gaps costing hours each week, and show you what the wired-up version looks like before you commit.',

    internalLinks: [
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Personal System Automation', path: '/personal-system-automation' },
      { label: 'Finance Automation', path: '/finance-automation' },
    ],

    bluf: 'Custom Integrations are workflows that sync non-standard data between the tools a business already runs on, built via APIs, webhooks and platforms like n8n, Make, Zapier and Pipedream. UnderCurrent Automations, based in Melbourne, scopes, builds, documents and monitors each integration so Australian small businesses run one connected system instead of ten disconnected subscriptions, with AI agent orchestration layered on top when the workflow needs to act, not just move data.',

    pipelineStages: [
      { n: '01', label: 'Scoped',      sub: 'Tools, APIs, volume, error tolerance' },
      { n: '02', label: 'Designed',    sub: 'Platform choice: n8n, Make, Zapier, custom' },
      { n: '03', label: 'Built',       sub: 'Workflows, OAuth, webhooks, retries' },
      { n: '04', label: 'Tested',      sub: 'Happy path, edge cases, failure modes' },
      { n: '05', label: 'Documented',  sub: 'Diagram, runbook, credentials handover' },
      { n: '06', label: 'Monitored',   sub: 'Alerts, SLA, optional monthly retainer' },
    ],

    integrations: [
      'n8n', 'Make', 'Zapier', 'Pipedream', 'Node.js',
      'Python', 'OpenAI API', 'Anthropic API', 'Cohere', 'Webhook.site',
      'HubSpot', 'Salesforce', 'Stripe', 'Xero', 'ServiceM8',
      'Jobber', 'Notion', 'Airtable', 'Supabase', 'PostgreSQL',
    ],

    pricingTiers: [
      { name: 'Single flow',   priceFrom: 'from AUD $1,500',   tag: 'One integration',    desc: 'A single workflow on n8n, Make or Zapier. Scoped, built, tested, documented. Good fit for a Stripe-to-CRM sync or a web-form-to-Slack alert.' },
      { name: 'Multi-system',  priceFrom: 'from AUD $4,500',   tag: 'Workflow bundle',    desc: 'A connected set of workflows across 4 to 8 tools with error routing and an AI step where useful. The standard small-business integration project.' },
      { name: 'Monitored',     priceFrom: 'from AUD $800/mo',  tag: 'Ongoing',            desc: 'Monthly retainer for workflows that touch revenue: monitoring, SLA-backed fixes, iteration, new integration additions. Requires an initial build.' },
    ],
  },
]

export function getService(slug) {
  return SERVICES.find(s => s.slug === slug) || null
}
