/**
 * Everything a non-developer may need to change lives here.
 * Values in [square brackets] are placeholders: replace them before launch.
 */

export type Stat = {
  /** Real, publicly shareable number. Leave null to show the placeholder. */
  value: number | null
  prefix?: string
  suffix?: string
  label: string
  placeholder: string
}

export type PartnerLogo = { name: string; src: string }

export const site = {
  name: 'SchoolGrowth', // working name, replace with the final brand
  url: 'https://www.example.com',
  description:
    'Websites, marketing and an ERP that runs your campus. One partner for school growth in Jaipur and across Rajasthan.',
  city: 'Jaipur',
  address: '[Office address], Jaipur, Rajasthan',
  email: '[hello@yourdomain.in]',
  /** International format, digits only, used for wa.me links. */
  whatsapp: '910000000000',
  whatsappDisplay: '+91 [00000 00000]',
  whatsappMessage: 'Hello, I would like to book a demo for my school.',

  stats: [
    { value: null, label: 'Schools onboarded', placeholder: '[00]' },
    { value: null, prefix: '₹', suffix: ' L', label: 'Fees recovered for schools', placeholder: '[₹00 L]' },
    { value: null, label: 'Admission enquiries generated', placeholder: '[000]' },
  ] as Stat[],

  testimonial: {
    quote: null as string | null,
    placeholder: "[A principal's own words about working with you. Three lines at most, in their voice.]",
    name: "[Principal's name]",
    role: 'Principal',
    school: '[School name], Jaipur',
  },

  /** Add files to /public/logos and list them here, e.g. { name: 'St. Xavier’s', src: '/logos/xaviers.svg' } */
  partnerLogos: [] as PartnerLogo[],
}

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
