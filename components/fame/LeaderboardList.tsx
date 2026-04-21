"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Flame } from "lucide-react";

export interface LeaderboardUser {
  name: string | null;
  fameCode: string | null;
  famePoints: number;
  fameRank: string;
  currentStreak: number;
}

export default function LeaderboardList({ leaders }: { leaders: LeaderboardUser[] }) {
  return (
    <div className="space-y-4">
      {leaders.map((user, index) => (
        <motion.div
          key={user.fameCode || `leader-${index}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link 
            href={`/fame-network/${user.fameCode || 'unknown'}`}
            className={`flex items-center justify-between p-6 rounded-3xl border transition-all hover:scale-[1.02] active:scale-98 ${
              index === 0 
                ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)]' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-8">
              <div className="relative">
                <span className={`text-2xl font-black italic ${
                  index === 0 ? 'text-yellow-500' : index < 3 ? 'text-white' : 'text-white/20'
                }`}>
                  #{index + 1}
                </span>
                {index === 0 && (
                    <Trophy className="absolute -top-6 -left-4 text-yellow-500 w-6 h-6 -rotate-12" />
                )}
              </div>

              <div>
                <p className="font-black text-xl uppercase italic text-white tracking-tighter">
                  {user.name || user.fameCode}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] text-white/30 font-mono uppercase tracking-widest">{user.fameCode}</span>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[9px] text-yellow-500 font-black uppercase tracking-widest">{user.fameRank}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="text-right hidden sm:block">
                <div className="flex items-center justify-end gap-2 text-orange-500">
                  <Flame size={14} />
                  <span className="text-sm font-black italic">{user.currentStreak}</span>
                </div>
                <p className="text-[8px] text-white/20 uppercase font-black tracking-widest mt-1">Daily Streak</p>
              </div>

              <div className="text-right min-w-[80px]">
                <p className="text-2xl font-black text-white tracking-tighter">{user.famePoints.toLocaleString()}</p>
                <p className="text-[8px] text-white/20 uppercase font-black tracking-widest">GF Points</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
