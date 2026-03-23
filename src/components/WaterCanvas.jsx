import { useEffect, useRef } from 'react'

export default function WaterCanvas({ opacity = 1 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    let visible = true
    const visObserver = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    visObserver.observe(canvas)

    const currents = [
      { yFrac: 0.38, amp: 38, freq: 0.008, speed: 0.18, phase: 0, color: 'rgba(143,175,159,0.20)', lw: 1.0, dash: 0, gap: 0 },
      { yFrac: 0.48, amp: 28, freq: 0.010, speed: -0.14, phase: 1.2, color: 'rgba(143,175,159,0.16)', lw: 0.8, dash: 0, gap: 0 },
      { yFrac: 0.52, amp: 20, freq: 0.013, speed: 0.22, phase: 2.4, color: 'rgba(212,201,176,0.13)', lw: 0.7, dash: 0, gap: 0 },
      { yFrac: 0.44, amp: 44, freq: 0.007, speed: -0.28, phase: 0.6, color: 'rgba(143,175,159,0.12)', lw: 0.5, dash: 0, gap: 0 },
      { yFrac: 0.56, amp: 16, freq: 0.011, speed: 0.12, phase: 3.6, color: 'rgba(212,201,176,0.18)', lw: 1.2, dash: 60, gap: 90 },
      { yFrac: 0.50, amp: 12, freq: 0.018, speed: 0.35, phase: 1.8, color: 'rgba(143,175,159,0.22)', lw: 0.6, dash: 0, gap: 0 },
      { yFrac: 0.42, amp: 52, freq: 0.005, speed: -0.08, phase: 4.2, color: 'rgba(212,201,176,0.09)', lw: 1.5, dash: 0, gap: 0 },
      { yFrac: 0.54, amp: 8, freq: 0.022, speed: 0.42, phase: 2.0, color: 'rgba(143,175,159,0.14)', lw: 0.4, dash: 40, gap: 70 },
    ]
    const driftPhases = currents.map((_, i) => i * 0.7)
    const driftAmps = [0.035, 0.028, 0.022, 0.040, 0.018, 0.012, 0.044, 0.015]
    const driftSpeeds = [0.0004, 0.0003, 0.0005, 0.00035, 0.00025, 0.0006, 0.0002, 0.0007]
    let t = 0

    const draw = () => {
      if (!visible) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach((c, i) => {
        const drift = Math.sin(t * driftSpeeds[i] * 1000 + driftPhases[i]) * driftAmps[i]
        const yCenter = (c.yFrac + drift) * H
        ctx.beginPath()
        ctx.strokeStyle = c.color
        ctx.lineWidth = c.lw
        ctx.lineCap = 'round'
        if (c.dash > 0) {
          ctx.setLineDash([c.dash, c.gap])
          ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap)
        } else {
          ctx.setLineDash([])
        }
        const step = 4
        for (let x = -step; x <= W + step; x += step) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          if (x === -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      visObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }}
    />
  )
}
