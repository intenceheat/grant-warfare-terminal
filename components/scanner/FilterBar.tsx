'use client';

import { motion } from 'framer-motion';
import { Radar, Loader2 } from 'lucide-react';
import { DAOFilter } from '@/types/snapshot';

interface FilterBarProps {
  activeFilter: DAOFilter;
  onFilterChange: (filter: DAOFilter) => void;
  onScan: () => void;
  isLoading: boolean;
  proposalCount: number;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  onScan,
  isLoading,
  proposalCount,
}: FilterBarProps) {
  const filters: { id: DAOFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'defi', label: 'DeFi' },
    { id: 'gaming', label: 'Gaming' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8 p-3 md:p-4 rounded-lg bg-white/[0.02] backdrop-blur-xl border border-white/10">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-2 h-2 rounded-full bg-void-tactical"
          />
          <span className="font-space-grotesk text-xs md:text-sm font-bold tracking-wider text-void-tactical uppercase">
            ACTIVE TARGETS: {proposalCount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-wrap w-full md:w-auto">
        <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/10 flex-wrap">
          <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider whitespace-nowrap">
            DAO
          </span>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              disabled={isLoading}
              className={`px-2 md:px-3 py-1 rounded-md font-space-grotesk text-xs font-medium tracking-wider transition-all duration-300 whitespace-nowrap touch-manipulation ${
                activeFilter === filter.id
                  ? 'bg-void-tactical/20 text-void-tactical border border-void-tactical/60 shadow-[0_0_12px_rgba(74,158,255,0.3)]'
                  : 'text-void-text-secondary hover:text-void-tactical hover:bg-void-tactical/10 border border-transparent'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.button
          onClick={onScan}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-space-grotesk font-semibold tracking-wider transition-all duration-300 touch-manipulation whitespace-nowrap ${
            isLoading
              ? 'bg-void-tactical/10 text-void-tactical/50 border border-void-tactical/30 cursor-not-allowed'
              : 'bg-void-tactical/20 text-void-tactical border border-void-tactical/60 hover:bg-void-tactical/30 hover:shadow-[0_0_20px_rgba(74,158,255,0.4)]'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3 md:w-4 h-3 md:h-4 animate-spin" />
              <span className="text-xs md:text-sm">SCANNING</span>
            </>
          ) : (
            <>
              <Radar className="w-3 md:w-4 h-3 md:h-4" />
              <span className="text-xs md:text-sm">SCAN</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
