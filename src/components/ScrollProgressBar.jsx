import { useEffect, useRef } from 'react'

export default function ScrollProgressBar() {
  const barRef = useRef(null)
  const rafRef = useRef(null)
  const scrollYRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateBar = () => {
      const scrollTop = scrollYRef.current
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
      ticking.current = false
    }

    const onScroll = () => {
      scrollYRef.current = window.scrollY
      if (!ticking.current) {
        ticking.current = true
        rafRef.current = requestAnimationFrame(updateBar)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9997,
        backgroundColor: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#8FAF9F',
          opacity: 0.7,
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
