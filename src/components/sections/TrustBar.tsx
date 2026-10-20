'use client'

import { useEffect, useState } from 'react'
import { Pin } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { easeOut } from '@/lib/anim'
import { site, type Stat } from '@/lib/site'

/** The headline numbers, right after the opening story. */
export function TrustBar() {
  return (
    <section data-theme="light" aria-label="Our numbers" className="relative bg-surface pb-4 pt-16 md:pt-20">
      <div className="container-x">
        <dl className="grid gap-px overflow-hidden rounded-[24px] bg-ink/[.08] ring-1 ring-ink/[.08] sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="flex flex-col-reverse gap-2 bg-canvas p-6 md:p-8">
              <dt className="text-[15px] text-muted">{s.label}</dt>
              <dd className="m-0 font-display text-[clamp(2.25rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.035em] text-brand tabular-nums">
                <StatValue stat={s} />
              </dd>
            </Reveal>
          ))}
          <Reveal delay={site.stats.length * 90} className="flex flex-col-reverse gap-2 bg-brand p-6 text-white md:p-8">
            <dt className="text-[15px] text-brand-light">Serving schools across India</dt>
            <dd className="m-0 flex items-center gap-2 font-display text-[clamp(2.25rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.035em]">
              <Pin size={30} strokeWidth={2.2} className="text-brand-light" />
              Pan India
            </dd>
          </Reveal>
        </dl>
      </div>
    </section>
  )
}

function StatValue({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const [n, setN] = useState(0)
  const target = stat.value

  useEffect(() => {
    if (!inView || target === null) return
    if (prefersReducedMotion()) {
      setN(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800)
      setN(Math.round(target * easeOut(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  if (target === null) return <span ref={ref}>{stat.placeholder}</span>
  return (
    <span ref={ref}>
      {stat.prefix}
      {n.toLocaleString('en-IN')}
      {stat.suffix}
    </span>
  )
}
