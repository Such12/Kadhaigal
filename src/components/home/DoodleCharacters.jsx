export function DoodleArrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 140 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14c18-6 44-4 48 14 3 13-10 20-22 15-9-4-9-15 1-17 14-3 34 5 48 20 8 8 13 18 12 30"
        stroke="#B7410E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 62l17 14-2-19"
        stroke="#B7410E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DoodleCharacters({ className = '' }) {
  return (
    <svg
      viewBox="0 0 220 170"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* left blob character */}
      <path
        d="M40 60c-16 0-28 14-28 32 0 16 10 28 24 32-3 8-3 8-3 8s14 3 22-3c4 3 10 4 15 2 14-5 20-19 18-33-2-18-16-38-48-38z"
        stroke="#B7410E"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="34" cy="86" r="2.4" fill="#B7410E" />
      <circle cx="54" cy="86" r="2.4" fill="#B7410E" />
      <path d="M32 96q6 6 12 0" stroke="#B7410E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 66q4-6 10-4" stroke="#B7410E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M66 66q-4-6-10-4" stroke="#B7410E" strokeWidth="2.5" strokeLinecap="round" />

      {/* right slim character */}
      <path
        d="M132 50c-4 10-6 22-3 34 2 8 8 14 8 14s-6 10-4 18c10 4 22 0 27-9 6-11 5-27-2-42-5-11-16-19-26-15z"
        stroke="#B7410E"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="140" cy="66" r="2" fill="#B7410E" />
      <circle cx="154" cy="66" r="2" fill="#B7410E" />
      <path d="M138 74q6 5 12 0" stroke="#B7410E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M124 44l6 8M164 44l-6 8M144 40l0 9" stroke="#B7410E" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
