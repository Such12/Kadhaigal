import { Link } from 'react-router-dom'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function BookListingCard({ book }) {
  return (
    <Link
      to={`/bookstore/${book.id}`}
      className="block bg-white rounded-2xl shadow-card p-3 hover:-translate-y-0.5 transition-transform"
    >
      <ImagePlaceholder label={book.title} className="h-52 rounded-lg w-full" />
      <div className="pt-3 px-1 pb-1">
        <p className="font-display font-bold text-brand-navy text-sm truncate">
          {book.title}
        </p>
        <p className="text-xs text-brand-navy/55 truncate">{book.author}</p>
        <p className="text-sm font-semibold text-brand-brick mt-1.5">₹{book.price}</p>
      </div>
    </Link>
  )
}
