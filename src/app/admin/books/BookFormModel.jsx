import { useState } from 'react'
import { X, Search, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { fetchBookByIsbn, BookNotFoundError, RateLimitError } from '../../../lib/googleBooksApi.js'
import { getBookByIsbn } from '../../../lib/booksStore.js'
import { allCategories } from '../../../data/categories.js'

const GENRES = allCategories.map(c => c.name)
const BINDINGS = ['Paperback', 'Hardback']

function splitList(str) {
  if (!str) return []
  if (Array.isArray(str)) return str
  return String(str)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function emptyForm() {
  return {
    // Google Books fields
    title: '',
    authors: '',
    publisher: '',
    publishedDate: '',
    description: '',
    isbn: '',
    pageCount: '',
    categories: '',
    allCategories: '',
    language: 'en',
    thumbnail: '',
    smallThumbnail: '',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    averageRating: '',
    ratingsCount: '',
    // Store-specific fields
    genre: '',
    subGenre: '',
    price: '',
    quantity: '',
    originalPrice: '',
    badge: '',
    rating: '',
    mood: '',
    binding: '',
    isStaffPick: false,
    staffBy: '',
    staffRole: '',
    staffQuote: '',
    staffBody: '',
    isSelfPublished: false,
    printLocation: '',
    printNote: '',
    isUsed: false,
    conditionNote: '',
  }
}

function bookToForm(book) {
  if (!book) return emptyForm()
  return {
    title: book.title ?? '',
    authors: (book.authors ?? []).join(', '),
    publisher: book.publisher ?? '',
    publishedDate: book.publishedDate ?? '',
    description: book.description ?? '',
    isbn: book.industryIdentifiers?.[0]?.identifier ?? book.isbn ?? '',
    pageCount: book.pageCount ?? '',
    categories: (book.categories ?? book.allCategories ?? []).join(', '),
    allCategories: (book.allCategories ?? book.categories ?? []).join(', '),
    language: book.language ?? 'en',
    thumbnail: book.imageLinks?.thumbnail ?? '',
    smallThumbnail: book.imageLinks?.smallThumbnail ?? '',
    previewLink: book.previewLink ?? '',
    infoLink: book.infoLink ?? '',
    maturityRating: book.maturityRating ?? 'NOT_MATURE',
    averageRating: book.averageRating ?? '',
    ratingsCount: book.ratingsCount ?? '',
    genre: book.genre ?? '',
    subGenre: book.subGenre ?? '',
    price: book.price ?? '',
    quantity: book.quantity ?? '',
    originalPrice: book.originalPrice ?? '',
    badge: book.badge ?? '',
    rating: book.rating ?? '',
    mood: (book.mood ?? []).join(', '),
    binding: book.binding ?? '',
    isStaffPick: !!book.isStaffPick,
    staffBy: book.staffNote?.by ?? '',
    staffRole: book.staffNote?.role ?? '',
    staffQuote: book.staffNote?.quote ?? '',
    staffBody: book.staffNote?.body ?? '',
    isSelfPublished: !!book.isSelfPublished,
    printLocation: book.printLocation ?? '',
    printNote: book.printNote ?? '',
    isUsed: !!book.isUsed,
    conditionNote: book.conditionNote ?? '',
  }
}

function formToBook(form) {
  const isbn = (form.isbn ?? '').trim()
  return {
    // Google Books fields
    title: (form.title ?? '').trim(),
    authors: splitList(form.authors),
    publisher: (form.publisher ?? '').trim(),
    publishedDate: (form.publishedDate ?? '').trim(),
    description: (form.description ?? '').trim(),
    isbn: isbn || undefined,
    industryIdentifiers: isbn
      ? [{ type: isbn.length === 10 ? 'ISBN_10' : 'ISBN_13', identifier: isbn }]
      : [],
    pageCount: form.pageCount ? Number(form.pageCount) : null,
    categories: splitList(form.categories || form.allCategories),
    averageRating: form.averageRating ? Number(form.averageRating) : null,
    ratingsCount: form.ratingsCount ? Number(form.ratingsCount) : null,
    imageLinks: {
      thumbnail: (form.thumbnail ?? '').trim(),
      smallThumbnail: (form.smallThumbnail ?? form.thumbnail ?? '').trim(),
    },
    language: (form.language ?? 'en').trim() || 'en',
    previewLink: (form.previewLink ?? '').trim(),
    infoLink: (form.infoLink ?? '').trim(),
    maturityRating: form.maturityRating || 'NOT_MATURE',
    // Store-specific fields
    genre: (form.genre ?? '').trim(),
    subGenre: (form.subGenre ?? '').trim() || undefined,
    price: form.price ? Number(form.price) : 0,
    quantity: form.quantity ? Number(form.quantity) : 0,
    originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    badge: (form.badge ?? '').trim() || undefined,
    rating: form.rating ? Number(form.rating) : undefined,
    mood: form.mood ? splitList(form.mood) : undefined,
    binding: form.binding || undefined,
    isStaffPick: form.isStaffPick,
    staffNote: form.isStaffPick
      ? { by: (form.staffBy ?? '').trim(), role: (form.staffRole ?? '').trim(), quote: (form.staffQuote ?? '').trim(), body: (form.staffBody ?? '').trim() }
      : undefined,
    isSelfPublished: form.isSelfPublished,
    printLocation: form.isSelfPublished ? (form.printLocation ?? '').trim() : undefined,
    printNote: form.isSelfPublished ? (form.printNote ?? '').trim() : undefined,
    isUsed: form.isUsed,
    conditionNote: form.isUsed ? (form.conditionNote ?? '').trim() : undefined,
  }
}

export default function BookFormModal({ mode, initialBook, saving, onClose, onSave, onValidationError }) {
  const isEdit = mode === 'edit'
  const [entryMode, setEntryMode] = useState('isbn') // 'isbn' | 'manual' — add mode only
  const [form, setForm] = useState(() => bookToForm(initialBook))
  const [detailsVisible, setDetailsVisible] = useState(isEdit)
  const [isbnInput, setIsbnInput] = useState(form.isbn)
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [submitError, setSubmitError] = useState('')

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleFetch() {
    setFetching(true)
    setFetchError('')
    try {
      const existing = await getBookByIsbn(isbnInput)
      if (existing && !isEdit) {
        setFetchError(`"${existing.title}" is already in the catalogue with this ISBN.`)
        setFetching(false)
        return
      }
      const data = await fetchBookByIsbn(isbnInput)
      setForm((f) => ({
        ...f,
        title: data.title,
        authors: data.authors.join(', '),
        publisher: data.publisher,
        publishedDate: data.publishedDate,
        description: data.description,
        isbn: data._isbn13 ?? data._isbn10 ?? isbnInput.replace(/[-\s]/g, ''),
        pageCount: data.pageCount ?? '',
        categories: data.categories.join(', '),
        language: data.language,
        thumbnail: data.imageLinks.thumbnail,
        smallThumbnail: data.imageLinks.smallThumbnail,
        previewLink: data.previewLink,
        infoLink: data.infoLink,
        maturityRating: data.maturityRating,
        averageRating: data.averageRating ?? '',
        ratingsCount: data.ratingsCount ?? '',
        genre: f.genre || data.categories?.[0] || '',
      }))
      setDetailsVisible(true)
    } catch (err) {
      setFetchError(
        err instanceof BookNotFoundError || err instanceof RateLimitError
          ? err.message
          : err.message || 'Something went wrong fetching this book.'
      )
    } finally {
      setFetching(false)
    }
  }

  function switchToManual() {
    setEntryMode('manual')
    setForm((f) => ({ ...f, isSelfPublished: true }))
    setDetailsVisible(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    if (!form.title.trim()) {
      if (onValidationError) onValidationError('Title is required.')
      return
    }
    if (!form.genre.trim()) {
      if (onValidationError) onValidationError('Please choose a genre.')
      return
    }
    if (!form.price && form.price !== 0) {
      if (onValidationError) onValidationError('Price is required.')
      return
    }
    if (!form.quantity && form.quantity !== 0) {
      if (onValidationError) onValidationError('Quantity is required.')
      return
    }
    try {
      await onSave(formToBook(form))
    } catch (err) {
      setSubmitError(err.message || 'Could not save this book. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-brand-navy/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-navy/10 shrink-0">
            <h2 className="font-display font-bold text-lg text-brand-navy">
              {isEdit ? 'Edit Book' : 'Add Book'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-brand-navy/5 text-brand-navy/50"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1 min-h-0">
          {!isEdit && (
            <div className="flex rounded-lg border border-brand-navy/15 p-1 bg-brand-navy/[0.03] text-sm font-semibold">
              <button
                type="button"
                onClick={() => setEntryMode('isbn')}
                className={`flex-1 py-2 rounded-md transition-colors ${
                  entryMode === 'isbn' ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-navy/50'
                }`}
              >
                Fetch by ISBN
              </button>
              <button
                type="button"
                onClick={switchToManual}
                className={`flex-1 py-2 rounded-md transition-colors ${
                  entryMode === 'manual' ? 'bg-white shadow-sm text-brand-navy' : 'text-brand-navy/50'
                }`}
              >
                Enter Manually (Self-Published)
              </button>
            </div>
          )}

          {(!isEdit ? entryMode === 'isbn' : true) && (
            <div>
              <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block">
                ISBN
              </label>
              <div className="flex gap-2">
                <input
                  value={isbnInput}
                  onChange={(e) => setIsbnInput(e.target.value)}
                  placeholder="e.g. 9780765311788"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={handleFetch}
                  disabled={fetching || !isbnInput.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-navy text-white text-sm font-semibold disabled:opacity-50 shrink-0"
                >
                  {fetching ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : isEdit ? (
                    <RefreshCw size={15} />
                  ) : (
                    <Search size={15} />
                  )}
                  {isEdit ? 'Refresh' : 'Fetch Details'}
                </button>
              </div>
              {fetchError && (
                <p className="flex items-start gap-1.5 text-xs text-red-600 mt-2">
                  <AlertCircle size={13} className="mt-0.5 shrink-0" /> {fetchError}
                </p>
              )}
              {!isEdit && (
                <p className="text-xs text-brand-navy/40 mt-2">
                  Don't have an ISBN? Switch to "Enter Manually" above for self-published titles.
                </p>
              )}
            </div>
          )}

          {detailsVisible && (
            <>
              <Section title="Book Details">
                <Field label="Title" required span={2}>
                  <input value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
                </Field>
                <Field label="Author(s)" hint="Comma-separated" span={2}>
                  <input value={form.authors} onChange={(e) => set('authors', e.target.value)} className={inputClass} />
                </Field>
                <Field label="Publisher">
                  <input value={form.publisher} onChange={(e) => set('publisher', e.target.value)} className={inputClass} />
                </Field>
                <Field label="Published Date">
                  <input
                    value={form.publishedDate}
                    onChange={(e) => set('publishedDate', e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className={inputClass}
                  />
                </Field>
                <Field label="Description" span={2}>
                  <textarea
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    rows={3}
                    className={inputClass}
                  />
                </Field>
                <Field label="Page Count">
                  <input
                    type="number"
                    value={form.pageCount}
                    onChange={(e) => set('pageCount', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Language" hint="ISO code, e.g. en, ta">
                  <input value={form.language} onChange={(e) => set('language', e.target.value)} className={inputClass} />
                </Field>
                <Field label="Cover Image URL" span={2}>
                  <input value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} className={inputClass} />
                </Field>
              </Section>

              <Section title="Store Details">
                <Field label="Genre" required>
                  <select
                    value={form.genre}
                    onChange={(e) => {
                      set('genre', e.target.value)
                      set('subGenre', '')
                    }}
                    className={inputClass}
                  >
                    <option value="">Select a genre…</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Sub-genre">
                  <select
                    value={form.subGenre}
                    onChange={(e) => set('subGenre', e.target.value)}
                    className={inputClass}
                    disabled={!form.genre}
                  >
                    <option value="">Select a sub-genre…</option>
                    {allCategories.find(c => c.name === form.genre)?.tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Binding">
                  <select value={form.binding} onChange={(e) => set('binding', e.target.value)} className={inputClass}>
                    <option value="">Select…</option>
                    {BINDINGS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Price (₹)" required>
                  <input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputClass} />
                </Field>
                 <Field label="Quantity in Stock" required>
                  <input
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(e) => set('quantity', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Original Price (₹)" hint="Optional, shows a strikethrough">
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => set('originalPrice', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Badge" hint='e.g. "Best Seller"'>
                  <input value={form.badge} onChange={(e) => set('badge', e.target.value)} className={inputClass} />
                </Field>
                <Field label="Display Rating (0–5)">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    value={form.rating}
                    onChange={(e) => set('rating', e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Mood Tags" hint="Comma-separated, e.g. Dark, Atmospheric" span={2}>
                  <input value={form.mood} onChange={(e) => set('mood', e.target.value)} className={inputClass} />
                </Field>
              </Section>

              <Section title="Pre-loved / Used Copy">
                <Field span={2}>
                  <Checkbox
                    checked={form.isUsed}
                    onChange={(v) => set('isUsed', v)}
                    label="This is a used / pre-loved copy"
                  />
                </Field>
                {form.isUsed && (
                  <Field label="Condition Note" span={2} hint='e.g. "Good condition, light shelf wear"'>
                    <input value={form.conditionNote} onChange={(e) => set('conditionNote', e.target.value)} className={inputClass} />
                  </Field>
                )}
              </Section>

              <Section title="Self-Published / Regional">
                <Field span={2}>
                  <Checkbox
                    checked={form.isSelfPublished}
                    onChange={(v) => set('isSelfPublished', v)}
                    label="This is a self-published or regional-press title"
                  />
                </Field>
                {form.isSelfPublished && (
                  <>
                    <Field label="Print Location" hint="e.g. Madurai">
                      <input value={form.printLocation} onChange={(e) => set('printLocation', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Print Note" hint='e.g. "Author signs in-store"'>
                      <input value={form.printNote} onChange={(e) => set('printNote', e.target.value)} className={inputClass} />
                    </Field>
                  </>
                )}
              </Section>

              <Section title="Staff Pick">
                <Field span={2}>
                  <Checkbox
                    checked={form.isStaffPick}
                    onChange={(v) => set('isStaffPick', v)}
                    label="Feature as a staff pick"
                  />
                </Field>
                {form.isStaffPick && (
                  <>
                    <Field label="Staff Name">
                      <input value={form.staffBy} onChange={(e) => set('staffBy', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Role">
                      <input value={form.staffRole} onChange={(e) => set('staffRole', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Pull Quote" span={2}>
                      <input value={form.staffQuote} onChange={(e) => set('staffQuote', e.target.value)} className={inputClass} />
                    </Field>
                    <Field label="Full Note" span={2}>
                      <textarea value={form.staffBody} onChange={(e) => set('staffBody', e.target.value)} rows={3} className={inputClass} />
                    </Field>
                  </>
                )}
              </Section>
            </>
          )}

          {submitError && (
            <p className="flex items-center gap-1.5 text-sm text-red-600">
              <AlertCircle size={15} /> {submitError}
            </p>
          )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t border-brand-navy/10 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-brand-navy/70 hover:bg-brand-navy/5 rounded-lg"
            >
              Cancel
            </button>
            {detailsVisible && (
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-brand-brick hover:bg-[#9c380c] rounded-lg disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {isEdit ? 'Save Changes' : 'Add Book'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

const inputClass =
  'w-full px-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-brick/30'

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-brand-navy/40 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function Field({ label, hint, required, span = 1, children }) {
  return (
    <div className={span === 2 ? 'col-span-2' : 'col-span-1'}>
      {label && (
        <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block">
          {label} {required && <span className="text-brand-brick">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-[11px] text-brand-navy/40 mt-1">{hint}</p>}
    </div>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-brand-navy cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-brand-navy/30 text-brand-brick focus:ring-brand-brick/30"
      />
      {label}
    </label>
  )
}