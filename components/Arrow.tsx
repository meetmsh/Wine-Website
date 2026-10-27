export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 10) / 14} viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12.5M8.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
