import type { CSSProperties, ReactNode } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight, Chat, Mail, Pin } from '@/components/ui/Icons'
import { LogoMark } from '@/components/ui/Logo'
import { MODULES } from '@/lib/modules'
import { site, whatsappLink } from '@/lib/site'

const EXPLORE = [
  ['#erp', 'The ERP'],
  ['#modules', 'All modules'],
  ['#services', 'Marketing'],
  ['#work', 'Our work'],
  ['#faq', 'FAQ'],
  ['#demo', 'Book a demo'],
]

const link = 'inline-block py-1.5 underline-offset-4 transition-colors hover:text-white hover:underline'

export function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-brand-deep text-[15px] text-brand-light">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(#000,transparent_70%)]" style={{ '--grid-line': 'rgb(180 198 222 / .06)' } as CSSProperties} />

      <div className="container-x relative pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <LogoMark tone="light" />
              <span className="font-display text-[20px] font-bold tracking-[-0.02em]">{site.name}</span>
            </div>
            <p className="mt-5 max-w-[36ch] leading-[1.65]">School ERP, websites and admission marketing for schools across Rajasthan.</p>
            <AnchorLink href="#demo" className="btn btn-light mt-7">
              Book a demo
              <ArrowRight size={18} />
            </AnchorLink>
          </div>

          <Column title="ERP modules">
            {MODULES.slice(0, 6).map((m) => (
              <li key={m.title}>
                <AnchorLink href="#modules" className={link}>
                  {m.title}
                </AnchorLink>
              </li>
            ))}
          </Column>

          <Column title="Explore" nav>
            {EXPLORE.map(([href, label]) => (
              <li key={href}>
                <AnchorLink href={href} className={link}>
                  {label}
                </AnchorLink>
              </li>
            ))}
          </Column>

          <Column title="Contact">
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2.5`}>
                <Chat size={17} /> WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${link} inline-flex items-center gap-2.5`}>
                <Mail size={17} /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 py-1.5">
              <Pin size={17} className="mt-0.5 shrink-0" /> {site.address}
            </li>
          </Column>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-brand-light/15 pt-6 text-[14px]">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex gap-6">
            <a href="/privacy" className="underline-offset-4 hover:text-white hover:underline">
              Privacy policy
            </a>
            <span>Made in {site.city}</span>
          </span>
        </div>

        {/* oversized wordmark, cropped by the page edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-8 select-none whitespace-nowrap bg-[linear-gradient(180deg,rgb(180_198_222/.16),rgb(180_198_222/0)_85%)] bg-clip-text text-center font-display text-[13vw] font-bold leading-[.8] tracking-[-0.055em] text-transparent lg:text-[10rem]"
        >
          {site.name}
        </div>
      </div>
    </footer>
  )
}

function Column({ title, nav = false, children }: { title: string; nav?: boolean; children: ReactNode }) {
  const list = (
    <>
      <h3 className="text-[13px] font-bold uppercase tracking-[.1em] text-white">{title}</h3>
      <ul className="mt-4 space-y-0.5">{children}</ul>
    </>
  )
  return nav ? <nav aria-label="Footer">{list}</nav> : <div>{list}</div>
}
