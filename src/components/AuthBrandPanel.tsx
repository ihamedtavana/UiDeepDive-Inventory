import { memo, useEffect, useId, useRef } from 'react'
import { brandMotion, brandMotionDuration } from './authBrandMotion'
import field200 from '../assets/auth/brand-panel/FieldBrand200.svg'
import field300 from '../assets/auth/brand-panel/FieldBrand300.svg'
import glow from '../assets/auth/brand-panel/GlowBrand400.svg'
import core from '../assets/auth/brand-panel/CoreBrand500.svg'
import ember from '../assets/auth/brand-panel/EmberBrand600.svg'
import highlight from '../assets/auth/brand-panel/HighlightBrand50.svg'
import './AuthBrandPanel.css'

const fields = [field200, field300, glow, core, ember, highlight]

export const AuthBrandPanel = memo(function AuthBrandPanel() {
  const edgeClipId = useId()
  const canvas = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = canvas.current
    if (!root || !Element.prototype.animate) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animations: Animation[] = []
    const stop = () => { animations.forEach(animation => animation.cancel()); animations = [] }
    const start = () => {
      stop()
      if (media.matches) return
      const timing = { duration: brandMotionDuration, iterations: Infinity }
      root.querySelectorAll<HTMLElement>('.auth-brand-field').forEach((field, index) => {
        const { tracks, positionTimes, effectTimes } = brandMotion[index]
        const { x, y } = tracks
        animations.push(field.animate(x.map((value, i) => ({
          translate: `${value}px ${y[i]}px`, offset: positionTimes[i],
        })), { ...timing, easing: 'linear' }))
        for (const property of ['rotate', 'scale', 'opacity'] as const) {
          if (!(property in tracks)) continue
          const values = (tracks as Record<string, readonly number[]>)[property]
          animations.push(field.animate(values.map((value, i) => ({
            [property]: property === 'rotate' ? `${value}deg` : value,
            offset: effectTimes[i], easing: 'ease-in-out',
          })), timing))
        }
      })
      root.querySelectorAll<HTMLElement>('.auth-brand-rim-light').forEach(light => {
        animations.push(light.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          { ...timing, easing: 'linear' }))
      })
      root.querySelectorAll<HTMLElement>('.auth-brand-rim').forEach(rim => {
        const strength = rim.classList.contains('auth-brand-rim--soft') ? .3 : 1
        animations.push(rim.animate([
          { opacity: .8 * strength, offset: 0 },
          { opacity: strength, offset: .125 },
          { opacity: .6 * strength, offset: .375 },
          { opacity: strength, offset: .625 },
          { opacity: .6 * strength, offset: .875 },
          { opacity: .8 * strength, offset: 1 },
        ], { ...timing, easing: 'ease-in-out' }))
      })
      if (document.hidden) animations.forEach(animation => animation.pause())
    }
    const visibility = () => animations.forEach(animation => document.hidden ? animation.pause() : animation.play())
    start()
    media.addEventListener('change', start)
    document.addEventListener('visibilitychange', visibility)
    return () => { stop(); media.removeEventListener('change', start); document.removeEventListener('visibilitychange', visibility) }
  }, [])

  return <aside className="auth-brand-panel" aria-label="CoreTech brand panel" id="auth-brand-panel">
    <div className="auth-brand-canvas" ref={canvas} aria-hidden="true">
      {fields.map((src, index) => <div className={`auth-brand-field auth-brand-field-${index}`} data-node-id={brandMotion[index].nodeId} key={src}><img src={src} alt="" /></div>)}
      <div className="auth-brand-mark">
        <div className="auth-brand-glass"></div>
        <svg className="auth-brand-edge" viewBox="0 0 251 249" preserveAspectRatio="none" aria-hidden="true">
          <defs><clipPath id={edgeClipId}><path d="M 0 159.1 C 0 135 6.66 112.35 21.54 95.44 C 36.74 78.19 58.6 69.1 84.32 69.1 L 160 69.1 L 160 109.1 L 84.32 109.1 C 68.43 109.1 58.13 114.42 51.56 121.88 C 44.69 129.68 40 142.03 40 159.1 C 40 176.17 44.69 188.52 51.56 196.32 C 58.13 203.78 68.43 209.1 84.32 209.1 L 160 209.1 L 160 249.1 L 84.32 249.1 C 58.6 249.1 36.74 240.01 21.54 222.76 C 6.66 205.85 0 183.2 0 159.1 Z M 150.9 0 L 250.9 0 L 250.9 100 L 208.04 100 L 208.04 42.86 L 150.9 42.86 L 150.9 0 Z" /></clipPath></defs>
          <path d="M 0 159.1 C 0 135 6.66 112.35 21.54 95.44 C 36.74 78.19 58.6 69.1 84.32 69.1 L 160 69.1 L 160 109.1 L 84.32 109.1 C 68.43 109.1 58.13 114.42 51.56 121.88 C 44.69 129.68 40 142.03 40 159.1 C 40 176.17 44.69 188.52 51.56 196.32 C 58.13 203.78 68.43 209.1 84.32 209.1 L 160 209.1 L 160 249.1 L 84.32 249.1 C 58.6 249.1 36.74 240.01 21.54 222.76 C 6.66 205.85 0 183.2 0 159.1 Z M 150.9 0 L 250.9 0 L 250.9 100 L 208.04 100 L 208.04 42.86 L 150.9 42.86 L 150.9 0 Z" fill="none" className="auth-brand-edge-line" strokeWidth="1.5" clipPath={`url(#${edgeClipId})`} />
        </svg>
        <div className="auth-brand-rim auth-brand-rim--soft" aria-hidden="true"><span className="auth-brand-rim-light"></span></div>
        <div className="auth-brand-rim" aria-hidden="true"><span className="auth-brand-rim-light"></span></div>
      </div>
    </div>
  </aside>
})
