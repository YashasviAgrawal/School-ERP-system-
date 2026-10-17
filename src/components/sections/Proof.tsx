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
    <section data-theme="dark" aria-label="What principals say" className="bg-navy py-24 text-beige md:py-36">
      <div className="container-x max-w-[1120px]">
        <Reveal as="figure" className="m-0">
          <p className="eyebrow bg-sky/15 text-sky">In their words</p>
          <blockquote className="mt-8 font-display text-[clamp(1.9rem,3.7vw,3.3rem)] font-semibold leading-[1.12] tracking-[-0.028em]">
            <span aria-hidden="true" className="mr-1 text-sky">
              “
            </span>
            {t.quote ?? t.placeholder}
            <span aria-hidden="true" className="text-sky">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-9 flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-teal font-display text-[18px] font-bold">P</span>
            <span>
              <strong className="block text-[17px]">{t.name}</strong>
              <span className="text-[15px] text-sky">
                {t.role}, {t.school}
              </span>
            </span>
          </figcaption>
        </Reveal>

        <dl className="mt-20 grid gap-10 border-t border-sky/20 pt-12 md:mt-24 md:grid-cols-3">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="flex flex-col-reverse">
              <dt className="mt-3 text-[17px] text-beige/90">{s.label}</dt>
              <dd className="m-0 font-display text-[clamp(3.4rem,6vw,5.4rem)] font-extrabold leading-none tracking-[-0.05em] text-sky tabular-nums">
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
