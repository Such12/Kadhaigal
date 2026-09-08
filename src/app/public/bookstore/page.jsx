import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BooksHero from '../../../components/bookstore/BooksHero.jsx'
import CurationPhilosophy from '../../../components/bookstore/CurationPhilosophy.jsx'
import StaffPicks from '../../../components/bookstore/StaffPicks.jsx'
import ShopByCategory from '../../../components/bookstore/ShopByCategory.jsx'
import AuthorsWeLove from '../../../components/bookstore/AuthorsWeLove.jsx'
import JoinCommunity from '../../../components/home/JoinCommunity.jsx'
import BookListingCard from '../../../components/bookstore/BookListingCard.jsx'
import { getStaffPicks, getBooks } from '../../../lib/booksStore.js'
import { categories } from '../../../data/categories.js'
import LocalShelf from '../../../components/bookstore/LocalShelf.jsx'

export default function BookstorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [staffPicks, setStaffPicks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const activeQuery = (searchParams.get('q') || '').trim()
  const [query, setQuery] = useState(activeQuery)

  useEffect(() => {
    setQuery(activeQuery)
  }, [activeQuery])

  useEffect(() => {
    getStaffPicks().then((data) => {
      setStaffPicks(data.filter((b) => (b.genre || '').toLowerCase() !== "children's books"))
    })
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

  const handleQueryChange = (nextValue) => {
    const cleanValue = (nextValue || '').trim()
    setQuery(cleanValue)

    if (cleanValue) {
      setSearchParams({ q: cleanValue }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const suggestedCategories = categories.slice(0, 4)

  return (
    <>
      {/* Hero includes logo, hamburger nav, and search bar */}
      <BooksHero query={query} onQueryChange={handleQueryChange} />

      {/* Search results — shown below the hero when there is a query */}
      {query ? (
        <div className="container-page py-10 sm:py-14">
          <p className="text-brand-navy/60 mb-6">
            Showing {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>

          {loading ? (
            <p className="text-brand-navy/50">Loading…</p>
          ) : results.length === 0 ? (
            <div className="rounded-[2rem] border border-brand-navy/10 bg-brand-cream px-6 py-10 text-center shadow-sm sm:px-10">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-brick/10 text-3xl">
                📚
              </div>
              <p className="font-display text-3xl sm:text-4xl text-brand-navy">No book found for “{query}” yet.</p>
              <p className="mx-auto mt-4 max-w-xl text-brand-navy/70">
                We&apos;re still gathering a few lovely pages for that search. Try a nearby title, author, or explore a similar shelf.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {suggestedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/bookstore/genre/${cat.slug}`}
                    className="rounded-full border border-brand-navy/15 bg-brand-cream px-4 py-2 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-navy hover:text-brand-cream"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/bookstore"
                  className="inline-flex items-center rounded-full bg-brand-brick px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Browse all books
                </Link>
              </div>
            </div>
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
      <LocalShelf />
      <AuthorsWeLove />
      <JoinCommunity />
    </>
  )
}