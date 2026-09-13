'use client'
// components/site/PageFx.js — the plain pages' behaviour: nav and reveal, plus
// the tap-to-pin logos where a page has the clients grid (about).
import { useEffect } from 'react'
import { run, initNav, initReveal, initLogos, initShare } from './fx'

export default function PageFx({ logos = false, share = false }) {
  useEffect(() => run(initNav, initReveal, ...(logos ? [initLogos] : []), ...(share ? [initShare] : [])), [logos, share])
  return null
}
