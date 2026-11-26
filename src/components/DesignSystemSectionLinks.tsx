import { useEffect, useRef, useState } from 'react'
import { Tab } from './Tab'
import { TabButton } from './TabButton'

type Props = { sections: readonly (readonly [label: string, id: string])[]; label: string }

export function DesignSystemSectionLinks({ sections, label }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const getHash = () => window.location.hash.slice(1)
  const [activeSection, setActiveSection] = useState(getHash)

  useEffect(() => {
    const targets = sections.flatMap(([, id]) => {
      const element = document.getElementById(id)
      return element ? [element] : []
    })
    const reverseTargets = [...targets].reverse()
    let observer: IntersectionObserver | undefined
    function observe() {
      observer?.disconnect()
      const topbar = document.querySelector<HTMLElement>('.docs-topbar')
      const offset = topbar && getComputedStyle(topbar).position === 'sticky' ? topbar.offsetHeight : 0
      const marker = offset + Math.round(window.innerHeight * .18)
      const bottom = Math.max(0, window.innerHeight - marker - 1)
      const updatePosition = () => {
        const current = reverseTargets.find(target => target.getBoundingClientRect().top <= marker)
        setActiveSection(current?.id ?? sections[0][1])
      }
      observer = new IntersectionObserver(updatePosition, { rootMargin: `-${marker}px 0px -${bottom}px 0px` })
      targets.forEach(target => observer?.observe(target))
    }
    function syncHash() {
      const id = getHash()
      if (targets.some(target => target.id === id)) setActiveSection(id)
    }
    if (getHash()) document.getElementById(getHash())?.scrollIntoView({ behavior: 'instant' })
    observe()
    window.addEventListener('resize', observe)
    window.addEventListener('hashchange', syncHash)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', observe)
      window.removeEventListener('hashchange', syncHash)
    }
  }, [sections])

  useEffect(() => {
    const element = scroller.current
    if (!element) return
    function updateFade() {
      if (element) element.dataset.hasMore = String(element.scrollWidth - element.scrollLeft - element.clientWidth > 1)
    }
    const resize = new ResizeObserver(updateFade)
    resize.observe(element)
    if (element.firstElementChild) resize.observe(element.firstElementChild)
    element.addEventListener('scroll', updateFade, { passive: true })
    updateFade()
    return () => { resize.disconnect(); element.removeEventListener('scroll', updateFade) }
  }, [])

  useEffect(() => {
    const element = scroller.current
    const activeLink = element?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!element || !activeLink) return
    const viewport = element.getBoundingClientRect()
    const link = activeLink.getBoundingClientRect()
    const fadeWidth = element.dataset.hasMore === 'true' ? parseFloat(getComputedStyle(element).getPropertyValue('--semantic-spacing-gap-2xl')) : 0
    const rightEdge = viewport.right - (Number.isFinite(fadeWidth) ? fadeWidth : 0)
    if (link.left < viewport.left) element.scrollLeft += link.left - viewport.left
    else if (link.right > rightEdge) element.scrollLeft += link.right - rightEdge
  }, [activeSection])

  return <nav className="docs-section-links" aria-label={label}>
    <div className="docs-tabs-scroller" ref={scroller}>
      <div className="date-controls">
        <Tab label={label}>
          {sections.map(([title, id], index) => <TabButton key={id} href={`#${id}`}
            isSelected={activeSection === id || (!activeSection && index === 0)}>{title}</TabButton>)}
        </Tab>
      </div>
    </div>
  </nav>
}
