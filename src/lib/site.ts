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

export type Testimonial = {
  quote: string | null
  placeholder: string
  name: string
  role: string
  school: string
}

export type Faq = { q: string; a: string }

export const site = {
  name: 'SchoolGrowth', // working name, replace with the final brand
  url: 'https://www.example.com',
  description:
    'School ERP, websites and admission marketing for schools in Jaipur and across Rajasthan. One partner to run your school and grow it.',
  city: 'Jaipur',
  address: '[Office address], Jaipur, Rajasthan',
  email: '[hello@yourdomain.in]',
  /** International format, digits only, used for wa.me links. */
  whatsapp: '910000000000',
  whatsappDisplay: '+91 [00000 00000]',
  whatsappMessage: 'Hello, I would like to book a demo for my school.',

  /** Link to the ERP's login page. Leave empty to hide the Login link. */
  loginUrl: '',

  /** Thin strip above the menu. Set to null to remove it. */
  announcement: {
    tag: '2027–28',
    text: 'Admission season is close. Get your website and ERP ready in time.',
    cta: 'Book a demo',
    href: '#demo',
  } as { tag: string; text: string; cta: string; href: string } | null,

  // Schools is real. The other two are estimates: replace them with real figures before launch.
  stats: [
    { value: 10, suffix: '+', label: 'Schools onboarded', placeholder: '[00]' },
    { value: 35, prefix: '₹', suffix: ' L+', label: 'Fees recovered for schools', placeholder: '[₹00 L]' },
    { value: 850, suffix: '+', label: 'Admission enquiries generated', placeholder: '[000]' },
  ] as Stat[],

  /** The first one is shown large. Add more and they appear as cards below it. */
  testimonials: [
    {
      quote: null,
      placeholder: "[A principal's own words about working with you. Three lines at most, in their voice.]",
      name: "[Principal's name]",
      role: 'Principal',
      school: '[School name], Jaipur',
    },
  ] as Testimonial[],

  /** Shown in the FAQ section and as FAQ rich results on Google (answers with [placeholders] are left out of the schema). */
  faqs: [
    {
      q: 'What happens in a demo?',
      a: 'A short call where we show you the ERP set up with your school’s name, walk through fees, attendance and timetables, and answer your questions.',
    },
    {
      q: 'Will our teachers find it easy to use?',
      a: 'Teachers mark attendance and check their timetable on their phone, in one tap. We also run hands-on training sessions at your school, so nobody is left behind.',
    },
    {
      q: 'Do students and parents get an app?',
      a: 'Yes. Students and parents get an app in your school’s name to see fees due, attendance, homework and school notices, and to pay fees online.',
    },
    {
      q: 'Can you also build our website and run admission campaigns?',
      a: 'Yes, that is what makes us different. We design your school website and run Google and social media campaigns in admission season, so one team looks after your ERP and your growth.',
    },
    {
      q: 'How much does it cost?',
      a: '[Pricing depends on the number of students and the services you choose. Replace this with your pricing or how you quote.]',
    },
    {
      q: 'Is our school’s data safe?',
      a: '[Describe where data is hosted, how often it is backed up and who can access it. Have this checked before launch.]',
    },
  ] as Faq[],
}

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`
