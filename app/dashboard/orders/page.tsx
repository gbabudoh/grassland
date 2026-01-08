import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  const allOrders = await db.query.orders.findMany({
    where: eq(orders.userId, session?.user?.id as string),
    orderBy: desc(orders.createdAt),
    with: {
      items: true
    }
  });

  return (
    <div className="space-y-8 pt-8">
      <div>
         <h1 className="text-3xl font-black uppercase italic tracking-tighter text-gh-charcoal mb-2">
            Acquisition History
         </h1>
         <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40">
            Full record of neural assets deployed to your location.
         </p>
      </div>

      <div className="space-y-4">
        {allOrders.length > 0 ? (
          allOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gh-silver/20 rounded-2xl p-6 space-y-4 shadow-sm">
               <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gh-silver/10 pb-4 gap-4">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-gh-off-white rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-gh-charcoal" />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-gh-charcoal">Order #{order.id}</p>
                        <p className="text-[10px] text-gh-charcoal/40 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className={`px-3 py-1 rounded-full border ${
                        order.status === 'FULLY_PAID' ? 'bg-green-500/10 border-green-500/20 text-green-600' : 
                        order.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600' : 'bg-red-500/10 border-red-500/20 text-red-600'
                     } text-[9px] font-bold uppercase tracking-widest flex items-center gap-2`}>
                        {order.status === 'FULLY_PAID' && <CheckCircle className="h-3 w-3" />}
                        {order.status === 'PENDING' && <Clock className="h-3 w-3" />}
                        {order.status === 'CANCELLED' && <XCircle className="h-3 w-3" />}
                        {order.status}
                     </div>
                     <span className="text-lg font-black text-gh-charcoal italic">${Number(order.totalAmount).toLocaleString()}</span>
                  </div>
               </div>

               <div className="space-y-3 pl-14">
                  {order.items.map((item) => (
                     <div key={item.id} className="flex justify-between items-center text-xs text-gh-charcoal/80">
                        <span className="font-medium">{item.quantity}x {item.name} <span className="text-gh-charcoal/40">({item.size})</span></span>
                        <span>${Number(item.price).toLocaleString()}</span>
                     </div>
                  ))}
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-gh-silver/20 border-dashed rounded-3xl">
             <Package className="h-12 w-12 text-gh-charcoal/20 mx-auto mb-4" />
             <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40">No acquisitions recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}
