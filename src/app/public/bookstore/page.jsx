import { useEffect, useMemo, useRef, useState } from 'react'
import BooksHero from '../../../components/bookstore/BooksHero.jsx'
import CurationPhilosophy from '../../../components/bookstore/CurationPhilosophy.jsx'
import StaffPicks from '../../../components/bookstore/StaffPicks.jsx'
import ShopByCategory from '../../../components/bookstore/ShopByCategory.jsx'
import ChildrensCorner from '../../../components/bookstore/ChildrensCorner.jsx'
import JoinCommunity from '../../../components/home/JoinCommunity.jsx'
import SearchBar from '../../../components/bookstore/SearchBar.jsx'
import BookListingCard from '../../../components/bookstore/BookListingCard.jsx'
import { getStaffPicks } from '../../../lib/booksStore.js'
import { getBooks } from '../../../lib/booksStore.js'
import { categories } from '../../../data/categories.js'

export default function BookstorePage() {
  const [staffPicks, setStaffPicks] = useState([])
  const [query, setQuery] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSticky, setShowSticky] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    getStaffPicks().then(setStaffPicks)
  }, [])

  useEffect(() => {
    setLoading(true)
    getBooks().then((data) => {
      setAllBooks(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    // fallback using scroll + bounding rect to determine when hero is scrolled past
    function onScroll() {
      const headerHeight = 80 // matches Navbar h-20
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      // show sticky when hero top is above or equal to header height
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
  }, [heroRef])

  const results = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return allBooks.filter((b) => {
      return (
        (b.title || '').toLowerCase().includes(q) ||
        (b.author || '').toLowerCase().includes(q) ||
        (b.genre || '').toLowerCase().includes(q)
      )
    })
  }, [allBooks, query])

  return (
    <>
      <div ref={heroRef}>
        <BooksHero />
      </div>

      {/* Fixed search bar that appears after hero is scrolled past. Using fixed positioning
          keeps it visible for the entire scroll. Visibility is toggled with opacity + pointer-events. */}
      <div
        className={`fixed left-1/2 transform -translate-x-1/2 top-20 z-50 w-full max-w-7xl px-5 sm:px-8 lg:px-12 bg-brand-cream/95 transition-opacity duration-200 ${
          showSticky ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-3xl mx-auto pb-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Search results (shows when query present) */}
      {query ? (
        <div className="container-page mt-28">
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-brand-navy/60 mb-4">Showing {results.length} results for "{query}"</p>
            {loading ? (
              <p className="text-brand-navy/50">Loading…</p>
            ) : results.length === 0 ? (
              <p className="text-brand-navy/50">No books found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map((book) => (
                  <BookListingCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      <CurationPhilosophy />
      <StaffPicks books={staffPicks} />
      <ShopByCategory categories={categories} />
      <ChildrensCorner />
      <JoinCommunity />
    </>
  )
}