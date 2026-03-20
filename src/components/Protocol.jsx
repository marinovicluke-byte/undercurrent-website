import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Step animations ──────────────────────────────────────────────────────────

// Map: pulsing network diagram
function MapAnim({ color }) {
  const [phase, setPhase] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    const loop = () => { setPhase(p => p + 0.018); raf.current = requestAnimationFrame(loop) }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const nodes = [
    { x: 100, y: 50,  r: 14, label: 'You' },
    { x: 36,  y: 110, r: 9,  label: 'Email' },
    { x: 100, y: 130, r: 9,  label: 'CRM' },
    { x: 164, y: 110, r: 9,  label: 'Tasks' },
    { x: 52,  y: 190, r: 7,  label: 'Invoices' },
    { x: 148, y: 190, r: 7,  label: 'Leads' },
  ]
  const edges = [[0,1],[0,2],[0,3],[1,4],[3,5],[2,4],[2,5]]

  return (
    <svg viewBox="0 0 200 230" style={{ width: '100%', maxWidth: '180px' }}>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const pulse = 0.25 + 0.22 * Math.sin(phase + i * 0.9)
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={color} strokeOpacity={pulse}
            strokeWidth={0.7 + pulse * 0.8} strokeDasharray="3 5" />
        )
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 4}
            fill={color} fillOpacity={0.06 + 0.06 * Math.sin(phase + i)} />
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={i === 0 ? color : 'white'}
            fillOpacity={i === 0 ? 0.9 : 1}
            stroke={color} strokeOpacity={0.4} strokeWidth="1" />
          <text x={n.x} y={n.y + 4} textAnchor="middle"
            fontFamily="DM Mono, monospace" fontSize={i === 0 ? 7 : 6}
            fill={i === 0 ? 'white' : color} fillOpacity={0.85}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Build: blocks assembling top-to-bottom
function BuildAnim({ color, active }) {
  const rows = [
    { label: 'Connect Gmail', width: 0.85, delay: 0.1 },
    { label: 'Lead follow-up',  width: 0.7,  delay: 0.35 },
    { label: 'Invoice trigger', width: 0.9,  delay: 0.6 },
    { label: 'Review request',  width: 0.6,  delay: 0.85 },
    { label: 'Inbox triage',    width: 0.75, delay: 1.1 },
  ]
  return (
    <svg viewBox="0 0 180 200" style={{ width: '100%', maxWidth: '180px' }}>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="8" y={16 + i * 36} rx="6" ry="6"
            width={active ? 164 * r.width : 0} height="24"
            fill={color} fillOpacity={0.12}
            stroke={color} strokeOpacity={0.3} strokeWidth="1">
            <animate attributeName="width" from="0" to={164 * r.width}
              dur="0.5s" begin={active ? `${r.delay}s` : 'indefinite'} fill="freeze" />
          </rect>
          {active && (
            <text x="18" y={16 + i * 36 + 16}
              fontFamily="DM Mono, monospace" fontSize="7.5"
              fill={color} fillOpacity="0.75"
              style={{ opacity: 0, animation: `fadeIn 0.3s ease ${r.delay + 0.3}s forwards` }}>
              {r.label}
            </text>
          )}
          <circle cx={164 * r.width - 4} cy={16 + i * 36 + 12} r="4"
            fill={color} fillOpacity={active ? 0.7 : 0} />
        </g>
      ))}
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
    </svg>
  )
}

