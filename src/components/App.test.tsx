import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('renders the application landmark and heading', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'CoreTech' })).toBeTruthy()
})

it('collapses and expands the sidebar and preserves shelf labels', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
  expect(screen.getByRole('button', { name: 'Expand sidebar' }).getAttribute('aria-expanded')).toBe('false')
  expect(screen.queryByLabelText('Current warehouse')).toBeNull()
  expect(screen.getByLabelText('Graphic Cards A1')).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }))
  expect(screen.getByLabelText('Current warehouse')).toBeTruthy()
})

it('applies the sidebar breakpoint on load and when the viewport crosses it', () => {
  let onChange: ((event: MediaQueryListEvent) => void) | undefined
  const matchMedia = vi.fn().mockReturnValue({
    matches: true,
    addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => { onChange = listener },
    removeEventListener: vi.fn(),
  })
  vi.stubGlobal('matchMedia', matchMedia)
  render(<App />)
  expect(matchMedia).toHaveBeenCalledWith('(min-width: 1024px) and (width < 1200px)')
  expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Expand sidebar' }))
  expect(screen.getByLabelText('Current warehouse')).toBeTruthy()
  act(() => onChange!({ matches: false } as MediaQueryListEvent))
  act(() => onChange!({ matches: true } as MediaQueryListEvent))
  expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeTruthy()
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
