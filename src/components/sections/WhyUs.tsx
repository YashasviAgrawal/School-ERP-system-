import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight, Check, Close } from '@/components/ui/Icons'
import { LogoMark } from '@/components/ui/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { site } from '@/lib/site'
import { cx } from '@/lib/cx'

/** [what the school gets, an ERP-only vendor, a marketing agency]. The last column is always us. */
const ROWS: [string, boolean, boolean][] = [
  ['School ERP for fees, attendance and timetables', true, false],
  ['Teacher and student apps', true, false],
  ['A school website that brings in enquiries', false, true],
  ['Google and social media admission campaigns', false, true],
  ['Teacher training at your school', false, false],
  ['One team and one WhatsApp number for all of it', false, false],
]

export function WhyUs() {
  return (
    <section data-theme="light" aria-labelledby="why-title" className="section bg-surface">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader
              id="why-title"
              label="Why us"
              title="One partner instead of three."
              description="Most schools juggle an ERP vendor, a web designer and an ad agency. We bring all of it under one roof, so nothing falls between the cracks."
            />
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <AnchorLink href="#demo" className="btn btn-primary">
              Book a demo
              <ArrowRight size={18} />
            </AnchorLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_2px_6px_rgb(30_43_64/.04),0_40px_80px_-48px_rgb(30_43_64/.35)] ring-1 ring-ink/[.08]">
            <table className="w-full border-separate border-spacing-0 text-left">
              <caption className="sr-only">What {site.name} offers compared with an ERP vendor and a marketing agency</caption>
              <thead>
                <tr>
                  <th scope="col" className="p-3 text-[12px] font-bold uppercase tracking-[.08em] text-muted sm:p-5">
                    What you get
                  </th>
                  <th scope="col" className="w-[19%] p-2 text-center text-[12.5px] font-semibold text-muted sm:p-5 sm:text-[14px]">
                    ERP vendor
                  </th>
                  <th scope="col" className="w-[19%] p-2 text-center text-[12.5px] font-semibold text-muted sm:p-5 sm:text-[14px]">
                    Agency
                  </th>
                  <th scope="col" className="w-[22%] bg-brand p-2 text-center text-[12.5px] font-semibold text-white sm:p-5 sm:text-[14px]">
                    <span className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
                      <LogoMark size={22} tone="dark" />
                      {site.name}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, vendor, agency]) => (
                  <tr key={label}>
                    <th scope="row" className="border-t border-ink/[.07] p-3 text-[14px] font-medium leading-[1.4] text-ink sm:p-5 sm:text-[15.5px]">
                      {label}
                    </th>
                    <Cell yes={vendor} />
                    <Cell yes={agency} />
                    <Cell yes highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Cell({ yes, highlight = false }: { yes: boolean; highlight?: boolean }) {
  return (
    <td className={cx('border-t p-2 text-center sm:p-5', highlight ? 'border-white/10 bg-brand' : 'border-ink/[.07]')}>
      <span
        className={cx(
          'mx-auto grid h-7 w-7 place-items-center rounded-full',
          highlight ? 'bg-white text-brand' : yes ? 'bg-brand-wash text-brand' : 'bg-ink/[.04] text-ink/35',
        )}
      >
        {yes ? <Check size={15} strokeWidth={3} /> : <Close size={13} strokeWidth={2.4} />}
        <span className="sr-only">{yes ? 'Yes' : 'No'}</span>
      </span>
    </td>
  )
}
