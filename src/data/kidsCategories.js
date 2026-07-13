// Sub-categories used only within the Children's Books page. These are
// matched against a book's `subGenre` field (not the top-level `genre`
// field), so a book can be genre: "Children's Books" AND
// subGenre: "Fantasy" at the same time.
export const kidsCategories = [
  {
    name: 'Picture Books',
    slug: 'picture-books',
    tags: ['Ages 3-6', 'Read Aloud', 'Illustrated'],
    description: 'Big pictures, small words, and stories made for cuddling up with.',
    isSubGenre: true,
  },
  {
    name: 'Fantasy',
    slug: 'kids-fantasy',
    tags: ['Magic & Wonder', 'Series Starters', 'Ages 8-12'],
    description: 'Wands, worlds, and wonder — fantasy adventures for young imaginations.',
    isSubGenre: true,
  },
  {
    name: 'Young Adult',
    slug: 'young-adult',
    tags: ['Ages 12+', 'Coming of Age', 'Series'],
    description: 'Bigger feelings, bigger stakes — stories for readers growing into themselves.',
    isSubGenre: true,
  },
  {
    name: 'Fairy Tales',
    slug: 'fairy-tales',
    tags: ['Classic Retellings', 'Bedtime Stories', 'Folklore'],
    description: 'The stories that started it all, retold for the readers of today.',
    isSubGenre: true,
  },
]