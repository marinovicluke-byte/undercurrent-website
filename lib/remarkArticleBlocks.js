// lib/remarkArticleBlocks.js — the writer's lists as blocks, the tables as a
// rail, a lone image as a figure. Plain markdown in, plain semantic HTML out:
// a step list stays an <ol>, a table stays a <table>, the look is CSS only and
// picked by one class on the article (BLOCK_LOOKS in app/blog/[slug]/page.js).
//
//   **Title (meta)**              a bold line on its own (a trailing colon is fine)
//
//   1. Step text, **timing**      ordered list = steps; a trailing bold is the step's timing
//   - [ ] A check                 task list = tickable checklist; nest checks under a
//                                 bullet to group them
//   - A thing                     bullet list = list block; two in a row = a pair
//   - Label, **value**            every item ending in a bold value = workings, the
//   - = Answer, **value**         maths shown; an item opening "= " is the total, and the
//                                 sum is checked here: a wrong one fails the build
//
//   *A note.*                     an italic line straight after = the block's note
//
//   | **Pick** |                  a column header set in bold = the column the table recommends
//
// A bold line followed by anything but a list (the FAQ pattern) is left alone.
// Board of the looks: /article-blocks-concepts.html

// a custom node becomes an element through mdast-util-to-hast, which reads data.hName and data.hProperties
function el(tag, className, children, props = {}) {
  return { type: 'ucbElement', data: { hName: tag, hProperties: { className: className.split(' '), ...props } }, children }
}

// merge properties into a node's hProperties, class names added rather than replaced
function prop(node, props) {
  const h = ((node.data ||= {}).hProperties ||= {})
  for (const [k, v] of Object.entries(props)) h[k] = k === 'className' ? [...(h.className || []), ...v] : v
}

function textOf(nodes) {
  return nodes.map(n => ('value' in n ? n.value : n.children ? textOf(n.children) : '')).join('')
}

// `**Title (meta)**` alone in a paragraph, or null
function titleOf(node) {
  if (node?.type !== 'paragraph') return null
  const [only, colon] = node.children
  if (only?.type !== 'strong') return null
  if (node.children.length > 2 || (colon && !(colon.type === 'text' && colon.value.trim() === ':'))) return null
  const text = textOf(only.children).trim().replace(/:$/, '')
  const meta = text.match(/^(.*\S)\s*\((.+)\)$/)
  if (!meta) return { text, kids: [{ type: 'text', value: text }] }
  return { text, kids: [{ type: 'text', value: meta[1] + ' ' }, el('span', 'ucb__meta', [{ type: 'text', value: meta[2] }])] }
}

const isNote = node => node?.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'emphasis'

const items = list => list.children.flatMap(i => [i, ...i.children.filter(c => c.type === 'list').flatMap(items)])

// "Label, **value**": the paragraph's last child is bold and the text before it ends in a comma
function trailing(item) {
  const p = item.children[0]
  if (p?.type !== 'paragraph') return null
  const k = p.children, last = k[k.length - 1], before = k[k.length - 2]
  return last?.type === 'strong' && before?.type === 'text' && before.value.endsWith(', ') ? p : null
}

function kindOf(list) {
  if (items(list).some(i => typeof i.checked === 'boolean')) return 'checklist'
  if (list.ordered) return 'steps'
  if (list.children.length > 1 && list.children.every(trailing)) return 'workings'
  return 'list'
}

// the item's words in one span, a trailing bold split off as its value; the comma stays in
// the text for screen readers and answer engines, CSS hides it or draws a leader instead
function shapeItem(item, valueClass) {
  const p = item.children[0]
  if (p?.type !== 'paragraph') return
  const k = p.children
  if (trailing(item)) {
    const before = k[k.length - 2]
    before.value = before.value.slice(0, -2)
    p.children = [el('span', 'ucb__text', k.slice(0, -1)), el('span', 'ucb__sep', [{ type: 'text', value: ', ' }]), el('span', valueClass, k[k.length - 1].children)]
  } else {
    p.children = [el('span', 'ucb__text', k)]
  }
}

