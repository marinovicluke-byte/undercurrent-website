import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Will this work for my type of business?',
    a: "If you run a service business and you have repetitive tasks — yes. We work with coaches, consultants, trades, agencies, and healthcare practices. If you're wearing too many hats, we can help. The free audit tells you exactly how much.",
  },
  {
    q: 'Do I need to learn new software?',
    a: "No. We build everything inside the tools you already use — Gmail, Notion, HubSpot, Slack, whatever you've got. Nothing changes about how you work. We just remove the slow parts.",
  },
  {
    q: 'How long until I see results?',
    a: "Most clients save meaningful time in the first two weeks. Full ROI usually lands within six months. We move fast because we've done this before.",
  },
  {
    q: "What if it doesn't work?",
    a: "That's what the free audit is for. Before we build anything, we show you exactly what we'll automate and how many hours it saves. You see the numbers first. If they don't impress you — walk away, no charge.",
  },
]

// Answer panel with smooth fade+translate transition
function AnswerPanel({ faq, index }) {
  const panelRef = useRef(null)
  const prevIndexRef = useRef(index)

  useEffect(() => {
    if (prevIndexRef.current !== index && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    }
    prevIndexRef.current = index
  }, [index, faq])

  return (
    <div
      ref={panelRef}
      className="rounded-4xl border h-full flex flex-col"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2.75rem' }}
    >
      {/* Decorative question number */}
      <div
        className="font-cormorant mb-6 select-none"
        style={{ fontSize: '5rem', fontWeight: 700, lineHeight: 1, color: '#D4C9B0', letterSpacing: '-0.03em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Thin olive divider */}
      <div className="mb-6" style={{ height: '1px', backgroundColor: '#6B7C4A', width: '2.5rem', opacity: 0.5 }} />

      {/* Question label */}
      <p
        className="font-dm mb-4"
        style={{ fontSize: '0.72rem', letterSpacing: '0.18em', fontWeight: 500, color: '#6B7C4A' }}
      >
        QUESTION {String(index + 1).padStart(2, '0')}
      </p>

      {/* Question text */}
      <h3
        className="font-cormorant text-charcoal mb-5"
        style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}
      >
        {faq.q}
      </h3>

      {/* Answer */}
      <p
        className="font-dm text-charcoal/60"
        style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.75 }}
      >
        {faq.a}
      </p>
    </div>
  )
}

// Mobile accordion item
function AccordionItem({ faq, index, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    if (isOpen) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <div
      className="border-b"
      style={{ borderColor: '#D4C9B0' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start gap-4"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {/* Number */}
        <span
          className="font-cormorant flex-shrink-0"
          style={{ fontSize: '1.1rem', fontWeight: 600, color: '#D4C9B0', lineHeight: 1.4, width: '2rem' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Question */}
        <span
          className="font-dm text-charcoal flex-1"
          style={{ fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.5 }}
        >
          {faq.q}
        </span>

        {/* Toggle indicator */}
        <span
          className="flex-shrink-0 font-dm"
          style={{
            fontSize: '1.25rem',
            fontWeight: 300,
            color: isOpen ? '#6B7C4A' : '#D4C9B0',
            lineHeight: 1,
            transition: 'color 0.25s ease',
            marginTop: '0.1rem',
          }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Answer body — height animated via GSAP */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="pb-5 pl-10 pr-2">
          {/* Olive accent bar */}
          <div className="mb-4" style={{ height: '1px', backgroundColor: '#6B7C4A', width: '2rem', opacity: 0.5 }} />
          <p
            className="font-dm text-charcoal/60"
            style={{ fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.75 }}
          >
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 95%' } }
      )
      gsap.fromTo(
        leftColRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', scrollTrigger: { trigger: leftColRef.current, start: 'top 95%' } }
      )
      gsap.fromTo(
        rightColRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.08, scrollTrigger: { trigger: rightColRef.current, start: 'top 95%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="py-20 px-6 md:px-12" style={{ backgroundColor: '#F7F3ED' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <div ref={headingRef} className="mb-12">
          <p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
            QUESTIONS
          </p>
          <h2
            className="font-cormorant text-charcoal"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 5.5vw, 6rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            You probably have a few questions.<br />Here are the honest answers.
          </h2>
          <p className="font-dm text-charcoal/50 mt-4" style={{ fontSize: '1.05rem', fontWeight: 300, maxWidth: '480px', lineHeight: 1.7 }}>
            Straightforward answers to the questions we hear most.
          </p>
        </div>

        {/* Mobile: Accordion */}
        {isMobile && (
          <div
            ref={leftColRef}
            className="rounded-4xl border"
            style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '1.5rem 1.75rem' }}
          >
            {/* Hidden right col ref placeholder for GSAP */}
            <div ref={rightColRef} style={{ display: 'none' }} />
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        )}

        {/* Desktop: Two-column split */}
        {!isMobile && (
          <div className="grid grid-cols-5 gap-8 items-start">

            {/* Left col: question nav (2/5) */}
            <div ref={leftColRef} className="col-span-2 flex flex-col">
              {faqs.map((faq, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="w-full text-left flex items-start gap-4 py-4 px-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: isActive ? '#EDE8E0' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderLeft: `3px solid ${isActive ? '#6B7C4A' : 'transparent'}`,
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                    }}
                  >
                    {/* Number */}
                    <span
                      className="font-cormorant flex-shrink-0"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: isActive ? '#6B7C4A' : '#D4C9B0',
                        transition: 'color 0.25s ease',
                        width: '1.75rem',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Question text */}
                    <span
                      className="font-dm"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 500 : 400,
                        lineHeight: 1.55,
                        color: isActive ? '#1C1C1A' : 'rgba(28,28,26,0.45)',
                        transition: 'color 0.25s ease, font-weight 0.25s ease',
                      }}
                    >
                      {faq.q}
                    </span>

                    {/* Active indicator arrow */}
                    {isActive && (
                      <span
                        className="flex-shrink-0 font-dm ml-auto"
                        style={{ fontSize: '0.75rem', color: '#6B7C4A', lineHeight: 1.55, opacity: 0.7 }}
                      >
                        →
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right col: answer panel (3/5) */}
            <div ref={rightColRef} className="col-span-3 sticky top-24">
              <AnswerPanel faq={faqs[activeIndex]} index={activeIndex} />
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
