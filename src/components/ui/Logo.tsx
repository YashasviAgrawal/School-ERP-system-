import { site } from '@/lib/site'
import { cx } from '@/lib/cx'

type Tone = 'navy' | 'light' | 'dark' | 'emboss'

const TONES: Record<Tone, { tile: string; stroke: string; dot: string }> = {
  navy: { tile: '#2F4156', stroke: '#C8D9E6', dot: '#F5EFEB' },
  light: { tile: '#F5EFEB', stroke: '#567C8D', dot: '#2F4156' },
  dark: { tile: '#2F4156', stroke: '#C8D9E6', dot: '#F5EFEB' },
  emboss: { tile: 'rgba(47,65,86,0.07)', stroke: 'rgba(255,255,255,0.75)', dot: 'rgba(255,255,255,0.75)' },
}

/** The mark: a rising stroke, like a student's underline turning into a growth curve. */
export function LogoMark({ size = 34, tone = 'navy', className }: { size?: number; tone?: Tone; className?: string }) {
  const t = TONES[tone]
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" className={className}>
      <rect width="34" height="34" rx="10" fill={t.tile} />
      <path d="M8.5 24.5c4.8 0 6.6-3.4 8.2-7S20.4 10.5 25 10.5" fill="none" stroke={t.stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="25" cy="10.5" r="2.7" fill={t.dot} />
    </svg>
  )
}

export function Logo({ tone = 'navy', className }: { tone?: 'navy' | 'light'; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone === 'light' ? 'light' : 'navy'} />
      <span className="font-display text-[21px] font-extrabold tracking-[-0.035em]">{site.name}</span>
    </span>
  )
}
