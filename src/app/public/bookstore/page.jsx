import { useEffect, useMemo, useState } from 'react'
import BooksHero from '../../../components/bookstore/BooksHero.jsx'
import CurationPhilosophy from '../../../components/bookstore/CurationPhilosophy.jsx'
import StaffPicks from '../../../components/bookstore/StaffPicks.jsx'
import ShopByCategory from '../../../components/bookstore/ShopByCategory.jsx'
import ChildrensCorner from '../../../components/bookstore/ChildrensCorner.jsx'
import JoinCommunity from '../../../components/home/JoinCommunity.jsx'
import BookListingCard from '../../../components/bookstore/BookListingCard.jsx'
import { getStaffPicks, getBooks } from '../../../lib/booksStore.js'
import { categories } from '../../../data/categories.js'

export default function BookstorePage() {
  const [staffPicks, setStaffPicks] = useState([])
  const [query, setQuery] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)

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

  const results = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return allBooks.filter((b) =>
      (b.title || '').toLowerCase().includes(q) ||
      (b.author || '').toLowerCase().includes(q) ||
      (b.genre || '').toLowerCase().includes(q)
    )
  }, [allBooks, query])

  return (
    <>
      {/* Hero includes logo, hamburger nav, and search bar */}
      <BooksHero query={query} onQueryChange={setQuery} />

      {/* Search results — shown below the hero when there is a query */}
      {query ? (
        <div className="container-page py-10">
          <p className="text-brand-navy/60 mb-6">
            Showing {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
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
      ) : null}

      <CurationPhilosophy />
      <StaffPicks books={staffPicks} />
      <ShopByCategory categories={categories} />
      <ChildrensCorner />
      <JoinCommunity />
    </>
  )
}