import { Badge } from './Badge'
import { Button } from './Button'
import { DesignSystemSectionLinks } from './DesignSystemSectionLinks'
import exportIcon from '../assets/design-system/export.svg'

type Props = {
  title: string
  headingId: string
  description: string
  sections: readonly (readonly [label: string, id: string])[]
  onExport: () => void
}

export function DesignSystemPageHeader({ title, headingId, description, sections, onExport }: Props) {
  return <header className="docs-page-header">
    <div className="overview-tabs">
      <div className="overview-heading"><h1 id={headingId}>{title}</h1><Badge tone="success">Foundations · Ready</Badge></div>
      <DesignSystemSectionLinks sections={sections} label={`${title} sections`} />
      <Button className="docs-export" size="medium" onClick={onExport}><img src={exportIcon} alt="" />Export</Button>
    </div>
    <p>{description}</p>
  </header>
}
