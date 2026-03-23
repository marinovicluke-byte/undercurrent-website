import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Reveal({
  children,
  delay = 0,
  className = '',
  style = {},
  y = 20,
  duration = 0.45,
  rootMargin = '0px 0px 150px 0px'
}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(el,
          { y, opacity: 0 },
          { y: 0, opacity: 1, duration, ease: 'power3.out', delay }
        )
        observer.disconnect()
      }
    }, { threshold: 0, rootMargin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, y, duration, rootMargin])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}
