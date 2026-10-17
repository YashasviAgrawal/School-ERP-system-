import type { CSSProperties, ReactNode, Ref } from 'react'
import { cx } from '@/lib/cx'

/** Generic phone, 250 x 520. Scale it from the outside. */
export function Phone({ children, className, style, ref }: { children: ReactNode; className?: string; style?: CSSProperties; ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cx('h-[520px] w-[250px] rounded-[46px] bg-device p-[10px]', className)}
      style={{
        boxShadow: 'inset 0 0 0 1.5px rgb(200 217 230 / .16), 0 2px 6px rgb(20 28 39 / .2), 0 50px 80px -40px rgb(20 28 39 / .7)',
        ...style,
      }}
    >
      <div className="relative h-full overflow-hidden rounded-[37px] bg-[#F7F6F3] text-[12px] leading-[1.35] text-[#1E2B38]">
        <span className="absolute left-1/2 top-[10px] z-10 h-[23px] w-[76px] -translate-x-1/2 rounded-full bg-device" />
        {children}
      </div>
    </div>
  )
}

type Brand = { name: string; initials: string; color: string; soft: string }

export const BRANDS: Record<'sunrise' | 'greenwood' | 'aravali', Brand> = {
  sunrise: { name: 'Sunrise Public School', initials: 'SP', color: '#7A2E3B', soft: '#F3E4E6' },
  greenwood: { name: 'Greenwood Academy', initials: 'GA', color: '#2E5B45', soft: '#E3EDE7' },
  aravali: { name: 'Aravali Vidya Mandir', initials: 'AV', color: '#2C4F86', soft: '#E1E8F3' },
}

function AppShell({ brand, greeting, sub, children }: { brand: Brand; greeting: string; sub: string; children: ReactNode }) {
  return (
    <>
      <div className="px-[18px] pb-[22px] pt-[48px] text-white" style={{ background: brand.color }}>
        <div className="flex items-center gap-[8px]">
          <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/20 text-[10px] font-bold">{brand.initials}</span>
          <span className="text-[11px] font-semibold opacity-90">{brand.name}</span>
        </div>
        <div className="mt-[14px] font-display text-[20px] font-bold leading-[1.1] tracking-[-0.02em]">{greeting}</div>
        <div className="mt-[3px] text-[11.5px] opacity-80">{sub}</div>
      </div>
      <div className="flex flex-col gap-[10px] p-[14px]">{children}</div>
      <div className="absolute inset-x-[14px] bottom-[14px] flex h-[52px] items-center justify-around rounded-[18px] bg-white shadow-[0_1px_0_rgb(0_0_0/.04)]">
        <span className="h-[18px] w-[18px] rounded-[6px]" style={{ background: brand.color }} />
        <span className="h-[18px] w-[18px] rounded-[6px] bg-[#E2E5E9]" />
        <span className="h-[18px] w-[18px] rounded-[6px] bg-[#E2E5E9]" />
        <span className="h-[18px] w-[18px] rounded-[6px] bg-[#E2E5E9]" />
      </div>
    </>
  )
}

function Card({ label, value, children }: { label: string; value: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-[16px] bg-white px-[14px] py-[12px] shadow-[0_1px_0_rgb(0_0_0/.04)]">
      <div className="text-[11px] text-[#6B7682]">{label}</div>
      <div className="mt-[2px] text-[14px] font-bold">{value}</div>
      {children}
    </div>
  )
}

export function TeacherAppSunrise() {
  const b = BRANDS.sunrise
  return (
    <AppShell brand={b} greeting="Good morning, Ms. Sharma" sub="6 periods today">
      <Card label="Next class · 9:40" value="Class 7B · Science">
        <div className="mt-[10px] rounded-full py-[8px] text-center font-semibold text-white" style={{ background: b.color }}>
          Mark attendance
        </div>
      </Card>
      <Card label="Homework to check" value="12 submissions" />
      <Card label="Leave request" value="Approved for 21 Oct" />
    </AppShell>
  )
}

export function StudentAppGreenwood() {
  const b = BRANDS.greenwood
  return (
    <AppShell brand={b} greeting="Hi, Aarav" sub="Class 6A · Roll no. 14">
      <Card label="Fee due · 10 Nov" value={<span className="font-display text-[21px]">₹12,500</span>}>
        <div className="mt-[10px] rounded-full py-[8px] text-center font-semibold text-white" style={{ background: b.color }}>
          Pay now
        </div>
      </Card>
      <Card label="Today" value="Maths unit test · Period 3" />
      <Card label="Attendance this month" value="96%">
        <div className="mt-[8px] h-[6px] rounded-full" style={{ background: b.soft }}>
          <div className="h-full w-[96%] rounded-full" style={{ background: b.color }} />
        </div>
      </Card>
    </AppShell>
  )
}

export function TeacherAppAravali() {
  const b = BRANDS.aravali
  return (
    <AppShell brand={b} greeting="Namaste, Mr. Khan" sub="Class teacher · 8A">
      <Card label="Substitution today" value="8A Science · Period 5" />
      <Card label="Notice" value="PTM on Saturday, 25 Oct" />
      <Card label="Timetable" value="Thursday">
        <div className="mt-[8px] flex gap-[6px]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-[24px] flex-1 rounded-[8px]" style={{ background: i === 1 ? b.color : b.soft }} />
          ))}
        </div>
      </Card>
    </AppShell>
  )
}
