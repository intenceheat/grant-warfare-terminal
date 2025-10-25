export function TriangleGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-glyph="triangle"
    >
      <path
        d="M28 6L50 48H6L28 6Z"
        stroke="rgba(255, 107, 74, 0.55)"
        strokeWidth="2"
        fill="rgba(255, 107, 74, 0.15)"
        fillOpacity="1"
      />
      <g className="crosshair">
        <circle
          cx="28"
          cy="28"
          r="3"
          fill="rgba(255, 107, 74, 0.8)"
          opacity="1"
          className="center-dot"
        />
        <path
          d="M18 18 L22 18 L22 22"
          stroke="rgba(255, 107, 74, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          className="bracket-tl"
        />
        <path
          d="M38 18 L34 18 L34 22"
          stroke="rgba(255, 107, 74, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          className="bracket-tr"
        />
        <path
          d="M18 38 L22 38 L22 34"
          stroke="rgba(255, 107, 74, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          className="bracket-bl"
        />
        <path
          d="M38 38 L34 38 L34 34"
          stroke="rgba(255, 107, 74, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="1"
          className="bracket-br"
        />
      </g>
    </svg>
  );
}
