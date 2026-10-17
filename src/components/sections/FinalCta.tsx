import { ClosedLaptop } from '@/components/devices/Laptop'
import { Chat } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
import { whatsappLink } from '@/lib/site'
import { DemoForm } from './DemoForm'

export function FinalCta() {
  return (
    <section id="demo" data-theme="light" aria-labelledby="demo-title" className="relative overflow-hidden pb-28 pt-24 md:pb-36 md:pt-32">
      <div className="container-x flex flex-col items-center text-center">
        {/* the laptop from the opening scene, now closed and small */}
        <div aria-hidden="true" className="relative h-[178px] w-[229px]">
          <div className="absolute left-0 top-0 origin-top-left scale-[.25]">
            <ClosedLaptop />
          </div>
        </div>

        <Reveal>
          <h2 id="demo-title" className="mt-6 font-display text-[clamp(3.6rem,9vw,8.2rem)] font-extrabold leading-[0.9] tracking-[-0.052em]">
            Let&apos;s <Marker>grow</Marker> your school.
          </h2>
          <p className="mx-auto mt-6 max-w-[36ch] text-[clamp(1.1rem,1.4vw,1.3rem)] leading-[1.5] text-teal-ink">Book a short demo. We&apos;ll show you the ERP with your school&apos;s name on it.</p>
        </Reveal>

        <Reveal className="mt-12 w-full max-w-[560px] text-left" delay={120}>
          <div className="relative rounded-[28px] bg-white p-6 shadow-[0_2px_6px_rgb(47_65_86/.05),0_36px_70px_-44px_rgb(47_65_86/.45)] ring-1 ring-navy/[.06] md:p-9">
            <DemoForm />
          </div>
        </Reveal>

        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 text-[16px] text-teal-ink">
          Prefer to talk now?
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 font-semibold text-navy underline-offset-4 hover:underline">
            <Chat size={17} />
            Message us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
