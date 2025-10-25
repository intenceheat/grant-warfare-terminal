export function PentagonGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2 L30 12 L25 28 L7 28 L2 12 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16 8 L16 16 M16 16 L22 20 M16 16 L10 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[routing-pulse_2s_ease-in-out_infinite]"
      />

      <circle
        cx="16"
        cy="16"
        r="2"
        fill="currentColor"
        className="animate-[routing-pulse_2s_ease-in-out_infinite]"
      />
    </svg>
  );
}
