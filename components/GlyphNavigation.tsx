'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { HexagonGlyph } from './glyphs/HexagonGlyph';
import { DiamondGlyph } from './glyphs/DiamondGlyph';
import { TriangleGlyph } from './glyphs/TriangleGlyph';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

type GlyphId = 'scanner' | 'diamond' | 'triangle';

interface GlyphButton {
  id: GlyphId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  shadowColor: string;
  tooltipBorderColor: string;
  tooltipShadowColor: string;
}

const glyphs: GlyphButton[] = [
  {
    id: 'scanner',
    label: 'Scanner',
    icon: HexagonGlyph,
    color: 'text-void-tactical',
    shadowColor: 'shadow-void-tactical/30',
    tooltipBorderColor: 'border-l-void-tactical',
    tooltipShadowColor: 'shadow-void-tactical/20'
  },
  {
    id: 'diamond',
    label: '',
    icon: DiamondGlyph,
    color: 'text-void-purple/40',
    shadowColor: 'shadow-void-purple/10',
    tooltipBorderColor: 'border-l-void-purple',
    tooltipShadowColor: 'shadow-void-purple/20'
  },
  {
    id: 'triangle',
    label: '',
    icon: TriangleGlyph,
    color: 'text-void-coral/40',
    shadowColor: 'shadow-void-coral/10',
    tooltipBorderColor: 'border-l-void-coral',
    tooltipShadowColor: 'shadow-void-coral/20'
  },
];

