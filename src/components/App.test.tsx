import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { App } from './App'

afterEach(cleanup)

it('renders the application landmark and heading', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'CoreTech' })).toBeTruthy()
})

it('filters the example product table by SKU', () => {
  render(<App />)
  fireEvent.change(screen.getByRole('textbox', { name: 'Search products' }), { target: { value: 'MBD-0104' } })
  const table = screen.getByRole('heading', { name: 'Products' }).closest('section')!
  expect(within(table).getByText('PRO Z790-A')).toBeTruthy()
  expect(within(table).queryByText('Radeon RX 7900 XTX')).toBeNull()
})

it('filters recent movements by direction', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Outbound' }))
  expect(screen.getByText('990 Pro 1TB')).toBeTruthy()
  expect(screen.queryByText('Intel Core i7 14700K')).toBeNull()
})
