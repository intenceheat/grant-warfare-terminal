'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, TrendingUp, Download } from 'lucide-react';
import { TacticalBrief, PanelState } from '@/types/tactical-brief';
import { exportTacticalBrief } from '@/lib/export-brief';

interface TacticalBriefPanelProps {
  isOpen: boolean;
  onClose: () => void;
  state: PanelState;
  data: TacticalBrief | null;
}

export function TacticalBriefPanel({
  isOpen,
  onClose,
  state,
  data,
}: TacticalBriefPanelProps) {
  const handleExport = () => {
    if (data) {
      exportTacticalBrief(data, 'markdown');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-void-success';
    if (score >= 4) return 'text-void-tactical';
    return 'text-void-alert';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 7) return 'bg-void-success';
    if (score >= 4) return 'bg-void-tactical';
    return 'bg-void-alert';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'CRITICAL':
        return 'bg-void-alert/20 text-void-alert border-void-alert/60';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/60';
      case 'MODERATE':
        return 'bg-void-tactical/20 text-void-tactical border-void-tactical/60';
      default:
        return 'bg-void-success/20 text-void-success border-void-success/60';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'text-void-alert';
      case 'MODERATE':
        return 'text-void-tactical';
      default:
        return 'text-void-success';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-void-base/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            {state === 'loading' ? (
              <LoadingState />
            ) : data ? (
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-space-grotesk text-sm font-bold tracking-wider text-void-tactical uppercase mb-2">
                      TACTICAL BRIEF
                    </h2>
                    <h3 className="font-space-grotesk text-xl font-bold text-void-text-primary leading-tight mb-1">
                      {data.proposal.title}
                    </h3>
                    <p className="font-space-grotesk text-sm text-void-text-secondary">
                      {data.proposal.dao}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-void-text-secondary hover:text-void-text-primary" />
                  </button>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="space-y-4">
                  <h4 className="font-space-grotesk text-xs font-semibold tracking-wider text-void-text-secondary uppercase">
                    Opportunity Score
                  </h4>
                  <div className="flex items-end gap-3">
                    <span
                      className={`font-space-grotesk text-5xl font-bold ${getScoreColor(
                        data.opportunityScore
                      )}`}
                    >
                      {data.opportunityScore.toFixed(1)}
                    </span>
                    <span className="font-space-grotesk text-2xl font-medium text-void-text-secondary mb-1">
                      / 10
                    </span>
                  </div>
                  <div className="relative w-full h-3 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.opportunityScore / 10) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className={`absolute left-0 top-0 h-full ${getScoreBarColor(
                        data.opportunityScore
                      )} rounded-full`}
                      style={{
                        boxShadow: `0 0 12px ${
                          data.opportunityScore >= 7
                            ? 'rgba(74, 255, 136, 0.6)'
                            : data.opportunityScore >= 4
                            ? 'rgba(74, 158, 255, 0.6)'
                            : 'rgba(255, 107, 74, 0.6)'
                        }`,
                      }}
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="space-y-4">
                  <h4 className="font-space-grotesk text-xs font-semibold tracking-wider text-void-text-secondary uppercase">
                    Psychology Analysis
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-space-grotesk text-sm text-void-text-secondary">
                        Urgency Level
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full border font-space-grotesk text-xs font-bold tracking-wider ${getUrgencyColor(
                          data.psychology.urgency
                        )}`}
                      >
                        {data.psychology.urgency}
                      </span>
                    </div>
                    <p className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                      {data.psychology.urgencyReason}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-space-grotesk text-sm text-void-text-secondary">
                        Desperation
                      </span>
                      <span
                        className={`font-space-grotesk text-sm font-bold ${getLevelColor(
                          data.psychology.desperation
                        )}`}
                      >
                        {data.psychology.desperation}
                      </span>
                    </div>
                    <p className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                      {data.psychology.desperationReason}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-space-grotesk text-sm text-void-text-secondary">
                        Flexibility
                      </span>
                      <span
                        className={`font-space-grotesk text-sm font-bold ${getLevelColor(
                          data.psychology.flexibility
                        )}`}
                      >
                        {data.psychology.flexibility}
                      </span>
                    </div>
                    <p className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                      {data.psychology.flexibilityReason}
                    </p>
                  </div>

                  {data.psychology.triggers.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-sm font-medium text-void-text-primary">
                        Key Psychological Triggers
                      </span>
                      <ul className="space-y-2">
                        {data.psychology.triggers.map((trigger, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <TrendingUp className="w-4 h-4 text-void-tactical mt-0.5 flex-shrink-0" />
                            <span className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                              {trigger}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                    <p className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                      {data.psychology.fullAnalysis}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="space-y-4">
                  <h4 className="font-space-grotesk text-xs font-semibold tracking-wider text-void-text-secondary uppercase">
                    Competitive Edge
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider">
                        Skill Match
                      </span>
                      <p className="font-space-grotesk text-3xl font-bold text-void-tactical">
                        {data.edge.skillMatch}%
                      </p>
                      <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.edge.skillMatch}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                          className="absolute left-0 top-0 h-full bg-void-tactical rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider">
                        Win Probability
                      </span>
                      <p className="font-space-grotesk text-3xl font-bold text-void-success">
                        {data.edge.winProbability}%
                      </p>
                      <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.edge.winProbability}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                          className="absolute left-0 top-0 h-full bg-void-success rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {data.edge.advantages.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-sm font-medium text-void-text-primary">
                        Your Advantages
                      </span>
                      <ul className="space-y-2">
                        {data.edge.advantages.map((advantage, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <Check className="w-4 h-4 text-void-success mt-0.5 flex-shrink-0" />
                            <span className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                              {advantage}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.edge.gaps.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-sm font-medium text-void-text-primary">
                        Gaps to Address
                      </span>
                      <ul className="space-y-2">
                        {data.edge.gaps.map((gap, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <AlertTriangle className="w-4 h-4 text-void-alert mt-0.5 flex-shrink-0" />
                            <span className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                              {gap}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="space-y-4">
                  <h4 className="font-space-grotesk text-xs font-semibold tracking-wider text-void-text-secondary uppercase">
                    Tactical Recommendation
                  </h4>

                  <div className="p-4 rounded-lg bg-void-tactical/10 border border-void-tactical/30">
                    <p className="font-space-grotesk text-base font-medium text-void-text-primary leading-relaxed">
                      {data.recommendation.mainStrategy}
                    </p>
                  </div>

                  {data.recommendation.emphasize.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-sm font-medium text-void-text-primary">
                        Emphasize
                      </span>
                      <ol className="space-y-2 list-decimal list-inside">
                        {data.recommendation.emphasize.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + index * 0.1 }}
                            className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed"
                          >
                            {point}
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {data.recommendation.avoid.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-space-grotesk text-sm font-medium text-void-text-primary">
                        Avoid
                      </span>
                      <ul className="space-y-2">
                        {data.recommendation.avoid.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-void-text-secondary">•</span>
                            <span className="font-space-grotesk text-sm text-void-text-secondary leading-relaxed">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-white/[0.02] border-l-4 border-void-tactical">
                    <span className="font-space-grotesk text-xs text-void-text-secondary uppercase tracking-wider block mb-2">
                      Suggested Opening Line
                    </span>
                    <p className="font-space-grotesk text-sm text-void-text-primary leading-relaxed italic">
                      "{data.recommendation.openingLine}"
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExport}
                    className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/20 text-void-text-primary font-space-grotesk font-semibold tracking-wider hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    EXPORT BRIEF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 py-3 rounded-lg bg-void-tactical/20 border border-void-tactical/60 text-void-tactical font-space-grotesk font-semibold tracking-wider hover:bg-void-tactical/30 hover:shadow-[0_0_20px_rgba(74,158,255,0.4)] transition-all duration-300"
                  >
                    ANALYZE ANOTHER
                  </motion.button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="text-center space-y-6">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 mx-auto rounded-full bg-void-tactical/20 border-2 border-void-tactical flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-2 border-transparent border-t-void-tactical"
          />
        </motion.div>
        <div>
          <h3 className="font-space-grotesk text-2xl font-bold text-void-tactical mb-2">
            ANALYZING...
          </h3>
          <p className="font-space-grotesk text-sm text-void-text-secondary">
            Processing tactical intelligence
          </p>
        </div>
        <motion.div
          className="flex gap-1 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-void-tactical"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
