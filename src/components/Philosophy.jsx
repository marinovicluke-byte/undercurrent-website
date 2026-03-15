import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word reveal for line 1
      const words1 = line1Ref.current.querySelectorAll('.word')
      gsap.fromTo(words1,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )

      // Word-by-word reveal for line 2
      const words2 = line2Ref.current.querySelectorAll('.word')
      gsap.fromTo(words2,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words1 = 'Most businesses buy software and hope it works.'.split(' ')
  const words2 = ['We', 'architect', 'the', 'system', 'underneath.']

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-20 px-6 md:px-12 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C1C1A 0%, #1E2B18 30%, #192620 60%, #1C1C1A 100%)' }}
    >
      {/* Warm texture behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=60&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <p className="font-dm mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: '#6B7C4A' }}>
          OUR PHILOSOPHY
        </p>

        {/* Line 1 */}
        <div ref={line1Ref} className="mb-6" style={{ overflow: 'hidden' }}>
          <p
            className="font-dm"
            style={{ fontWeight: 300, fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: '#D4C9B0', lineHeight: 1.6 }}
          >
            {words1.map((word, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.35em', opacity: 0 }}>
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref} style={{ overflow: 'hidden' }}>
          <h2
            className="font-cormorant italic"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#F7F3ED',
            }}
          >
            {words2.map((word, i) => (
              <span
                key={i}
                className="word"
                style={{
                  display: 'inline-block',
                  marginRight: i < words2.length - 1 ? '0.3em' : 0,
                  opacity: 0,
                  color: word === 'system' ? '#8FAF9F' : '#F7F3ED',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Divider */}
        <div
          className="mt-16 pt-16 border-t flex flex-col md:flex-row gap-8 md:gap-16"
          style={{ borderColor: '#D4C9B020' }}
        >
          {[
            { num: '01', label: 'Map your workflows' },
            { num: '02', label: 'Design the architecture' },
            { num: '03', label: 'Deploy and maintain' },
          ].map(item => (
            <div key={item.num} className="flex items-center gap-4">
              <span className="font-mono text-charcoal/30" style={{ fontSize: '0.7rem', color: '#D4C9B040' }}>
                {item.num}
              </span>
              <span className="font-dm text-warm-sand" style={{ fontWeight: 300, fontSize: '0.95rem', color: '#D4C9B0' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
