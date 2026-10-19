'use client'

import { useEffect, useRef } from 'react'
import { Laptop, LAPTOP } from '@/components/devices/Laptop'
import { ErpScreens } from '@/components/devices/ErpScreens'
import { Phone, StudentAppGreenwood, TeacherAppAravali, TeacherAppSunrise } from '@/components/devices/Phone'
import { Check, Rupee, TrendUp } from '@/components/ui/Icons'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useSceneProgress } from '@/hooks/useSceneProgress'
import { PINNED_STORY_QUERY, useMediaQuery } from '@/hooks/useMediaQuery'
import { clamp, easeInOut, easeOut, mix, seg } from '@/lib/anim'
import { CalloutItem, CALLOUTS } from './Callouts'
import { site } from '@/lib/site'
import { DISC_STYLE, HeroBackdrop, HeroCopy, NotificationChip } from './HeroCopy'

/**
 * Desktop opening story, one continuous scroll-scrubbed scene (about 4 screens of scroll):
 *   hero with a closed laptop  →  laptop turns to face you and opens  →  screen powers on
 *   →  camera pushes in, three callouts, screens cross-fade  →  pull back, phones rise.
 * Mobile, reduced motion and no-JS visitors get <StoryFlow /> instead (see globals.css).
 */

type Pose = { x: number; y: number; s: number; rx: number; ry: number }

// x/y in vw/vh from the viewport centre; s is scale at a 1440 x 900 viewport.
// Values are tuned from measured on-screen bounds of the laptop at each angle.
const HERO: Pose = { x: 26.4, y: -22.3, s: 0.58, rx: -42, ry: -32 }
const FRONT: Pose = { x: 0, y: 10, s: 0.72, rx: -15, ry: 0 }
const CLOSE: Pose = { x: -14, y: -3, s: 1.02, rx: -5, ry: 0 }
const APPS: Pose = { x: -24, y: 11, s: 0.6, rx: -15, ry: 16 }
const LID_CLOSED = -89.5
const LID_OPEN = 15

const lerpPose = (a: Pose, b: Pose, t: number): Pose => ({
  x: mix(a.x, b.x, t),
  y: mix(a.y, b.y, t),
  s: mix(a.s, b.s, t),
  rx: mix(a.rx, b.rx, t),
  ry: mix(a.ry, b.ry, t),
})

const PHONES = [
  { App: TeacherAppSunrise, left: -330, top: 56, rot: -11, z: 1 },
  { App: StudentAppGreenwood, left: -125, top: 0, rot: 0, z: 3 },
  { App: TeacherAppAravali, left: 80, top: 56, rot: 11, z: 2 },
]

