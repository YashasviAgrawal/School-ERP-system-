'use client'

import { useEffect, useState } from 'react'
import { Chat } from '@/components/ui/Icons'
import { whatsappLink } from '@/lib/site'

/** Appears once the visitor scrolls past the first screen. */
export function FloatingWhatsApp() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight * 0.8)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      data-shown={shown}
      className="wa-fab fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_16px_32px_-12px_rgb(18_140_70/.75)] md:bottom-7 md:right-7"
    >
      <span className="wa-ping" aria-hidden="true" />
      <Chat size={26} strokeWidth={2.1} />
      <span className="wa-label pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -mt-[18px] hidden whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[13.5px] font-semibold text-white shadow-[var(--shadow-float)] md:block">
        Chat on WhatsApp
      </span>
    </a>
  )
}
