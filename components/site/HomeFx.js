'use client'
// components/site/HomeFx.js — the homepage's behaviour: nav, the hero-led reveal,
// the work sheet, the testimonial slide, the tap-to-pin client logos.
import { useEffect } from 'react'
import { run, initNav, initHomeReveal, initWork, fillWorkHome, initTestimonials, initLogos } from './fx'

export default function HomeFx() {
  useEffect(() => run(initNav, initHomeReveal, () => initWork(fillWorkHome), initTestimonials, initLogos), [])
  return null
}
