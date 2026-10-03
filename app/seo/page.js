// app/seo/page.js — the Google & AI Search service page, the sandbox's
// service-seo mockup poured in. Markup verbatim, behaviour in ServiceFx.
// Industries dial resolved to Grid, the marquee markup dropped.
import '@/app/styles/seo.css'
import '@/app/styles/service-blocks.css'
import ServiceFx from '@/components/site/ServiceFx'
import { ServiceFigures, ServiceProblem, ServiceSteps, ServiceWhat, ServiceIncludes } from '@/components/site/ServiceBlocks'
import JsonLd from '@/components/ui/JsonLd'

const DOMAIN = 'https://undercurrentautomations.com'
const URL = DOMAIN + '/seo'
const TITLE = 'Google & AI Search | UnderCurrent Automations'
const DESC = 'Think about the last time you needed a plumber. You picked up your phone. You looked at the first few results. You called one of them.'

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

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Google & AI Search',
  serviceType: 'Search engine and AI search optimisation',
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
    { '@type': 'ListItem', position: 2, name: 'Google & AI Search', item: URL },
  ],
}

// the shared sections' copy (components/site/ServiceBlocks.js)
const FIGURES = [
  [
    "92%",
    "of Australians who shop online use search or a shop's site to find what they want"
  ],
  [
    "12%",
    "of Australians say an AI tool is now their main way of finding things online, up from 5%"
  ],
  [
    "Half",
    "as many clicks on websites when Google puts its own AI answer on top"
  ]
]

const PROBLEM = {
  "lead": "Five things we hear when people can't find you.",
  "problems": [
    [
      "Not on the map",
      "Type your trade and your suburb into Google. A shop three streets over comes up. You don't."
    ],
    [
      "An old Google page",
      "Wrong hours. An old number. One review, from 2019. That page is the first thing people see."
    ],
    [
      "Only found by name",
      "Type your business name and the site comes up. Type the job you do and it doesn't."
    ],
    [
      "They asked an AI",
      "A customer says they asked ChatGPT for someone local. It gave them three names. Yours wasn't one."
    ],
    [
      "Reports, no phone calls",
      "The last agency sent graphs that all went up. The phone rang the same as it always did."
    ]
  ]
}

const STEPS = [
  [
    "Talk",
    "What you do, where you do it, and who you want ringing you."
  ],
  [
    "Map",
    "Where you come up today and where you don't, in a page you can read."
  ],
  [
    "Build, together",
    "The Google page, the website, the words. You see it as it goes."
  ],
  [
    "Stay",
    "A report you can read, and the work carries on month to month."
  ]
]

const WHAT = {
  "h2": "Being the one that comes up when someone looks.",
  "open": "Someone near you needs what you do. They pick up their phone and ask. Our job is to make sure they find you:",
  "flow": [
    "On Google's map",
    "On the results page",
    "And now inside AI answers"
  ],
  "close": "This is the work people used to call SEO.",
  "rest": "The change is who they ask. Plenty of people now ask ChatGPT, or read Google's own AI answer and stop there. The good news is it is the same work either way. Fix what Google knows about you. Write pages that answer real questions. Then both start naming you.",
  "areas": [
    [
      "Your Google page",
      "Hours, photos, reviews, the pin on the map. Most people see this before your website."
    ],
    [
      "Your website",
      "The pages people land on. One for each job you do, so Google knows what to show."
    ],
    [
      "The questions",
      "People ask the same things before they book. We write the page that answers each one."
    ],
    [
      "AI answers",
      "Written plain and clear, so an AI can pick your business out and name it."
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
        "The search map",
        "Where you come up now, for what, and who sits above you."
      ]
    ]
  },
  {
    "n": 3,
    "step": "Build, together",
    "items": [
      [
        "Your Google page",
        "Fixed and filled in. Hours, photos, services, reviews, all of it."
      ],
      [
        "A page per job",
        "One page for each thing you do, not one page for the lot."
      ],
      [
        "The questions, answered",
        "We write what people ask before they pick up the phone."
      ],
      [
        "The fixes underneath",
        "Speed, links, page titles. The plumbing, so Google can read the site."
      ]
    ]
  },
  {
    "n": 4,
    "step": "Stay",
    "items": [
      [
        "A monthly report",
        "What moved, what we did, what's next. One page, plain words."
      ]
    ]
  }
]

