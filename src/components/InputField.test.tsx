import { useState } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { InputField } from './InputField'

afterEach(cleanup)

describe('InputField', () => {
  it('associates helper and error text with the input', () => {
    const { rerender } = render(<InputField label="Note" leadingIcon="/note.svg" helper="Optional" aria-describedby="extra" />)
    const input = screen.getByRole('textbox', { name: 'Note' })
    expect(input.getAttribute('aria-describedby')).toContain('extra')
    expect(input.getAttribute('aria-describedby')).toContain(screen.getByText('Optional').id)
    rerender(<InputField label="Note" leadingIcon="/note.svg" error="Required" />)
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toBe(screen.getByText('Required').id)
  })

  it('supports a decorative trailing icon without adding a tab stop', () => {
    const { container } = render(<InputField label="Email" trailingIcon="/check.svg" />)
    expect(screen.getByLabelText('Email').tagName).toBe('INPUT')
    expect(screen.queryByRole('button')).toBeNull()
    expect(container.querySelector('.input-field-trailing-icon')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('toggles password visibility without changing its value or submitting the form', () => {
    const onSubmit = vi.fn(event => event.preventDefault())
    function PasswordExample() {
      const [isVisible, setIsVisible] = useState(false)
      return <form onSubmit={onSubmit}><InputField label="Password" type={isVisible ? 'text' : 'password'} defaultValue="My-password-123" autoComplete="current-password" leadingIcon="/lock.svg" trailingIcon={isVisible ? '/eye-off.svg' : '/eye.svg'} trailingIconLabel={isVisible ? 'Hide password' : 'Show password'} isTrailingIconPressed={isVisible} onTrailingIconClick={() => setIsVisible(value => !value)} /></form>
    }
    render(<PasswordExample />)
    const input = screen.getByLabelText('Password') as HTMLInputElement
    const button = screen.getByRole('button', { name: 'Show password' })
    expect(button.getAttribute('aria-controls')).toBe(input.id)
    expect(button.closest('label')).toBeNull()
    expect(button.getAttribute('aria-pressed')).toBe('false')
    fireEvent.click(button)
    expect(input.type).toBe('text')
    expect(input.value).toBe('My-password-123')
    expect(screen.getByRole('button', { name: 'Hide password' }).getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(button)
    expect(input.type).toBe('password')
    expect(input.value).toBe('My-password-123')
    expect(input.autocomplete).toBe('current-password')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('disables the trailing action together with the field and retains error associations', () => {
    const onClick = vi.fn()
    render(<InputField label="Password" type="password" disabled trailingIcon="/eye.svg" trailingIconLabel="Show password" onTrailingIconClick={onClick} error="Required" />)
    const input = screen.getByLabelText('Password') as HTMLInputElement
    const button = screen.getByRole('button', { name: 'Show password' }) as HTMLButtonElement
    expect(input.disabled).toBe(true)
    expect(button.disabled).toBe(true)
    expect(input.getAttribute('aria-describedby')).toBe(screen.getByText('Required').id)
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('keeps the date picker and its label working', () => {
    const onChange = vi.fn()
    render(<InputField label="Received on" type="date" value="2026-11-25" onChange={onChange} />)
    const input = screen.getByLabelText('Received on') as HTMLInputElement
    expect(input.type).toBe('date')
    expect(screen.getByText('Nov 25, 2026')).toBeTruthy()
    fireEvent.change(input, { target: { value: '2026-11-26' } })
    expect(onChange).toHaveBeenCalledOnce()
  })
})
