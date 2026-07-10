const BASE_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

/**
 * Search Google Books by a free-text query.
 * @param {string} query
 * @param {number} maxResults
 */
export async function searchBooks(query, maxResults = 10) {
  const url = new URL(BASE_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('maxResults', String(maxResults))
  if (API_KEY) url.searchParams.set('key', API_KEY)

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Google Books API error: ${res.status}`)
  }
  const data = await res.json()
  return data.items ?? []
}

/**
 * Fetch a single Google Books volume by its volume id.
 * @param {string} volumeId
 */
export async function getBookByVolumeId(volumeId) {
  const url = new URL(`${BASE_URL}/${volumeId}`)
  if (API_KEY) url.searchParams.set('key', API_KEY)

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Google Books API error: ${res.status}`)
  }
  return res.json()
}
