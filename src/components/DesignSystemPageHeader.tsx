import { Badge } from './Badge'
import { Button } from './Button'
import { DesignSystemSectionLinks } from './DesignSystemSectionLinks'
import exportIcon from '../assets/design-system/export.svg'

type Props = {
  title: string
  headingId: string
  description: string
  section?: 'Foundations' | 'Components'
  status?: 'Ready' | 'In progress'
  sections: readonly (readonly [label: string, id: string])[]
  onExport: () => void
}

export function DesignSystemPageHeader({ title, headingId, description, section = 'Foundations', status = 'Ready', sections, onExport }: Props) {
  return <header className="docs-page-header">
    <div className="overview-tabs">
      <div className="overview-heading"><h1 id={headingId}>{title}</h1><Badge tone={status === 'Ready' ? 'success' : 'neutral'}>{section} · {status}</Badge></div>
      <DesignSystemSectionLinks sections={sections} label={`${title} sections`} />
      <Button className="docs-export" size="medium" onClick={onExport}><img src={exportIcon} alt="" />Export</Button>
    </div>
    <p>{description}</p>
  </header>
}
