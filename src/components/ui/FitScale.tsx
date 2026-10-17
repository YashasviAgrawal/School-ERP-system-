'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '@/lib/cx'

/**
 * Renders a fixed-size design (e.g. the 3D laptop) scaled to fit the available width,
 * reserving the right height so the layout below doesn't jump.
 */
export function FitScale({
  width,
  height,
  max = 1,
  className,
  children,
}: {
  width: number
  height: number
  max?: number
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(Math.min(max, el.clientWidth / width))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, max])

  const s = scale ?? 0.45
  return (
    <div
      ref={ref}
      className={cx('relative w-full', className)}
      style={scale === null ? { aspectRatio: `${width} / ${height}` } : { height: height * s }}
    >
      <div
        className="fit-inner absolute left-1/2 top-0 origin-top"
        data-ready={scale !== null}
        style={{ width, height, transform: `translateX(-50%) scale(${s})` }}
      >
        {children}
      </div>
    </div>
  )
}
