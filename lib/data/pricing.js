// lib/data/pricing.js
export const PRICING_TIERS = [
  {
    name: 'Starter Project',
    price: 'From $1,500',
    description: 'One workflow, built and handed over. Best for a single pain point like lead capture, invoice sending, or appointment follow-ups.',
    features: [
      'Discovery call + scoping',
      'One end-to-end workflow',
      '30 days bug-fix support',
      'Walkthrough recording',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=starter' },
  },
  {
    name: 'Growth Retainer',
    price: 'From $1,200/mo',
    description: 'Ongoing builds and optimisation. Best for businesses ready to systematically remove admin from their operations.',
    features: [
      'Up to 3 new workflows/month',
      'Same-day support',
      'Monthly optimisation call',
      'Priority access',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=growth' },
    featured: true,
  },
  {
    name: 'Done-With-You',
    price: 'From $500/mo',
    description: 'We guide, you build. Best for teams that want to own the process but need an expert to shortcut the learning curve.',
    features: [
      'Weekly strategy session',
      'Build reviews and feedback',
      'Async support via Slack',
      'Template library access',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=dwy' },
  },
]
