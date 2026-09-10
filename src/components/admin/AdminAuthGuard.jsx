import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase.js'
import { checkIsAdmin } from '../../lib/adminAuth.js'

export default function AdminAuthGuard({ children }) {
  const location = useLocation()
  const [status, setStatus] = useState('checking') // 'checking' | 'authorized' | 'unauthorized'

  useEffect(() => {
    let active = true

    async function verify() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        if (active) setStatus('unauthorized')
        return
      }
      const isAdmin = await checkIsAdmin()
      if (active) setStatus(isAdmin ? 'authorized' : 'unauthorized')
    }

    verify()

    // Re-check if the session changes in another tab, expires, or the
    // user signs out — keeps the guard honest beyond just first load.
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      verify()
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <Loader2 size={22} className="animate-spin text-brand-navy/40" />
      </div>
    )
  }

  if (status === 'unauthorized') {
    // Remember where they were headed so login can send them back.
    return <Navigate to="/account/login" state={{ from: location }} replace />
  }

  return children
}