'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="holographic-card max-w-lg w-full p-8 md:p-12 text-center rounded-2xl relative overflow-hidden">
        {/* Decorative scan line */}
        <div className="scan-line" />
        
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse-glitch">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gh-charcoal to-gh-charcoal/60">
          System Error
        </h1>
        
        <p className="text-gh-charcoal/80 text-lg mb-10 leading-relaxed">
          The Grassland neural link encountered an unexpected disruption. Our technicians have been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gh-charcoal text-white rounded-full font-semibold hover:bg-gh-charcoal/90 transition-all active:scale-95 shadow-lg shadow-gh-charcoal/20"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-gh-charcoal/20 text-gh-charcoal rounded-full font-semibold hover:bg-gh-charcoal/5 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="mt-12 text-xs text-gh-charcoal/40 font-mono">
          ERROR_DIGEST: {error.digest || 'N/A'}
        </div>
      </div>
    </div>
  );
}
