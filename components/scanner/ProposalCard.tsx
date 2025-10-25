'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Proposal } from '@/types/snapshot';

interface ProposalCardProps {
  proposal: Proposal;
  onAnalyze: (proposal: Proposal) => void;
}

export function ProposalCard({ proposal, onAnalyze }: ProposalCardProps) {
  const urgencyColor = () => {
    if (proposal.urgency > 70) return 'bg-void-alert';
    if (proposal.urgency > 40) return 'bg-void-tactical';
    return 'bg-void-success';
  };

  const handleAnalyze = () => {
    onAnalyze(proposal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative p-4 md:p-6 rounded-lg bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-void-tactical/40 hover:shadow-[0_0_24px_rgba(74,158,255,0.3)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-3 h-3 rounded-full bg-void-success shadow-[0_0_12px_rgba(74,255,136,0.6)]"
          />
          <span className="font-space-grotesk text-xs font-semibold tracking-wider text-void-success uppercase">
            LIVE
          </span>
        </div>

        <a
          href={proposal.proposalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ExternalLink className="w-4 h-4 text-void-tactical hover:text-void-tactical/80" />
        </a>
      </div>

      <h3 className="text-lg md:text-xl font-bold font-space-grotesk text-void-text-primary mb-3 line-clamp-2 leading-tight">
        {proposal.title}
      </h3>

      <div className="inline-block px-3 py-1 rounded-full mb-4 bg-void-tactical/10 border border-void-tactical/30">
        <span className="font-space-grotesk text-xs font-medium text-void-tactical">
          {proposal.dao}
        </span>
      </div>

      <div className="w-full h-px bg-white/10 mb-4" />

      {proposal.budget !== 'N/A' && (
        <div className="mb-4">
          <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider">
            Budget
          </span>
          <p className="font-space-grotesk text-lg font-bold mt-1 text-void-tactical">
            {proposal.budget}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider">
            Time Remaining
          </span>
          <p className="font-space-grotesk text-lg font-bold text-void-text-primary mt-1">
            {proposal.deadline}
          </p>
        </div>

        <div className="text-right">
          <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider">
            Urgency
          </span>
          <p className="font-space-grotesk text-lg font-bold text-void-text-primary mt-1">
            {Math.round(proposal.urgency)}%
          </p>
        </div>
      </div>

      <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${proposal.urgency}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`absolute left-0 top-0 h-full ${urgencyColor()} rounded-full`}
          style={{
            boxShadow: `0 0 12px ${
              proposal.urgency > 70
                ? 'rgba(255, 107, 74, 0.6)'
                : proposal.urgency > 40
                ? 'rgba(74, 158, 255, 0.6)'
                : 'rgba(74, 255, 136, 0.6)'
            }`,
          }}
        />
      </div>

      <motion.button
        onClick={handleAnalyze}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-2 md:py-3 rounded-lg font-space-grotesk font-semibold tracking-wider transition-all duration-300 touch-manipulation text-sm md:text-base bg-void-tactical/20 border border-void-tactical/60 text-void-tactical hover:bg-void-tactical/30 hover:shadow-[0_0_20px_rgba(74,158,255,0.4)]"
      >
        ANALYZE TARGET →
      </motion.button>
    </motion.div>
  );
}
