/* Paper-craft kit: torn edges, washi tape, taped photos with clearly
   marked placeholder imagery, stickers, scribble underlines, ticker. */
import './paper.css'

/* Irregular torn-paper edge. Place directly above a section and pass the
   section's background colour — it reads as that section's torn top edge
   overlapping the section before it. `flip` for torn bottom edges. */
export function TornEdge({ color = 'var(--paper-2)', bg, flip = false, className = '' }) {
  return (
    <div
      className={`torn ${flip ? 'torn--flip' : ''} ${className}`}
      style={bg ? { background: bg } : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 44" preserveAspectRatio="none" focusable="false">
        <path
          d="M0,44 L0,26 L38,20 L66,29 L94,15 L131,24 L162,12 L204,27 L239,17 L273,30 L305,14 L344,25 L381,10 L419,23 L457,16 L493,28 L529,13 L566,24 L601,17 L638,29 L672,12 L713,26 L747,15 L786,27 L822,11 L858,24 L897,16 L933,28 L968,14 L1006,25 L1041,12 L1080,26 L1114,18 L1151,28 L1200,16 L1200,44 Z"
          fill={color}
          opacity="0.45"
          transform="translate(0,-5)"
        />
        <path
          d="M0,44 L0,26 L38,20 L66,29 L94,15 L131,24 L162,12 L204,27 L239,17 L273,30 L305,14 L344,25 L381,10 L419,23 L457,16 L493,28 L529,13 L566,24 L601,17 L638,29 L672,12 L713,26 L747,15 L786,27 L822,11 L858,24 L897,16 L933,28 L968,14 L1006,25 L1041,12 L1080,26 L1114,18 L1151,28 L1200,16 L1200,44 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

/* A strip of washi tape. Purely decorative. */
export function Tape({ tone = '', style, angle = -4 }) {
  return (
    <span
      className={`tape ${tone ? `tape--${tone}` : ''}`}
      style={{ ...style, transform: `rotate(${angle}deg)` }}
      aria-hidden="true"
    />
  )
}

const TONES = {
  cream: ['#efe3ca', '#e4d2ae', '#8a7654'],
  terracotta: ['#e5b795', '#d69c72', '#8f4f28'],
  sage: ['#ccd4b8', '#b0bd97', '#556140'],
  gold: ['#e9d5a4', '#dcbf7c', '#8a6c25'],
}

/**
 * Clearly-marked placeholder photo, rendered as warm-toned SVG art.
 * `alt` is the real alt text for the future photograph; `label` is the
 * short visible note describing what photo belongs here.
 */
export function PlaceholderPhoto({
  alt,
  label,
  tone = 'cream',
  ratio = [4, 3],
}) {
  const [bg1, bg2, fg] = TONES[tone] || TONES.cream
  const w = 800
  const h = Math.round((w * ratio[1]) / ratio[0])
  const gid = `ph-${tone}-${ratio.join('x')}`
  const lines = Array.isArray(label) ? label : [label]
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Placeholder photo: ${alt}`}
      focusable="false"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg1} />
          <stop offset="1" stopColor={bg2} />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid})`} />
      {/* sun + gentle hills — a warm stand-in, not a fake photo */}
      <circle cx={w * 0.78} cy={h * 0.26} r={h * 0.16} fill={fg} opacity="0.28" />
      <circle cx={w * 0.78} cy={h * 0.26} r={h * 0.105} fill={fg} opacity="0.3" />
      <path
        d={`M0 ${h * 0.78} Q ${w * 0.25} ${h * 0.62} ${w * 0.52} ${h * 0.76} T ${w} ${h * 0.7} L ${w} ${h} L 0 ${h} Z`}
        fill={fg}
        opacity="0.2"
      />
      <path
        d={`M0 ${h * 0.9} Q ${w * 0.3} ${h * 0.76} ${w * 0.6} ${h * 0.88} T ${w} ${h * 0.82} L ${w} ${h} L 0 ${h} Z`}
        fill={fg}
        opacity="0.26"
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={w / 2}
          y={h * 0.42 + i * 44 - ((lines.length - 1) * 44) / 2}
          textAnchor="middle"
          fontFamily="Caveat, cursive"
          fontSize="40"
          fontWeight="600"
          fill={fg}
        >
          {line}
        </text>
      ))}
      {/* short badge text so it doesn't register as page copy for SEO */}
      <g>
        <rect x="16" y={h - 46} width="140" height="30" rx="4" fill="#2e2418" opacity="0.72" />
        <text
          x="86"
          y={h - 26}
          textAnchor="middle"
          fontFamily="Karla, sans-serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#f6efe1"
        >
          PLACEHOLDER
        </text>
      </g>
    </svg>
  )
}

/**
 * A matted photo pinned down with washi tape, tilted like it was placed
 * by hand. Wraps a PlaceholderPhoto (or any image) plus a hand-written
 * caption.
 */
export function TapedPhoto({ tilt = -1.6, caption, tapeTones = ['', 'sage'], children }) {
  return (
    <figure className="photo" style={{ '--tilt': `${tilt}deg` }}>
      <Tape tone={tapeTones[0]} angle={-42} style={{ top: -12, left: -26 }} />
      <Tape tone={tapeTones[1]} angle={38} style={{ top: -10, right: -26 }} />
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/* Round sticker badge with hand-written text. */
export function Sticker({ children, tone = 'gold', className = '', rotate = 8 }) {
  return (
    <span
      className={`sticker sticker--${tone} ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  )
}

/* Hand-drawn scribble underline beneath a word. */
export function Scribble({ children }) {
  return (
    <span className="scribble">
      {children}
      <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path
          d="M4 9 C 40 3, 75 12, 112 7 S 180 4, 216 8"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </span>
  )
}

/* Marquee ticker on a tilted paper strip — pauses for reduced motion. */
export function Ticker({ items, tone = 'ink' }) {
  const row = items.join('  ✷  ')
  return (
    <div className={`ticker ticker--${tone}`} aria-label={`Service area: ${items.join(', ')}`}>
      <div className="ticker-track" aria-hidden="true">
        <span>{row}&nbsp;&nbsp;✷&nbsp;&nbsp;</span>
        <span>{row}&nbsp;&nbsp;✷&nbsp;&nbsp;</span>
      </div>
    </div>
  )
}
