import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG: Animated step-by-step business process map
function BusinessMapSVG() {
  const svgRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.25 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      className={animated ? 'bm-go' : ''}
    >
      <defs>
        <style>{`
          .bm-node { opacity: 0; }
          .bm-line { stroke-dasharray: 300; stroke-dashoffset: 300; }
          .bm-go .bm-node { animation: bm-fade 0.5s ease forwards; }
          .bm-go .bm-line { animation: bm-draw 0.6s ease forwards; }
          .bm-go .bm-d0 { animation-delay: 0.0s; }
          .bm-go .bm-d1 { animation-delay: 0.5s; }
          .bm-go .bm-d2 { animation-delay: 1.0s; }
          .bm-go .bm-d3 { animation-delay: 1.5s; }
          .bm-go .bm-d4 { animation-delay: 1.7s; }
          .bm-go .bm-d5 { animation-delay: 2.0s; }
          .bm-go .bm-d6 { animation-delay: 2.2s; }
          .bm-go .bm-d7 { animation-delay: 2.5s; }
          .bm-go .bm-d8 { animation-delay: 2.8s; }
          @keyframes bm-draw { to { stroke-dashoffset: 0; } }
          @keyframes bm-fade { to { opacity: 1; } }
        `}</style>
      </defs>

      {/* Node 1: Your Business */}
      <g className="bm-node bm-d0">
        <rect x="55" y="8" width="90" height="26" rx="6" fill="#E8E0D0" stroke="#6B7C4A" strokeWidth="1.5" />
        <text x="100" y="25" textAnchor="middle" fill="#1C1C1A" fontSize="7" fontFamily="DM Sans" fontWeight="500">Your Business</text>
      </g>

      {/* Line down */}
      <line className="bm-line bm-d1" x1="100" y1="34" x2="100" y2="51" stroke="#6B7C4A" strokeWidth="1.2" />
      <polygon className="bm-node bm-d1" points="100,56 95,50 105,50" fill="#6B7C4A" />

      {/* Node 2: Map Your Workflows */}
      <g className="bm-node bm-d2">
        <rect x="36" y="57" width="128" height="26" rx="6" fill="#E8E0D0" stroke="#8FAF9F" strokeWidth="1.5" />
        <text x="100" y="74" textAnchor="middle" fill="#1C1C1A" fontSize="7" fontFamily="DM Sans" fontWeight="500">Map Your Workflows</text>
      </g>

      {/* Branch left */}
      <line className="bm-line bm-d3" x1="70" y1="83" x2="38" y2="108" stroke="#D4C9B0" strokeWidth="1" />
      {/* Branch right */}
      <line className="bm-line bm-d4" x1="130" y1="83" x2="162" y2="108" stroke="#D4C9B0" strokeWidth="1" />

      {/* Sub-node L: Manual Tasks */}
      <g className="bm-node bm-d5">
        <rect x="7" y="106" width="64" height="20" rx="4" fill="#F7F3ED" stroke="#D4C9B0" strokeWidth="1" />
        <text x="39" y="120" textAnchor="middle" fill="#6B7C4A" fontSize="5.5" fontFamily="DM Mono">Manual Tasks</text>
      </g>

      {/* Sub-node R: Bottlenecks */}
      <g className="bm-node bm-d6">
        <rect x="129" y="106" width="64" height="20" rx="4" fill="#F7F3ED" stroke="#D4C9B0" strokeWidth="1" />
        <text x="161" y="120" textAnchor="middle" fill="#6B7C4A" fontSize="5.5" fontFamily="DM Mono">Bottlenecks</text>
      </g>

      {/* Converge lines */}
      <line className="bm-line bm-d7" x1="39" y1="126" x2="88" y2="152" stroke="#D4C9B0" strokeWidth="1" />
      <line className="bm-line bm-d7" x1="161" y1="126" x2="112" y2="152" stroke="#D4C9B0" strokeWidth="1" />

      {/* Node 3: Automation Plan */}
      <g className="bm-node bm-d8">
        <rect x="44" y="152" width="112" height="30" rx="8" fill="#6B7C4A" />
        <text x="100" y="171" textAnchor="middle" fill="#F7F3ED" fontSize="7" fontFamily="DM Sans" fontWeight="600">Automation Plan</text>
      </g>
    </svg>
  )
}

