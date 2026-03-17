import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    phase: 'Project Fee',
    headline: 'Tailored to your scope.',
    body: 'A one-time cost to map, build, and deploy your automations — scoped to the specific areas we\'re solving for you. Priced on the value it creates, not an hourly rate.',
    detail: 'Scoped to what you actually need.',
    accent: '#8FAF9F',
    tag: 'PROJECT FEE',
  },
  {
    number: '02',
    phase: 'Monthly Subscription',
    headline: 'Stays running as you grow.',
    body: 'Ongoing access, maintenance, and improvements as your business grows. Your systems stay up to date, and we\'re on call when anything needs adjusting.',
    detail: 'Maintenance, updates, and support included.',
    accent: '#D4C9B0',
    tag: 'MONTHLY SUBSCRIPTION',
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subheadRef = useRef(null)
  const cardsRef = useRef(null)
  const dividerRef = useRef(null)
  const ctaRef = useRef(null)
  const lineRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current.querySelectorAll('.reveal-word'),
        { y: 60, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.07,
          scrollTrigger: { trigger: headingRef.current, start: 'top 95%' },
        }
      )

      // Subhead
      gsap.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 95%' },
        }
      )

      // Connector line draw
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 95%' },
        }
      )

      // Cards stagger
      gsap.fromTo(
        cardsRef.current.querySelectorAll('.step-card'),
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 95%' },
        }
      )

      // Divider + CTA
      gsap.fromTo(
        [dividerRef.current, ctaRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: dividerRef.current, start: 'top 95%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headlineWords = ['Priced', 'around', 'your', 'business.', 'Not', 'a', 'package.']

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1C1C1A 0%, #1A2418 40%, #1C201A 70%, #1C1C1A 100%)',
      }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
          opacity: 0.035,
        }}
      />

      {/* Faint radial glow top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '-5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(143,175,159,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <p
          className="font-dm mb-4"
          style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: '#6B7C4A' }}
        >
          PRICING
        </p>

        {/* Headline */}
        <div ref={headingRef} className="mb-5" style={{ perspective: '800px' }}>
          <h2
            className="font-cormorant"
            style={{
              fontSize: 'clamp(3.2rem, 6.5vw, 7rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              color: '#F7F3ED',
            }}
          >
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="reveal-word"
                style={{
                  display: 'inline-block',
                  marginRight: i < headlineWords.length - 1 ? '0.3em' : 0,
                  opacity: 0,
                  color: word === 'package.' ? '#8FAF9F' : '#F7F3ED',
                  fontStyle: word === 'package.' ? 'italic' : 'normal',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Subhead */}
        <p
          ref={subheadRef}
          className="font-dm"
          style={{
            fontWeight: 300,
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: '#D4C9B080',
            maxWidth: '480px',
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Every engagement is scoped to what your business actually needs — so you're not paying for things that don't apply to you. We build your system, then stay on to keep it running.
        </p>

        {/* Connector bar between cards */}
        <div className="relative mt-16 mb-0">
          {/* The horizontal thread */}
          <div
            className="hidden md:block absolute top-[2.75rem] left-[calc(50%_-_1.5rem)] w-[3rem] h-px"
            style={{ transformOrigin: 'left center', zIndex: 10 }}
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, #8FAF9F40, #D4C9B060, #D4C9B040)',
                transformOrigin: 'left center',
                scaleX: 0,
              }}
            />
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="step-card relative rounded-3xl overflow-hidden cursor-default"
                style={{ opacity: 0 }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card background */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      idx === 0
                        ? 'linear-gradient(145deg, rgba(143,175,159,0.12) 0%, rgba(143,175,159,0.04) 100%)'
                        : 'rgba(212,201,176,0.05)',
                    border: idx === 0 ? '1px solid rgba(143,175,159,0.25)' : '1px solid rgba(212,201,176,0.12)',
                    borderRadius: '1.5rem',
                    opacity: hoveredCard === idx ? 1 : 0.85,
                  }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      idx === 0
                        ? 'radial-gradient(ellipse at 20% 20%, rgba(143,175,159,0.15) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at 80% 80%, rgba(212,201,176,0.1) 0%, transparent 60%)',
                    opacity: hoveredCard === idx ? 1 : 0,
                  }}
                />

                <div className="relative p-8 md:p-10 flex flex-col h-full" style={{ minHeight: '340px' }}>
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      {/* Step number */}
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          color: step.accent,
                          opacity: 0.6,
                        }}
                      >
                        {step.number}
                      </span>
                      <div
                        style={{
                          width: '24px',
                          height: '1px',
                          background: step.accent,
                          opacity: 0.3,
                        }}
                      />
                      <span
                        className="font-dm"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          letterSpacing: '0.16em',
                          color: step.accent,
                          opacity: 0.7,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    {/* Icon */}
                    {idx === 1 && (
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: '1px solid rgba(212,201,176,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <TrendingUp size={14} color="#D4C9B0" style={{ opacity: 0.5 }} />
                      </div>
                    )}
                    {idx === 0 && (
                      <div
                        style={{
                          padding: '0.35rem 0.85rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(143,175,159,0.3)',
                          background: 'rgba(143,175,159,0.08)',
                        }}
                      >
                        <span
                          className="font-dm"
                          style={{ fontSize: '0.75rem', fontWeight: 500, color: '#8FAF9F', letterSpacing: '0.1em' }}
                        >
                          ONE-TIME
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phase label */}
                  <p
                    className="font-dm mb-2"
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 400,
                      letterSpacing: '0.1em',
                      color: step.accent,
                      opacity: 0.6,
                    }}
                  >
                    {step.phase}
                  </p>

                  {/* Main headline */}
                  <h3
                    className="font-cormorant mb-4"
                    style={{
                      fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                      fontWeight: 600,
                      lineHeight: 1.15,
                      letterSpacing: '-0.01em',
                      color: '#F7F3ED',
                    }}
                  >
                    {step.headline}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-dm flex-1"
                    style={{
                      fontWeight: 300,
                      fontSize: '1rem',
                      color: '#D4C9B070',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.body}
                  </p>

                  {/* Footer detail */}
                  <div
                    className="mt-6 pt-5 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${step.accent}18` }}
                  >
                    <span
                      className="font-dm"
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        color: step.accent,
                        opacity: 0.55,
                        letterSpacing: '0.03em',
                        fontStyle: 'italic',
                      }}
                    >
                      {step.detail}
                    </span>

                    {/* Subtle animated dot */}
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: step.accent,
                        opacity: 0.35,
                        animation: 'pulse-dot 2.5s ease-in-out infinite',
                        animationDelay: `${idx * 0.6}s`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership statement */}
        <div
          ref={dividerRef}
          className="mt-12 pt-12"
          style={{ borderTop: '1px solid rgba(212,201,176,0.1)', opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p
                className="font-cormorant italic"
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                  fontWeight: 400,
                  color: '#D4C9B0',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                }}
              >
                "See what's possible — book a free call."
              </p>
              <p
                className="font-dm mt-3"
                style={{ fontWeight: 300, fontSize: '0.875rem', color: '#D4C9B040', letterSpacing: '0.03em' }}
              >
                One build. Ongoing support. No lock-in.
              </p>
            </div>

            {/* CTA */}
            <div ref={ctaRef} style={{ opacity: 0, flexShrink: 0 }}>
              <a
                href="https://cal.com/luke-marinovic-aqeosc/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sage flex items-center gap-3"
                style={{
                  borderColor: 'rgba(143,175,159,0.5)',
                  color: '#F7F3ED',
                  padding: '0.9rem 2.2rem',
                  fontSize: '0.875rem',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  Book a free call
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
