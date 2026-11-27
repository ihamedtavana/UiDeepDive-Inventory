import './MapComponents.css'
import { useEffect, useState } from 'react'
import { MapGoodsDot } from './MapGoodsDot'
import start from '../assets/design-system/map/route-start.svg'
import mid from '../assets/design-system/map/route-mid.svg'
import arrive from '../assets/design-system/map/route-arrive.svg'
import pause from '../assets/design-system/map/route-pause.svg'

type Step = '1 Start (fade in)' | '2 Mid-route' | '3 Arrive (fade out)' | '4 Pause'
type Props = { step?: Step; isPlayable?: boolean }

const steps: Record<Step, string> = { '1 Start (fade in)': start, '2 Mid-route': mid, '3 Arrive (fade out)': arrive, '4 Pause': pause }
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function RouteMotionDemo({ step = '1 Start (fade in)', isPlayable = false }: Props) {
  const [isReducedMotion, setIsReducedMotion] = useState(() => window.matchMedia?.(reducedMotionQuery).matches ?? false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.(reducedMotionQuery)
    if (!media) return
    const onChange = () => {
      setIsReducedMotion(media.matches)
      if (media.matches) setIsPlaying(false)
    }
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (!isPlayable || isReducedMotion) {
    return <img className="map-route-image" src={isReducedMotion ? pause : steps[step]} alt="Route arc between London and Tokyo" />
  }

  return <button className="map-route-control" type="button" aria-label="Animate route preview"
    aria-pressed={isPlaying} title={isPlaying ? 'Pause route animation' : 'Play route animation'}
    onClick={() => setIsPlaying(playing => !playing)}>
    <img className="map-route-image" src={isPlaying ? pause : steps[step]} alt="" />
    {isPlaying && <span className="map-route-moving-dot" aria-hidden="true"><MapGoodsDot /></span>}
  </button>
}