// Maintain: continuous orbit loop
function MaintainAnim({ color }) {
  const [phase, setPhase] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    const loop = () => { setPhase(p => p + 0.022); raf.current = requestAnimationFrame(loop) }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const cx = 90, cy = 100, r = 60
  const dots = [0, 1, 2, 3].map(i => {
    const angle = phase + (i * Math.PI * 2) / 4
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), i }
  })
  const labels = ['Leads', 'Clients', 'Invoices', 'Inbox']

  return (
    <svg viewBox="0 0 180 200" style={{ width: '100%', maxWidth: '180px' }}>
      {/* Orbit ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 6" />
      {/* Centre */}
      <circle cx={cx} cy={cy} r={18} fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.25" strokeWidth="1" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="7.5" fontWeight="600" fill={color} fillOpacity="0.8">Always</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="7" fill={color} fillOpacity="0.55">on</text>
      {/* Orbiting dots */}
      {dots.map(d => (
        <g key={d.i}>
          <circle cx={d.x} cy={d.y} r="8" fill="white" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
          <text x={d.x} y={d.y + 3} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="5.5" fill={color} fillOpacity="0.8">
            {labels[d.i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── Steps data ───────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01', word: 'Map', color: '#8FAF9F',
    tag: '30-min call · Free',
    title: 'We Find Where Your Time Is Going.',
    body: 'In a free 30-minute call, we go through everything you and your team do repeatedly. We rank tasks by time saved and show you exactly what can be automated — and what the impact would be. No obligation. You leave with a clear picture regardless.',
    bullets: ['Map every repetitive task in your business', 'Rank by time saved and revenue impact', 'Show you exactly what automation looks like for you'],
  },
  {
    num: '02', word: 'Build', color: '#C4A97A',
    tag: '2-week build · Done-for-you',
    title: "We Set It Up. You Don't Lift a Finger.",
    body: "We connect automations directly into the tools you already use. No new software to learn. Nothing changes about how you work. We just remove the slow, repetitive parts. Most clients are live within two weeks.",
    bullets: ['Built inside your existing tools — no new software', 'Full setup handled by our team', 'Live and running within 14 days'],
  },
  {
    num: '03', word: 'Maintain', color: '#6B7C4A',
    tag: 'Ongoing · Always on',
    title: 'It Runs. You Get Your Time Back.',
    body: "Your systems work around the clock — following up leads, looking after clients, keeping your inbox clear. You get your time back, and it stays that way as your business grows. We monitor, maintain, and improve everything as you scale.",
    bullets: ['Automations run 24/7 — even while you sleep', 'We monitor and maintain everything', 'Scales as your business grows'],
  },
]

export default function Protocol() {
  const [active, setActive] = useState(0)
  const [headRef, headVisible] = useVisible(0.15)
  const [tabRef, tabVisible] = useVisible(0.12)
  const [panelRef, panelVisible] = useVisible(0.08)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const step = STEPS[active]

  const vizMap = {
    '01': <MapAnim color={step.color} />,
    '02': <BuildAnim color={step.color} active={true} />,
    '03': <MaintainAnim color={step.color} />,
  }

  return (
    <section style={{ backgroundColor: '#F7F3ED', padding: '7rem 1.5rem 6rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <div
          ref={headRef}
          style={{
            marginBottom: '3rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="font-cormorant" style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 600, color: '#1C1C1A',
            lineHeight: 0.95, letterSpacing: '-0.025em',
            margin: '0 0 1.25rem',
          }}>
            Three steps.<br />
            <span style={{ color: '#8FAF9F' }}>Then it runs itself.</span>
          </h2>
          <p className="font-dm" style={{
            fontSize: '1rem', color: 'rgba(28,28,26,0.55)',
            maxWidth: '420px', lineHeight: 1.7, margin: '0 0 1.5rem',
          }}>
            You don't need to know how it works. You just need to know it does.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.85rem', borderRadius: '9999px',
            background: 'rgba(143,175,159,0.12)', border: '1px solid rgba(143,175,159,0.3)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#8FAF9F' }} />
            <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: '#8FAF9F', textTransform: 'uppercase' }}>
              The Process
            </span>
          </div>
        </div>

        {/* ── Tab buttons — Map / Build / Maintain ─────────────────────────── */}
        <div
          ref={tabRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            opacity: tabVisible ? 1 : 0,
            transform: tabVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {STEPS.map((s, i) => {
            const isActive = active === i
            return (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.1rem 1.5rem', borderRadius: '0.875rem',
                  border: isActive ? `1.5px solid ${s.color}50` : '1.5px solid rgba(28,28,26,0.1)',
                  background: isActive ? '#FFFFFF' : 'rgba(28,28,26,0.04)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 20px rgba(28,28,26,0.08)' : 'none',
                }}
              >
                <span className="font-mono" style={{
                  fontSize: '0.65rem', letterSpacing: '0.1em',
                  color: isActive ? s.color : 'rgba(28,28,26,0.28)',
                  transition: 'color 0.25s ease', flexShrink: 0,
                }}>
                  {s.num}
                </span>
                <span className="font-dm" style={{
                  fontSize: '1.05rem', fontWeight: 600,
                  color: isActive ? '#1C1C1A' : 'rgba(28,28,26,0.45)',
                  transition: 'color 0.25s ease',
                }}>
                  {s.word}
                </span>
                {isActive && (
                  <span style={{
                    marginLeft: 'auto', width: '7px', height: '7px', borderRadius: '50%',
                    background: s.color, boxShadow: `0 0 6px ${s.color}`, flexShrink: 0,
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Full-width content panel ──────────────────────────────────────── */}
        <div
          ref={panelRef}
          style={{
            background: '#FFFFFF',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 4px 32px rgba(28,28,26,0.08)',
            opacity: panelVisible ? 1 : 0,
            transform: panelVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 260px',
          }}
        >
          {/* Left: content */}
          <div style={{ padding: isMobile ? '2rem 1.5rem' : '3rem 3rem', position: 'relative' }}>
            {/* Accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: isMobile ? 0 : 'auto',
              bottom: isMobile ? 'auto' : 0,
              width: isMobile ? '100%' : '3px',
              height: isMobile ? '3px' : '100%',
              background: step.color, transition: 'background 0.3s ease',
            }} />

            <h3 className="font-dm" style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
              fontWeight: 800, color: '#1C1C1A',
              lineHeight: 1.2, margin: '0 0 1rem',
              letterSpacing: '-0.025em',
            }}>
              {step.title}
            </h3>

            <p className="font-dm" style={{
              fontSize: '0.95rem', color: 'rgba(28,28,26,0.6)',
              lineHeight: 1.75, margin: '0 0 1.75rem', maxWidth: '520px',
            }}>
              {step.body}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {step.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: `${step.color}15`, border: `1.5px solid ${step.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px',
                  }}>
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                      <path d="M1 3.5L3 5.5L7 1" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1C1C1A', margin: 0, lineHeight: 1.5 }}>
                    {b}
                  </p>
                </div>
              ))}
            </div>

            {/* Tag pill — bottom */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.3rem 0.8rem', borderRadius: '9999px',
              background: `${step.color}12`, border: `1px solid ${step.color}28`,
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: step.color }} />
              <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: step.color, textTransform: 'uppercase' }}>
                {step.tag}
              </span>
            </div>
          </div>

          {/* Right: animation panel */}
          {!isMobile && (
            <div style={{
              borderLeft: '1px solid rgba(28,28,26,0.07)',
              background: `linear-gradient(160deg, ${step.color}08 0%, transparent 60%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2.5rem',
              transition: 'background 0.4s ease',
            }}>
              {vizMap[step.num]}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
