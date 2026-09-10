import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpenText,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Package,
  Phone,
  Save,
  User as UserIcon,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useCustomerAuth } from '../../../context/CustomerAuthContext.jsx'
import { supabase } from '../../../lib/supabase.js'

const orderSamples = [
  { id: '#1024', date: '12 Aug 2026', total: '₹1,480', status: 'Shipped' },
  { id: '#1017', date: '02 Aug 2026', total: '₹960', status: 'Delivered' },
  { id: '#1005', date: '18 Jul 2026', total: '₹2,160', status: 'Delivered' },
]

export default function AccountPage() {
  const { user, signOut } = useCustomerAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    currentPassword: '',
    newPassword: '',
  })

  useEffect(() => {
    if (!user) {
      navigate('/account/login', { replace: true })
      return
    }

    setProfile((prev) => ({
      ...prev,
      fullName: user.user_metadata?.full_name || prev.fullName || '',
      email: user.email || prev.email || '',
      phone: user.user_metadata?.phone || prev.phone || '',
    }))
  }, [user, navigate])

  const initials = useMemo(() => {
    const name = profile.fullName || user?.user_metadata?.full_name || 'Reader'
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [profile.fullName, user])

  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently'

  if (!user) return null

  function updateField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setStatus({ type: '', message: '' })

    try {
      const promises = []

      if (profile.fullName && profile.fullName !== (user.user_metadata?.full_name || '')) {
        promises.push(
          supabase.auth.updateUser({
            data: { full_name: profile.fullName },
          })
        )
      }

      if (profile.phone && profile.phone !== (user.user_metadata?.phone || '')) {
        promises.push(
          supabase.auth.updateUser({
            data: { phone: profile.phone },
          })
        )
      }

      if (profile.email && profile.email !== (user.email || '')) {
        promises.push(
          supabase.auth.updateUser({
            email: profile.email,
          })
        )
      }

      if (profile.newPassword) {
        promises.push(
          supabase.auth.updateUser({
            password: profile.newPassword,
          })
        )
      }

      if (promises.length === 0) {
        setStatus({ type: 'info', message: 'No changes to save yet.' })
        setSaving(false)
        return
      }

      await Promise.all(promises)
      setProfile((prev) => ({ ...prev, currentPassword: '', newPassword: '' }))
      setIsEditing(false)
      setStatus({
        type: 'success',
        message: 'Your profile details have been updated.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong while updating your profile.',
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-brand-cream px-4 py-8 sm:px-6 lg:px-8">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-xl font-bold text-white shadow-sm">
                {initials || <UserIcon size={24} />}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-navy/55">My account</p>
                <h1 className="mt-1 text-3xl text-brand-navy">Profile</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/15 bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </header>

          <div className="rounded-[32px] border border-brand-navy/10 bg-white p-4 shadow-card sm:p-6">
            <div className="mb-6 flex flex-wrap gap-2 rounded-full bg-brand-cream p-1">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'profile'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-brand-navy/70 hover:text-brand-navy'
                }`}
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'orders'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'text-brand-navy/70 hover:text-brand-navy'
                }`}
              >
                Orders
              </button>
            </div>

            {activeTab === 'profile' ? (
              isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy/45">Member since</p>
                      <p className="mt-1 text-lg font-semibold text-brand-navy">{joined}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center justify-center rounded-full border border-brand-navy/15 bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-brand-navy">Full name</span>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className="w-full rounded-2xl border border-brand-navy/15 bg-brand-cream/50 px-4 py-3 text-brand-navy outline-none transition focus:border-brand-brick focus:bg-white"
                        placeholder="Your full name"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-brand-navy">Phone number</span>
                      <div className="relative">
                        <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/45" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full rounded-2xl border border-brand-navy/15 bg-brand-cream/50 pl-11 pr-4 py-3 text-brand-navy outline-none transition focus:border-brand-brick focus:bg-white"
                          placeholder="Add your phone"
                        />
                      </div>
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-brand-navy">Email address</span>
                      <div className="relative">
                        <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/45" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full rounded-2xl border border-brand-navy/15 bg-brand-cream/50 pl-11 pr-4 py-3 text-brand-navy outline-none transition focus:border-brand-brick focus:bg-white"
                          placeholder="you@example.com"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="rounded-[28px] border border-brand-navy/10 bg-brand-cream p-4 sm:p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <Lock size={16} className="text-brand-brick" />
                      <h2 className="text-lg font-bold text-brand-navy">Change password</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-brand-navy">Current password</span>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={profile.currentPassword}
                            onChange={(e) => updateField('currentPassword', e.target.value)}
                            className="w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 pr-11 text-brand-navy outline-none transition focus:border-brand-brick"
                            placeholder="Current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-navy/60"
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-brand-navy">New password</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={profile.newPassword}
                          onChange={(e) => updateField('newPassword', e.target.value)}
                          className="w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy outline-none transition focus:border-brand-brick"
                          placeholder="Enter new password"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    {status.message ? (
                      <p
                        className={`text-sm ${
                          status.type === 'error' ? 'text-red-600' : status.type === 'success' ? 'text-green-700' : 'text-brand-navy/70'
                        }`}
                      >
                        {status.message}
                      </p>
                    ) : (
                      <span className="text-sm text-brand-navy/50">Your details are safe and private.</span>
                    )}

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2143] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Save size={16} />
                      {saving ? 'Saving...' : 'Save changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy/45">Member since</p>
                      <p className="mt-1 text-lg font-semibold text-brand-navy">{joined}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center justify-center rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f2143]"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-brand-navy/10 bg-brand-cream/60 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/45">Full name</p>
                      <p className="mt-2 text-lg font-semibold text-brand-navy">{profile.fullName || 'Not provided'}</p>
                    </div>

                    <div className="rounded-[24px] border border-brand-navy/10 bg-brand-cream/60 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/45">Phone</p>
                      <p className="mt-2 text-lg font-semibold text-brand-navy">{profile.phone || 'Not added'}</p>
                    </div>

                    <div className="rounded-[24px] border border-brand-navy/10 bg-brand-cream/60 p-4 md:col-span-2">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/45">Email</p>
                      <p className="mt-2 break-all text-lg font-semibold text-brand-navy">{profile.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy/45">Recent orders</p>
                    <h2 className="mt-1 text-2xl text-brand-navy">Your orders</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-3 py-1.5 text-sm font-semibold text-brand-navy">
                    <Package size={15} />
                    {orderSamples.length} items
                  </div>
                </div>

                <div className="space-y-3">
                  {orderSamples.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-3 rounded-[24px] border border-brand-navy/10 bg-brand-cream/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-navy/45">Order {order.id}</p>
                        <p className="mt-2 text-sm text-brand-navy/70">Placed on {order.date}</p>
                      </div>

                      <div className="flex items-center gap-3 sm:justify-end">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy/65">
                          {order.status}
                        </span>
                        <span className="text-base font-bold text-brand-navy">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/bookstore"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-brick transition hover:text-[#9c380c]"
                >
                  Continue shopping
                  <BookOpenText size={15} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
