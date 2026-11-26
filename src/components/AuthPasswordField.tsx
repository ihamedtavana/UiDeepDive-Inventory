import { useState } from 'react'
import { InputField } from './InputField'
import lock from '../assets/auth/lock.svg'
import eye from '../assets/auth/eye.svg'

export function AuthPasswordField({ label = 'Password', value, onChange, error, isDisabled = false, isNew = false }: { label?: string; value: string; onChange: (value: string) => void; error?: string; isDisabled?: boolean; isNew?: boolean }) {
  const [isVisible, setIsVisible] = useState(false)
  return <InputField label={label} type={isVisible ? 'text' : 'password'} autoComplete={isNew ? 'new-password' : 'current-password'} placeholder={label.includes('Confirm') ? 'Re-enter your password' : 'Enter your password'} value={value} onChange={e => onChange(e.target.value)} error={error} disabled={isDisabled} leadingIcon={lock} trailingIcon={eye} trailingIconLabel={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} isTrailingIconPressed={isVisible} onTrailingIconClick={() => setIsVisible(!isVisible)} />
}
