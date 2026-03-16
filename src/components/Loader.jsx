import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const containerRef = useRef(null)
  const wordmarkRef = useRef(null)
  const sublabelRef = useRef(null)
  const progressTrackRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.()
      }
    })

    // Initial state — set immediately
    gsap.set([wordmarkRef.current, sublabelRef.current, progressTrackRef.current], {
      opacity: 0,
    })
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' })

    tl
      // Wordmark fades in
      .to(wordmarkRef.current, {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      })
      // Sublabel fades in alongside wordmark tail
      .to(sublabelRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1')
      // Progress track appears
      .to(progressTrackRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.2')
      // Progress bar fills left to right
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '<')
      // Entire loader fades out
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      })
      // Remove from layout
      .set(containerRef.current, { display: 'none' })

    return () => tl.kill()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#E8E0D0',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}
    >
      {/* Wordmark */}
      <div
        ref={wordmarkRef}
        style={{ textAlign: 'center', opacity: 0 }}
      >
        {/* Wave brand icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 48 48"
          style={{ display: 'block', margin: '0 auto 0.9rem' }}
        >
          <rect width="48" height="48" rx="10" fill="#1C1C1A"/>
          <path d="M6 17 C10 12, 14 12, 18 17 C22 22, 26 22, 30 17 C34 12, 38 12, 42 17" stroke="#8FAF9F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M6 24 C10 19, 14 19, 18 24 C22 29, 26 29, 30 24 C34 19, 38 19, 42 24" stroke="#8FAF9F" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65"/>
          <path d="M6 31 C10 26, 14 26, 18 31 C22 36, 26 36, 30 31 C34 26, 38 26, 42 31" stroke="#8FAF9F" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35"/>
        </svg>
        <span
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#1C1C1A',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            display: 'block',
          }}
        >
          UnderCurrent
        </span>
      </div>

      {/* Sublabel */}
      <div
        ref={sublabelRef}
        style={{ textAlign: 'center', opacity: 0, marginTop: '0.75rem' }}
      >
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#1C1C1A60',
            display: 'block',
          }}
        >
          AI Business Automation
        </span>
      </div>

      {/* Progress bar track */}
      <div
        ref={progressTrackRef}
        style={{
          marginTop: '3rem',
          width: 'min(240px, 50vw)',
          height: '1px',
          backgroundColor: 'rgba(28,28,26,0.12)',
          borderRadius: '9999px',
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#8FAF9F',
            borderRadius: '9999px',
            transformOrigin: 'left center',
          }}
        />
      </div>
    </div>
  )
}
