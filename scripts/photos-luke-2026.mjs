// scripts/photos-luke-2026.mjs — web copies of Luke's 2026 brand shoot
// (Allyjana Marie Creative, 57 frames, Luke only) into public/images/luke-2026/,
// plus the manifest the articles pick heroes and inline photos from.
//
//   node scripts/photos-luke-2026.mjs "<path to the shoot folder>"
//
// 1800px on the long edge, JPEG quality 78 (mozjpeg), metadata stripped. A file
// still over 350KB steps down 4 quality points at a time; the manifest records
// the quality each one landed on. The table below is the manifest's source.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2]
const OUT = 'public/images/luke-2026'
const LONG = 1800
const QUALITY = 78
const MAX_BYTES = 350 * 1024
const name = what => `luke-marinovic-undercurrent-${what}-melbourne.jpg`

// n: the shoot's frame number. hero: a behind-the-laptop or on-the-phone frame, the article hero picks.
const PHOTOS = [
  [1, 'on-phone-at-desk', 'Luke Marinovic on a phone call at a round white desk, laptop closed in front of him, looking off to the side.', 'On the phone at the white desk, laptop shut, looking away.', ['on-phone', 'talking', 'working'], true],
  [2, 'on-phone-seated-side-on', 'Luke Marinovic seated side-on at his desk, phone to his ear, mid-conversation, laptop open beside him.', 'Side-on at the desk, phone to ear, laptop open.', ['on-phone', 'talking', 'working'], true],
  [3, 'at-desk-hands-clasped', 'Luke Marinovic at a white desk with his hands clasped, looking at the camera, laptop open to one side.', 'Seated at the desk, hands clasped, to camera, laptop beside.', ['portrait', 'at-laptop'], false],
  [4, 'at-desk-hands-clasped-smiling', 'Luke Marinovic smiling at a white desk, hands clasped, laptop open beside him.', 'Same set-up as 3, smiling.', ['portrait', 'at-laptop'], false],
  [5, 'at-desk-arms-folded', 'Luke Marinovic at a white desk with his arms folded on the table, laptop open, a black vase of blossom beside him.', 'Wide frame at the desk, arms folded, laptop and vase.', ['portrait', 'at-laptop'], false],
  [6, 'walking-to-desk', 'Luke Marinovic walking past his desk towards an open laptop, in a black t-shirt against a concrete wall.', 'Walking past the desk to the laptop.', ['working'], false],
  [7, 'over-shoulder-laptop-photo-grid', 'Over-the-shoulder view of Luke Marinovic at his laptop, a grid of photos on screen, vase of blossom on the desk.', 'Behind Luke at the laptop, photo grid on screen.', ['at-laptop', 'working'], true],
  [8, 'hands-on-laptop-website', 'Luke Marinovic\'s hands on a laptop keyboard, a photography website on the screen.', 'Close on hands and screen, a website open.', ['at-laptop', 'working'], true],
  [9, 'over-shoulder-typing-portrait', 'Over-the-shoulder view of Luke Marinovic typing on a laptop at a white desk, a website on screen.', 'Behind Luke typing, website on screen, upright frame.', ['at-laptop', 'working'], true],
  [10, 'over-shoulder-typing-website', 'Luke Marinovic seen from behind, typing on a laptop at a round white table, a website open on screen.', 'Behind Luke typing at the round table, website on screen, wide frame.', ['at-laptop', 'working'], true],
  [11, 'over-shoulder-laptop-code', 'Over-the-shoulder view of Luke Marinovic working in a dark code editor on his laptop.', 'Behind Luke, dark code and terminal panes on screen.', ['at-laptop', 'working'], true],
  [12, 'hands-on-laptop-analytics', 'Luke Marinovic\'s hands on a laptop showing a search performance chart.', 'Close on hands, a line chart on screen.', ['at-laptop', 'working'], true],
  [13, 'over-shoulder-search-console', 'Luke Marinovic at a round white table, seen from behind, reviewing a search performance report on his laptop.', 'Behind Luke at the round table, a Search Console style report on screen, wide frame.', ['at-laptop', 'working'], true],
  [14, 'walking-laptop-under-arm', 'Luke Marinovic walking in profile with a laptop under his arm, past a concrete wall.', 'Walking in profile, laptop under arm, sharp.', ['working'], false],
  [15, 'walking-motion-blur', 'Luke Marinovic walking with a laptop, blurred by motion against a concrete wall.', 'Walking, motion blur, laptop in hand.', ['working'], false],
  [16, 'walking-motion-blur-profile', 'Luke Marinovic in profile, blurred mid-step, carrying a laptop.', 'Profile, motion blur, laptop.', ['working'], false],
  [17, 'walking-past-steel-chair', 'Luke Marinovic walking past a steel chair and side table, blurred by motion.', 'Motion blur past the chair and side table, full length.', ['working'], false],
  [18, 'walking-laptop-past-chairs', 'Luke Marinovic carrying a laptop past two steel chairs, blurred by motion.', 'Motion blur with laptop past the chairs, full length.', ['working'], false],
  [19, 'mid-stride-studio', 'Luke Marinovic mid-stride beside a steel chair, looking off camera, full length.', 'Full length mid-stride by the steel chair.', ['portrait'], false],
  [20, 'reclining-steel-chair', 'Luke Marinovic reclining in a steel and leather chair, looking up and away.', 'Reclining in the steel chair, looking up, full length.', ['portrait'], false],
  [21, 'seated-legs-crossed', 'Luke Marinovic seated in a steel chair with his legs crossed, looking at the camera.', 'Seated, legs crossed, to camera.', ['portrait'], false],
  [22, 'seated-leaning-forward', 'Luke Marinovic seated and leaning forward, elbows on his knees, smiling at the camera.', 'Seated leaning forward, smiling, to camera.', ['portrait'], false],
  [23, 'headshot-dark-backdrop', 'Headshot of Luke Marinovic, founder of UnderCurrent Automations, with a slight smile on a dark grey backdrop.', 'Headshot, slight smile, dark backdrop.', ['portrait'], false],
  [24, 'headshot-looking-away', 'Luke Marinovic looking off to the side on a dark grey backdrop, head and shoulders.', 'Head and shoulders, looking away, dark backdrop.', ['portrait'], false],
  [25, 'portrait-dark-backdrop', 'Luke Marinovic, half length, looking straight at the camera on a dark grey backdrop.', 'Half length, straight to camera, dark backdrop.', ['portrait'], false],
  [26, 'portrait-dark-backdrop-smiling', 'Luke Marinovic smiling, half length, on a dark grey backdrop.', 'Half length, smiling, dark backdrop.', ['portrait'], false],
  [27, 'portrait-dark-backdrop-close', 'Luke Marinovic with a slight smile, close half length, on a dark grey backdrop.', 'Closer half length, slight smile, dark backdrop.', ['portrait'], false],
  [28, 'portrait-laughing', 'Luke Marinovic laughing, half length, on a dark grey backdrop.', 'Half length, laughing, dark backdrop.', ['portrait'], false],
  [29, 'portrait-big-smile', 'Luke Marinovic with a big smile, half length, on a dark grey backdrop.', 'Half length, big smile, dark backdrop.', ['portrait'], false],
  [30, 'white-shirt-light-beam-wide', 'Luke Marinovic in a white shirt against a brushed steel wall, a beam of light across the frame.', 'White shirt, light beam on steel, wide frame.', ['portrait'], false],
  [31, 'white-shirt-light-beam', 'Luke Marinovic in a white shirt, shoulder to camera, a beam of light across a steel wall.', 'White shirt, shoulder turned, light beam, wide frame.', ['portrait'], false],
  [32, 'white-shirt-portrait', 'Luke Marinovic in a white shirt, three-quarter view, light falling across a steel wall.', 'White shirt, three-quarter, upright frame.', ['portrait'], false],
  [33, 'laptop-lounge-chair-feet-up', 'Luke Marinovic working on a laptop in a cream lounge chair with his feet up, against a steel wall.', 'Lounging with the laptop, feet up, wide frame.', ['at-laptop', 'working'], true],
  [34, 'laptop-lounge-chair', 'Luke Marinovic in a cream lounge chair with a laptop, looking at the camera.', 'In the lounge chair with the laptop, to camera.', ['at-laptop', 'portrait'], true],
  [35, 'laptop-on-lap', 'Luke Marinovic with a laptop on his lap in a cream lounge chair, looking at the camera.', 'Laptop on lap in the lounge chair, to camera.', ['at-laptop', 'portrait'], true],
  [36, 'laptop-on-lap-close', 'Luke Marinovic with a laptop on his lap, close frame, cream lounge chair and steel wall behind.', 'Closer, laptop on lap, to camera.', ['at-laptop', 'portrait'], true],
  [37, 'overshirt-standing', 'Luke Marinovic standing in a dark overshirt with his hands in his pockets, smiling, on a light backdrop.', 'Standing, dark overshirt, hands in pockets, smiling.', ['portrait'], false],
  [38, 'overshirt-standing-grin', 'Luke Marinovic grinning in a dark overshirt, hands in his pockets, on a light backdrop.', 'Same as 37, grinning.', ['portrait'], false],
  [39, 'overshirt-full-length', 'Luke Marinovic standing in a dark overshirt and black t-shirt on a light backdrop.', 'Standing, overshirt, a little wider.', ['portrait'], false],
  [40, 'black-tee-light-backdrop', 'Luke Marinovic smiling in a black t-shirt on a light backdrop, half length.', 'Half length, black tee, smiling, light backdrop.', ['portrait'], false],
  [41, 'steel-desk-hand-on-chin', 'Luke Marinovic leaning on a steel desk with his hand on his chin, laptop open beside him.', 'Leaning on the steel desk, hand on chin, laptop.', ['portrait', 'at-laptop'], true],
  [42, 'steel-desk-hand-on-chin-smiling', 'Luke Marinovic smiling with his hand on his chin at a steel desk, laptop open.', 'Same as 41, smiling, a touch wider.', ['portrait', 'at-laptop'], true],
  [43, 'steel-desk-laptop-wide', 'Luke Marinovic leaning on a steel desk beside an open laptop, looking at the camera.', 'At the steel desk with the laptop, to camera, wide frame.', ['portrait', 'at-laptop'], true],
  [44, 'steel-desk-typing-wide', 'Luke Marinovic typing on a laptop at a steel desk, eyes on the screen.', 'Typing at the steel desk, wide frame.', ['at-laptop', 'working'], true],
  [45, 'steel-desk-typing', 'Luke Marinovic looking down at his laptop and typing at a steel desk.', 'Typing, looking down at the laptop, upright frame.', ['at-laptop', 'working'], true],
  [46, 'standing-at-laptop', 'Luke Marinovic standing at a steel bench, typing on an open laptop.', 'Standing at the bench, typing.', ['at-laptop', 'working'], true],
  [47, 'steel-desk-arms-folded-close', 'Luke Marinovic leaning on a steel desk with his arms folded, looking at the camera, close frame.', 'Arms folded on the steel desk, close, to camera.', ['portrait', 'at-laptop'], false],
  [48, 'steel-desk-arms-folded', 'Luke Marinovic with his arms folded on a steel desk, laptop beside him, looking straight at the camera.', 'Arms folded on the desk, straight to camera.', ['portrait', 'at-laptop'], false],
  [49, 'steel-desk-arms-folded-portrait', 'Luke Marinovic with his arms folded on a steel desk beside a laptop, slight smile.', 'Arms folded beside the laptop, slight smile.', ['portrait', 'at-laptop'], false],
  [50, 'steel-desk-smiling', 'Luke Marinovic smiling, arms folded on a steel desk, laptop open beside him.', 'Arms folded beside the laptop, smiling.', ['portrait', 'at-laptop'], false],
  [51, 'cap-steel-desk', 'Luke Marinovic in a cap, arms folded on a steel desk beside an open laptop.', 'In a cap, arms folded at the desk.', ['portrait', 'at-laptop'], false],
  [52, 'cap-steel-desk-close', 'Luke Marinovic in a cap with his arms folded on a steel desk, close frame.', 'In a cap, closer.', ['portrait', 'at-laptop'], false],
  [53, 'sling-chair-arc-lamp', 'Luke Marinovic reclining in a black sling chair under a chrome arc floor lamp.', 'Reclining under the arc lamp, wide.', ['portrait'], false],
  [54, 'sling-chair-thinking', 'Luke Marinovic in a sling chair with his hand on his chin, looking up, under an arc lamp.', 'Hand on chin, looking up, arc lamp.', ['portrait'], false],
  [55, 'sling-chair-hand-on-chin', 'Luke Marinovic reclining with his hand on his chin, looking away, under a chrome arc lamp.', 'Hand on chin, looking away, arc lamp.', ['portrait'], false],
  [56, 'sling-chair-looking-away', 'Luke Marinovic reclining in a black sling chair, looking out of frame, arc lamp overhead.', 'Looking out of frame, arc lamp.', ['portrait'], false],
  [57, 'sling-chair-relaxed', 'Luke Marinovic relaxed in a black sling chair, hands folded, under a chrome arc lamp.', 'Hands folded, relaxed, arc lamp.', ['portrait'], false],
]

