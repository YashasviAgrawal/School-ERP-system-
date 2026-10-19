'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Bell, Camera, Check } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { prefersReducedMotion } from '@/hooks/useMediaQuery'
import { cx } from '@/lib/cx'
import { easeOut } from '@/lib/anim'

export function Problems() {
  return (
    <section data-theme="light" aria-labelledby="problems-title" className="section relative">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            id="problems-title"
            label="What we fix"
            title={
              <>
                Problems we <Marker>solve.</Marker>
              </>
            }
            description="The four things that hold most schools back, and what we put in place for each."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <Reveal>
            <FeeTile />
          </Reveal>
          <Reveal delay={90}>
            <TeacherTile />
          </Reveal>
          <Reveal>
            <GrowthTile />
          </Reveal>
          <Reveal delay={90}>
            <TrainingTile />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function TileShell({ title, line, children, className }: { title: string; line: string; children: ReactNode; className?: string }) {
  return (
    <article className={cx('tile flex h-full flex-col gap-7 p-6 md:p-8', className)}>
      <header>
        <h3 className="h-card">{title}</h3>
        <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.6] text-muted">{line}</p>
      </header>
      <div>{children}</div>
    </article>
  )
}

/* ── Fee recovery: pending amount counts down to zero ── */
const PENDING = 312000

function FeeTile() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -25% 0px' })
  const [value, setValue] = useState(PENDING)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setValue(0)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 2400
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      setValue(Math.round((PENDING * (1 - easeOut(t))) / 100) * 100)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const recovered = 1 - value / PENDING
  const done = value === 0

  return (
    <TileShell title="Fee recovery" line="Reminders and online payments that bring fees in on time, without your accounts team chasing parents.">
      <div ref={ref} data-shown={inView} className="grid gap-5 rounded-xl bg-canvas p-5 md:p-6">
        <div>
          <div className="text-[14px] font-semibold text-muted">Pending fees, this term</div>
          <div className="mt-1.5 font-display text-[clamp(2.25rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums" aria-live="off">
            ₹{value.toLocaleString('en-IN')}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-brand" style={{ width: `${recovered * 100}%` }} />
            </div>
            <span
              className={cx(
                'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] font-semibold transition-all duration-500',
                done ? 'bg-brand text-white' : 'bg-white text-muted',
              )}
            >
              {done && <Check size={13} strokeWidth={3} />}
              {done ? 'All cleared' : `${Math.round(recovered * 100)}% recovered`}
            </span>
          </div>
        </div>
        <ul aria-hidden="true" className="flex flex-col gap-2 text-[14px]">
          <Note delay={200} icon={<Check size={13} strokeWidth={3} />} dark label="Paid · Class 5A" value="₹8,200" />
          <Note delay={600} icon={<Check size={13} strokeWidth={3} />} dark label="Paid · Class 9B" value="₹12,500" />
          <Note delay={1000} icon={<Bell size={13} strokeWidth={2.4} />} label="Reminder sent" value="46 parents" />
        </ul>
      </div>
    </TileShell>
  )
}

function Note({ icon, label, value, dark = false, delay }: { icon: ReactNode; label: string; value: string; dark?: boolean; delay: number }) {
  return (
    <li className="note-in flex items-center gap-2.5 rounded-[10px] bg-white px-3 py-2.5 ring-1 ring-ink/[.06]" style={{ ['--note-delay' as string]: `${delay}ms` } as CSSProperties}>
      <span className={cx('grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg', dark ? 'bg-brand text-white' : 'bg-brand-light text-brand')}>{icon}</span>
      <span className="flex-1">{label}</span>
      <strong className="font-semibold">{value}</strong>
    </li>
  )
}

/* ── Teacher management: attendance grid fills in ── */
const TEACHERS: [string, string][] = [
  ['Ms. Sharma', 'PPPPPP'],
  ['Mr. Khan', 'PPLPPP'],
  ['Ms. Iyer', 'PPPOOP'],
  ['Mr. Joshi', 'PPPPLP'],
  ['Ms. Das', 'PPPPPP'],
]
const CELL: Record<string, string> = { P: '#102C5E', L: '#4A6390', O: '#B4C6DE' }

