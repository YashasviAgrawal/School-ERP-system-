import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** The one header pattern every section uses: label, title, description, all on the left edge of the grid. */
export function SectionHeader({
  id,
  label,
  title,
  description,
  tone = 'light',
  className,
}: {
  id?: string
  label: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={cx('max-w-[680px]', className)}>
      <p className={cx('eyebrow', dark ? 'bg-white/10 text-brand-light' : 'bg-brand/[.07] text-brand')}>{label}</p>
      <h2 id={id} className={cx('h-section mt-4', dark ? 'text-white' : 'text-ink')}>
        {title}
      </h2>
      {description && <p className={cx('lead mt-4 max-w-[56ch]', dark ? 'text-brand-light' : 'text-muted')}>{description}</p>}
    </div>
  )
}
