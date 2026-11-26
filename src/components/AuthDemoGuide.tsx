import { useEffect, useId, useRef, useState } from 'react'
import { Button } from './Button'
import { AUTH_DEMO } from './authDemo'
const demoEmails = [
  ['Sign in email', AUTH_DEMO.email],
  ['Sign up email', AUTH_DEMO.newEmail],
  ['Email not in database', 'unknown@example.com'],
  ['Request error email', 'retry@coretech.demo'],
  ['Registration error email', 'register-fail@coretech.demo'],
] as const
const otherStates = [
  ['Form errors', 'Submit empty or invalid fields. In Sign In, use an incorrect password to see rejected credentials; five failed attempts block sign-in. Use Forgot password to continue.'],
  ['Verification errors', 'Enter any other 6-digit code to see an incorrect-code error. Five wrong codes block verification. Codes expire after 5 minutes; Resend code becomes available after 30 seconds and resets the code and attempt limit.'],
  ['Password and photo errors', 'In Sign Up or password reset, use a password shorter than 8 characters, omit uppercase/lowercase letters or a number, or enter a different confirmation. In the profile step, upload an unsupported image or one larger than 5 MB to see a photo error.'],
  ['Success and session', 'Successful sign-in or sign-up opens the welcome screen, then the dashboard after 8 seconds. A password reset returns you to Sign In. Newly created accounts and changed passwords work until you reload the page. Reload to restore the original demo data.'],
] as const
const sharedDetails = [
  ['Password', AUTH_DEMO.password],
  ['Verification code', AUTH_DEMO.code],
] as const
const guideIntro = 'Explore the authentication flows with these demo emails. Everything runs locally; no real email is sent. Copy a value, close this guide, and follow the steps below.'
const guideText = [
  'Demo guide', guideIntro, 'Emails by flow and outcome',
  ...demoEmails.map(([label, value]) => `${label}: ${value}`),
  'Shared password and code', ...sharedDetails.map(([label, value]) => `${label}: ${value}`),
  'Other states to try', ...otherStates.map(([label, description]) => `${label}: ${description}`),
].join('\n\n')
export function AuthDemoGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()
  useEffect(() => { if (!isOpen) return; const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setIsOpen(false) }; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setIsOpen(false); trigger.current?.focus() } }; document.addEventListener('pointerdown', close); document.addEventListener('keydown', escape); return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) } }, [isOpen])
  const copy = async (value: string) => { try { await navigator.clipboard.writeText(value); setStatus('Copied to clipboard.') } catch { setStatus('Could not copy. Select the text and copy it manually.') } }
  return <div className="auth-demo" ref={root}>
    <Button ref={trigger} aria-expanded={isOpen} aria-controls={id} onClick={() => setIsOpen(!isOpen)}>Demo guide</Button>
    {isOpen && <section id={id} className="auth-demo-panel" aria-label="Demo guide" lang="en" dir="ltr">
      <h2>Demo guide</h2>
      <p>{guideIntro}</p>
      <h3>Emails by flow and outcome</h3>
      {demoEmails.map(([label, value]) => <div className="auth-demo-scenario" key={label}>
        <div className="auth-demo-row"><span><small>{label}</small><code>{value}</code></span><Button onClick={() => copy(value)} aria-label={`Copy ${label}`}>Copy</Button></div>
      </div>)}
      <h3>Shared password and code</h3>
      {sharedDetails.map(([label, value]) => <div className="auth-demo-scenario" key={label}>
        <div className="auth-demo-row"><span><small>{label}</small><code>{value}</code></span><Button onClick={() => copy(value)} aria-label={`Copy ${label}`}>Copy</Button></div>
      </div>)}
      <h3>Other states to try</h3>
      {otherStates.map(([label, description]) => <p key={label}><strong>{label}. </strong>{description}</p>)}
      <Button onClick={() => copy(guideText)}>Copy all details</Button>
      <p role="status">{status}</p>
    </section>}
  </div>
}
