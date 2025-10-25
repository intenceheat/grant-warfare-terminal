'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function HomeLanding() {
  return (
    <div className="h-full w-full flex items-center justify-center px-4 md:px-6 overflow-hidden">
      <div className="max-w-3xl w-full flex flex-col justify-center gap-3 md:gap-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-space-grotesk text-lg md:text-2xl lg:text-3xl font-normal tracking-[0.08em] text-void-text-secondary/40 leading-tight mb-2 md:mb-3">
            BEHAVIORAL INTELLIGENCE EXTRACTION SYSTEM
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-xs md:text-sm font-space-grotesk text-void-text-secondary/40">
            <span>Extract psychological signals from DAO proposals.</span>
            <span className="hidden md:inline">•</span>
            <span>Calculate win probability.</span>
            <span className="hidden md:inline">•</span>
            <span>Generate tactical positioning.</span>
          </div>
        </motion.div>

        <div className="w-full h-px bg-void-text-secondary/10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2 md:space-y-3"
        >
          <h2 className="font-space-grotesk text-sm md:text-base font-normal tracking-[0.06em] text-void-text-secondary/40 text-center mb-2">
            INTEL WORKFLOW:
          </h2>

          <div className="space-y-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-center py-1.5 md:py-2 px-3">
                <span className="font-space-grotesk text-xs md:text-sm text-void-text-secondary/40">
                  Raw Proposal Text
                </span>
              </div>
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-void-text-secondary/30" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-full py-1.5 md:py-2 px-3">
                <div className="font-space-grotesk text-xs md:text-sm font-normal text-void-text-secondary/40 mb-0.5 text-center">
                  Psychology Layer — Urgency • Desperation • Flexibility
                </div>
              </div>
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-void-text-secondary/30" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-full py-1.5 md:py-2 px-3">
                <div className="font-space-grotesk text-xs md:text-sm font-normal text-void-text-secondary/40 text-center">
                  Competitive Edge — Skill Match % • Win Probability
                </div>
              </div>
              <ArrowDown className="w-3 h-3 md:w-4 md:h-4 text-void-text-secondary/30" />
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full py-1.5 md:py-2 px-3">
                <div className="font-space-grotesk text-xs md:text-sm font-normal text-void-text-secondary/40 text-center">
                  Tactical Brief — Strategy • Gaps • Opening Line
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full h-px bg-void-text-secondary/10" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-2 md:space-y-3"
        >
          <p className="font-space-grotesk text-xs md:text-sm text-void-text-secondary/40">
            Real-time streaming <span className="mx-1">•</span> 20-25 seconds <span className="mx-1">•</span> Full analysis
          </p>

          <div className="w-full h-px bg-void-text-secondary/10" />

          <div className="py-2 md:py-3">
            <div className="space-y-1">
              <div className="font-space-grotesk text-sm md:text-base font-normal tracking-[0.06em] text-void-text-secondary/40">
                READY TO SCAN TARGETS
              </div>
              <div className="font-space-grotesk text-xs text-void-text-secondary/40">
                Click Scanner glyph to begin operations
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-void-text-secondary/10" />

          <p className="font-space-grotesk text-[10px] md:text-xs text-void-text-secondary/30 tracking-normal">
            Powered by MCP Protocol <span className="mx-1">|</span> Deployed on Nosana
          </p>
        </motion.div>

      </div>
    </div>
  );
}