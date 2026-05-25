// lib/imageDimensions.js — Build-time helper to probe image dimensions from disk.
// Used by hero image rendering in blog + case-study pages so the <img> tag carries
// explicit width/height attributes (eliminates Screaming Frog "missing size" flag
// and gives crawlers an intrinsic ratio to reason about).
//
// Cached per-process. Returns null on missing/unreadable file so the build still
// ships rather than throwing.
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const cache = new Map()
const publicDir = path.join(process.cwd(), 'public')

export async function probeImageDimensions(publicRelativePath) {
  if (!publicRelativePath || typeof publicRelativePath !== 'string') return null
  if (cache.has(publicRelativePath)) return cache.get(publicRelativePath)
  const absPath = path.join(publicDir, publicRelativePath.replace(/^\//, ''))
  if (!fs.existsSync(absPath)) {
    cache.set(publicRelativePath, null)
    return null
  }
  try {
    const meta = await sharp(absPath).metadata()
    const dims = { width: meta.width, height: meta.height }
    cache.set(publicRelativePath, dims)
    return dims
  } catch {
    cache.set(publicRelativePath, null)
    return null
  }
}
