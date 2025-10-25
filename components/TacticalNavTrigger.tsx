'use client';

import { motion } from 'framer-motion';

interface TacticalNavTriggerProps {
  onClick: () => void;
}

export function TacticalNavTrigger({ onClick }: TacticalNavTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-16 h-16 flex items-center justify-center group cursor-pointer"
      aria-label="Open menu"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="absolute inset-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="tacticalGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="hexagon-frame">
          <path
            d="M32 8L50 18.5V37.5L32 48L14 37.5V18.5L32 8Z"
            stroke="rgba(74, 158, 255, 0.7)"
            strokeWidth="2"
            fill="rgba(74, 158, 255, 0.1)"
            filter="url(#tacticalGlow)"
            className="transition-all duration-300 group-hover:stroke-[rgba(74,158,255,0.9)]"
          />

          <path
            d="M32 12L46 20V36L32 44L18 36V20L32 12Z"
            stroke="rgba(74, 158, 255, 0.4)"
            strokeWidth="1"
            fill="none"
            className="transition-all duration-300 group-hover:stroke-[rgba(74,158,255,0.6)]"
          />
        </g>

        <g className="corner-brackets">
          <path
            d="M22 22L22 18L18 18"
            stroke="rgba(74, 158, 255, 0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bracket-tl"
          />
          <path
            d="M42 22L42 18L46 18"
            stroke="rgba(74, 158, 255, 0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bracket-tr"
          />
          <path
            d="M22 42L22 46L18 46"
            stroke="rgba(74, 158, 255, 0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bracket-bl"
          />
          <path
            d="M42 42L42 46L46 46"
            stroke="rgba(74, 158, 255, 0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bracket-br"
          />
        </g>

        <g className="scan-lines">
          <line
            x1="20"
            y1="28"
            x2="44"
            y2="28"
            stroke="rgba(74, 158, 255, 0.3)"
            strokeWidth="1"
            className="animate-[routing-pulse_2s_ease-in-out_infinite]"
          />
          <line
            x1="20"
            y1="32"
            x2="44"
            y2="32"
            stroke="rgba(74, 158, 255, 0.2)"
            strokeWidth="1"
            className="animate-[routing-pulse_2s_ease-in-out_infinite_0.3s]"
          />
          <line
            x1="20"
            y1="36"
            x2="44"
            y2="36"
            stroke="rgba(74, 158, 255, 0.3)"
            strokeWidth="1"
            className="animate-[routing-pulse_2s_ease-in-out_infinite_0.6s]"
          />
        </g>

        <g className="radar-sweep" style={{ transformOrigin: '32px 32px' }}>
          <line
            x1="32"
            y1="32"
            x2="32"
            y2="20"
            stroke="rgba(74, 158, 255, 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        <circle
          cx="32"
          cy="32"
          r="2"
          fill="rgba(74, 158, 255, 0.9)"
          className="center-dot"
        />

        <g className="corner-dots">
          <circle cx="26" cy="26" r="1" fill="rgba(74, 158, 255, 0.6)" />
          <circle cx="38" cy="26" r="1" fill="rgba(74, 158, 255, 0.6)" />
          <circle cx="26" cy="38" r="1" fill="rgba(74, 158, 255, 0.6)" />
          <circle cx="38" cy="38" r="1" fill="rgba(74, 158, 255, 0.6)" />
        </g>
      </svg>

      <div className="absolute inset-0 rounded-full blur-xl bg-void-tactical/20 animate-pulse opacity-40 group-hover:opacity-60 transition-opacity" />
    </motion.button>
  );
}
