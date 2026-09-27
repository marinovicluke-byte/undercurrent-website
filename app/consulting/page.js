// app/consulting/page.js — the Consulting service page, the sandbox mockup
// poured in. Markup verbatim, behaviour in ServiceFx. Industries dial: Grid.
import '@/app/styles/consulting.css'
import ServiceFx from '@/components/site/ServiceFx'
import JsonLd from '@/components/ui/JsonLd'

const DOMAIN = 'https://undercurrentautomations.com'
const URL = DOMAIN + '/consulting'
const TITLE = 'Consulting | UnderCurrent Automations'
const DESC = 'This is not a guess. It is what the Australian numbers say. Nearly nine in ten small businesses here had not started with AI last year.'

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
  name: 'Consulting',
  serviceType: 'Business and AI strategy consulting',
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
    { '@type': 'ListItem', position: 2, name: 'Consulting', item: URL },
  ],
}

export default function Consulting() {
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
    <h1 className="rv">Consulting</h1>
    <a className="link rv" style={{"--i":"1"}} href="#contact">Let's chat</a>
  </div>
</section>

<section className="sec" id="why" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Why it matters</span></div>
    <div className="two">
      <h2 className="rv">Most small businesses want in. They just don't know where to start.</h2>
      <div>
        <p className="lead-p rv" style={{"--i":"1"}}>This is not a guess. It is what the Australian numbers say. Nearly nine in ten small businesses here had not started with AI last year. It is not that they don't want it. Nobody wants to spend money on the wrong thing.</p>
        <p className="rv" style={{"--i":"2"}}>And buying more software is not the fix on its own. Only three in ten Australian small businesses say the tech they paid for last year made them any more money. Buying is the easy part. Knowing what to buy first is the hard part.</p>
      </div>
    </div>
    <div className="fig">
      <div className="rv" style={{"--i":"2"}}><b>11%</b><span>of Australian small businesses were using AI last year</span></div>
      <div className="rv" style={{"--i":"3"}}><b>1 in 3</b><span>of the ones not using it say they don't know where to start</span></div>
      <div className="rv" style={{"--i":"4"}}><b>30%</b><span>say the tech they bought last year made them more money</span></div>
    </div>
  </div>
</section>

<section className="sec sec--off" id="problem" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">The problem</span></div>
    <div className="xg rv">
      <div className="xc pb pb--lead xc--x xc--xt"><p>Five things we hear before anyone has a plan.</p></div>
      <div className="xc pb xc--off xc--x xc--xt"><span className="eyebrow">01</span><h3>Six tools, two get used</h3><p>You pay for six bits of software every month. Your team opens two of them. Nobody wants to say which four to drop.</p></div>
      <div className="xc pb xc--end"><span className="eyebrow">02</span><h3>The AI thing nobody opens</h3><p>Someone set one up for you last year. It half worked. Now it sits there and nobody touches it.</p></div>
      <div className="xc pb xc--off xc--x xc--last"><span className="eyebrow">03</span><h3>Every pitch sounds the same</h3><p>They all say AI will fix everything. None of them tell you what they would actually do on Monday.</p></div>
      <div className="xc pb xc--x xc--last"><span className="eyebrow">04</span><h3>It's all in your head</h3><p>You are the only one who knows how the whole thing works. So nothing gets fixed unless you do it yourself.</p></div>
      <div className="xc pb xc--off xc--end xc--last"><span className="eyebrow">05</span><h3>Three started, none finished</h3><p>A new system in March. A new tool in June. Both half done, both still on the bank statement.</p></div>
    </div>
  </div>
</section>

<section className="sec" id="what" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What it is</span></div>
    <div className="two">
      <div>
        <h2 className="rv">A plan for what to fix first, and what to leave alone.</h2>
        <p className="lead-p rv" style={{"--i":"1"}}>Consulting sounds fancy. It isn't. Someone sits with you and watches how the work really moves. Where a job comes in. Who types what. What gets dropped. Then you get a plan you can read. What to fix first. What to buy, what to build, and what to leave alone.</p>
        <p className="rv" style={{"--i":"2"}}>It is not a 60 page report. It is not a long sales pitch for a build. The plan is yours to keep. Take it to us, take it to someone else, or do it yourself. All three are fine.</p>
      </div>
      <div className="areas rv" style={{"--i":"1"}}>
        <div className="row"><h3>The look</h3><p>A day or two watching how the work moves. Not how the manual says it does.</p></div>
        <div className="row"><h3>The plan</h3><p>What to fix first, what comes next, and what to leave alone.</p></div>
        <div className="row"><h3>The build</h3><p>With us, or with anyone else. The plan works either way.</p></div>
        <div className="row"><h3>Teaching</h3><p>We show your team how to use AI in the job they already do.</p></div>
      </div>
    </div>
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
      <ol className="steps rv" style={{"--i":"1"}}>
        <li className="rowb"><div><h3>Talk</h3><p>What is working, what is not, and what you want a normal week to look like.</p></div></li>
        <li className="rowb"><div><h3>Look</h3><p>A day or two inside the business. We watch how the work moves and who does what.</p></div></li>
        <li className="rowb"><div><h3>The plan</h3><p>Written plainly. You should be able to read it on a Sunday and get it.</p></div></li>
        <li className="rowb"><div><h3>Stay</h3><p>We stay alongside while the work gets done. Or we hand it over and you run it.</p></div></li>
      </ol>
    </div>
  </div>
</section>

<section className="sec" id="includes" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What the build includes</span></div>
    <div className="two">
      <h2 className="rv">Everything you need to decide what to do next.</h2>
      <div className="spec rv" style={{"--i":"1"}}>
        <div className="rowb"><b>The map</b><span>How the work moves now, drawn on one page. Every step, every handover, every place it stalls.</span></div>
        <div className="rowb"><b>The plan</b><span>What to fix first, what comes next, what to leave alone. In that order.</span></div>
        <div className="rowb"><b>The tool list</b><span>What to keep, what to drop, what to buy, with the price next to each one.</span></div>
        <div className="rowb"><b>The numbers</b><span>What each fix is worth in hours and dollars. These are estimates and we say so.</span></div>
        <div className="rowb"><b>Training</b><span>A session with your team, showing them how to use AI in their own work.</span></div>
        <div className="rowb"><b>A 30 day check-in</b><span>We come back and look at what stuck and what didn't.</span></div>
      </div>
    </div>
  </div>
</section>

<section className="sec sec--work" id="work" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Our work</span><a className="link" href="/#work">All work</a></div>
    <h2 className="rv">Two ways it runs. Open one for the shape of it.</h2>
    <div className="cells">
      <article className="cell rv" style={{"--i":"1"}} tabIndex="0" role="button" data-client="Photography"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Photography</span>
        <h3>A look under the hood</h3>
        <p className="cell__desc">About two weeks. We watch how the work moves, then hand you a short plan you can read in one sitting.</p>
        <p className="cell__stat"><span>Result</span><small>to confirm</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>The owner knows something has to change. There are a few tools, a couple of half built things, and no clear first step. Everyone is busy and nobody has time to stand back and look.</p></div>
          <div><h4>What happens</h4><p>Two weeks of looking. We sit in, follow a job from the first call to the money landing, and write down every step. Then we price the fixes and put them in order.</p></div>
          <div><h4>Result</h4><p>With Allyjana Marie Creative. What it was worth goes here once the numbers are in. To confirm.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>You tell us what isn't working</li>
          <li><small>Step</small>We spend a day or two watching the work</li>
          <li><small>Step</small>Every step written down, with where it stalls</li>
          <li><small>Step</small>The fixes priced and put in order</li>
          <li><small>Outcome</small>A short plan you can read on a Sunday</li>
        </ol>
      </article>
      <article className="cell rv" style={{"--i":"2"}} tabIndex="0" role="button" data-client="Alternative Medicine"><i className="cell__sig"></i><i className="cell__glow"></i>
        <span className="eyebrow">Alternative Medicine</span>
        <h3>The plan, and the year after</h3>
        <p className="cell__desc">The same look first. Then we stay alongside, month by month, while the work actually gets done.</p>
        <p className="cell__stat"><span>Result</span><small>to confirm</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A business that knows roughly what it wants to fix. Nobody inside has the time or the practice to run it, so the list sits there and gets longer.</p></div>
          <div><h4>What happens</h4><p>The plan first. Then we stay on, month by month. We build some of it, watch the rest get built, and train the team as it goes.</p></div>
          <div><h4>Result</h4><p>With Intelligentle Healing. Measured against the plan, not guessed at the start. The numbers go here once they are in. To confirm.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>The plan is agreed and the order is set</li>
          <li><small>Step</small>The first fix gets built</li>
          <li><small>Step</small>The team is shown how to run it</li>
          <li><small>Step</small>We check at 30 days what stuck</li>
          <li><small>Outcome</small>The next fix starts, same again</li>
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
      <h4 className="wm__fh">How it goes</h4>
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
          <blockquote>Before that we didn't have a website at all. Since then we've seen our demand increase 3x, and it's saved me hours of work every week because it's all automated and nothing falls through the cracks now.</blockquote>
          <cite><b>Allyjana</b>Director, Allyjana Marie Creative</cite>
        </div>
        <div className="tm">
          <div className="ph ph--photo" role="img" aria-label="Edward" style={{"--img":"url(/assets/tm-edward.jpg)","--y":"28%"}}></div>
          <blockquote>We came for one automation and ended up with a system we actually understand. The team runs it themselves now.</blockquote>
          <cite><b>Edward</b>Practice manager, Business</cite>
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
      <p className="st-lead rv"><b>Why us</b>The person who writes the plan is the person who has built the things in it. So you get a plan that can really be built, not one that just sounds good in a slide deck. No account manager, no template, no handoff to a team you'll never meet. Small on purpose, and the record below is what that produces.</p>
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
      <h2 className="rv">Owners who know something has to change.</h2>
      <p className="rv" style={{"--i":"1"}}>Five to fifty people. Busy enough that the cracks are showing. You just don't know which one to fix first. The industries we've worked in so far:</p>
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
        <p className="rv" style={{"--i":"2"}}>The plan comes first, because building the wrong thing well is the most expensive mistake there is. We tell people not to buy software until they can name the job it does. We fix the thing that costs the most hours first, and we say so when the answer is to do nothing.</p>
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
        <details><summary>What do I get at the end?</summary><p>A short plan you can read in one sitting. What to fix first, what it costs, and what it should be worth.</p></details>
        <details><summary>How long does it take?</summary><p>The short look is about two weeks. The longer one runs month by month, for as long as it is useful.</p></details>
        <details><summary>What does it cost?</summary><p>A fixed price for the short look, agreed before we start. The longer one is a monthly fee.</p></details>
        <details><summary>Do I have to build it with you?</summary><p>No. The plan is yours. Take it to anyone you like, or do it yourself.</p></details>
        <details><summary>What if the answer is to do nothing?</summary><p>Then we say so. Sometimes the fix is dropping a tool, not buying another one.</p></details>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="services" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Other services</span></div>
    <div className="svcs">
      <a className="svc svc--green rv" href="/automation"><div className="band"></div><div className="svc__body"><h3>AI Automation</h3><p>Software that does the admin, so nobody has to type it twice.</p><span className="link">View service</span></div></a>
      <a className="svc svc--orange rv" style={{"--i":"1"}} href="/website"><div className="band"></div><div className="svc__body"><h3>Website Design</h3><p>Sites that load fast, read clearly, and turn visitors into enquiries.</p><span className="link">View service</span></div></a>
      <a className="svc svc--red rv" style={{"--i":"2"}} href="/seo"><div className="band"></div><div className="svc__body"><h3>Google &amp; AI Search</h3><p>Being found when people look, on Google and inside AI answers.</p><span className="link">View service</span></div></a>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact</span></div>
    <h2 className="rv">Tell us what isn't working. We'll tell you what we'd look at first.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href="mailto:luke@undercurrentautomations.com">Send an email</a>
    </div>
  </div>
</section>




    </>
  )
}