// ---------- workings: the site does the maths. A value's first figure is its number ("about 10
// hours" is 10, "$1,800 AUD per month" is 1800). A label with a sum of its own ("30 leads x $60
// AUD per lead") has to come to its value. A total ("= ...") without a sum of its own has to be the
// product or the sum of the lines above it, and the sign between those lines is written into the
// text. A sum that doesn't hold throws, so the build stops: a site that sells numbers, not
// adjectives, doesn't print a wrong one. Signs, "=" and figures stay in the text for engines.
const FIG = /([$€£]\s?)?(\d[\d,]*(?:\.\d+)?)(\s?k\b)?/i
function figure(s) {
  const m = s.match(FIG)
  return m && { n: parseFloat(m[2].replace(/,/g, '')) * (m[3] ? 1000 : 1), money: !!m[1], at: m.index, text: m[0] }
}

// the figures in a label and the signs between them, words ignored; x and / bind before + and −
function sumIn(s) {
  const toks = [...s.matchAll(/(?:[$€£]\s?)?\d[\d,]*(?:\.\d+)?|\s[x×*/+−]\s/gi)].map(m => m[0].trim().toLowerCase())
  if (toks.length < 3 || toks.length % 2 === 0) return null
  const isSign = t => /^[x×*/+−]$/.test(t)
  if (toks.some((t, i) => isSign(t) !== (i % 2 === 1))) return null
  const terms = [figure(toks[0]).n], signs = []
  for (let i = 1; i < toks.length; i += 2) {
    const n = figure(toks[i + 1]).n
    if (toks[i] === '+' || toks[i] === '−') { signs.push(toks[i]); terms.push(n) }
    else terms[terms.length - 1] = toks[i] === '/' ? terms.at(-1) / n : terms.at(-1) * n
  }
  return terms.reduce((a, t, i) => (i === 0 ? t : signs[i - 1] === '+' ? a + t : a - t))
}

// "about $59" is fine for 59.21: within half a unit or 1.5%
const close = (a, b) => Math.abs(a - b) <= Math.max(0.5, Math.abs(b) * 0.015)
const fmt = (n, money) => (money ? '$' : '') + n.toLocaleString('en-AU', { maximumFractionDigits: 2 })
// the sign stays a real character; the class lets a look draw it as the site's cross mark
const SIGN = { '×': 'times', '+': 'plus', '=': 'eq' }
const signEl = sign => el('span', `ucb__op ucb__op--${SIGN[sign]}`, [{ type: 'text', value: sign }])

function workings(list, title) {
  const rows = list.children.map(item => {
    const p = item.children[0]
    const [text, , val] = p.children
    const label = textOf(text.children).trim()
    const value = textOf(val.children).trim()
    return { item, p, text, val, label, value, total: label.startsWith('= '), fig: figure(value), own: sumIn(label) }
  })
  const fail = msg => { throw new Error(`[workings] "${title}": ${msg}. Fix the sum in the article; the build won't print a wrong one.`) }
  for (const r of rows) {
    if (r.own != null && r.fig && !close(r.own, r.fig.n)) fail(`"${r.label}" comes to ${fmt(r.own)}, not ${r.value}`)
  }

  // a total with no sum of its own: the lines above multiply or add up to it
  const parts = rows.filter(r => !r.total)
  const total = rows.find(r => r.total)
  let sign = null
  if (total && total.own == null && total.fig && parts.length > 1 && parts.every(r => r.fig && r.own == null)) {
    const product = parts.reduce((a, r) => a * r.fig.n, 1)
    const sum = parts.reduce((a, r) => a + r.fig.n, 0)
    sign = close(product, total.fig.n) ? '×' : close(sum, total.fig.n) ? '+' : null
    if (!sign) fail(`the lines multiply to ${fmt(product)} and add to ${fmt(sum)}, neither is ${total.value}`)
  }

  let run = null, money = false
  rows.forEach((r, i) => {
    prop(r.item, { style: `--n:${i + 1}` })
    // the value split round its figure, so a look can set "10" big and "hours" small
    const only = r.val.children.length === 1 && r.val.children[0].type === 'text' ? r.val.children[0].value : null
    if (only && r.fig) {
      const at = only.indexOf(r.fig.text)
      r.val.children = [
        at > 0 && el('span', 'ucb__pre', [{ type: 'text', value: only.slice(0, at) }]),
        el('span', 'ucb__fig', [{ type: 'text', value: r.fig.text }]),
        at + r.fig.text.length < only.length && el('span', 'ucb__unit', [{ type: 'text', value: only.slice(at + r.fig.text.length) }]),
      ].filter(Boolean)
    }
    if (r.total) {
      prop(r.item, { className: ['ucb__total'] })
      const first = r.text.children[0]
      // the "=" comes out of the label to sit where the other signs sit, in front of it
      if (first?.type === 'text' && first.value.startsWith('= ')) {
        first.value = first.value.slice(2)
        r.p.children.unshift(signEl('='), { type: 'text', value: ' ' })
      }
      return
    }
    if (!sign) return
    // the sign written in before every line but the first, and the running result kept for the tally look
    if (i > 0) r.p.children.unshift(signEl(sign), { type: 'text', value: ' ' })
    money ||= r.fig.money
    run = run == null ? r.fig.n : sign === '×' ? run * r.fig.n : run + r.fig.n
    prop(r.item, { dataRun: fmt(run, money) })
  })
  prop(list, { className: [sign ? 'ucb__list--chain' : 'ucb__list--sums'], style: `--of:${rows.length}` })
}

