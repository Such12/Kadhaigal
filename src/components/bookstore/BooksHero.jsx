import { Link } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import BookstoreNavbar from './BookstoreNavbar.jsx'
import Pintoo from '../../assets/images/pintu sitting on books.svg'
import border from '../../assets/images/border.svg'

export default function BooksHero({ query, onQueryChange }) {
  return (
    <>
      <BookstoreNavbar query={query} onQueryChange={onQueryChange} />

      <section className="relative bg-brand-cream overflow-hidden">
        <div className="container-page pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src={Pintoo}
              alt="Pintoo"
              className="w-64 md:w-80 justify-self-center md:justify-self-end md:mr-32"
            />
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
                Chintu and Pintoo's Library
              </p>
              <h1 className="max-w-[400px] font-display font-extrabold text-7xl text-brand-navy leading-[1.05] tracking-tight">
                The Year of Quiet Reading.
              </h1>
              <p className="mt-5 text-brand-navy/70 leading-relaxed max-w-md">
                Discover a curated sanctuary of literature where every page turn
                is an invitation to slow down. Our selection celebrates the
                profound impact of intentional, quiet exploration.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button as={Link} to="#staff-picks" variant="primary">Shop Now</Button>
                <Button as={Link} to="#staff-picks" variant="light" className="border border-brand-navy/15">
                  View List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Border ornament */}
        <div
          className="hidden lg:block absolute left-0 right-0 bottom-0 h-8 bg-repeat-x bg-bottom bg-contain"
          style={{ backgroundImage: `url(${border})` }}
        />
      </section>
    </>
  )
}