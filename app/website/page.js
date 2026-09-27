// app/website/page.js — the Website Design service page, the sandbox's
// service-website mockup poured in. Markup verbatim from the mockup, behaviour
// in ServiceFx. The Industries dial landed on Grid, the marquee is gone.
import '@/app/styles/website.css'
import ServiceFx from '@/components/site/ServiceFx'
import JsonLd from '@/components/ui/JsonLd'

const DOMAIN = 'https://undercurrentautomations.com'
const URL = `${DOMAIN}/website`
const TITLE = 'Website Design | UnderCurrent Automations'
const DESCRIPTION = 'Someone gets your name from a mate. Or they drive past your van. The next thing they do is look you up on their phone.'

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website Design',
  serviceType: 'Web design and development',
  provider: { '@id': `${DOMAIN}#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  url: URL,
  description: DESCRIPTION,
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Website Design', item: URL },
  ],
}

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

export default function WebsiteDesignPage() {
  return (
    <>
      <ServiceFx />
      <JsonLd schema={SERVICE_SCHEMA} />
      <JsonLd schema={BREADCRUMB_SCHEMA} />
<section className="hero" id="top" data-reveal="">
  <div className="hero__layer band"></div>
  <div className="hero__layer hero__glow b"></div>
  <div className="hero__layer hero__static"></div>
  <div className="hero__layer hero__grain"></div>
  <div className="hero__inner">
    <h1 className="rv">Website Design</h1>
    <a className="link rv" style={{"--i":"1"}} href="#contact">Let's chat</a>
  </div>
</section>

<section className="sec" id="why" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Why it matters</span></div>
    <div className="two">
      <h2 className="rv">People check your website before they call you.</h2>
      <div>
        <p className="lead-p rv" style={{"--i":"1"}}>Someone gets your name from a mate. Or they drive past your van. The next thing they do is look you up on their phone. What loads in the next few seconds decides if they ring you, or the next name on the list.</p>
        <p className="rv" style={{"--i":"2"}}>Over half of the smallest businesses in Australia still have no website of their own. That's good news for you. A clear, fast site puts you in front of half your street before you say a word.</p>
      </div>
    </div>
    <div className="fig">
      <div className="rv" style={{"--i":"2"}}><b>Over half</b><span>of the smallest businesses in Australia have no website of their own</span></div>
      <div className="rv" style={{"--i":"3"}}><b>8.4%</b><span>more sales after a phone site got a tenth of a second faster</span></div>
      <div className="rv" style={{"--i":"4"}}><b>3 in 4</b><span>Australians trust a business more when its website ends in .au</span></div>
    </div>
  </div>
</section>

<section className="sec sec--off" id="problem" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">The problem</span></div>
    <div className="xg rv">
      <div className="xc pb pb--lead xc--x xc--xt"><p>Five things we hear when someone shows us their old site.</p></div>
      <div className="xc pb xc--off xc--x xc--xt"><span className="eyebrow">01</span><h3>Fine on the desk, broken on the phone</h3><p>It looks sharp on your big screen. On a phone the words run off the side and the buttons are too small to hit.</p></div>
      <div className="xc pb xc--end"><span className="eyebrow">02</span><h3>The site from 2016</h3><p>You want to change a price or swap a photo. You can't. The bloke who built it stopped answering years ago.</p></div>
      <div className="xc pb xc--off xc--x xc--last"><span className="eyebrow">03</span><h3>A form that goes nowhere</h3><p>Someone fills it in. It lands in an inbox nobody opens. You never even knew they asked.</p></div>
      <div className="xc pb xc--x xc--last"><span className="eyebrow">04</span><h3>A home page that says nothing</h3><p>It lists everything you do. A visitor still can't tell what you're best at, or what to do next.</p></div>
      <div className="xc pb xc--off xc--end xc--last"><span className="eyebrow">05</span><h3>Slow on one bar of signal</h3><p>They open it on a job site and the page stays blank. They hit back and ring someone else.</p></div>
    </div>
  </div>
</section>

<section className="sec" id="what" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What it is</span></div>
    <div className="two">
      <div>
        <h2 className="rv">It's the place people check before they call.</h2>
        <p className="lead-p rv" style={{"--i":"1"}}>A website is more than a page with your phone number on it. For a small business it does three jobs. It says what you do. It shows people you're real and you're good at it. And it makes getting in touch easy.</p>
        <p className="rv" style={{"--i":"2"}}>Everything else follows from that. We work out what each page is for, then write it, then draw it, then build it. If a page doesn't help someone decide, it doesn't go on the site.</p>
      </div>
      <div className="areas rv" style={{"--i":"1"}}>
        <div className="row"><h3>Design</h3><p>How it looks and how it moves. Drawn for a phone first, then the big screen.</p></div>
        <div className="row"><h3>Build</h3><p>The code underneath. Fast to open, easy to change, nothing on it you don't need.</p></div>
        <div className="row"><h3>Words</h3><p>What each page actually says, written the way you'd say it out loud.</p></div>
        <div className="row"><h3>Care</h3><p>Domain, hosting, backups, small changes. Someone to call when something looks wrong.</p></div>
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
        <li className="rowb"><div><h3>Talk</h3><p>What you do, who you want to hear from, and what you want them to do on the site.</p></div></li>
        <li className="rowb"><div><h3>Design</h3><p>Every page drawn before a line of code. Changing your mind here costs nothing.</p></div></li>
        <li className="rowb"><div><h3>Build together</h3><p>You get a link early. You click around on your own phone while we're still building.</p></div></li>
        <li className="rowb"><div><h3>Launch and stay</h3><p>We move it across, check it, then stay on for a month while you settle in.</p></div></li>
      </ol>
    </div>
  </div>
</section>

<section className="sec" id="includes" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">What the build includes</span></div>
    <div className="two">
      <h2 className="rv">Yours to run, from the day it goes live.</h2>
      <div className="spec rv" style={{"--i":"1"}}>
        <div className="rowb"><b>The plan</b><span>Which pages you need and how they join up. Agreed before we design a thing.</span></div>
        <div className="rowb"><b>The design</b><span>Every page drawn out, phone and desktop. You look at it and say yes or no.</span></div>
        <div className="rowb"><b>The build</b><span>Coded to open fast. Tested on old phones and weak signal, not just ours.</span></div>
        <div className="rowb"><b>The words</b><span>We write every page. You read it and tell us what doesn't sound like you.</span></div>
        <div className="rowb"><b>The setup</b><span>Domain, hosting, a contact form that reaches you, and stats so you can see who visits.</span></div>
        <div className="rowb"><b>30 days of care</b><span>After it goes live, included. Any small fix, just ask.</span></div>
      </div>
    </div>
  </div>
</section>

<section className="sec sec--work" id="work" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Our work</span><a className="link" href="/#work">All work</a></div>
    <h2 className="rv">Three recent sites. Open one for the breakdown.</h2>
    <div className="cells">
      <article className="cell rv" style={{"--i":"1"}} tabIndex="0" role="button" data-client="Construction" data-shot="lyso"><i className="cell__sig"></i><i className="cell__glow"></i>
        <div className="cell__screen"><i className="cell__shot shot--lyso"></i></div>
        <span className="eyebrow">Construction</span>
        <h3>Web + UI Design</h3>
        <p className="cell__desc">A site that feels as solid as the buildings. The home page walks you through the work, one idea per screen.</p>
        <p className="cell__stat"><span>Live</span><small>premium site and UI</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A construction company needed a site that felt as solid as the buildings. The website and the product screens were being treated as two separate jobs.</p></div>
          <div><h4>What we built</h4><p>We designed and built the website and its UI together, so the two speak the same language. The home page walks the visitor through the work with an animated scroll-through, one idea per screen, nothing to click until they want to.</p></div>
          <div><h4>Result</h4><p>The site and the UI are live and they match. One look, one set of rules, across both.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>A construction company, no site that matched the work</li>
          <li><small>Step</small>The pages and the UI drawn together</li>
          <li><small>Step</small>The scroll-through built, one idea per screen</li>
          <li><small>Step</small>Words and photos in, checked on real phones</li>
          <li><small>Live</small>Site and UI live, speaking the same language</li>
        </ol>
      </article>
      <article className="cell rv" style={{"--i":"2"}} tabIndex="0" role="button" data-client="Photography" data-shot="raffle"><i className="cell__sig"></i><i className="cell__glow"></i>
        <div className="cell__screen"><i className="cell__shot shot--raffle"></i></div>
        <span className="eyebrow">Photography</span>
        <h3>We Rise raffle page</h3>
        <p className="cell__desc">A raffle page for a photography studio, built to get people involved, not just to collect names.</p>
        <p className="cell__stat"><span>Live</span><small>campaign page</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>A raffle campaign for a photography studio. It needed a page of its own to send people to.</p></div>
          <div><h4>What we built</h4><p>A page built to get people joining in, not just handing over their email. One thing to do on the screen, and it works on a phone first.</p></div>
          <div><h4>Result</h4><p>The page is live. Entries come in through it, and the studio has one link to share.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>A raffle campaign with nowhere to send people</li>
          <li><small>Step</small>The page drawn, one clear thing to do</li>
          <li><small>Step</small>Built for the phone first, entering takes one screen</li>
          <li><small>Step</small>Checked on real phones before it went out</li>
          <li><small>Live</small>The page live, entries coming through it</li>
        </ol>
      </article>
      <article className="cell cell--noshot rv" style={{"--i":"3"}} tabIndex="0" role="button" data-client="Aspirant Projects"><i className="cell__sig"></i><i className="cell__glow"></i>
        <div className="cell__screen"><i className="cell__shot"></i><i className="cell__tv"></i></div>
        <span className="eyebrow">New site</span>
        <h3>Aspirant Projects</h3>
        <p className="cell__desc">A new site for Aspirant Projects, drawn page by page and built for the phone first.</p>
        <p className="cell__stat"><span>Live</span><small>new site</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__case" hidden>
          <div><h4>Before</h4><p>Work worth showing, and no site that showed it.</p></div>
          <div><h4>What we built</h4><p>A new site, every page drawn before it was built, made for the phone first.</p></div>
          <div><h4>Result</h4><p>The site is live. One link to send people to.</p></div>
        </div>
        <ol className="cell__flow" hidden>
          <li><small>Start</small>A business with no site to send people to</li>
          <li><small>Step</small>The pages drawn, one job each</li>
          <li><small>Step</small>Built for the phone first</li>
          <li><small>Step</small>Checked on real phones before it went out</li>
          <li><small>Live</small>The site live</li>
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
      <h4 className="wm__fh">How it went</h4>
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
          <div className="ph ph--photo" role="img" aria-label="Edward" style={{"--img":"url(/assets/tm-edward.jpg)","--y":"28%"}}></div>
          <blockquote>We came for one automation and ended up with a system we actually understand. The team runs it themselves now.</blockquote>
          <cite><b>Edward</b>Practice manager, Business</cite>
        </div>
        <div className="tm">
          <div className="ph ph--photo" role="img" aria-label="Allyjana" style={{"--img":"url(/assets/tm-allyjana.jpg)","--x":"47%","--y":"18%"}}></div>
          <blockquote>Clear about what they'd do, clear about what it would cost, and it worked the way they said it would. That's rarer than it should be.</blockquote>
          <cite><b>Allyjana</b>Director, Allyjana Marie Creative</cite>
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
      <p className="st-lead rv"><b>Why us</b>One person designs it, builds it and writes the words. Nothing gets lost between three people who never speak to each other. No template, no handoff, no account manager you have to explain it all to again. Small on purpose, and the record below is what that produces.</p>
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
      <h2 className="rv">Businesses that get judged before anyone rings.</h2>
      <p className="rv" style={{"--i":"1"}}>Five to fifty people. Word of mouth brings you most of your work, and every one of those people looks you up first. The industries we've built for so far:</p>
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
        <p className="rv" style={{"--i":"2"}}>Every page gets one job before it gets a design. If a page can't say what it's for in one sentence, it doesn't go up. No stock photos, no sliders, no words that could be about any business.</p>
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
        <details><summary>How long does a site take?</summary><p>Most small sites go live in four to six weeks. Bigger ones go up in stages, a few pages at a time.</p></details>
        <details><summary>What does it cost?</summary><p>A fixed price, agreed before we start. You see what's in it and what isn't.</p></details>
        <details><summary>Can I change it myself?</summary><p>Yes. Text and photos you can edit yourself. We show you how and write it down.</p></details>
        <details><summary>What happens to my old site and my spot on Google?</summary><p>We point every old page address at the new one, so Google and your links don't lose you.</p></details>
        <details><summary>Do you write the words?</summary><p>Yes. We draft every page. You read it and tell us what doesn't sound like you.</p></details>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="services" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Other services</span></div>
    <div className="svcs">
      <a className="svc svc--green rv" href="/automation"><div className="band"></div><div className="svc__body"><h3>AI Automation</h3><p>The admin that eats your week, done by software instead.</p><span className="link">View service</span></div></a>
      <a className="svc svc--red rv" style={{"--i":"1"}} href="/seo"><div className="band"></div><div className="svc__body"><h3>Google &amp; AI Search</h3><p>Being found when people look, on Google and inside AI answers.</p><span className="link">View service</span></div></a>
      <a className="svc svc--plum rv" style={{"--i":"2"}} href="/consulting"><div className="band"></div><div className="svc__body"><h3>Consulting</h3><p>A clear plan for what to automate first, what to leave alone, and why.</p><span className="link">View service</span></div></a>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact</span></div>
    <h2 className="rv">Send us your website. We'll tell you what we'd fix first.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href="mailto:luke@undercurrentautomations.com">Send an email</a>
    </div>
  </div>
</section>
    </>
  )
}
