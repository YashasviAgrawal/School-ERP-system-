import type { ReactNode, RefObject } from 'react'
import { cx } from '@/lib/cx'

/**
 * The real ERP admin, redrawn at the laptop's native screen size (692 x 434):
 * top bar with school name and session, light sidebar, maroon accents on stone greys.
 * All names and numbers are made up. Never put real students' details on the public site.
 */

/* ── tiny line icons (lucide shapes), drawn locally so the mockup matches the product ── */
const ICON = {
  dashboard: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  students: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 2.5 9 2.5 12 0v-5',
  teachers: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  classes: 'M4 21V8l8-5 8 5v13M9 21v-6h6v6M2 21h20',
  resources: 'M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z',
  diary: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4',
  calendar: 'M3 5h18v16H3zM16 3v4M8 3v4M3 10h18',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8',
  fees: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  sessions: 'M21 7.5V5H3v16h7.5M16 3v4M8 3v4M3 10h5M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0zM16 14v2.2l1.4 1',
  promotion: 'M3 8l4-4 4 4M7 4v16M11 12h4M11 16h7M11 20h10',
  refresh: 'M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5',
  chevron: 'M6 9l6 6 6-6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12.5l4.2 4.2L19 7',
} as const

function Ico({ name, size = 11, className }: { name: keyof typeof ICON; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cx('shrink-0', className)}>
      <path d={ICON[name]} />
    </svg>
  )
}

/* ── shell: top bar + sidebar, exactly the product's layout ── */
const NAV: [string, keyof typeof ICON][] = [
  ['Dashboard', 'dashboard'],
  ['Students', 'students'],
  ['Teachers', 'teachers'],
  ['Classes', 'classes'],
  ['Resources', 'resources'],
  ['Diary Notes', 'diary'],
  ['Announcements', 'bell'],
  ['Holidays', 'calendar'],
  ['Schedules', 'file'],
  ['Fees', 'fees'],
  ['Exams & Results', 'file'],
  ['Sessions', 'sessions'],
  ['Promotion', 'promotion'],
]

function Shell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white font-sans text-[10px] leading-[1.4] text-erp-ink">
      <header className="flex h-[38px] shrink-0 items-center justify-between border-b border-erp-line px-[14px]">
        <div className="flex items-center gap-[7px]">
          <span className="grid h-[20px] w-[20px] place-items-center rounded-[5px] bg-erp text-[7.5px] font-bold text-white">SP</span>
          <span className="text-[12.5px] font-semibold tracking-[-0.01em] text-erp">Sunrise Public School</span>
        </div>
        <div className="flex items-center gap-[7px]">
          <span className="flex h-[22px] items-center gap-[5px] rounded-[6px] border border-erp-line px-[8px] text-[9.5px] font-medium">
            <Ico name="sessions" size={10} />
            2026-2027
            <Ico name="chevron" size={10} className="text-erp-muted" />
          </span>
          <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-erp-soft text-[8.5px] font-semibold">RK</span>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[132px] shrink-0 flex-col gap-[2px] border-r border-erp-line bg-erp-side p-[6px]">
          {NAV.map(([label, icon]) => (
            <span
              key={label}
              className={cx('flex h-[22px] items-center gap-[7px] rounded-[5px] px-[8px] text-[9.5px] font-medium', label === active ? 'bg-erp text-white' : 'text-erp-ink')}
            >
              <Ico name={icon} size={10.5} />
              {label}
            </span>
          ))}
        </aside>
        <main className="flex min-w-0 flex-1 flex-col gap-[10px] overflow-hidden px-[14px] py-[12px]">{children}</main>
      </div>
    </div>
  )
}

function PageHead({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex h-[26px] shrink-0 items-center justify-between gap-[8px]">
      <div className="text-[18px] font-bold leading-none tracking-[-0.02em] text-erp">{title}</div>
      {right && <div className="flex items-center gap-[6px]">{right}</div>}
    </div>
  )
}

const card = 'rounded-[8px] border border-erp-line bg-white'

function OutlineButton({ icon, children }: { icon?: keyof typeof ICON; children: ReactNode }) {
  return (
    <span className="flex h-[22px] items-center gap-[5px] rounded-[6px] border border-erp-line bg-white px-[8px] text-[9px] font-medium">
      {icon && <Ico name={icon} size={10} />}
      {children}
    </span>
  )
}

function PrimaryButton({ icon, children }: { icon?: keyof typeof ICON; children: ReactNode }) {
  return (
    <span className="flex h-[22px] items-center gap-[5px] rounded-[6px] bg-erp px-[9px] text-[9px] font-semibold text-white">
      {icon && <Ico name={icon} size={10} />}
      {children}
    </span>
  )
}

