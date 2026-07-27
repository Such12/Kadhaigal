import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'
// Adjust this import path to wherever your data layer file actually lives,
// e.g. '../../lib/books.js' or '../../data/books.js'.
import { getLocalShelfBooks } from '../../lib/booksStore.js'

// Fixed lean angles so the shelf feels hand-arranged, not randomly jittered on every render.
const LEAN_ANGLES = [-3, 2, -1.5, 3, -2.5, 1.5, -1]

// Rotation for the stamp badge, alternates so stamps don't all tilt the same way.
const STAMP_ANGLES = [-9, 7, -6, 8]

// Maps the Google-Books-style ISO language code to a display label for the stamp.
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

export default function LocalShelf({
  eyebrow = 'Self-Published & Regional',
  title = 'Off the Beaten Shelf',
  description = "Books that never went through a big publisher, printed close to home, in the languages we grew up with. First runs, second runs, and a few the author still hand-delivers.",
  viewAllHref = '/bookstore/local',
}) {
  const [books, setBooks] = useState(null) // null = loading

  useEffect(() => {
    let cancelled = false
    getLocalShelfBooks().then((data) => {
      if (!cancelled) setBooks(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (books !== null && books.length === 0) return null

  return (
    <section className="container-page pt-20 sm:pt-28 pb-20 sm:pb-24">
      <div className="flex items-start justify-between gap-6 mb-10">
        <div className="max-w-xl">
          <p className="font-hand text-2xl text-brand-brick leading-none mb-1">
            {eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
            {title}
          </h2>
          <p className="text-sm text-brand-navy/60 mt-3">{description}</p>
        </div>
        <Link
          to={viewAllHref}
          className="hidden sm:inline-flex items-center gap-1.5 bg-brand-brick text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#9c380c] transition-colors shrink-0"
        >
          Meet the Authors <ArrowRight size={14} />
        </Link>
      </div>

      {/* mobile swipe hint */}
      <p className="font-hand text-brand-navy/40 text-lg sm:hidden -mb-2 ml-1">
        ← swipe the shelf
      </p>

      <div className="relative mt-8">
        {/* the shelf ledge, sits behind the books' bottom edge */}
        <div
          className="absolute left-0 right-0 bottom-6 h-3 rounded-sm"
          style={{
            background: 'linear-gradient(180deg, #EDE0BF 0%, #E3D4A8 100%)',
            boxShadow: '0 10px 16px -6px rgba(20, 41, 80, 0.28)',
          }}
        />

        <div
          className="flex gap-6 overflow-x-auto pb-10 pt-2 px-1 snap-x snap-mandatory
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {books === null
            ? // loading skeleton — same lean/shelf treatment, just muted
              LEAN_ANGLES.slice(0, 5).map((angle, i) => (
                <div key={i} className="shrink-0 w-[200px] animate-pulse">
                  <div
                    className="w-[200px] h-[280px] rounded-md bg-brand-navy/10"
                    style={{ transform: `rotate(${angle}deg)` }}
                  />
                  <div className="h-3 w-3/4 bg-brand-navy/10 rounded mt-4" />
                  <div className="h-2.5 w-1/2 bg-brand-navy/10 rounded mt-2" />
                </div>
              ))
            : books.map((book, i) => {
                const author = book.authors?.[0] ?? 'Unknown Author'
                const language = LANGUAGE_LABELS[book.language] ?? book.language
                const note = book.printNote || (book.printLocation ? `Printed in ${book.printLocation}` : '')
                const cover = book.imageLinks?.thumbnail

                return (
                  <div key={book.id} className="group shrink-0 w-[200px] snap-start">
                    <div
                      className="relative transition-transform duration-300 ease-out origin-bottom
                                 group-hover:-translate-y-2 group-hover:rotate-0"
                      style={{ transform: `rotate(${LEAN_ANGLES[i % LEAN_ANGLES.length]}deg)` }}
                    >
                      {/* language stamp, pinned over the top corner of the cover */}
                      <span
                        className="absolute -top-3 -right-3 z-10 w-14 h-14 rounded-full
                                   border-2 border-dashed border-brand-brick/70 bg-brand-cream
                                   flex items-center justify-center shadow-card"
                        style={{ transform: `rotate(${STAMP_ANGLES[i % STAMP_ANGLES.length]}deg)` }}
                      >
                        <span className="font-hand text-brand-brick text-sm leading-tight text-center">
                          {language}
                        </span>
                      </span>

                      {cover ? (
                        <img
                          src={cover}
                          alt={book.title}
                          className="w-[200px] h-[280px] object-cover rounded-md shadow-polaroid"
                        />
                      ) : (
                        <ImagePlaceholder
                          label=""
                          className="w-[200px] h-[280px] rounded-md shadow-polaroid"
                        />
                      )}
                    </div>

                    <div className="mt-4 px-1">
                      <p className="font-display font-bold text-brand-navy leading-snug">
                        {book.title}
                      </p>
                      <p className="text-xs text-brand-navy/60 mt-0.5">{author}</p>

                      {note && (
                        <p className="font-hand text-brand-brick/80 text-base mt-2 flex items-center gap-1">
                          <MapPin size={13} className="shrink-0" strokeWidth={2} />
                          {note}
                        </p>
                      )}

                      <Link
                        to={`/bookstore/book/${book.id}`}
                        className="text-xs font-semibold text-brand-navy/70 mt-2 inline-flex items-center gap-1 hover:text-brand-brick transition-colors"
                      >
                        Read More <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                )
              })}
        </div>
      </div>

      {/* mobile CTA, mirrors the desktop pill since it's hidden above on small screens */}
      <Link
        to={viewAllHref}
        className="sm:hidden inline-flex items-center gap-1.5 bg-brand-brick text-white text-sm font-semibold px-5 py-2.5 rounded-full mt-2"
      >
        Meet the Authors <ArrowRight size={14} />
      </Link>
    </section>
  )
}