import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** The one header pattern every section uses: label, title, description, on the left edge of the grid or centred. */
export function SectionHeader({
  id,
  label,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
}: {
  id?: string
  label: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}) {
  const dark = tone === 'dark'
  const center = align === 'center'
  return (
    <div className={cx('max-w-[680px]', center && 'mx-auto text-center', className)}>
      <p className={cx('eyebrow', dark ? 'bg-white/[.08] text-brand-light ring-1 ring-white/15' : 'bg-white text-brand ring-1 ring-ink/10')}>{label}</p>
      <h2 id={id} className={cx('h-section mt-5', dark ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      {description && <p className={cx('lead mt-4 max-w-[56ch]', center && 'mx-auto', dark ? 'text-brand-light' : 'text-muted')}>{description}</p>}
    </div>
  )
}
