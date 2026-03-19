import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Check, Shield } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'

// ─── Intersection Observer fade-in hook ──────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

// ─── Animated section wrapper ─────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const [ref, visible] = useFadeIn()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Problem accordion ────────────────────────────────────────────────────────
const PROBLEMS = [
  { num: '01', label: 'Customer Experience', title: 'Clients Slipping Through the Gaps', desc: "Without a system, follow-ups don't happen. Reviews never get asked for. Referrals — your best leads — just don't come." },
  { num: '02', label: 'Sales', title: "Leads Going Cold While You're Busy", desc: "Manual follow-up means half your pipeline dies before you get back to it. Every delayed reply is a lost deal." },
  { num: '03', label: 'Content Design', title: "Content That Never Gets Made", desc: "You know you should be publishing. But creating, formatting, and distributing content takes hours you don't have." },
  { num: '04', label: 'Personal System', title: "Your Inbox Is Running Your Day", desc: "The average business owner loses 3–4 hours daily to email and scheduling. That's 800+ hours a year not spent growing." },
  { num: '05', label: 'Finance', title: "Chasing Invoices You've Already Earned", desc: "Every hour spent following up late payments or reconciling receipts is an hour your business isn't moving forward." },
]

function ProblemAccordion() {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ border: '1px solid rgba(28,28,26,0.1)', borderRadius: '1.25rem', overflow: 'hidden', backgroundColor: '#fff' }}>
      {PROBLEMS.map((p, i) => (
        <div key={p.num} style={{ borderBottom: i < PROBLEMS.length - 1 ? '1px solid rgba(28,28,26,0.07)' : 'none' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '1.1rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(143,175,159,0.6)', letterSpacing: '0.12em', flexShrink: 0, width: '1.6rem' }}>{p.num}</span>
            <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(143,175,159,0.75)', border: '1px solid rgba(143,175,159,0.2)', borderRadius: '9999px', padding: '0.18rem 0.55rem', flexShrink: 0, whiteSpace: 'nowrap' }}>{p.label}</span>
            <span className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 500, color: '#1C1C1A', flex: 1, lineHeight: 1.3 }}>{p.title}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 300, color: open === i ? '#8FAF9F' : 'rgba(28,28,26,0.3)', transition: 'color 0.2s ease', flexShrink: 0, lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
          </button>
          <div style={{ maxHeight: open === i ? '120px' : '0', overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(28,28,26,0.55)', lineHeight: 1.7, padding: '0 1.5rem 1.1rem 3.8rem', margin: 0 }}>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Eyebrow tag ──────────────────────────────────────────────────────────────
function Eyebrow({ children, light = false }) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        color: light ? 'rgba(143,175,159,0.9)' : '#8FAF9F',
        marginBottom: '1rem',
        fontWeight: 500,
      }}
    >
      {children}
    </p>
  )
}

// ─── Story visual rows ────────────────────────────────────────────────────────
function StoryRow({ dot, label, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dot, flexShrink: 0, marginTop: '5px' }} />
      <div>
        <span className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(247,243,237,0.35)', letterSpacing: '0.1em', display: 'block' }}>{label}</span>
        <span className="font-dm" style={{ fontSize: '0.75rem', color: 'rgba(247,243,237,0.55)', fontWeight: 300 }}>{text}</span>
      </div>
    </div>
  )
}