const files = fs.readdirSync(SRC).filter(f => /\.jpe?g$/i.test(f))
const byFrame = new Map(files.map(f => [Number(f.match(/-(\d+)\.jpe?g$/i)[1]), f]))
fs.mkdirSync(OUT, { recursive: true })

const photos = []
for (const [n, what, alt, shows, topic_fit, hero] of PHOTOS) {
  const src = byFrame.get(n)
  if (!src) throw new Error(`frame ${n} not in ${SRC}`)
  const filename = name(what)
  let quality = QUALITY, buf
  for (;;) {
    buf = await sharp(path.join(SRC, src)).rotate()
      .resize(LONG, LONG, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true }).toBuffer()
    if (buf.length <= MAX_BYTES || quality <= 62) break
    quality -= 4
  }
  fs.writeFileSync(path.join(OUT, filename), buf)
  const { width, height } = await sharp(buf).metadata()
  photos.push({
    n, filename, path: `/${OUT.replace(/^public\//, '')}/${filename}`, width, height,
    orientation: width >= height ? 'landscape' : 'portrait', bytes: buf.length, quality,
    alt, shows, topic_fit, hero_pick: hero, source_file: src,
  })
  console.log(`${String(n).padStart(2)} ${filename} ${width}x${height} ${Math.round(buf.length / 1024)}KB q${quality}`)
}

const manifest = {
  shoot: 'UnderCurrent brand shoot 2026',
  credit: 'Allyjana Marie Creative',
  subject: 'Luke Marinovic only, no third parties in frame',
  spec: `${LONG}px long edge, JPEG quality ${QUALITY} (stepped down only if over ${MAX_BYTES / 1024}KB), metadata stripped`,
  topic_fit_tags: ['at-laptop', 'on-phone', 'portrait', 'working', 'talking'],
  hero_rule: 'hero_pick marks the behind-the-laptop and on-the-phone frames, prefer them for article heroes',
  screens: 'Frames 7 to 13 show real screens: a photography website (7 to 10), a code editor (11), a search performance report (12, 13). Check what is legible before cropping in tight',
  photos,
}
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`${photos.length} photos, ${Math.round(photos.reduce((s, p) => s + p.bytes, 0) / 1024)}KB total`)
