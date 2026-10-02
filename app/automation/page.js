// app/automation/page.js — the AI Automation service page, the sandbox's
// service-automation poured in. Markup verbatim from the mockup, behaviour in
// ServiceFx. Industries dial resolved to the grid.
import '@/app/styles/automation.css'
import '@/app/styles/service-blocks.css'
import ServiceFx from '@/components/site/ServiceFx'
import { ServiceFigures, ServiceSteps, ServiceWhat, ServiceIncludes } from '@/components/site/ServiceBlocks'
import JsonLd from '@/components/ui/JsonLd'

const DOMAIN = 'https://undercurrentautomations.com'
const URL = DOMAIN + '/automation'
const TITLE = 'AI Automation | UnderCurrent Automations'
const DESC = 'Not a forecast. The record from the last two years: the businesses running AI grow faster, get hours back every week, and make more money.'

export const metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Automation',
  serviceType: 'Business process automation',
  provider: { '@id': DOMAIN + '#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  url: URL,
  description: DESC,
}

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'AI Automation', item: URL },
  ],
}

// the shared sections' copy (components/site/ServiceBlocks.js)
const FIGURES = [
  [
    "2.8x",
    "faster growth for Australian SMEs using AI than those that aren't"
  ],
  [
    "5.6 hrs",
    "saved a week, per worker, once AI is in the routine"
  ],
  [
    "$209k",
    "average revenue lift for Australian businesses running AI"
  ]
]

const STEPS = [
  [
    "Talk",
    "How the work moves today, and what a good week looks like once it doesn't need you."
  ],
  [
    "Map",
    "The automations and the workflows around them, drawn before anything is built."
  ],
  [
    "Build, together",
    "You see it early and often, so it fits how your team actually works."
  ],
  [
    "Stay",
    "Handover, then we're with you until it's part of the routine. You're not left alone with it."
  ]
]

const WHAT = {
  "h2": "Software that does the admin. Broad on purpose.",
  "open": "AI automation is a wide term, and that's the point. It covers every part of the business that follows a pattern:",
  "flow": [
    "A job comes in",
    "A quote goes out",
    "An invoice is raised",
    "A follow-up falls due"
  ],
  "close": "A system watches for the trigger and does the steps, on the tools you already pay for.",
  "rest": "The AI part is judgment: reading an email, pulling the details out of a photo of a job sheet, drafting the reply. The automation part is the plumbing that moves it along. We build both, and you approve anything that goes out with your name on it.",
  "areas": [
    [
      "Finance",
      "Invoicing, chasing, reconciliation, the Monday numbers."
    ],
    [
      "Sales",
      "Enquiries answered, quotes drafted, follow-ups on the third day, the CRM kept honest."
    ],
    [
      "Marketing",
      "Content drafted, posts scheduled, leads captured and sorted."
    ],
    [
      "Operations",
      "Bookings, reminders, job sheets into the system, reports out the other end."
    ]
  ]
}

// what the build includes, grouped under the step of the process that delivers each thing
const STAGES = [
  {
    "n": 2,
    "step": "Map",
    "items": [
      [
        "The process map",
        "The workflows drawn, before and after. Yours to keep, whatever you decide."
      ]
    ]
  },
  {
    "n": 3,
    "step": "Build, together",
    "items": [
      [
        "The automation",
        "Built on the tools you already use, tested on your real jobs, not sample data."
      ],
      [
        "Documentation",
        "How it works and how to change it, in plain words, not a developer's notes."
      ],
      [
        "Training",
        "A session with the people who'll actually use it, recorded so you can rewatch."
      ]
    ]
  },
  {
    "n": 4,
    "step": "Stay",
    "items": [
      [
        "Monitoring",
        "It tells us when something breaks, before it tells you."
      ],
      [
        "30 days of support",
        "After handover, included. Longer if you want it."
      ]
    ]
  }
]

