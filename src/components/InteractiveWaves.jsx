import { useEffect, useRef } from 'react'

// UC brand wave palette
const WAVES = [
  { offset: 0,             amplitude: 70, frequency: 0.003,  color: 'rgba(143,175,159,1)',   opacity: 0.50 },
  { offset: Math.PI / 2,  amplitude: 90, frequency: 0.0026, color: 'rgba(107,124,74,1)',    opacity: 0.38 },
  { offset: Math.PI,      amplitude: 60, frequency: 0.0034, color: 'rgba(143,175,159,0.8)', opacity: 0.32 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(168,159,122,0.8)', opacity: 0.26 },
  { offset: Math.PI * 2,  amplitude: 55, frequency: 0.004,  color: 'rgba(212,201,176,0.6)', opacity: 0.18 },
]

export default function InteractiveWaves() {
  const canvasRef  = useRef(null)
  const mouseRef   = useRef({ x: 0, y: 0 })
  const targetRef  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let rafId
    let time = 0

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouseInfluence  = prefersReduced ? 10  : 72
    const influenceRadius = prefersReduced ? 160 : 340
    const smoothing       = prefersReduced ? 0.04 : 0.10

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const cx = canvas.width  / 2
      const cy = canvas.height / 2
      mouseRef.current  = { x: cx, y: cy }
      targetRef.current = { x: cx, y: cy }
    }

    const onMove  = (e) => { targetRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => {
      targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 }
    }

    resize()
    window.addEventListener('resize',    resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const drawWave = (wave) => {
      ctx.save()
      ctx.beginPath()

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x
        const dy = canvas.height / 2 - mouseRef.current.y
        const dist     = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / influenceRadius)
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset)

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect

        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }

      ctx.lineWidth    = 2.5
      ctx.strokeStyle  = wave.color
      ctx.globalAlpha  = wave.opacity
      ctx.shadowBlur   = 40
      ctx.shadowColor  = wave.color
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      time++

      // Smooth mouse tracking
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing

      // Background gradient — charcoal to very slightly warm-dark
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, '#1C1C1A')
      grad.addColorStop(1, '#1a1e1c')
      ctx.globalAlpha = 1
      ctx.shadowBlur  = 0
      ctx.fillStyle   = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      WAVES.forEach(drawWave)

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
