import { db } from "@/db";
import { users, orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import FameCard from "@/components/fame/FameCard";
import BadgeGallery, { Badge } from "@/components/fame/BadgeGallery";
import ConstellationBackground from "@/components/fame/ConstellationBackground";
import { ShoppingBag, Star, Clock } from "lucide-react";
import Link from "next/link";

export default async function FameMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fameCode = id.toUpperCase();

  const member = await db.query.users.findFirst({
    where: eq(users.fameCode, fameCode),
    with: {
        badges: {
            with: {
                badge: true
            }
        },
        orders: {
            with: {
                items: true
            },
            orderBy: [desc(orders.createdAt)],
            limit: 10
        }
    }
  });

  if (!member) return notFound();

  // Get all badges to show locked ones too
  const allBadgesResult = await db.query.badges.findMany();
  const allBadges = allBadgesResult as Badge[];
  const userBadgeIds = member.badges.map(b => b.badgeId);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
      <ConstellationBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Fame Card & Stats */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <FameCard 
              user={{
                name: member.name || "UNNAMED",
                fameCode: member.fameCode || "",
                famePoints: member.famePoints,
                fameRank: member.fameRank,
                currentStreak: member.currentStreak,
                isSquadLeader: !!member.isSquadLeader,
              }} 
            />

            <div className="mt-12 w-full space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Lifetime Points</p>
                        <p className="text-2xl font-black">{member.famePoints.toLocaleString()} <span className="text-yellow-500 text-xs">GF</span></p>
                    </div>
                    <Star className="text-yellow-500 w-8 h-8 opacity-20" />
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Max Streak</p>
                        <p className="text-2xl font-black">{member.maxStreak} <span className="text-orange-500 text-xs">DAYS</span></p>
                    </div>
                    <Clock className="text-orange-500 w-8 h-8 opacity-20" />
                </div>
            </div>
          </div>

          {/* Right Column: Wall Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Achievement Section */}
            <BadgeGallery 
              allBadges={allBadges} 
              userBadgeIds={userBadgeIds} 
            />

            {/* Gear Collection Section */}
            <section className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Gear Collection</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Verified Inventory</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-white/20" />
                </div>

                <div className="space-y-4">
                    {member.orders.length > 0 ? (
                        member.orders.map((order) => (
                            order.items.map((item, idx) => (
                                <div key={`${order.id}-${idx}`} className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                            {item.category === 'FOOTWEAR' ? '👟' : '👕'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{item.category}</p>
                                            <h4 className="text-lg font-black uppercase italic tracking-tighter">{item.name}</h4>
                                            <p className="text-[10px] font-bold text-white/20 mt-1">Authentic Signature Locked</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-yellow-500 font-black tracking-tighter">VERIFIED</p>
                                        <p className="text-[8px] text-white/20 uppercase font-black tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ))
                    ) : (
                        <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
                            <p className="text-white/20 font-black uppercase tracking-widest text-xs">No gear detected in network</p>
                            <Link href="/shop" className="mt-6 inline-block px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                                Acquire Gear
                            </Link>
                        </div>
                    )}
                </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
