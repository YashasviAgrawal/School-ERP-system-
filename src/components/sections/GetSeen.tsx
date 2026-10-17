'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, Pin, Search, Star } from '@/components/ui/Icons'
import { Marker } from '@/components/ui/Marker'
import { Reveal } from '@/components/ui/Reveal'
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
      className="relative bg-white"
      style={isPinned ? { height: `calc(100vh + ${dist * 1.15}px)` } : undefined}
    >
      <div className={cx(isPinned ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[72px]' : 'py-24 md:py-32')}>
        <div className="container-x">
          <Reveal className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-[760px]">
              <p className="eyebrow bg-beige text-navy">Visibility</p>
              <h2 id="services-title" className={cx('h-section mt-5', isPinned && 'text-[clamp(2.4rem,4.4vw,4.2rem)]')}>
                Be the <Marker>first</Marker> school parents find.
              </h2>
            </div>
            <p className="max-w-[32ch] text-[18px] leading-[1.55] text-teal-ink">Google, social media and a website, working together to bring parents to your gate.</p>
          </Reveal>
        </div>

        <div className={cx(isPinned ? 'mt-10' : 'mt-12 scrollbar-none snap-x snap-mandatory overflow-x-auto')}>
          <div ref={track} className="flex w-max gap-5 px-[max(20px,calc((100vw-1200px)/2))] pb-2 will-change-transform md:gap-6">
            <Panel title="Google visibility" line="Top of local search when parents look for a school near them." tone="beige">
              <SearchVisual />
            </Panel>
            <Panel title="Social media and ads" line="Admission campaigns on Instagram and Facebook that fill your campus visits." tone="navy">
              <SocialVisual />
            </Panel>
            <Panel title="Website design" line="A fast, beautiful website that turns visits into admission enquiries." tone="sky">
              <WebsiteVisual />
            </Panel>
          </div>
        </div>

        {isPinned && (
          <div className="container-x mt-8">
            <div className="h-[3px] w-full max-w-[220px] overflow-hidden rounded-full bg-navy/10">
              <div ref={bar} className="h-full origin-left rounded-full bg-navy" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Panel({ title, line, tone, children }: { title: string; line: string; tone: 'beige' | 'navy' | 'sky'; children: ReactNode }) {
  return (
    <article
      className={cx(
        'flex w-[min(86vw,620px)] shrink-0 snap-center flex-col gap-6 rounded-[28px] p-6 md:gap-7 md:p-9 lg:h-[min(540px,56vh)] lg:w-[min(46vw,660px)]',
        tone === 'beige' && 'bg-beige text-navy',
        tone === 'navy' && 'bg-navy text-beige',
        tone === 'sky' && 'bg-sky text-navy',
      )}
    >
      <header>
        <h3 className="text-[26px] font-bold leading-[1.1] tracking-[-0.025em] md:text-[30px]">{title}</h3>
        <p className={cx('mt-2.5 max-w-[38ch] text-[16px] leading-[1.5]', tone === 'navy' ? 'text-sky' : tone === 'sky' ? 'text-navy/80' : 'text-teal-ink')}>{line}</p>
      </header>
      <div aria-hidden="true" className="relative min-h-[320px] flex-1">
        {children}
      </div>
    </article>
  )
}

function SearchVisual() {
  return (
    <div className="relative flex h-full flex-col gap-3.5 overflow-hidden rounded-[20px] bg-white p-4 text-[14px] shadow-[var(--shadow-tile)] md:p-5 md:text-[15px]">
      <div className="flex h-12 shrink-0 items-center gap-3 truncate rounded-full px-5 ring-[1.5px] ring-navy/12">
        <Search size={18} className="shrink-0 text-teal-ink" />
        best CBSE school near me
      </div>
      <div className="rounded-[18px] bg-beige p-4 ring-2 ring-teal">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-[13px] font-bold text-beige">YS</span>
          <div className="min-w-0">
            <div className="text-[16px] font-bold">Your School Name</div>
            <div className="truncate text-[13px] text-teal-ink">CBSE · Senior Secondary · Jaipur</div>
          </div>
          <span className="ml-auto rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold text-beige">#1</span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-teal">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={15} />
          ))}
          <span className="ml-2 truncate text-[13px] text-teal-ink">Admissions open</span>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2 text-[13px] font-semibold">
          <span className="rounded-full bg-navy px-3.5 py-1.5 text-beige">Website</span>
          <span className="flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5">
            <Pin size={13} /> Directions
          </span>
          <span className="rounded-full bg-white px-3.5 py-1.5">Call</span>
        </div>
      </div>
      {[0.55, 0.38].map((o, i) => (
        <div key={i} className="flex flex-col gap-2 px-4 py-1" style={{ opacity: o }}>
          <span className="h-2.5 w-[46%] rounded-full bg-[#DCE4EA]" />
          <span className="h-2 w-[70%] rounded-full bg-[#E8EDF1]" />
        </div>
      ))}
    </div>
  )
}

function SocialVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
      <div className="absolute left-0 top-2 flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-sky ring-1 ring-sky/20">
        <Pin size={14} /> Parents within 8 km of campus
      </div>
      <div className="w-[260px] translate-y-[2px] rounded-t-[40px] bg-device px-[10px] pt-[10px] shadow-[var(--shadow-device)]">
        <div className="overflow-hidden rounded-t-[31px] bg-white text-[12px] text-[#1E2B38]">
          <div className="flex items-center gap-2 px-3.5 pb-2.5 pt-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-[10px] font-bold text-beige">YS</span>
            <div className="leading-tight">
              <div className="font-bold">yourschool</div>
              <div className="text-[10px] text-[#6B7682]">Sponsored</div>
            </div>
          </div>
          <div className="relative flex aspect-square flex-col justify-end bg-sky p-5">
            <span className="absolute right-5 top-5 h-20 w-20 rounded-full bg-beige" />
            <span className="absolute right-[76px] top-[64px] h-12 w-12 rounded-[14px] bg-teal" />
            <div className="font-display text-[27px] font-extrabold leading-[0.95] tracking-[-0.035em] text-navy">Admissions open 2027–28</div>
            <div className="mt-1.5 font-medium text-navy">Nursery to Class IX</div>
          </div>
          <div className="flex items-center justify-between bg-beige px-3.5 py-3 font-bold text-navy">
            Book a campus visit <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </div>
  )
}

