import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, Heart } from 'lucide-react'
import ImagePlaceholder from '../../../../components/ui/ImagePlaceholder.jsx'
import Button from '../../../../components/ui/Button.jsx'
import BookstoreNavbar from '../../../../components/bookstore/BookstoreNavbar.jsx'
import CuratorNote from '../../../../components/bookstore/CuratorNote.jsx'
import RelatedBooks from '../../../../components/bookstore/RelatedBooks.jsx'
import { getBookById, getBooksByGenre } from '../../../../lib/booksStore.js'

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getBookById(id).then(async (data) => {
      setBook(data)
      setLoading(false)
      if (data?.genre) {
        const genreBooks = await getBooksByGenre(data.genre)
        setRelated(genreBooks.filter((b) => b.id !== data.id).slice(0, 4))
      }
    })
  }, [id])

  if (loading) {
    return (
      <>
        <BookstoreNavbar />
        <div className="container-page py-16 text-brand-navy/50">Loading…</div>
      </>
    )
  }

  if (!book) {
    return (
      <>
        <BookstoreNavbar />
        <div className="container-page py-16 text-center">
          <h1 className="font-display font-bold text-2xl text-brand-navy">Book not found</h1>
          <Link to="/bookstore" className="text-brand-brick underline mt-4 inline-block">
            Back to the Stacks
          </Link>
        </div>
      </>
    )
  }

  const descriptionParagraphs = (book.description ?? '').split('\n\n').filter(Boolean)

  return (
    <>
      <BookstoreNavbar />
      <div className="container-page py-16">
      {/* Top: cover + primary info */}
      <div className="grid md:grid-cols-[340px_1fr] gap-10 items-start">
        <ImagePlaceholder
          label={book.title}
          className="aspect-[2/3] rounded-2xl shadow-polaroid w-full max-w-xs"
        />

        <div>
          {book.badge && (
            <span className="inline-block bg-brand-sage/20 text-[#3f6b2a] text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
              {book.badge}
            </span>
          )}

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
            {book.title}
          </h1>
          <p className="italic text-brand-navy/60 mt-2">by {book.author}</p>

          <div className="flex items-baseline gap-3 mt-6">
            <p className="font-display font-bold text-3xl text-brand-navy">₹{book.price}</p>
            {book.originalPrice && (
              <>
                <p className="text-brand-navy/40 line-through text-lg">₹{book.originalPrice}</p>
                <p className="text-[#3f6b2a] text-sm font-semibold">
                  {Math.round((1 - book.price / book.originalPrice) * 100)}% OFF
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="primary">
              <BookOpen size={16} /> Add to Cart
            </Button>
            <Button variant="light" className="border border-brand-navy/15">
              <Heart size={16} /> Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Atmosphere + curator note */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 mt-20">
        <div>
          <h2 className="font-display font-bold text-2xl text-brand-navy flex items-center gap-2 mb-5">
            <span className="text-brand-brick">—</span> The Atmosphere
          </h2>

          <div className="space-y-4 text-brand-navy/75 leading-relaxed max-w-2xl">
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{book.description}</p>
            )}
          </div>

          {(book.genre || (book.mood && book.mood.length > 0)) && (
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-brand-navy/10 text-sm">
              {book.genre && (
                <div className="flex items-center gap-2">
                  <span className="text-brand-navy/50 uppercase text-xs tracking-wide">Genre:</span>
                  <span className="bg-brand-sage/20 text-[#3f6b2a] px-3 py-1 rounded-full text-xs font-semibold">
                    {book.genre}
                  </span>
                </div>
              )}
              {book.mood && book.mood.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-brand-navy/50 uppercase text-xs tracking-wide">Mood:</span>
                  <span className="text-brand-navy/70">{book.mood.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <CuratorNote note={book.curatorNote} />
      </div>

      <RelatedBooks books={related} />
      </div>
    </>
  )
}