// components/gr/GoogleReviewsPage.js — the Google reviews offer page, built for Meta ad traffic on a phone.
// v2d's copy and v2c's layout (landing-pages/gbp-reviews/), one entry per niche in lib/data/googleReviews.js.
// Ads rules: logo only, no nav, no links out of the page, one CTA ("Book my free Google check") that jumps
// to the form at #book, a sticky phone bar. The site's own Nav and Footer are hidden by the page sheet.
// Schwartz levels per section as in v2d: problem aware → solution aware → product aware → most aware.
import Image from 'next/image'
import { SHARED } from '@/lib/data/googleReviews'
import GrFx, { Suburbs, Calc } from './GrFx'
import BookingForm from './BookingForm'
import Consent from './Consent'

// One wording on every button (landing-pages 06 §6.1). "Free" and "Google check" match the ads.
export const CTA = 'Book my free Google check'

export default function GoogleReviewsPage({ d }) {
  const { price, ih, stats } = SHARED
  return (
    <div className="gr">
      <header className="grh">
        <div className="wrap"><span className="grh__brand" aria-label="UnderCurrent Automations">
          <img src="/assets/mark-ink-nav.png" alt="" width="24" height="21" />
          <span className="wm"><b>UnderCurrent</b><small>Automations</small></span>
        </span></div>
      </header>

      <main id="top">
        {/* HERO. Problem aware. The five-second test: what (H1), for whom (eyebrow), will it work (Vildan's real
            numbers), what next (one button). No reveal here: the H1 paints at once and is the LCP. */}
        <section className="hero ground" id="hero">
          <div className="layer band"></div><div className="layer static"></div><div className="layer grain"></div><div className="layer shade"></div>
          <div className="wrap">
            <div className="hero__in">
              <div>
                <p className="eyebrow">{d.eyebrow}</p>
                <h1>{d.h1}</h1>
                <p className="hero__sub">{d.sub}</p>
                <div className="hero__act" id="gr-hero-cta">
                  <a className="btn btn--w" href="#book" data-cta="hero">{CTA}</a>
                </div>
                <p className="reassure">{d.reassure}</p>
              </div>
              <div className="ihx" aria-label={`Vildan's real results: 6 times more new clients from Google a month, and 11 to 29 of 66 nearby suburb searches in the map top 3`}>
                <div className="ihx__bar"><span>Vildan&apos;s real numbers</span><span>Moorabbin, 2026</span></div>
                <div className="ihx__top">
                  <b className="ihx__x">{ih.mult}</b>
                  <p>more new clients from Google a month.</p>
                  <small>1 in the 90 days to 12 May. 8 from June to September. Better maps and reviews helped.</small>
                </div>
                <Suburbs subs={ih.subs} of={ih.of} />
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM + FIX. Problem aware → solution aware. Stats: BrightLocal LCRS 2026 (US, n=1,002).
            The Maps-style mock has no Google logos or icons (Google's brand terms) and is labelled Example. */}
        <section className="sec sec--off" id="problem">
          <div className="wrap">
            <div className="sec__head"><span className="label"><b>What you can&apos;t see</b></span></div>
            <div className="two">
              <div>
                <h2 className="rv">{d.problemH2}</h2>
                <p className="lede rv" style={{ '--i': 1 }}>{d.problemLede}</p>
                <div className="sg rv" style={{ '--i': 2 }}>
                  {stats.map(([n, t]) => <div key={n}><b>{n}</b><span>{t}</span></div>)}
                </div>
              </div>
              <div className="gx rv" style={{ '--i': 1 }} aria-label="Example Google Maps search where three businesses show and yours is further down">
                <div className="gx__top">
                  <div className="gx__search"><span className="ic" aria-hidden="true"></span><span className="q">{d.mock.search}</span><span className="me" aria-hidden="true">S</span></div>
                  <div className="gx__chips" aria-hidden="true">{d.mock.chips.map(c => <span key={c}>{c}</span>)}</div>
                </div>
                <div className="gx__map"><span className="gx__ex">Example</span><span className="gx__pin" style={{ left: '22%', top: '42%' }}></span><span className="gx__pin" style={{ left: '56%', top: '30%' }}></span><span className="gx__pin" style={{ left: '76%', top: '70%' }}></span><span className="gx__pin gx__pin--you" style={{ left: '40%', top: '86%' }}></span></div>
                <ol className="gx__list">
                  {d.mock.rivals.map(([name, rate, count, hours], i) => (
                    <li key={name}><div><h4>{name}</h4><p className="gx__r"><b>{rate}</b><span className="s">★★★★★</span><span>({count})</span></p><p className="gx__m"><em>Open</em> · {hours}</p>{i === 0 ? <p className="gx__act"><span>Directions</span><span>Call</span></p> : null}</div><span className="gx__th"></span></li>
                  ))}
                </ol>
                <div className="gx__more">More places</div>
                {/* was "Most people stop here" (v2d fact check #5, unverifiable click-share claim). Now it only describes the list. */}
                <div className="gx__gap">Below the top 3</div>
                <ol className="gx__list"><li className="gx__you"><div><h4>Your business</h4><p className="gx__r"><b>4.2</b><span className="s">★★★★<i>★</i></span><span>(11)</span></p><p className="gx__m">Last review 5 months ago</p></div><span className="gx__th"></span></li></ol>
              </div>
            </div>

            <div className="sec__head" style={{ marginTop: 'clamp(56px,7vw,96px)' }}><span className="label"><b>The fix</b></span></div>
            <h2 className="rv">{d.fixH2}</h2>
            <p className="lede rv" style={{ '--i': 1 }}>{d.fixLede}</p>
            <div className="tri">
              <article className="slide rv">
                <div className="slide__h"><span className="label">{d.tile1.label}</span><h3>{d.tile1.h3}</h3></div>
                <div className="slide__v"><div className="phone"><div className="phone__scr">
                  <p className="phone__who"><b>Your business</b>Text message · Example</p>
                  <p className="bub">{d.sms} <u>g.page/r/your-link</u></p>
                  <p className="phone__t">Sent {d.trigger}</p>
                  <p className="bub bub--me">Done! Thanks again 👍</p>
                </div></div></div>
              </article>
              <article className="slide rv" style={{ '--i': 1 }}>
                <div className="slide__h"><span className="label">Every review</span><h3>Every review answered in 1 business day, in your voice.</h3></div>
                <div className="slide__v"><div className="frame">
                  <div className="rc">
                    <div className="rc__who"><span className="rc__av">J</span><div><b>Jess M.</b><small>Local Guide · 14 reviews · Example</small></div></div>
                    <div className="rc__meta"><span className="stars">★★★★★</span><span>2 days ago</span></div>
                    <p>{d.review.text}</p>
                    <div className="rc__reply"><b>Response from the owner · 1 day ago</b>{d.review.reply}</div>
                  </div>
                </div></div>
              </article>
              <article className="slide rv" style={{ '--i': 2 }}>
                <div className="slide__h"><span className="label">Bad review?</span><h3>You see it first, with a calm reply ready for your OK.</h3></div>
                <div className="slide__v"><div className="frame">
                  <div className="rc">
                    <div className="rc__who"><span className="rc__av" style={{ background: '#6b6b6b' }}>C</span><div><b>Chris T.</b><small>3 reviews · Example</small></div></div>
                    <div className="rc__meta"><span className="stars">★★★<i>★★</i></span><span>Today</span></div>
                    <p>{d.bad.text}</p>
                    <div className="rc__reply"><b>Draft reply · waiting for your OK</b>{d.bad.reply}</div>
                  </div>
                </div></div>
              </article>
            </div>
          </div>
        </section>

        {/* PROOF, in the open, before the price. Solution aware → product aware.
            Sources: 6 of 6 and 29 of 66: IH Sep report :222-224. 42 → 58: Q1 report :146, Sep report :230.
            +90% profile views: Sep 2026 vs Sep 2025. Allyjana's line is cut from her own live-site quote.
            Vildan's and Ed's live-site quotes are placeholder copy: never reuse them. */}
        <section className="sec" id="proof">
          <div className="wrap">
            <div className="sec__head"><span className="label"><b>The proof</b></span><span className="label">Moorabbin, 2026</span></div>
            <h2 className="rv">Vildan went from 1 new client from Google every 3 months to about 2 a month.</h2>
            <p className="lede rv" style={{ '--i': 1 }}>{d.proofLede}</p>
            <div className="wall">
              <figure className="vt rv">
                <div className="vt__poster"><Image src="/assets/tm-vildan.jpg" alt="Vildan, owner of Intelligentle Healing" fill sizes="(max-width:960px) 100vw, 40vw" style={{ objectPosition: '50% 30%' }} /></div>
                <p className="vt__stat"><b>6×</b>new clients from Google</p>
                <figcaption className="vt__cap">
                  <div className="vt__line ph"><b>Vildan&apos;s words coming</b>His one line goes here once he sends it.</div>
                  <p className="vt__who"><b>Vildan</b>Owner, Intelligentle Healing · Moorabbin</p>
                </figcaption>
              </figure>
              <div>
                <ol className="tl rv" style={{ '--i': 1 }}>
                  <li><span className="label">Before · Feb to May 2026</span><p>1 new client from Google in 90 days. On 1 June, in the map top 3 for 11 of 66 nearby searches.</p></li>
                  <li><span className="label">What changed</span><p>We got his Google profile right and his reviews coming in, from 42 to 58.</p></li>
                  <li><span className="label">After · Jun to Sep 2026</span><p>8 new clients from Google. In the top 3 for 29 of 66 searches.</p></li>
                </ol>
                <div className="sg sg--3 rv" style={{ '--i': 2 }}>
                  <div><b>6 of 6</b><span>main searches at #1 near his clinic</span></div>
                  <div><b>42→58</b><span>Google reviews</span></div>
                  <div><b>+90%</b><span>people viewing his profile, year on year</span></div>
                </div>
              </div>
            </div>
            <div className="vq2">
              <figure className="vq rv">
                <div className="vq__ph"><Image src="/assets/tm-allyjana.jpg" alt="Allyjana, director of Allyjana Marie Creative" fill sizes="112px" style={{ objectPosition: '50% 18%' }} /></div>
                <div className="vq__t">
                  <span className="vq__res">3× demand</span>
                  <blockquote>&quot;Since then we&apos;ve seen our demand increase 3x, and it&apos;s saved me hours of work every week.&quot;</blockquote>
                  <figcaption className="vq__who"><b>Allyjana</b>Director, Allyjana Marie Creative</figcaption>
                </div>
              </figure>
              <figure className="vq rv" style={{ '--i': 1 }}>
                <div className="vq__ph"><Image src="/assets/tm-edward.jpg" alt="Edward Bun, director of Lyso" fill sizes="112px" style={{ objectPosition: '50% 28%' }} /></div>
                <div className="vq__t">
                  <div className="ph"><b>Ed&apos;s words coming</b>His one line and one number go here once he sends them.</div>
                  <figcaption className="vq__who"><b>Edward Bun</b>Director, Lyso</figcaption>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* OFFER. Most aware. Price on the page (Luke, 01-discovery Q1). 03-math.md §1: months 6-11 at A$48.50,
            month 12 A$91, year one A$1,164. No GST: UC is not registered (Vault/uc-info.md:40). Report: example numbers. */}
        <section className="sec ground" id="offer">
          <div className="layer band"></div><div className="layer static"></div><div className="layer grain"></div><div className="layer shade"></div>
          <div className="wrap">
            <div className="sec__head"><span className="label"><b>The offer</b></span><span className="label">No GST added</span></div>
            <div className="offer">
              <div>
                <h2 className="rv">{d.offerH2}</h2>
                <div className="price rv" style={{ '--i': 1 }}>
                  <p className="price__name">Asked &amp; Answered</p>
                  <p className="price__fig"><b>{price.monthly}</b><span>a month.<br />Cancel any time.</span></p>
                  <p className="price__setup">{price.setup} to start. You get it back.</p>
                  <div className="pay" aria-label="Months 6 to 11 are half price, month 12 is A$91, which pays back the A$297 setup">
                    <div className="pay__cells" aria-hidden="true">{['s', '', '', '', '', '', 'h', 'h', 'h', 'h', 'h', 'h', ''].map((c, i) => <i key={i} className={c || undefined} />)}</div>
                    <div className="pay__lbl" aria-hidden="true">{['Start', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(l => <span key={l}>{l}</span>)}</div>
                    <p className="pay__note">Months 6 to 11 are half price, so the {price.setup} comes back to you. Year one: {price.yearOne} all up.</p>
                  </div>
                  <div className="cta-row"><a className="btn btn--w" href="#book" data-cta="offer">{CTA}</a></div>
                  <p className="reassure">Live within 7 days of you giving us access, or you don&apos;t pay that month.</p>
                </div>
              </div>
              <ul className="inc rv" style={{ '--i': 2 }}>
                {d.inc.map(([b, s]) => <li key={b}><span>{b}<small>{s}</small></span></li>)}
              </ul>
            </div>
            <div className="offer2">
              <div className="rv">
                <h3>See what changed, every month</h3>
                <div className="rframe">
                  <div className="rframe__bar"><span><b>Your business</b> · October report</span><span>Example</span></div>
                  <div className="sheet">
                    <Image src="/assets/gr/report-1.jpg" alt="Example monthly report cover: higher on the map, 9 new reviews" width={900} height={1200} sizes="(max-width:960px) 60vw, 30vw" />
                    <Image src="/assets/gr/report-2.jpg" alt="Example report page: top 3 in 15 of 49 spots on the grid map" width={900} height={1200} sizes="(max-width:960px) 30vw, 15vw" />
                    <Image src="/assets/gr/report-3.jpg" alt="Example report page: you against the businesses near you, and what we did" width={900} height={1200} sizes="(max-width:960px) 30vw, 15vw" />
                  </div>
                </div>
              </div>
              <div className="rv" style={{ '--i': 1 }}>
                <h3>Do your own maths</h3>
                <Calc value={d.calcValue} note={d.calcNote} customer={d.customer} customers={d.customers} />
              </div>
            </div>
          </div>
        </section>

        {/* QUESTIONS. Most aware. Owner's words, answered acknowledge, reframe, prove (landing-pages 04 §4.8). */}
        <section className="sec sec--off" id="faq">
          <div className="wrap">
            <div className="sec__head"><span className="label"><b>Questions</b></span></div>
            <div className="two">
              <h2 className="rv">What owners ask before they start.</h2>
              <div className="faq rv" style={{ '--i': 1 }}>
                {d.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><div><p>{a}</p></div></details>)}
              </div>
            </div>
          </div>
        </section>

        {/* BOOK. Most aware. The form first (every CTA lands here), then the promises (01-discovery Q8) and Luke.
            No ranking promise. */}
        <section className="sec close" id="book">
          <div className="wrap">
            <div className="sec__head"><span className="label"><b>Talk to Luke</b></span><span className="label">{price.monthly} a month</span></div>
            <div className="bookg">
              <div className="bookg__form">
                <h2>Book your free Google check.</h2>
                <p className="lede">Pick a time that suits you. Luke looks at your Google profile with you and shows you where you sit on the map. 15 minutes, or 30 if you want longer.</p>
                <BookingForm niche={d.niche} variant={d.variant} />
              </div>
              <div className="bookg__side">
                <div className="luke__ph gph"><Image src="/assets/gr/luke-on-phone.jpg" alt="Luke Marinovic on the phone at his desk" fill sizes="(max-width:960px) 100vw, 40vw" style={{ objectPosition: '50% 40%' }} /></div>
                <h2 className="rv">Almost no risk. Every review you get stays yours.</h2>
                <p className="lede rv" style={{ '--i': 1 }}>You deal with me, Luke, the owner. I&apos;ll tell you straight if this will help you.</p>
                <ol className="gu rv" style={{ '--i': 2 }}>
                  <li><div><b>Your review asks are live in 7 days, or you don&apos;t pay that month.</b></div></li>
                  <li><div><b>Every review answered in 1 business day, or you don&apos;t pay that month.</b></div></li>
                  <li><div><b>More new reviews in your first 90 days than the 90 before, or you get your {price.setup} back.</b><span>As long as the asks stay on and you keep serving {d.customers}.</span></div></li>
                  <li><div><b>Cancel any time. Your Google profile and every review stay yours.</b></div></li>
                </ol>
                <p className="about"><b>UnderCurrent Automations</b> is my Melbourne business. You get simple systems that take work off your plate.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer: nothing that leaves the page except the two pages the law and Meta ask for (privacy, terms). */}
      <footer className="grf">
        <div className="layer foot__base"></div><div className="layer static"></div><div className="layer grain"></div>
        <div className="wrap">
          <div className="ft">
            <img className="ft__uca" src="/assets/mark-uca-left.png" alt="UnderCurrent Automations" width="1810" height="384" loading="lazy" />
            <p className="ft__c">Melbourne, Australia<br />ABN 23 368 496 814</p>
          </div>
          <p className="ft__px">We use the Meta Pixel and Conversions API to measure our ads.</p>
          <div className="ft__bar">
            <span>© 2026 UnderCurrent Automations</span>
            <span className="ft__links"><a href="/privacy" target="_blank" rel="noopener">Privacy</a><a href="/terms" target="_blank" rel="noopener">Terms</a><a href="#" data-cookies="">Cookie settings and opt out</a></span>
            <span>Google is a trademark of Google LLC. We&apos;re not part of Google.</span>
          </div>
        </div>
      </footer>

      <div className="stk" id="gr-stk"><a className="btn" href="#book" data-cta="sticky">{CTA}</a><small>{price.monthly} a month · cancel any time</small></div>
      <GrFx niche={d.niche} variant={d.variant} />
      <Consent />
    </div>
  )
}
