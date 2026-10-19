'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight, ChevronDown, Close, Login, Menu } from '@/components/ui/Icons'
import { LogoMark } from '@/components/ui/Logo'
import { MODULES, TONES } from '@/lib/modules'
import { site } from '@/lib/site'
import { cx } from '@/lib/cx'

const LINKS = [
  { href: '#erp', label: 'ERP' },
  { href: '#services', label: 'Marketing' },
  { href: '#work', label: 'Our work' },
  { href: '#faq', label: 'FAQ' },
]

/** Announcement strip on top, transparent menu that frosts after 80px, turns dark over navy sections. */
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
      // sample the middle of the menu row, below the announcement strip
      const y = (header.current?.offsetHeight ?? 72) - 36
      const hits = document.elementsFromPoint(window.innerWidth / 2, y)
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
  const a = site.announcement
  const folded = scrolled || open

  return (
    <header ref={header} className="nav fixed inset-x-0 top-0 z-50" data-scrolled={folded} data-theme={open ? 'light' : theme}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {a && (
        <div className="announce" inert={folded}>
          <div>
            <div className="bg-brand-deep text-white">
              <p className="container-x flex h-10 items-center justify-center gap-3 text-[13px] md:text-[14px]">
                <span className="hidden shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold tracking-[.04em] sm:inline">{a.tag}</span>
                <span className="truncate text-white/80">{a.text}</span>
                <AnchorLink href={a.href} className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-4 hover:underline">
                  {a.cta}
                  <ArrowRight size={14} />
                </AnchorLink>
              </p>
            </div>
          </div>
        </div>
      )}

      <nav aria-label="Main" className="container-x relative flex h-[72px] items-center justify-between gap-6">
        <AnchorLink href="#top" aria-label={`${site.name} home`} className="flex items-center gap-2.5" onNavigate={() => setOpen(false)}>
          <LogoMark tone={dark && !open ? 'light' : 'brand'} />
          <span className="font-display text-[18px] font-bold tracking-[-0.02em] md:text-[20px]">{site.name}</span>
        </AnchorLink>

        <ul className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          <li>
            <ModulesMenu />
          </li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <AnchorLink href={l.href} className="nav-link">
                {l.label}
              </AnchorLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          {site.loginUrl && (
            <a href={site.loginUrl} className="nav-link hidden items-center gap-1.5 text-[15px] font-medium lg:inline-flex">
              <Login size={17} />
              Login
            </a>
          )}
          <AnchorLink
            href="#demo"
            className="nav-cta inline-flex h-10 items-center whitespace-nowrap rounded-[var(--radius-control)] px-4 text-[14px] font-semibold transition-transform duration-300 hover:-translate-y-px active:scale-[.97] max-[359px]:hidden md:h-11 md:px-5 md:text-[15px]"
          >
            Book a demo
          </AnchorLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[var(--radius-control)] lg:hidden"
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
        <div id="mobile-menu" className="container-x max-h-[calc(100svh-72px)] overflow-y-auto pb-6 lg:hidden">
          <ul className="flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {[{ href: '#modules', label: 'Modules' }, ...LINKS].map((l) => (
              <li key={l.href}>
                <AnchorLink href={l.href} className="flex items-center justify-between py-4 font-display text-[22px] font-semibold tracking-[-0.02em]" onNavigate={() => setOpen(false)}>
                  {l.label}
                  <ArrowRight size={18} className="text-muted" />
                </AnchorLink>
              </li>
            ))}
            {site.loginUrl && (
              <li>
                <a href={site.loginUrl} className="flex items-center gap-2 py-4 font-display text-[22px] font-semibold tracking-[-0.02em]">
                  <Login size={20} />
                  Login
                </a>
              </li>
            )}
          </ul>
          <AnchorLink href="#demo" className="btn btn-primary mt-4 w-full" onNavigate={() => setOpen(false)}>
            Book a demo
          </AnchorLink>
        </div>
      )}
    </header>
  )
}

/** Desktop "Modules" dropdown: every ERP module, plus a demo card. Opens on hover, click or keyboard. */
function ModulesMenu() {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const timer = useRef(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const show = () => {
    window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 140)
  }
  const close = () => setOpen(false)

  return (
    <div
      ref={wrap}
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hide()}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) close()
      }}
    >
      <button ref={button} type="button" className="nav-link inline-flex items-center gap-1" aria-expanded={open} aria-controls="modules-menu" onClick={() => setOpen((v) => !v)}>
        Modules
        <ChevronDown size={16} className={cx('transition-transform duration-300', open && 'rotate-180')} />
      </button>

      <div id="modules-menu" className="mega absolute inset-x-0 top-full -mt-3 px-5 pt-3 md:px-10" data-open={open}>
        <div className="mega-panel mx-auto grid max-w-[980px] grid-cols-[1fr_270px] gap-2 rounded-[22px] bg-white p-2 text-ink shadow-[0_2px_6px_rgb(6_21_52/.06),0_40px_80px_-30px_rgb(6_21_52/.45)] ring-1 ring-ink/[.08]">
          <div className="p-4">
            <p className="px-2 text-[12px] font-bold uppercase tracking-[.1em] text-muted">ERP modules</p>
            <ul className="mt-3 grid grid-cols-3 gap-1">
              {MODULES.map((m) => (
                <li key={m.title}>
                  <AnchorLink href="#modules" onNavigate={close} className="mega-item flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-canvas">
                    <span className="mega-icon grid h-9 w-9 shrink-0 place-items-center rounded-[10px]" style={{ background: TONES[m.tone].bg, color: TONES[m.tone].fg }}>
                      <m.icon size={18} />
                    </span>
                    <span className="text-[14px] font-semibold leading-tight">{m.title}</span>
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[16px] bg-brand-deep p-6 text-white">
            <div aria-hidden="true" className="bg-grid absolute inset-0" style={{ '--grid-line': 'rgb(180 198 222 / .08)' } as CSSProperties} />
            <div aria-hidden="true" className="glow" style={{ width: 220, height: 220, right: -80, top: -80, background: 'rgb(47 107 255 / .45)' }} />
            <div className="relative">
              <p className="text-[12px] font-bold uppercase tracking-[.1em] text-brand-light">See it live</p>
              <p className="mt-3 font-display text-[20px] font-semibold leading-[1.25] tracking-[-0.015em]">The whole ERP, with your school’s name on it.</p>
            </div>
            <AnchorLink href="#demo" onNavigate={close} className="btn btn-light relative mt-8 h-11 w-full text-[14px]">
              Book a demo
              <ArrowRight size={16} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </div>
  )
}
