import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart as clearCartRemote,
} from '../lib/cartStore.js'
import { useCustomerAuth } from './CustomerAuthContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useCustomerAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([])
      setLoading(false)
      return
    }
    setLoading(true)
    const data = await getCart()
    setItems(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function addItem(bookId, quantity = 1) {
    await addToCart(bookId, quantity)
    await refresh()
  }

  async function updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
      await removeFromCart(cartItemId)
    } else {
      await updateCartItemQuantity(cartItemId, quantity)
    }
    await refresh()
  }

  async function removeItem(cartItemId) {
    await removeFromCart(cartItemId)
    await refresh()
  }

  async function clearCart() {
    await clearCartRemote()
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, loading, addItem, updateQuantity, removeItem, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}