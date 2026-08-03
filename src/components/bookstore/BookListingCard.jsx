import { Link } from 'react-router-dom'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function BookListingCard({ book }) {
  return (
    <Link
      to={`/bookstore/${book.id}`}
      className="group block hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-brand-navy/[0.03] shadow-sm group-hover:shadow-md transition-shadow duration-300">
        {book.imageLinks?.thumbnail ? (
          <img src={book.imageLinks.thumbnail} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder label={book.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="pt-3 pb-1">
        <p className="font-display font-bold text-brand-navy text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-brand-brick transition-colors">
          {book.title}
        </p>
        <p className="text-xs sm:text-sm text-brand-navy/60 mt-1 truncate">{book.author}</p>
        <p className="text-sm font-bold text-brand-navy mt-2">₹{book.price}</p>
      </div>
    </Link>
  )
}
