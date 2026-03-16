import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Widget 1: Lead while asleep ─────────────────────────────────────────────
function LeadDarkWidget() {
  const [visible, setVisible] = useState(false)
  const [replied, setReplied] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    const run = () => {
      setVisible(false); setReplied(false); setBooked(false)
      const t1 = setTimeout(() => setVisible(true), 500)
      const t2 = setTimeout(() => setReplied(true), 2000)
      const t3 = setTimeout(() => setBooked(true), 3400)
      return [t1, t2, t3]
    }
    let timers = run()
    const reset = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = run()
    }, 6000)
    return () => { timers.forEach(clearTimeout); clearInterval(reset) }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      <div style={{
        background: 'rgba(247,243,237,0.05)',
        border: `1px solid ${visible ? 'rgba(143,175,159,0.25)' : 'rgba(247,243,237,0.06)'}`,
        borderRadius: '0.85rem',
        padding: '0.75rem 0.9rem',
        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(-14px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.55s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{
          width: '1.9rem', height: '1.9rem', borderRadius: '0.4rem', flexShrink: 0,
          background: 'rgba(143,175,159,0.12)', border: '1px solid rgba(143,175,159,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
        }}>⚡</div>
        <div>
          <div style={{ fontSize: '0.62rem', color: 'rgba(247,243,237,0.3)', marginBottom: '0.15rem', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.04em' }}>
            UnderCurrent · just now
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(247,243,237,0.78)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, lineHeight: 1.45 }}>
            New enquiry: <strong style={{ color: '#8FAF9F', fontWeight: 500 }}>Tom Nguyen</strong> — kitchen renovation quote. Needs a callback by 9am.
          </div>
        </div>
      </div>
      {[
        { label: 'Auto-reply sent · acknowledged & qualified', at: replied, color: '#8FAF9F' },
        { label: 'Callback booked · Thu 9:00 AM', at: booked, color: '#6B7C4A' },
      ].map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.45rem 0.75rem',
          background: item.at ? `${item.color}0F` : 'transparent',
          border: `1px solid ${item.at ? item.color + '28' : 'rgba(247,243,237,0.05)'}`,
          borderRadius: '0.55rem',
          opacity: item.at ? 1 : 0.28,
          transform: item.at ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'all 0.45s ease',
        }}>
          <div style={{
            width: '0.4rem', height: '0.4rem', borderRadius: '50%', flexShrink: 0,
            background: item.at ? item.color : 'rgba(247,243,237,0.2)',
            boxShadow: item.at ? `0 0 5px ${item.color}80` : 'none',
            transition: 'all 0.3s ease',
          }} />
          <span style={{ fontSize: '0.68rem', fontFamily: 'DM Mono, monospace', color: item.at ? item.color : 'rgba(247,243,237,0.3)', letterSpacing: '0.04em' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Widget 2: Content published across all platforms ────────────────────────
function ContentDarkWidget() {
  const [shown, setShown] = useState(0)

  const platforms = [
    { name: 'Instagram', detail: '1 post + 3 stories', color: '#8FAF9F', reach: '2.1k reach' },
    { name: 'LinkedIn', detail: 'Long-form post', color: '#D4C9B0', reach: '847 impressions' },
    { name: 'Facebook', detail: 'Post + boosted reel', color: '#8FAF9F', reach: '1.4k reach' },
    { name: 'Newsletter', detail: 'Sent to 847 subscribers', color: '#6B7C4A', reach: '61% open rate' },
  ]

  useEffect(() => {
    const run = () => {
      setShown(0)
      const timers = platforms.map((_, i) => setTimeout(() => setShown(i + 1), 400 + i * 550))
      return timers
    }
    let timers = run()
    const reset = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = run()
    }, 6500)
    return () => { timers.forEach(clearTimeout); clearInterval(reset) }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      {platforms.map((p, i) => (
        <div key={p.name} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.5rem 0.75rem',
          background: shown > i ? `${p.color}0C` : 'transparent',
          border: `1px solid ${shown > i ? p.color + '25' : 'rgba(247,243,237,0.05)'}`,
          borderRadius: '0.6rem',
          opacity: shown > i ? 1 : 0.18,
          transform: shown > i ? 'translateX(0)' : 'translateX(-10px)',
          transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              fontSize: '0.6rem', fontFamily: 'DM Mono, monospace',
              color: shown > i ? '#6B7C4A' : 'rgba(247,243,237,0.25)',
              transition: 'color 0.3s ease',
            }}>
              {shown > i ? '✓' : '○'}
            </span>
            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.85)', fontWeight: 500 }}>
                {p.name}
              </div>
              <div style={{ fontSize: '0.62rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.35)', fontWeight: 300 }}>
                {p.detail}
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '0.6rem', fontFamily: 'DM Mono, monospace',
            color: p.color, letterSpacing: '0.04em',
            opacity: shown > i ? 1 : 0,
            transition: 'opacity 0.4s ease 0.15s',
          }}>
            {p.reach}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Widget 3: Client onboarding fires automatically ─────────────────────────
function OnboardingDarkWidget() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const run = () => {
      setStep(0)
      const timers = [
        setTimeout(() => setStep(1), 300),
        setTimeout(() => setStep(2), 1100),
        setTimeout(() => setStep(3), 1950),
        setTimeout(() => setStep(4), 2800),
      ]
      return timers
    }
    let timers = run()
    const reset = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = run()
    }, 5500)
    return () => { timers.forEach(clearTimeout); clearInterval(reset) }
  }, [])

  const items = [
    { label: 'Welcome email sent', color: '#8FAF9F', at: 1 },
    { label: 'Client portal access delivered', color: '#8FAF9F', at: 2 },
    { label: 'Intake form sent & logged', color: '#D4C9B0', at: 3 },
    { label: 'First appointment booked', color: '#6B7C4A', at: 4 },
  ]

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '0.85rem',
        padding: '0.5rem 0.75rem',
        background: 'rgba(143,175,159,0.08)',
        border: '1px solid rgba(143,175,159,0.18)',
        borderRadius: '0.65rem',
      }}>
        <div style={{
          width: '1.8rem', height: '1.8rem', borderRadius: '50%',
          background: 'linear-gradient(135deg, #8FAF9F, #6B7C4A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
          flexShrink: 0,
        }}>EC</div>
        <div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.85)', fontWeight: 500 }}>Emma Clarke</div>
          <div style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: '#8FAF9F', letterSpacing: '0.06em' }}>NEW CLIENT · just signed</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {items.map((item) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '0.55rem',
            padding: '0.42rem 0.65rem',
            background: step >= item.at ? `${item.color}0D` : 'transparent',
            border: `1px solid ${step >= item.at ? item.color + '22' : 'rgba(247,243,237,0.04)'}`,
            borderRadius: '0.5rem',
            opacity: step >= item.at ? 1 : 0.2,
            transform: step >= item.at ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'DM Mono, monospace', color: step >= item.at ? item.color : 'rgba(247,243,237,0.2)', width: '0.8rem', textAlign: 'center', transition: 'color 0.3s ease' }}>
              {step >= item.at ? '✓' : '○'}
            </span>
            <span style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.7)', fontWeight: 300 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Widget 4: Google review request ─────────────────────────────────────────
