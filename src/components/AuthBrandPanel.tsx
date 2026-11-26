import { memo, useEffect, useRef } from 'react'
import { brandMotion, brandMotionDuration } from './authBrandMotion'
import field200 from '../assets/auth/brand-panel/FieldBrand200.svg'
import field300 from '../assets/auth/brand-panel/FieldBrand300.svg'
import glow from '../assets/auth/brand-panel/GlowBrand400.svg'
import core from '../assets/auth/brand-panel/CoreBrand500.svg'
import ember from '../assets/auth/brand-panel/EmberBrand600.svg'
import highlight from '../assets/auth/brand-panel/HighlightBrand50.svg'
import cMark from '../assets/auth/brand-panel/C.svg'
import notch from '../assets/auth/brand-panel/Notch.svg'
import './AuthBrandPanel.css'

const fields = [field200, field300, glow, core, ember, highlight]

export const AuthBrandPanel = memo(function AuthBrandPanel() {
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
      // Approved CSS approximation of Figma's animated glass specular light.
      root.querySelectorAll<HTMLElement>('.auth-brand-glass').forEach(glass => {
        animations.push(glass.animate([{ '--auth-light-angle': '-45deg' }, { '--auth-light-angle': '315deg' }],
          { ...timing, easing: 'cubic-bezier(.5, 0, .5, 1)' }))
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
        <div className="auth-brand-glass auth-brand-c"><img src={cMark} alt="" /><svg width="160" height="180" viewBox="0 0 160 180"><path d="M0 90C0 65.8975 6.6569 43.2469 21.5449 26.3408C36.7352 9.0917 58.5967 2.51632e-05 84.3242 0H160V40H84.3242C68.4305 40 58.1299 45.3199 51.5635 52.7764C44.6947 60.5762 40 72.9261 40 90C40 107.074 44.6947 119.424 51.5635 127.224C58.1299 134.68 68.4305 140 84.3242 140H160V180H84.3242C58.5967 180 36.7352 170.908 21.5449 153.659C6.6569 136.753 0 114.103 0 90Z" /></svg></div>
        <div className="auth-brand-glass auth-brand-notch"><img src={notch} alt="" /><svg width="100" height="100" viewBox="0 0 100 100"><path d="M0 0H100V100H57.1429V42.8571H0V0Z" /></svg></div>
      </div>
    </div>
  </aside>
})
