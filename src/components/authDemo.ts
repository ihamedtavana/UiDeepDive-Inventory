// Local demonstration only; no credentials are sent to a server or persisted.
export const AUTH_DEMO = { email: 'dave@coretech.demo', newEmail: 'new@coretech.demo', password: 'CoreTech123', code: '246810', name: 'Dave Ross', role: 'Warehouse Manager' } as const
export const passwordChecks = (value: string) => [value.length >= 8, /[a-z]/.test(value) && /[A-Z]/.test(value), /\d/.test(value)]
export type AuthIdentity = { name: string; email: string; role?: string; photo?: string }
