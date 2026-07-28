import { useState, useEffect, useMemo } from 'react'
import { Plus, Pencil, Trash2, Search, BookOpen } from 'lucide-react'
import { getBooks, addBook, updateBook, deleteBook } from '../../../lib/booksStore.js'
import BookFormModal from './BookFormModel.jsx'

export default function AdminBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // { mode: 'add' | 'edit', book?: object }
  const [deletingId, setDeletingId] = useState(null)
  const [saving, setSaving] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (err) {
      setError('Could not load books.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return books
    return books.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.authors?.some((a) => a.toLowerCase().includes(q)) ||
        b.genre?.toLowerCase().includes(q) ||
        b.industryIdentifiers?.some((i) => i.identifier?.includes(q))
    )
  }, [books, search])

  async function handleSave(bookData) {
    setSaving(true)
    try {
      if (modal.mode === 'edit') {
        await updateBook(modal.book.id, bookData)
      } else {
        await addBook(bookData)
      }
      setModal(null)
      await refresh()
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    await deleteBook(deletingId)
    setDeletingId(null)
    await refresh()
  }

  return (
    <div className="min-h-screen bg-brand-cream/40 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy">
              Manage Books
            </h1>
            <p className="text-sm text-brand-navy/60 mt-1">
              {books.length} book{books.length !== 1 ? 's' : ''} in the catalogue
            </p>
          </div>
          <button
            onClick={() => setModal({ mode: 'add' })}
            className="inline-flex items-center gap-2 bg-brand-brick text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#9c380c] transition-colors self-start"
          >
            <Plus size={16} /> Add Book
          </button>
        </div>

        <div className="relative mb-6 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-navy/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, genre, ISBN…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-navy/40 focus:outline-none focus:ring-2 focus:ring-brand-brick/30"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <div className="bg-white rounded-xl border border-brand-navy/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left border-b border-brand-navy/10 bg-brand-navy/[0.03]">
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Book</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Genre</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Price</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70">Tags</th>
                <th className="px-4 py-3 font-semibold text-brand-navy/70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-brand-navy/50">
                    Loading books…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-brand-navy/50">
                    No books found.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-brand-navy/5 last:border-0 hover:bg-brand-navy/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {book.imageLinks?.thumbnail ? (
                          <img
                            src={book.imageLinks.thumbnail}
                            alt=""
                            className="w-9 h-12 object-cover rounded-sm shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-12 rounded-sm bg-brand-sage/20 flex items-center justify-center shrink-0">
                            <BookOpen size={14} className="text-brand-navy/40" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-navy truncate max-w-[220px]">
                            {book.title}
                          </p>
                          <p className="text-xs text-brand-navy/50 truncate max-w-[220px]">
                            {book.authors?.join(', ')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brand-navy/70">{book.genre ?? '—'}</td>
                    <td className="px-4 py-3 text-brand-navy/70">
                      {book.price != null ? `₹${book.price}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {book.isStaffPick && <Tag label="Staff Pick" />}
                        {book.isSelfPublished && <Tag label="Self-Published" />}
                        {book.isUsed && <Tag label="Pre-loved" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setModal({ mode: 'edit', book })}
                          className="p-2 rounded-lg hover:bg-brand-navy/5 text-brand-navy/60 hover:text-brand-navy"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeletingId(book.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-brand-navy/60 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <BookFormModal
          mode={modal.mode}
          initialBook={modal.book}
          saving={saving}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deletingId && (
        <ConfirmDeleteDialog onCancel={() => setDeletingId(null)} onConfirm={confirmDelete} />
      )}
    </div>
  )
}

function Tag({ label }) {
  return (
    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-sage/20 text-brand-navy/70">
      {label}
    </span>
  )
}

function ConfirmDeleteDialog({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="font-display font-bold text-lg text-brand-navy">Remove this book?</h3>
        <p className="text-sm text-brand-navy/60 mt-2">
          This can't be undone. The book will be removed from the catalogue immediately.
        </p>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-brand-navy/70 hover:bg-brand-navy/5 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}