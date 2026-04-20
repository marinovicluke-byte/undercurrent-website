import { Suspense } from 'react'
import AuditReport from '@/components/audit/AuditReport'

export const metadata = {
  title: 'Your Automation Audit Report',
  robots: { index: false, follow: false },
}

function AuditReportSkeleton() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-blue" />
    </div>
  )
}

export default function AuditReportPage() {
  return (
    <Suspense fallback={<AuditReportSkeleton />}>
      <AuditReport />
    </Suspense>
  )
}
