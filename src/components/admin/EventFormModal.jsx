import { useState } from 'react'
import { X, AlertCircle, Loader2 } from 'lucide-react'
import ImageUploadField from './ImageUploadField.jsx'

const CATEGORIES = ['Workshop', 'Reading', 'Open Mic', 'Meetup', 'Kids', 'Other']
const ACCENTS = [
  { value: 'navy', label: 'Navy' },
  { value: 'brick', label: 'Brick' },
  { value: 'sage', label: 'Sage' },
]

function emptyForm() {
  return {
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    category: '',
    accent: 'navy',
    isFeatured: false,
    imageUrl: '',
    price: '',
    ctaLabel: '',
    scheduleLabel: '',
  }
}

function eventToForm(event) {
  if (!event) return emptyForm()
  return {
    title: event.title ?? '',
    description: event.description ?? '',
    date: event.date ?? '',
    startTime: event.startTime ?? '',
    endTime: event.endTime ?? '',
    category: event.category ?? '',
    accent: event.accent ?? 'navy',
    isFeatured: !!event.isFeatured,
    imageUrl: event.imageUrl ?? '',
    price: event.price ?? '',
    ctaLabel: event.ctaLabel ?? '',
    scheduleLabel: event.scheduleLabel ?? '',
  }
}

function formToEvent(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    date: form.date,
    startTime: form.startTime || undefined,
    endTime: form.endTime || undefined,
    category: form.category || undefined,
    accent: form.accent,
    isFeatured: form.isFeatured,
    imageUrl: form.imageUrl.trim() || undefined,
    price: form.price ? Number(form.price) : undefined,
    ctaLabel: form.ctaLabel.trim() || undefined,
    scheduleLabel: form.scheduleLabel.trim() || undefined,
  }
}

export default function EventFormModal({ mode, initialEvent, saving, onClose, onSave, onValidationError }) {
  const isEdit = mode === 'edit'
  const [form, setForm] = useState(() => eventToForm(initialEvent))
  const [error, setError] = useState('')

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) {
      const msg = 'Title is required.'
      setError(msg)
      if (onValidationError) onValidationError(msg)
      return
    }
    if (!form.date) {
      const msg = 'Date is required.'
      setError(msg)
      if (onValidationError) onValidationError(msg)
      return
    }
    try {
      await onSave(formToEvent(form))
    } catch (err) {
      setError(err.message || 'Could not save this event. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-navy/10 shrink-0">
            <h2 className="font-display font-bold text-lg text-brand-navy">
              {isEdit ? 'Edit Event' : 'Add Event'}
            </h2>
            <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-brand-navy/5 text-brand-navy/50">
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1 min-h-0">
            <Field label="Title" required>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
            </Field>

            <Field label="Description" hint="Shown on the noticeboard card and the events page">
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={2}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Date" required>
                <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className={inputClass} />
              </Field>
              <Field label="Start Time">
                <input type="time" value={form.startTime} onChange={(e) => set('startTime', e.target.value)} className={inputClass} />
              </Field>
              <Field label="End Time" hint="Used to know when it's over">
                <input type="time" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} className={inputClass} />
              </Field>
            </div>

            <Field label="Cover Image" hint="Shown on the Events page cards">
            <ImageUploadField
                bucket="event-images"
                value={form.imageUrl}
                onChange={(url) => set('imageUrl', url)}
            />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (₹)" hint="Leave blank for a free event">
                <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} />
              </Field>
            </div>

            <Field label="Schedule Override" hint='For recurring events, e.g. "Every Tuesday" — otherwise the date above is shown'>
              <input value={form.scheduleLabel} onChange={(e) => set('scheduleLabel', e.target.value)} className={inputClass} />
            </Field>

            <label className="flex items-center gap-2 text-sm text-brand-navy cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => set('isFeatured', e.target.checked)}
                className="w-4 h-4 rounded border-brand-navy/30 text-brand-brick focus:ring-brand-brick/30"
              />
              Feature this event on the Events page
            </label>

            {error && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <AlertCircle size={15} /> {error}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t border-brand-navy/10 shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-semibold text-brand-navy/70 hover:bg-brand-navy/5 rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-brand-brick hover:bg-[#9c380c] rounded-lg disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {isEdit ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-brick/30'

function Field({ label, hint, required, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block">
        {label} {required && <span className="text-brand-brick">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-brand-navy/40 mt-1">{hint}</p>}
    </div>
  )
}