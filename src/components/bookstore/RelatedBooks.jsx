import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function RelatedBooks({ books }) {
  const scrollerRef = useRef(null)

  if (!books || books.length === 0) return null

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-brand-navy flex items-center gap-2">
          <span className="text-brand-brick">—</span> View More
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-brick"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center text-brand-navy hover:text-brand-brick"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/bookstore/${book.id}`}
            className="w-40 sm:w-48 shrink-0"
          >
            <ImagePlaceholder label={book.title} className="aspect-[2/3] rounded-lg shadow-card w-full" />
            <p className="font-display font-bold text-brand-navy text-sm mt-3 truncate">
              {book.title}
            </p>
            <p className="text-xs text-brand-navy/55 truncate">{book.author}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}