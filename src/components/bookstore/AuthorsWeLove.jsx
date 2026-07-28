import { Link } from 'react-router-dom'

// Swap these for your real picks whenever you're ready — bookId must
// match an id in src/lib/booksStore.js so the "Start with" link resolves.
const authors = [
  {
    name: 'Elif Shafak',
    blurb: 'Turns heartbreak into something you want to sit inside.',
    bookId: 'b3',
    bookTitle: 'The Forty Rules of Love',
    rotate: '-rotate-3',
  },
  {
    name: 'Brandon Sanderson',
    blurb: "Builds worlds with rules so solid you'd move in.",
    bookId: 'b6',
    bookTitle: 'Mistborn',
    rotate: 'rotate-2',
  },
  {
    name: 'Han Kang',
    blurb: 'Quiet sentences that somehow leave the biggest bruises.',
    bookId: 'b9',
    bookTitle: 'We Do Not Part',
    rotate: '-rotate-2',
  },
  {
    name: 'Bonnie Garmus',
    blurb: 'Proof that righteous anger can also be very, very funny.',
    bookId: 'b4',
    bookTitle: 'Lessons in Chemistry',
    rotate: 'rotate-3',
  },
  {
    name: 'Perumal Murugan',
    blurb: 'Writes the Tamil land with a love that never flinches.',
    bookId: 'b11',
    bookTitle: 'Poonachi',
    rotate: '-rotate-2',
  },
  {
    name: 'Toni Morrison',
    blurb: 'Her sentences carry memory like water carries salt.',
    bookId: 'b12',
    bookTitle: 'Beloved',
    rotate: 'rotate-3',
  },
]

export default function AuthorsWeLove() {
  return (
    <section className="container-page py-16 sm:py-20">
      {/*
        Self-contained font import so this works as a single drop-in file.
        For better performance/caching, move this <link> into index.html
        alongside your other Google Fonts instead, and delete this <style>.
      */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');`}</style>

      <div className="mb-10 max-w-md">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand-brick mb-3">
          Authors We Love
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
          Names Worth Knowing By Heart
        </h2>
        <p className="text-brand-navy/60 mt-3">
          No headshots — just the writers we can't stop putting in
          people's hands.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-2">
        {authors.map((author) => (
          <Link
            key={author.name}
            to={`/bookstore/${author.bookId}`}
            className="shrink-0 w-52 bg-[#EDE0C2] border border-brand-navy/25 rounded-sm px-5 py-5 relative shadow-[2px_2px_0_rgba(20,41,80,0.08)] hover:-translate-y-1 transition-transform duration-200"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            <span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-brand-cream border border-brand-navy/40" />

            <p className="text-[9px] tracking-widest uppercase text-brand-navy/55 text-right mb-1">
              Author
            </p>
            <p className="text-lg text-brand-navy text-right mb-3 leading-snug">
              {author.name}
            </p>

            <div className="border-t border-dotted border-brand-navy/40 mb-3" />

            <p className="text-sm text-brand-navy/80 leading-relaxed mb-5">
              {author.blurb}
            </p>

            <p className="text-[9px] tracking-widest uppercase text-brand-navy/50 mb-1.5">
              Start with
            </p>
            <span
              className={`inline-block border-2 border-[#9C3B2E] text-[#9C3B2E] text-xs tracking-wide uppercase px-2.5 py-1 ${author.rotate}`}
            >
              {author.bookTitle}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}