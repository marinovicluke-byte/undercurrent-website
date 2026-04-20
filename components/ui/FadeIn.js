// components/ui/FadeIn.js
'use client'
import { useEffect, useRef } from 'react'

export default function FadeIn({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.remove('fade-hidden')
          el.classList.add('fade-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`fade-hidden ${className}`} {...props}>
      {children}
    </Tag>
  )
}
