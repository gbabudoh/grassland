"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, ShoppingBag, User, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { useCartStore } from "@/store/useCartStore";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  {
    name: "Men",
    viewAllHref: "/shop?category=men",
    sections: [
      {
        title: "Trends",
        items: [
          { label: "Summer Pulse",    href: "/shop?category=men" },
          { label: "Cross-Breed Era", href: "/shop?category=men" },
          { label: "Carbon Pulse",    href: "/shop?category=men&q=Carbon" },
          { label: "Neon Velocity",   href: "/shop?category=men&q=Velocity" },
        ],
      },
      {
        title: "Versions",
        items: [
          { label: "G1 Series",      href: "/shop/g1-performance-matrix" },
          { label: "Elite Pro",      href: "/shop?category=men" },
          { label: "Tech-Labs",      href: "/innovation" },
          { label: "Heritage Core",  href: "/shop?category=men" },
        ],
      },
      {
        title: "Shoe Names",
        items: [
          { label: "Velocity X",  href: "/shop?category=men&q=Velocity" },
          { label: "Carbon Pro",  href: "/shop?category=men&q=Carbon" },
          { label: "Neural 1",    href: "/shop?category=men&q=Neural" },
          { label: "Terra Form",  href: "/shop?category=men" },
          { label: "Deep Cloud",  href: "/shop?category=men" },
        ],
      },
    ],
  },
  {
    name: "Women",
    viewAllHref: "/shop?category=women",
    sections: [
      {
        title: "Trends",
        items: [
          { label: "Pulse Series", href: "/shop?category=women" },
          { label: "Eco-Active",   href: "/shop?category=women" },
          { label: "Aura Glow",    href: "/shop?category=women" },
          { label: "Zenith",       href: "/shop?category=women" },
        ],
      },
      {
        title: "Versions",
        items: [
          { label: "G1 Series",    href: "/shop/g1-performance-matrix" },
          { label: "Luna Pro",     href: "/shop?category=women" },
          { label: "Active Flow",  href: "/shop?category=women" },
          { label: "Swift Core",   href: "/shop?category=women" },
        ],
      },
      {
        title: "Shoe Names",
        items: [
          { label: "Nebula 1",  href: "/shop?category=women" },
          { label: "Flow Edge", href: "/shop?category=women" },
          { label: "Aether X",  href: "/shop?category=women" },
          { label: "Gaia Pro",  href: "/shop?category=women" },
          { label: "Prism",     href: "/shop?category=women" },
        ],
      },
    ],
  },
  {
    name: "Kids",
    viewAllHref: "/shop?category=kids",
    sections: [
      {
        title: "Trends",
        items: [
          { label: "Jump Force",   href: "/shop?category=kids" },
          { label: "Glow Tech",    href: "/shop?category=kids" },
          { label: "Future Star",  href: "/shop?category=kids" },
        ],
      },
      {
        title: "Versions",
        items: [
          { label: "G1 Junior",        href: "/shop?category=kids" },
          { label: "Mini Pro",         href: "/shop?category=kids" },
          { label: "Playground Core",  href: "/shop?category=kids" },
        ],
      },
      {
        title: "Shoe Names",
        items: [
          { label: "Junior X",     href: "/shop?category=kids" },
          { label: "Little Pulse", href: "/shop?category=kids" },
          { label: "Spark 1",      href: "/shop?category=kids" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const { openSizeAI, openCheckoutAI } = useModalStore();
  const { getTotalItems } = useCartStore();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [storedSize, setStoredSize] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = getTotalItems();

  useEffect(() => {
    // Check initial storage after mount to avoid hydration mismatch and cascading renders
    const checkStorage = () => {
      const saved = localStorage.getItem("grassland_digital_footprint");
      if (saved) {
        const { recommendedSize } = JSON.parse(saved);
        setStoredSize(recommendedSize);
      }
      setIsMounted(true);
    };

    // Defer to avoid the "synchronous setState in effect" lint error/warning
    const timer = setTimeout(checkStorage, 0);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = localStorage.getItem("grassland_digital_footprint");
      if (updated) {
        const { recommendedSize } = JSON.parse(updated);
        setStoredSize(recommendedSize);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("footprintUpdated", handleStorageChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("footprintUpdated", handleStorageChange);
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  return (
    <nav className="fixed top-0 z-[100] w-full bg-white/95 backdrop-blur-lg px-8 py-4 sm:px-16 border-b border-gh-silver/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo1.png" 
            alt="Grassland Logo" 
            width={150} 
            height={40} 
            className="h-10 w-auto object-contain"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Navigation Categories */}
        <div className="hidden space-x-12 sm:flex">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="group relative py-2"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-gh-charcoal hover:opacity-70 transition-opacity">
                {item.name}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] overflow-hidden bg-white shadow-2xl rounded-sm border border-gh-silver/30 transition-all duration-500 ease-in-out ${activeDropdown === item.name ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="p-10 grid grid-cols-3 gap-8">
                  {item.sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-5">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 border-b border-gh-silver/50 pb-2">
                        {section.title}
                      </h4>
                      <div className="flex flex-col gap-3">
                        {section.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/item flex items-center text-xs font-bold uppercase tracking-wider text-gh-charcoal/70 hover:text-gh-charcoal transition-all"
                          >
                            <span className="h-[1px] w-0 bg-gh-charcoal group-hover/item:w-3 transition-all mr-0 group-hover/item:mr-2" />
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gh-off-white/50 p-6 flex justify-between items-center border-t border-gh-silver/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/50 italic">Grassland Innovation Labs</span>
                  <Link
                    href={item.viewAllHref}
                    onClick={() => setActiveDropdown(null)}
                    className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal border-2 border-gh-charcoal px-4 py-2 hover:bg-gh-charcoal hover:text-white transition-all"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Icons & CTA */}
        <div className="flex items-center gap-6">
          <button 
            onClick={openSizeAI}
            className="hidden items-center gap-2 rounded-full bg-gh-charcoal text-white px-4 py-1.5 transition-all hover:opacity-90 sm:flex group cursor-pointer"
          >
            <Cpu className="h-4 w-4 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {storedSize ? `US ${storedSize} (Saved)` : "Sizing AI"}
            </span>
          </button>
          <div className="hidden items-center gap-4 text-gh-charcoal sm:flex">
            <div 
              onClick={() => useModalStore.getState().openSearchAI()}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <Search className="h-5 w-5 hover:opacity-70" />
            </div>
            
            {status === "authenticated" ? (
              <div className="relative group/user">
                <Link href="/dashboard">
                  <User className="h-5 w-5 cursor-pointer hover:opacity-70 text-green-600" />
                </Link>
                <div className="absolute right-0 top-full pt-4 opacity-0 pointer-events-none group-hover/user:opacity-100 group-hover/user:pointer-events-auto transition-all duration-300">
                  <div className="bg-white border border-gh-silver/20 shadow-xl rounded-xl p-4 w-48 flex flex-col gap-2">
                    <div className="pb-3 border-b border-gh-silver/10 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/40">Logged in as</p>
                      <p className="text-xs font-bold text-gh-charcoal truncate">{session?.user?.name || "User"}</p>
                    </div>
                    <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal hover:bg-gh-off-white px-3 py-2 rounded-lg transition-colors">
                      My Dashboard
                    </Link>
                    <Link href="/dashboard/orders" className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal hover:bg-gh-off-white px-3 py-2 rounded-lg transition-colors">
                      Orders
                    </Link>
                    <button 
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors text-left"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
                <Link href="/login">
                  <User className="h-5 w-5 cursor-pointer hover:opacity-70" />
                </Link>
            )}

            <div 
              onClick={openCheckoutAI}
              className="relative cursor-pointer hover:opacity-70"
            >
              <ShoppingBag className="h-5 w-5" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gh-charcoal text-[10px] text-white animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <Link href="/fame-network" className="hidden rounded-none border-2 border-gh-charcoal px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gh-charcoal transition-all hover:bg-gh-charcoal hover:text-white sm:block">
            Fame Network
          </Link>
        </div>
      </div>
    </nav>
  );
}
