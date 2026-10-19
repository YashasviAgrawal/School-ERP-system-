import type { CSSProperties, ReactNode } from 'react'
import { AnchorLink } from '@/components/ui/AnchorLink'
import { ArrowRight, Check, Shield } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { site } from '@/lib/site'

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

const HIGHLIGHTS = ['Teacher and student apps', 'Online fee collection', 'Training at your school']

/** The navy stage disc behind the hero laptop, with soft rings around it. */
export const DISC_STYLE: CSSProperties = {
  background: 'radial-gradient(circle at 32% 28%, #2C5296 0%, #102C5E 55%, #061534 100%)',
  boxShadow: '0 0 0 3vw rgb(16 44 94 / .05), 0 0 0 6vw rgb(16 44 94 / .03), 0 40px 120px -20px rgb(16 44 94 / .5)',
}

/** Blueprint grid and two soft glows behind the hero. */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid bg-grid-fade absolute inset-0" />
      <div className="glow glow-drift" style={{ width: '38vw', height: '38vw', left: '56vw', top: '12vh', background: 'rgb(47 107 255 / .16)' }} />
      <div className="glow" style={{ width: '30vw', height: '30vw', left: '-8vw', top: '-10vh', background: 'rgb(180 198 222 / .55)' }} />
    </div>
  )
}

export function HeroCopy({ as: Heading = 'h1' }: { as?: 'h1' | 'p' }) {
  const schools = site.stats[0]
  return (
    <div className="max-w-[600px]">
      <p className="hero-in eyebrow bg-white text-brand ring-1 ring-ink/10" style={delay(0)}>
        School ERP · Websites · Admissions
      </p>
      <Heading className="h-display mt-6 text-ink">
        <span className="hero-in block" style={delay(60)}>
          Run your school.
        </span>
        <span className="hero-in block" style={delay(140)}>
          <Marker immediate>Grow</Marker> it too.
        </span>
      </Heading>
      <p className="hero-in lead mt-6 max-w-[46ch] text-muted" style={delay(240)}>
        One ERP for fees, attendance and timetables, plus the website and campaigns that fill your admissions. One partner, based in {site.city}.
      </p>
      <ul className="hero-in mt-6 flex flex-wrap gap-x-5 gap-y-2.5 text-[14.5px] font-medium text-ink" style={delay(320)}>
        {HIGHLIGHTS.map((h) => (
          <li key={h} className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-wash text-brand">
              <Check size={12} strokeWidth={3} />
            </span>
            {h}
          </li>
        ))}
      </ul>
      <div className="hero-in mt-8 flex flex-wrap gap-3" style={delay(400)}>
        <AnchorLink href="#demo" className="btn btn-primary">
          Book a demo
          <ArrowRight size={18} />
        </AnchorLink>
        <AnchorLink href="#erp" className="btn btn-ghost">
          See the ERP
        </AnchorLink>
      </div>
      <p className="hero-in mt-9 flex items-center gap-3 text-[14px] text-muted" style={delay(500)}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand ring-1 ring-ink/10">
          <Shield size={17} />
        </span>
        <span>
          Trusted by{' '}
          <strong className="font-semibold text-ink">
            {schools.value ?? schools.placeholder}+ schools
          </strong>{' '}
          across Rajasthan
        </span>
      </p>
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
