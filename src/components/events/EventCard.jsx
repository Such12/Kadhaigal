import { Link } from 'react-router-dom'
import { Calendar, Clock, Sparkles, Ticket, BookOpen, Mic2, Users, Baby, PenTool } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

const CATEGORY_ICONS = {
  Workshop: PenTool,
  Reading: BookOpen,
  'Open Mic': Mic2,
  Meetup: Users,
  Kids: Baby,
}

function formatDateLabel(event) {
  if (event.scheduleLabel) return event.scheduleLabel
  if (!event.date) return ''
  const d = new Date(`${event.date}T00:00:00`)
  return d.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })
}

function formatTimeLabel(event) {
  if (!event.startTime) return ''
  const format = (t) => {
    const [h, m] = t.split(':')
    const hour = ((Number(h) + 11) % 12) + 1
    const ampm = Number(h) < 12 ? 'AM' : 'PM'
    return `${hour}:${m} ${ampm}`
  }
  return event.endTime ? `${format(event.startTime)} – ${format(event.endTime)}` : format(event.startTime)
}

export default function EventCard({ event }) {
  const CategoryIcon = CATEGORY_ICONS[event.category] || Calendar
  const isFree = !event.price
  const ctaLabel = event.ctaLabel || (isFree ? 'Register for Event' : `Book Tickets — ₹${event.price}`)

  return (
    <div className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl shadow-card overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3]">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder label={event.title} className="w-full h-full" />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#3f6b2a] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
          {isFree ? <Sparkles size={11} /> : <Ticket size={11} />}
          {isFree ? 'Free Event' : 'Ticketed'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-brick mb-2">
          <CategoryIcon size={13} /> {event.category || 'Event'}
        </p>
        <p className="font-display font-bold text-lg text-brand-navy mb-2">{event.title}</p>
        {event.description && (
          <p className="text-sm text-brand-navy/60 leading-relaxed mb-4 line-clamp-3">{event.description}</p>
        )}

        <div className="space-y-1.5 mb-5 mt-auto">
          {formatDateLabel(event) && (
            <p className="flex items-center gap-2 text-sm text-brand-navy/70">
              <Calendar size={14} className="text-brand-navy/40" /> {formatDateLabel(event)}
            </p>
          )}
          {formatTimeLabel(event) && (
            <p className="flex items-center gap-2 text-sm text-brand-navy/70">
              <Clock size={14} className="text-brand-navy/40" /> {formatTimeLabel(event)}
            </p>
          )}
        </div>

        <Link
          to="/contact"
          className="block text-center bg-[#F3AE8D] text-brand-navy font-semibold text-sm py-3 rounded-full hover:brightness-95 transition-all"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}