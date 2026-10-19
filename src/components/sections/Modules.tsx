'use client'

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { DashboardScreen, FeesScreen } from '@/components/devices/ErpScreens'
import { Phone, StudentAppGreenwood, TeacherAppSunrise } from '@/components/devices/Phone'
import { NotificationChip } from '@/components/story/HeroCopy'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { FitScale } from '@/components/ui/FitScale'
import { ArrowRight, Bell, Chart, Check, Rupee } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { MODULES, TONES, type ErpModule } from '@/lib/modules'
import { cx } from '@/lib/cx'

type Visual = 'dashboard' | 'fees' | 'teacher' | 'student'

const ROLES: { id: string; label: string; title: string; points: string[]; visual: Visual }[] = [
  {
    id: 'principal',
    label: 'Principal',
    title: 'See the whole school before 9 AM.',
    points: ['Students, staff, fees and attendance on one dashboard', 'Announcements to every parent in seconds', 'Spot the classes and dues that need attention'],
    visual: 'dashboard',
  },
  {
    id: 'office',
    label: 'Office & accounts',
    title: 'Fees collected, not chased.',
    points: ['Collect fees and print receipts in a click', 'Dues by class, section and student', 'Reminders go to parents with pending fees'],
    visual: 'fees',
  },
  {
    id: 'teacher',
    label: 'Teachers',
    title: 'Less register work. More teaching.',
    points: ['Mark attendance in one tap, on the phone', 'Timetable and substitutions, always up to date', 'Homework and diary notes to the whole class'],
    visual: 'teacher',
  },
  {
    id: 'parent',
    label: 'Parents & students',
    title: 'Everything about their child, in one app.',
    points: ['Fees due, and pay online', 'Attendance, homework and exam dates', 'School notices, in your school’s name'],
    visual: 'student',
  },
]

const AUTOPLAY_MS = 7000

