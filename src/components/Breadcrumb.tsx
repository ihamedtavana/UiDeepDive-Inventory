import { Badge } from './Badge'

export function Breadcrumb({ location, page, label = 'Breadcrumb' }: { location: string; page: string; label?: string }) {
  return <nav className="breadcrumbs" aria-label={label}>
    <span>{location}</span><span aria-hidden="true">/</span><Badge>{page}</Badge>
  </nav>
}
