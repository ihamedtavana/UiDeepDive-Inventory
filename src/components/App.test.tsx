import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { App } from './App'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('independently collapses and expands each section with a chevron', () => {
  render(<App />)
  for (const name of ['Warehouse Overview', 'Inventory movement', 'Shipments On Road']) {
    const button = screen.getByRole('button', { name: `Collapse ${name}` })
    const content = document.getElementById(button.getAttribute('aria-controls')!)!
    expect(content.hidden).toBe(false)
    fireEvent.click(button)
    expect(content.hidden).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(screen.getByRole('button', { name: `Expand ${name}` }))
    expect(content.hidden).toBe(false)
    expect(button.getAttribute('aria-expanded')).toBe('true')
  }
})

it('renders the application landmark and heading', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'CoreTech' })).toBeTruthy()
})

it('collapses and restores the chart and recent movements together', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Collapse Inventory movement' })
  const content = document.getElementById(button.getAttribute('aria-controls')!)!
  expect(within(content).getByRole('heading', { name: 'Recent stock movements' })).toBeTruthy()
  fireEvent.click(button)
  expect(content.hidden).toBe(true)
  expect(screen.queryByRole('heading', { name: 'Recent stock movements' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: 'Expand Inventory movement' }))
  expect(screen.getByRole('heading', { name: 'Recent stock movements' })).toBeTruthy()
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

it('filters products by stock, combines search, and resets pagination', () => {
  render(<App />)
  const section = screen.getByRole('heading', { name: 'Products' }).closest('section')!
  const products = within(section)
  expect(products.getByText('Showing 1–5 of 15 products')).toBeTruthy()
  fireEvent.click(products.getByRole('button', { name: 'Next page' }))
  expect(products.getByText('Showing 6–10 of 15 products')).toBeTruthy()
  fireEvent.click(products.getByRole('button', { name: 'Low · 5' }))
  expect(products.getByText('Showing 1–5 of 5 products')).toBeTruthy()
  expect(products.getAllByText('Low Stock')).toHaveLength(5)
  fireEvent.click(products.getByRole('button', { name: 'Out · 5' }))
  expect(products.getAllByText('Out Of Stock')).toHaveLength(5)
  expect(products.getAllByText('Inactive')).toHaveLength(5)
  expect(products.queryByText('Active')).toBeNull()
  fireEvent.change(products.getByRole('textbox', { name: 'Search products' }), { target: { value: 'RAM-0112' } })
  expect(products.getByText('Corsair Vengeance RGB DDR5 64GB')).toBeTruthy()
  expect(products.getByText('Showing 1–1 of 1 products')).toBeTruthy()
  fireEvent.click(products.getByRole('button', { name: 'In Stock · 5' }))
  expect(products.getByText('No matching products')).toBeTruthy()
})

it('filters recent movements by direction', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: 'Outbound' }))
  expect(screen.getByText('990 Pro 1TB')).toBeTruthy()
  expect(screen.queryByText('Intel Core i7 14700K')).toBeNull()
})

it('shows each month’s chart details on focus and dismisses them with Escape', () => {
  render(<App />)
  const june = screen.getByRole('group', { name: '7–11: 390 incoming, 380 outbound' })
  expect(document.querySelector('.chart-bar.active')).toBeNull()
  fireEvent.focus(june)
  const tooltip = document.getElementById(june.getAttribute('aria-describedby')!)!
  expect(tooltip.textContent).toContain('Oct 7–11, 2026')
  expect(tooltip.textContent).toContain('390')
  expect(tooltip.textContent).toContain('380')
  fireEvent.keyDown(june, { key: 'Escape' })
  expect(june.classList.contains('is-tooltip-dismissed')).toBe(true)
  fireEvent.mouseEnter(june)
  expect(june.classList.contains('is-tooltip-dismissed')).toBe(false)
})


it('updates the selected period and keeps warehouse data unchanged', () => {
  render(<App />)
  const warehouse = screen.getByRole('heading', { name: 'Warehouse Overview' }).closest('section')!
  const original = warehouse.textContent
  for (const [period, range, total] of [['Today', 'Oct 31', '222'], ['7 days', 'Oct 25 - Oct 31', '1,100'], ['90 days', 'Aug 3 - Oct 31', '13,450'], ['30 days', 'Oct 2 - Oct 31', '4,780']]) {
    fireEvent.click(screen.getByRole('button', { name: period }))
    expect(screen.getByRole('button', { name: period }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText(range)).toBeTruthy()
    expect(screen.getByText(total)).toBeTruthy()
    expect(warehouse.textContent).toBe(original)
  }
})


it('shows recent movements within the selected range and preserves direction filters', () => {
  render(<App />)
  const section = screen.getByRole('heading', { name: 'Recent stock movements' }).closest('section')!
  const rows = () => within(section).getAllByRole('row').slice(1)
  fireEvent.click(screen.getByRole('button', { name: 'Today' }))
  expect(rows()).toHaveLength(3)
  expect(rows().every(row => row.textContent?.includes('31 Oct 2026'))).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: '90 days' }))
  expect(rows()).toHaveLength(5)
  fireEvent.click(within(section).getByRole('button', { name: 'Inbound' }))
  expect(rows()).toHaveLength(3)
  expect(rows().every(row => row.textContent?.includes('Inbound'))).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: 'Today' }))
  expect(rows()).toHaveLength(2)
})


it('shows a mix of stock statuses on the first All products page', () => {
  render(<App />)
  const section = screen.getByRole('heading', { name: 'Products' }).closest('section')!
  expect(within(section).getAllByText('In Stock').length).toBeGreaterThan(0)
  expect(within(section).getAllByText('Low Stock').length).toBeGreaterThan(0)
  expect(within(section).getAllByText('Out Of Stock').length).toBeGreaterThan(0)
})

it('shows shelf status badges and marks Cooling Systems as out of stock', () => {
  render(<App />)
  const overview = screen.getByRole('heading', { name: 'Warehouse Overview' }).closest('section')!
  const motherboards = within(overview).getByText('Motherboards').closest('.shelf-card')!
  const cooling = within(overview).getByText('Cooling Systems').closest('.shelf-card')!
  expect(within(motherboards).getByText('Low Stock').closest('.card-title')).toBeTruthy()
  expect(within(cooling).getByText('Out Of Stock').closest('.card-title')).toBeTruthy()
  expect(within(cooling).getByText('0')).toBeTruthy()
})
