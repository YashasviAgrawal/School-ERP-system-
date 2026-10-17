'use client'

import { useEffect, useState } from 'react'
import { CLOSED_VIEW, ClosedLaptop, Laptop } from '@/components/devices/Laptop'
import { ErpScreens } from '@/components/devices/ErpScreens'
import { Phone, StudentAppGreenwood, TeacherAppAravali, TeacherAppSunrise } from '@/components/devices/Phone'
import { FitScale } from '@/components/ui/FitScale'
import { Check, Rupee } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { CalloutItem, CALLOUTS } from './Callouts'
import { HeroCopy, NotificationChip } from './HeroCopy'

/** The opening story as a normal scrolling flow: phones, tablets, reduced motion and no-JS. */
export function StoryFlow() {
  return (
    <div className="story-flow">
      <section data-theme="light" aria-label="Introduction" className="relative overflow-hidden pb-20 pt-[108px] md:pb-28 md:pt-[132px]">
        <div className="container-x grid items-center gap-14 md:grid-cols-[1.05fr_1fr]">
          <HeroCopy />
          <div className="relative py-8">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky" />
            <FitScale width={CLOSED_VIEW.w} height={CLOSED_VIEW.h} max={0.62}>
              <ClosedLaptop />
            </FitScale>
            <NotificationChip className="float-y absolute left-0 top-0 origin-top-left scale-[.86] md:scale-100" icon={<Rupee size={18} />} title="Fee received" sub="₹12,500 · Class 6A" />
            <NotificationChip
              className="float-y absolute bottom-0 right-0 origin-bottom-right scale-[.86] md:scale-100"
              style={{ animationDelay: '-3s' }}
              tone="navy"
              icon={<Check size={18} strokeWidth={2.4} />}
              title="Attendance marked"
              sub="Class 7B · 38 of 40"
            />
          </div>
        </div>
      </section>

      <section id="erp" data-anchor="erp" data-theme="dark" className="relative overflow-hidden bg-navy py-24 text-beige md:py-32">
        <div className="container-x">
          <Reveal className="max-w-[720px] md:mx-auto md:text-center">
            <p className="eyebrow bg-sky/15 text-sky">The ERP</p>
            <h2 className="h-section mt-5 text-beige">Your whole school. One screen.</h2>
            <p className="mt-5 text-[18px] text-sky md:mx-auto md:max-w-[46ch]">
              Fees, attendance, timetables and teachers, run from one place your office already understands.
            </p>
          </Reveal>
          <LaptopReveal />
          <ol className="mx-auto mt-6 grid max-w-[1000px] gap-3 md:grid-cols-3">
            {CALLOUTS.map((_, i) => (
              <Reveal as="li" key={i} delay={i * 90}>
                <CalloutItem as="div" index={i} active={i === 0} className="h-full" />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section data-theme="light" className="overflow-hidden bg-sky pb-10 pt-24 md:pt-32">
        <div className="container-x">
          <Reveal className="max-w-[640px] md:mx-auto md:text-center">
            <h2 className="h-section">In every teacher&apos;s pocket.</h2>
            <p className="mt-5 text-[18px] text-navy/80">Teacher and student apps, branded with your school&apos;s name.</p>
          </Reveal>
          <FitScale width={760} height={600} className="mt-12">
            <div className="relative h-full w-full">
              <Phone className="absolute left-[55px] top-[70px] z-[1]" style={{ rotate: '-11deg' }}>
                <TeacherAppSunrise />
              </Phone>
              <Phone className="absolute left-[455px] top-[70px] z-[2]" style={{ rotate: '11deg' }}>
                <TeacherAppAravali />
              </Phone>
              <Phone className="absolute left-[255px] top-[10px] z-[3]">
                <StudentAppGreenwood />
              </Phone>
            </div>
          </FitScale>
        </div>
      </section>
    </div>
  )
}

function LaptopReveal() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -30% 0px' })
  const [reduce, setReduce] = useState(false)
  useEffect(() => setReduce(prefersReducedMotion()), [])
  return (
    <div ref={ref} className="laptop-reveal mx-auto mt-14 max-w-[880px]" data-open={inView || reduce}>
      {/* open laptop at rx -15 measures about 872 x 720 on screen, starting 76px left and 34px above its box */}
      <FitScale width={872} height={724}>
        <div className="absolute left-[76px] top-[-34px]">
          <Laptop rx={-15} ry={0} lidClassName="lid-anim" powerClassName="power-anim" screen={<ErpScreens />} />
        </div>
      </FitScale>
    </div>
  )
}
