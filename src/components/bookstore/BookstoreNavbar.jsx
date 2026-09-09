import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { X, ShoppingBag, User, Search, BookOpen } from 'lucide-react'
import { categories } from '../../data/categories.js'
import { getBooks } from '../../lib/booksStore.js'

const links = [
  { label: 'Home', href: '/', end: true },
  { label: 'Books', href: '/bookstore', end: true },
  { label: "Children's Books", href: '/bookstore/kids' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

export default function BookstoreNavbar({ query = '', onQueryChange }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const isControlled = typeof onQueryChange === 'function'
  const inputValue = localQuery

  // Pre-fetch/load books for instant local filtering
  useEffect(() => {
    let active = true
    getBooks().then((books) => {
      if (active) setAllBooks(books)
    })
    return () => { active = false }
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen) {
      setLocalQuery('')
    }
  }, [searchOpen])

  const visibleSuggestions = useMemo(() => {
    const q = (inputValue || '').trim().toLowerCase()
    if (!q) return []
    return allBooks.filter((book) => {
      const title = (book.title || '').toLowerCase()
      const author = (book.author || '').toLowerCase()
      const genre = (book.genre || '').toLowerCase()
      return title.includes(q) || author.includes(q) || genre.includes(q)
    }).slice(0, 6)
  }, [inputValue, allBooks])

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleChange(e) {
    setLocalQuery(e.target.value)
  }

  function handleSearchSubmit(value) {
    const term = (value || '').trim()
    if (!term) return

    setLocalQuery('')
    if (isControlled) {
      onQueryChange('')
    }

    setSearchOpen(false)
    navigate(`/bookstore/search?q=${encodeURIComponent(term)}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearchSubmit(inputValue)
    }
  }

  function handleSuggestionClick(book) {
    setLocalQuery('')
    if (isControlled) {
      onQueryChange('')
    }
    setSearchOpen(false)

    if (book && book.id) {
      navigate(`/bookstore/${book.id}`)
    } else {
      const term = book?.title || book?.author || book?.genre || ''
      if (!term) return
      navigate(`/bookstore/search?q=${encodeURIComponent(term)}`)
    }
  }

  function handleCategoryClick() {
    setSearchOpen(false)
  }

  return (
    <>
      {/* ── Main header bar ── */}
      <header className="sticky top-0 z-40 flex items-center px-6 sm:px-10 lg:px-16 py-4 sm:py-5 bg-brand-cream/95 backdrop-blur-md border-b border-brand-navy/5 transition-all">
        <a href="/" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="Kadhaigal" className="h-10 sm:h-12 w-auto" />
        </a>

        <div className="ml-auto flex items-center gap-5 text-brand-navy shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="hover:text-brand-brick transition-colors"
          >
            <Search size={25} strokeWidth={1.8} />
          </button>

          <button aria-label="Cart" className="hover:text-brand-brick transition-colors hidden sm:block">
            <ShoppingBag size={25} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hover:text-brand-brick transition-colors hidden sm:block">
            <User size={25} strokeWidth={1.8} />
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[5px] justify-center items-center w-10 h-10 hover:text-brand-brick transition-colors"
          >
            <span className="block w-6 h-0.5 bg-current rounded-full" />
            <span className="block w-6 h-0.5 bg-current rounded-full" />
            <span className="block w-6 h-0.5 bg-current rounded-full" />
          </button>
        </div>
      </header>

      {/* ── Full-screen search overlay ── */}
      <div
        className={`fixed inset-0 z-50 bg-brand-cream transition-opacity duration-300 ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="container-page max-w-4xl py-10 sm:py-14">

            {/* Close button */}
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="text-brand-navy hover:text-brand-brick transition-colors mb-10"
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            {/* SEARCH label */}
            <p className="font-display font-extrabold text-xs tracking-[0.25em] uppercase text-brand-navy mb-4">
              Search
            </p>

            {/* Underline input — minimal, like the reference */}
            <div className="relative border-b border-brand-navy/20 mb-4">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search by title, author or ISBN…"
                className="w-full bg-transparent py-3 pr-10 text-xl sm:text-2xl font-display text-brand-navy placeholder:text-brand-navy/30 focus:outline-none"
              />
              {inputValue ? (
                <button
                  onClick={() => {
                    setLocalQuery('')
                    if (isControlled) onQueryChange('')
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-navy/40 hover:text-brand-brick transition-colors"
                  aria-label="Clear"
                >
                  <X size={18} />
                </button>
              ) : (
                <Search size={18} className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-navy/30" />
              )}
            </div>

            {/* Suggestions dropdown */}
            {visibleSuggestions.length > 0 && (
              <div className="mb-12 rounded-2xl border border-brand-navy/10 bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm">
                {visibleSuggestions.map((book) => (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleSuggestionClick(book)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-brand-cream border-b border-brand-navy/5 last:border-0"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-14 shrink-0 overflow-hidden bg-brand-navy/5 border border-brand-navy/10 flex items-center justify-center">
                        {book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail ? (
                          <img
                            src={book.imageLinks.thumbnail || book.imageLinks.smallThumbnail}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen size={18} className="text-brand-navy/30" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-brand-navy font-medium text-sm sm:text-base truncate">{book.title}</p>
                        <p className="text-xs sm:text-sm text-brand-navy/60 truncate mt-0.5">{book.author || book.genre || 'Book'}</p>
                      </div>
                    </div>
                    {book.price ? (
                      <span className="text-sm text-brand-brick font-semibold shrink-0">₹{book.price}</span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}

            {/* CATEGORIES section */}
            <p className="font-display font-extrabold text-xs tracking-[0.25em] uppercase text-brand-navy mb-5">
              Categories
            </p>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/bookstore/genre/${cat.slug}`}
                  onClick={handleCategoryClick}
                  className="px-4 py-2 rounded-full border border-brand-navy/15 bg-brand-cream text-brand-navy text-sm font-body font-medium hover:bg-brand-navy hover:text-brand-cream transition-colors duration-200"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/bookstore/kids"
                onClick={handleCategoryClick}
                className="px-4 py-2 rounded-full border border-brand-navy/15 bg-brand-cream text-brand-navy text-sm font-body font-medium hover:bg-brand-navy hover:text-brand-cream transition-colors duration-200"
              >
                {"Children's Books"}
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Nav drawer backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Slide-out nav drawer ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-brand-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-navy/10">
          <img src="/logo.svg" alt="Kadhaigal" className="h-8 w-auto" />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="text-brand-navy hover:text-brand-brick transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  end={link.end}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `font-display font-bold text-xl transition-colors hover:text-brand-brick ${isActive ? 'text-brand-brick' : 'text-brand-navy'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 px-6 py-6 border-t border-brand-navy/10 text-brand-navy">
          <button aria-label="Cart" className="hover:text-brand-brick transition-colors">
            <ShoppingBag size={25} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hover:text-brand-brick transition-colors">
            <User size={25} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </>
  )
}
