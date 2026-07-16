import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BookListingCard from '../../../../components/bookstore/BookListingCard.jsx'
import BookFilters from '../../../../components/bookstore/BookFilters.jsx'
import BookstoreNavbar from '../../../../components/bookstore/BookstoreNavbar.jsx'
import { getBooksByGenre, getBooksBySubGenre } from '../../../../lib/booksStore.js'
import { categories } from '../../../../data/categories.js'
import { kidsCategories } from '../../../../data/kidsCategories.js'

const allCategories = [...categories, ...kidsCategories]

export default function GenrePage() {
  const { genre: slug } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ price: [] })
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const category = allCategories.find((c) => c.slug === slug)
  const genreName = category?.name ?? slug

  useEffect(() => {
    setLoading(true)
    const fetchBooks = category?.isSubGenre
      ? getBooksBySubGenre(genreName)
      : getBooksByGenre(genreName)

    fetchBooks.then((data) => {
      setBooks(data)
      setLoading(false)
    })
  }, [genreName, category])

  return (
    <>
      <BookstoreNavbar />
      <div className="container-page py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy">
            {genreName}
          </h1>
          {category?.description && (
            <p className="text-brand-navy/60 mt-4">{category.description}</p>
          )}
        </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(220px,260px)_1fr] gap-8">
        <aside className="hidden lg:block">
          <BookFilters filters={filters} onChange={setFilters} />
        </aside>

        <main>
          <div className="flex items-center justify-between mt-2 mb-4">
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

          <div className="flex items-center justify-between border-y border-brand-navy/10 py-3 mb-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-brand-navy/50 uppercase tracking-wide">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-brand-navy/10 shadow-sm rounded-lg px-3 py-1.5 text-brand-navy font-medium outline-none cursor-pointer focus:ring-2 focus:ring-brand-brick/50 focus:border-brand-brick"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Discount</option>
              </select>
            </div>
            <p className="text-brand-navy/50">
              {loading ? 'Loading…' : `Showing ${books.length} of ${books.length} results`}
            </p>
          </div>

          {loading ? (
            <p className="text-brand-navy/50">Loading…</p>
          ) : books.length === 0 ? (
            <p className="text-brand-navy/50">No books in this category yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books
                .filter((b) => {
                  // price filter
                  if (filters.price && filters.price.length > 0) {
                    const p = b.price || 0
                    const ok = filters.price.some((r) => {
                      if (r === 'lt400') return p < 400
                      if (r === '400to600') return p >= 400 && p <= 600
                      if (r === 'gt600') return p > 600
                      return true
                    })
                    if (!ok) return false
                  }
                  return true
                })
                .sort((a, b) => {
                  if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0)
                  if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0)
                  if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0)
                  return 0 // featured (default order)
                })
                .map((book) => (
                  <BookListingCard key={book.id} book={book} />
                ))}
            </div>
          )}
        </main>
      </div>
      </div>
    </>
  )
}