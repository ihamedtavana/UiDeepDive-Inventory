import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { AppRouter } from './AppRouter'
import { AUTH_DEMO } from './authDemo'

beforeEach(() => { vi.useFakeTimers(); window.history.replaceState(null, '', '/login'); vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })); vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => setTimeout(() => fn(0), 0)); vi.stubGlobal('cancelAnimationFrame', clearTimeout) })
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals() })
const tick = async (ms = 1500) => { await act(async () => { vi.advanceTimersByTime(ms) }) }
const fill = (label: string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } })
const login = async () => { fill('Work email', AUTH_DEMO.email); fill('Password', AUTH_DEMO.password); fireEvent.click(screen.getByRole('button', { name: 'Sign in' })); await tick() }

it('keeps the brand panel mounted across auth steps and preserves its visibility choice', async () => {
  render(<AppRouter />)
  const panel = screen.getByRole('complementary', { name: 'CoreTech brand panel' })
  await login()
  expect(screen.getByRole('complementary', { name: 'CoreTech brand panel' })).toBe(panel)
  fireEvent.click(screen.getByRole('button', { name: 'Hide brand panel' }))
  expect(screen.queryByRole('complementary', { name: 'CoreTech brand panel' })).toBeNull()
  act(() => { window.history.pushState(null, '', '/register'); window.dispatchEvent(new PopStateEvent('popstate')) })
  expect(screen.queryByRole('complementary', { name: 'CoreTech brand panel' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Show brand panel' }))
  expect(screen.getByRole('complementary', { name: 'CoreTech brand panel' })).toBeTruthy()
  expect(screen.queryByRole('button', { name: 'Next slide' })).toBeNull()
})

it('completes sign in, rejects a wrong code, and reaches the existing dashboard', async () => {
  render(<AppRouter />); await login(); expect(window.location.pathname).toBe('/login/verify')
  fill('Verification code', '000000'); await tick(); expect(screen.getByText('That code isn’t right.')).toBeTruthy()
  expect((screen.getByLabelText('Verification code') as HTMLInputElement).value).toBe('')
  fireEvent.paste(screen.getByLabelText('Verification code'), { clipboardData: { getData: () => AUTH_DEMO.code } }); await tick()
  expect(window.location.pathname).toBe('/login/welcome'); expect(screen.getByRole('heading', { name: 'Welcome back, Dave' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Continue to dashboard' })); expect(window.location.pathname).toBe('/dashboard')
})
it('verifies signup, enforces password rules, and drops verification when email changes', async () => {
  window.history.replaceState(null, '', '/register'); render(<AppRouter />)
  fill('Work email', AUTH_DEMO.newEmail); fireEvent.click(screen.getByRole('button', { name: 'Continue' })); await tick()
  fill('Verification code', AUTH_DEMO.code); await tick(900); await tick(1100); expect(window.location.pathname).toBe('/register/profile')
  fireEvent.click(screen.getByRole('button', { name: 'Create account' })); await tick(0); expect(screen.getByText('Meet all three password requirements.')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Change' })); expect(window.location.pathname).toBe('/register')
  act(() => { window.history.pushState(null, '', '/register/profile'); window.dispatchEvent(new PopStateEvent('popstate')) }); expect(window.location.pathname).toBe('/register')
})
it('creates a demo account and allows signing in with the newly chosen password', async () => {
  window.history.replaceState(null, '', '/register'); render(<AppRouter />)
  fill('Work email', 'fresh@coretech.demo'); fireEvent.click(screen.getByRole('button', { name: 'Continue' })); await tick(); fill('Verification code', AUTH_DEMO.code); await tick(900); await tick(1100)
  fill('Full name', 'Sam Green'); fill('Password', 'MyNewPass123'); fill('Confirm password', 'MyNewPass123'); fireEvent.click(screen.getByRole('button', { name: 'Create account' })); await tick()
  expect(screen.getByRole('heading', { name: 'Welcome aboard, Sam' })).toBeTruthy()
  act(() => { window.history.pushState(null, '', '/login'); window.dispatchEvent(new PopStateEvent('popstate')) })
  fill('Work email', 'fresh@coretech.demo'); fill('Password', 'MyNewPass123'); fireEvent.click(screen.getByRole('button', { name: 'Sign in' })); await tick(); fill('Verification code', AUTH_DEMO.code); await tick()
  expect(screen.getByRole('heading', { name: 'Welcome back, Sam' })).toBeTruthy(); expect(screen.queryByText('Warehouse Manager')).toBeNull()
})
it('resets the demo password and uses it on the next login', async () => {
  render(<AppRouter />); fireEvent.click(screen.getByRole('button', { name: 'Forgot password?' })); fill('Work email', AUTH_DEMO.email); fireEvent.click(screen.getByRole('button', { name: 'Send code' })); await tick()
  fill('Verification code', AUTH_DEMO.code); await tick(); fill('New password', 'UpdatedPass123'); fill('Confirm new password', 'UpdatedPass123'); fireEvent.click(screen.getByRole('button', { name: 'Update password' })); await tick()
  expect(screen.getByRole('heading', { name: 'Password updated' })).toBeTruthy(); fireEvent.click(screen.getByRole('button', { name: 'Back to Sign In' })); fill('Work email', AUTH_DEMO.email); fill('Password', 'UpdatedPass123'); fireEvent.click(screen.getByRole('button', { name: 'Sign in' })); await tick(); expect(window.location.pathname).toBe('/login/verify')
})
it('guards direct intermediate routes and copies demo values', async () => {
  window.history.replaceState(null, '', '/reset-password'); const writeText = vi.fn().mockResolvedValue(undefined); Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } }); render(<AppRouter />)
  expect(window.location.pathname).toBe('/forgot-password'); fireEvent.click(screen.getByRole('button', { name: 'Demo guide' })); fireEvent.click(screen.getByRole('button', { name: 'Copy Sign in email' })); await act(async () => {}); expect(writeText).toHaveBeenCalledWith(AUTH_DEMO.email)
  fireEvent.keyDown(document, { key: 'Escape' }); expect(screen.queryByRole('region', { name: 'Demo guide' })).toBeNull()
})
it('expires a code and enables recovery by resending', async () => {
  render(<AppRouter />); await login(); await tick(301000); expect((screen.getByLabelText('Verification code') as HTMLInputElement).disabled).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Resend code' })); await tick(); expect((screen.getByLabelText('Verification code') as HTMLInputElement).disabled).toBe(false)
})

it('recovers from a directory lookup failure without losing email verification', async () => {
  window.history.replaceState(null, '', '/register'); render(<AppRouter />)
  fill('Work email', 'lookup@coretech.demo'); fireEvent.click(screen.getByRole('button', { name: 'Continue' })); await tick(); fill('Verification code', AUTH_DEMO.code); await tick(900); await tick(1100)
  expect(window.location.pathname).toBe('/register/profile-unavailable'); fireEvent.click(screen.getByRole('button', { name: 'Continue manually' })); expect(window.location.pathname).toBe('/register/profile'); expect(screen.getByText('lookup@coretech.demo')).toBeTruthy()
})

it('counts down on welcome, can pause and resume, and redirects automatically', async () => {
  render(<AppRouter />); await login(); fill('Verification code', AUTH_DEMO.code); await tick()
  expect(screen.getByRole('timer').textContent).toContain('8s')
  await tick(1000); expect(screen.getByRole('timer').textContent).toContain('7s')
  fireEvent.click(screen.getByRole('button', { name: 'Pause countdown' })); await tick(10000)
  expect(window.location.pathname).toBe('/login/welcome')
  fireEvent.click(screen.getByRole('button', { name: 'Resume countdown' }))
  for (let i = 0; i < 7; i++) await tick(1000)
  expect(window.location.pathname).toBe('/dashboard')
})

it('cancels the welcome redirect when leaving the page', async () => {
  render(<AppRouter />); await login(); fill('Verification code', AUTH_DEMO.code); await tick()
  act(() => { window.history.pushState(null, '', '/login'); window.dispatchEvent(new PopStateEvent('popstate')) })
  await tick(10000); expect(window.location.pathname).toBe('/login')
})

it('renders resend feedback with the shared success callout and the change-email icon', async () => {
  render(<AppRouter />); await login(); await tick(31000)
  expect(screen.getByRole('button', { name: 'Change email' }).querySelector('img')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Resend code' })); await tick()
  const status = screen.getByRole('status')
  expect(status.textContent).toContain('New code sent')
  expect(status.textContent).toContain('A new code was sent.')
  expect(status.querySelector('img')).toBeTruthy()
})
