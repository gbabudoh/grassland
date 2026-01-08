import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { ghfMembership } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Zap, Shield, Key } from "lucide-react";

export default async function ClubPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) return null; // Safety check
  
  const membership = await db
    .select()
    .from(ghfMembership)
    .where(eq(ghfMembership.userId, session?.user?.id as string))
    .limit(1);

  const isMember = membership.length > 0;

  return (
    <div className="max-w-4xl">
      <div className="mb-12 text-center">
         <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white mb-4">
            G-Club <span className="text-gh-silver/40">Access</span>
         </h1>
         <p className="text-xs font-bold uppercase tracking-widest text-white/40 max-w-xl mx-auto leading-relaxed">
            The inner circle of Grassland. Exclusive drops, early prototyping access, and lifetime benefits for the neural elite.
         </p>
      </div>

      {isMember ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 relative overflow-hidden text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-yellow-400/10 rounded-full border border-yellow-400/20 mb-4">
                 <Zap className="h-8 w-8 text-yellow-400" />
              </div>
              
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                 Status: <span className="text-yellow-400">Active Agent</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
                 <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-2">Rank</p>
                    <p className="text-xl font-black text-white italic">INITIATE</p>
                 </div>
                 <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-2">Member ID</p>
                    <p className="text-xl font-black text-white italic">#{membership[0].id.toString().padStart(4, '0')}</p>
                 </div>
                 <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-2">Perk</p>
                    <p className="text-xl font-black text-white italic">EARLY ACCESS</p>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                 <p className="text-[10px] text-white/40 uppercase tracking-widest">
                    Lifetime Discount Code will be generated upon reaching ADEPT rank.
                 </p>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
              <div>
                 <Shield className="h-8 w-8 text-white mb-6" />
                 <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2">Member Rights</h3>
                 <ul className="space-y-4 mt-6">
                    {['Priority Manufacturing', 'Secret Archive Access', 'Voting Rights on Designs', 'Annual Gift Box'].map((item) => (
                       <li key={item} className="flex items-center gap-3 text-xs font-medium text-white/60">
                          <div className="h-1.5 w-1.5 bg-white rounded-full" />
                          {item}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="bg-gradient-to-br from-white to-gh-charcoal rounded-3xl p-1 p-px">
              <div className="bg-black rounded-[23px] h-full p-8 flex flex-col items-center justify-center text-center space-y-6">
                 <Key className="h-12 w-12 text-white" />
                 <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Unlock Access</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Joining Fee: One-time Verification</p>
                 </div>
                 <button className="bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform w-full">
                    Initiate Sequence
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
