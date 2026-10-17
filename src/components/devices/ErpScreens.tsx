import type { ReactNode, RefObject } from 'react'
import { cx } from '@/lib/cx'
import { Check } from '@/components/ui/Icons'

/**
 * Stand-in ERP screens drawn at the laptop's native screen size (692 x 434).
 * Replace each screen's contents with the real screenshot when ready:
 *   <img src="/erp/fees.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
 */

const NAV = ['Dashboard', 'Fees', 'Attendance', 'Timetable', 'Teachers', 'Admissions']

function Shell({ active, children }: { active: number; children: ReactNode }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[146px_1fr] text-[11px] leading-[1.35] text-navy">
      <aside className="flex flex-col gap-[3px] bg-navy px-[10px] py-[14px] text-sky">
        <div className="mb-[14px] flex items-center gap-[8px] px-[4px]">
          <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-sky text-[9.5px] font-bold text-navy">SP</span>
          <span className="text-[10px] font-semibold leading-[1.15] text-beige">
            Sunrise Public
            <br />
            School
          </span>
        </div>
        {NAV.map((item, i) => (
          <span
            key={item}
            className={cx(
              'flex items-center gap-[8px] rounded-[7px] px-[8px] py-[6px] text-[10.5px]',
              i === active && 'bg-sky/15 font-semibold text-beige',
            )}
          >
            <span className={cx('h-[6px] w-[6px] rounded-[2px]', i === active ? 'bg-sky' : 'border border-teal')} />
            {item}
          </span>
        ))}
        <div className="mt-auto flex items-center gap-[8px] rounded-[8px] bg-white/5 px-[8px] py-[7px]">
          <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-teal text-[8px] font-bold text-beige">RK</span>
          <span className="text-[9.5px] leading-tight text-beige">
            Principal
            <br />
            <span className="text-sky/80">Admin access</span>
          </span>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col gap-[11px] bg-[#F7F5F2] px-[16px] py-[14px]">{children}</div>
    </div>
  )
}

function Header({ title, sub, right }: { title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[10px]">
      <div>
        <div className="font-display text-[17px] font-bold leading-tight tracking-[-0.02em]">{title}</div>
        <div className="text-[9.5px] text-teal-ink">{sub}</div>
      </div>
      {right}
    </div>
  )
}

const card = 'rounded-[10px] bg-white shadow-[0_1px_0_rgb(47_65_86/.06),0_0_0_1px_rgb(47_65_86/.04)]'

function Pill({ children, tone = 'navy' }: { children: ReactNode; tone?: 'navy' | 'sky' | 'line' }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-[7px] py-[2px] text-[8.5px] font-semibold',
        tone === 'navy' && 'bg-navy text-beige',
        tone === 'sky' && 'bg-sky text-navy',
        tone === 'line' && 'ring-1 ring-navy/20',
      )}
    >
      {children}
    </span>
  )
}

