"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Flame, Star } from "lucide-react";
import { claimDailyReward } from "@/lib/fame/actions";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function DailyRewardPopup({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [result, setResult] = useState<{ reward: number, newStreak: number, newRank: string } | null>(null);

  useEffect(() => {
    // Check if we should show the popup
    // We could check local storage or just try to claim
    // For this demo, let's just show it if they haven't claimed today
    const checkClaim = async () => {
        // Logic to check if claimed today would go here
        // For now, let's just trigger it manually or on a timer
    };
    
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = async () => {
    setClaiming(true);
    const res = await claimDailyReward(userId);
    
    if (res.success) {
      setResult({ reward: res.reward!, newStreak: res.newStreak!, newRank: res.newRank! });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success(`Claimed ${res.reward} Fame Points!`);
    } else {
      toast.error(res.error || "Failed to claim reward");
      setIsOpen(false);
    }
    setClaiming(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black border border-yellow-500/30 w-full max-w-md rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(234,179,8,0.2)]"
          >
            {!result ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-yellow-500 mx-auto flex items-center justify-center text-black mb-8 shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                  <Zap size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Daily Pulse</h2>
                <p className="text-white/40 text-sm mb-10 leading-relaxed uppercase tracking-widest font-black text-[10px]">
                  Neural connection verified. <br /> Claim your daily engagement bonus.
                </p>
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-yellow-500 transition-all uppercase tracking-widest text-xs active:scale-95 disabled:opacity-50"
                >
                  {claiming ? "Processing..." : "Capture Reward"}
                </button>
              </div>
            ) : (
              <div className="p-12 text-center bg-gradient-to-b from-yellow-500/10 to-transparent">
                <div className="flex justify-center gap-4 mb-8">
                    <div className="flex flex-col items-center">
                        <Flame className="text-orange-500 mb-2" size={24} />
                        <span className="text-2xl font-black">{result.newStreak}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Day Streak</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 mx-4 self-center" />
                    <div className="flex flex-col items-center">
                        <Star className="text-yellow-500 mb-2" size={24} />
                        <span className="text-2xl font-black">+{result.reward}</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/30">GF Points</span>
                    </div>
                </div>
                
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Sync Successful</h2>
                <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-10">Current Rank: {result.newRank}</p>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                >
                  Return to Matrix
                </button>
              </div>
            )}
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
