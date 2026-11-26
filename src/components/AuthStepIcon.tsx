import { useEffect, useState } from 'react'
import key from '../assets/auth/7850-7187.svg'
import lock from '../assets/auth/7850-7190.svg'
import mail from '../assets/auth/7850-7193.svg'
import userAdd from '../assets/auth/7850-7206.svg'
import user from '../assets/auth/7850-7213.svg'
import check from '../assets/auth/7850-7227.svg'
import alert from '../assets/auth/error.svg'
const icons = { Key: key, Lock: lock, Email: mail, 'User Add': userAdd, Profile: user, Confirmed: check, Error: alert, Processing: key, Verifying: mail, 'Profile Search': user, Creating: user }
export function AuthStepIcon({ state }: { state: keyof typeof icons }) {
  const [previous, setPrevious] = useState(state)
  useEffect(() => { const timer = window.setTimeout(() => setPrevious(state), 360); return () => clearTimeout(timer) }, [state])
  const isPending = ['Processing', 'Verifying', 'Profile Search', 'Creating'].includes(state)
  return <div className={`auth-step-icon ${state === 'Confirmed' ? 'is-success' : state === 'Error' ? 'is-error' : ''}`} aria-hidden="true">{previous !== state && <img className="is-leaving" src={icons[previous]} alt="" />}<img key={state} src={icons[state]} alt="" />{isPending && <svg className="auth-progress-arc" viewBox="0 0 56 56" fill="none"><rect x="1" y="1" width="54" height="54" pathLength="100" /></svg>}</div>
}
