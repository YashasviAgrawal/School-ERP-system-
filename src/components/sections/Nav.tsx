'use client'

import { useEffect, useRef, useState } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { Close, Menu } from '@/components/ui/Icons'
import { LogoMark } from '@/components/ui/Logo'
import { site } from '@/lib/site'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#erp', label: 'ERP' },
  { href: '#work', label: 'Work' },
]

/** Transparent at the top, frosted after 80px. Turns dark over navy sections. */
export function Nav() {
  const header = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      setScrolled(window.scrollY > 80)
      const hits = document.elementsFromPoint(window.innerWidth / 2, 36)
      const under = hits.find((el) => !header.current?.contains(el))
      const t = under?.closest('[data-theme]')?.getAttribute('data-theme')
      setTheme(t === 'dark' ? 'dark' : 'light')
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('navtheme', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('navtheme', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const dark = theme === 'dark'

  return (
    <header ref={header} className="nav fixed inset-x-0 top-0 z-50" data-scrolled={scrolled || open} data-theme={open ? 'light' : theme}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-beige">
        Skip to content
      </a>
      <nav aria-label="Main" className="container-x flex h-[72px] items-center justify-between gap-6">
        <AnchorLink href="#top" aria-label={`${site.name} home`} className="flex items-center gap-2.5" onNavigate={() => setOpen(false)}>
          <LogoMark tone={dark && !open ? 'light' : 'navy'} />
          <span className="font-display text-[19px] font-extrabold tracking-[-0.035em] md:text-[21px]">{site.name}</span>
        </AnchorLink>

        <div className="flex items-center gap-2 md:gap-9">
          <ul className="hidden items-center gap-9 text-[15px] font-medium lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <AnchorLink href={l.href} className="nav-link">
                  {l.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <AnchorLink
            href="#demo"
            className="nav-cta inline-flex h-11 items-center whitespace-nowrap rounded-full px-4 text-[14px] font-semibold transition-transform duration-300 hover:-translate-y-px active:scale-[.97] max-[359px]:hidden md:px-5 md:text-[15px]"
          >
            Book a demo
          </AnchorLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-x pb-6 lg:hidden">
          <ul className="flex flex-col divide-y divide-navy/10 border-t border-navy/10">
            {LINKS.map((l) => (
              <li key={l.href}>
                <AnchorLink href={l.href} className="block py-4 font-display text-[26px] font-bold tracking-[-0.02em]" onNavigate={() => setOpen(false)}>
                  {l.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
          <AnchorLink href="#demo" className="btn btn-primary mt-4 w-full" onNavigate={() => setOpen(false)}>
            Book a demo
          </AnchorLink>
        </div>
      )}
    </header>
  )
}
