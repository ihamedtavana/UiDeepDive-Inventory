import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { App } from './App'

afterEach(cleanup)
it('applies a valid custom range, dismisses with Escape, and restores preset data', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Custom' }))
  const dialog = screen.getByRole('dialog', { name: 'Custom date range' })
  fireEvent.change(within(dialog).getByLabelText('Start date'), { target: { value: '2026-11-01' } })
  expect(within(dialog).getByRole('button', { name: 'Apply' }).hasAttribute('disabled')).toBe(true)
  fireEvent.change(within(dialog).getByLabelText('End date'), { target: { value: '2026-11-05' } })
  fireEvent.click(within(dialog).getByRole('button', { name: 'Apply' }))
  expect(screen.getByText('Nov 1, 2026 - Nov 5, 2026')).toBeTruthy()
  expect(screen.getByRole('status').textContent).toContain('No demo data')
  fireEvent.click(screen.getByRole('button', { name: 'Custom' }))
  fireEvent.keyDown(screen.getByRole('dialog', { name: 'Custom date range' }), { key: 'Escape' })
  expect(screen.queryByRole('dialog', { name: 'Custom date range' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '30 days' }))
  expect(screen.getByRole('heading', { name: 'Warehouse Overview' })).toBeTruthy()
})
it('searches and switches warehouses without presenting another warehouse’s data', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: /Switch Warehouse/ }))
  const dialog = screen.getByRole('dialog', { name: 'Switch warehouse' })
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Search warehouses' }), { target: { value: 'chicago' } })
  expect(within(dialog).queryByText('Dallas South')).toBeNull()
  fireEvent.click(within(dialog).getByRole('button', { name: /Chicago North/ }))
  expect(screen.getByRole('heading', { name: 'Chicago North' })).toBeTruthy()
  expect(screen.getByRole('status').textContent).toContain('No demo data')
  expect(screen.queryByRole('region', { name: 'Shelves' })).toBeNull()
})
