import { useState } from 'react'
import { MapGoodsDot } from './MapGoodsDot'
import { MapMarker, type MapMarkerState } from './MapMarker'
import { MapPopover, type MapPopoverPlacement } from './MapPopover'
import { RouteMotionDemo } from './RouteMotionDemo'

const markerStates: readonly MapMarkerState[] = ['Default', 'Hover', 'Focused', 'Selected']
const popoverPlacements: readonly MapPopoverPlacement[] = ['Below', 'Right', 'Left']
const newYork = 'New York Central'
const tokyo = 'Tokyo Distribution Center'

export function MapDocumentationPreview({ variant }: { variant: 'overview' | 'states' }) {
  const [isMarkerSelected, setIsMarkerSelected] = useState(false)

  if (variant === 'states') return <div className="map-docs-preview map-docs-preview--states">
    {[false, true].flatMap(isCurrent => markerStates.map(state => {
      const label = isCurrent ? `Current · ${state}` : state
      return <figure key={label}>
        <MapMarker name={newYork} state={state} isCurrent={isCurrent} />
        <figcaption>{label}</figcaption>
      </figure>
    }))}
    {popoverPlacements.map(placement => <figure key={placement}>
      <MapPopover placement={placement} />
      <figcaption>Popover · {placement}</figcaption>
    </figure>)}
  </div>

  return <div className="map-docs-preview map-docs-preview--overview">
    <figure>
      <MapMarker name={newYork} state={isMarkerSelected ? 'Selected' : 'Default'}
        onSelect={() => setIsMarkerSelected(selected => !selected)} />
      <figcaption>Marker</figcaption>
    </figure>
    <figure>
      <MapMarker name={tokyo} state="Selected" />
      <figcaption>Marker · Selected</figcaption>
    </figure>
    <figure>
      <MapMarker name={newYork} isCurrent />
      <figcaption>Marker · Current</figcaption>
    </figure>
    <figure>
      <MapGoodsDot />
      <figcaption>Goods Dot</figcaption>
    </figure>
    <figure>
      <MapPopover />
      <figcaption>Popover · Current</figcaption>
    </figure>
    <figure>
      <MapPopover status="Selected" name={tokyo} location="Tokyo, Japan" />
      <figcaption>Popover · Selected</figcaption>
    </figure>
    <figure className="map-docs-route">
      <RouteMotionDemo step="2 Mid-route" isPlayable />
      <figcaption>Route Motion Demo · Mid-route</figcaption>
    </figure>
  </div>
}
