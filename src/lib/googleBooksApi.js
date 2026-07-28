// Thin wrapper around the Google Books API. Returns data already shaped to
// match the Google-Books-derived fields in the book schema (see books.js),
// so a fetched result can be spread straight into a book record.
//
// No API key is required for basic volume lookups, but the unauthenticated
// quota is low and shared per-IP — on dev machines, sandboxes, or offices
// behind a shared IP, you WILL see 429 (rate limited) errors fairly
// regularly. To fix this properly:
//   1. Get a free key at https://console.cloud.google.com
//      (enable the "Books API" for the project)
//   2. Add it to your .env file as VITE_GOOGLE_BOOKS_API_KEY=your_key_here
//   3. Restart the vite dev server so the env var is picked up
// With a key, the quota jumps from a handful of requests/day to 1000/day
// by default, and 429s become rare.

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env?.VITE_GOOGLE_BOOKS_API_KEY

export class BookNotFoundError extends Error {}
export class RateLimitError extends Error {}

function normalizeIsbn(isbn) {
  return String(isbn).replace(/[-\s]/g, '')
}

// Retries once on a 429, waiting briefly first — a lot of rate limit hits
// are transient bursts rather than a hard daily cap.
async function fetchWithRetry(url, retriesLeft = 1, delayMs = 1200) {
  const res = await fetch(url)
  if (res.status === 429 && retriesLeft > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    return fetchWithRetry(url, retriesLeft - 1, delayMs * 2)
  }
  return res
}

function volumeToBook(volume, fallbackIsbn) {
  const info = volume.volumeInfo ?? {}
  const identifiers = info.industryIdentifiers ?? []
  const isbn13 = identifiers.find((i) => i.type === 'ISBN_13')
  const isbn10 = identifiers.find((i) => i.type === 'ISBN_10')

  return {
    title: info.title ?? '',
    authors: info.authors ?? [],
    publisher: info.publisher ?? '',
    publishedDate: info.publishedDate ?? '',
    description: info.description ?? '',
    industryIdentifiers:
      identifiers.length > 0
        ? identifiers
        : [{ type: 'ISBN_13', identifier: normalizeIsbn(fallbackIsbn) }],
    pageCount: info.pageCount ?? null,
    categories: info.categories ?? [],
    averageRating: info.averageRating ?? null,
    ratingsCount: info.ratingsCount ?? null,
    imageLinks: {
      thumbnail: (info.imageLinks?.thumbnail ?? '').replace('http://', 'https://'),
      smallThumbnail: (info.imageLinks?.smallThumbnail ?? '').replace('http://', 'https://'),
    },
    language: info.language ?? 'en',
    previewLink: info.previewLink ?? '',
    infoLink: info.infoLink ?? '',
    maturityRating: info.maturityRating ?? 'NOT_MATURE',
    // surfaced only so the admin form can display them; not stored fields
    _isbn13: isbn13?.identifier,
    _isbn10: isbn10?.identifier,
  }
}

// Throws BookNotFoundError if no match, RateLimitError on a 429 (even after
// retrying), or a plain Error for other network/API failures.
export async function fetchBookByIsbn(isbn) {
  const clean = normalizeIsbn(isbn)
  if (!clean) throw new Error('Enter an ISBN to look up.')

  const url = `${GOOGLE_BOOKS_API}?q=isbn:${clean}${API_KEY ? `&key=${API_KEY}` : ''}`

  let res
  try {
    res = await fetchWithRetry(url)
  } catch {
    throw new Error('Could not reach Google Books. Check your connection and try again.')
  }

  if (res.status === 429) {
    throw new RateLimitError(
      API_KEY
        ? 'Google Books is rate-limiting this API key right now. Wait a moment and try again.'
        : "Google Books is rate-limiting requests (common without an API key on shared IPs). Wait a few seconds and try again, or enter the details manually — see the comment at the top of googleBooksApi.js to add a key and avoid this."
    )
  }

  if (!res.ok) {
    throw new Error(`Google Books API returned an error (${res.status}).`)
  }

  const data = await res.json()
  if (!data.items || data.items.length === 0) {
    throw new BookNotFoundError(
      `No book found for ISBN ${isbn}. You can enter the details manually instead.`
    )
  }

  return volumeToBook(data.items[0], clean)
}