import { Plus } from 'lucide-react'

const dotColors = {
  red: 'bg-brand-brick',
  blue: '#3A6EA5',
  green: 'bg-[#5b8a3f]',
}

function EventNote({ meta, title, body, wide = false, plus = false }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-card p-4 relative ${wide ? 'sm:col-span-2' : ''}`}
    >
      {plus ? (
        <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#5b8a3f] text-white flex items-center justify-center">
          <Plus size={14} strokeWidth={3} />
        </span>
      ) : (
        <span
          className="absolute top-3 left-4 w-2 h-2 rounded-full"
          style={{ backgroundColor: meta.dot }}
        />
      )}
      {meta.label && (
        <p className="text-[10px] tracking-wide text-brand-navy/40 uppercase mb-1 ml-4">
          {meta.label}
        </p>
      )}
      <h4 className="font-display font-bold text-brand-navy text-sm sm:text-base ml-4">
        {title}
      </h4>
      <p className="text-xs text-brand-navy/55 mt-1 ml-4 leading-relaxed">{body}</p>
    </div>
  )
}

export default function EventsNoticeboard() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="bg-[#C9B89A] rounded-3xl border-4 sm:border-8 border-[#B4A183] shadow-polaroid p-6 sm:p-10 max-w-4xl mx-auto">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy text-center">
          Something's Always Brewing
        </h2>
        <p className="text-center text-[11px] tracking-widest text-brand-navy/50 uppercase mt-1 mb-8">
          Our Community Noticeboard
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <EventNote
            meta={{ label: 'SATURDAY · 6 PM', dot: '#B7410E' }}
            title="Poetry & Parchment"
            body="Open mic for local poets. Bring your rhymes or just your ears."
          />
          <EventNote
            meta={{ label: 'TUESDAY · 11 AM', dot: '#3A6EA5' }}
            title="Toddler Tale-Time"
            body="Animated readings for the little ones (and their tired parents)."
          />
          <EventNote
            meta={{ label: 'WORKSHOP', dot: '#5b8a3f' }}
            title="Intro to Book-Binding"
            body="Craft your own journal using sustainable materials."
            wide
            plus
          />
          <EventNote
            meta={{ label: 'SATURDAY · 7 PM', dot: '#B7410E' }}
            title="Soap Making"
            body="Craft your own soaps with scents and creativity."
          />
          <EventNote
            meta={{ label: 'TUESDAY · 11 AM', dot: '#3A6EA5' }}
            title="DIY Bookmark Workshop"
            body="Create personalized bookmarks with art, quotes, and creative designs."
          />
          <EventNote
            meta={{ label: 'WORKSHOP', dot: '#5b8a3f' }}
            title="Intro to Crochet"
            body="Craft your own crochet animals using sustainable materials."
            wide
            plus
          />
        </div>
      </div>
    </section>
  )
}
