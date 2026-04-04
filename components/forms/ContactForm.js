'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const INITIAL = { name: '', email: '', phone: '', company: '', message: '', honeypot: '' }

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.honeypot) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="font-display text-2xl font-bold text-charcoal">Message received.</p>
        <p className="mt-3 text-muted">We&apos;ll be in touch within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={set('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="company">Business name</label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={set('company')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body text-charcoal mb-2" htmlFor="message">Message *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}

      <Button type="submit" disabled={status === 'loading'} variant="primary">
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
