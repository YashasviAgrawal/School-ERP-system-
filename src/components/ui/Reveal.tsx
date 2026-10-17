'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cx } from '@/lib/cx'

type Tag = 'div' | 'li' | 'article' | 'figure' | 'p' | 'header'

/** Fades and lifts its content in once it scrolls into view. Content stays visible without JavaScript. */
export function Reveal({
  as = 'div',
  delay = 0,
  className,
  style,
  children,
  id,
}: {
  as?: Tag
  delay?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
  id?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const Comp = as as 'div'
  return (
    <Comp
      ref={ref}
      id={id}
      data-shown={inView}
      className={cx('reveal', className)}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Comp>
  )
}
