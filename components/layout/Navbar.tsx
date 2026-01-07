"use client";

import { useState, useRef } from "react";
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { 
    name: "Men", 
    sections: [
      {
        title: "Trends",
        items: ["Summer Pulse", "Cross-Breed Era", "Carbon Pulse", "Neon Velocity"]
      },
      {
        title: "Versions",
        items: ["G1 Series", "Elite Pro", "Tech-Labs", "Heritage Core"]
      },
      {
        title: "Shoe Names",
        items: ["Velocity X", "Carbon Pro", "Neural 1", "Terra Form", "Deep Cloud"]
      }
    ]
  },
  { 
    name: "Women", 
    sections: [
      {
        title: "Trends",
        items: ["Pulse Series", "Eco-Active", "Aura Glow", "Zenith"]
      },
      {
        title: "Versions",
        items: ["G1 Series", "Luna Pro", "Active Flow", "Swift Core"]
      },
      {
        title: "Shoe Names",
        items: ["Nebula 1", "Flow Edge", "Aether X", "Gaia Pro", "Prism"]
      }
    ]
  },
  { 
    name: "Kids", 
    sections: [
      {
        title: "Trends",
        items: ["Jump Force", "Glow Tech", "Future Star"]
      },
      {
        title: "Versions",
        items: ["G1 Junior", "Mini Pro", "Playground Core"]
      },
      {
        title: "Shoe Names",
        items: ["Junior X", "Little Pulse", "Spark 1"]
      }
    ]
  },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay for smoothness
  };

  return (
    <nav className="glass-morphism fixed top-0 z-[100] w-full px-8 py-4 sm:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo1.png" 
            alt="Grassland Logo" 
            width={150} 
            height={40} 
            className="h-10 w-auto object-contain"
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
              
              {/* Dropdown Menu (Mega Menu Style) */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] overflow-hidden bg-white shadow-2xl rounded-sm border border-gh-silver/30 transition-all duration-500 ease-in-out ${activeDropdown === item.name ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="p-10 grid grid-cols-3 gap-8">
                  {item.sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-5">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 border-b border-gh-silver/50 pb-2">
                        {section.title}
                      </h4>
                      <div className="flex flex-col gap-3">
                        {section.items.map((subItem) => (
                          <a 
                            key={subItem} 
                            href="#" 
                            className="group/item flex items-center text-xs font-bold uppercase tracking-wider text-gh-charcoal/70 hover:text-gh-charcoal transition-all"
                          >
                            <span className="h-[1px] w-0 bg-gh-charcoal group-hover/item:w-3 transition-all mr-0 group-hover/item:mr-2" />
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gh-off-white/50 p-6 flex justify-between items-center border-t border-gh-silver/30">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gh-charcoal/50 italic">Grassland Innovation Labs</span>
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal border-2 border-gh-charcoal px-4 py-2 hover:bg-gh-charcoal hover:text-white transition-all">View All</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Icons & CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-4 text-gh-charcoal sm:flex">
            <Search className="h-5 w-5 cursor-pointer hover:opacity-70" />
            <User className="h-5 w-5 cursor-pointer hover:opacity-70" />
            <div className="relative cursor-pointer hover:opacity-70">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gh-charcoal text-[10px] text-white">0</span>
            </div>
          </div>
          <button className="hidden rounded-none border-2 border-gh-charcoal px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gh-charcoal transition-all hover:bg-gh-charcoal hover:text-white sm:block">
            Hall of Fame
          </button>
        </div>
      </div>
    </nav>
  );
}
