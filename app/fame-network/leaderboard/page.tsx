import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, gt } from "drizzle-orm";
import LeaderboardList, { LeaderboardUser } from "@/components/fame/LeaderboardList";
import ConstellationBackground from "@/components/fame/ConstellationBackground";
import { Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

export default async function LeaderboardPage() {
  const topLegends = await db.query.users.findMany({
    where: gt(users.famePoints, 0),
    orderBy: [desc(users.famePoints)],
    limit: 50,
  }) as LeaderboardUser[];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
      <ConstellationBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-32">
        <Link href="/fame-network" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-12">
            <ArrowLeft size={14} /> Back to Hub
        </Link>

        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-4xl mb-8 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
            🏆
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Global <br /> <span className="text-yellow-500">Rankings</span>
          </h1>
          <p className="max-w-md text-white/40 text-sm leading-relaxed">
            The top 50 performing nodes in the Grassland Distributed Network. 
            Points are awarded for gear acquisition, activity, and recruitment.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[3rem] border border-white/10">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Node Identity</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Fame Metric</span>
          </div>
          <div className="p-4">
            {topLegends.length > 0 ? (
                <LeaderboardList leaders={topLegends} />
            ) : (
                <div className="py-32 text-center">
                    <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">The Throne is Empty</p>
                    <p className="text-[10px] text-white/10 uppercase mt-4">Be the first to claim your legend status</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
