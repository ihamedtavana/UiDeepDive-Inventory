import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from './Button'
import { StockCallout } from './StockCallout'
import arrowLeft from '../assets/auth/arrow-left.svg'
import keyIcon from '../assets/auth/key.svg'
import { Tab } from './Tab'
import { TabButton } from './TabButton'
import { InputField } from './InputField'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthPasswordRules } from './AuthPasswordRules'
import { AuthStepIcon } from './AuthStepIcon'
import { AuthOtpInput } from './AuthOtpInput'
import { AuthVerifiedDetails } from './AuthVerifiedDetails'
import { AuthProfilePhoto } from './AuthProfilePhoto'
import { AuthIdBadge } from './AuthIdBadge'
import { AuthDemoGuide } from './AuthDemoGuide'
import { AuthBrandPanel } from './AuthBrandPanel'
import { AUTH_DEMO, AUTH_DEMO_SIGNUP_EMAILS, passwordChecks } from './authDemo'
import type { AuthIdentity } from './authDemo'
import logo from '../assets/imgFrame2147235759.svg'
import panel from '../assets/imgLayoutRight.svg'
import emailIcon from '../assets/auth/email.svg'
import userIcon from '../assets/auth/user-field.svg'
import avatar from '../assets/auth/avatar.jpg'
import './AuthExperience.css'

