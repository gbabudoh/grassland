import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import * as motion from "framer-motion/client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left: Brand Panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gh-charcoal overflow-hidden flex-col">
        <motion.div 
          className="absolute inset-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/grassland_banner_1_1767749428961.png"
            alt="Grassland"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-gh-charcoal via-gh-charcoal/80 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between p-16 h-full">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 italic">
               <ShieldCheck className="h-4 w-4" /> System Onboarding 
            </div>
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.9] mb-6">
              Initialize <br /> Performance <br /> Node.
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
              Access your neural archive and synchronize with the G1 Innovation Lab.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/">
              <Image
                src="/logo2.png"
                alt="Grassland"
                width={280}
                height={78}
                className="brightness-0 invert w-auto object-contain"
              />
            </Link>
          </div>

          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            © {new Date().getFullYear()} Grassland Global S.A.
          </p>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white min-h-screen relative overflow-hidden">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 self-start w-full max-w-md">
          <Link href="/">
            <Image
              src="/logo1.png"
              alt="Grassland"
              width={140}
              height={38}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>

        <Link
          href="/"
          className="mt-10 text-[10px] font-black uppercase tracking-widest text-gh-charcoal/30 hover:text-gh-charcoal transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to Home
        </Link>

        {/* Decorative blob */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gh-silver/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gh-silver/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
