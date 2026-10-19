import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Figtree, Plus_Jakarta_Sans } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

// next/font downloads these at build time and serves them from your own domain.
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})
const sans = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const title = `${site.name} · Websites, marketing and ERP for schools`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so scroll scenes never flash or hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
