import { Chat, Plus } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { site, whatsappLink } from '@/lib/site'

/** Native <details>, so it works without JavaScript; opening animates where the browser supports it. */
export function Faq() {
  return (
    <section id="faq" data-theme="light" aria-labelledby="faq-title" className="section bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeader id="faq-title" label="FAQ" title="Questions principals ask us." />
            </Reveal>
            <Reveal delay={100} className="mt-8 rounded-[20px] bg-canvas p-6">
              <p className="font-display text-[18px] font-semibold tracking-[-0.015em]">Still have a question?</p>
              <p className="mt-1.5 text-[15px] leading-[1.6] text-muted">Message us on WhatsApp. We’re a local team in {site.city}.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5">
                <Chat size={18} />
                WhatsApp us
              </a>
            </Reveal>
          </div>
        </div>

        <div className="faq lg:col-span-7 lg:col-start-6">
          {site.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="group border-b border-ink/10" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[17px] font-semibold leading-[1.35] tracking-[-0.015em] md:text-[19px]">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-canvas text-ink transition-[rotate,background-color,color] duration-500 ease-out-expo group-open:rotate-45 group-open:bg-brand group-open:text-white">
                    <Plus size={18} strokeWidth={2.2} />
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 pr-12 text-[15.5px] leading-[1.7] text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
