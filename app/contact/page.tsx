import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Contact Us</h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
          Our specialized support team is available for all inquiries regarding products, orders, and technical specifications.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
           <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
              <Mail className="h-8 w-8 mx-auto mb-4 text-black" />
              <h3 className="text-lg font-black uppercase mb-2">General Inquiries</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">support@grassland.com</p>
           </div>
           <div className="bg-black text-white p-8 rounded-2xl border border-neutral-800">
              <h3 className="text-lg font-black uppercase mb-2">Press & Media</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">media@grassland.com</p>
           </div>
        </div>
      </div>
    </div>
  );
}
