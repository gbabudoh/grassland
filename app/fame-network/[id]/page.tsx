"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, User, Award, Globe, Zap } from "lucide-react";

export default function MemberProfilePage() {
  const params = useParams();
  const memberId = params.id;

  // Mock data - in production this would fetch based on memberId
  const member = {
    name: "Dr. Godwin",
    tier: "ARCHITECT",
    rank: 1,
    joined: "2024-01-15",
    location: "Global HG, Grassland",
    bio: "Pioneering the neural connection between biological movement and digital textiles. Lead architect of the G1 Series.",
    badges: ["Founder", "Visionary", "Eco-Warrior"],
    gear: [
      { name: "G1 Pro", date: "2024-02-01", serial: "GL-883-X9" },
      { name: "Neural Hoodie", date: "2024-03-15", serial: "GL-NH-001" },
      { name: "Stealth Runner", date: "2024-05-10", serial: "GL-SR-442" }
    ],
    stats: {
      referrals: 124,
      points: "125.4K",
      impact: "High"
    }
  };

  const isArchitect = member.tier === "ARCHITECT";
  const tierColor = isArchitect ? "text-yellow-400" : "text-green-400";
  const tierBg = isArchitect ? "bg-yellow-500/10" : "bg-green-500/10";
  const tierBorder = isArchitect ? "border-yellow-500/20" : "border-green-500/20";

  return (
    <div className="min-h-screen bg-gh-charcoal text-white pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/fame-network"
          className="group inline-flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Return to Constellation
        </Link>
        
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Left Column: ID Card */}
          <div className="lg:col-span-1">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-10 relative overflow-hidden backdrop-blur-xl"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex flex-col items-center text-center">
                   <div className="h-40 w-40 rounded-full bg-gradient-to-br from-white/10 to-black border-2 border-white/20 mb-8 flex items-center justify-center relative group">
                      <User className="h-16 w-16 text-white/50 group-hover:text-white transition-colors" />
                      <div className="absolute bottom-2 right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                         <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                      </div>
                   </div>
                   
                   <div className="mb-4 flex flex-col items-center">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">
                        Signal ID: {memberId}
                    </span>
                   </div>
                   
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border mb-6 ${tierBg} ${tierColor} ${tierBorder}`}>
                      {member.tier} Class
                   </span>
                   
                   <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-4">
                      {member.name}
                   </h1>
                   
                   <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      <span className="flex items-center gap-2">
                         <Globe className="h-3 w-3" /> {member.location}
                      </span>
                   </div>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                   <div className="text-center">
                      <span className="block text-2xl font-black text-white">{member.stats.referrals}</span>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-white/30">Network</span>
                   </div>
                   <div className="text-center border-l border-white/10 border-r">
                      <span className="block text-2xl font-black text-white">{member.stats.points}</span>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-white/30">Score</span>
                   </div>
                   <div className="text-center">
                      <span className="block text-2xl font-black text-white">{member.stats.impact}</span>
                      <span className="block text-[8px] font-bold uppercase tracking-widest text-white/30">Impact</span>
                   </div>
                </div>
             </motion.div>

             <div className="mt-8 flex flex-col gap-4">
                <button className="w-full py-4 rounded-2xl bg-white text-gh-charcoal text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                   <Zap className="h-4 w-4" /> Connect Signal
                </button>
             </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-16">
             {/* Bio Section */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-[1px] w-12 bg-white/30" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Neural Profile</span>
                </div>
                <p className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed max-w-2xl">
                   {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                   {member.badges.map((badge, i) => (
                      <div key={i} className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                         <Award className="h-4 w-4 text-white/60" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{badge}</span>
                      </div>
                   ))}
                </div>
             </motion.div>

             {/* Gear Section */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
             >
                <div className="flex items-center gap-4 mb-8">
                   <div className="h-[1px] w-12 bg-white/30" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Verified Inventory</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {member.gear.map((item, i) => (
                      <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                         <div className="flex items-center justify-between mb-4">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{item.date}</span>
                         </div>
                         <h3 className="text-lg font-black uppercase tracking-wider text-white mb-1 group-hover:text-green-400 transition-colors">{item.name}</h3>
                         <span className="text-[10px] font-mono text-white/40">SN: {item.serial}</span>
                      </div>
                   ))}
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
