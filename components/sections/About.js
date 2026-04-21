import SectionShell from '@/components/ui/SectionShell'
import PillCTA from '@/components/ui/PillCTA'
import Link from 'next/link'

const LUKE = {
  name: 'Luke Marinovic',
  role: 'Founder, UnderCurrent Automations',
  location: 'Melbourne, VIC',
  paragraphs: [
    'Hi, I’m Luke. I started UnderCurrent Automations, a Melbourne AI automation agency, after watching too many Australian small businesses grind through work the way they\u2019d always done it, because no one had stopped to ask if they still had to. The answer, most of the time, is no. Automate the repetitive, and what\u2019s left is the work that moves things forward: revenue, creativity, time with the people you like.',
    'Today we run lead generation, sales automation, and business process automation for Australian tradies, consultants, allied health practices, and business services. Most builds go live in 14 days.',
  ],
}

function SignatureCard() {
  return (
    <aside
      style={{
        padding: '36px 40px',
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        borderRadius: 14,
        boxShadow: '6px 6px 0 0 var(--blue)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 32,
          letterSpacing: '-0.025em',
          color: 'var(--off-white)',
          lineHeight: 1,
        }}
      >
        {LUKE.name}
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {LUKE.role}
      </div>
      <hr
        style={{
          border: 'none',
          height: 1,
          background: 'var(--text-faint)',
          margin: '24px 0',
        }}
      />
      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: '110px 1fr',
          gap: 12,
          fontSize: 13,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        <dt style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Based</dt>
        <dd style={{ margin: 0, color: 'var(--off-white)' }}>{LUKE.location}</dd>
        <dt style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Founded</dt>
        <dd style={{ margin: 0, color: 'var(--off-white)' }}>February 2026</dd>
        <dt style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Focus</dt>
        <dd style={{ margin: 0, color: 'var(--off-white)' }}>Australian SMBs</dd>
        <dt style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 500 }}>Stack</dt>
        <dd style={{ margin: 0, color: 'var(--off-white)' }}>n8n · Modal · Next.js · Claude · GPT</dd>
      </dl>
    </aside>
  )
}

export default function About() {
  return (
    <SectionShell n="05" label="About us" anchor="about" bg="deep">
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(44px, 5.4vw, 84px)',
          lineHeight: 1.0,
          letterSpacing: '-0.035em',
          color: 'var(--off-white)',
          textWrap: 'balance',
          maxWidth: 1100,
        }}
      >
        Founded in Melbourne, <span className="uc-glow-word uc-glow-word--blue">2026</span>.
      </h2>

      <div
        className="uc-stack-2col"
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr',
          gap: 72,
          alignItems: 'start',
        }}
      >
        <div>
          {LUKE.paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                marginTop: i === 0 ? 0 : 18,
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: 520,
              }}
            >
              {para}
            </p>
          ))}

          <div
            style={{
              marginTop: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <PillCTA label="Let's talk" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="blue" />
            <Link
              href="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 999,
                border: '1px solid var(--text-faint)',
                background: 'transparent',
                color: 'var(--off-white)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                transition: 'border-color 150ms ease, background 150ms ease',
              }}
            >
              Read more <span aria-hidden style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        </div>

        <SignatureCard />
      </div>
    </SectionShell>
  )
}
