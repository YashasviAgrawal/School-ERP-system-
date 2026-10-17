import type { CSSProperties, ReactNode, Ref } from 'react'
import { LogoMark } from '@/components/ui/Logo'
import { cx } from '@/lib/cx'

/**
 * A real 3D laptop built from CSS planes: base deck, base edges, and a lid that
 * rotates on its hinge. Generic design, no brand logo. The screen is live DOM,
 * so it stays crisp at any zoom and swapping in real ERP screenshots is trivial.
 *
 * Geometry (px, before scaling): lid and deck are W x D, base is T thick.
 * Lid angle: -89.5 = closed, 0 = upright, ~15 = open and tilted back.
 */
export const LAPTOP = { W: 720, D: 470, T: 15, LT: 9, BOX_H: 640, HINGE_Y: 505 } as const

export type LaptopRefs = {
  body?: Ref<HTMLDivElement>
  lid?: Ref<HTMLDivElement>
  power?: Ref<HTMLDivElement>
  logo?: Ref<HTMLDivElement>
}

type LaptopProps = {
  rx?: number
  ry?: number
  /** Inline lid angle. Omit to drive the lid from a class instead. */
  lid?: number
  lidClassName?: string
  powerClassName?: string
  poweredOn?: boolean
  sweep?: boolean
  screen?: ReactNode
  refs?: LaptopRefs
  className?: string
  style?: CSSProperties
}

/**
 * Measured on-screen bounds of the closed laptop at the hero angle (rx -42, ry -32),
 * in unscaled px relative to the Laptop box. Lets layouts frame the object itself
 * rather than its 720 x 640 layout box.
 */
export const CLOSED_VIEW = { x: -232, y: 357, w: 916, h: 713 } as const

/** The closed laptop, framed to its visible bounds (916 x 713 before scaling). */
export function ClosedLaptop({ sweep = true }: { sweep?: boolean }) {
  return (
    <div aria-hidden="true" className="relative" style={{ width: CLOSED_VIEW.w, height: CLOSED_VIEW.h }}>
      <div className="absolute" style={{ left: -CLOSED_VIEW.x, top: -CLOSED_VIEW.y }}>
        <Laptop rx={-42} ry={-32} lid={-89.5} poweredOn={false} sweep={sweep} />
      </div>
    </div>
  )
}

const KEYS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 40' preserveAspectRatio='none'%3E%3Crect x='2.6' y='2.6' width='36.8' height='34.8' rx='6' fill='%231A2430'/%3E%3Crect x='4' y='3.2' width='34' height='1.6' rx='.8' fill='%23ffffff' fill-opacity='.08'/%3E%3C/svg%3E\")"

const aluminium = 'linear-gradient(180deg,#B6C5D1 0%,#8FA2B3 100%)'

