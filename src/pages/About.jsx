import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { CTA_HREF } from '../constants'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import WaterCanvas from '../components/WaterCanvas'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'

gsap.registerPlugin(ScrollTrigger)

// Animated counter
function Counter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = performance.now()
        const update = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(update)
          else setCount(target)
        }
        requestAnimationFrame(update)
      }
    }, { threshold: 0.1, rootMargin: '0px 0px 100px 0px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const values = [
  {
    num: '01',
    title: 'Systems thinking',
    body: 'We see the whole picture before we touch a single tool. Every workflow is mapped end-to-end, where work enters, where it stalls, where it leaves. Only then do we build.',
  },
  {
    num: '02',
    title: 'Silent precision',
    body: 'Great automation is invisible. You shouldn\'t feel a system running, you should just notice that things are getting done without you having to do them.',
  },
  {
    num: '03',
    title: 'Small teams, big leverage',
    body: 'We work exclusively with small businesses because that\'s where automation has the most impact. One person doing the work of five is transformative at this scale.',
  },
  {
    num: '04',
    title: 'No black boxes',
    body: 'Every system we build is documented, handed over, and explained in plain language. We build confidence, not dependency.',
  },
]

const timeline = [
  { year: '2026', event: 'Founded in Melbourne. Started with what we knew best, consulting for small businesses that were drowning in busywork and missing the bigger picture.' },
  { year: 'NOW', event: 'Focused entirely on AI-powered automation. Helping small businesses reclaim time, remove friction, and build systems that actually run.', isCurrent: true },
]

function StoryTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [blink, setBlink] = useState(true)
  const ref = useRef(null)
  const full = 'the story continues...'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(full.slice(0, i))
      if (i >= full.length) clearInterval(interval)
    }, 72)
    return () => clearInterval(interval)
  }, [started])

  useEffect(() => {
    const b = setInterval(() => setBlink(p => !p), 530)
    return () => clearInterval(b)
  }, [])

  return (
    <div ref={ref} className="flex items-center justify-center" style={{ paddingTop: '3.5rem', paddingBottom: '1rem' }}>
      <span
        className="font-cormorant italic"
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
          fontWeight: 300,
          color: 'rgba(28,28,26,0.25)',
          letterSpacing: '-0.01em',
          userSelect: 'none',
        }}
      >
        {displayed}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1.1em',
            backgroundColor: '#8FAF9F',
            marginLeft: '3px',
            verticalAlign: 'text-bottom',
            opacity: blink ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      </span>
    </div>
  )
}