function ReviewDarkWidget() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const run = () => {
      setPhase(0)
      const timers = [
        setTimeout(() => setPhase(1), 600),
        setTimeout(() => setPhase(2), 1800),
        setTimeout(() => setPhase(3), 3200),
      ]
      return timers
    }
    let timers = run()
    const reset = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = run()
    }, 6000)
    return () => { timers.forEach(clearTimeout); clearInterval(reset) }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.45rem 0.75rem',
        background: 'rgba(212,201,176,0.06)',
        border: '1px solid rgba(212,201,176,0.15)',
        borderRadius: '0.55rem',
      }}>
        <span style={{ fontSize: '0.68rem', fontFamily: 'DM Mono, monospace', color: '#D4C9B0', letterSpacing: '0.06em' }}>
          ◷ Job completed: 14 days ago
        </span>
      </div>
      <div style={{
        background: 'rgba(247,243,237,0.04)',
        border: `1px solid ${phase >= 1 ? 'rgba(143,175,159,0.2)' : 'rgba(247,243,237,0.06)'}`,
        borderRadius: '0.8rem 0.8rem 0.8rem 0',
        padding: '0.7rem 0.85rem',
        opacity: phase >= 1 ? 1 : 0.15,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.55s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{ fontSize: '0.62rem', color: 'rgba(247,243,237,0.3)', marginBottom: '0.2rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>
          SMS to Mike Chen · auto-sent
        </div>
        <div style={{ fontSize: '0.74rem', color: 'rgba(247,243,237,0.72)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, lineHeight: 1.5 }}>
          Hi Mike — hope the kitchen's coming along nicely! If you have 30 seconds, a Google review would mean the world to us. 🙏
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(6px)',
        transition: 'all 0.45s ease',
      }}>
        <div style={{ display: 'flex', gap: '0.18rem' }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{
              fontSize: '1rem',
              color: i <= (phase >= 3 ? 5 : 4) ? '#D4C9B0' : 'rgba(247,243,237,0.15)',
              transition: `color 0.3s ease ${i * 0.06}s`,
              filter: i <= (phase >= 3 ? 5 : 0) ? 'drop-shadow(0 0 4px rgba(212,201,176,0.6))' : 'none',
            }}>★</span>
          ))}
        </div>
        <span style={{ fontSize: '0.65rem', fontFamily: 'DM Mono, monospace', color: '#D4C9B0', letterSpacing: '0.06em' }}>
          {phase >= 3 ? 'Review posted · Google' : 'Request sent · 94% open rate'}
        </span>
      </div>
    </div>
  )
}

