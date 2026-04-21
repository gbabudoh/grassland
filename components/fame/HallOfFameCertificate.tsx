"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface CertificateProps {
  user: {
    name: string;
    fameCode: string;
    joinedAt: Date;
  };
}

export default function HallOfFameCertificate({ user }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const downloadCert = async () => {
    if (certRef.current === null) return;
    try {
      const dataUrl = await toPng(certRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `HOF-CERTIFICATE-${user.fameCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div 
        ref={certRef}
        className="w-[800px] h-[560px] bg-[#050505] p-1 rounded-[1rem] relative overflow-hidden shadow-2xl border-4 border-yellow-500/20"
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5" />
        
        <div className="relative h-full border-2 border-yellow-500/10 rounded-[0.8rem] flex flex-col items-center justify-between p-20 text-center">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex justify-center mb-6">
                    <Award className="text-yellow-500 w-16 h-16" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.8em] text-yellow-500">Certificate of Induction</h3>
                <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">Hall of Fame</h1>
            </div>

            {/* Body */}
            <div className="space-y-6">
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.4em]">This officially certifies that</p>
                <h2 className="text-5xl font-black uppercase text-white border-b-2 border-yellow-500/20 pb-4 inline-block px-12">
                    {user.name}
                </h2>
                <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed uppercase tracking-widest font-black">
                    Has reached the ultimate tier of the Grassland Distributed Network, 
                    demonstrating unparalleled commitment to performance and community leadership.
                </p>
            </div>

            {/* Footer */}
            <div className="w-full flex justify-between items-end pt-10 border-t border-white/5">
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Date of Induction</p>
                    <p className="text-xs font-mono text-white/60">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</p>
                </div>
                
                <div className="flex flex-col items-center">
                    <ShieldCheck className="text-yellow-500/40 w-12 h-12 mb-2" />
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Protocol Verified</p>
                </div>

                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Signal Hash</p>
                    <p className="text-xs font-mono text-white/60"># {user.fameCode}</p>
                </div>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-yellow-500/30" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-yellow-500/30" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-yellow-500/30" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-yellow-500/30" />
        </div>
      </div>

      <button 
        onClick={downloadCert}
        className="px-12 py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(234,179,8,0.2)] uppercase tracking-widest text-xs flex items-center gap-4"
      >
        <Download size={18} /> Download Official Certificate
      </button>
    </div>
  );
}
