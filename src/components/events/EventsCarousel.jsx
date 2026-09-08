import { useRef } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import EventCard from './EventCard.jsx'

export default function EventsCarousel({ title, subtitle, events, showFilter = false }) {
  const scrollerRef = useRef(null)
  const scrollBy = (dir) => scrollerRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  if (!events || events.length === 0) return null

  return (
    <section className="container-page py-10 sm:py-12">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy">{title}</h2>
          {subtitle && <p className="text-brand-navy/50 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {showFilter && (
            <button
              aria-label="Filter events"
              className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy/60 hover:text-brand-navy"
            >
              <SlidersHorizontal size={15} />
            </button>
          )}
          <button onClick={() => scrollBy(-1)} aria-label="Previous" className="hidden sm:flex w-9 h-9 rounded-full bg-white shadow-card items-center justify-center text-brand-navy hover:text-brand-brick">
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Next" className="hidden sm:flex w-9 h-9 rounded-full bg-white shadow-card items-center justify-center text-brand-navy hover:text-brand-brick">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}