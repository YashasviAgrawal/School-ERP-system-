'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Pin, Search, Star } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useSceneProgress } from '@/hooks/useSceneProgress'
import { PINNED_STORY_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { cx } from '@/lib/cx'

/**
 * Desktop: the section pins and vertical scroll pans the three panels sideways.
 * Mobile / reduced motion: a normal swipeable row with snap points.
 */
export function GetSeen() {
  const pinned = useMediaQuery(PINNED_STORY_QUERY)
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  useEffect(() => {
    if (!pinned) return
    const el = track.current
    if (!el) return
    const measure = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  useSceneProgress(
    section,
    (p) => {
      const t = Math.min(1, Math.max(0, (p - 0.08) / 0.84))
      if (track.current) track.current.style.transform = `translate3d(${-t * dist}px, 0, 0)`
      if (bar.current) bar.current.style.transform = `scaleX(${t})`
    },
    { enabled: pinned && dist > 0 },
  )

  useEffect(() => {
    if (!pinned && track.current) track.current.style.transform = ''
  }, [pinned])

  const isPinned = pinned && dist > 0

  return (
    <section
      ref={section}
      id="services"
      data-theme="light"
      aria-labelledby="services-title"
      className="relative bg-surface"
      style={isPinned ? { height: `calc(100vh + ${dist * 1.15}px)` } : undefined}
    >
      <div className={cx(isPinned ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[72px]' : 'section')}>
        <div className="container-x">
          <Reveal>
            <SectionHeader
              id="services-title"
              label="Marketing"
              title={
                <>
                  Be the <Marker>first</Marker> school parents find.
                </>
              }
              description="Google, social media and a website, working together to bring parents to your gate."
            />
          </Reveal>
        </div>

        <div className={cx(isPinned ? 'mt-10' : 'mt-12 scrollbar-none snap-x snap-mandatory overflow-x-auto')}>
          <div ref={track} className="flex w-max gap-5 px-[max(20px,calc((100vw-1200px)/2))] pb-2 will-change-transform md:gap-6">
            <Panel title="Google visibility" line="Top of local search when parents look for a school near them." tone="canvas">
              <SearchVisual />
            </Panel>
            <Panel title="Social media and ads" line="Admission campaigns on Instagram and Facebook that fill your campus visits." tone="brand">
              <SocialVisual />
            </Panel>
            <Panel title="Website design" line="A fast, beautiful website that turns visits into admission enquiries." tone="brand-light">
              <WebsiteVisual />
            </Panel>
          </div>
        </div>

        {isPinned && (
          <div className="container-x mt-8">
            <div className="h-[3px] w-full max-w-[220px] overflow-hidden rounded-full bg-brand/10">
              <div ref={bar} className="h-full origin-left rounded-full bg-brand" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Panel({ title, line, tone, children }: { title: string; line: string; tone: 'canvas' | 'brand' | 'brand-light'; children: ReactNode }) {
  return (
    <article
      className={cx(
        'flex w-[min(86vw,620px)] shrink-0 snap-center flex-col gap-6 rounded-[var(--radius-frame)] p-6 md:gap-7 md:p-8 lg:h-[min(540px,56vh)] lg:w-[min(46vw,660px)]',
        tone === 'canvas' && 'bg-canvas text-ink',
        tone === 'brand' && 'bg-brand text-white',
        tone === 'brand-light' && 'bg-brand-light text-ink',
      )}
    >
      <header>
        <h3 className="h-card">{title}</h3>
        <p className={cx('mt-2 max-w-[40ch] text-[15px] leading-[1.6]', tone === 'brand' ? 'text-brand-light' : tone === 'brand-light' ? 'text-ink/85' : 'text-muted')}>{line}</p>
      </header>
      <div aria-hidden="true" className="relative min-h-[320px] flex-1">
        {children}
      </div>
    </article>
  )
}

function SearchVisual() {
  return (
    <div className="relative flex h-full flex-col gap-3.5 overflow-hidden rounded-2xl bg-white p-4 text-[14px] shadow-[var(--shadow-tile)] md:p-5 md:text-[15px]">
      <div className="flex h-12 shrink-0 items-center gap-3 truncate rounded-full px-5 ring-[1.5px] ring-ink/12">
        <Search size={18} className="shrink-0 text-muted" />
        best CBSE school near me
      </div>
      <div className="rounded-xl bg-canvas p-4 ring-2 ring-brand">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">YS</span>
          <div className="min-w-0">
            <div className="text-[16px] font-bold">Your School Name</div>
            <div className="truncate text-[13px] text-muted">CBSE · Senior Secondary · Jaipur</div>
          </div>
          <span className="ml-auto rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">#1</span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-brand">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={15} />
          ))}
          <span className="ml-2 truncate text-[13px] text-muted">Admissions open</span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2 text-[13px] font-semibold">
          <span className="rounded-full bg-brand px-3.5 py-1.5 text-white">Website</span>
          <span className="flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5">
            <Pin size={13} /> Directions
          </span>
          <span className="rounded-full bg-white px-3.5 py-1.5">Call</span>
        </div>
      </div>
      {[0.55, 0.38].map((o, i) => (
        <div key={i} className="flex flex-col gap-2 px-4 py-1" style={{ opacity: o }}>
          <span className="h-2.5 w-[46%] rounded-full bg-[#E9E1D4]" />
          <span className="h-2 w-[70%] rounded-full bg-[#F2ECE3]" />
        </div>
      ))}
    </div>
  )
}

function SocialVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
      <div className="absolute left-0 top-2 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[13px] font-semibold text-brand-light ring-1 ring-brand-light/20">
        <Pin size={14} /> Parents within 8 km of campus
      </div>
      <div className="w-[260px] translate-y-[2px] rounded-t-[40px] bg-device px-[10px] pt-[10px] shadow-[var(--shadow-device)]">
        <div className="overflow-hidden rounded-t-[31px] bg-white text-[12px] text-[#1E2B40]">
          <div className="flex items-center gap-2 px-3.5 pb-2.5 pt-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">YS</span>
            <div className="leading-tight">
              <div className="font-bold">yourschool</div>
              <div className="text-[10px] text-[#6A6458]">Sponsored</div>
            </div>
          </div>
          <div className="relative flex aspect-square flex-col justify-end bg-brand-light p-5">
            <span className="absolute right-5 top-5 h-20 w-20 rounded-full bg-canvas" />
            <span className="absolute right-[76px] top-[64px] h-12 w-12 rounded-[14px] bg-brand" />
            <div className="font-display text-[27px] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">Admissions open 2027–28</div>
            <div className="mt-1.5 font-medium text-ink">Nursery to Class IX</div>
          </div>
          <div className="flex items-center justify-between bg-canvas px-3.5 py-3 font-bold text-ink">
            Book a campus visit <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </div>
  )
}

function WebsiteVisual() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-device)]">
      <div className="flex items-center gap-1.5 bg-[#F1EBE2] px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#DCD3C5]" />
        ))}
        <span className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white px-3 text-[11px] text-[#6A6458]">yourschool.in</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-paper p-5">
        <div className="flex items-center justify-between text-[11px] text-ink">
          <strong className="flex items-center gap-2 text-[12px]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[9px] text-white">YS</span>
            Your School Name
          </strong>
          <span className="flex gap-3">
            <span>About</span>
            <span>Academics</span>
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-white">Admissions</span>
          </span>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-1">
            <div className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink">A place where children grow.</div>
            <span className="mt-3 inline-block rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-semibold text-white">Book a campus visit</span>
          </div>
          <div className="relative min-h-[150px] w-[42%] self-stretch overflow-hidden rounded-[14px] bg-brand-light">
            <span className="absolute -left-1/4 -right-1/4 -bottom-1/3 h-2/3 rounded-[50%] bg-brand-mid" />
            <span className="absolute -right-1/3 left-1/3 -bottom-1/2 h-2/3 rounded-[50%] bg-brand" />
            <span className="absolute right-[18%] top-[16%] h-9 w-9 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
