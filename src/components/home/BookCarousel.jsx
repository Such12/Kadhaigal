import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BookCard from './BookCard.jsx'

const books = [
  { title: 'My Friends', author: 'Fredrik Backman', bg: '#1F6E73' },
  { title: 'Gajapati Kulapati', author: 'Ashok Rajagopalan', bg: '#F0B429' },
  { title: 'Cleopatra', author: 'Saara El-Arifi', bg: '#152238' },
  { title: 'The Midnight Library', author: 'Matt Haig', bg: '#3A506B' },
  { title: 'Lessons in Chemistry', author: 'Bonnie Garmus', bg: '#B7410E' },
]

export default function BookCarousel() {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="hidden sm:block h-px w-16 bg-brand-navy/20" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy text-center">
            What We're Loving Right Now
          </h2>
          <span className="hidden sm:block h-px w-16 bg-brand-navy/20" />
        </div>
      </div>

      <div className="container-page relative flex items-center gap-3 sm:gap-6">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Previous"
          className="hidden sm:flex w-10 h-10 rounded-full bg-white shadow-card items-center justify-center text-brand-navy hover:text-brand-brick shrink-0"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-1 py-2 no-scrollbar snap-x snap-mandatory justify-start sm:justify-center flex-1"
        >
          {books.map((book) => (
            <div className="snap-center" key={book.title}>
              <BookCard {...book} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Next"
          className="hidden sm:flex w-10 h-10 rounded-full bg-white shadow-card items-center justify-center text-brand-navy hover:text-brand-brick shrink-0"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
