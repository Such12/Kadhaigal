import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon } from 'lucide-react'
import { useCustomerAuth } from '../../../context/CustomerAuthContext.jsx'

export default function AccountPage() {
  const { user, signOut } = useCustomerAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/account/login', { replace: true })
    return null
  }

  const fullName = user.user_metadata?.full_name || ''
  const email = user.email || ''
  const joined = new Date(user.created_at).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="container-page py-16 max-w-md mx-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-brand-navy/10 flex items-center justify-center mb-4">
          <UserIcon size={36} className="text-brand-navy/40" />
        </div>
        <h1 className="font-display font-bold text-2xl text-brand-navy">
          {fullName || 'Reader'}
        </h1>
        <p className="text-sm text-brand-navy/50 mt-1">{email}</p>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl border border-brand-navy/10 p-6 space-y-4 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40 mb-1">Full Name</p>
          <p className="font-body text-brand-navy">{fullName || '—'}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40 mb-1">Email</p>
          <p className="font-body text-brand-navy">{email}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/40 mb-1">Member Since</p>
          <p className="font-body text-brand-navy">{joined}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 space-y-3">
        <Link
          to="/cart"
          className="block w-full text-center font-semibold px-5 py-3 rounded-lg border border-brand-navy/15 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
        >
          View Cart
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-lg bg-brand-brick text-white hover:bg-[#9c380c] transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  )
}
