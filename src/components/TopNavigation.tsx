import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Button } from './Button'
import avatar from '../assets/top0_imgAvatar.png'
import plus from '../assets/top0_imgLeadingIcon.svg'
import messages from '../assets/top0_imgButton.svg'
import notifications from '../assets/top0_imgButton1.svg'
import settings from '../assets/top0_imgButton2.svg'

export function TopNavigation() {
  return <header className="top-navigation">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><span>New York Central</span><span aria-hidden="true">/</span><Badge>Inventory</Badge></nav>
    <div className="top-actions">
      <Button hierarchy="primary" className="movement-button"><img className="icon" src={plus} alt="" />New Movement</Button>
      <span className="vertical-divider" />
      <div className="top-icons">
        <img src={messages} alt="Messages" /><img src={notifications} alt="Notifications" /><img src={settings} alt="Settings" />
        <Avatar src={avatar} alt="Account avatar" />
      </div>
    </div>
  </header>
}
