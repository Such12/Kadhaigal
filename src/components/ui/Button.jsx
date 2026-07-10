export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 px-6 py-3 text-sm sm:text-base'

  const variants = {
    primary:
      'bg-brand-brick text-white hover:bg-[#9c380c] shadow-card hover:-translate-y-0.5',
    outline:
      'bg-transparent text-brand-navy underline underline-offset-4 decoration-brand-navy/40 hover:decoration-brand-brick hover:text-brand-brick px-2 py-3',
    dark: 'bg-brand-navy text-white hover:bg-[#0d1d3c]',
    light: 'bg-white text-brand-navy hover:bg-brand-cream',
  }

  const Comp = as
  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  )
}
