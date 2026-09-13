// components/site/Post.js — the blog row and its thumbnail, as the index and the
// article's Read next use them. A real cover (public/articles/<slug>/hero.jpg,
// 3:2) is treated in the category colour like the mockup's photo; without one
// the ink mark stands in.
import fs from 'node:fs'
import path from 'node:path'
import { categoryOf, fmtDate } from '@/lib/categories'

const covers = new Map()
export function hasCover(slug) {
  if (!covers.has(slug)) covers.set(slug, fs.existsSync(path.join(process.cwd(), 'public', 'articles', slug, 'hero.jpg')))
  return covers.get(slug)
}

export function Thumb({ slug, big = false }) {
  if (hasCover(slug)) {
    const src = `/_next/image?url=${encodeURIComponent(`/articles/${slug}/hero.jpg`)}&w=${big ? 828 : 384}&q=75`
    return <span className="thumb"><span className="thumb__ph thumb__ph--img"><img src={src} alt="" loading="lazy" decoding="async" width="1536" height="1024" /></span><i className="hero__layer hero__grain"></i></span>
  }
  return <span className="thumb"><i className="hero__layer band"></i><i className="hero__layer hero__glow b"></i><i className="hero__layer hero__grain"></i><img className="thumb__icon" src="/assets/mark-ink.png" alt="" /></span>
}

export const Mins = ({ a }) => <>{fmtDate(a.date)}<em>·</em>{a.readingTime || 5} min</>

export function PostRow({ a, i = 1, ex = false, cat = true, hidden = false }) {
  const c = categoryOf(a.cluster)
  return (
    <a className={`post c-${c.key} rv${cat ? ' has-c' : ''}`} style={{ '--i': Math.min(i, 5) }} href={`/blog/${a.slug}`} hidden={hidden || undefined}>
      <Thumb slug={a.slug} />
      <div>
        <span className="pmeta">{cat ? <><b className="pcat">{c.label}</b><span className="pm-d"><em>·</em><Mins a={a} /></span></> : <Mins a={a} />}</span>
        <h3>{a.title}</h3>
        {ex && <p>{a.description || a.summary}</p>}
        {cat && <span className="pdate"><Mins a={a} /></span>}
      </div>
    </a>
  )
}
