import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { getBooks } from '../../lib/booksStore.js'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

// Fallback curated books if database has no records yet
const FALLBACK_TRENDING = [
  {
    id: 'tr-1',
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    genre: 'Fiction and Literature',
    price: 399,
    originalPrice: 499,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554604477i/9777.jpg',
    },
    badge: 'Popular',
  },
  {
    id: 'tr-2',
    title: 'Days at the Morisaki Bookshop',
    author: 'Satoshi Yagisawa',
    genre: 'Fiction and Literature',
    price: 350,
    originalPrice: 450,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684941961i/64000492.jpg',
    },
    badge: 'Top Pick',
  },
  {
    id: 'tr-3',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    genre: 'Sci-Fic',
    price: 299,
    originalPrice: 399,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569420790i/44421460.jpg',
    },
    badge: 'Trending',
  },
  {
    id: 'tr-4',
    title: 'Smoke and Ashes: A Writer\'s Journey',
    author: 'Amitav Ghosh',
    genre: 'Non-Fiction',
    price: 550,
    originalPrice: 699,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1680587788i/124939226.jpg',
    },
    badge: 'Bestseller',
  },
  {
    id: 'tr-5',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Non-Fiction',
    price: 320,
    originalPrice: 399,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg',
    },
    badge: 'Hot',
  },
  {
    id: 'tr-6',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genre: 'Sci-Fic',
    price: 450,
    originalPrice: 599,
    imageLinks: {
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg',
    },
    badge: 'Award Winner',
  },
]

// Helper to safely extract image url and ensure HTTPS
function getBookCover(book) {
  const url =
    book.imageLinks?.thumbnail ||
    book.imageLinks?.smallThumbnail ||
    book.image_thumbnail ||
    book.image_small_thumbnail ||
    book.cover ||
    book.coverUrl ||
    book.image ||
    ''

  if (!url) return ''
  return url.replace('http://', 'https://')
}

export default function WhatsTrending() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedIds, setAddedIds] = useState({})
  const [failedImages, setFailedImages] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    async function loadBooks() {
      try {
        setLoading(true)
        const all = await getBooks()
        // Filter out children's books
        const filtered = (all || []).filter((b) => {
          const cat = (b.genre || (Array.isArray(b.categories) ? b.categories.join(' ') : '') || '').toLowerCase()
          return !cat.includes('child') && !cat.includes('kid') && !cat.includes('age')
        })

        if (isMounted) {
          if (filtered.length > 0) {
            setBooks(filtered)
          } else {
            setBooks(FALLBACK_TRENDING)
          }
        }
      } catch (err) {
        console.warn('Could not load trending books from database, using curated list:', err)
        if (isMounted) setBooks(FALLBACK_TRENDING)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadBooks()
    return () => {
      isMounted = false
    }
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const handleAddToCart = (e, bookId) => {
    e.preventDefault()
    e.stopPropagation()
    setAddedIds((prev) => ({ ...prev, [bookId]: true }))
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [bookId]: false }))
    }, 2000)
  }

  const displayBooks = books.length > 0 ? books : (loading ? [] : FALLBACK_TRENDING)

  return (
    <section className="relative bg-brand-cream/60 py-16 sm:py-20 overflow-hidden border-y border-brand-navy/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header with Title & View All on right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-navy tracking-tight">
              What's Trending
            </h2>
            <p className="text-brand-navy/60 text-sm sm:text-base mt-2 max-w-xl font-body">
              The titles flying off our Sahakarnagar tables this week. Grab yours before they're gone.
            </p>
          </div>

          <Link
            to="/bookstore"
            className="group inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-5 py-2 font-body text-xs sm:text-sm font-semibold text-brand-cream shadow-sm transition-all duration-300 hover:bg-brand-brick hover:-translate-y-0.5 hover:shadow-md shrink-0 self-start sm:self-auto"
          >
            View All Books
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
            {loading ? (
              /* Smooth Loading Skeletons */
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="flex-shrink-0 w-[155px] sm:w-[175px] animate-pulse"
                >
                  <div className="aspect-[2/3] w-full rounded-xl bg-brand-navy/10 mb-3" />
                  <div className="h-3.5 bg-brand-navy/10 rounded w-3/4 mb-2" />
                  <div className="h-2.5 bg-brand-navy/10 rounded w-1/2 mb-3" />
                  <div className="h-8 bg-brand-navy/10 rounded-lg w-full" />
                </div>
              ))
            ) : (
              displayBooks.map((book) => {
                const coverUrl = getBookCover(book)
                const hasFailed = failedImages[book.id]
                const hasDiscount = book.originalPrice && book.originalPrice > book.price
                const discountAmt = hasDiscount ? book.originalPrice - book.price : null

                return (
                  <div
                    key={book.id}
                    style={{ scrollSnapAlign: 'start' }}
                    className="group flex-shrink-0 w-[155px] sm:w-[175px] flex flex-col justify-between transition-all duration-300"
                  >
                    {/* Book Cover Container */}
                    <Link to={`/bookstore/${book.id}`} className="block relative">
                      <div className="aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 relative bg-brand-navy/[0.04]">
                        {coverUrl && !hasFailed ? (
                          <img
                            src={coverUrl}
                            alt={book.title}
                            loading="eager"
                            onError={() => setFailedImages((prev) => ({ ...prev, [book.id]: true }))}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          /* Stylized Fallback Cover */
                          <div className="w-full h-full p-3.5 bg-gradient-to-br from-[#1b3563] to-[#142950] text-brand-cream flex flex-col justify-between shadow-inner">
                            <span className="h-0.5 w-6 bg-brand-brick/80 rounded" />
                            <div>
                              <p className="font-display font-bold text-xs leading-tight line-clamp-3">
                                {book.title}
                              </p>
                              <p className="text-[10px] opacity-70 mt-1 truncate">
                                {book.author}
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
                          {book.author || (book.authors && book.authors[0]) || 'Kadhaigal Collection'}
                        </p>
                      </div>
                    </Link>

                    {/* Price Row */}
                    <div className="mt-1">
                      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                        <span className="font-body font-extrabold text-sm sm:text-base text-brand-navy">
                          ₹{book.price}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] sm:text-xs text-brand-navy/40 line-through font-body">
                            ₹{book.originalPrice}
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="bg-brand-sage/30 text-brand-navy/80 text-[10px] font-semibold px-2 py-0.5 rounded-full font-body">
                            ₹{discountAmt} Off
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
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