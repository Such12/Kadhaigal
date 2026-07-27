import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Fingerprint,
  UserRound,
  ToyBrick,
  Landmark,
  BookOpen,
  Rocket,
  BookMarked,
  Heart,
} from 'lucide-react'

// Maps a category slug -> lucide icon component.
// Add/rename slugs here if your category data uses different keys.
const CATEGORY_ICONS = {
  'mystery-thriller': Fingerprint,
  'biographies-memoirs': UserRound,
  'children-books': ToyBrick,
  'history': Landmark,
  'literature-fiction': BookOpen,
  'sci-fi-fantasy': Rocket,
  'non-fiction': BookMarked,
  'romance': Heart,
}

function CategoryIcon({ slug, icon }) {
  const Icon = CATEGORY_ICONS[icon || slug] || BookOpen
  return (
    <span className="w-16 h-16 rounded-full bg-brand-sage/20 border border-brand-sage/40 flex items-center justify-center shrink-0">
      <Icon size={26} strokeWidth={1.5} className="text-brand-navy" />
    </span>
  )
}

export default function ShopByCategory({
  title = 'Shop By Category',
  categories,
  viewAllHref = '/bookstore',
}) {
  return (
    <section className="container-page pt-20 sm:pt-28 pb-16 sm:pb-20">
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {categories.map((cat) => (
          <div key={cat.slug} className="flex gap-4">
            <CategoryIcon slug={cat.slug} icon={cat.icon} />
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