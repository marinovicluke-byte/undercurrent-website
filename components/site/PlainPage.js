// components/site/PlainPage.js — the plain text template: privacy, terms, the
// 404. A single entry wears the colour ground (site rule), so it borrows the
// glossary term's sheet: the teal hero with the title, then one reading column.
import '@/app/styles/term.css'
import PageFx from './PageFx'

export default function PlainPage({ title, updated, children }) {
  return (
    <div className="c-gloss">
      <PageFx />
      <main>
        <header className="hero" id="top" data-reveal="">
          <div className="hero__layer band"></div>
          <div className="hero__layer hero__glow b"></div>
          <div className="hero__layer hero__static"></div>
          <div className="hero__layer hero__grain"></div>
          <div className="hero__inner"><h1 className="rv">{title}</h1></div>
        </header>
        <div className="art"><div className="wrap"><div className="art__col">
          {updated && <p className="eyebrow">Last updated {updated}</p>}
          <div className="body">{children}</div>
        </div></div></div>
      </main>
    </div>
  )
}
