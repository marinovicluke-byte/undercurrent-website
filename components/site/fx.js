// components/site/fx.js — the mockups' page scripts as functions. Plain DOM,
// called from a page's client component after mount. Each returns a cleanup.
// Kept verbatim in behaviour: the reveal, the nav, the work sheet, the
// testimonial slide, the tap-to-pin rows and logos.
export const $ = (s, el = document) => el.querySelector(s)
export const $$ = (s, el = document) => [...el.querySelectorAll(s)]

/* nav: white bar once the hero has scrolled past, the burger, the menu closing on a link */
export function initNav() {
  const nav = $('.nav'), hero = $('.hero'), burger = $('.burger')
  const onScroll = () => { if (hero) nav.classList.toggle('scrolled', scrollY > hero.offsetHeight - 70) }
  if (hero) { addEventListener('scroll', onScroll, { passive: true }); onScroll() } else nav.classList.add('scrolled')
  const toggle = () => document.body.classList.toggle('menu-open')
  const close = () => document.body.classList.remove('menu-open')
  burger.addEventListener('click', toggle)
  const links = $$('.menu a')
  links.forEach(a => a.addEventListener('click', close))
  return () => { removeEventListener('scroll', onScroll); burger.removeEventListener('click', toggle); links.forEach(a => a.removeEventListener('click', close)); close() }
}

/* reveal: a section gets .in when 10% is in view. once the wipe ends the mask is cleared so nothing clips.
   a very tall window (headless, print) shows everything at once */
export function initReveal({ threshold = .1 } = {}) {
  const onEnd = e => { if (e.animationName === 'rv' || e.animationName === 'rvd') { e.target.style.webkitMask = 'none'; e.target.style.mask = 'none' } }
  document.addEventListener('animationend', onEnd)
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold })
  const targets = $$('[data-reveal]')
  if (innerHeight > 2400) targets.forEach(el => el.classList.add('in')); else targets.forEach(el => io.observe(el))
  return () => { document.removeEventListener('animationend', onEnd); io.disconnect() }
}

/* homepage reveal: the intro follows the hero title, starting 0.4s before the title finishes
   (Luke, 2026-09-05, "bring it in earlier"). if the hero never animates the intro shows after 2.4s */
export function initHomeReveal() {
  const hero = $('.hero'), intro = $('.intro'), heroH1 = $('h1', hero)
  let heroDone = false, introSeen = false, introTimer
  const showIntro = () => { clearTimeout(introTimer); if (!intro.classList.contains('in')) { intro.classList.add('in'); io.unobserve(intro) } }
  const queueIntro = ms => { clearTimeout(introTimer); introTimer = setTimeout(() => { heroDone = true; if (introSeen) showIntro() }, ms) }
  const onStart = e => { if (e.target === heroH1 && (e.animationName === 'rv' || e.animationName === 'rvd')) queueIntro(Math.max(0, parseFloat(getComputedStyle(heroH1).animationDuration) * 1000 - 400)) }
  const onEnd = e => { if (e.animationName === 'rv' || e.animationName === 'rvd') { e.target.style.webkitMask = 'none'; e.target.style.mask = 'none' } }
  document.addEventListener('animationstart', onStart)
  document.addEventListener('animationend', onEnd)
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.target === intro) { introSeen = e.isIntersecting; if (e.isIntersecting && !heroDone && hero.classList.contains('in')) { if (!introTimer) queueIntro(2400); return } }
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
  }), { threshold: .15 })
  $$('[data-reveal]').forEach(el => io.observe(el))
  return () => { document.removeEventListener('animationstart', onStart); document.removeEventListener('animationend', onEnd); io.disconnect(); clearTimeout(introTimer) }
}

/* work: a carousel on the phone, dots follow the card in view. tap a card, the sheet opens.
   `fill` copies the card's story into the sheet; the homepage and the service pages carry different stories */
