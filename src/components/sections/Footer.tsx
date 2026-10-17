import { AnchorLink } from '@/components/ui/AnchorLink'
import { Chat, Mail, Pin } from '@/components/ui/Icons'
import { LogoMark } from '@/components/ui/Logo'
import { site, whatsappLink } from '@/lib/site'

export function Footer() {
  return (
    <footer data-theme="dark" className="bg-navy pb-10 pt-20 text-[15px] text-sky">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-2.5 text-beige">
              <LogoMark tone="light" />
              <span className="font-display text-[21px] font-extrabold tracking-[-0.035em]">{site.name}</span>
            </div>
            <p className="mt-5 max-w-[34ch] leading-[1.6]">Websites, marketing and an ERP for schools across Rajasthan.</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="text-[15px] font-bold text-beige">Explore</h3>
            <ul className="mt-4 space-y-1">
              {[
                ['#services', 'Services'],
                ['#erp', 'ERP'],
                ['#work', 'Work'],
                ['#demo', 'Book a demo'],
              ].map(([href, label]) => (
                <li key={href}>
                  <AnchorLink href={href} className="inline-block py-1.5 underline-offset-4 hover:text-beige hover:underline">
                    {label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-[15px] font-bold text-beige">Contact</h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 py-1.5 underline-offset-4 hover:text-beige hover:underline">
                  <Chat size={17} /> WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 py-1.5 underline-offset-4 hover:text-beige hover:underline">
                  <Mail size={17} /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 py-1.5">
                <Pin size={17} className="mt-0.5 shrink-0" /> {site.address}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-3 border-t border-sky/20 pt-6 text-[14px]">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex gap-6">
            <a href="/privacy" className="underline-offset-4 hover:text-beige hover:underline">
              Privacy policy
            </a>
            <span>Made in {site.city}</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
