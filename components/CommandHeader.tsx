'use client';

import { TacticalLogo } from './TacticalLogo';
import { useSidebar } from './SidebarContext';

export function CommandHeader() {
  const { setActiveGlyph, setIsMobileMenuOpen } = useSidebar();

  const handleHomeClick = () => {
    setActiveGlyph(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[56px] md:h-[72px] border-b border-white/10 bg-void-base/30 backdrop-blur-md z-50 rounded-b-lg">
      <div className="h-full flex flex-row items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={handleHomeClick}
            className="group relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-void-base/40 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-void-tactical/10 hover:border-void-tactical/40 hover:shadow-[0_0_20px_rgba(74,158,255,0.4)]"
            aria-label="Return to home"
          >
            <TacticalLogo className="w-6 h-6 md:w-8 md:h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(74,158,255,0.6)]" />
          </button>

          <div className="flex flex-col gap-0">
            <h1 className="font-space-grotesk text-sm md:text-2xl font-bold tracking-[0.08em] md:tracking-[0.1em] uppercase text-[#6BB8E8]/90 drop-shadow-[0_2px_8px_rgba(107,184,232,0.25)] leading-tight">
              GRANT WARFARE TERMINAL
            </h1>
            <span className="font-space-grotesk text-[#6BB8E8] text-[10px] md:text-sm tracking-wide leading-tight font-medium drop-shadow-[0_1px_6px_rgba(107,184,232,0.3)]">
              Nosana Builders Challenge: Agents 102
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
