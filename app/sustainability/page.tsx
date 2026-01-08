import { Leaf, Recycle, Droplets } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-600">Eco-System Initiative</span>
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Sustainability</h1>
           <p className="text-xl text-neutral-500 font-light">
              Performance shouldn&apos;t cost the Earth.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-neutral-900 text-white p-12 rounded-3xl flex flex-col justify-between h-[500px]">
               <Leaf className="h-16 w-16 text-green-400" />
               <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase italic">Zero-Waste Manufacturing</h2>
                  <p className="text-white/60 text-lg">
                     Our 3D knitting process eliminates fabric waste, using only exactly what is needed for each shoe.
                  </p>
               </div>
            </div>
            <div className="space-y-8">
               <div className="bg-neutral-100 p-8 rounded-3xl flex items-start gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                     <Recycle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black uppercase mb-2">Recycled Ocean Plastic</h3>
                     <p className="text-neutral-600">The G1 upper contains 40% upcycled marine plastic.</p>
                  </div>
               </div>
               <div className="bg-neutral-100 p-8 rounded-3xl flex items-start gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                     <Droplets className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black uppercase mb-2">Waterless Dyeing</h3>
                     <p className="text-neutral-600">Our solution dye process saves 50 liters of water per pair.</p>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
