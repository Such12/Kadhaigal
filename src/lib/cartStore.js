import { supabase } from './supabase.js'

function rowToCartItem(row) {
  const book = row.books
  return {
    cartItemId: row.id,
    bookId: row.book_id,
    quantity: row.quantity,
    title: book?.title ?? '',
    author: (book?.authors && book.authors[0]) ?? '',
    price: book?.price ?? 0,
    thumbnail: book?.image_thumbnail ?? '',
    availableQuantity: book?.quantity ?? 0,
  }
}

export async function getCart() {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, books(title, authors, price, image_thumbnail, quantity)')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data.map(rowToCartItem)
}

export async function addToCart(bookId, quantity = 1) {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user?.id
  if (!userId) throw new Error('You need to be signed in to add items to your cart.')

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, book_id: bookId, quantity })
    if (error) throw error
  }
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq('id', cartItemId)
  if (error) throw error
}

export async function removeFromCart(cartItemId) {
  const { error } = await supabase.from('cart_items').delete().eq('id', cartItemId)
  if (error) throw error
}

export async function clearCart() {
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData.session?.user?.id
  if (!userId) return
  const { error } = await supabase.from('cart_items').delete().eq('user_id', userId)
  if (error) throw error
}