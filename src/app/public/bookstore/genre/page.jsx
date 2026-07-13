import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BookListingCard from '../../../../components/bookstore/BookListingCard.jsx'
import BookFilters from '../../../../components/bookstore/BookFilters.jsx'
import SearchBar from '../../../../components/bookstore/SearchBar.jsx'
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
  const [showSticky, setShowSticky] = useState(false)
  const titleRef = useRef(null)

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

  useEffect(() => {
    function onScroll() {
      const headerHeight = 80
      const rect = titleRef.current?.getBoundingClientRect()
      if (!rect) return
      setShowSticky(rect.top <= headerHeight)
    }
    
    // Check immediately on mount
    setTimeout(onScroll, 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [titleRef])

  return (
    <div className="container-page py-16">
      <div ref={titleRef} className="text-center max-w-2xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-navy">
          {genreName}
        </h1>
        {category?.description && (
          <p className="text-brand-navy/60 mt-4">{category.description}</p>
        )}
      </div>

      <div className={`fixed left-1/2 transform -translate-x-1/2 top-20 z-50 w-full max-w-7xl px-5 sm:px-8 lg:px-12 bg-brand-cream/95 transition-opacity duration-200 ${showSticky ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-3xl mx-auto py-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>
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
                .map((book) => (
                  <BookListingCard key={book.id} book={book} />
                ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}