export function Stage() {
  const enabled = useMediaQuery(PINNED_STORY_QUERY)

  const section = useRef<HTMLElement>(null)
  const darkBg = useRef<HTMLDivElement>(null)
  const lightBg = useRef<HTMLDivElement>(null)
  const disc = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLDivElement>(null)
  const chips = useRef<HTMLDivElement>(null)
  const head1 = useRef<HTMLDivElement>(null)
  const head2 = useRef<HTMLDivElement>(null)
  const mover = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const lid = useRef<HTMLDivElement>(null)
  const power = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const screens = useRef<(HTMLDivElement | null)[]>([])
  const callouts = useRef<(HTMLLIElement | null)[]>([])
  const phonesWrap = useRef<HTMLDivElement>(null)
  const phones = useRef<(HTMLDivElement | null)[]>([])

  const k = useRef(1)
  const theme = useRef('light')
  const active = useRef(-1)

  useEffect(() => {
    const update = () => {
      k.current = clamp(Math.min(window.innerWidth / 1440, window.innerHeight / 900), 0.68, 1.35)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useSceneProgress(
    section,
    (p) => {
      // laptop pose
      let pose = lerpPose(HERO, FRONT, easeInOut(seg(p, 0, 0.14)))
      pose = lerpPose(pose, CLOSE, easeInOut(seg(p, 0.38, 0.5)))
      pose = lerpPose(pose, APPS, easeInOut(seg(p, 0.78, 0.93)))
      if (mover.current) mover.current.style.transform = `translate3d(${pose.x}vw, ${pose.y}vh, 0) scale(${pose.s * k.current})`
      if (body.current) body.current.style.transform = `rotateX(${pose.rx}deg) rotateY(${pose.ry}deg)`
      if (lid.current) lid.current.style.transform = `translateY(-1px) rotateX(${mix(LID_CLOSED, LID_OPEN, easeInOut(seg(p, 0.1, 0.29)))}deg)`

      // stage lighting: an iris of deep navy opens from the laptop (lights dim, screen glows),
      // then pale blue opens from the phones. Clip-path keeps colours clean, no muddy cross-fade.
      const nv = easeInOut(seg(p, 0.12, 0.24))
      const sk = easeInOut(seg(p, 0.79, 0.9))
      if (darkBg.current) darkBg.current.style.clipPath = `circle(${nv * 125}% at 50% 66%)`
      if (lightBg.current) lightBg.current.style.clipPath = `circle(${sk * 150}% at 71% 96%)`
      const nextTheme = nv > 0.5 && sk < 0.5 ? 'dark' : 'light'
      if (nextTheme !== theme.current && section.current) {
        theme.current = nextTheme
        section.current.dataset.theme = nextTheme
        window.dispatchEvent(new Event('navtheme'))
      }

      // hero copy, disc, chips leave
      const h = seg(p, 0, 0.07)
      if (hero.current) {
        hero.current.style.opacity = String(1 - h)
        hero.current.style.transform = `translate3d(0, ${-50 * h}px, 0)`
        hero.current.style.visibility = h >= 1 ? 'hidden' : 'visible'
      }
      const d = seg(p, 0.02, 0.13)
      if (disc.current) {
        disc.current.style.opacity = String(1 - d)
        disc.current.style.transform = `scale(${1 + 0.35 * d})`
      }
      const c = seg(p, 0, 0.05)
      if (chips.current) {
        chips.current.style.opacity = String(1 - c)
        chips.current.style.transform = `translate3d(${40 * c}px, ${-30 * c}px, 0)`
      }

      // headline 1
      const in1 = easeOut(seg(p, 0.17, 0.26))
      const out1 = seg(p, 0.38, 0.44)
      if (head1.current) {
        head1.current.style.opacity = String(in1 * (1 - out1))
        head1.current.style.transform = `translate3d(0, ${(1 - in1) * 34 - out1 * 34}px, 0)`
      }

      // screen powers on: black → logo → dashboard
      const logoIn = seg(p, 0.27, 0.3) * (1 - seg(p, 0.325, 0.355))
      if (logo.current) logo.current.style.opacity = String(logoIn)
      if (power.current) power.current.style.opacity = String(1 - seg(p, 0.335, 0.37))

      // screens cross-fade: dashboard → fees → attendance → timetable
      const f = seg(p, 0.555, 0.58)
      const a = seg(p, 0.63, 0.655)
      const t = seg(p, 0.7, 0.725)
      const ops = [1 - f, f - a, a - t, t]
      screens.current.forEach((el, i) => {
        if (el) el.style.opacity = String(ops[i])
      })

      // callouts
      const out = seg(p, 0.76, 0.81)
      callouts.current.forEach((el, i) => {
        if (!el) return
        const cin = easeOut(seg(p, 0.44 + i * 0.035, 0.5 + i * 0.035))
        el.style.opacity = String(cin * (1 - out))
        el.style.transform = `translate3d(${(1 - cin) * 60}px, 0, 0)`
      })
      const nextActive = p < 0.5 || p > 0.79 ? -1 : p < 0.63 ? 0 : p < 0.7 ? 1 : 2
      if (nextActive !== active.current) {
        active.current = nextActive
        callouts.current.forEach((el, i) => el?.setAttribute('data-active', String(i === nextActive)))
      }

      // headline 2 + phones rise and fan out
      const in2 = easeOut(seg(p, 0.84, 0.91))
      if (head2.current) {
        head2.current.style.opacity = String(in2)
        head2.current.style.transform = `translate3d(0, ${(1 - in2) * 34}px, 0)`
      }
      if (phonesWrap.current) phonesWrap.current.style.transform = `scale(${k.current})`
      phones.current.forEach((el, i) => {
        if (!el) return
        const r = easeOut(seg(p, 0.8 + i * 0.03, 0.93 + i * 0.02))
        el.style.transform = `translate3d(0, ${(1 - r) * 110}vh, 0) rotate(${PHONES[i].rot * r}deg)`
      })
    },
    { enabled },
  )

  const { W, BOX_H } = LAPTOP

  return (
    <section ref={section} className="story-pinned relative" style={{ height: '520vh' }} data-theme="light" aria-label="Introduction and the school ERP">
      {/* "See the ERP" lands where the screen has just powered on */}
      <span data-anchor="erp" data-anchor-offset="0" aria-hidden="true" className="pointer-events-none absolute left-0 h-px w-px" style={{ top: '160vh' }} />

      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroBackdrop />
        <div ref={darkBg} className="absolute inset-0 bg-brand-deep" style={{ clipPath: 'circle(0% at 50% 66%)' }} />
        <div ref={lightBg} className="absolute inset-0 bg-canvas" style={{ clipPath: 'circle(0% at 71% 96%)' }} />
        {/* stage disc behind the hero laptop */}
        <div
          ref={disc}
          aria-hidden="true"
          className="absolute rounded-full"
          style={{ ...DISC_STYLE, width: 'min(42vw, 72vh)', height: 'min(42vw, 72vh)', left: '71vw', top: '55%', translate: '-50% -50%' }}
        />

        {/* hero copy */}
        <div ref={hero} className="absolute inset-0 z-20">
          <div className={`container-x flex h-full items-center ${site.announcement ? 'pt-[112px]' : 'pt-[72px]'}`}>
            <HeroCopy />
          </div>
        </div>

        {/* headline over the opening laptop */}
        <div ref={head1} className="absolute inset-x-0 top-[12vh] z-20" style={{ opacity: 0 }}>
          <div className="container-x">
            <SectionHeader
              tone="dark"
              label="The ERP"
              title="Your whole school. One screen."
              description="Fees, attendance, timetables and teachers, run from one place your office already understands."
              className="max-w-[860px]"
            />
          </div>
        </div>

        {/* the laptop */}
        <div
          ref={mover}
          className="absolute left-1/2 top-1/2 z-10"
          style={{
            width: W,
            height: BOX_H,
            marginLeft: -W / 2,
            marginTop: -BOX_H / 2,
            transform: `translate3d(${HERO.x}vw, ${HERO.y}vh, 0) scale(${HERO.s})`,
          }}
        >
          <Laptop
            rx={HERO.rx}
            ry={HERO.ry}
            lid={LID_CLOSED}
            poweredOn={false}
            sweep
            refs={{ body, lid, power, logo }}
            screen={<ErpScreens screenRefs={screens} />}
          />
        </div>

        {/* notification chips around the hero laptop */}
        <div ref={chips} className="pointer-events-none absolute inset-0 z-20">
          <NotificationChip className="float-y absolute left-[53vw] top-[25vh]" icon={<Rupee size={18} />} title="Fee received" sub="₹12,500 · Class 6A" />
          <NotificationChip
            className="float-y absolute right-[4vw] top-[47vh]"
            style={{ animationDelay: '-2.4s' }}
            tone="brand"
            icon={<Check size={18} strokeWidth={2.4} />}
            title="Attendance marked"
            sub="Class 7B · 38 of 40"
          />
          <NotificationChip
            className="float-y absolute left-[57vw] top-[73vh]"
            style={{ animationDelay: '-4.6s' }}
            tone="canvas"
            icon={<TrendUp size={18} />}
            title="New admission enquiry"
            sub="Nursery · from Google"
          />
        </div>

        {/* callouts beside the screen */}
        <ol className="absolute right-[5vw] top-1/2 z-20 w-[min(390px,29vw)] -translate-y-1/2 space-y-3">
          {CALLOUTS.map((_, i) => (
            <CalloutItem
              key={i}
              index={i}
              ref={(el) => {
                callouts.current[i] = el
              }}
              className="opacity-0"
            />
          ))}
        </ol>

        {/* headline over the apps */}
        <div ref={head2} className="absolute inset-x-0 top-[11vh] z-20" style={{ opacity: 0 }}>
          <div className="container-x">
            <SectionHeader label="Mobile apps" title="In every teacher’s pocket." description="Teacher and student apps, branded with your school’s name." />
          </div>
        </div>

        {/* phones */}
        <div ref={phonesWrap} className="absolute bottom-[7vh] left-[71vw] z-10 h-0 w-0 origin-bottom">
          {PHONES.map(({ App, left, top, rot, z }, i) => (
            <div
              key={i}
              ref={(el) => {
                phones.current[i] = el
              }}
              className="absolute"
              style={{ left, top: top - 540, zIndex: z, transform: `translate3d(0, 110vh, 0) rotate(${rot * 0}deg)` }}
            >
              <Phone>
                <App />
              </Phone>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
