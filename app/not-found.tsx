import Link from 'next/link';
import { ArrowLeft, Compass, ShoppingBag, Globe } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gh-charcoal/5 text-gh-charcoal/60 text-sm font-medium mb-6">
              <Compass className="w-4 h-4" />
              <span>COORDINATES LOST</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-gh-charcoal mb-6 leading-tight">
              404 <span className="text-gh-charcoal/20">.</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-gh-charcoal/40 mb-8 font-outfit uppercase tracking-wider">
              Lost in the Grassland?
            </p>
            
            <p className="text-lg text-gh-charcoal/70 mb-12 max-w-md leading-relaxed">
              The trail you&apos;re looking for doesn&apos;t exist. Maybe it was a mirage, or maybe we&apos;ve moved to higher ground.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gh-charcoal text-white rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-gh-charcoal/20"
              >
                <ArrowLeft className="w-5 h-5" />
                Return to Core
              </Link>
              
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-gh-charcoal/20 text-gh-charcoal rounded-full font-semibold hover:bg-gh-charcoal/5 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Gear
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="holographic-card rounded-[32px] p-8 aspect-square flex items-center justify-center relative animate-pulse-glitch overflow-hidden">
               {/* Decorative Background Elements */}
               <div className="absolute inset-0 bg-gradient-to-br from-gh-mint/20 to-transparent" />
               <div className="scan-line" />
               
               <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <Globe className="w-48 h-48 text-gh-charcoal/5 mb-8" />
                  <div className="text-center">
                    <div className="text-sm font-mono text-gh-charcoal/30 mb-2">SCANNING FOR NEW ROUTES...</div>
                    <div className="h-1 w-32 bg-gh-charcoal/10 rounded-full overflow-hidden mx-auto">
                      <div className="h-full bg-gh-charcoal animate-[scan_2s_infinite]" style={{ width: '40%' }} />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gh-charcoal/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-tighter">Exploration</h4>
            <ul className="space-y-2 text-gh-charcoal/60">
              <li><Link href="/innovation" className="hover:text-gh-charcoal">Innovation Lab</Link></li>
              <li><Link href="/fame-network" className="hover:text-gh-charcoal">Fame Network</Link></li>
              <li><Link href="/sustainability" className="hover:text-gh-charcoal">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-tighter">Support</h4>
            <ul className="space-y-2 text-gh-charcoal/60">
              <li><Link href="/faq" className="hover:text-gh-charcoal">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-gh-charcoal">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-gh-charcoal">Returns</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
