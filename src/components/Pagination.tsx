import { Fragment, useRef } from 'react'
import { Button } from './Button'

type Props = {
  label: string
  page: number
  pageCount: number
  pages: readonly number[]
  onPageChange?: (page: number) => void
}

export function Pagination({ label, page, pageCount, pages, onPageChange }: Props) {
  const firstPageButton = useRef<HTMLButtonElement>(null)
  const lastPageButton = useRef<HTMLButtonElement>(null)

  const renderArrow = (direction: 'Previous' | 'Next', target: number, isDisabled: boolean) =>
    <Button isIconOnly appearance="ghost" disabled={isDisabled} aria-label={`${direction} page`}
      onClick={event => {
        if (event.detail === 0) {
          if (target === 1) firstPageButton.current?.focus({ preventScroll: true })
          if (target === pageCount) lastPageButton.current?.focus({ preventScroll: true })
        }
        onPageChange?.(target)
      }}>
      <span className={`pagination-chevron${direction === 'Previous' ? ' pagination-chevron--previous' : ''}`} aria-hidden="true" />
    </Button>

  return <nav className="pagination" aria-label={label}>
    {renderArrow('Previous', page - 1, page <= 1)}
    {pages.map((number, index) => <Fragment key={number}>
      {index > 0 && number - pages[index - 1] > 1 && <span className="pagination-ellipsis" aria-hidden="true">…</span>}
      <Button ref={number === 1 ? firstPageButton : number === pageCount ? lastPageButton : undefined}
        appearance={page === number ? 'filled' : 'ghost'} aria-label={`Page ${number}`}
        aria-current={page === number ? 'page' : undefined} onClick={() => onPageChange?.(number)}>
        {number}
      </Button>
    </Fragment>)}
    {renderArrow('Next', page + 1, page >= pageCount)}
  </nav>
}
