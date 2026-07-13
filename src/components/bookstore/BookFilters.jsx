// Interactive filters for the bookstore listing. Controlled via props so the
// containing page (genre page) can apply the filter state to the displayed books.

export default function BookFilters({ filters = {}, onChange = () => {} }) {
  const { price = [] } = filters

  function togglePrice(range) {
    const next = { ...filters }
    const set = new Set(next.price || [])
    if (set.has(range)) set.delete(range)
    else set.add(range)
    next.price = Array.from(set)
    onChange(next)
  }

  return (
    <aside className="bg-white rounded-xl shadow-card p-4">
      <h3 className="font-display font-semibold text-lg text-brand-navy mb-3">Filter</h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-brand-navy/80 mb-2">Price</p>
        <div className="flex flex-col gap-2 text-sm text-brand-navy/80">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={price.includes('lt400')}
              onChange={() => togglePrice('lt400')}
              className="w-4 h-4"
            />
            <span>Under ₹400</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={price.includes('400to600')}
              onChange={() => togglePrice('400to600')}
              className="w-4 h-4"
            />
            <span>₹400–₹600</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={price.includes('gt600')}
              onChange={() => togglePrice('gt600')}
              className="w-4 h-4"
            />
            <span>Above ₹600</span>
          </label>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-navy/80 mb-2">Other</p>
        <p className="text-sm text-brand-navy/60">More filters (author, rating, language) can go here.</p>
      </div>
    </aside>
  )
}
