import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShoppingBag, Check, Loader2 } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useCustomerAuth } from '../../context/CustomerAuthContext.jsx'

export default function AddToCartButton({ book, className = '' }) {
  const { user } = useCustomerAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const outOfStock = (book.quantity ?? 0) <= 0

  async function handleClick() {
    if (!user) {
      navigate('/account/login', { state: { from: location } })
      return
    }
    setLoading(true)
    try {
      await addItem(book.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={outOfStock || loading}
      className={`inline-flex items-center justify-center gap-2 bg-brand-brick text-white font-semibold px-6 py-3 rounded-full hover:bg-[#9c380c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {outOfStock ? (
        'Out of Stock'
      ) : loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : added ? (
        <><Check size={16} /> Added</>
      ) : (
        <><ShoppingBag size={16} /> Add to Cart</>
      )}
    </button>
  )
}