export default function BookCard({ title, author, bg, fg = '#ffffff' }) {
  return (
    <div
      className="w-44 sm:w-52 aspect-[2/3] rounded-xl shadow-card shrink-0 flex flex-col justify-end p-4 relative overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, white 0%, transparent 40%)',
      }} />
      <p
        className="font-display font-bold text-lg leading-tight relative"
        style={{ color: fg }}
      >
        {title}
      </p>
      {author && (
        <p className="text-xs mt-1 relative" style={{ color: fg, opacity: 0.85 }}>
          {author}
        </p>
      )}
    </div>
  )
}
