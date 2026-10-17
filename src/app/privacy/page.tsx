import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `Privacy policy · ${site.name}`,
  robots: { index: true, follow: true },
}

/** Starting point only. Have it reviewed before launch (DPDP Act, 2023). */
export default function Privacy() {
  return (
    <main className="container-x max-w-[760px] py-28">
      <a href="/" className="text-[15px] font-semibold text-teal-ink underline-offset-4 hover:underline">
        ← Back to home
      </a>
      <h1 className="mt-8 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.04em]">Privacy policy</h1>
      <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-navy/90">
        <p>
          When you book a demo, {site.name} collects your name, your school&apos;s name and your WhatsApp number. We use them only to contact you about the demo
          you asked for and to follow up on it.
        </p>
        <p>We do not sell or share your details with anyone else. We keep them only as long as we need them for this purpose.</p>
        <p>
          You can ask us to see, correct or delete your details at any time by writing to {site.email} or messaging us on WhatsApp at {site.whatsappDisplay}.
        </p>
        <p className="text-[15px] text-teal-ink">Last updated: [date]</p>
      </div>
    </main>
  )
}
