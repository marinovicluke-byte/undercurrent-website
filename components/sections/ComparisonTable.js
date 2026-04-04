// components/sections/ComparisonTable.js
import FadeIn from '@/components/ui/FadeIn'

const ROWS = [
  { label: 'Cost',      diy: 'Free / cheap', agency: '$5–15K/mo', uc: 'From $1,500 project' },
  { label: 'Setup',     diy: 'Weeks/months', agency: 'Weeks',      uc: '3–5 days' },
  { label: 'Ownership', diy: 'You build it', agency: 'They own it',uc: 'You own it' },
  { label: 'Support',   diy: 'Forums / YouTube', agency: 'Account manager', uc: 'Direct access' },
  { label: 'Results',   diy: 'Depends on your skills', agency: 'Generic templates', uc: 'Built for your workflow' },
]

export default function ComparisonTable() {
  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">How we compare</h2>
          <p className="mt-4 max-w-xl text-muted">
            There are three ways to get your business automated. Here&apos;s an honest look at each.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-6 text-left font-body text-muted font-normal w-32"></th>
                  <th className="py-4 px-6 text-left font-display font-bold text-charcoal">DIY</th>
                  <th className="py-4 px-6 text-left font-display font-bold text-charcoal">Big Agency</th>
                  <th className="py-4 px-6 text-left font-display font-bold text-blue">UnderCurrent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 pr-6 font-body text-muted">{row.label}</td>
                    <td className="py-4 px-6 text-charcoal">{row.diy}</td>
                    <td className="py-4 px-6 text-charcoal">{row.agency}</td>
                    <td className="py-4 px-6 font-medium text-charcoal">{row.uc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
