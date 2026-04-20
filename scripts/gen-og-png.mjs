// Regenerates public/brand/og-card.{svg,png}.
// Layout: glyph + UnderCurrent wordmark, horizontally centered, large.
// PNG converts text to paths (zero font dep at render). SVG uses inline text.
import sharp from 'sharp'
import opentype from 'opentype.js'
import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT = resolve(__dirname, '..')
const FONT_DIR = resolve(__dirname, 'fonts')

const fonts = {
  sgRegular: opentype.loadSync(`${FONT_DIR}/SpaceGrotesk-Regular.otf`),
  sgBold:    opentype.loadSync(`${FONT_DIR}/SpaceGrotesk-Bold.otf`),
}

function measure(font, text, fontSize, tracking = 0) {
  let w = 0
  const scale = fontSize / font.unitsPerEm
  const glyphs = font.stringToGlyphs(text)
  for (let i = 0; i < glyphs.length; i++) {
    w += glyphs[i].advanceWidth * scale
    if (i < glyphs.length - 1) w += (font.getKerningValue(glyphs[i], glyphs[i + 1]) || 0) * scale
    w += tracking
  }
  return w
}

function textToPath(font, text, x, y, fontSize, { tracking = 0 } = {}) {
  const scale = fontSize / font.unitsPerEm
  let cursor = x
  const commands = []
  const glyphs = font.stringToGlyphs(text)
  for (let i = 0; i < glyphs.length; i++) {
    const path = glyphs[i].getPath(cursor, y, fontSize)
    commands.push(path.toPathData(3))
    cursor += glyphs[i].advanceWidth * scale
    if (i < glyphs.length - 1) cursor += (font.getKerningValue(glyphs[i], glyphs[i + 1]) || 0) * scale
    cursor += tracking
  }
  return commands.join(' ')
}

const W = 1200
const H = 630

// --- Lockup spec --------------------------------------------------------
// Wordmark font-size 140, letter-spacing -0.02em (-2.8px).
// Glyph gap = 0.5 × font-size = 70px.
// Glyph scale chosen so glyph visual height ~ wordmark cap height (~100px).
const FONT_SIZE = 140
const TRACKING = -2.8
const GLYPH_SCALE = 2.3   // 96 * 2.3 = 220.8 tall; waves span 40 units → ~92 visual
const GLYPH_STROKE_SCALED = 7 / GLYPH_SCALE // keep visual stroke = 7 at 96-scale? no, stroke scales with transform naturally
const GLYPH_GAP = 70

// Measure widths
const underW = measure(fonts.sgBold, 'Under', FONT_SIZE, TRACKING)
const currentW = measure(fonts.sgRegular, 'Current', FONT_SIZE, TRACKING)
const wordmarkW = underW + currentW
// Glyph box width (visible stroke spans x 14-82 = 68 units; scale 2.3 = 156px)
const glyphVisibleW = 82 * GLYPH_SCALE
const glyphVisibleH = 96 * GLYPH_SCALE
// Full lockup width for centering
const lockupW = glyphVisibleW + GLYPH_GAP + wordmarkW

// Centre horizontally, vertical baseline roughly at visual middle
const gx = (W - lockupW) / 2                // glyph x (left edge of glyph viewBox)
const gy = (H - glyphVisibleH) / 2          // glyph y (top edge)
const wx = gx + glyphVisibleW + GLYPH_GAP   // wordmark x start
// Baseline y: align wordmark cap-height centre with glyph centre.
// Rough: baseline ≈ canvas centre + (cap-height/2). cap-height ≈ 0.72 × font-size.
const wy = H / 2 + (FONT_SIZE * 0.72) / 2

const underPath = textToPath(fonts.sgBold, 'Under', wx, wy, FONT_SIZE, { tracking: TRACKING })
const currentPath = textToPath(fonts.sgRegular, 'Current', wx + underW, wy, FONT_SIZE, { tracking: TRACKING })

const glyphBlock = `<g fill="none" stroke-width="${7}" stroke-linecap="round" stroke-linejoin="round" transform="translate(${gx} ${gy}) scale(${GLYPH_SCALE})">
      <path d="M14 35 C 24.2 28, 37.8 28, 48 35 S 71.8 42, 82 35" stroke="#8AAEC8"/>
      <path d="M14 48 C 24.2 41, 37.8 41, 48 48 S 71.8 55, 82 48" stroke="#6A8DAD"/>
      <path d="M14 61 C 24.2 54, 37.8 54, 48 61 S 71.8 68, 82 61" stroke="#6B8A7A"/>
    </g>`

// --- PNG (text as paths) -----------------------------------------------
const pngSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2E2E2B"/>
      <stop offset="1" stop-color="#1C1C1A"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${glyphBlock}
  <path d="${underPath}"   fill="#FAF9F5" fill-opacity="0.88"/>
  <path d="${currentPath}" fill="#FAF9F5" fill-opacity="0.88"/>
</svg>`

const buf = await sharp(Buffer.from(pngSvg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(`${PROJECT}/public/brand/og-card.png`, buf)

// --- SVG (text as text, browser-editable) ------------------------------
const svgVersion = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="UnderCurrent">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2E2E2B"/>
      <stop offset="1" stop-color="#1C1C1A"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${glyphBlock}
  <text x="${wx}" y="${wy}" font-family="'Space Grotesk', system-ui, sans-serif" font-size="${FONT_SIZE}" letter-spacing="${TRACKING}" fill="#FAF9F5" fill-opacity="0.88">
    <tspan font-weight="700">Under</tspan><tspan font-weight="400">Current</tspan>
  </text>
</svg>
`
await writeFile(`${PROJECT}/public/brand/og-card.svg`, svgVersion)

const meta = await sharp(buf).metadata()
console.log(`og-card.png  ${buf.length}B  ${meta.width}x${meta.height}`)
console.log(`og-card.svg  ${svgVersion.length}B`)
