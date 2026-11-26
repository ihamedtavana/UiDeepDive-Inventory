import { Fragment } from 'react'

export function wrapTokenPath(value: string) {
  return value.split('/').map((part, index) => <Fragment key={index}>{index > 0 && <>/<wbr /></>}{part}</Fragment>)
}
