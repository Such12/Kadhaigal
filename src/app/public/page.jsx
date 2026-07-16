import Hero from '../../components/home/Hero.jsx'
//import OurStory from '../../components/home/OurStory.jsx'
//import ThreePillars from '../../components/home/ThreePillars.jsx'
import BookCarousel from '../../components/home/BookCarousel.jsx'
import EventsNoticeboard from '../../components/home/EventsNoticeboard.jsx'
import VisitLocation from '../../components/home/VisitLocation.jsx'
import JoinCommunity from '../../components/home/JoinCommunity.jsx'
import ChapterOne from '../../components/home/ChapterOne.jsx'
import TableOfContents from '../../components/home/TableofContents.jsx'
import MenuPreview from '../../components/home/MenuPreview.jsx' 

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChapterOne />
      <TableOfContents />
      {/* <OurStory /> */}
      {/* <ThreePillars /> */}
      <BookCarousel />
      <MenuPreview/>
      <EventsNoticeboard />
      <VisitLocation />
      <JoinCommunity />
    </>
  )
}
