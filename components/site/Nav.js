// components/site/Nav.js — the fixed nav and the full-screen menu, the sandbox's
// decided block. `scrolled` starts the white bar on pages without a hero (contact).
export default function Nav({ scrolled = false }) {
  return (
    <>
      <header className={scrolled ? 'nav scrolled' : 'nav'}><div className="wrap nav__in">
        <a className="nav__brand" href="/"><span className="mk-ink"><img src="/assets/mark-ink-nav.png" alt="" /><img className="dk" src="/assets/mark-ink-nav-ink.png" alt="" /></span><span className="wm-lock"><b>UnderCurrent</b><small>Automations</small></span></a>
        <button className="burger" aria-label="Menu"></button>
      </div></header>
      <nav className="menu">
        <div>
          <a href="/#services">Services</a><a href="/#work">Work</a><a href="/blog">Blog</a><a href="/about">About</a><a href="/contact">Contact</a>
        </div>
      </nav>
    </>
  )
}
