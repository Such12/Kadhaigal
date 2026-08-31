import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, BookOpen } from 'lucide-react'
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../../lib/booksStore.js'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'
import { allCategories } from '../../data/categories.js'

const emptyStaffNote = { by: '', role: '', quote: '', body: '' }

const emptyForm = {
  title: '',
  author: '',
  genre: '',
  price: '',
  description: '',
  isStaffPick: false,
  staffNote: emptyStaffNote,
}

export default function BooksManager() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const refresh = async () => {
    setBooks(await getBooks())
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleNoteChange = (field) => (e) =>
    setForm((f) => ({
      ...f,
      staffNote: { ...f.staffNote, [field]: e.target.value },
    }))

  const handleToggleStaffPick = () =>
    setForm((f) => ({ ...f, isStaffPick: !f.isStaffPick }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return

    const payload = {
      title: form.title.trim(),
      // Keep both `author` (legacy) and `authors` (Google Books shape)
      author: form.author.trim(),
      authors: [form.author.trim()],
      genre: form.genre.trim(),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      isStaffPick: form.isStaffPick,
      staffNote: form.isStaffPick
        ? {
            by: form.staffNote.by.trim(),
            role: form.staffNote.role.trim(),
            quote: form.staffNote.quote.trim(),
            body: form.staffNote.body.trim(),
          }
        : null,
    }

    if (editingId) {
      await updateBook(editingId, payload)
    } else {
      await addBook(payload)
    }

    setForm(emptyForm)
    setEditingId(null)
    refresh()
  }

  const startEdit = (book) => {
    setEditingId(book.id)
    const authorStr =
      book.authors?.join(', ') ?? book.author ?? ''
    setForm({
      title: book.title ?? '',
      author: authorStr,
      genre: book.genre ?? '',
      price: String(book.price ?? ''),
      description: book.description ?? '',
      isStaffPick: book.isStaffPick ?? false,
      staffNote: book.staffNote ?? emptyStaffNote,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleDelete = async (id) => {
    await deleteBook(id)
    if (editingId === id) cancelEdit()
    refresh()
  }

  // ── textarea shared style ──────────────────────────────────────────────────
  const textareaClass =
    'w-full rounded-2xl px-5 py-3 text-sm text-brand-navy bg-brand-cream placeholder:text-brand-navy/40 border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-sage resize-none'

  return (
    <div className="space-y-8">
      {/* ── Add / Edit form ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <h2 className="font-display font-bold text-lg text-brand-navy">
          {editingId ? 'Edit Book' : 'Add a Book'}
        </h2>
        <p className="text-sm text-brand-navy/60 mt-1 mb-6">
          These fields power the bookstore listing, detail page, and Staff Picks spotlight.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Core fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={handleChange('title')} className="bg-brand-cream" />
            <Input placeholder="Author" value={form.author} onChange={handleChange('author')} className="bg-brand-cream" />
            <select
              value={form.genre}
              onChange={handleChange('genre')}
              className="w-full rounded-2xl px-5 py-3 text-sm text-brand-navy bg-brand-cream border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-sage appearance-none"
            >
              <option value="">Select genre…</option>
              {allCategories.map((c) => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
            <Input
              type="number"
              min="0"
              placeholder="Price (₹)"
              value={form.price}
              onChange={handleChange('price')}
              className="bg-brand-cream"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={handleChange('description')}
              rows={3}
              className={`sm:col-span-2 ${textareaClass}`}
            />
          </div>

          {/* ── Staff Pick toggle ────────────────────────────────────────── */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              id="staff-pick-toggle"
              onClick={handleToggleStaffPick}
              aria-pressed={form.isStaffPick}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-brick focus:ring-offset-2
                ${form.isStaffPick ? 'bg-brand-brick' : 'bg-brand-navy/20'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
                  ${form.isStaffPick ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <label
              htmlFor="staff-pick-toggle"
              className="text-sm font-semibold text-brand-navy cursor-pointer select-none flex items-center gap-2"
              onClick={handleToggleStaffPick}
            >
              <BookOpen size={16} className="text-brand-brick" />
              Mark as Staff Pick
            </label>
          </div>

          {/* ── Staff note fields (conditional) ─────────────────────────── */}
          {form.isStaffPick && (
            <div className="bg-brand-cream/60 rounded-2xl p-5 space-y-4 border border-brand-navy/10 animate-[fadeIn_0.25s_ease-out]">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-brick">
                Staff Note — shown in the Staff Picks spotlight
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name (e.g. Priya)"
                  value={form.staffNote.by}
                  onChange={handleNoteChange('by')}
                  className="bg-white"
                />
                <Input
                  placeholder="Your role (e.g. Front counter)"
                  value={form.staffNote.role}
                  onChange={handleNoteChange('role')}
                  className="bg-white"
                />
              </div>
              <Input
                placeholder='One-liner quote (e.g. "The book I think about every day.")'
                value={form.staffNote.quote}
                onChange={handleNoteChange('quote')}
                className="bg-white"
              />
              <textarea
                placeholder="Your full review — why do you love this book? (2–4 sentences)"
                value={form.staffNote.body}
                onChange={handleNoteChange('body')}
                rows={4}
                className={textareaClass.replace('bg-brand-cream', 'bg-white')}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary">
              <Plus size={16} /> {editingId ? 'Save Changes' : 'Add Book'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* ── Inventory list ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <h2 className="font-display font-bold text-lg text-brand-navy mb-6">
          Inventory ({books.length})
        </h2>

        {loading ? (
          <p className="text-sm text-brand-navy/50">Loading…</p>
        ) : books.length === 0 ? (
          <p className="text-sm text-brand-navy/50">No books yet — add one above.</p>
        ) : (
          <div className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 border border-brand-navy/10 rounded-xl p-3"
              >
                <ImagePlaceholder label="" className="w-12 h-16 rounded-md shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-brand-navy truncate">{book.title}</p>
                    {book.isStaffPick && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-white bg-brand-brick px-2 py-0.5 rounded-full">
                        Staff Pick
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-brand-navy/60 truncate">
                    {book.authors?.join(', ') ?? book.author}{book.genre && ` · ${book.genre}`}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-brick shrink-0">
                  ₹{book.price}
                </p>
                <button
                  onClick={() => startEdit(book)}
                  aria-label={`Edit ${book.title}`}
                  className="text-brand-navy/50 hover:text-brand-navy shrink-0"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  aria-label={`Delete ${book.title}`}
                  className="text-brand-navy/50 hover:text-brand-brick shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