export default function About() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <PageHead
        title="About Us - AI Automation Studio | UnderCurrent"
        description="Meet the team behind UnderCurrent. Learn how we started, what drives our approach to business automation, and why small business owners trust us to redesign their workflows."
        canonical="https://www.undercurrentautomations.com/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "url": "https://www.undercurrentautomations.com/about",
          "name": "About UnderCurrent",
          "description": "UnderCurrent is a Melbourne-based AI automation studio specialising in workflow automation for small businesses. Founded 2021.",
          "mainEntity": {
            "@type": "Organization",
            "name": "UnderCurrent",
            "foundingDate": "2021",
            "foundingLocation": "Melbourne, Australia",
            "description": "Melbourne-based AI automation studio specialising in workflow automation for small businesses.",
            "url": "https://www.undercurrentautomations.com",
            "email": "luke@undercurrentautomations.com",
            "sameAs": [
              "https://www.instagram.com/undercurrent.automations/",
              "https://www.facebook.com/profile.php?id=61578553167947",
              "https://www.linkedin.com/company/undercurrent-automations"
            ]
          }
        }}
      />
      <ScrollProgressBar />
      <Navbar ready={true} isSubPage={true} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          height: '70dvh',
          minHeight: '520px',
          background: '#1C1C1A',
        }}
      >
        <video
          ref={videoRef}
          src="/hero-bg.mp4"
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0, pointerEvents: 'none',
          }}
        />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
            'linear-gradient(to right,  #1C1C1A 0%, transparent 22%)',
            'linear-gradient(to left,   #1C1C1A 0%, transparent 22%)',
          ].join(', '),
        }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: '5rem' }}>
          <p className="font-mono mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)' }}>
            ABOUT UNDERCURRENT
          </p>
          <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1 }}>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
              Built on the belief
            </span>
            <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
              that work should flow.
            </span>
          </h1>
          <p ref={subRef} className="font-dm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '44ch', marginTop: '2rem', opacity: 0 }}>
            UnderCurrent is a Melbourne-based automation studio. We work with small business owners who are good at what they do, and tired of everything else that comes with it.
          </p>
        </div>
        <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
      </section>

      {/* Mission statement */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#F7F3ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            <Reveal className="md:col-span-4">
              <p className="font-dm" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: '#8FAF9F', marginBottom: '1.5rem' }}>
                OUR MISSION
              </p>
              <div className="flex flex-col gap-6">
                <div style={{ borderLeft: '2px solid rgba(143,175,159,0.4)', paddingLeft: '1.5rem' }}>
                  <p className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'rgba(28,28,26,0.35)', marginBottom: '0.5rem' }}>
                    EST. 2026 · MELBOURNE
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { num: <Counter target={12} suffix="+" />, label: 'tools we work with' },
                    { num: <Counter target={100} suffix="%" />, label: 'custom-built systems' },
                    { num: <Counter target={1} suffix=" team" />, label: 'dedicated to your ops' },
                    { num: <Counter target={0} suffix=" lock-in" />, label: 'no lock-in contracts' },
                  ].map((s, i) => (
                    <div key={i} className="py-4" style={{ borderTop: '1px solid rgba(212,201,176,0.5)' }}>
                      <div className="font-cormorant" style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1C1C1A', lineHeight: 1 }}>{s.num}</div>
                      <div className="font-dm" style={{ fontSize: '0.72rem', fontWeight: 300, color: 'rgba(28,28,26,0.45)', marginTop: '0.3rem', lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-8">
              <h2 className="font-cormorant" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1C1A', marginBottom: '2rem' }}>
                Small businesses deserve smart systems.
              </h2>
              <div className="space-y-5" style={{ borderTop: '1px solid rgba(212,201,176,0.5)', paddingTop: '2rem' }}>
                <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(28,28,26,0.7)' }}>
                  Big companies have entire teams for admin, ops, content, and outreach. Small businesses don't. But that shouldn't mean doing it all yourself.
                </p>
                <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(28,28,26,0.7)' }}>
                  We build the systems that run in the background, so you can stay focused on the front.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder section */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#1C1C1A' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <Reveal className="md:col-span-5">
              {/* Portrait placeholder — organic shape */}
              <div
                className="relative"
                style={{ aspectRatio: '4/5', borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%', overflow: 'hidden', background: 'linear-gradient(135deg, #2a3028 0%, #3d4f42 50%, #8FAF9F 100%)', maxWidth: '420px' }}
              >
                <WaterCanvas opacity={0.5} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                  <p className="font-cormorant" style={{ fontSize: '3rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(247,243,237,0.6)', lineHeight: 1 }}>
                    "The undercurrent is what moves everything forward."
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-7">
              <p className="font-mono mb-6" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.6)' }}>
                FOUNDER · LUKE, MELBOURNE
              </p>
              <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#F7F3ED', marginBottom: '2rem' }}>
                UnderCurrent is the studio I wished I had in every job before this.
              </h2>
              <div className="space-y-5">
                <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(247,243,237,0.6)' }}>
                  I spent years inside small business and corporate teams, finance, sales, operations. In every environment, I watched the same thing happen: smart, capable people losing most of their day to tasks that didn't need a person. Chasing emails. Updating records. Following up manually. Work that was eating the best hours of people who should have been doing something else entirely.
                </p>
                <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(247,243,237,0.6)' }}>
                  I built UnderCurrent to fix that. Not with generic software. Not with templates. With systems that are actually designed around how your business works, and then handed over to run without you.
                </p>
                <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(247,243,237,0.6)' }}>
                  The undercurrent is what moves everything forward. It runs all day, all night, and you barely notice it's there.
                </p>
              </div>
              <div className="flex gap-4 mt-10">
                <a href="/services" className="btn-sage-hero" style={{ fontSize: '0.875rem', padding: '0.75rem 1.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    See what we build
                    <ArrowRight size={15} />
                  </span>
                </a>
                <a href="mailto:luke@undercurrentautomations.com" className="btn-sage-hero" style={{ fontSize: '0.875rem', padding: '0.75rem 1.75rem' }}>
                  <span>Get in touch</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#F7F3ED' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="font-dm mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: '#8FAF9F' }}>
              OUR STORY
            </p>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#1C1C1A', marginBottom: '4rem' }}>
              How we got here.
            </h2>
          </Reveal>
          <div className="relative">
            {/* Vertical line — only spans the timeline entries, not the typewriter */}
            <div
              className="absolute left-0 md:left-1/2 top-0 w-px"
              style={{
                bottom: 0,
                backgroundColor: 'rgba(212,201,176,0.45)',
                transform: 'translateX(-0.5px)',
                /* fade out at the bottom toward the typewriter */
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 py-12`}>
                    {/* Dot */}
                    <div
                      className="absolute left-0 md:left-1/2 rounded-full"
                      style={{
                        width: item.isCurrent ? '14px' : '10px',
                        height: item.isCurrent ? '14px' : '10px',
                        backgroundColor: item.isCurrent ? '#8FAF9F' : '#D4C9B0',
                        border: `2px solid ${item.isCurrent ? '#8FAF9F' : 'rgba(212,201,176,0.8)'}`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        boxShadow: item.isCurrent ? '0 0 0 4px rgba(143,175,159,0.15)' : 'none',
                      }}
                    />
                    <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16'}`}>
                      <span
                        className="font-mono"
                        style={{
                          fontSize: '0.75rem',
                          letterSpacing: '0.18em',
                          color: item.isCurrent ? '#8FAF9F' : 'rgba(28,28,26,0.28)',
                          display: 'block',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {item.year}
                      </span>
                      <p
                        className="font-dm"
                        style={{
                          fontSize: item.isCurrent ? '1.05rem' : '0.975rem',
                          fontWeight: item.isCurrent ? 400 : 300,
                          lineHeight: 1.75,
                          color: item.isCurrent ? 'rgba(28,28,26,0.85)' : 'rgba(28,28,26,0.6)',
                          maxWidth: '380px',
                          ...(i % 2 === 0 ? { marginLeft: 'auto' } : {}),
                        }}
                      >
                        {item.event}
                      </p>
                    </div>
                    {i % 2 === 0 && <div className="hidden md:block" />}
                    {i % 2 !== 0 && <div className="hidden md:block md:col-start-1 md:row-start-1" />}
                  </div>
                </Reveal>
              ))}
            </div>
            {/* Typewriter — story continues */}
            <StoryTypewriter />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#E8E0D0' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="font-dm mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: '#6B7C4A' }}>
              HOW WE THINK
            </p>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', color: '#1C1C1A', marginBottom: '3.5rem' }}>
              Four principles.<br />Everything follows.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(212,201,176,0.6)' }}>
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden"
                  style={{ backgroundColor: '#E8E0D0', padding: '2.5rem 2.5rem', transition: 'background-color 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#DDD4C2'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E8E0D0'}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono flex-shrink-0" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'rgba(143,175,159,0.6)', marginTop: '0.25rem' }}>
                      {v.num}
                    </span>
                    <div>
                      <h3 className="font-cormorant" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1C1C1A', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                        {v.title}
                      </h3>
                      <p className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(28,28,26,0.6)' }}>
                        {v.body}
                      </p>
                    </div>
                  </div>
                  {/* Accent line that grows on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full"
                    style={{
                      backgroundColor: '#8FAF9F',
                      transition: 'width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#E8E0D0' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-2xl">
              <p className="font-dm mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500, color: 'rgba(28,28,26,0.4)' }}>
                WORK WITH US
              </p>
              <h2 className="font-cormorant italic" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1C1A', marginBottom: '1.5rem' }}>
                Ready to build your undercurrent?
              </h2>
              <p className="font-dm" style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(28,28,26,0.6)', marginBottom: '2.5rem', maxWidth: '480px' }}>
                Book a 30-minute call. We'll map your biggest time drains and show you exactly what can be automated.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" className="btn-sage" style={{ fontSize: '0.95rem', padding: '0.875rem 2.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Book a Discovery Call
                    <ArrowRight size={16} />
                  </span>
                </a>
                <a href="/services" className="btn-sage" style={{ fontSize: '0.95rem', padding: '0.875rem 2.5rem' }}>
                  <span>Explore our services</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Pages ── */}
      <section style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {[
            { href: '/services', label: 'Our Services', desc: 'Explore the AI automation systems we build for small businesses.' },
            { href: '/case-study', label: 'Case Studies', desc: 'See how automation has transformed real businesses.' },
            { href: '/audit', label: 'Free Business Audit', desc: 'Find out where your business is leaking time and money.' },
            { href: '/process', label: 'How We Work', desc: 'Our step-by-step process from audit to full automation.' },
            { href: '/roi', label: 'ROI Calculator', desc: 'Calculate how much time and money automation could save you.' },
            { href: '/contact', label: 'Get in Touch', desc: 'Ready to talk? Start the conversation today.' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                flex: '1 1 240px', maxWidth: '280px',
                padding: '1.25rem 1.5rem',
                background: 'rgba(143,175,159,0.04)',
                border: '1px solid rgba(143,175,159,0.1)',
                borderRadius: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#F7F3ED', marginBottom: '0.3rem' }}>{link.label}</p>
              <p className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.6, margin: 0 }}>{link.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