function TeacherTile() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -20% 0px' })
  let n = 0
  return (
    <TileShell title="Teacher management" line="Attendance, leave and substitutions for every teacher, in one place.">
      <div ref={ref} data-shown={inView} aria-hidden="true">
        <div className="grid grid-cols-[86px_repeat(6,minmax(0,1fr))] gap-2 text-[12px] font-semibold text-muted">
          <span />
          {['M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} className="text-center">
              {d}
            </span>
          ))}
          {TEACHERS.map(([name, days]) => [
            <span key={name} className="flex items-center whitespace-nowrap text-[13px] font-medium text-ink">
              {name}
            </span>,
            ...days.split('').map((d, i) => {
              const delay = n++ * 45
              return (
                <span
                  key={`${name}${i}`}
                  className="att-cell h-[30px] rounded-[8px]"
                  style={{ backgroundColor: CELL[d], ['--cell-delay' as string]: `${delay}ms` } as CSSProperties}
                />
              )
            }),
          ])}
        </div>
        <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-muted">
          {[
            ['Present', CELL.P],
            ['Late', CELL.L],
            ['On leave', CELL.O],
          ].map(([l, c]) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-[4px]" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
      </div>
    </TileShell>
  )
}

/* ── School growth: enquiries line draws itself ── */
const LINE = 'M0 172 C 40 168, 72 160, 114 152 S 190 128, 228 120 S 300 86, 342 62 S 384 34, 400 26'

function GrowthTile() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '0px 0px -20% 0px' })
  return (
    <TileShell title="School growth" line="Admission campaigns that keep enquiries rising, season after season.">
      <div ref={ref} data-shown={inView} aria-hidden="true">
        <div className="flex items-baseline justify-between text-[13px] font-semibold text-muted">
          <span>Admission enquiries</span>
          <span className="rounded-lg bg-brand-light px-2.5 py-1 text-ink">Rising</span>
        </div>
        <svg viewBox="0 0 400 200" className="mt-4 block h-auto w-full overflow-visible">
          {[50, 100, 150].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#EDF1F6" />
          ))}
          <path className="fade-late" d={`${LINE} L 400 200 L 0 200 Z`} fill="#B4C6DE" opacity=".8" />
          <path className="draw-path" d={LINE} fill="none" stroke="#102C5E" strokeWidth="3.5" strokeLinecap="round" pathLength={1} />
          <g className="fade-late">
            <circle cx="400" cy="26" r="14" fill="#4A6390" opacity=".18" />
            <circle cx="400" cy="26" r="7.5" fill="#4A6390" />
            <circle cx="400" cy="26" r="3" fill="#fff" />
          </g>
        </svg>
        <div className="mt-3 flex justify-between text-[12px] text-muted">
          {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </TileShell>
  )
}

/* ── Teacher training: real photo slot with session overlay ── */
function TrainingTile() {
  return (
    <TileShell title="Teacher training" line="Hands-on workshops, run at your school, that help teachers use technology in every class.">
      <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-[repeating-linear-gradient(135deg,#B4C6DE_0_16px,#C9D6E8_16px_32px)] md:min-h-[330px]">
        {/* Replace with: <img src="/images/training.jpg" alt="Teachers at a workshop" className="absolute inset-0 h-full w-full object-cover" /> */}
        <div className="absolute inset-0 flex justify-center pt-12 text-center text-ink md:items-center md:pb-10 md:pt-0">
          <div>
            <Camera size={34} strokeWidth={1.6} className="mx-auto" />
            <div className="mt-2 text-[15px] font-semibold">[Photo: teacher training session]</div>
            <div className="text-[13px]">Shoot at a partner school</div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
          <div className="rounded-xl bg-white/95 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur">
            <div className="text-[12px] font-semibold uppercase tracking-[.08em] text-muted">Workshop</div>
            <div className="font-display text-[17px] font-semibold tracking-[-0.015em]">Smart classrooms, session 3</div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-brand py-2 pl-2 pr-4 text-[13px] font-semibold text-white">
            <span className="flex -space-x-1.5">
              {['#B4C6DE', '#FFFFFF', '#4A6390', '#EBF0F6'].map((c) => (
                <span key={c} className="h-7 w-7 rounded-full ring-2 ring-brand" style={{ background: c }} />
              ))}
            </span>
            On campus
          </div>
        </div>
      </div>
    </TileShell>
  )
}
