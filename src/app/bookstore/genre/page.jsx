import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BookListingCard from '../../../../components/bookstore/BookListingCard.jsx'
import { getBooksByGenre } from '../../../../lib/booksStore.js'
import { categories } from '../../../../data/categories.js'

export default function GenrePage() {
  const { genre: slug } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const category = categories.find((c) => c.slug === slug)
  const genreName = category?.name ?? slug

  useEffect(() => {
    setLoading(true)
    getBooksByGenre(genreName).then((data) => {
      setBooks(data)
      setLoading(false)
    })
  }, [genreName])

  return (
    <div className="container-page py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy">
          {genreName}
        </h1>
        {category?.description && (
          <p className="text-brand-navy/60 mt-4">{category.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between mt-14 mb-4">
        <h2 className="font-display font-bold text-2xl text-brand-navy">Our Collection</h2>
        <div className="hidden sm:flex gap-2">
          <button
            aria-label="Previous"
            className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-brick"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next"
            className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-brick"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-brand-navy/10 py-3 mb-8 text-xs sm:text-sm">
        <p className="text-brand-navy/50 uppercase tracking-wide">
          Sort By: <span className="text-brand-navy font-medium normal-case">Featured</span>
        </p>
        <p className="text-brand-navy/50">
          {loading ? 'Loading…' : `Showing ${books.length} of ${books.length} results`}
        </p>
      </div>

      {loading ? (
        <p className="text-brand-navy/50">Loading…</p>
      ) : books.length === 0 ? (
        <p className="text-brand-navy/50">No books in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookListingCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}