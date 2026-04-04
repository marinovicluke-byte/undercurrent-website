// components/ui/Badge.js
export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block rounded-full bg-surface px-3 py-1 text-xs font-body text-muted ${className}`}>
      {children}
    </span>
  )
}
