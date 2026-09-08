import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Sparkles } from 'lucide-react'
import { getBooks } from '../../lib/booksStore.js'

const DEFAULT_BOOK = {
  id: 'kaboom-sep-2026',
  title: 'The God of Small Things',
  author: 'Arundhati Roy',
  genre: 'Fiction & Literature',
  price: 399,
  cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554604477i/9777.jpg',
  month: 'September 2026',
  meetingDate: 'Sun, Sep 27 · 4:30 PM',
}

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

export default function KaboomBookOfTheMonth() {
  const [book, setBook] = useState(DEFAULT_BOOK)

  useEffect(() => {
    let isMounted = true
    async function fetchPick() {
      try {
        const books = await getBooks()
        if (books && books.length > 0 && isMounted) {
          // Prioritize featured selection, or staff pick / month badge, or the newest inventory book
          const featured =
            books.find((b) => b.isFeaturedSelection) ||
            books.find((b) => b.badge?.toLowerCase().includes('month') || b.badge?.toLowerCase().includes('pick') || b.isStaffPick) ||
            books[0]

          if (featured) {
            const cover = getBookCover(featured) || DEFAULT_BOOK.cover
            setBook({
              ...DEFAULT_BOOK,
              id: featured.id,
              title: featured.title || DEFAULT_BOOK.title,
              author: featured.author || (featured.authors && featured.authors[0]) || DEFAULT_BOOK.author,
              genre: featured.genre || DEFAULT_BOOK.genre,
              price: featured.price || DEFAULT_BOOK.price,
              cover: cover,
            })
          }
        }
      } catch (err) {
        console.warn('Could not load featured book from inventory:', err)
      }
    }
    fetchPick()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="w-full bg-brand-cream py-14 sm:py-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden">


      {/* Scattered Retro Comic Stars */}
      <ComicStar size={32} color="#B7410E" className="absolute top-8 left-8 sm:left-16 rotate-12" />
      <ComicStar size={22} color="#9DC183" className="absolute top-24 left-1/3 -rotate-12 hidden sm:block" />
      <ComicStar size={28} color="#9DC183" className="absolute bottom-10 left-12 rotate-45" />
      <ComicStar size={24} color="#B7410E" className="absolute top-12 right-12 sm:right-24 -rotate-6" />
      <ComicStar size={20} color="#E8A838" className="absolute bottom-16 right-16 rotate-12 hidden sm:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Book Cover Card Only (Comic Book Panel Frame) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] transition-transform duration-500 hover:-translate-y-1.5">
              {/* Solid hard navy offset comic shadow */}
              <div className="absolute inset-0 bg-brand-navy rounded-2xl translate-x-3.5 translate-y-3.5" />

              {/* Card Body - ONLY the book cover */}
              <div className="relative bg-[#FCFBF7] rounded-2xl border-[3px] border-brand-navy p-3 sm:p-4 shadow-xl">
                <Link to={`/bookstore/${book.id}`} className="block relative group">
                  <div className="overflow-hidden rounded-xl border-2 border-brand-navy/20 shadow-inner">
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Comic Book Details & RSVP */}
          <div className="lg:col-span-7 text-brand-navy">
            {/* Comic Header Masthead */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 border-2 border-brand-navy bg-white px-3.5 py-1 rounded-md shadow-[2.5px_2.5px_0px_0px_#142950] mb-3.5 -rotate-1">
                <span
                  className="font-comic text-xs sm:text-sm uppercase tracking-wider text-brand-brick"
                  style={{ fontFamily: '"Luckiest Guy", cursive' }}
                >
                  ★ MONTHLY READ
                </span>
                <span className="text-brand-navy/30">•</span>
                <span
                  className="font-comic text-xs sm:text-sm uppercase tracking-wider text-brand-navy"
                  style={{ fontFamily: '"Luckiest Guy", cursive' }}
                >
                  {book.month}
                </span>
                <span className="text-brand-navy/30">•</span>
                <span
                  className="font-comic text-xs sm:text-sm uppercase tracking-wider text-brand-sage"
                  style={{ fontFamily: '"Luckiest Guy", cursive' }}
                >
                  {book.genre}
                </span>
              </div>

              {/* Bold Comic 3D Title */}
              <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
                <h1
                  className="font-comic text-4xl sm:text-5xl lg:text-6xl tracking-wider text-brand-navy leading-none"
                  style={{
                    fontFamily: '"Luckiest Guy", "Bangers", cursive',
                    textShadow: '3.5px 3.5px 0px #B7410E, 6px 6px 0px #142950',
                  }}
                >
                  KABOOM!
                </h1>
                <span
                  className="font-comic text-3xl sm:text-4xl lg:text-5xl tracking-wider text-brand-brick leading-none"
                  style={{
                    fontFamily: '"Luckiest Guy", "Bangers", cursive',
                    textShadow: '2.5px 2.5px 0px #142950',
                  }}
                >
                  BOOK CLUB
                </span>
              </div>
            </div>

            {/* Book Title & Author */}
            <div className="mb-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.15] tracking-tight text-brand-navy">
                {book.title}
              </h2>
              <p className="font-body font-bold text-base sm:text-lg text-brand-brick mt-1">
                written by {book.author}
              </p>
            </div>

            {/* Comic Narration Panel / Speech Box */}
            <div className="relative bg-white border-[2.5px] border-brand-navy rounded-xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#142950] mb-5">
              {/* Comic Speech Pointer Tail pointing left towards book cover */}
              <div className="hidden lg:block absolute -left-[14px] top-6 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-brand-navy" />
              <div className="hidden lg:block absolute -left-[10px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[11px] border-r-white" />

              {/* Narration Box Title Tab */}
              <div
                className="absolute -top-3 left-4 bg-brand-brick text-brand-cream border-2 border-brand-navy px-2.5 py-0.5 rounded font-comic text-[11px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#142950]"
                style={{ fontFamily: '"Luckiest Guy", cursive' }}
              >
                THE MISSION
              </div>
              <p className="font-body text-sm sm:text-base leading-relaxed text-brand-navy/90 pt-1">
                Read the same book as everyone else, on purpose. Once a month we pick one title, everyone reads it, and we get together at Kadhaigal to talk it out over steaming hot chai. Copies are ₹{book.price} at the counter, first round's on the house!
              </p>
            </div>

            {/* Comic Info Panels (Date & Venue) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 bg-[#FAF8F2] border-2 border-brand-navy p-3 rounded-lg shadow-[2.5px_2.5px_0px_0px_#142950]">
                <div className="w-8 h-8 rounded-md bg-brand-brick/15 border border-brand-navy/30 flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-brand-brick" />
                </div>
                <div className="min-w-0">
                  <span
                    className="block text-[10px] font-comic uppercase tracking-wider text-brand-navy/60"
                    style={{ fontFamily: '"Luckiest Guy", cursive' }}
                  >
                    MEETUP DATE
                  </span>
                  <span className="font-body font-bold text-xs sm:text-sm text-brand-navy truncate block">
                    {book.meetingDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#FAF8F2] border-2 border-brand-navy p-3 rounded-lg shadow-[2.5px_2.5px_0px_0px_#142950]">
                <div className="w-8 h-8 rounded-md bg-brand-sage/25 border border-brand-navy/30 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-brand-navy" />
                </div>
                <div className="min-w-0">
                  <span
                    className="block text-[10px] font-comic uppercase tracking-wider text-brand-navy/60"
                    style={{ fontFamily: '"Luckiest Guy", cursive' }}
                  >
                    SECRET BASE
                  </span>
                  <span className="font-body font-bold text-xs sm:text-sm text-brand-navy truncate block">
                    Kadhaigal Bookstore & Café
                  </span>
                </div>
              </div>
            </div>

            {/* Comic Tactile Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 bg-brand-brick text-brand-cream border-2 border-brand-navy px-7 py-3 rounded-xl font-comic text-base tracking-wide shadow-[4px_4px_0px_0px_#142950] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#142950] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                style={{ fontFamily: '"Luckiest Guy", cursive' }}
              >
                <span>RESERVE A SEAT</span>
                <span>→</span>
              </Link>
              <Link
                to={`/bookstore/${book.id}`}
                className="inline-flex items-center gap-2 bg-white text-brand-navy border-2 border-brand-navy px-6 py-3 rounded-xl font-comic text-base tracking-wide shadow-[4px_4px_0px_0px_#142950] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#142950] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-brand-cream"
                style={{ fontFamily: '"Luckiest Guy", cursive' }}
              >
                <span>GET THE BOOK · ₹{book.price}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComicStar({ size = 24, color = '#B7410E', className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`drop-shadow-[1.5px_1.5px_0px_#142950] pointer-events-none ${className}`}
    >
      <polygon
        points="12,1.5 15.2,8.5 22.8,9.4 17.2,14.6 18.7,22.1 12,18.3 5.3,22.1 6.8,14.6 1.2,9.4 8.8,8.5"
        fill={color}
        stroke="#142950"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}