import { Avatar } from './Avatar'
import { Breadcrumb } from './Breadcrumb'
import { Button } from './Button'
import avatar from '../assets/top0_imgAvatar.png'
import plus from '../assets/top0_imgLeadingIcon.svg'
import messages from '../assets/iconMessage.svg'
import notifications from '../assets/iconBell.svg'
import settings from '../assets/iconTopSettings.svg'

type Props = { warehouse?: string; variant?: 'dashboard' } | { variant: 'design-system'; section: string; page: string }

export function TopNavigation(props: Props) {
  if (props.variant === 'design-system') {
    return <header className="top-navigation top-navigation--docs">
      <Breadcrumb location={props.section} page={props.page} />
    </header>
  }
  const { warehouse = 'New York Central' } = props
  return <header className="top-navigation">
    <Breadcrumb location={warehouse} page="Inventory" />
    <div className="top-actions">
      <Button hierarchy="primary" className="movement-button"><img className="icon" src={plus} alt="" />New Movement</Button>
      <span className="vertical-divider" />
      <div className="top-icons">
        <Button isIconOnly hasBadge aria-label="Messages" aria-description="Unread messages"><img className="icon" src={messages} alt="" /></Button>
        <Button isIconOnly hasBadge aria-label="Notifications" aria-description="Unread notifications"><img className="icon" src={notifications} alt="" /></Button>
        <Button isIconOnly aria-label="Settings"><img className="icon" src={settings} alt="" /></Button>
        <Avatar src={avatar} alt="Account avatar" />
      </div>
    </div>
  </header>
}