// ─── Widget 5: Invoice auto-generated & sent ─────────────────────────────────
function InvoiceDarkWidget() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const run = () => {
      setStep(0)
      const timers = [
        setTimeout(() => setStep(1), 400),
        setTimeout(() => setStep(2), 1300),
        setTimeout(() => setStep(3), 2200),
        setTimeout(() => setStep(4), 3800),
      ]
      return timers
    }
    let timers = run()
    const reset = setInterval(() => {
      timers.forEach(clearTimeout)
      timers = run()
    }, 6500)
    return () => { timers.forEach(clearTimeout); clearInterval(reset) }
  }, [])

  return (
    <div>
      <div style={{
        background: 'rgba(247,243,237,0.03)',
        border: `1px solid ${step >= 2 ? 'rgba(107,124,74,0.35)' : 'rgba(247,243,237,0.07)'}`,
        borderRadius: '0.9rem',
        padding: '0.9rem 1rem',
        marginBottom: '0.7rem',
        transition: 'border-color 0.5s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
          <div>
            <div style={{ fontSize: '0.6rem', fontFamily: 'DM Mono, monospace', color: 'rgba(247,243,237,0.3)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
              INVOICE #0047
            </div>
            {/* Clean sans number */}
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.65rem', fontWeight: 700, color: '#F7F3ED', lineHeight: 1, letterSpacing: '-0.02em' }}>
              $2,400.00
            </div>
          </div>
          <div style={{
            fontSize: '0.58rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
            letterSpacing: '0.08em',
            color: step >= 4 ? '#6B7C4A' : step >= 2 ? 'rgba(247,243,237,0.4)' : 'rgba(247,243,237,0.2)',
            background: step >= 4 ? 'rgba(107,124,74,0.15)' : 'transparent',
            border: `1px solid ${step >= 4 ? 'rgba(107,124,74,0.3)' : 'transparent'}`,
            padding: '0.18rem 0.6rem', borderRadius: '9999px',
            transition: 'all 0.5s ease',
          }}>
            {step >= 4 ? 'PAID' : step >= 2 ? 'SENT' : 'PENDING'}
          </div>
        </div>
        <div style={{ fontSize: '0.68rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.38)', fontWeight: 300 }}>
          Tom Nguyen · Bathroom renovation · Due 14 days
        </div>
      </div>
      {[
        { label: 'Invoice auto-generated from job notes', color: '#8FAF9F', at: 1 },
        { label: 'Sent with payment link attached', color: '#8FAF9F', at: 2 },
        { label: 'Viewed by client · 4 min ago', color: '#D4C9B0', at: 3 },
        { label: 'Payment received · $2,400', color: '#6B7C4A', at: 4 },
      ].map((item) => (
        <div key={item.label} style={{
          display: 'flex', alignItems: 'center', gap: '0.55rem',
          marginBottom: '0.28rem',
          opacity: step >= item.at ? 1 : 0.18,
          transition: 'opacity 0.4s ease',
        }}>
          <div style={{
            width: '0.38rem', height: '0.38rem', borderRadius: '50%', flexShrink: 0,
            background: step >= item.at ? item.color : 'rgba(247,243,237,0.2)',
            transition: 'background 0.3s ease',
            boxShadow: step >= item.at ? `0 0 4px ${item.color}80` : 'none',
          }} />
          <span style={{ fontSize: '0.68rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.65)', fontWeight: 300 }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Widget 6: End of day — systems still running ────────────────────────────
function CloseDarkWidget() {
  const [count, setCount] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    const TARGET_TASKS = 14
    const TARGET_REV = 4850
    let t = 0
    const interval = setInterval(() => {
      t = Math.min(t + 1, TARGET_TASKS)
      setCount(t)
      setRevenue(Math.min(Math.ceil((t / TARGET_TASKS) * TARGET_REV), TARGET_REV))
      if (t >= TARGET_TASKS) clearInterval(interval)
    }, 100)
    const reset = setInterval(() => {
      setCount(0)
      setRevenue(0)
      t = 0
    }, 6000)
    return () => { clearInterval(interval); clearInterval(reset) }
  }, [])

  const systems = [
    { name: 'Lead capture & response', color: '#8FAF9F' },
    { name: 'Social scheduling', color: '#8FAF9F' },
    { name: 'Review follow-up', color: '#D4C9B0' },
    { name: 'Invoice collection', color: '#6B7C4A' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
        <div>
          {/* Clean sans number */}
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.8rem', fontWeight: 700, color: '#6B7C4A', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {count}
          </div>
          <div style={{ fontSize: '0.58rem', fontFamily: 'DM Mono, monospace', color: 'rgba(247,243,237,0.3)', letterSpacing: '0.1em' }}>
            TASKS DONE
          </div>
        </div>
        <div style={{ width: '1px', background: 'rgba(247,243,237,0.06)', flexShrink: 0 }} />
        <div>
          {/* Clean sans number */}
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.8rem', fontWeight: 700, color: '#D4C9B0', lineHeight: 1, letterSpacing: '-0.03em' }}>
            ${revenue >= 4850 ? '4,850' : revenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.58rem', fontFamily: 'DM Mono, monospace', color: 'rgba(247,243,237,0.3)', letterSpacing: '0.1em' }}>
            INVOICED TODAY
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
        {systems.map(sys => (
          <div key={sys.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.32rem 0.65rem',
            background: `${sys.color}08`,
            border: `1px solid ${sys.color}15`,
            borderRadius: '0.4rem',
          }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'DM Sans, sans-serif', color: 'rgba(247,243,237,0.55)', fontWeight: 300 }}>
              {sys.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.32rem' }}>
              <div style={{
                width: '0.35rem', height: '0.35rem', borderRadius: '50%',
                background: sys.color, boxShadow: `0 0 4px ${sys.color}`,
              }} className="pulse-dot" />
              <span style={{ fontSize: '0.56rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em', color: sys.color, fontWeight: 500 }}>
                RUNNING
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Steps data ───────────────────────────────────────────────────────────────
const DARK_STEPS = [
  {
    time: '6:47 AM',
    stat: '3 hrs',
    statLabel: 'saved on lead follow-up',
    phase: "You're still asleep.",
    headline: 'A new job enquiry arrives.',
    body: 'Tom wants a quote on a bathroom renovation. The AI responds immediately, qualifies the lead, and books a callback for 9am. You wake up with a warm lead waiting.',
    color: '#8FAF9F',
    Widget: LeadDarkWidget,
  },
  {
    time: '8:15 AM',
    stat: '4 hrs',
    statLabel: 'saved on content creation',
    phase: 'You make your first coffee.',
    headline: 'Your content is already live.',
    body: 'Instagram, LinkedIn, Facebook, newsletter — all published overnight from a brief you approved on Monday. 847 subscribers received your email before you opened your eyes.',
    color: '#D4C9B0',
    Widget: ContentDarkWidget,
  },
  {
    time: '10:30 AM',
    stat: '2 hrs',
    statLabel: 'saved on client onboarding',
    phase: 'A new client just signed on.',
    headline: 'Onboarding runs itself.',
    body: "Emma signed the agreement. Before you've had a chance to say congratulations — welcome email sent, portal access live, intake form on its way, first session booked.",
    color: '#8FAF9F',
    Widget: OnboardingDarkWidget,
  },
  {
    time: '2:00 PM',
    stat: '+31%',
    statLabel: 'more 5-star reviews',
    phase: "Two weeks since Mike's job.",
    headline: 'The review request goes out.',
    body: "Timed to land when the work is still fresh. Personalised, warm, no chasing required. The kind of follow-up that earns five stars — sent without you lifting a finger.",
    color: '#D4C9B0',
    Widget: ReviewDarkWidget,
  },
  {
    time: '4:15 PM',
    stat: '2× faster',
    statLabel: 'invoice-to-payment cycle',
    phase: 'Job complete. Notes filed.',
    headline: 'Invoice sent before you close your laptop.',
    body: 'Auto-generated from your job notes, branded, with a payment link attached. Sent the moment the job is marked done. Tom pays the same day.',
    color: '#6B7C4A',
    Widget: InvoiceDarkWidget,
  },
  {
    time: '5:30 PM',
    stat: '11 hrs',
    statLabel: 'given back every week',
    phase: 'You head home.',
    headline: 'The business keeps going.',
    body: '14 tasks completed. $4,850 invoiced. Reviews requested, content live, leads in the pipeline. Your systems run through the night. You just ran the business.',
    color: '#8FAF9F',
    Widget: CloseDarkWidget,
  },
]

// ─── Mobile hook ──────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function UserJourneyDarkHorizontal() {
  const [active, setActive] = useState(0)
  const [tick, setTick] = useState(0)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isMobile = useIsMobile()

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(s => {
        setTick(t => t + 1)
        return (s + 1) % DARK_STEPS.length
      })
    }, 5500)
  }, [])

  const goTo = useCallback((i) => {
    setActive(i)
    setTick(t => t + 1)
    startTimer()
  }, [startTimer])

  useEffect(() => {
    startTimer()
    return () => clearInterval(intervalRef.current)
  }, [startTimer])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ujdh-eyebrow',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo('.ujdh-h2',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo('.ujdh-sub',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo('.ujdh-card',
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.45,
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const step = DARK_STEPS[active]
  const { Widget } = step

  return (
    <section
      ref={sectionRef}
      id="user-journey-dark-horizontal"
      style={{
        backgroundColor: '#1C1C1A',
        padding: 'clamp(80px, 10vw, 130px) clamp(20px, 5vw, 48px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        backgroundSize: '180px',
        opacity: 0.6,
      }} />

      <style>{`
        @keyframes ujdh-fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ujdh-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .ujdh-timeline-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          flex: 1;
          transition: opacity 0.3s ease;
        }
        .ujdh-timeline-btn:hover { opacity: 1 !important; }
        .ujdh-nav-btn {
          background: none;
          border: 1px solid rgba(247,243,237,0.1);
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.8rem;
          color: rgba(247,243,237,0.3);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .ujdh-nav-btn:hover {
          border-color: rgba(247,243,237,0.25);
          color: rgba(247,243,237,0.7);
          background: rgba(247,243,237,0.04);
        }
      `}</style>

      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div ref={headingRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <p className="ujdh-eyebrow" style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            color: '#8FAF9F',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            opacity: 0,
          }}>
            For Small Business
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <h2 className="ujdh-h2" style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 700,
              color: '#F7F3ED',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              opacity: 0,
            }}>
              One person.<br />
              <span style={{ color: '#8FAF9F', display: 'block', marginTop: '0.25em' }}>A full operation.</span>
            </h2>
            <div className="ujdh-sub" style={{ opacity: 0, maxWidth: isMobile ? '100%' : '280px', paddingBottom: '0.4rem' }}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(247,243,237,0.38)',
                lineHeight: 1.65,
                fontWeight: 300,
              }}>
                What a day looks like when you're a tradie, service provider, or sole operator with AI working beside you.
              </p>
            </div>
          </div>
        </div>

        {/* ── Main card ── */}
        <div
          className="ujdh-card"
          style={{
            opacity: 0,
            background: 'rgba(247,243,237,0.03)',
            borderRadius: '2rem',
            overflow: 'hidden',
            border: '1px solid rgba(247,243,237,0.07)',
            boxShadow: '0 4px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Two-column content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '40% 60%',
            minHeight: isMobile ? 'auto' : '420px',
          }}>

            {/* ── Left: narrative ── */}
            <div style={{
              padding: 'clamp(1.75rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: isMobile ? 'none' : '1px solid rgba(247,243,237,0.05)',
              borderBottom: isMobile ? '1px solid rgba(247,243,237,0.05)' : 'none',
              borderLeft: `4px solid ${step.color}`,
              transition: 'border-left-color 0.5s ease',
            }}>
              <div
                key={`text-${tick}`}
                style={{ animation: 'ujdh-fade-up 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                {/* Big stat */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(2.8rem, 10vw, 4.5rem)',
                    fontWeight: 700,
                    color: step.color,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    transition: 'color 0.4s ease',
                  }}>
                    {step.stat}
                  </div>
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
                    color: 'rgba(247,243,237,0.45)',
                    fontWeight: 300,
                    marginTop: '0.35rem',
                  }}>
                    {step.statLabel}
                  </div>
                </div>

                {/* Phase label + time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem' }}>
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: step.color,
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}>
                    {step.time}
                  </span>
                  <span style={{ width: '1px', height: '0.75rem', background: 'rgba(247,243,237,0.1)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: 'rgba(247,243,237,0.35)',
                    textTransform: 'uppercase',
                  }}>
                    {step.phase}
                  </span>
                </div>

                {/* Headline */}
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.7rem, 5vw, 2.6rem)',
                  fontWeight: 700,
                  color: '#F7F3ED',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  marginBottom: '0.8rem',
                }}>
                  {step.headline}
                </h3>

                {/* Body */}
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                  color: 'rgba(247,243,237,0.42)',
                  lineHeight: 1.72,
                  fontWeight: 300,
                }}>
                  {step.body}
                </p>
              </div>

              {/* Step dots + nav */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  className="ujdh-nav-btn"
                  onClick={() => goTo((active - 1 + DARK_STEPS.length) % DARK_STEPS.length)}
                  aria-label="Previous"
                >
                  ←
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                  {DARK_STEPS.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        height: '0.3rem',
                        borderRadius: '9999px',
                        background: i === active ? step.color : 'rgba(247,243,237,0.1)',
                        flex: i === active ? 2 : 1,
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>

                <button
                  className="ujdh-nav-btn"
                  onClick={() => goTo((active + 1) % DARK_STEPS.length)}
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>

            {/* ── Right: widget ── */}
            <div style={{
              background: '#0d0d0c',
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div
                key={`widget-${tick}`}
                style={{ animation: 'ujdh-fade-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.08s both' }}
              >
                <Widget />
              </div>
            </div>
          </div>

          {/* ── Bottom timeline ── */}
          <div style={{
            borderTop: '1px solid rgba(247,243,237,0.05)',
            padding: '1rem clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            background: 'rgba(0,0,0,0.15)',
          }}>
            {/* Progress bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'rgba(247,243,237,0.04)',
              overflow: 'hidden',
            }}>
              <div
                key={`prog-${tick}`}
                style={{
                  height: '100%',
                  background: step.color,
                  transformOrigin: 'left center',
                  animation: 'ujdh-progress 5.5s linear forwards',
                }}
              />
            </div>

            {/* Time nodes */}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {DARK_STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < DARK_STEPS.length - 1 ? 1 : 'none' }}>
                  <button
                    className="ujdh-timeline-btn"
                    onClick={() => goTo(i)}
                    style={{ opacity: i === active ? 1 : 0.35 }}
                  >
                    <div style={{
                      width: i === active ? '0.6rem' : '0.42rem',
                      height: i === active ? '0.6rem' : '0.42rem',
                      borderRadius: '50%',
                      background: i === active ? s.color : 'rgba(247,243,237,0.18)',
                      boxShadow: i === active ? `0 0 10px ${s.color}70` : 'none',
                      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      flexShrink: 0,
                    }} />
                    {!isMobile && (
                      <span style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.65rem',
                        letterSpacing: '0.06em',
                        color: i === active ? s.color : 'rgba(247,243,237,0.25)',
                        transition: 'color 0.3s ease',
                        whiteSpace: 'nowrap',
                      }}>
                        {s.time}
                      </span>
                    )}
                  </button>

                  {i < DARK_STEPS.length - 1 && (
                    <div style={{
                      flex: 1,
                      height: '1px',
                      background: i < active
                        ? 'rgba(143,175,159,0.25)'
                        : 'rgba(247,243,237,0.05)',
                      margin: '0 0.15rem',
                      marginBottom: '1.1rem',
                      transition: 'background 0.5s ease',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── End note ── */}
        <div style={{ marginTop: '2rem' }}>
          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'rgba(247,243,237,0.22)',
            lineHeight: 1.6,
          }}>
            None of this required your attention.<br />
            That's the point.
          </p>
        </div>

      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent, rgba(28,28,26,0.5))',
      }} />
    </section>
  )
}
