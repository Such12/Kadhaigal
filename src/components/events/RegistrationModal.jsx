// Placeholder component for the event registration modal.

export default function RegistrationModal({ open, onClose, event }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <p className="font-display font-bold text-brand-navy mb-2">
          Register for {event?.title ?? 'this event'}
        </p>
        <button onClick={onClose} className="text-sm text-brand-brick underline">
          Close
        </button>
      </div>
    </div>
  )
}
