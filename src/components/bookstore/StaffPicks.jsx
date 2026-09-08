import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Quote } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAuthor(book) {
  if (book.authors?.length) return book.authors.join(', ')
  return book.author ?? ''
}

function Stars({ rating = 0, size = 12 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'text-brand-brick fill-brand-brick' : 'text-brand-navy/20'}
        />
      ))}
    </div>
  )
}

/** Coloured initials avatar for the staff member */
function StaffAvatar({ name }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="w-8 h-8 rounded-full bg-brand-brick flex items-center justify-center shrink-0">
      <span className="text-white text-xs font-bold font-display">{initials}</span>
    </div>
  )
}

// ── Animated panel wrapper ────────────────────────────────────────────────────

function FadeIn({ animKey, children, className = '' }) {
  return (
    <div
      key={animKey}
      className={`animate-staff-fade ${className}`}
    >
      {children}
    </div>
  )
}

// ── Sub-panels ────────────────────────────────────────────────────────────────

function ReviewPanel({ book, animKey }) {
  const author = getAuthor(book)
  const note = book.staffNote

  return (
    <FadeIn animKey={animKey} className="flex flex-col justify-center h-full py-2">
      {/* Tag */}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-brick animate-[fadeIn_0.3s_ease-out]">
        Staff Pick
      </p>

      {/* Title */}
      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1 leading-tight">
        {book.title}
      </h3>

      {/* Author */}
      <p className="text-xs sm:text-sm text-brand-navy/70 font-medium mt-0.5">
        By {author}
      </p>

      {/* Genre/Category */}
      {(book.genre || (book.categories && book.categories[0])) && (
        <p className="text-[9px] uppercase tracking-wider text-brand-navy/40 font-bold mt-1.5">
          Genre: {book.genre || book.categories[0]}
        </p>
      )}

      {/* Stars */}
      {book.rating && (
        <div className="mt-2 flex items-center gap-1">
          <Stars rating={book.rating} size={12} />
          {book.ratingsCount && (
            <span className="text-[10px] text-brand-navy/40 font-semibold ml-1">
              ({book.ratingsCount})
            </span>
          )}
        </div>
      )}

      <div className="w-10 h-0.5 bg-brand-brick/20 my-4" />

      {note ? (
        <>
          {/* Quote */}
          <div className="relative mb-3">
            <Quote
              size={20}
              className="text-brand-brick/10 absolute -top-1 -left-1"
              fill="currentColor"
            />
            <p className="font-display italic font-bold text-brand-navy/90 text-sm leading-snug pl-5">
              {note.quote}
            </p>
          </div>

          {/* Review body */}
          <p className="text-xs sm:text-sm text-brand-navy/70 leading-relaxed pl-5">
            {note.body}
          </p>

          {/* Staff member info */}
          <div className="flex items-center gap-2 mt-4 pl-5">
            <StaffAvatar name={note.by} />
            <div>
              <p className="font-display font-bold text-brand-navy text-xs leading-tight">
                Recommended by {note.by}
              </p>
              <p className="text-[9px] text-brand-navy/50 uppercase tracking-wide mt-0.5">
                {note.role}
              </p>
            </div>
          </div>
        </>
      ) : (
        /* Fallback if no staffNote */
        <p className="text-xs sm:text-sm text-brand-navy/70 leading-relaxed italic">
          {book.description}
        </p>
      )}

      {/* Price and CTA Button */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <span className="text-lg font-extrabold text-brand-navy">₹{book.price}</span>
        <Link
          to={`/bookstore/${book.id}`}
          className="p-2 px-4 inline-flex items-center gap-1.5 bg-brand-brick text-white text-[11px] font-semibold px-4.5 py-2 rounded-full hover:bg-[#9c380c] transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          View Book
        </Link>
      </div>
    </FadeIn>
  )
}

function CentreBook({ book, animKey }) {
  const thumbnail = book.imageLinks?.thumbnail

  return (
    <FadeIn animKey={animKey} className="flex flex-col items-center">
      <Link to={`/bookstore/${book.id}`} className="group block w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] mx-auto">
        <div className="relative overflow-hidden  shadow-polaroid aspect-[2/3] w-full bg-brand-navy/[0.05]">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder
              label={book.title}
              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>
    </FadeIn>
  )
}

function ThumbCard({ book, onClick }) {
  const author = getAuthor(book)
  const thumbnail = book.imageLinks?.thumbnail

  return (
    <button
      onClick={onClick}
      className="group text-left block w-full transition-all duration-300 outline-none
        focus-visible:ring-2 focus-visible:ring-brand-brick  opacity-85 hover:opacity-100"
    >
      {/* Cover */}
      <div className="relative overflow-hidden shadow-card aspect-[2/3] w-24 sm:w-28 lg:w-28 mx-auto bg-brand-navy/[0.03] transition-all duration-300 group-hover:shadow-polaroid">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            label={book.title}
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* Meta */}
      <div className="mt-2 text-center max-w-[112px] mx-auto">
        <p className="text-xs font-display font-bold text-brand-navy group-hover:text-brand-brick transition-colors truncate">
          {book.title}
        </p>
        <p className="text-[9px] text-brand-navy/55 uppercase tracking-wide truncate mt-0.5">
          {author}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          {book.rating && <Stars rating={book.rating} size={10} />}
          <span className="text-[14px] font-bold text-brand-brick">₹{book.price}</span>
        </div>
      </div>
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StaffPicks({ books }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  if (!books || books.length === 0) return null

  // Limit to first 5 picks; need at least 1
  const picks = books.slice(0, 5)
  const safeIdx = Math.min(activeIdx, picks.length - 1)
  const active = picks[safeIdx]

  const handleSelect = (originalIdx) => {
    if (originalIdx === safeIdx) return
    setActiveIdx(originalIdx)
    setAnimKey((k) => k + 1)
  }

  return (
    <section id="staff-picks" className="container-page pt-6 sm:pt-10 pb-20 sm:pb-28">

      {/*
        Desktop: 3 columns — [Review 35%] | [Centre book 30%] | [Thumbs 35%]
        Mobile:  stacked — thumbs row, then centre, then review
      */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr_auto_1.1fr] lg:gap-x-12 items-center gap-8">

        {/* ── Left: Staff review ── (hidden on mobile) */}
        <div className="hidden lg:block w-full">
          <ReviewPanel book={active} animKey={animKey} />
        </div>

        {/* ── Centre: Featured book cover ── */}
        <div className="w-full lg:w-[220px] xl:w-[260px] shrink-0 mx-auto order-2 lg:order-none animate-staff-fade">
          <CentreBook book={active} animKey={animKey} />
        </div>

        {/* ── Right: 2×2 thumbnail grid ── */}
        <div className="w-full order-1 lg:order-none">
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-1 sm:gap-x-2">
            {picks.map((book, i) => {
              if (i === safeIdx) return null // skip active in grid
              return (
                <ThumbCard
                  key={book.id}
                  book={book}
                  onClick={() => handleSelect(i)}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile: Review panel below centre ── */}
      <div className="lg:hidden mt-8 pt-8 border-t border-brand-navy/10 w-full">
        <ReviewPanel book={active} animKey={animKey} />
      </div>

      {/* Inject keyframe animation via a style tag */}
      <style>{`
        @keyframes staffFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-staff-fade {
          animation: staffFadeUp 0.4s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
      `}</style>
    </section>
  )
}