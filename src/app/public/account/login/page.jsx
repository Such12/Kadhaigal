import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Loader2, AlertCircle, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useCustomerAuth } from '../../../../context/CustomerAuthContext.jsx'
import { signInAdmin, checkIsAdmin } from '../../../../lib/adminAuth.js'
import ChintuPintu from '../../../../assets/images/chintu w pintu.svg'
import PintuBooks from '../../../../assets/images/pintu sitting on books.svg'
import Star1 from '../../../../assets/images/star_1.svg'
import Star2 from '../../../../assets/images/star_2.svg'
import Star3 from '../../../../assets/images/star_3.svg'

export default function CustomerLoginPage() {
  const { user, signIn, signUp } = useCustomerAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (user) {
      const nextPath = redirectTo === '/admin' ? '/' : redirectTo
      navigate(nextPath, { replace: true })
    }
  }, [user, redirectTo, navigate])

  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        // Sign-up is always customer-only
        await signUp(form.email.trim(), form.password, form.name.trim())
        navigate(redirectTo, { replace: true })
        return
      }

      // Sign-in: first try as admin
      try {
        await signInAdmin(form.email.trim(), form.password)
        // If we reach here, admin login succeeded
        const adminTarget = location.state?.from?.pathname?.startsWith('/admin')
          ? location.state.from.pathname
          : '/admin'
        navigate(adminTarget, { replace: true })
        return
      } catch {
        // Not an admin — fall through to customer login
      }

      // Customer sign-in
      await signIn(form.email.trim(), form.password)
      navigate(redirectTo !== '/admin' ? redirectTo : '/', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  return (
    <div className="min-h-screen flex bg-brand-cream overflow-hidden">

      {/* ── LEFT PANEL — Illustration & Branding ── */}
      <div className="hidden lg:flex flex-col items-center justify-center relative w-[48%] bg-[#1a2640] overflow-hidden px-12">
        {/* Background subtle pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #c43d26 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #8b9e7a 0%, transparent 50%)`,
          }}
        />

        {/* Floating stars */}
        <img src={Star1} alt="" className="absolute top-16 left-10 w-8 opacity-70 animate-pulse" />
        <img src={Star2} alt="" className="absolute top-28 right-16 w-6 opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <img src={Star3} alt="" className="absolute bottom-32 left-16 w-7 opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
        <img src={Star1} alt="" className="absolute bottom-20 right-12 w-5 opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <img src={Star2} alt="" className="absolute top-1/2 left-6 w-5 opacity-40 animate-pulse" style={{ animationDelay: '0.8s' }} />

        {/* Logo */}
        <Link to="/" className="absolute top-8 left-10">
          <img src="/logo.svg" alt="Kadhaigal" className="h-9 w-auto brightness-0 invert opacity-80" />
        </Link>

        {/* Main illustration */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={ChintuPintu}
              alt="Chintu and Pintoo"
              className="w-64 xl:w-72 drop-shadow-xl"
              style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }}
            />
            {/* Pintu sitting on books - accent */}
            {/* <img
              src={PintuBooks}
              alt="Pintoo with books"
              className="absolute -bottom-8 -right-10 w-28 opacity-60"
              style={{ filter: 'brightness(0) invert(1)' }}
            /> */}
          </div>

          <div className="mt-14 space-y-3">
            <h2 className="font-display font-extrabold text-3xl xl:text-4xl text-white leading-tight">
              Your reading<br />sanctuary awaits.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Discover curated shelves, handpicked by Chintu &amp; Pintoo, just for you.
            </p>
          </div>


        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-10 py-12">

        {/* Mobile logo */}
        <Link to="/" className="lg:hidden mb-10">
          <img src="/logo.svg" alt="Kadhaigal" className="h-10 w-auto" />
        </Link>

        <div className="w-full max-w-[400px]">
          {/* Welcome text */}
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-3xl text-brand-navy leading-tight">
              {mode === 'signup' ? 'Join the shelf.' : 'Welcome back.'}
            </h1>
            <p className="text-brand-navy/50 text-sm mt-1.5">
              {mode === 'signup'
                ? 'Create your reader account to start exploring.'
                : 'Sign in to your account to continue reading.'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-xl border border-brand-navy/10 bg-brand-navy/5 p-1 mb-7 text-sm font-semibold gap-1">
            <button
              type="button"
              id="tab-signin"
              onClick={() => { setMode('signin'); setError('') }}
              className={`flex-1 py-2.5 rounded-lg transition-all duration-200 ${mode === 'signin'
                ? 'bg-white text-brand-navy shadow-sm'
                : 'text-brand-navy/50 hover:text-brand-navy'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="tab-signup"
              onClick={() => { setMode('signup'); setError('') }}
              className={`flex-1 py-2.5 rounded-lg transition-all duration-200 ${mode === 'signup'
                ? 'bg-white text-brand-navy shadow-sm'
                : 'text-brand-navy/50 hover:text-brand-navy'
                }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name — signup only */}
            {mode === 'signup' && (
              <div className="relative">
                <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/30 pointer-events-none" />
                  <input
                    id="field-name"
                    type="text"
                    placeholder="Chintu Pintoo"
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-brick/30 focus:border-brand-brick/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/30 pointer-events-none" />
                <input
                  id="field-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-brick/30 focus:border-brand-brick/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-brand-navy/60 mb-1.5 block uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/30 pointer-events-none" />
                <input
                  id="field-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  value={form.password}
                  onChange={handleChange('password')}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-navy/25 focus:outline-none focus:ring-2 focus:ring-brand-brick/30 focus:border-brand-brick/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-navy/30 hover:text-brand-navy transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3.5 py-3">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              id="btn-submit"
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-brick text-white font-semibold px-5 py-3.5 rounded-xl hover:bg-[#9c380c] transition-all hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 mt-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {mode === 'signup' ? 'Create My Account' : 'Sign In'}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 flex flex-col items-center gap-3 text-xs text-brand-navy/40">
            <Link to="/" className="hover:text-brand-navy transition-colors">
              ← Back to shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}