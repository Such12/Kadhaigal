import Hero from '../../components/home/Hero.jsx'
import OurStory from '../../components/home/OurStory.jsx'
import ThreePillars from '../../components/home/ThreePillars.jsx'
import BookCarousel from '../../components/home/BookCarousel.jsx'
import EventsNoticeboard from '../../components/home/EventsNoticeboard.jsx'
import JoinCommunity from '../../components/home/JoinCommunity.jsx'
import MenuPreview from '../../components/home/MenuPreview.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurStory />
      <ThreePillars />
      <BookCarousel />
      <MenuPreview />
      <EventsNoticeboard />
      <JoinCommunity />
    </>
  )
}
