// Temporary data layer, backed by localStorage.
//
// This exists so the admin panel and public pages have something real to
// read/write against before Supabase is connected. Every function here is
// written the way a Supabase-backed version would be used (async, same
// argument/return shapes) so that swapping the internals later doesn't
// require touching any component that imports this file.
//
// See the "Connecting Supabase" walkthrough for how to replace the body of
// each function with a `supabase.from('books')...` call.

const FEATURED_KEY = 'kadhaigal_featured_books'
const BOOKS_KEY = 'kadhaigal_books'

const seedFeatured = [
  { id: 'f1', title: 'My Friends', author: 'Fredrik Backman' },
  { id: 'f2', title: 'Gajapati Kulapati', author: 'Ashok Rajagopalan' },
  { id: 'f3', title: 'Cleopatra', author: 'Saara El-Arifi' },
  { id: 'f4', title: 'The Midnight Library', author: 'Matt Haig' },
  { id: 'f5', title: 'Lessons in Chemistry', author: 'Bonnie Garmus' },
]

// Book shape (fields beyond title/author/genre/description/price are
// optional — pages fall back gracefully when they're missing):
// {
//   id, title, author, genre, subGenre, description, price,
//   originalPrice,      // for showing a strikethrough + "% off"
//   badge,              // e.g. "Best Seller"
//   isStaffPick,        // shows up in the Books page "Staff Picks" section
//   isFeaturedSelection,// the large bento card within Staff Picks
//   rating,             // 0-5
//   mood: [],           // e.g. ["Dark", "Atmospheric"]
//   curatorNote: { recommendedBy, quote, body },
// }
const seedBooks = [
  {
    id: 'b1',
    title: 'Gajapati Kulapati',
    author: 'Ashok Rajagopalan',
    genre: "Children's Books",
    subGenre: 'Picture Books',
    description: 'A rollicking picture book about an elephant with a very big sneeze problem.',
    price: 399,
    isStaffPick: true,
    isFeaturedSelection: true,
    rating: 5,
  },
  {
    id: 'b2',
    title: "The Nutmeg's Curse",
    author: 'Amitav Ghosh',
    genre: 'Non-Fiction',
    description: 'Parables for a planet in crisis, tracing colonialism through the history of the nutmeg trade.',
    price: 699,
    isStaffPick: true,
    rating: 4,
  },
  {
    id: 'b3',
    title: 'The Forty Rules of Love',
    author: 'Elif Shafak',
    genre: 'Literature & Fiction',
    description: 'A love story woven between 13th-century Anatolia and modern-day Massachusetts.',
    price: 549,
    isStaffPick: true,
    rating: 5,
  },
  {
    id: 'b4',
    title: 'Lessons in Chemistry',
    author: 'Bonnie Garmus',
    genre: 'Literature & Fiction',
    description: 'A scientist-turned-cooking-show-host in 1960s California refuses to play by the rules.',
    price: 499,
    isStaffPick: true,
    rating: 5,
  },
  {
    id: 'b5',
    title: 'Tiny Experiments',
    author: 'Anne-Laure Le Cuff',
    genre: 'Non-Fiction',
    description: 'How to live freely in a goal-obsessed world, one small experiment at a time.',
    price: 599,
    isStaffPick: true,
    rating: 4,
  },
  {
    id: 'b6',
    title: 'Mistborn: The Final Empire',
    author: 'Brandon Sanderson',
    genre: 'Literature & Fiction',
    description:
      'For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned with absolute power and ultimate terror, divinely invincible.\n\nThen, when hope was so long abandoned that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler\'s most hellish prison. Kelsier "snapped" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper: a heist where the stake is the empire itself.',
    price: 599,
    originalPrice: 899,
    badge: 'Best Seller',
    mood: ['Dark', 'Revolutionary', 'Atmospheric'],
    curatorNote: {
      recommendedBy: 'Lakshmi',
      quote: 'Magic that follows the rules…',
      body:
        "I've read countless fantasy epics, but Mistborn's magic system — Allomancy — is genuinely the most creative thing I've encountered. It feels like a high-stakes heist movie set in a world where it rains soot. If you love a good underdog story with a deep, dark history, this is your next obsession.",
    },
    rating: 5,
  },
  {
    id: 'b7',
    title: 'Atmosphere',
    author: 'Taylor Jenkins Reid',
    genre: 'Literature & Fiction',
    description: 'A love story set against the backdrop of NASA\'s space shuttle program in the 1980s.',
    price: 499,
  },
  {
    id: 'b8',
    title: 'Miss Kim Knows and Other Stories',
    author: 'Cho Nam-Joo',
    genre: 'Literature & Fiction',
    description: 'A collection of short stories about the quiet, ordinary lives of Korean women.',
    price: 550,
  },
  {
    id: 'b9',
    title: 'We Do Not Part',
    author: 'Han Kang',
    genre: 'Literature & Fiction',
    description: 'A Nobel Prize-winning meditation on memory, grief, and history.',
    price: 699,
  },
  {
    id: 'b10',
    title: 'Ordinary Love',
    author: 'Marie Rutkoski',
    genre: 'Literature & Fiction',
    description: 'A story of two people finding their way back to each other decades later.',
    price: 599,
  },
  {
    id: 'b11',
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    genre: 'Literature & Fiction',
    description: 'Book one of the Stormlight Archive — an epic of war, honor, and storms.',
    price: 799,
  },
  {
    id: 'b12',
    title: 'Six of Crows',
    author: 'Leigh Bardugo',
    genre: 'Literature & Fiction',
    description: 'Six dangerous outcasts, one impossible heist.',
    price: 599,
  },
  {
    id: 'b13',
    title: 'Babel',
    author: 'R F Kuang',
    genre: 'Literature & Fiction',
    description: 'An arcane history of language, empire, and revolution at Oxford.',
    price: 699,
  },
  {
    id: 'b14',
    title: 'The Will of the Many',
    author: 'James Islington',
    genre: 'Literature & Fiction',
    description: 'In an empire built on a hierarchy of stolen strength, one boy hides in plain sight.',
    price: 649,
  },
  {
    id: 'b15',
    title: 'Anni Dreams of Biryani',
    author: 'Namita Moolani Mehra',
    genre: "Children's Books",
    subGenre: 'Picture Books',
    description: "A young girl's imagination transforms a simple pot of biryani into a magical adventure.",
    price: 399,
    isStaffPick: true,
    rating: 5,
  },
  {
    id: 'b16',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    genre: "Children's Books",
    subGenre: 'Fantasy',
    description: 'An orphaned boy discovers on his eleventh birthday that he is a wizard, and that a magical school is waiting for him.',
    price: 499,
    isStaffPick: true,
    rating: 5,
  },
  {
    id: 'b17',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: "Children's Books",
    subGenre: 'Young Adult',
    description: 'In a dystopian future, a girl volunteers to take her sister\'s place in a televised fight to the death.',
    price: 450,
    isStaffPick: true,
    rating: 4,
  },
  {
    id: 'b18',
    title: "Grimm's Fairy Tales",
    author: 'Jacob and Wilhelm Grimm',
    genre: "Children's Books",
    subGenre: 'Fairy Tales',
    description: 'The classic collection of folk tales, from Cinderella to Hansel and Gretel.',
    price: 350,
    isStaffPick: true,
    rating: 4,
  },
]

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback))
      return fallback
    }
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

