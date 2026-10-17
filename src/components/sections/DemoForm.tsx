'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowRight, Check } from '@/components/ui/Icons'
import { whatsappLink } from '@/lib/site'
import { cx } from '@/lib/cx'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'school' | 'whatsapp' | 'consent', string>>

const PREVIEW = process.env.NEXT_PUBLIC_DEMO_MODE === 'preview'

function validate(data: { name: string; school: string; whatsapp: string; consent: boolean }): Errors {
  const errors: Errors = {}
  if (data.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (data.school.trim().length < 2) errors.school = 'Please enter your school’s name.'
  if (!/^[6-9]\d{9}$/.test(data.whatsapp)) errors.whatsapp = 'Enter a 10-digit mobile number.'
  if (!data.consent) errors.consent = 'Please agree so we can contact you.'
  return errors
}

export function DemoForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      name: String(form.get('name') ?? ''),
      school: String(form.get('school') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? '').replace(/\D/g, '').slice(-10),
      consent: form.get('consent') === 'on',
      company: String(form.get('company') ?? ''), // honeypot
    }
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      if (PREVIEW) {
        await new Promise((r) => setTimeout(r, 700))
      } else {
        const res = await fetch('/api/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(String(res.status))
      }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-center gap-4 px-2 py-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-sky text-navy">
          <Check size={28} strokeWidth={2.6} />
        </span>
        <h3 className="text-[28px] font-bold tracking-[-0.025em]">Your demo request is in.</h3>
        <p className="max-w-[32ch] text-teal-ink">We&apos;ll message you on WhatsApp to fix a time that suits you.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field id="demo-name" label="Your name" error={errors.name}>
        <input id="demo-name" name="name" type="text" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'demo-name-err' : undefined} />
      </Field>
      <Field id="demo-school" label="School name" error={errors.school}>
        <input id="demo-school" name="school" type="text" autoComplete="organization" className="field" aria-invalid={!!errors.school} aria-describedby={errors.school ? 'demo-school-err' : undefined} />
      </Field>
      <Field id="demo-whatsapp" label="WhatsApp number" error={errors.whatsapp}>
        <div className="flex gap-2">
          <span className="grid h-[3.4rem] shrink-0 place-items-center rounded-[12px] bg-beige px-4 font-semibold">+91</span>
          <input
            id="demo-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            className="field min-w-0 flex-1"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? 'demo-whatsapp-err' : undefined}
          />
        </div>
      </Field>

      {/* honeypot: hidden from people, filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="demo-company">Company</label>
        <input id="demo-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-teal-ink">
          <input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-navy" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'demo-consent-err' : undefined} />
          <span>
            I agree to be contacted on WhatsApp about my demo. Read our{' '}
            <a href="/privacy" className="font-semibold text-navy underline-offset-4 hover:underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="demo-consent-err" className="mt-2 text-[13px] font-medium text-[#A23B3B]">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" disabled={status === 'sending'} className={cx('btn btn-primary mt-1 w-full', status === 'sending' && 'cursor-wait opacity-80')}>
        {status === 'sending' ? 'Sending…' : 'Book a demo'}
        {status !== 'sending' && <ArrowRight size={18} />}
      </button>

      {status === 'error' && (
        <p role="alert" className="text-center text-[14px] text-[#A23B3B]">
          That didn&apos;t go through.{' '}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            Message us on WhatsApp
          </a>{' '}
          instead.
        </p>
      )}
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-[13px] font-medium text-[#A23B3B]">
          {error}
        </p>
      )}
    </div>
  )
}
