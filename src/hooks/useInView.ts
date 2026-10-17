'use client'

import { useEffect, useRef, useState } from 'react'

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0,
}: { rootMargin?: string; threshold?: number } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView] as const
}
