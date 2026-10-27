// A procedurally drawn topographic map of a hillside parcel.
// Deterministic, so it renders identically on server and client.

const RINGS = 18;
const STEPS = 120;

function ring(i: number) {
  const cx = 300 + i * 3.4;
  const cy = 250 - i * 2.6;
  const base = 12 + i * 17;
  let d = "";
  for (let k = 0; k <= STEPS; k++) {
    const t = (k / STEPS) * Math.PI * 2;
    const r =
      base *
      (1 + 0.11 * Math.sin(3 * t + i * 0.35) + 0.05 * Math.sin(5 * t - i * 0.6) + 0.025 * Math.sin(9 * t + i));
    const x = cx + r * Math.cos(t) * 1.18;
    const y = cy + r * Math.sin(t) * 0.86;
    d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
}

const paths = Array.from({ length: RINGS }, (_, i) => ring(i));

export function Contours({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="Topographic map of the Les Fourches parcel">
      <g fill="none" stroke="var(--brass)">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 0 ? 1.1 : 0.6} strokeOpacity={i % 5 === 0 ? 0.85 : 0.42} />
        ))}
      </g>

      <path
        d="M-10 468 C 110 436, 210 506, 330 470 S 520 428, 610 452"
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <path
        d="M-10 478 C 110 446, 210 516, 330 480 S 520 438, 610 462"
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.22"
        strokeWidth="0.8"
      />
      <text x="44" y="504" fill="var(--paper)" fillOpacity="0.6" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 17 }}>
        La Loire
      </text>

      <g transform="translate(332 226)">
        <circle r="16" fill="none" stroke="var(--paper)" strokeOpacity="0.4" strokeWidth="0.6" />
        <circle r="3.5" fill="var(--paper)" />
        <line x1="16" y1="0" x2="74" y2="-38" stroke="var(--paper)" strokeOpacity="0.5" strokeWidth="0.6" />
        <text x="80" y="-44" fill="var(--paper)" style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em" }}>
          LES FOURCHES
        </text>
        <text x="80" y="-30" fill="var(--paper)" fillOpacity="0.55" style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.14em" }}>
          1.8 HA · 146 M
        </text>
      </g>

      <g transform="translate(556 44)" stroke="var(--paper)" strokeOpacity="0.6" fill="none" strokeWidth="0.8">
        <line x1="0" y1="18" x2="0" y2="-10" />
        <path d="M-4 -4 L0 -12 L4 -4" />
        <text x="-4" y="34" stroke="none" fill="var(--paper)" fillOpacity="0.6" style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>
          N
        </text>
      </g>
    </svg>
  );
}
