export function HexagonGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-glyph="hexagon"
    >
      <path
        d="M28 4L48.7846 15.5V38.5L28 50L7.21539 38.5V15.5L28 4Z"
        stroke="rgba(74, 158, 255, 0.55)"
        strokeWidth="2"
        fill="rgba(74, 158, 255, 0.15)"
        fillOpacity="1"
      />
      <g className="radar-sweep">
        <line
          x1="28"
          y1="28"
          x2="28"
          y2="10"
          stroke="rgba(74, 158, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="1"
        />
      </g>
    </svg>
  );
}