export function initWork(fill) {
  const cells = $('.cells'), wdots = $('.w-dots'), wcards = $$('.cell', cells), wm = $('#wm')
  const layoutCells = () => cells.classList.toggle('cells--scroll', innerWidth <= 640)
  wdots.innerHTML = wcards.map((c, i) => `<button aria-label="Project ${i + 1}"></button>`).join('')
  const wdb = [...wdots.children]
  wdb.forEach((b, i) => b.onclick = () => cells.scrollTo({ left: wcards[i].offsetLeft - parseFloat(getComputedStyle(cells).paddingLeft), behavior: 'smooth' }))
  const wio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) wdb.forEach((b, i) => b.classList.toggle('on', wcards[i] === e.target)) }), { root: cells, threshold: .6 })
  wcards.forEach(c => wio.observe(c))
  addEventListener('resize', layoutCells); layoutCells()
  const handlers = []
  wcards.forEach(c => {
    const open = () => { fill(wm, c); wm.showModal(); wm.scrollTop = 0; document.body.classList.add('wm-open') }
    const key = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }
    c.addEventListener('click', open); c.addEventListener('keydown', key); handlers.push([c, open, key])
  })
  const closeBtn = $('.wm__close', wm), onClose = () => document.body.classList.remove('wm-open'), onClick = e => { if (e.target === wm) wm.close() }
  closeBtn.onclick = () => wm.close()
  wm.addEventListener('click', onClick); wm.addEventListener('close', onClose)
  return () => { removeEventListener('resize', layoutCells); wio.disconnect(); handlers.forEach(([c, o, k]) => { c.removeEventListener('click', o); c.removeEventListener('keydown', k) }); wm.removeEventListener('click', onClick); wm.removeEventListener('close', onClose); if (wm.open) wm.close() }
}

export function fillWorkHome(wm, c) {
  const head = $('.wm__head', wm)
  head.className = 'cell wm__head ' + [...c.classList].find(x => x.startsWith('c-'))
  $('.wm__client', wm).textContent = c.dataset.client
  $('#wm-title', wm).innerHTML = $('h3', c).innerHTML
  $('.wm__stat', wm).innerHTML = $('.cell__stat', c).innerHTML
  $('.wm__text', wm).innerHTML = $('.cell__long', c).innerHTML
  $('.wm__res', wm).textContent = c.dataset.res
}

export function fillWorkService(wm, c) {
  /* the website page's cards carry a site screenshot for the sheet's head */
  wm.className = 'wm' + (c.dataset.shot ? ' wm--shot wm--' + c.dataset.shot : '')
  $('.wm__head', wm).style.setProperty('--shot', c.dataset.shot ? `url(/assets/work-${c.dataset.shot}.jpg)` : 'none')
  $('.wm__client', wm).textContent = c.dataset.client
  $('#wm-title', wm).innerHTML = $('h3', c).innerHTML
  $('.wm__stat', wm).innerHTML = $('.cell__stat', c).innerHTML
  $('.wm__case', wm).innerHTML = $('.cell__case', c).innerHTML
  $('.wm__flow', wm).innerHTML = $('.cell__flow', c).innerHTML
}

/* testimonials: the slide carousel, one at a time. drag on the phone, keyboard arrows, dots under */
export function initTestimonials() {
  const tmSec = $('#testimonials'), tms = tmSec && $('.tms', tmSec), track = tms && $('.tms__track', tms)
  if (!track) return () => {} /* the seo page carries one static card, no carousel */
  const cards = [...track.children], dots = $('.tm-dots', tmSec)
  let idx = 0, x0 = null
  const per = () => parseInt(getComputedStyle(tms).getPropertyValue('--per')) || 1
  function go(i) {
    const m = cards.length - per(); idx = Math.max(0, Math.min(m, i))
    track.style.transform = `translateX(${-cards[idx].offsetLeft}px)`
    cards.forEach((c, j) => c.classList.toggle('is-on', j === idx))
    dots.innerHTML = ''
    for (let j = 0; j <= m; j++) { const b = document.createElement('button'); b.className = j === idx ? 'on' : ''; b.setAttribute('aria-label', 'Testimonial ' + (j + 1)); b.onclick = () => go(j); dots.appendChild(b) }
    dots.hidden = m < 1
  }
  const onKey = e => { if (e.key === 'ArrowRight') go(idx + 1); else if (e.key === 'ArrowLeft') go(idx - 1) }
  const onDown = e => { x0 = e.clientX; track.setPointerCapture(e.pointerId); track.style.transition = 'none' }
  const onMove = e => { if (x0 !== null) track.style.transform = `translateX(${e.clientX - x0 - cards[idx].offsetLeft}px)` }
  const onUp = e => { if (x0 === null) return; const d = e.clientX - x0; x0 = null; track.style.transition = ''; go(Math.abs(d) > 40 ? idx - Math.sign(d) : idx) }
  const onCancel = () => { x0 = null; track.style.transition = ''; go(idx) }
  const onResize = () => go(idx)
  tmSec.addEventListener('keydown', onKey)
  track.addEventListener('pointerdown', onDown); track.addEventListener('pointermove', onMove); track.addEventListener('pointerup', onUp); track.addEventListener('pointercancel', onCancel)
  addEventListener('resize', onResize)
  go(0)
  return () => { tmSec.removeEventListener('keydown', onKey); track.removeEventListener('pointerdown', onDown); track.removeEventListener('pointermove', onMove); track.removeEventListener('pointerup', onUp); track.removeEventListener('pointercancel', onCancel); removeEventListener('resize', onResize) }
}

