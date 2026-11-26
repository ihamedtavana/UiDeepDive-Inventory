import { useEffect, useId, useRef, useState } from 'react'
import { Button } from './Button'
import { AUTH_DEMO } from './authDemo'
const demoDetails = [
  ['Sign in email', AUTH_DEMO.email],
  ['Sign up email', AUTH_DEMO.newEmail],
  ['Password', AUTH_DEMO.password],
  ['Verification code', AUTH_DEMO.code],
  ['Full name', AUTH_DEMO.name],
  ['Empty profile email', 'fresh@coretech.demo'],
  ['Request error email', 'retry@coretech.demo'],
  ['Profile lookup error email', 'lookup@coretech.demo'],
  ['Registration error email', 'register-fail@coretech.demo'],
] as const
export function AuthDemoGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()
  useEffect(() => { if (!isOpen) return; const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setIsOpen(false) }; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setIsOpen(false); trigger.current?.focus() } }; document.addEventListener('pointerdown', close); document.addEventListener('keydown', escape); return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape) } }, [isOpen])
  const copy = async (value: string) => { try { await navigator.clipboard.writeText(value); setStatus('کپی شد') } catch { setStatus('کپی خودکار ممکن نشد؛ متن را انتخاب و کپی کنید.') } }
  return <div className="auth-demo" ref={root}><Button ref={trigger} aria-expanded={isOpen} aria-controls={id} onClick={() => setIsOpen(!isOpen)}>Demo guide</Button>{isOpen && <section id={id} className="auth-demo-panel" aria-label="Demo guide"><h2>راهنمای دمو</h2><p dir="rtl">این فلو نمایشی است و ایمیل واقعی ارسال نمی‌کند. اطلاعات زیر را کپی کنید.</p>{demoDetails.map(([label, value]) => <div className="auth-demo-row" key={label}><span><small>{label}</small><code>{value}</code></span><Button onClick={() => copy(value)} aria-label={`Copy ${label}`}>Copy</Button></div>)}<p dir="rtl">برای پروفایل خالی از fresh@coretech.demo استفاده کنید. برای خطای درخواست از retry@coretech.demo استفاده کنید. برای خطای جست‌وجوی پروفایل از lookup@coretech.demo و خطای ساخت حساب از register-fail@coretech.demo استفاده کنید. کد اشتباه را برای دیدن حالت خطا وارد کنید.</p><Button onClick={() => copy(demoDetails.map(([label, value]) => `${label}: ${value}`).join('\n'))}>Copy all details</Button><p role="status" dir="rtl">{status}</p></section>}</div>
}

