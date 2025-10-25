import { useState, useCallback } from 'react';

export interface StreamingAnalysisState {
  status: string;
  psychology: any | null;
  edge: any | null;
  complete: any | null;
  error: string | null;
  isStreaming: boolean;
}

export function useStreamingAnalysis() {
  const [state, setState] = useState<StreamingAnalysisState>({
    status: '',
    psychology: null,
    edge: null,
    complete: null,
    error: null,
    isStreaming: false,
  });

  const analyze = useCallback(async (proposal: {
    proposalId: string;
    title: string;
    description?: string;
    dao: string;
  }) => {
    setState({
      status: 'Initializing...',
      psychology: null,
      edge: null,
      complete: null,
      error: null,
      isStreaming: true,
    });

    try {
      const response = await fetch('/api/analyze-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposal),
      });

      // Check if cached response (JSON)
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await response.json();
        setState({
          status: 'Complete (cached)',
          psychology: data.data.psychology,
          edge: data.data.edge,
          complete: data.data,
          error: null,
          isStreaming: false,
        });
        return;
      }

      // Stream response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (data.type === 'status') {
              setState(prev => ({ ...prev, status: data.message }));
            } else if (data.type === 'psychology') {
              setState(prev => ({ ...prev, psychology: data.data }));
            } else if (data.type === 'edge') {
              setState(prev => ({ ...prev, edge: data.data }));
            } else if (data.type === 'complete') {
              setState(prev => ({
                ...prev,
                complete: data.data,
                status: 'Analysis complete',
                isStreaming: false,
              }));
            } else if (data.type === 'error') {
              setState(prev => ({
                ...prev,
                error: data.error,
                isStreaming: false,
              }));
            }
          }
        }
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
        isStreaming: false,
      }));
    }
  }, []);

  return { state, analyze };
}
