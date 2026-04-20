import sharp from 'sharp'
import { writeFile } from 'fs/promises'

const PROJECT = '/Users/luke/UnderCurrent/Builds/Products/Website/undercurrent'

// 512x512, charcoal bg, glyph centered with ~18% padding
// Glyph uses paths in a 96-unit viewBox (paths occupy x=14..82, y=28..68)
// Place glyph inner content into 512*(1-2*0.18)=327.68px square, centered.
const SIZE = 512
const PAD = Math.round(SIZE * 0.18)          // 92
const INNER = SIZE - 2 * PAD                  // 328
const SCALE = INNER / 96                       // glyph viewBox is 96
const STROKE = 7 / SCALE                       // keep stroke visually 7 at 96-scale? inverse — stroke is in viewBox units
// Actually: we place a nested <svg> with its own viewBox 0 0 96 96 at inner dims.
// Then stroke-width=7 is viewBox units, auto-scales. No manual maths needed.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="#1C1C1A"/>
  <svg x="${PAD}" y="${PAD}" width="${INNER}" height="${INNER}" viewBox="0 0 96 96">
    <g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 35 C 24.2 28, 37.8 28, 48 35 S 71.8 42, 82 35" stroke="#8AAEC8"/>
      <path d="M14 48 C 24.2 41, 37.8 41, 48 48 S 71.8 55, 82 48" stroke="#6A8DAD"/>
      <path d="M14 61 C 24.2 54, 37.8 54, 48 61 S 71.8 68, 82 61" stroke="#6B8A7A"/>
    </g>
  </svg>
</svg>`

const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
await writeFile(`${PROJECT}/public/logo.png`, buf)
await writeFile(`${PROJECT}/public/LOGO.png`, buf)
console.log(`wrote logo.png + LOGO.png (${buf.length} bytes, ${SIZE}x${SIZE})`)
