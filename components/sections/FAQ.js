import SectionShell from '@/components/ui/SectionShell'
import JsonLd from '@/components/ui/JsonLd'

const FAQS = [
  {
    q: 'Will this actually work for my type of business?',
    a: 'We work with any service-based business, tradies, consultants, coaches, agencies, healthcare practices. If you have repetitive tasks and customers, we can automate it. The audit tells you exactly how much.',
  },
  {
    q: 'I\u2019m not tech-savvy, will I be able to manage this?',
    a: 'You don\u2019t manage anything. We build it, we maintain it, we fix it when something changes. You just receive the results. Most clients never need to open a settings panel.',
  },
  {
    q: 'What if it doesn\u2019t save me as much time as you say?',
    a: 'We don\u2019t guess. In the audit, we show you the exact hours and tasks we\u2019ll automate before we build anything. You see the numbers first. If they don\u2019t impress you, walk away, no charge.',
  },
  {
    q: 'How does this work with our existing tools?',
    a: 'We connect to the software you already use, Gmail, HubSpot, Notion, Slack, Xero, whatever you have. Nothing changes about how your team works. We add automation underneath, so the results happen without you having to think about it.',
  },
  {
    q: 'What does it actually cost?',
    a: 'We price based on what we save you. If automation saves your business $20,000 a year, we take a small share, you keep the rest. Most clients see their full investment back within six months. We show you the numbers in the free audit before you spend anything.',
  },
  {
    q: 'How long until we see results?',
    a: 'Most clients notice a difference in the first two weeks. The full system is live in 30 days. We move fast because we\u2019ve done this before. The free audit maps out exactly what gets automated and when.',
  },
  {
    q: 'Do we own the automations, or are we locked in?',
    a: 'You own everything we build. If you ever want to take it in-house or move on, the automations stay with you. We\u2019re not a subscription you can\u2019t escape, we\u2019re here to build something that works for your business long term.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQ() {
  return (
    <>
      <JsonLd schema={schema} />
      <SectionShell n="08" label="Common questions" anchor="faq" bg="panel">
        <style>{`
          .uc-faq-list {
            border-radius: 14px;
            border: 1px solid var(--text-faint);
            background: var(--charcoal);
            box-shadow: 6px 6px 0 0 var(--sage);
            overflow: hidden;
            max-width: 900px;
          }
          .uc-faq-item + .uc-faq-item {
            border-top: 1px solid var(--text-faint);
          }
          .uc-faq-item > summary {
            list-style: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 22px 26px;
          }
          .uc-faq-item > summary::-webkit-details-marker { display: none; }
          .uc-faq-item > summary::marker { display: none; }
          .uc-faq-item > summary:hover { background: rgba(255,255,255,0.02); }
          .uc-faq-item[open] > summary { background: rgba(143,175,159,0.04); }
          .uc-faq-q {
            flex: 1;
            margin: 0;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: 18px;
            letter-spacing: -0.015em;
            color: var(--off-white);
            line-height: 1.35;
          }
          .uc-faq-icon {
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: var(--sage);
            font-size: 22px;
            font-family: var(--font-body);
            font-weight: 300;
            line-height: 1;
            flex-shrink: 0;
            transition: transform 0.2s ease;
          }
          .uc-faq-item[open] .uc-faq-icon { transform: rotate(45deg); }
          .uc-faq-a {
            margin: 0;
            padding: 0 26px 24px;
            font-family: var(--font-body);
            font-size: 15px;
            line-height: 1.7;
            color: var(--text-secondary);
            max-width: 760px;
          }
        `}</style>

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
          {'We\u2019ve heard every '}
          <span className="uc-glow-word uc-glow-word--sage">objection</span>
          {'. Here\u2019s the truth.'}
        </h2>

        <p
          style={{
            margin: '24px 0 0',
            maxWidth: 640,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          Honest answers to the questions we get asked most, before anyone writes a cheque.
        </p>

        <div className="uc-faq-list" style={{ marginTop: 56 }}>
          {FAQS.map((faq, i) => (
            <details key={i} className="uc-faq-item" open={i === 0}>
              <summary>
                <h3 className="uc-faq-q">{faq.q}</h3>
                <span className="uc-faq-icon" aria-hidden="true">+</span>
              </summary>
              <p className="uc-faq-a">{faq.a}</p>
            </details>
          ))}
        </div>
      </SectionShell>
    </>
  )
}
