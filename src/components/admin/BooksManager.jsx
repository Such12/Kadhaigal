import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../../lib/booksStore.js'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'

const emptyForm = { title: '', author: '', genre: '', price: '', description: '' }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      genre: form.genre.trim(),
      description: form.description.trim(),
      price: Number(form.price) || 0,
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
    setForm({
      title: book.title ?? '',
      author: book.author ?? '',
      genre: book.genre ?? '',
      price: String(book.price ?? ''),
      description: book.description ?? '',
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

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <h2 className="font-display font-bold text-lg text-brand-navy">
          {editingId ? 'Edit Book' : 'Add a Book'}
        </h2>
        <p className="text-sm text-brand-navy/60 mt-1 mb-6">
          These fields power both the bookstore listing (title, author, price)
          and the detail page (title, genre, author, description, price).
        </p>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Title" value={form.title} onChange={handleChange('title')} className="bg-brand-cream" />
          <Input placeholder="Author" value={form.author} onChange={handleChange('author')} className="bg-brand-cream" />
          <Input placeholder="Genre" value={form.genre} onChange={handleChange('genre')} className="bg-brand-cream" />
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
            className="sm:col-span-2 w-full rounded-2xl px-5 py-3 text-sm text-brand-navy bg-brand-cream placeholder:text-brand-navy/40 border border-brand-navy/10 focus:outline-none focus:ring-2 focus:ring-brand-sage resize-none"
          />

          <div className="sm:col-span-2 flex gap-3">
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
                  <p className="font-semibold text-brand-navy truncate">{book.title}</p>
                  <p className="text-sm text-brand-navy/60 truncate">
                    {book.author} {book.genre && `· ${book.genre}`}
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
