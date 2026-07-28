import { Link } from 'react-router-dom'
import hangingShelf from '../../assets/images/hanging_shelf.png'

export default function KidsStaffPicks({ books }) {
  if (!books || books.length === 0) return null

  // Take just the first 4 books so they fit nicely on the shelf
  const displayBooks = books.slice(0, 4)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative flex flex-col items-center">
      <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-navy text-center mb-16 drop-shadow-sm">
        Our Favorite Treasures
      </h2>

      <div className="relative w-full max-w-4xl">
        {/* Books sitting on the shelf */}
        <div className="relative z-10 flex justify-around items-end w-full px-8 pb-4">
          {displayBooks.map((book, idx) => (
            <Link
              key={book.id}
              to={`/bookstore/${book.id}`}
              className="group relative transition-transform duration-300 hover:-translate-y-4 hover:scale-105"
            >
              {/* Tooltip for title */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                {book.title}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-navy"></div>
              </div>

              <img
                src={book.imageLinks?.thumbnail || ''}
                alt={book.title}
                className="w-24 sm:w-32 md:w-40 h-auto object-cover rounded-md shadow-[5px_5px_15px_rgba(0,0,0,0.3)] border-b-2 border-r-2 border-brand-navy/20"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? '-3deg' : '2deg'})`,
                }}
              />
            </Link>
          ))}
        </div>

        {/* The Wooden Shelf */}
        <div className="relative z-0 -mt-8 sm:-mt-12 w-full flex justify-center">
          <img
            src={hangingShelf}
            alt="Wooden shelf"
            className="w-full h-auto drop-shadow-2xl mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </div>
  )
}
