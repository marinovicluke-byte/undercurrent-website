import ROICalculator from '@/components/audit/ROICalculator'

export const metadata = {
  title: 'ROI Calculator',
  description: 'Calculate the return on investment from automating your business processes.',
  robots: { index: false, follow: false },
}

export default function ROIPage() {
  return <ROICalculator />
}
