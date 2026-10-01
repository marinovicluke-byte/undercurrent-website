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
//   - = Answer, **value**         maths shown; an item opening "= " is the total
//
//   *A note.*                     an italic line straight after = the block's note
//
// A bold line followed by anything but a list (the FAQ pattern) is left alone.
// Board of the looks: /article-blocks-concepts.html

// a custom node becomes an element through mdast-util-to-hast, which reads data.hName and data.hProperties
function el(tag, className, children, props = {}) {
  return { type: 'ucbElement', data: { hName: tag, hProperties: { className: className.split(' '), ...props } }, children }
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

// a workings line opening "= " is the total: the line gets a class, the sign stays in the text
function markTotal(item) {
  const first = item.children[0]?.children?.[0]?.children?.[0]
  if (first?.type === 'text' && first.value.startsWith('= ')) {
    item.data = { hProperties: { className: ['ucb__total'] } }
  }
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
  table.data = { hProperties: { role: 'table' } }
  head?.children.forEach(c => (c.data = { hProperties: { role: 'columnheader', scope: 'col' } }))
  for (const row of table.children) row.data = { hProperties: { role: 'row' } }
  for (const row of rows) {
    row.children.forEach((c, i) => {
      c.data = i === 0
        ? { hName: 'th', hProperties: { role: 'rowheader', scope: 'row' } }
        : { hProperties: { role: 'cell', dataLabel: labels[i] || '' } }
    })
  }
  const named = labels.filter(Boolean)
  return el('div', `ucb-data${labels.length >= 5 ? ' ucb-data--wide' : ''}`, [table], {
    tabIndex: 0, role: 'region', ariaLabel: `Table${named.length ? ': ' + named.join(', ') : ''}`,
    style: `--rows:${rows.length};--cols:${labels.length}`,
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
      if (kind === 'workings') list.children.forEach(markTotal)

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
      grouped.push(el('div', `ucb-pair${t ? ' ucb-pair--contrast' : ''}`, [out[i], out[i + 1]]))
      i += 1
    }
    tree.children = grouped
  }
}
