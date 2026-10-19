import type { CSSProperties, ReactNode } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

const SERVICES = ['Websites', 'Marketing', 'School ERP', 'Teacher training']

export function HeroCopy({ as: Heading = 'h1' }: { as?: 'h1' | 'p' }) {
  return (
    <div className="max-w-[580px]">
      <Heading className="h-display text-ink">
        <span className="hero-in block" style={delay(60)}>
          Your school,
        </span>
        <span className="hero-in block" style={delay(140)}>
          <Marker immediate>grown</Marker> digitally.
        </span>
      </Heading>
      <p className="hero-in lead mt-6 max-w-[40ch] text-muted" style={delay(260)}>
        Websites, marketing and an ERP that runs your campus. One partner for school growth.
      </p>
      <div className="hero-in mt-8 flex flex-wrap gap-3" style={delay(360)}>
        <AnchorLink href="#demo" className="btn btn-primary">
          Book a demo
          <ArrowRight size={18} />
        </AnchorLink>
        <AnchorLink href="#erp" className="btn btn-ghost">
          See the ERP
        </AnchorLink>
      </div>
      <ul className="hero-in mt-10 flex flex-wrap gap-2 text-[13.5px] font-medium text-muted" style={delay(460)} aria-label="What we do">
        {SERVICES.map((s) => (
          <li key={s} className="rounded-lg bg-white px-3 py-1.5 ring-1 ring-ink/10">
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function NotificationChip({
  icon,
  title,
  sub,
  tone = 'light',
  className,
  style,
}: {
  icon: ReactNode
  title: string
  sub: string
  tone?: 'light' | 'brand' | 'canvas'
  className?: string
  style?: CSSProperties
}) {
  const iconBg = tone === 'brand' ? 'bg-brand text-white' : tone === 'canvas' ? 'bg-canvas text-ink' : 'bg-brand-light text-brand'
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 rounded-2xl bg-white/95 py-3 pl-3 pr-5 text-[14px] leading-[1.25] shadow-[var(--shadow-float)] ring-1 ring-ink/[.08] backdrop-blur ${className ?? ''}`}
      style={style}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[10px] ${iconBg}`}>{icon}</span>
      <span>
        <strong className="block font-semibold text-ink">{title}</strong>
        <span className="text-muted">{sub}</span>
      </span>
    </div>
  )
}
