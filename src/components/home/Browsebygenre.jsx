// src/components/home/BrowseByGenre.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { getBooksByGenre } from '../../lib/booksStore'
import { genreCategories } from '../../data/genreCategories'

const CARD_WIDTH = 175 // px, matching What's Trending w-[155px] sm:w-[175px]
const CARD_GAP = 20 // px, keep in sync with gap-5
const MAX_BOOKS = 10
//const VISIBLE_COUNT = 5 // Maximum categories visible at once on the left rail

const SPINES = [
  { bg: '#B7410E', fg: '#F5F5DC' },
  { bg: '#142950', fg: '#F5F5DC' },
  { bg: '#5C7A46', fg: '#F5F5DC' },
  { bg: '#9DC183', fg: '#142950' },
  { bg: '#8B3009', fg: '#F5F5DC' },
  { bg: '#28406B', fg: '#F5F5DC' },
]

function ChevronIcon({ direction = 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function BookCover({ book, index }) {
  const thumbnail = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail

  if (thumbnail) {
    return (
      <Link to={book.id ? `/bookstore/${book.id}` : '#'} className="block relative">
        <div className="aspect-[2/3] w-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative bg-brand-navy/[0.04]">
          <img
            src={thumbnail}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
    )
  }

  const spine = SPINES[index % SPINES.length]
  return (
    <Link to={book.id ? `/bookstore/${book.id}` : '#'} className="block relative">
      <div
        className="relative flex aspect-[2/3] w-full items-end overflow-hidden p-3.5 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: spine.bg }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-3 select-none font-display text-7xl opacity-15"
          style={{ color: spine.fg }}
        >
          {book.title?.charAt(0) ?? '?'}
        </span>
        <p className="relative font-display text-xs leading-snug line-clamp-3" style={{ color: spine.fg }}>
          {book.title}
        </p>
      </div>
    </Link>
  )
}

function BookCard({ book, index }) {
  const hasDiscount = book.originalPrice != null && book.originalPrice > book.price
  const off = hasDiscount ? Math.round(book.originalPrice - book.price) : null

  return (
    <article className="group flex w-[155px] sm:w-[175px] shrink-0 snap-start flex-col gap-2.5">
      <BookCover book={book} index={index} />
      <div className="flex flex-col gap-1">
        <Link to={book.id ? `/bookstore/${book.id}` : '#'}>
          <h3 className="line-clamp-2 min-h-[2.5rem] font-body text-sm font-semibold text-brand-navy transition-colors group-hover:text-brand-brick">
            {book.title}
          </h3>
        </Link>
        <p className="line-clamp-1 font-body text-xs text-brand-navy/55">{book.author}</p>
        <div className="mt-1 flex items-center justify-between gap-1.5">
          {book.price != null ? (
            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
              <span className="font-body text-sm font-bold text-brand-navy">₹{book.price}</span>
              {hasDiscount && (
                <span className="font-body text-xs text-brand-navy/35 line-through">
                  ₹{book.originalPrice}
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-full bg-brand-sage/30 px-1.5 py-0.5 font-body text-[0.65rem] font-medium text-brand-navy/80">
                  ₹{off} Off
                </span>
              )}
            </div>
          ) : (
            <div />
          )}
          <button
            type="button"
            aria-label={`Add ${book.title} to cart`}
            title="Add to Cart"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-brick text-brand-cream transition-all duration-200 hover:bg-brand-brick/90 hover:scale-105 active:scale-95 shadow-sm"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

function ShowMoreCard({ slug, label }) {
  return (
    <div className="flex w-[155px] sm:w-[175px] shrink-0 snap-start flex-col gap-2.5">
      <Link
        to={`/bookstore/genre/${slug}`}
        className="group flex aspect-[2/3] w-full flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-brand-navy/25 p-4 text-center text-brand-navy transition-all duration-300 hover:border-brand-brick hover:text-brand-brick hover:-translate-y-1 shadow-md hover:shadow-xl bg-white/25"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-current transition-transform duration-300 group-hover:scale-110">
          <ChevronIcon direction="right" />
        </span>
        <span className="font-body text-xs sm:text-sm font-semibold leading-snug">
          Browse all {label}
        </span>
      </Link>
    </div>
  )
}

function ShelfSkeleton() {
  return (
    <div className="flex gap-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex w-[155px] sm:w-[175px] shrink-0 flex-col gap-3 animate-pulse">
          <div className="aspect-[2/3] w-full rounded bg-brand-navy/10" />
          <div className="h-4 w-4/5 rounded bg-brand-navy/10" />
          <div className="h-3 w-3/5 rounded bg-brand-navy/10" />
        </div>
      ))}
    </div>
  )
}

export default function BrowseByGenre() {
  const [activeSlug, setActiveSlug] = useState(genreCategories[0].slug)
  const [booksBySlug, setBooksBySlug] = useState({})
  const [loadingSlug, setLoadingSlug] = useState(null)
  const [errorSlug, setErrorSlug] = useState(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const trackRef = useRef(null)

  const activeCategory =
    genreCategories.find((c) => c.slug === activeSlug) ?? genreCategories[0]
  const books = booksBySlug[activeSlug]

  // Sliding window to show strictly 5 categories with active items kept near center
  const visibleCategories = useMemo(() => {
    const total = genreCategories.length
    const activeIndex = genreCategories.findIndex((c) => c.slug === activeSlug)
    const result = []

    // Take 2 items before active, active item, and 2 items after active using modulo wrap
    for (let offset = -2; offset <= 2; offset++) {
      const targetIndex = (activeIndex + offset + total) % total
      result.push({
        ...genreCategories[targetIndex],
        virtualKey: `${genreCategories[targetIndex].slug}-${offset}`, // unique key per slot position
      })
    }
    return result
  }, [activeSlug])

  const loadGenre = useCallback((category) => {
    setLoadingSlug(category.slug)
    setErrorSlug(null)
    getBooksByGenre(category.genre)
      .then((data) => {
        setBooksBySlug((prev) => ({ ...prev, [category.slug]: data.slice(0, MAX_BOOKS) }))
      })
      .catch((err) => {
        console.error(`Failed to load "${category.genre}" books:`, err)
        setErrorSlug(category.slug)
      })
      .finally(() => setLoadingSlug(null))
  }, [])

  useEffect(() => {
    if (booksBySlug[activeSlug] === undefined) {
      loadGenre(activeCategory)
    }
  }, [activeSlug, activeCategory, booksBySlug, loadGenre])

  const updateArrowState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    const id = requestAnimationFrame(updateArrowState)
    return () => cancelAnimationFrame(id)
  }, [activeSlug, books, updateArrowState])

  const scrollByCards = (direction) => {
    const el = trackRef.current
    if (!el) return
    const amount = (CARD_WIDTH + CARD_GAP) * 2 * direction
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="mx-8 bg-brand-cream py-8 md:py-12 select-none">
      {/* Dynamic container smooth color transition */}
      <div
        className="mx-auto max-w-7xl rounded-3xl  md:p-12 transition-colors duration-500 ease-in-out shadow-sm"
        style={{ backgroundColor: activeCategory.bgColor || '#BBF0B1' }}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">

          {/* Genre rail - Dynamic 5 items visible window.
              Labels are truncated to a single line (never wrap) so every
              row is the same height by construction — no stretch tricks
              or min-height coordination with the shelf column needed.
              grid-rows-5 still divides the rail evenly across whatever
              total height it ends up with. */}
          <nav aria-label="Browse by genre" className="grid grid-rows-5">
            {visibleCategories.map((category) => {
              const isActive = category.slug === activeSlug
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveSlug(category.slug)}
                  aria-pressed={isActive}
                  title={category.label}
                  className={`flex min-w-0 items-center text-left font-display transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 ${
                    isActive
                      ? 'text-4xl font-bold text-brand-navy md:text-[2.75rem] scale-100 translate-x-1'
                      : 'text-3xl text-brand-navy/25 hover:text-brand-navy/50 md:text-4xl scale-95 origin-left'
                  }`}
                >
                  <span className="min-w-0 truncate">{category.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Shelf - min-h keeps the section's height stable across
              skeleton / empty / loaded states, so switching genres never
              causes the row (and therefore the nav rail) to jump in size. */}
          <div className="min-w-0 lg:min-h-[360px]">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-brand-navy">{activeCategory.label}</h2>
                <p className="mt-1 font-body text-sm text-brand-navy/55">{activeCategory.tagline}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Scroll left"
                  disabled={!canScrollLeft}
                  onClick={() => scrollByCards(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand-navy shadow-card transition-all hover:bg-white disabled:opacity-30"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  disabled={!canScrollRight}
                  onClick={() => scrollByCards(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand-navy shadow-card transition-all hover:bg-white disabled:opacity-30"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>

            {loadingSlug === activeSlug && <ShelfSkeleton />}

            {errorSlug === activeSlug && (
              <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-sm border border-brand-navy/10 bg-white/40 text-center">
                <p className="font-body text-sm text-brand-navy/60">
                  Couldn't load {activeCategory.label.toLowerCase()} right now.
                </p>
                <button
                  type="button"
                  onClick={() => loadGenre(activeCategory)}
                  className="rounded-full bg-brand-brick px-4 py-2 font-body text-xs font-semibold text-brand-cream"
                >
                  Try again
                </button>
              </div>
            )}

            {books && books.length === 0 && (
              <div className="flex h-64 items-center justify-center rounded-sm border border-brand-navy/10 bg-white/40 text-center">
                <p className="px-6 font-body text-sm text-brand-navy/55">
                  New {activeCategory.label.toLowerCase()} titles are on their way to this shelf.
                </p>
              </div>
            )}

            {books && books.length > 0 && (
              <div
                ref={trackRef}
                onScroll={updateArrowState}
                className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
              >
                {books.map((book, i) => (
                  <BookCard key={book.id} book={book} index={i} />
                ))}
                <ShowMoreCard slug={activeCategory.slug} label={activeCategory.label} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}