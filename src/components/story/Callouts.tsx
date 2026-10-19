import type { Ref } from 'react'
import { cx } from '@/lib/cx'

export const CALLOUTS = [
  { title: 'Fees, tracked to the rupee', line: 'Every payment, receipt and pending amount, class by class.' },
  { title: 'Attendance in one tap', line: 'Teachers mark it on their phone. The office sees it live.' },
  { title: 'Timetables that build themselves', line: 'Set the rules once. Clashes and substitutions are handled for you.' },
]

export function CalloutItem({
  index,
  active = false,
  as = 'li',
  className,
  ref,
}: {
  index: number
  active?: boolean
  as?: 'li' | 'div'
  className?: string
  ref?: Ref<HTMLLIElement>
}) {
  const c = CALLOUTS[index]
  const Comp = as as 'li'
  return (
    <Comp
      ref={ref}
      data-active={active}
      className={cx(
        'group relative rounded-2xl px-6 py-5 ring-1 ring-brand-light/20 transition-[background-color,box-shadow] duration-500',
        'data-[active=true]:bg-brand-light/[.1] data-[active=true]:ring-brand-light/50',
        className,
      )}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-[13px] font-semibold tracking-[.06em] text-brand-light">0{index + 1}</span>
        <div>
          <h3 className="text-[18px] leading-[1.3] text-white">{c.title}</h3>
          <p className="mt-1.5 text-[15px] leading-[1.55] text-brand-light">{c.line}</p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-5 left-0 top-5 w-[3px] origin-top scale-y-0 rounded-full bg-brand-light transition-transform duration-700 ease-out-expo group-data-[active=true]:scale-y-100"
      />
    </Comp>
  )
}
