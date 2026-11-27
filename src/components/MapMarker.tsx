import './MapComponents.css'
import defaultMarker from '../assets/design-system/map/marker-default-current-no.svg'
import hoverMarker from '../assets/design-system/map/marker-hover-current-no.svg'
import focusedMarker from '../assets/design-system/map/marker-focused-current-no.svg'
import selectedMarker from '../assets/design-system/map/marker-selected-current-no.svg'
import currentDefaultMarker from '../assets/design-system/map/marker-default-current-yes.svg'
import currentHoverMarker from '../assets/design-system/map/marker-hover-current-yes.svg'
import currentFocusedMarker from '../assets/design-system/map/marker-focused-current-yes.svg'
import currentSelectedMarker from '../assets/design-system/map/marker-selected-current-yes.svg'

export type MapMarkerState = 'Default' | 'Hover' | 'Focused' | 'Selected'

type Props = {
  name: string
  state?: MapMarkerState
  isCurrent?: boolean
  onSelect?: () => void
}

const markers = {
  other: { Default: defaultMarker, Hover: hoverMarker, Focused: focusedMarker, Selected: selectedMarker },
  current: {
    Default: currentDefaultMarker, Hover: currentHoverMarker, Focused: currentFocusedMarker, Selected: currentSelectedMarker,
  },
}

export function MapMarker({ name, state = 'Default', isCurrent = false, onSelect }: Props) {
  const variants = isCurrent ? markers.current : markers.other
  if (!onSelect) return <img className="map-marker" src={variants[state]} alt="" />

  return <button className="map-marker map-marker-control" type="button" data-state={state}
    aria-label={isCurrent ? `${name}, current warehouse` : name} aria-pressed={state === 'Selected'} onClick={onSelect}>
    <img className="map-marker-resting" src={variants[state]} alt="" />
    <img className="map-marker-hover" src={variants.Hover} alt="" />
  </button>
}
