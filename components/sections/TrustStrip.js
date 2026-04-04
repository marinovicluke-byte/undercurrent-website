// components/sections/TrustStrip.js
const STATS = [
  { value: '47+', label: 'Automations deployed' },
  { value: '2,100+', label: 'Hours saved per month' },
  { value: '3–5 days', label: 'Average delivery time' },
  { value: '100%', label: 'Client ownership' },
]

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface py-section-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-charcoal">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