export const authPaths = ['/login', '/login/verify', '/login/welcome', '/register', '/register/verify', '/register/profile', '/register/lookup', '/register/profile-unavailable', '/register/welcome', '/forgot-password', '/forgot-password/verify', '/reset-password', '/reset-password/success']
export function AuthExperience({ path, onNavigate }: { path: string; onNavigate: (path: string, isReplace?: boolean) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState<string | undefined>(avatar)
  const [role, setRole] = useState<string | undefined>(AUTH_DEMO.role)
  const [error, setError] = useState('')
  const [hasExistingAccount, setHasExistingAccount] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isBusy, setIsBusy] = useState(false)
  const [hasBrandPanel, setHasBrandPanel] = useState(true)
  const [hasVerifiedEmail, setHasVerifiedEmail] = useState(false)
  const [hasChallenge, setHasChallenge] = useState(false)
  const [hasAuthenticated, setHasAuthenticated] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [otpAttempts, setOtpAttempts] = useState(0)
  const [resendAt, setResendAt] = useState(0)
  const [expiresAt, setExpiresAt] = useState(0)
  const [now, setNow] = useState(Date.now())
  const [notice, setNotice] = useState('')
  const [welcomeSeconds, setWelcomeSeconds] = useState(8)
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden)
  useEffect(() => { const update = () => setIsPageVisible(!document.hidden); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update) }, [])
  const [demoPassword, setDemoPassword] = useState<string>(AUTH_DEMO.password)
  const [registered, setRegistered] = useState<Record<string, { password: string; identity: AuthIdentity }>>({})
  const pending = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const version = useRef(0)
  const heading = useRef<HTMLHeadingElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const isRegister = path.startsWith('/register')
  const isRecovery = path.startsWith('/forgot-password') || path.startsWith('/reset-password')
  const isOtp = path.endsWith('/verify')
  const isWelcome = path.endsWith('/welcome')
  const isProfile = path === '/register/profile'
  const isLookup = path === '/register/lookup'
  const isLookupError = path === '/register/profile-unavailable'
  const isReset = path === '/reset-password'
  const isUpdated = path === '/reset-password/success'
  const isLogin = path === '/login'
  const isExpired = isOtp && now >= expiresAt
  const isBlocked = otpAttempts >= 5 || isExpired
  const identity: AuthIdentity = { name: name || AUTH_DEMO.name, email, role, photo }
  const base = isRegister ? '/register' : isRecovery ? '/forgot-password' : '/login'

  useEffect(() => { const interval = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(interval) }, [])
  useEffect(() => { version.current++; clearTimeout(pending.current); setIsBusy(false); setError(''); setHasExistingAccount(false); setFieldErrors({}); setNotice(''); heading.current?.focus(); document.title = `${isRegister ? 'Sign Up' : isRecovery ? 'Reset password' : 'Sign In'} · CoreTech`; return () => { clearTimeout(pending.current) } }, [path, isRegister, isRecovery])
  useEffect(() => {
    if (isOtp && !hasChallenge) onNavigate(base, true)
    else if ((isProfile || isReset || isLookup) && !hasVerifiedEmail) onNavigate(base, true)
    else if (isLookupError && !email) onNavigate(base, true)
    else if (isWelcome && !hasAuthenticated) onNavigate(base, true)
    else if (isUpdated && !hasVerifiedEmail) onNavigate('/forgot-password', true)
  }, [path, isOtp, isProfile, isReset, isLookup, isLookupError, isWelcome, isUpdated, hasChallenge, hasVerifiedEmail, hasAuthenticated, base, email, onNavigate])
  useEffect(() => {
    if (!isLookup || !hasVerifiedEmail) return
    setIsBusy(true)
    pending.current = setTimeout(() => {
      setIsBusy(false)
      setName(AUTH_DEMO.name)
      setRole(AUTH_DEMO.role)
      setPhoto(avatar)
      onNavigate('/register/profile')
    }, 1000)
    return () => clearTimeout(pending.current)
  }, [isLookup, hasVerifiedEmail, email, onNavigate])
  useEffect(() => {
    if (!isWelcome || !hasAuthenticated) return
    setWelcomeSeconds(8)
  }, [path, isWelcome, hasAuthenticated])
  useEffect(() => {
    if (!isWelcome || !hasAuthenticated || !isPageVisible) return
    // One active timeout; leaving this route or hiding the page cancels it.
    const timer = window.setTimeout(() => {
      if (welcomeSeconds <= 1) onNavigate('/dashboard', true)
      else setWelcomeSeconds(seconds => seconds - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [isWelcome, hasAuthenticated, welcomeSeconds, isPageVisible, onNavigate])
  useEffect(() => () => { if (photo?.startsWith('blob:')) URL.revokeObjectURL(photo) }, [photo])
  const request = (callback: () => void, delay = 800) => { if (isBusy) return; setIsBusy(true); setError(''); const current = version.current; pending.current = setTimeout(() => { if (version.current !== current) return; setIsBusy(false); callback() }, delay) }
  const go = (target: string) => { clearTimeout(pending.current); version.current++; setIsBusy(false); onNavigate(target) }
  const start = (target: string) => { setHasChallenge(false); setHasVerifiedEmail(false); setHasAuthenticated(false); setCode(''); setPassword(''); setConfirm(''); setOtpAttempts(0); go(target) }
  const challenge = () => { setCode(''); setOtpAttempts(0); setHasChallenge(true); setHasVerifiedEmail(false); setResendAt(Date.now() + 30000); setExpiresAt(Date.now() + 300000); setNow(Date.now()); go(`${base}/verify`) }
  const validate = (errors: Record<string, string>) => { setFieldErrors(errors); if (!Object.keys(errors).length) return true; requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus()); return false }
  const verify = (digits: string) => {
    if (isBusy || digits.length !== 6 || isBlocked) return
    request(() => {
      if (Date.now() >= expiresAt) { setError('This code has expired. Send a new code to continue.'); return }
      if (digits !== AUTH_DEMO.code || (isRecovery && email !== AUTH_DEMO.email && !registered[email.toLowerCase()])) { setOtpAttempts(v => v + 1); setCode(''); setError('That code isn’t right.'); return }
      setHasVerifiedEmail(true); setHasChallenge(false)
      if (isRegister) go('/register/lookup')
      else if (isRecovery) { setPassword(''); setConfirm(''); go('/reset-password') }
      else { const account = registered[email.toLowerCase()]; setName(account?.identity.name || AUTH_DEMO.name); setRole(account ? account.identity.role : AUTH_DEMO.role); setPhoto(account ? account.identity.photo : avatar); setHasAuthenticated(true); go('/login/welcome') }
    }, 800)
  }
  const submit = (event: FormEvent) => {
    event.preventDefault(); if (isBusy) return
    if (isOtp) { verify(code); return }
    if (isProfile || isReset) {
      const errors: Record<string, string> = {}
      if (isProfile && !name.trim()) errors.name = 'Enter your full name.'
      if (!passwordChecks(password).every(Boolean)) errors.password = 'Meet all three password requirements.'
      if (password !== confirm) errors.confirm = 'Passwords don’t match.'
      if (!validate(errors)) return
      request(() => { if (isProfile && email === 'register-fail@coretech.demo') { setError('We couldn’t create your account. Your details are still here. Try again.'); return } if (isReset) { if (registered[email.toLowerCase()]) setRegistered(v => ({ ...v, [email.toLowerCase()]: { ...v[email.toLowerCase()], password } })); else setDemoPassword(password); go('/reset-password/success') } else { setRegistered(v => ({ ...v, [email.toLowerCase()]: { password, identity } })); setHasAuthenticated(true); go('/register/welcome') } }, 1200); return
    }
    const normalized = email.trim().toLowerCase(); const errors: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) errors.email = 'Enter a valid work email address.'
    if (isLogin && !password) errors.password = 'Enter your password.'
    if (!validate(errors)) return
    setEmail(normalized)
    request(() => {
      if (normalized === 'retry@coretech.demo') { setError('We couldn’t complete your request. Please try again.'); return }
      if (isLogin) {
        if (attempts >= 5) { setError('Too many attempts. Reset your password to continue.'); return }
        const expected = registered[normalized]?.password ?? (normalized === AUTH_DEMO.email ? demoPassword : undefined)
        if (!expected || password !== expected) { setAttempts(v => v + 1); setError('Your email or password is incorrect.'); return }
        setAttempts(0); challenge(); return
      }
      if (isRegister && (normalized === AUTH_DEMO.email || registered[normalized])) { setHasExistingAccount(true); return }
      if (isRegister && !AUTH_DEMO_SIGNUP_EMAILS.includes(normalized)) { setHasChallenge(false); setHasVerifiedEmail(false); go('/register/profile-unavailable'); return }
      challenge()
    })
  }
  const title = isLookup ? 'Finding your profile' : isLookupError ? 'Profile unavailable' : isWelcome ? `${isRegister ? 'Welcome aboard' : 'Welcome back'}, ${(name || AUTH_DEMO.name).split(' ')[0]}` : isUpdated ? 'Password updated' : isProfile ? (isBusy ? 'Creating your account' : 'Complete your profile') : isReset ? 'Set a new password' : isOtp ? (isBusy ? 'Verifying your code' : isRecovery ? 'Check your email' : 'Verify your email') : isRegister ? 'Create your account' : isRecovery ? 'Reset your password' : 'Welcome back'
  const maskedEmail = email ? `${email[0]}•••@${email.split('@')[1]}` : ''
  const description = isLookup ? 'We’re looking for your details in the company directory.' : isLookupError ? `We couldn’t find an account with the email address ${email}.` : isWelcome ? (isRegister ? 'Your CoreTech account is ready.' : 'You’re signed in to CoreTech.') : isUpdated ? 'You can now sign in with your new password.' : isProfile ? 'We found your details. Check them and set a password.' : isReset ? 'Choose a strong password to keep your account secure.' : isOtp ? (isRecovery ? `If an account exists for ${maskedEmail}, we sent it a 6-digit code.` : `Enter the 6-digit code we sent to ${maskedEmail}.`) : isRegister ? 'Start with your work email. We’ll confirm it with a code.' : isRecovery ? 'Enter your work email and we’ll send you a code.' : 'Sign in with your work email and password.'
  const iconState = isLookup ? 'Profile Search' : isLookupError ? 'Error' : isWelcome || isUpdated ? 'Confirmed' : hasExistingAccount ? 'Profile' : error ? 'Error' : isBusy ? isProfile ? 'Creating' : isOtp ? 'Verifying' : 'Processing' : isProfile ? 'Profile' : isReset || isRecovery ? 'Lock' : isOtp ? 'Email' : isRegister ? 'User Add' : 'Key'
  return <div className="auth-page"><AuthDemoGuide /><main className={`auth-surface ${hasBrandPanel && !isWelcome ? 'has-brand-panel' : ''} ${isWelcome ? 'is-welcome' : ''}`}><section className="auth-panel"><header className="auth-brand-header"><div className="brand"><img src={logo} alt="" /><strong>CoreTech</strong></div>{!isWelcome && <Button appearance="ghost" isIconOnly aria-label={hasBrandPanel ? 'Hide brand panel' : 'Show brand panel'} aria-expanded={hasBrandPanel} aria-controls="auth-brand-panel" onClick={() => setHasBrandPanel(!hasBrandPanel)}><img className="icon" src={panel} alt="" /></Button>}</header><div className="auth-body"><div key={path} className={`auth-card ${isWelcome ? 'auth-welcome' : ''}`}>
    {!isWelcome && <div className="auth-tabs"><Tab label="Account access"><TabButton isSelected={!isRegister} onClick={() => start('/login')}>Sign In</TabButton><TabButton isSelected={isRegister} onClick={() => start('/register')}>Sign Up</TabButton></Tab></div>}
    <div className="auth-step-header"><AuthStepIcon state={iconState} /><div><h1 ref={heading} tabIndex={-1}>{title}</h1><p>{description}</p></div></div>
    {isWelcome ? <div className="auth-welcome-content"><AuthIdBadge identity={identity} /><Button hierarchy="primary" size="medium" onClick={() => go('/dashboard')}>Continue to dashboard</Button><div className="auth-redirect"><p role="timer" aria-live="off">{`Opening your dashboard in ${welcomeSeconds}s`}</p></div></div> : <form ref={form} className="auth-form" noValidate onSubmit={submit} aria-busy={isBusy}>
      {isLookup ? <div className="auth-profile-skeleton" role="status" aria-label="Looking up your company profile"><span /><span /><span /><span /></div> : isLookupError ? <><StockCallout tone="error" title="We couldn’t load your profile" action={isBusy ? 'Please wait…' : 'Try again'} onAction={() => request(() => { if (AUTH_DEMO_SIGNUP_EMAILS.includes(email)) challenge() })}>Check your work email and try again. If the problem persists, contact your administrator.</StockCallout><div className="auth-links"><Button appearance="ghost" disabled={isBusy} onClick={() => start('/register')}><img className="icon" src={arrowLeft} alt="" />Change email</Button></div></> : isUpdated ? <><div className="auth-callout is-success"><strong>Your password was changed</strong><p>For your security, other devices will need to sign in again.</p></div><Button hierarchy="primary" size="medium" onClick={() => start('/login')}>Back to Sign In</Button></> : isOtp ? <><AuthOtpInput value={code} onChange={setCode} onComplete={verify} error={error || (isExpired ? 'This code has expired.' : otpAttempts >= 5 ? 'Too many incorrect codes. Send a new code.' : undefined)} isDisabled={isBusy} isBlocked={isBlocked} /><Button type="submit" hierarchy="primary" size="medium" disabled={isBusy || isBlocked || code.length !== 6}>{isBusy ? 'Verifying…' : isRegister ? 'Verify email' : 'Verify code'}</Button><div className="auth-links"><Button appearance="ghost" onClick={() => start(base)}><img className="icon" src={arrowLeft} alt="" />Change email</Button><Button appearance="ghost" disabled={isBusy || now < resendAt} onClick={() => request(() => { setCode(''); setOtpAttempts(0); setExpiresAt(Date.now() + 300000); setResendAt(Date.now() + 30000); setNow(Date.now()); setNotice('A new code was sent.'); setError('') })}>{now < resendAt ? `Resend in 0:${Math.ceil((resendAt - now) / 1000).toString().padStart(2, '0')}` : 'Resend code'}</Button></div></> : <>
      {isProfile ? <><AuthProfilePhoto photo={photo} onChange={setPhoto} /><InputField label="Full name" leadingIcon={userIcon} autoComplete="name" value={name} error={fieldErrors.name} onChange={e => setName(e.target.value)} disabled={isBusy} /><AuthVerifiedDetails email={email} role={role} hasRole={!!role} onChange={() => start('/register')} /></> : !isReset && <InputField label="Work email" type="email" autoComplete="username" leadingIcon={emailIcon} placeholder="name@company.com" value={email} onChange={e => { setEmail(e.target.value); setHasExistingAccount(false) }} error={fieldErrors.email} helper={isRegister && !hasExistingAccount ? 'We’ll send a 6-digit code to confirm it’s yours.' : undefined} disabled={isBusy} />}
      {(isLogin || isProfile || isReset) && <><div className="auth-password-group"><AuthPasswordField label={isReset ? 'New password' : 'Password'} value={password} onChange={setPassword} error={fieldErrors.password} isDisabled={isBusy} isNew={!isLogin} />{isLogin && <Button appearance="ghost" onClick={() => start('/forgot-password')}>Forgot password?</Button>}</div>{!isLogin && <><AuthPasswordRules value={password} /><AuthPasswordField label={isReset ? 'Confirm new password' : 'Confirm password'} value={confirm} onChange={setConfirm} error={fieldErrors.confirm} isDisabled={isBusy} isNew /></>}</>}
      {hasExistingAccount && <><StockCallout tone="info" title="This email already has an account" action="Sign in instead" onAction={() => start('/login')}>Sign in instead, or reset your password if you’ve forgotten it.</StockCallout><div className="auth-links"><Button appearance="ghost" onClick={() => start('/forgot-password')}><img className="icon" src={keyIcon} alt="" />Reset password</Button></div></>}
      {error && <div className="auth-callout is-error" role="alert"><strong>{isLogin ? attempts >= 5 ? 'Attempt limit reached' : 'Unable to sign in' : 'We couldn’t complete your request'}</strong><p>{error}</p></div>}
      <Button type="submit" hierarchy="primary" size="medium" disabled={isBusy || (isLogin && attempts >= 5)}>{isBusy ? isProfile ? 'Creating account…' : isLogin ? 'Signing in…' : 'Please wait…' : isProfile ? 'Create account' : isReset ? 'Update password' : isRegister ? 'Continue' : isRecovery ? 'Send code' : 'Sign in'}</Button>
      {isRecovery && <Button className="auth-back" appearance="ghost" onClick={() => start(isReset ? '/forgot-password' : '/login')}>← {isReset ? 'Start over' : 'Back to Sign In'}</Button>}
      </>}
      {notice && <StockCallout tone="success" title="New code sent">{notice}</StockCallout>}
    </form>}
    </div></div></section>{hasBrandPanel && !isWelcome && <AuthBrandPanel />}</main></div>
}