export function Laptop({
  rx = -14,
  ry = 0,
  lid,
  lidClassName,
  powerClassName,
  poweredOn = true,
  sweep = false,
  screen,
  refs,
  className,
  style,
}: LaptopProps) {
  const { W, D, T, LT, BOX_H, HINGE_Y } = LAPTOP

  const lidStyle: CSSProperties = {
    left: -W / 2,
    top: -D,
    width: W,
    height: D,
    transformOrigin: '50% 100%',
    transformStyle: 'preserve-3d',
  }
  if (typeof lid === 'number') lidStyle.transform = `translateY(-1px) rotateX(${lid}deg)`

  const powerStyle: CSSProperties = powerClassName ? {} : { opacity: poweredOn ? 0 : 1 }

  return (
    <div
      aria-hidden="true"
      className={cx('relative select-none', className)}
      style={{ width: W, height: BOX_H, perspective: '2600px', perspectiveOrigin: '50% 16%', ...style }}
    >
      <div
        ref={refs?.body}
        className="absolute"
        style={{
          left: W / 2,
          top: HINGE_Y,
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
        }}
      >
        {/* contact shadow on the table */}
        <div
          className="absolute"
          style={{
            left: -W / 2 - 110,
            top: 0,
            width: W + 220,
            height: D + 220,
            transformOrigin: '50% 0',
            transform: `translateY(${T + 2}px) rotateX(90deg) translateY(-110px)`,
            background:
              'radial-gradient(closest-side, rgb(16 24 34 / .46), rgb(16 24 34 / .2) 55%, rgb(16 24 34 / 0))',
          }}
        />

        {/* base: front edge with thumb scoop */}
        <div
          className="absolute"
          style={{ left: -W / 2, top: 0, width: W, height: T, transform: `translateZ(${D}px)`, borderRadius: '0 0 14px 14px', background: aluminium }}
        >
          <span className="absolute left-1/2 top-0 h-[6px] w-[124px] -translate-x-1/2 rounded-b-[9px] bg-[#7B8FA1]" />
        </div>
        {/* base: side edges */}
        <div className="absolute" style={{ left: -W / 2, top: 0, width: D, height: T, transformOrigin: '0 0', transform: 'rotateY(-90deg)', background: aluminium }} />
        <div className="absolute" style={{ left: W / 2, top: 0, width: D, height: T, transformOrigin: '0 0', transform: 'rotateY(-90deg)', background: aluminium }} />

        {/* base: keyboard deck */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: -W / 2,
            top: 0,
            width: W,
            height: D,
            transformOrigin: '50% 0',
            transform: 'rotateX(90deg)',
            borderRadius: '6px 6px 22px 22px',
            background: 'linear-gradient(180deg,#DAE3EA 0%,#C6D3DD 100%)',
            boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .45)',
          }}
        >
          <div className="absolute left-1/2 top-[20px] h-[8px] w-[80%] -translate-x-1/2 rounded-full bg-[#BCCAD5]" />
          <div className="absolute rounded-[13px] bg-[#AEBFCC] p-[6px]" style={{ left: 40, right: 40, top: 44, height: 238 }}>
            <div className="h-full w-full" style={{ backgroundImage: KEYS, backgroundSize: 'calc(100% / 15) calc(100% / 6)' }} />
          </div>
          <div className="absolute left-1/2 top-[300px] h-[148px] w-[252px] -translate-x-1/2 rounded-[15px] bg-[#D0DBE4] shadow-[inset_0_0_0_1px_rgb(47_65_86/.12)]" />
        </div>

        {/* lid */}
        <div ref={refs?.lid} className={cx('absolute', lidClassName)} style={lidStyle}>
          {/* screen side */}
          <div
            className="absolute inset-0 overflow-hidden rounded-b-[8px] rounded-t-[22px] bg-device [backface-visibility:hidden]"
            style={{ padding: '16px 14px 20px', boxShadow: 'inset 0 0 0 1.5px rgb(200 217 230 / .14)' }}
          >
            <span className="absolute left-1/2 top-[6px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#2A3646]" />
            <div className="relative h-full w-full overflow-hidden rounded-[5px] bg-[#F7F5F2]">
              {screen}
              <div ref={refs?.power} className={cx('absolute inset-0 grid place-items-center bg-[#0B1118]', powerClassName)} style={powerStyle}>
                <div ref={refs?.logo} style={{ opacity: 0 }}>
                  <LogoMark size={64} tone="dark" />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/.12),rgb(255_255_255/0)_36%)]" />
            </div>
          </div>
          {/* outer side */}
          <div
            className={cx('absolute inset-0 overflow-hidden rounded-b-[8px] rounded-t-[22px] [backface-visibility:hidden]', sweep && 'lid-sweep')}
            style={{
              transform: `translateZ(-${LT}px) rotateY(180deg)`,
              background: 'linear-gradient(155deg,#EAF0F4 0%,#D1DCE5 46%,#B4C4D0 100%)',
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .5)',
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LogoMark size={88} tone="emboss" />
            </div>
          </div>
          {/* lid edges */}
          <div className="absolute left-0 top-0" style={{ width: W, height: LT, transformOrigin: '50% 0', transform: 'rotateX(-90deg)', background: '#A9B9C6', borderRadius: 3 }} />
          <div className="absolute left-0 top-0" style={{ width: LT, height: D, transformOrigin: '0 50%', transform: 'rotateY(90deg)', background: '#A3B4C2' }} />
          <div className="absolute top-0" style={{ left: W, width: LT, height: D, transformOrigin: '0 50%', transform: 'rotateY(90deg)', background: '#97A9B8' }} />
        </div>
      </div>
    </div>
  )
}
