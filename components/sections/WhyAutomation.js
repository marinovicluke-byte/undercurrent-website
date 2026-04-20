import SectionShell from '@/components/ui/SectionShell'

const WHY_PILLARS = [
  {
    tag: 'Revenue',
    stat: '34%',
    statPrefix: '+',
    statSuffix: '',
    body:
      'Companies running real automations see 34% higher revenue growth than the ones still handling it by hand.',
  },
  {
    tag: 'Time',
    stat: '10',
    statSuffix: 'h',
    body:
      'Across sales, ops, and marketing, mature automations return 6 to 16 hours a week. Ten is the conservative floor.',
  },
  {
    tag: 'Uptime',
    stat: '24',
    statSuffix: '/7',
    body:
      'Workflows qualify leads, send invoices, and chase follow-ups while you sleep. Weekends and holidays included.',
  },
]

const WHY_ACCENT = {
  Revenue: { rgb: '224, 122, 85', rgbLight: '236, 158, 128' },
  Time: { rgb: '143, 175, 159', rgbLight: '168, 196, 184' },
  Uptime: { rgb: '106, 141, 173', rgbLight: '138, 174, 200' },
}

const WHY_HEADLINES = {
  Revenue: 'Businesses that automate outgrow the ones that don\u2019t.',
  Time: 'Ten hours a week, every week, back in the founder\u2019s calendar.',
  Uptime: 'Your operations don\u2019t clock off when you do.',
}

function WhyCards() {
  return (
    <div style={{ position: 'relative', padding: 0 }}>
      <div
        className="uc-why-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          alignItems: 'stretch',
        }}
      >
      <style>{`
        @media (max-width: 780px) {
          .uc-why-cards {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .uc-why-cards > article {
            min-height: 0 !important;
            padding: 26px 24px !important;
          }
        }
      `}</style>
        {WHY_PILLARS.map((p, i) => {
          const a = WHY_ACCENT[p.tag]
          return (
            <article
              key={p.tag}
              style={{
                padding: '32px 32px 30px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                boxShadow: `6px 6px 0 0 rgb(${a.rgb})`,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 26,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: `rgb(${a.rgbLight})`,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 11,
                    color: 'var(--off-white)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {p.tag}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 60,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--off-white)',
                  display: 'flex',
                  alignItems: 'baseline',
                  marginBottom: 22,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.statPrefix && (
                  <span style={{ fontSize: '0.5em', color: 'var(--text-muted)', marginRight: 3 }}>{p.statPrefix}</span>
                )}
                <span>{p.stat}</span>
                {p.statSuffix && (
                  <span
                    style={{
                      fontSize: '0.5em',
                      color: 'var(--text-muted)',
                      marginLeft: 2,
                    }}
                  >
                    {p.statSuffix}
                  </span>
                )}
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 22,
                  lineHeight: 1.22,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  maxWidth: 300,
                  textWrap: 'balance',
                  marginBottom: 14,
                }}
              >
                {WHY_HEADLINES[p.tag]}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  maxWidth: 300,
                }}
              >
                {p.body}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default function WhyAutomation() {
  return (
    <SectionShell
      n="02"
      label="The case"
      title="The case for automation, in three numbers."
      glowWords={['three', 'numbers']}
      glowClass="uc-glow-word uc-glow-word--sage"
      lede="Three stats every Australian small-business owner should read before the next hire. All conservative."
      bg="panel"
      anchor="why"
    >
      <WhyCards />
    </SectionShell>
  )
}
