"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";

const footerLinks = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Men", "Women", "Kids", "Accessories"],
  },
  {
    title: "Help",
    links: ["Order Status", "Shipping", "Returns", "Size Guide", "Contact Us", "FAQ"],
  },
  {
    title: "About",
    links: ["Our Story", "Innovation Lab", "Sustainability", "Careers", "Investors", "News"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gh-charcoal text-white pt-24 pb-12 px-8 sm:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/logo2.png" 
                alt="Grassland Logo" 
                width={180} 
                height={50} 
                className="brightness-0 invert object-contain h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 max-w-sm mb-8 font-medium leading-relaxed">
              Redefining sports technology through modern cross-breed engineering. Join the evolution of performance.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white/50 transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-white/50 transition-colors"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Nav Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6 italic">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => {
                  // Link resolution logic
                  let href = "#";

                  // Shop Section
                  if (section.title === "Shop") href = "/shop";

                  // Help Section
                  if (link === "Order Status") href = "/dashboard/orders";
                  if (link === "Contact Us") href = "/contact";
                  if (link === "FAQ") href = "/faq";
                  if (link === "Shipping") href = "/shipping";
                  if (link === "Returns") href = "/returns";
                  
                  // About Section
                  if (link === "Our Story") href = "/about";
                  if (link === "Innovation Lab") href = "/innovation";
                  if (link === "Sustainability") href = "/sustainability";
                  if (link === "Careers") href = "/careers";
                  if (link === "Investors") href = "/investors";
                  if (link === "News") href = "/news";

                  return (
                    <li key={link}>
                      {link === "Size Guide" ? (
                        <button 
                          onClick={() => useModalStore.getState().openSizeAI()}
                          className="text-sm text-white/50 hover:text-white transition-colors font-medium text-left"
                        >
                          {link}
                        </button>
                      ) : (
                        <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors font-medium">
                          {link}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Newsletter (Hidden on mobile grid, shown full width in better layout if needed) */}
          <div className="md:col-span-2 lg:col-span-5 border-t border-white/10 pt-20 mt-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div>
              <h3 className="text-3xl font-black uppercase italic mb-4 tracking-tighter">Become a Member</h3>
              <p className="text-white/50 font-medium">Receive early access to limited edition G1 releases and innovation lab updates.</p>
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b-2 border-white/20 py-4 text-sm font-bold uppercase tracking-widest focus:border-white transition-colors outline-none pr-12"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 hover:translate-x-2 transition-transform">
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            © {new Date().getFullYear()} Grassland Global S.A. All Rights Reserved.
          </div>
          <div className="flex gap-8">
             <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white">Privacy Policy</Link>
             <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white">Terms of Service</Link>
             <Link href="/cookie-policy" className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
