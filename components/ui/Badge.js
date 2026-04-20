// components/ui/Badge.js
export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block bg-parchment border border-border px-3 py-1 text-xs font-body text-charcoal ${className}`}>
      {children}
    </span>
  )
}
