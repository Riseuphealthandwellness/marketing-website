import type {SVGProps} from 'react'
import logoMarkUrl from './static/riseup-studio-icon.png'

export function StudioIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <image height="48" href={logoMarkUrl} preserveAspectRatio="xMidYMid meet" width="48" />
    </svg>
  )
}
