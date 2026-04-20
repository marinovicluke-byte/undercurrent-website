// components/ui/Card.js
export default function Card({ children, className = '' }) {
  return (
    <div className={`border-2 border-charcoal bg-white p-6 card-pop ${className}`}>
      {children}
    </div>
  )
}
