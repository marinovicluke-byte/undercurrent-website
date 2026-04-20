// components/ui/Button.js
import Link from 'next/link'

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-block px-6 py-3 text-sm font-body font-medium border-2'
  const variants = {
    primary: 'bg-charcoal text-white border-charcoal btn-pop',
    secondary: 'bg-white text-charcoal border-white btn-pop',
    outline: 'bg-transparent text-charcoal border-charcoal btn-pop-outline',
    ghost: 'border-transparent text-charcoal hover:text-orange',
    'ghost-light': 'border-white/20 text-white/70 hover:text-white hover:border-white/40',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <Link href={href} className={cls} {...props}>{children}</Link>
  }
  return <button className={cls} {...props}>{children}</button>
}