// SVG: Scanner workflow node graph
function WorkflowSVG() {
  return (
    <svg viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <line x1="55" y1="70" x2="95" y2="70" stroke="#D4C9B0" strokeWidth="1" />
      <line x1="165" y1="70" x2="205" y2="70" stroke="#D4C9B0" strokeWidth="1" />
      <line x1="95" y1="70" x2="130" y2="40" stroke="#D4C9B0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="95" y1="70" x2="130" y2="100" stroke="#D4C9B0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="130" y1="40" x2="165" y2="70" stroke="#D4C9B0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="130" y1="100" x2="165" y2="70" stroke="#D4C9B0" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="40" cy="70" r="14" fill="#E8E0D0" stroke="#6B7C4A" strokeWidth="1.5" />
      <circle cx="110" cy="70" r="14" fill="#E8E0D0" stroke="#6B7C4A" strokeWidth="1.5" />
      <circle cx="150" cy="70" r="14" fill="#E8E0D0" stroke="#8FAF9F" strokeWidth="1.5" />
      <circle cx="220" cy="70" r="14" fill="#8FAF9F" stroke="#6B7C4A" strokeWidth="1.5" />
      <circle cx="130" cy="36" r="10" fill="#E8E0D0" stroke="#D4C9B0" strokeWidth="1" />
      <circle cx="130" cy="104" r="10" fill="#E8E0D0" stroke="#D4C9B0" strokeWidth="1" />
      <text x="40" y="74" textAnchor="middle" fill="#6B7C4A" fontSize="7" fontFamily="DM Mono">IN</text>
      <text x="110" y="74" textAnchor="middle" fill="#6B7C4A" fontSize="7" fontFamily="DM Mono">IF</text>
      <text x="150" y="74" textAnchor="middle" fill="#1C1C1A" fontSize="7" fontFamily="DM Mono">DO</text>
      <text x="220" y="74" textAnchor="middle" fill="#1C1C1A" fontSize="7" fontFamily="DM Mono">OUT</text>
      <rect className="scanner" x="-20" y="0" width="30" height="140" fill="url(#scanGrad)" opacity="0.5" />
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8FAF9F" stopOpacity="0" />
          <stop offset="50%" stopColor="#8FAF9F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8FAF9F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// SVG: EKG-style pulsing waveform
function WaveformSVG() {
  return (
    <svg viewBox="0 0 260 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <line x1="0" y1="50" x2="260" y2="50" stroke="#D4C9B0" strokeWidth="0.5" strokeDasharray="4 4" />
      <path
        className="ekg-line"
        d="M 0 50 L 30 50 L 40 50 L 50 20 L 60 80 L 70 15 L 80 85 L 90 50 L 130 50 L 140 50 L 150 20 L 160 80 L 170 15 L 180 85 L 190 50 L 260 50"
        stroke="url(#ekgGrad2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="230" cy="50" r="4" fill="#8FAF9F">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <defs>
        <linearGradient id="ekgGrad2" x1="0" y1="0" x2="260" y2="0">
          <stop offset="0%" stopColor="#D4C9B0" />
          <stop offset="70%" stopColor="#8FAF9F" />
          <stop offset="100%" stopColor="#8FAF9F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const steps = [
  {
    num: '01',
    navLabel: 'Map',
    title: 'Map Your\nBusiness',
    points: [
      { id: '1.1', text: '30 minute workflow audit' },
      { id: '1.2', text: 'Find your repeat tasks' },
      { id: '1.3', text: 'See where time leaks out' },
      { id: '1.4', text: 'Rank by hours saved' },
    ],
    svg: <BusinessMapSVG />,
    svgBg: 'rgba(107,124,74,0.08)',
  },
  {
    num: '02',
    navLabel: 'Build',
    title: 'Build Your\nSystem',
    points: [
      { id: '2.1', text: 'Custom build phase' },
      { id: '2.2', text: 'Automations shaped for your business' },
      { id: '2.3', text: 'Triggers, logic, and smart agents' },
      { id: '2.4', text: 'You own every line and flow' },
      { id: '2.5', text: 'Ready in weeks, not months' },
    ],
    svg: <WorkflowSVG />,
    svgBg: 'rgba(143,175,159,0.1)',
  },
  {
    num: '03',
    navLabel: 'Flow',
    title: 'Let It\nFlow',
    points: [
      { id: '3.1', text: 'Keep it running' },
      { id: '3.2', text: 'We stay in your system' },
      { id: '3.3', text: 'Quarterly reviews and updates' },
      { id: '3.4', text: 'Train and handover to your team' },
      { id: '3.5', text: 'Grows as your business grows' },
    ],
    svg: <WaveformSVG />,
    svgBg: 'rgba(107,124,74,0.08)',
  },
]

export default function Protocol() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef([])
  const sectionRef = useRef(null)

  // Highlight active nav step via IntersectionObserver
  useEffect(() => {
    const observers = steps.map((_, i) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActiveStep(i)
        },
        { threshold: 0.45, rootMargin: '-10% 0px -10% 0px' }
      )
      if (stepRefs.current[i]) observer.observe(stepRefs.current[i])
      return observer
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Entrance animations for each step content
  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(el.querySelectorAll('.reveal-item'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 72%',
            }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToStep = (i) => {
    stepRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="protocol" ref={sectionRef} style={{ backgroundColor: '#F7F3ED' }}>
      {/* Header */}
      <div className="py-10 px-6 md:px-12" style={{ borderBottom: '1px solid rgba(212,201,176,0.4)' }}>
        <div className="max-w-7xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-dm text-charcoal/40 mb-2" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
              THE PROCESS
            </p>
            <h2
              className="font-cormorant text-charcoal"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              How we work
            </h2>
          </div>
          <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 300, color: 'rgba(28,28,26,0.5)', maxWidth: '340px', lineHeight: 1.6 }}>
            Three steps. One clean handoff. Built to last.
          </p>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="flex gap-0 md:gap-16 items-start">

          {/* Sticky sidebar nav */}
          <div
            className="hidden md:block flex-shrink-0"
            style={{ width: '200px', position: 'sticky', top: '120px', paddingTop: '4rem' }}
          >
            {steps.map((step, i) => (
              <div
                key={step.num}
                onClick={() => scrollToStep(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 8px',
                  borderBottom: '1px dashed rgba(212,201,176,0.5)',
                  cursor: 'pointer',
                  opacity: activeStep === i ? 1 : 0.28,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === i ? '#6B7C4A' : '#D4C9B0',
                  flexShrink: 0,
                  transition: 'background-color 0.35s ease',
                }} />
                <div>
                  <p className="font-dm" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(28,28,26,0.4)', fontWeight: 500, marginBottom: '2px' }}>
                    {step.num}
                  </p>
                  <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 600, color: '#1C1C1A', lineHeight: 1.2 }}>
                    {step.navLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 min-w-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={el => stepRefs.current[i] = el}
                style={{
                  minHeight: '75vh',
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: i === 0 ? '4rem' : '2rem',
                  paddingBottom: '2rem',
                  borderBottom: i < steps.length - 1 ? '1px solid rgba(212,201,176,0.3)' : 'none',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full">
                  {/* Text */}
                  <div>
                    <span className="reveal-item font-mono block mb-4" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: 'rgba(28,28,26,0.22)' }}>
                      Step {step.num}
                    </span>
                    <h3
                      className="reveal-item font-cormorant text-charcoal mb-6"
                      style={{
                        fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                        fontWeight: 600,
                        lineHeight: 1.0,
                        letterSpacing: '-0.02em',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {step.title}
                    </h3>
                    <div className="reveal-item" style={{ maxWidth: '420px' }}>
                      {step.points.map((pt, pi) => (
                        <div
                          key={pt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '1.25rem',
                            padding: '0.85rem 0',
                            borderBottom: pi < step.points.length - 1
                              ? '1px dashed rgba(212,201,176,0.7)'
                              : '1px dashed rgba(212,201,176,0.7)',
                          }}
                        >
                          <span className="font-mono" style={{ fontSize: '0.72rem', color: '#6B7C4A', letterSpacing: '0.08em', flexShrink: 0, fontWeight: 500 }}>
                            {pt.id}
                          </span>
                          <span className="font-dm" style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1C1C1A', lineHeight: 1.4 }}>
                            {pt.text}
                          </span>
                        </div>
                      ))}
                      <a
                        href="#contact"
                        className="font-dm"
                        style={{
                          display: 'inline-block',
                          marginTop: '1.75rem',
                          backgroundColor: '#1C1C1A',
                          color: '#F7F3ED',
                          padding: '0.75rem 1.75rem',
                          borderRadius: '999px',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          letterSpacing: '0.01em',
                          textDecoration: 'none',
                          transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        Book a call
                      </a>
                    </div>
                  </div>

                  {/* SVG illustration */}
                  <div
                    className="reveal-item"
                    style={{
                      backgroundColor: step.svgBg,
                      borderRadius: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2.5rem',
                      aspectRatio: '1',
                      maxWidth: '380px',
                      margin: '0 auto',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '100%', maxWidth: '260px' }}>
                      {step.svg}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
