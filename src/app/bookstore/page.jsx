import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../../../components/bookstore/SearchBar.jsx'
import BookListingCard from '../../../components/bookstore/BookListingCard.jsx'
import { getBooks } from '../../../lib/booksStore.js'

export default function BooksIndexPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    getBooks().then((data) => {
      setBooks(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    if (!query) return books
    const q = query.toLowerCase()
    return books.filter((b) => {
      return (
        (b.title || '').toLowerCase().includes(q) ||
        (b.author || '').toLowerCase().includes(q) ||
        (b.genre || '').toLowerCase().includes(q)
      )
    })
  }, [books, query])

  return (
    <div className="container-page py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl text-brand-navy mb-6">Books</h1>

        <div className="mb-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        {loading ? (
          <p className="text-brand-navy/50">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-brand-navy/50">No books found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((book) => (
              <BookListingCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
