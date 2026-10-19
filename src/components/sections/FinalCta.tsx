import { ClosedLaptop } from '@/components/devices/Laptop'
import { Chat } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { whatsappLink } from '@/lib/site'
import { DemoForm } from './DemoForm'

export function FinalCta() {
  return (
    <section id="demo" data-theme="light" aria-labelledby="demo-title" className="section relative overflow-hidden bg-canvas">
      <div className="container-x grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader
              id="demo-title"
              label="Book a demo"
              title={
                <>
                  Let’s <Marker>grow</Marker> your school.
                </>
              }
              description="Book a short demo. We’ll show you the ERP with your school’s name on it."
            />
          </Reveal>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 text-[15px] text-muted">
            Prefer to talk now?
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 font-semibold text-ink underline-offset-4 hover:underline">
              <Chat size={17} />
              Message us on WhatsApp
            </a>
          </p>

          {/* the laptop from the opening scene, now closed and small */}
          <div aria-hidden="true" className="relative mt-10 hidden h-[178px] w-[229px] lg:block">
            <div className="absolute left-0 top-0 origin-top-left scale-[.25]">
              <ClosedLaptop />
            </div>
          </div>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <div className="rounded-[var(--radius-frame)] bg-white p-6 shadow-[0_2px_6px_rgb(14_37_78/.04),0_32px_64px_-40px_rgb(14_37_78/.4)] ring-1 ring-ink/[.08] md:p-8">
            <DemoForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
