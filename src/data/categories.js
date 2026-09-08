// Full list — used by admin when adding/editing books
export const allCategories = [
  {
    name: 'Non-Fiction',
    slug: 'non-fiction',
    tags: ['Memoir', 'Contemporary issuses', 'Understanding the world', 'Indian History', 'Indian Politics', 'Economics', 'Personal Finance', 'Leadership', 'Growth', 'Buisness memoirs', 'AI'],
    description: 'Ideas worth sitting with — ways of thinking, living, and seeing the world differently.',
  },
  {
    name: 'Fiction and Literature',
    slug: 'fiction-and-literature',
    tags: ['Indian fiction', 'Historical Fiction', 'Queer Fiction', 'Translated Fiction', 'Modern Classics', 'Greek Mythology'],
    description: 'Where narrative depth meets human truth. Explore stories that linger long after the final page is turned.',
  },
  {
    name: 'Sci-Fi',
    slug: 'sci-fi',
    tags: ['Hard Sci-fi', 'Dystopian', 'Cyberpunk'],
    description: 'Worlds beyond our own — distant galaxies, and futures both feared and hoped for.',
  },
  {
    name: 'Mysteries and Thrillers',
    slug: 'mysteries-and-thrillers',
    tags: ['Pyschological thrillers', 'Cozy mysteries', 'Crime and Detective Fiction', 'Spy Thrillers'],
    description: 'Twists you won\'t see coming, and puzzles worth staying up for.',
  },
  {
    name: 'Romance',
    slug: 'romance',
    tags: ['Contemporary romance', 'Dark romance', 'Historical romance', 'Enemies to lovers'],
    description: 'Love in all its forms — swoon-worthy, slow-burn, and everything in between.',
  },
  {
    name: 'Fantasy',
    slug: 'fantasy',
    tags: ['Romantasy', 'High/Epic Fantasy', 'Dark Fantasy', 'Urban Fantasy'],
    description: 'Magic systems, mythical creatures, and epic adventures beyond imagination.',
  },
  {
    name: 'Science, Nature & Pyschology',
    slug: 'science-nature-pyschology',
    tags: ['Science', 'Nature', 'Pyschology', 'Cimate change', 'Adventure'],
    description: 'Understanding the natural world, the cosmos, and the depths of the human mind.',
  },
  {
    name: 'Art & Lifestyle',
    slug: 'art-lifestyle',
    tags: ['Art', 'Design', 'Food', 'Adult Colouring', 'Lifestyle'],
    description: 'Creative expression, aesthetics, and the art of living beautifully.',
  },
  {
    name: "Children's Books",
    slug: 'childrens-books',
    tags: ['Ages 0 - 2', 'Ages 3 - 5', 'Ages 6 - 8', 'Ages 9 - 12', 'Young Adult'],
    description: 'Stories that spark imagination and grow with young readers.',
  },
]

// Public-facing list — Children's Books excluded (it has its own dedicated page)
export const categories = allCategories.filter(
  (c) => c.slug !== 'childrens-books'
)
