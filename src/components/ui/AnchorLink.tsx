'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; onNavigate?: () => void }

/**
 * In-page link that smooth-scrolls to the visible target. The desktop and mobile
 * versions of the opening story are different elements, so targets can be marked
 * with data-anchor="name" as well as an id; the visible one wins.
 */
export function AnchorLink({ href, onNavigate, onClick, children, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || !href.startsWith('#')) return
    const name = href.slice(1)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (name === 'top' || name === '') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      onNavigate?.()
      return
    }

    const candidates = [
      ...Array.from(document.querySelectorAll<HTMLElement>(`[data-anchor="${name}"]`)),
      document.getElementById(name),
    ].filter((el): el is HTMLElement => !!el)
    const target = candidates.find((el) => el.getClientRects().length > 0)
    if (!target) return

    e.preventDefault()
    const offset = target.dataset.anchorOffset ? Number(target.dataset.anchorOffset) : 80
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    history.replaceState(null, '', href)
    onNavigate?.()
  }

  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
