import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { getLocalShelfBooks } from '../../lib/booksStore.js'

// Rotation for the stamp badge, alternates so stamps don't all tilt the same way.
const STAMP_ANGLES = [-9, 7, -6, 8]

// Maps the ISO language code to a display label for the stamp.
const LANGUAGE_LABELS = {
  ta: 'Tamil',
  te: 'Telugu',
  hi: 'Hindi',
  kn: 'Kannada',
  ml: 'Malayalam',
  bn: 'Bengali',
  mr: 'Marathi',
  en: 'English',
}

function getBookCover(book) {
  const url =
    book.imageLinks?.thumbnail ||
    book.imageLinks?.smallThumbnail ||
    book.image_thumbnail ||
    book.image_small_thumbnail ||
    book.cover ||
    ''

  if (!url) return ''
  return url.replace('http://', 'https://')
}

export default function LocalShelf({
  title = 'Our Regional Shelf',
  viewAllHref = '/bookstore/local',
}) {
  const [books, setBooks] = useState(null) // null = loading
  const [failedImages, setFailedImages] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    getLocalShelfBooks().then((data) => {
      if (!cancelled) setBooks(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  if (books !== null && books.length === 0) return null

  return (
    <section className="relative bg-brand-cream/60 py-8 sm:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header with Title & View All */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight">
              {title}
            </h2>
          </div>

          <Link
            to={viewAllHref}
            className="group inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-5 py-2 font-body text-xs sm:text-sm font-semibold text-brand-cream shadow-sm transition-all duration-300 hover:bg-brand-brick hover:-translate-y-0.5 hover:shadow-md shrink-0 self-start sm:self-auto"
          >
            View All
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            className="absolute -left-5 sm:-left-8 lg:-left-10 top-[36%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-brand-navy/15 bg-white text-brand-navy flex items-center justify-center shadow-md hover:bg-brand-navy hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Horizontal Book Slider */}
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 px-1 no-scrollbar scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {books === null
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="flex-shrink-0 w-[155px] sm:w-[175px] animate-pulse"
                >
                  <div className="aspect-[2/3] w-full rounded-xl bg-brand-navy/10 mb-3" />
                  <div className="h-3.5 bg-brand-navy/10 rounded w-3/4 mb-2" />
                  <div className="h-2.5 bg-brand-navy/10 rounded w-1/2 mb-3" />
                </div>
              ))
              : books.map((book, i) => {
                const author = book.author || book.authors?.[0] || 'Kadhaigal Collection'
                const language = LANGUAGE_LABELS[book.language] ?? book.language ?? 'Regional'
                const note = book.printNote || (book.printLocation ? `Printed in ${book.printLocation}` : '')
                const coverUrl = getBookCover(book)
                const hasFailed = failedImages[book.id]
                const hasDiscount = book.originalPrice && book.originalPrice > book.price

                return (
                  <div
                    key={book.id}
                    style={{ scrollSnapAlign: 'start' }}
                    className="group flex-shrink-0 w-[155px] sm:w-[175px] flex flex-col justify-between transition-all duration-300"
                  >
                    {/* Book Cover Container */}
                    <Link to={`/bookstore/${book.id}`} className="block relative">
                      {/* Language stamp pinned on the top corner */}
                      <span
                        className="absolute -top-2 -right-2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full
                                     border-2 border-dashed border-brand-brick/70 bg-brand-cream
                                     flex items-center justify-center shadow-card pointer-events-none"
                        style={{ transform: `rotate(${STAMP_ANGLES[i % STAMP_ANGLES.length]}deg)` }}
                      >
                        <span className="font-hand text-brand-brick text-[11px] sm:text-xs leading-tight text-center">
                          {language}
                        </span>
                      </span>

                      <div className="aspect-[2/3] w-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative bg-brand-navy/[0.04]">
                        {coverUrl && !hasFailed ? (
                          <img
                            src={coverUrl}
                            alt={book.title}
                            loading="eager"
                            onError={() => setFailedImages((prev) => ({ ...prev, [book.id]: true }))}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#1b3563] to-[#142950] text-brand-cream flex flex-col justify-between shadow-inner">
                            <span className="h-0.5 w-6 bg-brand-brick/80 rounded" />
                            <div>
                              <p className="font-display text-xs leading-tight line-clamp-3">
                                {book.title}
                              </p>
                              <p className="text-[10px] opacity-70 mt-1 truncate">
                                {author}
                              </p>
                            </div>
                            <span className="text-[9px] uppercase font-mono tracking-widest text-brand-brick font-semibold">
                              Kadhaigal
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title & Author */}
                      <div className="pt-2.5 pb-0.5">
                        <h3 className="font-body font-bold text-brand-navy text-[13px] sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-brick transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-brand-navy/60 mt-0.5 truncate font-body">
                          {author}
                        </p>
                      </div>
                    </Link>

                    {/* Price & Location Note Row */}
                    <div className="mt-1">
                      {book.price ? (
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="font-body font-extrabold text-sm sm:text-base text-brand-navy">
                            ₹{book.price}
                          </span>
                          {hasDiscount && (
                            <span className="text-[11px] sm:text-xs text-brand-navy/40 line-through font-body">
                              ₹{book.originalPrice}
                            </span>
                          )}
                        </div>
                      ) : null}

                      {note && (
                        <p className="font-hand text-brand-brick/90 text-xs sm:text-sm mt-0.5 flex items-center gap-1 truncate">
                          <MapPin size={12} className="shrink-0" strokeWidth={2} />
                          {note}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="absolute -right-5 sm:-right-8 lg:-right-10 top-[36%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-brand-navy/15 bg-white text-brand-navy flex items-center justify-center shadow-md hover:bg-brand-navy hover:text-white transition-all active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}