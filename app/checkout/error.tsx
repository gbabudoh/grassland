'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Checkout Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="holographic-card max-w-xl w-full p-10 md:p-16 text-center rounded-3xl relative">
        <div className="scan-line" />
        
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center animate-pulse-glitch">
            <AlertCircle className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gh-charcoal font-outfit uppercase tracking-tight">
          Checkout Interrupted
        </h1>
        
        <p className="text-gh-charcoal/70 text-lg mb-10 leading-relaxed">
          We encountered an issue processing your transaction. This could be due to a temporary connection lapse or an expired session.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gh-charcoal text-white rounded-2xl font-bold hover:bg-gh-charcoal/90 transition-all shadow-xl shadow-gh-charcoal/20 active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" />
            Resume Checkout
          </button>
          
          <Link
            href="/cart"
            className="w-full flex items-center justify-center gap-3 px-8 py-5 border border-gh-charcoal/10 text-gh-charcoal rounded-2xl font-bold hover:bg-gh-charcoal/5 transition-all active:scale-[0.98]"
          >
            <ShoppingCart className="w-5 h-5" />
            Review Cart
          </Link>
        </div>

        <div className="mt-12 p-4 bg-gh-charcoal/5 rounded-xl text-left">
          <div className="text-[10px] font-mono text-gh-charcoal/40 uppercase mb-1 tracking-widest">Diagnostic Info</div>
          <div className="text-xs font-mono text-gh-charcoal/60 break-all">
            {error.message || 'Error occurred during secure transaction handshake.'}
          </div>
        </div>
      </div>
    </div>
  );
}
