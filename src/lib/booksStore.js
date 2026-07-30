import { supabase } from './supabase.js'

function rowToBook(row) {
  if (!row) return null
  const authors = row.authors ?? []
  return {
    id: row.id,
    title: row.title,
    authors,
    author: authors[0] ?? '',
    publisher: row.publisher ?? '',
    publishedDate: row.published_date ?? '',
    description: row.description ?? '',
    industryIdentifiers: row.isbn ? [{ type: 'ISBN_13', identifier: row.isbn }] : [],
    isbn: row.isbn ?? undefined,
    pageCount: row.page_count ?? null,
    categories: row.categories ?? [],
    averageRating: row.average_rating ?? null,
    ratingsCount: row.ratings_count ?? null,
    imageLinks: {
      thumbnail: row.image_thumbnail ?? '',
      smallThumbnail: row.image_small_thumbnail ?? '',
    },
    language: row.language ?? 'en',
    previewLink: row.preview_link ?? '',
    infoLink: row.info_link ?? '',
    maturityRating: row.maturity_rating ?? 'NOT_MATURE',
    genre: row.genre ?? '',
    subGenre: row.sub_genre ?? undefined,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    badge: row.badge ?? undefined,
    isStaffPick: row.is_staff_pick ?? false,
    isFeaturedSelection: row.is_featured_selection ?? false,
    rating: row.rating ?? undefined,
    staffNote: row.staff_note ?? undefined,
    mood: row.mood ?? undefined,
    curatorNote: row.curator_note ?? undefined,
    isSelfPublished: row.is_self_published ?? false,
    printLocation: row.print_location ?? undefined,
    printNote: row.print_note ?? undefined,
    isUsed: row.is_used ?? false,
    conditionNote: row.condition_note ?? undefined,
    quantity: row.quantity ?? undefined,
    discount: row.discount ?? undefined,
    value: row.value ?? undefined,
    status: row.status ?? undefined,
    distributor: row.distributor ?? undefined,
  }
}

function bookToRow(book) {
  const row = {}
  const set = (jsKey, dbKey = jsKey) => {
    if (book[jsKey] !== undefined) row[dbKey] = book[jsKey]
  }

  set('title')
  set('authors')
  set('publisher')
  set('publishedDate', 'published_date')
  set('description')
  set('isbn')
  set('pageCount', 'page_count')
  set('categories')
  set('averageRating', 'average_rating')
  set('ratingsCount', 'ratings_count')
  set('language')
  set('previewLink', 'preview_link')
  set('infoLink', 'info_link')
  set('maturityRating', 'maturity_rating')
  set('genre')
  set('subGenre', 'sub_genre')
  set('price')
  set('originalPrice', 'original_price')
  set('badge')
  set('isStaffPick', 'is_staff_pick')
  set('isFeaturedSelection', 'is_featured_selection')
  set('rating')
  set('staffNote', 'staff_note')
  set('mood')
  set('curatorNote', 'curator_note')
  set('isSelfPublished', 'is_self_published')
  set('printLocation', 'print_location')
  set('printNote', 'print_note')
  set('isUsed', 'is_used')
  set('conditionNote', 'condition_note')
  set('quantity')
  set('discount')
  set('value')
  set('status')
  set('distributor')

  if (book.imageLinks?.thumbnail !== undefined) row.image_thumbnail = book.imageLinks.thumbnail
  if (book.imageLinks?.smallThumbnail !== undefined) row.image_small_thumbnail = book.imageLinks.smallThumbnail

  return row
}

// ---- Featured books ----

export async function getFeaturedBooks() {
  const { data, error } = await supabase
    .from('featured_books')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data.map((row) => ({ id: row.id, title: row.title, author: row.author }))
}

export async function addFeaturedBook({ title, author }) {
  const { data, error } = await supabase
    .from('featured_books')
    .insert({ title, author })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function removeFeaturedBook(id) {
  const { error } = await supabase.from('featured_books').delete().eq('id', id)
  if (error) throw error
}

// ---- Full inventory ----

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(rowToBook)
}

export async function getBookById(id) {
  const { data, error } = await supabase.from('books').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return rowToBook(data)
}

// NEW — used by BookFormModal to detect "already in catalogue" before
// hitting the Google Books API.
export async function getBookByIsbn(isbn) {
  const clean = String(isbn).replace(/[-\s]/g, '')
  if (!clean) return null
  const { data, error } = await supabase.from('books').select('*').eq('isbn', clean).maybeSingle()
  if (error) throw error
  return rowToBook(data)
}

export async function getBooksByGenre(genre) {
  const { data, error } = await supabase.from('books').select('*').ilike('genre', genre)
  if (error) throw error
  return data.map(rowToBook)
}

export async function getBooksBySubGenre(subGenre) {
  const { data, error } = await supabase.from('books').select('*').ilike('sub_genre', subGenre)
  if (error) throw error
  return data.map(rowToBook)
}

export async function getStaffPicks(genre) {
  let query = supabase.from('books').select('*').eq('is_staff_pick', true)
  if (genre) query = query.ilike('genre', genre)
  const { data, error } = await query
  if (error) throw error
  return data.map(rowToBook)
}

export async function getLocalShelfBooks() {
  const { data, error } = await supabase.from('books').select('*').eq('is_self_published', true)
  if (error) throw error
  return data.map(rowToBook)
}

export async function addBook(book) {
  const { data, error } = await supabase.from('books').insert(bookToRow(book)).select().single()
  if (error) throw error
  return rowToBook(data)
}

export async function updateBook(id, updates) {
  const { data, error } = await supabase
    .from('books')
    .update(bookToRow(updates))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return rowToBook(data)
}

export async function deleteBook(id) {
  const { error } = await supabase.from('books').delete().eq('id', id)
  if (error) throw error
}