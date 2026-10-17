import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { FinalCta } from '@/components/sections/FinalCta'
import { Footer } from '@/components/sections/Footer'
import { GetSeen } from '@/components/sections/GetSeen'
import { Nav } from '@/components/sections/Nav'
import { Problems } from '@/components/sections/Problems'
import { Proof } from '@/components/sections/Proof'
import { SchoolsMarquee } from '@/components/sections/SchoolsMarquee'
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

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* One of these two shows: pinned scroll story on desktop, normal flow elsewhere */}
        <Stage />
        <StoryFlow />
        <Problems />
        <GetSeen />
        <BeforeAfter />
        <SchoolsMarquee />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
    </>
  )
}
