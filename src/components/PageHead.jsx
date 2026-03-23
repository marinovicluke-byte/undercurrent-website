import { useEffect } from 'react'

/**
 * Sets document title, meta description, canonical URL, og:* and twitter:* tags,
 * and injects a JSON-LD <script> tag — all imperatively so no extra dependency is needed.
 *
 * Props:
 *   title        – Full <title> string
 *   description  – meta description
 *   canonical    – canonical URL
 *   ogTitle      – og:title (defaults to title)
 *   ogDescription– og:description (defaults to description)
 *   ogImage      – og:image URL
 *   jsonLd       – object to serialize as application/ld+json (optional)
 */
export default function PageHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = 'https://www.undercurrentautomations.com/og-image.jpg',
  jsonLd,
}) {
  useEffect(() => {
    // Title
    if (title) document.title = title

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrVal] = attr.split('=')
        el.setAttribute(attrName, attrVal.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    if (description) {
      setMeta('meta[name="description"]', 'name=description', description)
      setMeta('meta[property="og:description"]', 'property=og:description', ogDescription || description)
      setMeta('meta[name="twitter:description"]', 'name=twitter:description', ogDescription || description)
    }

    if (title) {
      setMeta('meta[property="og:title"]', 'property=og:title', ogTitle || title)
      setMeta('meta[name="twitter:title"]', 'name=twitter:title', ogTitle || title)
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', 'property=og:image', ogImage)
      setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage)
    }

    if (canonical) {
      setLink('canonical', canonical)
      setMeta('meta[property="og:url"]', 'property=og:url', canonical)
    }

    // JSON-LD
    if (jsonLd) {
      const existing = document.getElementById('page-json-ld')
      if (existing) existing.remove()
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-json-ld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    // Cleanup — restore index.html defaults so stale SEO data doesn't persist on navigation
    return () => {
      document.title = 'UnderCurrent — AI Business Automation'
      const defaultDesc = 'Melbourne-based AI automation studio. We map small business workflows and build custom AI-powered systems that run your operations — silently, continuously, precisely.'
      const resetMeta = (selector, attr, value) => {
        const el = document.querySelector(selector)
        if (el) el.setAttribute('content', value)
      }
      resetMeta('meta[name="description"]', 'content', defaultDesc)
      resetMeta('meta[property="og:title"]', 'content', 'UnderCurrent — AI Business Automation')
      resetMeta('meta[property="og:description"]', 'content', defaultDesc)
      resetMeta('meta[name="twitter:title"]', 'content', 'UnderCurrent — AI Business Automation')
      resetMeta('meta[name="twitter:description"]', 'content', defaultDesc)
      resetMeta('meta[property="og:image"]', 'content', 'https://www.undercurrentautomations.com/og-image.jpg')
      resetMeta('meta[name="twitter:image"]', 'content', 'https://www.undercurrentautomations.com/og-image.jpg')
      resetMeta('meta[property="og:url"]', 'content', 'https://www.undercurrentautomations.com/')
      const link = document.querySelector('link[rel="canonical"]')
      if (link) link.setAttribute('href', 'https://www.undercurrentautomations.com/')
      if (jsonLd) {
        const el = document.getElementById('page-json-ld')
        if (el) el.remove()
      }
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, jsonLd])

  return null
}
