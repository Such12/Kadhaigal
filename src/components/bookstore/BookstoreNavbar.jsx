import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { X, ShoppingBag, User, Search } from 'lucide-react'

const links = [
  { label: 'Books', href: '/bookstore', end: true },
  { label: "Children's Books", href: '/bookstore/kids' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

/**
 * Shared bookstore navbar used on all /bookstore* pages.
 *
 * Props:
 *   query        — controlled search value (optional, used on main bookstore page)
 *   onQueryChange — callback when search input changes (optional)
 *
 * When onQueryChange is not provided, pressing Enter in the search box
 * navigates the user to /bookstore?q=<value> so they land on search results.
 */
export default function BookstoreNavbar({ query = '', onQueryChange }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [localQuery, setLocalQuery] = useState('')
  const navigate = useNavigate()

  // If a controlled handler is provided, use it; otherwise use local state + navigate
  const isControlled = typeof onQueryChange === 'function'
  const inputValue = isControlled ? query : localQuery

  function handleChange(e) {
    if (isControlled) {
      onQueryChange(e.target.value)
    } else {
      setLocalQuery(e.target.value)
    }
  }

  function handleKeyDown(e) {
    if (!isControlled && e.key === 'Enter' && localQuery.trim()) {
      navigate(`/bookstore?q=${encodeURIComponent(localQuery.trim())}`)
    }
  }

  return (
    <>
      <header className="relative z-30 flex items-center px-6 sm:px-10 lg:px-16 py-5 bg-brand-cream">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="Kadhaigal" className="h-10 sm:h-12 w-auto" />
        </a>

        {/* Search bar — absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2 w-64 sm:w-96">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-3 flex items-center text-brand-navy/50">
              <Search size={16} />
            </span>
            <input
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search by Title, Author or ISBN"
              className="w-full border border-brand-navy/10 rounded-full pl-9 pr-4 py-2 bg-white text-xs placeholder:text-brand-navy/40 shadow-card focus:outline-none focus:border-brand-brick/40 transition-colors"
            />
          </label>
        </div>

        {/* Right side icons + hamburger */}
        <div className="ml-auto flex items-center gap-4 text-brand-navy shrink-0">
          <button aria-label="Cart" className="hover:text-brand-brick transition-colors hidden sm:block">
            <ShoppingBag size={20} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hover:text-brand-brick transition-colors hidden sm:block">
            <User size={20} strokeWidth={1.8} />
          </button>
          {/* Hamburger */}
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

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-brand-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
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
                    `font-display font-bold text-xl transition-colors hover:text-brand-brick ${
                      isActive ? 'text-brand-brick' : 'text-brand-navy'
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
            <ShoppingBag size={20} strokeWidth={1.8} />
          </button>
          <button aria-label="Account" className="hover:text-brand-brick transition-colors">
            <User size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </>
  )
}
