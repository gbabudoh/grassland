"use client";

import { motion } from "framer-motion";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface BadgeGalleryProps {
  allBadges: Badge[];
  userBadgeIds: string[];
}

export default function BadgeGallery({ allBadges, userBadgeIds }: BadgeGalleryProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Achievement Gallery</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Neural Accomplishments</p>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <span className="text-xs font-black text-white">{userBadgeIds.length} / {allBadges.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {allBadges.map((badge, idx) => {
          const isUnlocked = userBadgeIds.includes(badge.id);
          return (
            <motion.div 
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col items-center"
            >
              <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(234,179,8,0.3)] border-2 border-yellow-300/50' 
                  : 'bg-white/5 grayscale opacity-20 border border-white/10'
              }`}>
                <span className="text-4xl filter drop-shadow-lg">{badge.icon}</span>
                
                {/* Glow Effect */}
                {isUnlocked && (
                    <div className="absolute inset-0 rounded-full animate-pulse bg-yellow-400/20 blur-xl" />
                )}
              </div>
              
              <p className={`mt-4 text-[10px] font-black uppercase tracking-widest text-center ${
                  isUnlocked ? 'text-white' : 'text-white/20'
              }`}>
                {badge.name}
              </p>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <div className="bg-white text-black p-4 rounded-2xl w-48 shadow-2xl relative">
                  <p className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-1">{badge.category}</p>
                  <p className="text-xs font-black uppercase leading-tight mb-2">{badge.name}</p>
                  <p className="text-[10px] font-bold leading-relaxed opacity-70">{badge.description}</p>
                  {!isUnlocked && (
                      <p className="mt-3 pt-3 border-t border-black/10 text-[9px] font-black text-red-500 uppercase italic">Locked Transmission</p>
                  )}
                  {/* Arrow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
