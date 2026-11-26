import { useEffect, useRef, useState } from 'react'
import dot from '../assets/warehouse-switch/imgMapGoodsDot.svg'
export type GoodsRoute = { from: [number,number]; to: [number,number]; control: [number,number]; d: string; fromId: string; toId: string }

// Animation reference: ZIP goodsMovement.ts. Two staggered slots, 5.6s travel,
// fade at either end, pause between journeys, alternate direction.
export function MapGoodsDot({ routes, slot, selectedId, isPaused }: { routes: GoodsRoute[]; slot: number; selectedId: string; isPaused: boolean }) {
  const ref = useRef<SVGGElement>(null)
  const [hasReducedMotion, setHasReducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const change = () => setHasReducedMotion(preference?.matches ?? false)
    preference?.addEventListener('change', change)
    return () => preference?.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    if (isPaused || hasReducedMotion) { if (ref.current) ref.current.style.opacity = '0'; return }
    let raf = 0
    let turn = slot
    let start = performance.now() + (slot ? 2800 : 600)
    const connected = routes.filter(r => r.fromId === selectedId || r.toId === selectedId)
    let route = slot === 0 ? connected[0] ?? routes[0] : routes.find(r => r.fromId !== selectedId && r.toId !== selectedId) ?? routes[1]
    const frame = (now: number) => {
      const el = ref.current
      if (!el) return
      if (document.hidden) { el.style.opacity = '0'; start = now + 600; raf = requestAnimationFrame(frame); return }
      const raw = (now - start) / 5600
      if (raw >= 1) {
        const related = routes.filter(r => slot === 0 ? r.fromId === selectedId || r.toId === selectedId : r.fromId !== selectedId && r.toId !== selectedId)
        route = (related.length ? related : routes)[turn++ % (related.length || routes.length)]
        start = now + 1800 + (turn % 5) * 400
      }
      if (raw < 0 || raw >= 1 || !route) el.style.opacity = '0'
      else {
        let t = raw < .5 ? 2 * raw * raw : 1 - (-2 * raw + 2) ** 2 / 2
        if (turn % 2) t = 1 - t
        const u = 1 - t
        const x = u*u*route.from[0] + 2*u*t*route.control[0] + t*t*route.to[0]
        const y = u*u*route.from[1] + 2*u*t*route.control[1] + t*t*route.to[1]
        el.setAttribute('transform', `translate(${x} ${y})`)
        el.style.opacity = String(Math.max(0, Math.min(1, raw/.12, (1-raw)/.12)))
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [routes, selectedId, slot, isPaused, hasReducedMotion])
  return <g ref={ref} opacity="0" aria-hidden="true"><image href={dot} x="-5" y="-5" width="10" height="10" /></g>
}
