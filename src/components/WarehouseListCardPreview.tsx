import { useEffect, useId, useRef, useState } from 'react'
import { RadioButton } from './RadioButton'
import { SwitchActionBar } from './SwitchActionBar'
import { WarehouseOption, type Warehouse, type WarehouseOptionState } from './WarehouseOption'
import warehousePhoto from '../assets/imgImage236.png'

const newYork: Warehouse = { name: 'New York Central', location: 'New York, United States', shelves: 16 }
const frankfurt: Warehouse = { name: 'Frankfurt Hub', location: 'Frankfurt, Germany', shelves: 16 }
const tokyo = 'Tokyo Distribution Center'
const cardStates = ['Default', 'Hover', 'Focused', 'Selected', 'Disabled'] as const satisfies readonly WarehouseOptionState[]
const barStates = ['Same Warehouse', 'Ready', 'Switching'] as const
const noop = () => {}

export function WarehouseListCardPreview({ variant }: { variant: 'overview' | 'states' }) {
  const groupName = useId()
  const radiosRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(newYork.name)
  const [selected, setSelected] = useState(newYork.name)
  const [destination, setDestination] = useState(frankfurt.name)
  const [isSwitching, setIsSwitching] = useState(false)

  useEffect(() => {
    if (!isSwitching) return
    const timer = window.setTimeout(() => {
      if (actionsRef.current?.contains(document.activeElement)) {
        radiosRef.current?.querySelector<HTMLInputElement>('input:checked')?.focus({ preventScroll: true })
      }
      setCurrent(destination)
      setIsSwitching(false)
    }, 700)
    return () => window.clearTimeout(timer)
  }, [destination, isSwitching])

  if (variant === 'states') {
    return <div className="warehouse-card-docs-preview warehouse-card-docs-preview--states">
      {cardStates.map(state => <figure key={state} className="warehouse-card-docs-card-example">
        <div inert aria-hidden="true">
          <WarehouseOption variant="list-card" warehouse={newYork} groupName={`${groupName}-${state}`}
            photo={warehousePhoto} state={state} isSelected={state === 'Selected'} onSelect={noop} />
        </div>
        <figcaption>{state}</figcaption>
      </figure>)}
      <figure><RadioButton /><figcaption>Radio · Off</figcaption></figure>
      <figure><RadioButton isSelected /><figcaption>Radio · On</figcaption></figure>
      {barStates.map(state => <figure key={state} className="warehouse-card-docs-bar-example">
        <div inert aria-hidden="true">
          <SwitchActionBar state={state} from={newYork.name} warehouse={state === 'Same Warehouse' ? newYork.name : tokyo} />
        </div>
        <figcaption>Bar · {state}</figcaption>
      </figure>)}
    </div>
  }

  function selectWarehouse(name: string) {
    if (isSwitching) return
    setSelected(name)
    setDestination(name)
  }

  return <div className="warehouse-card-docs-preview warehouse-card-docs-preview--overview">
    <div className="warehouse-card-docs-warehouse-group" role="radiogroup" aria-label="Choose a warehouse" ref={radiosRef}>
      {[newYork, frankfurt].map(warehouse => <figure key={warehouse.name} className="warehouse-card-docs-card-example">
        <WarehouseOption variant="list-card" warehouse={warehouse} groupName={groupName} photo={warehousePhoto}
          isSelected={warehouse.name === selected} isCurrent={warehouse.name === current}
          onSelect={() => selectWarehouse(warehouse.name)} />
        <figcaption>{warehouse.name === selected ? (warehouse.name === current ? 'Selected · current warehouse' : 'Selected') : 'Default'}</figcaption>
      </figure>)}
    </div>
    <figure className="warehouse-card-docs-bar-example">
      <div ref={actionsRef}>
        <SwitchActionBar state={isSwitching ? 'Switching' : destination === current ? 'Same Warehouse' : 'Ready'}
          from={current} warehouse={destination}
          onCancel={() => selectWarehouse(current)}
          onSwitch={() => {
            setSelected(destination)
            setIsSwitching(true)
          }} />
      </div>
      <figcaption>Switch Action Bar · {isSwitching ? 'Switching' : destination === current ? 'Same Warehouse' : 'Ready'}</figcaption>
    </figure>
  </div>
}
