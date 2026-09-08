import { useState, useEffect, useMemo } from 'react'
import { Plus, Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllEvents, addEvent, updateEvent, deleteEvent, getEventStatus } from '../../../lib/eventsStore.js'
import EventFormModal from '../../../components/admin/EventFormModal.jsx'

const PAGE_SIZE = 8

const STATUS_STYLES = {
  open: { label: 'Open for Registration', className: 'bg-brand-sage/20 text-[#3f6b2a]' },
  'in-progress': { label: 'In Progress', className: 'bg-brand-brick/15 text-brand-brick' },
  completed: { label: 'Completed', className: 'bg-brand-navy/10 text-brand-navy/50' },
}

function formatDateDMY(dateStr) {
  if (!dateStr) return '—'
  const [y, m, d] = dateStr.split('-')
  return `${d}-${m}-${y}`
}

function formatTime12h(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = ((Number(h) + 11) % 12) + 1
  const ampm = Number(h) < 12 ? 'AM' : 'PM'
  return `${hour}:${m} ${ampm}`
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  async function refresh() {
    setLoading(true)
    const data = await getAllEvents()
    setEvents(data)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return events
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q)
    )
  }, [events, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  async function handleSave(eventData) {
    setSaving(true)
    try {
      if (modal.mode === 'edit') {
        await updateEvent(modal.event.id, eventData)
      } else {
        await addEvent(eventData)
      }
      setModal(null)
      await refresh()
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    await deleteEvent(deletingId)
    setDeletingId(null)
    await refresh()
  }

  return (
    <div className="min-h-screen bg-brand-cream/40 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy">
              Manage Events
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events…"
                className="pl-9 pr-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-brick/30 w-48 sm:w-56"
              />
            </div>
            <button
              onClick={() => setModal({ mode: 'add' })}
              className="inline-flex items-center gap-2 bg-brand-brick text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#9c380c] transition-colors shrink-0"
            >
              <Plus size={16} /> Add Event
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-brand-navy/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left border-b border-brand-navy/10 bg-brand-navy/[0.03]">
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Event</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Date & Time</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Status</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Featured</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-brand-navy/50">Loading…</td></tr>
              ) : paged.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-brand-navy/50">No events found.</td></tr>
              ) : (
                paged.map((event) => {
                  const status = getEventStatus(event)
                  const statusStyle = STATUS_STYLES[status]
                  return (
                    <tr key={event.id} className="border-b border-brand-navy/5 last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-brand-navy">{event.title}</p>
                      </td>
                      <td className="px-4 py-3 text-brand-navy/70">
                        {formatDateDMY(event.date)}
                        {event.startTime && ` · ${formatTime12h(event.startTime)}`}
                        {event.endTime && `–${formatTime12h(event.endTime)}`}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyle.className}`}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {event.isFeatured && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-brick/15 text-brand-brick">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setModal({ mode: 'edit', event })} className="p-2 rounded-lg hover:bg-brand-navy/5 text-brand-navy/60 hover:text-brand-navy">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => setDeletingId(event.id)} className="p-2 rounded-lg hover:bg-red-50 text-brand-navy/60 hover:text-red-600">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-brand-navy/50">
              Page {page} of {totalPages} · {filtered.length} event{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-full bg-white border border-brand-navy/15 flex items-center justify-center text-brand-navy disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-full bg-white border border-brand-navy/15 flex items-center justify-center text-brand-navy disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <EventFormModal
          mode={modal.mode}
          initialEvent={modal.event}
          saving={saving}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-lg text-brand-navy">Remove this event?</h3>
            <p className="text-sm text-brand-navy/60 mt-2">This can't be undone.</p>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setDeletingId(null)} className="px-4 py-2 text-sm font-semibold text-brand-navy/70 hover:bg-brand-navy/5 rounded-lg">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}