export default function Automation() {
  return (
    <>
      <ServiceFx />
      <JsonLd schema={schema} />
      <JsonLd schema={breadcrumbs} />
<section className="hero" id="top" data-reveal="">
  <div className="hero__layer band"></div>
  <div className="hero__layer hero__glow b"></div>
  <div className="hero__layer hero__static"></div>
  <div className="hero__layer hero__grain"></div>
  <div className="hero__inner">
    <h1 className="rv">AI Automation</h1>
    <a className="link rv" style={{"--i":"1"}} href="#contact">Let's chat</a>
  </div>
</section>

<section className="sec" id="why" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Why it matters</span></div>
    <div className="two">
      <h2 className="rv">The businesses that have moved are pulling away.</h2>
      <div>
        <p className="lead-p rv" style={{"--i":"1"}}>Not a forecast. The record from the last two years: the businesses running AI grow faster, get hours back every week, and make more money than the ones that haven't started.</p>
        <p className="rv" style={{"--i":"2"}}>Nine in ten small businesses with AI say it lifts their revenue. Four in ten Australian ones have already seen it in the numbers, against three in a hundred who saw a drop. Every quarter they have it and you don't, the gap gets wider.</p>
      </div>
    </div>
    <ServiceFigures figures={FIGURES} />
  </div>
</section>

<section className="sec sec--off" id="problem" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">The problem</span></div>
    <div className="xg rv">
      <div className="xc pb pb--lead xc--x xc--xt"><p>Five things we hear in nearly every first conversation.</p></div>
      <div className="xc pb xc--off xc--x xc--xt"><span className="eyebrow">01</span><h3>Costs up, margins down</h3><p>Wages, rent, insurance, software, all climbing. The price you can charge isn't. The gap you live on gets thinner every year.</p></div>
      <div className="xc pb xc--end"><span className="eyebrow">02</span><h3>No time</h3><p>The day goes to the jobs. The admin goes to the night. There's no third shift for working on the business.</p></div>
      <div className="xc pb xc--off xc--x xc--last"><span className="eyebrow">03</span><h3>Too many hats</h3><p>Owner, salesperson, bookkeeper, scheduler, IT. Five jobs, one person, none of them done the way you'd like.</p></div>
      <div className="xc pb xc--x xc--last"><span className="eyebrow">04</span><h3>Double handling</h3><p>The same details typed into three systems. Quotes that wait. Invoices that go out late. Nobody's fault, and it costs you every week.</p></div>
      <div className="xc pb xc--off xc--end xc--last"><span className="eyebrow">05</span><h3>Leads going cold</h3><p>An enquiry answered on Thursday was probably booked with someone else on Tuesday.</p></div>
    </div>
  </div>
</section>

<section className="sec" id="what" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What it is</span></div>
    <ServiceWhat {...WHAT} />
  </div>
</section>

<section className="sec sec--off how" id="how" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">How we work together</span></div>
    <div className="two">
      <div>
        <h2 className="rv">Built with you, not delivered to you.</h2>
        <div className="ph ph--photo rv" role="img" aria-label="Luke Marinovic" style={{"--i":"1",marginTop:"32px","--img":"url(/assets/about4-800.jpg)","--y":"40%"}}></div>
      </div>
      <ServiceSteps steps={STEPS} />
    </div>
  </div>
</section>

<section className="sec" id="includes" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What the build includes</span></div>
    <h2 className="rv">Everything you need to run it without us.</h2>
    <ServiceIncludes stages={STAGES} />
  </div>
</section>

<section className="sec sec--work" id="work" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Our work</span><a className="link" href="/#work">All work</a></div>
    <h2 className="rv">Three recent automations. Open one for the breakdown.</h2>
    <div className="cells">
      <article className="cell rv" style={{"--i":"1"}} tabIndex="0" role="button" data-client="Global SaaS"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Global SaaS</span>
        <h3>Automated Sales Database</h3>
        <p className="cell__desc">The CRM kept in sync on its own, a searchable second brain for the team, research and analytics on tap.</p>
        <p className="cell__stat"><span>3 hrs</span><small>saved every day</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>The pipeline lived across spreadsheets, inboxes and a CRM nobody quite trusted. Every update was typed twice, and the history of a relationship lived in whoever had the last conversation.</p></div>
          <div><h4>What we built</h4><p>A system that keeps the CRM in sync on its own, files every conversation into a searchable second brain, and runs research and analytics on the accounts the team is working.</p></div>
          <div><h4>Result</h4><p>Nothing new to learn. The team works the way it did, the admin happens underneath. Three hours a day back across the sales team.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Trigger</small>A sales call ends</li>
          <li><small>Step</small>Notes and the conversation captured</li>
          <li><small>Step</small>CRM updated, nothing typed twice</li>
          <li><small>Step</small>Research run on the account</li>
          <li><small>Outcome</small>A brief in the rep's inbox before the next call</li>
        </ol>
      </article>
      <article className="cell rv" style={{"--i":"2"}} tabIndex="0" role="button" data-client="Healthcare"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Healthcare</span>
        <h3>Automated Invoice Generator</h3>
        <p className="cell__desc">Invoices generated by voice. Say the job, the invoice writes itself.</p>
        <p className="cell__stat"><span>5 hrs</span><small>saved every month</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>Invoicing meant retyping the same job details after every shift, then hunting for the right template. Invoices went out late, or not at all until the end of the month.</p></div>
          <div><h4>What we built</h4><p>The job is spoken into the phone. The invoice writes itself on the right template and lands formatted and ready to send. Corrections are spoken too.</p></div>
          <div><h4>Result</h4><p>Invoices out the same day the work is done. Five hours a month back, and the cash arrives sooner.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Trigger</small>A shift ends, the job is spoken into the phone</li>
          <li><small>Step</small>Transcribed and the details pulled out</li>
          <li><small>Step</small>Invoice drafted on the right template</li>
          <li><small>Step</small>Checked, corrections spoken too</li>
          <li><small>Outcome</small>Sent and filed the same day</li>
        </ol>
      </article>
      <article className="cell rv" style={{"--i":"3"}} tabIndex="0" role="button" data-client="Photography"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Photography</span>
        <h3>Campaign Automation</h3>
        <p className="cell__desc">A raffle page with the follow-up done for you. Every entry answered and sorted, no spreadsheet.</p>
        <p className="cell__stat"><span>Zero</span><small>manual follow-ups</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A photography studio ran a raffle to get people in. Every entry meant a name in a spreadsheet and a reply someone had to write. Some got answered late. Some not at all.</p></div>
          <div><h4>What we built</h4><p>The raffle page, and the system behind it. An entry comes in, the reply goes out on its own, and the entry lands in the right list with a tag.</p></div>
          <div><h4>Result</h4><p>No manual follow-ups. Every entry got a reply the moment it came in and landed in a clean list. The rest of the numbers are to confirm.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Trigger</small>Someone enters the raffle on the page</li>
          <li><small>Step</small>A thank you goes back straight away</li>
          <li><small>Step</small>The entry is sorted and tagged in the list</li>
          <li><small>Step</small>Follow-ups go out on the day they're due</li>
          <li><small>Outcome</small>The draw runs off a clean list, nobody chased</li>
        </ol>
      </article>
    </div>
    <div className="w-dots" aria-label="Choose project"></div>
  </div>
  <dialog className="wm" id="wm" aria-labelledby="wm-title">
    <button className="wm__close" aria-label="Close">×</button>
    <div className="cell wm__head"><i className="cell__sig"></i><i className="cell__glow"></i><span className="eyebrow wm__client"></span><h3 id="wm-title"></h3></div>
    <div className="wm__body">
      <p className="cell__stat wm__stat"></p>
      <div className="case wm__case"></div>
      <h4 className="wm__fh">How it runs</h4>
      <ol className="flow wm__flow"></ol>
    </div>
  </dialog>
</section>

<section className="sec" id="testimonials" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Testimonials</span></div>
    <div className="tms rv" tabIndex="0">
      <div className="tms__track">
        <div className="tm">
          <div className="ph ph--photo" role="img" aria-label="Allyjana" style={{"--img":"url(/assets/tm-allyjana.jpg)","--x":"47%","--y":"18%"}}></div>
          <blockquote>Before working with Luke we didn't have a website at all. Since then we've seen our demand increase 3x, and it's saved me hours of work every week because it's all automated and nothing falls through the cracks now.</blockquote>
          <cite><b>Allyjana</b>Director, Allyjana Marie Creative</cite>
        </div>
        <div className="tm">
          <div className="ph ph--photo" role="img" aria-label="Vildan" style={{"--img":"url(/assets/tm-vildan.jpg)","--y":"30%"}}></div>
          <blockquote>They took a process that used to take our office two days a week and made it disappear. We didn't notice how much time we'd lost until we got it back.</blockquote>
          <cite><b>Vildan</b>Owner, Intelligentle Healing</cite>
        </div>
      </div>
      <div className="tm-dots" aria-label="Choose testimonial"></div>
    </div>
  </div>
</section>

<section className="sec sec--stats" id="stats" data-reveal="">
  <div className="hero__layer band"></div>
  <div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
  <div className="wrap">
    <div className="st-top">
      <div className="st-mark rv" aria-hidden="true"><img className="st-ink" src="/assets/mark-ink.png" alt="" /></div>
      <p className="st-lead rv"><b>Why us</b>One person who understands the problem and builds the fix, so nothing gets lost in between. No account manager, no template, no handoff to a team you'll never meet. Small on purpose, and the record below is what that produces.</p>
    </div>
    <div className="stats">
      <div className="stat rv" style={{"--i":"1"}}><b>20+</b><span>Projects delivered</span></div>
      <div className="stat rv" style={{"--i":"2"}}><b>95%</b><span>Client retention</span></div>
      <div className="stat rv" style={{"--i":"3"}}><b>3x</b><span>Client revenue growth</span></div>
      <div className="stat rv" style={{"--i":"4"}}><b>AUS 2026</b><span>Top rated AI agency</span></div>
    </div>
  </div>
</section>

<section className="sec sec--off" id="who" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Who it's for</span></div>
    <div className="two">
      <h2 className="rv">Businesses where the owner still does the admin.</h2>
      <p className="rv" style={{"--i":"1"}}>Five to fifty people. Enough work coming in that the paperwork is a job on its own, not enough to hire someone just to do it. The industries we've built for so far:</p>
    </div>
    <div className="ind ind--grid xg rv" style={{"--i":"1"}}>
      <div className="xc ig xc--x xc--xt">Trades and construction</div>
      <div className="xc ig xc--off xc--x xc--xt">Medical and allied health</div>
      <div className="xc ig xc--x xc--xt">Legal and accounting</div>
      <div className="xc ig xc--off xc--end">Real estate</div>
      <div className="xc ig xc--off xc--x xc--last">Hospitality</div>
      <div className="xc ig xc--x xc--last">Retail and e-commerce</div>
      <div className="xc ig xc--off xc--x xc--last">Education and training</div>
      <div className="xc ig xc--end xc--last">Creative and media</div>
    </div>
  </div>
</section>

<section className="sec" id="about" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">About</span></div>
    <div className="two about">
      <div className="ph ph--photo rv" role="img" aria-label="Luke Marinovic" style={{"--img":"url(/assets/luke-800.jpg)","--y":"30%"}}></div>
      <div>
        <h2 className="rv">The person you'll deal with.</h2>
        <p className="lead-p rv" style={{"--i":"1"}}>UnderCurrent is run by Luke Marinovic out of Melbourne. Strategy, design, code and automation under one roof, so nothing gets lost between the person who understands the problem and the person building the fix.</p>
        <p className="rv" style={{"--i":"2"}}>We automate the boring, repeated work: the quoting, the chasing, the copying from one screen to another. We won't automate the part where you talk to your customer. We pick what to build with one test: how many hours a week it gives back.</p>
        <a className="link rv" style={{"--i":"3",marginTop:"36px"}} href="/about">More about us</a>
      </div>
    </div>
  </div>
</section>

<section className="sec sec--off" id="faq" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">FAQ</span></div>
    <div className="two faq">
      <h2 className="rv">Questions before the email.</h2>
      <div className="rv" style={{"--i":"1"}}>
        <details><summary>How long until something is running?</summary><p>The first process is usually live in two to four weeks. Bigger systems are built in stages, each one running before the next starts.</p></details>
        <details><summary>Will it work with the software we already use?</summary><p>Almost always. Most of the work connects what you have: your accounting software, your CRM, your inbox, your calendar.</p></details>
        <details><summary>Do I need to be technical?</summary><p>No. You need to know how the work moves through your business. We handle the rest and show you how to change things.</p></details>
        <details><summary>What does it cost?</summary><p>A fixed price per process, agreed before we start, with the hours it saves written next to it.</p></details>
        <details><summary>What happens when something breaks?</summary><p>It's built to tell us before it tells you. Support after handover is optional.</p></details>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="services" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Other services</span></div>
    <div className="svcs">
      <a className="svc svc--orange rv" href="/website"><div className="band"></div><div className="svc__body"><h3>Website Design</h3><p>Sites that load fast, read clearly, and turn visitors into enquiries.</p><span className="link">View service</span></div></a>
      <a className="svc svc--red rv" style={{"--i":"1"}} href="/seo"><div className="band"></div><div className="svc__body"><h3>Google &amp; AI Search</h3><p>Being found when people look, on Google and inside AI answers.</p><span className="link">View service</span></div></a>
      <a className="svc svc--plum rv" style={{"--i":"2"}} href="/consulting"><div className="band"></div><div className="svc__body"><h3>Consulting</h3><p>A clear plan for what to automate first, what to leave alone, and why.</p><span className="link">View service</span></div></a>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact</span></div>
    <h2 className="rv">Tell us what's eating your week. We'll tell you what we'd automate first.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href="mailto:luke@undercurrentautomations.com">Send an email</a>
    </div>
  </div>
</section>
    </>
  )
}
