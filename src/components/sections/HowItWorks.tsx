'use client'

import type { CSSProperties } from 'react'
import { Check } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { cx } from '@/lib/cx'

const STEPS = [
  { title: 'Book a demo', line: 'See the ERP with your school’s name on it, and tell us what you need.' },
  { title: 'We set it up', line: 'Classes, fee structure, staff and apps, set up and branded for your school.' },
  { title: 'We train your team', line: 'Hands-on sessions at your school for the office and every teacher.' },
  { title: 'Go live and grow', line: 'Run the school from one screen while your website and campaigns bring in enquiries.' },
]

/** Four steps; a dashed path draws across them and each number pops in turn. */
export function HowItWorks() {
  const [ref, inView] = useInView<HTMLOListElement>({ rootMargin: '0px 0px -20% 0px' })
  return (
    <section data-theme="light" aria-labelledby="how-title" className="section bg-canvas">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            id="how-title"
            label="How it works"
            title="Live in four simple steps."
            description="We do the setup and the training. Your team just starts using it."
          />
        </Reveal>

        <ol ref={ref} data-shown={inView} className="relative mt-14 grid gap-10 text-center sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden="true" className="steps-line absolute left-[12.5%] right-[12.5%] top-7 hidden h-[2px] lg:block" />
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1
            return (
              <li key={s.title} className="relative flex flex-col items-center">
                <span
                  className={cx(
                    'step-num relative z-10 grid h-14 w-14 place-items-center rounded-full font-display text-[18px] font-bold shadow-[var(--shadow-tile)]',
                    last ? 'bg-brand text-white' : 'bg-white text-brand ring-1 ring-ink/10',
                  )}
                  style={{ '--step-delay': `${300 + i * 220}ms` } as CSSProperties}
                >
                  {last ? <Check size={22} strokeWidth={2.6} /> : `0${i + 1}`}
                </span>
                <h3 className="h-card mt-6">{s.title}</h3>
                <p className="mt-2 max-w-[30ch] text-[15px] leading-[1.6] text-muted">{s.line}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
