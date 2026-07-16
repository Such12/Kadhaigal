import { Link } from 'react-router-dom'
import { Book, Wand2, GraduationCap, Scroll, BookOpen, Calendar } from 'lucide-react'
import { kidsCategories } from '../../data/kidsCategories.js'

// Map each category slug to a Lucide icon
const iconMap = {
  'picture-books': Book,
  'kids-fantasy': Wand2,
  'young-adult': GraduationCap,
  'fairy-tales': Scroll,
}

// Fallback extras to fill out 6 items like the mockup
const extraCategories = [
  { name: 'All Books', slug: 'all', icon: BookOpen },
  { name: 'Events', slug: 'events', icon: Calendar },
]

export default function KidsCategories() {
  const mainItems = kidsCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
    icon: iconMap[c.slug] || Book,
    href: c.slug === 'events' ? '/events' : `/bookstore/genre/${c.slug}`,
  }))

  const allItems = [
    ...mainItems,
    ...extraCategories.map((e) => ({
      ...e,
      href: e.slug === 'events' ? '/events' : `/bookstore/genre/${e.slug}`,
    })),
  ]

  return (
    <section className="py-12 sm:py-16 bg-[#F5F5DC]">
      <div className="container-page max-w-4xl mx-auto">
        <h2 className="font-display font-medium text-3xl text-brand-navy mb-10">
          Shop By Category
        </h2>

        <div className="flex flex-wrap gap-8 sm:gap-12 items-start">
          {allItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.slug}
                to={item.href}
                className="group flex flex-col items-center gap-2.5 w-16 sm:w-20"
              >
                {/* Circular sage-green icon button */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A5C089] flex items-center justify-center shadow-sm group-hover:bg-[#8da773] transition-colors duration-300">
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    className="text-[#2d4a1e]"
                  />
                </div>
                {/* Label */}
                <span className="font-body text-[11px] sm:text-xs text-brand-navy/80 text-center leading-tight font-medium">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
