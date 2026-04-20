'use client'
import { useEffect, useRef } from 'react'

export default function StillWaves({ height = 520 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()

    let raf
    const start = performance.now()

    const drawWave = (t, yBase, amp, freq, phase, color, alpha) => {
      const r = canvas.getBoundingClientRect()
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.globalAlpha = alpha
      ctx.lineWidth = 1.5
      for (let x = 0; x <= r.width; x += 2) {
        const y = yBase + Math.sin(x * freq + t / 1400 + phase) * amp
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const tick = now => {
      const t = now - start
      const r = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, r.width, r.height)
      const yMid = r.height / 2
      for (let i = -14; i <= 14; i++) {
        const yBase = yMid + i * 14
        const dist = Math.abs(i) / 14
        const amp = 6 + dist * 4
        const phase = i * 0.35
        let color
        if (i < -5) color = '#8AAEC8'
        else if (i < 5) color = '#6A8DAD'
        else color = '#6B8A7A'
        const alpha = 0.18 + (1 - dist) * 0.32
        drawWave(t, yBase, amp, 0.012, phase, color, alpha)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 30%, var(--bg-deep) 85%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
