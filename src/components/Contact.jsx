import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 95%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 px-6 md:px-12"
      style={{ backgroundColor: '#E8E0D0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="max-w-2xl">
          <p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
            READY TO START
          </p>
          <h2
            className="font-cormorant italic text-charcoal mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            What would you do with 10 hours back every week?
          </h2>
          <p className="font-dm text-charcoal/60 mb-10" style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '480px' }}>
            Book a free 30-minute call. We'll show you exactly where your time is going and what it would look like to get it back. No obligation — just a clear picture.
          </p>
          <a
            href="https://cal.com/luke-marinovic-aqeosc/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sage"
            style={{ fontSize: '0.95rem', padding: '0.875rem 2.5rem' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Your Free Workflow Review
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
