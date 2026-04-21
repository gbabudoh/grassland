import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, count, eq, gt } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FameSearch from "@/components/fame/FameSearch";
import LeaderboardList, { LeaderboardUser } from "@/components/fame/LeaderboardList";
import ConstellationBackground from "@/components/fame/ConstellationBackground";
import DailyRewardPopup from "@/components/fame/DailyRewardPopup";
import { Trophy, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { generateFameCode } from "@/lib/fame/utils";

export const revalidate = 3600; // Cache for 1 hour

export default async function FameNetworkPage() {
  const session = await getServerSession(authOptions);
  
  // Parallel fetch for dashboard data
  const [topLeadersRows, totalMembers, currentUser] = await Promise.all([
    db.query.users.findMany({
      where: gt(users.famePoints, 0),
      orderBy: [desc(users.famePoints)],
      limit: 5,
    }),
    db.select({ value: count() }).from(users),
    session?.user?.id ? db.query.users.findFirst({ where: eq(users.id, session.user.id) }) : null
  ]);

  // Auto-generate fame code if missing or invalid (e.g. stored as literal "null")
  const isValidFameCode = (code: string | null | undefined) =>
    !!code && code.startsWith("G-FAME-");

  let displayUser = currentUser;
  if (currentUser && !isValidFameCode(currentUser.fameCode)) {
    const newCode = generateFameCode(currentUser.id);
    await db.update(users).set({ 
        fameCode: newCode,
        updatedAt: new Date()
    }).where(eq(users.id, currentUser.id));
    displayUser = { ...currentUser, fameCode: newCode };
  }

  const topLeaders = topLeadersRows as LeaderboardUser[];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-yellow-500 selection:text-black">
      <ConstellationBackground />
      {displayUser && <DailyRewardPopup userId={displayUser.id} />}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Neural Loyalty Protocol v2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9] mb-8">
            The Fame <br /> <span className="text-yellow-500">Network</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-white/40 text-sm md:text-base leading-relaxed mb-12">
            Establish your legacy in the Grassland Ecosystem. Track your performance, 
            unlock exclusive gear, and climb the global leaderboard to become a Legend.
          </p>

          <FameSearch />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="relative py-20 px-8 z-10 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Global Reach */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:border-yellow-500/30 transition-all">
              <Users className="w-10 h-10 text-white/20 mb-6 group-hover:text-yellow-500 transition-colors" />
              <h3 className="text-4xl font-black tracking-tighter mb-1">{(totalMembers[0]?.value || 0).toLocaleString()}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Active Nodes Connected</p>
            </div>

            {/* User Personal Hub or Call to Action */}
            <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-gradient-to-br from-yellow-500/20 to-transparent border border-yellow-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
              {displayUser ? (
                <>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-3xl shadow-[0_0_40px_rgba(234,179,8,0.3)]">
                      {displayUser.name?.[0] || "G"}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-1">Authenticated Member</p>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter">{displayUser.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-white/60">{displayUser.famePoints.toLocaleString()} GF</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-xs font-bold text-yellow-500">{displayUser.fameRank}</span>
                      </div>
                    </div>
                  </div>
                  {isValidFameCode(displayUser.fameCode) ? (
                    <Link 
                        href={`/fame-network/${displayUser.fameCode}`}
                        className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-yellow-500 transition-all uppercase tracking-widest text-[10px] flex items-center gap-3 whitespace-nowrap"
                    >
                        View My Wall <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <div className="px-8 py-4 bg-white/10 text-white/40 font-black rounded-2xl uppercase tracking-widest text-[10px] animate-pulse cursor-wait">
                        Generating Identity...
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Claim Your Identity</h3>
                    <p className="text-sm text-white/60">Join the network to start earning points and unlocking ranks.</p>
                  </div>
                  <Link 
                    href="/login"
                    className="px-8 py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Initialize Connection
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="relative py-32 px-8 z-10 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <Trophy className="w-12 h-12 text-yellow-500 mb-6" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Fame <span className="text-white/20">Legends</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-2">Top Performing Athletes Worldwide</p>
            </div>
            <Link href="/fame-network/leaderboard" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1">
              View Full Rankings
            </Link>
          </div>

          {topLeaders.length > 0 ? (
            <LeaderboardList leaders={topLeaders} />
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-[3rem]">
                <p className="text-white/20 font-black uppercase tracking-widest text-xs">Waiting for the first legend to rise</p>
                <p className="text-[10px] text-white/10 uppercase mt-2">Earn points to claim your spot on the wall</p>
            </div>
          )}
        </div>
      </section>

      {/* Rewards Teaser */}
      <section className="relative py-32 px-8 z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-16">
                Status has its <span className="text-yellow-500">Privileges</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { title: "Rookie", desc: "Access to the Network hub and profile.", color: "white/10" },
                    { title: "Pro", desc: "Unlock early access to apparel drops.", color: "blue-500/20" },
                    { title: "All-Star", desc: "10% lifetime discount on footwear.", color: "purple-500/20" },
                    { title: "Legend", desc: "Exclusive Hall of Fame kit claim.", color: "yellow-500/20" },
                ].map((tier, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] bg-${tier.color} border border-white/10 text-left`}>
                        <h4 className="text-xl font-black uppercase italic mb-4">{tier.title}</h4>
                        <p className="text-xs text-white/40 leading-relaxed">{tier.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer Instructions */}
      <div className="relative py-12 px-8 z-10 text-center border-t border-white/5">
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            Grassland Sports Division • Distributed Performance Network • 2026
         </span>
      </div>
    </div>
  );
}
