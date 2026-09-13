'use client'
// components/site/ServiceFx.js — the four service pages' behaviour: nav, reveal,
// the work sheet with the before/build/result case and the flow, the testimonial
// slide, the tap-to-pin rows.
import { useEffect } from 'react'
import { run, initNav, initReveal, initWork, fillWorkService, initTestimonials, initRows } from './fx'

export default function ServiceFx() {
  useEffect(() => run(initNav, () => initReveal({ threshold: .15 }), () => initWork(fillWorkService), initTestimonials, initRows), [])
  return null
}
