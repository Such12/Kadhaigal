export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-full px-5 py-3 text-sm text-brand-navy bg-white placeholder:text-brand-navy/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-sage ${className}`}
      {...props}
    />
  )
}
