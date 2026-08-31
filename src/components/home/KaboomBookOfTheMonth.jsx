import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    <section className="w-full bg-brand-cream py-10 sm:py-12 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
      {/* candy-stripe frame */}
      <div
        className="absolute inset-2.5 sm:inset-4 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #142950 0 12px, transparent 12px 24px)',
        }}
      />
      <div className="absolute inset-[15px] sm:inset-[24px] bg-brand-cream pointer-events-none" />

      <div className="max-w-5xl mx-auto relative grid lg:grid-cols-[3fr_2fr] gap-8 sm:gap-10 items-center">

        {/* left: expanded membership card — dominant element */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-lg -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-7 border border-brand-navy/10">
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div>
                  <p className="font-display font-black text-3xl sm:text-4xl text-brand-navy leading-none tracking-tight">
                    KADHAIGAL
                  </p>
                  <p className="font-display font-black text-3xl sm:text-4xl text-brand-navy leading-none tracking-tight">
                    BOOK CLUB
                  </p>
                </div>
                <p className="font-hand text-xl text-brand-brick -rotate-3 mt-1">
                  Kaboom pick
                </p>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-5 items-center">
                <div className="flex flex-col justify-center gap-2.5 min-w-0">
                  <Field label="Title" value={book.title} />
                  <Field label="Author" value={book.author} />
                  <Field label="Genre" value={book.genre} />
                  <Field label="Meetup" value={book.meetingDate} />
                </div>

                <div className="relative shrink-0">
                  <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-brand-navy/70" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-brand-navy/70" />
                  <Link to={`/bookstore/${book.id}`} className="block">
                    <img
                      src={book.cover}
                      alt={`Cover of ${book.title}`}
                      className="w-36 sm:w-40 aspect-[2/3] object-cover rounded-sm shadow-md transition-transform duration-300 hover:scale-102"
                    />
                  </Link>
                  <StampBadge className="absolute -bottom-5 -right-5" />
                </div>
              </div>

              <div className="mt-5 pt-2.5 border-t border-dashed border-brand-navy/25 flex items-center justify-between">
                <p className="font-body text-[10px] text-brand-navy/60">Valid: {book.month}</p>
                <p className="font-body text-[10px] text-brand-navy/60">Card no. 0091</p>
              </div>
            </div>
          </div>
        </div>

        {/* right: headline + cta, secondary to the card */}
        <div className="text-brand-navy">
          <h2 className="font-display font-black text-xl sm:text-2xl leading-[1.15] mb-4">
            Read the same book as everyone else, on purpose
          </h2>
          <p className="font-body text-sm leading-relaxed text-brand-navy/80 mb-5 max-w-sm">
            Once a month we pick one title, everyone reads it, and we get together at Kadhaigal to
            talk it out over chai. Copies are ₹{book.price} at the counter, first round's on the house.
          </p>
          <Link
            to="/community"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-navy text-white px-7 py-3 font-body font-bold text-sm shadow-md transition-all duration-300 hover:bg-brand-brick hover:-translate-y-0.5"
          >
            <span>Reserve a seat</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Field({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="font-body text-[10px] uppercase tracking-wider text-brand-navy/50 mb-0.5">{label}</p>
      <p className="font-body font-normal text-sm sm:text-base text-brand-navy truncate leading-snug">
        {value}
      </p>
    </div>
  )
}

function StampBadge({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`w-20 h-20 ${className}`}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#0e1d38" strokeWidth="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#0e1d38" strokeWidth="1" opacity="0.5" />
      <path id="stamp-circle" d="M 50 12 A 38 38 0 1 1 49.9 12" fill="none" />
      <text fontSize="7.5" fill="#0e1d38" opacity="0.75" letterSpacing="1.5">
        <textPath href="#stamp-circle" startOffset="2%">
          KABOOM · BOOK OF THE MONTH ·
        </textPath>
      </text>
    </svg>
  )
}