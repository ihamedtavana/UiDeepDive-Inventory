import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Button } from './Button'
import { DesignSystemSidebar, type FoundationPage } from './DesignSystemSidebar'
import logo from '../assets/design-system/logo.svg'
import search from '../assets/design-system/search.svg'

const desktopQuery = '(min-width: 1280px)'
const isDesktopViewport = () => window.matchMedia(desktopQuery).matches
function subscribeViewport(onChange: () => void) {
  const media = window.matchMedia(desktopQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function keepTabFocusInDrawer(event: ReactKeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return
  const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button, input')]
    .filter(control => control.tabIndex >= 0 && !control.matches(':disabled') && control.getClientRects().length > 0)
  const first = controls[0]
  const last = controls.at(-1)
  const active = document.activeElement
  const destination = event.shiftKey && active === first ? last
    : !event.shiftKey && active === last ? first
    : undefined
  if (destination) {
    event.preventDefault()
    destination.focus()
  }
}

export function DesignSystemNavigation({ page = 'Color' }: { page?: FoundationPage }) {
  const isDesktop = useSyncExternalStore(subscribeViewport, isDesktopViewport)
  const [isOpen, setIsOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const searchInput = useRef<HTMLInputElement>(null)

  function close() {
    dialog.current?.close()
    setIsOpen(false)
    returnFocus.current?.focus({ preventScroll: true })
  }

  function open(target: 'page' | 'search', trigger?: HTMLElement) {
    const drawer = dialog.current
    if (!drawer) return
    if (!drawer.open) {
      returnFocus.current = trigger ?? menuTrigger.current
      drawer.showModal()
      setIsOpen(true)
    }
    const activeItem = drawer.querySelector<HTMLElement>('[aria-current="page"]')
    const destination = target === 'search' ? searchInput.current : activeItem ?? searchInput.current
    destination?.focus()
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey) {
        document.documentElement.dataset.focusMode = 'keyboard'
      }
    }
    const handlePointerDown = () => { delete document.documentElement.dataset.focusMode }
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      delete document.documentElement.dataset.focusMode
    }
  }, [])

  useEffect(() => {
    if (isDesktop) setIsOpen(false)
  }, [isDesktop])

  useEffect(() => {
    if (isDesktop || !isOpen) return
    document.documentElement.classList.add('docs-drawer-open')
    return () => document.documentElement.classList.remove('docs-drawer-open')
  }, [isDesktop, isOpen])

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      if (isDesktop) {
        const input = searchInput.current
        if (input) input.focus()
        else document.querySelector<HTMLButtonElement>('.docs-sidebar .search--collapsed')?.click()
      } else {
        open('search', document.activeElement instanceof HTMLElement && document.activeElement !== document.body ? document.activeElement : undefined)
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [isDesktop])

  if (isDesktop) return <DesignSystemSidebar mode="static" page={page} searchInput={searchInput} onClose={close} />

  return <>
    <header className="docs-topbar" aria-label="Design system controls">
      <Button ref={menuTrigger} appearance="ghost" size="medium" isIconOnly aria-label="Open navigation"
        aria-expanded={isOpen} aria-controls="docs-nav" onClick={event => open('page', event.currentTarget)}>
        <span className="docs-menu-glyph" aria-hidden="true" />
      </Button>
      <div className="brand docs-topbar-brand"><img src={logo} alt="" /><strong>CoreTech</strong></div>
      <Button appearance="ghost" size="medium" isIconOnly aria-label="Search docs"
        aria-expanded={isOpen} aria-controls="docs-nav" onClick={event => open('search', event.currentTarget)}>
        <img src={search} alt="" />
      </Button>
    </header>
    <dialog ref={dialog} className="docs-drawer" aria-label="Design system navigation"
      onKeyDown={keepTabFocusInDrawer}
      onCancel={event => { event.preventDefault(); close() }}
      onClick={event => { if (event.target === event.currentTarget) close() }}>
      <DesignSystemSidebar mode="drawer" page={page} searchInput={searchInput} onClose={close} />
    </dialog>
  </>
}
