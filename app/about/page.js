// app/about/page.js — the sandbox about mockup poured in. Markup verbatim from
// the mockup, behaviour in PageFx (nav, reveal, tap-to-pin logos).
import '@/app/styles/about.css'
import PageFx from '@/components/site/PageFx'
import JsonLd from '@/components/ui/JsonLd'
import { LUKE_PERSON } from '@/lib/schema/person'

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://undercurrentautomations.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://undercurrentautomations.com/about' },
  ],
}

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: 'https://undercurrentautomations.com/about',
  mainEntity: { '@id': 'https://undercurrentautomations.com#organization' },
}

export const metadata = {
  title: 'About',
  description:
    'UnderCurrent Automations is a Melbourne AI automation agency founded by Luke Marinovic. The story behind the build, the team, and where we\'re going.',
  alternates: { canonical: 'https://undercurrentautomations.com/about' },
  openGraph: {
    title: 'About UnderCurrent Automations',
    description: 'Melbourne AI automation agency. Founded by Luke Marinovic. We build custom workflows for Australian small businesses.',
    url: 'https://undercurrentautomations.com/about',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

export default function AboutPage() {
  return (
    <>
      <PageFx logos />
      <JsonLd schema={BREADCRUMB_SCHEMA} />
      <JsonLd schema={ABOUT_SCHEMA} />
      <JsonLd schema={{ '@context': 'https://schema.org', ...LUKE_PERSON }} />
<section className="hero" id="top" data-reveal="">
  <div className="hero__layer hero__photo"></div>
  <div className="hero__layer hero__glow a"></div>
  <div className="hero__layer hero__glow b"></div>
  <div className="hero__layer hero__static"></div>
  <div className="hero__layer hero__grain"></div>
  <div className="hero__inner">
    <h1 className="rv">About</h1>
  </div>
</section>

<section className="sec intro" id="melbourne" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Made in Melbourne</span></div>
    <p className="lead rv">UnderCurrent is a small studio in Melbourne. We build the systems that keep a business moving: the automation, the website, the search, and the plan behind them. Most of our clients are in Australia, some are overseas. All of them deal with one person, start to finish.</p>
  </div>
</section>

<section className="story" id="story" data-reveal="">
  <div className="story__in">
    <div className="story__ph ph ph--img rv" style={{"--y":"36%"}}><img src="/assets/about2-800.jpg" srcSet="/assets/about2-800.jpg 800w, /assets/about2.jpg 1600w" sizes="(max-width:640px) 100vw, 50vw" width="800" height="1000" loading="lazy" decoding="async" alt="Luke Marinovic" /></div>
    <div className="story__tx">
      <span className="eyebrow rv" style={{"--i":"1"}}>The person</span>
      <h2 className="rv" style={{"--i":"1"}}>The person you'll deal with.</h2>
      <p className="lead-p rv" style={{"--i":"2"}}>UnderCurrent is run by Luke Marinovic. Strategy, design, code and automation, done by the same person, so nothing gets lost between the one who understands the problem and the one building the fix.</p>
      <p className="rv" style={{"--i":"3"}}>Placeholder. Two sentences on Luke: what he did before this, and why he started UnderCurrent.</p>
    </div>
  </div>
</section>

<section className="story story--flip" id="company" data-reveal="">
  <div className="story__in">
    <div className="story__ph ph ph--img rv" style={{"--y":"40%"}}><img src="/assets/about3-800.jpg" srcSet="/assets/about3-800.jpg 800w, /assets/about3.jpg 1600w" sizes="(max-width:640px) 100vw, 50vw" width="800" height="830" loading="lazy" decoding="async" alt="Luke at the desk" /></div>
    <div className="story__tx">
      <span className="eyebrow rv" style={{"--i":"1"}}>The company</span>
      <h2 className="rv" style={{"--i":"1"}}>Small on purpose.</h2>
      <p className="lead-p rv" style={{"--i":"2"}}>We take on a handful of projects at a time, so each one gets built properly, tested on real jobs, and handed over with the documentation to run it without us.</p>
      <p className="rv" style={{"--i":"3"}}>Melbourne is home. The work goes wherever the client is: across Australia, and overseas. The tools are the same, the standard is the same, and so is the person on the other end of the email.</p>
    </div>
  </div>
</section>

<section className="story story--vals" id="values" data-reveal="">
  <div className="story__in">
    <div className="story__ph ph ph--img rv" style={{"--y":"50%"}}><img src="/assets/about4-800.jpg" srcSet="/assets/about4-800.jpg 800w, /assets/about4.jpg 1600w" sizes="(max-width:640px) 100vw, 50vw" width="800" height="1000" loading="lazy" decoding="async" alt="Luke Marinovic" /></div>
    <div className="story__tx">
      <span className="eyebrow rv" style={{"--i":"1"}}>How we think about the work</span>
      <h2 className="rv" style={{"--i":"1"}}>A few things that make working with us different.</h2>
      <div className="vals xg rv" style={{"--i":"2"}}>
        <div className="xc vc xc--xt xc--x"><span className="eyebrow">01</span><h3>One person, start to finish</h3><p>The person who understands the problem is the person who builds the fix. No account manager, no handoff.</p></div>
        <div className="xc vc xc--off xc--end"><span className="eyebrow">02</span><h3>Built with you</h3><p>You see it early and often, so it fits how your team actually works, not how we imagined it.</p></div>
        <div className="xc vc xc--off xc--x xc--last"><span className="eyebrow">03</span><h3>Plain words</h3><p>If we can't explain it in a sentence, we're not ready to build it. Documentation you can read, not a developer's notes.</p></div>
        <div className="xc vc xc--end xc--last"><span className="eyebrow">04</span><h3>Built to be left alone</h3><p>Systems that run when we're not in the room, and the training to change them yourself. We stay until it's routine.</p></div>
      </div>
    </div>
  </div>
</section>

<section className="sec" id="brands" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Brands we work with</span></div>
    <div className="two">
      <h2 className="rv">Across Australia, and further.</h2>
      <p className="rv" style={{"--i":"1"}}>Builders, clinics, groomers, creatives. Most in Melbourne, some across Australia, a few overseas. The ones below are the ones with work you can see.</p>
    </div>
    <div className="logos rv" style={{"--i":"2"}}>
      <div className="logo" data-l="lyso" style={{"--h":"44"}}><span className="lg"><img src="/assets/client-lyso.png" alt="Lyso" /><img className="col" src="/assets/client-lyso-c.png" alt="" /></span></div>
      <div className="logo" data-l="ih" style={{"--h":"46"}}><span className="lg ih-h"><img src="/assets/client-ih.png" alt="Intelligentle Healing" /><img className="col" src="/assets/client-ih-c.png" alt="" /></span><span className="lg ih-v" style={{"--h":"88"}}><img src="/assets/client-ih-stack.png" alt="Intelligentle Healing" /><img className="col" src="/assets/client-ih-stack-c.png" alt="" /></span></div>
      <div className="logo" data-l="aspirant" style={{"--h":"38"}}><span className="lg"><img src="/assets/client-aspirant.png" alt="Aspirant Projects" /><img className="col" src="/assets/client-aspirant-c.png" alt="" /></span></div>
      <div className="logo" data-l="aso" style={{"--h":"60"}}><span className="lg"><img src="/assets/client-aso.png" alt="Aso & Purr" /></span></div>
      <div className="logo" data-l="ajm" style={{"--h":"54"}}><span className="lg"><img src="/assets/client-ajm.png" alt="Allyjana Marie Creative" /><img className="col" src="/assets/client-ajm-c.png" alt="" /></span></div>
      <div className="logo" data-l="ipl"><span className="lg"><b>Integrated Performance Lab</b></span></div>
    </div>
  </div>
</section>

<section className="sec sec--stats" id="stats" data-reveal="">
  <div className="hero__layer foot__base"></div>
  <div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
  <div className="wrap">
    <div className="st-top">
      <div className="st-mark rv" aria-hidden="true"><img className="st-ink" src="/assets/mark-ink.png" alt="" /></div>
      <p className="st-lead rv">Numbers, not adjectives. The record behind the work: what has shipped for the businesses we work with, how many of them stayed after the first project, and what the systems gave back once they were running.</p>
    </div>
    <div className="stats">
      <div className="stat rv" style={{"--i":"1"}}><b>20+</b><span>Projects delivered</span></div>
      <div className="stat rv" style={{"--i":"2"}}><b>95%</b><span>Client retention</span></div>
      <div className="stat rv" style={{"--i":"3"}}><b>3x</b><span>Client revenue growth</span></div>
      <div className="stat rv" style={{"--i":"4"}}><b>AUS 2026</b><span>Top rated AI agency</span></div>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact</span></div>
    <h2 className="rv">One email reaches the person who'd do the work.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href="mailto:luke@undercurrentautomations.com">Send an email</a>
    </div>
  </div>
</section>




    </>
  )
}
