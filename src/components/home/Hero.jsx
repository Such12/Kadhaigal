import { BookOpen } from 'lucide-react'
import Button from '../ui/Button.jsx'
import BookshelfIllustration from './BookshelfIllustration.jsx'

export default function Hero() {
  return (
    <section className="container-page pt-12 sm:pt-16 pb-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="max-w-xl">
          <h1 className="font-display font-extrabold text-brand-navy text-[2.6rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight">
            Where <span className="text-brand-brick">Stories</span> <br />
            Meet. <br />
            Where <br />
            People Do <br />
            Too.
          </h1>

          <p className="mt-6 text-brand-navy/70 text-base sm:text-lg leading-relaxed max-w-md">
            A bookstore - community space - cafe etched in the heart of Sahakarnagar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button variant="primary" as="a" href="/bookstore">
              View Books <BookOpen size={16} strokeWidth={2} />
            </Button>
            <Button variant="outline" as="a" href="/events">
              View Events
            </Button>
          </div>
        </div>

        {/* Right: polaroid image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative bg-white p-3 pb-14 rounded-sm shadow-polaroid rotate-2 w-full max-w-sm sm:max-w-md">
            <div className="overflow-hidden rounded-sm aspect-square">
              <BookshelfIllustration />
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 sm:left-2 bg-brand-brick text-white rounded-lg shadow-card px-5 py-3 -rotate-3 w-56">
            <p className="font-display font-bold text-sm sm:text-base leading-tight">
              Curating Stories. Connecting People
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