export function GlyphNavigation() {
  const [hoveredGlyph, setHoveredGlyph] = useState<GlyphId | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [isMobileTriggerHovered, setIsMobileTriggerHovered] = useState(false);
  const { isSidebarVisible, toggleSidebar, activeGlyph, setActiveGlyph, isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();

  const renderGlyphButton = (glyph: GlyphButton, isMobile: boolean = false) => {
    const Icon = glyph.icon;
    const isActive = activeGlyph === glyph.id;
    const isHovered = hoveredGlyph === glyph.id;
    const isInactive = glyph.id === 'diamond' || glyph.id === 'triangle';
    const activeColor = glyph.color;
    const inactiveColor = `${glyph.color}/60`;

    const getShadowClass = (glyph: GlyphButton, isActive: boolean, isHovered: boolean) => {
      if (glyph.id === 'diamond' || glyph.id === 'triangle') {
        return 'shadow-none';
      }
      if (glyph.id === 'scanner') {
        if (isActive) return 'shadow-[0_0_24px_rgba(74,158,255,0.5)]';
        if (isHovered) return 'shadow-[0_0_20px_rgba(74,158,255,0.35)]';
        return 'shadow-[0_0_8px_rgba(74,158,255,0.1)]';
      }
      return 'shadow-none';
    };

    const getBorderColor = (glyph: GlyphButton) => {
      if (glyph.id === 'scanner') return 'border-void-tactical/60';
      if (glyph.id === 'diamond') return 'border-void-purple/60';
      return 'border-void-coral/60';
    };

    const getBackgroundColor = (glyph: GlyphButton, isActive: boolean, isHovered: boolean) => {
      if (glyph.id === 'diamond' || glyph.id === 'triangle') {
        return 'bg-white/[0.02]';
      }
      if (glyph.id === 'scanner') {
        if (isActive) return 'bg-void-tactical/20';
        if (isHovered) return 'bg-void-tactical/15';
        return 'bg-void-tactical/5';
      }
      return 'bg-white/[0.02]';
    };

    const button = (
      <motion.button
        onClick={() => {
          if (glyph.id === 'scanner') {
            setActiveGlyph(glyph.id);
          }
        }}
        onHoverStart={() => {
          if (!isInactive) {
            setHoveredGlyph(glyph.id);
          }
        }}
        onHoverEnd={() => setHoveredGlyph(null)}
        whileHover={!isInactive ? { scale: 1.05 } : {}}
        transition={{ duration: 0.2 }}
        className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} flex items-center justify-center rounded-lg transition-all duration-300 ${getBackgroundColor(glyph, isActive, isHovered)} ${getShadowClass(glyph, isActive, isHovered)} ${isInactive ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <Icon
          className={`transition-all duration-300 ${
            isInactive ? glyph.color : isActive ? activeColor : isHovered ? activeColor : inactiveColor
          } ${isActive && !isInactive ? 'animate-[glyph-pulse_2s_ease-in-out_infinite]' : ''}`}
        />

        {isActive && (
          <motion.div
            className={`absolute inset-0 rounded-lg border-2 ${getBorderColor(glyph)}`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>
    );

    if (isMobile) {
      return (
        <div key={glyph.id} className="flex flex-col items-center gap-1">
          {button}
          {glyph.label && (
            <span className={`font-space-grotesk text-[10px] uppercase tracking-wider font-medium ${activeColor}`}>
              {glyph.label}
            </span>
          )}
        </div>
      );
    }

    if (!glyph.label || isInactive) {
      return <div key={glyph.id}>{button}</div>;
    }

    return (
      <Tooltip key={glyph.id} delayDuration={200}>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent
          side="right"
          borderColor={glyph.tooltipBorderColor}
          shadowColor={glyph.tooltipShadowColor}
        >
          {glyph.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onHoverStart={() => setIsMobileTriggerHovered(true)}
        onHoverEnd={() => setIsMobileTriggerHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-6 h-[108px] bg-void-base/40 backdrop-blur-md border-t border-b border-l border-white/10 rounded-l-lg group hover:w-7 transition-all duration-300"
        style={
          isMobileTriggerHovered
            ? {
                boxShadow: '0 0 20px rgba(74, 158, 255, 0.4), inset 0 0 20px rgba(74, 158, 255, 0.1)',
                borderLeftColor: 'rgba(74, 158, 255, 0.5)',
              }
            : {
                boxShadow: '0 0 10px rgba(74, 158, 255, 0.2)',
              }
        }
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? (
          <ChevronRight className="w-4 h-4 text-void-tactical" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-void-tactical" />
        )}

        <div className="absolute inset-0 border-void-tactical/0 group-hover:border-void-tactical/30 transition-colors duration-300 rounded-l-lg border-l-2" />

        <motion.div
          className="absolute top-0 left-0 w-[2px] h-2 bg-void-tactical/60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] h-2 bg-void-tactical/60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.button>

      <motion.nav
        initial={false}
        animate={{
          x: isSidebarVisible ? 0 : -80,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
        }}
        className="hidden md:block fixed left-0 top-[56px] md:top-[72px] bottom-0 w-[80px] bg-void-base/30 backdrop-blur-md border-r border-white/10 z-40 rounded-r-2xl"
      >
        <div className="flex flex-col items-center justify-start pt-12 gap-6">
          {glyphs.map((glyph) => renderGlyphButton(glyph, false))}
        </div>
      </motion.nav>

      <motion.button
        onClick={toggleSidebar}
        onHoverStart={() => setIsToggleHovered(true)}
        onHoverEnd={() => setIsToggleHovered(false)}
        initial={false}
        animate={{
          left: isSidebarVisible ? 64 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
        }}
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-50 items-center justify-center w-6 h-20 bg-void-base/40 backdrop-blur-md border-t border-b border-white/10 group hover:w-7 transition-all duration-300 ${
          isSidebarVisible ? 'rounded-r-lg border-r' : 'rounded-r-lg border-r'
        }`}
        style={
          isToggleHovered
            ? {
                boxShadow: '0 0 20px rgba(74, 158, 255, 0.4), inset 0 0 20px rgba(74, 158, 255, 0.1)',
                borderRightColor: 'rgba(74, 158, 255, 0.5)',
              }
            : {
                boxShadow: '0 0 10px rgba(74, 158, 255, 0.2)',
              }
        }
        aria-label={isSidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
      >
        {isSidebarVisible ? (
          <ChevronLeft className="w-4 h-4 text-void-tactical" />
        ) : (
          <ChevronRight className="w-4 h-4 text-void-tactical" />
        )}

        <div className={`absolute inset-0 border-void-tactical/0 group-hover:border-void-tactical/30 transition-colors duration-300 rounded-r-lg border-r-2`} />

        <motion.div
          className="absolute top-0 right-0 w-[2px] h-2 bg-void-tactical/60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[2px] h-2 bg-void-tactical/60"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-6 right-[3.5rem] h-[108px] bg-void-base/40 backdrop-blur-xl border border-white/20 z-40 shadow-[-12px_0_40px_rgba(0,0,0,0.5)] rounded-lg"
          >
            <div className="flex flex-row items-center justify-center h-full px-5 py-3 gap-5">
              {glyphs.map((glyph) => renderGlyphButton(glyph, true))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
