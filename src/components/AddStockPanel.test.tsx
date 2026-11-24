import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { App } from './App'
import { inventorySummary, readStockDeliveries, stockCount, UNDO_WINDOW, undoStockDelivery } from './stockInventory'

const stored = new Map<string, string>()
const write = vi.fn((key: string, value: string) => { stored.set(key, value) })

beforeEach(() => {
  stored.clear()
  vi.stubGlobal('localStorage', { getItem: (key: string) => stored.get(key) ?? null, setItem: write })
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('reduced-motion'), addEventListener() {}, removeEventListener() {} }))
  if (!HTMLDialogElement.prototype.showModal) {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value(this: HTMLDialogElement) { this.open = true } })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value(this: HTMLDialogElement) { this.open = false } })
  }
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function openProduct(name: string) {
  const row = screen.getByRole('row', { name: new RegExp(`${name}.*Add stock`) })
  const opener = within(row).getByRole('button', { name: 'Add stock' })
  opener.focus()
  fireEvent.click(opener)
  return { row, opener, dialog: within(screen.getByRole('dialog', { name: 'Add stock' })) }
}

it('adds Quick stock to the clicked product, blocks overflow and restores focus on close', async () => {
  render(<App />)
  const { row, opener, dialog } = openProduct('Ryzen 7 7800X3D')
  expect(dialog.getByRole('button', { name: 'Quick add' }).getAttribute('aria-pressed')).toBe('true')
  const quantity = dialog.getByRole<HTMLInputElement>('textbox', { name: 'Quantity to add' })
  fireEvent.change(quantity, { target: { value: '30' } })
  expect(dialog.getByRole('button', { name: 'Add 30 units' }).hasAttribute('disabled')).toBe(true)
  fireEvent.keyDown(quantity, { key: 'Enter' })
  expect(readStockDeliveries()).toEqual([])
  fireEvent.click(dialog.getByRole('button', { name: 'Set to 24' }))
  fireEvent.keyDown(quantity, { key: 'Enter' })
  await dialog.findByRole('heading', { name: '24 units added' })
  expect(readStockDeliveries()[0]).toMatchObject({ sku: 'CPU-0108', allocations: [{ bin: 'A2-L2-S4', quantity: 24 }] })
  expect(within(row).getByText('In Stock')).toBeTruthy()
  fireEvent.click(dialog.getByRole('button', { name: 'Done' }))
  expect(screen.queryByRole('dialog', { name: 'Add stock' })).toBeNull()
  expect(document.activeElement).toBe(opener)
})

it('reviews a split Detailed delivery, preserves the draft on a failed write and undoes both allocations', async () => {
  render(<App />)
  const { row, dialog } = openProduct('GeForce RTX 4070 Super')
  fireEvent.click(dialog.getByRole('button', { name: 'Detailed add' }))
  expect(dialog.getByRole('button', { name: 'Review' }).hasAttribute('disabled')).toBe(true)
  fireEvent.change(dialog.getByRole('textbox', { name: 'Quantity to add' }), { target: { value: '30' } })
  fireEvent.click(dialog.getByRole('button', { name: 'Split across bins' }))
  fireEvent.click(dialog.getByRole('button', { name: /A1-L2-S3, room for 24/ }))
  fireEvent.click(dialog.getByRole('button', { name: /A1-L1-S1, room for 15/ }))
  fireEvent.change(dialog.getByLabelText('Note'), { target: { value: 'Delivery checked' } })
  fireEvent.click(dialog.getByRole('button', { name: 'Review' }))
  expect(dialog.getByRole('heading', { name: 'Review and confirm' })).toBeTruthy()
  expect(dialog.getByText('Delivery checked')).toBeTruthy()
  expect(readStockDeliveries()).toEqual([])

  write.mockImplementationOnce(() => { throw Error('Cannot write') })
  fireEvent.click(dialog.getByRole('button', { name: 'Add 30 units' }))
  await dialog.findByRole('alert')
  expect(dialog.getByText('Delivery checked')).toBeTruthy()
  expect(readStockDeliveries()).toEqual([])
  fireEvent.click(dialog.getByRole('button', { name: 'Try again' }))
  await dialog.findByRole('heading', { name: '30 units added' })
  expect(readStockDeliveries()[0].allocations).toEqual([{ bin: 'A1-L2-S3', quantity: 24 }, { bin: 'A1-L1-S1', quantity: 6 }])
  expect(inventorySummary(readStockDeliveries(), 'New York Central').used).toBe(1264)
  const mixedBin = inventorySummary(readStockDeliveries(), 'New York Central', 'A1').bins.find(bin => bin.id === 'A1-L1-S1')!
  expect(mixedBin.used).toBe(15)
  expect(mixedBin.contents).toEqual([{ sku: 'GPU-0109', quantity: 9 }, { sku: 'GPU-0107', quantity: 6 }])
  expect(stockCount(readStockDeliveries(), 'GPU-0107', 'New York Central')).toBe(30)
  expect(stockCount(readStockDeliveries(), 'GPU-0109', 'New York Central')).toBe(9)
  expect(within(row).getByText('In Stock')).toBeTruthy()
  fireEvent.click(dialog.getByRole('button', { name: 'Undo' }))
  await waitFor(() => expect(within(row).getByText('Out Of Stock')).toBeTruthy())
  expect(readStockDeliveries()).toEqual([])
  expect(dialog.getByRole<HTMLInputElement>('textbox', { name: 'Quantity to add' }).value).toBe('30')
})

it('leaves an expired delivery in inventory', async () => {
  render(<App />)
  const { dialog } = openProduct('GeForce RTX 4070 Super')
  fireEvent.click(dialog.getByRole('button', { name: '+5' }))
  fireEvent.click(dialog.getByRole('button', { name: 'Add 5 units' }))
  await dialog.findByRole('heading', { name: '5 units added' })
  const [delivery] = readStockDeliveries()
  vi.spyOn(Date, 'now').mockReturnValue(delivery.savedAt + UNDO_WINDOW)
  expect(undoStockDelivery(delivery.id)).toBeNull()
  expect(readStockDeliveries()).toEqual([delivery])
})

it('preserves the quantity and detailed draft across mode switches and hides inactive controls', () => {
  render(<App />)
  const { dialog } = openProduct('GeForce RTX 4070 Super')
  const quantity = dialog.getByRole<HTMLInputElement>('textbox', { name: 'Quantity to add' })
  fireEvent.change(quantity, { target: { value: '7' } })
  fireEvent.click(dialog.getByRole('button', { name: 'Detailed add' }))
  fireEvent.change(dialog.getByLabelText('Note'), { target: { value: 'Counted and checked' } })
  fireEvent.click(dialog.getByRole('button', { name: /A1-L2-S3, room for 24/ }))
  fireEvent.click(dialog.getByRole('button', { name: 'Quick add' }))
  expect(dialog.getByRole('textbox', { name: 'Quantity to add' })).toBe(quantity)
  expect(quantity.value).toBe('7')
  expect(dialog.queryByRole('textbox', { name: 'Note' })).toBeNull()
  expect(dialog.getByLabelText('Note').closest('[inert]')?.getAttribute('aria-hidden')).toBe('true')
  fireEvent.click(dialog.getByRole('button', { name: 'Detailed add' }))
  expect(dialog.getByRole<HTMLTextAreaElement>('textbox', { name: 'Note' }).value).toBe('Counted and checked')
  expect(dialog.getByRole('button', { name: /A1-L2-S3, room for 24/ }).getAttribute('aria-pressed')).toBe('true')
  expect(quantity.value).toBe('7')
  expect(readStockDeliveries()).toEqual([])
})
