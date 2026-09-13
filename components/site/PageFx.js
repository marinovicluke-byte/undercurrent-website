'use client'
// components/site/PageFx.js — the plain and the content pages' behaviour: nav
// and reveal always, then what the page has: the tap-to-pin logos (about), the
// share row (article, term), the section rail (article), Show more (blog
// index), the find box (glossary index).
import { useEffect } from 'react'
import { run, initNav, initReveal, initLogos, initShare, initRail, initMore, initFind } from './fx'

export default function PageFx({ logos = false, share = false, rail = false, more = false, find = false }) {
  useEffect(() => run(
    initNav, initReveal,
    ...(logos ? [initLogos] : []), ...(share ? [initShare] : []), ...(rail ? [initRail] : []),
    ...(more ? [initMore] : []), ...(find ? [initFind] : []),
  ), [logos, share, rail, more, find])
  return null
}
