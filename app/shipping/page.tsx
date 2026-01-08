import { Truck, Globe, Clock } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
           <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Shipping Policy</h1>
           <p className="text-xl text-neutral-500">Global Logistics & Delivery Standards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center p-6 border border-neutral-100 rounded-2xl">
              <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                 <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Standard Delivery</h3>
              <p className="text-sm text-neutral-500">3-5 Business Days</p>
           </div>
           <div className="text-center p-6 border border-neutral-100 rounded-2xl">
              <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                 <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Express Shipping</h3>
              <p className="text-sm text-neutral-500">1-2 Business Days</p>
           </div>
           <div className="text-center p-6 border border-neutral-100 rounded-2xl">
              <div className="h-12 w-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                 <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2">Global Shipping</h3>
              <p className="text-sm text-neutral-500">Available in 80+ Countries</p>
           </div>
        </div>

        <div className="prose prose-neutral max-w-none">
           <p>
              Grassland partners with premium logistics carriers to ensure your products arrive in pristine condition. All shipments are fully insured and trackable via your account dashboard.
           </p>
           {/* Add more policy text as needed */}
        </div>
      </div>
    </div>
  );
}
