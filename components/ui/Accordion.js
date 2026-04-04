// components/ui/Accordion.js
'use client'
import { useState } from 'react'

export default function Accordion({ items, defaultOpenIndex = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-5 text-left font-body text-charcoal flex justify-between items-center"
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span
              className={`text-2xl text-muted transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <div className="pb-5 text-muted leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
