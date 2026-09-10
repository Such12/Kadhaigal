import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { useCustomerAuth } from '../../../../context/CustomerAuthContext.jsx'

export default function CustomerLoginPage() {
  const { signIn, signUp } = useCustomerAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        await signUp(form.email.trim(), form.password, form.name.trim())
      } else {
        await signIn(form.email.trim(), form.password)
      }
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-16 max-w-sm mx-auto">
      <div className="flex rounded-lg border border-brand-navy/15 p-1 mb-8 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`flex-1 py-2 rounded-md ${mode === 'signin' ? 'bg-brand-navy text-white' : 'text-brand-navy/50'}`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 rounded-md ${mode === 'signup' ? 'bg-brand-navy text-white' : 'text-brand-navy/50'}`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <input
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-brand-navy/15"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-brand-navy/15"
        />
        <input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg border border-brand-navy/15"
        />

        {error && (
          <p className="flex items-start gap-1.5 text-sm text-red-600">
            <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-brick text-white font-semibold px-5 py-3 rounded-lg disabled:opacity-50"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-brand-navy/40 mt-6">
        <Link to="/" className="underline">Back to shopping</Link>
      </p>
    </div>
  )
}