export function Modules() {
  return (
    <section id="modules" data-theme="light" aria-labelledby="modules-title" className="section relative overflow-hidden bg-canvas">
      <div aria-hidden="true" className="bg-grid absolute inset-x-0 top-0 h-[520px] [mask-image:linear-gradient(#000,transparent)]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeader
            align="center"
            id="modules-title"
            label="The ERP"
            title="Built for everyone on campus."
            description="The principal, the office, every teacher and every family see exactly what they need, from the same live data."
          />
        </Reveal>

        <RoleTabs />

        <div className="mt-20 md:mt-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[560px]">
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.125rem)] font-semibold leading-[1.15] tracking-[-0.025em]">Every module your school runs on.</h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-muted">Twelve modules that share one set of data, so nothing is entered twice.</p>
            </div>
            <AnchorLink href="#demo" className="btn btn-ghost">
              See them in a demo
              <ArrowRight size={18} />
            </AnchorLink>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m, i) => (
              <Reveal as="li" key={m.title} delay={(i % 4) * 70}>
                <ModuleCard m={m} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ModuleCard({ m }: { m: ErpModule }) {
  const t = TONES[m.tone]
  return (
    <article className="module-card tile h-full p-5 md:p-6" style={{ '--tone': t.fg, '--tone-soft': t.bg } as CSSProperties}>
      <span className="module-icon grid h-11 w-11 place-items-center rounded-xl">
        <m.icon size={22} />
      </span>
      <h4 className="mt-5 font-display text-[17px] font-semibold tracking-[-0.015em]">{m.title}</h4>
      <p className="mt-1.5 text-[14.5px] leading-[1.55] text-muted">{m.line}</p>
    </article>
  )
}

/**
 * Accessible tabs that advance on their own while on screen, with a fill sweeping
 * across the active tab as a timer. Any click or key press hands control to the visitor.
 */
function RoleTabs() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  // off until mounted, so reduced-motion visitors never get a self-advancing panel
  useEffect(() => setAuto(!prefersReducedMotion()), [])

  useEffect(() => {
    const el = box.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const select = (i: number, focus = false) => {
    setActive(i)
    setAuto(false)
    if (focus) tabs.current[i]?.focus()
  }

  const onKey = (e: KeyboardEvent) => {
    const last = ROLES.length - 1
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next, true)
  }

  const running = auto && visible && !hover

  return (
    <div ref={box} className="mt-12 md:mt-14" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <div className="flex justify-center">
        <div role="tablist" aria-label="Who it is for" onKeyDown={onKey} className="grid w-full grid-cols-2 gap-1 rounded-[26px] bg-white p-1.5 shadow-[var(--shadow-tile)] ring-1 ring-ink/[.08] sm:flex sm:w-auto sm:rounded-full">
          {ROLES.map((r, i) => {
            const selected = i === active
            return (
              <button
                key={r.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`role-tab-${r.id}`}
                aria-selected={selected}
                aria-controls={`role-panel-${r.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cx(
                  'relative isolate h-11 shrink-0 overflow-hidden whitespace-nowrap rounded-full px-4 text-[14px] font-semibold transition-colors duration-300 md:px-6 md:text-[15px]',
                  selected ? 'bg-brand text-white' : 'text-muted hover:bg-canvas hover:text-ink',
                )}
              >
                {r.label}
                {selected && auto && (
                  <span
                    aria-hidden="true"
                    className="role-progress"
                    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % ROLES.length)}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {ROLES.map((r, i) => (
        <div
          key={r.id}
          role="tabpanel"
          id={`role-panel-${r.id}`}
          aria-labelledby={`role-tab-${r.id}`}
          hidden={i !== active}
          className="tab-in mt-8 grid items-center gap-8 rounded-[28px] bg-white p-5 shadow-[0_2px_6px_rgb(14_37_78/.04),0_40px_80px_-48px_rgb(14_37_78/.35)] ring-1 ring-ink/[.08] md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-12 [&[hidden]]:hidden"
        >
          <div className="lg:py-4">
            <p className="text-[13px] font-bold uppercase tracking-[.1em] text-accent-ink">For the {r.label.toLowerCase()}</p>
            <h3 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.375rem)] font-semibold leading-[1.12] tracking-[-0.03em]">{r.title}</h3>
            <ul className="mt-6 space-y-3.5">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px] leading-[1.5]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <AnchorLink href="#demo" className="btn btn-primary mt-8">
              Book a demo
              <ArrowRight size={18} />
            </AnchorLink>
          </div>
          <RoleVisual kind={r.visual} />
        </div>
      ))}
    </div>
  )
}

const CHIPS: Record<Visual, { icon: ReactNode; title: string; sub: string }> = {
  dashboard: { icon: <Chart size={18} />, title: 'Attendance today', sub: '94.2% · 1,128 present' },
  fees: { icon: <Rupee size={18} />, title: 'Fee received', sub: '₹12,500 · Class 6A' },
  teacher: { icon: <Check size={18} strokeWidth={2.4} />, title: 'Attendance marked', sub: 'Class 7B · 38 of 40' },
  student: { icon: <Bell size={18} />, title: 'Fee reminder', sub: '₹12,500 due on 10 Nov' },
}

function RoleVisual({ kind }: { kind: Visual }) {
  const chip = CHIPS[kind]
  const desktop = kind === 'dashboard' || kind === 'fees'
  return (
    <div aria-hidden="true" className="relative aspect-square overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#EEF3FB,#D9E3F2)] md:aspect-[4/3]">
      <div className="bg-grid absolute inset-0" />
      <div className="glow" style={{ width: '60%', height: '60%', right: '-10%', top: '-10%', background: 'rgb(47 107 255 / .18)' }} />
      {desktop ? (
        <div className="absolute inset-x-[6%] top-1/2 -translate-y-1/2">
          <BrowserFrame>{kind === 'dashboard' ? <DashboardScreen /> : <FeesScreen />}</BrowserFrame>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[.52] sm:scale-[.62] md:scale-[.72] lg:scale-[.74]">
          <Phone>{kind === 'teacher' ? <TeacherAppSunrise /> : <StudentAppGreenwood />}</Phone>
        </div>
      )}
      <NotificationChip
        className={cx('float-y absolute origin-bottom-left scale-[.82] md:scale-100', desktop ? 'bottom-4 left-4 md:bottom-6 md:left-6' : 'bottom-6 left-4 md:bottom-10 md:left-8')}
        tone="brand"
        icon={chip.icon}
        title={chip.title}
        sub={chip.sub}
      />
    </div>
  )
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[var(--shadow-float)] ring-1 ring-ink/10">
      <div className="flex h-8 items-center gap-1.5 border-b border-ink/[.06] bg-[#F3F6FA] px-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#D3DBE6]" />
        ))}
        <span className="ml-3 h-5 max-w-[220px] flex-1 truncate rounded-md bg-white px-2 text-[11px] leading-5 text-muted">erp.yourschool.in</span>
      </div>
      <FitScale width={692} height={434}>
        <div className="relative h-[434px] w-[692px]">{children}</div>
      </FitScale>
    </div>
  )
}
