'use client'

import { useState } from 'react'
import { Drag } from '@/components/ui/Icons'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Drag-to-compare. Swap the two mock sites for real screenshots of a school you
 * redesigned (with their permission):
 *   <img src="/work/before.webp" ... />  and  <img src="/work/after.webp" ... />
 */
export function BeforeAfter() {
  const [pos, setPos] = useState(46)

  return (
    <section id="work" data-theme="light" aria-labelledby="work-title" className="py-24 md:py-36">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <h2 id="work-title" className="h-section max-w-[860px]">
            From forgettable to first choice.
          </h2>
          <p className="max-w-[30ch] text-[18px] leading-[1.55] text-teal-ink">Drag across to see a school website before and after our redesign.</p>
        </Reveal>

        <Reveal className="mt-12 md:mt-14">
          <div className="@container relative aspect-[4/5] overflow-hidden rounded-[28px] bg-white shadow-[0_2px_6px_rgb(47_65_86/.06),0_60px_100px_-60px_rgb(47_65_86/.6)] ring-1 ring-navy/[.07] md:aspect-[16/9]">
            <div className="absolute inset-0">
              <NewSite />
            </div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <OldSite />
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(47_65_86/.15)]" style={{ left: `${pos}%` }} />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Compare the old and the new school website"
              className="peer absolute inset-0 z-20 m-0 h-full w-full cursor-ew-resize appearance-none opacity-0 [touch-action:pan-y]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 z-30 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy text-beige shadow-[0_16px_34px_-12px_rgb(47_65_86/.75)] transition-shadow peer-focus-visible:ring-4 peer-focus-visible:ring-sky peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-navy"
              style={{ left: `${pos}%` }}
            >
              <Drag size={24} />
            </div>
            <span className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full bg-navy/90 px-3.5 py-1.5 text-[13px] font-semibold text-beige md:bottom-5 md:left-5">Before</span>
            <span className="pointer-events-none absolute bottom-4 right-4 z-30 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-navy shadow-[0_6px_16px_-8px_rgb(47_65_86/.5)] md:bottom-5 md:right-5">
              After
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Both mocks are sized in container units so they scale with the frame. */

function OldSite() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-white text-[3.3cqw] leading-[1.3] text-[#222] md:text-[1.1cqw]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="flex items-center gap-[1em] bg-[linear-gradient(#1F4E96,#5E93D1)] px-[1.4em] py-[1em] md:px-[2em]">
        <span className="h-[3.4em] w-[3.4em] shrink-0 rounded-full border-[.2em] border-white bg-[#F2C94C]" />
        <div>
          <div className="text-[1.5em] font-bold tracking-[.04em] text-white [text-shadow:1px_1px_0_#000] md:text-[2.3em]">SUNRISE PUBLIC SCHOOL</div>
          <div className="text-[.8em] text-[#FFF7C2] md:text-[.95em]">Affiliated to C.B.S.E., New Delhi · Estd. 1998</div>
        </div>
      </div>
      <div className="overflow-hidden whitespace-nowrap border-y border-[#999] bg-[linear-gradient(#F0F0F0,#C9C9C9)] px-[1.4em] py-[.45em] text-[.85em] text-[#0000CC] underline md:px-[2em] md:text-[.95em]">
        Home | About Us | Principal&apos;s Desk | Admission | Gallery | Notice Board | Fee Structure | Alumni | Downloads | Contact Us
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-[#FFFF99] px-[1.4em] py-[.35em] text-[.85em] font-bold text-[#CC0000] md:px-[2em] md:text-[.95em]">
        .:: Admissions Open for Session 2027-28 ::. Click Here for Admission Form ::. Result of Class X Declared ::. Winter Uniform Compulsory ::.
      </div>
      <div className="flex gap-[1.5em] px-[1.4em] py-[1.3em] md:px-[2em]">
        <div className="hidden w-[15em] shrink-0 border border-[#1F4E96] md:block">
          <div className="bg-[#1F4E96] px-[.6em] py-[.3em] font-bold text-white">Quick Links</div>
          <div className="px-[.7em] py-[.5em] text-[.95em] leading-[1.8] text-[#0000CC] underline">
            » Fee Structure
            <br />» TC Download
            <br />» Syllabus 2027-28
            <br />» Holiday List
            <br />» Photo Gallery
            <br />» Mandatory Disclosure
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[1.35em] font-bold text-[#8B0000] underline md:text-[1.6em]">Welcome To Sunrise Public School</div>
          <p className="mt-[.6em] text-justify text-[#444]">
            Sunrise Public School was established in the year 1998 with the aim of providing quality education to the students of the city. The school is affiliated to CBSE and has well qualified staff, spacious classrooms,
            computer lab, library and playground. The school organises various co-curricular activities throughout the year for the all round development of students.
          </p>
          <div className="mt-[1em] flex flex-col gap-[1em] md:flex-row">
            <div className="flex h-[9em] shrink-0 items-center justify-center border border-[#999] bg-[#DDD] text-[.85em] text-[#777] md:w-[18em]">school-photo-1.jpg</div>
            <p className="m-0 text-justify text-[.95em] text-[#444]">
              For admission related enquiry please contact the school office between 9:00 AM to 1:00 PM on all working days. Parents are requested to check the notice board regularly.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-[#1F4E96] px-[2em] py-[.5em] text-center text-[.8em] text-white">Copyright © 2009 · Visitor No. 004521 · Best viewed in Internet Explorer at 1024 x 768</div>
    </div>
  )
}

function NewSite() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-paper text-[3.3cqw] leading-[1.35] text-[#1E2F42] md:text-[1.1cqw]">
      <div className="flex items-center justify-between px-[1.6em] py-[1.4em] md:px-[3.2em] md:py-[1.8em]">
        <div className="flex items-center gap-[.7em]">
          <span className="grid h-[2.5em] w-[2.5em] place-items-center rounded-full bg-navy text-[.85em] font-bold text-beige">SP</span>
          <strong className="text-[1.05em]">Sunrise Public School</strong>
        </div>
        <div className="hidden items-center gap-[2.2em] text-[.95em] md:flex">
          <span>About</span>
          <span>Academics</span>
          <span>Life at Sunrise</span>
          <span className="rounded-full bg-navy px-[1.4em] py-[.7em] font-semibold text-beige">Admissions 2027–28</span>
        </div>
        <span className="h-[.9em] w-[1.6em] border-y-2 border-navy md:hidden" />
      </div>
      <div className="grid items-center gap-[1.6em] px-[1.6em] md:grid-cols-[1fr_1.1fr] md:gap-[3em] md:px-[3.2em] md:py-[1.4em]">
        <div>
          <span className="inline-block rounded-full bg-sky px-[1em] py-[.4em] text-[.85em] font-semibold">CBSE · Nursery to XII · Jaipur</span>
          <div className="mt-[.5em] font-display text-[2.9em] font-extrabold leading-[0.94] tracking-[-0.045em] md:text-[4.6em]">Where curious minds grow.</div>
          <p className="mt-[.9em] max-w-[28em] text-[1.05em] text-teal-ink md:text-[1.15em]">A school where every child is known by name, and every day starts with a question.</p>
          <div className="mt-[1.4em] flex flex-wrap gap-[.7em]">
            <span className="rounded-full bg-navy px-[1.7em] py-[.85em] font-semibold text-beige">Book a campus visit</span>
            <span className="rounded-full px-[1.7em] py-[.85em] font-semibold shadow-[inset_0_0_0_1.5px_rgb(47_65_86/.3)]">Fee structure</span>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4em] bg-sky md:order-first md:aspect-[4/3.3]">
          <span className="absolute -inset-x-[15%] -bottom-[35%] h-[70%] rounded-[50%] bg-teal" />
          <span className="absolute -bottom-[48%] -right-[30%] left-[30%] h-[70%] rounded-[50%] bg-navy" />
          <span className="absolute right-[16%] top-[14%] h-[4.5em] w-[4.5em] rounded-full bg-beige" />
          <span className="absolute left-[1em] top-[1em] rounded-full bg-white/85 px-[.9em] py-[.45em] text-[.8em] font-semibold">[Campus photo]</span>
        </div>
      </div>
    </div>
  )
}
