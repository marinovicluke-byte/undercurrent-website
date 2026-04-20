// Generates platform-sized social assets from the brand kit.
// Outputs under public/brand/social/:
//   profile-square-512.png, profile-square-1024.png
//   linkedin-banner-1584x396.png
import sharp from 'sharp'
import opentype from 'opentype.js'
import { writeFile, mkdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT = resolve(__dirname, '..')
const FONT_DIR = resolve(__dirname, 'fonts')
const OUT_DIR = `${PROJECT}/public/brand/social`
await mkdir(OUT_DIR, { recursive: true })

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
    commands.push(glyphs[i].getPath(cursor, y, fontSize).toPathData(3))
    cursor += glyphs[i].advanceWidth * scale
    if (i < glyphs.length - 1) cursor += (font.getKerningValue(glyphs[i], glyphs[i + 1]) || 0) * scale
    cursor += tracking
  }
  return commands.join(' ')
}

// --- 1. Square profile avatar ----------------------------------------------
async function renderProfile(size, outName) {
  const pad = Math.round(size * 0.18)
  const inner = size - 2 * pad
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="#1C1C1A"/>
    <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 96 96">
      <g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 35 C 24.2 28, 37.8 28, 48 35 S 71.8 42, 82 35" stroke="#8AAEC8"/>
        <path d="M14 48 C 24.2 41, 37.8 41, 48 48 S 71.8 55, 82 48" stroke="#6A8DAD"/>
        <path d="M14 61 C 24.2 54, 37.8 54, 48 61 S 71.8 68, 82 61" stroke="#6B8A7A"/>
      </g>
    </svg>
  </svg>`
  const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
  await writeFile(`${OUT_DIR}/${outName}`, buf)
  return buf.length
}

// --- 2. LinkedIn banner 1584×396 -------------------------------------------
// Lockup positioned in right half of banner so it clears the avatar safe zone
// (LinkedIn overlays a ~400px avatar at bottom-left).
async function renderLinkedInBanner() {
  const W = 1584, H = 396

  const FONT_SIZE = 96
  const TRACKING = -1.92
  const GLYPH_SCALE = 1.6
  const GLYPH_GAP = 48

  const underW = measure(fonts.sgBold, 'Under', FONT_SIZE, TRACKING)
  const currentW = measure(fonts.sgRegular, 'Current', FONT_SIZE, TRACKING)
  const wordmarkW = underW + currentW
  const glyphVisibleW = 82 * GLYPH_SCALE
  const glyphVisibleH = 96 * GLYPH_SCALE
  const lockupW = glyphVisibleW + GLYPH_GAP + wordmarkW

  // Centre lockup within the right 1100px of the banner (avatar occupies left ~400)
  const rightZoneStart = 484   // comfortable clearance past the 400px avatar
  const rightZoneW = W - rightZoneStart
  const gx = rightZoneStart + (rightZoneW - lockupW) / 2
  const gy = (H - glyphVisibleH) / 2
  const wx = gx + glyphVisibleW + GLYPH_GAP
  const wy = H / 2 + (FONT_SIZE * 0.72) / 2

  const underPath = textToPath(fonts.sgBold, 'Under', wx, wy, FONT_SIZE, { tracking: TRACKING })
  const currentPath = textToPath(fonts.sgRegular, 'Current', wx + underW, wy, FONT_SIZE, { tracking: TRACKING })

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2E2E2B"/>
        <stop offset="1" stop-color="#1C1C1A"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" transform="translate(${gx} ${gy}) scale(${GLYPH_SCALE})">
      <path d="M14 35 C 24.2 28, 37.8 28, 48 35 S 71.8 42, 82 35" stroke="#8AAEC8"/>
      <path d="M14 48 C 24.2 41, 37.8 41, 48 48 S 71.8 55, 82 48" stroke="#6A8DAD"/>
      <path d="M14 61 C 24.2 54, 37.8 54, 48 61 S 71.8 68, 82 61" stroke="#6B8A7A"/>
    </g>
    <path d="${underPath}"   fill="#FAF9F5" fill-opacity="0.88"/>
    <path d="${currentPath}" fill="#FAF9F5" fill-opacity="0.88"/>
  </svg>`
  const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
  await writeFile(`${OUT_DIR}/linkedin-banner-1584x396.png`, buf)
  return buf.length
}

const [a512, a1024, banner] = await Promise.all([
  renderProfile(512, 'profile-square-512.png'),
  renderProfile(1024, 'profile-square-1024.png'),
  renderLinkedInBanner(),
])
console.log(`profile-square-512.png        ${a512}B`)
console.log(`profile-square-1024.png       ${a1024}B`)
console.log(`linkedin-banner-1584x396.png  ${banner}B`)
