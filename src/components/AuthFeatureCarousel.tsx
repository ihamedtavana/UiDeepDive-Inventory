import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Button } from './Button'
import { Badge } from './Badge'
import { StockBox } from './StockBox'
import warehouse0 from '../assets/auth/warehouse-0.jpg'
import warehouse1 from '../assets/auth/warehouse-1.jpg'
import warehouse2 from '../assets/auth/warehouse-2.jpg'
import warehouse3 from '../assets/auth/warehouse-3.jpg'
import switchIcon from '../assets/imgSwitchHorizontal02.svg'
import chevron from '../assets/imgChevronRight.svg'
import product from '../assets/auth/moving-product.jpg'
import grid from '../assets/auth/route-grid.svg'
import road from '../assets/auth/route-road.svg'
import travelled from '../assets/auth/route-travelled.svg'
import truck from '../assets/auth/route-truck.svg'
import stamp from '../assets/auth/movement-stamp.svg'
import origin from '../assets/auth/route-origin.svg'
import destination from '../assets/auth/route-destination.svg'

const slides = [
  { title: 'All your warehouses, one dashboard', body: 'See stock, shelves and alerts for every site in one place.', duration: 6500 },
  { title: 'Effortless inventory management', body: 'Units go into the right bin, and each carton is counted and sealed.', duration: 8500 },
  { title: 'Track inventory movements with ease', body: 'Every scan from dock to bin is logged, so you always know where stock is.', duration: 8800 },
  { title: 'Tracked on the road', body: 'Follow each shipment from origin to destination as it moves.', duration: 7000 },
]
const warehouses = [
  { name: 'New York Central', location: 'New York, United States', photo: warehouse0, shelves: 16, low: 2, out: 1 },
  { name: 'Frankfurt Hub', location: 'Frankfurt, Germany', photo: warehouse1, shelves: 12, low: 1, out: 0 },
  { name: 'London Warehouse', location: 'London, United Kingdom', photo: warehouse2, shelves: 20, low: 3, out: 0 },
  { name: 'Tokyo Distribution Center', location: 'Tokyo, Japan', photo: warehouse3, shelves: 8, low: 0, out: 1 },
]
export const AuthFeatureCarousel = memo(function AuthFeatureCarousel() {
  const [slide, setSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHidden, setIsHidden] = useState(document.hidden)
  const [isReduced, setIsReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const [time, setTime] = useState(0)
  const [leaving, setLeaving] = useState<ReactNode>(null)
  const snapshot = useRef<ReactNode>(null)
  const elapsed = useRef(0)
  const viewport = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const change = (next: number) => { if ((next + 4) % 4 === slide) return; if (!isReduced) setLeaving(snapshot.current); elapsed.current = 0; setTime(0); setSlide((next + 4) % 4) }
  useEffect(() => { const media = window.matchMedia?.('(prefers-reduced-motion: reduce)'); const reduced = () => setIsReduced(media?.matches ?? false); media?.addEventListener('change', reduced); const hidden = () => setIsHidden(document.hidden); document.addEventListener('visibilitychange', hidden); return () => { media?.removeEventListener('change', reduced); document.removeEventListener('visibilitychange', hidden) } }, [])
  useEffect(() => { if (!viewport.current || typeof ResizeObserver === 'undefined') return; const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / 456, entry.contentRect.height / 500))); observer.observe(viewport.current); return () => observer.disconnect() }, [])
  useEffect(() => { if (isReduced || isPaused || isHidden) return; let frame = 0; let last = performance.now(); const tick = (now: number) => { elapsed.current += Math.max(0, Math.min(100, now - last)); last = now; if (elapsed.current >= slides[slide].duration) { change(slide + 1); return } setTime(elapsed.current); frame = requestAnimationFrame(tick) }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame) }, [slide, isReduced, isPaused, isHidden])
  useEffect(() => { if (!leaving) return; const timer = setTimeout(() => setLeaving(null), 480); return () => clearTimeout(timer) }, [leaving])
  const t = isReduced ? slides[slide].duration - 500 : time
  const station = t < 1700 ? 0 : t < 4000 ? 1 : 2
  const x = t < 1700 ? 0 : t < 2900 ? (t - 1700) / 1200 * 152 : t < 4000 ? 152 : t < 5200 ? 152 + (t - 4000) / 1200 * 152 : 304
  const isScanning = (t >= 600 && t < 1500) || (t >= 2900 && t < 3800) || (t >= 5200 && t < 6100)
  const scene = <>
      {slide === 0 && <div className="auth-warehouse-board">{warehouses.map((warehouse, i) => { const p = isReduced ? 1 : Math.max(0, Math.min(1, (t - 600 - i * 100) / 700)); return <article className="warehouse-card" key={warehouse.name} style={{ transform: `translateY(${(1 - p) * (i % 2 ? -18 : 18)}px) rotate(${(1 - p) * (i % 2 ? 6 : -6)}deg) scale(${.9 + p * .1})`, opacity: Math.min(1, t / 400) }}><div className="warehouse-card-content"><img className="warehouse-image" src={warehouse.photo} alt={`${warehouse.name} building`} /><div><strong>{warehouse.name}</strong><span className="muted">{warehouse.location}</span></div><div className="badges"><Badge>{warehouse.shelves} Shelves</Badge>{warehouse.low > 0 && <Badge tone="warning">{warehouse.low} Low</Badge>}{warehouse.out > 0 && <Badge tone="error">{warehouse.out} Out</Badge>}</div></div><div className="warehouse-switch"><img className="icon" src={switchIcon} alt="" /><span>Switch Warehouse</span><Badge>4</Badge></div></article> })}</div>}
      {slide === 1 && <div className="auth-inventory-scene"><div className="auth-shelf" />{[20, 14, 22].map((amount, i) => <div key={i} className="auth-carousel-box" style={{ left: [-37, 107, 273][i] }}><StockBox width={190.08} state={i === 0 ? 'success' : 'filling'} isSealed={i > 0 && t > 4400 + i * 800} onHand={i === 0 ? 2 : 2} adding={i === 0 || isReduced ? amount : Math.round(Math.min(1, Math.max(0, (t - i * 800) / 2000)) * amount)} /></div>)}</div>}
      {slide === 2 && <div className="auth-movement-scene"><div className="auth-movement-track" /><article className="auth-moving-product" style={{ transform: `translateX(${x}px)` }}><div><img src={product} alt="Radeon RX 7900 XT" />{isScanning && <span className="auth-scan-beam" />}</div><strong>Radeon RX 7900 XT</strong><small>4 units</small></article>{['Dock', 'Shelf A1', 'Bin B3'].map((name, i) => <div className={`auth-station ${i <= station ? 'is-reached' : ''}`} style={{ left: 76 + i * 152 }} key={name}><i /><Badge tone={i <= station ? 'brand' : 'neutral'}>{name}</Badge></div>)}{t > 6300 && <img className="auth-movement-stamp" src={stamp} alt="Move complete" />}{t > 6600 && <div className="auth-movement-success"><Badge tone="success">Moved to Bin B3</Badge></div>}</div>}
      {slide === 3 && <div className="auth-road-scene"><div className="auth-route-map"><img className="auth-route-grid" src={grid} alt="" /><img className="auth-route-road" src={road} alt="" /><img className="auth-route-travelled" src={travelled} alt="" style={{ clipPath: `inset(0 ${(1 - Math.min(1, Math.max(0, (t - 500) / 3200))) * 100}% 0 0)` }} /><img className="auth-route-origin" src={origin} alt="New York Central" /><img className="auth-route-destination" src={destination} alt="Boston DC" /><span className="auth-route-truck" style={{ offsetDistance: `${Math.min(1, Math.max(0, (t - 500) / 3200)) * 100}%` }}><img src={truck} alt="Shipment truck" /></span></div>{t > 2600 && <article className="auth-shipment"><header><strong>SHP-2043</strong><Badge tone="info">In transit</Badge></header><div>{[['Progress', '62%'], ['ETA', '14:20'], ['Distance left', '81 mi']].map(([label, value]) => <span key={label}><small>{label}</small>{value}</span>)}</div></article>}</div>}
  </>
  useLayoutEffect(() => { snapshot.current = scene })
  return <section className={`auth-carousel ${isReduced ? 'is-reduced' : ''}`} aria-label="CoreTech features" aria-roledescription="carousel" onFocus={() => setIsPaused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false) }}>
    <div className="auth-carousel-viewport" ref={viewport}><div className="auth-carousel-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}><>{leaving && <div className="auth-carousel-leaving" aria-hidden="true">{leaving}</div>}</><div key={slide} className="auth-carousel-scene" role="group" aria-label={`${slide + 1} of 4: ${slides[slide].title}`}>
      {scene}
    </div></div></div>
    <div className="auth-carousel-copy" aria-live={isPaused ? 'polite' : 'off'}><h2>{slides[slide].title}</h2><p>{slides[slide].body}</p></div>
    <div className="auth-carousel-nav" role="group" aria-label="Choose a slide" onKeyDown={e => { const target = e.key === 'ArrowRight' ? slide + 1 : e.key === 'ArrowLeft' ? slide - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? 3 : null; if (target !== null) { e.preventDefault(); change(target) } }}><Button isIconOnly aria-label="Previous slide" onClick={() => change(slide - 1)}><img className="icon auth-chevron-left" src={chevron} alt="" /></Button><div className="auth-carousel-dots">{slides.map((item, i) => <button type="button" key={item.title} aria-label={`Slide ${i + 1}: ${item.title}`} aria-current={i === slide ? 'true' : undefined} className={i === slide ? 'is-active' : ''} onClick={() => change(i)}><span><i style={{ transform: `scaleX(${isReduced ? 1 : time / slides[slide].duration})` } as CSSProperties} /></span></button>)}</div><Button isIconOnly aria-label="Next slide" onClick={() => change(slide + 1)}><img className="icon" src={chevron} alt="" /></Button></div>
  </section>
})
