// lib/photos.js — the photo library (public/images/luke-2026/manifest.json, written by
// scripts/photos-luke-2026.mjs). An article names a photo by its path in front-matter
// (photo); the manifest gives its size and its alt, which photoAlt can override. The six
// older heroImage fields name the retired posters and stay unread.
import fs from 'node:fs'
import path from 'node:path'

let byPath = null

export function photoOf(src) {
  if (!src) return null
  if (!byPath) {
    const file = path.join(process.cwd(), 'public', 'images', 'luke-2026', 'manifest.json')
    byPath = new Map(JSON.parse(fs.readFileSync(file, 'utf8')).photos.map(p => [p.path, p]))
  }
  const p = byPath.get(src)
  // a hero that isn't in the library fails the build, rather than ship an image without a size or an alt
  if (!p) throw new Error(`[photos] ${src} is not in public/images/luke-2026/manifest.json`)
  return p
}
