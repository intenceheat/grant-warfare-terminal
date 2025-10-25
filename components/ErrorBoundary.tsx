'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[50vh] px-4">
          <div className="text-center p-8 md:p-12 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-red-500/20 max-w-md mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="font-space-grotesk text-xl md:text-2xl font-bold tracking-wider text-red-500 mb-2">
              SYSTEM ERROR
            </h3>
            <p className="font-space-grotesk text-sm text-void-text-secondary mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-4 py-2 mx-auto rounded-lg font-space-grotesk font-semibold tracking-wider bg-red-500/20 text-red-500 border border-red-500/60 hover:bg-red-500/30 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">RETRY</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
