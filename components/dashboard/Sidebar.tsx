"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  MapPin, 
  LogOut, 
  Zap,
  LayoutGrid
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutGrid, label: "Neural Overview", href: "/dashboard" },
  { icon: ShoppingBag, label: "Acquisition History", href: "/dashboard/orders" },
  { icon: MapPin, label: "Spatial Coordinates", href: "/dashboard/profile" },
  { icon: Zap, label: "G-Club Status", href: "/dashboard/club" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-gh-silver/20 bg-white h-screen fixed left-0 top-0 p-6 flex flex-col justify-between z-20 shadow-sm">
      <div>
        <div className="mb-12 pl-2">
           <h1 className="text-xl font-black uppercase italic tracking-tighter text-gh-charcoal">
              Neural<span className="text-gh-charcoal/40">ID</span>
           </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-gh-charcoal text-white shadow-md' : 'text-gh-charcoal/60 hover:text-gh-charcoal hover:bg-gh-off-white'}`}>
                  <item.icon className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div>
        <button 
           onClick={() => signOut({ callbackUrl: "/login" })}
           className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
           <LogOut className="h-4 w-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </div>
  );
}
