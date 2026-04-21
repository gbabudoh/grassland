"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import { Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

interface FameCardProps {
  user: {
    name: string;
    fameCode: string;
    famePoints: number;
    fameRank: string;
    currentStreak: number;
    isSquadLeader: boolean;
  };
}

export default function FameCard({ user }: FameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `GRASSLAND-FAME-${user.fameCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  const profileUrl = `${window.location.origin}/fame-network/${user.fameCode}`;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* THE ACTUAL CARD */}
      <div 
        ref={cardRef} 
        className="w-[380px] h-[580px] bg-black p-1 rounded-[2.5rem] relative overflow-hidden group shadow-2xl border border-white/10"
      >
        {/* Holographic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10 opacity-50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/20 rounded-full blur-[80px]" />
        
        <div className="relative h-full flex flex-col p-8 justify-between border border-white/10 rounded-[2.3rem] bg-black/40 backdrop-blur-sm">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-black italic tracking-tighter text-white">GRASSLAND</h3>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-yellow-500">Signal Verified</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 ${
                user.fameRank === 'HALL_OF_FAME' ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 text-white'
            }`}>
              {user.fameRank}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4">
            <p className="text-white/30 text-[10px] font-mono mb-1">{user.fameCode}</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white leading-none">
              {user.name || "UNNAMED"}
            </h2>
            {user.isSquadLeader && (
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-[10px]">🎖️</div>
                    <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest">Squad Leader</span>
                </div>
            )}
          </div>

          {/* QR CODE SECTION */}
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-[2rem] shadow-inner">
            <QRCodeSVG 
              value={profileUrl} 
              size={180} 
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              includeMargin={false}
            />
            <p className="text-black text-[8px] font-black mt-4 uppercase tracking-[0.3em] opacity-50">
              Scan to Verify Rank
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Fame Points</p>
              <p className="text-2xl font-black text-white">{user.famePoints.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-1">Active Streak</p>
              <p className="text-2xl font-black text-white">{user.currentStreak} <span className="text-orange-500 text-lg">🔥</span></p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[7px] tracking-[0.5em] text-white/20 uppercase font-black">
              ://grasslandsports.com/network
            </p>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4">
        <button 
          onClick={downloadCard}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-yellow-500 transition-all uppercase tracking-widest text-[10px] active:scale-95 group"
        >
          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
          Download ID
        </button>
        <button 
          onClick={() => {
              if (navigator.share) {
                  navigator.share({
                      title: 'My Grassland Fame Rank',
                      text: `Check out my rank on the Grassland Fame Network!`,
                      url: profileUrl,
                  });
              }
          }}
          className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px] active:scale-95"
        >
          <Share2 size={16} />
          Broadcast
        </button>
      </div>
    </div>
  );
}
