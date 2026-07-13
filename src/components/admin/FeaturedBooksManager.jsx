import { useEffect, useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import {
  getFeaturedBooks,
  addFeaturedBook,
  removeFeaturedBook,
} from '../../lib/booksStore.js'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'
import Button from '../ui/Button.jsx'
import Input from '../ui/Input.jsx'

export default function FeaturedBooksManager() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    setBooks(await getFeaturedBooks())
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    await addFeaturedBook({ title: title.trim(), author: author.trim() })
    setTitle('')
    setAuthor('')
    refresh()
  }

  const handleRemove = async (id) => {
    await removeFeaturedBook(id)
    refresh()
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
      <h2 className="font-display font-bold text-lg text-brand-navy">
        What We're Loving Right Now
      </h2>
      <p className="text-sm text-brand-navy/60 mt-1 mb-6">
        These books appear in the homepage carousel. Add a title and author
        — the cover shows as a placeholder until real cover art is wired up.
      </p>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-8">
        <Input
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-brand-cream"
        />
        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="bg-brand-cream"
        />
        <Button type="submit" variant="primary" className="shrink-0">
          <Plus size={16} /> Add
        </Button>
      </form>

      {loading ? (
        <p className="text-sm text-brand-navy/50">Loading…</p>
      ) : books.length === 0 ? (
        <p className="text-sm text-brand-navy/50">No featured books yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <div key={book.id} className="relative group">
              <ImagePlaceholder
                label={book.title}
                className="aspect-[2/3] rounded-lg w-full"
              />
              <p className="text-xs font-semibold text-brand-navy mt-2 truncate">
                {book.title}
              </p>
              <p className="text-xs text-brand-navy/50 truncate">{book.author}</p>
              <button
                onClick={() => handleRemove(book.id)}
                aria-label={`Remove ${book.title}`}
                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white shadow-card flex items-center justify-center text-brand-brick opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
