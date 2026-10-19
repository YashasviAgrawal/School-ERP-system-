'use client'

import { useEffect, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { easeOut } from '@/lib/anim'
import { site, type Stat } from '@/lib/site'

export function Proof() {
  const t = site.testimonial
  return (
    <section data-theme="dark" aria-label="What principals say" className="section bg-brand text-white">
      <div className="container-x">
        <Reveal as="figure" className="m-0 max-w-[880px]">
          <p className="eyebrow bg-white/10 text-brand-light">In their words</p>
          {/* negative indent hangs the opening quote mark, so every line starts on the grid edge */}
          <blockquote className="mt-6 -indent-[calc(0.4em+0.25rem)] font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em]">
            <span aria-hidden="true" className="mr-1 text-brand-light">
              “
            </span>
            {t.quote ?? t.placeholder}
            <span aria-hidden="true" className="text-brand-light">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-mid font-display text-[17px] font-semibold">P</span>
            <span>
              <strong className="block text-[16px] font-semibold">{t.name}</strong>
              <span className="text-[15px] text-brand-light">
                {t.role}, {t.school}
              </span>
            </span>
          </figcaption>
        </Reveal>

        <dl className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex flex-col-reverse rounded-2xl bg-white/[.05] p-6 ring-1 ring-white/10 md:p-7">
              <dt className="mt-2 text-[15px] text-white/85">{s.label}</dt>
              <dd className="m-0 font-display text-[clamp(2.25rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-brand-light tabular-nums">
                <StatValue stat={s} />
              </dd>
            </Reveal>
          ))}
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
