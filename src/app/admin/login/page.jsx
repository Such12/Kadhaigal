import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Loader2, AlertCircle, LogIn } from 'lucide-react'
import { signInAdmin } from '../../../lib/adminAuth.js'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/admin'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInAdmin(email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Could not sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center mb-8">
          <span className="font-display font-bold text-lg text-brand-navy">kadhaigal</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-card p-8">
          <h1 className="font-display font-bold text-xl text-brand-navy mb-1">Admin Sign In</h1>
          <p className="text-sm text-brand-navy/50 mb-6">
            Staff access only.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-brick/30"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-brand-navy/15 bg-white text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-brick/30"
              />
            </div>

            {error && (
              <p className="flex items-start gap-1.5 text-sm text-red-600">
                <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-brick text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#9c380c] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}