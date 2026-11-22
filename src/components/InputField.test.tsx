import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { InputField } from './InputField'

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
})
