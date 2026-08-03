import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import caterpillar from '../../assets/images/caterpillar.png'
import monster from '../../assets/images/monster.png'
import matilda from '../../assets/images/matilda.png'
import wizard from '../../assets/images/wizard.png'
import rebel from '../../assets/images/rebel.png'

const ageCategories = [
  {
    name: 'Ages 0 - 2',
    slug: '0-2-years',
    desc: 'Board books & very first stories',
    icon: caterpillar,
    color: 'bg-brand-sage',
    textColor: 'text-[#3f6b2a]',
  },
  {
    name: 'Ages 3 - 5',
    slug: '3-5-years',
    desc: 'Picture books & read-alouds',
    icon: monster,
    color: 'bg-brand-brick',
    textColor: 'text-[#9c3b2e]',
  },
  {
    name: 'Ages 6 - 8',
    slug: '6-8-years',
    desc: 'Early readers & chapter books',
    icon: matilda,
    color: 'bg-[#F7BC05]',
    textColor: 'text-[#a37900]',
  },
  {
    name: 'Ages 9 - 12',
    slug: '9-12-years',
    desc: 'Middle grade adventures',
    icon: wizard,
    color: 'bg-brand-navy',
    textColor: 'text-[#103447]',
  },
  {
    name: 'Young Adult',
    slug: 'young-adult',
    desc: 'Teen fiction & coming of age',
    icon: rebel,
    color: 'bg-brand-sage',
    textColor: 'text-[#3f6b2a]',
  },
]

export default function KidsCategories() {
  return (
    <section className="py-20 sm:py-24 relative">
      <div className="container-page max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-navy mb-4">
              Find the perfect book
            </h2>
            <p className="text-brand-navy/80 text-lg max-w-xl">
              From their very first board book to complex teenage sagas, we have stories curated for every stage of growing up.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {ageCategories.map((cat, idx) => (
            <Link
              key={cat.slug}
              to={`/bookstore/genre/${cat.slug}`}
              className="group flex flex-col items-center text-center p-8 rounded-[2rem] bg-white border-2 border-brand-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative flex justify-center items-end mb-6 pt-6 h-40">
                {/* Character Image */}
                <img 
                  src={cat.icon} 
                  alt={cat.name} 
                  className="w-36 h-36 object-contain mix-blend-multiply relative z-10 transition-transform duration-500 group-hover:-translate-y-3" 
                />
              </div>
              <h3 className="font-display text-2xl text-brand-navy mb-2">
                {cat.name}
              </h3>
              <p className="text-brand-navy/60 text-sm">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
