'use client';

import { CommandHeader } from '@/components/CommandHeader';
import { GlyphNavigation } from '@/components/GlyphNavigation';
import { SidebarProvider, useSidebar } from '@/components/SidebarContext';
import { ProposalScanner } from '@/components/scanner/ProposalScanner';
import { HomeLanding } from '@/components/HomeLanding';
import { motion } from 'framer-motion';

function HomeContent() {
  const { isSidebarVisible, activeGlyph } = useSidebar();

  const renderActiveView = () => {
    switch (activeGlyph) {
      case 'scanner':
        return <ProposalScanner />;
      default:
        return <HomeLanding />;
    }
  };

  return (
    <>
      <CommandHeader />
      <GlyphNavigation />

      <div className="md:hidden pt-[56px] h-full overflow-auto pb-24">
        {renderActiveView()}
      </div>

      <motion.main
        initial={false}
        animate={{
          marginLeft: isSidebarVisible ? 80 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200,
        }}
        className="hidden md:block pt-[72px] h-full overflow-auto pb-8"
      >
        {renderActiveView()}
      </motion.main>
    </>
  );
}

export default function Home() {
  return (
    <SidebarProvider>
      <div className="h-full w-full">
        <HomeContent />
      </div>
    </SidebarProvider>
  );
}
