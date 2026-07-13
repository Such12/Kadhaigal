import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function ShopByCategory({
  title = 'Shop By Category',
  categories,
  viewAllHref = '/bookstore',
}) {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
          {title}
        </h2>
        <Link
          to={viewAllHref}
          className="hidden sm:inline-flex items-center gap-1.5 bg-brand-brick text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#9c380c] transition-colors"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {categories.map((cat) => (
          <div key={cat.slug} className="flex gap-4">
            <ImagePlaceholder label="" className="w-16 h-20 rounded-lg shrink-0" />
            <div className="min-w-0">
              <p className="font-display font-bold text-brand-navy">{cat.name}</p>
              <ul className="text-sm text-brand-navy/60 mt-1 space-y-0.5">
                {cat.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link
                to={`/bookstore/genre/${cat.slug}`}
                className="text-xs font-semibold text-brand-brick mt-2 inline-flex items-center gap-1 hover:underline"
              >
                View More <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}