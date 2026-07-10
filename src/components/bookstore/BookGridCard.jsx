// Placeholder component for the bookstore listing.
// Build this out when you implement the /bookstore page.

export default function BookGridCard({ book }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <p className="font-display font-bold text-brand-navy">{book?.title ?? 'Book title'}</p>
      <p className="text-sm text-brand-navy/60">{book?.author ?? 'Author name'}</p>
    </div>
  )
}
