// Service page data — one entry per service
// Each entry renders a full SEO-optimised ServicePage
// Structured for easy expansion to new services

export const SERVICES = [
  {
    slug: 'customer-experience-automation',
    id: 'customer-experience',
    index: '01',
    label: 'CUSTOMER EXPERIENCE',

    // Visual variant — controls hero headline font order
    // 'default'   : DM Sans bold line 1, Cormorant italic line 2
    // 'editorial' : Cormorant italic line 1, DM Sans bold line 2
    // 'mono'      : DM Mono line 1, Cormorant italic line 2
    heroVariant: 'editorial',

    accentColor: '#8FAF9F',

    // SEO
    metaTitle: 'Customer Experience Automation Melbourne | UnderCurrent',
    metaDescription: 'Turn every new client into a loyal advocate. UnderCurrent builds automated onboarding, check-in, review, and referral systems for Melbourne small businesses.',

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
  },

  {
    slug: 'sales-automation',
    id: 'sales',
    index: '02',
    label: 'SALES',

    heroVariant: 'default',
    accentColor: '#6B7C4A',

    metaTitle: 'Sales Automation Melbourne — More Pipeline, Same Team | UnderCurrent',
    metaDescription: 'Stop losing leads to slow follow-up. UnderCurrent builds automated lead capture, outreach, and CRM pipeline systems that keep your sales moving around the clock.',

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
    ],

    ctaHeadline: 'Your pipeline should not depend on who remembered to follow up.',
    ctaCopy: 'Book a free 30-minute call. We will walk through your current pipeline, find where leads are slipping through, and show you what an automated version looks like.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
      { label: 'Content Automation', path: '/content-automation' },
    ],
  },

  {
    slug: 'content-automation',
    id: 'content-design',
    index: '03',
    label: 'CONTENT',

    heroVariant: 'mono',
    accentColor: '#8FAF9F',

    metaTitle: 'Content Automation Melbourne — Publish More, Write Less | UnderCurrent',
    metaDescription: 'Stop spending 10 hours a week on content that never gets done. UnderCurrent builds content pipelines that take a brief or recording and publish across every channel automatically.',

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
    ],
  },

  {
    slug: 'personal-system-automation',
    id: 'personal-system',
    index: '04',
    label: 'PERSONAL SYSTEM',

    heroVariant: 'editorial',
    accentColor: '#8FAF9F',

    metaTitle: 'Personal System Automation Melbourne — Inbox and Calendar, Handled | UnderCurrent',
    metaDescription: 'Stop losing 3 to 4 hours a day to email and admin. UnderCurrent builds AI-powered inbox, calendar, and task management systems that give Melbourne business owners their time back.',

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
  },

  {
    slug: 'finance-automation',
    id: 'finance',
    index: '05',
    label: 'FINANCE',

    heroVariant: 'default',
    accentColor: '#A89F7A',

    metaTitle: 'Finance Automation Melbourne — Stop Chasing Invoices | UnderCurrent',
    metaDescription: 'Automate your invoice creation, payment follow-up, expense tracking and cash flow reporting. UnderCurrent builds finance automation for Melbourne small businesses.',

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
  },

  {
    slug: 'inbound-lead-management-melbourne',
    id: 'inbound-lead-mgmt',
    index: '06',
    label: 'INBOUND LEAD MANAGEMENT',

    heroVariant: 'outfit',
    heroMockup: true,
    accentColor: '#8FAF9F',

    metaTitle: 'Inbound Lead Management Melbourne — Stop Losing Paid Enquiries | UnderCurrent',
    metaDescription: 'Melbourne tradespeople and service businesses: stop losing paid leads. UnderCurrent builds done-for-you inbound lead management systems that capture, qualify and follow up every enquiry until it is booked.',

    heroPill: 'Inbound Lead Management',
    heroHeadline1: 'Stop losing money on',
    heroHeadline2: 'wasted leads.',
    heroCopy: 'If you\'re already paying for ads or getting regular web enquiries, the real problem isn\'t lead generation, it\'s what happens after the enquiry. We build a simple inbound lead management system that captures every enquiry, follows it up automatically, and turns more of your existing leads into booked jobs.',

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
    industriesCopy: 'You\'re already getting leads. The issue is the handoff between enquiry and booking. If leads land in different inboxes, get followed up from memory, or get missed when you\'re on the job, this system is built for you.',
    industries: [
      {
        label: 'Trades',
        headline: 'Quote every enquiry. Win more jobs.',
        copy: 'Plumbers, electricians, builders, roofers. Enquiries hit at 7pm and fall through the cracks by morning. We capture every inbound lead, send an immediate acknowledgement, and trigger a follow-up sequence before your competitors respond.',
        animType: 'jobflow',
      },
      {
        label: 'Home Services',
        headline: 'No more leads lost to a slow reply.',
        copy: 'Cleaners, landscapers, pest control, handyman services. Most customers contact two or three providers. The one who responds first usually wins the job. We make sure that\'s you, every time.',
        animType: 'jobflow',
      },
      {
        label: 'Specialist Services',
        headline: 'Every enquiry tracked from first contact to booking.',
        copy: 'Physios, mechanics, mobile services, specialist contractors. Your schedule fills from inbound demand, but too many enquiries disappear in the follow-up gap. We close that gap with a simple automated system.',
        animType: 'jobflow',
      },
    ],

    processStyle: 'vertical',
    processLabel: 'HOW IT WORKS',
    processHeadline: 'Three steps. Then it runs itself.',

    comparisonLabel: 'WHY UNDERCURRENT',
    comparisonHeadline: 'The smarter alternative to losing paid leads.',
    comparisonCopy: 'If you\'re already spending to generate leads, here is why the problem is not more leads, it\'s what happens to the ones you already have.',
    comparisonRows: [
      { label: 'Captures every enquiry automatically',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Follows up leads before they go cold',            uc: true,  manual: false, generic: false, agency: false },
      { label: 'Shows exactly where leads are dropping off',      uc: true,  manual: false, generic: true,  agency: false },
      { label: 'Works with tools you already use',                uc: true,  manual: true,  generic: false, agency: false },
      { label: 'No new software or tech headache',                uc: true,  manual: true,  generic: false, agency: false },
      { label: 'Done-for-you setup, live within days',            uc: true,  manual: false, generic: false, agency: false },
    ],
    comparisonColumns: ['UnderCurrent', 'Doing It Manually'],

    faqLabel: 'COMMON QUESTIONS',
    faqHeadline: 'Questions people ask before getting started.',
    faqs: [
      {
        q: 'What if I\'m already getting leads but nothing is set up?',
        a: 'That\'s exactly who this is built for. Most businesses have enquiries coming in from multiple places, web forms, Google Ads, Facebook, direct calls, but no single view of them. We connect everything into one simple pipeline so nothing gets missed.',
      },
      {
        q: 'What tools does this connect to?',
        a: 'We work with whatever you already use. Google, Meta, website contact forms, email, Jobber, ServiceM8, and others. If you don\'t have a CRM yet, we\'ll help you choose a lightweight one that fits your business and won\'t add overhead.',
      },
      {
        q: 'How quickly does follow-up go out after an enquiry?',
        a: 'Within minutes of the enquiry coming in. The system sends an immediate acknowledgement to the lead and notifies you or your admin so someone can action it. Speed of response is one of the biggest factors in winning a job.',
      },
      {
        q: 'Does my team need to learn new software?',
        a: 'No. We build around what you already use and keep the pipeline view as simple as possible. Most clients manage their leads from a single shared screen or even their phone. The system does the heavy lifting, your team just takes action.',
      },
      {
        q: 'How long before it\'s live?',
        a: 'Most inbound lead systems go live within 7 to 10 days of our first call. The first session is discovery, we go through your current lead flow, sources, and follow-up process. The build follows from there.',
      },
      {
        q: 'What if I want to review things before the system sends anything?',
        a: 'We can configure it either way. Some clients prefer a notification-only setup where the system captures and organises leads but a human sends every message. Others want full automation from day one. We match the level of automation to your comfort.',
      },
    ],

    ctaHeadline: 'Find out how many leads you\'re actually wasting.',
    ctaCopy: 'If even a handful of enquiries slip through each month, that\'s real revenue you\'ve already paid to generate. On the call, we\'ll review your current lead flow, highlight the biggest leaks, and outline how this system could work for your business. No pressure, no jargon, just clarity and options.',

    internalLinks: [
      { label: 'AI Automation Melbourne', path: '/ai-automation-melbourne' },
      { label: 'Sales Automation', path: '/sales-automation' },
      { label: 'Customer Experience Automation', path: '/customer-experience-automation' },
    ],
  },
]

export function getService(slug) {
  return SERVICES.find(s => s.slug === slug) || null
}
