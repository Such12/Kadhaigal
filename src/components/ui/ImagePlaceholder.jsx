import { Image as ImageIcon } from 'lucide-react'

export default function ImagePlaceholder({ label, className = '' }) {
  return (
    <div
      className={`bg-brand-navy/[0.06] border-2 border-dashed border-brand-navy/20 flex flex-col items-center justify-center gap-2 text-brand-navy/40 ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      {label && (
        <span className="text-[11px] font-medium tracking-wide text-center px-2">
          {label}
        </span>
      )}
    </div>
  )
}