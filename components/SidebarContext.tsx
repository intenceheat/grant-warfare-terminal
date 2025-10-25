'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type GlyphId = 'scanner' | 'diamond' | 'triangle';

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
  activeGlyph: GlyphId | null;
  setActiveGlyph: (id: GlyphId | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeGlyph, setActiveGlyph] = useState<GlyphId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, activeGlyph, setActiveGlyph, isMobileMenuOpen, setIsMobileMenuOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
