import { site } from '@/lib/site'
import { cx } from '@/lib/cx'

type Tone = 'brand' | 'light' | 'dark' | 'emboss'

const TONES: Record<Tone, { tile: string; stroke: string; dot: string }> = {
  brand: { tile: '#102C5E', stroke: '#B4C6DE', dot: '#FFFFFF' },
  light: { tile: '#FFFFFF', stroke: '#4A6390', dot: '#102C5E' },
  dark: { tile: '#102C5E', stroke: '#B4C6DE', dot: '#FFFFFF' },
  emboss: { tile: 'rgba(14,37,78,0.07)', stroke: 'rgba(255,255,255,0.75)', dot: 'rgba(255,255,255,0.75)' },
}

/** The mark: a rising stroke, like a student's underline turning into a growth curve. */
export function LogoMark({ size = 34, tone = 'brand', className }: { size?: number; tone?: Tone; className?: string }) {
  const t = TONES[tone]
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" className={className}>
      <rect width="34" height="34" rx="10" fill={t.tile} />
      <path d="M8.5 24.5c4.8 0 6.6-3.4 8.2-7S20.4 10.5 25 10.5" fill="none" stroke={t.stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="25" cy="10.5" r="2.7" fill={t.dot} />
    </svg>
  )
}

export function Logo({ tone = 'brand', className }: { tone?: 'brand' | 'light'; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark tone={tone === 'light' ? 'light' : 'brand'} />
      <span className="font-display text-[20px] font-bold tracking-[-0.02em]">{site.name}</span>
    </span>
  )
}
