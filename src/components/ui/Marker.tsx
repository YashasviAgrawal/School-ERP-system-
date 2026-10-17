'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

/**
 * The student motif: a highlighter stroke that draws itself behind one key word.
 * Use on at most four headlines so it stays special.
 */
export function Marker({ children, immediate = false, color }: { children: ReactNode; immediate?: boolean; color?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ rootMargin: '0px 0px -18% 0px' })
  const style = color ? ({ '--marker': color } as CSSProperties) : undefined
  return (
    <span ref={ref} className="marker" data-shown={immediate || inView} data-immediate={immediate ? '' : undefined} style={style}>
      {children}
      <svg className="marker-svg" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M6 27 C 60 19, 118 25, 168 21 S 250 16, 294 23" pathLength={1} />
      </svg>
    </span>
  )
}
