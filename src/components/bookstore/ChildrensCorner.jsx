import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import ImagePlaceholder from '../ui/ImagePlaceholder.jsx'

export default function ChildrensCorner() {
  return (
    <section className="bg-[#F5F5DC]">
      <div className="container-page py-16 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
            <BookOpen size={18} className="text-brand-navy" strokeWidth={1.8} />
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-brand-navy/50 mb-2">
            Where Magic Begins
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy">
            Children's Corner
          </h2>
          <p className="italic text-brand-navy/70 mt-4 max-w-md">
            "Every child is a story waiting to unfold. In this corner, we
            provide the pages for their imagination to take flight."
          </p>
          <p className="text-brand-navy/60 mt-4 max-w-md leading-relaxed">
            Invite your little explorers to a sanctuary of wonder. From
            whimsical picture books to epic first adventures, our curated
            selection is designed to spark curiosity and cultivate a
            lifelong love for the written word.
          </p>
          <Link
            to="/bookstore/kids"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-navy mt-6 hover:text-brand-brick"
          >
            Explore Little Adventures <ArrowUpRight size={16} />
          </Link>
        </div>

        <ImagePlaceholder
          label="Anni Dreams of Biryani"
          className="aspect-[4/5] rounded-2xl shadow-polaroid w-full max-w-sm mx-auto"
        />
      </div>
    </section>
  )
}