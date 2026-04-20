// ─── Response time multipliers (from spec) ────────────────────────────────────
// Sources: Hormozi $100M Leads, MIT/InsideSales, Harvard Business Review
export const RESPONSE_MULTIPLIERS = {
  'lt5':    1.00,  // < 5 min   — full conversion potential
  '5to30':  0.48,  // 5–30 min  — 8x drop (MIT/InsideSales)
  '30to60': 0.14,  // 30–60 min — 21x less likely (InsideSales)
  '1to4h':  0.08,  // 1–4 hrs
  '4to24h': 0.03,  // 4–24 hrs
  '24plus': 0.01,  // 24+ hrs   — 60x less likely (HBR)
}

export const RESPONSE_OPTIONS = [
  { value: 'lt5',    label: '< 5 min' },
  { value: '5to30',  label: '5–30 min' },
  { value: '30to60', label: '30–60 min' },
  { value: '1to4h',  label: '1–4 hrs' },
  { value: '4to24h', label: '4–24 hrs' },
  { value: '24plus', label: '24+ hrs' },
]

// ─── Five pillars ─────────────────────────────────────────────────────────────
export const PILLARS = [
  {
    key: 'customer_experience',
    label: 'Customer Experience',
    subtasks: [
      { key: 'responding_to_enquiries',    label: 'Responding to enquiries (email/SMS/DM)' },
      { key: 'followup_after_quote',       label: 'Follow-up after quote/proposal' },
      { key: 'postwork_followup_review',   label: 'Post-work follow-up & review collection' },
      { key: 'new_client_onboarding',      label: 'New client onboarding' },
      { key: 'complaints_support',         label: 'Handling complaints & support' },
    ],
  },
  {
    key: 'sales',
    label: 'Sales',
    subtasks: [
      { key: 'speed_to_lead_followup',   label: 'Speed-to-lead follow-up' },
      { key: 'proposal_quote_creation',  label: 'Proposal/quote creation' },
      { key: 'crm_pipeline_updates',     label: 'CRM updates & pipeline tracking' },
      { key: 'booking_discovery_calls',  label: 'Booking discovery calls' },
      { key: 'reengaging_cold_leads',    label: 'Re-engaging cold/dormant leads' },
    ],
  },
  {
    key: 'content_design',
    label: 'Content & Design',
    subtasks: [
      { key: 'writing_social_captions',      label: 'Writing social captions & posts' },
      { key: 'creating_graphics',            label: 'Creating graphics & visuals' },
      { key: 'writing_emails_newsletters',   label: 'Writing emails & newsletters' },
      { key: 'repurposing_content',          label: 'Repurposing content across platforms' },
      { key: 'scheduling_publishing',        label: 'Scheduling & publishing' },
    ],
  },
  {
    key: 'personal_systems',
    label: 'Personal Systems',
    subtasks: [
      { key: 'email_inbox_management', label: 'Email inbox management' },
      { key: 'calendar_scheduling',    label: 'Calendar & scheduling' },
      { key: 'meeting_notes_actions',  label: 'Meeting notes & action items' },
      { key: 'admin_document_prep',    label: 'Admin & document prep' },
      { key: 'internal_reporting',     label: 'Internal reporting & data entry' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    subtasks: [
      { key: 'sending_invoices',         label: 'Sending invoices' },
      { key: 'chasing_overdue_payments', label: 'Chasing overdue payments' },
      { key: 'bookkeeping_data_entry',   label: 'Bookkeeping data entry' },
      { key: 'expense_tracking',         label: 'Expense tracking' },
      { key: 'financial_reporting',      label: 'Financial reporting' },
    ],
  },
]

// ─── Industry list ────────────────────────────────────────────────────────────
export const INDUSTRIES = [
  'Trades & Construction',
  'Real Estate',
  'Health & Wellness',
  'Beauty & Personal Care',
  'Professional Services - Legal - Accounting - Finance',
  'Marketing & Creative Agency',
  'Coaching & Consulting',
  'Hospitality & Events',
  'Retail & E-commerce',
  'Education & Training',
  'Technology & Software',
  'Property Management',
  'Other',
]

// ─── Default pillar state ─────────────────────────────────────────────────────
export function defaultPillarState() {
  const state = {}
  for (const pillar of PILLARS) {
    const subtasks = {}
    for (const st of pillar.subtasks) subtasks[st.key] = 0
    state[pillar.key] = { hours: 0, selfRating: null, subtasks }
  }
  return state
}
