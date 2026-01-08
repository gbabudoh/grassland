export default function NewsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">Newsroom</h1>
           <p className="text-xl text-neutral-500">Latest updates from the Grassland ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                 <div className="bg-neutral-100 aspect-video rounded-2xl mb-6 overflow-hidden">
                    <div className="w-full h-full bg-neutral-200 group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Product Launch</span>
                    <h3 className="text-2xl font-black uppercase italic leading-none group-hover:text-neutral-600 transition-colors">
                       The G1 &apos;Stealth&apos; Edition Sells Out in 4 Minutes
                    </h3>
                    <p className="text-sm text-neutral-500">January 12, 2026</p>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
