"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Layers, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard,
  Tag,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin" },
  { name: "Banners", icon: Layers, href: "/admin/banners" },
  { name: "Products", icon: ShoppingBag, href: "/admin/products" },
  { name: "Categories", icon: Tag, href: "/admin/categories" },
  { name: "Orders", icon: BarChart3, href: "/admin/orders" },
  { name: "Journal", icon: BookOpen, href: "/admin/blog" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Simple mock auth check
    const isAuth = localStorage.getItem("admin_session");
    if (!isAuth && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gh-white flex">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 h-14 w-14 bg-gh-charcoal text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-gh-charcoal transform transition-transform duration-300 ease-in-out border-r border-white/5 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-12">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-lg font-black uppercase tracking-tighter text-white">Grassland</span>
                <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/30 -mt-1">Admin Pro</span>
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                    isActive 
                    ? "bg-white text-gh-charcoal" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <div className="p-4 bg-white/5 rounded-2xl mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-white/20 to-white/5 border border-white/10" />
                <div>
                  <span className="block text-[9px] font-black uppercase text-white tracking-widest">Admin User</span>
                  <span className="block text-[7px] font-bold uppercase text-white/30 tracking-widest">Master Archive</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Engage Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gh-silver/20 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/30">System Status:</span>
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal">Grassland Link Active</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex flex-col text-right">
                <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 line-clamp-1">Last Sync: 2m ago</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal">v4.2.0-stable</span>
             </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
