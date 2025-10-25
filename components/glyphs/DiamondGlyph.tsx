export function DiamondGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-glyph="diamond"
    >
      <path
        d="M28 4L48 28L28 52L8 28L28 4Z"
        stroke="rgba(124, 58, 255, 0.55)"
        strokeWidth="2"
        fill="rgba(124, 58, 255, 0.15)"
        fillOpacity="1"
      />
      <g className="brain-waves">
        <path
          d="M16 22 Q20 20 24 22 T32 22 T40 22"
          stroke="rgba(124, 58, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="1"
          className="wave-1"
        />
        <path
          d="M16 28 Q20 26 24 28 T32 28 T40 28"
          stroke="rgba(124, 58, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="1"
          className="wave-2"
        />
        <path
          d="M16 34 Q20 32 24 34 T32 34 T40 34"
          stroke="rgba(124, 58, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="1"
          className="wave-3"
        />
      </g>
    </svg>
  );
}