function Select({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('flex h-[22px] items-center justify-between gap-[8px] rounded-[6px] border border-erp-line bg-white px-[7px] text-[9px]', className)}>
      {children}
      <Ico name="chevron" size={9} className="text-erp-muted" />
    </span>
  )
}

function Stat({ label, value, foot, icon }: { label: string; value: string; foot?: string; icon: keyof typeof ICON }) {
  return (
    <div className={cx(card, 'px-[10px] py-[8px]')}>
      <div className="flex items-center justify-between text-[9px] font-medium">
        {label}
        <Ico name={icon} size={10.5} className="text-erp" />
      </div>
      <div className="mt-[3px] text-[16px] font-bold leading-none tracking-[-0.02em]">{value}</div>
      {foot && <div className="mt-[3px] text-[7.5px] text-erp-muted">{foot}</div>}
    </div>
  )
}

type Tone = 'solid' | 'outline' | 'alert' | 'warn'
function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-[6px] py-[1.5px] text-[7.5px] font-semibold',
        tone === 'solid' && 'bg-erp text-white',
        tone === 'outline' && 'border border-erp-line text-erp-ink',
        tone === 'alert' && 'bg-[#FEE2E2] text-[#B91C1C]',
        tone === 'warn' && 'bg-[#FEF3C7] text-[#92400E]',
      )}
    >
      {children}
    </span>
  )
}

function Initials({ name }: { name: string }) {
  const parts = name.split(' ')
  return (
    <span className="grid h-[16px] w-[16px] shrink-0 place-items-center rounded-full bg-erp-soft text-[6.5px] font-semibold text-erp">
      {parts[0][0]}
      {parts[1]?.[0]}
    </span>
  )
}

