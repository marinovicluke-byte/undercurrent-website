// lib/articleBody.js — pours remark's HTML into the article skeleton. The
// markdown is line-oriented and never indented, so the transforms are line
// based: the quick answer out of its blockquote, the FAQ section off the body
// (front-matter renders it), the body split at each h2 into a `.blk` with an
// id for the rail, top-level elements given the reveal class and a stagger,
// tables rebuilt as the design's `.tbl` rows so they stack on the phone.

const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x26;/g, '&').trim()
export const text = strip

export function slugify(t) {
  return strip(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48).replace(/-$/, '')
}

// > **Quick Answer:** lead ... optional list ... optional closing paragraphs
export function extractQuickAnswer(html) {
  const re = /<blockquote>\n<p><strong>Quick Answer:?<\/strong>\s*([\s\S]*?)<\/p>\n(?:<(ul|ol)>\n([\s\S]*?)<\/\2>\n)?((?:<p>[\s\S]*?<\/p>\n)*)<\/blockquote>\n?/
  const m = html.match(re)
  if (!m) return { qa: null, html }
  const items = m[3] ? [...m[3].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(x => x[1].trim()) : []
  const close = m[4] ? [...m[4].matchAll(/<p>([\s\S]*?)<\/p>/g)].map(x => x[1].trim()) : []
  const lead = m[1].trim()
  // the new shape: the whole lead is one bold, self-contained answer sentence, the points a bullet list under it
  const answer = /^<strong>[\s\S]*<\/strong>$/.test(lead) && lead.indexOf('<strong>', 1) < 0
  return { qa: { lead, answer, items, ordered: m[2] === 'ol', close }, html: html.replace(m[0], '') }
}

// drop an h2 section (heading to the next h2) from the body
export function stripSection(html, title) {
  const i = html.search(new RegExp(`<h2>${title}[\\s\\S]*?</h2>`, 'i'))
  if (i < 0) return html
  const j = html.indexOf('<h2>', i + 4)
  return html.slice(0, i) + (j < 0 ? '' : html.slice(j))
}

// the body at each h2: the intro first, then one block a heading
export function splitBlocks(html) {
  const parts = html.split(/(?=<h2>)/)
  const intro = parts[0].startsWith('<h2>') ? '' : parts.shift()
  const seen = new Set()
  const blocks = parts.map(p => {
    const m = p.match(/^<h2>([\s\S]*?)<\/h2>\n?/)
    const title = m ? m[1] : ''
    let id = slugify(title) || 'section'
    while (seen.has(id)) id += '-2'
    seen.add(id)
    return { id, title, toc: strip(title), html: m ? p.slice(m[0].length) : p }
  })
  return { intro, blocks }
}

const CONTAINER = /^<(blockquote|ul|ol|table|pre|figure|div|svg)\b/
const CLOSER = /^<\/(blockquote|ul|ol|table|pre|figure|div|svg)>/
const TOP = /^<(p|h3|h4|ul|ol|table|blockquote|pre|figure|div|svg|img|hr)\b/

function tableToTbl(t, i) {
  const ths = [...t.matchAll(/<th(?:\s[^>]*)?>([\s\S]*?)<\/th>/g)].map(m => m[1].trim())
  const rows = [...t.matchAll(/<tr>\n?((?:<td(?:\s[^>]*)?>[\s\S]*?<\/td>\n?)+)<\/tr>/g)]
    .map(m => [...m[1].matchAll(/<td(?:\s[^>]*)?>([\s\S]*?)<\/td>/g)].map(x => x[1].trim()))
  const n = ths.length || rows[0]?.length || 3
  const cols = n === 3 ? '' : ` style="--tcols:1.1fr repeat(${n - 1},1.4fr)"`
  const head = ths.length ? `<div class="tbl__h"${cols}>${ths.map(x => `<span>${x}</span>`).join('')}</div>` : ''
  const body = rows.map(cells => `<div class="tbl__r"${cols}><b>${cells[0] || ''}</b>${cells.slice(1).map((c, k) => `<span data-l="${strip(ths[k + 1] || '').replace(/"/g, '&quot;')}">${c}</span>`).join('')}</div>`).join('\n')
  return `<div class="tbl rv" style="--i:${i}">${head}\n${body}</div>`
}

// reveal class and stagger on the top-level elements of a block; tables rebuilt; a first paragraph can lead
export function decorate(html, { lead = false } = {}) {
  const lines = html.split('\n')
  const out = []
  let depth = 0, i = 0, table = null
  const cls = (extra, style) => { i++; const n = Math.min(i, 5); return `class="rv${extra ? ' ' + extra : ''}" style="--i:${n}${style ? ';' + style : ''}"` }
  // the block transform's elements arrive with a class and a style of their own: fold the reveal into them
  const reveal = l => {
    const open = l.match(/^<(\w+)([^>]*)>/)
    if (!open) return l.replace(/^<(\w+)/, (_, t) => `<${t} ${cls()}`)
    const [tag, attrs] = [open[1], open[2]]
    const own = attrs.match(/\sclass="([^"]*)"/)?.[1]
    const style = attrs.match(/\sstyle="([^"]*)"/)?.[1]
    const rest = attrs.replace(/\sclass="[^"]*"/, '').replace(/\sstyle="[^"]*"/, '')
    return `<${tag} ${cls(own, style)}${rest}>${l.slice(open[0].length)}`
  }
  for (const line of lines) {
    if (table !== null) {
      table.push(line)
      if (/^<\/table>/.test(line)) { out.push(tableToTbl(table.join('\n'), Math.min(++i, 5))); table = null }
      continue
    }
    if (depth === 0 && /^<table\b/.test(line)) { table = [line]; continue }
    let l = line
    if (depth === 0 && TOP.test(line)) {
      const tag = line.match(TOP)[1]
      if (tag === 'p' && lead && i === 0) l = line.replace(/^<p>/, `<p ${cls('lead')}>`)
      else if (tag === 'blockquote' && !/Quick Answer/i.test(html)) l = line.replace(/^<blockquote>/, `<blockquote ${cls('pull')}>`)
      else if (tag === 'svg') { i++; l = line.replace(/^<svg\b/, '<svg class="rv"') }
      else l = reveal(line)
    }
    if (CONTAINER.test(line) && !/<\/(blockquote|ul|ol|table|pre|figure|div|svg)>\s*$/.test(line) && !/\/>\s*$/.test(line)) depth++
    if (CLOSER.test(line)) depth = Math.max(0, depth - 1)
    out.push(l)
  }
  return out.join('\n')
}