// a task item becomes a real checkbox with its text as the label; a bullet holding a nested
// task list is a group, its own words the group's name
function shapeChecks(list) {
  for (const item of list.children) {
    const nested = item.children.find(c => c.type === 'list')
    if (nested) {
      const p = item.children[0]
      // a span, not a p: a tight list unwraps its paragraphs, and the class with them
      if (p?.type === 'paragraph') item.children[0] = el('span', 'ucb__group', p.children)
      item.data = { hProperties: { className: ['ucb__grouped'] } }
      nested.data = { hProperties: { className: ['ucb__checks'], role: 'list' } }
      shapeChecks(nested)
      continue
    }
    if (typeof item.checked !== 'boolean') continue
    const p = item.children[0]
    const checked = item.checked
    item.checked = null
    item.data = { hProperties: { className: ['ucb__check'] } }
    if (p?.type !== 'paragraph') continue
    p.data = { hName: 'label' }
    p.children = [el('input', 'ucb__box', [], { type: 'checkbox', checked }), el('span', 'ucb__text', p.children)]
  }
}

// a pair reads as a contrast only when its titles say so; otherwise the two sit side by side as equals
const MINUS = /\b(don'?t|doesn'?t|not|never|avoid|before|without|manual|current|old|stop|skip|cons|risks?|mistakes?)\b/i
const PLUS = /\b(do|does|works?|helps?|after|with|automated|new|start|pros|wins?|gains?)\b/i
function tones(a, b) {
  if (MINUS.test(a) && !MINUS.test(b)) return ['minus', 'plus']
  if (MINUS.test(b) && !MINUS.test(a)) return ['plus', 'minus']
  if (PLUS.test(a) && !PLUS.test(b)) return ['plus', 'minus']
  if (PLUS.test(b) && !PLUS.test(a)) return ['minus', 'plus']
  return null
}

// a table stays a real <table>. The first cell of each body row is the row's header, every
// body cell carries its column name for the rail's labels, explicit roles keep the table
// semantics when CSS changes the display, and the wrapper is the focusable scroller
function shapeTable(table) {
  const [head, ...rows] = table.children
  const labels = head ? head.children.map(c => textOf(c.children).trim()) : []
  // a header cell that is all bold names the column the table recommends; a cell that opens on a figure is a figure
  const pick = head ? head.children.findIndex((c, i) => i > 0 && c.children.length === 1 && c.children[0].type === 'strong') : -1
  table.data = { hProperties: { role: 'table' } }
  head?.children.forEach((c, i) => (c.data = { hProperties: { role: 'columnheader', scope: 'col', ...(i === pick && { className: ['ucb__pick'] }) } }))
  for (const row of table.children) row.data = { hProperties: { role: 'row' } }
  // a figure opens the cell and isn't a date ("31 August 2025" opens on a number, it isn't one)
  const isFig = c => {
    const t = textOf(c.children).trim(), m = t.match(/^[~≈$€£]?\s?\d[\d,.]*/)
    return !!m && !/^\s+[A-Z]/.test(t.slice(m[0].length))
  }
  // a column of figures, every cell, is marked header and all, so a look can right-align the lot
  const figs = new Set((head?.children || []).map((_, i) => i).filter(i => i > 0 && rows.length && rows.every(r => r.children[i] && isFig(r.children[i]))))
  head?.children.forEach((c, i) => figs.has(i) && prop(c, { className: ['ucb__num'] }))
  for (const row of rows) {
    row.children.forEach((c, i) => {
      const cls = [i === pick && 'ucb__pick', figs.has(i) && 'ucb__num'].filter(Boolean)
      c.data = i === 0
        ? { hName: 'th', hProperties: { role: 'rowheader', scope: 'row' } }
        : { hProperties: { role: 'cell', dataLabel: labels[i] || '', ...(cls.length && { className: cls }) } }
    })
  }
  const named = labels.filter(Boolean)
  return el('div', `ucb-data${labels.length >= 5 ? ' ucb-data--wide' : ''}`, [table], {
    tabIndex: 0, role: 'region', ariaLabel: `Table${named.length ? ': ' + named.join(', ') : ''}`,
    style: `--rows:${rows.length};--cols:${labels.length};--opts:${Math.max(labels.length - 1, 1)}`,
  })
}