// ---- Featured books ("What We're Loving Right Now" on the Home page) ----

export async function getFeaturedBooks() {
  return read(FEATURED_KEY, seedFeatured)
}

export async function addFeaturedBook({ title, author }) {
  const current = read(FEATURED_KEY, seedFeatured)
  const next = [...current, { id: makeId(), title, author }]
  return write(FEATURED_KEY, next)
}

export async function removeFeaturedBook(id) {
  const current = read(FEATURED_KEY, seedFeatured)
  const next = current.filter((b) => b.id !== id)
  return write(FEATURED_KEY, next)
}

// ---- Full inventory (bookstore listing + detail pages) ----

export async function getBooks() {
  return read(BOOKS_KEY, seedBooks)
}

export async function getBookById(id) {
  const books = read(BOOKS_KEY, seedBooks)
  return books.find((b) => String(b.id) === String(id)) ?? null
}

export async function getBooksByGenre(genre) {
  const books = read(BOOKS_KEY, seedBooks)
  return books.filter((b) => (b.genre ?? '').toLowerCase() === genre.toLowerCase())
}

export async function getBooksBySubGenre(subGenre) {
  const books = read(BOOKS_KEY, seedBooks)
  return books.filter((b) => (b.subGenre ?? '').toLowerCase() === subGenre.toLowerCase())
}

export async function getStaffPicks(genre) {
  const books = read(BOOKS_KEY, seedBooks)
  const picks = books.filter((b) => b.isStaffPick)
  if (!genre) return picks
  return picks.filter((b) => (b.genre ?? '').toLowerCase() === genre.toLowerCase())
}

export async function addBook(book) {
  const current = read(BOOKS_KEY, seedBooks)
  const next = [...current, { id: makeId(), ...book }]
  return write(BOOKS_KEY, next)
}

export async function updateBook(id, updates) {
  const current = read(BOOKS_KEY, seedBooks)
  const next = current.map((b) => (b.id === id ? { ...b, ...updates } : b))
  return write(BOOKS_KEY, next)
}

export async function deleteBook(id) {
  const current = read(BOOKS_KEY, seedBooks)
  const next = current.filter((b) => b.id !== id)
  return write(BOOKS_KEY, next)
}