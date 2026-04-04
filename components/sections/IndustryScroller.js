// components/sections/IndustryScroller.js
'use client'
import { useState } from 'react'
import { INDUSTRIES } from '@/lib/data/industries'

export default function IndustryScroller() {
  const [paused, setPaused] = useState(false)
  const items = [...INDUSTRIES, ...INDUSTRIES]

  return (
    <section className="bg-white border-y border-border py-section-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-sm text-muted uppercase tracking-widest">Industries we serve</p>
      </div>
      <div
        className="relative flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            animation: `scroll 40s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map((industry, i) => (
            <span
              key={i}
              className="inline-block rounded-full border border-border px-4 py-2 text-sm font-body text-muted"
            >
              {industry}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
