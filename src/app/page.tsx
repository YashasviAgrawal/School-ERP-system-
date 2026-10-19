import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp'
import { Footer } from '@/components/sections/Footer'
import { GetSeen } from '@/components/sections/GetSeen'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Modules } from '@/components/sections/Modules'
import { Nav } from '@/components/sections/Nav'
import { Problems } from '@/components/sections/Problems'
import { Proof } from '@/components/sections/Proof'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyUs } from '@/components/sections/WhyUs'
import { Stage } from '@/components/story/Stage'
import { StoryFlow } from '@/components/story/StoryFlow'
import { site } from '@/lib/site'

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  description: site.description,
  areaServed: 'Rajasthan, India',
}

// answers still holding [placeholders] stay out of search results until they're written
const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: site.faqs
    .filter((f) => !f.a.includes('['))
    .map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* One of these two shows: pinned scroll story on desktop, normal flow elsewhere */}
        <Stage />
        <StoryFlow />
        <TrustBar />
        <Problems />
        <Modules />
        <GetSeen />
        <BeforeAfter />
        <WhyUs />
        <HowItWorks />
        <Proof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
    </>
  )
}
