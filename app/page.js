// app/page.js — the homepage, the sandbox's homepage-v1 poured in. "Do not fuck
// with the home page." Markup verbatim from the mockup, behaviour in HomeFx.
import '@/app/styles/home.css'
import HomeFx from '@/components/site/HomeFx'
import { SocialLinks, BOOK_A_CALL } from '@/components/site/Footer'

const DOMAIN = 'https://undercurrentautomations.com'

export const metadata = {
  title: { absolute: 'AI Search & Automation Australia | UnderCurrent Automations' },
  description: 'AI search and automation agency for Australian small business. SEO and AI visibility, custom workflows, websites and integrations. Built in Melbourne, working Australia-wide.',
  alternates: { canonical: DOMAIN },
  openGraph: {
    title: 'AI Search & Automation Australia | UnderCurrent Automations',
    description: 'AI search and automation agency for Australian small business. SEO and AI visibility, custom workflows, websites and integrations. Built in Melbourne, working Australia-wide.',
    url: DOMAIN,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

export default function Home() {
  return (
    <>
      <HomeFx />
<section className="hero" id="top" data-reveal="">
  <div className="hero__layer hero__photo"></div>
  <div className="hero__layer hero__glow a"></div>
  <div className="hero__layer hero__glow b"></div>
  <div className="hero__layer hero__static"></div>
  <div className="hero__layer hero__grain"></div>
  <div className="hero__inner">
    <h1 className="rv"><span className="uc-text">UnderCurrent Automations</span><img className="uc-mark uc-mark--l" src="/assets/mark-uca-left.png" alt="UnderCurrent Automations" /><img className="uc-mark uc-mark--c" src="/assets/mark-uca-centre.png" alt="UnderCurrent Automations" /></h1>
  </div>
</section>

<section className="sec intro" data-reveal="">
  <div className="wrap">
    <p className="lead rv">We are an AI first digital automation agency helping businesses grow rapidly and scale.</p>
  </div>
</section>

<section className="sec" id="clients" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Clients we work with</span></div>
    <div className="logos rv">
      <div className="logo" data-l="lyso" style={{"--h":"44"}}><span className="lg"><img src="/assets/client-lyso.png" alt="Lyso" /><img className="col" src="/assets/client-lyso-c.png" alt="" /></span></div>
      <div className="logo" data-l="ih" style={{"--h":"46"}}><span className="lg ih-h"><img src="/assets/client-ih.png" alt="Intelligentle Healing" /><img className="col" src="/assets/client-ih-c.png" alt="" /></span><span className="lg ih-v" style={{"--h":"88"}}><img src="/assets/client-ih-stack.png" alt="Intelligentle Healing" /><img className="col" src="/assets/client-ih-stack-c.png" alt="" /></span></div>
      <div className="logo" data-l="aspirant" style={{"--h":"38"}}><span className="lg"><img src="/assets/client-aspirant.png" alt="Aspirant Projects" /><img className="col" src="/assets/client-aspirant-c.png" alt="" /></span></div>
      <div className="logo" data-l="aso" style={{"--h":"60"}}><span className="lg"><img src="/assets/client-aso.png" alt="Aso & Purr" /></span></div>
      <div className="logo" data-l="ajm" style={{"--h":"54"}}><span className="lg"><img src="/assets/client-ajm.png" alt="Allyjana Marie Creative" /><img className="col" src="/assets/client-ajm-c.png" alt="" /></span></div>
      <div className="logo" data-l="ipl"><span className="lg"><b>Integrated Performance Lab</b></span></div>
    </div>
  </div>
</section>

<section className="sec" id="services" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Our services</span></div>
    <div className="svcs">
      <a className="svc svc--green rv" href="/automation">
        <div className="band"></div>
        <div className="svc__body">
          <h3>Automation</h3>
          <p>Repetitive work handed to systems. Bookings, follow-ups, reporting, the jobs that eat your week.</p>
          <span className="svc__toggle">View service</span>
        </div>
      </a>
      <a className="svc svc--orange rv" style={{"--i":"1"}} href="/website">
        <div className="band"></div>
        <div className="svc__body">
          <h3>Website Design</h3>
          <p>Sites that load fast, read clearly, and turn visitors into enquiries.</p>
          <span className="svc__toggle">View service</span>
        </div>
      </a>
      <a className="svc svc--red rv" style={{"--i":"2"}} href="/seo">
        <div className="band"></div>
        <div className="svc__body">
          <h3>Google &amp; AI Search</h3>
          <p>Being found when people look, on Google and inside AI answers.</p>
          <span className="svc__toggle">View service</span>
        </div>
      </a>
      <a className="svc svc--plum rv" style={{"--i":"3"}} href="/consulting">
        <div className="band"></div>
        <div className="svc__body">
          <h3>Consulting</h3>
          <p>A clear plan for what to automate first, what to leave alone, and why.</p>
          <span className="svc__toggle">View service</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section className="sec sec--work" id="work" data-reveal="">
  <div className="hero__layer work__base"></div><div className="hero__layer hero__glow b"></div><div className="hero__layer hero__static"></div><div className="hero__layer hero__grain"></div>
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Recent work</span></div>
    <h2 className="rv">Five projects, different problems.</h2>
    <div className="cells">
      <article className="cell c-teal rv" style={{"--i":"1"}} tabIndex="0" role="button" data-client="Global SaaS" data-res="Saving 3 hours a day across the sales team"><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i>
        <span className="eyebrow">Global SaaS</span>
        <h3>Automated Sales Database</h3>
        <p className="cell__desc">CRM kept in sync on its own, a second brain for the team, research and analytics on tap.</p>
        <p className="cell__stat">3 hrs<small>saved every day</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__long" hidden><p>A global learning-software company ran its sales pipeline across spreadsheets, inboxes and a CRM nobody quite trusted. Every update was typed twice, and the history of a relationship lived in whoever had the last conversation.</p><p>We built a system that keeps the CRM in sync on its own, files every conversation into a searchable second brain, and runs research and analytics on the accounts the team is working. Nothing new to learn, the team works the way it did, the admin happens underneath.</p></div>
      </article>
      <article className="cell c-green rv" style={{"--i":"2"}} tabIndex="0" role="button" data-client="Healthcare" data-res="Saving 5 hours a month, invoices out the same day"><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i>
        <span className="eyebrow">Healthcare</span>
        <h3>Automated Invoice Generator</h3>
        <p className="cell__desc">Invoices generated by voice. Say the job, the invoice writes itself.</p>
        <p className="cell__stat">5 hrs<small>saved every month</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__long" hidden><p>A healthcare provider's invoicing meant retyping the same job details after every shift, then hunting for the right template.</p><p>Now the job is spoken, the invoice writes itself, and it lands formatted and ready to send. Corrections are spoken too.</p></div>
      </article>
      <article className="cell c-orange rv" style={{"--i":"3"}} tabIndex="0" role="button" data-client="Construction" data-res="Live. Site and UI speaking the same language."><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i>
        <span className="eyebrow">Construction</span>
        <h3>Web + UI Design</h3>
        <p className="cell__desc">Premium website and UI design with an animated scroll-through.</p>
        <p className="cell__stat">Live<small>premium site and UI</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__long" hidden><p>A construction company needed a site that felt as solid as the buildings. We designed and built the website and its UI together, so the two speak the same language.</p><p>The homepage walks the visitor through the work with an animated scroll-through, one idea per screen, nothing to click until they want to.</p></div>
      </article>
      <article className="cell c-red rv" style={{"--i":"4"}} tabIndex="0" role="button" data-client="Alternative Medicine" data-res="3X traffic, 50% more bookings, 28 Google Maps Rank 1 positions"><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i>
        <span className="eyebrow">Alternative Medicine</span>
        <h3>Google &amp; AI Search</h3>
        <p className="cell__desc">Local SEO, service pages and content written for Google and for AI answers.</p>
        <p className="cell__stat">3X<small>traffic, 50% more bookings, 28 Maps Rank 1s</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__long" hidden><p>An alternative medicine clinic needed to be found by people searching locally, and increasingly by people asking an AI instead of Google.</p><p>Local SEO, a service page for every treatment, and content written to answer the questions patients actually ask, in the shape both Google and AI answers can use.</p></div>
      </article>
      <article className="cell c-plum rv" style={{"--i":"5"}} tabIndex="0" role="button" data-client="Photography" data-res="Live. Leads captured and followed up automatically."><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i>
        <span className="eyebrow">Photography</span>
        <h3>Campaign Automation</h3>
        <p className="cell__desc">A raffle campaign built to drive engagement, with automated lead management running behind it.</p>
        <p className="cell__stat">Zero<small>manual follow-ups</small></p>
        <span className="cell__plus" aria-hidden="true">+</span>
        <div className="cell__long" hidden><p>A raffle campaign for a photography studio, built to drive engagement rather than just collect names.</p><p>Behind it, automated lead capture and follow-up, so every entry was answered and sorted without anyone working a spreadsheet.</p></div>
      </article>
    </div>
    <div className="w-dots" aria-label="Choose project"></div>
  </div>
  <dialog className="wm" id="wm" aria-labelledby="wm-title">
    <button className="wm__close" aria-label="Close">×</button>
    <div className="cell wm__head c-teal"><i className="cell__sig"></i><i className="cell__glow"></i><i className="cell__fade"></i><span className="eyebrow wm__client"></span><h3 id="wm-title"></h3></div>
    <div className="wm__body"><p className="cell__stat wm__stat"></p><div className="wm__text"></div><p className="wm__res"></p></div>
  </dialog>
</section>

<section className="sec" id="testimonials" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Testimonials</span></div>
    <div className="tms rv" tabIndex="0">
      <div className="tms__track">
        <div className="tm">
          <div className="ph ph--photo" role="img" aria-label="Vildan" style={{"--img":"url(/assets/tm-vildan.jpg)","--y":"30%"}}></div>
          <blockquote>They took a process that used to take our office two days a week and made it disappear. We didn't notice how much time we'd lost until we got it back.</blockquote>
          <cite><b>Vildan</b>Owner, Business</cite>
        </div>
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
  <div className="hero__layer foot__base st-b"></div>
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

<section className="sec sec--off" id="about" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">About us</span></div>
    <div className="about">
      <figure className="ph who rv"><img className="who__img" src="/assets/luke-800.jpg" srcSet="/assets/luke-800.jpg 800w, /assets/luke.jpg 1600w" sizes="(max-width:640px) 100vw, 40vw" width="800" height="1000" loading="lazy" decoding="async" alt="Luke Marinovic, founder of UnderCurrent Automations" /><figcaption className="who__c">
        <span className="who__n">Luke Marinovic<small>Founder, UnderCurrent Automations</small>
          <span className="who__s"><SocialLinks /></span>
        </span>
      </figcaption></figure>
      <div>
        <h2 className="rv">A small studio that cares how the work is done.</h2>
        <p className="rv" style={{"--i":"1"}}>UnderCurrent is run by Luke Marinovic out of Melbourne. Strategy, design, code and automation under one roof, so nothing gets lost between the person who understands the problem and the person building the fix.</p>
        <p className="rv" style={{"--i":"2"}}>We work with small businesses that already run well and want to run better. We start with the job that eats the most time, fix that first, and only build more once the first fix has paid for itself. We won't sell you a tool you don't need.</p>
        <a className="link rv" style={{"--i":"3",marginTop:"36px"}} href="/about">Read the full story</a>
      </div>
    </div>
  </div>
</section>

<section className="sec sec--dark contact" id="contact" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">Contact us</span></div>
    <h2 className="rv">Tell us what's slowing you down. We'll tell you what we'd automate first.</h2>
    <div className="cta rv" style={{"--i":"1"}}>
      <a className="btn" href={BOOK_A_CALL} target="_blank" rel="noopener">Book a call</a>
      <a className="link" href="mailto:luke@undercurrentautomations.com">Email us</a>
    </div>
  </div>
</section>

<section className="sec" data-reveal="">
  <div className="wrap">
    <div className="sec__head"><span className="eyebrow">FAQ</span></div>
    <div className="faq">
      <h2 className="rv">Questions we get asked most.</h2>
      <div className="rv" style={{"--i":"1"}}>
        <details><summary>What kind of businesses do you work with?</summary><p>Small and mid-sized service businesses that already have a process worth improving.</p></details>
        <details><summary>How long does a typical project take?</summary><p>A first automation is usually live in two to four weeks. Larger systems are scoped in stages.</p></details>
        <details><summary>Do we need to change our software?</summary><p>Rarely. Most of the work connects what you already use.</p></details>
        <details><summary>What does it cost?</summary><p>Fixed price per project, agreed before we start.</p></details>
        <details><summary>What happens after it's built?</summary><p>Documentation, a handover session, and an optional support arrangement.</p></details>
      </div>
    </div>
  </div>
</section>





    </>
  )
}
