import { NextResponse } from 'next/server'

/**
 * Demo requests from the landing page.
 * Delivers each lead by email (Resend) and/or WhatsApp (Meta Cloud API).
 * Configure in .env.local or Vercel. See .env.example.
 */

export const runtime = 'nodejs'

type Lead = { name: string; school: string; phone: string; at: string }

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real people never fill this field.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true })

  const name = clean(body.name, 80)
  const school = clean(body.school, 120)
  const digits = String(body.whatsapp ?? '').replace(/\D/g, '').slice(-10)

  if (name.length < 2 || school.length < 2 || !/^[6-9]\d{9}$/.test(digits) || body.consent !== true) {
    return NextResponse.json({ ok: false, error: 'Please check the form and try again.' }, { status: 422 })
  }

  const lead: Lead = { name, school, phone: `+91${digits}`, at: new Date().toISOString() }

  const channels = [sendEmail, sendWhatsApp]
  const results = await Promise.allSettled(channels.map((send) => send(lead)))
  const delivered = results.filter((r) => r.status === 'fulfilled' && r.value === 'sent').length
  const configured = results.filter((r) => !(r.status === 'fulfilled' && r.value === 'skipped')).length

  results.forEach((r) => {
    if (r.status === 'rejected') console.error('[demo] delivery failed:', r.reason)
  })

  if (configured === 0) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[demo] No delivery channel configured. Lead:', lead)
      return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 500 })
    }
    console.info('[demo] Lead (dev, not delivered):', lead)
    return NextResponse.json({ ok: true })
  }

  if (delivered === 0) return NextResponse.json({ ok: false, error: 'Delivery failed' }, { status: 502 })
  return NextResponse.json({ ok: true })
}

async function sendEmail(lead: Lead): Promise<'sent' | 'skipped'> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.LEADS_EMAIL_FROM
  const to = process.env.LEADS_EMAIL_TO
  if (!key || !from || !to) return 'skipped'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()),
      subject: `Demo request: ${lead.school}`,
      text: `New demo request\n\nName: ${lead.name}\nSchool: ${lead.school}\nWhatsApp: ${lead.phone}\nReceived: ${lead.at}\n\nReply on WhatsApp: https://wa.me/${lead.phone.replace('+', '')}`,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
  return 'sent'
}

async function sendWhatsApp(lead: Lead): Promise<'sent' | 'skipped'> {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const notify = process.env.WHATSAPP_NOTIFY_TO
  if (!token || !phoneId || !notify) return 'skipped'

  const version = process.env.WHATSAPP_API_VERSION || 'v23.0'
  const template = process.env.WHATSAPP_TEMPLATE

  const message = template
    ? {
        type: 'template',
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'en' },
          components: [
            {
              type: 'body',
              parameters: [lead.name, lead.school, lead.phone].map((text) => ({ type: 'text', text })),
            },
          ],
        },
      }
    : { type: 'text', text: { body: `New demo request\n${lead.name}, ${lead.school}\nWhatsApp: ${lead.phone}` } }

  const res = await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: notify, ...message }),
  })
  if (!res.ok) throw new Error(`WhatsApp ${res.status}: ${await res.text()}`)
  return 'sent'
}
