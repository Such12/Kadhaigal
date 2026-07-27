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

// Book shape mirrors the Google Books API volumeInfo response, extended with
// store-specific fields. When Supabase is connected, columns map 1-to-1.
//
// Google Books API fields:
//   title, authors[], publisher, publishedDate, description,
//   industryIdentifiers[{ type, identifier }], pageCount,
//   categories[], averageRating, ratingsCount,
//   imageLinks{ smallThumbnail, thumbnail }, language,
//   previewLink, infoLink, maturityRating
//
// Store-specific fields:
//   id, price, originalPrice, badge, isStaffPick,
//   staffNote{ by, role, quote, body },  ← admin-entered when isStaffPick
//   rating (0–5 display stars), mood[], curatorNote{ recommendedBy, quote, body }
//   isSelfPublished, printLocation, printNote  ← admin-entered for the Local Shelf section
const seedBooks = [
  {
    id: 'b1',
    // ── Google Books fields ──────────────────────────────────────────────
    title: 'Gajapati Kulapati',
    authors: ['Ashok Rajagopalan'],
    publisher: 'Tulika Publishers',
    publishedDate: '2007',
    description: 'A rollicking picture book about an elephant with a very big sneeze problem. Every time Gajapati Kulapati sneezes, something unexpected happens — and the whole jungle has to deal with the consequences!',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9788181462954' }],
    pageCount: 32,
    categories: ["Children's Books", 'Picture Books'],
    averageRating: 4.8,
    ratingsCount: 1240,
    imageLinks: {
      thumbnail: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1436535413i/25883083.jpg",
      smallThumbnail: "https://books.google.com/books/content?id=O4JQDwAAQBAJ&printsec=frontcover&img=1&zoom=5"
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: "Children's Books",
    subGenre: 'Picture Books',
    price: 399,
    isStaffPick: true,
    isFeaturedSelection: true,
    rating: 5,
    staffNote: {
      by: 'Priya',
      role: 'Front counter',
      quote: '"The book that made me fall in love with picture books all over again."',
      body: "I've handed this one to more parents than I can count. Ashok Rajagopalan's illustrations are a riot and the sneeze sound effects alone are worth the price. It's loud, it's joyful, it's absurd in the best possible way. A staple at every story-time session we've ever done.",
    },
  },
  {
    id: 'b2',
    // ── Google Books fields ──────────────────────────────────────────────
    title: "The Nutmeg's Curse",
    authors: ['Amitav Ghosh'],
    publisher: 'John Murray',
    publishedDate: '2021-10-05',
    description: 'Parables for a planet in crisis, tracing colonialism through the history of the nutmeg trade. Ghosh weaves together history, ecology, and parable to argue that the destruction of nature is rooted in a cultural and political project that began with colonial conquest.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781529369786' }],
    pageCount: 336,
    categories: ['Non-Fiction', 'History', 'Environment'],
    averageRating: 4.2,
    ratingsCount: 3870,
    imageLinks: {
      thumbnail: "https://books.google.com/books/content?id=MzhSzgEACAAJ&printsec=frontcover&img=1&zoom=1",
smallThumbnail: "https://books.google.com/books/content?id=MzhSzgEACAAJ&printsec=frontcover&img=1&zoom=5"
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: 'Non-Fiction',
    price: 699,
    isStaffPick: true,
    rating: 4,
    staffNote: {
      by: 'Arun',
      role: 'Weekend curator',
      quote: "\"Dense, urgent, and completely unlike anything else you'll read this year.\"",
      body: "Ghosh connects the dots between colonial spice routes and climate collapse in a way that feels almost prophetic. It's not an easy read — it asks a lot of you — but by the end you're seeing the world differently. I recommended it to our book club and it sparked the longest conversation we've ever had.",
    },
  },
  {
    id: 'b3',
    // ── Google Books fields ──────────────────────────────────────────────
    title: 'The Forty Rules of Love',
    authors: ['Elif Shafak'],
    publisher: 'Viking',
    publishedDate: '2010-03-25',
    description: 'A love story woven between 13th-century Anatolia and modern-day Massachusetts. Forty years of searching, one mystical encounter, and the eternal rules of love as revealed by Rumi and Shams of Tabriz.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780670085668' }],
    pageCount: 368,
    categories: ['Literature & Fiction', 'Historical Fiction', 'Spirituality'],
    averageRating: 4.5,
    ratingsCount: 52400,
    imageLinks: {
      thumbnail: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1442161289i/6642715.jpg",
smallThumbnail: "https://books.google.com/books/content?id=dI0-9L2R2N4C&printsec=frontcover&img=1&zoom=5"
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: 'Literature & Fiction',
    price: 549,
    isStaffPick: true,
    rating: 5,
    staffNote: {
      by: 'Lakshmi',
      role: 'Founder',
      quote: '"There are books that change how you see love. This is one of them."',
      body: "I first read this during a flight to Istanbul and I didn't put it down once. Shafak holds two timelines simultaneously — one soaring and mystical, one quietly heartbreaking — and by the end they've completely collapsed into each other. Every time I see a customer searching for 'something meaningful', this is the first book I reach for.",
    },
  },
  {
    id: 'b4',
    // ── Google Books fields ──────────────────────────────────────────────
    title: 'Lessons in Chemistry',
    authors: ['Bonnie Garmus'],
    publisher: 'Doubleday',
    publishedDate: '2022-04-05',
    description: 'A scientist-turned-cooking-show-host in 1960s California refuses to play by the rules. Elizabeth Zott is not your average woman — in fact, Elizabeth Zott would be the first to point out that there is no such thing.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780385547345' }],
    pageCount: 400,
    categories: ['Literature & Fiction', 'Humour', 'Historical Fiction'],
    averageRating: 4.4,
    ratingsCount: 89200,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780385547345-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: 'Literature & Fiction',
    price: 499,
    isStaffPick: true,
    rating: 5,
    staffNote: {
      by: 'Meena',
      role: "Children's section lead",
      quote: '"Feminist, funny, furious — and absolutely impossible to put down."',
      body: "I borrowed this from the store shelf 'just to read a chapter' and came back the next morning having finished the whole thing at 2am. Elizabeth Zott is one of the most remarkable protagonists in recent fiction. The chemistry jokes are real, the dog is perfect, and the ending made me actually cheer out loud in my kitchen.",
    },
  },
  {
    id: 'b5',
    // ── Google Books fields ──────────────────────────────────────────────
    title: 'Tiny Experiments',
    authors: ['Anne-Laure Le Cuff'],
    publisher: 'Portfolio',
    publishedDate: '2024-02-20',
    description: 'How to live freely in a goal-obsessed world, one small experiment at a time. A practical and philosophical guide to treating your own life as a series of curious, low-stakes experiments.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780593715307' }],
    pageCount: 288,
    categories: ['Non-Fiction', 'Self-Help', 'Productivity'],
    averageRating: 4.3,
    ratingsCount: 2180,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1731624046i/214268997.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780593715307-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: 'Non-Fiction',
    price: 599,
    isStaffPick: true,
    rating: 4,
    staffNote: {
      by: 'Dev',
      role: 'Events & community',
      quote: '"Gave me permission to stop planning and just start trying things."',
      body: "As someone who overthinks every decision, this book was genuinely life-changing. Le Cuff doesn't tell you to 'hustle smarter' — she tells you to be curious, run small experiments, and let go of the outcome. I've re-read the first three chapters about four times. It's become my go-to recommendation for anyone who feels stuck.",
    },
  },
  {
    id: 'b6',
    // ── Google Books fields ──────────────────────────────────────────────
    title: 'Mistborn: The Final Empire',
    authors: ['Brandon Sanderson'],
    publisher: 'Tor Books',
    publishedDate: '2006-07-17',
    description: 'For a thousand years the ash fell and no flowers bloomed. A brilliant thief and natural leader turns his talents to the ultimate caper: a heist where the stake is the empire itself.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780765311788' }],
    pageCount: 541,
    categories: ['Fantasy', 'Literature & Fiction'],
    averageRating: 4.7,
    ratingsCount: 145000,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780765311788-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    // ── Store-specific fields ────────────────────────────────────────────
    genre: 'Literature & Fiction',
    price: 599,
    originalPrice: 899,
    badge: 'Best Seller',
    mood: ['Dark', 'Revolutionary', 'Atmospheric'],
    curatorNote: {
      recommendedBy: 'Lakshmi',
      quote: 'Magic that follows the rules…',
      body: "I've read countless fantasy epics, but Mistborn's magic system is genuinely the most creative thing I've encountered.",
    },
    rating: 5,
  },
  {
    id: 'b7',
    title: 'Atmosphere',
    authors: ['Taylor Jenkins Reid'],
    publisher: 'Ballantine Books',
    publishedDate: '2025-05-06',
    description: "A love story set against the backdrop of NASA's space shuttle program in the 1980s.",
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780593311417' }],
    pageCount: 352,
    categories: ['Literature & Fiction', 'Romance', 'Historical Fiction'],
    averageRating: 4.1,
    ratingsCount: 12400,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1730469032i/220817728.jpg',
smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780593158739-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 499,
  },
  {
    id: 'b8',
    title: 'Miss Kim Knows and Other Stories',
    authors: ['Cho Nam-Joo'],
    publisher: 'Simon & Schuster',
    publishedDate: '2023-06-27',
    description: 'A collection of short stories about the quiet, ordinary lives of Korean women.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781398519855' }],
    pageCount: 208,
    categories: ['Literature & Fiction', 'Short Stories'],
    averageRating: 4.0,
    ratingsCount: 4320,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1687178105i/63252462.jpgs',
smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9781398522930-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 550,
  },
  {
    id: 'b9',
    title: 'We Do Not Part',
    authors: ['Han Kang'],
    publisher: 'Hogarth Press',
    publishedDate: '2025-01-21',
    description: 'A Nobel Prize-winning meditation on memory, grief, and history set on Jeju Island.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781529151978' }],
    pageCount: 256,
    categories: ['Literature & Fiction', 'Literary Fiction'],
    averageRating: 4.4,
    ratingsCount: 8760,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1714901866i/205436018.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9781529151978-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 699,
  },
  {
    id: 'b10',
    title: 'Ordinary Love',
    authors: ['Marie Rutkoski'],
    publisher: 'Farrar, Straus and Giroux',
    publishedDate: '2025-03-11',
    description: 'A story of two people finding their way back to each other decades later.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780374604509' }],
    pageCount: 320,
    categories: ['Literature & Fiction', 'Romance'],
    averageRating: 4.0,
    ratingsCount: 3100,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1729645360i/218695913.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780374604509-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 599,
  },
  {
    id: 'b11',
    title: 'The Way of Kings',
    authors: ['Brandon Sanderson'],
    publisher: 'Tor Books',
    publishedDate: '2010-08-31',
    description: 'Book one of the Stormlight Archive — an epic of war, honor, and storms.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780765326355' }],
    pageCount: 1007,
    categories: ['Fantasy', 'Literature & Fiction'],
    averageRating: 4.8,
    ratingsCount: 198000,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780765326355-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 799,
  },
  {
    id: 'b12',
    title: 'Six of Crows',
    authors: ['Leigh Bardugo'],
    publisher: 'Henry Holt and Co.',
    publishedDate: '2015-09-29',
    description: 'Six dangerous outcasts, one impossible heist. A brilliant, morally grey heist fantasy.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781627792127' }],
    pageCount: 465,
    categories: ['Young Adult', 'Fantasy'],
    averageRating: 4.6,
    ratingsCount: 221000,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9781627792127-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9781627792127-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 599,
  },
  {
    id: 'b13',
    title: 'Babel',
    authors: ['R.F. Kuang'],
    publisher: 'Harper Voyager',
    publishedDate: '2022-08-23',
    description: 'An arcane history of language, empire, and revolution at Oxford University in the 1830s.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780063021426' }],
    pageCount: 544,
    categories: ['Fantasy', 'Historical Fiction'],
    averageRating: 4.3,
    ratingsCount: 67400,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9780063021426-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780063021426-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 699,
  },
  {
    id: 'b14',
    title: 'The Will of the Many',
    authors: ['James Islington'],
    publisher: 'Tor Books',
    publishedDate: '2023-05-23',
    description: 'In an empire built on a hierarchy of stolen strength, one boy hides in plain sight.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9781250885463' }],
    pageCount: 592,
    categories: ['Fantasy', 'Literature & Fiction'],
    averageRating: 4.5,
    ratingsCount: 19300,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1670363463i/58416952.jpg',
smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9781982185879-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 649,
  },
  {
    id: 'b15',
    title: 'Anni Dreams of Biryani',
    authors: ['Namita Moolani Mehra'],
    publisher: 'Penguin Kids',
    publishedDate: '2023-08-01',
    description: "A young girl's imagination transforms a simple pot of biryani into a magical adventure.",
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780143462248' }],
    pageCount: 40,
    categories: ["Children's Books", 'Picture Books'],
    averageRating: 4.9,
    ratingsCount: 870,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1649490508i/59681324.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780143462248-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: "Children's Books",
    subGenre: 'Picture Books',
    price: 399,
    isStaffPick: true,
    rating: 5,
    staffNote: {
      by: 'Meena',
      role: "Children's section lead",
      quote: '"Our most-gifted picture book three months running."',
      body: "Every child who picks this up immediately wants to go home and make biryani. Namita Moolani Mehra captures the magic of everyday rituals in a way that feels completely universal. The illustrations are gorgeous and the story celebrates food, imagination, and South Asian families in the most joyful way.",
    },
  },
  {
    id: 'b16',
    title: "Harry Potter and the Sorcerer's Stone",
    authors: ['J.K. Rowling'],
    publisher: 'Scholastic',
    publishedDate: '1998-09-01',
    description: 'An orphaned boy discovers on his eleventh birthday that he is a wizard, and that a magical school is waiting for him.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780590353427' }],
    pageCount: 309,
    categories: ["Children's Books", 'Fantasy'],
    averageRating: 4.9,
    ratingsCount: 875000,
    imageLinks: {
      thumbnail: "https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1",
smallThumbnail: "https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=5"
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: "Children's Books",
    subGenre: 'Fantasy',
    price: 499,
    isStaffPick: true,
    rating: 5,
    staffNote: {
      by: 'Priya',
      role: 'Front counter',
      quote: '"The book that started it all for most of us."',
      body: "We stock this because we believe every child deserves to read it in a real bookshop, held in their hands. There's something about handing a child their first Harry Potter that never gets old, no matter how many times I've done it.",
    },
  },
  {
    id: 'b17',
    title: 'The Hunger Games',
    authors: ['Suzanne Collins'],
    publisher: 'Scholastic Press',
    publishedDate: '2008-09-14',
    description: "In a dystopian future, a girl volunteers to take her sister's place in a televised fight to the death.",
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780439023481' }],
    pageCount: 374,
    categories: ["Children's Books", 'Young Adult', 'Dystopian'],
    averageRating: 4.5,
    ratingsCount: 430000,
    imageLinks: {
      thumbnail: 'https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: "Children's Books",
    subGenre: 'Young Adult',
    price: 450,
    isStaffPick: true,
    rating: 4,
    staffNote: {
      by: 'Arun',
      role: 'Weekend curator',
      quote: '"Introduced an entire generation to political storytelling."',
      body: "People sometimes forget how subversive this book is. Collins wrote a story about media, power, and systemic violence wrapped in a YA adventure — and it works on every level. I recommend this to teenagers who think they don't like reading. It gets them every time.",
    },
  },
  {
    id: 'b18',
    title: "Grimm's Fairy Tales",
    authors: ['Jacob Grimm', 'Wilhelm Grimm'],
    publisher: 'Various',
    publishedDate: '1812',
    description: 'The classic collection of folk tales, from Cinderella to Hansel and Gretel.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9780394716954' }],
    pageCount: 320,
    categories: ["Children's Books", 'Fairy Tales', 'Folklore'],
    averageRating: 4.3,
    ratingsCount: 28600,
    imageLinks: {
      thumbnail: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1369540060i/22917.jpg',
      smallThumbnail: 'https://covers.openlibrary.org/b/isbn/9780394716954-M.jpg'
    },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: "Children's Books",
    subGenre: 'Fairy Tales',
    price: 350,
    isStaffPick: true,
    rating: 4,
    staffNote: {
      by: 'Lakshmi',
      role: 'Founder',
      quote: '"The original dark fairy tales — not the sanitised ones."',
      body: "The Grimm brothers collected these stories from oral traditions across Germany and they are beautifully strange. The original versions are much darker than the Disney adaptations — and that darkness has purpose. Fairy tales teach children about danger, consequence, and resilience. This collection is essential.",
    },
  },

  // ── Self-Published & Regional ──────────────────────────────────────────
  // These power the "Local Shelf" section on the homepage. `imageLinks`
  // is left blank where no real cover exists yet — the component falls
  // back to an illustrated placeholder.
  {
    id: 'b19',
    title: 'Veyyil Ninaivugal',
    authors: ['K. Saraswathi'],
    publisher: 'Self-published',
    publishedDate: '2023',
    description: 'A quiet, closely observed novel about three generations of women in a Madurai household, told across one long summer.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641012' }],
    pageCount: 212,
    categories: ['Literature & Fiction', 'Tamil Literature'],
    averageRating: 4.6,
    ratingsCount: 38,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'ta',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 320,
    rating: 5,
    isSelfPublished: true,
    printLocation: 'Madurai',
    printNote: 'Printed in Madurai',
  },
  {
    id: 'b20',
    title: 'Nadhiyin Oram',
    authors: ['R. Elangovan'],
    publisher: 'Self-published',
    publishedDate: '2022',
    description: 'A collection of short stories set along the banks of the Kaveri, tracing the small, ordinary dramas of riverside towns.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641029' }],
    pageCount: 168,
    categories: ['Literature & Fiction', 'Short Stories', 'Tamil Literature'],
    averageRating: 4.4,
    ratingsCount: 22,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'ta',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 280,
    rating: 4,
    isSelfPublished: true,
    printLocation: 'Chennai',
    printNote: 'Author signs in-store',
  },
  {
    id: 'b21',
    title: 'Ooru Varalaru',
    authors: ['M. Kavitha'],
    publisher: 'Coimbatore Press',
    publishedDate: '2024',
    description: "A local historian's account of Coimbatore's textile-mill era, built from interviews with the last generation of mill workers.",
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641036' }],
    pageCount: 244,
    categories: ['Non-Fiction', 'History', 'Tamil Literature'],
    averageRating: 4.7,
    ratingsCount: 19,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'ta',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Non-Fiction',
    price: 350,
    rating: 5,
    isSelfPublished: true,
    printLocation: 'Coimbatore',
    printNote: 'Coimbatore Press, 2nd run',
  },
  {
    id: 'b22',
    title: 'Kaalam Kadanda Kadhaigal',
    authors: ['S. Murugan'],
    publisher: 'Chennai Indie Press',
    publishedDate: '2021',
    description: 'Folk tales collected from villages across the Kaveri delta, retold for a modern reader without losing their original texture.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641043' }],
    pageCount: 196,
    categories: ['Literature & Fiction', 'Folklore', 'Tamil Literature'],
    averageRating: 4.5,
    ratingsCount: 31,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'ta',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 300,
    rating: 4,
    isSelfPublished: true,
    printLocation: 'Chennai',
    printNote: 'Chennai indie press',
  },
  {
    id: 'b23',
    title: 'The Quiet Monsoon',
    authors: ['Arjun Mehta'],
    publisher: 'Self-published',
    publishedDate: '2024',
    description: 'A debut novel about a Bengaluru architect who returns to his family home in Kodagu the monsoon after his father dies.',
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641050' }],
    pageCount: 256,
    categories: ['Literature & Fiction'],
    averageRating: 4.3,
    ratingsCount: 27,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Literature & Fiction',
    price: 399,
    rating: 4,
    isSelfPublished: true,
    printLocation: 'Bengaluru',
    printNote: 'Self-published, 2024',
  },
  {
    id: 'b24',
    title: 'Letters from the Ghats',
    authors: ['Priya Nair'],
    publisher: 'Self-published',
    publishedDate: '2023',
    description: "An epistolary memoir written as letters to the author's grandmother, tracing a return to Kerala after a decade abroad.",
    industryIdentifiers: [{ type: 'ISBN_13', identifier: '9789395641067' }],
    pageCount: 180,
    categories: ['Non-Fiction', 'Memoir'],
    averageRating: 4.8,
    ratingsCount: 15,
    imageLinks: { thumbnail: '', smallThumbnail: '' },
    language: 'en',
    previewLink: '',
    infoLink: '',
    maturityRating: 'NOT_MATURE',
    genre: 'Non-Fiction',
    price: 349,
    rating: 5,
    isSelfPublished: true,
    printLocation: 'Kochi',
    printNote: 'Only 40 copies left',
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

// Reconciles whatever is in localStorage with the current seedBooks array,
// so new seed entries (like a fresh batch of Local Shelf titles) show up
// for returning visitors, not just on a first-ever page load. Admin edits
// and deletes to existing ids are preserved; only missing ids get appended.
function syncSeedBooks() {
  const stored = read(BOOKS_KEY, seedBooks)
  const storedIds = new Set(stored.map((b) => b.id))
  const missing = seedBooks.filter((b) => !storedIds.has(b.id))
  if (missing.length === 0) return stored
  return write(BOOKS_KEY, [...stored, ...missing])
}

function mergeSeedData(books) {
  return books.map((b) => {
    const seed = seedBooks.find((s) => s.id === b.id)
    if (seed) {
      const merged = { ...b }
      Object.keys(seed).forEach((key) => {
        if (merged[key] === undefined) {
          merged[key] = seed[key]
        } else if (key === 'imageLinks' && (!merged.imageLinks?.thumbnail || merged.imageLinks.thumbnail === '')) {
          merged.imageLinks = seed.imageLinks
        }
      })
      return merged
    }
    return b
  })
}

export async function getBooks() {
  const books = syncSeedBooks()
  return mergeSeedData(books)
}

export async function getBookById(id) {
  const books = mergeSeedData(syncSeedBooks())
  return books.find((b) => String(b.id) === String(id)) ?? null
}

export async function getBooksByGenre(genre) {
  const books = mergeSeedData(syncSeedBooks())
  return books.filter((b) => (b.genre ?? '').toLowerCase() === genre.toLowerCase())
}

export async function getBooksBySubGenre(subGenre) {
  const books = mergeSeedData(syncSeedBooks())
  return books.filter((b) => (b.subGenre ?? '').toLowerCase() === subGenre.toLowerCase())
}

export async function getStaffPicks(genre) {
  const books = mergeSeedData(syncSeedBooks())
  const picks = books.filter((b) => b.isStaffPick)
  if (!genre) return picks
  return picks.filter((b) => (b.genre ?? '').toLowerCase() === genre.toLowerCase())
}

// Powers the "Local Shelf" section — self-published and regional-press titles.
export async function getLocalShelfBooks() {
  const books = mergeSeedData(syncSeedBooks())
  return books.filter((b) => b.isSelfPublished)
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