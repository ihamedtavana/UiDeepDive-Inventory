import { writeFile } from 'node:fs/promises'
const tabs = await (await fetch('http://127.0.0.1:9223/json/list')).json()
const tab = tabs.find(tab => tab.type === 'page')
const socket = new WebSocket(tab.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let sequence = 0
const waiting = new Map()
socket.addEventListener('message', event => { const result = JSON.parse(event.data); if (result.id && waiting.has(result.id)) { const { resolve, reject } = waiting.get(result.id); waiting.delete(result.id); result.error ? reject(result.error) : resolve(result.result) } })
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; waiting.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })) })
const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails)); return r.result.value }
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
const click = text => evaluate(`Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === ${JSON.stringify(text)})?.click()`)
const fill = (label, value) => evaluate(`(() => { const el = document.querySelector('input[aria-label="${label}"]') || document.getElementById(Array.from(document.querySelectorAll('label')).find(l => l.textContent === '${label}')?.htmlFor); if (!el) throw new Error('Missing input: ${label}'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)}); el.dispatchEvent(new Event('input',{bubbles:true})); })()`)
const screenshot = async name => { const data = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true }); await writeFile(`artifacts/auth-${name}.png`, Buffer.from(data.data, 'base64')) }
const requirePath = async path => { const actual = await evaluate('location.pathname'); if (actual !== path) throw new Error(`Expected ${path}, received ${actual}`) }
try {
 await send('Page.enable'); await send('Runtime.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }); await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
 await send('Page.navigate', { url: 'http://127.0.0.1:5173/login' }); await pause(900); await screenshot('login')
 console.log('Login geometry:', await evaluate(`JSON.stringify(Object.fromEntries(['.auth-surface','.auth-card','.auth-carousel-stage','.auth-step-header'].map(s=>{const r=document.querySelector(s).getBoundingClientRect();return[s,{x:r.x,y:r.y,width:r.width,height:r.height}]})))`))
 console.log('Broken images:', await evaluate(`Array.from(document.images).filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)`))
 await fill('Work email', 'dave@coretech.demo'); await fill('Password', 'CoreTech123'); await click('Sign in'); await pause(900); await requirePath('/login/verify'); await screenshot('verify'); await fill('Verification code', '246810'); await pause(1000); await requirePath('/login/welcome'); await screenshot('welcome')
 await click('Continue to dashboard'); await pause(500); await requirePath('/dashboard')
 await send('Page.navigate', { url: 'http://127.0.0.1:5173/register' }); await pause(600); await screenshot('register'); await fill('Work email','new@coretech.demo'); await click('Continue'); await pause(950); await fill('Verification code','246810'); await pause(2300); await requirePath('/register/profile'); await screenshot('profile')
 await fill('Password','CoreTech123'); await fill('Confirm password','CoreTech123'); await click('Create account'); await pause(1300); await requirePath('/register/welcome'); await screenshot('registered')
 await send('Page.navigate', { url: 'http://127.0.0.1:5173/forgot-password' }); await pause(500); await screenshot('recovery'); await fill('Work email','dave@coretech.demo'); await click('Send code'); await pause(900); await fill('Verification code','246810'); await pause(1000); await requirePath('/reset-password'); await screenshot('reset'); await fill('New password','UpdatedPass123'); await fill('Confirm new password','UpdatedPass123'); await click('Update password'); await pause(1300); await requirePath('/reset-password/success'); await screenshot('updated')
 await send('Page.navigate',{url:'http://127.0.0.1:5173/login'}); await pause(500); await click('Demo guide'); await screenshot('demo-guide'); await click('Demo guide')
 for (let i=1;i<=4;i++) { await evaluate(`document.querySelector('button[aria-label^="Slide ${i}:"]').click()`); await pause(100); await screenshot('slide-'+i) }
 await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] }); await evaluate(`document.querySelector('button[aria-label^="Slide 1:"]').click()`); await pause(6700); const current = await evaluate(`document.querySelector('.auth-carousel-copy h2').textContent`); console.log('Carousel after full loop:',current)
 console.log('Desktop browser checks passed')
} finally { socket.close() }
