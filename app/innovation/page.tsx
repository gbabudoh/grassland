import { Atom, Microscope, Zap } from "lucide-react";

export default function InnovationPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">Advanced Research Division</span>
           <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Innovation Lab</h1>
           <p className="text-xl text-neutral-500 font-light">
              Where theoretical physics meets practical performance.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 group hover:border-blue-500/20 transition-colors">
              <Atom className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-black uppercase italic mb-4">Nano-Weave 2.0</h3>
              <p className="text-neutral-600">
                 Our proprietary upper material creates a dynamic second skin that adapts to foot swelling during high-intensity output.
              </p>
           </div>
           <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 group hover:border-blue-500/20 transition-colors">
              <Zap className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-black uppercase italic mb-4">Energy Return</h3>
              <p className="text-neutral-600">
                 The G-Foam compound returns 92% of kinetic energy, propelling you forward with every stride.
              </p>
           </div>
           <div className="p-8 bg-neutral-50 rounded-3xl border border-neutral-100 group hover:border-blue-500/20 transition-colors">
              <Microscope className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-black uppercase italic mb-4">Neural Feedback</h3>
              <p className="text-neutral-600">
                 Embedded sensors in select models analyze gait in real-time, providing feedback via the Grassland App.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
