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
    /* Outer wrapper: fixed carousel width, relative for the offset shadow */
    <div className="group relative shrink-0 w-72 sm:w-80 flex flex-col">

      {/* Hard navy offset shadow — matches ThreePillars style, shifts deeper on hover */}
      <div className="absolute inset-0 bg-brand-navy rounded-2xl translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />

      {/* Card body */}
      <div className="relative z-10 flex flex-col bg-[#FCFBF7] rounded-2xl border-[3px] border-brand-navy overflow-hidden flex-1 transition-transform duration-300 group-hover:-translate-y-1">

        {/* Image */}
        <div className="relative aspect-[4/3]">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder label={event.title} className="w-full h-full" />
          )}

          {/* Free / Ticketed badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border-2 border-brand-navy bg-[#3f6b2a] text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-[2px_2px_0px_0px_#142950]">
            {isFree ? <Sparkles size={11} /> : <Ticket size={11} />}
            {isFree ? 'Free Event' : 'Ticketed'}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="font-display font-bold text-base text-brand-navy mb-2 leading-snug">{event.title}</p>
          {event.description && (
            <p className="text-sm text-brand-navy/60 leading-relaxed mb-3 line-clamp-3">{event.description}</p>
          )}

          <div className="space-y-1.5 mb-4 mt-auto">
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

          {/* CTA — navy border + peach fill, hover inverts to navy */}
          <Link
            to="/contact"
            className="block text-center border-2 border-brand-navy bg-[#F3AE8D] text-brand-navy font-bold text-sm py-2.5 rounded-lg shadow-[2px_2px_0px_0px_#142950] hover:bg-brand-navy hover:text-brand-cream transition-all duration-200"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}