function WebsiteVisual() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[var(--shadow-device)]">
      <div className="flex items-center gap-1.5 bg-[#EEF2F5] px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#C9D2DA]" />
        ))}
        <span className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white px-3 text-[11px] text-[#6B7682]">yourschool.in</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-paper p-5">
        <div className="flex items-center justify-between text-[11px] text-navy">
          <strong className="flex items-center gap-2 text-[12px]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[9px] text-beige">YS</span>
            Your School Name
          </strong>
          <span className="flex gap-3">
            <span>About</span>
            <span>Academics</span>
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-beige">Admissions</span>
          </span>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-1">
            <div className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-navy">A place where children grow.</div>
            <span className="mt-3 inline-block rounded-full bg-navy px-3.5 py-1.5 text-[11px] font-semibold text-beige">Book a campus visit</span>
          </div>
          <div className="relative min-h-[150px] w-[42%] self-stretch overflow-hidden rounded-[14px] bg-sky">
            <span className="absolute -left-1/4 -right-1/4 -bottom-1/3 h-2/3 rounded-[50%] bg-teal" />
            <span className="absolute -right-1/3 left-1/3 -bottom-1/2 h-2/3 rounded-[50%] bg-navy" />
            <span className="absolute right-[18%] top-[16%] h-9 w-9 rounded-full bg-beige" />
          </div>
        </div>
      </div>
    </div>
  )
}
