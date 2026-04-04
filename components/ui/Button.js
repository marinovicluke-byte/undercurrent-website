// components/ui/Button.js
import Link from 'next/link'

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-block rounded-md px-6 py-3 text-sm font-body font-medium transition-colors'
  const variants = {
    primary: 'bg-charcoal text-white hover:bg-blue',
    secondary: 'border border-charcoal text-charcoal hover:bg-surface',
    ghost: 'text-charcoal hover:text-blue',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <Link href={href} className={cls} {...props}>{children}</Link>
  }
  return <button className={cls} {...props}>{children}</button>
}