// ─── CTA LINK ─────────────────────────────────────────────────────────────────
const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      q: 'How does this work with our existing tools?',
      a: "We build on top of what you already use — HubSpot, Notion, Gmail, Slack, or custom software. No rip-and-replace. Just intelligent layers added on top.",
    },
    {
      q: 'What does it actually cost?',
      a: "There's a one-time project fee scoped to what your business needs — priced on the value it creates, not an hourly rate. Then a monthly subscription for ongoing maintenance. We scope both on the call, so you know the number before committing.",
    },
    {
      q: 'How long until we see results?',
      a: "Most clients see meaningful time savings within the first two weeks of deployment. Full ROI typically lands within the first month. We move fast because we've built this before.",
    },
    {
      q: 'Do we own the automations or are we locked in?',
      a: "You own everything. The automations live in your tools and accounts. The monthly subscription keeps them maintained and improved — but you're never locked in.",
    },
  ]

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <style>{`
        .lp-hero-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .lp-check-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(143,175,159,0.2);
          border: 1px solid rgba(143,175,159,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .lp-scroll-indicator {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          opacity: 0.4;
          animation: lp-bounce 2s ease-in-out infinite;
        }
        @keyframes lp-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .lp-faq-item {
          border-bottom: 1px solid rgba(212,201,176,0.4);
        }
        .lp-faq-answer {
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        .lp-step-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          font-weight: 500;
        }
        @media (max-width: 767px) {
          .lp-proof-grid { grid-template-columns: 1fr 1fr !important; }
          .lp-three-col { grid-template-columns: 1fr !important; }
          .lp-hero-h1 { font-size: clamp(2.8rem, 12vw, 6rem) !important; }
        }
      `}</style>

      <ScrollProgressBar />
      <Navbar isSubPage={true} />

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 30%, #3d4f42 55%, #8FAF9F 80%, #D4C9B0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '8rem 1.5rem 6rem',
          textAlign: 'center',
        }}
      >
        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        />

        <div style={{ maxWidth: '760px', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(143,175,159,0.35)',
              backgroundColor: 'rgba(143,175,159,0.08)',
              marginBottom: '2rem',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: '#8FAF9F' }}>
              MELBOURNE AI AUTOMATION STUDIO
            </span>
          </div>

          {/* H1 */}
          <h1 style={{ margin: 0, lineHeight: 1.05 }}>
            <span
              className="lp-hero-h1 font-dm"
              style={{
                display: 'block',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                fontWeight: 700,
                color: '#F7F3ED',
                letterSpacing: '-0.03em',
              }}
            >
              Get 12 Hours Back
            </span>
            <span
              className="font-cormorant"
              style={{
                display: 'block',
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#8FAF9F',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Every Week.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="font-dm"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: 300,
              color: 'rgba(232,224,208,0.65)',
              lineHeight: 1.7,
              marginTop: '1.75rem',
              marginBottom: '2rem',
              maxWidth: '580px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            We build AI systems that automatically handle your follow-ups, invoices, and client communications. Inside your existing tools. Most clients go live within 14 days.
          </p>

          {/* Bullets */}
          <ul
            className="lp-hero-bullets"
            style={{
              listStyle: 'none',
              margin: '0 auto 2.5rem',
              padding: 0,
              maxWidth: '460px',
              textAlign: 'left',
            }}
          >
            {[
              "100% done-for-you setup — you don't touch a thing",
              'No new software — works inside what you already use',
              'Most clients see ROI within the first 30 days',
            ].map((item) => (
              <li key={item}>
                <div className="lp-check-circle">
                  <Check size={11} color="#8FAF9F" strokeWidth={2.5} />
                </div>
                <span
                  className="font-dm"
                  style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(232,224,208,0.8)', lineHeight: 1.5 }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sage-hero"
              style={{ fontSize: '1rem', padding: '0.9rem 2rem', gap: '0.6rem' }}
            >
              <span>Book Your Free Workflow Audit</span>
              <ArrowRight size={18} />
            </a>
            <p
              className="font-mono"
              style={{ fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(232,224,208,0.4)', margin: 0 }}
            >
              Free 30-min call · No obligation · No tech knowledge needed
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="lp-scroll-indicator">
          <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(232,224,208,0.4)' }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(232,224,208,0.4)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — PROOF STRIP
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: '#1C1C1A',
          borderTop: '1px solid rgba(143,175,159,0.1)',
          borderBottom: '1px solid rgba(143,175,159,0.1)',
          padding: '3rem 1.5rem',
        }}
      >
        <div
          className="lp-proof-grid"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {[
            { stat: '+31%', label: 'More 5-star reviews', color: '#C4A97A' },
            { stat: '+40%', label: 'More leads converted', color: '#8FAF9F' },
            { stat: '12 hrs', label: 'Saved per week', color: '#D4C9B0' },
            { stat: '14 days', label: 'Average time to go live', color: '#89ACBE' },
          ].map((item) => (
            <div key={item.label} style={{ padding: '0.5rem' }}>
              <p
                className="font-cormorant"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: item.color, margin: '0 0 0.35rem', lineHeight: 1 }}
              >
                {item.stat}
              </p>
              <p
                className="font-mono"
                style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(212,201,176,0.45)', margin: 0 }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — PROBLEM
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F3ED', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Eyebrow>THE PROBLEM</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2
              className="font-cormorant"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#1C1C1A', lineHeight: 1.15, maxWidth: '700px', margin: '0 auto' }}
            >
              You're the most expensive person in your business doing the cheapest tasks.
            </h2>
          </Reveal>
          <Reveal delay={140} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p
              className="font-dm"
              style={{ fontSize: '1.05rem', fontWeight: 300, color: 'rgba(28,28,26,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}
            >
              If you're manually chasing invoices, following up leads, or writing the same email for the tenth time — you're stuck working in your business instead of on it.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <ProblemAccordion />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT YOU GET
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Eyebrow light>WHAT YOU GET</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2
              className="font-cormorant"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15 }}
            >
              Three outcomes every client gets — guaranteed.
            </h2>
          </Reveal>

          <div
            className="lp-three-col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
          >
            {[
              {
                accent: '#6B7C4A',
                service: 'Sales',
                stat: '3×',
                label: 'More pipeline, same team',
                desc: "Lead sourcing, personalised outreach, and follow-up sequences running while you sleep. Your team only steps in when someone's ready to talk.",
                rows: [
                  { dot: '#6B7C4A', label: 'TRIGGER', text: 'New lead matched ICP' },
                  { dot: '#6B7C4A', label: 'AUTO ACTION', text: 'Personalised sequence sent' },
                  { dot: '#6B7C4A', label: 'RESULT', text: 'Meeting booked' },
                ],
              },
              {
                accent: '#8FAF9F',
                service: 'Customer Experience',
                stat: '68%',
                label: 'Reduction in early churn',
                desc: "Every client gets the same great experience — welcome sequences, check-ins, review requests, and referral triggers — without you remembering to do any of it.",
                rows: [
                  { dot: '#8FAF9F', label: 'TRIGGER', text: 'Contract signed' },
                  { dot: '#8FAF9F', label: 'AUTO ACTION', text: 'Welcome sequence begins' },
                  { dot: '#8FAF9F', label: 'RESULT', text: 'Review + referral sent' },
                ],
              },
              {
                accent: '#89ACBE',
                service: 'Personal System',
                stat: '8 hrs',
                label: 'Back every week, per person',
                desc: "Inbox triage, reply drafts, meeting scheduling, and pre-call briefs — so you only touch what actually needs you, and nothing important slips through.",
                rows: [
                  { dot: '#89ACBE', label: 'TRIGGER', text: '24 unread emails' },
                  { dot: '#89ACBE', label: 'AUTO ACTION', text: 'Triaged, drafted, flagged' },
                  { dot: '#89ACBE', label: 'RESULT', text: '3 items need your attention' },
                ],
              },
            ].map((card, i) => (
              <Reveal key={card.stat} delay={i * 100}>
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(247,243,237,0.07)',
                    borderTop: `3px solid ${card.accent}`,
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: card.accent, border: `1px solid ${card.accent}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem' }}
                  >
                    {card.service}
                  </span>
                  <p className="font-cormorant" style={{ fontSize: '3rem', fontWeight: 600, color: card.accent, margin: '0 0 0.1rem', lineHeight: 1 }}>
                    {card.stat}
                  </p>
                  <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
                    {card.label}
                  </p>
                  <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem', flexGrow: 1 }}>
                    {card.desc}
                  </p>
                  <div style={{ backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '0.75rem', padding: '1rem 1.1rem', border: `1px solid ${card.accent}20` }}>
                    {card.rows.map((row) => (
                      <StoryRow key={row.label} dot={row.dot} label={row.label} text={row.text} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F3ED', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Eyebrow>THE PROCESS</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#1C1C1A', lineHeight: 1.15 }}>
              Three steps. Then it runs itself.
            </h2>
          </Reveal>
          <Reveal delay={120} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 300, color: 'rgba(28,28,26,0.5)', maxWidth: '480px', margin: '0 auto' }}>
              From your first call to a fully running system — in about two weeks.
            </p>
          </Reveal>

          <div className="lp-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              {
                num: '01',
                accent: '#8FAF9F',
                tagBg: 'rgba(143,175,159,0.1)',
                tagBorder: 'rgba(143,175,159,0.3)',
                tag: '30-min call · Free',
                title: 'We Find Where Your Time Is Going',
                body: "In a free 30-minute call, we go through everything you and your team do repeatedly. We rank tasks by time saved and show you exactly what can be automated — and what the impact would be.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#8FAF9F" strokeWidth="1.5" fill="none" />
                    <line x1="12" y1="8" x2="12" y2="16" stroke="#8FAF9F" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="#8FAF9F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                num: '02',
                accent: '#C4A97A',
                tagBg: 'rgba(196,169,122,0.1)',
                tagBorder: 'rgba(196,169,122,0.3)',
                tag: '2-week build · Done-for-you',
                title: "We Set It Up. You Don't Lift a Finger.",
                body: "We connect automations directly into the tools you already use. No new software to learn. Nothing changes about how you work. We just remove the slow, repetitive parts.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z" stroke="#C4A97A" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                  </svg>
                ),
              },
              {
                num: '03',
                accent: '#6B7C4A',
                tagBg: 'rgba(107,124,74,0.1)',
                tagBorder: 'rgba(107,124,74,0.3)',
                tag: 'Ongoing · Maintained',
                title: "It Runs. You Don't Have To.",
                body: "Your systems work around the clock — following up leads, looking after clients, keeping your inbox clear. You get your time back, and it stays that way as your business grows.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12 Q6 6 12 12 Q18 18 22 12" stroke="#6B7C4A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M2 17 Q6 11 12 17 Q18 23 22 17" stroke="#6B7C4A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                ),
              },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(212,201,176,0.6)',
                    borderRadius: '1.25rem',
                    padding: '2.25rem 2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    className="font-cormorant"
                    style={{ position: 'absolute', top: '-0.5rem', right: '1rem', fontSize: '7rem', fontWeight: 700, color: 'rgba(143,175,159,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {step.num}
                  </span>
                  <div style={{ marginBottom: '1.25rem' }}>{step.icon}</div>
                  <h3 className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1C1C1A', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(28,28,26,0.55)', lineHeight: 1.7, margin: '0 0 1.5rem', flexGrow: 1 }}>
                    {step.body}
                  </p>
                  <span className="lp-step-tag font-mono" style={{ backgroundColor: step.tagBg, border: `1px solid ${step.tagBorder}`, color: step.accent, alignSelf: 'flex-start' }}>
                    {step.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — GRAND SLAM OFFER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal style={{ marginBottom: '1rem' }}>
            <Eyebrow light>THE OFFER</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ marginBottom: '0.75rem' }}>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15 }}>
              Everything included. Nothing held back.
            </h2>
          </Reveal>
          <Reveal delay={120} style={{ marginBottom: '3rem' }}>
            <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(247,243,237,0.5)', lineHeight: 1.7 }}>
              Here's exactly what you get when you work with UnderCurrent.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', marginBottom: '3rem' }}>
              {['Customer Experience', 'Sales', 'Content Design', 'Personal System', 'Finance'].map((s) => (
                <span key={s} className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(143,175,159,0.8)', border: '1px solid rgba(143,175,159,0.2)', borderRadius: '9999px', padding: '0.35rem 0.9rem' }}>{s}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ borderTop: '1px solid rgba(143,175,159,0.12)', borderBottom: '1px solid rgba(143,175,159,0.12)', padding: '2rem 0', marginBottom: '2.5rem' }}>
              {[
                'Done-for-you build inside your existing tools.',
                'Ongoing maintenance and support — always.',
                'Results in 30 days. Or we keep going.',
              ].map((line, i) => (
                <p key={i} className="font-cormorant" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, fontStyle: 'italic', color: i === 2 ? '#8FAF9F' : 'rgba(247,243,237,0.7)', margin: i < 2 ? '0 0 0.5rem' : 0, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ backgroundColor: 'rgba(143,175,159,0.06)', border: '1px solid rgba(143,175,159,0.18)', borderRadius: '1rem', padding: '1.5rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}>
              <Shield size={18} color="#8FAF9F" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: '#F7F3ED', fontWeight: 500 }}>Zero-Risk Guarantee.</strong> If we can't find you 5+ automatable hours in the audit — it's free. You keep every insight.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" className="btn-sage-hero" style={{ fontSize: '0.95rem', padding: '0.85rem 1.75rem', display: 'inline-flex' }}>
                <span>Book Your Free Audit →</span>
              </a>
              <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.25)', marginTop: '0.75rem' }}>
                Free 30-min call · No obligation · No tech knowledge needed
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — OBJECTION KILLERS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F3ED', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Eyebrow>COMMON CONCERNS</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#1C1C1A', lineHeight: 1.15 }}>
              We've heard every objection. Here's the truth.
            </h2>
          </Reveal>

          <div className="lp-three-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              {
                concern: 'Will this actually work for my type of business?',
                answer: 'We work with any service-based business — tradies, consultants, coaches, agencies, healthcare practices. If you have repetitive tasks and customers, we can automate it. The audit tells you exactly how much.',
              },
              {
                concern: "I'm not tech-savvy — will I be able to manage this?",
                answer: "You don't manage anything. We build it, we maintain it, we fix it when something changes. You just receive the results. Most clients never need to open a settings panel.",
              },
              {
                concern: "What if it doesn't save me as much time as you say?",
                answer: "We don't guess. In the audit, we show you the exact hours and tasks we'll automate before we build anything. You see the numbers first. If they don't impress you, walk away — no charge.",
              },
            ].map((card, i) => (
              <Reveal key={card.concern} delay={i * 100}>
                <div
                  style={{
                    backgroundColor: 'rgba(232,224,208,0.5)',
                    border: '1px solid rgba(212,201,176,0.7)',
                    borderTop: '3px solid #8FAF9F',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    height: '100%',
                  }}
                >
                  <p className="font-cormorant" style={{ fontSize: '1.35rem', fontStyle: 'italic', fontWeight: 500, color: '#1C1C1A', margin: '0 0 1rem', lineHeight: 1.35 }}>
                    "{card.concern}"
                  </p>
                  <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(28,28,26,0.6)', lineHeight: 1.7, margin: 0 }}>
                    {card.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F3ED', padding: '3rem 1.5rem 7rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <Eyebrow>QUESTIONS</Eyebrow>
          </Reveal>
          <Reveal delay={80} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="font-cormorant" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 600, color: '#1C1C1A', lineHeight: 1.2 }}>
              Still on the fence? These might help.
            </h2>
          </Reveal>

          <div>
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="lp-faq-item">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '1.4rem 0', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: '1rem', textAlign: 'left',
                    }}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-dm" style={{ fontSize: '1rem', fontWeight: 500, color: '#1C1C1A', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%',
                        border: '1px solid rgba(143,175,159,0.4)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: '#8FAF9F',
                        transition: 'transform 0.3s ease',
                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        fontSize: '1.1rem', lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="lp-faq-answer"
                    style={{ maxHeight: openFaq === i ? '300px' : '0', opacity: openFaq === i ? 1 : 0 }}
                  >
                    <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(28,28,26,0.6)', lineHeight: 1.7, paddingBottom: '1.4rem', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9 — FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#1C1C1A', padding: '8rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <h2
              className="font-cormorant"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.2, marginBottom: '1.5rem' }}
            >
              What would you do with 12 hours back every week?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(247,243,237,0.5)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              Book a free 30-minute audit. We'll show you exactly where your time is going and map out what an automated version of your business looks like. No obligation — just a clear picture.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sage-hero"
              style={{ fontSize: '1rem', padding: '0.9rem 2rem', display: 'inline-flex' }}
            >
              <span>Book Your Free Workflow Audit →</span>
            </a>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {['Free', 'No obligation', 'Results in 30 days'].map((chip, i) => (
                <span key={chip} className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(247,243,237,0.25)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {i > 0 && <span style={{ color: 'rgba(143,175,159,0.2)', marginRight: '-0.25rem' }}>·</span>}
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
