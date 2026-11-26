import { passwordChecks } from './authDemo'
export function AuthPasswordRules({ value }: { value: string }) {
  const checks = passwordChecks(value)
  return <ul className="auth-password-rules" aria-label="Password requirements">{['At least 8 characters', 'Upper- and lower-case letters', 'At least one number'].map((rule, i) => <li key={rule} className={checks[i] ? 'is-met' : ''}><span aria-hidden="true">{checks[i] ? '✓' : '○'}</span><span>{rule}</span><span className="auth-sr-only">{checks[i] ? ' — met' : ' — not met'}</span></li>)}</ul>
}
