import { useEffect, useState } from 'react'
import EventsCarousel from '../../../components/events/EventsCarousel.jsx'
import { getUpcomingEvents, getFeaturedEvents } from '../../../lib/eventsStore.js'

export default function EventsPage() {
  const [featured, setFeatured] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getFeaturedEvents(), getUpcomingEvents()]).then(([featuredData, upcomingData]) => {
      setFeatured(featuredData)
      setUpcoming(upcomingData.filter((e) => !e.isFeatured))
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="container-page py-16 text-brand-navy/50">Loading…</div>
  }

  return (
    <>
      <EventsCarousel
        title="Featured Events"
        subtitle="The ones we're most excited about this month."
        events={featured}
      />
      <EventsCarousel
        title="Upcoming Gatherings"
        subtitle="Find your tribe among the pages."
        events={upcoming}
        showFilter
      />
      {featured.length === 0 && upcoming.length === 0 && (
        <p className="container-page py-16 text-center text-brand-navy/50">
          Nothing scheduled right now — check back soon.
        </p>
      )}
    </>
  )
}