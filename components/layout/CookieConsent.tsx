"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, CheckCircle2 } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("grassland-cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500); // Delay for better UX
    }
  }, []);

  const handleConsent = (type: "all" | "essential") => {
    localStorage.setItem("grassland-cookie-consent", type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white/80 backdrop-blur-xl border border-gh-charcoal/10 rounded-[32px] p-8 shadow-2xl shadow-gh-charcoal/20 relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gh-charcoal/10 via-gh-charcoal to-gh-charcoal/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
        
        <div className="flex items-start gap-5 mb-8">
          <div className="p-3 bg-gh-charcoal text-white rounded-2xl">
            <Cookie className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gh-charcoal uppercase tracking-tight mb-2">We use cookies</h3>
            <p className="text-sm text-gh-charcoal/60 leading-relaxed font-medium">
              We use cookies to remember your preferences and improve your experience on the Grassland store.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gh-charcoal/20 hover:text-gh-charcoal transition-colors pt-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleConsent("all")}
            className="w-full flex items-center justify-center gap-2 bg-gh-charcoal text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            Accept All Cookies
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleConsent("essential")}
              className="px-4 py-4 border border-gh-charcoal/10 text-gh-charcoal/60 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gh-charcoal/5 transition-all text-center cursor-pointer"
            >
              Essential Only
            </button>
            <Link
              href="/cookie-policy"
              className="px-4 py-4 border border-gh-charcoal/10 text-gh-charcoal/60 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gh-charcoal/5 transition-all text-center flex items-center justify-center cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
