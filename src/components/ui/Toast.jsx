import { useState, useCallback, useEffect, useRef } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

/* ─── Hook ─────────────────────────────────────────────────── */

let _push = null // module-level setter so callers don't need context

export function useToast() {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  // register so toast() helper works from outside React tree
  useEffect(() => {
    _push = push
    return () => { _push = null }
  }, [push])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, push, dismiss }
}

/** Call this from anywhere after <ToastContainer /> is mounted */
export function toast(message, type = 'success') {
  if (_push) _push(message, type)
}

/* ─── Container ────────────────────────────────────────────── */

export function ToastContainer({ toasts, dismiss }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} dismiss={dismiss} />
      ))}
    </div>
  )
}

function ToastItem({ toast: t, dismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // mount → slide in
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const isSuccess = t.type === 'success'

  return (
    <div
      className="pointer-events-auto flex items-center gap-3 min-w-[260px] max-w-[360px]
        bg-white border border-brand-navy/10 shadow-lg rounded-xl px-4 py-3
        transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
      ) : (
        <XCircle size={18} className="text-red-500 shrink-0" />
      )}
      <p className="text-sm text-brand-navy font-medium flex-1">{t.message}</p>
      <button
        onClick={() => dismiss(t.id)}
        className="p-0.5 rounded hover:bg-brand-navy/5 text-brand-navy/40 shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  )
}
