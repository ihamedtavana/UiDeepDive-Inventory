import { Badge } from './Badge'
import { Button } from './Button'
import emailIcon from '../assets/auth/email.svg'
import shield from '../assets/auth/shield.svg'
export function AuthVerifiedDetails({ email, role, hasRole = true, onChange }: { email: string; role?: string; hasRole?: boolean; onChange: () => void }) {
  return <div className="auth-verified"><div><img className="icon" src={emailIcon} alt="" /><span><small>Email</small>{email}</span><Badge tone="success">Verified</Badge><Button appearance="ghost" onClick={onChange}>Change</Button></div>{hasRole && role && <div><img className="icon" src={shield} alt="" /><span><small>Role · set by your admin</small>{role}</span></div>}</div>
}