export function DashboardScreen() {
  const stats = [
    ['Collected in Oct', '₹18,42,500', '85% of target'],
    ['Pending fees', '₹3,12,000', '46 reminders sent'],
    ['Attendance today', '94.2%', '1,128 of 1,197'],
    ['New enquiries', '37', 'This week'],
  ]
  const bars = [42, 56, 48, 70, 64, 88]
  return (
    <Shell active={0}>
      <Header
        title="Good morning, Principal"
        sub="Friday, 17 October"
        right={<div className="flex h-[24px] w-[150px] items-center rounded-full bg-white px-[10px] text-[9px] text-[#7E93A3] shadow-[0_0_0_1px_rgb(47_65_86/.06)]">Search students, staff, receipts</div>}
      />
      <div className="grid grid-cols-4 gap-[8px]">
        {stats.map(([label, value, foot]) => (
          <div key={label} className={cx(card, 'px-[10px] py-[9px]')}>
            <div className="text-[9px] text-teal-ink">{label}</div>
            <div className="mt-[2px] font-display text-[16px] font-bold tracking-[-0.02em]">{value}</div>
            <div className="mt-[1px] text-[8.5px] font-semibold text-teal">{foot}</div>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-[8px]">
        <div className={cx(card, 'flex flex-col px-[12px] py-[10px]')}>
          <div className="flex justify-between text-[10px]">
            <strong>Fee collection</strong>
            <span className="text-teal-ink">2026–27</span>
          </div>
          <div className="flex flex-1 items-end gap-[10px] pt-[10px]">
            {bars.map((h, i) => (
              <span key={i} className={cx('flex-1 rounded-[4px]', i === bars.length - 1 ? 'bg-navy' : 'bg-sky')} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-[5px] flex gap-[10px] text-[8.5px] text-teal-ink">
            {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className={cx(card, 'px-[12px] py-[10px] text-[9.5px]')}>
          <strong className="text-[10px]">Due this week</strong>
          {[
            ['Class 9B · 8 students', '₹64,000'],
            ['Class 6A · 5 students', '₹41,500'],
            ['Class 11C · 4 students', '₹52,000'],
            ['Transport · 12 students', '₹30,600'],
          ].map(([a, b], i) => (
            <div key={a} className={cx('flex justify-between py-[6px]', i < 3 && 'border-b border-[#EEF2F5]')}>
              <span>{a}</span>
              <strong>{b}</strong>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

export function FeesScreen() {
  const rows: [string, string, string, 'Paid' | 'Pending' | 'Reminder sent'][] = [
    ['Riya Mehta', '5A', '₹8,200', 'Paid'],
    ['Kabir Singh', '9B', '₹12,500', 'Paid'],
    ['Ananya Rao', '6A', '₹9,800', 'Reminder sent'],
    ['Arjun Patel', '11C', '₹14,000', 'Pending'],
    ['Meera Joshi', '7B', '₹8,200', 'Paid'],
    ['Dev Sharma', '3A', '₹6,500', 'Reminder sent'],
  ]
  return (
    <Shell active={1}>
      <Header
        title="Fees"
        sub="Term 2 · 2026–27"
        right={<span className="rounded-full bg-navy px-[12px] py-[6px] text-[9.5px] font-semibold text-beige">Send reminders</span>}
      />
      <div className={cx(card, 'px-[12px] py-[10px]')}>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] text-teal-ink">Collected</div>
            <div className="font-display text-[18px] font-bold tracking-[-0.02em]">₹18,42,500</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-teal-ink">Pending · 46 students</div>
            <div className="font-display text-[14px] font-bold">₹3,12,000</div>
          </div>
        </div>
        <div className="mt-[8px] h-[7px] overflow-hidden rounded-full bg-sky-soft">
          <div className="h-full w-[85.5%] rounded-full bg-navy" />
        </div>
      </div>
      <div className={cx(card, 'min-h-0 flex-1 overflow-hidden px-[12px] py-[6px]')}>
        <div className="grid grid-cols-[1.6fr_.6fr_.9fr_1fr] border-b border-[#EEF2F5] py-[6px] text-[8.5px] font-semibold uppercase tracking-[.06em] text-teal-ink">
          <span>Student</span>
          <span>Class</span>
          <span>Due</span>
          <span>Status</span>
        </div>
        {rows.map(([name, cls, amt, status]) => (
          <div key={name} className="grid grid-cols-[1.6fr_.6fr_.9fr_1fr] items-center border-b border-[#F1F4F6] py-[5.5px] text-[9.5px] last:border-0">
            <span className="font-semibold">{name}</span>
            <span>{cls}</span>
            <span>{amt}</span>
            <span>
              <Pill tone={status === 'Paid' ? 'navy' : status === 'Pending' ? 'line' : 'sky'}>{status}</Pill>
            </span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function AttendanceScreen() {
  const classes = [
    ['6A', 38, 40],
    ['6B', 37, 39],
    ['7A', 40, 41],
    ['7B', 38, 40],
    ['8A', 35, 38],
    ['8B', 39, 40],
    ['9A', 36, 39],
    ['9B', 38, 41],
    ['10A', 40, 40],
  ] as const
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <Shell active={2}>
      <Header title="Attendance" sub="Today · marked by 9:12 AM" right={<Pill tone="sky">1,128 of 1,197 present</Pill>} />
      <div className="grid min-h-0 flex-1 grid-cols-[170px_1fr] gap-[8px]">
        <div className={cx(card, 'flex flex-col items-center justify-center gap-[10px] px-[10px] py-[12px]')}>
          <div className="relative h-[92px] w-[92px]">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" stroke="#E3ECF2" strokeWidth="9" />
              <circle cx="40" cy="40" r={r} fill="none" stroke="#2F4156" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${c * 0.942} ${c}`} />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-display text-[17px] font-bold">94.2%</div>
                <div className="text-[8px] text-teal-ink">present</div>
              </div>
            </div>
          </div>
          <div className="w-full space-y-[4px] text-[9px]">
            {[
              ['Present', '1,128', 'bg-navy'],
              ['Absent', '52', 'bg-teal'],
              ['On leave', '17', 'bg-sky'],
            ].map(([l, v, dot]) => (
              <div key={l} className="flex items-center justify-between">
                <span className="flex items-center gap-[5px]">
                  <span className={cx('h-[7px] w-[7px] rounded-[2px]', dot)} />
                  {l}
                </span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[7px]">
          {classes.map(([name, p, t]) => (
            <div key={name} className={cx(card, 'flex flex-col justify-between px-[9px] py-[8px]')}>
              <div className="flex items-baseline justify-between">
                <strong className="font-display text-[13px]">{name}</strong>
                <span className="text-[9px] text-teal-ink">{Math.round((p / t) * 100)}%</span>
              </div>
              <div>
                <div className="h-[5px] overflow-hidden rounded-full bg-sky-soft">
                  <div className="h-full rounded-full bg-navy" style={{ width: `${(p / t) * 100}%` }} />
                </div>
                <div className="mt-[5px] flex justify-between text-[8.5px] text-teal-ink">
                  <span>{p} present</span>
                  <span>{t - p === 0 ? 'Full' : `${t - p} absent`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

export function TimetableScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const plan = [
    ['Maths', 'English', 'Maths', 'Science', 'Maths', 'English'],
    ['Science', 'Maths', 'English', 'Maths', 'Hindi', 'Maths'],
    ['English', 'Hindi', 'Science', 'Social', 'Science', 'Art'],
    ['Hindi', 'Social', 'Computer', 'English', 'Social', 'Sports'],
    ['Social', 'SUB', 'Hindi', 'Hindi', 'English', 'Sports'],
    ['Computer', 'Sports', 'Social', 'Art', 'Computer', ''],
  ]
  const tone: Record<string, string> = {
    Maths: 'bg-navy text-beige',
    Science: 'bg-teal text-white',
    English: 'bg-sky text-navy',
    Hindi: 'bg-[#E9DFD7] text-navy',
    Social: 'bg-white text-navy ring-1 ring-navy/10',
    Computer: 'bg-sky-soft text-navy',
    Sports: 'bg-[#DDE6D9] text-navy',
    Art: 'bg-[#EFE4D2] text-navy',
  }
  return (
    <Shell active={3}>
      <Header
        title="Timetable"
        sub="Class 7B · Week 42"
        right={<span className="rounded-full bg-navy px-[12px] py-[6px] text-[9.5px] font-semibold text-beige">Auto-arrange</span>}
      />
      <div className={cx(card, 'min-h-0 flex-1 px-[10px] py-[8px]')}>
        <div className="grid grid-cols-[34px_repeat(6,minmax(0,1fr))] gap-[4px] text-[8.5px]">
          <span />
          {days.map((d) => (
            <span key={d} className="pb-[2px] text-center font-semibold text-teal-ink">
              {d}
            </span>
          ))}
          {plan.map((row, r) => [
            <span key={`p${r}`} className="flex items-center text-teal-ink">
              P{r + 1}
            </span>,
            ...row.map((subj, d) =>
              subj === 'SUB' ? (
                <span key={`${r}-${d}`} className="flex h-[38px] flex-col justify-center rounded-[6px] border border-dashed border-teal bg-sky-soft px-[5px] leading-tight text-navy">
                  <strong className="text-[8.5px]">Science</strong>
                  <span className="text-[7.5px]">Sub: Ms. Iyer</span>
                </span>
              ) : subj ? (
                <span key={`${r}-${d}`} className={cx('flex h-[38px] items-center rounded-[6px] px-[6px] font-semibold', tone[subj])}>
                  {subj}
                </span>
              ) : (
                <span key={`${r}-${d}`} className="h-[38px] rounded-[6px] border border-dashed border-navy/10" />
              ),
            ),
          ])}
        </div>
      </div>
      <div className="flex items-center gap-[6px] text-[9.5px] font-semibold text-teal">
        <span className="grid h-[14px] w-[14px] place-items-center rounded-full bg-teal text-white">
          <Check size={9} strokeWidth={3} />
        </span>
        No clashes this week · 1 substitution arranged
      </div>
    </Shell>
  )
}

const SCREENS = [DashboardScreen, FeesScreen, AttendanceScreen, TimetableScreen]

/** All four screens stacked; the scroll story cross-fades them through screenRefs. */
export function ErpScreens({ screenRefs, show = 0 }: { screenRefs?: RefObject<(HTMLDivElement | null)[]>; show?: number }) {
  return (
    <>
      {SCREENS.map((Screen, i) => (
        <div
          key={i}
          ref={(el) => {
            if (screenRefs) screenRefs.current[i] = el
          }}
          className="absolute inset-0"
          style={{ opacity: i === show ? 1 : 0 }}
        >
          <Screen />
        </div>
      ))}
    </>
  )
}
