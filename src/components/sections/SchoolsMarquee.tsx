import { Shield } from '@/components/ui/Icons'
import { site } from '@/lib/site'

/** The only marquee on the page. Greyscale logos, colour on hover. */
export function SchoolsMarquee() {
  const logos = site.partnerLogos
  const items = logos.length > 0 ? logos : Array.from({ length: 6 }, (_, i) => ({ name: `Partner school ${i + 1}`, src: '' }))
  const loop = [...items, ...items]

  return (
    <section data-theme="light" aria-label="Schools we work with" className="marquee overflow-hidden border-y border-navy/10 py-10 md:py-12">
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-5 md:gap-8">
          {loop.map((logo, i) => (
            <li key={i} aria-hidden={i >= items.length ? true : undefined} className="shrink-0">
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo.src} alt={logo.name} className="h-12 w-auto opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
              ) : (
                <div className="flex h-[76px] w-[210px] items-center justify-center gap-2.5 rounded-[18px] border-[1.5px] border-dashed border-navy/25 text-[14px] font-semibold text-teal-ink">
                  <Shield size={20} strokeWidth={1.7} />
                  School logo
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
