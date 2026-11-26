import { Badge } from './Badge'
import { Avatar } from './Avatar'
import type { AuthIdentity } from './authDemo'
import logo from '../assets/auth/badge-logo.svg'
import user from '../assets/auth/7850-7213.svg'
export function AuthIdBadge({ identity, badgeId = 'CT-0519', hasRole = true }: { identity: AuthIdentity; badgeId?: string; hasRole?: boolean }) {
  return <div className="auth-id-badge"><span className="auth-badge-clip" /><header><img src={logo} alt="" /><strong>CoreTech</strong><small>Staff ID</small></header><div className="auth-badge-body">{identity.photo ? <Avatar src={identity.photo} alt={identity.name} /> : <span className="auth-avatar-fallback"><img src={user} alt="" /></span>}<strong>{identity.name}</strong>{hasRole && identity.role && <p>{identity.role}</p>}</div><footer><span>{badgeId}</span><Badge>Verified</Badge></footer></div>
}
