import { useId } from "react";
import type { BottleShape, Wine } from "@/lib/wines";

const bodies: Record<BottleShape, string> = {
  bordeaux:
    "M52 10 L52 110 C52 138 30 142 30 168 L30 382 Q30 395 43 395 L77 395 Q90 395 90 382 L90 168 C90 142 68 138 68 110 L68 10 Z",
  burgundy:
    "M52 10 L52 104 C52 152 26 168 26 214 L26 382 Q26 395 39 395 L81 395 Q94 395 94 382 L94 214 C94 168 68 152 68 104 L68 10 Z",
  champagne:
    "M51 10 L51 100 C51 150 24 166 24 214 L24 382 Q24 395 37 395 L83 395 Q96 395 96 382 L96 214 C96 166 69 150 69 100 L69 10 Z",
  flute:
    "M53 10 L53 122 C53 172 38 182 38 218 L38 382 Q38 395 50 395 L70 395 Q82 395 82 382 L82 218 C82 182 67 172 67 122 L67 10 Z",
};

const geometry: Record<BottleShape, { capsule: number; label: [number, number, number, number] }> = {
  bordeaux: { capsule: 92, label: [34, 238, 52, 98] },
  burgundy: { capsule: 88, label: [30, 238, 60, 98] },
  champagne: { capsule: 142, label: [28, 244, 64, 92] },
  flute: { capsule: 104, label: [41, 250, 38, 92] },
};

type Props = {
  wine: Wine;
  className?: string;
  style?: React.CSSProperties;
};

export function Bottle({ wine, className, style }: Props) {
  const uid = useId().replace(/:/g, "");
  const { shape, glass, capsule, label, ink } = wine.bottle;
  const body = bodies[shape];
  const g = geometry[shape];
  const [lx, ly, lw, lh] = g.label;
  const cx = 60;
  const nameSize = lw < 45 ? 9 : 11.5;

  return (
    <svg
      viewBox="0 0 120 404"
      className={className}
      style={style}
      role="img"
      aria-label={`${wine.name} ${wine.vintage}, ${wine.producer}`}
    >
      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`shade-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.42" />
          <stop offset="0.28" stopColor="#000" stopOpacity="0" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.82" stopColor="#000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <ellipse cx={cx} cy="397" rx="40" ry="3.2" fill="#1b1614" opacity="0.18" />

      <g clipPath={`url(#clip-${uid})`}>
        <path d={body} fill={glass} />
        <rect x="0" y="0" width="120" height={g.capsule} fill={capsule} />
        <rect x="0" y={g.capsule - 4} width="120" height="1.2" fill="#000" opacity="0.18" />

        <rect x={lx} y={ly} width={lw} height={lh} fill={label} />
        <rect x={lx + 3} y={ly + 3} width={lw - 6} height={lh - 6} fill="none" stroke={ink} strokeOpacity="0.35" strokeWidth="0.5" />
        <text
          x={cx}
          y={ly + 16}
          textAnchor="middle"
          fill={ink}
          style={{ fontFamily: "var(--font-mono)", fontSize: 3.6, letterSpacing: "0.12em" }}
        >
          {wine.producer.toUpperCase().slice(0, 26)}
        </text>
        <line x1={cx - 6} x2={cx + 6} y1={ly + 23} y2={ly + 23} stroke={ink} strokeOpacity="0.5" strokeWidth="0.5" />
        <text
          x={cx}
          y={ly + lh / 2 + 6}
          textAnchor="middle"
          fill={ink}
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: nameSize }}
        >
          {wine.short}
        </text>
        <text
          x={cx}
          y={ly + lh - 14}
          textAnchor="middle"
          fill={ink}
          style={{ fontFamily: "var(--font-mono)", fontSize: 4.4, letterSpacing: "0.2em" }}
        >
          {wine.vintage}
        </text>

        <rect x="0" y="0" width="120" height="404" fill={`url(#shade-${uid})`} />
        <rect x={shape === "flute" ? 45 : 37} y="190" width="3" height="190" rx="1.5" fill="#fff" opacity="0.14" />
      </g>

      <rect x="49.5" y="7" width="21" height="7" rx="1.5" fill={capsule} />
      <rect x="49.5" y="7" width="21" height="7" rx="1.5" fill="#000" opacity="0.12" />
    </svg>
  );
}
