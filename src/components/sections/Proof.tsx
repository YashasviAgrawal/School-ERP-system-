import type { CSSProperties } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { site, type Testimonial } from '@/lib/site'

/** The first testimonial is the hero quote; any others sit in cards beneath it. */
export function Proof() {
  const [first, ...rest] = site.testimonials
  return (
    <section data-theme="dark" aria-labelledby="proof-title" className="section relative overflow-hidden bg-brand-deep text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent_75%)]" style={{ '--grid-line': 'rgb(214 204 187 / .07)' } as CSSProperties} />
      <div aria-hidden="true" className="glow glow-drift" style={{ width: 560, height: 560, left: '-12%', top: '-30%', background: 'rgb(192 138 78 / .28)' }} />

      <div className="container-x relative">
        <Reveal>
          <SectionHeader tone="dark" align="center" id="proof-title" label="In their words" title="Principals on working with us." />
        </Reveal>

        {first && (
          <Reveal as="figure" delay={100} className="mx-auto mb-0 mt-12 max-w-[960px] rounded-[28px] bg-white/[.05] p-7 ring-1 ring-white/10 backdrop-blur-sm md:mt-14 md:p-12">
            <span aria-hidden="true" className="block font-display text-[96px] font-bold leading-[.6] text-accent md:text-[120px]">
              “
            </span>
            <blockquote className="mt-4 font-display text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-[1.35] tracking-[-0.02em]">{first.quote ?? first.placeholder}</blockquote>
            <Caption t={first} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mx-auto mt-6 grid max-w-[960px] gap-6 md:grid-cols-2">
            {rest.map((t, i) => (
              <Reveal as="figure" key={t.name + i} delay={i * 90} className="m-0 rounded-[24px] bg-white/[.04] p-7 ring-1 ring-white/10">
                <blockquote className="text-[17px] leading-[1.6] text-white/90">“{t.quote ?? t.placeholder}”</blockquote>
                <Caption t={t} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Caption({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-8 flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#C08A4E,#8B5A24)] font-display text-[17px] font-semibold">
        {t.name.replace(/[^A-Za-z]/g, '').charAt(0) || 'P'}
      </span>
      <span>
        <strong className="block text-[16px] font-semibold">{t.name}</strong>
        <span className="text-[15px] text-brand-light">
          {t.role}, {t.school}
        </span>
      </span>
    </figcaption>
  )
}
