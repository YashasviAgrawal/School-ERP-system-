'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { clamp } from '@/lib/anim'

/**
 * Scroll-scrubbed scenes without a library.
 * Reports how far the user has scrolled through a tall section (0 at its top,
 * 1 when its bottom reaches the bottom of the viewport). The value is eased
 * towards the scroll position each frame, which gives the soft "scrub" feel
 * while keeping native scrolling (important on Android and for accessibility).
 * onFrame should write styles straight to refs, never set React state.
 */
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  onFrame: (progress: number) => void,
  { enabled = true, smoothing = 0.14 }: { enabled?: boolean; smoothing?: number } = {},
) {
  const frame = useRef(onFrame)
  useEffect(() => {
    frame.current = onFrame
  })

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    let target = 0
    let current = Number.NaN
    let raf = 0

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      target = total > 0 ? clamp(-rect.top / total) : 0
    }

    const tick = () => {
      raf = 0
      if (Number.isNaN(current)) current = target
      else current += (target - current) * smoothing
      if (Math.abs(target - current) < 0.0004) current = target
      frame.current(current)
      if (current !== target) raf = requestAnimationFrame(tick)
    }

    const kick = () => {
      measure()
      if (!raf) raf = requestAnimationFrame(tick)
    }

    kick()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => {
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, enabled, smoothing])
}
