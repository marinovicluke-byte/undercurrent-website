export default function IGlyph({ kind }) {
  const s = 22
  const stroke = 'var(--off-white)'
  const accent = 'var(--blue)'
  const sw = 1.6
  const common = { width: s, height: s, viewBox: '0 0 22 22', fill: 'none' }

  switch (kind) {
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="17" height="17" rx="5" stroke={stroke} strokeWidth={sw} />
          <circle cx="11" cy="11" r="4" stroke={stroke} strokeWidth={sw} />
          <circle cx="16" cy="6" r="1" fill={accent} />
        </svg>
      )
    case 'gmail':
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="17" height="13" rx="1.5" stroke={stroke} strokeWidth={sw} />
          <path d="M3 5.5l8 6 8-6" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      )
    case 'slack':
      return (
        <svg {...common}>
          <rect x="4" y="8.5" width="14" height="2.5" rx="1.25" stroke={stroke} strokeWidth={sw} />
          <rect x="4" y="12.5" width="14" height="2.5" rx="1.25" stroke={stroke} strokeWidth={sw} />
          <rect x="8.5" y="4" width="2.5" height="14" rx="1.25" stroke={stroke} strokeWidth={sw} />
          <rect x="12.5" y="4" width="2.5" height="14" rx="1.25" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="17" height="17" rx="2" stroke={stroke} strokeWidth={sw} />
          <rect x="6" y="9" width="1.8" height="6" fill={stroke} />
          <circle cx="6.9" cy="7" r="1" fill={stroke} />
          <path
            d="M10 15v-6M10 11c0-1.1.9-2 2-2s2 .9 2 2v4M14 11c0-1.1.9-2 2-2s2 .9 2 2v4"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...common}>
          <path
            d="M4 18l1.4-3.6a7 7 0 1 1 2.6 2.4L4 18z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path
            d="M9 9.5c.3 1.8 1.7 3.2 3.5 3.5l.8-1 1.7.8c.1 1-.7 1.7-1.7 1.6-2.6-.2-4.6-2.2-4.8-4.8-.1-1 .6-1.8 1.6-1.7l.8 1.7-1 .9z"
            fill={stroke}
          />
        </svg>
      )
    case 'chatgpt':
      return (
        <svg {...common}>
          <path
            d="M11 2.5a4 4 0 0 0-3.6 2.3A4 4 0 0 0 4.7 9.8 4 4 0 0 0 4.7 15a4 4 0 0 0 2.7 4.9 4 4 0 0 0 7.2 0 4 4 0 0 0 2.7-4.9 4 4 0 0 0 0-5.2 4 4 0 0 0-2.7-4.9A4 4 0 0 0 11 2.5z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path
            d="M11 8.5v5M8.5 10l2.5-1.5 2.5 1.5M8.5 12l2.5 1.5 2.5-1.5"
            stroke={accent}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'claude':
      return (
        <svg {...common}>
          <path
            d="M6 5l3 12M9 5l3 12M12 5l3 12"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <circle cx="17" cy="11" r="1.2" fill={accent} />
        </svg>
      )
    case 'n8n':
      return (
        <svg {...common}>
          <circle cx="5" cy="11" r="2" stroke={stroke} strokeWidth={sw} />
          <circle cx="11" cy="11" r="2" stroke={stroke} strokeWidth={sw} />
          <circle cx="17" cy="11" r="2" stroke={stroke} strokeWidth={sw} />
          <circle cx="11" cy="5" r="1.5" stroke={stroke} strokeWidth={sw} />
          <circle cx="11" cy="17" r="1.5" stroke={stroke} strokeWidth={sw} />
          <path
            d="M7 11h2M13 11h2M11 7v2M11 13v2"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'notion':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
          <path
            d="M7 7v8M7 7l7 8M14 7v8"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'stripe':
      return (
        <svg {...common}>
          <path
            d="M8 8c0-1 1-1.5 2.5-1.5S14 7 15 8M14 14c0 1-1 1.5-2.5 1.5S8 15 7 14M11 6v11"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'hubspot':
      return (
        <svg {...common}>
          <circle cx="13" cy="13" r="3.5" stroke={stroke} strokeWidth={sw} />
          <path
            d="M13 9.5V6M13 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10.5 10.5L7 7M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      )
    case 'zapier':
      return (
        <svg {...common}>
          <path
            d="M11 3v16M3 11h16M5 5l12 12M17 5L5 17"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <circle cx="11" cy="11" r="2.5" fill={accent} />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="16" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
  }
}