export default function Seo() {
  return (
    <>
      <ServiceFx />
      <JsonLd schema={service} />
      <JsonLd schema={breadcrumbs} />
<section className="hero" id="top" data-reveal="">
  <div className="hero__layer band"></div>
  <div className="hero__layer hero__glow b"></div>
  <div className="hero__layer hero__static"></div>
  <div className="hero__layer hero__grain"></div>
  <div className="hero__inner">
    <h1 className="rv">Google &amp; AI Search</h1>
    <a className="link rv" style={{"--i":"1"}} href="#contact">Let's chat</a>
  </div>
</section>

<section className="sec" id="why" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Why it matters</span></div>
    <div className="two">
      <h2 className="rv">If they can't find you, they call someone else.</h2>
      <div>
        <p className="lead-p rv" style={{"--i":"1"}}>Think about the last time you needed a plumber. You picked up your phone. You looked at the first few results. You called one of them. That is how most people pick a local business now.</p>
        <p className="rv" style={{"--i":"2"}}>Here is what's changing. More people ask an AI instead of typing into Google. And when Google puts its own AI answer at the top, most people read it and stop. So it is not enough to be on the list. You want to be the one the answer names.</p>
      </div>
    </div>
    <ServiceFigures figures={FIGURES} />
  </div>
</section>

<section className="sec sec--off" id="problem" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">The problem</span></div>
    <ServiceProblem {...PROBLEM} />
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
    <h2 className="rv">Everything that goes into getting found.</h2>
    <ServiceIncludes stages={STAGES} />
  </div>
</section>

<section className="sec sec--work" id="work" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Our work</span><a className="link" href="/#work">All work</a></div>
    <h2 className="rv">Two recent projects. Open one for the breakdown.</h2>
    <div className="cells">
      <article className="cell rv" style={{"--i":"1"}} tabIndex="0" role="button" data-client="Alternative Medicine"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Alternative Medicine</span>
        <h3>Google &amp; AI Search</h3>
        <p className="cell__desc">The Google page sorted, a page for every treatment, and words written for Google and for AI answers.</p>
        <p className="cell__stat"><span>3X</span><small>traffic, 50% more bookings, 28 Maps Rank 1s</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A clinic people couldn't find. Patients looking for a treatment nearby were landing on someone else. And more of them were asking an AI instead of Google.</p></div>
          <div><h4>What we built</h4><p>The Google page sorted, then a page for every treatment. Content written to answer the questions patients actually ask, in the shape both Google and AI answers can use.</p></div>
          <div><h4>Result</h4><p>Three times as many people finding the site. Fifty per cent more bookings. And 28 first spots on Google Maps.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>Someone looks for a treatment near them, or asks an AI</li>
          <li><small>Step</small>The clinic comes up on the map and in the answer</li>
          <li><small>Step</small>They tap through to the page for that treatment</li>
          <li><small>Step</small>The page answers the question they came with</li>
          <li><small>Outcome</small>They book</li>
        </ol>
      </article>
      <article className="cell rv" style={{"--i":"2"}} tabIndex="0" role="button" data-client="Trades"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Trades</span>
        <h3>Local search for a trades business</h3>
        <p className="cell__desc">A Google page kept up to date, a page for each job they do, and answers to what customers ask first.</p>
        <p className="cell__stat"><span>Result</span><small>to confirm</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A trade that only comes up when you already know the name. The work is good. The people looking for the job never get that far.</p></div>
          <div><h4>What we built</h4><p>The Google page filled in and kept up to date. A page for each job they do. Pages that answer what people ask before they call. And the fixes underneath, so Google can read the site.</p></div>
          <div><h4>Result</h4><p>What we watch is simple. How often they come up on the map, and how many calls come out of it.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>Someone searches for the job, not the business name</li>
          <li><small>Step</small>The Google page comes up on the map</li>
          <li><small>Step</small>They tap through to the page for that job</li>
          <li><small>Step</small>The page answers what they were going to ask</li>
          <li><small>Outcome</small>They call</li>
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
      <h4 className="wm__fh">How it works</h4>
      <ol className="flow wm__flow"></ol>
    </div>
  </dialog>
</section>

<section className="sec" id="testimonials" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Testimonial</span></div>
    <div className="tms rv">
      <div className="tm">
        <div className="ph ph--photo" role="img" aria-label="Edward" style={{"--img":"url(/assets/tm-edward.jpg)","--y":"28%"}}></div>
        <blockquote>We came for one automation and ended up with a system we actually understand. The team runs it themselves now.</blockquote>
        <cite><b>Edward Bun</b>Director, Lyso</cite>
      </div>
    </div>
  </div>
</section>

<section className="sec sec--stats" id="stats" data-reveal="">
  <div className="hero__layer band"></div>
  <div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
  <div className="wrap">
    <div className="st-top">
      <div className="st-mark rv" aria-hidden="true"><img className="st-ink" src="/assets/mark-ink.png" alt="" /></div>
      <p className="st-lead rv"><b>Why us</b>One person does the digging, writes the pages and reads the numbers. No content farm on the other side of the world. No report you need someone else to explain. Small on purpose, and the record below is what that produces.</p>
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
      <h2 className="rv">Businesses people look up before they call.</h2>
      <p className="rv" style={{"--i":"1"}}>Five to fifty people. You serve a town, a few suburbs, or a city. Someone is looking for what you do this week. The industries we've built for so far:</p>
    </div>
    <div className="ind ind--grid xg rv" style={{"--i":"1"}}>
      <div className="xc ig xc--x xc--xt">Trades and construction</div>
      <div className="xc ig xc--off xc--x xc--xt">Medical and allied health</div>
      <div className="xc ig xc--x xc--xt">Legal and accounting</div>
      <div className="xc ig xc--off xc--end">Real estate</div>
      <div className="xc ig xc--off xc--x xc--last">Hospitality</div>
      <div className="xc ig xc--x xc--last">Retail and <span style={{whiteSpace:"nowrap"}}>e-commerce</span></div>
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
        <p className="rv" style={{"--i":"2"}}>We write pages that answer the question a customer actually asks, in plain words, and we keep your Google profile honest and current. We won't buy links or churn out pages nobody reads. We pick topics by what your customers already type in, not by what is easy to rank for.</p>
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
        <details><summary>How long until I see a change?</summary><p>Your Google page can move in a few weeks. The rest takes longer, usually three to six months before you feel it in the calls.</p></details>
        <details><summary>What does it cost?</summary><p>It depends on the work, so we price it case by case. Expect to pay around $500 to $2,000 a month, depending on how many articles you need, how much your site needs restructuring and how much ongoing management you want. Basic SEO starts around $500 a month. There's usually a one-off implementation fee too, scoped at the start, so you know it before we begin.</p></details>
        <details><summary>Do I need a new website?</summary><p>Usually not. Most of the time we add pages to the site you have and fix what's already there.</p></details>
        <details><summary>What is AI search, and does it matter for a business like mine?</summary><p>It means people asking ChatGPT, or reading Google's AI answer instead of clicking through to a website. It matters, because that answer names two or three businesses and you want to be one of them.</p></details>
        <details><summary>What do you actually do each month?</summary><p>Write pages, keep your Google page fresh, fix what's broken, and send you one page saying what moved.</p></details>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="services" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Other services</span></div>
    <div className="svcs">
      <a className="svc svc--green rv" href="/automation"><div className="band"></div><div className="svc__body"><h3>AI Automation</h3><p>The paperwork that eats your week, done for you.</p><span className="link">View service</span></div></a>
      <a className="svc svc--orange rv" style={{"--i":"1"}} href="/website"><div className="band"></div><div className="svc__body"><h3>Website Design</h3><p>Sites that load fast, read clearly, and turn visitors into enquiries.</p><span className="link">View service</span></div></a>
      <a className="svc svc--plum rv" style={{"--i":"2"}} href="/consulting"><div className="band"></div><div className="svc__body"><h3>Consulting</h3><p>A clear plan for what to automate first, what to leave alone, and why.</p><span className="link">View service</span></div></a>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact</span></div>
    <h2 className="rv">Tell us what you do and where. We'll tell you where you come up, and where you don't.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href="mailto:luke@undercurrentautomations.com">Send an email</a>
    </div>
  </div>
</section>




    </>
  )
}
