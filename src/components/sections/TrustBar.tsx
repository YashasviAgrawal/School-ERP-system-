'use client'

import { useEffect, useState } from 'react'
import { Pin, Shield } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { easeOut } from '@/lib/anim'
import { site, type Stat } from '@/lib/site'

/** Partner-school marquee (greyscale logos, colour on hover) and the headline numbers, right after the opening story. */
export function TrustBar() {
  const logos = site.partnerLogos
  const items = logos.length > 0 ? logos : Array.from({ length: 6 }, (_, i) => ({ name: `Partner school ${i + 1}`, src: '' }))
  const loop = [...items, ...items]

  return (
    <section data-theme="light" aria-labelledby="trust-title" className="relative bg-white pb-4 pt-16 md:pt-20">
      <div className="container-x">
        <p id="trust-title" className="text-center text-[13px] font-bold uppercase tracking-[.12em] text-muted">
          Schools across Rajasthan work with us
        </p>
      </div>
      <div className="marquee mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-5 md:gap-8">
          {loop.map((logo, i) => (
            <li key={i} aria-hidden={i >= items.length ? true : undefined} className="shrink-0">
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo.src} alt={logo.name} className="h-12 w-auto opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
              ) : (
                <div className="flex h-16 w-[200px] items-center justify-center gap-2.5 rounded-xl border border-dashed border-ink/25 text-[14px] font-semibold text-muted">
                  <Shield size={20} strokeWidth={1.7} />
                  School logo
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-14 md:mt-16">
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
            <dt className="text-[15px] text-brand-light">Local team, on your campus when it matters</dt>
            <dd className="m-0 flex items-center gap-2 font-display text-[clamp(2.25rem,3.6vw,3rem)] font-bold leading-none tracking-[-0.035em]">
              <Pin size={30} strokeWidth={2.2} className="text-brand-light" />
              {site.city}
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
