'use client';

import { motion } from 'framer-motion';
import { Radar, AlertCircle, Loader2 } from 'lucide-react';

interface StateProps {
  onRetry?: () => void;
  errorMessage?: string;
}

export function EmptyState({ onRetry }: StateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[60vh] px-4"
    >
      <div className="flex flex-col items-center gap-6 p-8 md:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 max-w-md mx-auto">
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Radar className="w-16 h-16 text-void-tactical" />
        </motion.div>

        <div className="text-center">
          <h3 className="font-space-grotesk text-2xl font-bold tracking-wider text-void-tactical mb-2">
            NO TARGETS DETECTED
          </h3>
          <p className="font-space-grotesk text-sm text-void-text-secondary">
            Awaiting intelligence feed connection
          </p>
        </div>

        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-void-tactical/20 border border-void-tactical/60 text-void-tactical font-space-grotesk font-semibold tracking-wider hover:bg-void-tactical/30 transition-all duration-300 shadow-[0_0_20px_rgba(74,158,255,0.3)]"
          >
            INITIATE SCAN →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[60vh] px-4"
    >
      <div className="flex flex-col items-center gap-6 p-8 md:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 max-w-md mx-auto">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Radar className="w-16 h-16 text-void-tactical" />
        </motion.div>

        <div className="text-center">
          <h3 className="font-space-grotesk text-2xl font-bold tracking-wider text-void-tactical mb-2">
            SCANNING NETWORKS...
          </h3>
          <p className="font-space-grotesk text-sm text-void-text-secondary">
            Analyzing active proposals across DAOs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 rounded-full bg-void-tactical"
          />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="w-2 h-2 rounded-full bg-void-tactical"
          />
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="w-2 h-2 rounded-full bg-void-tactical"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ErrorState({ onRetry, errorMessage }: StateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[60vh] px-4"
    >
      <div className="flex flex-col items-center gap-6 p-8 md:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-void-alert/30 max-w-md mx-auto">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <AlertCircle className="w-16 h-16 text-void-alert" />
        </motion.div>

        <div className="text-center">
          <h3 className="font-space-grotesk text-2xl font-bold tracking-wider text-void-alert mb-2">
            ANALYSIS FAILED
          </h3>
          <p className="font-space-grotesk text-sm text-void-text-secondary mb-2">
            {errorMessage || 'Connection to intel feed interrupted'}
          </p>
          {errorMessage && (
            <p className="font-space-grotesk text-xs text-void-text-secondary/70 italic">
              Check console for detailed error logs
            </p>
          )}
        </div>

        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-void-alert/20 border border-void-alert/60 text-void-alert font-space-grotesk font-semibold tracking-wider hover:bg-void-alert/30 transition-all duration-300 shadow-[0_0_20px_rgba(255,107,74,0.3)]"
          >
            RETRY SCAN →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
