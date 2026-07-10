// Placeholder component for an individual event card on the /events page.

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <p className="font-display font-bold text-brand-navy">{event?.title ?? 'Event title'}</p>
      <p className="text-sm text-brand-navy/60">{event?.date ?? 'Date & time'}</p>
    </div>
  )
}
