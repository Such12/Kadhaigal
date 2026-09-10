import { useState, useEffect, useMemo, useRef } from 'react'
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, User, Menu, X, Search, BookOpen } from 'lucide-react'
import Logo from './Logo.jsx'
import { useCustomerAuth } from '../../context/CustomerAuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { categories } from '../../data/categories.js'
import { getBooks } from '../../lib/booksStore.js'

const allLinks = [
  { label: 'Home', href: '/', end: true },
  { label: 'Books', href: '/bookstore', end: true },
  { label: "Children's Books", href: '/bookstore/kids' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const [allBooks, setAllBooks] = useState([])
  const inputRef = useRef(null)

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user } = useCustomerAuth()
  const { itemCount } = useCart()

  const isHome = pathname === '/'
  const links = isHome ? allLinks.slice(1) : allLinks

  // Pre-fetch books for instant live search suggestions
  useEffect(() => {
    let active = true
    getBooks().then((books) => {
      if (active) setAllBooks(books || [])
    })
    return () => {
      active = false
    }
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen) {
      setLocalQuery('')
    }
  }, [searchOpen])

  const visibleSuggestions = useMemo(() => {
    const q = (localQuery || '').trim().toLowerCase()
    if (!q) return []
    return allBooks
      .filter((book) => {
        const title = (book.title || '').toLowerCase()
        const author = (book.author || '').toLowerCase()
        const genre = (book.genre || '').toLowerCase()
        return title.includes(q) || author.includes(q) || genre.includes(q)
      })
      .slice(0, 6)
  }, [localQuery, allBooks])

  // Auto-focus input & handle body scroll lock when search overlay opens
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  // Close search overlay on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (pathname === '/account/login') return null

  function handleSearchSubmit(value) {
    const term = (value || '').trim()
    if (!term) return

    setLocalQuery('')
    setSearchOpen(false)
    navigate(`/bookstore/search?q=${encodeURIComponent(term)}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearchSubmit(localQuery)
    }
  }

  function handleSuggestionClick(book) {
    setLocalQuery('')
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
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-navy/5">
        <nav className="container-page flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium text-brand-navy">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  end={link.end}
                  className={({ isActive }) =>
                    `transition-colors hover:text-brand-brick ${
                      isActive ? 'underline underline-offset-8 decoration-brand-navy' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center gap-5 text-brand-navy">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hover:text-brand-brick transition-colors"
            >
              <Search size={22} strokeWidth={1.8} />
            </button>

            <button
              aria-label="Cart"
              onClick={() => navigate('/cart')}
              className="relative hover:text-brand-brick transition-colors"
            >
              <ShoppingBag size={22} strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-brick text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Toggle: Login button when logged out, Profile icon when logged in */}
            {user ? (
              <button
                aria-label="Account"
                onClick={() => navigate('/account')}
                className="hover:text-brand-brick transition-colors"
                title="Account"
              >
                <User size={22} strokeWidth={1.8} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/account/login')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-brand-navy/20 hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all text-brand-navy"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Actions: Search & Menu Toggle */}
          <div className="flex md:hidden items-center gap-3 text-brand-navy">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-1 hover:text-brand-brick transition-colors"
            >
              <Search size={22} strokeWidth={1.8} />
            </button>

            <button
              aria-label="Cart"
              onClick={() => navigate('/cart')}
              className="p-1 relative hover:text-brand-brick transition-colors"
            >
              <ShoppingBag size={22} strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-brick text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              className="p-1 text-brand-navy"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden container-page pb-6 border-t border-brand-navy/5 pt-4">
            <ul className="flex flex-col gap-4 text-brand-navy font-medium">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 transition-colors ${
                        isActive ? 'text-brand-brick font-semibold underline underline-offset-8 decoration-brand-navy' : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-brand-navy/10 text-brand-navy">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/account')
                  }}
                  className="flex items-center gap-2 text-sm font-medium hover:text-brand-brick transition-colors"
                >
                  <User size={20} strokeWidth={1.8} />
                  <span>My Account</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigate('/account/login')
                  }}
                  className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-navy text-white hover:bg-brand-brick transition-colors"
                >
                  Login / Sign Up
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  navigate('/cart')
                }}
                className="flex items-center gap-2 text-sm font-medium hover:text-brand-brick transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.8} />
                <span>Cart ({itemCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Full-screen search overlay ── */}
      <div
        className={`fixed inset-0 z-50 bg-brand-cream transition-opacity duration-300 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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

            {/* Underline input */}
            <div className="relative border-b border-brand-navy/20 mb-4">
              <input
                ref={inputRef}
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by title, author or ISBN…"
                className="w-full bg-transparent py-3 pr-10 text-xl sm:text-2xl font-display text-brand-navy placeholder:text-brand-navy/30 focus:outline-none"
              />
              {localQuery ? (
                <button
                  onClick={() => setLocalQuery('')}
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
                        <p className="text-xs sm:text-sm text-brand-navy/60 truncate mt-0.5">
                          {book.author || book.genre || 'Book'}
                        </p>
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
    </>
  )
}
