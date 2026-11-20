import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { Search } from './Search'

afterEach(cleanup)

it('supports the selected variant and controlled filled value', () => {
  const onChange = vi.fn()
  const { rerender } = render(<Search isSelected value="SKU-1234" onChange={onChange} />)
  const input = screen.getByRole('textbox', { name: 'Search SKU or bin' }) as HTMLInputElement
  expect(input.value).toBe('SKU-1234')
  expect(input.closest('.search')?.classList.contains('is-selected')).toBe(true)
  fireEvent.change(input, { target: { value: 'SKU-12345' } })
  expect(onChange).toHaveBeenCalledOnce()
  rerender(<Search value="" onChange={onChange} />)
  expect(screen.getByRole('textbox').closest('.search')?.classList.contains('is-selected')).toBe(false)
})

it('retains keyboard focus and the collapsed expand action', () => {
  const onExpand = vi.fn()
  const { rerender } = render(<Search />)
  const input = screen.getByRole('textbox')
  input.focus()
  expect(document.activeElement).toBe(input)
  expect(input.closest('.search')?.querySelector('.focus-ring')).toBeTruthy()
  rerender(<Search isCollapsed onExpand={onExpand} />)
  fireEvent.click(screen.getByRole('button', { name: 'Search SKU or bin' }))
  expect(onExpand).toHaveBeenCalledOnce()
})

it('distinguishes pointer selection from keyboard focus', () => {
  render(<Search />)
  const input = screen.getByRole('textbox')
  const container = input.closest('.search')!
  fireEvent.pointerDown(input)
  input.focus()
  expect(container.classList.contains('is-pointer-focus')).toBe(true)
  fireEvent.blur(input)
  expect(container.classList.contains('is-pointer-focus')).toBe(false)
})
