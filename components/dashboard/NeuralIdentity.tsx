"use client";

import { motion } from "framer-motion";
import { Fingerprint, Cpu, Zap, Activity } from "lucide-react";

interface User {
  name?: string | null;
  email?: string | null;
}

export default function NeuralIdentity({ user }: { user: User | undefined | null }) {
  return (
    <div className="bg-[#2C2C2C] border border-[#2C2C2C] rounded-2xl p-8 relative overflow-hidden group shadow-lg">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Fingerprint className="h-32 w-32 text-white" />
      </div>

      <div className="relative z-10">
         <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-white text-[#2C2C2C] border border-white/20 flex items-center justify-center">
               <span className="text-xl font-black">{user?.name?.[0] || "U"}</span>
            </div>
            <div>
               <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">{user?.name || "Anonymous User"}</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{user?.email}</p>
            </div>
         </div>

         <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-white/70" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Style Algorithm</span>
               </div>
               <span className="text-xs font-black text-white">VELOCITY_HYBRID_V2</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
               <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-white/70" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">G-Club Rank</span>
               </div>
               <span className="text-xs font-black text-white px-2 py-1 bg-white/10 rounded border border-white/10">INITIATE</span>
            </div>
         </div>

         <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
               <Activity className="h-3 w-3 text-green-400" />
               <span className="text-[9px] font-bold uppercase tracking-widest text-green-400">Neural Sync Active</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "60%" }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 className="h-full bg-white" 
               />
            </div>
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-2 text-right">XP to Next Rank</p>
         </div>
      </div>
    </div>
  );
}
