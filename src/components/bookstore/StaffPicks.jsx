import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

function Stars({ rating = 0 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-brand-brick fill-brand-brick' : 'text-brand-navy/20'}
        />
      ))}
    </div>
  )
}

function FeaturedCard({ book }) {
  return (
    <Link to={`/bookstore/${book.id}`} className="block h-full">
      <ImagePlaceholder label={book.title} className="rounded-2xl shadow-card w-full h-full min-h-[320px]" />
      <p className="text-[11px] font-semibold tracking-wide uppercase text-brand-brick mt-3">
        Featured Selection
      </p>
      <p className="font-display font-bold text-brand-navy mt-1">{book.title}</p>
      <p className="text-sm text-brand-navy/55">By {book.author}</p>
      {book.rating && <Stars rating={book.rating} />}
      <p className="font-semibold text-brand-navy mt-1">₹{book.price}</p>
    </Link>
  )
}

function PickCard({ book }) {
  return (
    <Link to={`/bookstore/${book.id}`} className="block">
      <ImagePlaceholder label={book.title} className="aspect-[4/3] rounded-xl shadow-card w-full" />
      <p className="font-display font-bold text-brand-navy text-sm mt-3">{book.title}</p>
      <p className="text-xs text-brand-navy/55 uppercase tracking-wide">{book.author}</p>
      {book.rating && (
        <div className="mt-1">
          <Stars rating={book.rating} />
        </div>
      )}
      <p className="font-semibold text-brand-navy text-sm mt-1">₹{book.price}</p>
    </Link>
  )
}

export default function StaffPicks({ books }) {
  if (!books || books.length === 0) return null
  const [featured, ...rest] = books

  return (
    <section id="staff-picks" className="container-page py-6 sm:py-10">
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy mb-8">
        Staff Picks
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:row-span-2">
          <FeaturedCard book={featured} />
        </div>
        {rest.slice(0, 4).map((book) => (
          <PickCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}