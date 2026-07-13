import { BookOpen } from 'lucide-react'

export default function CuratorNote({ note }) {
  if (!note) return null

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-brand-sage/20 flex items-center justify-center shrink-0">
          <BookOpen size={16} className="text-[#5b8a3f]" />
        </div>
        <div>
          <p className="font-display font-bold text-sm text-brand-navy">Curator's Note</p>
          <p className="text-[10px] uppercase tracking-wide text-brand-navy/40">
            Recommended by {note.recommendedBy}
          </p>
        </div>
      </div>

      {note.quote && (
        <p className="italic font-display font-semibold text-brand-navy mb-3">
          "{note.quote}"
        </p>
      )}
      {note.body && (
        <p className="text-sm text-brand-navy/65 leading-relaxed">{note.body}</p>
      )}
    </div>
  )
}