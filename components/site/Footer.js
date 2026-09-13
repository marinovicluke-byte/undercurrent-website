// components/site/Footer.js — the homepage footer, on every page (site rule).
// The mockup's Tools column (audit, website check, ROI calculator) had no
// targets and the audit is discontinued, so it is a Contact column here.
export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/undercurrent-automations/', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', extra: <><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></> },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61578553167947', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', href: 'https://www.instagram.com/undercurrent.automations/', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', extra: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>, first: true },
]

export const BOOK_A_CALL = 'https://cal.com/luke-marinovic-aqeosc/30min'
export const EMAIL = 'luke@undercurrentautomations.com'

export function SocialLinks() {
  return SOCIALS.map(s => (
    <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24">{s.first ? <>{s.extra}<path d={s.d} /></> : <><path d={s.d} />{s.extra}</>}</svg>
    </a>
  ))
}

export default function Footer() {
  return (
    <footer id="footer">
      <div className="hero__layer foot__base"></div>
      <div className="hero__layer hero__glow b"></div>
      <div className="hero__layer hero__static"></div>
      <div className="hero__layer hero__grain"></div>
      <div className="wrap">
        <div className="ft__cols">
          <div className="ft__brand">
            <b>UnderCurrent Automations</b>
            <p>AI automation, digital growth and business consulting for service businesses.</p>
            <address>Melbourne, Australia<br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></address>
            <div className="ft__cta"><a href="/contact">Let&apos;s chat</a></div>
          </div>
          <div className="ft__col"><h4>Services</h4><a href="/automation">Automation</a><a href="/website">Website Design</a><a href="/seo">Google &amp; AI Search</a><a href="/consulting">Consulting</a></div>
          <div className="ft__col"><h4>Company</h4><a href="/about">About</a><a href="/#work">Work</a><a href="/blog">Blog</a><a href="/glossary">Glossary</a><a href="/contact">Contact</a></div>
          <div className="ft__col"><h4>Contact</h4><a href={`mailto:${EMAIL}`}>Email</a><a href="tel:+61438780815">0438 780 815</a><a href={BOOK_A_CALL} target="_blank" rel="noopener">Book a call</a></div>
        </div>
        <div className="ft__sign">
          <img className="ft__uca ft__uca--l" src="/assets/mark-uca-left.png" alt="UnderCurrent Automations" /><img className="ft__uca ft__uca--c" src="/assets/mark-uca-centre.png" alt="UnderCurrent Automations" />
          <div className="ft__soc"><SocialLinks /></div>
        </div>
        <a className="ft__chat" href="/contact">Let&apos;s chat</a>
        <div className="ft__bar"><span>© 2026 UnderCurrent Automations</span><span className="ft__meta"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span></div>
      </div>
    </footer>
  )
}
