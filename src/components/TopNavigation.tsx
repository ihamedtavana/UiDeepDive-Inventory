import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Button } from './Button'
import avatar from '../assets/top0_imgAvatar.png'
import messages from '../assets/iconMessage.svg'
import notifications from '../assets/iconBell.svg'
import settings from '../assets/iconTopSettings.svg'

export function TopNavigation({ warehouse = 'New York Central' }: { warehouse?: string }) {
  return <header className="top-navigation">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><span>{warehouse}</span><span aria-hidden="true">/</span><Badge>Inventory</Badge></nav>
    <div className="top-actions">
      <Button hierarchy="primary" size="small"><span className="icon button-add-icon" aria-hidden="true" />New Movement</Button>
      <span className="vertical-divider" />
      <div className="top-icons">
        <Button isIconOnly hasBadge aria-label="Messages"><img className="icon" src={messages} alt="" /></Button>
        <Button isIconOnly hasBadge aria-label="Notifications"><img className="icon" src={notifications} alt="" /></Button>
        <Button isIconOnly aria-label="Settings"><img className="icon" src={settings} alt="" /></Button>
        <Avatar src={avatar} alt="Account avatar" />
      </div>
    </div>
  </header>
}