/* a tap pins a state on, the phone has no hover. tap again or elsewhere releases */
function initPin(selector) {
  const els = $$(selector)
  const hs = els.map(r => { const h = () => { const on = r.classList.contains('on'); els.forEach(x => x.classList.remove('on')); if (!on) r.classList.add('on') }; r.addEventListener('click', h); return h })
  return () => els.forEach((r, i) => r.removeEventListener('click', hs[i]))
}
export const initLogos = () => initPin('.logo')
export const initRows = () => initPin('.row,.rowb')

/* share row on the article and the term: the page address into the two links, copy writes it */
export function initShare() {
  const url = encodeURIComponent(location.href.split('?')[0].split('#')[0]), ttl = encodeURIComponent(document.title)
  const li = $('[data-share=li]'), x = $('[data-share=x]')
  if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url
  if (x) x.href = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + ttl
  $$('[data-copy]').forEach(b => b.onclick = async () => { try { await navigator.clipboard.writeText(decodeURIComponent(url)); b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy link', 1600) } catch (e) {} })
  return () => {}
}

/* article rail: the current section is the last block whose top has passed 140px; the rail slides so its label stays in view */
export function initRail() {
  const blocks = $$('.blk[id]'), links = $$('.rail__in a')
  if (!blocks.length || !links.length) return () => {}
  let curId = ''
  const setActive = () => {
    let cur = blocks[0]; for (const b of blocks) { if (b.getBoundingClientRect().top <= 140) cur = b; else break }
    if (cur.id === curId) return; curId = cur.id
    links.forEach(a => { const on = a.getAttribute('href') === '#' + curId; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current') })
    const r = $('.rail__in a.on'); if (r) { const rail = r.parentElement; rail.scrollTo({ left: r.offsetLeft - rail.clientWidth / 2 + r.offsetWidth / 2 - parseFloat(getComputedStyle(rail).paddingLeft), behavior: 'smooth' }) }
  }
  addEventListener('scroll', setActive, { passive: true }); setActive()
  return () => removeEventListener('scroll', setActive)
}

/* blog categories: four rows shown, the rest behind Show more, six a tap */
export function initMore(step = 6) {
  const secs = $$('.cat')
  const hs = secs.map(sec => {
    const rows = $$('.post', sec), shown = $('[data-shown]', sec), btn = $('[data-more]', sec)
    if (!btn) return null
    const update = () => { const v = rows.filter(r => !r.hidden).length; shown.textContent = `${v} of ${rows.length}`; btn.hidden = v >= rows.length }
    const h = () => { rows.filter(r => r.hidden).slice(0, step).forEach(r => r.hidden = false); update() }
    btn.addEventListener('click', h); update(); return [btn, h]
  })
  return () => hs.forEach(x => x && x[0].removeEventListener('click', x[1]))
}

/* glossary find: only hides rows already in the page. no script, no filter, every term still reads */
export function initFind() {
  const q = $('#q'), found = $('[data-found]'), empty = $('.empty'), rows = $$('.terms .t'), groups = $$('.grp')
  if (!q) return () => {}
  const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
  rows.forEach(r => r.dataset.s = norm(r.textContent))
  const filter = () => {
    const v = norm(q.value).trim(); let n = 0
    rows.forEach(r => { const hit = !v || v.split(/\s+/).every(w => r.dataset.s.includes(w)); r.hidden = !hit; if (hit) n++ })
    groups.forEach(g => { g.hidden = !$$('.t:not([hidden])', g).length })
    found.textContent = v ? n + ' of ' + rows.length : ''
    empty.hidden = n > 0
  }
  q.addEventListener('input', filter); filter()
  return () => q.removeEventListener('input', filter)
}

/* run a list of inits from one effect, tear them all down together */
export function run(...inits) {
  const cleanups = inits.map(f => f())
  return () => cleanups.forEach(c => c && c())
}
