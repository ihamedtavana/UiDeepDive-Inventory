type PercentageSegmentProps = { state?: 'Default' | 'Active' }

export function PercentageSegment({ state = 'Default' }: PercentageSegmentProps) {
  return <span className={`percentage-segment${state === 'Active' ? ' is-active' : ''}`} />
}
