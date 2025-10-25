'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Proposal, DAOFilter } from '@/types/snapshot';
import { TacticalBrief, PanelState } from '@/types/tactical-brief';
import { fetchActiveProposals, formatTimeRemaining } from '@/lib/snapshot';
import { fetchWithRetry } from '@/lib/api-client';
import { ProposalCard } from './ProposalCard';
import { FilterBar } from './FilterBar';
import { EmptyState, LoadingState, ErrorState } from './ScannerStates';
import { TacticalBriefPanel } from '@/components/tactical-brief/TacticalBriefPanel';

export function ProposalScanner() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<DAOFilter>('all');
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelState, setPanelState] = useState<PanelState>('closed');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [briefData, setBriefData] = useState<TacticalBrief | null>(null);

  const loadProposals = async (filter: DAOFilter = activeFilter) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchActiveProposals(filter);
      setProposals(data);
      setHasInitialLoad(true);
      setError(null);
    } catch (err) {
      console.error('[Frontend] Failed to fetch proposals:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch proposals';
      setError(errorMessage);
      setProposals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: DAOFilter) => {
    setActiveFilter(filter);
    loadProposals(filter);
  };

  const handleScan = () => {
    loadProposals(activeFilter);
  };

  const handleRetry = () => {
    loadProposals(activeFilter);
  };

  const handleAnalyzeTarget = async (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsPanelOpen(true);
    setPanelState('loading');
    setBriefData(null);
    setError(null);

    try {
      console.log('[Frontend] Analyzing proposal:', {
        id: proposal.id,
        title: proposal.title,
        dao: proposal.dao
      });

      const result = await fetchWithRetry<{
        success: boolean;
        cached?: boolean;
        data?: TacticalBrief;
        error?: string;
        details?: string;
      }>(
        '/api/analyze',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            proposalId: proposal.id,
            title: proposal.title,
            description: proposal.body || 'No description available',
            dao: proposal.dao,
          }),
        },
        {
          maxRetries: 1,
          initialDelay: 2000,
          timeout: 90000,
        }
      );

      console.log('[Frontend] API result:', result);

      if (result.success && result.data) {
        console.log(`[Frontend] Analysis successful${result.cached ? ' (from cache)' : ''}, displaying brief`);
        setBriefData(result.data);
        setPanelState('content');
      } else {
        const errorMsg = result.error || 'Analysis failed - no error message';
        console.error('[Frontend] Analysis failed:', {
          error: errorMsg,
          details: result.details,
        });
        setError(`Analysis failed: ${errorMsg}`);
        setPanelState('closed');
        setIsPanelOpen(false);
      }
    } catch (err) {
      let errorMsg = 'Failed to analyze proposal';

      if (err instanceof Error) {
        errorMsg = err.message;
      }

      console.error('[Frontend] Failed to analyze proposal:', {
        error: errorMsg,
        fullError: err,
        stack: err instanceof Error ? err.stack : undefined
      });

      setError(errorMsg);
      setPanelState('closed');
      setIsPanelOpen(false);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setPanelState('closed');
  };

  useEffect(() => {
    loadProposals();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProposals((prevProposals) =>
        prevProposals.map((proposal) => ({
          ...proposal,
          deadline: formatTimeRemaining(proposal.endTimestamp),
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (isLoading && !hasInitialLoad) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState onRetry={handleRetry} errorMessage={error} />;
    }

    if (proposals.length === 0 && hasInitialLoad) {
      return <EmptyState onRetry={handleScan} />;
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {proposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProposalCard proposal={proposal} onAnalyze={handleAnalyzeTarget} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onScan={handleScan}
        isLoading={isLoading}
        proposalCount={proposals.length}
      />

      <div className="w-full">
        {renderContent()}
      </div>

      <TacticalBriefPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        state={panelState}
        data={briefData}
      />
    </div>
  );
}
