import { Badge } from './Badge'
import { Button } from './Button'
import { SectionCardTitle } from './SectionCardTitle'
import packageIcon from '../assets/design-system/button-context.svg'

export function SectionCardRestockExample() {
  return <SectionCardTitle icon={packageIcon} headingLevel={3} action={<>
    <Badge tone="error">80 Out</Badge>
    <Badge tone="warning">160 Low</Badge>
    <Button hierarchy="primary" appearance="ghost" className="accent-action" inert>Show All</Button>
  </>}>Needs Restock</SectionCardTitle>
}
