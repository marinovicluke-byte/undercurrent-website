import SectionShell from '@/components/ui/SectionShell'
import JsonLd from '@/components/ui/JsonLd'

const FAQS = [
  {
    q: 'What is UnderCurrent Automations?',
    a: 'UnderCurrent Automations is a Melbourne-based AI automation agency that builds custom workflow systems for Australian small businesses. We plug into the tools your team already uses (Xero, HubSpot, Gmail, Notion, Slack, Google Workspace, n8n) and automate the repetitive work behind them: lead follow-up, invoice chasing, review requests, inbox triage, reporting. You keep working the way you always have. The admin runs itself underneath.',
  },
  {
    q: 'Will this work for my type of business?',
    a: 'We work with service-based businesses across four verticals: tradies (plumbers, electricians, builders, landscapers), business services (accountants, agencies, bookkeepers), consultants (coaches, strategists, advisors), and allied health practitioners (physio, chiro, psychology, dental). If your team does repetitive work and has customers, there’s a system inside it that can run itself. The free audit shows you which parts first.',
  },
  {
    q: 'I’m not tech-savvy. Will I be able to manage it?',
    a: 'You don’t manage it. We build the system, connect it to your tools, and monitor it as it runs. When something changes in your business or one of your apps releases an update, we handle the fix. Most clients never open a settings panel. Your job is to tell us what you want changed. Our job is everything else.',
  },
  {
    q: 'How does this work with the tools we already use?',
    a: 'We connect directly into the software your team already runs. Xero or MYOB for invoicing, HubSpot or Salesforce for CRM, Cliniko or Halaxy for allied health bookings, Shopify for retail. Gmail, Outlook, Slack, Notion, and ClickUp for the daily grind. Nothing changes about how your team works. The automations sit underneath, so the results land without anyone pushing a button.',
  },
  {
    q: 'What does it cost?',
    a: 'Flat pricing, no hourly billing. Starter project builds start at $1,500 for a single workflow. The Growth retainer starts at $1,200 a month for ongoing builds and optimisation. Done-with-you guidance starts at $500 a month if your team wants to drive the work. Every quote is fixed before you commit. The free audit shows which option fits and the projected return against the build cost.',
  },
  {
    q: 'How long until we see results?',
    a: 'Most clients notice the first automations running inside two weeks. Full systems typically go live in 4 to 6 weeks once requirements lock, depending on the integrations involved. We’ve built these workflows before, the wiring isn’t from scratch. The audit maps out what ships first, what ships second, and when each piece starts paying back.',
  },
  {
    q: 'What if it doesn’t save me as much time as you say?',
    a: 'You see the numbers before we build anything. In the audit, we walk through the exact tasks we’ll automate, the hours they’ll save, and the revenue they’ll recover. If the projected saving doesn’t justify the work, you keep the audit, the call is free, and we part ways. Our zero-risk guarantee: if we can’t find at least five hours a week to automate in the audit, you owe us nothing.',
  },
  {
    q: 'Do we own the automations, or are we locked in?',
    a: 'You own everything. Every workflow we build sits inside your accounts, on your logins, wired to your data. If you ever want to take it in-house or walk away, the system stays with you. No vendor lock-in, no black-box tools you can’t access. Ongoing maintenance is a service you choose to keep, not a cage you can’t leave.',
  },
  {
    q: 'Do you work outside Melbourne?',
    a: 'Yes. We’re based in Melbourne, but delivery is fully remote, so we work with clients in Sydney, Brisbane, Perth, Adelaide, and regional towns across every Australian state. Each major city has a dedicated page with regional context if you want the detail. The process itself is the same wherever you are: a video audit, a remote build, and ongoing support through the channels you already use.',
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
          {'The questions that come up '}
          <span className="uc-glow-word uc-glow-word--sage">before anyone decides</span>
          {'. Answered straight.'}
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
          The questions we get asked most, before anyone writes a cheque.
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
