'use client';

export function TacticalLogo({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 10L30 32H10L20 10Z"
        stroke="rgba(74, 158, 255, 0.55)"
        strokeWidth="2"
        fill="rgba(74, 158, 255, 0.15)"
        fillOpacity="1"
        transform="rotate(180 20 20)"
      />
    </svg>
  );
}
