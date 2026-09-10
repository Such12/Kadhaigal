import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookListingCard from '../../../../components/bookstore/BookListingCard.jsx'
import { categories } from '../../../../data/categories.js'
import { getBooks } from '../../../../lib/booksStore.js'

export default function BookstoreSearchPage() {
  const [searchParams] = useSearchParams()
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const query = (searchParams.get('q') || '').trim()

  useEffect(() => {
    setLoading(true)
    getBooks().then((books) => {
      setAllBooks(books)
      setLoading(false)
    })
  }, [])

  const results = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return allBooks.filter((book) => {
      const title = (book.title || '').toLowerCase()
      const author = (book.author || '').toLowerCase()
      const genre = (book.genre || '').toLowerCase()
      return title.includes(q) || author.includes(q) || genre.includes(q)
    })
  }, [allBooks, query])

  const suggestedCategories = categories.slice(0, 4)

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy">
      <main className="container-page py-10 sm:py-16">
        {!query ? (
          <div className="rounded-[2rem] border border-brand-navy/10 bg-white/50 px-6 py-12 text-center shadow-sm">
            <p className="font-display text-3xl sm:text-4xl">Search for a book</p>
            <p className="mt-3 text-brand-navy/70">Use the bookstore search to find your next read.</p>
          </div>
        ) : loading ? (
          <p className="text-brand-navy/60">Searching for books…</p>
        ) : results.length === 0 ? (
          <div className="rounded-[2rem] border border-brand-navy/10 bg-brand-cream px-6 py-10 text-center shadow-sm sm:px-10">

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
          <>
            <p className="mb-6 text-brand-navy/60">
              Showing {results.length} result{results.length !== 1 ? 's' : ''} for “{query}”
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((book) => (
                <BookListingCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
