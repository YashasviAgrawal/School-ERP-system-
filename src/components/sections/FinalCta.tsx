import type { CSSProperties } from 'react'
import { Chat, Check } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { whatsappLink } from '@/lib/site'
import { DemoForm } from './DemoForm'

const IN_THE_DEMO = ['The ERP set up with your school’s name', 'Fees, attendance and timetables, start to finish', 'Ideas for your website and admission campaigns']

export function FinalCta() {
  return (
    <section id="demo" data-theme="light" aria-labelledby="demo-title" className="section relative bg-surface">
      <div className="container-x">
        <div data-theme="dark" className="relative overflow-hidden rounded-[28px] bg-brand-deep px-5 py-12 text-white sm:px-8 md:rounded-[36px] md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_20%_20%,#000,transparent_75%)]"
            style={{ '--grid-line': 'rgb(214 204 187 / .08)' } as CSSProperties}
          />
          <div aria-hidden="true" className="glow glow-drift" style={{ width: 520, height: 520, left: -160, top: -220, background: 'rgb(192 138 78 / .38)' }} />
          <div aria-hidden="true" className="glow" style={{ width: 420, height: 420, right: -120, bottom: -220, background: 'rgb(192 138 78 / .14)' }} />

          <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  tone="dark"
                  id="demo-title"
                  label="Book a demo"
                  title="See it with your school’s name on it."
                  description="Book a short demo. We’ll show you the ERP set up for your school, and how we’d grow your admissions."
                />
              </Reveal>
              <ul className="mt-8 space-y-3">
                {IN_THE_DEMO.map((p, i) => (
                  <Reveal as="li" key={p} delay={120 + i * 80} className="flex items-start gap-3 text-[16px] leading-[1.5] text-white/90">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-brand-deep">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {p}
                  </Reveal>
                ))}
              </ul>
              <p className="mt-9 flex flex-wrap items-center gap-x-2 text-[15px] text-brand-light">
                Prefer to talk now?
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 font-semibold text-white underline-offset-4 hover:underline">
                  <Chat size={17} />
                  Message us on WhatsApp
                </a>
              </p>
            </div>

            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <div data-theme="light" className="rounded-[24px] bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/.6)] md:p-8">
                <p className="font-display text-[21px] font-semibold tracking-[-0.015em]">Tell us about your school</p>
                <p className="mt-1 text-[14.5px] text-muted">We’ll message you on WhatsApp to fix a time that suits you.</p>
                <div className="mt-6">
                  <DemoForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
