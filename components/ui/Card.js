// components/ui/Card.js
export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-white p-6 ${className}`}>
      {children}
    </div>
  )
}
