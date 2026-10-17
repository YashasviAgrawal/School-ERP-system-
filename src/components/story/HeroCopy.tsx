import type { CSSProperties, ReactNode } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

const SERVICES = ['Websites', 'Marketing', 'School ERP', 'Teacher training']

export function HeroCopy({ as: Heading = 'h1' }: { as?: 'h1' | 'p' }) {
  return (
    <div className="max-w-[700px]">
      <Heading className="font-display text-[clamp(3.2rem,5.8vw,6.1rem)] font-extrabold leading-[0.92] tracking-[-0.048em] text-navy">
        <span className="hero-in block" style={delay(60)}>
          Your school,
        </span>
        <span className="hero-in block" style={delay(140)}>
          <Marker immediate>grown</Marker> digitally.
        </span>
      </Heading>
      <p className="hero-in mt-7 max-w-[31ch] text-[clamp(1.12rem,1.45vw,1.32rem)] leading-[1.5] text-teal-ink" style={delay(260)}>
        Websites, marketing and an ERP that runs your campus. One partner for school growth.
      </p>
      <div className="hero-in mt-10 flex flex-wrap gap-3" style={delay(360)}>
        <AnchorLink href="#demo" className="btn btn-primary">
          Book a demo
          <ArrowRight size={18} />
        </AnchorLink>
        <AnchorLink href="#erp" className="btn btn-ghost">
          See the ERP
        </AnchorLink>
      </div>
      <ul className="hero-in mt-11 flex flex-wrap gap-2 text-[13.5px] font-medium text-teal-ink" style={delay(460)} aria-label="What we do">
        {SERVICES.map((s) => (
          <li key={s} className="rounded-full px-3.5 py-1.5 ring-1 ring-navy/12">
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
  tone = 'sky',
  className,
  style,
}: {
  icon: ReactNode
  title: string
  sub: string
  tone?: 'sky' | 'navy' | 'beige'
  className?: string
  style?: CSSProperties
}) {
  const iconBg = tone === 'navy' ? 'bg-navy text-beige' : tone === 'beige' ? 'bg-beige text-navy' : 'bg-sky text-navy'
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 rounded-[18px] bg-white/95 py-3 pl-3 pr-5 text-[14px] leading-[1.25] shadow-[var(--shadow-float)] ring-1 ring-navy/5 backdrop-blur ${className ?? ''}`}
      style={style}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[12px] ${iconBg}`}>{icon}</span>
      <span>
        <strong className="block font-semibold text-navy">{title}</strong>
        <span className="text-teal-ink">{sub}</span>
      </span>
    </div>
  )
}
