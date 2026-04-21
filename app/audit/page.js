import BusinessAuditRedesign from '@/app/audit/_redesign/BusinessAuditRedesign'

export const metadata = {
  title: 'Free Business Automation Audit — UnderCurrent Automations',
  description: 'Find out exactly which parts of your business could be automated. Free, instant results. Built for Australian small businesses.',
  alternates: { canonical: 'https://undercurrentautomations.com/audit' },
  openGraph: {
    title: 'Free Business Automation Audit',
    description: 'Find out exactly which parts of your business could be automated. Free, instant results.',
    url: 'https://undercurrentautomations.com/audit',
    type: 'website',
  },
}

export default function AuditPage() {
  return <BusinessAuditRedesign />
}