/* ── 1. Dashboard: stat cards, attendance by class, announcements ── */
export function DashboardScreen() {
  const attendance = [96, 94, 97, 92, 95, 93, 91, 94, 89, 96]
  return (
    <Shell active="Dashboard">
      <PageHead title="Dashboard" right={<OutlineButton icon="refresh">Refresh</OutlineButton>} />
      <div className="grid shrink-0 grid-cols-3 gap-[8px]">
        <Stat label="Total Students" value="742" foot="+5.2% from last month" icon="teachers" />
        <Stat label="Total Teachers" value="33" foot="+2 new this month" icon="students" />
        <Stat label="Fee Collection" value="₹18.4L" foot="85% of target collected" icon="fees" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-[8px]">
        <div className={cx(card, 'flex flex-col px-[11px] py-[9px]')}>
          <div className="text-[11.5px] font-bold tracking-[-0.01em]">Class Attendance Overview</div>
          <div className="text-[7.5px] text-erp-muted">Attendance percentage by class for the current academic year</div>
          <div className="mt-[8px] flex min-h-0 flex-1 gap-[6px]">
            <div className="flex flex-col justify-between pb-[12px] text-[7px] text-erp-muted">
              <span>100%</span>
              <span>95%</span>
              <span>90%</span>
              <span>85%</span>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="relative flex flex-1 items-end gap-[5px] border-b border-erp-line">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-erp-line" style={{ top: `${(i / 3) * 100}%` }} />
                ))}
                {attendance.map((p, i) => (
                  <span key={i} className="relative flex-1 rounded-t-[3px] bg-erp" style={{ height: `${((p - 85) / 15) * 100}%` }} />
                ))}
              </div>
              <div className="mt-[3px] flex gap-[5px] text-[7px] text-erp-muted">
                {attendance.map((_, i) => (
                  <span key={i} className="flex-1 text-center">
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={cx(card, 'flex flex-col overflow-hidden px-[11px] py-[9px]')}>
          <div className="text-[11.5px] font-bold tracking-[-0.01em]">Recent Announcements</div>
          <div className="text-[7.5px] text-erp-muted">Latest announcements and notices (3 active)</div>
          <div className="mt-[8px] space-y-[6px]">
            <div className="rounded-[6px] border border-erp-line px-[8px] py-[6px]">
              <div className="flex items-center justify-between gap-[6px]">
                <span className="flex items-center gap-[5px] text-[9.5px] font-semibold">
                  <Ico name="bell" size={10} />
                  School Time Change
                </span>
                <Badge tone="alert">high</Badge>
              </div>
              <p className="mt-[4px] text-[8.5px] leading-[1.5] text-erp-muted">सोमवार से विद्यालय का समय प्रातः 08:30 से दोपहर 02:30 बजे तक रहेगा। मध्यान्तर 11:00 बजे होगा।</p>
              <div className="mt-[4px] flex items-center gap-[4px] text-[7.5px] text-erp-muted">
                <Ico name="calendar" size={8.5} />
                October 17th, 2026
              </div>
            </div>
            <div className="rounded-[6px] border border-erp-line px-[8px] py-[6px]">
              <div className="flex items-center justify-between gap-[6px]">
                <span className="flex items-center gap-[5px] text-[9.5px] font-semibold">
                  <Ico name="bell" size={10} />
                  Parent-Teacher Meeting
                </span>
                <Badge tone="warn">medium</Badge>
              </div>
              <p className="mt-[4px] text-[8.5px] leading-[1.5] text-erp-muted">Saturday, 25 October, 10 AM to 1 PM, in each class.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ── 2. Fees: totals, filters and the same table the Students page uses ── */
export function FeesScreen() {
  const rows: [string, string, string, string, string, string, 'Paid' | 'Partial' | 'Due'][] = [
    ['101', 'AARAV SHARMA', '5 A', 'RAJESH SHARMA', '₹24,000', '₹24,000', 'Paid'],
    ['104', 'DIYA MEENA', '5 A', 'MAHESH MEENA', '₹24,000', '₹12,000', 'Partial'],
    ['108', 'KABIR SINGH', '6 B', 'SURENDRA SINGH', '₹26,500', '₹26,500', 'Paid'],
    ['112', 'ANANYA RAO', '6 B', 'VENKAT RAO', '₹26,500', '₹0', 'Due'],
    ['115', 'ISHAAN GUPTA', '7 A', 'ALOK GUPTA', '₹28,000', '₹28,000', 'Paid'],
    ['119', 'PRIYA CHOUDHARY', '7 A', 'RAMESH CHOUDHARY', '₹28,000', '₹14,000', 'Partial'],
    ['123', 'ROHAN BHATT', '8 A', 'VIKRAM BHATT', '₹29,500', '₹29,500', 'Paid'],
    ['127', 'SNEHA KUMAWAT', '8 A', 'GOPAL KUMAWAT', '₹29,500', '₹0', 'Due'],
  ]
  const cols = 'grid grid-cols-[30px_1.45fr_30px_1.3fr_50px_50px_46px] items-center gap-[6px]'
  return (
    <Shell active="Fees">
      <PageHead title="Fee Management" right={<PrimaryButton icon="plus">Collect Fee</PrimaryButton>} />
      <div className="grid shrink-0 grid-cols-3 gap-[8px]">
        <Stat label="Collected this term" value="₹18,42,500" icon="fees" />
        <Stat label="Pending" value="₹3,12,000" icon="file" />
        <Stat label="Students with dues" value="46" icon="teachers" />
      </div>
      <div className="flex shrink-0 items-center gap-[6px]">
        <span className="flex h-[22px] flex-1 items-center gap-[5px] rounded-[6px] border border-erp-line px-[7px] text-[9px] text-erp-muted">
          <Ico name="search" size={10} />
          Search by name, father name
        </span>
        <Select className="w-[58px]">Class</Select>
        <Select className="w-[62px]">Section</Select>
        <Select className="w-[56px]">Status</Select>
      </div>
      <div className={cx(card, 'min-h-0 flex-1 overflow-hidden')}>
        <div className={cx(cols, 'border-b border-erp-line px-[10px] py-[6px] text-[8px] font-medium text-erp-muted')}>
          <span>ID</span>
          <span>Name</span>
          <span>Class</span>
          <span>Father&apos;s Name</span>
          <span>Total</span>
          <span>Paid</span>
          <span>Status</span>
        </div>
        {rows.map(([id, name, cls, father, total, paid, status]) => (
          <div key={id} className={cx(cols, 'border-b border-erp-line px-[10px] py-[5px] text-[8.5px] last:border-0')}>
            <span className="font-semibold">{id}</span>
            <span className="flex min-w-0 items-center gap-[5px]">
              <Initials name={name} />
              <span className="truncate">{name}</span>
            </span>
            <span>{cls}</span>
            <span className="truncate">{father}</span>
            <span>{total}</span>
            <span>{paid}</span>
            <span>
              <Badge tone={status === 'Paid' ? 'solid' : status === 'Due' ? 'alert' : 'outline'}>{status}</Badge>
            </span>
          </div>
        ))}
      </div>
    </Shell>
  )
}

/* ── 3. Attendance: today, class by class, as teachers mark it ── */
export function AttendanceScreen() {
  const rows: [string, string, number, number, string | null][] = [
    ['6 A', 'Ms. Kavita Jain', 38, 40, '9:02 AM'],
    ['6 B', 'Mr. Anil Verma', 37, 39, '9:05 AM'],
    ['7 A', 'Ms. Neha Bansal', 40, 41, '9:01 AM'],
    ['7 B', 'Mr. Sunil Yadav', 36, 40, '9:10 AM'],
    ['8 A', 'Ms. Pooja Arora', 35, 38, '9:04 AM'],
    ['8 B', 'Mr. Deepak Saini', 0, 40, null],
    ['9 A', 'Ms. Ritu Sharma', 39, 41, '9:03 AM'],
    ['9 B', 'Mr. Manoj Tiwari', 37, 40, '9:08 AM'],
  ]
  const cols = 'grid grid-cols-[34px_1.2fr_58px_1.4fr_62px] items-center gap-[8px]'
  return (
    <Shell active="Classes">
      <PageHead
        title="Class Attendance"
        right={
          <OutlineButton icon="calendar">
            Today · 18 Oct
          </OutlineButton>
        }
      />
      <div className="grid shrink-0 grid-cols-3 gap-[8px]">
        <Stat label="Present" value="1,128" foot="94.2% of 1,197 students" icon="check" />
        <Stat label="Absent" value="52" foot="4.3% of students" icon="teachers" />
        <Stat label="On leave" value="17" foot="1.4% of students" icon="calendar" />
      </div>
      <div className={cx(card, 'min-h-0 flex-1 overflow-hidden')}>
        <div className={cx(cols, 'border-b border-erp-line px-[10px] py-[6px] text-[8px] font-medium text-erp-muted')}>
          <span>Class</span>
          <span>Class Teacher</span>
          <span>Present</span>
          <span>Attendance</span>
          <span>Marked</span>
        </div>
        {rows.map(([cls, teacher, present, total, at]) => {
          const pct = Math.round((present / total) * 100)
          return (
            <div key={cls} className={cx(cols, 'border-b border-erp-line px-[10px] py-[6.5px] text-[8.5px] last:border-0')}>
              <span className="font-semibold">{cls}</span>
              <span className="truncate">{teacher}</span>
              <span>{at ? `${present} / ${total}` : `— / ${total}`}</span>
              <span className="flex items-center gap-[6px]">
                <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-erp-soft">
                  {at && <span className="block h-full rounded-full bg-erp" style={{ width: `${pct}%` }} />}
                </span>
                <span className="w-[22px] text-right text-erp-muted">{at ? `${pct}%` : ''}</span>
              </span>
              <span>{at ? <Badge tone="solid">{at}</Badge> : <Badge tone="outline">Pending</Badge>}</span>
            </div>
          )
        })}
      </div>
    </Shell>
  )
}

/* ── 4. Schedules: the week's timetable, clashes resolved ── */
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
  const teacher: Record<string, string> = {
    Maths: 'Mr. Verma',
    English: 'Ms. Jain',
    Science: 'Ms. Bansal',
    Hindi: 'Mr. Yadav',
    Social: 'Ms. Arora',
    Computer: 'Mr. Saini',
    Sports: 'Mr. Khan',
    Art: 'Ms. Das',
  }
  return (
    <Shell active="Schedules">
      <PageHead
        title="Schedules"
        right={
          <>
            <Select className="w-[70px]">Class 7 B</Select>
            <PrimaryButton icon="refresh">Auto-arrange</PrimaryButton>
          </>
        }
      />
      <div className={cx(card, 'min-h-0 flex-1 px-[9px] py-[8px]')}>
        <div className="grid grid-cols-[22px_repeat(6,minmax(0,1fr))] gap-[4px] text-[8px]">
          <span />
          {days.map((d) => (
            <span key={d} className="pb-[1px] text-center font-medium text-erp-muted">
              {d}
            </span>
          ))}
          {plan.map((row, r) => [
            <span key={`p${r}`} className="flex items-center text-erp-muted">
              P{r + 1}
            </span>,
            ...row.map((subj, d) =>
              subj === 'SUB' ? (
                <span key={`${r}-${d}`} className="flex h-[40px] flex-col justify-center rounded-[5px] border border-dashed border-erp bg-[#FEF2F2] px-[5px] leading-tight">
                  <strong className="text-[8px] font-semibold text-erp">Science</strong>
                  <span className="text-[7px] text-erp-muted">Sub: Ms. Iyer</span>
                </span>
              ) : subj ? (
                <span key={`${r}-${d}`} className="flex h-[40px] flex-col justify-center rounded-[5px] border border-erp-line bg-[#FAFAF9] px-[5px] leading-tight">
                  <strong className="text-[8px] font-semibold">{subj}</strong>
                  <span className="text-[7px] text-erp-muted">{teacher[subj]}</span>
                </span>
              ) : (
                <span key={`${r}-${d}`} className="h-[40px] rounded-[5px] border border-dashed border-erp-line" />
              ),
            ),
          ])}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-[6px] text-[8.5px] font-medium text-erp-muted">
        <span className="grid h-[13px] w-[13px] place-items-center rounded-full bg-erp text-white">
          <Ico name="check" size={8} />
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
