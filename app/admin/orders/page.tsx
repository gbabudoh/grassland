"use client";

import { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  CreditCard,
  User,
  Calendar,
  Eye,
  ArrowUpRight,
  Package,
  Truck,
  XCircle,
  X,
  MapPin,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: number;
  status: "PENDING" | "DEPOSIT_PAID" | "FULLY_PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  type: "NORMAL" | "PRE_ORDER";
  items: number;
}

const mockOrders: Order[] = [
  { 
    id: "ORD-9421-X", 
    customer: "Julian Thorne", 
    email: "j.thorne@neural.link",
    date: "2026-01-07",
    amount: 490.00,
    status: "PENDING",
    type: "NORMAL",
    items: 2
  },
  { 
    id: "ORD-9422-Y", 
    customer: "Aria Voss", 
    email: "aria.v@archive.io",
    date: "2026-01-06",
    amount: 1245.00,
    status: "DEPOSIT_PAID",
    type: "PRE_ORDER",
    items: 1
  },
  { 
    id: "ORD-9423-Z", 
    customer: "Soren Koda", 
    email: "koda@gh-labs.com",
    date: "2026-01-05",
    amount: 860.00,
    status: "FULLY_PAID",
    type: "NORMAL",
    items: 3
  },
  { 
    id: "ORD-9424-A", 
    customer: "Elena Miles", 
    email: "e.miles@velocity.net",
    date: "2026-01-04",
    amount: 195.00,
    status: "SHIPPED",
    type: "NORMAL",
    items: 1
  },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  DEPOSIT_PAID: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  FULLY_PAID: "bg-green-500/10 text-green-500 border-green-500/20",
  SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  DELIVERED: "bg-gh-charcoal text-white border-gh-charcoal",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && o.status === statusFilter;
  });

  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const calculateTotalVolume = () => {
    // Filter for today's orders (mocked for demo as all orders)
    return orders.length; 
  };

  const calculateTotalValue = () => {
    return orders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
  };

  return (
    <>
      <div className="space-y-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Logistics Pipeline</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
              Sequence <br /> Fulfillment
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="p-6 bg-white border border-gh-silver/20 rounded-3xl min-w-[200px]">
                <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 mb-3">Today&#39;s Volume</span>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black tracking-tighter leading-none text-gh-charcoal">{calculateTotalVolume()}</span>
                  <ArrowUpRight className="h-5 w-5 mb-1 text-green-500" />
                </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH BY ORDER ID OR CUSTOMER..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gh-silver/20 py-5 pl-14 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal/20 transition-all shadow-sm"
              />
          </div>
          <div className="flex flex-wrap gap-2">
              {["ALL", "PENDING", "FULLY_PAID", "SHIPPED"].map(f => (
                <button 
                    key={f} 
                    onClick={() => setStatusFilter(f)}
                    className={`px-6 py-4 border rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      statusFilter === f
                      ? "bg-gh-charcoal text-white border-gh-charcoal shadow-lg hover:scale-105"
                      : "bg-white text-gh-charcoal/40 border-gh-silver/20 hover:text-gh-charcoal hover:border-gh-charcoal/20"
                    }`}
                >
                    {f.replace('_', ' ')}
                </button>
              ))}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order, i) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedOrder(order)}
                className="bg-white p-2 rounded-[32px] border border-gh-silver/20 group hover:border-gh-charcoal/20 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 relative z-10">
                    {/* Identity */}
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="h-16 w-16 rounded-2xl bg-gh-silver/10 flex items-center justify-center border border-gh-silver/20 shrink-0 group-hover:bg-gh-charcoal group-hover:text-white transition-colors">
                          <ShoppingBag className="h-6 w-6 text-gh-charcoal/30 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[11px] font-black uppercase tracking-tighter text-gh-charcoal leading-none">{order.id}</span>
                            <span className={`px-2 py-0.5 border rounded text-[7px] font-black uppercase tracking-widest ${order.type === "PRE_ORDER" ? "bg-gh-charcoal text-white border-gh-charcoal" : "bg-gh-silver/10 text-gh-charcoal/40 border-gh-silver/20"}`}>
                                {order.type.replace('_', '-')}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60 flex items-center gap-1.5">
                                <User className="h-3 w-3" /> {order.customer}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/30 flex items-center gap-1.5 border-l border-gh-silver/20 pl-4">
                                <Calendar className="h-3 w-3" /> {order.date}
                            </span>
                          </div>
                      </div>
                    </div>

                    {/* Status & Amount */}
                    <div className="flex items-center gap-12 w-full lg:w-auto">
                      <div>
                          <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/60 mb-2">Sync Status</span>
                          <span className={`px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${statusStyles[order.status]}`}>
                            {order.status === "PENDING" && <Clock className="h-3 w-3" />}
                            {order.status === "FULLY_PAID" && <CheckCircle2 className="h-3 w-3" />}
                            {order.status === "SHIPPED" && <Truck className="h-3 w-3" />}
                            {order.status === "DELIVERED" && <Package className="h-3 w-3" />}
                            {order.status === "CANCELLED" && <XCircle className="h-3 w-3" />}
                            {order.status.split('_').join(' ')}
                          </span>
                      </div>

                      <div>
                          <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/60 mb-2">Total Value</span>
                          <span className="text-xl font-black text-gh-charcoal">${order.amount.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-3">
                          <button 
                            className="h-12 w-12 rounded-2xl bg-gh-silver/10 flex items-center justify-center border border-transparent hover:border-gh-charcoal/20 hover:bg-white transition-all cursor-pointer"
                            title="View order details"
                          >
                            <Eye className="h-4 w-4 text-gh-charcoal" />
                          </button>
                          <div className="h-12 w-12 rounded-2xl bg-gh-charcoal text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                      </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Logistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-gh-silver/20">
          <div className="p-8 bg-gh-charcoal text-white rounded-[40px] flex items-center gap-8 shadow-2xl">
              <div className="h-16 w-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                <CreditCard className="h-8 w-8 opacity-40" />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2 text-white">Speculative Value</h4>
                <span className="text-4xl font-black tracking-tighter leading-none">${calculateTotalValue()}</span>
              </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#FAFAFA] shadow-2xl border-l border-gh-silver/20 overflow-y-auto"
            >
              <div className="p-12 min-h-screen relative">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gh-silver/10 transition-all text-gh-charcoal/40 hover:text-gh-charcoal cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 mb-3 block">Order Manifest</span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-gh-charcoal mb-2">
                    {selectedOrder.id}
                  </h2>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60 flex items-center gap-2">
                        <Calendar className="h-3 w-3" /> {selectedOrder.date}
                     </span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60 flex items-center gap-2 border-l border-gh-silver/20 pl-4">
                        <Package className="h-3 w-3" /> {selectedOrder.items} Items
                     </span>
                  </div>
                </div>

                <div className="space-y-8">
                   {/* Status Control */}
                   <div className="bg-white p-8 rounded-3xl border border-gh-silver/20">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-6">Fulfillment Status</h3>
                      <div className="flex flex-wrap gap-3">
                         {["PENDING", "DEPOSIT_PAID", "FULLY_PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => (
                           <button
                             key={s}
                             onClick={() => updateStatus(selectedOrder.id, s as Order["status"])}
                             className={`px-4 py-3 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                               selectedOrder.status === s 
                                 ? statusStyles[s] 
                                 : "bg-gh-silver/5 text-gh-charcoal/30 border-transparent hover:bg-gh-silver/10"
                             }`}
                           >
                             {s.replace('_', ' ')}
                           </button>
                         ))}
                      </div>
                   </div>

                   {/* Customer Info */}
                   <div className="bg-white p-8 rounded-3xl border border-gh-silver/20">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-6">Recipient Identity</h3>
                      <div className="flex items-start gap-6">
                         <div className="h-14 w-14 rounded-2xl bg-gh-charcoal flex items-center justify-center text-white text-lg font-black">
                            {selectedOrder.customer.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div className="space-y-4 flex-1">
                            <div>
                               <span className="block text-[11px] font-black uppercase text-gh-charcoal">{selectedOrder.customer}</span>
                               <span className="flex items-center gap-2 text-[9px] font-bold text-gh-charcoal/40 mt-1">
                                  <Mail className="h-3 w-3" /> {selectedOrder.email}
                               </span>
                            </div>
                            <div className="pt-4 border-t border-gh-silver/10">
                               <span className="block text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 mb-2">Shipping Destination</span>
                               <div className="flex items-start gap-2 text-gh-charcoal/70">
                                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                  <p className="text-xs font-medium leading-relaxed">
                                     42 Velocity Axis, Sector 7<br />
                                     Neo-Tokyo, NT 90210<br />
                                     Pacific Rim Alliance
                                  </p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Order Items Mockup */}
                   <div className="bg-white p-6 rounded-3xl border border-gh-silver/20">
                      <div className="flex items-center justify-between py-4 border-b border-gh-silver/10">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-gh-silver/10 rounded-lg" />
                            <div>
                               <span className="block text-[10px] font-black uppercase tracking-widest text-gh-charcoal">V2-Stealth Runner</span>
                               <span className="block text-[8px] font-bold text-gh-charcoal/40">Size: US 10 • Qty: 1</span>
                            </div>
                         </div>
                         <span className="text-sm font-black text-gh-charcoal">$490.00</span>
                      </div>
                      <div className="flex items-center justify-between py-4 text-xs font-medium text-gh-charcoal/60">
                         <span>Subtotal</span>
                         <span>${selectedOrder.amount.toFixed(2)}</span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 mt-8 sticky bottom-8">
                   <button className="flex-1 py-4 bg-gh-charcoal text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl cursor-pointer">
                      Print Manifest
                   </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
