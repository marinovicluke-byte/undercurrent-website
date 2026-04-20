import MissedRevenueAudit from '@/components/audit/MissedRevenueAudit'

export const metadata = {
  title: 'Missed Revenue Audit',
  description: "Find out how much revenue you're leaving on the table from slow follow-ups and manual processes.",
}

export default function MissedRevenuePage() {
  return <MissedRevenueAudit />
}
