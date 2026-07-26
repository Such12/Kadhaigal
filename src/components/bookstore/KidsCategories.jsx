import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import faceBaby from '../../assets/images/face_icon_baby.png'
import faceToddler from '../../assets/images/face_icon_toddler.png'
import faceGirl from '../../assets/images/face_icon_girl.png'
import faceBoy from '../../assets/images/face_icon_boy.png'
import faceTeen from '../../assets/images/face_icon_teen.png'

const ageCategories = [
  { name: '0-2 Years', slug: '0-2-years', icon: faceBaby },
  { name: '3-5 Years', slug: '3-5-years', icon: faceToddler },
  { name: '6-8 Years', slug: '6-8-years', icon: faceGirl },
  { name: '9-12 Years', slug: '9-12-years', icon: faceBoy },
  { name: 'Young Adult', slug: 'young-adult', icon: faceTeen },
  { name: 'View All', slug: 'all', icon: null },
]

export default function KidsCategories() {
  return (
    <section className="py-20 sm:py-24 bg-brand-cream">
      <div className="container-page max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-navy text-center mb-3">
          Books by Age, Stories for All
        </h2>
        <p className="text-brand-navy/80 text-center mb-16 text-sm sm:text-base max-w-lg">
          Thoughtfully curated reads for every growing age.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {ageCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={cat.slug === 'all' ? '/bookstore/kids#all' : `/bookstore/genre/${cat.slug}`}
              className="group flex flex-col items-center gap-4 w-20 sm:w-24 md:w-28"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-[2px] border-brand-navy bg-[#FAFAD2] flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(20,41,80,0.3)] group-hover:-translate-y-2 transition-transform duration-300 overflow-hidden">
                {cat.icon ? (
                  <img src={cat.icon} alt={cat.name} className="w-[80%] h-[80%] object-contain mix-blend-multiply" />
                ) : (
                  <ArrowUpRight size={36} strokeWidth={2} className="text-brand-navy" />
                )}
              </div>
              <span className="font-body text-xs sm:text-sm font-semibold text-brand-navy/80 text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
