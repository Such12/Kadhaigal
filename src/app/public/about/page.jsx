import AboutHero from '../../../components/about/AboutHero.jsx'
import AboutIntro from '../../../components/about/AboutIntro.jsx'
import ValuesSection from '../../../components/about/ValueSection.jsx'
import FoundersSection from '../../../components/about/FoundersSection.jsx'
import MascotsSection from '../../../components/about/MascotsSection.jsx'
//import GalleryBanner from '../../../components/about/GalleryBanner.jsx'
import JoinCommunity from '../../../components/home/JoinCommunity.jsx'
import FoundersJourney from '../../../components/about/FoundersJourney.jsx'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <FoundersSection />
      <ValuesSection />
      <FoundersJourney />
      <MascotsSection />
      <JoinCommunity />
    </>
  )
}
