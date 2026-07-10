export default function Mascot({ variant = 'chintu', flip = false, className = '' }) {
  const isPintoo = variant === 'pintoo'

  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body */}
      <path
        d="M60 60c0-20 18-34 40-34s40 14 40 34v70c0 22-18 38-40 38s-40-16-40-38V60z"
        fill="#F5F5DC"
        stroke="#142950"
        strokeWidth="4"
      />

      {/* arms */}
      <path
        d="M60 100c-16 4-28 16-32 32"
        stroke="#142950"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M140 100c16 4 26 18 28 34"
        stroke="#142950"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* legs */}
      <path d="M82 166v28" stroke="#142950" strokeWidth="4" strokeLinecap="round" />
      <path d="M118 166v28" stroke="#142950" strokeWidth="4" strokeLinecap="round" />

      {isPintoo ? (
        <>
          {/* glasses over the eyes */}
          <circle cx="82" cy="76" r="12" fill="none" stroke="#B7410E" strokeWidth="4" />
          <circle cx="118" cy="76" r="12" fill="none" stroke="#B7410E" strokeWidth="4" />
          <path d="M94 76h6" stroke="#B7410E" strokeWidth="4" />
          <path d="M70 72l-10-4" stroke="#B7410E" strokeWidth="4" strokeLinecap="round" />
          <path d="M130 72l10-4" stroke="#B7410E" strokeWidth="4" strokeLinecap="round" />
          <circle cx="82" cy="76" r="3" fill="#142950" />
          <circle cx="118" cy="76" r="3" fill="#142950" />
          <path d="M92 96q8 6 16 0" stroke="#142950" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* sleepy sunglasses-on-forehead look */}
          <circle cx="82" cy="62" r="10" fill="none" stroke="#B7410E" strokeWidth="4" />
          <circle cx="118" cy="62" r="10" fill="none" stroke="#B7410E" strokeWidth="4" />
          <path d="M92 62h6" stroke="#B7410E" strokeWidth="4" />
          <path d="M76 88q6 5 12 0" stroke="#142950" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M112 88q6 5 12 0" stroke="#142950" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M94 100q6 5 12 0" stroke="#142950" strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
