import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { orders, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import NeuralIdentity from "@/components/dashboard/NeuralIdentity";
import { Package, Clock, ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch full user profile to get FN status
  const userProfile = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id as string),
  });

  // Fetch recent orders
  const recentOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session?.user?.id as string))
    .orderBy(desc(orders.createdAt))
    .limit(3);

  const isFnMember = userProfile?.isFnMember;
  const fnTier = userProfile?.fnNetworkTier;

  return (
    <div className="space-y-10 pt-8">
       <div className="flex justify-between items-end mb-2">
          <div>
             <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter text-[#2C2C2C]">Command Center</h1>
                {isFnMember && (
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-black text-white rounded-full border border-black/10">
                      <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-[1px]">FN NETWORK</span>
                   </div>
                )}
             </div>
             <p className="text-[11px] font-bold uppercase tracking-widest text-[#6B6B6B]">Welcome back, Agent {session?.user?.name}</p>
          </div>
          <div className="text-right hidden md:block">
             <div className="flex flex-col items-end">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">Current Session ID</p>
                <p className="font-mono text-xs text-[#4A4A4A] mt-1">SES-8X92-ALPHA</p>
                {isFnMember && (
                   <p className="text-[9px] font-black uppercase tracking-widest text-green-600 mt-2 flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      Signal Active: {fnTier || "PIONEER"}
                   </p>
                )}
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Card */}
          <div className="lg:col-span-1">
             <NeuralIdentity user={session?.user} />
          </div>

          {/* Stats & Orders */}
          <div className="lg:col-span-2 space-y-6">
             {/* Quick Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-[#E5E5E5] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center">
                         <Package className="h-5 w-5 text-[#4A4A4A]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">Total Acquisitions</span>
                   </div>
                   <span className="text-3xl font-black text-[#2C2C2C] italic">{recentOrders.length}</span>
                </div>
                <div className="bg-white border border-[#E5E5E5] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-[#F5F5F5] rounded-xl flex items-center justify-center">
                         <Clock className="h-5 w-5 text-[#4A4A4A]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">Pending Deployments</span>
                   </div>
                   <span className="text-3xl font-black text-[#2C2C2C] italic">
                      {recentOrders.filter(o => o.status === 'PENDING').length}
                   </span>
                </div>
             </div>

             {/* Recent Orders List */}
             <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                   <h3 className="text-sm font-black uppercase tracking-widest text-[#2C2C2C]">Recent Directives</h3>
                   <Link href="/dashboard/orders" className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] hover:text-[#2C2C2C] transition-colors">
                      View All <ArrowUpRight className="h-3 w-3" />
                   </Link>
                </div>

                <div className="space-y-3">
                   {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                         <div key={order.id} className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-xl hover:bg-[#F5F5F5] transition-colors border border-[#F0F0F0]">
                            <div className="flex items-center gap-4">
                               <div className={`h-2 w-2 rounded-full ${order.status === 'PENDING' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                               <div>
                                  <p className="text-xs font-bold text-[#2C2C2C] mb-0.5">Order #{order.id}</p>
                                  <p className="text-[9px] text-[#6B6B6B] uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-xs font-black text-[#2C2C2C]">${Number(order.totalAmount).toLocaleString()}</p>
                               <p className="text-[8px] font-bold uppercase tracking-widest text-[#6B6B6B]">{order.status}</p>
                            </div>
                         </div>
                      ))
                   ) : (
                      <div className="text-center py-12">
                         <p className="text-[10px] font-bold uppercase tracking-widest text-[#ABABAB]">No active directives found.</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
