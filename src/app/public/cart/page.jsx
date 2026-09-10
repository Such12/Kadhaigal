import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '../../../context/CartContext.jsx'
import { useCustomerAuth } from '../../../context/CustomerAuthContext.jsx'

export default function CartPage() {
  const { items, loading, updateQuantity, removeItem, subtotal } = useCart()
  const { user } = useCustomerAuth()

  if (!user) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-brand-navy/60">Sign in to see your cart.</p>
        <Link to="/account/login" className="text-brand-brick underline mt-4 inline-block">
          Sign In
        </Link>
      </div>
    )
  }

  if (loading) {
    return <div className="container-page py-16 text-brand-navy/50">Loading your cart…</div>
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-brand-navy/60">Your cart is empty.</p>
        <Link to="/bookstore" className="text-brand-brick underline mt-4 inline-block">
          Browse the Stacks
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-16 max-w-2xl">
      <h1 className="font-display font-extrabold text-3xl text-brand-navy mb-8">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-4 border-b border-brand-navy/10 pb-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-navy truncate">{item.title}</p>
              <p className="text-sm text-brand-navy/50">{item.author}</p>
              {item.quantity > item.availableQuantity && (
                <p className="text-xs text-red-600 mt-1">
                  Only {item.availableQuantity} left in stock.
                </p>
              )}
            </div>
            <input
              type="number"
              min="1"
              max={item.availableQuantity}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.cartItemId, Number(e.target.value))}
              className="w-16 text-center border border-brand-navy/15 rounded-lg py-1.5"
            />
            <p className="w-20 text-right font-semibold text-brand-navy">
              ₹{item.price * item.quantity}
            </p>
            <button onClick={() => removeItem(item.cartItemId)} className="text-brand-navy/40 hover:text-brand-brick">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 text-lg font-display font-bold text-brand-navy">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
    </div>
  )
}