// an image alone in its paragraph is a figure; its markdown title is the caption
function shapeFigure(p) {
  const kids = p.children.filter(c => !(c.type === 'text' && !c.value.trim()))
  if (kids.length !== 1 || kids[0].type !== 'image') return p
  const img = kids[0]
  const caption = img.title
  img.title = null
  // the image loader probed the file for its size; a portrait frame gets the tall treatment
  const { width, height } = img.data?.hProperties || {}
  const cls = height > width ? 'ucb-fig ucb-fig--tall' : 'ucb-fig'
  return el('figure', cls, caption ? [img, el('figcaption', 'ucb-fig__cap', [{ type: 'text', value: caption }])] : [img])
}

export default function remarkArticleBlocks() {
  return tree => {
    const nodes = tree.children.map(n => (n.type === 'table' ? shapeTable(n) : n.type === 'paragraph' ? shapeFigure(n) : n))
    const out = []
    const kinds = []
    const titles = []

    for (let i = 0; i < nodes.length; i++) {
      const title = titleOf(nodes[i])
      const list = nodes[i + 1]
      if (!title || list?.type !== 'list') {
        out.push(nodes[i]); kinds.push(null); titles.push(null)
        continue
      }
      const kind = kindOf(list)
      list.data = { hProperties: { className: ['ucb__list'], role: 'list' } }
      if (kind === 'checklist') shapeChecks(list)
      else list.children.forEach(item => shapeItem(item, kind === 'steps' ? 'ucb__time' : 'ucb__val'))
      if (kind === 'workings') workings(list, title.text)
      // where a step sits in its run, for the looks that draw progress
      if (kind === 'steps') {
        prop(list, { style: `--of:${list.children.length}` })
        list.children.forEach((item, n) => prop(item, { style: `--n:${n + 1}` }))
      }

      const children = [el('p', 'ucb__title', title.kids), list]
      i += 1
      if (isNote(nodes[i + 1])) {
        children.push(el('p', 'ucb__note', nodes[i + 1].children[0].children))
        i += 1
      }
      out.push(el('div', `ucb ucb--${kind}`, children, { role: 'group', ariaLabel: title.text }))
      kinds.push(kind); titles.push(title.text)
    }

    // exactly two list blocks in a row are a pair, side by side on a wide screen; three or more stay a run
    const grouped = []
    for (let i = 0; i < out.length; i++) {
      const pair = kinds[i] === 'list' && kinds[i + 1] === 'list' && kinds[i + 2] !== 'list' && kinds[i - 1] !== 'list'
      if (!pair) { grouped.push(out[i]); continue }
      const t = tones(titles[i], titles[i + 1])
      if (t) {
        out[i].data.hProperties.className.push(`ucb--${t[0]}`)
        out[i + 1].data.hProperties.className.push(`ucb--${t[1]}`)
      }
      // the longer list's length, for the look that reads the two lists across, line against line
      const rows = Math.max(...[out[i], out[i + 1]].map(b => b.children[1].children.length))
      grouped.push(el('div', `ucb-pair${t ? ' ucb-pair--contrast' : ''}`, [out[i], out[i + 1]], { style: `--rows:${rows}` }))
      i += 1
    }
    tree.children = grouped
  }
}
